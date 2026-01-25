"use client";

import { useEffect } from "react";

const API_BASE = "https://blue-dot-api.william-b0e.workers.dev";
const CACHE_KEYS = {
  stockPrices: "bd-research-stock-prices",
  marketCaps: "bd-research-market-caps",
};
const MIN_CACHE_COUNTS = {
  stockPrices: 8,
  marketCaps: 15,
};
function writeSessionCache<T>(key: string, data: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // Best-effort cache; ignore errors.
  }
}

export default function PrefetchResearchData() {
  useEffect(() => {
    const prefetch = () => {
      const doFetch = async () => {
        try {
          const [pricesResult, marketCapsResult] = await Promise.allSettled([
            fetch(`${API_BASE}/stock-prices`),
            fetch(`${API_BASE}/fintech-marketcaps`),
          ]);

          if (pricesResult.status === "fulfilled" && pricesResult.value.ok) {
            const json = await pricesResult.value.json();
            if ((json?.data || []).length >= MIN_CACHE_COUNTS.stockPrices) {
              writeSessionCache(CACHE_KEYS.stockPrices, json);
            }
          }

          if (marketCapsResult.status === "fulfilled" && marketCapsResult.value.ok) {
            const json = await marketCapsResult.value.json();
            if ((json?.data || []).length >= MIN_CACHE_COUNTS.marketCaps) {
              writeSessionCache(CACHE_KEYS.marketCaps, json);
            }
          }
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
