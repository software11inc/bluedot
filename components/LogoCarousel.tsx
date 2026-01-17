"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import ScrollFillText from "./ScrollFillText";

// Import logo images
import klarnaLogo from "@/app/assets/main-logos/K-logo-wikipedia.png";
import albertLogo from "@/app/assets/main-logos/albert.png";
import forageLogo from "@/app/assets/main-logos/forage.png";
import drivewealthLogo from "@/app/assets/main-logos/drivewealth.webp";
import coverdashLogo from "@/app/assets/main-logos/coverdash.png";

const logos: { alt: string; image: StaticImageData }[] = [
  { alt: "Klarna", image: klarnaLogo },
  { alt: "Albert", image: albertLogo },
  { alt: "Forage", image: forageLogo },
  { alt: "DriveWealth", image: drivewealthLogo },
  { alt: "Coverdash", image: coverdashLogo },
];

export default function LogoCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  // Seamless infinite scroll using JS
  useEffect(() => {
    if (isTouchDevice || !carouselRef.current) return;

    const carousel = carouselRef.current;
    let animationId: number;
    let position = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      position += speed;
      const halfWidth = carousel.scrollWidth / 2;

      // Reset position seamlessly when we've scrolled past the first set
      if (position >= halfWidth) {
        position = 0;
      }

      carousel.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isTouchDevice]);

  // Touch handlers for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    if (carouselRef.current) {
      setScrollStart(carouselRef.current.scrollLeft);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    const touchDelta = touchStart - e.touches[0].clientX;
    carouselRef.current.scrollLeft = scrollStart + touchDelta;
  }, [touchStart, scrollStart]);

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
        <div className="relative flex flex-col md:flex-row md:items-center flex-wrap">
          {/* Left column - heading with gradient overlay */}
          <div className="relative z-10 w-full md:w-1/2 md:pr-12 flex-shrink-0 mb-8 md:mb-0">
            <ScrollFillText className="text-4xl md:text-5xl font-sans">
              Investing in companies across the fintech landscape.
            </ScrollFillText>
            {/* Gradient that extends over the carousel - desktop only */}
            <div className="hidden md:block absolute top-0 bottom-0 -right-24 w-24 bg-gradient-to-r from-white to-transparent" />
          </div>

          {/* Right column - logo carousel */}
          <div className="w-full md:flex-1 overflow-hidden">
            <div
              ref={carouselRef}
              className={`flex ${isTouchDevice ? 'overflow-x-auto scrollbar-hide' : ''}`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              style={isTouchDevice ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
            >
              {/* First set of logos */}
              {logos.map((logo, i) => (
                <div
                  key={`logo-1-${i}`}
                  className="flex-shrink-0 w-32 h-16 mx-6 flex items-center justify-center bg-gray-100 rounded-lg transition-colors duration-300 hover:bg-[#1C39BB] group cursor-pointer"
                >
                  <Image
                    src={logo.image}
                    alt={logo.alt}
                    width={100}
                    height={40}
                    className="object-contain grayscale transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {logos.map((logo, i) => (
                <div
                  key={`logo-2-${i}`}
                  className="flex-shrink-0 w-32 h-16 mx-6 flex items-center justify-center bg-gray-100 rounded-lg transition-colors duration-300 hover:bg-[#1C39BB] group cursor-pointer"
                >
                  <Image
                    src={logo.image}
                    alt={logo.alt}
                    width={100}
                    height={40}
                    className="object-contain grayscale transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
