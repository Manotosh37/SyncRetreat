import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, Armchair, Monitor, Wifi, HeartPulse, BatteryCharging, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Co-working Infrastructure in the Himalayas | SyncRetreat",
  description:
    "Ergonomic co-working in India. SyncRetreat provides Dual-WAN internet, Herman Miller-tier ergonomics, and oxygen concentrators for high-altitude health.",
};

export default function CoworkingInfrastructure() {
  return (
    <div className="min-h-screen bg-[#FEFBF7]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold text-sm mb-8 uppercase tracking-widest">
            <Network className="w-4 h-4" />
            <span>Facility Specifications</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-slate-900 mb-8 leading-[1.1]">
            Uncompromising <br className="hidden md:block" />
            <span className="text-emerald-600 font-bold">Infrastructure.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl font-medium leading-relaxed mb-12">
            Remote work retreats usually mean sitting on a beanbag with unreliable Wi-Fi. We built a hardware and networking environment that rivals top-tier corporate offices, deployed in the most inspiring locations on earth.
          </p>
          
          <Link
            href="/locations/ladakh"
            className="group px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-xl"
          >
            <span>EXPLORE LOCATIONS</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <div>
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
              <Wifi className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Enterprise Networking</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">
              A 300Mbps connection means nothing if it drops during a client presentation. We deploy custom rack-mounted networking gear with automatic WAN failover.
            </p>
            <ul className="space-y-4 font-medium text-slate-700">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-500" /> Primary Fiber Line (300Mbps)</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-500" /> Secondary Starlink/LTE Failover</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-500" /> Hardware Load Balancing</li>
            </ul>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1400&auto=format&fit=crop" alt="Server Rack" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 md:flex-row-reverse">
          <div className="md:order-2">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100">
              <Armchair className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Elite Ergonomics</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">
              Your physical health dictates your productivity. We source the best seating and desk hardware available to ensure 8-hour sprint sessions remain comfortable and pain-free.
            </p>
            <ul className="space-y-4 font-medium text-slate-700">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Herman Miller-tier task chairs</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Wide, deep work desks</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-emerald-500" /> External monitor rentals available</li>
            </ul>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl md:order-1">
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1470&auto=format&fit=crop" alt="Ergonomic Desk" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center mb-12">
          <div>
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 border border-rose-100">
              <HeartPulse className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">High-Altitude Health</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">
              Working at 11,500 feet requires serious biological infrastructure. We monitor your health vitals actively during the initial acclimatization phase.
            </p>
            <ul className="space-y-4 font-medium text-slate-700">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-rose-500" /> On-site oxygen concentrators</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-rose-500" /> Oximeter vitals tracking</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-rose-500" /> 24/7 on-call medical support</li>
            </ul>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1374&auto=format&fit=crop" alt="Mountain Health" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-emerald-900 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-emerald-50">Experience True Infrastructure</h2>
          <p className="text-emerald-200 text-lg mb-10 font-medium">Stop worrying about the Wi-Fi. Start focusing on your work.</p>
          <Link
            href="/locations/ladakh"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-colors shadow-lg"
          >
            Join a Sprint <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
