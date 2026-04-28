"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Treemap from "@/components/Treemap";
import FintechPieSection from "@/components/FintechPieSection";
import FintechBarSection from "@/components/FintechBarSection";
import FintechRevenueComparison from "@/components/FintechRevenueComparison";
import FintechIPOChart from "@/components/FintechIPOChart";
import FintechIPORevenueBars from "@/components/FintechIPORevenueBars";
import FintechSecondaryConcentration from "@/components/FintechSecondaryConcentration";
import FintechSecondaryActivity from "@/components/FintechSecondaryActivity";
import FintechSponsorBuyouts from "@/components/FintechSponsorBuyouts";
import FintechWorldMap from "@/components/FintechWorldMap";
import FintechCustomerBaseComparison from "@/components/FintechCustomerBaseComparison";
import FintechPublicTreemap from "@/components/FintechPublicTreemap";
import FintechMatureVintages from "@/components/FintechMatureVintages";
import FintechTwentyYearGrowth from "@/components/FintechTwentyYearGrowth";
import FintechProfitableIndustry from "@/components/FintechProfitableIndustry";
import FintechRevenueConcentration from "@/components/FintechRevenueConcentration";
import DealLogos from "@/components/DealLogos";
import ResearchReportCTA from "@/components/ResearchReportCTA";
import { FINTECH_IPOS } from "./fintech-ipos";

const API_BASE = "https://blue-dot-api.william-b0e.workers.dev";
const CACHE_KEYS = {
  stockPrices: "bd-research-stock-prices",
};
const CACHE_TTL_MS = {
  stockPrices: 2 * 60 * 1000,
};
const MIN_CACHE_COUNTS = {
  stockPrices: 8,
};

function readSessionCache<T>(key: string, ttlMs: number): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > ttlMs) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsed.data as T;
  } catch {
    return null;
  }
}

function writeSessionCache<T>(key: string, data: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // Best-effort cache; ignore errors.
  }
}

function mergeLivePrices(
  apiData: Partial<StockPriceData>[]
): StockPriceData[] {
  const bySymbol = new Map(
    apiData.filter((d) => d?.symbol).map((d) => [d.symbol as string, d])
  );
  return FINTECH_IPOS.map((ipo) => {
    const live = bySymbol.get(ipo.symbol);
    return {
      ...ipo,
      currentPrice: live?.currentPrice ?? null,
      returnSinceIPO: live?.returnSinceIPO ?? null,
      dailyChange: live?.dailyChange ?? null,
    };
  });
}

// Type for live stock price data
interface StockPriceData {
  symbol: string;
  name: string;
  sector: string;
  ipoPrice: number | null;
  ipoDate: string;
  grossProceeds: number;
  logo: string;
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
  const [selectedTombstone, setSelectedTombstone] = useState<StockPriceData | null>(null);
  const [selectedTreemapCompany, setSelectedTreemapCompany] = useState<FintechMarketCap | null>(null);
  const [stockPrices, setStockPrices] = useState<StockPriceData[]>(() =>
    FINTECH_IPOS.map((ipo) => ({
      ...ipo,
      currentPrice: null,
      returnSinceIPO: null,
      dailyChange: null,
    }))
  );
  const [loadingPrices, setLoadingPrices] = useState(false);
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

  const treemapPrice = selectedTreemapCompany
    ? companyDetails?.quote?.c ?? null
    : null;
  const treemapDailyChange = selectedTreemapCompany
    ? companyDetails?.quote?.dp ?? null
    : null;


