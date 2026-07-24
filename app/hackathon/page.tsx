import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Veterans Innovation Hackathon 2026",
  description:
    "Three days at Hacker Dojo in Mountain View, August 28–30, 2026 — veterans, engineers, and designers building the Food · Ride · Shelter crisis platform. Free, all skill levels.",
};

const LUMA_URL = "https://luma.com/Innovation4Veterans";

export default function HackathonPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">August 28–30, 2026 · Hacker Dojo, Mountain View</div>
          <h1>Veterans asked for three things: a ride, a meal, a safe bed.</h1>
          <p className="lede">
            The Veterans Innovation Hackathon is three days where veterans, engineers, designers,
            and mentors build the buttons that make it happen — then pitch them at a public Demo Day.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href={LUMA_URL} target="_blank" rel="noopener noreferrer">
              Register free on Luma
            </a>
            <a className="btn btn-ghost" href="#sponsors">
              Sponsor the event
            </a>
          </div>
          <div className="pill-row">
            <span className="pill">Free to attend</span>
            <span className="pill">All skill levels</span>
            <span className="pill">Teams form on site</span>
            <span className="pill">Public Demo Day Aug 30</span>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <h2>The mission</h2>
            <p className="lead">
              Take the Food · Ride · Shelter crisis app from working prototype toward a production
              platform — so that when a veteran in crisis needs a meal, a ride to care, or a safe
              place to sleep tonight, one tap gets it dispatched.
            </p>
          </Reveal>
          <div className="grid cols-2">
            <Reveal className="card lift">
              <h3>Who should come</h3>
              <p>
                Veterans — tech and non-tech — plus engineers, designers, product managers, and
                mentors. Veterans without a tech background are the most important people in the
                room: your voice is the spec.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>The weekend</h3>
              <p>
                Friday evening: keynotes, veteran lightning talks, team formation. Saturday: build
                day with mentor office hours. Sunday: code freeze, public Demo Day, and awards.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Five tracks</h3>
              <p>
                Food (meal fulfillment) · Ride (crisis transportation) · Shelter (same-night beds +
                housing navigation) · Security &amp; HIPAA · Veteran Experience (no login, no forms,
                988 on every screen).
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Code that ships</h3>
              <p>
                This isn&apos;t a throwaway demo weekend. Winning teams are invited to keep building
                with us toward a supervised pilot serving Santa Clara County veterans.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="band" style={{ textAlign: "center" }}>
            <h2>When &amp; where</h2>
            <p className="lead">
              Friday, August 28, 5:00 PM — Sunday, August 30, 9:00 PM
              <br />
              Hacker Dojo · 855 Maude Ave, Mountain View, CA 94043
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href={LUMA_URL} target="_blank" rel="noopener noreferrer">
                Register on Luma
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="sponsors">
        <div className="container">
          <Reveal>
            <h2>Sponsors &amp; partners</h2>
            <p className="lead">
              Sponsorship puts your name on the platform that gets veterans to safety — and your
              judges at the Demo Day table. All contributions support S.U.A.S. Veteran Crisis QRF,
              a California 501(c)(3), and are tax-deductible to the extent allowed by law.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>Title sponsor</h3>
              <p>Event naming rights, an opening keynote slot, two Demo Day judge seats, and your logo on every asset.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Track sponsors</h3>
              <p>Own one of the five challenge tracks, run the API workshop on opening night, and seat a Demo Day judge.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Community sponsors</h3>
              <p>Mentors, prizes, meals, or outreach — recognized on the website, event signage, and at the awards ceremony.</p>
            </Reveal>
          </div>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact">
              Talk to us about sponsoring
            </Link>
            <a className="btn btn-ghost" href={LUMA_URL} target="_blank" rel="noopener noreferrer">
              View the event page
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
