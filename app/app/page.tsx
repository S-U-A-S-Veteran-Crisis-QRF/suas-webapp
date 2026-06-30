import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CrisisDemoApp from "@/components/CrisisDemoApp";
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
            <div className="sec-label">Interactive prototype</div>
            <h2>Emergency services, one tap away</h2>
            <p className="lead">
              A working preview of the veteran-facing app: tap a need — ride, food, or shelter — and
              walk through the confirmation flow. This is a prototype with sample data; no real
              services are dispatched.
            </p>
          </Reveal>
          <div className="device-frame">
            <CrisisDemoApp />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Full dispatch loop</div>
            <h2>From a veteran&apos;s tap to the dispatcher&apos;s queue</h2>
            <p className="lead">
              The complete experience, end to end: tap a service on the veteran&apos;s phone and watch
              the request land in the dispatcher console with its Medi-Cal billing detail, then advance
              it through the live status flow. Sample data only — no real services are dispatched and
              nothing is stored.
            </p>
          </Reveal>
          <EmbeddedDemo
            src={`${base}/app-demo-frs.html`}
            title="Food, ride, and shelter dispatch demo"
          />
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
