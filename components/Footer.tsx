import Link from "next/link";
import { FOOTER_EXPLORE } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="site">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="brand">
              SUAS <span>Veteran Crisis Q.R.F.</span>
            </div>
            <p style={{ marginTop: 12, fontSize: ".9rem" }}>
              Peer-bridge crisis support for veterans in Santa Clara County, California: a fellow
              veteran, a ride, a meal, a safe bed. Not emergency care.
            </p>
            <p style={{ marginTop: 10, fontSize: ".85rem" }}>
              S.U.A.S. Veteran Crisis Q.R.F.
              <br />
              727 Edge Lane, Los Altos, CA 94024
              <br />
              <a href="tel:+19257276109">(925) 727-6109</a>
              <br />
              <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a>
            </p>
            <span className="attrib">California 501(c)(3) public charity · EIN 88-3249428</span>
          </div>
          <div>
            <h4>Explore</h4>
            {FOOTER_EXPLORE.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Trust &amp; governance</h4>
            <Link href="/about">About</Link>
            <Link href="/programs">Programs</Link>
            <Link href="/safety">Safety</Link>
            <Link href="/transparency">Transparency &amp; financials</Link>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h4>Safety</h4>
            <p style={{ fontSize: ".88rem" }}>
              If someone is in immediate danger, contact emergency services or a crisis line right
              away. SUAS is support coordination, not emergency care or a diagnosis tool.
            </p>
            <Link href="/safety">Read safety page →</Link>
          </div>
        </div>
        <div className="foot-bottom">
          © 2026 S.U.A.S. Veteran Crisis Q.R.F. — California nonprofit public benefit corporation,
          501(c)(3) public charity, EIN 88-3249428. Donations are tax-deductible as allowed by law.
        </div>
      </div>
    </footer>
  );
}
