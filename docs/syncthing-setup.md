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

## Troubleshooting

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
