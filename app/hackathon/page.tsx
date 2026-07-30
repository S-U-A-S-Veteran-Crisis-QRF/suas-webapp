import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import HackathonForm from "@/components/HackathonForm";

const LUMA_URL = "https://luma.com/Innovation4Veterans";

export const metadata: Metadata = {
  title: "Veterans Innovation Hackathon",
  description:
    "August 28–30, 2026 at Hacker Dojo, Mountain View. Veterans, engineers, designers, and nonprofit leaders build real solutions together — free to attend.",
  openGraph: {
    title: "Veterans Innovation Hackathon | SUAS Veteran Crisis Q.R.F.",
    description:
      "Three days at Hacker Dojo. Veterans share what coming home is really like, then teams build working prototypes alongside them. Free to attend.",
    url: "/hackathon",
    type: "website",
  },
};

// Day-by-day schedule, kept as data so the three panels stay consistent.
const AGENDA = [
  {
    day: "Day 1 — Friday, Aug 28",
    theme: "Listen, connect, build teams",
    rows: [
      ["6:00 PM", "Check-in, networking, dinner"],
      ["6:30 PM", "Welcome remarks and hackathon introduction"],
      ["6:45 PM", "Veteran open mic: “What was the hardest part about coming home?”"],
      ["7:15 PM", "Nonprofit community panel: challenges supporting veterans"],
      ["7:45 PM", "Problem discovery and innovation themes"],
      ["8:15 PM", "Participant lightning pitches (60 seconds each)"],
      ["9:00 PM", "Team formation, nonprofit resource booths, networking"],
      ["10:00 PM", "Hacking officially begins"],
    ],
  },
  {
    day: "Day 2 — Saturday, Aug 29",
    theme: "Build with veterans",
    rows: [
      ["8:00 AM", "Breakfast and networking"],
      ["9:15 AM", "Build session — mentors and veteran advisors circulating"],
      ["10:00 AM", "Speaker session: veteran innovation and community impact"],
      ["12:00 PM", "Lunch"],
      ["1:30 PM", "Speaker session: building solutions that last"],
      ["3:30 PM", "Speaker session: veteran services and community partnerships"],
      ["4:00 PM", "Prototype development and mentor office hours"],
      ["6:00 PM", "Dinner"],
      ["7:00 PM", "Evening build session"],
    ],
  },
  {
    day: "Day 3 — Sunday, Aug 30",
    theme: "Demo, celebrate, keep going",
    rows: [
      ["8:00 AM", "Breakfast"],
      ["9:00 AM", "Final build session and mentor check-ins"],
      ["12:00 PM", "Lunch"],
      ["1:00 PM", "Demo prep and pitch practice"],
      ["6:45 PM", "Submission deadline — code freeze"],
      ["7:00 PM", "Team demos (5 minutes each)"],
      ["8:20 PM", "Closing remarks"],
      ["8:40 PM", "Prize announcements and awards"],
      ["9:00 PM", "Photos, networking, celebration"],
    ],
  },
];

const TIERS = [
  {
    name: "Title Sponsor",
    amount: "$15,000",
    availability: "1 available",
    includes: [
      "“Presented by” branding across all event materials",
      "Logo on the event page, banners, slides, and Demo Day backdrop",
      "Five minutes of opening remarks",
      "Naming rights for one segment (e.g. the veteran open mic)",
      "Booth presence all weekend and recruiting access on Demo Day",
    ],
  },
  {
    name: "Gold Sponsor",
    amount: "$7,500",
    availability: "2–3 available",
    includes: [
      "Prominent logo placement across event materials",
      "Recognition at the opening and closing ceremonies",
      "Booth or table at the event",
      "Propose challenge statements for teams to take on",
      "Invitation to judge or mentor",
    ],
  },
  {
    name: "Silver Sponsor",
    amount: "$3,000",
    availability: "4–6 available",
    includes: [
      "Logo on the event page and slides",
      "Mention during the opening ceremony",
      "Table presence during Demo Day networking",
      "Send mentors or engineers to support teams",
      "Social media recognition",
    ],
  },
  {
    name: "Community Sponsor",
    amount: "$1,000",
    availability: "Unlimited",
    includes: [
      "Logo on the event page",
      "Recognition in the sponsor list",
      "Optional swag or informational table",
      "Direct support for veteran innovation and workforce development",
    ],
  },
];

