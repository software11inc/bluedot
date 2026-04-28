"use client";

interface YearBar {
  year: string;
  value: number;
  highlighted?: boolean;
}

const bars: YearBar[] = [
  { year: "2010", value: 989 },
  { year: "2011", value: 1027 },
  { year: "2012", value: 1224 },
  { year: "2013", value: 1623 },
  { year: "2014", value: 1982, highlighted: true },
  { year: "2015", value: 2316, highlighted: true },
  { year: "2016", value: 2341, highlighted: true },
  { year: "2017", value: 2761, highlighted: true },
  { year: "2018", value: 2712, highlighted: true },
  { year: "2019", value: 2306 },
  { year: "2020", value: 2445 },
  { year: "2021", value: 2953 },
  { year: "2022", value: 2165 },
  { year: "2023", value: 1404 },
  { year: "2024", value: 935 },
];

export default function FintechMatureVintages() {
  const width = 1200;
  const height = 560;
  const paddingTop = 100;
  const paddingBottom = 70;
  const paddingX = 40;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;
  const barCount = bars.length;
  const barGap = 14;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;
  const maxValue = Math.max(...bars.map((b) => b.value));
  const baselineY = paddingTop + chartHeight;

  const highlightedIndices = bars
    .map((b, i) => (b.highlighted ? i : -1))
    .filter((i) => i >= 0);
  const firstHi = highlightedIndices[0];
  const lastHi = highlightedIndices[highlightedIndices.length - 1];
  const hiX = paddingX + firstHi * (barWidth + barGap) - barGap / 2;
  const hiW =
    (lastHi - firstHi + 1) * barWidth + (lastHi - firstHi) * barGap + barGap;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight">
            Mature fund vintages are triggering a wave of liquidity pressure on
            2014–2018 cohorts
          </h2>
          <p className="text-[#575757] mt-3 text-base md:text-lg">
            FinTech Companies by Year Founded with No Exit
          </p>
        </div>
        <div className="md:pl-8 md:border-l md:border-gray-200 flex items-center">
          <p className="font-display text-xl md:text-2xl text-[#1C39BB] leading-snug">
            Most funds backing 2014–2018 formations are entering years ~10+,
            when distributions to LPs become urgent.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <rect
            x={hiX}
            y={paddingTop - 20}
            width={hiW}
            height={chartHeight + 30}
            fill="none"
            stroke="#1C39BB"
            strokeWidth="1.5"
            strokeDasharray="6 5"
            rx="6"
          />

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
            const fill = b.highlighted ? "#1C39BB" : "#C7CFF0";
            return (
              <g key={b.year}>
                <rect x={x} y={y} width={barWidth} height={barH} fill={fill} />
                <text
                  x={cx}
                  y={y - 12}
                  textAnchor="middle"
                  fill="#1f2937"
                  fontSize="20"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  {b.value.toLocaleString()}
                </text>
                <text
                  x={cx}
                  y={baselineY + 28}
                  textAnchor="middle"
                  fill="#1f2937"
                  fontSize="16"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  {b.year}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-xs text-[#575757]/60 mt-4">
        Source: FT Partners&apos; Proprietary Database
      </p>
    </div>
  );
}
