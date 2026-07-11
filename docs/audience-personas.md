# SUAS Veteran Crisis Q.R.F. — Target Audience & Value Proposition

Companion to [`docs/branding-review.md`](branding-review.md). That review found
the site addresses six audiences at once without defining who it most needs
right now (finding W41) and leads with systems language ("infrastructure")
where human language belongs (W9). This document redefines the target audience
for the pilot stage, sharpens the value proposition, and provides detailed
personas for the three groups the organization runs on: **beneficiaries,
volunteers, and donors**. Every persona is grounded in what the current
materials actually say and promise.

---

## 1. The redefined value proposition

### The master value proposition

> **For veterans carrying stress alone — and the people who love them — SUAS
> is the quick reaction force that arrives *before* the crisis: private
> check-ins, a trusted circle you choose, and real help (a meal, a ride, a
> bed, a follow-up) that shows up while the problem is still small.
> No one is left behind.**

Why this formulation:

- **It resolves the QRF paradox** the branding review flagged: instead of the
  military "quick reaction force" name contradicting a gentle prevention
  product, the value prop *owns* the metaphor — a QRF that deploys before the
  firefight, not after.
- **It leads with people, not plumbing.** "Crisis-prevention infrastructure"
  (the current mission H2, `app/page.tsx:70`) is a funder phrase. Veterans and
  families buy "help that shows up early," not infrastructure.
- **It makes the mechanism concrete** using the site's own best vocabulary:
  check-ins, trusted circle, and the HALT-derived "a meal, a ride, a bed"
  (`app/app/page.tsx:44-52`).
- **It surfaces the buried tagline.** "No one is left behind" currently exists
  only in invisible OG metadata (`app/donate/page.tsx:8`).

### The value-proposition formula, per audience

One promise, translated per constituency — the discipline the site already
shows with its core sentence, extended:

| Audience | Their problem in one line | SUAS's answer in one line |
|---|---|---|
| **Veterans** | "I'm handling it — until the week I can't." | A 60-second private check-in that keeps you connected on your terms, so support reaches you before a hard week becomes a crisis. |
| **Families** | "I see the warning signs, but I don't know what to do that won't make it worse." | Consent-based clarity: you're in the circle when your veteran chooses, with guidance on what genuinely helps — you're not the case manager. |
| **Peer responder volunteers** | "I made it through; I want the mission of helping the next one — without winging it." | A structured follow-up queue, clear escalation boundaries, and a defined lane: you're the trusted contact, never the clinician. |
| **Individual donors** | "I give to veteran causes but can't tell what my money actually changes." | A bounded, countable first mission: fund the 25–50-veteran pilot that tests whether early connection prevents crises — and get the post-pilot report. |
| **Corporate/in-kind partners** | "We want veteran impact that uses what we're good at, not just a logo on a gala." | Your service (rides, meals, beds, coverage) becomes the tap-to-dispatch answer at a veteran's exact moment of need. |
| **Nonprofit partners** | "Outreach goes cold between touchpoints and we find out too late." | A shared responder dashboard so no veteran goes quiet unnoticed — fewer missed follow-ups, visible unresolved cases. |
| **Counties / institutional funders** | "We fund crisis response; nothing upstream connects the early signals." | The coordination layer between existing services — piloted with honest claims, privacy guardrails, and reported results. |

---

## 2. The redefined target audience: tier by stage

The organization is pre-pilot. It does not need six audiences equally; it
needs three *now* and earns the rest with pilot results.

**Tier 1 — needed to launch the pilot (focus 80% of messaging here):**
1. **Beneficiaries:** veterans for the 25–50-person cohort — specifically
   veterans who are *functioning but carrying stress privately*, not veterans
   in acute crisis (the site is explicit it is not emergency care).
2. **Volunteers:** peer responders to staff the trusted-circle/follow-up
   model, plus 1–2 partner nonprofits whose staff act as responders.
3. **Donors:** founding individual donors and one or two institutional/
   corporate partners to fund the pilot budget.

**Tier 2 — activated by the pilot (keep pages, stop competing for the hero):**
families invited into circles by pilot veterans; counties (they will want
pilot data before engaging); corporate in-kind partners at dispatch scale;
the broad donor public.

This tiering matches the site's existing strongest asset — "Join the pilot"
is already the persistent primary CTA (`components/Header.tsx:28-30`).

---

## 3. Beneficiary personas

### Persona B1 — "The Quiet Professional" · Marcus, 34

> *"I'm fine. I've got a job, a family. Other guys had it worse."*

