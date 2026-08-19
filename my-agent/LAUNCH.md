# Launch — suas-grant-finder

Everything is staged. Launching takes **one thing from you: an API key.** Then one command.

## Step 1 — Get an Anthropic API key (your own account)
1. Go to **platform.claude.com → API keys** → create a key. Add a few dollars of credit (a run costs cents).
2. **Note which workspace the key belongs to** — everything the agent creates lands in that workspace, and the Console only shows the selected workspace.

## Step 2 — Put the key in the local env file (never in chat)
Paste it into the file at this absolute path, replacing `PASTE_YOUR_KEY_HERE`:

```
/home/user/suas-webapp/my-agent/.env
```

(`open -t /home/user/suas-webapp/my-agent/.env` on macOS, or `$EDITOR`.) The file
is `chmod 600` and git-ignored. **The key must never go into the chat** — if it
ever does, rotate it.

## Step 3 — (Recommended) fill SUAS's profile
Open `first_prompt.txt` and fill the bracketed fields (501(c)(3) status, state,
budget). It runs without them, but accurate eligibility makes a sharper list.

## Step 4 — Launch and watch
```bash
cd /home/user/suas-webapp/my-agent
bash launch.sh      # creates environment → agent → session → sends the outcome kickoff (resumable)
bash poll.sh        # watches the run; saves grant-report.md here when it finishes (8–10 min is normal)
```

## What you get
`my-agent/grant-report.md`: a ranked, verified table of open funding for SUAS +
drafted letters of inquiry for the top 3. Graded against `outcome.md` automatically.

## Then
Save the first good report as `evals/case-01/expected.md` (your regression
baseline), and see `NEXT-DIRECTIONS.md` for v1 (monthly auto-run) onward. Run
`/wrap-up` to close out: overview refresh, primitives recap, hygiene sweep.
