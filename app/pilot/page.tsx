import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PilotForm from "@/components/PilotForm";

export const metadata: Metadata = {
  title: "Pilot Program",
  description:
    "Join the SUAS pilot — a planned cohort of 25 to 50 veterans, privacy-first and consent-based.",
};

export default function PilotPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image src="/images/pilot.jpg" alt="A diverse group joining hands together" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">Pilot program</div>
          <h1>Join the SUAS pilot</h1>
          <p className="lede">
            Help test early support workflows with a planned cohort of 25 to 50 veterans —
            privacy-first, consent-based, and clearly labeled as a pilot.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#interest">
              Express interest
            </a>
            <Link className="btn btn-ghost" href="/how-it-works">
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Pilot overview</h2>
            <p className="lead">
              The pilot tests whether structured check-ins and trusted-circle coordination help
              surface support needs earlier — not clinical efficacy or suicide reduction claims.
            </p>
          </Reveal>
          <div className="grid cols-2">
            <Reveal className="card lift">
              <h3>Pilot size</h3>
              <p>25 to 50 veterans in the initial cohort, with partner organizations supporting recruitment and responder coverage.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Pilot partners (seeking)</h3>
              <p>Veteran nonprofits, peer support groups, county veteran services (exploratory), and community/faith-based networks.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>What the pilot tests</h3>
              <p>Check-in completion, consent comprehension, signal usefulness, responder follow-up, referral routing, and safety language.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Privacy-first approach</h3>
              <p>Consent controls, visibility levels, data minimization, and safety escalation language are readiness requirements — not completed certifications.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Pilot readiness</h2>
            <p className="lead">3 of 12 items in progress · target cohort 25–50 veterans (planned).</p>
          </Reveal>
          <div className="grid cols-2">
            <Reveal className="card lift">
              <ul className="clean">
                <li>Nonprofit/legal review</li>
                <li>Privacy policy drafted</li>
                <li>Safety escalation language reviewed</li>
              </ul>
            </Reveal>
            <Reveal className="card lift">
              <ul className="clean todo">
                <li>Pilot partner identified</li>
                <li>25–50 participants recruited</li>
                <li>Responder workflow assigned</li>
                <li>Data minimization plan</li>
                <li>Feedback loop established</li>
                <li>Escalation rules documented</li>
                <li>Donor/support plan</li>
                <li>Board review completed</li>
                <li>Post-pilot report template</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div id="interest" className="panel">
            <div className="sec-label">Pilot interest</div>
            <h2>Join the first cohort</h2>
            <PilotForm />
          </div>
        </div>
      </section>
    </>
  );
}
