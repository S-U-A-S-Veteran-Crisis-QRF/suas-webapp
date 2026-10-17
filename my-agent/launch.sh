#!/bin/bash
# Resumable launch for suas-grant-finder. Each step reads IDS.env first and skips
# objects that already exist, so a failed step can be re-run without duplicates.
# Parses responses with python (NOT jq) — the session payload embeds the system
# prompt with control characters that break jq.
set -euo pipefail
cd "$(dirname "$0")"

# --- credentials ---
set -a; source .env; set +a
if [ -z "${ANTHROPIC_API_KEY:-}" ] || [ "${ANTHROPIC_API_KEY}" = "PASTE_YOUR_KEY_HERE" ]; then
  echo "ERROR: put your real key in ./my-agent/.env (ANTHROPIC_API_KEY=sk-ant-...) first." >&2
  exit 1
fi
touch IDS.env; set -a; source IDS.env; set +a

BASE=https://api.anthropic.com/v1
H=(-H "x-api-key: $ANTHROPIC_API_KEY" -H "anthropic-version: 2023-06-01" \
   -H "anthropic-beta: managed-agents-2026-04-01" -H "content-type: application/json")
pyid(){ python3 -c "import json,sys; print(json.JSONDecoder(strict=False).decode(open('$1').read()).get('$2',''))"; }
save(){ grep -q "^$1=" IDS.env 2>/dev/null && sed -i "s|^$1=.*|$1=$2|" IDS.env || echo "$1=$2" >> IDS.env; }

# --- 1. environment ---
if [ -z "${ENV_ID:-}" ]; then
  curl -sS --fail-with-body "$BASE/environments" "${H[@]}" -d @environment.json -o /tmp/env.json
  ENV_ID=$(pyid /tmp/env.json id); save ENV_ID "$ENV_ID"; echo "✅ 📦 environment $ENV_ID"
else echo "↩︎ environment exists: $ENV_ID"; fi

# --- 2. agent (save id AND version) ---
if [ -z "${AGENT_ID:-}" ]; then
  curl -sS --fail-with-body "$BASE/agents" "${H[@]}" -d @agent.json -o /tmp/agent.json
  AGENT_ID=$(pyid /tmp/agent.json id); AGENT_VERSION=$(pyid /tmp/agent.json version)
  save AGENT_ID "$AGENT_ID"; save AGENT_VERSION "$AGENT_VERSION"
  echo "✅ 🤖 agent $AGENT_ID (v$AGENT_VERSION, claude-opus-4-8)"
else echo "↩︎ agent exists: $AGENT_ID (v${AGENT_VERSION:-?})"; fi

# --- 3. session ---
if [ -z "${SESSION_ID:-}" ]; then
  curl -sS --fail-with-body "$BASE/sessions" "${H[@]}" \
    -d "{\"agent\":\"$AGENT_ID\",\"environment_id\":\"$ENV_ID\",\"title\":\"SUAS grant sweep — first run\"}" -o /tmp/sess.json
  SESSION_ID=$(pyid /tmp/sess.json id); save SESSION_ID "$SESSION_ID"; echo "✅ ▶️ session $SESSION_ID"
else echo "↩︎ session exists: $SESSION_ID"; fi

# --- 4. kickoff (built live from first_prompt.txt + outcome.md) ---
if [ "${KICKOFF_SENT:-}" != "yes" ]; then
  EVT=$(python3 -c "import json; print(json.dumps({'type':'user.define_outcome','description':open('first_prompt.txt').read(),'rubric':{'type':'text','content':open('outcome.md').read()},'max_iterations':3}))")
  curl -sS --fail-with-body "$BASE/sessions/$SESSION_ID/events" "${H[@]}" -d "{\"events\":[$EVT]}" -o /tmp/evt.json
  save KICKOFF_SENT yes; echo "✅ 🎯 outcome kickoff sent — run started"
else echo "↩︎ kickoff already sent"; fi

echo
echo "Watch it:  bash poll.sh"
echo "Console:   https://platform.claude.com/workspaces/default/sessions/$SESSION_ID"
echo "           (if it 404s, the key isn't in the 'default' workspace — switch with the workspace picker; Settings → API Keys shows which workspace the key belongs to)"
