import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Header animate={false} />
      <main className="pt-24">
        {/* Contact section */}
        <section className="min-h-screen pt-24 pb-0 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-sans text-[#575757] mb-8">
                We'd love to hear from you
              </h2>
              <p className="font-sans text-lg text-[#575757]/80 leading-relaxed mb-12">
                Whether you're a founder looking to partner with us, an investor interested in co-investing, or just want to connect—reach out and let's start a conversation.
              </p>

              {/* Contact info */}
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-sm text-[#1C39BB] uppercase tracking-wider mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:contact@bluedotinvestors.com"
                    className="font-sans text-lg text-[#575757] hover:text-[#1C39BB] transition-colors"
                  >
                    contact@bluedotinvestors.com
                  </a>
                </div>

                <div>
                  <p className="font-mono text-sm text-[#1C39BB] uppercase tracking-wider mb-2">
                    Location
                  </p>
                  <p className="font-sans text-lg text-[#575757]">
                    New York City
                  </p>
                </div>

                <div>
                  <p className="font-mono text-sm text-[#1C39BB] uppercase tracking-wider mb-2">
                    Follow Us
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="text-[#575757] hover:text-[#1C39BB] transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-[#575757] hover:text-[#1C39BB] transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