  // Fetch initial data and update each section as soon as it resolves
  useEffect(() => {
    const cachedPrices = readSessionCache<{ data: Partial<StockPriceData>[] }>(
      CACHE_KEYS.stockPrices,
      CACHE_TTL_MS.stockPrices
    );
    const hasCachedPrices =
      (cachedPrices?.data?.length || 0) >= MIN_CACHE_COUNTS.stockPrices;
    if (hasCachedPrices && cachedPrices) {
      setStockPrices(mergeLivePrices(cachedPrices.data));
    }


    async function fetchPrices() {
      try {
        const res = await fetch(`${API_BASE}/stock-prices`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setStockPrices(mergeLivePrices(json.data || []));
        writeSessionCache(CACHE_KEYS.stockPrices, json);
      } catch {
        // Live prices are nice-to-have; the tombstones still render with static IPO data.
      }
    }

    async function fetchMarketCaps() {
      try {
        const res = await fetch('/data/fintech-marketcaps.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setMarketCaps(json.data || []);
        setTotalMarketCap(json.totalMarketCap || 0);
      } catch {
        // Market caps are nice-to-have; the page still renders without them.
      } finally {
        setLoadingMarketCaps(false);
      }
    }

    if (!hasCachedPrices) {
      fetchPrices();
    }
    fetchMarketCaps();

    // Tombstones display static IPO data only — no recurring refresh needed.
  }, []);

  // Fetch company details when a tombstone or treemap company is selected
  useEffect(() => {
    const symbol = selectedTombstone?.symbol || selectedTreemapCompany?.symbol;
    if (!symbol) {
      setCompanyDetails(null);
      return;
    }

    // Skip the Finnhub lookup for pre-IPO tombstones — their ticker isn't live yet
    // and the API returns whatever stale match it has, which surfaces wrong companies.
    if (selectedTombstone && selectedTombstone.ipoPrice === null) {
      setCompanyDetails(null);
      return;
    }

    async function fetchDetails() {
      setLoadingDetails(true);
      try {
        const res = await fetch(`${API_BASE}/company-details/${symbol}`);
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
      <main>
        <ResearchReportCTA flip asHero background="white" />

        {/* Private vs Public Revenue Comparison */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechRevenueComparison />
          </div>
        </section>

        {/* Private Top 100 Revenue Concentration */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechRevenueConcentration />
          </div>
        </section>

        {/* Private FinTech Revenue Pie ($174B) */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechPieSection
              segments={[
                { name: "Crypto & Blockchain", value: 45, color: "#F4845F" },
                { name: "Banking / Lending Tech", value: 35, color: "#2E8B57" },
                { name: "Payments", value: 32, color: "#3DA5F0" },
                { name: "Office of the CFO", value: 20, color: "#2575C9" },
                { name: "Wealth & Capital Markets Tech", value: 18, color: "#C778A2" },
                { name: "InsurTech", value: 13, color: "#A2D2DF" },
                { name: "Healthcare FinTech", value: 12, color: "#B89B5A" },
              ]}
              headlinePrefix="The private FinTech top 100 generate"
              headlineHighlight="$174 billion"
              headlineSuffix="in total revenue"
              description="The Crypto & Blockchain sector leads for total revenue as well, followed by Banking / Lending Tech and Payments sectors."
              source="Source: Company filings, company press releases, public news, FT Partners' proprietary data and estimates"
              unit="B"
            />
          </div>
        </section>

        {/* Private Fintech Valuation Section */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechPieSection
              segments={[
                { name: "Crypto & Blockchain", value: 759, color: "#F4845F" },
                { name: "Payments", value: 358, color: "#3DA5F0" },
                { name: "Office of the CFO", value: 230, color: "#2575C9" },
                { name: "Banking / Lending Tech", value: 228, color: "#2E8B57" },
                { name: "Wealth & Capital Markets Tech", value: 157, color: "#C778A2" },
                { name: "Healthcare FinTech", value: 68, color: "#B89B5A" },
                { name: "InsurTech", value: 67, color: "#A2D2DF" },
              ]}
              headlinePrefix="The private FinTech top 100 represents"
              headlineHighlight="$1.9 trillion"
              headlineSuffix="in total valuation"
              description="Some of the largest private FinTech companies in the world are Crypto & Blockchain players, with the sector handily ranking in the top spot for valuation."
              source="Source: Company press releases, public news, FT Partners' proprietary data and estimates"
              unit="B"
            />
          </div>
        </section>

        {/* Valuation / Revenue Multiple Section */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechBarSection
              segments={[
                { name: "InsurTech", value: 5.0, color: "#A2D2DF" },
                { name: "Healthcare\nFinTech", value: 5.5, color: "#B89B5A" },
                { name: "Banking/Lending Tech", value: 6.5, color: "#2E8B57" },
                { name: "Wealth & Capital\nMarkets Tech", value: 9.0, color: "#C778A2" },
                { name: "Payments", value: 11.4, color: "#3DA5F0" },
                { name: "Office of\nthe CFO", value: 11.8, color: "#2575C9" },
                { name: "Crypto & Blockchain", value: 16.9, color: "#F4845F" },
              ]}
              headlinePrefix="Across all sectors, the top 100 largest private FinTech companies reflect a valuation / revenue multiple of"
              headlineHighlight="10.7x"
              description="Three sectors claim a revenue multiple over 10x, with Crypto & Blockchain at the high end."
              source="Source: Company filings, company press releases, public news, FT Partners' proprietary data and estimates"
              yAxisLabel="Valuation / Revenue Multiple"
              valueSuffix="x"
              valueDecimals={1}
            />
          </div>
        </section>

        {/* World Map of well-funded VC-backed FinTechs */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechWorldMap />
          </div>
        </section>

        {/* Public Top 100 Founded 2006+ Treemap */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechPublicTreemap />
          </div>
        </section>

        {/* Nu + Revolut vs US Banks Customer Base */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechCustomerBaseComparison />
          </div>
        </section>

        {/* Tombstones Section */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              {/* Left - Headline */}
              <div className="md:col-span-3">
                <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight">
                  The IPO window for FinTech has finally re-opened
                </h2>
                <div className="text-xs text-[#575757]/60 mt-10 space-y-1">
                  <p>Source: FT Partners&apos; Proprietary Database</p>
                  <p>Note: Only includes US-listed IPOs that raised $30 million or more in gross proceeds</p>
                </div>
              </div>

              {/* Right - Tombstones Grid */}
              <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {loadingPrices ? (
                  Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-sm p-4 aspect-square animate-pulse"
                    >
                      <div className="h-3 bg-gray-200 rounded w-12 mb-1" />
                      <div className="h-3 bg-gray-200 rounded w-16 ml-auto mb-3" />
                      <div className="h-10 bg-gray-100 rounded w-full mb-3" />
                      <div className="h-5 bg-gray-200 rounded w-20 mb-1" />
                      <div className="h-3 bg-gray-200 rounded w-24" />
                    </div>
                  ))
                ) : (
                  stockPrices.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="bg-white rounded-2xl shadow-sm p-4 text-left"
                    >
                      <div className="flex justify-between items-start text-[11px] font-semibold tracking-wider">
                        <span className="text-gray-300 uppercase">
                          {stock.symbol}
                        </span>
                        <span className="text-gray-400">
                          {stock.ipoDate}
                        </span>
                      </div>
                      <div className="my-3 h-14 flex items-center justify-center px-2">
                        {stock.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={stock.logo}
                            alt={stock.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="font-display text-xl text-[#1C39BB]">
                            {stock.name}
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-lg md:text-xl text-[#111827]">
                        ${stock.grossProceeds.toLocaleString()} M
                      </p>
                      <p className="text-xs text-[#575757]/60">Gross Proceeds</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
        {/* US FinTech IPO Activity Chart */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechIPOChart />
          </div>
        </section>

        {/* Median LTM Revenue at IPO */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechIPORevenueBars
              headline="New US public market entrants have raised the bar for FinTech IPOs"
              description={
                <>
                  Median LTM Revenue at the time of the IPO for recent FinTech public market
                  entrants increased{" "}
                  <span className="font-semibold text-[#1C39BB]">3.4x</span> compared to the
                  median from the 2011–2019 cohort.
                </>
              }
              source="Source: S&P Capital IQ; Company Filings; FT Partners' Proprietary Database"
              chartTitle="Median LTM Revenue at IPO"
              bars={[
                { period: "2011–2019", value: 199, color: "#C7CFF0" },
                { period: "2020–2022", value: 343, color: "#C7CFF0" },
                { period: "2024–2026 YTD", value: 673, color: "#1C39BB" },
              ]}
              unitPrefix="$"
              unitSuffix="M"
            />
          </div>
        </section>

        {/* Median LTM Revenue Per Employee at IPO */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechIPORevenueBars
              headline="…And reached significantly higher revenue per employee than earlier classes"
              description={
                <>
                  Median LTM Revenue Per Employee at the time of the IPO for new public
                  FinTech companies rose{" "}
                  <span className="font-semibold text-[#1C39BB]">2.8x</span> relative to the
                  median from the 2011–2019 cohort.
                </>
              }
              source="Source: S&P Capital IQ; Company Filings; FT Partners' Proprietary Database"
              chartTitle="Median LTM Revenue Per Employee at IPO"
              bars={[
                { period: "2011–2019", value: 230, color: "#C7CFF0" },
                { period: "2020–2022", value: 293, color: "#C7CFF0" },
                { period: "2024–2026 YTD", value: 652, color: "#1C39BB" },
              ]}
              unitPrefix="$"
              unitSuffix="k"
            />
          </div>
        </section>

        {/* Secondary Market Concentration */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechSecondaryConcentration />
          </div>
        </section>

        {/* FinTech Secondary Volume Treemap (Top 10 + Other) */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-3 max-w-5xl">
              In FinTech, 10 companies accounted for nearly 96% of all LTM executed volume
            </h2>
            <p className="text-[#1f2937] text-base md:text-lg font-semibold mb-6">
              FinTech-Focused Top 10 + Other – % LTM Executed Secondary Volume
            </p>

            <div className="overflow-hidden rounded-lg">
              <Treemap
                data={[
                  { symbol: "STRIPE", name: "Stripe", sector: "Payments", marketCap: 47.79, color: "#00B0F0", logo: "/secondary-treemap-logos/stripe.png" },
                  { symbol: "KRAKEN", name: "Kraken", sector: "Crypto & Blockchain", marketCap: 20.36, color: "#F17649", logo: "/secondary-treemap-logos/kraken.png" },
                  { symbol: "RIPPLING", name: "Rippling", sector: "Office of the CFO", marketCap: 8.85, color: "#0072B2", logo: "/secondary-treemap-logos/rippling.png" },
                  { symbol: "ALPHASENSE", name: "AlphaSense", sector: "Wealth & Capital Markets Tech", marketCap: 6.78, color: "#CC79A7", logo: "/secondary-treemap-logos/alphasense.png" },
                  { symbol: "REVOLUT", name: "Revolut", sector: "Banking / Lending Tech", marketCap: 3.73, color: "#253EC8", logo: "/secondary-treemap-logos/revolut.png" },
                  { symbol: "ETHOS", name: "Ethos", sector: "InsurTech", marketCap: 2.32, color: "#96DCF8", logo: "/secondary-treemap-logos/ethos.png" },
                  { symbol: "UPGRADE", name: "Upgrade", sector: "Banking / Lending Tech", marketCap: 2.06, color: "#009E73", logo: "/secondary-treemap-logos/upgrade.png" },
                  { symbol: "RIPPLE", name: "Ripple", sector: "Crypto & Blockchain", marketCap: 1.51, color: "#F4906D", logo: "/secondary-treemap-logos/ripple.png" },
                  { symbol: "MERCURY", name: "Mercury", sector: "Office of the CFO", marketCap: 1.34, color: "#0072B2", logo: "/secondary-treemap-logos/mercury.png" },
                  { symbol: "POLYMARKET", name: "Polymarket", sector: "Wealth & Capital Markets Tech", marketCap: 0.94, color: "#CC79A7", logo: "/secondary-treemap-logos/polymarket.png" },
                  { symbol: "OTHER", name: "Other", sector: "Mixed", marketCap: 4.33, color: "#5B6FE5" },
                ]}
                onSelect={() => undefined}
                valueFormat="percent"
              />
            </div>

            <div className="text-xs text-[#575757]/60 mt-6 space-y-1">
              <p>Source: Caplight Technologies, Inc. as of December 15, 2025</p>
            </div>
          </div>
        </section>

        {/* FinTech Secondary Activity Surge */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechSecondaryActivity />
          </div>
        </section>

        {/* FinTech Sponsor Buyouts */}
        <section className="py-24 bg-white hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechSponsorBuyouts
              headline="FinTech sponsor buyouts were previously a nascent exit pathway, but now represent a steadily growing viable exit option and enduring asset class…"
              chartTitle="Private Equity / Sponsor M&A"
              chartSubtitle="# of Deals"
              bars={[
                { year: "2015", value: 88 },
                { year: "2016", value: 82 },
                { year: "2017", value: 101 },
                { year: "2018", value: 144 },
                { year: "2019", value: 101 },
                {
                  year: "2020",
                  value: 112,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/buyouts/onex.png", alt: "Onex" }]}
                      target={{ src: "/deal-logos/buyouts/onedigital.jpeg", alt: "OneDigital" }}
                    />
                  ),
                },
                {
                  year: "2021",
                  value: 155,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/buyouts/thoma-bravo.jpeg", alt: "Thoma Bravo" }]}
                      target={{ src: "/deal-logos/buyouts/bottomline.png", alt: "Bottomline Technologies" }}
                    />
                  ),
                },
                {
                  year: "2022",
                  value: 111,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/buyouts/thoma-bravo.jpeg", alt: "Thoma Bravo" }]}
                      target={{ src: "/deal-logos/buyouts/coupa.png", alt: "Coupa" }}
                    />
                  ),
                },
                {
                  year: "2023",
                  value: 131,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/buyouts/vista.jpeg", alt: "Vista" }]}
                      target={{ src: "/deal-logos/buyouts/duck-creek.png", alt: "Duck Creek Technologies" }}
                    />
                  ),
                },
                {
                  year: "2024",
                  value: 177,
                  deal: (
                    <DealLogos
                      acquirers={[
                        { src: "/deal-logos/buyouts/towerbrook.png", alt: "TowerBrook" },
                        { src: "/deal-logos/buyouts/cdr.png", alt: "CD&R" },
                      ]}
                      target={{ src: "/deal-logos/buyouts/r1.png", alt: "R1", height: 22 }}
                      logoHeight={14}
                    />
                  ),
                },
                {
                  year: "2025",
                  value: 129,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/buyouts/tpg.png", alt: "TPG" }]}
                      target={{ src: "/deal-logos/buyouts/avidxchange.png", alt: "AvidXchange" }}
                    />
                  ),
                },
              ]}
              source="Source: FT Partners' Proprietary Database"
              barColor="#A8C5D9"
              valueInside
            />
          </div>
        </section>

        {/* Strategic M&A market share */}
        <section className="py-24 bg-gray-50 hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechSponsorBuyouts
              headline="Strategic M&A was historically the dominant exit pathway for FinTech companies, but in recent years, it has experienced a meaningful decline in market share"
              chartTitle="Strategic M&A"
              chartSubtitle="% of Total Number of Deals"
              bars={[
                { year: "2015", value: 67 },
                { year: "2016", value: 69 },
                { year: "2017", value: 61 },
                { year: "2018", value: 55 },
                { year: "2019", value: 55 },
                {
                  year: "2020",
                  value: 52,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/strategic/intuit.png", alt: "Intuit" }]}
                      target={{ src: "/deal-logos/strategic/credit-karma.png", alt: "Credit Karma" }}
                    />
                  ),
                },
                {
                  year: "2021",
                  value: 48,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/strategic/visa.svg", alt: "Visa" }]}
                      target={{ src: "/deal-logos/strategic/tink.jpeg", alt: "Tink" }}
                    />
                  ),
                },
                {
                  year: "2022",
                  value: 44,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/strategic/fiserv.svg", alt: "Fiserv" }]}
                      target={{ src: "/deal-logos/strategic/finxact.png", alt: "Finxact" }}
                    />
                  ),
                },
                {
                  year: "2023",
                  value: 42,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/strategic/nasdaq.svg", alt: "Nasdaq" }]}
                      target={{ src: "/deal-logos/strategic/adenza.png", alt: "Adenza" }}
                    />
                  ),
                },
                {
                  year: "2024",
                  value: 43,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/strategic/visa.svg", alt: "Visa" }]}
                      target={{ src: "/deal-logos/strategic/featurespace.jpeg", alt: "Featurespace" }}
                    />
                  ),
                },
                {
                  year: "2025",
                  value: 42,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/strategic/global-payments.svg", alt: "Global Payments" }]}
                      target={{ src: "/deal-logos/strategic/worldpay.png", alt: "Worldpay" }}
                    />
                  ),
                },
              ]}
              source="Source: FT Partners' Proprietary Database"
              barColor="#1C39BB"
              valueSuffix="%"
              valueInside
            />
          </div>
        </section>

        {/* PE / Sponsor M&A % of Total $ Volume */}
        <section className="py-24 bg-white hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechSponsorBuyouts
              headline="…With recent take-privates and large-scale buyouts capturing a sizeable portion of the total dollar volume"
              chartTitle="Private Equity / Sponsor M&A"
              chartSubtitle="% of Total $ Volume"
              bars={[
                { year: "2015", value: 15 },
                { year: "2016", value: 16 },
                { year: "2017", value: 34 },
                {
                  year: "2018*",
                  value: 54,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/sponsor-volume/blackstone.png", alt: "Blackstone", height: 30 }]}
                      target={{ src: "/deal-logos/sponsor-volume/refinitiv.png", alt: "Refinitiv" }}
                    />
                  ),
                },
                { year: "2019", value: 12 },
                { year: "2020", value: 9 },
                { year: "2021", value: 19 },
                {
                  year: "2022",
                  value: 46,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/sponsor-volume/vista.jpeg", alt: "Vista", height: 24 }]}
                      target={{ src: "/deal-logos/sponsor-volume/avalara.png", alt: "Avalara" }}
                    />
                  ),
                },
                {
                  year: "2023",
                  value: 53,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/sponsor-volume/gtcr.png", alt: "GTCR" }]}
                      target={{ src: "/deal-logos/sponsor-volume/worldpay.jpeg", alt: "Worldpay", height: 22 }}
                    />
                  ),
                },
                {
                  year: "2024",
                  value: 52,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/sponsor-volume/advent.svg", alt: "Advent" }]}
                      target={{ src: "/deal-logos/sponsor-volume/nuvei.png", alt: "Nuvei" }}
                    />
                  ),
                },
                {
                  year: "2025",
                  value: 33,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/buyouts/thoma-bravo.jpeg", alt: "Thoma Bravo" }]}
                      target={{ src: "/deal-logos/sponsor-volume/dayforce.png", alt: "Dayforce" }}
                    />
                  ),
                },
              ]}
              source={
                <>
                  <p>Source: FT Partners&apos; Proprietary Database</p>
                  <p>* 2018 volume includes Blackstone&apos;s $20 billion buyout of Refinitiv.</p>
                </>
              }
              barColor="#A8C5D9"
              valueSuffix="%"
              valueInside
            />
          </div>
        </section>

        {/* FinTech-to-FinTech M&A # of Deals */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechSponsorBuyouts
              headline="FinTech-to-FinTech M&A was historically a small category – we believe FinTech-to-FinTech M&A will continue to be a prevalent exit pathway"
              chartTitle="FinTech-to-FinTech M&A"
              chartSubtitle="# of Deals"
              bars={[
                { year: "2015", value: 150 },
                { year: "2016", value: 139 },
                { year: "2017", value: 173 },
                { year: "2018", value: 162 },
                { year: "2019", value: 249 },
                {
                  year: "2020",
                  value: 255,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/fintech-m-and-a/sofi.png", alt: "SoFi" }]}
                      target={{ src: "/deal-logos/fintech-m-and-a/galileo.jpeg", alt: "Galileo", height: 28 }}
                    />
                  ),
                },
                {
                  year: "2021",
                  value: 452,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/fintech-m-and-a/bill.jpeg", alt: "Bill" }]}
                      target={{ src: "/deal-logos/fintech-m-and-a/divvy.png", alt: "Divvy" }}
                    />
                  ),
                },
                {
                  year: "2022",
                  value: 463,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/fintech-m-and-a/sofi.png", alt: "SoFi" }]}
                      target={{ src: "/deal-logos/fintech-m-and-a/technisys.png", alt: "Technisys", height: 22 }}
                    />
                  ),
                },
                {
                  year: "2023",
                  value: 409,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/fintech-m-and-a/acorns.png", alt: "Acorns" }]}
                      target={{ src: "/deal-logos/fintech-m-and-a/gohenry.png", alt: "GoHenry" }}
                    />
                  ),
                },
                {
                  year: "2024",
                  value: 491,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/fintech-m-and-a/stripe.png", alt: "Stripe" }]}
                      target={{ src: "/deal-logos/fintech-m-and-a/bridge.png", alt: "Bridge" }}
                    />
                  ),
                },
                {
                  year: "2025",
                  value: 659,
                  deal: (
                    <DealLogos
                      acquirers={[{ src: "/deal-logos/fintech-m-and-a/coinbase.svg", alt: "Coinbase" }]}
                      target={{ src: "/deal-logos/fintech-m-and-a/deribit.png", alt: "Deribit", height: 28 }}
                    />
                  ),
                },
              ]}
              source={
                <>
                  <p>Source: FT Partners&apos; Proprietary Database</p>
                  <p>Note: FinTech acquirers include FinTech companies founded 2004 or later.</p>
                </>
              }
              barColor="#A8C5D9"
              valueInside
              callout={{
                value: "4.4X",
                label: "Increase in FinTech-to-FinTech deals in the last decade",
              }}
            />
          </div>
        </section>

        {/* Mature Fund Vintages — Liquidity Pressure */}
        <section className="py-24 bg-white hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechMatureVintages />
          </div>
        </section>

        {/* Twenty-year FinTech growth */}
        <section className="py-24 bg-gray-50 hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechTwentyYearGrowth />
          </div>
        </section>

        {/* Net Margin by Global Industry */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FintechProfitableIndustry />
          </div>
        </section>

        <ResearchReportCTA tiles="slides" />

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
                    <p className="text-2xl font-display text-[#575757]">
                      {selectedTombstone.ipoPrice !== null ? `$${selectedTombstone.ipoPrice}` : "—"}
                    </p>
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
                    <p className="text-2xl font-display text-[#1C39BB]">
                      {treemapPrice !== null ? `$${treemapPrice.toFixed(2)}` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-1">Market Cap</p>
                    <p className="text-2xl font-display text-[#575757]">${selectedTreemapCompany.marketCap}B</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#575757]/60 uppercase tracking-wider mb-1">Daily Change</p>
                  {treemapDailyChange !== null ? (
                    <span className={`inline-flex items-center gap-1 text-lg font-medium ${
                      treemapDailyChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {treemapDailyChange >= 0 ? "▲" : "▼"} {treemapDailyChange >= 0 ? "+" : ""}{treemapDailyChange}%
                    </span>
                  ) : (
                    <span className="text-[#575757]/40">—</span>
                  )}
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
