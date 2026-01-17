"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image, { StaticImageData } from "next/image";
import splitDot from "@/app/assets/split-dot.svg";
import TypeWriter from "@/components/TypeWriter";
import { advisors, specialities, Advisor } from "@/data/advisors";

// Import team images
import sahejSuri from "@/app/assets/team/sahej_suri.png";
import aaronJatana from "@/app/assets/team/Aaron_Jatana.png";
import aaronVermut from "@/app/assets/team/Aaron_Vermut.png";
import peterRenton from "@/app/assets/team/Peter Renton.jpeg";
import rachaelLee from "@/app/assets/team/Rachael_Lee.png";

// Import team logos
import logoQED from "@/app/assets/team-logos/qed.jpeg";
import logoJPM from "@/app/assets/team-logos/JPM_logo_2008_DIGITAL_B_Black.png";
import logoProsper from "@/app/assets/team-logos/Prosper.png";
import logoRobinhood from "@/app/assets/team-logos/Robinhood.png";
import logoWellsFargo from "@/app/assets/team-logos/Wells_Fargo.png";
import logoNEA from "@/app/assets/team-logos/NEA.png";
import logoBox from "@/app/assets/team-logos/box.png";
import logoEarnest from "@/app/assets/team-logos/earnest.png";
import logoStanford from "@/app/assets/team-logos/Stanford.jpeg";
import logoWellsGroup from "@/app/assets/team-logos/Wells_group.png";
import logoKPMG from "@/app/assets/team-logos/KPMG.png";

// Team member data
const teamMembers: { name: string; title: string; bio: string; image: StaticImageData; linkedin?: string; logos?: StaticImageData[] }[] = [
  {
    name: "Sahej Suri",
    title: "Founder & Managing Partner",
    bio: "Sahej is the Founder and Managing Partner of Blue Dot Investors. Previously, Sahej worked at QED Investors, a fintech specialist fund where he supported the firm's founder, Nigel Morris. Before QED, he was an investment professional at TPG, where he focused on late-stage growth equity investments in fintech. Sahej started his career at J.P. Morgan in the Financial Institutions Group.\n\nSahej has spent his entire career at the intersection of financial services and technology, primarily focused on growth equity and late-stage businesses. Beyond investing, he is passionate about fintech's role in improving financial health and reducing inequality.\n\nSelect current and previous investments & portfolio company coverage include: Albert, April, ClearScore, CoverDash, Current, DriveWealth, Forage, Kraken, Mission Lane, Varo and xpertSea.\n\nOutside of work, Sahej enjoys traveling, meditation & spirituality, and the Brooklyn Nets. He lives in New York.",
    image: sahejSuri,
    linkedin: "https://www.linkedin.com/in/sahejsuri/",
    logos: [logoQED, logoJPM],
  },
  {
    name: "Aaron Vermut",
    title: "Operating Partner",
    bio: "Aaron is an Operating Partner at Blue Dot Investors. Aaron was CEO of Prosper Marketplace, guiding the company through a period of rapid growth and operational transformation. Before that, he co-founded Merlin Securities, an early fintech platform providing technology, trading, and operational solutions to hedge funds. Merlin was acquired by Wells Fargo, where Aaron became Managing Director and head of Prime Services, leading the integration into Wells Fargo Securities. Earlier in his career, Aaron invested in software and infrastructure companies at New Enterprise Associates. Aaron serves as a Senior Consultant to Robinhood.\n\nOutside of work, Aaron is an avid cyclist and skier, a lifelong science-fiction reader, and a fluent German speaker. He lives in Kelly, Wyoming, with his family.",
    image: aaronVermut,
    linkedin: "https://www.linkedin.com/in/vermut/",
    logos: [logoProsper, logoRobinhood, logoWellsFargo, logoNEA],
  },
  {
    name: "Rachael Lee",
    title: "Chief of Staff",
    bio: "Rachael is Chief of Staff at Blue Dot Investors. In her role, she works closely with the team on execution, internal systems, and strategic initiatives. She brings operating experience from Earnest, Box, and Alchemist Accelerator. She holds a BA in Political Science and an MA in Media & Technology from Stanford.",
    image: rachaelLee,
    linkedin: "https://www.linkedin.com/in/rachael-lee-455786107/",
    logos: [logoBox, logoEarnest, logoStanford],
  },
  {
    name: "Aaron Jatana",
    title: "CFO & COO, Fractional",
    bio: "Aaron leads Blue Dot's financial and operations on a fractional basis. As a Director in the CFO Practice at Wells Group of New York, Aaron specializes in financial planning and analysis with a strong focus on venture capital and private equity funds. Prior to joining Wells Group of New York, Aaron began his career at KPMG, where he worked in the Audit practice, serving clients across the asset management and financial services sectors.",
    image: aaronJatana,
    linkedin: "https://www.linkedin.com/in/aaronjatana/",
    logos: [logoWellsGroup, logoKPMG],
  },
  {
    name: "Peter Renton",
    title: "Principal",
    bio: "Bio text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: peterRenton,
  },
];

