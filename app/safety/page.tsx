import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SafetyNote from "@/components/SafetyNote";

export const metadata: Metadata = {
  title: "Safety",
  description:
    "SUAS is designed for early support coordination with clear limits on what it is and is not.",
};

export default function SafetyPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image src="/images/safety.jpg" alt="A calm sunrise above the clouds" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">Safety and boundaries</div>
          <h1>Built for early support — with clear limits</h1>
          <p className="lede">
            SUAS is designed for early support coordination with clear limits on what it is and what
            it is not.
          </p>
          <div className="cta-row">
            <Link className="btn btn-ghost" href="/how-it-works">
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SafetyNote />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid cols-2">
            <Reveal className="card lift">
              <h3>What SUAS is</h3>
              <ul className="clean">
                <li>A support coordination tool for early warning and care coordination</li>
                <li>Consent-based — you choose who is notified and what they see</li>
                <li>Privacy-first by design for pilot planning</li>
                <li>Built for early support before everyday struggles escalate</li>
                <li>A pilot-ready demo workflow, not live clinical services</li>
              </ul>
            </Reveal>
            <Reveal className="card lift">
              <h3>What SUAS is not</h3>
              <ul className="clean no">
                <li>Emergency care or a substitute for 911 or crisis lines</li>
                <li>A diagnosis or clinical assessment tool</li>
                <li>Suicide prediction or guaranteed prevention</li>
                <li>A replacement for professional mental health or medical treatment</li>
                <li>HIPAA-compliant or VA-approved (not claimed)</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Escalation boundaries</h2>
          </Reveal>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <h3>Green · Yellow</h3>
              <p className="muted">
                Peer check-in, resources, light coordination. No automatic outreach beyond consent
                settings.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>Orange</h3>
              <p className="muted">
                Trusted-circle alerts, responder queue (demo). Veteran-chosen contacts only.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Red</h3>
              <p className="muted">
                Safety guidance + crisis line resources shown. Not 911 dispatch · not clinical
                prediction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
