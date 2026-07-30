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

## 2026-07-30 — Compliance/filing packets are vault work, not repo work [self-correction]

**What happened:** A session asked to prepare a statutory filing produced a packet
containing the org's principal-office street address, officer/agent fields, and
corrected tax-form details. The working branch was in **this public repo**, so
committing the packet there would have published all of it.

**Rule going forward:** Filing packets, corporate records, and anything drawn from
tax or corporate forms go to the **private vault** (Drive) and to the user directly —
never into a public repo, on any branch. What a public branch may carry from that
work is only the generic lesson, like this entry. When a cloud session can't run
`vault-sync.sh` or update `_index.md`, follow the vault's existing
`📥 <date> … fold me in.md` root-note convention instead of leaving an orphan.

## 2026-07-30 — State filing sites are blocked from cloud sessions [self-correction]

**What happened:** Verifying a Secretary of State record failed —
`bizfileonline.sos.ca.gov` and `sos.ca.gov` both got a **403 to CONNECT** from the
egress proxy (an organization policy denial, not a TLS or retry problem). The proxy's
`/__agentproxy/status` endpoint named the blocked host.

**Rule going forward:** Government filing portals are generally unreachable from
cloud sessions. Don't retry or route around a proxy 403 — report the blocked host,
verify the fact from a local/desktop session or a normal browser, and mark anything
depending on it as unverified rather than asserting it. Check
`curl -sS "$HTTPS_PROXY/__agentproxy/status"` to tell a policy denial from a
transient failure.

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
