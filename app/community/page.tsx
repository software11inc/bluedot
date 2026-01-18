"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import dotGroupHero from "@/app/assets/dot-group-hero-horizontal.svg";
import HeroCirclesAnimated from "@/components/HeroCirclesAnimated";
import TypeWriter from "@/components/TypeWriter";
import linkArrow from "@/app/assets/link-button.svg";
import { dinnerSeries, bentoImages } from "@/data/dinners";

export default function CommunityPage() {
  const [lineVisible, setLineVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLineVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 400;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header animate={false} />
      <main className="pt-24">
        {/* Hero section - same layout as team page */}
        <section className="min-h-[60vh] flex flex-col pb-12 bg-white">
          <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-8">
            <div className="relative w-full h-full">
              {/* Content */}
              <div className="w-full h-full flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 md:py-12 animate-page-content">
                {/* Left column */}
                <div className="mt-auto md:mt-0">
                  <h1 className="font-display text-5xl md:text-7xl text-[#1C39BB]">
                    <TypeWriter text="Our Community" delay={40} startDelay={300} />
                  </h1>
                </div>

                {/* Bottom left label */}
                <div className="absolute -bottom-8 md:-bottom-10 left-0">
                  <span className="font-mono text-sm md:text-base text-black tracking-wider uppercase">
                    04 Community
                  </span>
                  <div className="absolute left-0 top-full mt-2 h-[1px] w-[calc(100%+100vw)] -ml-[100vw]">
                    <div className="absolute inset-0 bg-gray-200" />
                    <div
                      className={`absolute inset-0 bg-[#1C39BB] transition-transform duration-[1.2s] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left ${
                        lineVisible ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                </div>

                {/* Right column */}
                <div className="md:self-end flex flex-col items-end gap-6 -translate-y-[15%]">
                  <Image src={dotGroupHero} alt="" className="md:ml-auto animate-dot-pulse" />
                  <HeroCirclesAnimated className="md:ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento box section */}
        <section className="pt-12 pb-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Centered headline */}
            <h2 className="text-3xl md:text-5xl font-sans text-[#575757] text-center mb-16">
              Building connections across the fintech ecosystem
            </h2>

            {/* Bento grid - 1 left, 2 middle, 1 right */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
              {/* Left - tall image */}
              <div className="h-[300px] md:h-full bg-gray-100 rounded-lg overflow-hidden relative">
                <Image
                  src={bentoImages[0]}
                  alt="Dinner event"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Middle - 2 stacked */}
              <div className="flex flex-col gap-4 h-[300px] md:h-full">
                <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative">
                  <Image
                    src={bentoImages[1]}
                    alt="Dinner event"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative">
                  <Image
                    src={bentoImages[2]}
                    alt="Dinner event"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right - tall image */}
              <div className="h-[300px] md:h-full bg-gray-100 rounded-lg overflow-hidden relative">
                <Image
                  src={bentoImages[3]}
                  alt="Dinner event"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dinner Series section */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section label with line */}
            <div className="mb-6">
              <span
                className="text-sm md:text-base text-black tracking-wider uppercase"
                style={{ fontFamily: "var(--font-cartograph)", fontWeight: 500 }}
              >
                05 Dinner Series
              </span>
              <div className="h-[1px] bg-gray-200 mt-4" />
            </div>

            {/* Headline and navigation */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <h2 className="text-4xl md:text-5xl font-sans text-[#575757] max-w-2xl">
                Intimate gatherings with industry leaders.
              </h2>

              {/* Carousel controls */}
              <div className="flex gap-3">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src={linkArrow} alt="Previous" className="rotate-180" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src={linkArrow} alt="Next" />
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {dinnerSeries.map((event, i) => (
                <Link
                  key={i}
                  href={`/dinner-series/${event.slug}`}
                  className="flex-shrink-0 w-[300px] md:w-[380px] snap-start group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay with title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                      {event.logo && (
                        <div className="mb-3 h-6">
                          <Image
                            src={event.logo}
                            alt=""
                            height={24}
                            className="h-6 w-auto max-w-[120px] object-contain brightness-0 invert opacity-80"
                          />
                        </div>
                      )}
                      <h3 className="font-sans font-medium text-white text-xl mb-1">
                        {event.blogTitle || event.title}
                      </h3>
                      <p className="font-mono text-white/70 text-sm uppercase tracking-wider">
                        {event.date}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
