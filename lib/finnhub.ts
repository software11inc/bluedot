const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

export interface StockQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

export interface CompanyProfile {
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
}

export interface BasicFinancials {
  metric: {
    "10DayAverageTradingVolume": number;
    "52WeekHigh": number;
    "52WeekHighDate": string;
    "52WeekLow": number;
    "52WeekLowDate": string;
    "52WeekPriceReturnDaily": number;
    beta: number;
    peBasicExclExtraTTM: number;
    peExclExtraTTM: number;
    dividendYieldIndicatedAnnual: number;
    epsBasicExclExtraItemsTTM: number;
    epsExclExtraItemsTTM: number;
    revenuePerShareTTM: number;
    roeTTM: number;
    marketCapitalization: number;
  };
}

export interface CompanyNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface EarningsCalendar {
  earningsCalendar: {
    date: string;
    epsActual: number | null;
    epsEstimate: number | null;
    hour: string;
    quarter: number;
    revenueActual: number | null;
    revenueEstimate: number | null;
    symbol: string;
    year: number;
  }[];
}

export async function getQuote(symbol: string): Promise<StockQuote> {
  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
    { next: { revalidate: 60 } } // Cache for 60 seconds
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch quote for ${symbol}`);
  }

  return res.json();
}

export async function getMultipleQuotes(symbols: string[]): Promise<Map<string, StockQuote>> {
  const quotes = new Map<string, StockQuote>();

  const results = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const quote = await getQuote(symbol);
        return { symbol, quote };
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        return { symbol, quote: null };
      }
    })
  );

  results.forEach(({ symbol, quote }) => {
    if (quote) {
      quotes.set(symbol, quote);
    }
  });

  return quotes;
}

export async function getCompanyProfile(symbol: string): Promise<CompanyProfile> {
  const res = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour (profile doesn't change often)
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch profile for ${symbol}`);
  }

  return res.json();
}

export async function getBasicFinancials(symbol: string): Promise<BasicFinancials> {
  const res = await fetch(
    `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_KEY}`,
    { next: { revalidate: 300 } } // Cache for 5 minutes
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch financials for ${symbol}`);
  }

  return res.json();
}

export async function getCompanyNews(symbol: string, daysBack: number = 7): Promise<CompanyNews[]> {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() - daysBack);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const res = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${formatDate(fromDate)}&to=${formatDate(today)}&token=${FINNHUB_API_KEY}`,
    { next: { revalidate: 300 } } // Cache for 5 minutes
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch news for ${symbol}`);
  }

  return res.json();
}

export async function getEarningsCalendar(symbol: string): Promise<EarningsCalendar> {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() - 90); // Past 90 days
  const toDate = new Date(today);
  toDate.setDate(toDate.getDate() + 90); // Next 90 days

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const res = await fetch(
    `https://finnhub.io/api/v1/calendar/earnings?symbol=${symbol}&from=${formatDate(fromDate)}&to=${formatDate(toDate)}&token=${FINNHUB_API_KEY}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch earnings calendar for ${symbol}`);
  }

  return res.json();
}
