"use client";

import { useState } from "react";
import positions from "../public/fintech-logos/positions.json";

interface LogoPosition {
  file: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface PositionsData {
  mapPlacement: { x: number; y: number; w: number; h: number };
  aspectRatio: number;
  logos: LogoPosition[];
}

const data = positions as PositionsData;

// Region classification by X position (approximate, based on slide layout):
// USA & Canada: x < 30
// Europe: 30 <= x < 65
// Rest of World: x >= 65
function classifyRegion(logo: LogoPosition): "usa-canada" | "europe" | "rest-of-world" {
  const cx = logo.x + logo.w / 2;
  if (cx < 30) return "usa-canada";
  if (cx < 65) return "europe";
  return "rest-of-world";
}

const regionLabels: Record<string, string> = {
  "usa-canada": "USA & Canada",
  europe: "Europe",
  "rest-of-world": "Rest of the World",
};

export default function FintechWorldMap() {
  const [openRegion, setOpenRegion] = useState<string | null>(null);

  const logosByRegion = {
    "usa-canada": data.logos.filter((l) => classifyRegion(l) === "usa-canada"),
    europe: data.logos.filter((l) => classifyRegion(l) === "europe"),
    "rest-of-world": data.logos.filter((l) => classifyRegion(l) === "rest-of-world"),
  };

  return (
    <div>
      <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-8 max-w-3xl">
        The most well funded VC-backed private FinTech companies
      </h2>

      {/* Desktop: positioned logos on world map */}
      <div className="hidden md:block">
        <div
          className="relative w-full pt-[8%]"
          style={{ aspectRatio: (data.aspectRatio * 0.92).toString() }}
        >
          {/* World map background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fintech-logos/world-map.svg"
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{
              left: `${data.mapPlacement.x}%`,
              top: `${5 + data.mapPlacement.y * 0.7}%`,
              width: `${data.mapPlacement.w}%`,
              height: `${data.mapPlacement.h * 0.7}%`,
              opacity: 0.19,
              objectFit: "fill",
            }}
          />

          {/* Region badges — placed in clear space, anchored top-left of each cluster */}
          <div
            className="absolute z-10 bg-[#1C39BB] text-white font-display text-sm lg:text-base px-4 py-1 rounded-full shadow-md"
            style={{ left: "0%", top: "0%" }}
          >
            USA &amp; Canada
          </div>
          <div
            className="absolute z-10 bg-[#1C39BB] text-white font-display text-sm lg:text-base px-4 py-1 rounded-full shadow-md"
            style={{ left: "42%", top: "0%" }}
          >
            Europe
          </div>
          <div
            className="absolute z-10 bg-[#1C39BB] text-white font-display text-sm lg:text-base px-4 py-1 rounded-full shadow-md"
            style={{ left: "37%", top: "44%" }}
          >
            Rest of the World
          </div>

          {/* Logos — heights and Y positions compressed for tighter packing */}
          {data.logos.map((logo) => {
            const heightScale = 0.6;
            const yScale = 0.7;
            const yOffset = 5;
            const newH = logo.h * heightScale;
            const newY = yOffset + logo.y * yScale + (logo.h * yScale - newH) / 2;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={logo.file}
                src={`/fintech-logos/raw/${logo.file}`}
                alt=""
                className="absolute object-contain"
                style={{
                  left: `${logo.x}%`,
                  top: `${newY}%`,
                  width: `${logo.w}%`,
                  height: `${newH}%`,
                }}
              />
            );
          })}

          {/* Source — absolutely positioned inside the aspect-ratio map container so it sits flush under the map artwork */}
          <p className="absolute left-0 right-0 bottom-2 text-xs text-[#575757]/60 max-w-3xl">
            Source: FT Partners&apos; Proprietary Database; Represents the top 36 most well funded
            VC-backed companies in each region; Excludes majority owned PE-backed companies; Does
            not include companies publicly on file for IPO or in pending SPAC mergers.
          </p>
        </div>
      </div>

      {/* Mobile: tap-region drawer */}
      <div className="md:hidden grid gap-3">
        {(["usa-canada", "europe", "rest-of-world"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setOpenRegion(id)}
            className="w-full bg-[#1C39BB] text-white font-display text-xl px-6 py-4 rounded-2xl flex items-center justify-between hover:bg-[#162d96] transition-colors"
          >
            <span>{regionLabels[id]}</span>
            <span className="text-sm opacity-80">
              {logosByRegion[id].length} companies
            </span>
          </button>
        ))}
      </div>

      {/* Mobile drawer */}
      {openRegion && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenRegion(null)}
          />
          <div className="relative w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
              <h3 className="font-display text-2xl text-[#1C39BB]">
                {regionLabels[openRegion]}
              </h3>
              <button
                onClick={() => setOpenRegion(null)}
                className="p-2 text-[#575757]"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 grid grid-cols-3 gap-2">
              {logosByRegion[openRegion as keyof typeof logosByRegion].map((logo) => (
                <div
                  key={logo.file}
                  className="aspect-[3/2] bg-white border border-gray-100 rounded-lg flex items-center justify-center p-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/fintech-logos/raw/${logo.file}`}
                    alt=""
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="md:hidden text-xs text-[#575757]/60 mt-4 max-w-3xl">
        Source: FT Partners&apos; Proprietary Database; Represents the top 36 most well funded
        VC-backed companies in each region; Excludes majority owned PE-backed companies; Does
        not include companies publicly on file for IPO or in pending SPAC mergers.
      </p>
    </div>
  );
}
