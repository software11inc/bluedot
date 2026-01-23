"use client";

import { useEffect } from "react";

const API_BASE = "https://blue-dot-api.william-b0e.workers.dev";

export default function PrefetchResearchData() {
  useEffect(() => {
    const prefetch = () => {
      const doFetch = async () => {
        try {
          await Promise.allSettled([
            fetch(`${API_BASE}/stock-prices`),
            fetch(`${API_BASE}/fintech-marketcaps`),
          ]);
        } catch {
          // Best-effort warmup; ignore errors.
        }
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => void doFetch());
      } else {
        setTimeout(() => void doFetch(), 800);
      }
    };

    if (document.readyState === "complete") {
      prefetch();
      return;
    }

    window.addEventListener("load", prefetch, { once: true });
    return () => window.removeEventListener("load", prefetch);
  }, []);

  return null;
}
