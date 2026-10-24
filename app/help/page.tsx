import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import HelpForm from "@/components/HelpForm";

export const metadata: Metadata = {
  title: "Get Help Tonight — Free Ride, Meal & Safe Bed for Veterans",
  description:
    "Veteran in crisis in Santa Clara County? SUAS QRF responds in hours, not days — a free ride to safety, a hot meal, a safe bed tonight. Call (925) 727-6109 or request a callback.",
};

export default function HelpPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image
            src="/images/presence.webp"
            alt="A quiet moment of support between two people"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">For veterans · Santa Clara County</div>
          <h1>Need help tonight? We&apos;re awake.</h1>
          <p className="lede">
            A free ride to safety, a hot meal, a safe bed — in hours, not days. PTSD doesn&apos;t
            keep a schedule, and neither do we. SUAS QRF is a nonprofit rapid-response network,
            not emergency care.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="tel:+19257276109">
              Call (925) 727-6109
            </a>
            <a className="btn btn-ghost" href="#request">
              Request a callback
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>What we can do tonight — free for veterans</h2>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>A ride to safety</h3>
              <p>
                Stranded, unsafe, or need to get somewhere that matters — a hospital, a shelter, a
                friend&apos;s couch? We arrange the ride and cover the cost.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>A hot meal</h3>
              <p>
                Not a handout line. A real, hot meal, brought to you or wherever you&apos;re safe —
                because nobody thinks straight on an empty stomach at 2 a.m.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>A safe bed</h3>
              <p>
                A safe place to sleep tonight while the longer-term pieces get sorted out — and a
                warm hand-off to the services that take it from there.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>How it works</h2>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>1. Call or send the form</h3>
              <p>One call or one short form. No intake maze, no wrong-door runaround.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>2. A real person calls back</h3>
              <p>We respond in hours — including overnight, when most services are closed.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>3. Help shows up</h3>
              <p>The meal, the ride, or the bed gets arranged, and we stay with the hand-off.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="request">
        <div className="container">
          <div className="panel">
            <Reveal>
              <h2>Request a callback</h2>
              <p className="lead">
                Tell us how to reach you and what you need. If it can&apos;t wait, call{" "}
                <a href="tel:+19257276109">(925) 727-6109</a> now.
              </p>
            </Reveal>
            <HelpForm />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Good to know</h2>
            <p className="lead">
              SUAS QRF serves veterans across Santa Clara County — San Jose, Santa Clara,
              Sunnyvale, Mountain View, Palo Alto, Cupertino, Milpitas, Campbell, Los Gatos,
              Saratoga, Morgan Hill, Gilroy, and Los Altos. Everything is free for veterans, and
              what you tell us stays with us.
            </p>
            <p className="lead" style={{ marginTop: 12 }}>
              If you are in immediate danger or thinking about harming yourself, call the{" "}
              <strong>Veterans Crisis Line: 988, then press 1</strong> — or text 838255 — or call
              911. SUAS is a rapid-response nonprofit, not emergency care, and we&apos;d rather
              meet you after the crisis line has you safe.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
