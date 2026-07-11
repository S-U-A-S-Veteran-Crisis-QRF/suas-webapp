# SUAS Brand Rollout — 30-Day Implementation Checklist

The execution plan for the new brand defined in
[`branding-review.md`](branding-review.md) (what to fix),
[`audience-personas.md`](audience-personas.md) (who we're talking to),
[`mission-vision-options.md`](mission-vision-options.md) (what we say), and
[`brand-voice.md`](brand-voice.md) (how we say it).

**How to use this:** work top to bottom; each week gates the next. Every
website item names the exact file(s) to change. The **Owner** column splits
work between **Founder** (decisions, assets, accounts — things only you can
do) and **Claude** (implementation in this repo — say the word and each item
becomes a branch/PR).

**Standing guardrails for every step:**
- The Veterans Crisis Line bar (`components/CrisisBar.tsx`) is never removed,
  shrunk, or buried — any change touching it gets visual verification.
- `npm run build` must pass (all 15 pages) before any push.
- New copy must pass the brand-voice test: traces to a pillar, obeys the
  lexicon, reads aloud naturally.

---

## Week 1 (Days 1–7) — Decide, and fix what can't wait

Brand decisions unblock everything; the safety contradictions damage trust
every day they're live, so they ship first — before any visible "rebrand."

### Decisions (Day 1–2) — Founder

- [ ] **D1. Pick the mission/vision pair** (recommended: M2 + V2; QRF-heavy
      alternative: M3 + V4). This single decision unblocks ~80% of the copy work.
- [ ] **D2. Confirm the tagline** — "No one is left behind."
- [ ] **D3. Pick the canonical name rendering** (recommended: "SUAS Veteran
      Crisis QRF" publicly; full legal rendering only in tax/copyright lines).
- [ ] **D4. Approve the five brand pillars and elevator pitch** (edits welcome —
      then they're frozen for 30 days; a brand you keep changing isn't one).

### Safety-critical website fixes (Days 2–5) — Claude

- [ ] **W1. Purge "emergency" from the demo**: rename "Emergency Ride" /
      "Emergency Shelter" / "Veteran Emergency Services" to pillar-5 language
      ("A ride, tonight", "Same-night shelter") — `components/CrisisDemoApp.tsx`;
      retitle "Emergency services, one tap away" — `app/app/page.tsx:90`.
- [ ] **W2. Add persistent in-frame DEMO banner** to every screen of
      `components/CrisisDemoApp.tsx` ("DEMO — nothing is dispatched. In crisis:
      call 988, press 1"); remove "Stay where you are."
- [ ] **W3. Make the crisis bar sticky** above the header —
      `app/globals.css` (`.crisis-bar`); verify on mobile.
- [ ] **W4. Make texting tappable**: `<a href="sms:838255">` in
      `components/CrisisBar.tsx` and all warn notes / form success states.
- [ ] **W5. One shared `<SafetyNote />` component** — second person, full
      routing (911 · 988 press 1 · text 838255 · chat), replacing the
      inconsistent warn notes on Home/Veterans/How-It-Works/Safety; add crisis
      numbers to the footer Safety column — `components/Footer.tsx`.
- [ ] **W6. Fix the dead IRS-letter link** — commit the real PDF to
      `public/docs/IRS-Determination-Letter.pdf` (**Founder provides the
      file**) or swap the link to the IRS Tax-Exempt Org Search for EIN
      88-3249428 — `app/donate/page.tsx:112`.
- [ ] **W7. Remove internal/meta copy and seven dead `#` links** from
      `app/app/page.tsx:150-188`.

### Founder asset gathering (parallel, Days 1–7) — Founder

- [ ] **A1.** Founder photo + 150-word first-person "why SUAS exists" story.
- [ ] **A2.** Board roster with one-line bios (names + roles at minimum).
- [ ] **A3.** Mailing address (PO box is fine) and founding year.
- [ ] **A4.** IRS determination letter PDF (for W6).
- [ ] **A5.** 1–3 authentic quotes from people in the orbit (veteran advisor,
      partner-org contact, family member) — for social proof in Week 3.

---

## Week 2 (Days 8–14) — Identity & trust foundation

The rebrand becomes visible: the name gets unlocked, the org gets a face,
and the trust pages that donors/funders check get built.

### Website — Claude (with Week-1 assets)

- [ ] **W8. Expand the acronyms at first mention** (homepage/About) and own
      the QRF metaphor per the chosen mission — `app/page.tsx`,
      `app/about/page.tsx`, footer brand block `components/Footer.tsx`.
- [ ] **W9. Standardize the name rendering sitewide** per D3; fix the garbled
      "Owned site for S.U.A.S." line — `components/Footer.tsx:17`; sweep all
      renderings (`Header.tsx`, `donate`, `CrisisDemoApp`, metadata).
- [ ] **W10. Surface the tagline**: footer lockup, homepage hero eyebrow,
      default OG description — `components/Footer.tsx`, `app/page.tsx`,
      `app/layout.tsx`.
- [ ] **W11. Adopt mission + vision on-page**: replace "Crisis-prevention
      infrastructure for veterans" as the homepage mission H2
      (`app/page.tsx:70`) and rewrite the About opening — `app/about/page.tsx`.
- [ ] **W12. "Who's behind SUAS" section** on About: founder story, photo,
      board roster, founding year, mailing address (assets A1–A3).
- [ ] **W13. Website privacy policy page** (`app/privacy/page.tsx`): what the
      forms collect, Web3Forms processing, retention, deletion contact —
      scoped to the website, separate from the future app policy. Link from
      footer + all four forms.
- [ ] **W14. Accessibility statement page** (`app/accessibility/page.tsx`):
      WCAG 2.1 AA target, known limitations, barrier-report contact.
- [ ] **W15. Fix the footer "Trust & governance" column**: link privacy,
      accessibility, leadership, IRS letter; add address line —
      `components/Footer.tsx`.
- [ ] **W16. Third-party anchors**: link IRS Tax-Exempt Search; claim
      Candid/GuideStar profile (**Founder**, ~30 min, free) and link the
      profile from footer + donate.
- [ ] **W17. Drop the "100% of donations" line** for a falsifiable claim —
      `app/donate/page.tsx:96-98`.

---

## Week 3 (Days 15–21) — Rewrite the core copy in the new voice

Persona-driven page rewrites, per the voice guide's tone dial. Each page is
its own small PR so changes stay reviewable.

### Website — Claude

- [ ] **W18. Homepage**: hero rewritten second-person for the pilot-stage
      primary reader, ONE primary CTA (Join the pilot); mission lead rewritten
      at kitchen-table register; five-step captions rewritten as tiny plain
      sentences; donate added to one closing band — `app/page.tsx`.
- [ ] **W19. Veterans page**: plain-language privacy block ("What we store,
      who sees it, what we never do — independent of the VA; can't affect
      your benefits"), a "you don't have to be in crisis" section for B1,
      second CTA fixed to point somewhere new — `app/veterans/page.tsx`.
- [ ] **W20. Families page**: add "What if my veteran isn't ready?" block
      (B3's real situation) — `app/families/page.tsx`.
- [ ] **W21. Donate page rebuild**: human-stakes lead (promote the OG line
      on-page), 3–4 giving tiers tied to real pilot outcomes (**Founder
      supplies the pilot budget numbers**), founding-donor framing with a
      target, "Other ways to give" (employer match, DAF, check — uses A3
      address), stewardship promise (who receipts, post-pilot report) —
      `app/donate/page.tsx`.
- [ ] **W22. Email capture**: one-field "Get pilot updates" signup in the
      footer + homepage closing band (Web3Forms can receive it) — new
      component + `components/Footer.tsx`, `app/page.tsx`.
- [ ] **W23. Pilot form roles**: add "Peer Responder" and "Skills Volunteer"
      options — `components/PilotForm.tsx`; add a responder recruitment
      section (V1's page) to `/veterans` or a new `/responders` —
      per personas doc.
- [ ] **W24. Nonprofits & Counties pages**: humanize the "Fewer missed cases"
      H1; add "What a pilot asks of your team" block; rewrite counties hero
      for the county official; move corporate/in-kind pitch to its own
      section/page — `app/nonprofits/page.tsx`, `app/counties/page.tsx`.
- [ ] **W25. Social proof**: place quotes from A5 on homepage + pilot page.
- [ ] **W26. Metadata sweep**: align every OG/Twitter description with the
      new mission (no present-tense program claims); export proper 1200×630
      share images with the tagline (**Founder approves the image**) —
      `app/layout.tsx`, all page metadata.

---

## Week 4 (Days 22–30) — Social media, internal docs, launch

### Social media (Days 22–26) — Founder creates accounts, Claude writes copy

- [ ] **S1. Claim handles**: LinkedIn org page (credibility with counties/
      funders/skills-volunteers) + one community channel (Facebook or
      Instagram — where veteran families are). Same name rendering (D3),
      same tagline, everywhere.
- [ ] **S2. Bios written from the brand kit**: 10-second pitch as the bio;
      link to the site; crisis-line disclaimer in profile ("Not a crisis
      service — in crisis call 988, press 1").
- [ ] **S3. Banner/avatar images** consistent with the new share images (W26).
- [ ] **S4. Launch content, first two weeks** (drafted by Claude, posted by
      Founder): 1) founder story (from A1), 2) the insight post ("warning
      signs never connect in one place"), 3) mission/vision announcement,
      4) pilot recruitment call, 5) responder recruitment call, 6) a pillar
      per post thereafter. Every post passes the voice lexicon.
- [ ] **S5. Add social icons to the site footer** — `components/Footer.tsx`.

### Internal documents (Days 22–28) — Founder (Claude drafts)

- [ ] **I1. Board adoption**: mission + vision formally adopted at a board
      meeting; recorded in minutes (grant applications ask for this).
- [ ] **I2. One-pager** (PDF): mission, vision, pillars, pilot ask, elevator
      pitch, EIN, contact — the leave-behind for D1/D3 meetings.
- [ ] **I3. Grant boilerplate doc**: reusable paragraphs (need statement,
      org description, honest-claims register) in the new voice.
- [ ] **I4. Email signatures**: tagline + site link, consistent rendering.
- [ ] **I5. Donor thank-you template** in-voice, with the stewardship promise.
- [ ] **I6. Pitch fluency**: founder (and any volunteer who speaks publicly)
      can deliver the 30-second pitch from memory, including the two
      follow-up answers.
- [ ] **I7. Point the repo at the brand source of truth**: add a "Brand"
      section to `CLAUDE.md` referencing these five docs so every future
      Claude session writes in-voice automatically.

### Launch & verify (Days 29–30) — Founder + Claude

- [ ] **L1. Full-site read-aloud pass** against the voice guide; Playwright
      visual check of crisis bar on every page; `npm run build` green.
- [ ] **L2. Merge the rollout PRs; confirm GitHub Pages deploy.**
- [ ] **L3. Announce**: social posts (S4 #3), email to existing contacts/
      pilot list (uses W22 list + I5 template).
- [ ] **L4. Update `MASTER.md`** work log and the personas doc if anything
      shifted during rollout.
- [ ] **L5. Day-30 retro**: what got cut, what's still open → becomes the
      next 30-day plan (candidates: /partners page, monthly giving, the
      post-pilot report template).

---

## Timeline at a glance

| Days | Theme | Ships |
|---|---|---|
| 1–2 | **Decide** | Mission/vision pair, tagline, name rendering, pillars approved |
| 2–5 | **Fix what can't wait** | Demo "emergency" purge, DEMO banner, sticky crisis bar, sms link, unified safety note, IRS link, dead links |
| 1–7 | **Gather** (parallel) | Founder story/photo, board roster, address, IRS PDF, first quotes |
| 8–14 | **Identity & trust** | Acronyms expanded, name standardized, tagline live, mission/vision on-page, Who's-behind-SUAS, privacy + accessibility pages, footer governance, Candid profile |
| 15–21 | **Voice rewrite** | Homepage, Veterans, Families, Donate rebuild, email capture, pilot-form roles, nonprofits/counties, social proof, metadata + share images |
| 22–26 | **Social** | Handles claimed, bios, banners, two weeks of content, footer icons |
| 22–28 | **Internal** | Board adoption, one-pager, grant boilerplate, signatures, thank-you template, pitch fluency, CLAUDE.md brand section |
| 29–30 | **Launch** | Verification pass, merge + deploy, announcement, retro |

**Critical path:** D1 (pick the pair) → W11 (mission on-page) → W18–W21
(page rewrites) → W26 (metadata) → L2 (deploy). Everything else can flex
around it. If the 30 days compress, cut from Week 4's social cadence — never
from Week 1's safety fixes or Week 2's trust pages.

**Rough founder time required:** ~1 hr decisions + ~3–4 hrs assets/accounts
+ ~2 hrs internal-doc review + board meeting. The rest is implementable in
this repo on request.
