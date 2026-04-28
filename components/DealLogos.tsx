interface Logo {
  src: string;
  alt: string;
  height?: number;
  unconstrained?: boolean;
}

interface DealLogosProps {
  acquirers: Logo[];
  target: Logo;
  logoHeight?: number;
}

const baseImgStyle: React.CSSProperties = {
  maxWidth: "100%",
  objectFit: "contain",
  display: "block",
};

function renderLogo(logo: Logo, fallback: number) {
  const h = logo.height ?? fallback;
  const style: React.CSSProperties = logo.unconstrained
    ? { display: "block", height: h, width: "auto", maxWidth: "none" }
    : { ...baseImgStyle, maxHeight: h };
  // eslint-disable-next-line @next/next/no-img-element
  return <img key={logo.src} src={logo.src} alt={logo.alt} style={style} />;
}

export default function DealLogos({ acquirers, target, logoHeight = 18 }: DealLogosProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        width: "100%",
      }}
    >
      {acquirers.map((logo) => renderLogo(logo, logoHeight))}
      <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, lineHeight: 1 }}>×</span>
      {renderLogo(target, logoHeight)}
    </div>
  );
}
