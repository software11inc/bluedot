"use client";

interface IPOBar {
  period: string;
  value: number;
  onFile?: number;
  callout?: string;
  calloutPosition?: "above" | "right";
}

const bars: IPOBar[] = [
  { period: "2005 - 2007", value: 33 },
  { period: "2008 - 2010", value: 20, callout: "Fewer IPOs due to Global Financial Crisis" },
  { period: "2011 - 2013", value: 30 },
  { period: "2014 - 2016", value: 39 },
  { period: "2017 - 2019", value: 40 },
  { period: "2020 - 2022", value: 65 },
  { period: "2023", value: 0, callout: "2023 was the first year since pre-2000 that had zero US FinTech IPOs" },
  { period: "2024 - 2025", value: 21 },
  { period: "2026 YTD", value: 5, onFile: 3 },
];

const median = 33;

export default function FintechIPOChart() {
  const width = 1100;
  const height = 600;
  const paddingTop = 80;
  const paddingBottom = 80;
  const paddingLeft = 60;
  const paddingRight = 40;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingLeft - paddingRight;
  const barCount = bars.length;
  const barGap = 22;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;
  const maxValue = Math.max(...bars.map((b) => b.value + (b.onFile ?? 0)));
  const baselineY = paddingTop + chartHeight;
  const yScale = (v: number) => (v / maxValue) * chartHeight;
  const medianY = baselineY - yScale(median);

  return (
    <div>
      <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-8 max-w-4xl">
        While FinTech IPOs resumed, recent activity levels are still lower than most other
        time periods
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
        <h3 className="font-display text-xl md:text-2xl text-[#1C39BB] mb-2">
          Number of US FinTech IPOs
        </h3>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* Median line */}
          <line
            x1={paddingLeft - 10}
            y1={medianY}
            x2={width - paddingRight}
            y2={medianY}
            stroke="#5BB7E8"
            strokeWidth="2"
            strokeDasharray="6,5"
          />
          <text
            x={paddingLeft - 18}
            y={medianY + 4}
            textAnchor="end"
            fill="#575757"
            fontSize="14"
            fontStyle="italic"
            fontFamily="system-ui, sans-serif"
          >
            Median
          </text>

          {/* Baseline */}
          <line
            x1={paddingLeft}
            y1={baselineY}
            x2={width - paddingRight}
            y2={baselineY}
            stroke="#9ca3af"
            strokeWidth="1.5"
          />

          {bars.map((b, i) => {
            const x = paddingLeft + i * (barWidth + barGap);
            const barH = yScale(b.value);
            const onFileH = yScale(b.onFile ?? 0);
            const totalTop = baselineY - barH - onFileH;
            const cx = x + barWidth / 2;
            const totalValue = b.value + (b.onFile ?? 0);

            return (
              <g key={b.period}>
                {/* Main bar */}
                {b.value > 0 && (
                  <rect
                    x={x}
                    y={baselineY - barH}
                    width={barWidth}
                    height={barH}
                    fill="#1C39BB"
                  />
                )}
                {/* On-file overlay */}
                {b.onFile && b.onFile > 0 && (
                  <>
                    <rect
                      x={x}
                      y={totalTop}
                      width={barWidth}
                      height={onFileH}
                      fill="#5BB7E8"
                    />
                    <text
                      x={cx}
                      y={totalTop + onFileH / 2 + 4}
                      textAnchor="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="system-ui, sans-serif"
                    >
                      {b.onFile} On File
                    </text>
                  </>
                )}
                {/* Inner value label (for tall bars only) */}
                {b.value >= 25 && (
                  <text
                    x={cx}
                    y={baselineY - 14}
                    textAnchor="middle"
                    fill="white"
                    fontSize="16"
                    fontWeight="700"
                    fontFamily="system-ui, sans-serif"
                  >
                    {b.value}
                  </text>
                )}
                {/* Top value label */}
                <text
                  x={cx}
                  y={totalTop - 12}
                  textAnchor="middle"
                  fill="#575757"
                  fontSize="22"
                  fontWeight="700"
                  fontFamily="var(--font-lyon-display), Georgia, serif"
                >
                  {totalValue}
                </text>
                {/* Period label */}
                <text
                  x={cx}
                  y={baselineY + 28}
                  textAnchor="middle"
                  fill="#575757"
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  {b.period}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Annotations row */}
        <div className="grid md:grid-cols-3 gap-6 mt-2 text-sm">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="font-bold text-[#575757]">2008–2010</p>
            <p className="text-[#575757]/80 mt-1">
              Fewer IPOs due to Global Financial Crisis.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="font-bold text-[#575757]">2023</p>
            <p className="text-[#575757]/80 mt-1">
              First year since pre-2000 with zero US FinTech IPOs.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="font-bold text-[#575757]">&apos;23 – &apos;25</p>
            <p className="text-[#575757]/80 mt-1">
              Lowest activity since the Global Financial Crisis.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-[#575757]/60 mt-4 space-y-1">
        <p>Source: FT Partners&apos; Proprietary Database</p>
        <p>
          Note: Count only includes US-listed IPOs that raised $30 million or more in gross
          proceeds.
        </p>
      </div>
    </div>
  );
}
