import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/blue-dot-logo.svg";
import VerticalDotsAnimated from "./VerticalDotsAnimated";
import TopLeftDotsAnimated from "./TopLeftDotsAnimated";
import CenterDotsAnimated from "./CenterDotsAnimated";
import BottomLeftDotsAnimated from "./BottomLeftDotsAnimated";

export default function Footer() {
  return (
    <footer className="bg-[#1C39BB] py-16 relative overflow-hidden">
      {/* Vertical dots decoration - top right */}
      <div className="absolute top-8 right-8 md:right-16 opacity-60">
        <VerticalDotsAnimated className="h-32 md:h-40 w-auto" inverted />
      </div>


      {/* Center dots */}
      <div className="hidden md:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60">
        <CenterDotsAnimated className="w-32 h-auto" inverted />
      </div>

      {/* Bottom left dots */}
      <div className="hidden md:block absolute -bottom-1 left-8 opacity-60">
        <BottomLeftDotsAnimated className="w-12 h-auto" inverted />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-24">
          {/* Left - Logo */}
          <div>
            <Image
              src={logo}
              alt="Blue Dot"
              className="h-10 w-auto brightness-0 invert"
            />
            <div className="hidden md:block mt-8 opacity-60">
              <TopLeftDotsAnimated className="w-28 h-auto" inverted />
            </div>
          </div>

          {/* Right - Navigation Links */}
          <div className="md:ml-auto">
            <div className="flex flex-col items-start gap-3">
              <Link href="/about" className="text-white font-medium hover:text-white/80 transition-colors">
                About
              </Link>
              <Link href="/team" className="text-white font-medium hover:text-white/80 transition-colors">
                Team
              </Link>
              <Link href="/community" className="text-white font-medium hover:text-white/80 transition-colors">
                Community
              </Link>
              <Link href="/research" className="text-white font-medium hover:text-white/80 transition-colors">
                Research
              </Link>
              <Link href="/contact" className="text-white font-medium hover:text-white/80 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-[1px] bg-white/20 mt-12 mb-6" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Blue Dot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
