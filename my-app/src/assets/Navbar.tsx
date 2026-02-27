import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);

  return (
    <nav className="fixed w-full border-b border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="./logo2.png" alt="SyncRetreat" className='w-auto h-10' />
            <span className="text-white text-xl font-bold tracking-tight">SyncRetreat</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <div className="relative group">
              <button
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                onMouseEnter={() => setDestinationsOpen(true)}
                onMouseLeave={() => setDestinationsOpen(false)}
              >
                <span>Destinations</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {destinationsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg"
                  onMouseEnter={() => setDestinationsOpen(true)}
                  onMouseLeave={() => setDestinationsOpen(false)}
                >
                  <a href="#ladakh" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors">
                    Ladakh
                  </a>
                  <a href="#goa" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors">
                    Goa
                  </a>
                </div>
              )}
            </div>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              Gift Cards
            </a>
            <a href="#community" className="text-gray-300 hover:text-white transition-colors">
              Community
            </a>
            <a href="#How it works" className="text-gray-300 hover:text-white transition-colors">
              How it works
            </a>
            <button className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
              Apply Now
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
          <div className="px-4 py-4 space-y-3">
            <a href="#home" className="block text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="#ladakh" className="block text-gray-300 hover:text-white transition-colors pl-4">
              Ladakh
            </a>
            <a href="#goa" className="block text-gray-300 hover:text-white transition-colors pl-4">
              Goa
            </a>
            <a href="#about" className="block text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#community" className="block text-gray-300 hover:text-white transition-colors">
              Community
            </a>
            <button className="w-full bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
