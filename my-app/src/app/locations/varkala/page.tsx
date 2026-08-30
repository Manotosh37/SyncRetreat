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
    "work from varkala 2026",
    "varkala remote work villa",
  ],
  alternates: { canonical: "https://syncretreat.com/locations/varkala" },
  openGraph: {
    title: "SyncRetreat Varkala — Coastal Deep Work Retreat for Engineers",
    description:
      "Private villa with pool, Dual-WAN fiber, chef meals, and curated cliff beach weekends in Varkala. 28-day co-living for software engineers. October 202 cohort coming soon.",
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
      "https://images.unsplash.com/photo-1610817201767-793a9130ce07?q=80&w=1362&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subtitle: "Coastal Focus Retreat",
    title: "VARKALA.",
    locationText: "Varkala, Kerala, India",
    dateRangeText: "Starting 10th October 2026",
    sprintText: "28 Days stays.",
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
    deposit: 299,
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
    isStatic: false,
    staticOriginal: 2099,
  },
  places: [
    {
      image: "https://images.unsplash.com/photo-1704499684060-87426b560ed1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TXVucm9lJTIwSXNsYW5kfGVufDB8fDB8fHww",
      title: "Weekend 1: The Backwater & Estuary Reset",
      day1: "Munroe Island Mangrove Maze: Private canoe tour through narrow canals & mangrove arches. Authentic seafood lunch at riverside homestay. Return by 4 PM for North Cliff sunset.",
      day2: "Kappil & Paravur Coastal Drive: Kayaking at Paravur Lake boat club. Drive the road between sea and backwaters. Sunset at quiet Edava Vettakkada beach.",
    },
    {
      image: "https://media.istockphoto.com/id/1153257538/photo/jatayu-earth-center-india-hd-photo.webp?s=2048x2048&w=is&k=20&c=rdXDGi4fZAvxMTumBdZ5y0bD4MBUQRfb86Z-A4i07ho=",
      title: "Weekend 2: Mythical Heights & Golden Islands",
      day1: "Jatayu Earth's Center: Cable car to world's largest bird sculpture. 360-degree viewing deck & museum. Return early for deep work or rest.",
      day2: "Ponnumthuruthu (Golden Island): Afternoon boat trip to uninhabited island with 1,000-year-old temple in backwaters. Spectacular sunset views (4-6 PM boats).",
    },
    {
      image: "https://images.exoticamp.com/vendors/images/profile/28_20241105T133322558Z.jpg",
      title: "Weekend 3: The Jungle Adventure (Overnight)",
      day1: "Into the Wild at Thenmala: Check into tented jungle camping. Adventure Zone with mountain biking, rock climbing, river crossings. Campfire dinner in forest.",
      day2: "Sanctuary & Waterfalls: Early morning boat safari in Shendurney Wildlife Sanctuary. Visit Palaruvi Waterfalls or Deer Rehabilitation Centre. Return by late lunch.",
    },
    {
      image: "https://gos3.ibcdn.com/6118fd66-8733-4a0f-8249-2c1bdeebfde0.jpg",
      title: "Weekend 4: City Culture & Coastal Beauty",
      day1: "Trivandrum Heritage & Shopping: Napier Museum & Kuthira Malika Palace. Fine dining at Villa Maya. Shop at LuLu Mall or SMSM Institute for Kerala handicrafts.",
      day2: "Poovar Island Golden Sand: Boat through Neyyar river estuaries to Golden Sand Beach where river, sea, and beach meet. Relaxed return to conclude retreat.",
    },
  ],
  homestays: {
    sectionTitle: "Our Home in Varkala",
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-551094297923713506/original/d1d05a23-aacd-4fc6-8351-d22411919687.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1312214754840539482/original/cf51db88-b25a-4fe3-8962-0b72fb328e72.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1312214754840539482/original/01f9fe67-9128-4192-a7e2-dd3453af1b36.jpeg?im_w=720",
    ],
  },
  trips: [
    {
      fromDate: "OCTOBER",
      toDate: "2026",
      tripNumber: "01",
      status: "14-Day Plan",
      batchId: 1,
      price: 1199,
      originalPrice: 1699,
      planId: "varkala-14day",
    },
    {
      fromDate: "OCTOBER",
      toDate: "2026",
      tripNumber: "02",
      status: "28-Day Plan",
      batchId: 2,
      price: 1799,
      originalPrice: 2099,
      planId: "varkala-28day",
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
  formDestinationOptions: ["Varkala - Oct 19th, 2026"],
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
      name: "SyncRetreat Varkala — October 2026 Coastal Sprint (28 Days)",
      description:
        "28-day coastal deep work retreat in Varkala, Kerala, India. Enterprise-grade Dual-WAN internet, ergonomic workstations, private villa with pool, chef-prepared meals, and curated cliff beach excursions for software engineers and remote professionals.",
      startDate: "2026-10-19",
      endDate: "2026-11-16",
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
