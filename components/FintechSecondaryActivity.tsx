"use client";

const data = [
  { year: "2023", volume: 248, dealCount: 102 },
  { year: "2024", volume: 232, dealCount: 130 },
  { year: "2025", volume: 864, dealCount: 240 },
];

export default function FintechSecondaryActivity() {
  const width = 760;
  const height = 600;
  const paddingTop = 150;
  const paddingBottom = 70;
  const paddingX = 70;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;
  const barCount = data.length;
  const barGap = 80;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;
  const maxVolume = Math.max(...data.map((d) => d.volume));
  const maxDeals = Math.max(...data.map((d) => d.dealCount));
  const baselineY = paddingTop + chartHeight;
  // Compress the deal-count line so circles never sit at the very top of the chart
  const lineScale = 0.72;

  const positions = data.map((d, i) => {
    const x = paddingX + i * (barWidth + barGap);
    const barH = (d.volume / maxVolume) * chartHeight;
    const lineY = baselineY - (d.dealCount / maxDeals) * chartHeight * lineScale;
    return {
      ...d,
      x,
      barH,
      barTopY: baselineY - barH,
      cx: x + barWidth / 2,
      lineY,
    };
  });

  const linePath = positions
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.cx} ${p.lineY}`)
    .join(" ");

  const yoyMultiplier = (positions[2].volume / positions[1].volume).toFixed(1);

  // Callout sits above the 2025 bar with a single arrow pointing down to its bar top.
  // The volume text "$864" lives inside the bar so the connector lands cleanly on the bar.
  const calloutWidth = 200;
  const calloutHeight = 60;
  const calloutCx = positions[2].cx;
  const calloutY = 18;
  const arrowFromY = calloutY + calloutHeight + 6;
  const arrowToY = positions[2].barTopY - 8;

  return (
    <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] gap-10 items-end">
      <div className="flex flex-col h-full">
        <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-6">
          FinTech secondary activity surged in 2025
        </h2>
        <p className="text-[#575757]/80 leading-relaxed mb-6">
          FinTech secondary volume increased nearly{" "}
          <span className="font-semibold text-[#1C39BB]">4x</span> year-over-year in 2025.
        </p>
        <p className="text-xs text-[#575757]/60 mt-auto">
          Source: Caplight Technologies, Inc. as of 12/15/2025
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h3 className="font-display text-lg md:text-xl text-[#1C39BB] mb-2">
          Secondary Volume ($ in M) / Deal Count
        </h3>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <defs>
            <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B5BD9" />
              <stop offset="100%" stopColor="#1C39BB" />
            </linearGradient>
          </defs>

          {/* Baseline */}
          <line
            x1={paddingX}
            y1={baselineY}
            x2={width - paddingX}
            y2={baselineY}
            stroke="#9ca3af"
            strokeWidth="1.5"
          />

          {/* Bars */}
          {positions.map((p) => {
            const valueInsideBar = p.barH > 80;
            return (
              <g key={p.year}>
                <rect
                  x={p.x}
                  y={p.barTopY}
                  width={barWidth}
                  height={p.barH}
                  fill="url(#volumeGrad)"
                />
                <text
                  x={p.cx}
                  y={valueInsideBar ? p.barTopY + 38 : p.barTopY - 14}
                  textAnchor="middle"
                  fill={valueInsideBar ? "white" : "#575757"}
                  fontSize="22"
                  fontWeight="700"
                  fontFamily="var(--font-lyon-display), Georgia, serif"
                >
                  ${p.volume}
                </text>
                <text
                  x={p.cx}
                  y={baselineY + 32}
                  textAnchor="middle"
                  fill="#1C39BB"
                  fontSize="16"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  {p.year}
                </text>
              </g>
            );
          })}

          {/* Trend line + deal count circles */}
          <path d={linePath} fill="none" stroke="#1C39BB" strokeWidth="3" />
          {positions.map((p) => (
            <g key={`marker-${p.year}`}>
              <circle cx={p.cx} cy={p.lineY} r="22" fill="#1C39BB" />
              <text
                x={p.cx}
                y={p.lineY + 5}
                textAnchor="middle"
                fill="white"
                fontSize="15"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                {p.dealCount}
              </text>
            </g>
          ))}

          {/* Single connector: callout → 2025 bar top */}
          <line
            x1={calloutCx}
            y1={arrowFromY}
            x2={calloutCx}
            y2={arrowToY - 8}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="5,4"
          />
          <polygon
            points={`${calloutCx - 5},${arrowToY - 8} ${calloutCx + 5},${arrowToY - 8} ${calloutCx},${arrowToY}`}
            fill="#9ca3af"
          />

          {/* 3.7x callout */}
          <g>
            <rect
              x={calloutCx - calloutWidth / 2}
              y={calloutY}
              width={calloutWidth}
              height={calloutHeight}
              rx={14}
              fill="white"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={calloutCx}
              y={calloutY + 26}
              textAnchor="middle"
              fill="#16a34a"
              fontSize="22"
              fontWeight="800"
              fontFamily="system-ui, sans-serif"
            >
              {yoyMultiplier}x increase
            </text>
            <text
              x={calloutCx}
              y={calloutY + 48}
              textAnchor="middle"
              fill="#1f2937"
              fontSize="15"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
            >
              in volume
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
