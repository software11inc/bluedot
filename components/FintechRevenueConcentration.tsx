"use client";

import { useState } from "react";

interface Segment {
  key: string;
  name: string;
  value: number;
  gradient: string;
  textColor?: string;
}

const SEGMENTS: Segment[] = [
  {
    key: "top10",
    name: "Top Ten",
    value: 49,
    gradient: "linear-gradient(135deg, #C9C7FF 0%, #7A78FF 100%)",
  },
  {
    key: "others",
    name: "All Others",
    value: 40,
    gradient: "linear-gradient(135deg, #DDE9DE 0%, #4FA37A 100%)",
  },
  {
    key: "next10",
    name: "Next Ten",
    value: 11,
    gradient: "linear-gradient(135deg, #DCEAF5 0%, #6FA8D4 100%)",
  },
];

export default function FintechRevenueConcentration() {
  const [active, setActive] = useState<string | null>(null);

  const cell = (seg: Segment, extraClass = "") => {
    const isActive = active === seg.key;
    const dim = active && !isActive;
    return (
      <button
        type="button"
        onClick={() => setActive((prev) => (prev === seg.key ? null : seg.key))}
        className={`relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C39BB]/40 transition-opacity duration-300 ${
          dim ? "opacity-50" : "opacity-100"
        } ${extraClass}`}
        style={{ background: seg.gradient }}
      >
        {/* Subdivided cell pattern (decorative) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white/30" />
            ))}
          </div>
        </div>
        {/* Pill label */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="rounded-2xl bg-white/15 backdrop-blur-[2px] px-6 py-4 md:px-8 md:py-5 shadow-lg shadow-black/10 ring-1 ring-white/20 text-center">
            <p className="font-display text-white text-xl md:text-3xl leading-tight drop-shadow-sm">
              {seg.name}
            </p>
            <p className="font-display text-white text-2xl md:text-4xl font-semibold leading-tight drop-shadow-sm">
              {seg.value}%
            </p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
      {/* Left - Headline */}
      <div className="md:col-span-4">
        <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight">
          Approximately half of the revenue is concentrated in the top ten highest valued companies
        </h2>
        <p className="text-sm font-medium text-[#575757] mt-6">
          Private Top 100 by Valuation – % Revenue
        </p>
        <div className="text-xs text-[#575757]/60 mt-10 space-y-1">
          <p>
            Source: Company filings, company press releases, public news, FT Partners&apos;
            proprietary data and estimates
          </p>
        </div>
      </div>

      {/* Right - Stylized treemap */}
      <div className="md:col-span-8">
        <div
          className="grid w-full rounded-xl overflow-hidden"
          style={{
            gridTemplateColumns: "49fr 51fr",
            gridTemplateRows: "78fr 22fr",
            aspectRatio: "16 / 9",
          }}
        >
          {/* Top Ten - spans both rows on the left */}
          {cell(SEGMENTS[0], "row-span-2")}
          {/* All Others - top right */}
          {cell(SEGMENTS[1])}
          {/* Next Ten - bottom right */}
          {cell(SEGMENTS[2])}
        </div>
      </div>
    </div>
  );
}
