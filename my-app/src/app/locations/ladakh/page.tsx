import DestinationTemplate, { DestinationConfig } from "../../../components/DestinationTemplate";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "High-Speed Internet Digital Nomad Retreats in Ladakh | SyncRetreat",
  description: "Join our 28-day high-speed internet digital nomad retreats in Ladakh. A tech-focused co-living space designed exclusively for software developers and remote professionals in the Himalayas.",
  keywords: [
    "digital nomad retreat ladakh",
    "remote work ladakh 2026",
    "co-living leh ladakh",
    "high speed internet ladakh",
    "software engineer retreat himalayas",
    "ladakh remote work august 2026",
    "tech retreat leh india",
    "work from ladakh",
  ],
  alternates: { canonical: "https://syncretreat.com/locations/ladakh" },
  openGraph: {
    title: "SyncRetreat Ladakh — 28-Day Deep Work Sprint in the Himalayas",
    description:
      "Dual-WAN 300 Mbps fiber at 11,500 ft. Private villa, chef meals, and curated Himalayan weekends. August 2026 cohort now open. From $1,799.",
    url: "https://syncretreat.com/locations/ladakh",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600242466690-c1c04f081762?q=80&w=1470&auto=format&fit=crop",
        width: 1470,
        height: 980,
        alt: "SyncRetreat co-working retreat in Leh, Ladakh",
      },
    ],
  },
};

