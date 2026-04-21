import React from "react";

const blogs = [
  {
    title: "How to Maintain Deep Work While Traveling",
    excerpt:
      "Traveling doesn't mean your productivity has to plummet. Here are 5 strategies used by senior engineers to stay in the zone...",
    date: "October 12, 2025",
    author: "Alex Morgan",
    image: "./connectivity.jpeg",
    category: "Productivity",
  },
  {
    title: "The Rise of the 'Slow Nomad' Movement",
    excerpt:
      "Why spending 1-3 months in a single location is replacing the chaotic backpacker lifestyle for remote professionals.",
    date: "September 28, 2025",
    author: "Sarah Chen",
    image: "./weekend.jpeg",
    category: "Lifestyle",
  },
  {
    title: "Packing for a 3-Month Coding Retreat",
    excerpt:
      "You don't need a massive suitcase. From ergonomic travel stands to the right adapters, here is the ultimate minimalist packing list.",
    date: "September 15, 2025",
    author: "David Lorenzo",
    image: "./health.jpeg",
    category: "Guides",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 bg-[#fefbf7] min-h-screen px-6 md:px-12">
      <div className="max-w-300 mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
            The SyncRetreat Blog
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl">
            Insights on remote work, deep focus, and engineering from anywhere
            in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="rounded-3xl overflow-hidden mb-6 aspect-3xl border border-slate-200 shadow-sm bg-white">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                  {blog.category}
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  {blog.date}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
                {blog.title}
              </h2>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-6 font-medium">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 20}`}
                    alt={blog.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {blog.author}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
