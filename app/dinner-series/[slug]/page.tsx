"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { dinnerSeries, DinnerEvent, BlogSection } from "@/data/dinners";

// Convert dinnerSeries array to a lookup object by slug
const dinnerSeriesData: Record<string, DinnerEvent> = dinnerSeries.reduce((acc, event) => {
  acc[event.slug] = event;
  return acc;
}, {} as Record<string, DinnerEvent>);

export default function DinnerSeriesPost() {
  const params = useParams();
  const slug = params.slug as string;
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLineVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const event = dinnerSeriesData[slug];

  if (!event) {
    return (
      <>
        <Header animate={false} />
        <main className="pt-24 min-h-screen flex items-center justify-center">
          <p className="text-[#575757]">Event not found</p>
        </main>
        <Footer />
      </>
    );
  }

  // Get gallery images, ensure we have enough for layout
  const gallery = event.galleryImages || [];

  return (
    <>
      <Header animate={false} />
      <main className="pt-24">
        {/* Hero section with image on right */}
        <section className="min-h-[60vh] flex flex-col pb-12 bg-white">
          <div className="mx-auto max-w-7xl w-full h-full px-6 lg:px-8">
            <div className="relative w-full h-full">
              <div className="w-full h-full flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 md:py-12 animate-page-content">
                {/* Left column - Title and meta */}
                <div className="mt-auto md:mt-0 md:max-w-xl">
                  <p className="font-mono text-sm text-[#1C39BB] uppercase tracking-wider mb-4">
                    {event.date}
                  </p>
                  <h1 className="font-display text-4xl md:text-6xl text-[#1C39BB] mb-6">
                    {event.blogTitle || event.title}
                  </h1>
                  <p className="font-sans text-lg text-[#575757]/80">
                    {event.intro || "An exclusive gathering bringing together fintech leaders for an evening of connection and conversation."}
                  </p>
                </div>

                {/* Right column - Hero image */}
                <div className="w-full md:w-1/2 aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bottom left label */}
                <div className="absolute -bottom-8 md:-bottom-10 left-0">
                  <span className="font-mono text-sm md:text-base text-black tracking-wider uppercase">
                    Dinner Series
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
              </div>
            </div>
          </div>
        </section>

        {/* Blog content */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            {/* First image - full width */}
            {gallery[0] && (
              <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-12 relative">
                <Image
                  src={gallery[0]}
                  alt={`${event.title} - Photo 1`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Custom sections or default content */}
            {event.sections ? (
              <>
                {event.sections.map((section, idx) => (
                  <div key={idx}>
                    {section.heading && (
                      <h2 className="font-display text-3xl text-[#575757] mb-6">
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} className="font-sans text-lg text-[#575757]/80 leading-relaxed mb-8">
                        {para}
                      </p>
                    ))}

                    {/* Insert images at strategic points */}
                    {idx === 1 && gallery.length >= 3 && (
                      <div className="grid grid-cols-2 gap-4 mb-12">
                        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                          <Image
                            src={gallery[1]}
                            alt={`${event.title} - Photo 2`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                          <Image
                            src={gallery[2]}
                            alt={`${event.title} - Photo 3`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Quote after section 2 */}
                    {idx === 2 && event.quote && (
                      <blockquote className="border-l-4 border-[#1C39BB] pl-6 my-12">
                        <p className="font-display text-2xl text-[#575757] italic mb-4">
                          "{event.quote.text}"
                        </p>
                        <cite className="font-mono text-sm text-[#575757]/60 uppercase tracking-wider">
                          — {event.quote.author}
                        </cite>
                      </blockquote>
                    )}

                    {/* Large image after section 3 */}
                    {idx === 3 && gallery[3] && (
                      <div className="w-full aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden mb-12 relative">
                        <Image
                          src={gallery[3]}
                          alt={`${event.title} - Photo 4`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* Default content for events without custom sections */}
                <h2 className="font-display text-3xl text-[#575757] mb-6">
                  The Evening Unfolds
                </h2>

                <p className="font-sans text-lg text-[#575757]/80 leading-relaxed mb-8">
                  Guests arrived at the private venue as the sun set over the city skyline. The atmosphere was warm and welcoming, with conversations naturally flowing between founders, investors, and industry veterans who rarely have the opportunity to connect in such an intimate setting.
                </p>

                <p className="font-sans text-lg text-[#575757]/80 leading-relaxed mb-12">
                  The dinner featured a carefully curated menu paired with exceptional wines, but the real feast was the exchange of ideas. Topics ranged from the evolving regulatory landscape to breakthrough technologies reshaping how we think about money and financial services.
                </p>

                {gallery.length >= 3 && (
                  <div className="grid grid-cols-2 gap-4 mb-12">
                    <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={gallery[1]}
                        alt={`${event.title} - Photo 2`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={gallery[2]}
                        alt={`${event.title} - Photo 3`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <blockquote className="border-l-4 border-[#1C39BB] pl-6 my-12">
                  <p className="font-display text-2xl text-[#575757] italic mb-4">
                    "These gatherings remind us why we do what we do. It's not just about building companies—it's about building a community that will shape the future of finance."
                  </p>
                  <cite className="font-mono text-sm text-[#575757]/60 uppercase tracking-wider">
                    — Dinner Attendee
                  </cite>
                </blockquote>

                <h2 className="font-display text-3xl text-[#575757] mb-6">
                  Key Takeaways
                </h2>

                <p className="font-sans text-lg text-[#575757]/80 leading-relaxed mb-8">
                  Several themes emerged throughout the evening's discussions. The convergence of AI and financial services dominated many conversations, with guests sharing both excitement and thoughtful concerns about the pace of change.
                </p>

                <p className="font-sans text-lg text-[#575757]/80 leading-relaxed mb-12">
                  Perhaps most notably, there was a shared sense of optimism about the resilience of the fintech ecosystem. Despite market headwinds, the leaders in attendance remain committed to building transformative solutions that will benefit millions of people.
                </p>

                {gallery[3] && (
                  <div className="w-full aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden mb-12 relative">
                    <Image
                      src={gallery[3]}
                      alt={`${event.title} - Photo 4`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <h2 className="font-display text-3xl text-[#575757] mb-6">
                  Looking Ahead
                </h2>

                <p className="font-sans text-lg text-[#575757]/80 leading-relaxed mb-8">
                  As the evening drew to a close, guests exchanged contact information and made plans for future collaborations. The connections forged at these dinners often lead to partnerships, investments, and friendships that last for years.
                </p>

                <p className="font-sans text-lg text-[#575757]/80 leading-relaxed mb-12">
                  Blue Dot Capital is proud to facilitate these meaningful gatherings. We believe that the best ideas emerge when passionate people come together in the right environment. Stay tuned for announcements about our upcoming dinner series events.
                </p>
              </>
            )}

            {/* Three images in grid - use remaining gallery images */}
            {gallery.length >= 4 && (
              <div className={`grid gap-4 mb-12 ${gallery.length >= 7 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {gallery.slice(gallery.length >= 7 ? 4 : 3, gallery.length >= 7 ? 7 : 5).map((img, idx) => (
                  <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                    <Image
                      src={img}
                      alt={`${event.title} - Photo ${idx + 5}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="font-sans text-lg text-[#575757] mb-4">
                Interested in attending a future dinner series event?
              </p>
              <a
                href="/contact"
                className="inline-block font-mono text-sm text-[#1C39BB] uppercase tracking-wider hover:opacity-80 transition-opacity"
              >
                Get in Touch &rarr;
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
