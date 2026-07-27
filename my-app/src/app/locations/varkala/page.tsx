import DestinationTemplate, {
  DestinationConfig,
} from "../../../components/DestinationTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Co-living spaces for remote professionals in Varkala | SyncRetreat",
  description:
    "A private tech-focused co-living compound designed to insulate you from coastal distractions. Join software engineers and remote professionals for deep-work sprints in Kerala, India.",
  keywords: [
    "remote work retreat varkala",
    "co-living varkala developers",
    "digital nomad varkala kerala india",
    "co-working varkala fiber internet",
    "software engineer retreat varkala",
    "work from varkala 2025",
    "varkala remote work villa",
  ],
  alternates: { canonical: "https://syncretreat.com/locations/varkala" },
  openGraph: {
    title: "SyncRetreat Varkala — Coastal Deep Work Retreat for Engineers",
    description:
      "Private villa with pool, Dual-WAN fiber, chef meals, and curated cliff beach weekends in Varkala. 28-day co-living for software engineers. October 2025 cohort coming soon.",
    url: "https://syncretreat.com/locations/varkala",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1374&auto=format&fit=crop",
        width: 1374,
        height: 916,
        alt: "SyncRetreat co-working retreat in Varkala, Kerala, India",
      },
    ],
  },
};

const varkalaConfig: DestinationConfig = {
  id: "varkala",
  name: "Varkala",
  hero: {
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subtitle: "Coastal Focus Retreat",
    title: "VARKALA.",
    locationText: "Varkala, Kerala, India",
    dateRangeText: "Coming Soon — October 2025",
    sprintText: "28 Days long stays.",
  },
  about: {
    heading: "Discover Kerala's Most Serene Clifftop Escape",
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
          "Ergonomic workstation with Dual-WAN load-balancing and the serene Arabian Sea breeze — built for uninterrupted shipping.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop",
        title: "Weekend Clifftop Escapes.",
        description:
          "Curated coastal expeditions — from sunrise at the dramatic cliffs to pristine beaches. All logistics handled.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1470&auto=format&fit=crop",
        title: "Private Villa Quarters.",
        description:
          "A secluded Kerala villa compound — pool, privacy, and absolute rest after deep-work sprints.",
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
      day1: "Varkala Cliff sunrise walk. Explore Janardhana Swamy Temple & ancient cliff pathways.",
      day2: "Black Beach exploration & sunset at Papanasam Beach with healing mineral springs.",
    },
    {
      image: "/images/goa-villa-pool.png",
      title: "Weekend 2:",
      day1: "Backwater kayaking through Kerala's serene waterways. Traditional Kerala lunch at a village homestay.",
      day2: "Anjengo Fort & lighthouse visit. Return by 4 PM for sunset yoga at the villa.",
    },
    {
      image: "/images/ladakh-coworking-space.png",
      title: "Weekend 3:",
      day1: "Early morning trek to Kappil Beach & backwater confluence — a hidden gem of Kerala.",
      day2: "Ayurvedic spa day & traditional Kerala massage. Fresh seafood feast by the cliff.",
    },
    {
      image: "/images/routine-wellness-adventure.png",
      title: "Weekend 4:",
      day1: "Sunrise at Odayam Beach & dolphin-spotting boat ride along the Arabian Sea.",
      day2: "Sleep in. Farewell bonfire & BBQ on the villa terrace. Pack & decompress.",
    },
  ],
  homestays: {
    sectionTitle: "Our Home in Varkala",
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1642846358182877619/original/d55cbed4-3970-48c3-87e9-d2ffc46d1576.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1642846358182877619/original/2964bf55-199e-4297-a149-6cbac0154bc6.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1642846358182877619/original/6431440e-0f99-4038-b0bf-5b83656e7671.jpeg?im_w=720",
    ],
  },
  trips: [
    {
      fromDate: "OCTOBER",
      toDate: "2025",
      tripNumber: "01",
      status: "COMING SOON",
      batchId: 1,
    },
    {
      fromDate: "OCTOBER",
      toDate: "2025",
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
  formDestinationOptions: ["Varkala - October 2025"],
};

import Schema from "../../../components/Schema";
import { makeEventSchema, makeBreadcrumbSchema } from "../../../lib/schemas";

const VARKALA_URL = "https://syncretreat.com/locations/varkala";

const varkalaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // ── LodgingBusiness ─────────────────────────────────────────────────────
    {
      "@type": ["LodgingBusiness", "LocalBusiness"],
      "@id": "https://syncretreat.com/#business-varkala",
      name: "SyncRetreat Varkala",
      description:
        "28-day coastal tech-focused co-living retreat in Varkala, Kerala with enterprise-grade Dual-WAN fiber internet, ergonomic workstations, private villa accommodation, and chef-prepared meals for software engineers and remote professionals.",
      url: VARKALA_URL,
      image: varkalaConfig.hero.image,
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Varkala",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 8.7379, longitude: 76.7164 },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Co-working Space", value: true },
        { "@type": "LocationFeatureSpecification", name: "Dual-WAN Fiber 300 Mbps", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Villa Pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Ensuite Room", value: true },
        { "@type": "LocationFeatureSpecification", name: "Chef-Prepared Meals", value: true },
      ],
      parentOrganization: { "@id": "https://syncretreat.com/#organization" },
    },

    // ── Event: October 2025 Cohort ────────────────────────────────────────
    makeEventSchema({
      inGraph: true,
      name: "SyncRetreat Varkala — October 2025 Coastal Sprint (28 Days)",
      description:
        "28-day coastal deep work retreat in Varkala, Kerala, India. Enterprise-grade Dual-WAN internet, ergonomic workstations, private villa with pool, chef-prepared meals, and curated cliff beach excursions for software engineers and remote professionals.",
      startDate: "2025-10-10",
      endDate: "2025-11-06",
      locationName: "SyncRetreat Varkala Villa",
      locationLocality: "Varkala",
      locationRegion: "Kerala",
      url: VARKALA_URL,
      price: 1799,
      availability: "PreOrder",
    }),

    // ── BreadcrumbList ──────────────────────────────────────────────────────
    makeBreadcrumbSchema([
      { name: "Home", url: "https://syncretreat.com" },
      { name: "Varkala Retreat", url: VARKALA_URL },
    ]),
  ],
};

export default function Varkala() {
  return (
    <>
      <Schema schema={varkalaGraph} />
      <DestinationTemplate config={varkalaConfig} />
    </>
  );
}
