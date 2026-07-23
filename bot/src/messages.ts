// All bot copy lives here. Two hard rules for a crisis-org bot:
//   1. Every reply leads with the Veterans Crisis Line (mirrors the site-wide
//      crisis-bar guardrail in components/CrisisBar.tsx — never bury it).
//   2. This bot is an automated signpost, NOT a counselor. It never tries to
//      triage, diagnose, or advise someone in crisis; it points to real,
//      human/clinical help every time.
//
// All facts below are already public on the live site — nothing invented.

const SITE = "https://s-u-a-s-veteran-crisis-qrf.github.io/suas-webapp";

// Telegram HTML parse mode. Keep messages short and scannable.
export const CRISIS_BLOCK =
  "🆘 <b>In crisis?</b> Veterans Crisis Line — call <b>988, press 1</b> or " +
  "text <b>838255</b>. If someone is in immediate danger, call 911.\n" +
  "<i>SUAS is support coordination, not emergency care.</i>";

const SIGNOFF = `\n\n🌐 ${SITE}/`;

export const START = (name?: string) =>
  `👋 <b>Welcome${name ? ", " + escapeHtml(name) : ""}.</b> This is the automated info line for ` +
  `<b>S.U.A.S. Veteran Crisis Q.R.F.</b>, a California 501(c)(3) veteran crisis quick-reaction force.\n\n` +
  `${CRISIS_BLOCK}\n\n` +
  `I'm an automated assistant — not a counselor. I can point you to help and info:\n` +
  `• /crisis — crisis line &amp; emergency help\n` +
  `• /services — what SUAS does\n` +
  `• /contact — reach a real person\n` +
  `• /donate — support the mission\n` +
  `• /volunteer — get involved\n` +
  `• /help — show this menu` +
  SIGNOFF;

export const HELP = START;

export const CRISIS =
  `${CRISIS_BLOCK}\n\n` +
  `More options:\n` +
  `• Call <b>988</b>, then press <b>1</b> (Veterans Crisis Line)\n` +
  `• Text <b>838255</b>\n` +
  `• Chat online: <a href="https://www.veteranscrisisline.net/">veteranscrisisline.net</a>\n` +
  `• Immediate danger: call <b>911</b>\n\n` +
  `You don't have to be enrolled in VA or registered anywhere to use these.`;

export const SERVICES =
  `${CRISIS_BLOCK}\n\n` +
  `<b>What SUAS does</b> — veteran crisis-prevention and care-coordination: ` +
  `connecting veterans and families to the right support before things reach a breaking point.\n\n` +
  `• How it works: ${SITE}/how-it-works/\n` +
  `• For veterans: ${SITE}/veterans/\n` +
  `• For families: ${SITE}/families/\n` +
  `• See the app demo: ${SITE}/app/`;

export const CONTACT =
  `${CRISIS_BLOCK}\n\n` +
  `<b>Reach a real person at SUAS</b> (not for emergencies — use 988 for those):\n` +
  `• Email: <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a>\n` +
  `• Phone: <a href="tel:+19257276109">+1 (925) 727-6109</a>\n` +
  `• Contact form: ${SITE}/contact/`;

export const DONATE =
  `${CRISIS_BLOCK}\n\n` +
  `❤️ <b>Support SUAS.</b> We're a California 501(c)(3) (EIN 88-3249428) — donations are tax-deductible.\n` +
  `• Donate: ${SITE}/donate/`;

export const VOLUNTEER =
  `${CRISIS_BLOCK}\n\n` +
  `🤝 <b>Get involved.</b> Partners, counties, and nonprofits can join a pilot; individuals can reach out directly.\n` +
  `• Pilot program: ${SITE}/pilot/\n` +
  `• For nonprofits: ${SITE}/nonprofits/\n` +
  `• For counties: ${SITE}/counties/\n` +
  `• Or just contact us: ${SITE}/contact/`;

// Any message we don't recognize as a command. The safe default is always the
// crisis line + a nudge to the menu — we never guess or try to counsel.
export const FALLBACK =
  `${CRISIS_BLOCK}\n\n` +
  `I'm an automated info bot and can't chat like a person — but a real person can. ` +
  `Send /contact to reach the team, or /help to see everything I can point you to.`;

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
