"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

// Palette mirrors CrisisDemoApp so both halves of the demo read as one app.
const C = {
  bg: "#f4f3ef",
  bgCard: "#ffffff",
  border: "#e2dfd8",
  text: "#2a2a28",
  textDim: "#86847e",
  textHead: "#1a1a18",
  crisis: "#b3261e",
  green: "#2e9e68",
  greenDim: "rgba(46,158,104,0.10)",
  yellow: "#c99117",
  yellowDim: "rgba(201,145,23,0.12)",
  red: "#cf4438",
  redDim: "rgba(207,68,56,0.10)",
  navy: "#101f33",
  gold: "#c8993f",
};

const font = "'DM Sans', system-ui, sans-serif";

type Signal = "green" | "yellow" | "red";

// Six plain-language questions. Non-clinical on purpose — the brief's check-in
// produces a support signal "and nothing more," never a diagnosis. Each option
// scores 0 (steady) / 1 / 2 (strained). Question 6 doubles as a safety check.
const QUESTIONS: {
  q: string;
  options: { label: string; score: number }[];
  safety?: boolean;
}[] = [
  { q: "How did you sleep?", options: [{ label: "Well", score: 0 }, { label: "Okay", score: 1 }, { label: "Barely", score: 2 }] },
  { q: "Have you eaten today?", options: [{ label: "Yes", score: 0 }, { label: "A little", score: 1 }, { label: "Not really", score: 2 }] },
  { q: "How's your stress right now?", options: [{ label: "Low", score: 0 }, { label: "Some", score: 1 }, { label: "High", score: 2 }] },
  { q: "Do you have someone to talk to?", options: [{ label: "Yes", score: 0 }, { label: "Kind of", score: 1 }, { label: "Not really", score: 2 }] },
  { q: "How connected do you feel?", options: [{ label: "Connected", score: 0 }, { label: "So-so", score: 1 }, { label: "Alone", score: 2 }] },
  { q: "Do you feel safe tonight?", options: [{ label: "Yes", score: 0 }, { label: "Unsure", score: 1 }, { label: "No", score: 2 }], safety: true },
];

const SIGNAL_INFO: Record<
  Signal,
  { color: string; dim: string; label: string; headline: string; action: string; actionLabel: string | null }
> = {
  green: {
    color: C.green,
    dim: C.greenDim,
    label: "Green",
    headline: "You're steady tonight.",
    action: "Nothing needed right now. Help is one tap away if that changes.",
    actionLabel: null,
  },
  yellow: {
    color: C.yellow,
    dim: C.yellowDim,
    label: "Yellow",
    headline: "A little support might help.",
    action: "We suggest a light check-in from a peer who's been there.",
    actionLabel: "Reach out to a peer",
  },
  red: {
    color: C.red,
    dim: C.redDim,
    label: "Red",
    headline: "Let's get a person with you.",
    action: "A peer support specialist can reach out now. If you're in danger, 988 is one tap away.",
    actionLabel: "Connect with a peer now",
  },
};

// Safety override: answering "No" to feeling safe routes to a person (red),
// regardless of the rest. It never auto-dispatches anything.
function scoreToSignal(total: number, unsafe: boolean): Signal {
  if (unsafe) return "red";
  if (total <= 3) return "green";
  if (total <= 7) return "yellow";
  return "red";
}

