import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from "lucide-react";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Insights for International Technology Professionals | SyncRetreat Blog",
  description: "Read about our high-speed internet digital nomad retreats in Ladakh and tech-focused co-living spaces for software developers in India.",
};

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(blogDir);

  const blogs = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const slug = file.replace(".md", "");

      return {
        title: data.title || "Untitled",
        slug: slug,
        excerpt: data.excerpt || "",
        date: data.date || "",
        author: data.author || "SyncRetreat",
        image: data.image || "",
        category: data.category || "Announcement",
        objectFit: data.objectFit || "cover",
      };
    });

  // Sort blogs by date (most recent first)
  blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="pt-40 pb-24 bg-[#FDFCF2] min-h-screen px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center max-w-3xl mx-auto animate-slide-in">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {blogs.map((blog, i) => (
            <article key={i} className="group">
              <Link href={`/blog/${blog.slug}`} className="block">
                <div className="relative rounded-4xl overflow-hidden mb-8 aspect-4/3 bg-slate-50 shadow-2xl shadow-slate-200 border border-white">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className={`w-full h-full transition-transform duration-1000 group-hover:scale-110 ${
                      blog.objectFit === "contain" ? "object-contain p-4" : "object-cover"
                    }`}
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
