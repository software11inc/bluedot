"use client";

export default function FintechTwentyYearGrowth() {
  const width = 800;
  const height = 600;

  const p1 = { x: 140, y: 470, label: "15k", multiplier: "2.2x" };
  const p2 = { x: 420, y: 320, label: "32k", multiplier: "1.8x" };
  const p3 = { x: 700, y: 130, label: "56k" };

  const areaPath = `
    M 0 ${height}
    L 0 540
    C 120 540 200 510 ${p1.x} ${p1.y + 30}
    C 260 460 320 380 ${p2.x} ${p2.y + 40}
    C 520 320 600 220 ${p3.x} ${p3.y + 60}
    C 740 110 770 100 ${width} 60
    L ${width} ${height}
    Z
  `;

  return (
    <div className="grid md:grid-cols-2 gap-10 items-stretch">
      <div className="flex flex-col justify-center">
        <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight">
          In just twenty years, FinTech has evolved from a niche concept into a
          multi-trillion-dollar industry reshaping the global financial system
        </h2>

        <div className="text-xs text-[#575757]/60 mt-10 space-y-1">
          <p>Source: FT Partners&apos; Proprietary Database</p>
          <p>
            <sup>(1)</sup> Cumulative FinTech formation data; includes entities
            that have merged, been acquired, are now public, or are now
            out-of-business
          </p>
        </div>
      </div>

      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d={areaPath} fill="#1C39BB" />

          {/* step lines from p1 -> p2 */}
          <line
            x1={p1.x}
            y1={p1.y}
            x2={p1.x}
            y2={p2.y}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <line
            x1={p1.x}
            y1={p2.y}
            x2={p2.x}
            y2={p2.y}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* step lines from p2 -> p3 */}
          <line
            x1={p2.x}
            y1={p2.y}
            x2={p2.x}
            y2={p3.y}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <line
            x1={p2.x}
            y1={p3.y}
            x2={p3.x}
            y2={p3.y}
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* multiplier labels */}
          <text
            x={p1.x - 20}
            y={(p1.y + p2.y) / 2 + 8}
            textAnchor="end"
            fill="#1C39BB"
            fontSize="34"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            2.2x
          </text>
          <text
            x={p2.x - 20}
            y={(p2.y + p3.y) / 2 + 8}
            textAnchor="end"
            fill="#1C39BB"
            fontSize="34"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            1.8x
          </text>

          {/* dots */}
          {[p1, p2, p3].map((p) => (
            <circle key={p.label} cx={p.x} cy={p.y} r="9" fill="#1C39BB" />
          ))}

          {/* point labels */}
          {[p1, p2, p3].map((p) => (
            <g key={`label-${p.label}`}>
              <text
                x={p.x + 22}
                y={p.y + 18}
                fill="#1C39BB"
                fontSize="56"
                fontWeight="800"
                fontFamily="system-ui, sans-serif"
              >
                {p.label}
              </text>
              <text
                x={p.x + 22 + (p.label.length * 32)}
                y={p.y - 10}
                fill="#1f2937"
                fontSize="14"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                (1)
              </text>
              <text
                x={p.x + 22}
                y={p.y + 44}
                fill="#1f2937"
                fontSize="16"
                fontWeight="500"
                fontFamily="system-ui, sans-serif"
              >
                Total FinTech
              </text>
              <text
                x={p.x + 22}
                y={p.y + 64}
                fill="#1f2937"
                fontSize="16"
                fontWeight="500"
                fontFamily="system-ui, sans-serif"
              >
                Companies
              </text>
            </g>
          ))}

          {/* x-axis years */}
          <text
            x={p1.x}
            y={height - 18}
            textAnchor="middle"
            fill="#1f2937"
            fontSize="22"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            2005
          </text>
          <text
            x={p2.x}
            y={height - 18}
            textAnchor="middle"
            fill="white"
            fontSize="22"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            2015
          </text>
          <text
            x={p3.x}
            y={height - 18}
            textAnchor="middle"
            fill="white"
            fontSize="22"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            2025
          </text>
        </svg>
      </div>
    </div>
  );
}
