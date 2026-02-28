import {  ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from 'react'

function Lists() {
  const [ currentPage, setCurrentPage ] = useState(0);
  const listings = [
    {
      title: 'Ladakh',
      description: 'A high altitude deep-work place to work. The Land of High Passes.',
      image: './Gemini_Generated_Image_glize7glize7gliz.png',
      tags: ['Deep-Work', 'Monk Land', 'Cold Desert', 'India', 'Ladakh', 'co-living', 'co-working']
    },
    {
      title: 'Goa',
      description: 'A.',
      image: './Gemini_Generated_Image_ig1sunig1sunig1s.png',
      tags: ['Deep-Work', 'Hippie Land', 'Beach Life', 'India', 'Goa', 'co-living', 'co-working']
    },
    {
      title: 'Coming Soon...',
      description: 'New Place in India to explore and work from',
      image: './ChatGPTImageJan20202612_47_40P.jpeg',
      tags: ['Deep-Work', 'India', 'co-living', 'co-working']
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
    <section className="py-24 px-4">
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
                      {listings.tags.map((tag: string) => (
                        <span key={tag} className="text-gray-300 text-xs font-light tracking-wide border-b border-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center items-center space-x-4">
              <button
                onClick={prevPage}
                className="p-3 border border-gray-500 text-gray-300 hover:border-white- hover:text-white transition-all duration-300 rounded-full"
                disabled={currentPage === 0}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPage === index ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextPage}
                className="p-3 border border-gray-500 text-gray-300 hover:border-white hover:text-white transition-all duration-300 rounded-full"
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Lists