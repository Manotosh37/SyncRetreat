import Hero from "../components/Hero";
import Form from "../components/Calendar";
import Infra from "../components/Infra";
import DayInTheLife from "../components/DayInTheLife";
import FounderIntro from "../components/FounderIntro";
import FaqSection from "../components/FaqSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Remote Professional Co-living & Co-working in India and Himalayas | SyncRetreat",
  description:
    "Premium remote professional co-living and co-working spaces in Ladakh Himalayas and Goa. High-speed internet, ergonomic workstations, and a curated community for remote professionals.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <FounderIntro />
      <div id="application-form">
        <Form />
      </div>
      <Infra />
      <DayInTheLife />
      <FaqSection />
    </>
  );
}
