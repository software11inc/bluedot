import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/blue-dot-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#1C39BB] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          {/* Left - Logo */}
          <div>
            <Image
              src={logo}
              alt="Blue Dot"
              className="h-10 w-auto brightness-0 invert"
            />
          </div>

          {/* Right - Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Link href="/about" className="text-white font-medium hover:text-white/80 transition-colors">
                About
              </Link>
            </div>

            <div>
              <Link href="/team" className="text-white font-medium hover:text-white/80 transition-colors block mb-3">
                Team
              </Link>
              <div className="space-y-2">
                <Link href="/team#leadership" className="text-white/60 text-sm hover:text-white/80 transition-colors block">
                  Leadership
                </Link>
                <Link href="/team#advisors" className="text-white/60 text-sm hover:text-white/80 transition-colors block">
                  Advisors
                </Link>
              </div>
            </div>

            <div>
              <Link href="/community" className="text-white font-medium hover:text-white/80 transition-colors block mb-3">
                Community
              </Link>
              <div className="space-y-2">
                <Link href="/community#dinner-series" className="text-white/60 text-sm hover:text-white/80 transition-colors block">
                  NYC Fintech Leaders
                </Link>
                <Link href="/community#dinner-series" className="text-white/60 text-sm hover:text-white/80 transition-colors block">
                  SF Banking Summit
                </Link>
                <Link href="/community#dinner-series" className="text-white/60 text-sm hover:text-white/80 transition-colors block">
                  Miami Payments Dinner
                </Link>
              </div>
            </div>

            <div>
              <Link href="/contact" className="text-white font-medium hover:text-white/80 transition-colors">
                Contact
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-[1px] bg-white/20 mt-12 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="mailto:contact@bluedot.com" className="text-white/60 text-sm hover:text-white/80 transition-colors">
            contact@bluedot.com
          </a>
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Blue Dot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
