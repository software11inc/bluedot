"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import linkArrow from "@/app/assets/link-button.svg";
import ScrollFillText from "./ScrollFillText";

export default function LinksSection() {
  const [lineVisible, setLineVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setLineVisible(true), 500);
        } else if (entry.boundingClientRect.top > 0) {
          // Element is below viewport (user scrolled up), reset for next scroll down
          setIsVisible(false);
          setLineVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const links = [
    { label: "Our Team", href: "/team" },
    { label: "Community", href: "/community" },
    { label: "Research", href: "/research" },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className={`mx-auto max-w-7xl px-6 lg:px-8 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        {/* Section label and Headline */}
        <div className="mb-12">
          <span className="font-mono text-sm md:text-base text-[#575757] tracking-wider uppercase">
            04 About Us
          </span>
          <div className="relative h-[1px] mt-4 mb-8">
            <div className="absolute inset-0 bg-gray-200" />
            <div
              className={`absolute inset-0 bg-[#1C39BB] transition-transform duration-[1.2s] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left ${
                lineVisible ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>
          <ScrollFillText
            text="Learn more about our team and our community"
            className="font-sans text-3xl md:text-4xl lg:text-5xl"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Empty for layout */}
          <div />

          {/* Right - Links */}
          <div className="space-y-6">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="flex items-center justify-between group py-4 border-b border-gray-200 last:border-b-0"
              >
                <span className="font-sans text-2xl md:text-3xl text-[#575757] group-hover:text-[#1C39BB] transition-colors">
                  {link.label}
                </span>
                <Image
                  src={linkArrow}
                  alt=""
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