**Snapshot.** Army veteran (two deployments), separated eight years ago.
Works full-time; married, one kid. Sleeps badly, skips meals when stressed,
lets calls from old squadmates go to voicemail. Nothing is "wrong enough" to
call anyone about — which is exactly the profile the homepage describes:
*"Often carry stress privately — nightmares, skipped meals, avoiding calls"*
(`app/page.tsx:93`).

**Main motivations.**
- Stay in control: of his story, his data, and who knows what.
- Not become "a case." He associates help-seeking with clinical systems,
  paperwork, and risk to how he's seen (and, he fears, his benefits).
- Keep faith with his people — he'd answer a squadmate before a system.

**His problem, specifically.** There is no socially acceptable, low-stakes way
to say "this week is getting heavy" before it becomes "I'm in crisis." The
existing options are all high-threshold: therapy, the VA, or a crisis line —
each of which means admitting to a *crisis* he doesn't believe he's having.

**How SUAS solves it.**
- The check-in is private, 60 seconds, plain language — *"how today feels"*
  (`app/page.tsx:120`), not a diagnosis (`app/veterans/page.tsx:54`).
- He chooses the trusted circle — a squadmate, not an institution
  (`app/veterans/page.tsx:58`). Consent-based alerts mean nothing moves
  without him (`app/page.tsx:124`).
- A yellow signal triggers *"light peer outreach"* (`app/page.tsx:57`) — a
  text from a buddy, which his culture permits, instead of an intervention,
  which it doesn't.

