#!/usr/bin/env node
// Run: FINNHUB_API_KEY=your_key node scripts/refresh-marketcaps.js

const fs = require('fs');
const path = require('path');

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
if (!FINNHUB_API_KEY) {
  console.error('Error: FINNHUB_API_KEY environment variable required');
  process.exit(1);
}

const FINTECH_COMPANIES = [
  { symbol: "INTU", name: "Intuit", sector: "CFO Stack Solutions" },
  { symbol: "COIN", name: "Coinbase", sector: "Blockchain / Crypto" },
  { symbol: "NU", name: "Nu Holdings", sector: "Banking / Lending" },
  { symbol: "SOFI", name: "SoFi Technologies", sector: "Banking / Lending" },
  { symbol: "HOOD", name: "Robinhood", sector: "Capital Markets" },
  { symbol: "AFRM", name: "Affirm", sector: "Banking / Lending" },
  { symbol: "TOST", name: "Toast", sector: "Vertical SaaS / Embedded Finance" },
  { symbol: "BILL", name: "Bill.com", sector: "CFO Stack Solutions" },
  { symbol: "CPAY", name: "Corpay", sector: "Payments" },
  { symbol: "GWRE", name: "Guidewire", sector: "Insurtech" },
  { symbol: "PCTY", name: "Paylocity", sector: "CFO Stack Solutions" },
  { symbol: "PAYC", name: "Paycom", sector: "CFO Stack Solutions" },
  { symbol: "FOUR", name: "Shift4 Payments", sector: "Payments" },
  { symbol: "UPST", name: "Upstart", sector: "Banking / Lending" },
  { symbol: "LMND", name: "Lemonade", sector: "Insurtech" },
  { symbol: "MQ", name: "Marqeta", sector: "Payments" },
  { symbol: "RELY", name: "Remitly", sector: "Payments" },
  { symbol: "DAVE", name: "Dave", sector: "Banking / Lending" },
  { symbol: "LC", name: "LendingClub", sector: "Banking / Lending" },
  { symbol: "NCNO", name: "nCino", sector: "Banking / Lending" },
  { symbol: "QTWO", name: "Q2 Holdings", sector: "Banking / Lending" },
  { symbol: "PAGS", name: "PagSeguro", sector: "Payments" },
  { symbol: "STNE", name: "StoneCo", sector: "Payments" },
  { symbol: "XP", name: "XP Inc", sector: "Capital Markets" },
  { symbol: "PAYX", name: "Paychex", sector: "CFO Stack Solutions" },
  { symbol: "SYF", name: "Synchrony Financial", sector: "Banking / Lending" },
  { symbol: "RKT", name: "Rocket Companies", sector: "Mortgage / PropTech" },
  { symbol: "OSCR", name: "Oscar Health", sector: "Healthcare" },
];

const SECTOR_COLORS = {
  "Payments": "#1C39BB",
  "Insurtech": "#0891B2",
  "Banking / Lending": "#2563EB",
  "Healthcare": "#EC4899",
  "Blockchain / Crypto": "#DB2777",
  "GRC": "#0EA5E9",
  "CFO Stack Solutions": "#059669",
  "Mortgage / PropTech": "#EAB308",
  "Capital Markets": "#F59E0B",
  "Vertical SaaS / Embedded Finance": "#6B7280",
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getProfile(symbol) {
  const res = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
  );
  if (!res.ok) return null;
  return res.json();
}

async function main() {
  console.log(`Fetching market caps for ${FINTECH_COMPANIES.length} companies...`);

  const results = [];

  for (let i = 0; i < FINTECH_COMPANIES.length; i++) {
    const company = FINTECH_COMPANIES[i];
    try {
      const profile = await getProfile(company.symbol);
      const marketCap = profile?.marketCapitalization || 0;

      if (marketCap > 0) {
        results.push({
          symbol: company.symbol,
          name: profile?.name || company.name,
          sector: company.sector,
          marketCap: parseFloat((marketCap / 1000).toFixed(1)),
          color: SECTOR_COLORS[company.sector] || "#1C39BB",
        });
        console.log(`  ${company.symbol}: $${(marketCap / 1000).toFixed(1)}B`);
      } else {
        console.log(`  ${company.symbol}: no data`);
      }
    } catch (err) {
      console.log(`  ${company.symbol}: error - ${err.message}`);
    }

    // Rate limit: ~2 calls per second to stay under 60/min
    if (i < FINTECH_COMPANIES.length - 1) {
      await sleep(500);
    }
  }

  // Sort by market cap descending
  results.sort((a, b) => b.marketCap - a.marketCap);

  const totalMarketCap = results.reduce((sum, c) => sum + c.marketCap, 0);

  const output = {
    data: results,
    totalMarketCap: parseFloat(totalMarketCap.toFixed(1)),
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  const outputPath = path.join(__dirname, '../public/data/fintech-marketcaps.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`\nDone! ${results.length} companies, $${totalMarketCap.toFixed(1)}B total`);
  console.log(`Written to: ${outputPath}`);
}

main().catch(console.error);
