import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const blogs = [
  {
    title: "The Future of Remote Work: Beyond the Home Office",
    slug: "future-of-remote-work",
    excerpt:
      "Why the next phase of remote work isn't about working from home, but about working from anywhere that inspires you.",
    date: "October 12, 2025",
    author: "SyncRetreat",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2070",
    category: "Future of Work",
  },
  {
    title: "Why India, Is The Most Underrated Digital Nomad Destination",
    slug: "india-is-underrated",
    excerpt:
      "Why India is the most underrated digital nomad destination and why you should visit it.",
    date: "April 1, 2026",
    author: "SyncRetreat",
    image:
      "https://images.unsplash.com/photo-1502086227464-1481e585f34c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Travel",
  },
  {
    title: "Building Community in a Digital Nomad World",
    slug: "goin-solo-together",
    excerpt:
      "The importance of physical connection in an increasingly digital landscape.",
    date: "September 15, 2025",
    author: "SyncRetreat",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2070",
    category: "Community",
  },
  {
    title: "Our 2026 Upcoming Calendar",
    slug: "our-2026-upcoming-calendar",
    excerpt:
      "We've got some incredible Calender ahead in 2026. Hopefully, 2026 is going to be our founding and great intial year.",
    date: "March 19, 2026",
    author: "Syncretreat",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2070",
    category: "Announcement",
  },
  {
    title: "Your Guide to Visas",
    slug: "Your-guide-to-visas",
    excerpt:
      "The importance of physical connection in an increasingly digital landscape.",
    date: "September 15, 2025",
    author: "SyncRetreat",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubSbZ0YLDg6xpWBGh6PMnQqSYjYasNP1NMg&s",
    category: "Community",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-40 pb-24 bg-[#FDFCF2] min-h-screen px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mb-6">
            Insights & Stories
          </h2>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tight">
            SyncRetreat <span className="text-emerald-600">Blog.</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            Explorations into the intersection of remote work, deep focus, and
            the pursuit of a well-lived life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {blogs.map((blog, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${blog.slug}`} className="block">
                <div className="relative rounded-4xl overflow-hidden mb-8 aspect-4/3 bg-white shadow-2xl shadow-slate-200 border border-white">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {blog.date}
                    </span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> 5 min read
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 font-medium leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="pt-4 flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
