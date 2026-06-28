"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site">
      <div className="container nav">
        <Link className="brand" href="/">
          SUAS <span>Veteran Crisis Q.R.F.</span>
        </Link>
        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link className="btn btn-ghost btn-sm" href="/pilot">
            Join Pilot
          </Link>
          <Link className="btn btn-primary btn-sm" href="/donate">
            Support Mission
          </Link>
        </div>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          <nav onClick={() => setOpen(false)}>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-cta" onClick={() => setOpen(false)}>
            <Link className="btn btn-ghost btn-sm" href="/pilot">
              Join Pilot
            </Link>
            <Link className="btn btn-primary btn-sm" href="/donate">
              Support Mission
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