const ladakhConfig: DestinationConfig = {
  id: "ladakh",
  name: "Ladakh",
  isCompleted: true, // Retreat is done
  hero: {
    image:
      "https://images.unsplash.com/photo-1600242466690-c1c04f081762?q=80&w=1470&auto=format&fit=crop",
    subtitle: "High Altitude Retreat",
    title: "LADAKH.",
    locationText: "Leh, India",
    dateRangeText: "3 Aug – 31 Aug, 2026",
    sprintText: "28-Day Infrastructure Sprint.",
  },
  about: {
    heading: "Discover the Most Beautiful Region in the Himalayas",
    features: [
      { icon: "Monitor", text: "Co-working Space" },
      { icon: "Home", text: "Private Ensuite Room" },
      { icon: "Car", text: "Acclimatization Driver" },
      { icon: "Users", text: "Curated Community" },
    ],
    activities: [
      {
        image:
          "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1447&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Deep Focus Co-Working hub.",
        description:
          "Ergonomic workstation with Dual-WAN load-balancing plus stunning mountain views.",
      },
      {
        image:
          "https://media-cdn.tripadvisor.com/media/photo-s/06/9d/27/42/cold-desert-camp.jpg",
        title: "Weekend Trips.",
        description:
          "High-altitude expeditions with the community. 100% transport and permit logistics handled.",
      },
      {
        image:
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1138245562661282426/original/f218e700-8949-4ab8-ade7-8196d4fa5e8c.jpeg?im_w=1440",
        title: "Private Executive Quarters",
        description:
          "Private sanctuary optimized for deep rest and absolute privacy.",
      },
      {
        image:
          "https://media.istockphoto.com/id/648868332/photo/traveler-with-laptop-sits-on-top-view-point-on-the-mountain-valley.jpg?s=612x612&w=0&k=20&c=CVaa69S5lXbcTfW4WdkHwh1u1nyPWnHidysVbu8FLHo=",
        title: "Frictionless Operations",
        description:
          "Zero cognitive load. We handle logistics so you focus only on your product.",
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
      "Weekend Decompression Excursions",
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
  },
  places: [
    {
      image:
        "https://charzanholidays.com/wp-content/uploads/2024/12/Thiksey_Monastery-ladakh_charzan_holidays.jpg",
      title: "Weekend 1:",
      day1: "Explore Thiksey & Hemis monasteries. Return by 2 PM.",
      day2: "Leh Palace, Tsemo Castle & sunset at Shanti Stupa.",
    },
    {
      image:
        "https://topclassholidays.com/wp-content/uploads/2025/07/Magnetic-Hill-Ladakh.jpg",
      title: "Weekend 2:",
      day1: "Gurudwara Pathar Sahib, Magnetic Hill & Sangam Viewpoint.",
      day2: "1000-year-old Alchi Monastery & Likir. Back by 4 PM.",
    },
    {
      image:
        "https://www.eladakhtourism.com/camps-in-nubra/images/paramountcamp.jpg",
      title: "Weekend 3:",
      day1: "Cross Khardung La Pass (17,582 ft) & Bactrian camel safari.",
      day2: "106-foot Maitreya Buddha at Diskit. Back by 3 PM.",
    },
    {
      image: "/images/ladakh-himalayas-view.png",
      title: "Weekend 4:",
      day1: "5 AM to Pangong Lake via Chang La Pass—10 hour extreme strike.",
      day2: "Sleep in. Farewell BBQ on villa terrace, pack & decompress.",
    },
  ],
  homestays: {
    sectionTitle: "Our Home in Ladakh",
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-18737819/original/8c0e5cae-4bed-4e0b-9d0b-f224dc3a64f2.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/8d4ef684-31ed-4836-8e63-a9954aa751e2.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/5e20521b-e3ce-492a-864f-39ed49a6833c.jpg?im_w=1440",
    ],
  },
  trips: [
    {
      fromDate: "AUGUST 03",
      toDate: "AUGUST 31",
      tripNumber: "01",
      status: "DONE",
      batchId: 2,
      price: 1799,
      originalPrice: 2099,
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
  formDestinationOptions: [
    "Ladakh - August 03 to August 31",
  ],
};

import Schema from "../../../components/Schema";
import { makeEventSchema, makeBreadcrumbSchema } from "../../../lib/schemas";

const LADAKH_URL = "https://syncretreat.com/locations/ladakh";

const ladakhGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // ── LodgingBusiness (enhanced) ──────────────────────────────────────────
    {
      "@type": ["LodgingBusiness", "LocalBusiness"],
      "@id": "https://syncretreat.com/#business-ladakh",
      name: "SyncRetreat Ladakh",
      description:
        "28-day tech-focused co-living retreat in Leh, Ladakh with enterprise-grade dual-WAN fiber internet, ergonomic workstations, UPS-backed power, and chef-prepared meals for software developers and remote founders.",
      url: LADAKH_URL,
      image: ladakhConfig.hero.image,
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Leh",
        addressRegion: "Ladakh",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 34.1642, longitude: 77.5849 },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Co-working Space", value: true },
        { "@type": "LocationFeatureSpecification", name: "Dual-WAN Fiber 300 Mbps", value: true },
        { "@type": "LocationFeatureSpecification", name: "UPS Power Backup", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private Ensuite Room", value: true },
        { "@type": "LocationFeatureSpecification", name: "Chef-Prepared Meals", value: true },
      ],
      parentOrganization: { "@id": "https://syncretreat.com/#organization" },
    },

    // ── Event: August 2026 Sprint ───────────────────────────────────────────
    makeEventSchema({
      inGraph: true,
      name: "SyncRetreat Ladakh — August 2026 Sprint (28 Days)",
      description:
        "28-day deep work infrastructure sprint in Leh, Ladakh. Enterprise-grade Dual-WAN internet, ergonomic workstations, private accommodation, chef-prepared meals, and curated weekend Himalayan expeditions for software engineers and remote founders.",
      startDate: "2026-08-03",
      endDate: "2026-08-31",
      locationName: "SyncRetreat Ladakh Villa",
      locationLocality: "Leh",
      locationRegion: "Ladakh",
      url: LADAKH_URL,
      price: 1799,
      availability: "InStock",
    }),

    // ── BreadcrumbList ──────────────────────────────────────────────────────
    makeBreadcrumbSchema([
      { name: "Home", url: "https://syncretreat.com" },
      { name: "Ladakh Retreat", url: LADAKH_URL },
    ]),
  ],
};

export default function Ladakh() {
  return (
    <>
      <Schema schema={ladakhGraph} />
      <DestinationTemplate config={ladakhConfig} />
    </>
  );
}
