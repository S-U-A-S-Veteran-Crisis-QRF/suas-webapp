# SUAS Veteran Crisis Q.R.F. — Brand & Messaging Review

An expert-lens audit of the current brand identity across the live site copy:
mission and positioning, naming, voice and tone, audience fit, trust and
transparency, the donor journey, crisis-messaging ethics, and alignment with
modern nonprofit standards (Candid/GuideStar transparency norms, BBB Wise
Giving expectations, M+R Benchmarks, NextAfter donation-page practice,
StoryBrand-style beneficiary-as-hero framing, and 988/Safe Messaging
guidelines). Every finding cites the file and line where the copy lives.

---

## 1. Executive summary

The brand's foundation is unusually strong in exactly the place most
early-stage nonprofits fail: **honesty discipline**. The permanent crisis bar,
the is/is-not boundaries, the "Honest claim register," and the refusal to
fabricate metrics or partners form a genuine differentiator that sophisticated
funders will notice. The positioning ("support before everyday struggles
become crises") is repeated with real discipline sitewide, and the
audience-segmented architecture is modern.

The weaknesses cluster into four themes. **First, the name is a locked box:**
neither "SUAS" nor "Q.R.F." is ever expanded anywhere on the site, the name
renders five different ways, and the strongest tagline candidate ("No one is
left behind") sits invisible in social-share metadata. **Second, the
organization is anonymous:** no founder, board, team, story, address, or
privacy policy — while the site asks veterans to trust it with mental-health
signals and asks donors for money next to a dead IRS-letter link. **Third, the
App Demo contradicts the brand's own safety guardrail**, promising "Emergency
services, one tap away" and "A vehicle is heading to you now. Stay where you
are" on a site that says "SUAS is not emergency care" on every page.
**Fourth, the donor journey is below modern standard:** an off-site PayPal
link with no story, no giving levels, no email capture, and no stewardship
promise. All four are fixable with copy and a handful of small pages — none
requires new product work.

## 2. Brand identity snapshot (in the site's own words)

- **Name / lockup:** "SUAS Veteran Crisis Q.R.F." (`components/Header.tsx:18`,
  `app/layout.tsx:10`) — acronyms never expanded.
- **Core promise:** "helps veterans check in, stay connected to trusted
  support, and access help before everyday struggles become serious crises"
  (`app/page.tsx:17-19`, `app/about/page.tsx:42-45`).
- **Category label:** "Crisis-prevention infrastructure for veterans"
  (`app/page.tsx:70`, `app/layout.tsx:18`).
- **Mechanism:** check-in → support signal → trusted circle → resources →
  follow-up (`app/page.tsx:146-150`).
- **Stage framing:** "a nonprofit veteran crisis-prevention and
  care-coordination concept … pilot planning, not live clinical deployment"
  (`app/about/page.tsx:42-45,69-71`).
- **Legal identity:** California 501(c)(3), EIN 88-3249428
  (`components/Footer.tsx:43`, `app/donate/page.tsx:107`).
- **Guardrail:** "In crisis? Veterans Crisis Line — call 988, press 1 or text
  838255. SUAS is not emergency care." (`components/CrisisBar.tsx:3-6`).

---

## 3. Strengths

### Safety and honesty culture (the brand's real differentiator)

- **Permanent, correct crisis routing on every page.** The crisis bar renders
  first in the body sitewide with veteran-specific details right — 988 press 1,
  text 838255, scope disclaimer in the same sentence
  (`components/CrisisBar.tsx:3-6`, `app/layout.tsx:45`).
- **Exceptional honest-claims culture.** The counties page publishes a
  three-column "Honest claim register" (can claim / cannot claim / proof
  needed) explicitly disclaiming HIPAA compliance, VA approval, and clinical
  validation (`app/counties/page.tsx:72-104`). The safety page's is/is-not
  pairing (`app/safety/page.tsx:48-67`) is model boundary-setting.
- **No fabricated proof.** Every mock UI is labeled "Demo · sample data,"
  partners are honestly marked "(seeking)," queue names say "Sample veterans ·
  not real cases" (`app/page.tsx:42,60`, `app/nonprofits/page.tsx:96-98`).
- **Safe-messaging-compliant tone.** No method mentions, no sensationalized
  statistics, strengths-based family guidance (`app/families/page.tsx:39-58`).
- **Signal system consistently de-clinicalized.** "A coordination level (green
  through red), not a clinical label or guarantee"
  (`app/veterans/page.tsx:54`, `app/how-it-works/page.tsx:202-204`).

### Positioning and architecture

- **Disciplined, repeatable core promise** used nearly verbatim on the
  homepage, About, metadata, and donate page — rare message discipline for a
  young org (`app/page.tsx:15-19`, `app/about/page.tsx:24-25`).
- **Crisp theory of change** carried by a coherent five-step lexicon used
  identically everywhere (`app/page.tsx:72-74,146-150`).
- **Modern audience-segmented IA:** constituent-pathway nav (Veterans /
  Families / Nonprofits / Counties) with jargon-free labels and dedicated
  intake forms (`lib/nav.ts:4-12`).
- **A single primary conversion action matched to stage:** pilot recruitment
  is the persistent header CTA and the closing band on most pages
  (`components/Header.tsx:28-30`, `app/page.tsx:181-189`).

### Copy craft (where the voice is at its best)

- **The Families page is the tonally strongest page on the site** — "You don't
  need the right words — you need to stay," "You're not the case manager"
  (`app/families/page.tsx:44-56,94`).
- **The HALT section is the best writing on the site** — vivid, concrete,
  teaches the Hungry/Angry/Lonely/Tired mechanism and turns it into an
  instruction (`app/app/page.tsx:44-52`).
- **Beneficiary-as-hero headlines:** "Veterans should not have to reach a
  breaking point before support shows up" (`app/page.tsx:15`); "Check in
  without judgment" (`app/veterans/page.tsx:22`).
- **Concrete, observable human detail** instead of clinical abstraction —
  "nightmares, skipped meals, avoiding calls" (`app/page.tsx:93-101`).

### Trust fundamentals already in place

- **Verifiable legal identity sitewide** — state, 501(c)(3), EIN in the footer
  of every page; textbook Section 170 tax substantiation at the point of
  giving (`components/Footer.tsx:43`, `app/donate/page.tsx:106-110`).
- **A real, working donation rail** through PayPal Giving Fund, with the 0%
  fee correctly noted (`app/donate/page.tsx:54-55,125-130`).
- **Real, direct contact channels** — a named person's email and a dialable
  phone number, repeated in the form-failure fallback
  (`app/contact/page.tsx:28-33`, `lib/submitForm.ts:29`).
- **"Where support goes" ties gifts to bounded pilot milestones**, including a
  countable target of 25-50 veterans (`app/donate/page.tsx:66-94`).
- **Complete social-share metadata** (per-page OG/Twitter cards) — better than
  the typical small-nonprofit baseline (`app/layout.tsx:7-39`).
- **Baseline accessibility engineering** — ARIA nav state, `aria-invalid` form
  styling, descriptive alt text (`components/Header.tsx:37-38`).

---

## 4. Weaknesses

Ordered by theme; severity marked per finding. High-severity findings below
were adversarially double-checked against the codebase.

### Theme A — The name is a locked box

- **[HIGH] Neither "SUAS" nor "Q.R.F." is ever expanded anywhere on the
  site.** The About page is literally titled "Why SUAS exists" and never says
  what SUAS stands for (`app/about/page.tsx:22-26`, `components/Header.tsx:18`).
  *Fix:* expand both acronyms once at first mention on Home/About and in the
  footer brand block — and own the QRF metaphor deliberately ("the quick
  reaction force that arrives before the crisis — a meal, a ride, a bed, not
  sirens"), which converts the military heritage from confusion into meaning.
- **[MEDIUM] Five inconsistent renderings of the org name** — "SUAS…",
  "S.U.A.S.…", bare "S.U.A.S.", "S.U.A.S. QRF", "SUAS QRF"
  (`components/Header.tsx:18` vs `components/Footer.tsx:17,43` vs
  `app/donate/page.tsx:107`). *Fix:* one canonical public rendering
  (recommend unpunctuated "SUAS Veteran Crisis QRF") plus one legal rendering
  used only in tax/copyright text.
- **[MEDIUM] "SUAS" collides with "sUAS" — small unmanned aircraft systems** —
  a standard DoD/FAA acronym this exact audience knows cold; two stacked
  military acronyms can read as a drone program (`app/layout.tsx:8-10`).
  *Fix:* can't rename overnight; mitigate by expanding at first mention and
  leading SEO titles with the descriptive phrase.
- **[MEDIUM] No tagline — and the best candidate is invisible.** "No one is
  left behind." appears exactly once, inside the donate page's OG metadata
  (`app/donate/page.tsx:8`), never on a rendered page. *Fix:* promote it to
  the footer lockup, homepage hero, and default share description.
- **[LOW] The product has no name** — "the app demo," "the MVP demo," "check-in
  demo," "veteran dashboard demo" (`lib/nav.ts:10`, `app/page.tsx:22`,
  `app/app/page.tsx:24`). *Fix:* give the app one working noun before pilot
  recruitment starts.
- **[LOW] Garbled footer attribution** — "Owned site for S.U.A.S." is not
  idiomatic and truncates the legal name (`components/Footer.tsx:17`).

### Theme B — The demo contradicts the brand's own guardrail

- **[HIGH] "Emergency services, one tap away" directly contradicts "SUAS is
  not emergency care."** The app page headline (`app/app/page.tsx:90`) and the
  demo's "Emergency Ride" / "Veteran Emergency Services · Santa Clara County"
  labels (`components/CrisisDemoApp.tsx:51,155,201`) collide with the crisis
  bar one screen above and the safety page's first "is not" item
  (`app/safety/page.tsx:61`). *Fix:* reserve "emergency" exclusively for
  911/988; rename to the site's own vocabulary ("A meal, a ride, a bed — one
  tap away").
- **[HIGH] The interactive demo has no in-frame demo labeling and makes
  real-sounding dispatch promises** — "A vehicle is heading to you now. Stay
  where you are." (`components/CrisisDemoApp.tsx:57`), "Show this screen at
  the front desk. No payment required." (`:87`). A veteran in genuine need who
  reaches this screen could wait for a vehicle that will never come. *Fix:* a
  persistent in-frame banner on every screen ("DEMO — nothing is dispatched.
  In crisis: call 988, press 1"), most critically on confirmations.
- **[HIGH] Two competing product identities.** Every page sells the check-in →
  signals → trusted-circle platform; the App Demo — the top CTA destination
  sitewide — shows a HALT food/ride/shelter dispatch app with Medi-Cal billing
  details (`app/app/page.tsx:44-52,107-113`). A funder who reads the site and
  then opens the demo meets a different organization. *Fix:* integrate HALT
  as the concrete "resource routing" leg of the one platform, or clearly frame
  it as a future roadmap item.
- **[MEDIUM] Internal/meta copy leaks onto the public App Demo page** — "Say
  the word and these can be built as working demo pages next"
  (`app/app/page.tsx:185-188`) — alongside seven dead `href="#"` links
  (`:156-180`). *Fix:* rewrite in organizational voice; remove dead links.
- **[LOW] Mechanism claims edge past the honest-claim register** — "stopping
  crisis at the trigger point," "built to interrupt them"
  (`app/app/page.tsx:44,50-51`). *Fix:* soften to design intent ("designed to
  help interrupt").

### Theme C — An anonymous organization asking for deep trust

- **[HIGH] No founder, board, team, origin story, or founding year appears
  anywhere** (`app/about/page.tsx` entire page). A no-names org asking
  veterans to share mental-health signals — and donors to fund it — forfeits
  the cheapest trust asset it has: real people. *Fix:* "Who's behind SUAS" on
  About — founder name, photo, service background, first-person why, board
  roster.
- **[HIGH] The IRS determination letter link is a dead 404.** The donate page
  links `/docs/IRS-Determination-Letter.pdf` (`app/donate/page.tsx:112-114`)
  but `public/` contains no `docs/` directory. A broken proof link at the
  exact moment of donor diligence is worse than no link. *Fix:* commit the
  PDF or link the IRS Tax-Exempt Organization Search for EIN 88-3249428.
- **[HIGH] "Privacy-first" is claimed sitewide with no privacy policy page**,
  while live forms collect sensitive family/veteran data
  (`app/page.tsx:33`; `app/how-it-works/page.tsx:221-224` admits the policy is
  a "pilot readiness item"). *Fix:* ship a minimal honest website-scoped
  privacy page now (what forms collect, that Web3Forms processes it,
  retention, deletion contact).
- **[MEDIUM] "100% of donations support the mission"**
  (`app/donate/page.tsx:96-98`) is the classic unverifiable overhead-myth
  claim and contradicts the site's own honesty standard; no 990, budget, or
  financial summary exists anywhere. *Fix:* replace with something falsifiable
  ("volunteer-run; no salaries currently paid" — if true) and link IRS filings.
- **[MEDIUM] No physical or mailing address anywhere** — donors can't verify
  the "California" in "California 501(c)(3)" (`components/Footer.tsx:5-46`,
  `app/contact/page.tsx:27-34`).
- **[MEDIUM] Footer column titled "Trust & governance" contains no governance
  content** — just Safety/About/Contact (`components/Footer.tsx:28-32`).
  *Fix:* populate it (leadership, privacy policy, IRS letter, financials) or
  rename it honestly.
- **[MEDIUM] Zero social proof** — no testimonial, advisor quote, partner
  statement, or pilot-interest count anywhere. Even one authentic named quote
  outperforms zero.
- **[MEDIUM] No social media links** — the org appears single-channel and
  dormant to anyone doing diligence (`components/Footer.tsx:8-41`).
- **[LOW] No third-party validation anchor** — no Candid/GuideStar profile
  link, no IRS search link, no state registry (free to claim, high signal).
- **[LOW] No accessibility statement** despite courting county (ADA Title II)
  partners.

### Theme D — Voice drift and audience gaps

- **[HIGH] "Infrastructure" and systems language dominate veteran-facing
  copy.** The mission H2, the OG description (the first text a stressed family
  member sees in a link preview), and even the Veterans page offer people
  "early-warning support infrastructure" (`app/page.tsx:70`,
  `app/layout.tsx:18`, `app/veterans/page.tsx:43`). Systems language talks
  *about* veterans to funders; it should never be what talks *to* veterans.
  *Fix:* reserve "infrastructure" for counties/nonprofits/donor pages; lead
  human everywhere else.
- **[HIGH] Peer responders — a named core audience the model depends on — have
  no page, no recruitment message, and no pilot-form option.** Their homepage
  card links to the demo page (`app/page.tsx:172`); the pilot form has no
  responder role. *Fix:* a /responders section plus a "Peer Responder" option
  in the pilot form.
- **[HIGH] The Veterans page never engages "I don't need help" resistance or
  concrete privacy fears** — it is the thinnest audience page on the site
  (two sections vs. the families page's four), and "Keep control over your
  privacy" (`app/veterans/page.tsx:24`) is never backed by specifics (VA
  independence, benefits impact, what's stored, who sees it). *Fix:* a
  plain-language privacy block and one section normalizing check-ins for the
  veteran who doesn't feel "in crisis."
- **[MEDIUM] The homepage hero speaks about veterans to no one in particular
  and splits across three competing CTAs** (`app/page.tsx:15,20-30`). *Fix:*
  pick the pilot-stage primary reader, write the hero in second person, one
  primary button.
- **[MEDIUM] Nonprofits page ignores the objections that stall adoption** —
  liability, data ownership, cost, after-hours burden
  (`app/nonprofits/page.tsx:22-77`) — and **[MEDIUM]** splices corporate/
  in-kind sponsors (rideshare, AV providers, health plans) into the wrong
  audience's page (`:107-113`).
- **[MEDIUM] Counties hero talks to the org's lawyers, not county officials**
  — "with safe language and no implied government endorsement"
  (`app/counties/page.tsx:24-26`).
- **[MEDIUM] Families page never addresses the most common family situation:
  the veteran who won't engage** — the model is veteran-initiated
  (`app/families/page.tsx:33`) yet the CTA invites families to reach out with
  no answer for what happens if their veteran isn't ready (`:193`).
- **[MEDIUM] Register whiplash and internal jargon on general pages** —
  "responder burden" on About (`app/about/page.tsx:100`), grade-12 nominal
  prose in the mission lead (`app/page.tsx:72-74`), cryptic step captions like
  "Stable → outreach" (`:146-150`), and "Fewer missed cases" turning veterans
  into cases on the Nonprofits H1 (`app/nonprofits/page.tsx:23`).
- **[MEDIUM] "Breaking point" and crisis-proximity idioms** ("the edge," "the
  last straw," "despair") sit uneasily with Safe Messaging's non-fatalistic
  guidance (`app/page.tsx:15`, `app/app/page.tsx:46-47`).
- **[LOW] Audience breadth outpaces stage** (six audiences + four partner
  types pre-pilot); **[LOW]** the Veterans hero's two buttons go to the same
  URL (`app/veterans/page.tsx:28-33`).

### Theme E — The donor journey is below modern standard

- **[HIGH] The donate page is motivation-poor** — no story, no stakes, no
  statistic; the hero asks donors to fund plumbing ("Support the
  infrastructure that helps veterans get support earlier,"
  `app/donate/page.tsx:48-51`) while the page's best emotional copy sits in
  invisible metadata (`:8`).
- **[HIGH] The giving mechanism is a single off-site PayPal link** — no
  suggested amounts, no giving levels, no monthly option, no dollar-to-outcome
  equivalence ("$25 covers…"), and the donor relationship (data, receipt,
  thank-you) is surrendered to PayPal Giving Fund (`:54-55,129-130`).
- **[HIGH] No email capture or newsletter signup anywhere on the site** —
  email drove ~16% of online nonprofit revenue in the latest M+R Benchmarks,
  and it is the natural low-commitment action for a pre-launch org ("Get
  pilot updates"). Web3Forms can already receive it.
- **[MEDIUM] Donate share metadata makes present-tense program claims the page
  disavows** ("your gift funds peer support, care coordination, and
  connection" vs. "concept in development," `:6-8` vs `:69-71`); **[MEDIUM]**
  hedging density ("concept," "demo," "planned") tells donors the org isn't
  ready — the org is real; only the platform is in demo
  (`app/about/page.tsx:42-45`).
- **[MEDIUM] No employer match, DAF, stock, check, or planned-giving pathways;
  no campaign goal, deadline, or founding-donor urgency**
  (`app/donate/page.tsx:68-71,125-127`).
- **[LOW] Homepage conversion architecture routes attention away from
  donating** (donate absent from both closing bands, `app/page.tsx:186-229`);
  **[LOW]** no post-gift stewardship promise (who issues the receipt, what
  updates donors get).

### Theme F — Safety mechanics (small fixes, outsized stakes)

- **[MEDIUM] Crisis routing disappears below the fold.** `.crisis-bar` is not
  sticky while `header.site` is (`app/globals.css:22,26`) — so after ~40px of
  scroll the only persistent chrome is the nav with "Join Pilot" and "Support
  Mission" buttons. Fundraising CTAs outlive the 988 number. The footer
  Safety column also omits the actual numbers (`components/Footer.tsx:34-39`).
  *Fix:* make the crisis bar sticky (or fold a compact 988 link into the
  header) and put the full routing in the footer.
- **[MEDIUM] Safety warn notes are an inconsistent patchwork** — third-person
  voice ("If someone is in immediate danger, **they** should contact…") on
  pages whose reader may be that someone, drifting details, no chat channel,
  and stacked duplicates on the Veterans page (`app/page.tsx:201-203`,
  `app/veterans/page.tsx:73-81`). *Fix:* one shared `<SafetyNote />` in second
  person with the full canonical routing (911 · 988 press 1 · text 838255 ·
  chat).
- **[LOW] "text 838255" is never tappable** — only 988 gets a `tel:` link;
  no `sms:838255` anywhere (`components/CrisisBar.tsx:4-5`). Texting is the
  lower-activation-energy channel for exactly this audience.
- **[LOW] OG/share images are extreme portrait stock photos** (3200x4800 vs.
  the 1200x630 standard) and will crop unpredictably in link previews
  (`app/layout.tsx:23-30`).

---

## 5. Where the brand diverges from modern nonprofit standards

| Standard (source) | Site today |
|---|---|
| Leadership transparency — names, faces, board (Candid/GuideStar, BBB Wise Giving) | Nobody named anywhere |
| Financial transparency — 990/budget link (Candid, BBB) | None; unverifiable "100%" claim |
| Privacy policy behind any data collection (baseline + "privacy-first" claim) | Missing |
| Email capture as the primary supporter pipeline (M+R, NextAfter) | Absent sitewide |
| Donation page: embedded giving, amounts, monthly, outcome-tied tiers (NextAfter, Classy) | Single off-site PayPal link |
| Social proof — testimonials, partner logos, endorsements | Zero |
| Multi-channel presence — social links in footer (M+R) | None |
| Accessibility statement (W3C WAI; near-mandatory for gov't partners) | Missing (though the underlying code is better than average) |
| Beneficiary-as-hero storytelling (StoryBrand) | Strong in headlines; undercut by "infrastructure" framing |
| Safe messaging (988/VA norms) | Largely excellent; a few "breaking point"/"edge" idioms |

Where the site **beats** the modern standard: boundary discipline, honest-claim
culture, demo labeling, tax substantiation language, per-page share metadata,
and a persistent crisis bar most peer sites lack entirely.

---

## 6. Top 5 priority recommendations

1. **Remove the safety contradictions this week (copy-only, highest stakes).**
   Purge "emergency" from the demo and app page, add a persistent in-frame
   DEMO banner to `CrisisDemoApp`, delete "Stay where you are," make the
   crisis bar sticky, add `sms:838255`, standardize one second-person safety
   note, and fix or remove the dead IRS-letter link.
2. **Put humans on the site.** A "Who's behind SUAS" section with the
   founder's name, face, service background, and first-person story, plus a
   board roster and mailing address. This single change addresses the largest
   trust deficit an anonymous crisis-adjacent org can have.
3. **Unlock the name.** Expand SUAS and Q.R.F. once at first mention, own the
   QRF metaphor ("the quick reaction force that arrives before the crisis"),
   standardize one rendering, and promote "No one is left behind" from hidden
   metadata to the visible tagline.
4. **Ship the missing trust pages:** a website-scoped privacy policy (the
   "privacy-first" claim is currently unbacked), an accessibility statement,
   a populated (or renamed) "Trust & governance" footer column, and free
   third-party anchors (Candid profile, IRS Tax-Exempt Search link).
5. **Rebuild the donate page around motivation:** lead with human stakes (the
   HALT vocabulary is already the site's best), add 3-4 giving tiers tied to
   real pilot outcomes, a founding-donor framing with a concrete launch
   target, an "other ways to give" block (employer match, DAF, check), an
   email-capture form, and replace the "100%" line with a falsifiable claim.

---

*Method note: findings were produced by an eight-dimension analysis (mission
clarity, naming, voice/tone, audience fit, trust/transparency, donor journey,
crisis-messaging ethics, modern-standards benchmark), merged, and then checked
against the codebase; all high-severity findings were independently verified
against the cited files. One claim was refuted in verification and excluded.*
