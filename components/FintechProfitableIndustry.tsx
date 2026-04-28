"use client";

interface IndustryBar {
  name: string;
  value: number;
  highlighted?: boolean;
}

const bars: IndustryBar[] = [
  { name: "Financial Services", value: 23, highlighted: true },
  { name: "Real Estate", value: 17 },
  { name: "Energy", value: 15 },
  { name: "Consumer", value: 12 },
  { name: "Manufacturing", value: 9 },
  { name: "TMT", value: 7 },
  { name: "Pharma", value: 7 },
  { name: "Other", value: 4 },
];

export default function FintechProfitableIndustry() {
  const width = 800;
  const height = 600;
  const paddingTop = 50;
  const paddingBottom = 30;
  const paddingX = 30;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;
  const barCount = bars.length;
  const barGap = 16;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;
  const maxValue = 25;
  const baselineY = paddingTop + chartHeight;

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-12">
          FinTech is the Future of the World&apos;s Most Profitable Industry
        </h2>
        <p className="text-xl md:text-2xl text-[#575757] leading-snug font-medium max-w-md">
          No industry generates more profit than financial services — and
          FinTech companies represent less than 3% of its revenue{" "}
          <sup className="text-base">(1)</sup>, leaving an extraordinary runway
          for disruption and growth ahead.
        </p>

        <div className="text-xs text-[#575757]/60 mt-12 space-y-1">
          <p className="font-medium">Sources:</p>
          <p>
            1) BCG: &ldquo;Global Fintech 2024: Prudence, Profits, and
            Growth&rdquo;
          </p>
          <p>
            2) BCG: &ldquo;Global Fintech 2023: Reimagining the Future of
            Finance&rdquo;
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <p className="text-[#1C39BB] font-display text-xl md:text-2xl font-semibold mb-2">
          Net Margin by Global Industry <sup className="text-sm">(1,2)</sup>
        </p>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {bars.map((b, i) => {
            const x = paddingX + i * (barWidth + barGap);
            const barH = (b.value / maxValue) * chartHeight;
            const y = baselineY - barH;
            const cx = x + barWidth / 2;
            const fill = b.highlighted ? "#1C39BB" : "#7BA5BD";
            return (
              <g key={b.name}>
                <rect x={x} y={y} width={barWidth} height={barH} fill={fill} />
                <text
                  x={cx}
                  y={y - 12}
                  textAnchor="middle"
                  fill="#1f2937"
                  fontSize="22"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                >
                  {b.value}%
                </text>
                <text
                  x={cx}
                  y={baselineY - 14}
                  textAnchor="start"
                  fill="white"
                  fontSize="17"
                  fontWeight="700"
                  fontFamily="system-ui, sans-serif"
                  transform={`rotate(-90, ${cx}, ${baselineY - 14})`}
                >
                  {b.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
