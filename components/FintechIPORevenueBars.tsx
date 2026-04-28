"use client";

interface IPOBar {
  period: string;
  value: number;
  color: string;
}

interface FintechIPORevenueBarsProps {
  headline: string;
  description: React.ReactNode;
  source: string;
  chartTitle: string;
  bars: IPOBar[];
  unitPrefix?: string;
  unitSuffix?: string;
}

export default function FintechIPORevenueBars({
  headline,
  description,
  source,
  chartTitle,
  bars,
  unitPrefix = "$",
  unitSuffix = "M",
}: FintechIPORevenueBarsProps) {
  const width = 720;
  const height = 480;
  const paddingTop = 70;
  const paddingBottom = 60;
  const paddingX = 50;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingX * 2;
  const barCount = bars.length;
  const barGap = 60;
  const barWidth = (chartWidth - barGap * (barCount - 1)) / barCount;
  const maxValue = Math.max(...bars.map((b) => b.value));
  const baselineY = paddingTop + chartHeight;

  const positions = bars.map((b, i) => {
    const barH = (b.value / maxValue) * chartHeight;
    const x = paddingX + i * (barWidth + barGap);
    return {
      ...b,
      x,
      barH,
      cx: x + barWidth / 2,
      topY: baselineY - barH,
    };
  });

  const firstBar = positions[0];
  const lastBar = positions[positions.length - 1];
  const multiplier = (lastBar.value / firstBar.value).toFixed(1);
  const valueLabelClearance = 32; // vertical clearance above bar top to clear the value text
  const valueLabelHalfWidth = 52; // horizontal half-width of value text (e.g., "$673 M")
  const lineY = lastBar.topY - valueLabelClearance;
  const verticalLineStartY = firstBar.topY - valueLabelClearance;
  const arrowTipX = lastBar.cx - valueLabelHalfWidth;
  const calloutCx = (firstBar.cx + arrowTipX) / 2;

  return (
    <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] gap-10 items-end">
      <div className="flex flex-col h-full">
        <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-6">
          {headline}
        </h2>
        <div className="text-[#575757]/80 leading-relaxed mb-6">{description}</div>
        <p className="text-xs text-[#575757]/60 mt-auto">{source}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <h3 className="font-display text-lg md:text-xl text-[#1C39BB] mb-2">{chartTitle}</h3>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <line
            x1={paddingX}
            y1={baselineY}
            x2={width - paddingX}
            y2={baselineY}
            stroke="#9ca3af"
            strokeWidth="1.5"
          />

          <line
            x1={firstBar.cx}
            y1={verticalLineStartY}
            x2={firstBar.cx}
            y2={lineY}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="6,5"
          />
          <line
            x1={firstBar.cx}
            y1={lineY}
            x2={arrowTipX - 8}
            y2={lineY}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="6,5"
          />
          <polygon
            points={`${arrowTipX - 8},${lineY - 5} ${arrowTipX},${lineY} ${arrowTipX - 8},${lineY + 5}`}
            fill="#9ca3af"
          />

          {positions.map((p) => (
            <g key={p.period}>
              <rect x={p.x} y={p.topY} width={barWidth} height={p.barH} fill={p.color} />
              <text
                x={p.cx}
                y={p.topY - 14}
                textAnchor="middle"
                fill="#575757"
                fontSize="22"
                fontWeight="700"
                fontFamily="var(--font-lyon-display), Georgia, serif"
              >
                {unitPrefix}
                {p.value} {unitSuffix}
              </text>
              <text
                x={p.cx}
                y={baselineY + 28}
                textAnchor="middle"
                fill="#575757"
                fontSize="14"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                {p.period}
              </text>
            </g>
          ))}

          <g>
            <rect
              x={calloutCx - 50}
              y={lineY - 30}
              width={100}
              height={48}
              rx={10}
              fill="white"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={calloutCx}
              y={lineY + 4}
              textAnchor="middle"
              fill="#16a34a"
              fontSize="28"
              fontWeight="800"
              fontFamily="system-ui, sans-serif"
            >
              {multiplier}X
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
