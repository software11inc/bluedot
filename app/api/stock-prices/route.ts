import { getQuote } from "@/lib/finnhub";

// Recent Fintech IPOs with their IPO prices
const FINTECH_IPOS = [
  { symbol: "GLXY", name: "Galaxy Digital", ipoPrice: 5, ipoDate: "Feb 2006", sector: "Crypto" },
  { symbol: "ARX", name: "Accelerant Holdings", ipoPrice: 14, ipoDate: "Jul 2025", sector: "Insurance" },
  { symbol: "ANTA", name: "Antalpha Platform", ipoPrice: 10, ipoDate: "May 2025", sector: "Financial Services" },
  { symbol: "BLSH", name: "Bullish", ipoPrice: 20, ipoDate: "Aug 2025", sector: "Crypto Exchange" },
  { symbol: "ETOR", name: "eToro", ipoPrice: 52, ipoDate: "May 2025", sector: "Trading" },
  { symbol: "CRCL", name: "Circle", ipoPrice: 26, ipoDate: "Jun 2025", sector: "Stablecoin" },
  { symbol: "CHYM", name: "Chime", ipoPrice: 27, ipoDate: "Jun 2025", sector: "Digital Banking" },
  { symbol: "GEMI", name: "Gemini", ipoPrice: 10, ipoDate: "Sep 2025", sector: "Crypto" },
  { symbol: "NP", name: "Neptune Insurance", ipoPrice: 20, ipoDate: "Oct 2025", sector: "Insurance" },
  { symbol: "FIGR", name: "Figure", ipoPrice: 36, ipoDate: "Sep 2025", sector: "Blockchain Lending" },
  { symbol: "KLAR", name: "Klarna", ipoPrice: 21, ipoDate: "Sep 2025", sector: "BNPL" },
  { symbol: "OS", name: "OneStream", ipoPrice: 20, ipoDate: "Jul 2024", sector: "Financial Software" },
  { symbol: "WAY", name: "Waystar", ipoPrice: 21.50, ipoDate: "Jun 2024", sector: "Healthcare Payments" },
  { symbol: "SLDE", name: "Slide Insurance", ipoPrice: 15, ipoDate: "Jun 2025", sector: "Insurtech" },
  { symbol: "TTAN", name: "ServiceTitan", ipoPrice: 71, ipoDate: "Dec 2024", sector: "Field Service" },
  { symbol: "NAVN", name: "Navan", ipoPrice: 13, ipoDate: "Oct 2025", sector: "Travel & Expense" },
];

export interface StockPriceData {
  symbol: string;
  name: string;
  sector: string;
  ipoPrice: number;
  ipoDate: string;
  currentPrice: number;
  returnSinceIPO: number;
  dailyChange: number;
}

export async function GET() {
  try {
    const prices = await Promise.all(
      FINTECH_IPOS.map(async (company) => {
        try {
          const quote = await getQuote(company.symbol);
          const currentPrice = quote.c;
          const returnPct = ((currentPrice - company.ipoPrice) / company.ipoPrice) * 100;

          return {
            symbol: company.symbol,
            name: company.name,
            sector: company.sector,
            ipoPrice: company.ipoPrice,
            ipoDate: company.ipoDate,
            currentPrice: currentPrice,
            returnSinceIPO: parseFloat(returnPct.toFixed(1)),
            dailyChange: parseFloat(quote.dp.toFixed(2)),
          };
        } catch (error) {
          console.error(`Error fetching ${company.symbol}:`, error);
          // Return placeholder data if API fails
          return {
            symbol: company.symbol,
            name: company.name,
            sector: company.sector,
            ipoPrice: company.ipoPrice,
            ipoDate: company.ipoDate,
            currentPrice: null,
            returnSinceIPO: null,
            dailyChange: null,
          };
        }
      })
    );

    return Response.json({
      data: prices,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching stock prices:", error);
    return Response.json(
      { error: "Failed to fetch stock prices" },
      { status: 500 }
    );
  }
}
