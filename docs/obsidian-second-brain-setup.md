# Obsidian second brain — setup & recovery guide

**Last verified:** 2026-07-19 · **Source of truth:** the vault's own docs
(`📱 Your second brain on every device.md`, `SETUP_GUIDE.md`,
`GIT-QUICK-REFERENCE.md`, and the vault-root `CLAUDE.md` agent contract)

This is the GitHub-hosted copy of "how the SUAS second brain works and how to
set it up on any machine." The vault documents itself, but those notes live
*inside* the vault — useless if the vault is the thing you've lost. This file
lives in the public webapp repo so it's reachable from any device, any time.

---

## What it is

The second brain is an **Obsidian vault** — a folder of plain Markdown notes —
that holds SUAS's persistent memory: SOPs, templates, projects, logs,
reference material, and funding campaign files.

```
MacBook Pro (primary)
~/Documents/SUAS-QRF/          ← the vault. Edit here, in Obsidian.
      │
      ├──→ Google Drive (automatic, <60s)
      │      My Drive/SUAS-QRF          ← full mirror incl. PDFs/big files
      │
      └──→ GitHub (automatic, every 5 min while Obsidian is open)
             github.com/jacobsterlingsilver/suas-vault   ← PRIVATE repo,
             Markdown + Obsidian config only              notes history
```

Two independent backups, two different jobs:

- **Google Drive** carries *everything* (PDFs, Word docs, the `06_Files/`
  bulk dump) and is how phones and cloud Claude sessions read the vault.
- **GitHub (`suas-vault`)** carries the *notes* (Markdown + `.obsidian/`
  config) with full version history, and is how other computers clone it.

## MacBook Pro — already set up (nothing to do)

The vault was built on the MacBook Pro on **2026-07-18**. Day to day:

1. Open Obsidian. The vault `SUAS-QRF` is the only registered vault.
2. Write. The **Obsidian Git plugin** pulls the latest on startup and
   commits + pushes every **5 minutes** while Obsidian is open.
3. That's it. No commands, no buttons, no IP addresses.

Claude sessions on the Mac push their own work with
`bash ~/SUAS/bin/vault-sync.sh` (the agent-side sync script).

### Check that it's actually syncing

1. Make a small test edit to any note.
2. Wait ~6 minutes with Obsidian open.
3. Confirm a `vault backup:` commit appears at
   `github.com/jacobsterlingsilver/suas-vault`.
4. If not: the sync log is at `~/SUAS/logs/vault-sync.log`, git commands are
   in the vault's `GIT-QUICK-REFERENCE.md`, or just ask Claude to
   **"check vault sync."**

## MacBook Pro — rebuilding from scratch

Only needed if the Mac is wiped or the vault folder is gone. The vault is
recoverable from either backup; GitHub is the cleaner restore path:

1. Install **Obsidian** ([obsidian.md](https://obsidian.md)) and
   **GitHub Desktop** ([desktop.github.com](https://desktop.github.com)) —
   or use `git` in the terminal.
2. Sign in to GitHub as **`jacobsterlingsilver`** and clone the private repo
   `suas-vault` to `~/Documents/SUAS-QRF` (keep this exact path — Google
   Drive for Desktop mirrors `~/Documents`, which restores the Drive backup
   automatically).
3. In Obsidian: **Open folder as vault** → pick `~/Documents/SUAS-QRF`.
4. When Obsidian asks about community plugins, choose **"Trust author and
   enable plugins."** If it never asks: Settings → Community plugins → turn
   **Restricted mode OFF**. ⚠️ *This is the step that makes auto-sync work —
   it was silently skipped once before and killed sync for weeks.*
5. Run the verification steps above (test edit → `vault backup:` commit).
6. Big non-Markdown files (PDFs, videos) don't travel through GitHub — they
   come back via Google Drive once Drive for Desktop re-syncs `SUAS-QRF`.

## Any other computer (Beelink PC, a new machine)

Three steps — the Obsidian Git plugin and all its settings travel *inside*
the vault, so a fresh clone starts auto-syncing on its own:

1. Install **Obsidian** and **GitHub Desktop**.
2. In GitHub Desktop, sign in as `jacobsterlingsilver` → **Clone** →
   `suas-vault`.
3. In Obsidian: **Open folder as vault** → pick the cloned folder → click
   **"Trust author and enable plugins"** when asked.

Notes made on the Mac appear on the other machine (and back) within
~5 minutes while both have Obsidian open.

## Phone / iPad

- **Easiest:** the **Google Drive app** → `My Drive/SUAS-QRF`. Every file,
  including PDFs, is readable there.
- Full Obsidian on the phone is possible but needs an extra app — ask Claude
  when you want it.

## Cloud Claude sessions (like this one)

Cloud/phone Claude sessions can't clone the private `suas-vault` repo, but
they **read and write the vault through the Google Drive connector** (search
Drive for the `SUAS-QRF` folder). Rules for that are in this repo's
`CLAUDE.md` ("Second brain" section) and, above all, in the vault's own
root `CLAUDE.md` — the agent contract. Its read order:
`🔥 Recent Context.md` → `00_START_HERE.md` → the folder's `_index.md`.

## "Do I need the MacBook Pro's IP address?"

**No.** Nothing in this system connects to the MacBook over the network:

- Devices never talk to each other directly. Everything meets in the middle —
  GitHub for notes, Google Drive for everything else.
- The MacBook can be asleep, off, or on another continent; other devices
  still get the latest pushed copy.
- If a guide ever asks you to sync to a computer "by IP address," that's a
  different mechanism (e.g. a local REST/network plugin) that this setup
  deliberately does not use — it would break the moment the Mac's address
  changed and adds an open port for no benefit.

## Hard-won gotchas (never do these)

- **Never register `My Drive` (the Drive root) as an Obsidian vault.** It
  silently displaces the real vault, kills sync, and indexes 100k+ files
  (including `SECURE/`) on an 8 GB machine.
- **Never wire vault sync to launchd/cron.** macOS TCC blocks background
  jobs from Google Drive paths (verified 2026-07-18). Sync runs from
  Obsidian itself or from `~/SUAS/bin/vault-sync.sh` in a session.
- **Never commit mass deletions** (>40 files deleted usually means a stale
  `.git/index.lock` artifact, not real deletions).
- **Never `git add` `06_Files/` or anything under `SECURE/`** — the bulk
  import dump and sensitive material stay out of git.
- **No veteran PII, passwords, or credentials in the vault**, even though
  the repo is private.
- `03_Projects/food-ride-shelter/` is a **separate git repo** — never edit
  or `git add` it from vault sessions (it's gitignored there).
