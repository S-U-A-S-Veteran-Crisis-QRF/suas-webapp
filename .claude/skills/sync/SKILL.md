---
name: sync
description: Cross-device session sync for this repo — catch up on what other devices/sessions did, and hand off this session's state so every device sees it. Use when the user says "/sync", "sync devices", "catch up", "what happened on the other computer/phone", "hand off", "leave a note for the next session", "pick up where I left off", or when a work session is wrapping up and its state should survive to the next device. Keywords: handoff, journal, claude-sync, cross-device, seamless, continue on another device.
version: 1.0.0
---

# Sync — cross-device session communication

Claude sessions are islands: cloud containers are ephemeral and local
transcripts never leave their machine. SUAS bridges them with the
**`claude-sync` orphan branch of the PRIVATE `suas-claude-program` repo** —
the message bus between every session on every device. It is deliberately NOT
in this public website repo: session state stays private. The remote is
derived automatically from origin's URL (repo-name swap), so it works on local
clones and on cloud sessions that have `suas-claude-program` in their sources.

- `HANDOFF.md` on that branch = the latest session's state (rewritten each handoff)
- `JOURNAL.md` = append-only history, newest first

**Receiving is automatic**: the SessionStart hook fetches the branch and loads
the latest handoff into every session's context on every device. This skill is
how you read the full history and, most importantly, how you **send**.

## The one rule

Even though the channel is private, entries are summaries — never veteran PII,
credentials, API keys, chat transcripts, or financial figures (same rules as
`MASTER.md` and the program repo's README). And never move the channel to a
public repo: branches of public repos are public (see `LESSONS.md`).

## Commands

All via the deterministic script (do not reimplement its git logic ad hoc):

```bash
# Catch up: latest handoff + recent journal (works offline from last fetch)
bash .claude/skills/sync/scripts/sync.sh catchup

# Hand off this session's state (rewrites HANDOFF.md + prepends to JOURNAL.md)
bash .claude/skills/sync/scripts/sync.sh handoff "<one-line title>" <<'EOF'
<entry body — see template below>
EOF

# Quick journal-only note (doesn't replace the standing handoff)
bash .claude/skills/sync/scripts/sync.sh note "<one-line title>" <<'EOF'
<short message for other devices/sessions>
EOF
```

The script auto-bootstraps the branch on first ever use, retries pushes with
backoff, and rebases if another device pushed concurrently. It never touches
the current working tree (it uses a throwaway worktree).

## Handoff entry template

```markdown
**Done:** what shipped this session (PRs, commits, decisions).
**In flight:** branches/PRs open, waiting on what.
**Next:** the first thing the next session should do.
**For other devices:** anything device-specific (e.g. "MacBook: pull main and
re-trust the repo hook", "phone sessions: PR #N needs a merge decision").
```

Keep it under ~30 lines. It becomes every future session's starting context.

## When to act without being asked

- **Session start / "catch up" / "where were we":** run `catchup` and summarize.
- **Session end** ("that's all for today", "wrap up", a task just shipped):
  offer — or if the user asked for seamless sync, just do — a `handoff`
  summarizing the session. A session that ends without a handoff is invisible
  to every other device.
- **After opening/merging a PR or changing shared config:** a `note` so other
  devices know to pull.

## Relationship to the other sync layers

| Layer | Channel | Cadence |
|-------|---------|---------|
| Repo tooling (`.claude/`, CLAUDE.md) | this repo, merged to `main` | on merge + pull |
| Global program (`~/.claude` skills/agents) | `suas-claude-program` `main` + its `sync.sh` | nightly autopilot |
| **Session state / device messages** | **`claude-sync` branch of `suas-claude-program` (this skill)** | every session |
| Org memory (second brain) | Obsidian vault via Google Drive | per vault contract |
| Public status dashboard | `MASTER.md` on `main` | daily routine |

Durable org facts belong in the vault; live "what's happening right now"
belongs here. Full map: `docs/cross-device-sync.md`.