**What must be true for him to sign up (objections to answer).** Explicit
independence from the VA; plain statement of what is stored and who sees it;
proof this is for "handling it" veterans, not just people in crisis. (The
branding review found the Veterans page doesn't yet answer these — W14.)

**Message that lands:** "Checking in isn't asking for help. It's staying
connected — on your terms." **Channel:** squadmate word-of-mouth, veteran
Facebook/Reddit groups, VSO posts. **First ask:** try the 60-second demo
check-in, then join the pilot cohort.

---

### Persona B2 — "The Transition Cliff" · Danielle, 29

> *"The Army told me where to be every day for six years. Now it's benefits
> paperwork, a lease I can barely make, and silence."*

**Snapshot.** Navy veteran, separated 14 months ago. Underemployed, waiting
on a benefits decision, housing costs eating savings, far from family. Not
suicidal — but hungry, angry, lonely, and tired in exactly the HALT pattern
the app demo names (`app/app/page.tsx:44-52`). Her stressors are the site's
own list: *"benefits stress, housing pressure"* (`app/page.tsx:86-87`).

**Main motivations.**
- Practical stability first: money, housing, the benefits decision.
- Rebuild structure and belonging after losing the military's built-in
  version of both.
- Be seen as capable — she'll accept "resources" long before "help."

**Her problem, specifically.** Her struggles are administrative and material,
scattered across agencies that don't talk to each other — and every week of
grinding on them alone erodes the sleep, connection, and margin that keep a
person steady. Nobody is watching the compound effect. That is the exact gap
the mission describes: warning signs that *"rarely show up in one place —
until someone is in crisis"* (`app/page.tsx:86-88`).

**How SUAS solves it.**
- **Resource routing is the front door for her** — county-relevant help for
  *"housing, benefits, health, food"* (`app/veterans/page.tsx:62`) framed as
  logistics, not therapy. The HALT dispatch concept (a meal, a ride, a bed)
  meets the material need at the moment it spikes.
- Check-ins catch the compound drift her independence hides; the timeline
  (`app/veterans/page.tsx:66`) shows her — and her chosen circle — the
  pattern before it becomes a cliff.
- A trusted circle rebuilds a small unit around her when her actual unit is
  three states away.

**Objections to answer.** "Will this affect my benefits case?" (data
independence, again); "Is this real help or another referral list?" — the
pilot must demonstrate routing that actually lands.

**Message that lands:** "You handle the mission. We'll connect the support —
housing, benefits, food, people — before the hard weeks stack up."
**Channel:** transition programs (TAP), county veteran service offices,
student-veteran groups. **First ask:** pilot sign-up framed as *getting
early access to the resource network*, not receiving care.

---

### Persona B3 — "The First Witness" · Elena, 58 *(secondary beneficiary)*

> *"He's not himself — short answers, missed dinners. If I push, he shuts
> down. If I wait… I can't think about that."*

**Snapshot.** Mother of a Marine veteran. Lives nearby; sees him weekly. She
is the person the Families page describes: *"Families often see the warning
signs first"* (`app/families/page.tsx:78`) — and sees *"pieces, not the full
picture"* (`app/page.tsx:97`).

**Main motivations.**
- Keep her son safe without violating his trust or dignity.
- Relief from the 2 a.m. helplessness of watching signs she can't interpret
  and can't act on.
- Do the *right* thing — she is terrified of making it worse.

**Her problem, specifically.** She has information but no mandate and no
playbook. Every existing option is nuclear (call a crisis line *about* him,
stage a confrontation) or nothing.

**How SUAS solves it.**
- Membership in his trusted circle — *when he chooses* — turns her from an
  anxious observer into a consented participant
  (`app/families/page.tsx:33,104`).
- The site's own guidance gives her the playbook: *"You don't need the right
  words — you need to stay"*, *"Listening is the support"*, and the crucial
  boundary *"You're not the case manager"* (`app/families/page.tsx:44-56,94`).
- Consent-based alerts mean she learns "light support needed" early — a
  reason to bring dinner over this week — instead of learning everything at
  once, too late.

**Objections to answer.** "What if he won't sign up?" — the review found this
unanswered (W31). The persona needs an explicit path: what she gets from
reaching out anyway (guidance, local resources, how to extend an invitation)
and what SUAS will never do (contact him without consent).

**Message that lands:** "You see it first. SUAS gives you a way to be there —
with his consent, without being the case manager." **Channel:** military
family groups, spouse networks, church/community groups. **First ask:** the
family intake form; the *invitation kit* for her veteran.

---

## 4. Volunteer personas

### Persona V1 — "The Peer Responder" · Ray, 46

> *"A buddy answered the phone for me in '09. That's the only reason I'm
> here. Give me a way to be that guy."*

**Snapshot.** Retired Army NCO, 22 years in. Stable for a decade; active in
a veteran motorcycle group and his VFW post. Has informally talked three
friends through bad nights. Time-rich on evenings/weekends; allergic to
bureaucracy.

**Main motivations.**
- **Mission and purpose** — service didn't end at separation; he misses
  having a defined role where showing up matters.
- Pay a debt forward that he feels personally.
- Peer credibility: he believes (correctly, per the model) that a veteran
  reaches a veteran in ways no professional can.

**His problem, specifically.** Informal helping is unstructured and heavy:
no way to know who needs a call *this* week, no backstop when a situation
exceeds him, no closure on whether his outreach mattered. Burnout in
volunteer peer supporters is real — and the site already knows it, listing
*"responder burden"* as a pilot learning goal (`app/about/page.tsx:100`).

**How SUAS solves it.**
- The **follow-up queue and outreach tracking** (`app/page.tsx:172`) turns
  "worry about everyone all the time" into "these two people, this week" —
  bounded, visible, finishable.
- **Escalation boundaries** (`app/safety/page.tsx:75-101`) give him a bright
  line: green/yellow is his lane (a call, a meal, a ride); red is routed to
  crisis resources — he is never left holding a clinical emergency alone.
- The responder log means his work is *seen* — outreach recorded, loop
  closed (`app/page.tsx:150`).

**Objections to answer.** Time commitment (needs a number: hours/week);
training provided; liability; "what happens when I miss something."
The review found none of this answered anywhere, and no responder option on
the pilot form (W13) — this persona currently has no door to walk through.

**Message that lands:** "You've already been the reason someone made it.
Do it with a queue, a backstop, and a team." **Channel:** VFW/American
Legion posts, veteran MC groups, the pilot's own veteran cohort (best
responders are graduated participants). **First ask:** "Peer Responder"
role on the pilot form + a 30-minute orientation call.

---

### Persona V2 — "The Skills Volunteer" · Priya, 38

> *"I can't be a peer responder — I never served. But I can make sure the
> privacy policy isn't a lie and the app doesn't fall over."*

**Snapshot.** Civilian product designer / attorney / engineer (archetype
spans the professional skills the org needs). Brother-in-law is a veteran.
Has 3–5 hours a week and wants impact she can point to, not envelope
stuffing.

**Main motivations.**
- Use her *actual craft* for something that matters.
- A concrete, finishable contribution with visible before/after.
- Association with an organization whose integrity she can verify — the
  honest-claims culture is a genuine draw for this persona.

**Her problem, specifically.** Veteran causes rarely have well-scoped
professional volunteer roles; she doesn't want to guess where she's useful.