export default function HackathonPage() {
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Veterans Innovation Hackathon",
    description:
      "A three-day hackathon where veterans, engineers, designers, and nonprofit leaders build real solutions to the problems veterans face coming home.",
    startDate: "2026-08-28T18:00:00-07:00",
    endDate: "2026-08-30T21:30:00-07:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Hacker Dojo",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mountain View",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "NonprofitOrganization",
      name: "S.U.A.S. Veteran Crisis Q.R.F.",
      url: "https://suasqrf.org/",
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: LUMA_URL,
    },
    url: "https://suasqrf.org/hackathon",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <section className="hero">
        <div className="container">
          <div className="eyebrow">August 28–30, 2026 · Hacker Dojo, Mountain View</div>
          <h1>Veterans Innovation Hackathon</h1>
          <p className="lede">
            Three days where veterans, engineers, designers, and nonprofit leaders build together.
            Veterans share what coming home is actually like — then teams spend the weekend turning
            those experiences into working prototypes.
          </p>
          <div className="cta-row">
            <a
              className="btn btn-primary"
              href={LUMA_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register free on Luma
            </a>
            <a className="btn btn-ghost" href="#sponsor">
              Sponsor the event
            </a>
            <a className="btn btn-ghost" href="#interest">
              Other ways to help
            </a>
          </div>
          <div className="pill-row">
            <span className="pill">Free to attend</span>
            <span className="pill">3 days · Fri–Sun</span>
            <span className="pill">Veterans co-design, not just attend</span>
            <span className="pill">Prizes on Demo Day</span>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">The idea</div>
            <h2>Listen first, then build</h2>
            <p className="lead">
              Veterans coming home run into confusing systems, long applications, and slow paths to
              the support they need. Plenty of weekends get spent guessing at those problems. This
              one starts by hearing them directly.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <div className="num">1</div>
              <h3>Veterans speak</h3>
              <p>
                An open mic and a nonprofit panel open the weekend. Builders listen and take notes —
                no pitching solutions yet.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <div className="num">2</div>
              <h3>Teams form around real problems</h3>
              <p>
                Lightning pitches, then teams assemble across engineering, design, product, and
                lived experience.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <div className="num">3</div>
              <h3>Prototypes get built with veterans in the room</h3>
              <p>
                Veterans circulate between teams all weekend giving feedback and validating that the
                thing being built actually helps.
              </p>
            </Reveal>
          </div>
          <ul className="clean" style={{ marginTop: 26 }}>
            <li>Listen before building</li>
            <li>Veterans are collaborators, not just beneficiaries</li>
            <li>Focus on practical, implementable solutions</li>
            <li>Multidisciplinary teams beat solo heroics</li>
            <li>
              Prioritize ideas that can continue past the weekend — through incubation, open source,
              nonprofit partnerships, or startup formation
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Who we need</div>
            <h2>There is a place for you on a team</h2>
            <p className="lead">
              You do not need to be a veteran, and you do not need to arrive with an idea. Teams
              need range.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>Software engineers</h3>
              <p>Build the prototype. Web, mobile, AI, or hardware — all of it is in scope.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Veterans</h3>
              <p>
                Share what you ran into coming home, advise teams, and help shape what gets built.
                Bring technical skills too if you have them.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Designers</h3>
              <p>Make the thing usable by someone in a hard moment, not just demo-ready.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Product and project managers</h3>
              <p>Keep teams scoped and shipping by the Sunday deadline.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Students</h3>
              <p>Learn by building something that matters, next to people who do it for a living.</p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Nonprofits and service providers</h3>
              <p>
                Bring the barriers you hit every day, advise as subject-matter experts, and get a
                first look at tools built for your community.
              </p>
            </Reveal>
          </div>
          <p className="lead" style={{ marginTop: 22 }}>
            Project categories are wide open: AI, hardware, robotics, accessibility, healthcare,
            mobile apps, civic tech, education, employment, and mental wellness.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Agenda</div>
            <h2>Three days, start to finish</h2>
            <p className="lead">
              Times are planned and may shift slightly. Demo Day on Sunday evening is open to the
              public.
            </p>
          </Reveal>
          <div className="grid cols-3">
            {AGENDA.map((d) => (
              <Reveal key={d.day} className="panel">
                <div className="sec-label">{d.theme}</div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 10 }}>{d.day}</h3>
                {d.rows.map(([time, activity]) => (
                  <div className="mock-row" key={time + activity}>
                    <span className="k" style={{ whiteSpace: "nowrap" }}>
                      {time}
                    </span>
                    <span style={{ textAlign: "right" }}>{activity}</span>
                  </div>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Demo Day</div>
            <h2>What teams are judged on</h2>
            <p className="lead">
              Every team gets five minutes to present. Judges weigh what will actually hold up after
              the weekend ends.
            </p>
          </Reveal>
          <div className="grid cols-2">
            <Reveal className="card lift">
              <h3>Judging criteria</h3>
              <ul className="clean">
                <li>Impact for veterans</li>
                <li>Innovation</li>
                <li>Technical execution</li>
                <li>Feasibility</li>
                <li>User-centered design</li>
                <li>Veteran collaboration</li>
                <li>Presentation quality</li>
              </ul>
            </Reveal>
            <Reveal className="card lift">
              <h3>Awards</h3>
              <ul className="clean">
                <li>Best Overall Solution</li>
                <li>Veteran&apos;s Choice Award</li>
                <li>Best AI Solution</li>
                <li>Best Hardware Prototype</li>
                <li>Most Innovative</li>
                <li>Community Impact</li>
                <li>People&apos;s Choice</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="sponsor">
        <div className="container">
          <Reveal>
            <div className="sec-label">Sponsorship</div>
            <h2>Sponsor a weekend that outlasts itself</h2>
            <p className="lead">
              Sponsorship covers the venue, meals, prizes, and the resources that let participants
              build without paying out of pocket. Support can be funding, product credits,
              equipment, or people — we will tailor a package if the tiers below are not the right
              shape for you.
            </p>
          </Reveal>
          <div className="grid cols-2">
            {TIERS.map((t) => (
              <Reveal key={t.name} className="card lift">
                <h3>
                  {t.name} — {t.amount}
                </h3>
                <p className="muted" style={{ fontSize: ".85rem" }}>
                  {t.availability}
                </p>
                <ul className="clean">
                  {t.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="grid cols-2">
            <Reveal className="card lift">
              <h3>In-kind support</h3>
              <p>
                Sponsor a specific cost and get branding tied to it: breakfast, lunch, or dinner for
                the weekend, WiFi and infrastructure, or hardware and tools like 3D printing and
                electronics kits.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Add-on sponsorships</h3>
              <ul className="clean">
                <li>Veteran storytelling sponsor (open mic night) — $2,500</li>
                <li>Demo Day awards sponsor — $2,000</li>
                <li>Hackathon scholarship sponsor — $5,000</li>
                <li>Mentor program sponsor — $2,500</li>
              </ul>
            </Reveal>
          </div>
          <div className="note">
            S.U.A.S. Veteran Crisis Q.R.F. is a California 501(c)(3) public charity, EIN 88-3249428.
            Sponsorships and in-kind gifts may be tax-deductible — check with your tax advisor.
          </div>
          <div className="cta-row">
            <a className="btn btn-primary" href="#interest">
              Talk to us about sponsoring
            </a>
            <Link className="btn btn-ghost" href="/donate">
              Give directly instead
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="band">
            <h2>Free to attend. Bring what you have.</h2>
            <p className="lead" style={{ margin: "12px auto 0" }}>
              August 28–30, 2026 · Hacker Dojo, Mountain View, CA. Meals included, teams formed on
              site, no idea required to walk in the door.
            </p>
            <div className="cta-row" style={{ justifyContent: "center" }}>
              <a
                className="btn btn-primary"
                href={LUMA_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Save your spot
              </a>
              <a className="btn btn-ghost" href="#interest">
                Mentor, judge, or partner
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div id="interest" className="panel">
            <div className="sec-label">Get involved</div>
            <h2>Tell us how you want to show up</h2>
            <p className="lead">
              Registration for participants runs through{" "}
              <a href={LUMA_URL} target="_blank" rel="noopener noreferrer">
                Luma
              </a>
              . Use this form for anything else — mentoring, judging, sponsoring, partnering, or
              sharing your experience as a veteran.
            </p>
            <HackathonForm />
          </div>
          <div className="note warn">
            Veterans share only what they choose to share, and no one is asked to speak. If a
            conversation this weekend surfaces something heavy, the Veterans Crisis Line is available
            around the clock: dial <a href="tel:988">988</a> and press 1, or text 838255. See our{" "}
            <Link href="/safety">safety page</Link>.
          </div>
        </div>
      </section>
    </>
  );
}
