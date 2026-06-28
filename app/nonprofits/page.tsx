import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "For Nonprofits",
  description:
    "Responder dashboard, support queue, and follow-up tools for veteran nonprofits and peer support organizations.",
};

export default function NonprofitsPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image src="/images/nonprofits.jpg" alt="Nonprofit volunteers together outside their van" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">For nonprofits</div>
          <h1>Fewer missed cases, better coordination</h1>
          <p className="lede">
            SUAS gives veteran nonprofits and peer support organizations a responder dashboard,
            support queue, and follow-up tools — in a planned pilot.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/app">
              Responder demo
            </Link>
            <Link className="btn btn-ghost" href="/pilot">
              Join the pilot
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Responder tools for nonprofit teams</h2>
            <p className="lead">
              Demo dashboard concepts for outreach tracking, referral follow-up, and support queue
              management.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>Responder dashboard</h3>
              <p>See veterans by support signal, latest check-in, and assigned responder in one queue.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Support queue</h3>
              <p>Filter by yellow, orange, red, unresolved cases, and follow-ups due today.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Outreach tracking</h3>
              <p>Log calls, texts, and visits with notes that stay on the care timeline.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Referral follow-up</h3>
              <p>Track resource referrals so warm handoffs do not go cold.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Unresolved case visibility</h3>
              <p>See cases without recent outreach or stalled referrals in one queue (demo).</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Pilot reporting</h3>
              <p>Export-friendly summaries for nonprofit pilot review — not clinical outcomes.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="panel">
            <span className="demo-tag">Responder queue · demo</span>
            <div className="mock-row">
              <span>Alex R. — Benefits follow-up</span>
              <span className="sig y">yellow</span>
            </div>
            <div className="mock-row">
              <span>Morgan L. — Outreach today</span>
              <span className="sig o">orange</span>
            </div>
            <div className="mock-row">
              <span>Casey B. — Routine check-in</span>
              <span className="sig g">green</span>
            </div>
            <p className="muted" style={{ marginTop: 10, fontSize: ".85rem" }}>
              Sample veterans · not real cases.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
