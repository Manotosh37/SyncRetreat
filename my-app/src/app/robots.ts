import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/account", "/checkout", "/login", "/signup"],
      },
    ],
    sitemap: "https://syncretreat.com/sitemap.xml",
    host: "https://syncretreat.com",
  };
}
