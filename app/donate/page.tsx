import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const donateTitle = "Support veterans before crisis — SUAS Veteran Crisis Q.R.F.";
const donateDescription =
  "Help veterans get support before everyday struggles become crises. SUAS is a 501(c)(3) nonprofit (EIN 88-3249428) — your tax-deductible gift funds peer support, care coordination, and connection. No one is left behind.";

export const metadata: Metadata = {
  title: "Support the Mission",
  description:
    "Support pilot-ready tools, responder workflows, and privacy review for veteran crisis-prevention.",
  openGraph: {
    title: donateTitle,
    description: donateDescription,
    type: "website",
    siteName: "SUAS Veteran Crisis Q.R.F.",
    url: "/donate",
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
    title: donateTitle,
    description: donateDescription,
    images: ["/images/donate.jpg"],
  },
};

export default function DonatePage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image src="/images/donate.jpg" alt="Two people's hands resting together in support" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">Support the mission</div>
          <h1>Support the infrastructure that helps veterans get support earlier</h1>
          <p className="lede">
            Your support funds pilot-ready tools, responder workflows, and privacy review — not hype
            or unproven outcome claims.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="https://www.paypal.com/US/fundraiser/charity/4819148">
              Donate via PayPal Giving Fund
            </a>
            <Link className="btn btn-ghost" href="/contact">
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Where support goes</h2>
            <p className="lead">
              SUAS is a nonprofit veteran support concept in development. Contributions support
              planned pilot work — demo platform today.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>Build pilot app</h3>
              <p>Fund development of check-in, trusted circle, and responder tools for the pilot cohort.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Responder tools</h3>
              <p>Support queue, outreach logging, and follow-up workflows for nonprofit partners.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Resource routing</h3>
              <p>County-relevant resource navigation and referral tracking.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Privacy &amp; legal review</h3>
              <p>Privacy policy, consent flows, and safety language review before pilot launch.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Veteran outreach</h3>
              <p>Recruit and support 25 to 50 veterans for structured pilot feedback.</p>
            </Reveal>
          </div>
          <p className="note">
            Illustrative allocation for planning — not audited financials. 100% of donations support
            the mission.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="card lift" style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2>Your gift is tax-deductible</h2>
            <p>
              S.U.A.S. Veteran Crisis Q.R.F. is a 501(c)(3) public charity (EIN 88-3249428).
              Contributions are tax-deductible to the extent allowed by law under Section 170 of the
              Internal Revenue Code. No goods or services are provided in exchange for a gift.
            </p>
            <p className="note" style={{ marginTop: 12 }}>
              <a href="/docs/IRS-Determination-Letter.pdf" target="_blank" rel="noopener noreferrer">
                View our IRS determination letter (PDF) →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="band">
            <h2>Support the mission</h2>
            <p className="lead" style={{ margin: "12px auto 0" }}>
              Give securely through PayPal Giving Fund (0% fees), or contact us to discuss supporting
              pilot infrastructure.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href="https://www.paypal.com/US/fundraiser/charity/4819148">
                Donate via PayPal
              </a>
              <Link className="btn btn-ghost" href="/contact">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
