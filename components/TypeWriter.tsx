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
      <span>{text.slice(0, displayedChars)}</span>
      <span className="opacity-0">{text.slice(displayedChars)}</span>
    </>
  );
}
