"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollFillTextProps {
  text: string;
  className?: string;
}

export default function ScrollFillText({ text, className = "" }: ScrollFillTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start filling when element enters viewport, complete when it reaches middle
      const startPoint = windowHeight * 0.8;
      const endPoint = windowHeight * 0.3;

      if (rect.top >= startPoint) {
        setProgress(0);
      } else if (rect.top <= endPoint) {
        setProgress(1);
      } else {
        const prog = (startPoint - rect.top) / (startPoint - endPoint);
        setProgress(Math.min(1, Math.max(0, prog)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split text into characters, preserving spaces
  const characters = text.split("");

  return (
    <div ref={containerRef} className={className}>
      {characters.map((char, index) => {
        // Calculate fill for this character based on its position in the string
        const charProgress = index / (characters.length - 1 || 1);
        const isFilled = progress >= charProgress;

        // Use a regular space span that can wrap
        if (char === " ") {
          return <span key={index}> </span>;
        }

        return (
          <span
            key={index}
            className="transition-colors duration-150"
            style={{
              color: isFilled ? "#575757" : "#d1d5db",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
