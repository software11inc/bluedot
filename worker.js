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
  { symbol: "ARX", name: "ARX", sector: "Insurtech" },
  { symbol: "ADYEN", name: "ADYEN", sector: "Payments" },
  { symbol: "AFRM", name: "AFRM", sector: "Banking / Lending" },
  { symbol: "ALHC", name: "ALHC", sector: "Healthcare" },
  { symbol: "ALKT", name: "ALKT", sector: "Banking / Lending" },
  { symbol: "HKD", name: "HKD", sector: "Banking / Lending" },
  { symbol: "ANTA", name: "ANTA", sector: "Blockchain / Crypto" },
  { symbol: "AVLR", name: "AVLR", sector: "GRC" },
  { symbol: "AVDX", name: "AVDX", sector: "CFO Stack Solutions" },
  { symbol: "BKKT", name: "BKKT", sector: "Blockchain / Crypto" },
  { symbol: "BILL", name: "BILL", sector: "CFO Stack Solutions" },
  { symbol: "BKI", name: "BKI", sector: "Mortgage / PropTech" },
  { symbol: "BL", name: "BL", sector: "GRC" },
  { symbol: "BLND", name: "BLND", sector: "Mortgage / PropTech" },
  { symbol: "XYZ", name: "XYZ", sector: "Payments" },
  { symbol: "CSLT", name: "CSLT", sector: "Healthcare" },
  { symbol: "CBOE", name: "CBOE", sector: "Capital Markets" },
  { symbol: "CHNG", name: "CHNG", sector: "Healthcare" },
  { symbol: "CHYM", name: "CHYM", sector: "Banking / Lending" },
  { symbol: "CRCL", name: "CRCL", sector: "Blockchain / Crypto" },
  { symbol: "CLOV", name: "CLOV", sector: "Healthcare" },
  { symbol: "COIN", name: "COIN", sector: "Blockchain / Crypto" },
  { symbol: "CMRC", name: "CMRC", sector: "Payments" },
  { symbol: "COMP", name: "COMP", sector: "Mortgage / PropTech" },
  { symbol: "CPAY", name: "CPAY", sector: "Payments" },
  { symbol: "COTV", name: "COTV", sector: "Healthcare" },
  { symbol: "COUP", name: "COUP", sector: "CFO Stack Solutions" },
  { symbol: "DAVE", name: "DAVE", sector: "Banking / Lending" },
  { symbol: "DAY", name: "DAY", sector: "CFO Stack Solutions" },
  { symbol: "DH", name: "DH", sector: "Healthcare" },
  { symbol: "DLO", name: "DLO", sector: "Payments" },
  { symbol: "DOMA", name: "DOMA", sector: "Mortgage / PropTech" },
  { symbol: "DCT", name: "DCT", sector: "Insurtech" },
  { symbol: "DNB", name: "DNB", sector: "Capital Markets" },
  { symbol: "ELVT", name: "ELVT", sector: "Banking / Lending" },
  { symbol: "ESMT", name: "ESMT", sector: "Vertical SaaS / Embedded Finance" },
  { symbol: "ETOR", name: "ETOR", sector: "Capital Markets" },
  { symbol: "EVER", name: "EVER", sector: "Insurtech" },
  { symbol: "EVTC", name: "EVTC", sector: "Payments" },
  { symbol: "EXFY", name: "EXFY", sector: "CFO Stack Solutions" },
  { symbol: "FINW", name: "FINW", sector: "Banking / Lending" },
  { symbol: "FDC", name: "FDC", sector: "Payments" },
  { symbol: "FLYW", name: "FLYW", sector: "Payments" },
  { symbol: "FRGE", name: "FRGE", sector: "Capital Markets" },
  { symbol: "GOCO", name: "GOCO", sector: "Healthcare" },
  { symbol: "GDRX", name: "GDRX", sector: "Healthcare" },
  { symbol: "GSKY", name: "GSKY", sector: "Mortgage / PropTech" },
  { symbol: "GWRE", name: "GWRE", sector: "Insurtech" },
  { symbol: "HCAT", name: "HCAT", sector: "Healthcare" },
  { symbol: "HIPO", name: "HIPO", sector: "Insurtech" },
  { symbol: "IIIV", name: "IIIV", sector: "Payments" },
  { symbol: "IBTA", name: "IBTA", sector: "Payments" },
  { symbol: "MRKT", name: "MRKT", sector: "Capital Markets" },
  { symbol: "INOV", name: "INOV", sector: "Healthcare" },
  { symbol: "INTA", name: "INTA", sector: "GRC" },
  { symbol: "INTU", name: "INTU", sector: "CFO Stack Solutions" },
  { symbol: "KSPI", name: "KSPI", sector: "Banking / Lending" },
  { symbol: "LMND", name: "LMND", sector: "Insurtech" },
  { symbol: "LC", name: "LC", sector: "Banking / Lending" },
  { symbol: "LSPD", name: "LSPD", sector: "Payments" },
  { symbol: "LDI", name: "LDI", sector: "Mortgage / PropTech" },
  { symbol: "MRX", name: "MRX", sector: "Capital Markets" },
  { symbol: "MQ", name: "MQ", sector: "Payments" },
  { symbol: "MLNK", name: "MLNK", sector: "Banking / Lending" },
  { symbol: "MB", name: "MB", sector: "Vertical SaaS / Embedded Finance" },
  { symbol: "ML", name: "ML", sector: "Banking / Lending" },
  { symbol: "NCNO", name: "NCNO", sector: "Banking / Lending" },
  { symbol: "NRDS", name: "NRDS", sector: "Banking / Lending" },
  { symbol: "NU", name: "NU", sector: "Banking / Lending" },
  { symbol: "NVEI", name: "NVEI", sector: "Payments" },
  { symbol: "OLO", name: "OLO", sector: "Vertical SaaS / Embedded Finance" },
  { symbol: "ONDK", name: "ONDK", sector: "Banking / Lending" },
  { symbol: "OMF", name: "OMF", sector: "Banking / Lending" },
  { symbol: "OS", name: "OS", sector: "GRC" },
  { symbol: "OPEN", name: "OPEN", sector: "Mortgage / PropTech" },
  { symbol: "OPRT", name: "OPRT", sector: "Banking / Lending" },
  { symbol: "OSCR", name: "OSCR", sector: "Healthcare" },
  { symbol: "PGY", name: "PGY", sector: "Banking / Lending" },
  { symbol: "PAGS", name: "PAGS", sector: "Payments" },
  { symbol: "PAYA", name: "PAYA", sector: "Payments" },
  { symbol: "PAYX", name: "PAYX", sector: "CFO Stack Solutions" },
  { symbol: "PAYC", name: "PAYC", sector: "CFO Stack Solutions" },
  { symbol: "PCTY", name: "PCTY", sector: "CFO Stack Solutions" },
  { symbol: "PAY", name: "PAY", sector: "CFO Stack Solutions" },
  { symbol: "PAYO", name: "PAYO", sector: "Payments" },
  { symbol: "PCOR", name: "PCOR", sector: "Vertical SaaS / Embedded Finance" },
  { symbol: "QTWO", name: "QTWO", sector: "Banking / Lending" },
  { symbol: "QUOT", name: "QUOT", sector: "Payments" },
  { symbol: "RDFN", name: "RDFN", sector: "Mortgage / PropTech" },
  { symbol: "RELY", name: "RELY", sector: "Payments" },
  { symbol: "SALE", name: "SALE", sector: "Payments" },
  { symbol: "RSKD", name: "RSKD", sector: "GRC" },
  { symbol: "HOOD", name: "HOOD", sector: "Capital Markets" },
  { symbol: "RKT", name: "RKT", sector: "Mortgage / PropTech" },
  { symbol: "ROOT", name: "ROOT", sector: "Insurtech" },
  { symbol: "SC", name: "SC", sector: "Banking / Lending" },
  { symbol: "SLQT", name: "SLQT", sector: "Insurtech" },
  { symbol: "TTAN", name: "TTAN", sector: "Vertical SaaS / Embedded Finance" },
  { symbol: "FOUR", name: "FOUR", sector: "Payments" },
  { symbol: "SLDE", name: "SLDE", sector: "Insurtech" },
  { symbol: "SOFI", name: "SOFI", sector: "Banking / Lending" },
  { symbol: "STNE", name: "STNE", sector: "Payments" },
  { symbol: "SYF", name: "SYF", sector: "Banking / Lending" },
  { symbol: "SGE", name: "SGE", sector: "CFO Stack Solutions" },
  { symbol: "TOST", name: "TOST", sector: "Vertical SaaS / Embedded Finance" },
  { symbol: "TW", name: "TW", sector: "Capital Markets" },
  { symbol: "TRU", name: "TRU", sector: "GRC" },
  { symbol: "TNET", name: "TNET", sector: "CFO Stack Solutions" },
  { symbol: "UPST", name: "UPST", sector: "Banking / Lending" },
  { symbol: "VIRT", name: "VIRT", sector: "Capital Markets" },
  { symbol: "WAY", name: "WAY", sector: "Healthcare" },
  { symbol: "WISE", name: "WISE", sector: "Payments" },
  { symbol: "XRO", name: "XRO", sector: "CFO Stack Solutions" },
  { symbol: "XOOM", name: "XOOM", sector: "Payments" },
  { symbol: "XP", name: "XP", sector: "Capital Markets" },
  { symbol: "YDLE", name: "YDLE", sector: "Banking / Lending" },
  { symbol: "ZUO", name: "ZUO", sector: "CFO Stack Solutions" },
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
  "Banking / Lending": "#2563EB",
  "Healthcare": "#EC4899",
  "Blockchain / Crypto": "#DB2777",
  "GRC": "#0EA5E9",
  "CFO Stack Solutions": "#059669",
  "Mortgage / PropTech": "#EAB308",
  "Capital Markets": "#F59E0B",
  "Vertical SaaS / Embedded Finance": "#6B7280",
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

  const limitedResults = validResults.slice(0, 20);
  const totalMarketCap = limitedResults.reduce((sum, c) => sum + c.marketCap, 0);

  const result = {
    data: limitedResults,
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
