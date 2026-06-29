"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const C = {
  bg: "#f4f3ef",
  bgCard: "#ffffff",
  border: "#e2dfd8",
  text: "#2a2a28",
  textDim: "#86847e",
  textHead: "#1a1a18",
  rideColor: "#3a7bd5",
  rideDim: "rgba(58,123,213,0.10)",
  foodColor: "#2e9e68",
  foodDim: "rgba(46,158,104,0.10)",
  hotelColor: "#7a5fc0",
  hotelDim: "rgba(122,95,192,0.10)",
  danger: "#c94040",
  dangerBg: "#fff0f0",
  success: "#2e9e68",
  successBg: "#f0faf5",
  gold: "#c8a340",
};

const font = "'DM Sans', system-ui, sans-serif";

const BIG_BTN = (color: string, dimColor: string): CSSProperties => ({
  width: "100%",
  padding: "0 24px",
  height: "96px",
  background: dimColor,
  border: `2px solid ${color}`,
  borderRadius: "18px",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  cursor: "pointer",
  transition: "all .15s",
  textAlign: "left",
});

const MEALS = [
  { id: "burger", emoji: "🍔", label: "Cheeseburger", sub: "With fries" },
  { id: "chicken", emoji: "🍗", label: "Chicken Sandwich", sub: "Grilled or crispy" },
  { id: "veggie", emoji: "🥗", label: "Vegetarian Plate", sub: "Fresh & hot" },
];

const SERVICE_INFO = {
  ride: {
    emoji: "🚗",
    label: "Emergency Ride",
    color: "#3a7bd5",
    dimColor: "rgba(58,123,213,0.10)",
    confirmTitle: "Your ride is on the way",
    eta: "5 – 7 minutes",
    etaLabel: "Estimated arrival",
    simpleMsg: "A vehicle is heading to you now. Stay where you are.",
    details: [
      { icon: "📍", label: "Pickup", val: "Your current location" },
      { icon: "🚙", label: "Vehicle", val: "Waymo / Amazon AV" },
      { icon: "📞", label: "Support", val: "988 (Press 1)" },
    ],
  },
  food: {
    emoji: "🍲",
    label: "Food Delivery",
    color: "#2e9e68",
    dimColor: "rgba(46,158,104,0.10)",
    confirmTitle: "Your meal is being prepared",
    eta: "20 – 30 minutes",
    etaLabel: "Estimated delivery",
    simpleMsg: "Hot food is on its way to you. No payment needed.",
    details: [
      { icon: "🏪", label: "Partner", val: "Uber Eats" },
      { icon: "📦", label: "Order", val: "Paid by S.U.A.S. QRF" },
      { icon: "📞", label: "Support", val: "988 (Press 1)" },
    ],
  },
  hotel: {
    emoji: "🏨",
    label: "Hotel Voucher",
    color: "#7a5fc0",
    dimColor: "rgba(122,95,192,0.10)",
    confirmTitle: "Your room is confirmed",
    eta: "Ready now",
    etaLabel: "Check-in",
    simpleMsg: "Show this screen at the front desk. No payment required.",
    details: [
      { icon: "🏨", label: "Hotel", val: "Nearest partner property" },
      { icon: "🎫", label: "Voucher", val: "Pre-authorized" },
      { icon: "📞", label: "Support", val: "988 (Press 1)" },
    ],
  },
};

type ServiceKey = keyof typeof SERVICE_INFO;

