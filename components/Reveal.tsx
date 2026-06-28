"use client";

import { useEffect, useRef, useState } from "react";

/** Fades + lifts its children into view on first scroll intersection. */
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
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`.trim()} {...rest}>
      {children}
    </Comp>
  );
}
