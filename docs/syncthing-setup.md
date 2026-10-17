# SyncTrayzor / Syncthing — install, repair, and the v1→v2 migration

SyncTrayzor is a Windows tray wrapper around **Syncthing**, the peer-to-peer file
sync engine. The Beelink PC already has it installed at
`C:\Program Files\SyncTrayzor\SyncTrayzor.exe`.

> **Same constraint as [`tailscale-setup.md`](./tailscale-setup.md):** a cloud
> Claude session runs in a throwaway Linux container and cannot install, launch,
> or repair software on the Windows PC. This is the runbook; the execution is
> hands-on.

> **Public-repo rule:** device hostnames, Syncthing device IDs, folder IDs, and
> API keys never go in this repo. Placeholders only — real values belong in the
> private `SUAS-QRF` vault.

## Read this before you touch anything

The SyncTrayzor you have installed is almost certainly the **original
`canton7/SyncTrayzor` build, which is no longer maintained** — its author stopped
using Syncthing years ago and archived his involvement. Development continued in
a fork, **[`GermanCoding/SyncTrayzor`](https://github.com/GermanCoding/SyncTrayzor)**,
which is the version the Syncthing project itself now points people to. Latest is
**v2.2.0**.

So "fix it" most likely means "migrate off the dead build," not "repair the
existing one." That migration has two moving parts, and the second one is the
one that bites:

1. **SyncTrayzor v1 → v2.** The v2 installer upgrades an existing **64-bit** v1
   install in place. Close SyncTrayzor v1 completely before running it (v2.2.0
   specifically improved this flow). Do **not** hand-copy v2 files over a v1
   directory — mixed v1/v2 installs contain incompatible files and crash
   frequently.
2. **Syncthing v1 → v2 — the slow part.** SyncTrayzor v2 bundles Syncthing v2,
   which replaced the LevelDB database with SQLite. The first launch after
   upgrading runs a **one-way database migration**. On a small folder set it's
   minutes; on large setups community reports run to many hours. Start it when
   you don't need the machine, and don't kill it partway.

Two facts that make this less scary: **Syncthing v1 and v2 peers interoperate**,
so you do not have to upgrade every device at once — do the Beelink, confirm it's
healthy, then do the others. And Syncthing never deletes the source of truth on
its own, but you should still **back up before migrating** anyway.

## Install / upgrade on the Beelink

1. Note what you're syncing today: open the current SyncTrayzor → Syncthing web
   UI (`http://localhost:8384`) → write down each **folder path** and its
   **folder ID**, plus the device IDs of any paired machines. If the migration
   goes sideways, this list is what lets you rebuild in ten minutes.
2. Back up `%LOCALAPPDATA%\SyncTrayzor` (config + database) somewhere off the
   machine.
3. Download the v2 installer from
   <https://github.com/GermanCoding/SyncTrayzor/releases>.
4. **Fully exit SyncTrayzor** — right-click the tray icon → Exit. Confirm no
   `SyncTrayzor.exe` or `syncthing.exe` remains in Task Manager.
5. Run the installer. Accept the in-place upgrade.
6. Launch it and **leave it alone** while the Syncthing database migration runs.
   The web UI may be unreachable during this — that's expected, not a hang.
7. When the UI returns, check every folder reports **Up to Date** and every
   device shows **Connected**.

If the upgrade lands in a broken state, the clean path is: uninstall SyncTrayzor
entirely, delete the leftover `C:\Program Files\SyncTrayzor` directory, install
v2 fresh, then re-add folders from the list you wrote down in step 1.

## Run it over Tailscale, not the public internet

This is why the [Tailscale setup](./tailscale-setup.md) matters here. By default
Syncthing finds peers through **global discovery servers** and can fall back to
**public relay servers** — meaning SUAS files traverse third-party infrastructure
even though they're encrypted in transit. Once all three devices are on the
tailnet, you can close that off:

In the Syncthing web UI → **Actions → Settings → Connections**:

- Turn **off** Global Discovery and Enable Relaying.
- Leave Local Discovery on.
- For each remote device, set its **Addresses** explicitly to the tailnet name
  instead of `dynamic`, e.g. `tcp://beelink:22000`.

Now sync traffic only ever moves device-to-device across the tailnet. If a device
shows **Disconnected** after this change, the cause is almost always that
Tailscale is down on one end — check `tailscale status` before touching Syncthing
settings.

## Do not stack sync engines on one folder

The `SUAS-QRF` vault already has **two** sync mechanisms: it lives in a Google
Drive folder, and Obsidian Git pushes it to a private repo. **Adding Syncthing to
that same folder would be a third**, and multiple sync engines watching one
directory is a reliable way to generate endless conflict files
(`~syncthing~*.tmp`, Drive's "conflicted copy", and git merge conflicts, all at
once) and, in the worst case, to resurrect deleted files in a loop.

Pick one owner per folder. Concretely:

- Vault (`SUAS-QRF`) → **stays on Drive + Obsidian Git.** Don't add it to Syncthing.
- Any git clone of **this repo** → never a Syncthing folder. It's public, and
  git is already its sync mechanism.
- Syncthing is the right tool for the material that suits neither: large media,
  scanned documents, working files you want on the phone without uploading to a
  cloud provider.

## Collect the diagnosis in one command

Rather than walking the ladder below by hand, run the collector on the Beelink.
It is read-only — it starts nothing, stops nothing, changes no settings — and it
writes `syncthing-report.txt` to the Desktop covering every step below:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\diagnose-syncthing.ps1
```

It reports whether the processes are running, the installed SyncTrayzor and
Syncthing versions, the configured devices and folders, live connection state via
the local API, listening ports, firewall rules, Tailscale status, and whether the
machine is set to sleep. Device IDs are truncated and the API key is never
printed; folder paths are included, so glance over it before sharing if a path
names a person.

## "It won't sync" — diagnostic ladder

Work these in order. Each step tells you whether to stop or keep going, and most
"won't sync" reports end at step 1, 3, or 4.

### 1. Are both ends running *at the same time*?

Syncthing is peer-to-peer. **There is no server holding your files.** If the
Beelink is asleep, hibernating, or logged out, nothing on the MacBook or phone
can sync — there's nobody to sync with. Two devices that are never awake
simultaneously will never sync, and the UI won't call this an error.

Check on the Beelink: Windows power settings → confirm it isn't sleeping. This is
the single most common cause on a laptop/desktop pair.

### 2. Is the phone even running a working Syncthing?

**The official Syncthing Android app was discontinued** — its last release
shipped with the December 2024 Syncthing version, and it's gone from the Play
Store. If the phone is running that abandoned app, or you couldn't find it in the
Play Store at all, that's the answer for the phone leg.

The maintained replacement is **Syncthing-Fork** (Catfriend1), available from
**F-Droid** — not the Play Store. It keeps the original functionality and adds
battery-friendly scheduling.

While you're there: Android's battery optimization kills background Syncthing
constantly. Settings → Apps → Syncthing-Fork → Battery → **Unrestricted**.
A phone that syncs only while the app is open on screen is this, every time.

### 3. Is each device added on *both* sides?

Pairing is mutual. Adding the MacBook's device ID on the Beelink does nothing
until the Beelink's device ID is also added on the MacBook (or the prompt on the
other end is accepted). A one-sided pairing sits at **Disconnected** forever.

On each device: web UI → the remote device should be listed, not just pending.

### 4. Is the folder accepted on both sides?

This one masquerades as a network problem. Sharing a folder only sends an
*offer*. Until the other device accepts it and picks a local path, the folder
doesn't exist over there — while the devices themselves cheerfully report
**Connected**. Devices connected + nothing syncing = almost always this.

Look for a "wants to share folder X" notification on the receiving device.

### 5. Devices show Disconnected

Now it's a network problem:

- If you've done the Tailscale setup: `tailscale status` on both ends first.
  Syncthing can't connect if the tunnel is down.
- Windows Defender Firewall may be blocking `syncthing.exe` — allow it on private
  networks. Syncthing uses **TCP and UDP 22000** for sync, UDP 21027 for local
  discovery.
- If you disabled global discovery/relaying per the section above but didn't set
  explicit tailnet addresses, devices have no way to find each other. Set them.

### 6. Connected, folder accepted, still not moving

- **Folder or device paused** — check for a Pause button toggled on either end.
- **Folder type mismatch.** A folder set to *Receive Only* will never send its
  changes upstream; it reports "Local Additions" instead. If you set one side
  Receive Only expecting a two-way mirror, that's the bug. Both sides should be
  *Send & Receive* for normal use.
- **Out of Sync with errors** — expand the folder and read the actual error.
  Usually a permission denial, a missing path (unmounted drive), or a file locked
  by another program.
- **`.stignore` patterns** silently excluding what you're watching for.
- **Minimum free disk space** (default 1%) — Syncthing refuses to write below it.

### 7. Still stuck

Grab the log rather than guessing: SyncTrayzor → **File → Show Syncthing Log**,
or the web UI → **Actions → Logs**. The failing operation names itself there. If
you paste that log back, redact device IDs and any file paths that name people.

## Troubleshooting quick table

| Symptom | Likely cause | Fix |
|---|---|---|
| Crashes on launch right after upgrading | Mixed v1/v2 files in the install directory | Uninstall, delete `C:\Program Files\SyncTrayzor`, install v2 fresh |
| Web UI unreachable, high disk use, seems hung after upgrade | Syncthing v1→v2 LevelDB→SQLite migration in progress | Wait it out — can take hours on large folder sets. Don't kill the process |
| Tray icon gone but process running | Windows notification-area overflow | Taskbar settings → select which icons appear |
| SmartScreen blocks the installer | Unsigned/less-common binary | Verify you downloaded from the GermanCoding releases page, then "More info → Run anyway" |
| Device stuck **Disconnected** | Tailscale down on one end, or address pinned to a stale IP | `tailscale status` first; use MagicDNS names, not `100.x` literals |
| Folder stuck **Out of Sync**, permission errors | Syncing into a protected location (Program Files, OneDrive-managed path) | Move the folder somewhere plainly user-owned |
| Both devices edited the same file | Normal Syncthing conflict handling | Look for `*.sync-conflict-*` files; resolve by hand, then delete the loser |

## Sources

- [GermanCoding/SyncTrayzor releases](https://github.com/GermanCoding/SyncTrayzor/releases) — the maintained fork
- [canton7/SyncTrayzor README](https://github.com/canton7/SyncTrayzor/blob/master/README.md) — original project's maintenance status
- [Syncthing forum: upgrading 1.x → 2.0](https://forum.syncthing.net/t/upgrading-from-1-x-to-version-2-how/25362)
