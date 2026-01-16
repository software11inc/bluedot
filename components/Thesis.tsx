const focusAreas = [
  {
    title: "Developer Tools",
    description:
      "Infrastructure and tools that empower developers to build faster and more reliably.",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Applied AI solutions that solve real problems and create measurable value.",
  },
  {
    title: "Fintech",
    description:
      "Next-generation financial services that expand access and improve outcomes.",
  },
  {
    title: "Climate Tech",
    description:
      "Sustainable technologies addressing the most pressing environmental challenges.",
  },
];

export default function Thesis() {
  return (
    <section id="thesis" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Investment Thesis
          </h2>
          <p className="text-lg text-gray-600">
            We invest at the pre-seed and seed stages in founders who combine
            deep domain expertise with relentless execution. We look for
            companies tackling large markets with differentiated approaches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="p-8 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {area.title}
              </h3>
              <p className="text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">
              $50M
            </div>
            <div className="text-gray-600">Fund Size</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">
              $250K–$1M
            </div>
            <div className="text-gray-600">Check Size</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">
              Pre-Seed & Seed
            </div>
            <div className="text-gray-600">Stage Focus</div>
          </div>
        </div>
      </div>
    </section>
  );
}
