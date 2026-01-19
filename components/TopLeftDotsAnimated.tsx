"use client";

interface TopLeftDotsAnimatedProps {
  className?: string;
  inverted?: boolean;
}

// Dot positions extracted from top-left.svg
const dots = [
  // Top row (y: ~19.46)
  { cx: 19.46, cy: 19.46, minOpacity: 0.4, maxOpacity: 0.85, group: 0 },
  { cx: 78.96, cy: 19.46, minOpacity: 0.1, maxOpacity: 0.4, group: 1 },
  { cx: 141.02, cy: 19.46, minOpacity: 0.15, maxOpacity: 0.45, group: 2 },
  { cx: 196.97, cy: 19.46, minOpacity: 0.4, maxOpacity: 0.85, group: 3 },
  // Bottom row (y: ~84.38)
  { cx: 141.02, cy: 84.38, minOpacity: 0.1, maxOpacity: 0.4, group: 2 },
  { cx: 196.97, cy: 84.38, minOpacity: 0.45, maxOpacity: 0.9, group: 3 },
  { cx: 252.27, cy: 84.38, minOpacity: 0.5, maxOpacity: 1, group: 4 },
];

const radius = 19.46;

export default function TopLeftDotsAnimated({ className = "", inverted = false }: TopLeftDotsAnimatedProps) {
  const fill = inverted ? "#FFFFFF" : "#CFCFCF";

  return (
    <svg
      width="272"
      height="104"
      viewBox="0 0 272 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {dots.map((dot, index) => `
          @keyframes top-left-dot-wave-${index} {
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
            animation: `top-left-dot-wave-${index} 2.5s ease-in-out infinite`,
            animationDelay: `${dot.group * 0.2}s`,
          }}
        />
      ))}
    </svg>
  );
}
