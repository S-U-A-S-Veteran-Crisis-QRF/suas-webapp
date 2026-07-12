# Fix: Fact-Forcing Gate blocking prose writes (2026-07-10)

**Status: fixed in repo — needs one-time apply on the desktop PC.**

## The bug

The desktop PC carries a user-level **Fact-Forcing Gate** PreToolUse hook
(registered in `C:\Users\jacob\.claude\settings.json`, outside this repo, so
it never synced). It gates *every* Write/Edit, including plain-prose files.
On 2026-07-10 it blocked both of these with *"list ALL files that
import/require this file"*:

- `Documents\SUAS-QRF\04_Logs\SESSION-NOTES-2026-07-10.md` — a session note
- `C:\Users\jacob\.claude\CLAUDE.md` — the memory/lessons file

"Importers" is meaningless for markdown. Every note or memory write burned a
blocked attempt plus a retry — pure friction, no safety gained.

## The fix

`.claude/hooks/fact-forcing-gate.py` in this repo is the corrected v2 gate:

- **Never gates prose**: `.md`/`.txt`/`.rst`/`.log` etc., anything inside a
  `docs/`, `notes/`, `logs/`, `04_Logs/`, `memory/`, `scratchpad/` folder,
  and OS temp paths.
- **Still gates code**: first edit of a code file per session blocks with the
  same four-fact checklist; the retry goes through (same behavior as before).
- **Fails open**: bad input can never wedge a session.
- Cross-platform Python, so it is identical on the desktop, the MacBook, and
  cloud sessions — the repo stays the single sync channel.

## Apply on the desktop PC (one time)

Paste this to desktop Claude Code from inside the `suas-webapp` checkout:

> Apply the fact-forcing-gate fix from
> `docs/fixes/2026-07-10-fact-forcing-gate.md`: copy
> `.claude/hooks/fact-forcing-gate.py` from this repo to
> `%USERPROFILE%\.claude\hooks\fact-forcing-gate.py`, then edit
> `%USERPROFILE%\.claude\settings.json` so the existing Fact-Forcing Gate
> PreToolUse entry runs
> `python "%USERPROFILE%\.claude\hooks\fact-forcing-gate.py"` instead of the
> old gate command (remove the old command/script). Then verify: writing a
> throwaway `.md` file must NOT trigger the gate; editing a `.ts` file must
> trigger it once and allow the retry.

Manual equivalent:

1. `copy .claude\hooks\fact-forcing-gate.py %USERPROFILE%\.claude\hooks\`
2. In `%USERPROFILE%\.claude\settings.json`, point the gate's hook entry at:

   ```json
   {
     "matcher": "Write|Edit|MultiEdit|NotebookEdit",
     "hooks": [
       {
         "type": "command",
         "command": "python \"%USERPROFILE%\\.claude\\hooks\\fact-forcing-gate.py\""
       }
     ]
   }
   ```

3. Delete/retire the old gate script so only v2 runs.

The same steps work on the MacBook with `$HOME` instead of `%USERPROFILE%`
and `python3` instead of `python`.

## Why the fix lives in the repo but is registered at user level

The gate protects files *outside* any repo (memory files, Drive-vault notes),
so it must stay a user-level hook. But user-level config doesn't sync between
devices (see `docs/claude-device-handoff.md`), which is exactly how v1 drifted
buggy. The canonical script now lives here; each machine's settings just
point at its local copy. It is deliberately **not** registered in this repo's
`.claude/settings.json` — that would double-gate code edits on machines that
already run it at user level.
