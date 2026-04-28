import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Blue Dot Investors and FT Partners Report: Private FinTech Giants Now Outpace Public Peers | Press",
  description:
    "New analysis from Blue Dot Investors and FT Partners highlights a $1.9 trillion cohort of top private FinTechs and rising global liquidity opportunities across IPOs, M&A and secondaries.",
};

const FT_REPORT_URL =
  "https://ftpartners.com/fintech-strategic-insights/fintech-liquidity-supercycle";
const BLUE_DOT_HIGHLIGHTS_URL = "/research/bluedot-ft-partners-report";

export default function PressPage() {
  return (
    <>
      <Header animate={false} />
      <main className="pt-24 pb-24 bg-white min-h-screen">
        {/* Hero */}
        <section className="py-16 border-b border-[#e5e5e5]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="font-mono text-sm tracking-widest text-[#575757]/60 uppercase mb-6">
              Press Release
            </p>
            <h1 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-6">
              Blue Dot Investors and FT Partners Report: Private FinTech Giants
              Now Outpace Public Peers as Liquidity Cycle Builds Across IPOs,
              M&amp;A and Secondaries
            </h1>
            <p className="text-xl md:text-2xl text-[#575757]/80 leading-relaxed mb-8">
              New analysis from Blue Dot Investors and FT Partners highlights a
              $1.9 trillion cohort of top private FinTechs and rising global
              liquidity opportunities across IPOs, M&amp;A and secondaries
            </p>
            <div className="flex items-center gap-4 text-sm text-[#575757]/60">
              <time dateTime="2026-04-28">April 28, 2026</time>
              <span className="w-1 h-1 rounded-full bg-[#575757]/40" />
              <span>New York, NY</span>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-[#575757] leading-relaxed space-y-6">
              <p>
                <strong className="text-[#1C39BB]">
                  New York, NY &ndash; April 28, 2026
                </strong>{" "}
                &ndash;{" "}
                <Link
                  href="/"
                  className="text-[#1C39BB] underline underline-offset-2 hover:text-[#0f2178] transition-colors"
                >
                  Blue Dot Investors
                </Link>{" "}
                and{" "}
                <a
                  href="https://www.ftpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1C39BB] underline underline-offset-2 hover:text-[#0f2178] transition-colors"
                >
                  FT Partners
                </a>{" "}
                today released a new research report,{" "}
                <a
                  href={FT_REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1C39BB] underline underline-offset-2 hover:text-[#0f2178] transition-colors"
                >
                  <em>The Coming FinTech Liquidity Supercycle</em>
                </a>
                . This analysis is designed for institutional investors,
                FinTech founders and capital markets participants, providing a
                data-driven roadmap for the sector&apos;s next phase of global
                liquidity across IPOs, M&amp;A and secondary markets.
              </p>

              <blockquote className="border-l-4 border-[#1C39BB] pl-6 my-10 italic text-[#575757]/90">
                <p className="mb-4">
                  &ldquo;FinTech is coming of age, and companies that once would
                  have been considered smaller, emerging players are now
                  reaching the scale and maturity needed to pursue paths to
                  liquidity. We are seeing a clear flight to quality in the IPO
                  market, with the FinTech companies going public today are
                  larger, more efficient and more profitable than prior cohorts
                  &ndash; with 69% of recent U.S. listings profitable at the
                  time of IPO and median revenue at listing reaching
                  approximately $673 million. That tells us the window has
                  reopened for scaled, high-quality issuers, even as the bar
                  for going public has moved materially higher. At the same
                  time, rising FinTech-to-FinTech acquisition activity &ndash;
                  up 4.4x over the last decade &ndash; shows that scaled players
                  are increasingly using their balance sheets to acquire
                  specialized competitors and strengthen their market
                  position.&rdquo;
                </p>
                <footer className="not-italic text-[#1C39BB] font-medium">
                  &mdash;{" "}
                  <a
                    href="https://www.linkedin.com/in/stevemclaughlinftpartners/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[#0f2178] transition-colors"
                  >
                    Steve McLaughlin
                  </a>
                  , Managing Partner of FT Partners
                </footer>
              </blockquote>

              <blockquote className="border-l-4 border-[#1C39BB] pl-6 my-10 italic text-[#575757]/90">
                <p className="mb-4">
                  &ldquo;The scale of the private market is the headline story;
                  the top 100 private FinTech companies in the world now
                  generate approximately $174 billion in annual revenue,
                  exceeding the roughly $158 billion generated by their public
                  peers. At the same time, that private cohort is valued at
                  approximately $1.9 trillion &ndash; nearly 2.9x the market
                  cap of comparable FinTech companies &ndash; creating a
                  meaningful valuation gap. As liquidity needs rise across this
                  large, maturing ecosystem, secondary markets are becoming an
                  increasingly important access point for institutional
                  investors.&rdquo;
                </p>
                <footer className="not-italic text-[#1C39BB] font-medium">
                  &mdash;{" "}
                  <a
                    href="https://linkedin.com/in/sahejsuri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[#0f2178] transition-colors"
                  >
                    Sahej Suri
                  </a>
                  , Managing Partner of Blue Dot Investors
                </footer>
              </blockquote>

              <h2 className="font-display text-2xl md:text-3xl text-[#1C39BB] !mt-12 !mb-4">
                Market Analysis: Why FinTech is Outpacing Public Peers
              </h2>
              <p>
                The global FinTech sector has evolved into a mature asset class.
                For the first time, the top 100 private FinTech companies are
                generating more collective revenue ($174 billion) than the top
                100 public FinTech firms ($158 billion) founded since 2006. With
                a combined valuation of $1.9 trillion, these private giants are
                no longer &ldquo;startups&rdquo; but scaled enterprises ready
                for public market entry or strategic consolidation.
              </p>
              <p>
                More broadly, FinTech&apos;s consumer reach is now rivaling
                incumbents, with Nubank and Revolut&apos;s combined customer
                bases exceeding those of Bank of America and JPMorgan Chase.
              </p>

              <h2 className="font-display text-2xl md:text-3xl text-[#1C39BB] !mt-12 !mb-4">
                Three Key Liquidity Paths: IPOs, M&amp;A and Secondaries
              </h2>
              <p>
                The report identifies a significant shift in how liquidity is
                being realized in the current market cycle:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-[#1C39BB]">
                    The Reopening IPO Window:
                  </strong>{" "}
                  26 FinTech companies have listed in the U.S. since 2024,
                  showing a 3.4x increase in median revenue at IPO ($673
                  million) compared to the 2011&ndash;2019 cycle.
                </li>
                <li>
                  <strong className="text-[#1C39BB]">
                    Consolidation via M&amp;A:
                  </strong>{" "}
                  FinTech-to-FinTech acquisition activity has increased 4.4x
                  over the last decade as scaled players use their balance
                  sheets to acquire specialized competitors.
                </li>
                <li>
                  <strong className="text-[#1C39BB]">
                    Focused Secondary Volume:
                  </strong>{" "}
                  Secondary market liquidity remains highly concentrated
                  &ndash; according to Caplight Research &ndash; with nearly
                  96% of volume occurring in the top 10 companies, creating a
                  &ldquo;long-tail opportunity&rdquo; for investors to acquire
                  high-quality, underrepresented assets outside the most
                  heavily traded names.
                </li>
              </ul>

              <h2 className="font-display text-2xl md:text-3xl text-[#1C39BB] !mt-12 !mb-4">
                Key Market Statistics &amp; Findings
              </h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-[#1C39BB]">
                    Revenue Leadership:
                  </strong>{" "}
                  Private FinTech revenue ($174B) now exceeds public peer
                  revenue ($158B).
                </li>
                <li>
                  <strong className="text-[#1C39BB]">
                    Geographic Breakdown:
                  </strong>{" "}
                  North America accounts for 55% of private FinTech revenue
                  ($95B), followed by Europe (16%) and Asia (11%).
                </li>
                <li>
                  <strong className="text-[#1C39BB]">Customer Scale:</strong>{" "}
                  Nu and Revolut&apos;s combined customer bases now exceed
                  those of Bank of America and JPMorgan, underscoring how
                  scaled FinTech platforms are reaching incumbent-bank levels
                  of consumer reach.
                </li>
                <li>
                  <strong className="text-[#1C39BB]">
                    Profitability Trends:
                  </strong>{" "}
                  69% of FinTech companies going public today are profitable,
                  up from 52% in the 2011&ndash;2019 cohort.
                </li>
                <li>
                  <strong className="text-[#1C39BB]">Ecosystem Scale:</strong>{" "}
                  More than 55,000 FinTech companies have been founded globally
                  over the last 20+ years.
                </li>
              </ul>

              <h2 className="font-display text-2xl md:text-3xl text-[#1C39BB] !mt-12 !mb-4">
                What Makes This Market Cycle Different
              </h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-[#1C39BB]">
                    Efficiency at Scale:
                  </strong>{" "}
                  Modern IPO candidates are significantly larger and more
                  capital-efficient than those from the &ldquo;growth at all
                  costs&rdquo; era.
                </li>
                <li>
                  <strong className="text-[#1C39BB]">
                    Institutional Maturity:
                  </strong>{" "}
                  The sector has shifted from niche technology to the backbone
                  of global financial services across Banking, Payments and
                  WealthTech.
                </li>
                <li>
                  <strong className="text-[#1C39BB]">
                    Secondary Market Demand:
                  </strong>{" "}
                  Systematic demand for liquidity from aging venture portfolios
                  is driving a more professionalized secondary trading
                  environment.
                </li>
              </ul>

              <p>
                As FinTech companies mature into core infrastructure for global
                financial services, the sector is entering a new phase defined
                by scaled profitability, institutional capital and accelerating
                liquidity events.
              </p>

              <p>
                To view the full report,{" "}
                <a
                  href={FT_REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1C39BB] underline underline-offset-2 hover:text-[#0f2178] transition-colors"
                >
                  see here
                </a>
                . For key highlights from Blue Dot Investors,{" "}
                <Link
                  href={BLUE_DOT_HIGHLIGHTS_URL}
                  className="text-[#1C39BB] underline underline-offset-2 hover:text-[#0f2178] transition-colors"
                >
                  click here
                </Link>
                .
              </p>
            </div>

            {/* Divider */}
            <hr className="my-16 border-[#e5e5e5]" />

            {/* About Blue Dot */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-[#1C39BB]">
                About Blue Dot Investors
              </h2>
              <p className="text-[#575757] leading-relaxed">
                Blue Dot Investors, founded by Sahej Suri, is a New York-based
                FinTech specialist investment firm focused on late-stage growth
                equity and secondaries investing. The firm invests across
                Banking, Credit, Payments, Capital Markets, WealthTech and
                InsurTech, as well as emerging areas including AI and
                crypto/blockchain, providing liquidity solutions and hands-on
                support to help businesses scale. For more information, visit{" "}
                <Link
                  href="/"
                  className="text-[#1C39BB] underline underline-offset-2 hover:text-[#0f2178] transition-colors"
                >
                  BlueDotInvestors.com
                </Link>
                .
              </p>
            </div>

            {/* About FT Partners */}
            <div className="space-y-6 mt-10">
              <h2 className="font-display text-2xl text-[#1C39BB]">
                About FT Partners
              </h2>
              <p className="text-[#575757] leading-relaxed">
                Financial Technology Partners (FT Partners), founded by Steve
                McLaughlin, is the leading global investment bank focused
                exclusively on FinTech. The firm has advised on many of the
                industry&apos;s most significant transactions, including
                Revolut&apos;s $1.25 billion Series E at a $33 billion
                valuation, Deribit&apos;s $4.3 billion sale to Coinbase,
                Divvy&apos;s $2.5 billion sale to Bill.com, Truebill&apos;s
                $1.3 billion sale to Rocket Companies, and Bilt&apos;s $250
                million financing at a $10.75 billion valuation.
              </p>
            </div>

            {/* Media Contact */}
            <div className="mt-12 p-8 bg-[#f8f8f8] rounded-xl">
              <h3 className="font-medium text-[#575757] mb-2">
                Media Contact
              </h3>
              <p className="text-[#575757]/80">
                Caliber Corporate Advisers for Blue Dot Investors
              </p>
              <a
                href="mailto:bluedot@calibercorporate.com"
                className="text-[#1C39BB] underline underline-offset-2 hover:text-[#0f2178] transition-colors"
              >
                bluedot@calibercorporate.com
              </a>
            </div>

            {/* Other Releases */}
            <div className="mt-20">
              <h2 className="font-display text-2xl text-[#1C39BB] mb-6">
                More Press Releases
              </h2>
              <Link
                href="/press/blue-dot-investors-emerges"
                className="block p-6 bg-[#f8f8f8] rounded-xl hover:bg-[#f0f0f0] transition-colors"
              >
                <p className="font-mono text-xs tracking-widest text-[#575757]/60 uppercase mb-2">
                  Press Release &middot; February 11, 2026
                </p>
                <h3 className="font-display text-xl md:text-2xl text-[#1C39BB] leading-tight mb-2">
                  Blue Dot Investors Emerges as a Fintech-Focused Secondaries
                  Investment Firm
                </h3>
                <span className="inline-flex items-center gap-1 text-sm text-[#1C39BB] font-medium">
                  Read release
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
