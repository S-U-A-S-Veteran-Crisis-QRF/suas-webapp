import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FamilyIntakeForm from "@/components/FamilyIntakeForm";

export const metadata: Metadata = {
  title: "For Families",
  description:
    "Families often see warning signs first. SUAS helps trusted contacts support veterans with consent-based alerts — limited, respectful, and never a substitute for professional care.",
};

const FEATURES = [
  {
    title: "Warning signs, not secrets",
    body: "When enabled, summary-level updates help you respond early — without accessing full clinical records.",
  },
  {
    title: "Consent-based alerts",
    body: "Notifications follow the alert levels the veteran set. You will not be flooded without permission.",
  },
  {
    title: "Guided supportive action",
    body: "Focus on steady presence, listening, and connecting to resources — not fixing everything at once.",
  },
  {
    title: "Respectful boundaries",
    body: "Trusted contacts cannot see everything. Visibility is defined by the veteran, per person.",
  },
];

const STEPS = [
  { n: 1, h: "Veteran invites", p: "Family member added to the circle." },
  { n: 2, h: "Sets visibility", p: "Summary only · no full journal." },
  { n: 3, h: "Chooses threshold", p: "Alert at yellow or above." },
  { n: 4, h: "Can pause anytime", p: "Consent stays revocable." },
];

const ACTIONS = [
  {
    img: "/images/presence.jpg",
    alt: "One person resting a supportive arm around another at home",
    h: "Be present",
    p: "Show up consistently. A short check-in or a shared meal says more than advice. You don't need the right words — you need to stay.",
  },
  {
    img: "/images/listening.jpg",
    alt: "A reassuring hand resting on someone's shoulder",
    h: "Listen first",
    p: "Ask open questions and let answers breathe. Reflect back what you hear instead of rushing to solve. Listening is the support.",
  },
  {
    img: "/images/connection.jpg",
    alt: "A multigenerational family embracing on a porch",
    h: "Keep the circle warm",
    p: "Isolation grows in silence. Help keep your veteran connected to the people and routines that matter — gently, without pressure.",
  },
];

export default function FamiliesPage() {
  return (
    <>
      {/* Photoreal hero */}
      <section className="hero-image">
        <div className="hero-bg">
          <Image
            src="/images/families-hero.jpg"
            alt="A service member returning home, holding their child as their partner looks on"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">For families</div>
          <h1>Families often see the warning signs first</h1>
          <p className="lede">
            SUAS helps trusted contacts support veterans with consent-based alerts — limited,
            respectful, and never a substitute for professional care.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="#connect">
              Connect with SUAS
            </Link>
            <Link className="btn btn-ghost" href="/app">
              View the app demo
            </Link>
          </div>
          <div className="pill-row">
            <span className="pill">Consent-based</span>
            <span className="pill">Privacy-first</span>
            <span className="pill">You're not the case manager</span>
          </div>
        </div>
      </section>

      {/* Support without guessing */}
      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Support without guessing</div>
            <h2>Clarity when the veteran chooses to share</h2>
            <p className="lead">
              You may notice sleep changes, withdrawal, or stress — but not know what to do. SUAS
              guides supportive action without turning you into a case manager.
            </p>
          </Reveal>
          <div className="grid cols-2">
            {FEATURES.map((f) => (
              <Reveal key={f.title} className="card lift">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Split feature: how trusted contacts participate */}
      <section>
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="sec-label">Your role in the circle</div>
              <h2>How trusted contacts participate</h2>
              <p className="lead">
                You are part of the circle — not the coordinator of care. SUAS respects what
                veterans choose to share, and keeps consent in their hands at every step.
              </p>
              <div className="steps" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
                {STEPS.map((s) => (
                  <div className="step" key={s.n}>
                    <div className="num">{s.n}</div>
                    <h3>{s.h}</h3>
                    <p className="muted">{s.p}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="split-media">
              <Image
                src="/images/families-support.jpg"
                alt="A veteran embracing their child on the couch at home"
                fill
                sizes="(max-width:820px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Supportive action media cards */}
      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">When you're not sure what to do</div>
            <h2>Three things that genuinely help</h2>
            <p className="lead">
              You don't have to have the answers. Most support comes down to presence, listening,
              and connection — and SUAS helps you know when to lean in.
            </p>
          </Reveal>
          <div className="media-grid">
            {ACTIONS.map((a) => (
              <Reveal key={a.h} className="media-card">
                <div className="media-thumb">
                  <Image src={a.img} alt={a.alt} fill sizes="(max-width:780px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="media-body">
                  <h3>{a.h}</h3>
                  <p>{a.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="note warn">
            If someone is in immediate danger, contact emergency services or a crisis line right
            away. SUAS is a support-coordination tool and does not replace emergency care. Veterans
            Crisis Line: 988, press 1 (text 838255).
          </div>
        </div>
      </section>

      {/* Family intake — the backend-connected form */}
      <section id="connect">
        <div className="container">
          <div className="panel">
            <span className="demo-tag">Family intake</span>
            <div className="sec-label">Connect with SUAS</div>
            <h2>Reach out about a veteran you love</h2>
            <p className="lead">
              Tell us a little about your situation and how you'd like to be involved. A SUAS team
              member will follow up. This form is for coordination and questions — not emergencies.
            </p>
            <FamilyIntakeForm />
          </div>
        </div>
      </section>
    </>
  );
}
