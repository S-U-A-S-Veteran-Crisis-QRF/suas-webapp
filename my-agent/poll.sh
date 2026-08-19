#!/bin/bash
# Poll the run and, when it finishes, download the report. python parser (not jq).
set -euo pipefail
cd "$(dirname "$0")"
set -a; source .env; source IDS.env; set +a
BASE=https://api.anthropic.com/v1
H=(-H "x-api-key: $ANTHROPIC_API_KEY" -H "anthropic-version: 2023-06-01" \
   -H "anthropic-beta: managed-agents-2026-04-01" -H "content-type: application/json")

while :; do
  curl -sS "$BASE/sessions/$SESSION_ID" "${H[@]}" -o /tmp/sess.json
  read -r STATUS VERDICT <<<"$(python3 -c "import json;d=json.JSONDecoder(strict=False).decode(open('/tmp/sess.json').read());print(d.get('status',''),[e.get('result') for e in d.get('outcome_evaluations',[])])")"
  echo "$(date +%H:%M:%S)  status=$STATUS  outcome=$VERDICT"
  case "$STATUS" in
    terminated|idle) break ;;
  esac
  sleep 20
done

echo "--- outputs ---"
curl -sS "$BASE/files?scope_id=$SESSION_ID" "${H[@]}" -o /tmp/files.json
python3 -c "import json;[print(f['id'],f['filename']) for f in json.JSONDecoder(strict=False).decode(open('/tmp/files.json').read()).get('data',[])]"
FID=$(python3 -c "import json;d=json.JSONDecoder(strict=False).decode(open('/tmp/files.json').read());print(next((f['id'] for f in d.get('data',[]) if f['filename'].endswith('grant-report.md')),''))")
if [ -n "$FID" ]; then
  curl -sS "$BASE/files/$FID/content" "${H[@]}" -o grant-report.md
  echo "saved -> my-agent/grant-report.md"
fi
