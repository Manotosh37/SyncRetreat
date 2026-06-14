"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Wifi,
  Armchair,
  HeartPulse,
  Users,
  Compass,
  Package,
} from "lucide-react";

const features = [
  {
    icon: Wifi,
    title: "Connectivity",
    highlight: "Dual-Line Fiber (300 Mbps)",
    description:
      "Enterprise-grade redundancy. Zero downtime, even in the Himalayas.",
    image: "/connectivity.jpeg",
    accent: "rgba(3, 105, 161, 0.55)", // sky-700
    accentSoft: "rgba(3, 105, 161, 0.1)",
    accentText: "#0369a1",
  },
  {
    icon: Armchair,
    title: "Comfort",
    highlight: "Modern Tier Ergonomic Chairs",
    description:
      "8-hour work sessions without back pain. Premium desks with mountain views.",
    image: "/comfert.jpeg",
    accent: "rgba(4, 120, 87, 0.55)", // emerald-700
    accentSoft: "rgba(4, 120, 87, 0.1)",
    accentText: "#047857",
  },
  {
    icon: HeartPulse,
    title: "Health",
    highlight: "Oxygen Enrichment & 24/7 Medical Support",
    description:
      "Acclimatization support, oxygen concentrators, on-call medical staff.",
    image: "/health.jpeg",
    accent: "rgba(126, 34, 206, 0.55)", // purple-700
    accentSoft: "rgba(126, 34, 206, 0.1)",
    accentText: "#7e22ce",
  },
  {
    icon: Users,
    title: "Community",
    highlight: "Curated Group of Senior Engineers & Remote Workers",
    description:
      "No tourists. No backpackers. Just focused builders shipping products.",
    image: "/community.jpeg",
    accent: "rgba(190, 24, 93, 0.55)", // pink-700
    accentSoft: "rgba(190, 24, 93, 0.1)",
    accentText: "#be185d",
  },
  {
    icon: Compass,
    title: "Weekend Decompression",
    highlight: "Curated Himalayan expeditions during your downtime.",
    description:
      "Pre-planned group trips to Pangong Lake, Nubra Valley, and Khardung La. We handle the permits, drivers, and logistics.",
    image: "/weekend.jpeg",
    accent: "rgba(194, 65, 12, 0.55)", // orange-700
    accentSoft: "rgba(194, 65, 12, 0.1)",
    accentText: "#c2410c",
  },
  {
    icon: Package,
    title: "Complete Logistics",
    highlight: "Complete Logistics",
    description:
      "All permits, accommodation, and local coordination handled. You focus on shipping.",
    image: "/logistics.jpeg",
    accent: "rgba(21, 128, 61, 0.55)", // green-700
    accentSoft: "rgba(21, 128, 61, 0.1)",
    accentText: "#15803d",
  },
];

export default function FeaturesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#fefbf7] py-14 md:py-28 text-slate-900 border-t border-slate-200">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          backgroundPosition: "center",
        }}
      />

      <div className="relative w-full z-10">
        <div className="mx-auto max-w-4xl text-center px-4">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            <span>What SyncRetreat provides, </span>
            <br />
            <span className="text-emerald-700">for optimal productivity!</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-7 text-slate-700 md:text-lg">
            It is a place where you get to explore, work and connect all in one
            place.
          </p>
        </div>

        {/* Full Bleed Grid - No padding on sides so it touches the edges */}
        <div className="mt-8 md:mt-16 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => {
            const active = hovered === i;
            const Icon = item.icon;

            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative min-h-105 md:h-105 overflow-hidden border border-slate-200 bg-black transition-all duration-500 cursor-pointer ${
                  active
                    ? "scale-[1.03] z-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
                    : "scale-100 z-10 shadow-sm"
                }`}
                style={{
                  borderColor: active ? item.accentText : "#e2e8f0",
                }}
              >
                {/* Background image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-all duration-700 ${
                    active ? "scale-110" : "scale-100"
                  }`}
                />

                {/* Subtle dark gradient overlay so white text is perfectly readable, but image is fully visible */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-8">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500 bg-white"
                      style={{
                        borderColor: active ? item.accentText : "#e2e8f0",
                        boxShadow: active
                          ? `0 4px 12px ${item.accentSoft}`
                          : "none",
                      }}
                    >
                      <Icon
                        size={22}
                        className="transition-colors duration-500"
                        style={{ color: active ? item.accentText : "#334155" }}
                      />
                    </div>

                    <span className="text-xs font-bold tracking-[0.3em] text-white drop-shadow-md">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="mt-auto flex flex-col justify-end">
                    <h3 className="text-2xl font-black tracking-tight text-white md:text-[1.75rem] drop-shadow-lg">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-bold leading-6 text-emerald-400 drop-shadow-md">
                      {item.highlight}
                    </p>

                    {/* Animated Description */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        active
                          ? "max-h-40 opacity-100 mt-4"
                          : "max-h-0 opacity-0 mt-0"
                      }`}
                    >
                      <p className="max-w-full text-sm font-medium leading-relaxed text-slate-200 drop-shadow-md">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-600 shadow-sm">
            Every detail engineered for maximum productivity
          </div>
        </div>
      </div>
    </section>
  );
}
