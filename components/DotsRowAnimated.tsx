"use client";

interface DotsRowAnimatedProps {
  className?: string;
  inverted?: boolean;
}

// A horizontal row with staggered dots
const dots = [
  { cx: 15, cy: 15, minOpacity: 0.4, maxOpacity: 0.9, delay: 0 },
  { cx: 50, cy: 15, minOpacity: 0.2, maxOpacity: 0.6, delay: 0.15 },
  { cx: 85, cy: 15, minOpacity: 0.35, maxOpacity: 0.85, delay: 0.3 },
  { cx: 120, cy: 15, minOpacity: 0.15, maxOpacity: 0.5, delay: 0.45 },
  { cx: 50, cy: 50, minOpacity: 0.25, maxOpacity: 0.7, delay: 0.2 },
  { cx: 85, cy: 50, minOpacity: 0.1, maxOpacity: 0.35, delay: 0.35 },
];

const radius = 12;

export default function DotsRowAnimated({ className = "", inverted = false }: DotsRowAnimatedProps) {
  const fill = inverted ? "#FFFFFF" : "#CFCFCF";

  return (
    <svg
      width="135"
      height="65"
      viewBox="0 0 135 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {dots.map((dot, index) => `
          @keyframes row-wave-${index} {
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
            animation: `row-wave-${index} 2s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}
