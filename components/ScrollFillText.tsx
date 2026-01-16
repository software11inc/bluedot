"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollFillTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollFillText({ children, className = "" }: ScrollFillTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start filling when element enters viewport, complete when it reaches middle
      const startPoint = windowHeight * 0.8;
      const endPoint = windowHeight * 0.3;

      if (rect.top >= startPoint) {
        setFillPercent(0);
      } else if (rect.top <= endPoint) {
        setFillPercent(100);
      } else {
        const progress = (startPoint - rect.top) / (startPoint - endPoint);
        setFillPercent(Math.min(100, Math.max(0, progress * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Gray text (background layer) */}
      <div className="text-gray-300">
        {children}
      </div>
      {/* Black text (foreground layer, clipped) */}
      <div
        className="absolute inset-0 text-[#575757] overflow-hidden"
        style={{ width: `${fillPercent}%` }}
      >
        <div style={{ width: containerRef.current?.offsetWidth || 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
