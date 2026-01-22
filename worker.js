// Cloudflare Worker for Blue Dot Research API
// With batching to avoid Finnhub rate limits + caching

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Cache durations in seconds
const CACHE_TTL = {
  stockPrices: 120,      // 2 minutes
  marketCaps: 600,       // 10 minutes (this data changes slowly)
  companyDetails: 120,   // 2 minutes
};

// Simple in-memory cache (persists across requests in same isolate)
const memoryCache = new Map();

function getCached(key) {
  const item = memoryCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expires) {
    memoryCache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data, ttlSeconds) {
  memoryCache.set(key, {
    data,
    expires: Date.now() + (ttlSeconds * 1000),
  });
}

// Recent Fintech IPOs
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

const FINTECH_COMPANIES = [
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
  { symbol: "INTU", name: "Intuit", sector: "Financial Software" },
  { symbol: "BILL", name: "Bill.com", sector: "B2B Payments" },
  { symbol: "PCTY", name: "Paylocity", sector: "HR & Payroll" },
  { symbol: "PAYC", name: "Paycom", sector: "HR & Payroll" },
  { symbol: "GWRE", name: "Guidewire", sector: "Insurance Software" },
  { symbol: "NCNO", name: "nCino", sector: "Banking Software" },
  { symbol: "ALKT", name: "Alkami", sector: "Banking Software" },
  { symbol: "WEX", name: "WEX", sector: "Corporate Payments" },
  { symbol: "SOFI", name: "SoFi", sector: "Digital Banking" },
  { symbol: "NU", name: "Nubank", sector: "Digital Banking" },
  { symbol: "LC", name: "LendingClub", sector: "Lending" },
  { symbol: "UPST", name: "Upstart", sector: "AI Lending" },
  { symbol: "AFRM", name: "Affirm", sector: "BNPL" },
  { symbol: "MQ", name: "Marqeta", sector: "Card Issuing" },
  { symbol: "COIN", name: "Coinbase", sector: "Crypto" },
  { symbol: "HOOD", name: "Robinhood", sector: "Trading" },
  { symbol: "MSTR", name: "MicroStrategy", sector: "Crypto" },
  { symbol: "IBKR", name: "Interactive Brokers", sector: "Trading" },
  { symbol: "LPLA", name: "LPL Financial", sector: "Wealth Tech" },
  { symbol: "LMND", name: "Lemonade", sector: "Insurtech" },
  { symbol: "ROOT", name: "Root Insurance", sector: "Insurtech" },
  { symbol: "OSCR", name: "Oscar Health", sector: "Healthtech" },
  { symbol: "HIPO", name: "Hippo", sector: "Insurtech" },
  { symbol: "TOST", name: "Toast", sector: "Restaurant Tech" },
  { symbol: "JKHY", name: "Jack Henry", sector: "Banking Software" },
  { symbol: "SSNC", name: "SS&C", sector: "Financial Software" },
];

const SECTOR_COLORS = {
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

// Helper to batch API calls and avoid rate limits
async function batchedMap(items, fn, batchSize = 5, delayMs = 1100) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);

    // Delay between batches to avoid rate limit (60 calls/min = 1 call/sec)
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return results;
}

// Finnhub API helpers
async function getQuote(symbol, apiKey) {
  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
  );
  if (!res.ok) throw new Error(`Failed to fetch quote for ${symbol}`);
  return res.json();
}

async function getCompanyProfile(symbol, apiKey) {
  const res = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`
  );
  if (!res.ok) throw new Error(`Failed to fetch profile for ${symbol}`);
  return res.json();
}

async function getBasicFinancials(symbol, apiKey) {
  const res = await fetch(
    `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${apiKey}`
  );
  if (!res.ok) throw new Error(`Failed to fetch financials for ${symbol}`);
  return res.json();
}

async function getCompanyNews(symbol, daysBack, apiKey) {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() - daysBack);
  const formatDate = (d) => d.toISOString().split('T')[0];

  const res = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${formatDate(fromDate)}&to=${formatDate(today)}&token=${apiKey}`
  );
  if (!res.ok) throw new Error(`Failed to fetch news for ${symbol}`);
  return res.json();
}

