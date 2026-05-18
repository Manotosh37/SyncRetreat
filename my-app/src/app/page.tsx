import Hero from "../components/Hero";
import Infra from "../components/Infra";
import Form from "../components/Calendar";
import Why from "../components/Why";
import CommunitySection from "../components/CommunitySection";
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
      <div id="application-form">
        <Form />
      </div>
      <Why />
      <CommunitySection />
      <Infra />
      <FaqSection />
    </>
  );
}
