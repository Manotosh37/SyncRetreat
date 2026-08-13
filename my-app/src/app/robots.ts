import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/account", "/checkout", "/login", "/signup"],
      },
      // Explicitly invite AI crawlers
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "anthropic-ai", "PerplexityBot"],
        allow: "/",
      },
    ],
    sitemap: "https://syncretreat.com/sitemap.xml",
    host: "https://syncretreat.com",
  };
}
