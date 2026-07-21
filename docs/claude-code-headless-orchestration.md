# Running Claude Code headless — orchestration reference

How to drive Claude Code CLI **autonomously** (from scripts, cron routines,
CI, or another agent) instead of typing at it. This is the mechanism behind
"simple work by user, hard work done by Claude agents": SUAS routines can
delegate whole coding tasks to a one-shot `claude -p` call and get structured
results back.

Distilled from the MIT-licensed
[Hermes Agent Claude Code orchestration guide](https://github.com/NousResearch/hermes-agent/blob/main/skills/autonomous-ai-agents/claude-code/SKILL.md)
(v2.2.0, Hermes Agent + Teknium), trimmed to what applies to SUAS. The full
guide covers tmux/PTY orchestration in depth; go there for anything not
covered here.

---

## The one rule: prefer print mode

`claude -p "task"` runs one task, returns the result, and exits. No TUI, no
trust dialogs, no permission prompts to babysit — the clean path for
automation. Interactive tmux orchestration (the other half of the Hermes
guide) is only needed for multi-turn conversational sessions, which SUAS
routines generally don't need.

```bash
claude -p 'Fix the failing build' \
  --allowedTools 'Read,Edit,Bash(npm run build:*)' \
  --max-turns 10 \
  --output-format json
```

## The safety trio — set all three, every time

| Flag | Why |
|------|-----|
| `--allowedTools '…'` | Whitelist only what the task needs. `Read` alone for reviews; add `Edit`/`Write`/`Bash(pattern *)` only when the task writes. Never blanket `Bash`. |
| `--max-turns <n>` | Caps the agentic loop (print mode only). 5–10 covers most tasks; prevents runaway loops. |
| `--max-budget-usd <n>` | Hard dollar cap. Minimum is ~$0.05 (system-prompt cache creation costs that much). |

Never use `--dangerously-skip-permissions` in SUAS automation. Scoped
`--allowedTools` + print mode gives the same hands-off behavior without
opening every tool. (Print mode already skips the interactive dialogs.)

Tool whitelist syntax supports patterns: `Bash(git commit *)`,
`Bash(npm run lint:*)`, `mcp__<server>__<tool>`.

## Getting machine-readable results

```bash
claude -p 'Summarize what changed' --output-format json --max-turns 3
```

The JSON result carries `result` (the answer), `session_id` (for resuming),
`total_cost_usd`, `num_turns`, and `subtype` (`success`, `error_max_turns`,
`error_budget`) — check `subtype` in scripts instead of parsing prose.

Force a schema when a routine needs typed data:

```bash
claude -p 'List pages missing the crisis banner' --output-format json \
  --json-schema '{"type":"object","properties":{"pages":{"type":"array","items":{"type":"string"}}},"required":["pages"]}' \
  --max-turns 5
```

Give `--json-schema` enough `--max-turns` — Claude must read files before it
can produce the structured answer.

## Feeding context in

- **Pipe known content** instead of letting Claude search for it — cheaper
  and faster: `git diff main...HEAD | claude -p 'Review this diff' --max-turns 1`
- **`--append-system-prompt "text"`** adds standing instructions without
  replacing built-in behavior (almost never use bare `--system-prompt`).
- **`--bare`** skips hooks, plugins, MCP discovery, and CLAUDE.md for the
  fastest CI startup — but it also skips OAuth (needs `ANTHROPIC_API_KEY`)
  and skips this repo's CLAUDE.md guardrails, so for SUAS repo work prefer a
  normal (non-bare) invocation that loads project context.

## Multi-step work across invocations

```bash
# capture session_id from the JSON result, then:
claude -p 'Continue: add the tests' --resume <session_id> --max-turns 5
# or resume the latest session in this directory:
claude -p 'What did you do last time?' --continue --max-turns 1
```

Resumption is per-directory. `--fork-session` branches a session without
overwriting the original. `-w <name>` runs in an isolated git worktree at
`.claude/worktrees/<name>` — the safe way to run parallel tasks in one repo.

## Review recipes

```bash
# quick diff review, read-only
git diff main...feature | claude -p 'Review for bugs, security, style' --max-turns 1

# review a GitHub PR by number
claude -p 'Review this PR thoroughly' --from-pr 42 --max-turns 10
```

## Cost controls that matter

- `--effort low` for mechanical tasks, `high`/`max` only for hard reasoning.
- `--model haiku` for cheap simple tasks; `--fallback-model haiku` in print
  mode degrades gracefully when the primary model is overloaded.
- `--no-session-persistence` in CI so runners don't accumulate saved sessions.
- Fresh sessions per distinct task beat one long session — context quality
  measurably degrades past ~70% window usage.

## Pitfalls (the ones that bite automation)

1. `--max-turns` and `--max-budget-usd` are **print-mode only** — ignored
   interactively.
2. `--continue`/`--resume` only find sessions from the **same working
   directory**.
3. Slash commands don't exist in `-p` mode — describe the task in natural
   language instead.
4. A `subtype` of `error_max_turns` means the task was cut off, not that it
   failed — resume the session with a higher cap if the work matters.

## What we deliberately didn't adopt

The Hermes guide's tmux/PTY half (send-keys dialog handling, pane capture,
parallel tmux fleets) solves problems SUAS doesn't have: our automation runs
through Claude Code web sessions, Routines, and print-mode calls, none of
which need a driven TUI. Same for `--dangerously-skip-permissions` handling —
excluded by policy, not oversight. If a future need for interactive
orchestration appears, start from the source guide.
