import Hero from "../components/Hero";
import Form from "../components/Calendar";
import Infra from "../components/Infra";
import DayInTheLife from "../components/DayInTheLife";
import FaqSection from "../components/FaqSection";
import Schema from "../components/Schema";
import { makeFAQSchema } from "../lib/schemas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "India Remote Work Retreat for Engineers & Remote Professionals | SyncRetreat",
  description:
    "Premium remote professional co-living and co-working spaces in Ladakh Himalayas and Goa. High-speed internet, ergonomic workstations, and a curated community for remote professionals.",
  keywords: [
    "india remote work retreat",
    "remote work retreat ladakh",
    "co-living india engineers",
    "digital nomad retreat india 2026",
    "remote work himalayas",
    "tech retreat india",
    "28 day retreat developers",
    "deep work retreat india",
  ],
  alternates: { canonical: "https://syncretreat.com" },
  openGraph: {
    title: "SyncRetreat — Co-living & Co-working Retreats in Ladakh & Goa",
    description:
      "28-day deep work retreats in Ladakh and Goa. 300 Mbps fiber, Herman Miller ergonomics, chef meals, and a curated community of engineers. Built for people who ship.",
    url: "https://syncretreat.com",
  },
};

export default function Home() {
  // These mirror the 4 FAQs in FaqSection.tsx — kept in sync manually
  const homepageFaqs = [
    {
      question: "What exactly is SyncRetreat?",
      answer:
        "SyncRetreat is a 28-day, high-altitude deep work infrastructure camp located in Ladakh, India. It is engineered strictly for Western tech founders, CTOs, senior operators, and remote employees. We provide enterprise-grade workspace, uninterrupted internet, and local logistics so you can escape the European summer distractions and execute a month of absolute focus.",
    },
    {
      question: "Who is this NOT for?",
      answer:
        "This is not a yoga retreat, a guided tourist vacation, or a casual digital nomad meetup. We do not accept backpackers. If you are looking for daily sightseeing and forced group icebreakers, do not apply. This is an environment built for shipping products.",
    },
    {
      question: "What is the total investment and what does it cover?",
      answer:
        "The total cost is $1,499 USD. This covers your private accommodation in our premium Ladakhi villa for 28 days, your daily meals prepared by a private chef, 24/7 access to our Dual-WAN workspace, airport transfers from Leh (IXL), curated weekend trips, and all local government permits.",
    },
    {
      question: "How can you guarantee internet in the Himalayas?",
      answer:
        "We do not rely on standard hotel Wi-Fi. We deploy a proprietary network setup featuring Dual-WAN load balancing, backed by secondary ISP failovers and heavy power backups. We treat network uptime as a non-negotiable utility.",
    },
  ];

  return (
    <>
      <Schema schema={makeFAQSchema(homepageFaqs)} />
      <Hero />
      <div id="application-form">
        <Form />
      </div>
      <Infra />
      <DayInTheLife />
      <FaqSection />
    </>
  );
}
