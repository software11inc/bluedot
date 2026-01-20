export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s Build Together
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Whether you&apos;re a founder with a bold vision or an LP interested
            in our fund, we&apos;d love to hear from you.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">
                For Founders
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Share your deck and let&apos;s explore how we can partner.
              </p>
              <a
                href="mailto:contact@bluedotinvestors.com"
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                contact@bluedotinvestors.com
              </a>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">
                For LPs
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Learn more about our fund and investment strategy.
              </p>
              <a
                href="mailto:contact@bluedotinvestors.com"
                className="text-primary-400 hover:text-primary-300 font-medium"
              >
                contact@bluedotinvestors.com
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="https://www.linkedin.com/company/blue-dot-investors/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
