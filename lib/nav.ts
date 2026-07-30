export type NavLink = { href: string; label: string };

// Primary header navigation (mirrors the original site order).
export const NAV_LINKS: NavLink[] = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/veterans", label: "Veterans" },
  { href: "/families", label: "Families" },
  { href: "/nonprofits", label: "Nonprofits" },
  { href: "/counties", label: "Counties" },
  { href: "/app", label: "Demo" },
  { href: "/pilot", label: "Pilot" },
  { href: "/hackathon", label: "Hackathon" },
];

// Footer "Explore" column.
export const FOOTER_EXPLORE: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/veterans", label: "Veterans" },
  { href: "/families", label: "Families" },
  { href: "/nonprofits", label: "Nonprofits" },
  { href: "/counties", label: "Counties" },
  { href: "/pilot", label: "Pilot" },
  { href: "/hackathon", label: "Hackathon" },
  { href: "/donate", label: "Donate" },
  { href: "/app", label: "App Demo" },
];
