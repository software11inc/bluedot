"use client";

interface BottomLeftDotsAnimatedProps {
  className?: string;
  inverted?: boolean;
}

// Dot positions extracted from bottom-left.svg
const dots = [
  // Left column (x: ~19.46)
  { cx: 19.46, cy: 19.46, minOpacity: 0.4, maxOpacity: 0.85, group: 0 },
  { cx: 19.46, cy: 74.39, minOpacity: 0.5, maxOpacity: 1, group: 1 },
  // Right column (x: ~128.14)
  { cx: 128.14, cy: 19.46, minOpacity: 0.1, maxOpacity: 0.4, group: 2 },
  { cx: 128.14, cy: 74.39, minOpacity: 0.15, maxOpacity: 0.45, group: 3 },
  // Center bottom (x: ~74.76)
  { cx: 74.76, cy: 74.39, minOpacity: 0.2, maxOpacity: 0.5, group: 2 },
];

const radius = 19.46;

export default function BottomLeftDotsAnimated({ className = "", inverted = false }: BottomLeftDotsAnimatedProps) {
  const fill = inverted ? "#FFFFFF" : "#CFCFCF";

  return (
    <svg
      width="148"
      height="94"
      viewBox="0 0 148 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {dots.map((dot, index) => `
          @keyframes bottom-left-dot-wave-${index} {
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
            animation: `bottom-left-dot-wave-${index} 2.5s ease-in-out infinite`,
            animationDelay: `${dot.group * 0.2}s`,
          }}
        />
      ))}
    </svg>
  );
}
