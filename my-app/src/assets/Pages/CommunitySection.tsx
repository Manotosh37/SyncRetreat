export default function Community() {
  return (
    <section className="bg-[#fefbf7] pt-28 pb-0 w-full overflow-hidden">
      {/* Text Content */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h2
          className="text-4xl md:text-5xl text-slate-900 mb-8 leading-tight font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          SyncRetreat is a community{" "}
          <span className="text-emerald-500">
            that builds and travels together
          </span>
        </h2>

        <p className="text-[15px] leading-relaxed text-slate-500 mb-6 font-normal max-w-3xl mx-auto">
          Our approach to travel is unconventional so we call our retreats
          something different. A <span className="italic">Sprint</span> is a
          moment in time where our community meets to spend a month coliving,
          coworking, and exploring a new country together. It's not a vacation
          and the goal isn't to cross off a line from our bucket lists. There's
          a focus on advancing our careers and discovering adventure during the
          moments in between.
        </p>

        <p className="text-[15px] leading-relaxed text-slate-500 font-normal max-w-3xl mx-auto">
          Several Sprints run at the same time across different locations, so
          each month, members choose the destination they want to see. Jumping
          between Sprints and making their own travel plans, our community sees
          the world on their own terms.
        </p>
      </div>

      {/* Image & Testimonial Grid - Full Width */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 bg-white gap-2 p-2">
        {/* Top Left Image */}
        <div className="w-full h-87.5 md:h-112.5">
          <img
            src="./logistics.jpeg"
            alt="Community Coworking"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right Image */}
        <div className="w-full h-87.5 md:h-112.5">
          <img
            src="./community.jpeg"
            alt="Community Gathering"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Left — Famous Quote */}
        <div className="w-full h-87.5 md:h-112.5 bg-[#fefbf7] flex flex-col justify-center items-center px-10 py-12 text-center relative overflow-hidden">
          {/* Decorative large quotation mark */}
          <span
            className="absolute top-4 left-6 text-emerald-100 select-none pointer-events-none"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "10rem",
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            "
          </span>
          <p
            className="text-slate-700 italic text-lg md:text-xl leading-relaxed max-w-md mb-8 relative z-10"
            style={{ fontFamily: "Georgia, serif" }}
          >
            "Life is either a daring adventure, or nothing at all."
          </p>
          <div className="relative z-10">
            <div className="w-10 h-px bg-emerald-400 mx-auto mb-4" />
            <p className="text-xs uppercase tracking-widest font-bold text-slate-900">
              — Helen Keller
            </p>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold uppercase tracking-wider">
              Author · Activist · Trailblazer
            </p>
          </div>
        </div>

        {/* Bottom Right Image */}
        <div className="w-full h-87.5 md:h-112.5">
          <img
            src="./weekend.jpeg"
            alt="Adventure"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
