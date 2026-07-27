# Agent coordination bridge

A lightweight, **in-repo** bridge that lets two agents — for example **Claude**
and **Hermes** — work this repository *simultaneously* without stepping on each
other. No remote-access grants, no daemons, no open ports: it's just files plus
a git convention, which is the only sync channel this project uses across
devices anyway (see `docs/claude-device-handoff.md`).

## How it works

The repo *is* the transport. Each agent pulls to see the other's state and
publishes (commit + push) to share its own. The file layout guarantees the two
agents never write the **same** file, so git merges cleanly:

| Path | What it is | Who writes it |
|------|-----------|---------------|
| `messages/<agent>.jsonl` | append-only message log, one per agent | only that agent |
| `locks/<slug>.lock` | one file per active claim; existence = held | whoever claims it |
| `BOARD.md` | rendered snapshot of locks + recent messages | `bridge.sh` (generated) |
| `.agent-id` | local identity hint | local only (gitignored) |

A **lock is a file.** Claiming `lib/submitForm.ts` creates
`locks/lib__submitForm.ts.lock` containing the owner and timestamp. If both
agents try to claim the same slug simultaneously, they collide on the same path
and git reports a conflict — which is exactly the contention we want surfaced,
not silently lost.

## The loop each agent follows

1. **Set identity once per session** (the two agents pick different names):
   ```bash
   export BRIDGE_AGENT=claude      # the other agent: export BRIDGE_AGENT=hermes
   ```
2. **Sync** before starting a unit of work: `bridge.sh sync`
3. **Claim** what you're about to touch, then publish so the other sees it:
   ```bash
   bridge.sh claim lib/submitForm.ts "fixing validation"
   bridge.sh publish "claim submitForm"
   ```
4. **Work.** Post progress/questions as you go: `bridge.sh msg "PR #6 rebased, tests green"`
5. **Release + publish** when done:
   ```bash
   bridge.sh release lib/submitForm.ts
   bridge.sh publish "release submitForm"
   ```
6. **Check in** anytime: `bridge.sh status` (or `bridge.sh sync` first for the latest).

## Command reference

```
bridge.sh whoami [name]         show or set this agent's identity
bridge.sh sync                  pull the latest bridge state
bridge.sh status                who's active, held locks, recent messages
bridge.sh claim <slug> [note]   claim a file path, task, or area
bridge.sh release <slug>        release a lock you hold
bridge.sh locks                 list all active locks
bridge.sh msg <text>            post a message to your log
bridge.sh log [n]               last n messages across all agents
bridge.sh board                 regenerate BOARD.md
bridge.sh publish [text]        board + git add/commit/push bridge changes
```

`<slug>` is any label — a file path (`app/page.tsx`), a task (`rebase-pr-6`), or
an area (`crisis-bar`). It's normalized to a safe filename automatically.

## Conventions & guardrails

- **Claim before you edit** anything another agent might also touch. Fine to
  skip for throwaway/local files, but when in doubt, claim.
- **Only release your own locks.** The script refuses to release another
  agent's lock; if one is genuinely stale, agree in `msg` first, then whoever
  owns it releases (or delete the `.lock` file deliberately and note why).
- **`publish` only touches `.claude/bridge/`** — it never sweeps up your code
  changes. Commit those normally, separately.
- **The crisis bar is off-limits** as a coordination target for casual edits —
  per `CLAUDE.md`, any change touching `components/CrisisBar.tsx` / `.crisis-bar`
  is high-risk. Claim it explicitly and flag it in a message so both agents know.
- Nothing here grants machine access. It's cooperative signalling only; it
  assumes both agents are acting in good faith on the same branch.
