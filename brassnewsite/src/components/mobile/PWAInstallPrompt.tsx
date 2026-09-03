"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function PWAInstallPrompt() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent Chrome from immediately showing its default prompt.
      event.preventDefault();

      setInstallEvent(event as BeforeInstallPromptEvent);

      // Show our custom prompt after the user has had
      // a moment to explore the store.
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installEvent) {
      return;
    }

    await installEvent.prompt();

    const { outcome } = await installEvent.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }

    // The browser's install event can only be used once.
    setInstallEvent(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);

    // Don't immediately annoy the visitor again during
    // the current browsing session.
    sessionStorage.setItem("brass-install-dismissed", "true");
  };

  // Don't show the prompt if the user already dismissed it.
  useEffect(() => {
    if (sessionStorage.getItem("brass-install-dismissed")) {
      setShowPrompt(false);
    }
  }, []);

  if (!showPrompt || !installEvent) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-24 z-[10000] md:bottom-6">
      <div
        className="
          mx-auto max-w-md
          overflow-hidden rounded-[28px]
          border border-[#E4E198]/25
          bg-[#0E4001]/95
          p-5
          text-[#F4F2DD]
          shadow-[0_25px_80px_-25px_rgba(0,0,0,.65)]
          backdrop-blur-2xl
        "
      >
        <div className="flex items-start gap-4">
          {/* Brand mark */}
          <div
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl
              border border-[#E4E198]/30
              bg-[#E4E198]/10
              font-serif text-xl italic
              text-[#E4E198]
            "
          >
            B
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#E4E198]/70">
              Brass App
            </p>

            <h3 className="mt-1 font-serif text-xl italic">
              Take Brass with you.
            </h3>

            <p className="mt-1.5 text-xs leading-5 text-[#F4F2DD]/65">
              Install our app for a faster, app-like shopping experience.
            </p>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
            className="
              shrink-0
              text-lg leading-none
              text-[#F4F2DD]/45
              transition-colors
              hover:text-[#F4F2DD]
            "
          >
            ×
          </button>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleInstall}
            className="
              flex-1 rounded-full
              bg-[#E4E198]
              px-5 py-3
              text-[10px] font-semibold
              uppercase tracking-[0.2em]
              text-[#0E4001]
              transition
              hover:bg-[#F4F2DD]
            "
          >
            Install App
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="
              rounded-full
              border border-[#E4E198]/25
              px-5 py-3
              text-[10px] uppercase tracking-[0.2em]
              text-[#F4F2DD]/70
              transition
              hover:border-[#E4E198]/50
              hover:text-[#F4F2DD]
            "
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}