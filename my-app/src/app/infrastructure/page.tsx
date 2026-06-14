import Schema from "../../components/Schema";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise Remote Work Infrastructure Specs | SyncRetreat",
  description:
    "Full technical specifications for SyncRetreat's dual-WAN network, failover architecture, cloud region latencies, and workspace ergonomics. Built for engineers who need reliable infrastructure.",
  keywords: [
    "dual wan remote work india",
    "ladakh internet specs",
    "pfsense failover india",
    "aws mumbai latency ladakh",
    "remote work infrastructure specs",
    "enterprise co-working india",
    "99.9 uptime remote retreat",
  ],
  alternates: { canonical: "https://syncretreat.com/infrastructure" },
  openGraph: {
    title: "SyncRetreat Infrastructure — Full Technical Specs",
    description:
      "Dual-WAN failover, 42ms to AWS Mumbai, 99.6% uptime, Wi-Fi 6, Herman Miller ergonomics. Every decision documented openly so engineers can make an informed choice.",
    url: "https://syncretreat.com/infrastructure",
  },
};

const LATENCY_DATA = [
  { region: "AWS ap-south-1 (Mumbai)", ladakh: 42, goa: 28, sf: 210 },
  { region: "GCP asia-south1 (Mumbai)", ladakh: 45, goa: 30, sf: 205 },
  { region: "Cloudflare Edge (India)", ladakh: 18, goa: 12, sf: 85 },
  { region: "Vercel Edge (Asia)", ladakh: 35, goa: 22, sf: 95 },
  { region: "GitHub (Global CDN)", ladakh: 55, goa: 40, sf: 30 },
  { region: "npm registry", ladakh: 60, goa: 45, sf: 25 },
];

const NETWORK_SPECS = [
  { label: "Primary ISP", value: "BSNL Fiber — 300 Mbps symmetric" },
  { label: "Failover ISP", value: "Jio Fiber — 200 Mbps symmetric" },
  {
    label: "Load Balancing",
    value: "pfSense dual-WAN with automatic failover",
  },
  { label: "Failover Time", value: "< 4 seconds (OSPF-monitored)" },
  { label: "Uptime SLA", value: "99.6% measured over 12 months" },
  { label: "VPN Support", value: "WireGuard, OpenVPN, Tailscale — all tested" },
  { label: "Static IPs", value: "2 dedicated static IPs available on request" },
  {
    label: "Wi-Fi Standard",
    value: "Wi-Fi 6 (802.11ax) — 6 GHz band isolated per unit",
  },
];

const WORKSPACE_SPECS = [
  {
    label: "Desk Surface",
    value: "180cm × 80cm solid oak — dual-monitor capable",
  },
  { label: "Chair", value: "Herman Miller Aeron equivalent ergonomic" },
  { label: "Monitor", value: '27" 4K IPS available — 1 per station' },
  {
    label: "Peripherals",
    value: "Mechanical keyboard, precision mouse on request",
  },
  { label: "Lighting", value: "Bias-lit LED — 5000K daylight-balanced" },
  { label: "Noise Floor", value: "< 35 dB ambient in dedicated co-work zones" },
  {
    label: "Power Backup",
    value: "1500VA UPS per workstation — 45min runtime",
  },
  {
    label: "Meeting Rooms",
    value: "2 soundproofed rooms with Owl Labs camera",
  },
];

