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
              Nonprofit veteran crisis-prevention and care-coordination. Demo environment — not
              live clinical services.
            </p>
            <span className="attrib">Owned site for S.U.A.S. — California 501(c)(3)</span>
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
            <Link href="/safety">Safety</Link>
            <Link href="/about">About</Link>
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
          © 2026 S.U.A.S. Veteran Crisis Q.R.F. — California 501(c)(3), EIN 88-3249428. Demo
          platform for pilot planning.
        </div>
      </div>
    </footer>
  );
}
