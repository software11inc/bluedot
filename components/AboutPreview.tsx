"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function AboutPreview() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
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
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      {/* Section label with line */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
        <span
          className="text-sm md:text-base text-black tracking-wider uppercase"
          style={{ fontFamily: "var(--font-cartograph)", fontWeight: 500 }}
        >
          04 About Us
        </span>
        <div className="relative h-[1px] mt-4">
          <div className="absolute inset-0 bg-gray-200" />
          <div
            className={`absolute inset-0 bg-[#1C39BB] transition-all duration-700 ease-out origin-left ${
              inView ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div
            className={`transition-all duration-1000 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-6">
              A fintech specialist investment firm focused on late-stage secondaries and special situations investing.
            </h2>
            <p className="text-lg md:text-xl text-[#575757]/80 leading-relaxed mb-8">
              We invest in late stage fintech companies across all major verticals of fintech.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#1C39BB] font-medium hover:opacity-80 transition-opacity"
            >
              Learn More About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right - Network visualization */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="aspect-square relative max-w-md mx-auto">
              {/* Central dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#1C39BB] rounded-full" />

              {/* Orbiting elements - inner ring */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                const radius = 100;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 transition-all duration-1000"
                    style={{
                      transform: inView
                        ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                        : "translate(-50%, -50%)",
                      transitionDelay: `${500 + i * 80}ms`,
                    }}
                  >
                    <div className={`w-4 h-4 rounded-full ${i % 2 === 0 ? 'bg-[#1C39BB]' : 'bg-[#1C39BB]/40'}`} />
                  </div>
                );
              })}

              {/* Outer ring elements */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const radius = 160;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={`outer-${i}`}
                    className="absolute top-1/2 left-1/2 transition-all duration-1000"
                    style={{
                      transform: inView
                        ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                        : "translate(-50%, -50%)",
                      transitionDelay: `${1000 + i * 50}ms`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#1C39BB]/20" />
                  </div>
                );
              })}

              {/* Connecting circles (decorative) */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ opacity: inView ? 0.15 : 0, transition: 'opacity 1s ease-out 0.8s' }}
              >
                <circle cx="50%" cy="50%" r="100" fill="none" stroke="#1C39BB" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="160" fill="none" stroke="#1C39BB" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
