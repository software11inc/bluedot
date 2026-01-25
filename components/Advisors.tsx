"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import linkButton from "@/app/assets/link-button.svg";
import verticalDots from "@/app/assets/vertical-dots-4.svg";
import ScrollFillText from "./ScrollFillText";
import { advisors as allAdvisors, Advisor } from "@/data/advisors";

const advisors = allAdvisors.filter(a => !a.hidden);
import logoPaulHastings from "@/app/assets/team-logos/paul-hastings@logotyp.us.png";
import logoSoFi from "@/app/assets/team-logos/sofi@logotyp.us.png";
import logoDiscover from "@/app/assets/team-logos/Discover.png";
import logoCapitalOne from "@/app/assets/team-logos/capital-one@logotyp.us.png";
import logoShinsei from "@/app/assets/team-logos/Shinsei_Bank.png";
import logoTreliant from "@/app/assets/team-logos/Treliant.png";

export default function Advisors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsTouching(true);
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

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
  }, []);

  // Seamless infinite scroll using JS
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    let animationId: number;
    let position = isTouchDevice ? carousel.scrollLeft : 0;
    const speed = 0.75; // pixels per frame (adjust for speed)

    const animate = () => {
      // Pause auto-scroll while user is touching
      if (isTouching) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      position += speed;
      const halfWidth = carousel.scrollWidth / 2;

      // Reset position seamlessly when we've scrolled past the first set
      if (position >= halfWidth) {
        position = 0;
        if (isTouchDevice) {
          carousel.scrollLeft = 0;
        }
      }

      if (isTouchDevice) {
        carousel.scrollLeft = position;
      } else {
        carousel.style.transform = `translateX(-${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isTouchDevice, isTouching]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div
        ref={sectionRef}
        className={`transition-opacity duration-700 ease-out ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
      {/* Section label with line */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-6 relative">
        <span
          className="text-sm md:text-base text-black tracking-wider uppercase"
          style={{ fontFamily: "var(--font-cartograph)", fontWeight: 500 }}
        >
          02 Our Advisors
        </span>
        <div className="relative h-[1px] mt-4">
          <div className="absolute inset-0 bg-gray-200" />
          <div
            className={`absolute inset-0 bg-[#1C39BB] transition-all duration-700 ease-out origin-left ${
              inView ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
        {/* Animated dots */}
        <div className="absolute right-0 top-8 animate-dot-pulse">
          <Image src={verticalDots} alt="" className="h-32 w-auto" />
        </div>
      </div>

      {/* Headline */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
        <ScrollFillText
          text="Working alongside a deep network of Fintech Specialists."
          className="text-4xl md:text-5xl font-display max-w-2xl"
        />
        <a href="/team#advisors" className="inline-flex items-center gap-2 mt-6 text-[#1C39BB] font-sans font-medium hover:opacity-80 transition-opacity">
          Our Advisors
          <Image src={linkButton} alt="" />
        </a>
      </div>

      {/* Advisor carousel */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden">
          {/* Gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={carouselRef}
            className={`flex ${isTouchDevice ? 'overflow-x-auto scrollbar-hide' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={isTouchDevice ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
          >
          {/* First set */}
          {advisors.map((advisor, i) => (
            <div
              key={`advisor-1-${i}`}
              className="flex-shrink-0 w-48 mx-4 cursor-pointer group"
              onClick={() => setSelectedAdvisor(advisor)}
            >
              <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                {advisor.image ? (
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    width={192}
                    height={256}
                    className="block w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="font-sans font-medium text-[#575757] text-sm group-hover:text-[#1C39BB] transition-colors">{advisor.name}</h3>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {advisors.map((advisor, i) => (
            <div
              key={`advisor-2-${i}`}
              className="flex-shrink-0 w-48 mx-4 cursor-pointer group"
              onClick={() => setSelectedAdvisor(advisor)}
            >
              <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                {advisor.image ? (
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    width={192}
                    height={256}
                    className="block w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="font-sans font-medium text-[#575757] text-sm group-hover:text-[#1C39BB] transition-colors">{advisor.name}</h3>
            </div>
          ))}
          </div>
        </div>
      </div>
      </div>

      {/* Advisor Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          selectedAdvisor ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setSelectedAdvisor(null)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-full sm:max-w-sm md:max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out ${
            selectedAdvisor ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedAdvisor && (
            <div className="h-full overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setSelectedAdvisor(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image with overlay */}
              <div className="aspect-square bg-gray-200 w-full relative">
                <Image
                  src={selectedAdvisor.image}
                  alt={selectedAdvisor.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Name and info over image */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="font-display text-2xl text-white mb-1">
                    {selectedAdvisor.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-white/80 uppercase tracking-wider">
                      {selectedAdvisor.title}
                    </p>
                    {selectedAdvisor.speciality && (
                      <span className="inline-block px-2 py-0.5 text-xs font-sans bg-white/20 text-white rounded-full">
                        {selectedAdvisor.speciality}
                      </span>
                    )}
                  </div>
                  {selectedAdvisor.linkedin && (
                    <a
                      href={selectedAdvisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white/80 font-mono text-xs uppercase tracking-wider mt-2 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="font-sans text-[#575757]/80 leading-relaxed mb-8">
                  {selectedAdvisor.bio}
                </p>

                {/* Logos */}
                {selectedAdvisor.logos && selectedAdvisor.logos.length > 0 && (
                  <div className="mb-6">
                    <div className={`flex flex-wrap items-center ${["Ariel Boyman", "Phil Goldfeder", "Oliver Goldstein", "Sanjay Sachdev"].includes(selectedAdvisor.name) ? "gap-4" : "gap-8"}`}>
                      {selectedAdvisor.logos.map((logo, i) => {
                        const isArielBoyman = selectedAdvisor.name === "Ariel Boyman";
                        const isPhilGoldfeder = selectedAdvisor.name === "Phil Goldfeder";
                        const isPrincetonGraham = selectedAdvisor.name === "Princeton Graham";
                        const isPaulHastings = logo === logoPaulHastings;
                        const isSoFi = logo === logoSoFi;
                        const isDiscover = logo === logoDiscover;
                        const isCapitalOne = logo === logoCapitalOne;
                        const isTreliant = logo === logoTreliant;
                        if (isPaulHastings || isSoFi) {
                          return (
                            <div key={i} className="h-[42px] flex items-center justify-center">
                              <Image src={logo} alt="" width={168} height={50} className="w-[140px] h-auto object-contain grayscale opacity-60" />
                            </div>
                          );
                        }
                        if (isCapitalOne) {
                          return (
                            <div key={i} className="h-[42px] flex items-center justify-center">
                              <Image src={logo} alt="" width={168} height={50} className="w-[160px] h-auto object-contain grayscale opacity-60" />
                            </div>
                          );
                        }
                        const isOliverGoldstein = selectedAdvisor.name === "Oliver Goldstein";
                        const isSanjay = selectedAdvisor.name === "Sanjay Sachdev";
                        const isColinWalsh = selectedAdvisor.name === "Colin Walsh";
                        const isShinsei = logo === logoShinsei;
                        const height = isArielBoyman ? "h-[56px]" : isColinWalsh ? "h-[56px]" : isOliverGoldstein ? "h-[24px]" : isPhilGoldfeder ? "h-[32px]" : isDiscover ? "h-[28px]" : (isSanjay || isShinsei) ? "h-[28px]" : (isPrincetonGraham && isTreliant) ? "h-[28px]" : "h-[42px]";
                        return (
                          <div key={i} className={`${height} flex items-center justify-center`}>
                            <Image src={logo} alt="" width={168} height={50} className={`${height} w-auto object-contain grayscale opacity-60`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
