"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import TypeWriter from "@/components/TypeWriter";
import verticalDots from "@/app/assets/vertical-dots-4.svg";
import HeroCirclesAnimated from "@/components/HeroCirclesAnimated";

export default function AboutPage() {
  const [networkVisible, setNetworkVisible] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);
  const networkRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  // Delay body text appearance until after typewriter finishes
  // Headline: 103 chars × 30ms delay + 300ms start = ~3400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setBodyVisible(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === networkRef.current && entry.isIntersecting) {
            setNetworkVisible(true);
          }
          if (entry.target === focusRef.current && entry.isIntersecting) {
            setFocusVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (networkRef.current) observer.observe(networkRef.current);
    if (focusRef.current) observer.observe(focusRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header animate={false} />
      <main className="pt-24">
        {/* Main statement - Full width impact */}
        <section className="py-16 mb-12 bg-white min-h-[60vh] flex items-center">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-8">
            <HeroCirclesAnimated className="mb-6 w-14" />
            <h1 className="font-display text-4xl md:text-6xl text-[#1C39BB] leading-tight mb-8 max-w-4xl">
              <TypeWriter
                text="A fintech specialist investment firm focused on late-stage secondaries and special situations investing."
                delay={30}
                startDelay={300}
              />
            </h1>
            <p
              className={`text-xl md:text-2xl text-[#575757]/80 leading-relaxed transition-all duration-1000 max-w-3xl ${
                bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              We invest in late stage fintech companies across all major verticals of fintech.
            </p>
          </div>
        </section>

        {/* Three Focus Areas - Dramatic presentation */}
        <section ref={focusRef} className="py-24 bg-gradient-to-br from-[#1C39BB] to-[#0f2178] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-12 right-12 opacity-20">
            <Image src={verticalDots} alt="" className="h-48 w-auto" />
          </div>
          <div className="absolute bottom-12 left-12 opacity-20 rotate-180">
            <Image src={verticalDots} alt="" className="h-48 w-auto" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <span className="font-mono text-sm text-white/60 tracking-wider uppercase">
                Our Investment Focus
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-0 md:gap-0">
              {[
                {
                  number: "01",
                  title: "Late-Stage Secondaries",
                  description: "Providing liquidity solutions to shareholders of high-growth fintech companies at inflection points.",
                },
                {
                  number: "02",
                  title: "Special Situations",
                  description: "Opportunistic investments in unique market conditions where our expertise unlocks value.",
                },
                {
                  number: "03",
                  title: "Growth Investing",
                  description: "Backing category-defining fintech companies poised for continued expansion and market leadership.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`relative p-8 md:p-12 border-white/10 transition-all duration-700 ${
                    focusVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${idx < 2 ? "md:border-r" : ""} ${idx > 0 ? "border-t md:border-t-0" : ""}`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <span className="font-mono text-6xl md:text-8xl font-bold text-white/10 absolute top-4 right-4">
                    {item.number}
                  </span>
                  <div className="relative">
                    <h3 className="font-display text-2xl md:text-3xl text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advisor Network - Creative section */}
        <section ref={networkRef} className="py-32 bg-white relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left - Visual element */}
              <div
                className={`relative transition-all duration-1000 ${
                  networkVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                }`}
              >
                {/* Abstract network visualization */}
                <div className="aspect-square relative">
                  {/* Central dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#1C39BB] rounded-full" />

                  {/* Orbiting elements */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) * (Math.PI / 180);
                    const radius = 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <div
                        key={i}
                        className={`absolute top-1/2 left-1/2 transition-all duration-1000`}
                        style={{
                          transform: networkVisible
                            ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                            : "translate(-50%, -50%)",
                          transitionDelay: `${i * 100}ms`,
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full ${i % 2 === 0 ? 'bg-[#1C39BB]' : 'bg-[#1C39BB]/40'}`} />
                      </div>
                    );
                  })}

                  {/* Outer ring elements */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const radius = 180;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <div
                        key={`outer-${i}`}
                        className={`absolute top-1/2 left-1/2 transition-all duration-1000`}
                        style={{
                          transform: networkVisible
                            ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                            : "translate(-50%, -50%)",
                          transitionDelay: `${800 + i * 50}ms`,
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#1C39BB]/20" />
                      </div>
                    );
                  })}

                  {/* Connecting lines (decorative) */}
                  <svg className="absolute inset-0 w-full h-full" style={{ opacity: networkVisible ? 0.1 : 0, transition: 'opacity 1s ease-out 0.5s' }}>
                    <circle cx="50%" cy="50%" r="120" fill="none" stroke="#1C39BB" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="180" fill="none" stroke="#1C39BB" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>
              </div>

              {/* Right - Content */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  networkVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                }`}
              >
                <span className="font-mono text-sm text-[#1C39BB] tracking-wider uppercase mb-4 block">
                  Our Network
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-[#575757] mb-6">
                  Built on a foundation of industry relationships and expertise
                </h2>
                <div className="space-y-6 text-[#575757]/80 leading-relaxed">
                  <p>
                    Blue Dot works alongside one of the largest advisor networks globally. Our advisor network consists of <span className="text-[#1C39BB] font-medium">ex-operators</span> and <span className="text-[#1C39BB] font-medium">functional domain experts</span> who provide expertise across verticals, stages, and geographies in fintech.
                  </p>
                  <p>
                    We leverage this network to empower the entrepreneurs and companies we back—<span className="text-[#575757] font-medium">unlocking doors</span> and providing <span className="text-[#575757] font-medium">strategic insight</span> across the fintech ecosystem.
                  </p>
                </div>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 mt-8 text-[#1C39BB] font-medium hover:opacity-80 transition-opacity"
                >
                  Meet Our Advisors
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-mono text-sm text-[#1C39BB] tracking-wider uppercase mb-4 block">
                Beyond Capital
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[#575757] mb-6">
                Building a community across our ecosystem
              </h2>
              <p className="text-lg text-[#575757]/80 leading-relaxed mb-8">
                Through our <span className="text-[#1C39BB] font-medium">dinner series</span> and thought leadership initiatives, we create opportunities for founders, investors, and industry leaders to connect and share insights on the future of fintech disruption.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/community"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1C39BB] text-white rounded-lg font-medium hover:bg-[#0f2178] transition-colors"
                >
                  Explore Our Community
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
