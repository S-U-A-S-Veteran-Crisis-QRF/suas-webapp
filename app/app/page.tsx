import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "App Demo",
  description: "Walk through veteran and responder workflows with labeled demo data.",
};

export default function AppPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image src="/images/app.jpg" alt="A person using a mobile app on their phone" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">App preview</div>
          <h1>Walk through the MVP demo</h1>
          <p className="lede">
            Each section uses labeled demo data. Click through veteran and responder workflows. These
            screens are demo concepts with sample data only.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/pilot">
              Join the pilot
            </Link>
            <Link className="btn btn-ghost" href="/how-it-works">
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="panel">
            <span className="demo-tag">Demo · sample data</span>
            <div className="mock-row">
              <span className="k">Support signal</span>
              <span className="sig y">Yellow — light support needed</span>
            </div>
            <div className="mock-row">
              <span className="k">Last check-in</span>
              <span>Today</span>
            </div>
            <div className="mock-row">
              <span className="k">Trusted circle</span>
              <span>3 contacts</span>
            </div>
            <div className="mock-row">
              <span className="k">Next action</span>
              <span>Light peer outreach recommended</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Demo screens</h2>
            <p className="lead">
              These map to the planned MVP. In this rebuilt site they are described concepts — the
              interactive screens can be built next.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <a className="card lift" href="#">
              <h3>Dashboard</h3>
              <p>Support signal and next actions.</p>
            </a>
            <a className="card lift" href="#">
              <h3>Check-In</h3>
              <p>Six-question private check-in.</p>
            </a>
            <a className="card lift" href="#">
              <h3>Trusted Circle</h3>
              <p>Consent-based trusted contacts.</p>
            </a>
            <a className="card lift" href="#">
              <h3>Resources</h3>
              <p>County resource routing.</p>
            </a>
            <a className="card lift" href="#">
              <h3>Timeline</h3>
              <p>Care coordination history.</p>
            </a>
            <a className="card lift" href="#">
              <h3>Responder</h3>
              <p>Nonprofit support queue.</p>
            </a>
            <a className="card lift" href="#">
              <h3>Admin</h3>
              <p>Pilot readiness overview.</p>
            </a>
          </div>
          <p className="note">
            Note: the seven interactive app screens above are described here. Say the word and these
            can be built as working demo pages next.
          </p>
        </div>
      </section>
    </>
  );
}
