"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import linkArrow from "@/app/assets/link-button.svg";

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
        <div
          className={`transition-all duration-1000 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <h2 className="font-display text-3xl md:text-5xl text-[#1C39BB] leading-tight mb-6 max-w-3xl">
            A fintech specialist investment firm focused on late-stage secondaries and special situations investing.
          </h2>
          <p className="text-lg md:text-xl text-[#575757]/80 leading-relaxed mb-8 max-w-2xl">
            We invest in late stage fintech companies across all major verticals of fintech.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[#1C39BB] font-medium hover:opacity-80 transition-opacity"
          >
            Learn More About Us
            <Image src={linkArrow} alt="" />
          </Link>
        </div>
      </div>
    </section>
  );
}
