import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why SUAS exists: helping veterans stay connected to support before everyday struggles reach a breaking point.",
};

export default function AboutPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image src="/images/connection.jpg" alt="A multigenerational family embracing" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">About</div>
          <h1>Why SUAS exists</h1>
          <p className="lede">
            SUAS helps veterans stay connected to support before everyday struggles reach a breaking
            point.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/app">
              View app demo
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
            <p className="lead">
              SUAS Veteran Crisis Q.R.F. is a nonprofit veteran crisis-prevention and
              care-coordination concept. We are building infrastructure that helps veterans check
              in, stay connected to trusted support, and access help before everyday struggles
              become serious crises.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>The problem we see</h2>
            <p className="lead">
              Veteran crises are often preceded by warning signs that never connect in one place —
              sleep, isolation, benefits stress, housing pressure, and family strain can stay
              invisible until someone is in crisis.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>What we are building</h2>
            <p className="lead">
              A privacy-first demo platform for check-ins, support signals, trusted-circle alerts,
              resource routing, and responder follow-up — currently in pilot planning, not live
              clinical deployment.
            </p>
          </Reveal>
          <p className="note">
            This site and app demo are for pilot planning and partner review. We do not claim
            clinical validation, government partnership, or live institutional adoption.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Nonprofit mission path</h2>
          </Reveal>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <h3>Today</h3>
              <p className="muted">Pilot planning — demo site + partner conversations.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>Pilot</h3>
              <p className="muted">Structured cohort — 25–50 veterans with guardrails.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Learn</h3>
              <p className="muted">Process feedback — consent, signals, responder burden.</p>
            </div>
            <div className="step">
              <div className="num">4</div>
              <h3>Next</h3>
              <p className="muted">Iterate safely — no clinical efficacy claims.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
