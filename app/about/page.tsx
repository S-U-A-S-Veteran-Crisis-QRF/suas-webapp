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
          <Image src="/images/connection.webp" alt="A multigenerational family embracing" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
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
              S.U.A.S. Veteran Crisis Q.R.F. is a California 501(c)(3) nonprofit (EIN 88-3249428),
              incorporated in 2022 and based in Los Altos, that provides peer-bridge crisis support
              to veterans in Santa Clara County. When a veteran is slipping, a fellow veteran shows
              up with a ride, a meal, a safe bed for the night, and a warm hand-off to the services
              that can carry the rest. Alongside that field work we run free community events that
              reduce isolation, and we are building the QRF app so that help is one tap away.
            </p>
            <p>
              Read about our <Link href="/programs">programs and services</Link>, our{" "}
              <Link href="/transparency">legal status and financials</Link>, or{" "}
              <Link href="/contact">get in touch</Link>.
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
              A privacy-first app for check-ins, support signals, trusted-circle alerts, resource
              routing, and responder follow-up — currently in development and pilot planning, not
              live clinical deployment.
            </p>
          </Reveal>
          <p className="note">
            The app demo on this site is for pilot planning and partner review. We do not claim
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

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Founder</div>
            <h2>Jacob Silver, Founder &amp; CEO</h2>
            <p className="lead">
              Jacob founded S.U.A.S. Veteran Crisis QRF to get veterans in crisis help in hours,
              not days: a ride, a meal, a safe bed for the night, and a peer check-in from
              another veteran.
            </p>
            <p>
              Contact:{" "}
              <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> ·{" "}
              <a href="tel:+19257276109">(925) 727-6109</a>
              <br />
              S.U.A.S. Veteran Crisis Q.R.F., 727 Edge Lane, Los Altos, CA 94024
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
