import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "For Veterans",
  description:
    "Check in without judgment. Control your privacy, choose who supports you, and find the right next step.",
};

export default function VeteransPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">For veterans</div>
          <h1>Check in without judgment</h1>
          <p className="lede">
            Keep control over your privacy, choose who supports you, and find the right next step
            before everyday struggles become a crisis. SUAS is not emergency care.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/app">
              Start check-in demo
            </Link>
            <Link className="btn btn-ghost" href="/app">
              View dashboard
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Support on your terms</h2>
            <p className="lead">
              SUAS is early-warning support infrastructure — not a diagnosis, not suicide
              prediction, and not a replacement for professional treatment or crisis lines.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>Daily check-in</h3>
              <p>Plain questions about how today feels — sleep, connection, pressure, and safety.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Support signal</h3>
              <p>A coordination level (green through red), not a clinical label or guarantee.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Trusted circle</h3>
              <p>Family, peers, mentors, or responders — only the people you choose.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Resource routing</h3>
              <p>Housing, benefits, health, food, and community help when you are ready.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Personal timeline</h3>
              <p>See check-ins, signal updates, and outreach in one place (demo).</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Safety guidance</h3>
              <p>Clear boundaries and crisis resources when you need immediate help.</p>
            </Reveal>
          </div>
          <div className="note warn">
            If someone is in immediate danger, contact emergency services or a crisis line right
            away. SUAS is a support coordination tool and does not replace emergency care. Veterans
            Crisis Line: 988, press 1.
          </div>
          <p className="note">
            SUAS does not replace 911, the Veterans Crisis Line (988, press 1), or emergency medical
            care.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="band">
            <h2>Try the veteran dashboard demo</h2>
            <p className="lead" style={{ margin: "12px auto 0" }}>
              Complete a check-in, explore trusted circle settings, and browse demo resources.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn-primary" href="/app">
                Start Check-In Demo
              </Link>
              <Link className="btn btn-ghost" href="/pilot">
                Join the Pilot
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
