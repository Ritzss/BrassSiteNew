"use client";

import { useEffect } from "react";

export default function PWARegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "PWA service worker registered:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error(
            "PWA service worker registration failed:",
            error
          );
        });
    }
  }, []);

  return null;
}