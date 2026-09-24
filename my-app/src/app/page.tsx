import Hero from "../components/Hero";
import PlacesToSee from "../components/PlacesToSee";
import PropertyAndWorkspace from "../components/PropertyAndWorkspace";
import PricingPreview from "../components/PricingPreview";
import Infra from "../components/Infra";
import DayInTheLife from "../components/DayInTheLife";
import FaqSection from "../components/FaqSection";
import Schema from "../components/Schema";
import { makeFAQSchema } from "../lib/schemas";
import { COST_FAQ_ANSWER } from "../lib/shared-constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remote Work Retreat India for Remote Professionals | SyncRetreat",
  description:
    "Premium remote professional co-living and co-working spaces in Ladakh Himalayas and Varkala. High-speed internet, ergonomic workstations, and a curated community for remote professionals.",
  keywords: [
    "india remote work retreat",
    "remote work retreat ladakh",
    "remote work retreat varkala",
    "co-living india engineers",
    "digital nomad retreat india 2026",
    "remote work himalayas",
    "tech retreat india",
    "14 day retreat developers",
    "deep work retreat india",
  ],
  alternates: { canonical: "https://syncretreat.com" },
  openGraph: {
    title: "SyncRetreat — Co-living & Co-working Retreats in Varkala & Ladakh",
    description:
      "Deep work retreats in Varkala and Ladakh. 300 Mbps fiber, Herman Miller ergonomics, chef meals, and a curated community of engineers. Built for people who ship.",
    url: "https://syncretreat.com",
  },
};

export default function Home() {
  const homepageFaqs = [
    {
      question: "What exactly is SyncRetreat?",
      answer:
        "SyncRetreat is a deep work infrastructure retreat designed for software founders, CTOs, engineers, and remote operators. We provide enterprise-grade workspace, dual-WAN fiber internet, chef meals, and seamless local logistics so you can execute sprints of absolute focus.",
    },
    {
      question: "Who is this NOT for?",
      answer:
        "This is not a yoga retreat, a guided tourist vacation, or a casual digital nomad meetup. We do not accept backpackers. If you are looking for daily sightseeing and forced group icebreakers, do not apply. This is an environment built for shipping products.",
    },
    {
      question: "What is the total investment and what does it cover?",
      answer: COST_FAQ_ANSWER,
    },
    {
      question: "How can you guarantee internet?",
      answer:
        "We do not rely on standard hotel Wi-Fi. We deploy enterprise network setups featuring Dual-WAN load balancing, backed by secondary ISP failovers and heavy power backups. We treat network uptime as a non-negotiable utility.",
    },
  ];

  return (
    <>
      <Schema schema={makeFAQSchema(homepageFaqs)} />
      <Hero />

      {/* Destinations Section */}
      <PlacesToSee />

      {/* Varkala Property & Workspace */}
      <PropertyAndWorkspace />

      {/* Workation Plans */}
      <PricingPreview />

      <Infra />
      <DayInTheLife />
      <FaqSection />
    </>
  );
}
