import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">SUAS Veteran Crisis Q.R.F.</div>
          <h1>Veterans should not have to reach a breaking point before support shows up.</h1>
          <p className="lede">
            SUAS Veteran Crisis Q.R.F. helps veterans check in, stay connected to trusted support,
            and access help before everyday struggles become serious crises.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/app">
              Try a check-in demo
            </Link>
            <Link className="btn btn-ghost" href="/pilot">
              Join the pilot
            </Link>
            <Link className="btn btn-ghost" href="/donate">
              Support the mission
            </Link>
          </div>
          <div className="pill-row">
            <span className="pill">Consent-based alerts</span>
            <span className="pill">Privacy-first design</span>
            <span className="pill">Demo platform</span>
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
            <p className="muted" style={{ marginTop: 12, fontSize: ".85rem" }}>
              Product demo · sample data only.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Mission</div>
            <h2>Crisis-prevention infrastructure for veterans</h2>
            <p className="lead">
              Veteran crises are often preceded by visible but disconnected warning signs. SUAS
              helps surface those signals earlier, coordinate trusted support faster, and prevent
              veterans from becoming isolated inside unresolved problems.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">The problem</div>
            <h2>Warning signs stay disconnected</h2>
            <p className="lead">
              Sleep loss, withdrawal, benefits stress, and housing pressure rarely show up in one
              place — until someone is in crisis.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>Veterans</h3>
              <p>Often carry stress privately — nightmares, skipped meals, avoiding calls.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Families</h3>
              <p>See pieces, not the full picture — short answers, missed dinners, irritability.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Nonprofits</h3>
              <p>Lose track between touchpoints — outreach goes cold, referrals stall.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">The solution</div>
            <h2>Early-warning support that connects people</h2>
            <p className="lead">
              Check-ins, trusted-circle alerts, resource routing, and responder follow-up — built as
              nonprofit coordination infrastructure.
            </p>
          </Reveal>
          <div className="grid cols-4">
            <Reveal className="card lift">
              <h3>Veteran check-ins</h3>
              <p>Plain-language questions about how today feels — private and judgment-free.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Trusted circle</h3>
              <p>Consent-based alerts to family, peers, and responders you choose.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Care coordination</h3>
              <p>A timeline for check-ins, outreach, referrals, and follow-up.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Resource routing</h3>
              <p>County-relevant help for housing, benefits, health, and more.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">How it works</div>
            <h2>From check-in to follow-up</h2>
            <p className="lead">Five steps designed for early support — not prediction.</p>
          </Reveal>
          <div className="steps">
            <div className="step"><div className="num">1</div><h3>Check in</h3><p className="muted">Mood · sleep · safety</p></div>
            <div className="step"><div className="num">2</div><h3>Support signal</h3><p className="muted">Stable → outreach</p></div>
            <div className="step"><div className="num">3</div><h3>Trusted circle</h3><p className="muted">Consent alerts</p></div>
            <div className="step"><div className="num">4</div><h3>Resources</h3><p className="muted">County routing</p></div>
            <div className="step"><div className="num">5</div><h3>Follow-up</h3><p className="muted">Responder logged</p></div>
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/how-it-works">See full workflow →</Link>
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>Who it helps</h2>
            <p className="lead">
              SUAS is designed for veterans and the people who support them — plus the organizations
              that coordinate care.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Link className="card lift" href="/veterans"><h3>Veterans</h3><p>Check in, control privacy, and reach resources before crisis.</p></Link>
            <Link className="card lift" href="/families"><h3>Families</h3><p>Consent-based clarity without overwhelming your loved one.</p></Link>
            <Link className="card lift" href="/nonprofits"><h3>Nonprofits</h3><p>Responder dashboard and support queue concepts.</p></Link>
            <Link className="card lift" href="/counties"><h3>Counties</h3><p>Pilot coordination and resource visibility concepts.</p></Link>
            <Link className="card lift" href="/app"><h3>Peer responders</h3><p>Follow-up queue and outreach tracking for trusted support.</p></Link>
            <Link className="card lift" href="/donate"><h3>Donors</h3><p>Fund pilot infrastructure, privacy review, and outreach.</p></Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="band">
            <h2>Help shape the first pilot</h2>
            <p className="lead" style={{ margin: "12px auto 0" }}>
              We're recruiting 25–50 veterans, partner organizations, and county collaborators to
              test workflows with clear privacy and safety guardrails.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn-primary" href="/pilot">Join the Pilot</Link>
              <Link className="btn btn-ghost" href="/counties">County partners</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Trust and safety</div>
            <h2>Built for early support — with clear limits</h2>
          </Reveal>
          <div className="note warn">
            If someone is in immediate danger, they should contact emergency services or a crisis
            line right away. SUAS is a support coordination tool and does not replace emergency care.
          </div>
          <ul className="clean" style={{ marginTop: 18 }}>
            <li>SUAS is a support coordination tool</li>
            <li>Consent-based and privacy-first</li>
            <li>Built for early support, not emergency care</li>
            <li>Not a diagnosis tool</li>
          </ul>
          <div className="signals">
            <span className="sig g">Stable</span>
            <span className="sig y">Light support</span>
            <span className="sig o">Active outreach</span>
            <span className="sig r">Immediate safety concern</span>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="band">
            <h2>Ready to explore SUAS?</h2>
            <p className="lead" style={{ margin: "12px auto 0" }}>
              View the demo, join the pilot, or get in touch.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn-primary" href="/pilot">Join the Pilot</Link>
              <Link className="btn btn-ghost" href="/contact">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
