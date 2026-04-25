import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import matter from "gray-matter";

const blogFiles = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const blogs = Object.keys(blogFiles).map((path) => {
  const fileContent = blogFiles[path] as string;
  const { data } = matter(fileContent);
  const slug = path.split('/').pop()?.replace('.md', '');
  
  return {
    title: data.title || "Untitled",
    slug: slug,
    excerpt: data.excerpt || "",
    date: data.date || "",
    author: data.author || "SyncRetreat",
    image: data.image || "",
    category: data.category || "Announcement",
  };
});

// Sort blogs by date (most recent first)
// Note: This relies on dates being parseable by JS Date
blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
