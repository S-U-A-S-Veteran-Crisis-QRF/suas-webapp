"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts its children into view on first scroll intersection.
 *
 * Safety fix (Oct 24, 2026): content must be visible by default.
 * Previously the server HTML carried class="reveal" (opacity: 0 in CSS)
 * and only JavaScript could add "in" to show it, so any JS/observer
 * failure left the whole middle of the page blank between header and
 * footer. Now the server render carries NO reveal class at all, so
 * the content is visible even with no JavaScript. The reveal class
 * is only added after JS mounts, and then:
 * - No IntersectionObserver support -> show immediately.
 * - Observer never fires -> a 1s fallback timer shows it anyway.
 * - No JavaScript at all -> content was never hidden in the first place
 *   (plus a <noscript> style in layout.tsx as a belt-and-braces fallback).
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
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setMounted(true);
    // If already in view, show immediately to avoid a flash-hide.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return;
    }
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
  const revealClass = mounted ? `reveal ${shown ? "in" : ""}` : "";
  return (
    <Comp ref={ref} className={`${revealClass} ${className}`.trim()} {...rest}>
      {children}
    </Comp>
  );
}
