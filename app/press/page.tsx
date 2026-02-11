import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press | Blue Dot Investors",
  description:
    "Blue Dot Investors emerges as a fintech-focused secondaries investment firm, providing strategic capital and liquidity to late-stage companies.",
};

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
              Blue Dot Investors Emerges as a Fintech-Focused Secondaries
              Investment Firm
            </h1>
            <p className="text-xl md:text-2xl text-[#575757]/80 leading-relaxed mb-8">
              Growth investor brings strategic capital and liquidity to
              late-stage companies to support early investors, founders and
              employees
            </p>
            <div className="flex items-center gap-4 text-sm text-[#575757]/60">
              <time dateTime="2026-02-11">February 11, 2026</time>
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
                  New York, NY &ndash; February 11, 2026
                </strong>{" "}
                &ndash; Today, Blue Dot Investors, announced its launch,
                emerging from stealth to provide secondaries and strategic
                capital solutions for late-stage companies across major fintech
                verticals and their early investors, founders and employees.
              </p>

              <p>
                During the 2021 ZIRP era, fintech companies accounted for nearly
                20% of venture dollars, reflecting strong investor interest in
                the sector. Since then, private funding has cooled within the
                space, yet hundreds of mature, profitable fintech companies are
                now approaching IPOs, strategic exits or extended private
                lifespans. Founders, employees and early investors, many
                constrained by fund-life timelines or other structural limits,
                are driving demand for liquidity in fintech companies that
                require deep investor sector expertise.
              </p>

              <p>
                Blue Dot was founded by Sahej Suri, who also serves as the
                firm&apos;s Managing Partner, drawing on his experience at QED
                Investors, where he worked alongside the founder, Nigel Morris,
                as well as his earlier roles at TPG and J.P. Morgan. That
                investor perspective is complemented by Operating Partner Aaron
                Vermut, whose career spans co-founding Merlin Securities
                (acquired by Wells Fargo), leading Prosper Marketplace as CEO
                and most recently Senior Consultant to the CEO of Robinhood.
                Joined by a fully built out backoffice, Blue Dot draws on
                firsthand operational and investment experience to identify and
                support the next generation of category-defining companies.
              </p>

              <blockquote className="border-l-4 border-[#1C39BB] pl-6 my-10 italic text-[#575757]/90">
                <p className="mb-4">
                  &ldquo;We saw a clear gap in the market to provide flexible
                  capital solutions to fintech companies at pivotal stages,
                  especially within the late-stage fintech market, where
                  liquidity is often limited due to the specialist nature of the
                  sector. In secondaries, just 15 companies account for more
                  than 70% of all venture secondary market volume &ndash; and
                  within fintech, only 10 names account for 95% of that
                  activity<sup>1</sup>. This concentration creates a highly
                  uneven market, and we believe the real opportunity lies in the
                  long tail of high-quality fintech businesses that need
                  liquidity and a strategic partner to scale. Blue Dot exists to
                  serve that gap and help founders capture their full
                  potential.&rdquo;
                </p>
                <footer className="not-italic text-[#1C39BB] font-medium">
                  &mdash; Sahej Suri, Founder &amp; Managing Partner
                </footer>
              </blockquote>

              <p>
                Beyond providing liquidity through secondaries, Blue Dot offers
                its founders access to one of the largest and most-connected
                advisor networks in fintech, including senior leaders from
                Capital One, Robinhood, and McKinsey. The network supports
                portfolio companies on growth strategy, IPO preparation,
                regulatory navigation and fundraising, helping founders
                accelerate business development and scale.
              </p>

              <p>
                The firm invests across major fintech verticals &ndash; banking,
                credit, payments, capital markets, wealthtech and insurtech, as
                well as emerging areas including AI and crypto/blockchain.
              </p>

              <p className="text-sm text-[#575757]/50 mt-10">
                <sup>1</sup> Caplight Research, 2026.
              </p>
            </div>

            {/* Divider */}
            <hr className="my-16 border-[#e5e5e5]" />

            {/* About */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-[#1C39BB]">
                About Blue Dot Investors
              </h2>
              <p className="text-[#575757] leading-relaxed">
                Blue Dot Investors is a New York-based fintech specialist
                investment firm focused on late-stage secondaries, special
                situations and growth investing. The firm deploys capital in
                fintech companies across banking, credit, payments, capital
                markets, wealthtech and insurtech, as well as emerging areas
                including AI and crypto/blockchain, providing liquidity solutions
                and hands-on support to help businesses scale. For more
                information, visit{" "}
                <Link
                  href="/"
                  className="text-[#1C39BB] underline underline-offset-2 hover:text-[#0f2178] transition-colors"
                >
                  BlueDotInvestors.com
                </Link>
                .
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
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
