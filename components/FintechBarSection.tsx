"use client";

import { useState } from "react";

export interface BarSegment {
  name: string;
  value: number;
  color: string;
}

export interface FintechBarSectionProps {
  segments: BarSegment[];
  headlinePrefix: string;
  headlineHighlight: string;
  description: string;
  source: string;
  yAxisLabel?: string;
  valueSuffix?: string;
  valueDecimals?: number;
}

export default function FintechBarSection({
  segments,
  headlinePrefix,
  headlineHighlight,
  description,
  source,
  yAxisLabel,
  valueSuffix = "",
  valueDecimals = 1,
}: FintechBarSectionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const width = 760;
  const height = 520;
  const paddingTop = 90;
  const paddingBottom = 10;
  const paddingX = 30;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;
  const barCount = segments.length;
  const barGap = 14;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;
  const maxValue = Math.max(...segments.map((s) => s.value));
  const baselineY = paddingTop + chartHeight;

  const toggleSelected = (name: string) => {
    setSelected((prev) => (prev === name ? null : name));
  };

  const formatValue = (v: number) => v.toFixed(valueDecimals) + valueSuffix;

  return (
    <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-10 items-end">
      <div className="flex flex-col h-full">
        <h2 className="font-display text-3xl md:text-4xl text-[#1C39BB] leading-tight mb-5">
          {headlinePrefix}{" "}
          <span className="text-[#5BB7E8]">{headlineHighlight}</span>
        </h2>
        <p className="text-[#575757]/80 leading-relaxed mb-5 max-w-md">{description}</p>
        <p className="text-xs text-[#575757]/50 mb-5">{source}</p>
        <ul className="space-y-1 mt-auto">
          {segments.map((s) => {
            const isActive = selected === s.name;
            const isDimmed = selected !== null && !isActive;
            return (
              <li key={s.name}>
                <button
                  type="button"
                  onClick={() => toggleSelected(s.name)}
                  className={`w-full flex items-center gap-3 text-sm text-left px-2 py-1 rounded transition-all ${
                    isActive
                      ? "bg-[#1C39BB]/10 text-[#1C39BB]"
                      : isDimmed
                      ? "opacity-40 hover:opacity-100"
                      : "hover:bg-gray-100 text-[#575757]"
                  }`}
                >
                  <span
                    className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="flex-1">{s.name.replace(/\n/g, " ")}</span>
                  <span className="font-mono opacity-70">{formatValue(s.value)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col h-full">
        {yAxisLabel && (
          <h3 className="font-display text-xl md:text-2xl text-[#1C39BB] text-center mb-2">
            {yAxisLabel}
          </h3>
        )}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto mt-auto"
          preserveAspectRatio="xMidYMax meet"
        >
          <line
            x1={paddingX}
            y1={baselineY}
            x2={width - paddingX}
            y2={baselineY}
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {segments.map((s, i) => {
            const isActive = selected === s.name;
            const isDimmed = selected !== null && !isActive;
            const barH = (s.value / maxValue) * chartHeight;
            const x = paddingX + i * (barWidth + barGap);
            const y = baselineY - barH;
            const nameLines = s.name.includes("\n")
              ? s.name.split("\n")
              : s.name.split(/\s*\/\s*/);
            const nameBaseY = y - 50;
            return (
              <g
                key={s.name}
                onClick={() => toggleSelected(s.name)}
                style={{ cursor: "pointer" }}
              >
                <text
                  x={x + barWidth / 2}
                  y={nameBaseY}
                  textAnchor="middle"
                  fill="#575757"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                  opacity={isDimmed ? 0.4 : 1}
                >
                  {nameLines.map((part, idx) => {
                    const isSlashSplit = !s.name.includes("\n") && nameLines.length > 1;
                    return (
                      <tspan key={idx} x={x + barWidth / 2} dy={idx === 0 ? 0 : 14}>
                        {part}
                        {isSlashSplit && idx < nameLines.length - 1 ? "/" : ""}
                      </tspan>
                    );
                  })}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={y - 14}
                  textAnchor="middle"
                  fill="#1C39BB"
                  fontSize="20"
                  fontWeight="700"
                  fontFamily="var(--font-lyon-display), Georgia, serif"
                  opacity={isDimmed ? 0.4 : 1}
                >
                  {formatValue(s.value)}
                </text>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  fill={s.color}
                  stroke={isActive ? "#1C39BB" : "transparent"}
                  strokeWidth={isActive ? 3 : 0}
                  opacity={isDimmed ? 0.35 : 1}
                  style={{ transition: "opacity 0.2s, stroke-width 0.2s" }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
