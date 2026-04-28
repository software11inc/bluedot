"use client";

interface YearStack {
  year: string;
  bottom: number;
  top: number;
}

interface ChartConfig {
  legend: { name: string; color: string; isTop: boolean }[];
  bars: YearStack[];
  cagrLabel: string;
}

const usBanks: ChartConfig = {
  legend: [
    { name: "Bank of America", color: "#C7CCD1", isTop: true },
    { name: "JPMorgan Chase", color: "#7A828A", isTop: false },
  ],
  bars: [
    { year: "2020", bottom: 63, top: 66 },
    { year: "2021", bottom: 66, top: 67 },
    { year: "2022", bottom: 70, top: 68 },
    { year: "2023", bottom: 82, top: 69 },
    { year: "2024", bottom: 84, top: 69 },
    { year: "2025", bottom: 87, top: 70 },
  ],
  cagrLabel: "CAGR ~4%",
};

const nuRevolut: ChartConfig = {
  legend: [
    { name: "Revolut", color: "#000000", isTop: true },
    { name: "Nu", color: "#7E22CE", isTop: false },
  ],
  bars: [
    { year: "2020", bottom: 33, top: 11 },
    { year: "2021", bottom: 54, top: 16 },
    { year: "2022", bottom: 75, top: 26 },
    { year: "2023", bottom: 94, top: 38 },
    { year: "2024", bottom: 114, top: 53 },
    { year: "2025", bottom: 131, top: 68 },
  ],
  cagrLabel: "CAGR ~35%",
};

function StackedBarChart({
  config,
  globalMax,
  legendLogos,
}: {
  config: ChartConfig;
  globalMax: number;
  legendLogos?: { topLogo?: React.ReactNode; bottomLogo?: React.ReactNode };
}) {
  const width = 540;
  const height = 480;
  const paddingTop = 110;
  const paddingBottom = 50;
  const paddingX = 30;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;
  const barCount = config.bars.length;
  const barGap = 16;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;
  const baselineY = paddingTop + chartHeight;

  const positions = config.bars.map((b, i) => {
    const x = paddingX + i * (barWidth + barGap);
    const total = b.bottom + b.top;
    const totalH = (total / globalMax) * chartHeight;
    const bottomH = (b.bottom / globalMax) * chartHeight;
    const topH = (b.top / globalMax) * chartHeight;
    return {
      ...b,
      x,
      cx: x + barWidth / 2,
      total,
      totalH,
      bottomH,
      topH,
      bottomY: baselineY - bottomH,
      topY: baselineY - bottomH - topH,
    };
  });

  const firstBar = positions[0];
  const lastBar = positions[positions.length - 1];
  const trendStartY = baselineY - firstBar.totalH;
  const trendEndY = baselineY - lastBar.totalH;
  const calloutCx = (firstBar.cx + lastBar.cx) / 2;
  const calloutY = (trendStartY + trendEndY) / 2 - 30;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center gap-3">
          <span className="inline-block w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ backgroundColor: config.legend[0].color }} />
          <span className="font-semibold text-[#1f2937] text-base flex items-center gap-2">
            {config.legend[0].name}
            {legendLogos?.topLogo}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-block w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ backgroundColor: config.legend[1].color }} />
          <span className="font-semibold text-[#1f2937] text-base flex items-center gap-2">
            {config.legend[1].name}
            {legendLogos?.bottomLogo}
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <line
          x1={paddingX}
          y1={baselineY}
          x2={width - paddingX}
          y2={baselineY}
          stroke="#9ca3af"
          strokeWidth="1.5"
        />

        {/* Trend line — endpoints pulled inward so they don't touch the total labels */}
        <line
          x1={firstBar.cx + 28}
          y1={trendStartY - 32}
          x2={lastBar.cx - 28}
          y2={trendEndY - 40}
          stroke="#9ca3af"
          strokeWidth="1.5"
          strokeDasharray="6,5"
        />

        {/* Bars */}
        {positions.map((p, i) => (
          <g key={p.year}>
            <rect
              x={p.x}
              y={p.bottomY}
              width={barWidth}
              height={p.bottomH}
              fill={config.legend[1].color}
            />
            <rect
              x={p.x}
              y={p.topY}
              width={barWidth}
              height={p.topH}
              fill={config.legend[0].color}
            />
            {/* Inside bar values */}
            {p.bottomH > 22 && (
              <text
                x={p.cx}
                y={p.bottomY + p.bottomH / 2 + 5}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                {p.bottom}
              </text>
            )}
            {p.topH > 22 && (
              <text
                x={p.cx}
                y={p.topY + p.topH / 2 + 5}
                textAnchor="middle"
                fill={config.legend[0].color === "#000000" ? "white" : "#374151"}
                fontSize="14"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                {p.top}
              </text>
            )}
            {/* Year label */}
            <text
              x={p.cx}
              y={baselineY + 24}
              textAnchor="middle"
              fill="#1f2937"
              fontSize="14"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              {p.year}
            </text>
            {/* First and last total */}
            {(i === 0 || i === positions.length - 1) && (
              <text
                x={p.cx}
                y={p.topY - 10}
                textAnchor="middle"
                fill="#1C39BB"
                fontSize="16"
                fontWeight="700"
                fontFamily="var(--font-lyon-display), Georgia, serif"
              >
                {p.total}M
              </text>
            )}
          </g>
        ))}

        {/* CAGR callout */}
        <g>
          <rect
            x={calloutCx - 65}
            y={calloutY - 16}
            width={130}
            height={32}
            rx={10}
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <text
            x={calloutCx}
            y={calloutY + 5}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            <tspan fill="#1f2937">CAGR </tspan>
            <tspan fill="#16a34a">{config.cagrLabel.replace("CAGR ", "")}</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function FintechCustomerBaseComparison() {
  const globalMax = Math.max(
    ...usBanks.bars.map((b) => b.bottom + b.top),
    ...nuRevolut.bars.map((b) => b.bottom + b.top)
  );

  return (
    <div>
      <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-3 max-w-4xl">
        Nu and Revolut&apos;s combined customer bases now exceed those of two of the largest
        U.S. banks
      </h2>
      <p className="text-[#575757]/80 text-base md:text-lg mb-8">
        Number of Customers (# in M) / % YoY Growth
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <StackedBarChart config={usBanks} globalMax={globalMax} />
        <StackedBarChart config={nuRevolut} globalMax={globalMax} />
      </div>

      <div className="text-xs text-[#575757]/60 mt-6 space-y-1 max-w-4xl">
        <p>Source: Company filings</p>
        <p>
          1) Bank of America reports consumer and small business clients in its Consumer
          Banking segment.
        </p>
        <p>
          2) JPMorgan Chase reports consumer households (2020–2022) and consumers (2023–2025)
          in Consumer &amp; Community Banking disclosures.
        </p>
      </div>
    </div>
  );
}
