# Cross-device sync — the complete map

How Claude stays in sync across every device SUAS works from: phone/cloud
sessions, the MacBook Pro, and the Beelink PC. **This git repository is the
sync channel** — there is no hidden per-account device sync. Four layers ride
on it (plus the vault):

| # | What syncs | Channel | How it flows |
|---|------------|---------|--------------|
| 1 | Tooling & config — skills, subagents, hooks, `CLAUDE.md`, settings | `.claude/` + root docs on **`main`** | merge a PR → every device gets it on next pull/clone |
| 2 | **Live session state — "what just happened, what's next"** | **`claude-sync` branch** (orphan, never merged) | any session publishes with `/sync handoff`; every session auto-receives at start |
| 3 | Public status dashboard | `MASTER.md` on `main` | refreshed by the daily Claude routine + when work ships |
| 4 | Org memory ("second brain") | Obsidian vault in Google Drive (`SUAS-QRF`), private GitHub backup | vault's own `CLAUDE.md` contract; cloud sessions use the Google Drive connector |

Layers 1 and 3 already existed. Layer 2 is what makes sessions *communicate*.

## Layer 2: the `claude-sync` session bus

Claude sessions are islands by default — cloud containers are discarded after
each session and local transcripts never leave their machine (that's why
`docs/claude-device-handoff.md` had to reconstruct history from git). The
`claude-sync` branch fixes this going forward:

- **`HANDOFF.md`** — the latest session's handoff: what was done, what's in
  flight, what the next session should do first, notes for specific devices.
  Rewritten on every handoff; latest wins.
- **`JOURNAL.md`** — append-only history of every handoff and note, newest
  first. Nothing is lost when the handoff is rewritten.

It's an orphan branch: tiny, no site history, never merged to `main`, never
deployed. GitHub is the transport, so it works from any device that can pull
the repo — including fresh cloud containers.

### Receiving — automatic

`.claude/hooks/session-start.sh` fetches `origin/claude-sync` at the start of
**every session on every device** (bounded, offline-safe) and injects the
latest `HANDOFF.md` into the session's starting context. You never have to ask
"where were we" — every session already knows.

### Sending — one command

At the end of a working session (or after shipping something):

```
/sync handoff
```

Claude summarizes the session into the handoff template (Done / In flight /
Next / For other devices) and publishes it via
`.claude/skills/sync/scripts/sync.sh`, which commits and pushes to
`claude-sync` from a throwaway worktree — your working tree and branch are
untouched. Quick messages between sessions use `/sync note`; full history is
`/sync` (catchup). The script self-bootstraps the branch on first use and
handles concurrent pushes from two devices (rebase + retry with backoff).

### The one rule

**This repo is public.** Handoffs and notes must never contain veteran PII,
credentials, API keys, message contents, or financial figures — the same
privacy rule as `MASTER.md`. Durable-but-private material belongs in the vault
(layer 4), not on the sync branch.

## Per-device setup (once per machine)

1. Clone or pull the repo; open Claude Code in the repo folder.
2. Trust the repo when prompted (this enables the SessionStart hook — the
   auto-catch-up — and the vendored skills/plugin).
3. That's it. Receiving is automatic; sending is `/sync handoff`.

Cloud/phone sessions need nothing: each fresh container clones the repo,
the hook runs, and the session starts caught-up.

> Until the PR adding this system is merged to `main`, only sessions on its
> branch have the hook and skill. After merge, it's every device automatically.

## Which layer do I use?

- "Tell the next session / other computer something" → **`/sync note`**
- "I'm done for today, save my place" → **`/sync handoff`**
- "Change how Claude behaves everywhere" → commit to `.claude/` via PR (layer 1)
- "Record an org fact, decision, or contact forever" → the vault (layer 4)
- "What's the overall project status?" → `MASTER.md` (layer 3)

## History

The one-time consolidation snapshot that predates this system lives in
[`docs/claude-device-handoff.md`](./claude-device-handoff.md) (July 5, 2026).
It documented the problem this system now solves continuously.
