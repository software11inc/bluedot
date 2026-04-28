"use client";

const defaultLogosTop = [
  "/ipo-logos/CRCL.png",
  "/ipo-logos/CHYM.png",
  "/ipo-logos/ETOR.png",
  "/ipo-logos/KLAR.png",
  "/ipo-logos/FIGR.png",
  "/ipo-logos/PAYP.png",
  "/ipo-logos/GEMI.svg",
  "/ipo-logos/SLDE.png",
  "/ipo-logos/BLSH.png",
  "/ipo-logos/MIAX.png",
];

const defaultLogosBottom = [
  "/treemap-logos/coinbase.png",
  "/treemap-logos/affirm.png",
  "/treemap-logos/sofi.png",
  "/treemap-logos/nu.png",
  "/treemap-logos/robinhood.png",
  "/treemap-logos/chime.png",
  "/treemap-logos/wise.png",
  "/treemap-logos/circle.png",
  "/treemap-logos/adyen.png",
  "/treemap-logos/toast.png",
];

const heroSlidesTop = [
  "/research-hero/Multi-Trillion-Dollar-Industry.png",
  "/research-hero/IPO-pipeline.png",
  "/research-hero/Raised-Bar-For-FinTech-IPOs.png",
  "/research-hero/Total-Market-Cap.png",
  "/research-hero/Combined-Customer-Bases.png",
  "/research-hero/Mature-fund-vintages.png",
  "/research-hero/Most-Profitable-Industry.png",
];

const heroSlidesBottom = [
  "/research-hero/100-Private-FinTech-Companies-Outpacing.png",
  "/research-hero/$174-billion-in-total-revenue.png",
  "/research-hero/Valuation-Revenue-Multiple.png",
  "/research-hero/Revenue-is-Concentrated.png",
  "/research-hero/FinTech-to-FinTech-MA.png",
  "/research-hero/LTM%20executed%20volume.png",
];

function LogoTile({ src }: { src: string }) {
  return (
    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-white shadow-sm flex items-center justify-center p-6 flex-shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="max-w-full max-h-full object-contain" />
    </div>
  );
}

function SlideTile({ src }: { src: string }) {
  return (
    <div className="relative w-52 h-32 md:w-60 md:h-36 bg-white shadow-sm overflow-hidden flex-shrink-0 border border-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

interface ResearchReportCTAProps {
  flip?: boolean;
  background?: "white" | "gray";
  asHero?: boolean;
  tiles?: "logos" | "slides";
}

export default function ResearchReportCTA({
  flip = false,
  background = "gray",
  asHero = false,
  tiles,
}: ResearchReportCTAProps) {
  const bg = background === "white" ? "bg-white" : "bg-gray-50";
  const padding = asHero ? "pt-32 pb-20 md:pt-40 md:pb-24" : "py-24";

  const useSlides = (tiles ?? (asHero ? "slides" : "logos")) === "slides";
  const topImages = useSlides ? heroSlidesTop : defaultLogosTop;
  const bottomImages = useSlides ? heroSlidesBottom : defaultLogosBottom;
  const Tile = useSlides ? SlideTile : LogoTile;

  const fadeMask: React.CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
    maskImage:
      "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
  };

  const marquee = (
    <div className="space-y-8 md:space-y-10">
      <div className="flex overflow-hidden" style={fadeMask}>
        <div className="flex gap-4 animate-logo-scroll shrink-0 pr-4">
          {[...topImages, ...topImages].map((src, i) => (
            <Tile key={`t-${i}`} src={src} />
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden" style={fadeMask}>
        <div
          className="flex gap-4 animate-logo-scroll shrink-0 pr-4"
          style={{ animationDirection: "reverse" }}
        >
          {[...bottomImages, ...bottomImages].map((src, i) => (
            <Tile key={`b-${i}`} src={src} />
          ))}
        </div>
      </div>
    </div>
  );

  const Heading = asHero ? "h1" : "h2";
  // Mobile sizes are tuned so the forced 2-line break ("The Fintech" / "Liquidity Supercycle")
  // doesn't overflow on a 375px viewport (px-6 → ~327px usable). "Liquidity Supercycle" is
  // the binding line — it caps the mobile size around 32–34px in font-display.
  const headlineSize = asHero
    ? "text-[2.125rem] leading-[1.05] sm:leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
    : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl";

  const headline = (
    <div className="space-y-6">
      <Heading
        className={`font-display ${headlineSize} text-[#1C39BB] leading-tight`}
      >
        The Fintech<br className="md:hidden" /> Liquidity Supercycle
      </Heading>
      <div className="space-y-1 text-[#575757]/70">
        <p className="text-lg">April 2026</p>
        <p className="text-lg">Blue Dot × FT Partners</p>
      </div>
      <a
        href="https://ftpartners.com/fintech-strategic-insights/fintech-liquidity-supercycle"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 bg-[#1C39BB] text-white rounded-full font-semibold hover:bg-[#1C39BB]/90 transition-colors"
      >
        Read the Report
      </a>
    </div>
  );

  return (
    <section className={`${padding} ${bg} overflow-hidden`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {flip ? (
            <>
              {headline}
              {marquee}
            </>
          ) : (
            <>
              {marquee}
              {headline}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
