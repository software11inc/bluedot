"use client";

export default function FintechRevenueComparison() {
  const publicRevenue = 158;
  const privateRevenue = 174;
  const pctHigher = ((privateRevenue - publicRevenue) / publicRevenue) * 100;
  const publicHeightPct = (publicRevenue / privateRevenue) * 100;

  // Bar geometry (rem). Tallest bar = 28rem; shorter bar's top sits diffRem below it.
  const tallestBarRem = 28;
  const publicBarRem = (publicHeightPct / 100) * tallestBarRem;
  const diffRem = tallestBarRem - publicBarRem;

  // Connector lives above the bars and dips down by diffRem on the left to reach the shorter bar top.
  const connectorClearanceRem = 2.75;
  const connectorHeightRem = connectorClearanceRem + diffRem;
  const yCalloutLevel = 6; // top of the connector path inside the SVG (% of viewBox height)
  const yPrivateTop = (connectorClearanceRem / connectorHeightRem) * 100; // right end (private bar top)
  const yPublicTop = 100; // left end (public bar top, bottom of SVG)

  return (
    <div>
      <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-24 max-w-4xl">
        Even more striking, the top 100 private FinTech companies are{" "}
        <span className="text-[#5BB7E8]">outpacing</span> their public peers in revenue
      </h2>

      <div className="relative">
        {/* Asymmetric dotted connector spanning full chart width */}
        <div
          className="hidden md:block absolute inset-x-0 z-10 pointer-events-none"
          style={{
            top: `-${connectorClearanceRem}rem`,
            height: `${connectorHeightRem}rem`,
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="arrow-down"
                viewBox="0 0 10 10"
                refX="5"
                refY="9"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 1 1 L 5 9 L 9 1" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
              </marker>
            </defs>
            <path
              d={`M 25 ${yPublicTop} L 25 ${yCalloutLevel} L 75 ${yCalloutLevel} L 75 ${yPrivateTop}`}
              fill="none"
              stroke="#9ca3af"
              strokeWidth="1.5"
              strokeDasharray="5,4"
              vectorEffect="non-scaling-stroke"
              markerEnd="url(#arrow-down)"
            />
          </svg>

          {/* Callout pill sits centered on the top horizontal segment */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-10">
            <div className="bg-white shadow-md rounded-2xl px-6 py-3 border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold text-[#5BB7E8] text-center leading-none">
                ~{Math.round(pctHigher)}%
              </div>
              <div className="text-base font-semibold text-[#575757] text-center mt-1">
                Higher
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:gap-10 items-end">
          {/* Public */}
          <div
            className="rounded-lg flex flex-col items-center justify-center text-white p-8 md:p-12"
            style={{
              background:
                "linear-gradient(135deg, #F4845F 0%, #F4A57F 100%)",
              height: `${publicBarRem}rem`,
              minHeight: "16rem",
            }}
          >
            <div className="text-3xl md:text-5xl font-display font-bold mb-3 text-white/80">
              Public
            </div>
            <div className="text-5xl md:text-7xl font-display font-bold mb-2 drop-shadow-md">
              ${publicRevenue} B
            </div>
            <div className="text-lg md:text-xl text-white/90">in total Revenue</div>
          </div>

          {/* Private */}
          <div
            className="rounded-lg flex flex-col items-center justify-center text-white p-8 md:p-12"
            style={{
              background:
                "linear-gradient(135deg, #1C39BB 0%, #3B5BD9 100%)",
              height: `${tallestBarRem}rem`,
            }}
          >
            <div className="text-3xl md:text-5xl font-display font-bold mb-3 text-white/80">
              Private
            </div>
            <div className="text-5xl md:text-7xl font-display font-bold mb-2 drop-shadow-md">
              ${privateRevenue} B
            </div>
            <div className="text-lg md:text-xl text-white/90">in Total Revenue</div>
          </div>
        </div>

        {/* Mobile callout */}
        <div className="md:hidden flex justify-center -mt-4 mb-4">
          <div className="bg-white shadow-md rounded-2xl px-6 py-3 border border-gray-100">
            <div className="text-2xl font-bold text-[#5BB7E8] text-center leading-none">
              ~{Math.round(pctHigher)}%
            </div>
            <div className="text-sm font-semibold text-[#575757] text-center mt-1">
              Higher
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-[#575757]/60 mt-8 max-w-4xl space-y-2">
        <p>
          <em>Source: Private company top 100:</em> Company filings, company press releases,
          FT Partners&apos; proprietary data and estimates
        </p>
        <p>
          <em>Public company top 100:</em> Based on top 100 largest market caps of companies
          founded 2006 or later within FT Partners&apos; public trading comparables dataset;
          2025 revenue used; Capital IQ Data as of 4/15/2026
        </p>
      </div>
    </div>
  );
}
