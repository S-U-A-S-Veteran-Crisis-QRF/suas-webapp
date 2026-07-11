import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SafetyNote from "@/components/SafetyNote";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How SUAS coordinates early support: check-in, support signal, trusted circle, resources, follow-up.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image src="/images/how-it-works.jpg" alt="A person checking in on their phone at home" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">SUAS Veteran Crisis Q.R.F.</div>
          <h1>How SUAS coordinates early support</h1>
          <p className="lede">
            A visual workflow from veteran check-in to trusted support, resource routing, and
            responder follow-up — demo concepts today.
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
          <div className="panel-dark">
            <span className="demo-tag">Demo</span>
            <div className="sec-label" style={{ color: "var(--gold)" }}>
              Coordination workflow
            </div>
            <div className="workflow">
              <div className="node">
                <div className="dot">1</div>
                <h4>Check-in</h4>
                <small>Private answers</small>
              </div>
              <div className="node">
                <div className="dot">2</div>
                <h4>Support signal</h4>
                <small>Coordination level</small>
              </div>
              <div className="node">
                <div className="dot">3</div>
                <h4>Trusted circle</h4>
                <small>Consent alerts</small>
              </div>
              <div className="node">
                <div className="dot">4</div>
                <h4>Resources</h4>
                <small>Next steps</small>
              </div>
              <div className="node">
                <div className="dot">5</div>
                <h4>Follow-up</h4>
                <small>Responder log</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid cols-2">
            <div>
              <Reveal>
                <div className="sec-label">What SUAS does</div>
                <h2>Surface signals, coordinate support</h2>
                <p className="lead">
                  SUAS helps veterans check in, generate a support signal for coordination (not
                  diagnosis), alert trusted contacts with consent, route resources, and log responder
                  follow-up.
                </p>
              </Reveal>
              <ul className="clean">
                <li>Daily or periodic check-ins in plain language</li>
                <li>Support signal levels (green through red) for coordination</li>
                <li>Trusted-circle alerts with visibility controls</li>
                <li>Resource suggestions by category and county</li>
                <li>Responder queue and outreach logging (demo)</li>
              </ul>
            </div>
            <div>
              <Reveal>
                <div className="sec-label">What SUAS does not do</div>
                <h2>Clear boundaries</h2>
                <p className="lead">
                  We do not overstate what this platform can do. SUAS is early support infrastructure
                  — not emergency care or clinical prediction.
                </p>
              </Reveal>
              <ul className="clean no">
                <li>Predict suicide or guarantee prevention</li>
                <li>Diagnose or replace professional treatment</li>
                <li>Replace 911 or crisis lines</li>
                <li>Claim VA approval, HIPAA compliance, or government partnership</li>
                <li>Present demo metrics as real outcomes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Five steps to earlier support</h2>
            <p className="lead">Each step is designed to reduce isolation before everyday struggles escalate.</p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <div className="num">1</div>
              <h3>Check in</h3>
              <p>Veterans answer brief questions about sleep, stress, connection, pressure areas, and safety.</p>
            </Reveal>
            <Reveal className="card lift">
              <div className="num">2</div>
              <h3>Signal support need</h3>
              <p>Responses inform a support signal — yellow, orange, or red — for coordination, not clinical labeling.</p>
            </Reveal>
            <Reveal className="card lift">
              <div className="num">3</div>
              <h3>Coordinate trusted support</h3>
              <p>Consent-based alerts reach family, peers, or responders based on what the veteran chose.</p>
            </Reveal>
            <Reveal className="card lift">
              <div className="num">4</div>
              <h3>Route resources</h3>
              <p>Housing, benefits, health, food, and community resources surface as next steps.</p>
            </Reveal>
            <Reveal className="card lift">
              <div className="num">5</div>
              <h3>Track follow-up</h3>
              <p>Responders log outreach, referrals, and pending follow-up on a shared timeline (demo).</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Example journey</div>
            <h2>Poor sleep, isolation, and money pressure</h2>
            <p className="lead">Demo scenario — not a real veteran case or clinical outcome.</p>
          </Reveal>
          <div className="grid cols-2">
            <div className="panel">
              <span className="demo-tag">Example journey · demo</span>
              <div className="mock-row">
                <span>✓ Check-in</span>
                <span className="muted">Poor sleep · isolation · money pressure</span>
              </div>
              <div className="mock-row">
                <span>2 Support signal</span>
                <span className="sig y">yellow / orange</span>
              </div>
              <div className="mock-row">
                <span>3 Peer outreach</span>
                <span className="muted">Light contact suggested</span>
              </div>
              <div className="mock-row">
                <span>4 Resources</span>
                <span className="muted">Benefits · housing surfaced</span>
              </div>
              <div className="mock-row">
                <span>5 Responder queue</span>
                <span className="muted">Follow-up within 48h</span>
              </div>
            </div>
            <div className="panel">
              <span className="demo-tag">Support signal spectrum · demo</span>
              <div className="spectrum"></div>
              <ul className="clean" style={{ marginTop: 6 }}>
                <li>
                  <strong>Green</strong> — Stable
                </li>
                <li>
                  <strong>Yellow</strong> — Light support needed
                </li>
                <li>
                  <strong>Orange</strong> — Active outreach needed
                </li>
                <li>
                  <strong>Red</strong> — Immediate safety concern
                </li>
              </ul>
              <p className="muted" style={{ fontSize: ".84rem", marginTop: 8 }}>
                For coordination only — not diagnosis or emergency dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid cols-2">
            <div>
              <Reveal>
                <h2>Privacy and consent</h2>
                <p className="lead">
                  Veterans choose who is in the trusted circle, what they see, and when alerts fire.
                </p>
              </Reveal>
              <p className="muted" style={{ marginTop: 10 }}>
                Data minimization is a design goal for the pilot: collect what coordination needs, not
                everything a system could store. Full privacy policy and legal review are pilot
                readiness items — not completed claims.
              </p>
            </div>
            <div>
              <Reveal>
                <h2>Escalation boundaries</h2>
                <p className="lead">
                  Red signals prompt safety guidance and crisis resources — not automated emergency
                  dispatch.
                </p>
              </Reveal>
              <SafetyNote />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Pilot proof goals</h2>
            <p className="lead">
              What we aim to learn in a structured pilot — process and usefulness, not clinical
              efficacy claims.
            </p>
          </Reveal>
          <div className="grid cols-2">
            <Reveal className="card lift">Check-in completion rates and veteran feedback</Reveal>
            <Reveal className="card lift">Trusted-circle setup and alert usefulness</Reveal>
            <Reveal className="card lift">Whether support signals help responders prioritize</Reveal>
            <Reveal className="card lift">Resource routing clarity and referral follow-through</Reveal>
            <Reveal className="card lift">Responder workflow burden and queue management</Reveal>
            <Reveal className="card lift">Privacy and consent comprehension</Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="band">
            <div className="grid cols-2" style={{ alignItems: "center" }}>
              <div>
                <h2>See the workflow in the app demo</h2>
                <p className="lead">
                  Walk through check-ins, trusted circle settings, and responder tools with sample
                  data.
                </p>
                <div className="cta-row">
                  <Link className="btn btn-primary" href="/app">
                    View App Demo
                  </Link>
                  <Link className="btn btn-ghost" href="/pilot">
                    Join the Pilot
                  </Link>
                </div>
              </div>
              <div className="panel">
                <span className="demo-tag">Pilot interest · demo</span>
                <h3>Join the first cohort</h3>
                <p className="muted" style={{ fontSize: ".9rem" }}>
                  25 to 50 veterans · partner organizations welcome
                </p>
                <ul className="clean" style={{ marginTop: 10 }}>
                  <li>Veteran check-in workflow</li>
                  <li>Trusted-circle consent model</li>
                  <li>Responder coordination queue</li>
                </ul>
                <div className="cta-row">
                  <Link className="btn btn-primary btn-sm" href="/pilot">
                    Join the Pilot
                  </Link>
                  <Link className="btn btn-ghost btn-sm" href="/app">
                    App Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
