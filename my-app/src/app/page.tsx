import Hero from "../components/Hero";
import Infra from "../components/Infra";
import Form from "../components/Calendar";
import Why from "../components/Why";
import CommunitySection from "../components/CommunitySection";
import FaqSection from "../components/FaqSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech-Focused Co-living in the Himalayas | SyncRetreat",
  description:
    "Join international technology professionals at our high-speed internet digital nomad retreats in India.",
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
