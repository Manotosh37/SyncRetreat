import DestinationTemplate, {
  DestinationConfig,
} from "../../../components/DestinationTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Co-living spaces for remote professionals in Goa | SyncRetreat",
  description:
    "A private tech-focused co-living compound designed to insulate you from coastal distractions. Join software engineers and remote professionals for deep-work sprints in India.",
  keywords: [
    "remote work retreat goa",
    "co-living goa developers",
    "digital nomad goa india",
    "co-working goa fiber internet",
    "software engineer retreat goa",
    "work from goa 2026",
    "goa remote work villa",
  ],
  alternates: { canonical: "https://syncretreat.com/locations/goa" },
  openGraph: {
    title: "SyncRetreat Goa — Coastal Deep Work Retreat for Engineers",
    description:
      "Private villa with pool, Dual-WAN fiber, chef meals, and curated beach weekends in Goa. 28-day co-living for software engineers. September 2026 cohort coming soon.",
    url: "https://syncretreat.com/locations/goa",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1374&auto=format&fit=crop",
        width: 1374,
        height: 916,
        alt: "SyncRetreat co-working retreat in Goa, India",
      },
    ],
  },
};

const goaConfig: DestinationConfig = {
  id: "goa",
  name: "Goa",
  hero: {
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subtitle: "Coastal Focus Retreat",
    title: "GOA.",
    locationText: "Goa, India",
    dateRangeText: "Coming Soon — 2026",
    sprintText: "28 Days long stays.",
  },
  about: {
    heading: "Discover India's Most Vibrant Coastal Escape",
    features: [
      { icon: "Monitor", text: "Co-working Space" },
      { icon: "Home", text: "Private Ensuite Room" },
      { icon: "Car", text: "Beach & City Transfers" },
      { icon: "Users", text: "Curated Community" },
    ],
    activities: [
      {
        image:
          "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1447&auto=format&fit=crop",
        title: "Deep Focus Co-Working Hub.",
        description:
          "Ergonomic workstation with Dual-WAN load-balancing and a gentle sea breeze — built for uninterrupted shipping.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop",
        title: "Weekend Beach Escapes.",
        description:
          "Curated coastal expeditions — from sunrise at Palolem to the cliffs of Vagator. All logistics handled.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1470&auto=format&fit=crop",
        title: "Private Villa Quarters.",
        description:
          "A secluded Goan villa compound — pool, privacy, and absolute rest after deep-work sprints.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=1470&auto=format&fit=crop",
        title: "Frictionless Operations.",
        description:
          "Zero cognitive load. We handle every detail so you stay fully focused on your work.",
      },
    ],
  },
  pricing: {
    deposit: 199,
    included: [
      "Private airport transfers",
      "Private transportation",
      "Private Ensuite Accommodation",
      "Chef-prepared meals (2x daily)",
      "Enterprise-grade Dual-WAN internet",
      "Local SIM card",
      "Weekend Beach Excursions",
      "24/7 Facility Management",
    ],
    notIncluded: [
      "International flights",
      "Visa",
      "Travel insurance",
      "Meals outside provided schedule",
      "Personal expenses",
    ],
    isStatic: true,
    staticOriginal: 1799,
  },
  places: [
    {
      image: "/images/goa-beach.png",
      title: "Weekend 1:",
      day1: "Baga & Calangute beach sunrise walk. Explore Aguada Fort & the Portuguese bastions.",
      day2: "Anjuna flea market & sunset cocktails at Vagator cliffs.",
    },
    {
      image: "/images/goa-villa-pool.png",
      title: "Weekend 2:",
      day1: "Old Goa UNESCO churches — Basilica of Bom Jesus & Se Cathedral. Spice plantation lunch.",
      day2: "Backwater kayaking through Goa's mangrove trails. Return by 4 PM.",
    },
    {
      image: "/images/ladakh-coworking-space.png",
      title: "Weekend 3:",
      day1: "Early trek to Dudhsagar Falls — Goa's 310-metre cascade deep in the Western Ghats.",
      day2: "South Goa: pristine sands of Palolem & Agonda. Seafood feast on the shore.",
    },
    {
      image: "/images/routine-wellness-adventure.png",
      title: "Weekend 4:",
      day1: "Sunrise at Arambol & dolphin-spotting boat ride along the coastline.",
      day2: "Sleep in. Farewell bonfire & BBQ on the villa terrace. Pack & decompress.",
    },
  ],
  homestays: {
    sectionTitle: "Our Home in Goa",
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1642846358182877619/original/d55cbed4-3970-48c3-87e9-d2ffc46d1576.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1642846358182877619/original/2964bf55-199e-4297-a149-6cbac0154bc6.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1642846358182877619/original/6431440e-0f99-4038-b0bf-5b83656e7671.jpeg?im_w=720",
    ],
  },
  trips: [
    {
      fromDate: "UPCOMING",
      toDate: "TBA",
      tripNumber: "01",
      status: "COMING SOON",
      batchId: 1,
    },
    {
      fromDate: "UPCOMING",
      toDate: "TBA",
      tripNumber: "02",
      status: "COMING SOON",
      batchId: 2,
    },
  ],
  documents: [
    {
      name: "28-DAY PRODUCTIVITY SCHEDULE & PRE-ARRIVAL GUIDE",
      file: "SyncRetreat_Deployment_Manifest.pdf",
    },
    { name: "Info about Pricing Schedule & Invoice", file: "payment.pdf" },
    {
      name: "What to Expect? & Opportunities",
      file: "SyncRetreat_Alignment_Protocol.pdf",
    },
  ],
  formDestinationOptions: ["Goa - Upcoming (Dates to be Revealed)"],
};

