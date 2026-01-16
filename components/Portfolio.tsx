const companies = [
  {
    name: "Company One",
    description: "Brief description of what this company does",
    category: "Developer Tools",
  },
  {
    name: "Company Two",
    description: "Brief description of what this company does",
    category: "AI & ML",
  },
  {
    name: "Company Three",
    description: "Brief description of what this company does",
    category: "Fintech",
  },
  {
    name: "Company Four",
    description: "Brief description of what this company does",
    category: "Climate Tech",
  },
  {
    name: "Company Five",
    description: "Brief description of what this company does",
    category: "Developer Tools",
  },
  {
    name: "Company Six",
    description: "Brief description of what this company does",
    category: "AI & ML",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Portfolio
          </h2>
          <p className="text-lg text-gray-600">
            We&apos;re proud to back these exceptional teams building
            transformative companies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.name}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-400">
                  {company.name.charAt(0)}
                </span>
              </div>
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full mb-3">
                {company.category}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {company.name}
              </h3>
              <p className="text-sm text-gray-600">{company.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
