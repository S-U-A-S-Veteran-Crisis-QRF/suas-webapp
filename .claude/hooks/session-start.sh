#!/bin/bash
# SessionStart hook for suas-webapp.
# Runs at the start of every Claude Code session (every device / IP that works
# on this repo). It (1) makes the dev environment ready and (2) loads the
# launch-your-agent skill into the session's startup context.
#
# Idempotent and non-interactive. All install output goes to stderr so that
# stdout carries only the hook's JSON (which becomes session context).
set -euo pipefail

# Install dependencies only in Claude Code on the web (remote) sessions, where
# the container is fresh and its state is cached after the hook completes.
# Local CLI sessions manage their own node_modules.
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  if [ -f "${CLAUDE_PROJECT_DIR:-.}/package.json" ]; then
    (cd "${CLAUDE_PROJECT_DIR:-.}" && npm install) 1>&2 || \
      echo "session-start: npm install failed (continuing)" 1>&2
  fi
fi

# Announce the vendored skill so the agent is aware of it from the first turn.
cat <<'JSON'
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "This repo vendors the `launch-your-agent` Claude Code skill at `.claude/skills/launch-your-agent/` (companion: `wrap-up`). It guides a technical founder from concept to a deployed Claude Managed Agent (CMA): interview -> stage & launch -> grade & iterate -> optional scheduled deployment. Invoke it with /launch-your-agent when the user wants to build, launch, or iterate on a managed agent, and /wrap-up to close out a build. Setup and cross-device details are in docs/launch-your-agent.md. Running the skill needs the user's own ANTHROPIC_API_KEY, stored locally and never committed."
  }
}
JSON
