"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Records GA4 key events for Google Ad Grants conversion tracking:
 *  - donate_click: any click through to PayPal / GoFundMe / the Donate page
 *  - contact_click: tel: / mailto: taps
 */
export default function DonateClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (/paypal\.com|gofund\.me|gofundme\.com|zeffy\.com/i.test(href)) {
        track("donate_click", { destination: href });
      } else if (href === "/donate/" || href === "/donate") {
        track("donate_page_click", { from: window.location.pathname });
      } else if (href.startsWith("tel:")) {
        track("contact_click", { method: "phone" });
      } else if (href.startsWith("mailto:")) {
        track("contact_click", { method: "email" });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
