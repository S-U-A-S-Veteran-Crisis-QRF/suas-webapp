"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts its children into view on first scroll intersection.
 *
 * Safety fix (Oct 24, 2026): content must never stay invisible if
 * JavaScript, hydration, or IntersectionObserver fails. Previously the
 * CSS hid `.reveal` at opacity 0 and only JS could show it, so a failed
 * script left the page looking blank. Now:
 * - No IntersectionObserver support -> show immediately.
 * - Observer never fires -> a 1s fallback timer shows it anyway.
 * - No JavaScript at all -> a <noscript> style in layout.tsx forces
 *   `.reveal` visible (see layout).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fallback: never leave content hidden if the observer never fires.
    const fallback = window.setTimeout(() => setShown(true), 1000);
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return () => window.clearTimeout(fallback);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            window.clearTimeout(fallback);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`.trim()} {...rest}>
      {children}
    </Comp>
  );
}
