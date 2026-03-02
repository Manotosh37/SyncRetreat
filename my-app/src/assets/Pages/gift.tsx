import { Gift, ArrowRight, Check } from 'lucide-react';

const giftCards = [
  {
    id: 1,
    amount: 500,
    description: 'Perfect for weekend getaways',
    perks: ['2-day trip', 'Accommodation', 'Meals included', 'Tour guide']
  },
  {
    id: 2,
    amount: 1000,
    description: 'Great for exploring new destinations',
    perks: ['5-day trip', '4-star accommodation', 'All meals', 'Tour guide & photographer']
  },
  {
    id: 3,
    amount: 2000,
    description: 'Premium experience for the adventurer',
    perks: ['10-day trip', 'Premium accommodation', 'All meals & drinks', 'Personal guide', 'Video production']
  },
  {
    id: 4,
    amount: 3000,
    description: 'Ultimate group experience',
    perks: ['14-day trip', 'Luxury accommodation', 'Premium meals & drinks', 'Personal guide & photographer', 'Full video production', 'Airport transfers']
  }
];

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gift className="w-10 h-10 text-blue-500" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">Gift Cards</h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Give the gift of unforgettable experiences. Choose the perfect gift card for your loved ones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {giftCards.map((card) => (
            <div
              key={card.id}
              className="bg-linear-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">${card.amount}</span>
                  <span className="text-gray-400">USD</span>
                </div>
                <p className="text-gray-400">{card.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-4">Includes:</h3>
                <ul className="space-y-3">
                  {card.perks.map((perk, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-blue-500 shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                Get Gift Card <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-xl p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Custom Gift Cards</h2>
              <p className="text-blue-100 mb-6">
                Looking for a specific amount? We can create custom gift cards tailored to your budget and preferences.
              </p>
              <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Create Custom Card
              </button>
            </div>
            <div className="text-blue-100">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 mt-1 shrink-0" />
                  <span>Valid for 2 years from purchase</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 mt-1 shrink-0" />
                  <span>Can be combined with other cards</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 mt-1 shrink-0" />
                  <span>Digital or physical delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 mt-1 shrink-0" />
                  <span>Personal gift message included</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-white mb-2">Choose Amount</h3>
              <p className="text-gray-400">Select a gift card amount or create a custom one</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-white mb-2">Add Message</h3>
              <p className="text-gray-400">Personalize with a special message for the recipient</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-white mb-2">Send & Enjoy</h3>
              <p className="text-gray-400">Send instantly via email or print for a physical card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
