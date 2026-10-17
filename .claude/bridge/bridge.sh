#!/usr/bin/env bash
#
# bridge.sh — in-repo coordination bridge for two agents (e.g. Claude + Hermes)
# working the same repository simultaneously.
#
# The repo itself is the transport: state lives in .claude/bridge/, and agents
# stay in sync by pulling and publishing. The layout is designed so the two
# agents never write the *same* file, so git merges without conflicts:
#
#   .claude/bridge/messages/<agent>.jsonl   one append-only log per agent
#   .claude/bridge/locks/<slug>.lock        one file per active claim
#   .claude/bridge/BOARD.md                  rendered snapshot (read-only view)
#
# A lock is just a file. Its existence means "held"; its contents say by whom.
# Two agents claiming the same slug at once collide on the same path — git
# surfaces that as a conflict, which is exactly the contention we want to catch.
#
# Usage:
#   bridge.sh whoami [name]          show or set this agent's identity
#   bridge.sh sync                   pull the latest bridge state (git pull)
#   bridge.sh status                 print who's active, held locks, recent msgs
#   bridge.sh claim <slug> [note]    claim a lock (a file path, task, or area)
#   bridge.sh release <slug>         release a lock you hold
#   bridge.sh locks                  list all active locks
#   bridge.sh msg <text>             post a message to your log
#   bridge.sh log [n]                show the last n messages across all agents
#   bridge.sh board                  regenerate BOARD.md
#   bridge.sh publish [text]         board + git add/commit/push bridge changes
#
# Identity resolves from (first wins): $BRIDGE_AGENT env var, the name saved by
# `whoami <name>`, else "claude". Set it once per session:
#   export BRIDGE_AGENT=claude     (and the other agent: export BRIDGE_AGENT=hermes)

set -euo pipefail

BRIDGE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOCK_DIR="$BRIDGE_DIR/locks"
MSG_DIR="$BRIDGE_DIR/messages"
BOARD="$BRIDGE_DIR/BOARD.md"
ID_FILE="$BRIDGE_DIR/.agent-id"       # local-only identity hint (gitignored)

mkdir -p "$LOCK_DIR" "$MSG_DIR"

now()  { date -u +"%Y-%m-%dT%H:%M:%SZ"; }
die()  { echo "bridge: $*" >&2; exit 1; }

agent_id() {
  if [ -n "${BRIDGE_AGENT:-}" ]; then echo "$BRIDGE_AGENT"; return; fi
  if [ -f "$ID_FILE" ]; then cat "$ID_FILE"; return; fi
  echo "claude"
}

# turn an arbitrary claim label into a safe filename slug
slugify() { echo "$1" | tr '[:upper:]' '[:lower:]' | sed -e 's#[^a-z0-9._/-]#-#g' -e 's#/#__#g' -e 's#-\{2,\}#-#g'; }

# JSON-escape a string for embedding in a .jsonl line (no jq dependency)
json_escape() {
  local s="$1"
  s="${s//\\/\\\\}"; s="${s//\"/\\\"}"
  s="${s//$'\t'/\\t}"; s="${s//$'\n'/\\n}"; s="${s//$'\r'/}"
  printf '%s' "$s"
}

