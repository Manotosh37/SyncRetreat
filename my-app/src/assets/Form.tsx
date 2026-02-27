import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';

export default function Booking() {
  const logistics = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Leh, Ladakh, Himalayas (India)',
    },
    {
      icon: Calendar,
      label: 'Dates',
      value: 'June 15, 2026 - July 15, 2026',
    },
    {
      icon: Users,
      label: 'Capacity',
      value: 'Strictly limited to 12 Founders',
    },
    {
      icon: DollarSign,
      label: 'Investment',
      value: '$1,500 USD (Includes accommodation, infrastructure, chef, local permits)',
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Secure Your Bed. <span className="text-blue-500">Alpha Retreat</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Limited availability. First-come, first-served basis for qualified applicants.
        </p>
      </div>
    </section>
  );
}
