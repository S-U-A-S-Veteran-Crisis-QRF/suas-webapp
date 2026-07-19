#!/usr/bin/env bash
# Cross-device session sync for suas-webapp.
#
# The dedicated `claude-sync` branch in this repo is the message bus between
# every Claude session on every device (cloud/phone, MacBook Pro, Beelink PC).
# It carries only three small files:
#   HANDOFF.md  — the latest session's handoff (rewritten every handoff; latest wins)
#   JOURNAL.md  — append-only history, newest entry first
#   README.md   — what the branch is (seeded on bootstrap)
#
# Commands:
#   sync.sh catchup            Fetch the branch and print HANDOFF.md + recent journal
#   sync.sh handoff "<title>"  Rewrite HANDOFF.md and prepend a journal entry
#                              (entry body is read from stdin), commit, push
#   sync.sh note "<title>"     Journal-only entry (body from stdin); HANDOFF.md untouched
#
# PRIVACY: this repo is PUBLIC. Entries must never contain veteran PII,
# credentials, message contents, or financial figures (same rule as MASTER.md).
#
# Works offline-degraded: catchup falls back to the last-fetched copy; handoff
# bootstraps the branch as an orphan if it doesn't exist on the remote yet.
# Env overrides (mainly for testing): CLAUDE_SYNC_REMOTE, CLAUDE_SYNC_BRANCH.
set -euo pipefail

REPO_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"
cd "$REPO_DIR"

REMOTE="${CLAUDE_SYNC_REMOTE:-origin}"
SYNC_BRANCH="${CLAUDE_SYNC_BRANCH:-claude-sync}"

device_label() {
  if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
    echo "cloud session"
  else
    hostname 2>/dev/null || echo "unknown device"
  fi
}

# Bounded fetch so a dead network can't hang a session.
fetch_sync() {
  git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=15 \
    fetch --quiet "$REMOTE" "$SYNC_BRANCH" 2>/dev/null
}

have_remote_ref() {
  git rev-parse --verify --quiet "refs/remotes/$REMOTE/$SYNC_BRANCH" >/dev/null 2>&1
}

sync_ref() { echo "refs/remotes/$REMOTE/$SYNC_BRANCH"; }

cmd_catchup() {
  local fresh="yes"
  if ! fetch_sync; then
    fresh="no"
    if ! have_remote_ref; then
      echo "No '$SYNC_BRANCH' branch on '$REMOTE' yet (or offline with nothing cached)."
      echo "Nothing to catch up on. Start the channel by handing off at the end of a session:"
      echo "  $0 handoff \"<one-line summary>\"  <<'EOF' ... entry body ... EOF"
      return 0
    fi
    echo "(offline — showing last-fetched copy of $REMOTE/$SYNC_BRANCH)"
    echo
  fi
  echo "=== HANDOFF — latest cross-device state (fetched: $fresh) ==="
  git show "$(sync_ref):HANDOFF.md" 2>/dev/null || echo "(no HANDOFF.md yet)"
  echo
  echo "=== JOURNAL — most recent entries (newest first, truncated) ==="
  git show "$(sync_ref):JOURNAL.md" 2>/dev/null | head -n 120 || echo "(no JOURNAL.md yet)"
}

read_body() {
  if [ -t 0 ]; then
    echo ""
  else
    cat
  fi
}

# Commit with a safe identity fallback if none is configured on this machine.
commit_in_wt() {
  local wt="$1" msg="$2"
  local id_args=()
  if ! git -C "$wt" config user.email >/dev/null 2>&1; then
    id_args=(-c user.name="Claude Sync" -c user.email="claude-sync@suasqrf.org")
  fi
  git -C "$wt" add -A
  if git -C "$wt" diff --cached --quiet; then
    echo "sync: nothing new to commit"
    return 1
  fi
  git -C "$wt" ${id_args[@]+"${id_args[@]}"} commit --quiet -m "$msg"
}

