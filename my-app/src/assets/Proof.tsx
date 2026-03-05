import { X, Check } from 'lucide-react';

export default function Qualification() {
  const notFor = [
    "A backpacker looking for a standard 'yoga retreat' or sightseeing tour",
    'Someone expecting a luxury resort vacation instead of a deep-work camp',
    "Easily distracted, undisciplined, or looking to 'find yourself'",
  ];

  const engineeredFor = [
    "Funded founders and entrepreneurs with strict launch deadlines",
    "Remote professionals, designers, and creators requiring absolute focus",
    "Operators who view $1,500 as an ROI-positive business investment for 28 days of uninterrupted execution",
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          Strictly Vetted: Who This Infrastructure is{' '}
          <span className="text-red-500">NOT</span> For
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 border-2 border-red-900 p-8 rounded-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-red-900 p-2 rounded">
                <X className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-red-400">Do Not Apply If You Are:</h3>
            </div>

            <ul className="space-y-4">
              {notFor.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <X className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-900 border-2 border-green-900 p-8 rounded-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-900 p-2 rounded">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-green-400">This is Engineered For:</h3>
            </div>

            <ul className="space-y-4">
              {engineeredFor.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
