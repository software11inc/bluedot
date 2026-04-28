export interface FintechIpo {
  symbol: string;
  name: string;
  sector: string;
  ipoPrice: number | null;
  ipoDate: string;
  grossProceeds: number;
  logo: string;
}

export const FINTECH_IPOS: FintechIpo[] = [
  { symbol: "PAYP", name: "PayPay",      ipoPrice: null, ipoDate: "3/11/2026",  grossProceeds: 880,  logo: "/ipo-logos/PAYP.png",  sector: "Payments" },
  { symbol: "BTGO", name: "BitGo",       ipoPrice: null, ipoDate: "1/26/2026",  grossProceeds: 213,  logo: "/ipo-logos/BTGO.jpeg", sector: "Crypto" },
  { symbol: "NP",   name: "Neptune",     ipoPrice: 20,   ipoDate: "9/30/2025",  grossProceeds: 368,  logo: "/ipo-logos/NP.jpeg",   sector: "Insurance" },
  { symbol: "MIAX", name: "Miax",        ipoPrice: null, ipoDate: "8/13/2025",  grossProceeds: 345,  logo: "/ipo-logos/MIAX.png",  sector: "Capital Markets" },
  { symbol: "CHYM", name: "Chime",       ipoPrice: 27,   ipoDate: "6/11/2025",  grossProceeds: 864,  logo: "/ipo-logos/CHYM.png",  sector: "Digital Banking" },
  { symbol: "AGBK", name: "agi",         ipoPrice: null, ipoDate: "2/10/2026",  grossProceeds: 240,  logo: "/ipo-logos/AGBK.png",  sector: "Banking" },
  { symbol: "WLTH", name: "Wealthfront", ipoPrice: null, ipoDate: "12/11/2025", grossProceeds: 485,  logo: "/ipo-logos/WLTH.png",  sector: "Wealth" },
  { symbol: "GEMI", name: "Gemini",      ipoPrice: 10,   ipoDate: "9/11/2025",  grossProceeds: 425,  logo: "/ipo-logos/GEMI.svg",  sector: "Crypto" },
  { symbol: "BLSH", name: "Bullish",     ipoPrice: 20,   ipoDate: "8/12/2025",  grossProceeds: 1110, logo: "/ipo-logos/BLSH.png",  sector: "Crypto Exchange" },
  { symbol: "CRCL", name: "Circle",      ipoPrice: 26,   ipoDate: "6/04/2025",  grossProceeds: 1054, logo: "/ipo-logos/CRCL.png",  sector: "Stablecoin" },
  { symbol: "PICS", name: "PicPay",      ipoPrice: null, ipoDate: "1/28/2026",  grossProceeds: 434,  logo: "/ipo-logos/PICS.png",  sector: "Payments" },
  { symbol: "XZO",  name: "Exzeo",       ipoPrice: null, ipoDate: "11/04/2025", grossProceeds: 168,  logo: "/ipo-logos/XZO.png",   sector: "Insurtech" },
  { symbol: "FIGR", name: "Figure",      ipoPrice: 36,   ipoDate: "9/10/2025",  grossProceeds: 788,  logo: "/ipo-logos/FIGR.png",  sector: "Blockchain Lending" },
  { symbol: "ARX",  name: "Accelerant",  ipoPrice: 14,   ipoDate: "7/23/2025",  grossProceeds: 724,  logo: "/ipo-logos/ARX.png",   sector: "Insurance" },
  { symbol: "ETOR", name: "eToro",       ipoPrice: 52,   ipoDate: "5/13/2025",  grossProceeds: 620,  logo: "/ipo-logos/ETOR.png",  sector: "Trading" },
  { symbol: "LIFE", name: "Ethos",       ipoPrice: null, ipoDate: "1/28/2026",  grossProceeds: 200,  logo: "/ipo-logos/LIFE.jpeg", sector: "Insurance" },
  { symbol: "NAVN", name: "Navan",       ipoPrice: 13,   ipoDate: "10/29/2025", grossProceeds: 923,  logo: "/ipo-logos/NAVN.png",  sector: "Travel & Expense" },
  { symbol: "KLAR", name: "Klarna",      ipoPrice: 21,   ipoDate: "9/09/2025",  grossProceeds: 1372, logo: "/ipo-logos/KLAR.png",  sector: "BNPL" },
  { symbol: "SLDE", name: "Slide",       ipoPrice: 15,   ipoDate: "6/17/2025",  grossProceeds: 408,  logo: "/ipo-logos/SLDE.png",  sector: "Insurtech" },
  { symbol: "OS",   name: "OneStream",   ipoPrice: 20,   ipoDate: "6/23/2024",  grossProceeds: 490,  logo: "/ipo-logos/OS.png",    sector: "Financial Software" },
];
