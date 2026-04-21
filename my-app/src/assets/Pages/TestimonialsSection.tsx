import React from "react";

const testimonials = [
  {
    name: "Brooke",
    role: "Software Engineer",
    text: "From Prague to Edinburgh, SyncRetreat has given me something I didn't know I was missing: a sense of belonging that doesn't require staying in one place. We're living through a loneliness epidemic, third spaces are disappearing. Coffee shops you can linger in, community... ",
    image: null,
  },
  {
    name: "Pam Sagarnaga",
    role: "Project Manager",
    text: "It's been over 2 years since I clicked 'apply' to what seemed somehow a sort of fun way to travel with people, BUT I GOT SO MUCH MORE: a rock-solid community and friends who will inspire you to live your best life while exploring the world.",
    image: "./community.jpeg",
  },
  {
    name: "Alex",
    role: "Online Marketer",
    text: "It's hard to overstate the effect that SyncRetreat has had on my life since I first joined a sprint in 2019. Today, I consider so many travel friends that I did NOT meet through work as family.",
    image: null,
  },
  {
    name: "April",
    role: "Designer",
    text: "I first joined SyncRetreat because I wanted to give full time traveling a try and I didn't want to do it alone. My goal was to travel/remote work for four months and then come back to the USA...",
    image: "./weekend.jpeg",
  },
  {
    name: "Zachary Olmstead",
    role: "Financial Analyst",
    text: "SyncRetreat has been such a game-changer in how I experience travel. I've always loved solo travel, but being able to share moments — from desert nights in Sahara to gorilla trekking in Rwanda — with a community of curious, open...",
    image: "./health.jpeg",
    isVideo: true,
  },
  {
    name: "Jen F.",
    role: "Creative Director",
    text: "I always meet people when I travel, but I make friends in SyncRetreat. Since my first sprint in 2022, I've done about 3 sprints per year. Each has its own uniqueness.",
    image: null,
  },
  {
    name: "Samantha",
    role: "Travel Advisor",
    text: "I joined SyncRetreat in 2019 and since then I've done 8 different sprints and met hundreds of unique and amazing tribe members. Joining this community was truly life-changing for me.",
    image: null,
  },
  {
    name: "David Lorenzo",
    role: "CEO of CoHustle",
    text: "SyncRetreat puts so much thought and heart into finding the most incredible people. And it makes ALL the difference to the sprint experience. There's this openness and positivity that you just can't find out in the real world.",
    image: "./logistics.jpeg",
  },
];

export default function TestimonialsSection({ limit }: { limit?: number }) {
  const displayData = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className="bg-[#fefbf7] py-24 px-4 md:px-10 w-full overflow-hidden">
      <div className="max-w-400 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
            Loved by{" "}
            <span className="text-emerald-500">Builders Worldwide</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Don't just take our word for it. Here is what our community has to
            say about their experiences.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {displayData.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-[20px] border border-emerald-600/30 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <svg
                    key={idx}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-[13px] text-slate-700 font-medium leading-relaxed mb-3">
                "{t.text}"
              </p>

              {t.image && (
                <div className="mt-3 rounded-xl overflow-hidden relative">
                  <img
                    src={t.image}
                    alt="Trip memory"
                    className="w-full h-auto object-cover"
                  />
                  {t.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-slate-900 border-b-8 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
