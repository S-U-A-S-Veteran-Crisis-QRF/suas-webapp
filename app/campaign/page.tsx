import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const campaignTitle = "Founding Supporter Campaign — SUAS Veteran Crisis Q.R.F.";
const campaignDescription =
  "Help launch the first SUAS pilot: 25–50 veterans, privacy-reviewed check-ins, trusted-circle alerts, and responder tools. Veteran-led 501(c)(3), EIN 88-3249428 — every gift is tax-deductible.";

export const metadata: Metadata = {
  title: "Founding Supporter Campaign",
  description: campaignDescription,
  openGraph: {
    title: campaignTitle,
    description: campaignDescription,
    type: "website",
    siteName: "SUAS Veteran Crisis Q.R.F.",
    url: "/campaign",
    locale: "en_US",
    images: [
      {
        url: "/images/donate.jpg",
        width: 2684,
        height: 3648,
        alt: "Two people's hands resting together in support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: campaignTitle,
    description: campaignDescription,
    images: ["/images/donate.jpg"],
  },
};

const DONATE_URL = "https://www.paypal.com/US/fundraiser/charity/4819148";

const LEVELS = [
  {
    name: "Fire Watch",
    amount: "$10",
    detail: "Name on the digital Founding Supporters wall + supporter updates.",
  },
  {
    name: "Battle Buddy",
    amount: "$25",
    detail:
      "Supporters wall + founding-supporter certificate + the pilot findings report when it ships.",
  },
  {
    name: "Overwatch",
    amount: "$50",
    detail:
      "Everything in Battle Buddy. Impact: supports one veteran through a month of pilot check-ins.",
  },
  {
    name: "Squad Leader",
    amount: "$100",
    detail: "Everything in Overwatch + named thanks in the pilot findings report.",
  },
  {
    name: "Platoon Sponsor",
    amount: "$250",
    detail:
      "Squad Leader + a live virtual pilot briefing with the founder.",
  },
  {
    name: "Company Sponsor",
    amount: "$500",
    detail:
      "Platoon Sponsor. Impact: funds a full pilot seat — one veteran, onboarding through findings.",
  },
  {
    name: "Mission Partner",
    amount: "$1,000",
    detail:
      "Company Sponsor + recognition on the website + a 1:1 briefing call with the founder.",
  },
];

export default function CampaignPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image
            src="/images/donate.jpg"
            alt="Two people's hands resting together in support"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">Founding Supporter Campaign</div>
          <h1>Reach veterans before the crisis — not after.</h1>
          <p className="lede">
            We&apos;re raising the funds to launch our first pilot: 25–50 veterans,
            privacy-reviewed check-ins, trusted-circle alerts, and responder follow-up.
            Every gift is tax-deductible.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href={DONATE_URL}>
              Become a founding supporter
            </a>
            <Link className="btn btn-ghost" href="#levels">
              See supporter levels
            </Link>
          </div>
          <div className="pill-row">
            <span className="pill">501(c)(3) · EIN 88-3249428</span>
            <span className="pill">Veteran-led</span>
            <span className="pill">100% mission-directed</span>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Why now</div>
            <h2>Every veteran crisis has a before</h2>
            <p className="lead">
              Lost sleep. Skipped meals. Calls that go unanswered. Benefits paperwork that
              piles up. The warning signs are visible — but scattered across family, buddies,
              and case workers who each see only a piece, until someone is in crisis. SUAS is
              building the infrastructure that connects those pieces earlier, so support
              arrives while it can still be light.
            </p>
          </Reveal>
          <div className="note warn">
            If you or a veteran you love needs help right now: Veterans Crisis Line — dial
            988 and press 1, or text 838255. Free, confidential, 24/7.
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">What your gift builds</div>
            <h2>One pilot, funded end to end</h2>
            <p className="lead">
              The campaign funds our first structured pilot — infrastructure, not hype.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>Pilot app build</h3>
              <p>Check-in, trusted-circle, and responder tools for the pilot cohort.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Privacy &amp; legal review</h3>
              <p>Consent flows and safety language reviewed before any veteran uses it.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Veteran outreach</h3>
              <p>Recruiting and supporting 25–50 pilot veterans through partner orgs.</p>
            </Reveal>
          </div>
          <p className="note">
            Illustrative allocation for planning — not audited financials. 100% of donations
            support the mission. Every supporter receives the pilot findings report — win or
            lose, we publish what we learn.
          </p>
        </div>
      </section>

      <section id="levels">
        <div className="container">
          <Reveal>
            <div className="sec-label">Supporter levels</div>
            <h2>Choose your level</h2>
            <p className="lead">
              Suggested giving levels with founding-supporter recognition. Give any amount —
              every dollar goes to the same mission.
            </p>
          </Reveal>
          <div className="grid cols-3">
            {LEVELS.map((level) => (
              <Reveal key={level.name} className="card lift">
                <div className="sec-label" style={{ marginBottom: 4 }}>
                  {level.name}
                </div>
                <h3>{level.amount}</h3>
                <p>{level.detail}</p>
              </Reveal>
            ))}
            <Reveal className="card lift">
              <div className="sec-label" style={{ marginBottom: 4 }}>
                Your amount
              </div>
              <h3>Any gift</h3>
              <p>
                Every contribution is tax-deductible and goes directly to pilot
                infrastructure.
              </p>
            </Reveal>
          </div>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href={DONATE_URL}>
              Donate via PayPal Giving Fund (0% fees)
            </a>
            <Link className="btn btn-ghost" href="/contact">
              Talk to us about sponsoring
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Honest about where we are</div>
            <h2>Early-stage, and candid about it</h2>
            <p className="lead">
              The platform is a working demo today; the pilot is where we prove workflows.
              We recruit veterans through partner organizations, fund privacy review before
              launch, and make no clinical or outcome claims a pilot hasn&apos;t earned.
              SUAS is early-support coordination — not a diagnosis tool, not surveillance,
              and not a replacement for emergency care.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="band">
            <h2>No one is left behind.</h2>
            <p className="lead" style={{ margin: "12px auto 0" }}>
              Become a founding supporter — then share this page with one veteran or
              military family you know.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href={DONATE_URL}>
                Become a founding supporter
              </a>
              <Link className="btn btn-ghost" href="/donate">
                Other ways to give
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
