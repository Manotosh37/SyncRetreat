"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const listings = [
  {
    title: "Varkala",
    description:
      "A cliff-top retreat on the Arabian Sea in Kerala. Private compound, pristine beaches, high-speed fiber, and curated deep-work sprints in coastal tranquility.",
    image: "/varkalaCalpic.png",
    tags: [
      "Cliff-Top Villa",
      "Arabian Sea",
      "Kerala Coast",
      "Beach Access",
      "India",
    ],
    price: 1799,
    currency: "$",
    route: "/locations/varkala",
    cta: "Oct 10th, 2025",
    duration: "/28 days",
    accent: "rgba(4, 120, 87, 0.55)", // emerald-700
  },
  {
    title: "Ladakh",
    description:
      "15°C mountain air, zero urban noise, and absolute isolation. Engineered strictly for uninterrupted product shipping with enterprise-grade Dual-WAN infrastructure.",
    image: "/ladakhImg.png",
    tags: [
      "Deep Work",
      "Cold Desert",
      "Dual-WAN Uptime",
      "High-Altitude Isolation",
      "India",
    ],
    price: 1499,
    originalPrice: 1799,
    currency: "$",
    route: "/locations/ladakh",
    cta: "Apply Now",
    duration: "/28 days",
    accent: "rgba(3, 105, 161, 0.55)", // sky-700 
  },

];

export default function DestinationCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  const router = useRouter();

  const handleCardClick = (route: string) => {
    if (route !== "#") router.push(route);
  };

  const handleButtonClick = (e: React.MouseEvent, route: string) => {
    e.stopPropagation();
    if (route !== "#") router.push(route);
  };

  return (
    <section className="relative z-10 bg-[#fefbf7] border-t border-slate-200 px-2 md:px-6 py-16 md:py-24 text-slate-900">
      <div className="max-w-screen-2xl w-full px-4 lg:px-2 mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4 text-center tracking-tight">
          Upcoming. <span className="text-emerald-700">Retreat Calendar</span>
        </h2>
        <p className="text-center text-slate-600 mb-8 md:mb-16 text-base md:text-lg max-w-xl mx-auto font-medium">
          Explore incredible locations. Immerse in a new culture while
          engineering remotely with absolute focus.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((item, i) => {
            const active = hovered === i;
            const isDisabled = item.route === "#";

            return (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden border transition-all duration-500 bg-white shadow-md ${
                  !isDisabled ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                style={{
                  minHeight: "clamp(300px, 60vw, 480px)",
                  borderColor: active ? item.accent : "#e2e8f0",
                  boxShadow: active
                    ? `0 24px 60px -20px ${item.accent}`
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleCardClick(item.route)}
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`z-0 object-cover transition-all duration-700 ${
                    active ? "scale-105 opacity-100" : "scale-100 opacity-90"
                  }`}
                />

                {/* Dark gradient overlay so white text is readable */}
                <div className="absolute inset-0 z-5 bg-linear-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Default state */}
                <div
                  className={`absolute bottom-0 left-0 right-0 z-20 p-6 transition-all duration-500 ${
                    active ? "-translate-y-full opacity-0" : "opacity-100"
                  }`}
                >
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wide drop-shadow-sm">
                    {item.title}
                  </h3>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-700 font-bold backdrop-blur-md border border-slate-200 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Scarcity & Urgency Indicators in Default State */}
                  {(item as any).spotsLeft || (item as any).deadline ? (
                    <div className="flex flex-col gap-2 mt-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/50 shadow-lg">
                      {(item as any).spotsLeft && (
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                          <span className="text-[13px] font-black text-red-700 uppercase tracking-wide">
                            Only {(item as any).spotsLeft} spots remaining
                          </span>
                        </div>
                      )}
                      {(item as any).deadline && (
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                          <span className="text-[13px] font-black text-orange-700 uppercase tracking-wide">
                            Applications close in {(item as any).deadline}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Hover state */}
                <div
                  className={`absolute inset-0 z-20 flex flex-col justify-end p-6 transition-all duration-500 ${
                    active
                      ? "opacity-100 translate-y-0 bg-white/60 backdrop-blur-sm"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                        Start from
                      </span>
                      <div className="flex flex-col mt-0.5 gap-1">
                        {typeof item.originalPrice === "number" &&
                          item.price !== item.originalPrice && (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-900 font-bold text-lg line-through">
                                {item.currency}
                                {item.originalPrice.toLocaleString()}
                              </span>
                              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded uppercase tracking-wider border border-emerald-100">
                                Save {item.currency}
                                {(
                                  item.originalPrice - (item.price as number)
                                ).toLocaleString()}
                              </span>
                            </div>
                          )}

                        <span className="text-2xl font-black text-slate-900 flex items-baseline">
                          {item.currency}
                          {typeof item.price === "number"
                            ? item.price.toLocaleString()
                            : item.price}
                          <span className="text-sm text-slate-500 font-bold ml-1">
                            {item.duration}
                          </span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleButtonClick(e, item.route)}
                      className={`relative z-30 inline-flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm ${
                        isDisabled
                          ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                          : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20"
                      }`}
                    >
                      {item.cta} <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Application Timeline */}
        <div className="mt-16 max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-center text-xl font-bold text-slate-900 mb-8">How to Join</h3>
          <div className="flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-start md:items-center relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2" />
            
            {[
              { step: "1", title: "Apply", desc: "Submit a 2-minute application" },
              { step: "2", title: "Vibe Check", desc: "Quick 10-min call with founders" },
              { step: "3", title: "Pack Bags", desc: "Secure your spot & travel" }
            ].map((s, i) => (
              <div key={i} className="flex flex-row md:flex-col items-center gap-4 md:gap-3 bg-white px-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                  {s.step}
                </div>
                <div className="md:text-center">
                  <h4 className="font-bold text-slate-900">{s.title}</h4>
                  <p className="text-sm font-medium text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
