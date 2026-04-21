import { ChevronRight } from "lucide-react";
import { useState } from "react";

const listings = [
  {
    title: "Ladakh",
    description:
      "15°C mountain air, zero urban noise, and absolute isolation. Engineered strictly for uninterrupted product shipping with enterprise-grade Dual-WAN infrastructure.",
    image: "./ladakhImg.png",
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
    route: "/ladakh",
    cta: "See the dates",
    duration: "/28 days",
    accent: "rgba(3, 105, 161, 0.55)", // sky-700
  },
  {
    title: "Goa",
    description:
      "A fully managed, private compound designed to insulate you from the coastal distractions. High-speed fiber, silent deep-work zones, and elite peer proximity.",
    image: "./goaImg.png",
    tags: [
      "Private Compound",
      "Coastal Isolation",
      "Focus Sprints",
      "Beach Life",
      "India",
    ],
    price: 1799,
    currency: "$",
    route: "/goa",
    cta: "Upcoming…",
    duration: "",
    accent: "rgba(4, 120, 87, 0.55)", // emerald-700
  },
  {
    title: "Coming Soon…",
    description:
      "We are currently auditing and stress-testing new global locations. Only properties that pass our strict criteria for absolute isolation and network uptime will be deployed.",
    image: "./cSImg.jpeg",
    tags: ["Vetting in Progress", "Infrastructure Audit", "Next Chapter"],
    price: "1599 – 1999",
    currency: "$",
    route: "#",
    cta: "Coming Soon…",
    duration: "",
    accent: "rgba(126, 34, 206, 0.55)", // purple-700
  },
];

export default function DestinationCards() {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleCardClick = (route: string) => {
    if (route !== "#") window.location.href = route;
  };

  const handleButtonClick = (e: React.MouseEvent, route: string) => {
    e.stopPropagation();
    if (route !== "#") window.location.href = route;
  };

  return (
    <section className="relative z-10 -mt-16 overflow-hidden bg-[#fefbf7] rounded-t-[48px] shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.5)] px-4 pt-32 pb-28 text-slate-900">
      <div className="max-w-500 w-full px-2 lg:px-8 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center tracking-tight">
          Upcoming. <span className="text-emerald-700">Retreat Calendar</span>
        </h2>
        <p className="text-center text-slate-600 mb-16 text-lg max-w-xl mx-auto font-medium">
          Explore incredible locations. Immerse in a new culture while
          engineering remotely with absolute focus.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  height: 520,
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
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`absolute inset-0 z-0 w-full h-full object-cover transition-all duration-700 ${
                    active ? "scale-105 opacity-100" : "scale-100 opacity-90"
                  }`}
                />

                {/* Light gradient overlay */}

                {/* Default state */}
                <div
                  className={`absolute bottom-0 left-0 right-0 z-10 p-6 transition-all duration-500 ${
                    active ? "-translate-y-full opacity-0" : "opacity-100"
                  }`}
                >
                  <h3 className="text-3xl font-black text-white tracking-wide drop-shadow-sm">
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
      </div>
    </section>
  );
}
