import { Metadata } from "next";
import VisaCheckerTool from "../../../components/VisaCheckerTool";
import Schema from "../../../components/Schema";

export const metadata: Metadata = {
  title: "India Digital Nomad Visa Eligibility Checker | SyncRetreat",
  description: "Check your eligibility for working remotely in India. A free tool to calculate if you qualify for the India e-Tourist visa as a digital nomad or remote worker.",
  alternates: { canonical: "https://syncretreat.com/tools/visa-checker" },
  openGraph: {
    title: "India Visa Eligibility Checker for Remote Workers — Free Tool",
    description:
      "India has no official digital nomad visa. Use our free checker to find exactly which e-Tourist visa you need and how long you can legally stay.",
    url: "https://syncretreat.com/tools/visa-checker",
  },
};

export default function VisaCheckerPage() {
  return (
    <div className="min-h-screen bg-[#FEFBF7] pt-32 pb-24 px-4">
      <Schema
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "India Digital Nomad Visa Eligibility Checker",
          "applicationCategory": "TravelApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "An interactive calculator to determine visa eligibility for remote workers and digital nomads planning to work from India."
        }}
      />
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-sm mb-6 uppercase tracking-widest">
          Free SEO Tool
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">
          India Visa Eligibility Checker
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          India does not have an official "Digital Nomad" visa. Stop reading conflicting forum posts. Use our calculator to determine exactly which e-Visa you need to legally work remotely from India.
        </p>
      </div>

      <VisaCheckerTool />

      <div className="max-w-3xl mx-auto mt-24">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Can I legally work in India on a Tourist Visa?</h3>
            <p className="text-slate-600 font-medium">If you are working remotely for a foreign employer (outside of India) and being paid into a foreign bank account, you are generally considered a tourist engaging in personal business. You cannot seek employment with an Indian company.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">How long does the e-Visa take to process?</h3>
            <p className="text-slate-600 font-medium">Typically 24 to 72 hours. We recommend applying at least 7 days before your intended arrival date.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Do I need a return flight?</h3>
            <p className="text-slate-600 font-medium">Yes. Immigration officials will almost always ask for proof of onward travel (a return flight) when entering India on an e-Tourist visa.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