async function getEarningsCalendar(symbol, apiKey) {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() - 90);
  const toDate = new Date(today);
  toDate.setDate(toDate.getDate() + 90);
  const formatDate = (d) => d.toISOString().split('T')[0];

  const res = await fetch(
    `https://finnhub.io/api/v1/calendar/earnings?symbol=${symbol}&from=${formatDate(fromDate)}&to=${formatDate(toDate)}&token=${apiKey}`
  );
  if (!res.ok) throw new Error(`Failed to fetch earnings for ${symbol}`);
  return res.json();
}

// Route handlers
async function handleStockPrices(apiKey) {
  // Check cache first
  const cached = getCached('stock-prices');
  if (cached) return cached;

  const prices = await batchedMap(
    FINTECH_IPOS,
    async (company) => {
      try {
        const quote = await getQuote(company.symbol, apiKey);
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
          dailyChange: parseFloat((quote.dp || 0).toFixed(2)),
        };
      } catch (error) {
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
    },
    10, // 10 per batch (only 1 API call each)
    1100
  );

  const result = { data: prices, timestamp: new Date().toISOString() };
  setCache('stock-prices', result, CACHE_TTL.stockPrices);
  return result;
}

async function handleMarketCaps(apiKey) {
  // Check cache first
  const cached = getCached('market-caps');
  if (cached) return cached;

  const results = await batchedMap(
    FINTECH_COMPANIES,
    async (company) => {
      try {
        const profile = await getCompanyProfile(company.symbol, apiKey).catch(() => null);

        const marketCap = profile?.marketCapitalization || 0;
        if (!profile || marketCap === 0) return null;

        return {
          symbol: company.symbol,
          name: profile?.name || company.name,
          sector: company.sector,
          marketCap: parseFloat((marketCap / 1000).toFixed(1)),
          color: SECTOR_COLORS[company.sector] || "#1C39BB",
        };
      } catch (error) {
        return null;
      }
    },
    3,    // 3 companies per batch (3 API calls each)
    1100  // 1.1 second delay
  );

  const validResults = results
    .filter((r) => r !== null && r.marketCap > 0)
    .sort((a, b) => b.marketCap - a.marketCap);

  const totalMarketCap = validResults.reduce((sum, c) => sum + c.marketCap, 0);

  const result = {
    data: validResults,
    totalMarketCap: parseFloat(totalMarketCap.toFixed(1)),
    timestamp: new Date().toISOString(),
  };

  setCache('market-caps', result, CACHE_TTL.marketCaps);
  return result;
}

async function handleCompanyDetails(symbol, apiKey) {
  // Check cache first
  const cacheKey = `details-${symbol}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const [quote, profile, financials, news, earnings] = await Promise.all([
    getQuote(symbol, apiKey).catch(() => null),
    getCompanyProfile(symbol, apiKey).catch(() => null),
    getBasicFinancials(symbol, apiKey).catch(() => null),
    getCompanyNews(symbol, 14, apiKey).catch(() => []),
    getEarningsCalendar(symbol, apiKey).catch(() => ({ earningsCalendar: [] })),
  ]);

  const result = {
    symbol,
    quote,
    profile,
    financials: financials?.metric || null,
    news: news.slice(0, 5),
    earnings: earnings.earningsCalendar || [],
  };

  setCache(cacheKey, result, CACHE_TTL.companyDetails);
  return result;
}

// Main handler
export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const apiKey = env.FINNHUB_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      let data;

      if (path === '/stock-prices') {
        data = await handleStockPrices(apiKey);
      } else if (path === '/fintech-marketcaps') {
        data = await handleMarketCaps(apiKey);
      } else if (path.startsWith('/company-details/')) {
        const symbol = path.split('/company-details/')[1];
        if (!symbol) {
          return new Response(JSON.stringify({ error: 'Symbol required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        data = await handleCompanyDetails(symbol.toUpperCase(), apiKey);
      } else {
        return new Response(JSON.stringify({
          error: 'Not found',
          routes: ['/stock-prices', '/fintech-marketcaps', '/company-details/:symbol']
        }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