import Schema from "../../../components/Schema";
import { makeEventSchema, makeBreadcrumbSchema } from "../../../lib/schemas";

const GOA_URL = "https://syncretreat.com/locations/goa";

const goaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // ── LodgingBusiness ─────────────────────────────────────────────────────
    {
      "@type": ["LodgingBusiness", "LocalBusiness"],
      "@id": "https://syncretreat.com/#business-goa",
      name: "SyncRetreat Goa",
      description:
        "28-day coastal tech-focused co-living retreat in Goa with enterprise-grade Dual-WAN fiber internet, ergonomic workstations, private villa accommodation, and chef-prepared meals for software engineers and remote professionals.",
      url: GOA_URL,
      image: goaConfig.hero.image,
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Goa",
        addressRegion: "Goa",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 15.2993, longitude: 74.124 },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Co-working Space", value: true },
        { "@type": "LocationFeatureSpecification", name: "Dual-WAN Fiber 300 Mbps", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Villa Pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Ensuite Room", value: true },
        { "@type": "LocationFeatureSpecification", name: "Chef-Prepared Meals", value: true },
      ],
      parentOrganization: { "@id": "https://syncretreat.com/#organization" },
    },

    // ── Event: September 2026 Cohort ────────────────────────────────────────
    makeEventSchema({
      inGraph: true,
      name: "SyncRetreat Goa — September 2026 Coastal Sprint (28 Days)",
      description:
        "28-day coastal deep work retreat in Goa, India. Enterprise-grade Dual-WAN internet, ergonomic workstations, private villa with pool, chef-prepared meals, and curated beach excursions for software engineers and remote professionals.",
      startDate: "2026-09-01",
      endDate: "2026-09-28",
      locationName: "SyncRetreat Goa Villa",
      locationLocality: "Goa",
      locationRegion: "Goa",
      url: GOA_URL,
      price: 1799,
      availability: "PreOrder",
    }),

    // ── BreadcrumbList ──────────────────────────────────────────────────────
    makeBreadcrumbSchema([
      { name: "Home", url: "https://syncretreat.com" },
      { name: "Goa Retreat", url: GOA_URL },
    ]),
  ],
};

export default function Goa() {
  return (
    <>
      <Schema schema={goaGraph} />
      <DestinationTemplate config={goaConfig} />
    </>
  );
}
