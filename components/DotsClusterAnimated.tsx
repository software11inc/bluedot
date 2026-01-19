"use client";

interface DotsClusterAnimatedProps {
  className?: string;
  inverted?: boolean;
}

// A small diagonal cluster of dots
const dots = [
  { cx: 20, cy: 20, minOpacity: 0.3, maxOpacity: 0.8, delay: 0 },
  { cx: 70, cy: 45, minOpacity: 0.15, maxOpacity: 0.5, delay: 0.2 },
  { cx: 45, cy: 70, minOpacity: 0.4, maxOpacity: 0.9, delay: 0.1 },
  { cx: 95, cy: 95, minOpacity: 0.2, maxOpacity: 0.6, delay: 0.3 },
  { cx: 120, cy: 70, minOpacity: 0.1, maxOpacity: 0.4, delay: 0.4 },
];

const radius = 16;

export default function DotsClusterAnimated({ className = "", inverted = false }: DotsClusterAnimatedProps) {
  const fill = inverted ? "#FFFFFF" : "#CFCFCF";

  return (
    <svg
      width="140"
      height="115"
      viewBox="0 0 140 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {dots.map((dot, index) => `
          @keyframes cluster-wave-${index} {
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
            animation: `cluster-wave-${index} 2.5s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}