export default function SupportSignalDemo() {
  const [screen, setScreen] = useState<"dashboard" | "checkin">("dashboard");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [signal, setSignal] = useState<Signal | null>(null);
  const [peerNotified, setPeerNotified] = useState(false);

  const startCheckin = () => {
    setScreen("checkin");
    setStep(0);
    setAnswers([]);
  };

  const answer = (score: number) => {
    const next = [...answers, score];
    if (step < QUESTIONS.length - 1) {
      setAnswers(next);
      setStep(step + 1);
      return;
    }
    // Last answer — compute the signal.
    const total = next.reduce((a, b) => a + b, 0);
    const unsafe = QUESTIONS[QUESTIONS.length - 1].safety === true && score === 2;
    setSignal(scoreToSignal(total, unsafe));
    setAnswers(next);
    setPeerNotified(false);
    setScreen("dashboard");
  };

  const back = () => {
    if (step === 0) {
      setScreen("dashboard");
    } else {
      setStep(step - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  // Always-present crisis escape. The site's global 988 crisis bar sits above
  // this component too; this in-flow tap guarantees the crisis path is never
  // gated behind the check-in — the top guardrail in the brief.
  const CrisisTap = () => (
    <a
      href="tel:988"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
        padding: "12px",
        background: C.crisis,
        color: "#fff",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 700,
        textDecoration: "none",
        marginBottom: "16px",
      }}
    >
      🆘 Call 988 · Press 1 — always available
    </a>
  );

  const Wrap = ({ children }: { children: ReactNode }) => (
    <div
      style={{
        minHeight: "calc(100vh - 200px)",
        background: C.bg,
        fontFamily: font,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "28px 20px 40px", maxWidth: "480px", margin: "0 auto", width: "100%" }}>{children}</div>
    </div>
  );

  const sectionCard: CSSProperties = {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "16px",
  };

  // ── CHECK-IN SCREEN ─────────────────────────────────────────
  if (screen === "checkin") {
    const current = QUESTIONS[step];
    return (
      <Wrap>
        <CrisisTap />
        <button
          onClick={back}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.textDim,
            fontSize: "15px",
            padding: 0,
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← Back
        </button>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "8px" }}>
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? "22px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background: i <= step ? C.navy : C.border,
                transition: "all .2s",
              }}
            />
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: "13px", color: C.textDim, margin: "0 0 22px" }}>
          Question {step + 1} of {QUESTIONS.length} · private
        </p>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: C.textHead,
            margin: "0 0 24px",
            textAlign: "center",
            lineHeight: 1.35,
          }}
        >
          {current.q}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {current.options.map((o) => (
            <button
              key={o.label}
              onClick={() => answer(o.score)}
              style={{
                width: "100%",
                padding: "22px",
                background: C.bgCard,
                border: `2px solid ${C.border}`,
                borderRadius: "16px",
                fontSize: "19px",
                fontWeight: 600,
                color: C.textHead,
                cursor: "pointer",
                textAlign: "center",
                transition: "border-color .15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.navy)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
            >
              {o.label}
            </button>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: C.textDim, margin: "24px 0 0", lineHeight: 1.6 }}>
          This is a private check-in, not a diagnosis. Nothing here is stored.
        </p>
      </Wrap>
    );
  }

  // ── DASHBOARD SCREEN ────────────────────────────────────────
  const sig = signal ? SIGNAL_INFO[signal] : null;

  return (
    <Wrap>
      <CrisisTap />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: C.textHead, margin: 0 }}>Your dashboard</h1>
        <p style={{ fontSize: "14px", color: C.textDim, margin: "4px 0 0" }}>How you&apos;re doing tonight</p>
      </div>

      {/* Support signal card */}
      {sig ? (
        <div
          style={{
            background: sig.dim,
            border: `2px solid ${sig.color}`,
            borderRadius: "18px",
            padding: "24px 20px",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: C.bgCard,
              borderRadius: "999px",
              padding: "6px 14px",
              marginBottom: "12px",
            }}
          >
            <span style={{ width: "12px", height: "12px", borderRadius: "999px", background: sig.color }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: sig.color, textTransform: "uppercase", letterSpacing: ".06em" }}>
              {sig.label}
            </span>
          </div>
          <h2 style={{ fontSize: "21px", fontWeight: 700, color: C.textHead, margin: "0 0 8px" }}>{sig.headline}</h2>
          <p style={{ fontSize: "15px", color: C.text, margin: 0, lineHeight: 1.5 }}>{sig.action}</p>
        </div>
      ) : (
        <div style={{ ...sectionCard, textAlign: "center", padding: "28px 20px" }}>
          <div style={{ fontSize: "34px", marginBottom: "10px" }}>🌙</div>
          <h2 style={{ fontSize: "19px", fontWeight: 700, color: C.textHead, margin: "0 0 6px" }}>No check-in yet</h2>
          <p style={{ fontSize: "15px", color: C.textDim, margin: 0, lineHeight: 1.5 }}>
            Take a moment when you&apos;re ready. Six quick questions, all private.
          </p>
        </div>
      )}

      {/* One next action — only for yellow/red, and only ever suggested to a human */}
      {sig?.actionLabel &&
        (peerNotified ? (
          <div
            style={{
              ...sectionCard,
              background: C.greenDim,
              border: `1px solid ${C.green}`,
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 700, color: C.green, marginBottom: "6px" }}>
              ✓ A peer has been notified
            </div>
            <p style={{ fontSize: "14px", color: C.text, margin: 0, lineHeight: 1.5 }}>
              A peer support specialist will reach out to you. This alerted a person — it didn&apos;t dispatch anything
              automatically, and you&apos;re still in control.
            </p>
          </div>
        ) : (
          <button
            onClick={() => setPeerNotified(true)}
            style={{
              width: "100%",
              padding: "18px",
              background: sig.color,
              border: "none",
              borderRadius: "14px",
              fontSize: "17px",
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            {sig.actionLabel}
          </button>
        ))}

      {/* Start / re-take check-in */}
      <button
        onClick={startCheckin}
        style={{
          width: "100%",
          padding: "18px",
          background: signal ? "none" : C.navy,
          border: signal ? `1.5px solid ${C.navy}` : "none",
          borderRadius: "14px",
          fontSize: "17px",
          fontWeight: 700,
          color: signal ? C.navy : "#fff",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {signal ? "Take the check-in again" : "Start private check-in"}
      </button>

      {/* Honesty footer — no overpromising, human-in-the-loop, minimum data */}
      <p style={{ fontSize: "12px", color: C.textDim, margin: 0, lineHeight: 1.65, textAlign: "center" }}>
        A yellow or red always goes to a real person — the signal never decides alone and never dispatches on its own.
        Nothing here is stored. Sample data only.
      </p>
    </Wrap>
  );
}
