# LESSONS — Claude's corrections log

Self-learning journal for Claude sessions on SUAS work. Every time **Jacob
corrects Claude** or **Claude catches its own mistake**, the lesson gets an
entry here — so the next session (on any device) doesn't repeat it.

**Read this file before acting on anything it covers. Append when corrected.**

Rules for entries:

- Newest first. Keep each entry short: what went wrong → the rule going forward.
- This file is in a **public** repo: state lessons generically. No veteran PII,
  credentials, private-repo contents, or personal details — the *lesson*, not
  the sensitive specifics.
- Tag who caught it: `[user correction]` or `[self-correction]`.
- Don't delete old entries; if a lesson is superseded, add the new one on top
  and mark the old one superseded.

Template:

```markdown
## YYYY-MM-DD — <short title> [user correction | self-correction]
**What happened:** …
**Rule going forward:** …
```

---

## 2026-08-24 — A green build is not a working site; verify the deploy sub-path [self-correction]

**What happened:** The donate page's IRS determination-letter link was reported
404 on the live site. A previous session "fixed" it by adding the missing PDF to
`public/docs/` — the build passed and the file existed, so it looked done. The
link was still broken: this site deploys to a **`/suas-webapp` sub-path**, and
Next.js rewrites `basePath` only for `next/link`, `next/image`, and the custom
image loader — **never for a plain `<a href="/…">`**. The anchor kept resolving
to the domain root. `npm run build` can never catch this, because the bug only
exists in the sub-path build.

**Rule going forward:** For any raw asset URL in a plain `<a>`, `<iframe>`,
`fetch`, or inline style, prepend the base explicitly
(`const base = process.env.NEXT_PUBLIC_BASE_PATH || ""`) — the idiom already in
`app/app/page.tsx`. When fixing a live-site 404, verify by building the way it
deploys (`NEXT_PUBLIC_BASE_PATH=/suas-webapp npm run build`) and grepping the
emitted HTML in `out/`, not by confirming the file exists.

## 2026-08-24 — A lint that exits 0 is not a passing lint [self-correction]

**What happened:** `npm run lint` was documented as a project command but had
never actually linted anything: no ESLint was installed and no config existed,
so `next lint` printed its interactive "How would you like to configure ESLint?"
prompt and **exited 0** — reading as success in every session and any
non-interactive run. Once wired up properly it found 6 real errors on the first
run.

**Rule going forward:** Don't trust a zero exit code from a tool that may not
have run. When a command's output shows a prompt, a setup wizard, or no findings
at all, confirm it did the work (check the tool is installed and configured).
Note `next lint` is deprecated and removed in Next 16 — this repo now calls the
ESLint CLI via `eslint.config.mjs`.

## 2026-07-19 — Check the second brain before re-deriving org facts [self-correction]

**What happened:** Claude concluded the public `help` repo "serves
suasqrf.org" from the `CNAME` file inside it and told Jacob it must stay
public. The vault's `🔥 Recent Context` already recorded that the domain was
repointed to the new webapp on 2026-07-15 (verified by an hourly watchdog).
A config file left in a repo proves history, not present state.

**Rule going forward:** Before asserting an org fact, check the vault (Recent
Context, then the relevant notes) — it is the org's source of truth and the
fact may already be documented. Where live state matters, verify it live;
when two sources conflict, say so instead of picking one silently.

## 2026-07-19 — Inspect a repo before proposing visibility or destructive changes [self-correction]

**What happened:** Claude flagged the public `help` repo as a candidate to
flip private based on its name and visibility alone. When asked to actually do
it, inspection revealed it is the **live Jekyll site serving `suasqrf.org`**
via GitHub Pages (`CNAME` + deploy workflows) — making it private would have
taken the org's domain down.

**Rule going forward:** Never recommend or execute a visibility change,
deletion, or archive without inspecting the target first (clone/read it; look
for `CNAME`, Pages/deploy workflows, live-site configs). A public repo may
*be* a live website — the org's public-repo exception exists precisely for
those.

## 2026-07-19 — Check existing infrastructure before creating new [self-correction]

**What happened:** While fixing the privacy issue below, Claude tried to create
a brand-new private sync repo — before checking whether one already existed.
The org already had `suas-claude-program`, a private repo purpose-built as the
cross-device Claude brain, which was the right home for the sync channel.

**Rule going forward:** Before creating any new repo, file, branch, or system,
inventory what already exists (`list_repos`, repo docs, MASTER.md, the vault).
Extend existing infrastructure instead of duplicating it.

## 2026-07-19 — Session data must never live on public repos [user correction]

**What happened:** Claude built the cross-device session-sync channel (handoffs
+ journal) on a branch of **this repo — which is public** (it must be, for free
GitHub Pages hosting). Jacob corrected it: everything SUAS is private except
the websites that need to be public to operate. The channel was moved to the
private `suas-claude-program` repo.

**Rule going forward:** Before writing any org/session/work data anywhere,
check the destination's visibility. Default to private. Public repos carry
only what must be public to operate (the website itself and its code/docs).
This applies to branches too — every branch of a public repo is public.
