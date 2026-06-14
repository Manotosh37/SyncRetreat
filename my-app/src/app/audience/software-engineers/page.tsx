import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, Terminal, Server, Shield, Code, Wifi, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Co-living for Software Engineers & Developers | SyncRetreat",
  description:
    "A strictly curated, high-speed internet digital nomad retreat for software engineers. Dual-WAN fiber, 300Mbps, and enterprise-grade networking in the Himalayas.",
  alternates: { canonical: "https://syncretreat.com/audience/software-engineers" },
  openGraph: {
    title: "SyncRetreat for Software Engineers — Stop Gambling with Hotel Wi-Fi",
    description:
      "Dual-WAN 300Mbps fiber, 42ms to AWS Mumbai, UPS power, and zero backpackers. 28-day sprints in Ladakh for engineers who ship.",
    url: "https://syncretreat.com/audience/software-engineers",
  },
};

export default function SoftwareEngineers() {
  return (
    <div className="min-h-screen bg-[#FEFBF7]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 overflow-hidden bg-[#1A2421] text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#10b981_0%,transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 font-mono text-sm mb-8">
            <Terminal className="w-4 h-4" />
            <span>Built by engineers, for engineers</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
            Stop gambling with <br className="hidden md:block" />
            <span className="text-emerald-500">hotel Wi-Fi.</span>
          </h1>
          
          <p className="text-lg lg:text-2xl text-slate-300 max-w-3xl font-medium leading-relaxed mb-12">
            The technical reality of shipping products remotely requires enterprise-grade infrastructure. SyncRetreat provides Dual-WAN load balancing, 300Mbps fiber, and guaranteed power redundancy in the world's most remote locations.
          </p>
          
          <Link
            href="/locations/ladakh"
            className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-emerald-900/50"
          >
            <span>VIEW LADAKH SPRINT</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          <div className="text-center px-4">
            <div className="text-4xl font-black text-slate-900 mb-2">300<span className="text-emerald-600">Mbps</span></div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Symmetrical Fiber</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-black text-slate-900 mb-2">99.9<span className="text-emerald-600">%</span></div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Network Uptime</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-black text-slate-900 mb-2">24<span className="text-emerald-600">/7</span></div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Power Backup</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl font-black text-slate-900 mb-2">0<span className="text-emerald-600"></span></div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Backpackers</div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6">Engineered for Deep Work</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">We understand that a dropped SSH connection or a power flicker can destroy a 4-hour flow state. Our compounds are built to mitigate all technical risk.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Server,
              title: "Dual-WAN Architecture",
              desc: "We never rely on a single ISP. Our network utilizes enterprise-grade load balancing with automatic failover between primary fiber and secondary satellite/LTE backups."
            },
            {
              icon: Zap,
              title: "Uninterruptible Power",
              desc: "Mountain grids fail. Your work won't. Heavy-duty diesel generators and instantaneous battery backups ensure your monitor never flickers."
            },
            {
              icon: Users,
              title: "Curated Operators",
              desc: "Surround yourself with senior engineers, funded founders, and CTOs. No 'forced fun' bonding circles, just high-signal networking with peers."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Ready to deploy from the mountains?</h2>
          <p className="text-slate-300 text-lg mb-10">Join our upcoming 28-day sprint in Ladakh.</p>
          <Link
            href="/locations/ladakh"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-colors"
          >
            Apply for the next Cohort <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
