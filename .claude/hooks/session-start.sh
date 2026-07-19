#!/bin/bash
# SessionStart hook for suas-webapp.
# Runs at the start of every Claude Code session (every device / IP that works
# on this repo). It (1) makes the dev environment ready, (2) catches the session
# up on cross-device state from the claude-sync branch, and (3) loads the
# repo's skill announcements into the session's startup context.
#
# Idempotent and non-interactive. All install output goes to stderr so that
# stdout carries only the hook's JSON (which becomes session context).
set -euo pipefail

PROJ="${CLAUDE_PROJECT_DIR:-.}"

# Install dependencies only in Claude Code on the web (remote) sessions, where
# the container is fresh and its state is cached after the hook completes.
# Local CLI sessions manage their own node_modules.
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  if [ -f "$PROJ/package.json" ]; then
    (cd "$PROJ" && npm install) 1>&2 || \
      echo "session-start: npm install failed (continuing)" 1>&2
  fi
fi

# Cross-device catch-up: fetch the claude-sync message-bus branch from the
# PRIVATE suas-claude-program repo (bounded so a dead network can't hang
# session start) and pull in the latest handoff. The private remote is derived
# from origin's URL by swapping the repo name, so it works on local clones and
# on cloud sessions that have the private repo in their sources. Falls back to
# the last-fetched copy when offline; empty when unreachable (e.g. a cloud
# session without access). See docs/cross-device-sync.md and /sync.
SYNC_HANDOFF=""
SYNC_REPO="suas-claude-program"
if ! git -C "$PROJ" remote get-url claude-sync >/dev/null 2>&1; then
  ORIGIN_URL="$(git -C "$PROJ" remote get-url origin 2>/dev/null || true)"
  if [ -n "$ORIGIN_URL" ]; then
    git -C "$PROJ" remote add claude-sync "${ORIGIN_URL/suas-webapp/$SYNC_REPO}" 2>/dev/null || true
  fi
fi
git -C "$PROJ" -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=10 \
  fetch --quiet claude-sync claude-sync 2>/dev/null || true
if git -C "$PROJ" rev-parse --verify --quiet refs/remotes/claude-sync/claude-sync >/dev/null 2>&1; then
  SYNC_HANDOFF="$(git -C "$PROJ" show claude-sync/claude-sync:HANDOFF.md 2>/dev/null | head -c 4000 || true)"
fi

BASE_CONTEXT='This repo vendors the `launch-your-agent` Claude Code skill at `.claude/skills/launch-your-agent/` (companion: `wrap-up`). It guides a technical founder from concept to a deployed Claude Managed Agent (CMA): interview -> stage & launch -> grade & iterate -> optional scheduled deployment. Invoke it with /launch-your-agent when the user wants to build, launch, or iterate on a managed agent, and /wrap-up to close out a build. Setup and cross-device details are in docs/launch-your-agent.md. Running the skill needs the user'\''s own ANTHROPIC_API_KEY, stored locally and never committed. This repo also auto-enables the `everything-claude-code` plugin (github.com/WorldFlowAI/everything-claude-code) via .claude/settings.json — extra agents (planner, architect, tdd-guide, e2e-runner, ...), skills, slash commands (/tdd, /plan, /e2e, ...), and workflow hooks install on every device that trusts this repo. Cross-device session sync: the `claude-sync` branch of the PRIVATE suas-claude-program repo is the live message bus between all devices/sessions — /sync catches up on the full journal, and `/sync handoff` publishes this session'\''s state before it ends (see docs/cross-device-sync.md). Even on the private channel, entries are summaries: never veteran PII, credentials, or chat transcripts. Self-learning: LESSONS.md at the repo root logs corrections — consult it before acting, append when the user corrects you or you correct yourself.'

# Emit the hook JSON. node is guaranteed for local dev of this Next.js repo and
# on web containers; if it is somehow missing, fall back to the static context
# (correct JSON-escaping of arbitrary handoff text needs a real serializer).
if command -v node >/dev/null 2>&1; then
  BASE_CONTEXT="$BASE_CONTEXT" SYNC_HANDOFF="$SYNC_HANDOFF" node -e '
    const base = process.env.BASE_CONTEXT || "";
    const sync = (process.env.SYNC_HANDOFF || "").trim();
    const ctx = base + (sync
      ? "\n\n--- Latest cross-device handoff (private claude-sync channel; run /sync for the full journal) ---\n" + sync
      : "\n\n(No cross-device handoff loaded: private sync channel unreachable — cloud sessions need suas-claude-program in their sources; /sync handoff publishes.)");
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: ctx }
    }) + "\n");
  '
else
  cat <<JSON
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": $(printf '%s' "$BASE_CONTEXT" | sed 's/"/\\"/g' | awk 'BEGIN{printf "\""} {printf "%s ", $0} END{printf "\""}')
  }
}
JSON
fi
