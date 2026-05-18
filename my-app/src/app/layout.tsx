import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "../lib/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Schema from "../components/Schema";
import "./globals.css";

// ── Optimised font loading via next/font (zero layout shift, self-hosted)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://syncretreat.com"),
  title: {
    default: "SyncRetreat — Remote Work Retreats in India",
    template: "%s | SyncRetreat",
  },
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
  description:
    "High-speed internet digital nomad retreats in Ladakh (Himalayas) and Goa. Enterprise-grade infrastructure, ergonomic co-working, and curated community for software developers and remote founders.",
  keywords: [
    "remote work India", "digital nomad retreat Ladakh", "co-living India developers",
    "remote work Himalayas", "tech retreat India", "software engineer retreat",
    "co-working Goa", "high speed internet remote work",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://syncretreat.com",
    siteName: "SyncRetreat",
    title: "SyncRetreat — Enterprise Remote Work Infrastructure in Ladakh & Goa",
    description: "Tech-focused co-living retreats in India with 300 Mbps fiber, Herman Miller desks, and UPS-backed power. Built for engineers who ship.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SyncRetreat co-working retreat in Ladakh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SyncRetreat — Remote Work Retreats in India",
    description: "300 Mbps fiber at 11,500 ft. Built for engineers.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: { google: "" }, // add your Search Console token here
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://syncretreat.com/#organization",
      name: "SyncRetreat",
      url: "https://syncretreat.com",
      logo: { "@type": "ImageObject", url: "https://syncretreat.com/logo2.png" },
      description: "Enterprise-grade co-living retreats for software developers and remote professionals in India.",
      sameAs: ["https://instagram.com/sync.retreat"],
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "hello@syncretreat.com" },
    },
    {
      "@type": "WebSite",
      "@id": "https://syncretreat.com/#website",
      url: "https://syncretreat.com",
      name: "SyncRetreat",
      publisher: { "@id": "https://syncretreat.com/#organization" },
      potentialAction: { "@type": "SearchAction", target: "https://syncretreat.com/blog?q={search_term_string}", "query-input": "required name=search_term_string" },
    },
    {
      "@type": ["LodgingBusiness", "LocalBusiness"],
      "@id": "https://syncretreat.com/#business-ladakh",
      name: "SyncRetreat Ladakh",
      description: "Tech-focused co-living retreat in Leh, Ladakh with enterprise-grade dual-WAN fiber internet, ergonomic workstations, and UPS-backed power for software developers.",
      url: "https://syncretreat.com/locations/ladakh",
      image: "https://syncretreat.com/og-image.png",
      priceRange: "$$$",
      address: { "@type": "PostalAddress", addressLocality: "Leh", addressRegion: "Ladakh", addressCountry: "IN" },
      geo: { "@type": "GeoCoordinates", latitude: 34.1642, longitude: 77.5849 },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "High-Speed Wi-Fi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Dual-WAN Failover", value: true },
        { "@type": "LocationFeatureSpecification", name: "Ergonomic Workstation", value: true },
        { "@type": "LocationFeatureSpecification", name: "UPS Power Backup", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Room", value: true },
      ],
      audience: { "@type": "Audience", audienceType: "Software Engineers, Remote Founders, Tech Professionals" },
      parentOrganization: { "@id": "https://syncretreat.com/#organization" },
    },
    {
      "@type": ["LodgingBusiness", "LocalBusiness"],
      "@id": "https://syncretreat.com/#business-goa",
      name: "SyncRetreat Goa",
      description: "Coastal tech-focused co-living retreat in Goa with enterprise-grade fiber internet, ergonomic workstations, and a curated community of remote developers.",
      url: "https://syncretreat.com/locations/goa",
      priceRange: "$$$",
      address: { "@type": "PostalAddress", addressLocality: "Goa", addressRegion: "Goa", addressCountry: "IN" },
      geo: { "@type": "GeoCoordinates", latitude: 15.2993, longitude: 74.124 },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "High-Speed Wi-Fi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Ergonomic Workstation", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Room", value: true },
      ],
      parentOrganization: { "@id": "https://syncretreat.com/#organization" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Rich structured data */}
        <Schema schema={ORGANIZATION_SCHEMA} />
      </head>
      <body className="font-sans">
        <AuthProvider>
          <div className="min-h-screen bg-[#fefbf7]">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
