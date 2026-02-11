"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/blue-dot-logo.svg";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/community", label: "Community" },
  { href: "/research", label: "Research" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ animate = true }: { animate?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setScrolled(window.scrollY > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md py-4 ${animate ? "animate-nav-slide-down" : ""}`}>
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <Image src={logo} alt="Blue Dot" height={37} />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-4 py-2 transition-all ${
                    isActive
                      ? "bg-[#1C39BB] text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm px-4 py-2 transition-all ${
                      isActive
                        ? "bg-[#1C39BB] text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Animated underline - disabled for now
      <div
        className={`absolute bottom-0 left-1/2 h-[2px] bg-[#1C39BB] transition-all duration-300 ease-out ${
          scrolled ? "w-full -translate-x-1/2" : "w-0 -translate-x-1/2"
        }`}
      />
      */}
    </header>
  );
}
