"use client";

import Image from "next/image";
import splitDot from "@/app/assets/split-dot.svg";
import logo from "@/app/assets/blue-dot-logo.svg";
import TypeWriter from "./TypeWriter";
import VerticalDotsAnimated from "./VerticalDotsAnimated";
import CenterDotsAnimated from "./CenterDotsAnimated";
import BottomLeftDotsAnimated from "./BottomLeftDotsAnimated";
import TopLeftDotsAnimated from "./TopLeftDotsAnimated";

export default function Hero() {
  return (
    <section className="h-screen md:h-[80vh] flex flex-col pt-24 pb-12 bg-white">
      <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-8">
        <div className="relative w-full h-full">
          {/* The blue dot that expands into the banner */}
          <div className="absolute bg-[#1C39BB] animate-dot-expand overflow-hidden">
            {/* White logo in center of initial dot - fades out on expand */}
            <Image
              src={logo}
              alt=""
              className="animate-logo-fade-out brightness-0 invert"
              height={60}
            />

            {/* Dot group decoration - top right */}
            <div className="absolute top-8 right-8 md:right-16 animate-hero-content" style={{ animationDelay: '2s' }}>
              <VerticalDotsAnimated className="h-40 w-auto" inverted />
            </div>

            {/* Top left dots */}
            <div className="hidden md:block absolute top-8 left-8 animate-hero-content" style={{ animationDelay: '2.1s' }}>
              <TopLeftDotsAnimated className="w-28 h-auto" inverted />
            </div>

            {/* Center dots */}
            <div className="hidden md:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-hero-content" style={{ animationDelay: '2.2s' }}>
              <CenterDotsAnimated className="w-32 h-auto" inverted />
            </div>

            {/* Bottom left dots */}
            <div className="hidden md:block absolute -bottom-1 left-8 animate-hero-content" style={{ animationDelay: '2.4s' }}>
              <BottomLeftDotsAnimated className="w-12 h-auto" inverted />
            </div>

            {/* Content inside the blue box */}
            <div className="w-full h-full flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 md:p-12 animate-hero-content">
              {/* Left column */}
              <div className="mt-auto md:mt-0">
                <h1 className="font-display text-5xl md:text-7xl text-white mb-1 max-w-[280px] md:max-w-[400px]">
                  <TypeWriter text="Fintech Secondaries" delay={60} startDelay={2000} />
                </h1>
                <p className="text-xl md:text-2xl text-white/80">
                  And Late Stage Investing
                </p>
              </div>

              {/* Bottom left label */}
              <div className="hidden md:block absolute bottom-24 left-12">
                <span className="font-mono text-base text-white/60 tracking-wider uppercase">
                  00 Sub-Sector Specialists
                </span>
                <div className="absolute left-0 top-full mt-2 h-[1px] bg-white/40 w-[calc(100%+4rem)] -ml-12" />
              </div>

              {/* Right column */}
              <div className="md:self-end text-left md:text-right max-w-xs">
                <Image src={splitDot} alt="" className="md:ml-auto mb-4" />
                <p className="text-lg md:text-xl text-white/80">
                  We are a fintech specialist investment firm that focuses on high-growth secondary transactions and special situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
