"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Treemap from "@/components/Treemap";
import Image from "next/image";
import heroCircles from "@/app/assets/hero-circles-color.svg";
import dotGroupHero from "@/app/assets/dot-group-hero-horizontal.svg";

// Type for live stock price data
interface StockPriceData {
  symbol: string;
  name: string;
  sector: string;
  ipoPrice: number;
  ipoDate: string;
  currentPrice: number | null;
  returnSinceIPO: number | null;
  dailyChange: number | null;
}

// Type for fintech market cap data
interface FintechMarketCap {
  symbol: string;
  name: string;
  sector: string;
  marketCap: number;
  price: number;
  dailyChange: number;
  color: string;
}

// Type for enriched company details from API
interface CompanyDetails {
  symbol: string;
  quote: {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
  } | null;
  profile: {
    country: string;
    currency: string;
    exchange: string;
    finnhubIndustry: string;
    ipo: string;
    logo: string;
    marketCapitalization: number;
    name: string;
    phone: string;
    shareOutstanding: number;
    ticker: string;
    weburl: string;
  } | null;
  financials: {
    "52WeekHigh": number;
    "52WeekHighDate": string;
    "52WeekLow": number;
    "52WeekLowDate": string;
    beta: number;
    peBasicExclExtraTTM: number;
    dividendYieldIndicatedAnnual: number;
    epsBasicExclExtraItemsTTM: number;
    marketCapitalization: number;
  } | null;
  news: {
    datetime: number;
    headline: string;
    source: string;
    url: string;
    summary: string;
  }[];
  earnings: {
    date: string;
    epsActual: number | null;
    epsEstimate: number | null;
    hour: string;
    quarter: number;
    year: number;
  }[];
}

