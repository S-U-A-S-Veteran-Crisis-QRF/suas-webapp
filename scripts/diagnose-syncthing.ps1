<#
    Syncthing / SyncTrayzor diagnostic collector  (Windows PowerShell 5.1+)

    READ-ONLY. It starts nothing, stops nothing, and changes no settings.
    It collects the state needed to diagnose "won't sync" and writes a
    redacted report to your Desktop.

    Run in a normal (non-admin) PowerShell window:

        powershell -ExecutionPolicy Bypass -File .\diagnose-syncthing.ps1

    Device IDs are truncated and the API key is never printed. Folder paths
    ARE included because they matter for diagnosis - glance over the report
    before sharing it if any path names a person.
#>

$ErrorActionPreference = 'SilentlyContinue'
$ProgressPreference    = 'SilentlyContinue'

$report = New-Object System.Collections.Generic.List[string]
function W([string]$s) { $report.Add($s) | Out-Null }
function Short($id) {
    if ([string]::IsNullOrEmpty($id)) { return '(none)' }
    if ($id.Length -le 7) { return $id }
    return $id.Substring(0,7) + '...'
}

W '=== Syncthing / SyncTrayzor diagnostic ==='
W ("collected : " + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'))
W ("windows   : " + (Get-CimInstance Win32_OperatingSystem).Caption)
W ''

# ---------------------------------------------------------------- processes
W '--- 1. processes ---'
$anyRunning = $false
foreach ($name in 'SyncTrayzor','syncthing') {
    $p = @(Get-Process -Name $name)
    if ($p.Count -gt 0) {
        $anyRunning = $true
        W ("{0,-13}: RUNNING (pid {1})" -f $name, (($p | ForEach-Object { $_.Id }) -join ', '))
    } else {
        W ("{0,-13}: NOT RUNNING" -f $name)
    }
}
if (-not $anyRunning) {
    W '  >> Nothing is running. Syncthing only syncs while it is running on BOTH ends.'
}
W ''

# ------------------------------------------------------------ installed build
W '--- 2. installed build ---'
$exe = 'C:\Program Files\SyncTrayzor\SyncTrayzor.exe'
if (Test-Path $exe) {
    $vi = (Get-Item $exe).VersionInfo
    W ("SyncTrayzor : {0}" -f $vi.FileVersion)
    W ("company     : {0}" -f $vi.CompanyName)
    if ($vi.FileVersion -and $vi.FileVersion -lt '2') {
        W '  >> v1.x = the unmaintained canton7 build. See docs/syncthing-setup.md.'
    }
} else {
    W "SyncTrayzor : NOT FOUND at $exe"
}

$stExe = 'C:\Program Files\SyncTrayzor\syncthing.exe'
if (Test-Path $stExe) {
    $ver = & $stExe --version 2>&1 | Select-Object -First 1
    W ("syncthing   : {0}" -f $ver)
} else {
    W 'syncthing   : bundled binary not found next to SyncTrayzor.exe'
}
W ''

# -------------------------------------------------------------------- config
W '--- 3. config + API endpoint ---'
$candidates = @(
    "$env:LOCALAPPDATA\SyncTrayzor\syncthing\config.xml",
    "$env:LOCALAPPDATA\Syncthing\config.xml",
    "$env:APPDATA\Syncthing\config.xml"
)
$cfgPath = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1

$apiKey  = $null
$guiAddr = '127.0.0.1:8384'

if ($cfgPath) {
    W ("config.xml  : {0}" -f $cfgPath)
    W ("last write  : {0}" -f (Get-Item $cfgPath).LastWriteTime)
    try {
        [xml]$cfg = Get-Content $cfgPath -Raw
        $apiKey = $cfg.configuration.gui.apikey
        if ($cfg.configuration.gui.address) { $guiAddr = $cfg.configuration.gui.address }
        W ("gui address : {0}" -f $guiAddr)
        W ("api key     : {0}" -f $(if ($apiKey) { 'present (not printed)' } else { 'MISSING' }))

        $opt = $cfg.configuration.options
        W ("globalAnnounce (global discovery) : {0}" -f $opt.globalAnnounceEnabled)
        W ("localAnnounce  (local discovery)  : {0}" -f $opt.localAnnounceEnabled)
        W ("relaysEnabled  (public relays)    : {0}" -f $opt.relaysEnabled)

        W ''
        W 'devices in config.xml:'
        foreach ($d in $cfg.configuration.device) {
            W ("  {0,-22} id {1,-11} addresses: {2}" -f $d.name, (Short $d.id), ($d.address -join ', '))
        }
        W ''
        W 'folders in config.xml:'
        foreach ($f in $cfg.configuration.folder) {
            $sharedWith = @($f.device | ForEach-Object { Short $_.id }) -join ', '
            W ("  id={0} type={1} paused={2}" -f $f.id, $f.type, $f.paused)
            W ("    path        : {0}" -f $f.path)
            W ("    shared with : {0}" -f $sharedWith)
        }
    } catch {
        W ("  >> could not parse config.xml: " + $_.Exception.Message)
    }
} else {
    W '  >> NO config.xml FOUND in any known location.'
    W '     Syncthing has likely never completed a first run on this machine.'
}
W ''

# ---------------------------------------------------------------- live state
W '--- 4. live state (REST API) ---'
if ($apiKey) {
    $base    = "http://$guiAddr"
    $headers = @{ 'X-API-Key' = $apiKey }

    function Api($path) {
        try { return Invoke-RestMethod -Uri ($base + $path) -Headers $headers -TimeoutSec 10 }
        catch { W ("  API {0} failed: {1}" -f $path, $_.Exception.Message); return $null }
    }

    $v = Api '/rest/system/version'
    if ($v) {
        W ("running version : {0} ({1})" -f $v.version, $v.os)

        $status = Api '/rest/system/status'
        if ($status) {
            W ("my device id    : {0}" -f (Short $status.myID))
            W ("uptime (sec)    : {0}" -f $status.uptime)
        }

        $conns = Api '/rest/system/connections'
        if ($conns) {
            W ''
            W 'connections:'
            $connected = 0
            foreach ($k in $conns.connections.PSObject.Properties.Name) {
                $c = $conns.connections.$k
                if ($c.connected) { $connected++ }
                W ("  {0}  connected={1,-5} type={2} addr={3}" -f (Short $k), $c.connected, $c.type, $c.address)
            }
            W ("  --> {0} device(s) currently connected" -f $connected)
            if ($connected -eq 0) {
                W '  >> Zero connections. Nothing can sync. Check the far end is awake and paired.'
            }
        }

        $folders = Api '/rest/config/folders'
        if (-not $folders) { $folders = (Api '/rest/system/config').folders }
        if ($folders) {
            W ''
            W 'folder status:'
            foreach ($f in $folders) {
                $st = Api ("/rest/db/status?folder=" + [uri]::EscapeDataString($f.id))
                if ($st) {
                    W ("  {0,-18} state={1,-10} needFiles={2} errors={3}" -f $f.id, $st.state, $st.needFiles, $st.errors)
                    if ($st.error) { W ("      error: " + $st.error) }
                } else {
                    W ("  {0,-18} (no status returned)" -f $f.id)
                }
            }
        }
    } else {
        W '  >> API unreachable. Syncthing is not listening — it is not actually running.'
    }
} else {
    W '  skipped: no API key available'
}
W ''

# ------------------------------------------------------------------ network
W '--- 5. network ---'
foreach ($port in 8384, 22000) {
    $listen = @(Get-NetTCPConnection -State Listen -LocalPort $port)
    if ($listen.Count -gt 0) { W ("tcp {0,-6}: LISTENING" -f $port) }
    else                     { W ("tcp {0,-6}: not listening" -f $port) }
}

W ''
W 'firewall rules matching *syncthing*:'
$rules = @(Get-NetFirewallRule -DisplayName '*yncthing*')
if ($rules.Count -eq 0) {
    W '  none found  >> Windows Firewall may be silently dropping inbound sync connections.'
} else {
    foreach ($r in $rules) {
        W ("  {0,-40} enabled={1} action={2} dir={3}" -f $r.DisplayName, $r.Enabled, $r.Action, $r.Direction)
    }
}

W ''
W 'tailscale:'
$ts = Get-Command tailscale -ErrorAction SilentlyContinue
if ($ts) { W (( & tailscale status 2>&1 | Select-Object -First 10 ) -join "`n") }
else     { W '  tailscale CLI not installed / not on PATH' }

W ''
W 'power (does this machine sleep?):'
W ((powercfg /getactivescheme) -join '')
$acStandby = (powercfg /query SCHEME_CURRENT SUB_SLEEP STANDBYIDLE 2>&1 | Select-String 'Current AC Power Setting Index')
if ($acStandby) { W ("  AC standby index: " + $acStandby.ToString().Trim()) }

# ------------------------------------------------------------------- output
$dest = Join-Path ([Environment]::GetFolderPath('Desktop')) 'syncthing-report.txt'
$text = $report -join "`r`n"
$text | Out-File -FilePath $dest -Encoding utf8

Write-Host $text
Write-Host ''
Write-Host "Report saved to: $dest" -ForegroundColor Green
Write-Host 'Paste that file back into the Claude session.' -ForegroundColor Green
