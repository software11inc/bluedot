"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "bd-banner-dismissed-research-ftp";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-[#1C39BB] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2">
          <Link
            href="/research"
            className="group flex flex-1 items-center gap-3 text-sm min-w-0"
          >
            <span className="hidden sm:inline-flex shrink-0 items-center rounded-full border border-white/30 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
              New
            </span>
            <span className="truncate">
              <span className="font-medium">FT Partners × Blue Dot Research</span>
              <span className="hidden md:inline text-white/80">
                {" "}
                — explore our latest fintech market insights
              </span>
            </span>
            <span className="shrink-0 inline-flex items-center gap-1 text-white/90 group-hover:text-white transition-colors">
              <span className="hidden sm:inline">Read more</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="shrink-0 -mr-2 p-2 text-white/70 hover:text-white transition-colors touch-manipulation"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
