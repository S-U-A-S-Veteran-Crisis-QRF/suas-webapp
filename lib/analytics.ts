// Lightweight GA4 event helper. No-ops when the GA tag isn't loaded, so it is
// safe to call anywhere (including builds without NEXT_PUBLIC_GA_ID).
type GtagFn = (...args: unknown[]) => void;

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof g === "function") g("event", event, params);
}
