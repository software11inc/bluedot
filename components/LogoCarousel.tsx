"use client";

import { useEffect, useRef, useState } from "react";
import ScrollFillText from "./ScrollFillText";

export default function LogoCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 bg-white overflow-hidden animate-hero-content">
      {/* Section label with line */}
      <div ref={sectionRef} className="mx-auto max-w-7xl px-6 lg:px-8 mb-6">
        <div className="w-full md:w-1/2 md:pr-12">
          <span
            className="text-sm md:text-base text-black tracking-wider uppercase"
            style={{ fontFamily: "var(--font-cartograph)", fontWeight: 500 }}
          >
            01 Our Investments
          </span>
          <div className="relative h-[1px] mt-2">
            <div className="absolute inset-0 bg-gray-200" />
            <div
              className={`absolute inset-0 bg-[#1C39BB] transition-all duration-700 ease-out origin-left ${
                inView ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollFillText
          text="Investing in companies across the fintech landscape."
          className="text-4xl md:text-5xl font-display max-w-lg"
        />
      </div>
    </section>
  );
}
