#!/usr/bin/env python3
"""Fact-Forcing Gate v2 — PreToolUse hook for Write/Edit/MultiEdit/NotebookEdit.

Purpose: before Claude edits a CODE file for the first time in a session, make
it present grounding facts (importers, duplicates, data formats, the user's
verbatim instruction) so edits stay anchored to reality. The retry of the same
operation is then allowed through.

v2 fix (2026-07-10): v1 gated EVERY file, so plain-prose writes — session
notes, memory files, CLAUDE.md, anything under a logs/ or docs/ folder — were
blocked with "list all files that import/require this file", which is
meaningless for markdown. Each prose write burned a blocked attempt plus a
retry. v2 lets prose and notes through untouched and only gates code.

Fail-open by design: any unexpected input or state error exits 0 (allow).
A guardrail that adds friction must never be able to block work outright.

Cross-platform (Windows/macOS/Linux). Register at USER level, e.g. in
~/.claude/settings.json:

    "hooks": {
      "PreToolUse": [
        {
          "matcher": "Write|Edit|MultiEdit|NotebookEdit",
          "hooks": [
            { "type": "command",
              "command": "python \"%USERPROFILE%\\.claude\\hooks\\fact-forcing-gate.py\"" }
          ]
        }
      ]
    }

(Use `python3 "$HOME/.claude/hooks/fact-forcing-gate.py"` on macOS/Linux.)
"""

import json
import os
import sys
import tempfile
from pathlib import PurePath

# Files that are prose/notes/data-for-humans: never gated.
PROSE_EXTS = {
    ".md", ".markdown", ".mdx", ".txt", ".rst", ".adoc", ".log",
}

# Any path containing one of these directory names is notes/records
# territory, not code: never gated (case-insensitive match on path parts).
PROSE_DIR_NAMES = {
    "docs", "doc", "notes", "logs", "memory", "memories", "journal",
    "scratchpad", "04_logs",  # SUAS-QRF Drive-vault logs folder
}

GATE_MESSAGE = """[Fact-Forcing Gate]

Before editing {path}, present these facts:

1. List ALL files that import/require this file (search the tree - Glob/Grep, or find/grep via Bash)
2. Confirm no existing file serves the same purpose / list the public functions or classes affected
3. If this file reads/writes data files, show field names, structure, and date format (use redacted or synthetic values, not raw production data)
4. Quote the user's current instruction verbatim

Present the facts, then retry the same operation."""


def state_file(session_id: str) -> str:
    state_dir = os.path.join(tempfile.gettempdir(), "claude-fact-gate")
    os.makedirs(state_dir, exist_ok=True)
    safe = "".join(c if c.isalnum() or c in "-_" else "_" for c in session_id)
    return os.path.join(state_dir, f"{safe}.txt")


def already_gated(session_id: str, path: str) -> bool:
    try:
        with open(state_file(session_id), "r", encoding="utf-8") as f:
            return path in {line.rstrip("\n") for line in f}
    except OSError:
        return False


def record_gated(session_id: str, path: str) -> None:
    try:
        with open(state_file(session_id), "a", encoding="utf-8") as f:
            f.write(path + "\n")
    except OSError:
        pass


def main() -> int:
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0  # fail open

    if data.get("tool_name") not in ("Write", "Edit", "MultiEdit", "NotebookEdit"):
        return 0

    tool_input = data.get("tool_input") or {}
    raw_path = tool_input.get("file_path") or tool_input.get("notebook_path") or ""
    if not raw_path:
        return 0

    p = PurePath(raw_path)

    # Exemption 1: prose/notes file extensions.
    if p.suffix.lower() in PROSE_EXTS:
        return 0

    # Exemption 2: anything inside a notes/logs/docs-style directory.
    parts_lower = {part.lower() for part in p.parts}
    if parts_lower & PROSE_DIR_NAMES:
        return 0

    # Exemption 3: OS temp locations (scratch work).
    try:
        tmp = os.path.realpath(tempfile.gettempdir()).lower()
        if os.path.realpath(raw_path).lower().startswith(tmp):
            return 0
    except (OSError, ValueError):
        pass

    # Code file: gate the first attempt this session, allow the retry.
    session_id = str(data.get("session_id") or "default")
    normalized = os.path.normcase(os.path.normpath(raw_path))
    if already_gated(session_id, normalized):
        return 0

    record_gated(session_id, normalized)
    print(GATE_MESSAGE.format(path=raw_path), file=sys.stderr)
    return 2  # exit 2 = block this call, feed stderr back to Claude


if __name__ == "__main__":
    sys.exit(main())
