import {  ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from 'react'

function Lists() {
  const [ currentPage, setCurrentPage ] = useState(0);
  const listings = [
    {
      title: 'Ladakh',
      description: '15°C mountain air, zero urban noise, and absolute isolation. Engineered strictly for uninterrupted product shipping with enterprise-grade Dual-WAN infrastructure.',
      image: './Gemini_Generated_Image_glize7glize7gliz.png',
      tags: ['Deep Work', 'High-Altitude Isolation', 'Dual-WAN Uptime', 'Strictly Vetted', 'Deep-Work', 'Monk Land', 'Cold Desert', 'India', 'Ladakh', 'co-living', 'co-working'],
      price: 1500,
      currency: '$',
      route: '/ladakh',
      right: 'See the dates',
      duration: '/28 days'
    },
    {
      title: 'Goa',
      description: 'Goa is a massive liability for a productivity brand because of its party reputation. You must aggressively counter this by selling isolation within Goa. Do not sell the beach; sell the private compound.',
      image: './Gemini_Generated_Image_ig1sunig1sunig1s.png',
      tags: ['Private Compound','Coastal Isolation','Focus Sprints','Enterprise Infrastructure','Deep-Work', 'Hippie Land', 'Beach Life', 'India', 'Goa', 'co-living', 'co-working'],
      price: '1800',
      currency: '$',
      route: '#',
      right: 'Upcoming...',
      duration: ''
    },
    {
      title: 'Coming Soon...',
      description: 'We are currently auditing and stress-testing new global locations. Only properties that pass our strict criteria for absolute isolation and network uptime will be deployed.New Place in India to explore and work from.',
      image: './ChatGPTImageJan20202612_47_40P.jpeg',
      tags: ['Vetting in Progress', 'Infrastructure Audit', 'Next Chapter'],
      price:'1600 - 2000',
      currency: '$',
      route: '/tba',
      right: 'Coming Soon...',
      duration: ''
    }
  ]

  const listingsPerPage=3;
  const totalPages = Math.ceil(listings.length / listingsPerPage)
  const currentlistings = listings.slice(
    currentPage * listingsPerPage,
    (currentPage + 1) * listingsPerPage
  )
  function nextPage() {
    setCurrentPage((prev) => (prev+1) % totalPages);
  }

  function prevPage() {
    setCurrentPage((prev) => (prev-1+totalPages) % totalPages);
  }

  return (
    <section id="application-form" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Secure Your Bed. <span className="text-blue-500">Alpha Retreat</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Limited availability. First-come, first-served basis for eligible applicants.
        </p>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {currentlistings.map((listings, index) => (
                <div key={index} className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={listings.image}
                      alt={listings.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light text-white mb-3 tracking-wide">{listings.title}</h3>
                    <p className="text-gray-200 mb-4 leading-relaxed font-light text-sm">{listings.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {listings.tags.filter(Boolean).map((tag: string) => (
                        <span key={tag} className="text-gray-300 text-xs font-light tracking-wide border-b border-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700">
                      <div>
                        {listings.price ? (
                          <>
                          <span className="text-gray-400 text-sm">Start from</span>
                          <p className="text-white text-xl font-semibold">
                            {listings.currency}{listings.price.toLocaleString()}
                            <span className="text-gray-400 text-sm font-normal">{listings.duration}</span>
                          </p>
                          </>
                        ):(
                          <span className="text-gray-400 text-sm">Price TBA</span>
                        )}
                      </div>
                      <button className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
                      <a href={listings.route} className=" text-sm font-medium flex-medium flex items-center gap-1 transition-colors">
                        {listings.right} <ChevronRight size={16} />
                      </a>
                      </button>
                    </div>

                    <div className="flex space-x-4">
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
    </section>
  )
}

export default Lists