import { Metadata } from "next";
import LatencyTesterTool from "../../../components/LatencyTesterTool";
import Schema from "../../../components/Schema";

export const metadata: Metadata = {
  title: "Himalayan Internet Latency Tester — Remote Work Diagnostics | SyncRetreat",
  description:
    "Test your current connection latency to global endpoints and compare it with SyncRetreat's dual-WAN fiber nodes in Ladakh (Leh) and Goa. Built for remote software developers.",
};

export default function LatencyTesterPage() {
  return (
    <div className="min-h-screen bg-[#FEFBF7] pt-32 pb-24 px-4">
      <Schema
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Himalayan Internet Latency Tester",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "description": "Interactive latency diagnostic tool comparing local connections against optimized enterprise nodes in remote Indian regions.",
        }}
      />

      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs uppercase tracking-widest mb-6">
          Diagnostic Tool · Pure Data
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">
          Himalayan Internet Latency Tester
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Wondering if you can support live coding sessions or push to production from Leh, Ladakh or Goa? Run a direct diagnostic test from your current location now.
        </p>
      </div>

      <LatencyTesterTool />

      <div className="max-w-3xl mx-auto mt-24">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          How It Works & Technical Specifications
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "How does this browser test measure latency?",
              a: "The diagnostic sends small, lightweight CORS-compliant packet handshakes using window.performance to target server domains, measuring exact TCP connection round-trip times (RTT) directly from your browser engine.",
            },
            {
              q: "Why are Ladakh's latencies so low for a remote mountain location?",
              a: "Because Leh, Ladakh is connected to the primary fiber backbone of BSNL. Instead of routing through congested public lines, our corporate dual-WAN connection utilizes clean optical backplanes heading straight to national nodes.",
            },
            {
              q: "Do you block VPNs or enterprise networks?",
              a: "Absolutely not. Our network architecture natively supports IPSec, Tailscale, WireGuard, OpenVPN, and corporate proxies with zero degradation of throughput or packet processing.",
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