cmd_whoami() {
  if [ $# -ge 1 ]; then echo "$1" > "$ID_FILE"; echo "identity set to: $1"; else echo "$(agent_id)"; fi
}

cmd_sync() {
  local branch; branch="$(git -C "$BRIDGE_DIR" rev-parse --abbrev-ref HEAD)"
  echo "syncing bridge state (git pull origin $branch)..."
  git -C "$BRIDGE_DIR" pull --no-edit origin "$branch"
}

cmd_claim() {
  [ $# -ge 1 ] || die "claim needs a <slug> (file path, task, or area)"
  local raw="$1"; shift
  local note="${*:-}"
  local slug; slug="$(slugify "$raw")"
  local f="$LOCK_DIR/$slug.lock"
  local me; me="$(agent_id)"
  if [ -f "$f" ]; then
    local owner; owner="$(sed -n 's/^owner=//p' "$f")"
    if [ "$owner" = "$me" ]; then
      echo "you ($me) already hold '$raw'"; return 0
    fi
    die "'$raw' is already held by $owner (since $(sed -n 's/^since=//p' "$f")). Coordinate before overriding."
  fi
  {
    echo "owner=$me"
    echo "label=$raw"
    echo "since=$(now)"
    [ -n "$note" ] && echo "note=$note"
  } > "$f"
  echo "claimed '$raw' as $me -> ${f#$BRIDGE_DIR/}"
  echo "   remember to: bridge.sh publish \"claim $raw\"   so the other agent sees it"
}

cmd_release() {
  [ $# -ge 1 ] || die "release needs a <slug>"
  local slug; slug="$(slugify "$1")"
  local f="$LOCK_DIR/$slug.lock"
  local me; me="$(agent_id)"
  [ -f "$f" ] || die "no active lock for '$1'"
  local owner; owner="$(sed -n 's/^owner=//p' "$f")"
  [ "$owner" = "$me" ] || die "'$1' is held by $owner, not you ($me). Refusing to release someone else's lock."
  rm -f "$f"
  echo "released '$1'"
}

cmd_locks() {
  local any=0
  shopt -s nullglob
  for f in "$LOCK_DIR"/*.lock; do
    any=1
    printf "  [%s] %s  (since %s)\n" \
      "$(sed -n 's/^owner=//p' "$f")" \
      "$(sed -n 's/^label=//p' "$f")" \
      "$(sed -n 's/^since=//p' "$f")"
    local n; n="$(sed -n 's/^note=//p' "$f")"; [ -n "$n" ] && printf "        note: %s\n" "$n"
  done
  [ "$any" = 0 ] && echo "  (no active locks)"
}

cmd_msg() {
  [ $# -ge 1 ] || die "msg needs text"
  local me; me="$(agent_id)"
  local line
  line="{\"ts\":\"$(now)\",\"from\":\"$me\",\"text\":\"$(json_escape "$*")\"}"
  echo "$line" >> "$MSG_DIR/$me.jsonl"
  echo "posted as $me"
}

cmd_log() {
  local n="${1:-15}"
  shopt -s nullglob
  local files=("$MSG_DIR"/*.jsonl)
  [ ${#files[@]} -eq 0 ] && { echo "  (no messages yet)"; return; }
  # merge all agents' logs, sort by the leading ts field, show last n
  cat "${files[@]}" \
    | sed -E 's/^\{"ts":"([^"]+)","from":"([^"]+)","text":"(.*)"\}$/\1  \2:  \3/' \
    | sort | tail -n "$n"
}

cmd_board() {
  {
    echo "# Bridge board"
    echo
    echo "_Auto-generated by \`bridge.sh board\`. Do not edit by hand — edits are overwritten._"
    echo
    echo "**Rendered:** $(now)"
    echo
    echo "## Active locks"
    echo
    local any=0
    shopt -s nullglob
    for f in "$LOCK_DIR"/*.lock; do
      any=1
      echo "- \`$(sed -n 's/^label=//p' "$f")\` — held by **$(sed -n 's/^owner=//p' "$f")** since $(sed -n 's/^since=//p' "$f")"
      local n; n="$(sed -n 's/^note=//p' "$f")"; [ -n "$n" ] && echo "  - note: $n"
    done
    [ "$any" = 0 ] && echo "_None._"
    echo
    echo "## Recent messages"
    echo
    echo '```'
    cmd_log 20
    echo '```'
  } > "$BOARD"
  echo "board written -> ${BOARD#$BRIDGE_DIR/}"
}

cmd_status() {
  echo "you are: $(agent_id)"
  echo
  echo "active locks:"
  cmd_locks
  echo
  echo "recent messages:"
  cmd_log 10
}

cmd_publish() {
  cmd_board >/dev/null
  local branch; branch="$(git -C "$BRIDGE_DIR" rev-parse --abbrev-ref HEAD)"
  local msg="${*:-bridge: update coordination state}"
  git -C "$BRIDGE_DIR" add "$BRIDGE_DIR"
  if git -C "$BRIDGE_DIR" diff --cached --quiet; then
    echo "nothing to publish"; return 0
  fi
  git -C "$BRIDGE_DIR" commit -m "$msg" >/dev/null
  echo "committed: $msg"
  local attempt=1 delay=2
  while [ $attempt -le 5 ]; do
    if git -C "$BRIDGE_DIR" push -u origin "$branch"; then echo "pushed to $branch"; return 0; fi
    [ $attempt -eq 5 ] && die "push failed after retries"
    echo "push failed; retrying in ${delay}s..."; sleep "$delay"
    delay=$((delay*2)); attempt=$((attempt+1))
  done
}

main() {
  [ $# -ge 1 ] || { grep -E '^#( |$)' "$0" | sed 's/^# \{0,1\}//'; exit 0; }
  local cmd="$1"; shift
  case "$cmd" in
    whoami)  cmd_whoami "$@";;
    sync)    cmd_sync "$@";;
    status)  cmd_status "$@";;
    claim)   cmd_claim "$@";;
    release) cmd_release "$@";;
    locks)   cmd_locks "$@";;
    msg)     cmd_msg "$@";;
    log)     cmd_log "$@";;
    board)   cmd_board "$@";;
    publish) cmd_publish "$@";;
    -h|--help|help) grep -E '^#( |$)' "$0" | sed 's/^# \{0,1\}//';;
    *) die "unknown command '$cmd' (try: bridge.sh help)";;
  esac
}

main "$@"
