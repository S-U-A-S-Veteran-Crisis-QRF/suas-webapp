"use client";

import { useEffect, useRef } from "react";

/**
 * Embeds a self-contained static demo (public/*.html) in an iframe so its
 * styles/scripts stay isolated from the site, and auto-resizes the frame to
 * its content height. Same-origin only.
 */
export default function EmbeddedDemo({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const resize = () => {
      try {
        const doc = frame.contentDocument;
        if (doc && doc.body) frame.style.height = doc.body.scrollHeight + "px";
      } catch {
        /* cross-origin — keep min-height fallback */
      }
    };
    frame.addEventListener("load", resize);
    window.addEventListener("resize", resize);
    // Re-measure briefly after load to catch late layout (fonts, reflow).
    const iv = setInterval(resize, 500);
    const stop = setTimeout(() => clearInterval(iv), 4000);
    return () => {
      frame.removeEventListener("load", resize);
      window.removeEventListener("resize", resize);
      clearInterval(iv);
      clearTimeout(stop);
    };
  }, [src]);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      loading="lazy"
      style={{ width: "100%", border: 0, minHeight: 720, display: "block" }}
    />
  );
}