export default function Infrastructure() {
  return (
    <div className="min-h-screen bg-[#FEFBF7] pt-32 pb-24 px-4">
      <Schema
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SyncRetreat Infrastructure Specifications",
          description:
            "Full technical specifications for co-working infrastructure in Ladakh and Goa, India.",
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-widest mb-6">
            Public Infra Spec · v2026.1
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6">
            Infrastructure Specifications
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
            Every technical decision we make is documented here. No marketing
            language. If you need to know whether you can run production
            systems, conduct live interviews, or push to CI/CD from Ladakh —
            this page answers it.
          </p>
        </div>

        {/* Network Architecture */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide mb-6 pb-4 border-b-2 border-slate-900">
            01 · Network Architecture
          </h2>
          <div className="bg-slate-900 text-white p-6 rounded-2xl font-mono text-sm mb-6 leading-relaxed">
            <p className="text-emerald-400 mb-2">## Network Topology</p>
            <p className="text-slate-300">
              Internet ──► [BSNL 300M] ──► pfSense Router ──► LAN Switch ──► AP
              (Wi-Fi 6)
            </p>
            <p className="text-slate-500 ml-14 mt-1">
              └──► [Jio 200M] ──► (failover, hot standby)
            </p>
            <br />
            <p className="text-emerald-400"># Failover logic</p>
            <p className="text-slate-300">
              monitor: ping 8.8.8.8 + 1.1.1.1 every 500ms
            </p>
            <p className="text-slate-300">
              threshold: 3 consecutive failures → automatic switch
            </p>
            <p className="text-slate-300">switch_time: {"<"} 4 seconds</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {NETWORK_SPECS.map((s) => (
              <div
                key={s.label}
                className="flex justify-between items-start p-4 bg-white border border-slate-200 rounded-xl"
              >
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                  {s.label}
                </span>
                <span className="text-sm font-black text-slate-900 text-right max-w-[55%]">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Latency Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide mb-2 pb-4 border-b-2 border-slate-900">
            02 · Cloud Region Latencies
          </h2>
          <p className="text-slate-500 font-medium mb-6">
            Measured via <code className="bg-slate-100 px-1 rounded">ping</code>{" "}
            and <code className="bg-slate-100 px-1 rounded">mtr</code>. Average
            of 100 samples, 08:00–20:00 IST. Last updated: May 2026.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold uppercase tracking-widest">
                    Cloud Region
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-bold uppercase tracking-widest text-emerald-400">
                    Ladakh
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-bold uppercase tracking-widest text-emerald-400">
                    Goa
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                    SF (ref)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LATENCY_DATA.map((row) => (
                  <tr
                    key={row.region}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">
                      {row.region}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`font-black text-sm ${row.ladakh < 60 ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {row.ladakh}ms
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`font-black text-sm ${row.goa < 60 ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {row.goa}ms
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-black text-sm text-slate-400">
                        {row.sf}ms
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3 font-medium">
            ✅ = sub-60ms (excellent for live coding, pair programming, video
            calls). AWS Mumbai is the optimal region for workloads running from
            India.
          </p>
        </section>

        {/* Workspace */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide mb-6 pb-4 border-b-2 border-slate-900">
            03 · Workspace Ergonomics
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {WORKSPACE_SPECS.map((s) => (
              <div
                key={s.label}
                className="flex justify-between items-start p-4 bg-white border border-slate-200 rounded-xl"
              >
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                  {s.label}
                </span>
                <span className="text-sm font-black text-slate-900 text-right max-w-[55%]">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* What you can run */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide mb-6 pb-4 border-b-2 border-slate-900">
            04 · What You Can Run From Here
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "✅ Production CI/CD",
                desc: "GitHub Actions, CircleCI, Jenkins — all tested. Push-to-deploy with sub-5s feedback loops.",
              },
              {
                title: "✅ Live Video Calls",
                desc: "Zoom, Google Meet, Loom screen recording. Dual-ISP ensures zero dropped calls.",
              },
              {
                title: "✅ Remote Desktop",
                desc: "AWS WorkSpaces, Parsec, RDP — all usable. Sub-50ms to Mumbai region is gaming-grade.",
              },
              {
                title: "✅ Docker / K8s",
                desc: "Full Docker build speeds on-site. kubectl to cloud clusters without issue.",
              },
              {
                title: "✅ Database Connections",
                desc: "Supabase, PlanetScale, MongoDB Atlas — all reachable with excellent latency.",
              },
              {
                title: "⚠️ Latency-Sensitive HFT",
                desc: "If your work requires sub-10ms global latency (trading algos), colocate your compute in Mumbai.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
              >
                <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              The infrastructure is ready.
            </p>
            <h3 className="text-2xl font-black mb-2">Are you?</h3>
            <p className="text-slate-300 font-medium">
              Applications open for the July 2026 Ladakh cohort.
            </p>
          </div>
          <Link
            href="/locations/ladakh"
            className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl transition-colors"
          >
            View Dates & Apply
          </Link>
        </div>
      </div>
    </div>
  );
}
