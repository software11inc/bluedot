import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import Advisors from "@/components/Advisors";
import FeaturedSection from "@/components/FeaturedSection";
import AboutPreview from "@/components/AboutPreview";
import LinksSection from "@/components/LinksSection";
import Footer from "@/components/Footer";
import PrefetchResearchData from "@/components/PrefetchResearchData";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoCarousel />
        <Advisors />
        <FeaturedSection />
        <AboutPreview />
        <LinksSection />
        <PrefetchResearchData />
      </main>
      <Footer />
    </>
  );
}
