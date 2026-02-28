import { Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">SyncRetreat</h3>
            <div className="flex space-x-3">
              <a
                href="https://x.com/RetreatSyn57144"
                className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <Twitter className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="https://www.instagram.com/sync.retreat/"
                className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <Instagram className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="https://www.linkedin.com/company/111381004/admin/dashboard/"
                className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="/gift" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Gift a trip
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors text-xs">
                  About us
                </a>
              </li>
              <li>
                <a href="/community-rules" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Community rules
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/faqs" className="text-gray-400 hover:text-white transition-colors text-xs">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Destinations</h4>
            <ul className="space-y-1">
              <li>
                <a href="/ladakh" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Ladakh
                </a>
              </li>
              <li>
                <a href="/goa" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Goa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Get Updates</h4>
            <div className="flex mb-3">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-l-md px-3 py-2 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-r-md transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-4 text-center">
          <p className="text-gray-600 text-xs">
            © 2026 SyncRetreat. All rights reserved. Engineered for focus.
          </p>
        </div>
      </div>
    </footer>
  );
}
