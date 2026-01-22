import { getCompanyProfile } from "@/lib/finnhub";

// Top public fintech companies by market cap
const FINTECH_COMPANIES = [
  // Payments Giants
  { symbol: "V", name: "Visa", sector: "Payments" },
  { symbol: "MA", name: "Mastercard", sector: "Payments" },
  { symbol: "PYPL", name: "PayPal", sector: "Payments" },
  { symbol: "SQ", name: "Block", sector: "Payments" },
  { symbol: "FI", name: "Fiserv", sector: "Payments" },
  { symbol: "FIS", name: "Fidelity National", sector: "Payments" },
  { symbol: "GPN", name: "Global Payments", sector: "Payments" },
  { symbol: "FOUR", name: "Shift4", sector: "Payments" },
  { symbol: "PAYO", name: "Payoneer", sector: "Cross-border" },
  { symbol: "DLO", name: "DLocal", sector: "Cross-border" },
  { symbol: "FLYW", name: "Flywire", sector: "Payments" },
  { symbol: "RELY", name: "Remitly", sector: "Cross-border" },
  { symbol: "AXP", name: "American Express", sector: "Payments" },

  // Financial Software
  { symbol: "INTU", name: "Intuit", sector: "Financial Software" },
  { symbol: "BILL", name: "Bill.com", sector: "B2B Payments" },
  { symbol: "PCTY", name: "Paylocity", sector: "HR & Payroll" },
  { symbol: "PAYC", name: "Paycom", sector: "HR & Payroll" },
  { symbol: "GWRE", name: "Guidewire", sector: "Insurance Software" },
  { symbol: "NCNO", name: "nCino", sector: "Banking Software" },
  { symbol: "ALKT", name: "Alkami", sector: "Banking Software" },
  { symbol: "WEX", name: "WEX", sector: "Corporate Payments" },

  // Digital Banking & Lending
  { symbol: "SOFI", name: "SoFi", sector: "Digital Banking" },
  { symbol: "NU", name: "Nubank", sector: "Digital Banking" },
  { symbol: "LC", name: "LendingClub", sector: "Lending" },
  { symbol: "UPST", name: "Upstart", sector: "AI Lending" },
  { symbol: "AFRM", name: "Affirm", sector: "BNPL" },
  { symbol: "MQ", name: "Marqeta", sector: "Card Issuing" },

  // Crypto & Trading
  { symbol: "COIN", name: "Coinbase", sector: "Crypto" },
  { symbol: "HOOD", name: "Robinhood", sector: "Trading" },
  { symbol: "MSTR", name: "MicroStrategy", sector: "Crypto" },
  { symbol: "IBKR", name: "Interactive Brokers", sector: "Trading" },
  { symbol: "LPLA", name: "LPL Financial", sector: "Wealth Tech" },

  // Insurtech
  { symbol: "LMND", name: "Lemonade", sector: "Insurtech" },
  { symbol: "ROOT", name: "Root Insurance", sector: "Insurtech" },
  { symbol: "OSCR", name: "Oscar Health", sector: "Healthtech" },
  { symbol: "HIPO", name: "Hippo", sector: "Insurtech" },

  // Other Fintech
  { symbol: "TOST", name: "Toast", sector: "Restaurant Tech" },
  { symbol: "JKHY", name: "Jack Henry", sector: "Banking Software" },
  { symbol: "SSNC", name: "SS&C", sector: "Financial Software" },
];

export interface FintechMarketCap {
  symbol: string;
  name: string;
  sector: string;
  marketCap: number; // in billions
  color: string;
}

// Generate color based on sector
function getSectorColor(sector: string): string {
  const colors: Record<string, string> = {
    "Payments": "#1C39BB",
    "Crypto": "#7C3AED",
    "Digital Banking": "#0891B2",
    "BNPL": "#059669",
    "Trading": "#DC2626",
    "Financial Software": "#4C5FBB",
    "Restaurant Tech": "#EA580C",
    "B2B Payments": "#2563EB",
    "Card Issuing": "#7C3AED",
    "AI Lending": "#059669",
    "Insurtech": "#0891B2",
    "Cross-border": "#6366F1",
    "HR & Payroll": "#8B5CF6",
    "Insurance Software": "#14B8A6",
    "Banking Software": "#3B82F6",
    "Corporate Payments": "#1D4ED8",
    "Lending": "#10B981",
    "Wealth Tech": "#F59E0B",
    "Healthtech": "#EC4899",
  };
  return colors[sector] || "#1C39BB";
}

export async function GET() {
  try {
    const results = await Promise.all(
      FINTECH_COMPANIES.map(async (company) => {
        try {
          const profile = await getCompanyProfile(company.symbol).catch(() => null);

          const marketCap = profile?.marketCapitalization || 0;

          // Skip if no valid market cap data
          if (!profile || marketCap === 0) return null;

          return {
            symbol: company.symbol,
            name: profile?.name || company.name,
            sector: company.sector,
            marketCap: parseFloat((marketCap / 1000).toFixed(1)), // Convert to billions
            color: getSectorColor(company.sector),
          };
        } catch (error) {
          console.error(`Error fetching ${company.symbol}:`, error);
          return null;
        }
      })
    );

    // Filter out nulls and sort by market cap descending
    const validResults = results
      .filter((r): r is FintechMarketCap => r !== null && r.marketCap > 0)
      .sort((a, b) => b.marketCap - a.marketCap);

    // Calculate total market cap for percentages
    const totalMarketCap = validResults.reduce((sum, c) => sum + c.marketCap, 0);

    return Response.json({
      data: validResults,
      totalMarketCap: parseFloat(totalMarketCap.toFixed(1)),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching fintech market caps:", error);
    return Response.json(
      { error: "Failed to fetch market caps" },
      { status: 500 }
    );
  }
}
