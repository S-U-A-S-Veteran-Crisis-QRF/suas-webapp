import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EmbeddedDemo from "@/components/EmbeddedDemo";

export const metadata: Metadata = {
  title: "App Demo",
  description: "Walk through veteran and responder workflows with labeled demo data.",
};

export default function AppPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
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
          <Reveal>
            <div className="sec-label">Why food, ride &amp; shelter</div>
            <h2>HALT — stopping crisis at the trigger point</h2>
            <p className="lead">
              In peer support and recovery, four states are known to push a person toward the edge:
              being <strong>Hungry</strong>, <strong>Angry</strong>, <strong>Lonely</strong>, or{" "}
              <strong>Tired</strong>. Together they spell <strong>HALT</strong> — and the word is the
              instruction: when you notice them, halt. For an isolated veteran these are the quiet
              conditions that turn a hard night into an emergency. The app is built to interrupt them —
              every tap meets the basic human need behind a trigger before it can escalate.
            </p>
          </Reveal>
          <div className="grid cols-4">
            <div className="card">
              <h3>H — Hungry</h3>
              <p>A hot meal, delivered free. No empty stomach left to sharpen a bad night.</p>
            </div>
            <div className="card">
              <h3>A — Angry</h3>
              <p>
                A peer who&apos;s been there and help that comes fast, so frustration doesn&apos;t
                compound in isolation.
              </p>
            </div>
            <div className="card">
              <h3>L — Lonely</h3>
              <p>
                A ride to connection and a fellow veteran on the other end. Isolation is the risk;
                presence is the answer.
              </p>
            </div>
            <div className="card">
              <h3>T — Tired</h3>
              <p>A safe place to sleep tonight, no payment. Rest, before exhaustion becomes despair.</p>
            </div>
          </div>
          <p className="note">
            Meet the need and the trigger loses its power. This isn&apos;t therapy or a hotline — it&apos;s
            the practical step that keeps HALT from becoming the last straw. For immediate danger, the
            Veterans Crisis Line (988, Press 1) is always one tap away.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Interactive demo</div>
            <h2>The new app — one request, one visible path to support</h2>
            <p className="lead">
              The latest interactive demo of the SUAS iOS app: step through the operator loop from a
              veteran&apos;s request to a resolved outcome. Every record, location, provider, and
              outcome is synthetic — no API connection, no real services dispatched.
            </p>
          </Reveal>
          <EmbeddedDemo src={`${base}/ios-operator.html`} title="SUAS iOS operator loop demo" />
          <p className="note">
            <a href={`${base}/ios-operator.html`} target="_blank" rel="noopener noreferrer">
              Open the iOS operator demo in a full page
            </a>
          </p>
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
              These map to the planned MVP. Each card below summarizes a screen from the pilot
              roadmap; interactive versions are in development.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <div className="card">
              <h3>Dashboard</h3>
              <p>Support signal and next actions.</p>
            </div>
            <div className="card">
              <h3>Check-In</h3>
              <p>Six-question private check-in.</p>
            </div>
            <div className="card">
              <h3>Trusted Circle</h3>
              <p>Consent-based trusted contacts.</p>
            </div>
            <div className="card">
              <h3>Resources</h3>
              <p>County resource routing.</p>
            </div>
            <div className="card">
              <h3>Timeline</h3>
              <p>Care coordination history.</p>
            </div>
            <div className="card">
              <h3>Responder</h3>
              <p>Nonprofit support queue.</p>
            </div>
            <div className="card">
              <h3>Admin</h3>
              <p>Pilot readiness overview.</p>
            </div>
          </div>
          <p className="note">
            These seven screens are planned for the pilot build and shown here as concepts with
            sample data only. Want to help shape them?{" "}
            <Link href="/pilot">Join the pilot</Link> or <Link href="/contact">contact us</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
