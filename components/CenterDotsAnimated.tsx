"use client";

interface CenterDotsAnimatedProps {
  className?: string;
  inverted?: boolean;
}

// Dot positions extracted from main-center-dots.svg with unique opacity ranges
const dots = [
  // Center column (x: ~143.02)
  { cx: 143.02, cy: 88.38, minOpacity: 0.1, maxOpacity: 0.4, group: 0 },
  { cx: 143.02, cy: 157.31, minOpacity: 0.15, maxOpacity: 0.5, group: 1 },
  { cx: 143.02, cy: 222.23, minOpacity: 0.2, maxOpacity: 0.6, group: 2 },
  { cx: 143.02, cy: 291.16, minOpacity: 0.4, maxOpacity: 0.85, group: 3 },
  { cx: 143.02, cy: 360.08, minOpacity: 0.5, maxOpacity: 1, group: 4 },
  // Left column (x: ~80.95)
  { cx: 80.95, cy: 19.46, minOpacity: 0.1, maxOpacity: 0.35, group: 0 },
  { cx: 80.95, cy: 88.38, minOpacity: 0.15, maxOpacity: 0.45, group: 1 },
  { cx: 80.95, cy: 157.31, minOpacity: 0.2, maxOpacity: 0.55, group: 2 },
  // Horizontal row (y: ~157.31)
  { cx: 19.46, cy: 157.31, minOpacity: 0.4, maxOpacity: 0.85, group: 3 },
  { cx: 198.97, cy: 157.31, minOpacity: 0.45, maxOpacity: 0.9, group: 4 },
  { cx: 261.03, cy: 157.31, minOpacity: 0.5, maxOpacity: 1, group: 5 },
];

const radius = 19.46;

export default function CenterDotsAnimated({ className = "", inverted = false }: CenterDotsAnimatedProps) {
  const fill = inverted ? "#FFFFFF" : "#CFCFCF";

  return (
    <svg
      width="281"
      height="380"
      viewBox="0 0 281 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {dots.map((dot, index) => `
          @keyframes center-dot-wave-${index} {
            0%, 100% { opacity: ${dot.minOpacity}; }
            50% { opacity: ${dot.maxOpacity}; }
          }
        `).join('')}
      </style>
      {dots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={radius}
          fill={fill}
          style={{
            animation: `center-dot-wave-${index} 2.5s ease-in-out infinite`,
            animationDelay: `${dot.group * 0.2}s`,
          }}
        />
      ))}
    </svg>
  );
}
