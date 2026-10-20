import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero">
      <div className="container">
        <div className="eyebrow">404</div>
        <h1>That page isn&rsquo;t here</h1>
        <p className="lede">
          The link may be out of date. Here is where to go instead.
        </p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/">
            Home
          </Link>
          <Link className="btn btn-ghost" href="/programs">
            Programs
          </Link>
          <Link className="btn btn-ghost" href="/contact">
            Contact
          </Link>
        </div>
        <p className="note" style={{ marginTop: 24 }}>
          In crisis? Veterans Crisis Line: call 988 and press 1, or text 838255.
        </p>
      </div>
    </section>
  );
}
