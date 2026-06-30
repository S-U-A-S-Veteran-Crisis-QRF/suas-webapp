#!/bin/bash
# Regression check: run each eval case against the CURRENT pinned agent version,
# one session per case, collect verdicts. Run before promoting a new version.
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; source .env; source IDS.env; set +a
BASE=https://api.anthropic.com/v1
H=(-H "x-api-key: $ANTHROPIC_API_KEY" -H "anthropic-version: 2023-06-01" \
   -H "anthropic-beta: managed-agents-2026-04-01" -H "content-type: application/json")

for d in evals/case-*/; do
  name=$(basename "$d")
  echo "== $name =="
  curl -sS --fail-with-body "$BASE/sessions" "${H[@]}" \
    -d "{\"agent\":{\"type\":\"agent\",\"id\":\"$AGENT_ID\",\"version\":$AGENT_VERSION},\"environment_id\":\"$ENV_ID\",\"title\":\"eval $name\"}" -o /tmp/s.json
  SID=$(python3 -c "import json;print(json.JSONDecoder(strict=False).decode(open('/tmp/s.json').read())['id'])")
  EVT=$(python3 -c "import json;print(json.dumps({'type':'user.define_outcome','description':open('first_prompt.txt').read(),'rubric':{'type':'text','content':open('outcome.md').read()},'max_iterations':3}))")
  curl -sS --fail-with-body "$BASE/sessions/$SID/events" "${H[@]}" -d "{\"events\":[$EVT]}" >/dev/null
  echo "  session $SID started — poll it, then record the verdict in evals/results-v$AGENT_VERSION.json"
done
