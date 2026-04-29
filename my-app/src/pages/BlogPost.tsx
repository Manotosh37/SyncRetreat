import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BlogData {
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  objectFit?: string;
  content: string;
}

// Use Vite's glob import to get all markdown files in the content directory
const blogPosts = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
});

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const path = `/src/content/blog/${slug}.md`;
        const loader = blogPosts[path];

        if (!loader) {
          console.log("Available Vite Glob Keys:", Object.keys(blogPosts));
          throw new Error(`Post not found at path: ${path}`);
        }

        const text = (await loader()) as string;
        const { data, content } = matter(text);

          setBlog({
            title: data.title,
            date: data.date,
            author: data.author,
            category: data.category,
            image: data.image,
            objectFit: data.objectFit,
            content: content,
          });
      } catch (error) {
        console.error("Error loading blog post:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCF2]">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF2] p-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          Post Not Found
        </h1>
        <p className="text-slate-600 mb-8 text-lg">
          The blog post you're looking for doesn't exist.
        </p>
        <Link
          to="/blog"
          className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#FDFCF2] pt-32 pb-24">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/blog"
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-6xl mx-auto px-6 mb-16"
      >
        <div className="aspect-video sm:aspect-21/9 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-50 shadow-2xl shadow-emerald-900/10 border border-white">
          <img
            src={blog.image}
            alt={blog.title}
            className={`w-full h-full ${blog.objectFit === "contain" ? "object-contain p-4 md:p-12" : "object-cover"}`}
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-base sm:prose-lg prose-slate max-w-none 
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
        </motion.div>

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
