"use client";

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

export default function FintechWorldMap() {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-5xl text-[#1C39BB] leading-tight mb-6 md:mb-8 max-w-3xl">
        The most well funded VC-backed private FinTech companies
      </h2>

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
          className="absolute z-10 bg-[#1C39BB] text-white font-display text-[9px] sm:text-xs md:text-sm lg:text-base px-2 sm:px-3 md:px-4 py-0.5 md:py-1 rounded-full shadow-md whitespace-nowrap"
          style={{ left: "0%", top: "0%" }}
        >
          USA &amp; Canada
        </div>
        <div
          className="absolute z-10 bg-[#1C39BB] text-white font-display text-[9px] sm:text-xs md:text-sm lg:text-base px-2 sm:px-3 md:px-4 py-0.5 md:py-1 rounded-full shadow-md whitespace-nowrap"
          style={{ left: "37%", top: "0%" }}
        >
          Europe
        </div>
        <div
          className="absolute z-10 bg-[#1C39BB] text-white font-display text-[9px] sm:text-xs md:text-sm lg:text-base px-2 sm:px-3 md:px-4 py-0.5 md:py-1 rounded-full shadow-md whitespace-nowrap"
          style={{ left: "37%", top: "28%" }}
        >
          Rest of the World
        </div>

        {/* Logos — heights and Y positions compressed for tighter packing */}
        {data.logos.map((logo) => {
          const heightScale = 0.6;
          const yScale = 0.55;
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
      </div>

      <p className="text-[10px] md:text-xs text-[#575757]/60 mt-4 max-w-3xl">
        Source: FT Partners&apos; Proprietary Database; Represents the top 36 most well funded
        VC-backed companies in each region; Excludes majority owned PE-backed companies; Does
        not include companies publicly on file for IPO or in pending SPAC mergers.
      </p>
    </div>
  );
}
