"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { dinnerSeries } from "@/data/dinners";

export default function FeaturedSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileCardRef = useRef<HTMLAnchorElement>(null);
  const [cardHeight, setCardHeight] = useState(0);

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

  // Measure card height on mount and when visible
  useEffect(() => {
    const measure = () => {
      if (mobileCardRef.current) {
        setCardHeight(mobileCardRef.current.offsetHeight);
      }
    };
    measure();
    // Re-measure after a short delay to ensure content is rendered
    const timer = setTimeout(measure, 100);
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      // After animation completes, instantly reset position and update index
      setTimeout(() => {
        setIsResetting(true);
        setIsAnimating(false);
        setCurrentIndex((prev) => (prev + 1) % dinnerSeries.length);
        // Re-enable transitions after the reset
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsResetting(false);
          });
        });
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get current 3 items to display (desktop)
  const visibleItems = [
    dinnerSeries[currentIndex % dinnerSeries.length],
    dinnerSeries[(currentIndex + 1) % dinnerSeries.length],
    dinnerSeries[(currentIndex + 2) % dinnerSeries.length],
  ];

  // Get 4 items for mobile vertical carousel (3 visible + 1 incoming)
  const mobileItems = [
    dinnerSeries[currentIndex % dinnerSeries.length],
    dinnerSeries[(currentIndex + 1) % dinnerSeries.length],
    dinnerSeries[(currentIndex + 2) % dinnerSeries.length],
    dinnerSeries[(currentIndex + 3) % dinnerSeries.length],
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className={`mx-auto max-w-7xl px-0 md:px-6 lg:px-8 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="bg-gradient-to-br from-[#1C39BB] to-[#0f2178] rounded-none md:rounded-3xl p-6 md:p-12">
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

              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-white">
                Building a community across our ecosystem of LPs, advisors and portfolio companies
              </h2>
              <p className="text-white/70 text-base md:text-lg mt-4 leading-relaxed">
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
              {dinnerSeries.map((event, i) => (
                <div
                  key={event.slug}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/60 text-sm font-mono uppercase tracking-wider">{event.date}</p>
                    <h3 className="text-white text-xl font-medium mt-1">{event.blogTitle || event.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Dinner Series Carousel - Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {visibleItems.map((item, i) => (
              <Link
                key={`${currentIndex}-${i}`}
                href={`/dinner-series/${item.slug}`}
                className="bg-white/10 rounded-xl p-6 block transition-all duration-500 ease-out"
              >
                {/* Date */}
                <p className="text-white/60 text-sm">{item.date}</p>

                {/* Line */}
                <div className="h-[1px] bg-white/30 my-3" />

                {/* Title */}
                <h3 className="text-white font-medium text-lg">{item.blogTitle || item.title}</h3>

                {/* Logo */}
                {item.logo && (
                  <div className="mt-4 h-6 flex items-center">
                    <Image
                      src={item.logo}
                      alt=""
                      width={120}
                      height={24}
                      className="h-6 w-auto max-w-[120px] object-contain brightness-0 invert opacity-60"
                    />
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Row 2 - Dinner Series Carousel - Mobile Vertical */}
          <div
            className="md:hidden overflow-hidden relative"
            style={{ height: cardHeight > 0 ? `${(cardHeight + 16) * 3 - 16}px` : '500px' }}
          >
            <div
              className={`flex flex-col gap-4 ${
                isResetting ? '' : 'transition-transform duration-500 ease-out'
              }`}
              style={{
                transform: isAnimating ? `translateY(-${cardHeight + 16}px)` : 'translateY(0)'
              }}
            >
              {mobileItems.map((item, i) => (
                <Link
                  ref={i === 0 ? mobileCardRef : undefined}
                  key={item.slug}
                  href={`/dinner-series/${item.slug}`}
                  className={`bg-white/10 rounded-xl p-6 block flex-shrink-0 ${
                    isResetting ? '' : 'transition-opacity duration-500'
                  } ${
                    isAnimating && i === 0 ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  {/* Date */}
                  <p className="text-white/60 text-sm">{item.date}</p>

                  {/* Line */}
                  <div className="h-[1px] bg-white/30 my-3" />

                  {/* Title */}
                  <h3 className="text-white font-medium text-lg">{item.blogTitle || item.title}</h3>

                  {/* Logo */}
                  {item.logo && (
                    <div className="mt-4 h-6 flex items-center">
                      <Image
                        src={item.logo}
                        alt=""
                        width={120}
                        height={24}
                        className="h-6 w-auto max-w-[120px] object-contain brightness-0 invert opacity-60"
                      />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-1 mt-6">
            {dinnerSeries.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                }}
                className="p-3 -m-1 touch-manipulation"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={`block w-2 h-2 rounded-full transition-colors ${
                  currentIndex === i ? "bg-white" : "bg-white/30"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