**How SUAS solves it.** The org's own public to-do list is a volunteer job
board: the pilot-readiness checklist is *"3 of 12 items in progress"*
(`app/pilot/page.tsx:73`), and the donate page names the work — privacy &
legal review, consent flows, pilot app build (`app/donate/page.tsx:86-92`).
The branding review adds more scoped tasks: the privacy policy page, the
accessibility statement, share-image design. Each is a bounded professional
project with a shippable artifact.

**Objections to answer.** "Will my work actually ship?" (show the checklist
moving); "Is this org real?" (the anonymity gap — W5 — hurts this persona's
diligence most after donors').

**Message that lands:** "Twelve things stand between veterans and this
pilot. One of them is your specialty." **Channel:** LinkedIn, pro-bono
networks (Taproot, VBA/state-bar pro bono, Tech for Good groups).
**First ask:** pick one checklist item; "Other" role on the pilot form
(better: add a "Skills volunteer" option).

---

## 5. Donor personas

### Persona D1 — "The Founding Donor" · Tom, 62

> *"I don't want to fund another gala. Tell me what it costs to find out if
> this works, and send me the report."*

**Snapshot.** Business owner / retired executive; Vietnam-era veteran father
or Gulf War service himself. Gives $1k–$10k/year across a few veteran causes.
Diligences before he gives: looks up the EIN, reads the 990, wants names.

**Main motivations.**
- **Prevention over rescue** — he has attended the funerals; he wants to
  fund the thing that happens *before* the phone call.
- Founder-stage leverage: being one of the people who made a new thing
  exist, not donor #40,000 to an incumbent.
- Verifiable integrity — he is precisely the reader the "Honest claim
  register" (`app/counties/page.tsx:72-104`) was unknowingly written for.

**His problem, specifically.** Veteran-cause giving feels saturated and
unaccountable: big brands, vague outcomes, overhead myths. He can't tell
what marginal dollar changes what.

**How SUAS solves it.**
- A **bounded, countable, falsifiable first mission**: fund a 25–50-veteran
  pilot with named workstreams (`app/donate/page.tsx:66-94`) and a defined
  learning agenda (`app/about/page.tsx:86-107`). His gift buys an *answer*,
  not a promise.
- The honesty culture — "not audited financials," "no clinical efficacy
  claims" — reads to him as rigor, *if* it's paired with the trust artifacts
  he expects (a working IRS-letter link, a named founder and board, a
  mailing address — currently the gaps W5/W6/W20).
- Founding-donor identity: "one of the first 100 donors who launched the
  pilot," with the post-pilot report as the deliverable.

**Objections to answer.** "Who is behind this?" (anonymity is his #1
blocker); "Where do I see financials?"; "Why PayPal only? I give by check
and DAF" (W37).

**Message that lands:** "Crisis response is funded. Prevention isn't. Fund
the pilot that finds out if early connection keeps veterans out of crisis —
and get the report either way." **Channel:** direct founder outreach,
Rotary/chamber networks, veteran business owner groups. **First ask:** a
named gift toward a specific line item ("veteran outreach: recruit and
support 25–50 veterans," `app/donate/page.tsx:92`).

---

### Persona D2 — "The CSR / In-Kind Partner" · Whitney, 41

> *"We have drivers, kitchens, and rooms. Give us a veteran use case our
> employees will be proud of."*

**Snapshot.** Community-impact / CSR lead at a rideshare or AV company, food
business, hotel group, or health plan — exactly the partner list the site
already names (`app/nonprofits/page.tsx:107-113`). Measured on authentic
local impact and employee engagement, wary of pure logo-washing.

**Main motivations.**
- Impact that uses the company's **core capability** — rides, meals, beds,
  coverage — not just cash.
- A story with a face and a moment ("a veteran tapped a button and our
  driver was there") for employees and customers.
- Low reputational risk: honest claims, no scandal surface, veterans as a
  universally respected cause.

**Her problem, specifically.** Most veteran-cause sponsorships are checks
and banners; her leadership wants *operational* generosity with measurable
units (rides given, meals served, nights sheltered).

**How SUAS solves it.** The HALT dispatch model makes her service **the
product**: "Emergency Ride" *is* her fleet; "a hot meal now" *is* her
kitchen; "same-night shelter" *is* her rooms (`components/CrisisDemoApp.tsx`,
renamed per the branding review's safety fix). Every dispatch is a countable
impact unit tied to a veteran's exact moment of need — the most natural
in-kind story in the space.

**Objections to answer.** Volume/logistics commitments; liability at the
handoff; brand-safety review of all copy (the "Emergency" language fix is a
precondition — W3); "is this org real" diligence (W5/W6 again).

**Message that lands:** "The moment a veteran needs a ride, a meal, or a
bed — make it your company that shows up." **Channel:** direct partnership
outreach; a dedicated /partners page (the review recommends splitting this
audience off the Nonprofits page — W29). **First ask:** a pilot-scale
in-kind commitment (e.g., 100 rides / 500 meals / 25 room-nights).

---

### Persona D3 — "The Program Officer" · Marcus D., 50 *(institutional)*

> *"Everyone funds the crisis line. Show me the layer that keeps the phone
> from ringing — and show me you know what you don't know."*

**Snapshot.** Grants/program officer at a county veterans office, community
foundation, or veteran-focused funder. Portfolio logic: fund gaps, require
evaluation, avoid overclaiming grantees. Reads 990s and privacy policies
for sport.

**Main motivations.**
- Fund the **upstream gap** — coordination between existing services — which
  is exactly the positioning the site claims but never argues (W25).
- Evaluation-ready grantees: a learning agenda, honest limitations,
  reportable results.
- Zero tolerance for compliance surprises: privacy, consent, safety
  escalation, accessibility.

**His problem, specifically.** The veteran-services map is fragmented by
design — crisis lines answer the worst moment, nonprofits run programs,
counties hold resources — and almost nobody credible applies to be the
*connective tissue* at pilot scale.

**How SUAS solves it.**
- The pilot **is** an evaluation: cohort of 25–50, defined test questions
  (*"consent, signals, responder burden"*, `app/about/page.tsx:100`), a
  planned post-pilot report — fundable as learning, not as unproven service
  delivery.
- The "Honest claim register" (`app/counties/page.tsx:72-104`) is, verbatim,
  the risk disclosure a program officer writes into a grant memo himself.
  No other applicant hands it to him.
- Escalation boundaries and the not-emergency-care scope match the safety
  posture a public funder requires.

**Objections to answer.** Governance (board list — W5), financials (W19),
privacy policy (W7), accessibility statement (W50), and a named evaluation
partner. This persona is the reason those trust pages pay for themselves.

**Message that lands:** "Fund the layer between your existing investments —
piloted honestly, reported fully." **Channel:** county veteran-services
relationships, regional community foundations, funder briefings. **First
ask:** a pilot grant or an LOI conversation; a seat observing the pilot's
learning reviews.

---

## 6. Persona-to-message matrix (quick reference)

| Persona | Core motivation | The problem SUAS solves for them | First ask |
|---|---|---|---|
| B1 Marcus — Quiet Professional | Control, dignity, connection without "help" | No low-stakes way to say "this week is heavy" | 60-second demo check-in → pilot |
| B2 Danielle — Transition Cliff | Practical stability, structure, belonging | Scattered material stressors compounding unseen | Pilot as early access to resource routing |
| B3 Elena — First Witness | Keep her veteran safe without breaking trust | Information without mandate or playbook | Family form + invitation kit |
| V1 Ray — Peer Responder | Mission, paying it forward, peer credibility | Informal helping has no structure or backstop | Responder role on pilot form + orientation |
| V2 Priya — Skills Volunteer | Craft used for real impact | No scoped professional roles in veteran causes | Adopt one pilot-readiness checklist item |
| D1 Tom — Founding Donor | Prevention, founder leverage, verifiable integrity | Veteran giving feels saturated and unaccountable | Named gift to a pilot line item |
| D2 Whitney — CSR Partner | Core-capability impact, employee pride | Sponsorships are checks and banners, not operations | Pilot-scale in-kind commitment |
| D3 Marcus D. — Program Officer | Fund the upstream gap, evaluation rigor | Nobody credible builds the connective tissue | Pilot grant / LOI conversation |

## 7. What this changes on the site (top implications)

1. **Homepage hero speaks to B1/B2 in second person** with "Join the pilot"
   as the single primary CTA (aligns with branding review W27).
2. **Add the missing doors:** a "Peer Responder" (V1) and "Skills volunteer"
   (V2) option on the pilot form, and a short responders section (W13).
3. **Answer B1's privacy objections in plain language** on /veterans — VA
   independence, what's stored, who sees it (W14).
4. **Give B3 the "veteran isn't ready" path** on /families (W31).
5. **Build D1's trust kit** — named founder/board, working IRS letter,
   mailing address, DAF/check options — before any donor push (W5/W6/W37).
6. **Split D2 onto a /partners page** with countable in-kind units (W29).
7. **Adopt the master value proposition** (and its per-audience variants)
   as the canonical copy source, surfacing "No one is left behind" (W24).
