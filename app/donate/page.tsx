import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Support the Mission",
  description:
    "Support pilot-ready tools, responder workflows, and privacy review for veteran crisis-prevention.",
};

export default function DonatePage() {
  return (
    <>
      <section className="hero">
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
