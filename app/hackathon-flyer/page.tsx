import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Hackathon Flyer (Printable)",
  description:
    "Printable one-page flyer for the Veterans Innovation Hackathon, August 28–30, 2026 at Hacker Dojo in Mountain View, CA.",
  robots: { index: false, follow: false },
};

// Deploy base path (empty locally / on the root custom domain) — same pattern as
// the app-demo iframe, needed because this is a plain <img>, not next/image.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const ROLES: { role: string; why: string }[] = [
  { role: "Software engineers", why: "build the prototype" },
  { role: "Veterans in tech", why: "lived experience plus technical skill" },
  { role: "Designers & UX", why: "design for crisis, not clicks" },
  { role: "Students", why: "learn by building something that matters" },
  { role: "Product & project managers", why: "keep teams focused and shipping" },
  { role: "Storytellers & pitch coaches", why: "help teams land the demo" },
  { role: "Mentors & judges", why: "AI, hardware, product, legal/IP, startup strategy" },
];

const DAYS: { day: string; title: string; body: string }[] = [
  {
    day: "Day 1 — Friday",
    title: "Listen & form teams",
    body: "Dinner, veteran open mic on what coming home is really like, nonprofit panel, lightning pitches, teams form.",
  },
  {
    day: "Day 2 — Saturday",
    title: "Build with veterans",
    body: "Full build day. Veterans circulate as advisors and co-designers; mentors on call all day; speaker sessions between sprints.",
  },
  {
    day: "Day 3 — Sunday",
    title: "Demo day & awards",
    body: "Final build, five-minute demos, judging on veteran impact, and prizes that help the best ideas keep going.",
  },
];

export default function HackathonFlyerPage() {
  return (
    <>
      <div className="flyer-actions container">
        <div>
          <div className="sec-label">Printable flyer</div>
          <h2>Veterans Innovation Hackathon 2026</h2>
          <p className="lead">
            One page, US Letter. Print at 100% scale with background graphics on, or save straight
            to PDF. A pre-rendered copy lives at{" "}
            <a href={`${base}/docs/hackathon-flyer-2026.pdf`}>hackathon-flyer-2026.pdf</a>.
          </p>
        </div>
        <PrintButton />
      </div>

      <div className="flyer-page">
        <article className="flyer-sheet" aria-label="Veterans Innovation Hackathon 2026 flyer">
          <header className="fl-top">
            <div className="fl-brand">
              S.U.A.S. <span>Veteran Crisis Q.R.F.</span>
            </div>
            <div className="fl-cohost">
              Hosted with <strong>Hacker Dojo</strong> · Mountain View, California
            </div>
          </header>

          <div className="fl-crisis-strip">
            Veterans Crisis Line — call <strong>988, press 1</strong> · text <strong>838255</strong>
          </div>

          <div className="fl-hero">
            <p className="fl-eyebrow">Veterans Innovation Hackathon · August 28–30, 2026</p>
            <h1 className="fl-headline">
              Listen first.
              <br />
              Then build.
            </h1>
            <p className="fl-lede">
              Three days where veterans, engineers, designers, students, and nonprofit leaders build
              the tools veterans actually asked for. Veterans open the weekend by sharing what
              coming home is really like — then we build it together, with them, and keep going
              after the weekend ends.
            </p>
          </div>

          <div className="fl-facts">
            <div className="fl-fact">
              <span className="fl-k">When</span>
              <strong>Fri Aug 28, 6:30 PM</strong>
              <span>through Sun Aug 30, 9:00 PM</span>
            </div>
            <div className="fl-fact">
              <span className="fl-k">Where</span>
              <strong>Hacker Dojo</strong>
              <span>855 Maude Ave, Mountain View, CA 94043</span>
            </div>
            <div className="fl-fact">
              <span className="fl-k">Cost</span>
              <strong>Free to attend</strong>
              <span>Meals and refreshments included</span>
            </div>
          </div>

          <div className="fl-cols">
            <section className="fl-who">
              <h2>Who we need</h2>
              <ul>
                {ROLES.map((r) => (
                  <li key={r.role}>
                    <strong>{r.role}</strong> — {r.why}
                  </li>
                ))}
              </ul>
              <p className="fl-principle">
                Veterans are collaborators, not just beneficiaries. No matter your role, there is a
                place for you on a team.
              </p>
            </section>

            <aside className="fl-qr-card">
              <img
                className="fl-qr"
                src={`${base}/images/hackathon-qr.svg`}
                alt="QR code linking to the hackathon registration page at luma.com/Innovation4Veterans"
                width={180}
                height={180}
              />
              <div className="fl-qr-cta">Scan to register</div>
              <div className="fl-qr-url">luma.com/Innovation4Veterans</div>
              <div className="fl-qr-note">Free · space is limited</div>
            </aside>
          </div>

          <div className="fl-days">
            {DAYS.map((d) => (
              <div className="fl-day" key={d.day}>
                <span className="fl-k">{d.day}</span>
                <strong>{d.title}</strong>
                <span>{d.body}</span>
              </div>
            ))}
          </div>

          <div className="fl-sponsors">
            <strong>Sponsors, partners &amp; veteran service organizations welcome.</strong>{" "}
            Sponsorship starts at $1,000 — cloud and API credits, equipment, mentors, and judges
            count too. Every dollar supports a California 501(c)(3) serving veterans in crisis.
          </div>

          <div className="fl-crisis-band">
            <span className="fl-crisis-lead">In crisis? Veterans Crisis Line</span>
            <span className="fl-crisis-num">Call 988, press 1 · Text 838255</span>
            <span className="fl-crisis-note">
              S.U.A.S. is support coordination, not emergency care.
            </span>
          </div>

          <footer className="fl-foot">
            S.U.A.S. Veteran Crisis Q.R.F. · California 501(c)(3) · EIN 88-3249428 · suasqrf.org ·
            (925) 727-6109 · jacobsilver@suasqrf.org
          </footer>
        </article>
      </div>
    </>
  );
}
