import {
  getQuote,
  getCompanyProfile,
  getBasicFinancials,
  getCompanyNews,
  getEarningsCalendar,
  type CompanyProfile,
  type BasicFinancials,
  type CompanyNews,
  type EarningsCalendar,
  type StockQuote
} from "@/lib/finnhub";

export interface CompanyDetails {
  symbol: string;
  quote: StockQuote | null;
  profile: CompanyProfile | null;
  financials: BasicFinancials["metric"] | null;
  news: CompanyNews[];
  earnings: EarningsCalendar["earningsCalendar"];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;

  try {
    const [quote, profile, financials, news, earnings] = await Promise.all([
      getQuote(symbol).catch(() => null),
      getCompanyProfile(symbol).catch(() => null),
      getBasicFinancials(symbol).catch(() => null),
      getCompanyNews(symbol, 14).catch(() => []), // Last 14 days of news
      getEarningsCalendar(symbol).catch(() => ({ earningsCalendar: [] })),
    ]);

    const details: CompanyDetails = {
      symbol,
      quote,
      profile,
      financials: financials?.metric || null,
      news: news.slice(0, 5), // Only return top 5 news articles
      earnings: earnings.earningsCalendar || [],
    };

    return Response.json(details);
  } catch (error) {
    console.error(`Error fetching details for ${symbol}:`, error);
    return Response.json(
      { error: `Failed to fetch details for ${symbol}` },
      { status: 500 }
    );
  }
}
