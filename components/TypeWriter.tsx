"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  text: string;
  delay?: number;
  startDelay?: number;
}

export default function TypeWriter({ text, delay = 50, startDelay = 2000 }: TypeWriterProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayedChars < text.length) {
      const timer = setTimeout(() => setDisplayedChars(displayedChars + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [displayedChars, text.length, delay, started]);

  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`transition-opacity duration-100 ${i < displayedChars ? "opacity-100" : "opacity-0"}`}
        >
          {char}
        </span>
      ))}
    </>
  );
}
