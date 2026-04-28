"use client";

interface YearBar {
  year: string;
  value: number;
  deal?: React.ReactNode;
}

interface FintechSponsorBuyoutsProps {
  headline: string;
  chartTitle: string;
  chartSubtitle: string;
  bars: YearBar[];
  source: React.ReactNode;
  barColor?: string;
  valueColor?: string;
  valueSuffix?: string;
  valueInside?: boolean;
  callout?: { value: string; label: string };
}

export default function FintechSponsorBuyouts({
  headline,
  chartTitle,
  chartSubtitle,
  bars,
  source,
  barColor = "#A8C5D9",
  valueColor = "#374151",
  valueSuffix = "",
  valueInside = true,
  callout,
}: FintechSponsorBuyoutsProps) {
  const width = 1100;
  const height = 620;
  const paddingTop = 170;
  const paddingBottom = 70;
  const paddingX = 40;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;
  const barCount = bars.length;
  const barGap = 18;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;
  const maxValue = Math.max(...bars.map((b) => b.value));
  const baselineY = paddingTop + chartHeight;

  // Deal labels float a fixed distance above each bar so they oscillate
  // vertically with bar height — adjacent bars get labels at different y's.
  const labelContentHeight = 70;
  const labelGap = 14;

  return (
    <div>
      <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-8 max-w-md md:max-w-5xl">
        {headline}
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
          <div>
            <p className="text-[#5BB7E8] font-display text-xl md:text-2xl font-semibold leading-tight">
              {chartTitle}
            </p>
            <p className="text-[#1C39BB] font-display text-xl md:text-2xl font-semibold leading-tight">
              {chartSubtitle}
            </p>
          </div>
          {bars.some((b) => b.deal) && (
            <p className="text-[#1f2937] font-bold text-base md:text-lg border-b-2 border-[#1f2937] inline-block self-start md:self-auto">
              Selected Representative Transactions
            </p>
          )}
        </div>

        <div className="relative">
          {callout && (
            <div className="hidden md:block absolute md:top-8 md:left-8 z-10 bg-white shadow-md rounded-2xl md:px-8 md:py-6 border border-gray-100 max-w-[260px]">
              <div className="md:text-5xl font-bold text-[#16a34a] text-center leading-none">
                {callout.value}
              </div>
              <div className="md:text-base font-semibold text-[#16a34a] text-center mt-2 leading-snug">
                {callout.label}
              </div>
            </div>
          )}
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
            const valueY = valueInside ? y + barH / 2 + 8 : y - 14;
            const valueFill = valueInside ? "white" : valueColor;
            const labelPad = 4;
            const labelW = barWidth + labelPad * 2;
            const labelTop = Math.max(8, y - labelGap - labelContentHeight);
            const labelHeight = labelContentHeight;
            const connectorStartY = labelTop + labelHeight;
            return (
              <g key={b.year}>
                {b.deal && (
                  <>
                    <foreignObject
                      x={x - labelPad}
                      y={labelTop}
                      width={labelW}
                      height={labelHeight}
                      overflow="visible"
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          padding: "2px 2px 6px",
                          overflow: "visible",
                        }}
                      >
                        {typeof b.deal === "string" ? (
                          <div
                            style={{
                              textAlign: "center",
                              fontFamily: "system-ui, sans-serif",
                              fontSize: "12px",
                              fontWeight: 600,
                              lineHeight: 1.2,
                              color: "#1f2937",
                              wordBreak: "break-word",
                            }}
                          >
                            {b.deal}
                          </div>
                        ) : (
                          b.deal
                        )}
                      </div>
                    </foreignObject>
                    <line
                      x1={cx}
                      y1={connectorStartY}
                      x2={cx}
                      y2={y - 4}
                      stroke="#9ca3af"
                      strokeWidth="1"
                      strokeDasharray="2 3"
                    />
                  </>
                )}
                <rect x={x} y={y} width={barWidth} height={barH} fill={barColor} />
                <text
                  x={cx}
                  y={valueY}
                  textAnchor="middle"
                  fill={valueFill}
                  fontSize="22"
                  fontWeight="700"
                  fontFamily="var(--font-lyon-display), Georgia, serif"
                >
                  {b.value}
                  {valueSuffix}
                </text>
                <text
                  x={cx}
                  y={baselineY + 28}
                  textAnchor="middle"
                  fill="#1f2937"
                  fontSize="15"
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

      </div>

      {/* Mobile-only callout below the chart (in-chart pill is hidden on mobile to avoid overlap) */}
      {callout && (
        <div className="md:hidden mt-6 flex justify-center">
          <div className="bg-white shadow-md rounded-2xl px-6 py-4 border border-gray-100 max-w-xs">
            <div className="text-3xl font-bold text-[#16a34a] text-center leading-none">
              {callout.value}
            </div>
            <div className="text-sm font-semibold text-[#16a34a] text-center mt-2 leading-snug">
              {callout.label}
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-[#575757]/60 mt-4 space-y-1">{source}</div>
    </div>
  );
}