# Push with retry/backoff; on rejection, rebase onto the remote and retry
# (another device may have pushed between our fetch and push).
push_sync() {
  local wt="$1"
  local delay=2
  local attempt
  for attempt in 1 2 3 4 5; do
    if git -C "$wt" push -u "$REMOTE" "$SYNC_BRANCH" 2>&1; then
      return 0
    fi
    git -C "$wt" pull --rebase "$REMOTE" "$SYNC_BRANCH" >/dev/null 2>&1 || true
    if [ "$attempt" -lt 5 ]; then
      echo "sync: push failed (attempt $attempt), retrying in ${delay}s..." >&2
      sleep "$delay"
      delay=$((delay * 2))
    fi
  done
  echo "sync: push failed after 5 attempts — entry is committed locally on '$SYNC_BRANCH'; push it when back online." >&2
  return 1
}

write_entry() {
  # $1 = mode (handoff|note), $2 = title
  local mode="$1" title="$2"
  local body when dev wt
  body="$(read_body)"
  when="$(date -u '+%Y-%m-%d %H:%M UTC')"
  dev="$(device_label)"
  wt="$(mktemp -d)"
  rmdir "$wt"   # git worktree add wants to create the path itself

  # shellcheck disable=SC2064
  trap "git worktree remove --force '$wt' >/dev/null 2>&1 || true; rm -rf '$wt'; git worktree prune >/dev/null 2>&1 || true" EXIT

  if fetch_sync || have_remote_ref; then
    # Reuse/reset the local sync branch onto the remote tip.
    git worktree add --quiet -B "$SYNC_BRANCH" "$wt" "$(sync_ref)" 2>/dev/null || {
      echo "sync: could not create worktree for '$SYNC_BRANCH' (is it checked out elsewhere?)" >&2
      return 1
    }
  else
    # Bootstrap: brand-new orphan branch carrying only the sync files.
    git branch -D "$SYNC_BRANCH" >/dev/null 2>&1 || true
    git worktree add --quiet --detach "$wt" HEAD
    git -C "$wt" checkout --quiet --orphan "$SYNC_BRANCH"
    git -C "$wt" rm -rf --quiet . >/dev/null 2>&1 || true
    cat > "$wt/README.md" <<'EOF'
# claude-sync — cross-device session bus

This orphan branch is the live sync channel between Claude sessions on all
devices working on suas-webapp. It is never merged to `main`.

- `HANDOFF.md` — the most recent session handoff (each handoff rewrites it)
- `JOURNAL.md` — append-only history of handoffs and notes, newest first

Read it with `/sync` in any Claude session (the SessionStart hook also loads
the latest handoff automatically). Write with `/sync handoff` or `/sync note`.

**Privacy:** the repo is public — no veteran PII, credentials, message
contents, or financial figures, ever. See `docs/cross-device-sync.md` on main.
EOF
  fi

  local entry
  entry="## $when — $dev — $title

$body"

  if [ "$mode" = "handoff" ]; then
    cat > "$wt/HANDOFF.md" <<EOF
# Cross-device handoff — latest state

**When:** $when
**From:** $dev
**Focus:** $title

$body
EOF
  fi

  local journal="$wt/JOURNAL.md"
  local tmp="$wt/.journal.tmp"
  {
    printf '%s\n\n' "$entry"
    [ -f "$journal" ] && cat "$journal"
  } > "$tmp"
  mv "$tmp" "$journal"

  if commit_in_wt "$wt" "sync($mode): $title [$dev]"; then
    push_sync "$wt"
    echo "sync: $mode published to $REMOTE/$SYNC_BRANCH — every device sees it on its next session start (or /sync)."
  fi
}

usage() {
  sed -n '2,20p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
}

cmd="${1:-catchup}"
case "$cmd" in
  catchup|read|status) cmd_catchup ;;
  handoff) [ $# -ge 2 ] || { echo "usage: sync.sh handoff \"<title>\"  (body on stdin)"; exit 1; }
           write_entry handoff "$2" ;;
  note)    [ $# -ge 2 ] || { echo "usage: sync.sh note \"<title>\"  (body on stdin)"; exit 1; }
           write_entry note "$2" ;;
  *) usage ;;
esac