export default function CrisisDemoApp() {
  const [screen, setScreen] = useState("home");
  const [service, setService] = useState<ServiceKey | null>(null);
  const [meal, setMeal] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [tracking, setTracking] = useState(false);

  const tapService = (svc: ServiceKey) => {
    setService(svc);
    setShowDetails(false);
    setTracking(false);
    if (svc === "food") setScreen("foodOptions");
    else setScreen("confirm");
  };

  const tapMeal = (m: string) => {
    setMeal(m);
    setScreen("confirm");
  };

  const reset = () => {
    setScreen("home");
    setService(null);
    setMeal(null);
    setShowDetails(false);
    setTracking(false);
  };

  // ── SHARED WRAPPER ──────────────────────────────────────────
  // The site already shows the global 988 crisis bar above this component,
  // so the app's own banner is omitted here to avoid two stacked bars.
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
      {children}
    </div>
  );

  // ── HOME SCREEN ─────────────────────────────────────────────
  if (screen === "home")
    return (
      <Wrap>
        <div style={{ padding: "28px 20px 40px", maxWidth: "480px", margin: "0 auto", width: "100%" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🇺🇸</div>
            <h1 style={{ fontFamily: font, fontSize: "22px", fontWeight: 700, color: C.textHead, margin: 0 }}>
              S.U.A.S. QRF
            </h1>
            <p style={{ fontSize: "15px", color: C.textDim, margin: "6px 0 0" }}>
              Veteran Emergency Services · Santa Clara County
            </p>
          </div>

          {/* Instruction */}
          <div
            style={{
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: "14px",
              padding: "16px 20px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "17px", color: C.text, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
              Tap what you need. Help is free.
            </p>
          </div>

          {/* 3 Big Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* RIDE */}
            <button onClick={() => tapService("ride")} style={BIG_BTN(C.rideColor, C.rideDim)}>
              <div style={{ fontSize: "38px", lineHeight: 1 }}>🚗</div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: C.rideColor }}>Free Ride</div>
                <div style={{ fontSize: "14px", color: C.textDim, marginTop: "2px" }}>
                  Waymo · Amazon AV · Dispatched now
                </div>
              </div>
            </button>

            {/* FOOD */}
            <button onClick={() => tapService("food")} style={BIG_BTN(C.foodColor, C.foodDim)}>
              <div style={{ fontSize: "38px", lineHeight: 1 }}>🍲</div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: C.foodColor }}>Free Food</div>
                <div style={{ fontSize: "14px", color: C.textDim, marginTop: "2px" }}>Hot meal · Delivered to you</div>
              </div>
            </button>

            {/* HOTEL */}
            <button onClick={() => tapService("hotel")} style={BIG_BTN(C.hotelColor, C.hotelDim)}>
              <div style={{ fontSize: "38px", lineHeight: 1 }}>🏨</div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: C.hotelColor }}>Emergency Shelter</div>
                <div style={{ fontSize: "14px", color: C.textDim, marginTop: "2px" }}>
                  Hotel voucher · No payment needed
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: "32px", fontSize: "13px", color: C.textDim, lineHeight: 1.6 }}>
            All services free · Paid by corporate sponsors
            <br />
            <span style={{ color: C.gold, fontWeight: 600 }}>suasqrf.org</span>
          </div>
        </div>
      </Wrap>
    );

  // ── FOOD OPTIONS SCREEN ─────────────────────────────────────
  if (screen === "foodOptions")
    return (
      <Wrap>
        <div style={{ padding: "28px 20px 40px", maxWidth: "480px", margin: "0 auto", width: "100%" }}>
          {/* Back */}
          <button
            onClick={reset}
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

          <h2 style={{ fontSize: "22px", fontWeight: 700, color: C.textHead, margin: "0 0 6px" }}>
            What would you like?
          </h2>
          <p style={{ fontSize: "15px", color: C.textDim, margin: "0 0 24px" }}>
            Pick one hot meal — delivered free to you.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {MEALS.map((m) => (
              <button
                key={m.id}
                onClick={() => tapMeal(m.id)}
                style={{
                  width: "100%",
                  padding: "20px 22px",
                  background: C.bgCard,
                  border: `2px solid ${C.border}`,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.foodColor)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
              >
                <div style={{ fontSize: "40px", lineHeight: 1 }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: "19px", fontWeight: 700, color: C.textHead }}>{m.label}</div>
                  <div style={{ fontSize: "14px", color: C.textDim, marginTop: "2px" }}>{m.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Wrap>
    );

  // ── CONFIRMATION SCREEN ─────────────────────────────────────
  if (screen === "confirm" && service) {
    const svc = SERVICE_INFO[service];
    const mealInfo = meal ? MEALS.find((m) => m.id === meal) : null;

    return (
      <Wrap>
        <div style={{ padding: "28px 20px 40px", maxWidth: "480px", margin: "0 auto", width: "100%" }}>
          {/* Status Card */}
          <div
            style={{
              background: svc.dimColor,
              border: `2px solid ${svc.color}`,
              borderRadius: "20px",
              padding: "28px 24px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ fontSize: "52px", marginBottom: "12px" }}>{svc.emoji}</div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: svc.color, margin: "0 0 10px" }}>
              {svc.confirmTitle}
            </h2>
            {mealInfo && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  borderRadius: "10px",
                  padding: "8px 16px",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "20px" }}>{mealInfo.emoji}</span>
                <span style={{ fontSize: "15px", fontWeight: 600, color: C.text }}>{mealInfo.label}</span>
              </div>
            )}

            {/* Big Simple Message */}
            <p style={{ fontSize: "18px", color: C.text, fontWeight: 500, lineHeight: 1.5, margin: "0 0 16px" }}>
              {svc.simpleMsg}
            </p>

            {/* ETA */}
            <div style={{ background: C.bgCard, borderRadius: "12px", padding: "12px 20px", display: "inline-block" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: C.textDim,
                  marginBottom: "2px",
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                }}
              >
                {svc.etaLabel}
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: svc.color }}>{svc.eta}</div>
            </div>
          </div>

          {/* Track Button */}
          {service !== "hotel" && (
            <button
              onClick={() => setTracking(!tracking)}
              style={{
                width: "100%",
                padding: "18px",
                background: C.bgCard,
                border: `1.5px solid ${svc.color}`,
                borderRadius: "14px",
                fontSize: "17px",
                fontWeight: 700,
                color: svc.color,
                cursor: "pointer",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              📍 {tracking ? "Tracking active..." : "Check location / ETA"}
            </button>
          )}

          {/* Tracking Mock */}
          {tracking && (
            <div
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: "14px",
                padding: "16px 20px",
                marginBottom: "12px",
                fontSize: "14px",
                color: C.text,
                lineHeight: 1.7,
              }}
            >
              <div style={{ fontWeight: 700, color: svc.color, marginBottom: "8px" }}>📡 Live Status</div>
              <div>✅ Request received</div>
              <div>✅ Provider confirmed</div>
              <div>🔄 {service === "food" ? "Preparing your meal..." : "Vehicle dispatched..."}</div>
              <div style={{ color: C.textDim, marginTop: "8px", fontSize: "13px" }}>Updates every 30 seconds</div>
            </div>
          )}

          {/* Expandable Details Toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              width: "100%",
              padding: "16px",
              background: "none",
              border: `1px solid ${C.border}`,
              borderRadius: "14px",
              fontSize: "15px",
              color: C.textDim,
              cursor: "pointer",
              marginBottom: "12px",
            }}
          >
            {showDetails ? "▲ Hide details" : "▼ Show details"}
          </button>

          {/* Expandable Details */}
          {showDetails && (
            <div
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: "14px",
                padding: "16px 20px",
                marginBottom: "12px",
              }}
            >
              {svc.details.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: i < svc.details.length - 1 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <div style={{ fontSize: "14px", color: C.textDim }}>
                    {d.icon} {d.label}
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>{d.val}</div>
                </div>
              ))}
            </div>
          )}

          {/* Start Over */}
          <button
            onClick={reset}
            style={{
              width: "100%",
              padding: "16px",
              background: "none",
              border: `1px solid ${C.border}`,
              borderRadius: "14px",
              fontSize: "15px",
              color: C.textDim,
              cursor: "pointer",
            }}
          >
            ← Back to home
          </button>

          {/* Support Line */}
          <div style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: C.textDim }}>
            Need help? Call <strong style={{ color: C.danger }}>988</strong> · Press 1 for Veterans
          </div>
        </div>
      </Wrap>
    );
  }

  return null;
}
