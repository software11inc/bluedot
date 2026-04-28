"use client";

import { useState } from "react";

export interface PieSegment {
  name: string;
  value: number;
  color: string;
}

export interface FintechPieSectionProps {
  segments: PieSegment[];
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  description: string;
  source: string;
  unit?: string;
}

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: round(cx + r * Math.cos(angleRad)), y: round(cy + r * Math.sin(angleRad)) };
}

function describeSlice(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export default function FintechPieSection({
  segments,
  headlinePrefix,
  headlineHighlight,
  headlineSuffix,
  description,
  source,
  unit = "B",
}: FintechPieSectionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  const cx = 250;
  const cy = 250;
  const r = 180;
  let cumulative = 0;

  const slices = segments.map((seg) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += seg.value;
    const endAngle = (cumulative / total) * 360;
    const midAngle = (startAngle + endAngle) / 2;
    const innerLabel = polarToCartesian(cx, cy, r * 0.62, midAngle);
    const edgePoint = polarToCartesian(cx, cy, r, midAngle);
    const elbowPoint = polarToCartesian(cx, cy, r * 1.12, midAngle);
    const sharePct = (seg.value / total) * 100;
    const onRightSide = midAngle < 180 || midAngle > 345;
    const labelX = onRightSide ? elbowPoint.x + 12 : elbowPoint.x - 12;
    return {
      ...seg,
      path: describeSlice(cx, cy, r, startAngle, endAngle),
      innerLabel,
      edgePoint,
      elbowPoint,
      labelX,
      labelY: elbowPoint.y,
      onRightSide,
      sharePct,
    };
  });

  const toggleSelected = (name: string) => {
    setSelected((prev) => (prev === name ? null : name));
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-6">
          {headlinePrefix}{" "}
          <span className="text-[#5BB7E8]">{headlineHighlight}</span> {headlineSuffix}
        </h2>
        <p className="text-[#575757]/80 leading-relaxed mb-8 max-w-md">{description}</p>
        <ul className="space-y-1">
          {segments.map((s) => {
            const isActive = selected === s.name;
            const isDimmed = selected !== null && !isActive;
            return (
              <li key={s.name}>
                <button
                  type="button"
                  onClick={() => toggleSelected(s.name)}
                  className={`w-full flex items-center gap-3 text-sm text-left px-2 py-1.5 rounded transition-all ${
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
                  <span className="flex-1">{s.name}</span>
                  <span className="font-mono opacity-70">
                    ${s.value}
                    {unit}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-[#575757]/50 mt-6">{source}</p>
      </div>

      <div className="flex justify-center">
        <svg viewBox="0 0 500 500" className="w-full h-auto max-w-[520px] overflow-visible">
          {slices.map((s) => {
            const isActive = selected === s.name;
            const isDimmed = selected !== null && !isActive;
            return (
              <path
                key={s.name}
                d={s.path}
                fill={s.color}
                stroke={isActive ? "#1C39BB" : "white"}
                strokeWidth={isActive ? 3 : 1}
                opacity={isDimmed ? 0.35 : 1}
                onClick={() => toggleSelected(s.name)}
                style={{ cursor: "pointer", transition: "opacity 0.2s, stroke-width 0.2s" }}
              />
            );
          })}

          {slices.map((s) => {
            if (s.sharePct >= 6) {
              return (
                <text
                  key={`label-${s.name}`}
                  x={s.innerLabel.x}
                  y={s.innerLabel.y}
                  fill="white"
                  fontSize="20"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="var(--font-lyon-display), Georgia, serif"
                  style={{ pointerEvents: "none" }}
                >
                  ${s.value}
                  {unit}
                </text>
              );
            }
            return (
              <g key={`label-${s.name}`} style={{ pointerEvents: "none" }}>
                <polyline
                  points={`${s.edgePoint.x},${s.edgePoint.y} ${s.elbowPoint.x},${s.elbowPoint.y} ${s.labelX},${s.labelY}`}
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="1"
                />
                <text
                  x={s.labelX + (s.onRightSide ? 4 : -4)}
                  y={s.labelY - 6}
                  fill="#575757"
                  fontSize="13"
                  fontWeight="600"
                  textAnchor={s.onRightSide ? "start" : "end"}
                  fontFamily="system-ui, sans-serif"
                >
                  {s.name}
                </text>
                <text
                  x={s.labelX + (s.onRightSide ? 4 : -4)}
                  y={s.labelY + 10}
                  fill="#575757"
                  fontSize="14"
                  fontWeight="700"
                  textAnchor={s.onRightSide ? "start" : "end"}
                  fontFamily="var(--font-lyon-display), Georgia, serif"
                >
                  ${s.value}
                  {unit}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
