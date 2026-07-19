# Cross-device sync — the complete map

How Claude stays in sync across every device SUAS works from: phone/cloud
sessions, the MacBook Pro, and the Beelink PC. **Git repos are the sync
channels** — there is no hidden per-account device sync. Five layers:

| # | What syncs | Channel | Visibility | How it flows |
|---|------------|---------|------------|--------------|
| 1 | This repo's tooling — skills, subagents, hooks, `CLAUDE.md`, `LESSONS.md` | `.claude/` + root docs on `main` of **suas-webapp** | public (website must be) | merge a PR → every device gets it on next pull/clone |
| 2 | Global Claude program — `~/.claude` skills/agents/CLAUDE.md/keybindings | **suas-claude-program** `main` + its own `sync.sh` | **private** | nightly autopilot + manual `sync.sh` on each machine |
| 3 | **Live session state — "what just happened, what's next"** | **`claude-sync` branch of suas-claude-program** | **private** | any session publishes with `/sync handoff`; every session auto-receives at start |
| 4 | Public status dashboard | `MASTER.md` on `main` of suas-webapp | public (counts/status only) | refreshed by the daily Claude routine + when work ships |
| 5 | Org memory ("second brain") | Obsidian vault in Google Drive (`SUAS-QRF`), private GitHub backup | private | vault's own `CLAUDE.md` contract; cloud sessions use the Google Drive connector |

**Privacy-first rule (see `LESSONS.md`):** everything SUAS is private except
the website repos that must be public to operate. Session data lives only on
layers 3/5 — never on the public repos. Branches of a public repo are public.

## Layer 3: the private `claude-sync` session bus

Claude sessions are islands by default — cloud containers are discarded after
each session and local transcripts never leave their machine (that's why
`docs/claude-device-handoff.md` had to reconstruct history from git). The
`claude-sync` branch of the **private `suas-claude-program` repo** fixes this
going forward:

- **`HANDOFF.md`** — the latest session's handoff: what was done, what's in
  flight, what the next session should do first, notes for specific devices.
  Rewritten on every handoff; latest wins.
- **`JOURNAL.md`** — append-only history of every handoff and note, newest
  first. Nothing is lost when the handoff is rewritten.

It's an orphan branch: it shares no history with the program files on `main`
and never disturbs the program-sync flow (`sync.sh` / nightly autopilot).
GitHub is the transport, so it works from any device that can reach the
private repo.

### Receiving — automatic

`.claude/hooks/session-start.sh` (in this repo) derives the private remote
from origin's URL, fetches the `claude-sync` branch at the start of **every
session on every device** (bounded, offline-safe), and injects the latest
`HANDOFF.md` into the session's starting context. You never have to ask
"where were we" — every session already knows.

### Sending — one command

At the end of a working session (or after shipping something):

```
/sync handoff
```

Claude summarizes the session into the handoff template (Done / In flight /
Next / For other devices) and publishes it via
`.claude/skills/sync/scripts/sync.sh`, which commits and pushes to the private
branch from a throwaway worktree — your working tree and branch are untouched.
Quick messages between sessions use `/sync note`; full history is `/sync`
(catchup). The script self-bootstraps the branch on first use and handles
concurrent pushes from two devices (rebase + retry with backoff).

### Content rule (defense in depth)

Even though the channel is private, entries are **summaries**: no veteran PII,
credentials, API keys, chat transcripts, or financial figures — the same rules
as `MASTER.md` and the program repo's README. Private durable material belongs
in the vault (layer 5).

## Per-device setup

**Local machines (MacBook Pro, Beelink PC)** — once per machine:

1. Clone or pull this repo; open Claude Code in the repo folder.
2. Trust the repo when prompted (enables the SessionStart hook and skills).
3. Nothing else — machine git credentials already reach the private org repo;
   the hook adds the `claude-sync` remote automatically on first run.

**Cloud/phone sessions:** the session's git access covers the repos in its
sources. For the auto-catch-up to work there, add **suas-claude-program** to
the Claude Code environment's sources (or ask Claude to `add_repo` it in a
session). Without it, sessions still work — the hook degrades gracefully and
says the channel is unreachable.

> Until the PR adding this system is merged to `main`, only sessions on its
> branch have the hook and skill. After merge, it's every device automatically.

## Which layer do I use?

- "Tell the next session / other computer something" → **`/sync note`** (3)
- "I'm done for today, save my place" → **`/sync handoff`** (3)
- "Change how Claude behaves in this repo" → commit to `.claude/` via PR (1)
- "Change how Claude behaves on every machine globally" → suas-claude-program (2)
- "Record an org fact, decision, or contact forever" → the vault (5)
- "What's the overall project status?" → `MASTER.md` (4)
- "Claude got corrected — make it stick" → `LESSONS.md` (1)

## History

The one-time consolidation snapshot that predates this system lives in
[`docs/claude-device-handoff.md`](./claude-device-handoff.md) (July 5, 2026).
It documented the problem this system now solves continuously.
