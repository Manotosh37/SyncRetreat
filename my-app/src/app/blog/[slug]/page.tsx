import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(".md", ""),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return { title: 'Post Not Found | SyncRetreat' };
  }

  const text = fs.readFileSync(filePath, "utf8");
  const { data } = matter(text);

  return {
    title: `${data.title || 'Insights'} | SyncRetreat Tech Co-living`,
    description: data.excerpt || "Insights from our high-speed internet digital nomad retreats in the Himalayas and India.",
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const filePath = path.join(blogDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const text = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(text);

  const blog = {
    title: data.title || "Untitled",
    date: data.date || "",
    author: data.author || "SyncRetreat",
    category: data.category || "Announcement",
    image: data.image || "",
    objectFit: data.objectFit || "cover",
    content: content,
  };

  return (
    <article className="min-h-screen bg-[#FDFCF2] pt-32 pb-24 animate-slide-in">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6">
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Insights
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest rounded-full">
              {blog.category}
            </span>
            <span className="text-slate-400 flex items-center gap-1 text-sm font-medium">
              <Clock className="w-4 h-4" /> 5 min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-12 py-6 border-y border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                   Author
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {blog.author}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Published
                </p>
                <p className="text-sm font-bold text-slate-900">{blog.date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="aspect-video sm:aspect-21/9 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-50 shadow-2xl shadow-emerald-900/10 border border-white">
          <img
            src={blog.image}
            alt={blog.title}
            className={`w-full h-full ${blog.objectFit === "contain" ? "object-contain p-4 md:p-12" : "object-cover"}`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="prose prose-base sm:prose-lg prose-slate max-w-none 
          prose-headings:text-slate-900 prose-headings:font-black 
          prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
          prose-strong:text-slate-900 prose-strong:font-bold
          prose-a:text-emerald-600 prose-a:font-bold hover:prose-a:text-emerald-700
          prose-img:rounded-2xl prose-img:shadow-lg
          prose-ul:list-disc prose-ul:pl-6
          prose-li:text-slate-600 prose-li:font-medium mb-16"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Footer / Share */}
        <div className="pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Tags:
              </span>
              <span className="text-sm font-bold text-slate-900">
                Remote Work, Lifestyle, Community
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
