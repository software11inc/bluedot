"use client";

import { useEffect, useState, useRef } from "react";

export default function AnimatedCircles() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#1C39BB] to-[#0f2178] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-white/60 tracking-wider uppercase">
            Our Ecosystem
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-white mt-4">
            Connected across the fintech landscape
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {/* Circle 1 - Expanding rings */}
          <div className="aspect-square relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
            {[40, 70, 100].map((radius, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 transition-all duration-1000"
                style={{
                  width: inView ? radius * 2 : 0,
                  height: inView ? radius * 2 : 0,
                  transitionDelay: `${i * 200}ms`,
                }}
              />
            ))}
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              Payments
            </p>
          </div>

          {/* Circle 2 - Orbiting dots */}
          <div className="aspect-square relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const radius = 50;
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
                    transitionDelay: `${300 + i * 100}ms`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              );
            })}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ opacity: inView ? 0.2 : 0, transition: 'opacity 0.5s ease-out 0.8s' }}
            >
              <circle cx="50%" cy="50%" r="50" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              Banking
            </p>
          </div>

          {/* Circle 3 - Starburst */}
          <div className="aspect-square relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full" />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const length = i % 2 === 0 ? 60 : 40;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 origin-center transition-all duration-700"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <div
                    className="bg-white/40 transition-all duration-700"
                    style={{
                      width: '1px',
                      height: inView ? length : 0,
                      transitionDelay: `${200 + i * 50}ms`,
                    }}
                  />
                </div>
              );
            })}
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              Lending
            </p>
          </div>

          {/* Circle 4 - Cluster */}
          <div className="aspect-square relative">
            {[
              { x: 0, y: 0, size: 20 },
              { x: -25, y: -20, size: 12 },
              { x: 30, y: -15, size: 10 },
              { x: -20, y: 25, size: 14 },
              { x: 25, y: 30, size: 8 },
              { x: 40, y: 10, size: 6 },
              { x: -40, y: 5, size: 8 },
              { x: 10, y: -40, size: 10 },
              { x: -10, y: 45, size: 6 },
            ].map((dot, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 transition-all duration-1000"
                style={{
                  transform: inView
                    ? `translate(calc(-50% + ${dot.x}px), calc(-50% + ${dot.y}px))`
                    : "translate(-50%, -50%)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="rounded-full bg-white transition-all duration-500"
                  style={{
                    width: inView ? dot.size : 0,
                    height: inView ? dot.size : 0,
                    opacity: i === 0 ? 1 : 0.4 + (i * 0.05),
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
              </div>
            ))}
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              Insurance
            </p>
          </div>

          {/* Circle 5 - DNA Helix style */}
          <div className="aspect-square relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * (Math.PI / 180);
              const innerRadius = 30;
              const outerRadius = 55;
              const innerX = Math.cos(angle) * innerRadius;
              const innerY = Math.sin(angle) * innerRadius;
              const outerX = Math.cos(angle + 0.3) * outerRadius;
              const outerY = Math.sin(angle + 0.3) * outerRadius;
              return (
                <div key={i}>
                  <div
                    className="absolute top-1/2 left-1/2 transition-all duration-1000"
                    style={{
                      transform: inView
                        ? `translate(calc(-50% + ${innerX}px), calc(-50% + ${innerY}px))`
                        : "translate(-50%, -50%)",
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 transition-all duration-1000"
                    style={{
                      transform: inView
                        ? `translate(calc(-50% + ${outerX}px), calc(-50% + ${outerY}px))`
                        : "translate(-50%, -50%)",
                      transitionDelay: `${150 + i * 100}ms`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  </div>
                </div>
              );
            })}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ opacity: inView ? 0.15 : 0, transition: 'opacity 0.5s ease-out 1s' }}
            >
              <circle cx="50%" cy="50%" r="30" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="50%" cy="50%" r="55" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 4" />
            </svg>
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              Wealth Tech
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
