"use client";

import Treemap from "./Treemap";

const SECTOR_COLORS: Record<string, string> = {
  "Banking / Lending Tech": "#009E73",
  "Wealth & Capital Markets Tech": "#CC79A7",
  Payments: "#00B0F0",
  "Crypto & Blockchain": "#F4906D",
  "Office of the CFO": "#0072B2",
  InsurTech: "#96DCF8",
  "Healthcare FinTech": "#E69F00",
  "Real Estate Tech": "#002060",
};

// Values are scaled so cell areas mirror the deck's "% of Market Cap" view.
const companies = [
  { symbol: "HOOD", name: "Robinhood", sector: "Wealth & Capital Markets Tech", marketCap: 12, logo: "/treemap-logos/robinhood.png" },
  { symbol: "NU", name: "Nu Holdings", sector: "Banking / Lending Tech", marketCap: 12, logo: "/treemap-logos/nu.png" },
  { symbol: "COIN", name: "Coinbase", sector: "Crypto & Blockchain", marketCap: 9, logo: "/treemap-logos/coinbase.png" },
  { symbol: "ADYEN", name: "Adyen", sector: "Payments", marketCap: 6, logo: "/treemap-logos/adyen.png" },
  { symbol: "SOFI", name: "SoFi", sector: "Banking / Lending Tech", marketCap: 4, logo: "/treemap-logos/sofi.png" },
  { symbol: "CRCL", name: "Circle", sector: "Crypto & Blockchain", marketCap: 4, logo: "/treemap-logos/circle.png" },
  { symbol: "FUTU", name: "Futu", sector: "Wealth & Capital Markets Tech", marketCap: 4, logo: "/treemap-logos/futu.png" },
  { symbol: "TOST", name: "Toast", sector: "Payments", marketCap: 3, logo: "/treemap-logos/toast.png" },
  { symbol: "AFRM", name: "Affirm", sector: "Banking / Lending Tech", marketCap: 3, logo: "/treemap-logos/affirm.png" },
  { symbol: "KSPI", name: "Kaspi.kz", sector: "Payments", marketCap: 2, logo: "/treemap-logos/kaspi.png" },
  { symbol: "WISE", name: "Wise", sector: "Payments", marketCap: 2, logo: "/treemap-logos/wise.png" },
  { symbol: "GROWW", name: "Groww", sector: "Wealth & Capital Markets Tech", marketCap: 2, logo: "/treemap-logos/groww.png" },
  { symbol: "PAYPAY", name: "PayPay", sector: "Payments", marketCap: 2, logo: "/treemap-logos/paypay.png" },
  { symbol: "GLXY", name: "Galaxy", sector: "Crypto & Blockchain", marketCap: 1, logo: "/treemap-logos/galaxy.png" },
  { symbol: "CHYM", name: "Chime", sector: "Banking / Lending Tech", marketCap: 1, logo: "/treemap-logos/chime.png" },
  { symbol: "PB", name: "PB Fintech", sector: "InsurTech", marketCap: 1, logo: "/treemap-logos/pb.png" },
  { symbol: "BLSH", name: "Bullish", sector: "Crypto & Blockchain", marketCap: 1, logo: "/treemap-logos/bullish.png" },
  { symbol: "XRO", name: "Xero", sector: "Office of the CFO", marketCap: 1, logo: "/treemap-logos/xero.png" },
  { symbol: "FIGURE", name: "Figure", sector: "Banking / Lending Tech", marketCap: 1, logo: "/treemap-logos/figure.png" },
  { symbol: "KAKAO", name: "Kakaobank", sector: "Banking / Lending Tech", marketCap: 1, logo: "/treemap-logos/kakaobank.png" },
  { symbol: "OTHERS", name: "All Others", sector: "Mixed", marketCap: 26 },
].map((c) => ({
  ...c,
  color: c.symbol === "OTHERS" ? "#5B6FE5" : SECTOR_COLORS[c.sector] ?? "#9ca3af",
}));

const sectorLegend = Object.entries(SECTOR_COLORS).map(([name, color]) => ({ name, color }));

export default function FintechPublicTreemap() {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-4xl text-[#1C39BB] leading-tight mb-3 max-w-5xl">
        The largest public FinTech companies founded in the last twenty years. Robinhood{" "}
        <span className="text-[#575757]">(NASDAQ:HOOD)</span> and Nu Holdings{" "}
        <span className="text-[#575757]">(NYSE:NU)</span> lead the pack, accounting for almost
        a quarter of the total market cap
      </h2>
      <p className="text-[#1f2937] text-base md:text-lg font-semibold mb-6">
        Public Top 100 Founded 2006 or Later by Market Cap – % Market Cap
      </p>

      <div className="bg-white rounded-lg border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2">
          {sectorLegend.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <span
                className="inline-block w-4 h-4 rounded-sm flex-shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-sm text-[#1f2937] font-medium">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-gray-100">
        <Treemap data={companies} onSelect={() => {}} />
      </div>
    </div>
  );
}
