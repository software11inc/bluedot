"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { dinnerSeries } from "@/data/dinners";

export default function FeaturedSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fade in on scroll, reset when scrolled above viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          // Element is below viewport (user scrolled up), reset for next scroll down
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % dinnerSeries.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get current 3 items to display
  const visibleItems = [
    dinnerSeries[currentIndex % dinnerSeries.length],
    dinnerSeries[(currentIndex + 1) % dinnerSeries.length],
    dinnerSeries[(currentIndex + 2) % dinnerSeries.length],
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className={`mx-auto max-w-7xl px-6 lg:px-8 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="bg-gradient-to-br from-[#1C39BB] to-[#0f2178] rounded-3xl p-8 md:p-12">
          {/* Row 1 - Headline and Image */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Left - Headline */}
            <div>
              {/* Section label */}
              <div className="mb-6">
                <span className="font-mono text-sm md:text-base text-white/60 tracking-wider uppercase">
                  03 Our Community
                </span>
                <div className="h-[1px] bg-white/30 mt-4" />
              </div>

              <h2 className="font-display text-4xl md:text-5xl text-white">
                Building a community across our ecosystem of LPs, advisors and portfolio companies
              </h2>
              <p className="text-white/70 text-lg mt-4 leading-relaxed">
                Intimate gatherings that bring together founders, investors, and industry leaders.<br />
                Real conversations that shape the future of fintech.
              </p>
              <Link
                href="/community"
                className="inline-block mt-6 text-white font-medium hover:text-white/80 transition-colors"
              >
                View All Events &rarr;
              </Link>
            </div>

            {/* Right - Rotating Image */}
            <div className="aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden relative">
              {visibleItems.map((event, i) => {
                const activeIndex = hoveredIndex !== null ? hoveredIndex : 0;
                return (
                  <div
                    key={`${currentIndex}-${event.slug}`}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      i === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {/* Gradient overlay with event name */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white/60 text-sm font-mono uppercase tracking-wider">{event.date}</p>
                      <h3 className="text-white text-xl font-medium mt-1">{event.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2 - Dinner Series Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleItems.map((item, i) => (
              <Link
                key={`${currentIndex}-${i}`}
                href={`/dinner-series/${item.slug}`}
                className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-colors cursor-pointer block"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Date */}
                <p className="text-white/60 text-sm">{item.date}</p>

                {/* Line */}
                <div className="h-[1px] bg-white/30 my-3" />

                {/* Title */}
                <h3 className="text-white font-medium text-lg">{item.title}</h3>
              </Link>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(dinnerSeries.length / 3) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * 3)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / 3) === i ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
