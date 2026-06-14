import { Metadata } from "next";
import SalaryCalculator from "../../../components/SalaryCalculator";
import Schema from "../../../components/Schema";

export const metadata: Metadata = {
  title: "Remote Salary Arbitrage Calculator — India vs. SF/London | SyncRetreat",
  description:
    "Calculate how far your software engineering salary goes in Ladakh and Goa vs. San Francisco, London, or New York. Free tool for remote workers planning to work from India.",
  alternates: { canonical: "https://syncretreat.com/tools/salary-calculator" },
  openGraph: {
    title: "Remote Salary Arbitrage Calculator — India vs. Your City",
    description:
      "Keep your US or EU salary. Work from India. See exactly how much more you can save — free calculator for remote engineers.",
    url: "https://syncretreat.com/tools/salary-calculator",
  },
};

export default function SalaryCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#FEFBF7] pt-32 pb-24 px-4">
      <Schema
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Remote Salary Arbitrage Calculator",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "description": "Calculate your purchasing power as a remote engineer working from India vs. your home city.",
        }}
      />

      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs uppercase tracking-widest mb-6">
          Free Tool · No Sign-up Required
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">
          Remote Salary Arbitrage Calculator
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Keep your US or EU salary. Work from India. See exactly how much more you can save, invest, or simply live better — by location.
        </p>
      </div>

      <SalaryCalculator />

      <div className="max-w-3xl mx-auto mt-24">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Is it legal to work remotely from India on a tourist visa?",
              a: "If you are employed by a foreign company and paid into a foreign bank account, you are generally considered a tourist conducting personal business. Use our Visa Eligibility Checker for a precise determination based on your nationality.",
            },
            {
              q: "How accurate are the cost-of-living figures?",
              a: "Our indices are derived from Numbeo's Cost of Living data and Expatistan surveys, updated quarterly. Figures reflect a mid-range lifestyle (co-living or furnished apartment, meals out 4–5x/week, local transport).",
            },
            {
              q: "Does Ladakh really have reliable internet for engineers?",
              a: "Yes. Our retreats operate a dual-WAN setup (BSNL Fiber 300Mbps + Jio failover) with sub-4 second automatic switchover. Latency to AWS Mumbai averages 42ms. See our full infrastructure specs.",
            },
          ].map((item) => (
            <div key={item.q} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
              <p className="text-slate-600 font-medium">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
