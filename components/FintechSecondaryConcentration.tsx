"use client";

interface CompanyBar {
  name: string;
  value: number;
  color: string;
  isOther?: boolean;
  otherLabel?: string;
}

const bars: CompanyBar[] = [
  { name: "Stripe", value: 413, color: "#5BB7E8" },
  { name: "SpaceX", value: 321, color: "#1B2A6B" },
  { name: "ByteDance", value: 314, color: "#1B2A6B" },
  { name: "Kraken", value: 176, color: "#F4A57F" },
  { name: "Groq", value: 172, color: "#1B2A6B" },
  { name: "Databricks", value: 144, color: "#1B2A6B" },
  { name: "Anthropic", value: 138, color: "#1B2A6B" },
  { name: "xAI", value: 128, color: "#1B2A6B" },
  { name: "Epic Games", value: 113, color: "#1B2A6B" },
  { name: "Anduril", value: 107, color: "#1B2A6B" },
  { name: "Shield AI", value: 103, color: "#1B2A6B" },
  { name: "Cohesity", value: 91, color: "#1B2A6B" },
  { name: "Rippling", value: 76, color: "#3DA5F0" },
  { name: "Glean", value: 75, color: "#1B2A6B" },
  { name: "Crusoe", value: 74, color: "#1B2A6B" },
  { name: "", value: 200, color: "transparent", isOther: true, otherLabel: "All Other (29%)" },
];

export default function FintechSecondaryConcentration() {
  const width = 1200;
  const height = 580;
  const paddingTop = 60;
  const paddingBottom = 80;
  const paddingX = 20;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;
  const barCount = bars.length;
  const barGap = 8;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;
  const maxValue = Math.max(...bars.filter((b) => !b.isOther).map((b) => b.value));
  const baselineY = paddingTop + chartHeight;

  return (
    <div>
      <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-8 max-w-4xl">
        The secondary market is highly concentrated
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
        <h3 className="font-display text-lg md:text-xl text-[#575757] text-center mb-6">
          Top 15 Private Companies (Across Industries) By LTM Executed Transaction Volume
          <span className="block text-sm md:text-base text-[#575757]/70 mt-1">($ in M)</span>
        </h3>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <line
            x1={paddingX}
            y1={baselineY}
            x2={width - paddingX}
            y2={baselineY}
            stroke="#9ca3af"
            strokeWidth="1.5"
          />

          {bars.map((b, i) => {
            const x = paddingX + i * (barWidth + barGap);
            const barH = (b.value / maxValue) * chartHeight;
            const y = baselineY - barH;
            const cx = x + barWidth / 2;

            if (b.isOther) {
              return (
                <g key={`other-${i}`}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barH}
                    fill="white"
                    stroke="#1C39BB"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                    rx={3}
                  />
                  <text
                    x={cx}
                    y={y + barH / 2 - 6}
                    textAnchor="middle"
                    fill="#1C39BB"
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="system-ui, sans-serif"
                  >
                    <tspan x={cx} dy="0">All</tspan>
                    <tspan x={cx} dy="16">Other</tspan>
                    <tspan x={cx} dy="16">(29%)</tspan>
                  </text>
                </g>
              );
            }

            return (
              <g key={b.name}>
                <rect x={x} y={y} width={barWidth} height={barH} fill={b.color} rx={2} />
                <text
                  x={cx}
                  y={y - 8}
                  textAnchor="middle"
                  fill="#1f2937"
                  fontSize="15"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  ${b.value}
                </text>
                <text
                  x={cx}
                  y={baselineY + 22}
                  textAnchor="middle"
                  fill="#1C39BB"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  {b.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="text-xs text-[#575757]/60 mt-4 space-y-1">
        <p>Source: Caplight Technologies, Inc. as of December 15, 2025</p>
        <p>Note: &apos;Other&apos; bar not to scale.</p>
      </div>
    </div>
  );
}
