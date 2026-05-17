import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://syncretreat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes with priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/locations/ladakh`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/locations/goa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/infrastructure`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/howitworks`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/salary-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/latency-tester`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/productivity-audit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamically include all blog posts
  const blogDir = path.join(process.cwd(), "src/content/blog");
  let blogRoutes: MetadataRoute.Sitemap = [];

  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
    blogRoutes = files.map((file) => ({
      url: `${BASE_URL}/blog/${file.replace(".md", "")}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...blogRoutes];
}
