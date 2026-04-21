const reasons = [
  {
    title: "COMMUNITY ON TAP",
    description:
      "Meet a community of remote workers, choosing to live and work anywhere.",
    image: "./community.jpeg",
  },
  {
    title: "PREMIUM STAYS, AMAZING DESTINATIONS",
    description:
      "Stay a month in the best destinations for remote workers.",
    image: "./weekend.jpeg",
  },
  {
    title: "KEEP YOUR ROUTINE, CHANGE THE VIEW",
    description:
      "Keep your routine with yoga, surf, and fitness options in every location.",
    image: "./health.jpeg",
  },
];

export default function WhySyncRetreat() {
  return (
    <section className="bg-[#fefbf7] py-24 px-6 md:px-12 w-full">
      <div className="max-w-375 mx-auto">
        <h2
          className="text-4xl md:text-5xl text-slate-900 mb-12"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Why SyncRetreat?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="flex flex-col group cursor-pointer"
            >
              <div className="overflow-hidden mb-6 aspect-square md:aspect-4/3 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="text-[13px] font-bold text-slate-900 tracking-wide mb-3 uppercase">
                {item.title}
              </h3>

              <p className="text-[15px] leading-relaxed text-slate-600 font-medium pr-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
