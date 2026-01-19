"use client";

interface VerticalDotsAnimatedProps {
  className?: string;
  inverted?: boolean;
}

// Dot positions extracted from the original SVG with unique opacity ranges
// Each dot has: base opacity (min) and peak opacity (max)
const dots = [
  // Left column (x: ~19.46)
  { cx: 19.46, cy: -0.54, minOpacity: 0.1, maxOpacity: 0.4, row: 0 },
  { cx: 19.46, cy: 68.39, minOpacity: 0.15, maxOpacity: 0.5, row: 1 },
  { cx: 19.46, cy: 137.31, minOpacity: 0.2, maxOpacity: 0.6, row: 2 },
  { cx: 19.46, cy: 206.24, minOpacity: 0.25, maxOpacity: 0.7, row: 3 },
  { cx: 19.46, cy: 275.16, minOpacity: 0.3, maxOpacity: 0.8, row: 4 },
  { cx: 19.46, cy: 344.09, minOpacity: 0.5, maxOpacity: 1, row: 5 },
  { cx: 19.46, cy: 413.01, minOpacity: 0.05, maxOpacity: 0.25, row: 6 },
  // Right column (x: ~82.07)
  { cx: 82.07, cy: 275.16, minOpacity: 0.4, maxOpacity: 0.9, row: 4 },
  { cx: 82.07, cy: 344.09, minOpacity: 0.5, maxOpacity: 1, row: 5 },
  { cx: 82.07, cy: 413.01, minOpacity: 0.35, maxOpacity: 0.8, row: 6 },
  { cx: 82.07, cy: 481.94, minOpacity: 0.15, maxOpacity: 0.5, row: 7 },
];

const radius = 19.46;

export default function VerticalDotsAnimated({ className = "", inverted = false }: VerticalDotsAnimatedProps) {
  const fill = inverted ? "#FFFFFF" : "#CFCFCF";

  return (
    <svg
      width="102"
      height="522"
      viewBox="0 -20 102 522"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {dots.map((dot, index) => `
          @keyframes dot-wave-${index} {
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
            animation: `dot-wave-${index} 2s ease-in-out infinite`,
            animationDelay: `${dot.row * 0.15}s`,
          }}
        />
      ))}
    </svg>
  );
}
