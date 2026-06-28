import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "For Counties",
  description:
    "County coordination concepts for veteran support — safe language, no implied government endorsement.",
};

export default function CountiesPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image src="/images/counties.jpg" alt="A diverse audience at a county community meeting" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">For counties</div>
          <h1>County coordination for veteran support</h1>
          <p className="lede">
            SUAS is exploring pilot partnerships with county veteran services and local institutions
            — with safe language and no implied government endorsement.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/pilot">
              Express interest
            </Link>
            <Link className="btn btn-ghost" href="/app">
              View app demo
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Institutional partnership concepts</h2>
            <p className="lead">Planned capabilities for pilot coordination — not live government adoption.</p>
          </Reveal>
          <div className="grid cols-2">
            <Reveal className="card lift">
              <h3>Pilot coordination</h3>
              <p>Structured onboarding for county veteran services to test workflows with defined scope.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Resource visibility</h3>
              <p>Concept for county-level resource routing so veterans see relevant local options.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Aggregate reporting concept</h3>
              <p>Privacy-preserving summaries for institutional learning — details still in design.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Support workflows</h3>
              <p>Align responders, nonprofits, and county navigators on follow-up without duplicate outreach.</p>
            </Reveal>
          </div>
          <p className="note">
            SUAS does not claim VA approval, HIPAA compliance, or official government partnership.
            County pilots are exploratory coordination tests.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Honest claim register</h2>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>Can claim today</h3>
              <ul className="clean">
                <li>A nonprofit veteran support concept</li>
                <li>A demo workflow for check-ins, trusted circle, routing, follow-up</li>
                <li>Designed for structured pilot testing</li>
              </ul>
            </Reveal>
            <Reveal className="card lift">
              <h3>Cannot claim yet</h3>
              <ul className="clean no">
                <li>Clinically validated</li>
                <li>Proven outcomes / suicide reduction</li>
                <li>VA approved</li>
                <li>Government backed</li>
                <li>HIPAA compliant</li>
                <li>Live deployment at scale</li>
              </ul>
            </Reveal>
            <Reveal className="card lift">
              <h3>Proof needed first</h3>
              <ul className="clean todo">
                <li>Working MVP validated with veterans</li>
                <li>Legal &amp; privacy review completed</li>
                <li>Pilot participants onboarded</li>
                <li>Responder feedback</li>
                <li>Institutional partner review</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