export default function ResearchPage() {
  const [lineVisible, setLineVisible] = useState(false);
  const [selectedTombstone, setSelectedTombstone] = useState<StockPriceData | null>(null);
  const [selectedTreemapCompany, setSelectedTreemapCompany] = useState<FintechMarketCap | null>(null);
  const [stockPrices, setStockPrices] = useState<StockPriceData[]>([]);
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [marketCaps, setMarketCaps] = useState<FintechMarketCap[]>([]);
  const [loadingMarketCaps, setLoadingMarketCaps] = useState(true);
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [selectedSector, setSelectedSector] = useState<{
    name: string;
    return: number;
    color: string;
    isDashed?: boolean;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLineVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Fetch live stock prices
  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("/api/stock-prices");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const json = JSON.parse(text);
        setStockPrices(json.data || []);
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      } finally {
        setLoadingPrices(false);
      }
    }

    fetchPrices();

    // Refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch fintech market caps for treemap
  useEffect(() => {
    async function fetchMarketCaps() {
      try {
        const res = await fetch("/api/fintech-marketcaps");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const json = JSON.parse(text);
        setMarketCaps(json.data || []);
        setTotalMarketCap(json.totalMarketCap || 0);
      } catch (error) {
        console.error("Error fetching market caps:", error);
      } finally {
        setLoadingMarketCaps(false);
      }
    }

    fetchMarketCaps();
  }, []);

  // Fetch company details when a tombstone or treemap company is selected
  useEffect(() => {
    const symbol = selectedTombstone?.symbol || selectedTreemapCompany?.symbol;
    if (!symbol) {
      setCompanyDetails(null);
      return;
    }

    async function fetchDetails() {
      setLoadingDetails(true);
      try {
        const res = await fetch(`/api/company-details/${symbol}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const data = JSON.parse(text);
        setCompanyDetails(data);
      } catch (error) {
        console.error("Error fetching company details:", error);
        setCompanyDetails(null);
      } finally {
        setLoadingDetails(false);
      }
    }

    fetchDetails();
  }, [selectedTombstone, selectedTreemapCompany]);

  return (
    <>
      <Header animate={false} />
      <main className="pt-24">
        {/* Hero section */}
        <section className="min-h-[50vh] flex flex-col pb-12 bg-white">
          <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-8">
            <div className="relative w-full h-full">
              <div className="w-full h-full flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 md:py-12 animate-page-content">
                <div className="mt-auto md:mt-0">
                  <h1 className="font-display text-5xl md:text-7xl text-[#1C39BB]">
                    Fintech<br />Research
                  </h1>
                </div>

                <div className="absolute -bottom-8 md:-bottom-10 left-0">
                  <span className="font-mono text-sm md:text-base text-black tracking-wider uppercase">
                    Market Insights
                  </span>
                  <div className="absolute left-0 top-full mt-2 h-[1px] w-[calc(100%+100vw)] -ml-[100vw]">
                    <div className="absolute inset-0 bg-gray-200" />
                    <div
                      className={`absolute inset-0 bg-[#1C39BB] transition-transform duration-[1.2s] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left ${
                        lineVisible ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                </div>

                <div className="md:self-end flex flex-col items-end gap-6 -translate-y-[15%]">
                  <Image src={dotGroupHero} alt="" className="md:ml-auto" />
                  <Image src={heroCircles} alt="" className="md:ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Treemap Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-[#575757] mb-2">
                  Fintech Market Cap
                </h2>
                <p className="text-[#575757]/60">
                  Public fintech companies by market capitalization (squarified treemap)
                </p>
              </div>
              {totalMarketCap > 0 && (
                <div className="text-left md:text-right">
                  <p className="text-xs text-[#575757]/60 uppercase tracking-wider">Total Market Cap</p>
                  <p className="text-2xl font-display text-[#1C39BB]">${totalMarketCap.toLocaleString()}B</p>
                  <p className="text-xs text-[#575757]/40">{marketCaps.length} companies</p>
                </div>
              )}
            </div>

            {/* D3 Treemap */}
            {loadingMarketCaps ? (
              <div className="bg-gray-200 rounded-lg animate-pulse h-[500px]" />
            ) : (
              <div className="overflow-hidden rounded-lg bg-gray-100">
                <Treemap
                  data={marketCaps}
                  onSelect={setSelectedTreemapCompany}
                />
              </div>
            )}

            {/* Sector Legend */}
            {!loadingMarketCaps && marketCaps.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-8 justify-center">
                {Array.from(new Set(marketCaps.map(c => c.sector))).map(sector => {
                  const company = marketCaps.find(c => c.sector === sector);
                  return (
                    <div key={sector} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: company?.color }} />
                      <span className="text-xs text-[#575757]/70">{sector}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Tombstones Section */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Left - Text */}
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-[#575757] mb-6">
                  Recent Transactions
                </h2>
                <p className="text-[#575757]/70 leading-relaxed mb-6">
                  Blue Dot has executed secondary transactions and growth investments across the fintech landscape, partnering with leading companies at critical inflection points.
                </p>
                <p className="text-[#575757]/70 leading-relaxed">
                  Our portfolio spans payments, lending, banking infrastructure, and emerging fintech verticals. Each investment reflects our deep sector expertise and commitment to supporting exceptional founders.
                </p>
              </div>

              {/* Right - Tombstones Grid */}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {loadingPrices ? (
                  // Loading skeleton
                  Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-16 mb-3" />
                      <div className="h-6 bg-gray-200 rounded w-16 mb-1" />
                      <div className="h-3 bg-gray-200 rounded w-12" />
                    </div>
                  ))
                ) : (
                  stockPrices.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="bg-white rounded-lg p-4 cursor-pointer hover:bg-[#1C39BB] hover:text-white transition-all duration-300 group"
                      onClick={() => setSelectedTombstone(stock)}
                    >
                      <p className="font-medium text-sm group-hover:text-white text-[#575757]">
                        {stock.name}
                      </p>
                      <p className="text-xs text-[#575757]/60 group-hover:text-white/70 mt-1">
                        {stock.sector}
                      </p>
                      <p className="text-lg font-display text-[#1C39BB] group-hover:text-white mt-2">
                        {stock.currentPrice !== null ? `$${stock.currentPrice.toFixed(2)}` : "—"}
                      </p>
                      <p className={`text-xs mt-1 ${
                        stock.returnSinceIPO !== null
                          ? stock.returnSinceIPO >= 0
                            ? "text-green-600 group-hover:text-green-300"
                            : "text-red-600 group-hover:text-red-300"
                          : "text-[#575757]/40 group-hover:text-white/60"
                      }`}>
                        {stock.returnSinceIPO !== null
                          ? `${stock.returnSinceIPO >= 0 ? "▲" : "▼"} ${stock.returnSinceIPO >= 0 ? "+" : ""}${stock.returnSinceIPO}% since IPO`
                          : "—"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sector Returns Section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12">
              <p className="text-sm text-[#575757]/60 mb-2 font-mono">02 Our Focus</p>
              <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] mb-4 leading-tight">
                Public Market Investors<br />Have Favored Certain<br />Subscribers
              </h2>
              <p className="text-[#575757]/70 text-lg">
                Total Two-Year Return by Sector
              </p>
              <p className="text-xs text-[#575757]/40 mt-2">
                Source: Capital IQ Data as of 10/1/2025
              </p>
            </div>

            {/* Sector Returns Bar Chart */}
            <div>
              {/* Bars container - bottom aligned */}
              <div className="flex items-end gap-2 sm:gap-3 md:gap-4 border-b border-gray-300">
                {/* CFO Stack Solutions - (3%) */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "CFO Stack Solutions", return: -3, color: "#059669", isDashed: true })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">(3%)</span>
                  <div className="w-full h-[20px] border-2 border-dashed border-[#059669] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* GRC - 25% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "GRC", return: 25, color: "#1C39BB" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">25%</span>
                  <div className="w-full h-[32px] bg-[#1C39BB] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Healthcare - 38% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "Healthcare", return: 38, color: "#1C39BB" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">38%</span>
                  <div className="w-full h-[48px] bg-[#1C39BB] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Payments - 50% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "Payments", return: 50, color: "#1C39BB" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">50%</span>
                  <div className="w-full h-[64px] bg-[#1C39BB] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* S&P 500 - 54% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "S&P 500", return: 54, color: "#93C5FD", isDashed: true })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">54%</span>
                  <div className="w-full h-[70px] border-2 border-dashed border-[#93C5FD] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* NASDAQ Complete - 69% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "NASDAQ Complete", return: 69, color: "#6B7280" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">69%</span>
                  <div className="w-full h-[88px] bg-[#6B7280] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Capital Markets - 75% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "Capital Markets", return: 75, color: "#F59E0B" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">75%</span>
                  <div className="w-full h-[96px] bg-[#F59E0B] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Vertical SaaS - 77% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "Vertical SaaS / Embedded Finance", return: 77, color: "#6B7280" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">77%</span>
                  <div className="w-full h-[100px] bg-[#6B7280] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Mortgage/PropTech - 80% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "Mortgage / PropTech", return: 80, color: "#EAB308" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">80%</span>
                  <div className="w-full h-[104px] bg-[#EAB308] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Banking/Lending - 193% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "Banking / Lending", return: 193, color: "#2563EB" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">193%</span>
                  <div className="w-full h-[240px] bg-[#2563EB] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Insurtech - 209% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "Insurtech", return: 209, color: "#7C3AED" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">209%</span>
                  <div className="w-full h-[260px] bg-[#7C3AED] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Blockchain/Crypto - 264% */}
                <div
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                  onClick={() => setSelectedSector({ name: "Blockchain / Crypto", return: 264, color: "#DB2777" })}
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#575757] mb-1">264%</span>
                  <div className="w-full h-[320px] bg-[#DB2777] rounded-sm group-hover:opacity-80 transition-opacity" />
                </div>
              </div>

              {/* Labels row */}
              <div className="flex gap-2 sm:gap-3 md:gap-4 pt-2">
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757] leading-tight">CFO Stack<br/>Solutions</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757]">GRC</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757]">Healthcare</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757]">Payments</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757]">S&P 500</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757] leading-tight">NASDAQ<br/>Complete</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757] leading-tight">Capital<br/>Markets</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757] leading-tight">Vertical SaaS/<br/>Embedded<br/>Finance</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757] leading-tight">Mortgage/<br/>PropTech</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757] leading-tight">Banking/<br/>Lending</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757]">Insurtech</span>
                <span className="flex-1 text-[11px] sm:text-xs md:text-sm text-center text-[#575757] leading-tight">Blockchain/<br/>Crypto</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Tombstone Drawer */}
      {selectedTombstone && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedTombstone(null)}
          />
          <div className="relative w-full max-w-full sm:max-w-md bg-white h-full overflow-y-auto animate-slide-in-right">
            <div className="p-4 sm:p-8 pb-safe">
              <button
                onClick={() => setSelectedTombstone(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#575757] hover:text-black z-10 p-2 -m-2 touch-manipulation"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header with Logo */}
              <div className="mb-8">
                <div className="flex items-start gap-4">
                  {companyDetails?.profile?.logo ? (
                    <img
                      src={companyDetails.profile.logo}
                      alt={selectedTombstone.name}
                      className="w-16 h-16 rounded-xl object-contain bg-gray-50 p-2"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-[#1C39BB]/10 flex items-center justify-center">
                      <span className="text-[#1C39BB] font-display text-xl">{selectedTombstone.symbol.charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-[#1C39BB]/10 text-[#1C39BB] text-sm rounded-full mb-2">
                      {selectedTombstone.symbol}
                    </span>
                    <h2 className="font-display text-2xl text-[#575757]">
                      {companyDetails?.profile?.name || selectedTombstone.name}
                    </h2>
                    <p className="text-[#575757]/60 text-sm">
                      {companyDetails?.profile?.finnhubIndustry || selectedTombstone.sector}
                    </p>
                  </div>
                </div>
                {companyDetails?.profile?.weburl && (
                  <a
                    href={companyDetails.profile.weburl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#1C39BB] hover:underline mt-3"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>

              {/* Price & Performance */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-1">Current Price</p>
                    <p className="text-2xl font-display text-[#1C39BB]">
                      {selectedTombstone.currentPrice !== null ? `$${selectedTombstone.currentPrice.toFixed(2)}` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-1">IPO Price</p>
                    <p className="text-2xl font-display text-[#575757]">${selectedTombstone.ipoPrice}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-1">Return Since IPO</p>
                    <span className={`inline-flex items-center gap-1 text-lg font-medium ${
                      selectedTombstone.returnSinceIPO !== null
                        ? selectedTombstone.returnSinceIPO >= 0 ? "text-green-600" : "text-red-600"
                        : "text-[#575757]"
                    }`}>
                      {selectedTombstone.returnSinceIPO !== null
                        ? `${selectedTombstone.returnSinceIPO >= 0 ? "+" : ""}${selectedTombstone.returnSinceIPO}%`
                        : "—"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-1">Daily Change</p>
                    <span className={`inline-flex items-center gap-1 text-lg font-medium ${
                      selectedTombstone.dailyChange !== null
                        ? selectedTombstone.dailyChange >= 0 ? "text-green-600" : "text-red-600"
                        : "text-[#575757]"
                    }`}>
                      {selectedTombstone.dailyChange !== null
                        ? `${selectedTombstone.dailyChange >= 0 ? "+" : ""}${selectedTombstone.dailyChange}%`
                        : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Basic Financials */}
              {loadingDetails ? (
                <div className="mb-6">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-3 animate-pulse" />
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3 animate-pulse">
                        <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
                        <div className="h-5 bg-gray-200 rounded w-20" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : companyDetails?.financials && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#575757] mb-3">Key Financials</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">52-Week High</p>
                      <p className="text-[#575757] font-medium">
                        ${companyDetails.financials["52WeekHigh"]?.toFixed(2) || "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">52-Week Low</p>
                      <p className="text-[#575757] font-medium">
                        ${companyDetails.financials["52WeekLow"]?.toFixed(2) || "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Market Cap</p>
                      <p className="text-[#575757] font-medium">
                        {companyDetails.financials.marketCapitalization
                          ? `$${(companyDetails.financials.marketCapitalization / 1000).toFixed(1)}B`
                          : "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">P/E Ratio</p>
                      <p className="text-[#575757] font-medium">
                        {companyDetails.financials.peBasicExclExtraTTM?.toFixed(2) || "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">EPS (TTM)</p>
                      <p className="text-[#575757] font-medium">
                        {companyDetails.financials.epsBasicExclExtraItemsTTM
                          ? `$${companyDetails.financials.epsBasicExclExtraItemsTTM.toFixed(2)}`
                          : "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Beta</p>
                      <p className="text-[#575757] font-medium">
                        {companyDetails.financials.beta?.toFixed(2) || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Earnings Calendar */}
              {!loadingDetails && companyDetails?.earnings && companyDetails.earnings.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#575757] mb-3">Earnings</h3>
                  <div className="space-y-2">
                    {companyDetails.earnings.slice(0, 3).map((earning, idx) => {
                      const isUpcoming = new Date(earning.date) > new Date();
                      return (
                        <div key={idx} className={`rounded-lg p-3 ${isUpcoming ? "bg-[#1C39BB]/5 border border-[#1C39BB]/20" : "bg-gray-50"}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs text-[#575757]/60">
                                Q{earning.quarter} {earning.year} {isUpcoming && <span className="text-[#1C39BB] font-medium">• Upcoming</span>}
                              </p>
                              <p className="text-sm text-[#575757]">{earning.date}</p>
                            </div>
                            <div className="text-right">
                              {earning.epsActual !== null ? (
                                <>
                                  <p className="text-xs text-[#575757]/60">EPS Actual</p>
                                  <p className={`text-sm font-medium ${
                                    earning.epsEstimate && earning.epsActual >= earning.epsEstimate
                                      ? "text-green-600" : "text-red-600"
                                  }`}>
                                    ${earning.epsActual.toFixed(2)}
                                  </p>
                                </>
                              ) : earning.epsEstimate !== null ? (
                                <>
                                  <p className="text-xs text-[#575757]/60">EPS Est.</p>
                                  <p className="text-sm text-[#575757]">${earning.epsEstimate.toFixed(2)}</p>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Company News */}
              {!loadingDetails && companyDetails?.news && companyDetails.news.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#575757] mb-3">Recent News</h3>
                  <div className="space-y-3">
                    {companyDetails.news.slice(0, 3).map((article, idx) => (
                      <a
                        key={idx}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                      >
                        <p className="text-sm text-[#575757] font-medium line-clamp-2 mb-1">
                          {article.headline}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#575757]/60">
                          <span>{article.source}</span>
                          <span>•</span>
                          <span>{new Date(article.datetime * 1000).toLocaleDateString()}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Info */}
              {companyDetails?.profile && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#575757] mb-3">Company Info</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Exchange</p>
                      <p className="text-[#575757] font-medium">{companyDetails.profile.exchange}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Country</p>
                      <p className="text-[#575757] font-medium">{companyDetails.profile.country}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">IPO Date</p>
                      <p className="text-[#575757] font-medium">{companyDetails.profile.ipo}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Currency</p>
                      <p className="text-[#575757] font-medium">{companyDetails.profile.currency}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs text-[#575757]/40 text-center">
                  Live data powered by Finnhub • Updates every 60 seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Treemap Company Drawer */}
      {selectedTreemapCompany && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedTreemapCompany(null)}
          />
          <div className="relative w-full max-w-full sm:max-w-md bg-white h-full overflow-y-auto animate-slide-in-right">
            <div className="p-4 sm:p-8 pb-safe">
              <button
                onClick={() => setSelectedTreemapCompany(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#575757] hover:text-black z-10 p-2 -m-2 touch-manipulation"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header with Logo */}
              <div className="mb-8">
                <div className="flex items-start gap-4">
                  {companyDetails?.profile?.logo ? (
                    <img
                      src={companyDetails.profile.logo}
                      alt={selectedTreemapCompany.name}
                      className="w-16 h-16 rounded-xl object-contain bg-gray-50 p-2"
                    />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: selectedTreemapCompany.color }}
                    >
                      <span className="text-white font-display text-xl">{selectedTreemapCompany.symbol.charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-[#1C39BB]/10 text-[#1C39BB] text-sm rounded-full mb-2">
                      {selectedTreemapCompany.symbol}
                    </span>
                    <h2 className="font-display text-2xl text-[#575757]">
                      {companyDetails?.profile?.name || selectedTreemapCompany.name}
                    </h2>
                    <p className="text-[#575757]/60 text-sm">
                      {companyDetails?.profile?.finnhubIndustry || selectedTreemapCompany.sector}
                    </p>
                  </div>
                </div>
                {companyDetails?.profile?.weburl && (
                  <a
                    href={companyDetails.profile.weburl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#1C39BB] hover:underline mt-3"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>

              {/* Price & Market Cap */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-1">Stock Price</p>
                    <p className="text-2xl font-display text-[#1C39BB]">${selectedTreemapCompany.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-1">Market Cap</p>
                    <p className="text-2xl font-display text-[#575757]">${selectedTreemapCompany.marketCap}B</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-1">Daily Change</p>
                  <span className={`inline-flex items-center gap-1 text-lg font-medium ${
                    selectedTreemapCompany.dailyChange >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {selectedTreemapCompany.dailyChange >= 0 ? "▲" : "▼"} {selectedTreemapCompany.dailyChange >= 0 ? "+" : ""}{selectedTreemapCompany.dailyChange}%
                  </span>
                </div>
              </div>

              {/* Basic Financials */}
              {loadingDetails ? (
                <div className="mb-6">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-3 animate-pulse" />
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3 animate-pulse">
                        <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
                        <div className="h-5 bg-gray-200 rounded w-20" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : companyDetails?.financials && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#575757] mb-3">Key Financials</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">52-Week High</p>
                      <p className="text-[#575757] font-medium">
                        ${companyDetails.financials["52WeekHigh"]?.toFixed(2) || "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">52-Week Low</p>
                      <p className="text-[#575757] font-medium">
                        ${companyDetails.financials["52WeekLow"]?.toFixed(2) || "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">P/E Ratio</p>
                      <p className="text-[#575757] font-medium">
                        {companyDetails.financials.peBasicExclExtraTTM?.toFixed(2) || "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">EPS (TTM)</p>
                      <p className="text-[#575757] font-medium">
                        {companyDetails.financials.epsBasicExclExtraItemsTTM
                          ? `$${companyDetails.financials.epsBasicExclExtraItemsTTM.toFixed(2)}`
                          : "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Beta</p>
                      <p className="text-[#575757] font-medium">
                        {companyDetails.financials.beta?.toFixed(2) || "—"}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Dividend Yield</p>
                      <p className="text-[#575757] font-medium">
                        {companyDetails.financials.dividendYieldIndicatedAnnual
                          ? `${companyDetails.financials.dividendYieldIndicatedAnnual.toFixed(2)}%`
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Company News */}
              {!loadingDetails && companyDetails?.news && companyDetails.news.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#575757] mb-3">Recent News</h3>
                  <div className="space-y-3">
                    {companyDetails.news.slice(0, 3).map((article, idx) => (
                      <a
                        key={idx}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                      >
                        <p className="text-sm text-[#575757] font-medium line-clamp-2 mb-1">
                          {article.headline}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#575757]/60">
                          <span>{article.source}</span>
                          <span>•</span>
                          <span>{new Date(article.datetime * 1000).toLocaleDateString()}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Info */}
              {companyDetails?.profile && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#575757] mb-3">Company Info</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Exchange</p>
                      <p className="text-[#575757] font-medium">{companyDetails.profile.exchange}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Country</p>
                      <p className="text-[#575757] font-medium">{companyDetails.profile.country}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">IPO Date</p>
                      <p className="text-[#575757] font-medium">{companyDetails.profile.ipo}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-[#575757]/60">Currency</p>
                      <p className="text-[#575757] font-medium">{companyDetails.profile.currency}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs text-[#575757]/40 text-center">
                  Live data powered by Finnhub
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sector Drawer */}
      {selectedSector && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedSector(null)}
          />
          <div className="relative w-full max-w-full sm:max-w-md bg-white h-full overflow-y-auto animate-slide-in-right">
            <div className="p-4 sm:p-8 pb-safe">
              <button
                onClick={() => setSelectedSector(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#575757] hover:text-black z-10 p-2 -m-2 touch-manipulation"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      selectedSector.isDashed ? 'border-2 border-dashed' : ''
                    }`}
                    style={{
                      backgroundColor: selectedSector.isDashed ? 'transparent' : selectedSector.color,
                      borderColor: selectedSector.isDashed ? selectedSector.color : 'transparent',
                    }}
                  >
                    <span className={`font-display text-xl ${selectedSector.isDashed ? 'text-[#575757]' : 'text-white'}`}>
                      {selectedSector.return >= 0 ? '▲' : '▼'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl text-[#575757]">
                      {selectedSector.name}
                    </h2>
                    <p className="text-[#575757]/60 text-sm">
                      Two-Year Sector Return
                    </p>
                  </div>
                </div>
              </div>

              {/* Return Stats */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-2">Total Return</p>
                <p className={`text-4xl font-display ${
                  selectedSector.return >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedSector.return >= 0 ? '+' : ''}{selectedSector.return}%
                </p>
                <p className="text-sm text-[#575757]/60 mt-2">
                  October 2023 - October 2025
                </p>
              </div>

              {/* Comparison to S&P */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#575757] mb-3">vs. Benchmarks</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#575757]">S&P 500</span>
                      <span className="text-[#575757] font-medium">54%</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-[#575757]/60">Relative Performance</span>
                      <span className={`text-sm font-medium ${
                        selectedSector.return - 54 >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedSector.return - 54 >= 0 ? '+' : ''}{selectedSector.return - 54}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#575757]">NASDAQ Composite</span>
                      <span className="text-[#575757] font-medium">69%</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-[#575757]/60">Relative Performance</span>
                      <span className={`text-sm font-medium ${
                        selectedSector.return - 69 >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedSector.return - 69 >= 0 ? '+' : ''}{selectedSector.return - 69}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sector Rank */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#575757] mb-3">Sector Ranking</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#575757]">Rank Among Fintech Sectors</span>
                    <span className="text-[#1C39BB] font-display text-xl">
                      #{[264, 209, 193, 80, 77, 75, 69, 54, 50, 38, 25, -3].sort((a, b) => b - a).indexOf(selectedSector.return) + 1}
                    </span>
                  </div>
                  <p className="text-xs text-[#575757]/60 mt-1">of 12 sectors analyzed</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs text-[#575757]/40 text-center">
                  Source: Capital IQ Data as of 10/1/2025
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
