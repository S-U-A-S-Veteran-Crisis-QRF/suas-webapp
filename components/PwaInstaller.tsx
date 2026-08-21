"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstaller() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem("pwa-dismissed") === "1"; } catch { return false; }
  });

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setDismissed(true);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!prompt || dismissed) return null;

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") dismiss();
    setPrompt(null);
  };

  const dismiss = () => {
    try { sessionStorage.setItem("pwa-dismissed", "1"); } catch {}
    setDismissed(true);
  };

  return (
    <div className="pwa-install-banner" role="complementary" aria-label="Install app">
      <span className="pwa-install-text">
        Add SUAS QRF to your desktop for quick access.
      </span>
      <div className="pwa-install-actions">
        <button className="btn btn-primary pwa-install-btn" onClick={handleInstall}>
          Install App
        </button>
        <button
          className="btn btn-ghost pwa-install-dismiss"
          onClick={dismiss}
          aria-label="Dismiss install prompt"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
