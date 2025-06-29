import Nav from '@/components/Nav';

interface Report {
  title: string;
  description: string;
  url: string;
}

const reports: Report[] = [
  {
    title: 'Season A-2025 Full Report',
    description: 'A comprehensive report detailing all measurements, inputs, and outcomes for the A-2025 season.',
    url: '/reports/season-a-2025-report.pdf',
  },
  {
    title: 'Soil Health Analysis 2024',
    description: 'An in-depth analysis of soil organic matter, nutrient levels, and microbial activity across all plots.',
    url: '/reports/soil-health-2024.pdf',
  },
  {
    title: 'Conservation Agriculture vs. Conventional Tillage',
    description: 'A comparative study on the effects of different tillage practices on soil erosion and crop yield.',
    url: '/reports/ca-vs-ct-study.pdf',
  },
];

export default function DownloadsPage() {
  return (
    <>
      <Nav />
      <main className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            PDF Reports & Downloads
          </h1>
          <div className="space-y-6">
            {reports.map((report) => (
              <a
                key={report.title}
                href={report.url}
                download
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-green-700">
                  {report.title}
                </h2>
                <p className="text-gray-600 mt-2">{report.description}</p>
                <div className="flex items-center text-green-600 hover:text-green-800 mt-4">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                  <span>Download PDF</span>
                </div>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8">
            Note: These are sample documents. The files do not exist yet.
          </p>
        </div>
      </main>
    </>
  );
} 