export default function TeamPage() {
  const [lineVisible, setLineVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");
  const teamSectionRef = useRef<HTMLDivElement>(null);

  // Filter advisors by speciality
  const filteredAdvisors = selectedSpeciality === "All"
    ? advisors
    : advisors.filter((a) => a.speciality === selectedSpeciality);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLineVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      // Use requestAnimationFrame to throttle for mobile performance
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (!teamSectionRef.current) {
          rafId = null;
          return;
        }

        const section = teamSectionRef.current;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculate progress through the section
        if (sectionTop < viewportHeight && sectionTop > -sectionHeight + viewportHeight) {
          const scrollProgress = (viewportHeight - sectionTop) / (sectionHeight);
          const newIndex = Math.min(
            Math.floor(scrollProgress * teamMembers.length),
            teamMembers.length - 1
          );
          if (newIndex >= 0) {
            setActiveIndex(newIndex);
          }
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <Header animate={false} />
      <main className="pt-24">
        {/* Hero section - same layout as home but no blue background */}
        <section className="min-h-[60vh] flex flex-col pb-12 bg-white">
          <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-8">
            <div className="relative w-full h-full">
              {/* Content */}
              <div className="w-full h-full flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 md:py-12 animate-page-content">
                {/* Left column */}
                <div className="mt-auto md:mt-0">
                  <h1 className="font-display text-5xl md:text-7xl text-[#1C39BB] max-w-[320px] md:max-w-[500px]">
                    <TypeWriter text="Led by Fintech experts with deep sector expertise" delay={40} startDelay={300} />
                  </h1>
                </div>

                {/* Bottom left label */}
                <div className="absolute -bottom-8 md:-bottom-10 left-0">
                  <span className="font-mono text-sm md:text-base text-black tracking-wider uppercase">
                    03 Meet The Team
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
                <div className="md:self-end">
                  <Image src={splitDot} alt="" className="md:ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team members - scroll triggered */}
        <section
          ref={teamSectionRef}
          className="relative bg-white"
          style={{ height: `${teamMembers.length * 100}vh` }}
        >
          <div className="sticky top-0 h-screen flex items-center">
            <div className="w-full h-full">
              <div className="grid md:grid-cols-2 h-full">
                {/* Left - Bio */}
                <div className="flex items-center px-12 md:px-24">
                  <div className="relative">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-500 ${
                          index === activeIndex
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8 absolute inset-0"
                        }`}
                      >
                        <h2 className="font-display text-4xl md:text-5xl text-[#575757] mb-2">
                          {member.name}
                        </h2>
                        <p className="font-mono text-sm text-[#1C39BB] uppercase tracking-wider mb-6">
                          {member.title}
                        </p>
                        <p className="font-sans text-lg text-[#575757]/80 leading-relaxed whitespace-pre-line">
                          {member.bio}
                        </p>

                        {/* Logos */}
                        {member.logos && member.logos.length > 0 && (
                          <div className="mt-6">
                            <div className="flex flex-wrap gap-8 items-center">
                              {member.logos.map((logo, logoIndex) => (
                                <div key={logoIndex} className="h-[42px] flex items-center justify-center">
                                  <Image src={logo} alt="" width={168} height={50} className="h-[42px] w-auto object-contain grayscale opacity-60" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* LinkedIn */}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#575757]/60 font-sans text-sm hover:text-[#575757] transition-colors mt-4"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right - Photo */}
                <div className="h-full">
                  <div className="relative w-full h-full">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-500 ${
                          index === activeIndex
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95"
                        }`}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advisors section - grid layout */}
        <section id="advisors" className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section label with line */}
            <div className="mb-6">
              <span
                className="text-sm md:text-base text-black tracking-wider uppercase"
                style={{ fontFamily: "var(--font-cartograph)", fontWeight: 500 }}
              >
                04 Our Advisors
              </span>
              <div className="h-[1px] bg-gray-200 mt-4" />
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-sans text-[#575757] max-w-2xl mb-8">
              Working alongside a deep network of Fintech Specialists.
            </h2>

            {/* Speciality filter */}
            <div className="flex flex-wrap gap-2 mb-12">
              {specialities.map((speciality) => (
                <button
                  key={speciality}
                  onClick={() => setSelectedSpeciality(speciality)}
                  className={`px-4 py-3 text-sm font-sans rounded-full transition-all duration-200 touch-manipulation min-h-[44px] ${
                    selectedSpeciality === speciality
                      ? "bg-[#1C39BB] text-white"
                      : "bg-gray-100 text-[#575757] hover:bg-gray-200"
                  }`}
                >
                  {speciality}
                </button>
              ))}
            </div>

            {/* Advisors grid - 4 per row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {filteredAdvisors.map((advisor, i) => (
                <div
                  key={i}
                  className="cursor-pointer group"
                  onClick={() => setSelectedAdvisor(advisor)}
                >
                  <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      src={advisor.image}
                      alt={advisor.name}
                      width={300}
                      height={400}
                      className="block w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                    />
                  </div>
                  <h3 className="font-sans font-medium text-[#575757] text-sm group-hover:text-[#1C39BB] transition-colors">{advisor.name}</h3>
                  <p className="font-sans text-[#575757]/60 text-xs">{advisor.title}</p>
                  {advisor.speciality && (
                    <span className="inline-block mt-2 px-2 py-0.5 text-xs font-sans bg-gray-100 text-[#575757]/80 rounded">
                      {advisor.speciality}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Advisor Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          selectedAdvisor ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setSelectedAdvisor(null)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-full sm:max-w-md md:max-w-xl bg-white shadow-2xl transition-transform duration-300 ease-out ${
            selectedAdvisor ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedAdvisor && (
            <div className="h-full overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setSelectedAdvisor(null)}
                className="absolute top-6 right-6 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-[#575757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="aspect-[4/3] bg-gray-200 w-full">
                <Image
                  src={selectedAdvisor.image}
                  alt={selectedAdvisor.name}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="font-display text-3xl text-[#575757] mb-1">
                  {selectedAdvisor.name}
                </h2>
                <p className="font-mono text-sm text-[#1C39BB] uppercase tracking-wider mb-2">
                  {selectedAdvisor.title}
                </p>
                {selectedAdvisor.speciality && (
                  <span className="inline-block px-3 py-1 text-xs font-sans bg-gray-100 text-[#575757] rounded-full">
                    {selectedAdvisor.speciality}
                  </span>
                )}

                <p className="font-sans text-[#575757]/80 leading-relaxed mb-8 mt-6">
                  {selectedAdvisor.bio}
                </p>

                {/* Logos */}
                {selectedAdvisor.logos && selectedAdvisor.logos.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-8 items-center">
                      {selectedAdvisor.logos.map((logo, i) => (
                        <div key={i} className="h-[42px] flex items-center justify-center">
                          <Image src={logo} alt="" width={168} height={50} className="h-[42px] w-auto object-contain grayscale opacity-60" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LinkedIn */}
                {selectedAdvisor.linkedin && (
                  <a
                    href={selectedAdvisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#575757]/60 font-sans text-sm hover:text-[#575757] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
