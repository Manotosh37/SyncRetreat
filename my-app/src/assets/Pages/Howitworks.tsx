import { motion } from "framer-motion";

const features = [
  {
    title: "Connectivity",
    description: "Dual-Line Fiber (150 Mbps) + Starlink Backup",
  },
  {
    title: "Comfort",
    description: "Mordern Tier Ergonomic Chairs",
  },
  {
    title: "Health",
    description: "Oxygen Enrichment & 24/7 Medical Support",
  },
  {
    title: "Health",
    description: "Adfgfdjhjgbfgnjugfngfbjgfikm",
  },
  {
    title: "jack",
    description: "fngbmfjkbnmgbkimfgbikgfmgfikjmfmgfkbmfgbkgmnhhgkjngkjh",
  },
  {
    title: "jack",
    description: "fngbmfjkbnmgbkimfgbikgfmgfikjmfmgfkbmfgbkgmnhhgkjngkjh",
  },
];

export default function Works() {
  return (
    <div className="bg-black min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-serif text-center text-white mb-10">
          Who We Are & How It Works
        </h1>

        <div className="flex text-gray-300 padding-top-10px padding-bottom-10px ">
          <h3>
            We come from all corners of the world, but our values connect us
            together. From day one, these beliefs have guided our decisions to
            invite the WiFi Tribe kind of traveller to join us.
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-8xl  my-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/0 transition-all duration-500" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-400 mb-3 font-medium">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center py-12 px-8 border-l-4 border-white/30 bg-white/5 rounded-r-lg italic text-gray-300 text-xl font-serif">
          "You are the average of the five people you spend the most time with."
          - Jim Rohn
        </div>

        <section className="max-w-4xl mx-auto py-16 px-4">
          <h2 className="text-4xl font-serif text-center text-white mb-6">
            How to Apply to SyncRetreat
          </h2>

          <p className="text-center text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
            If you already live by our values, the next step is applying to join
            our community. It'll be like catching up with friends, so no need to
            show up as anyone else but yourself.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                1. Submit an application
              </h3>
              <p className="text-gray-400">
                Take your time answering why you're motivated to join us, what
                kind of work you do, and the curious things that are uniquely
                you. It can take up to 4 weeks to review and respond to each
                applicant.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                2. A video interview call
              </h3>
              <p className="text-gray-400">
                If your application is successful, we'll have a 30-40 minute
                video call to go deeper and get to know each other. Interviews
                typically happen within 1-2 weeks of receiving your application.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                3. Tell us more about your personality
              </h3>
              <p className="text-gray-400">
                We ask every applicant to complete the MBTI personality test, it
                takes about 30 minutes. There are no wrong answers, just another
                opportunity to be the real you.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                4. Decision time
              </h3>
              <p className="text-gray-400">
                Taking your application, interview, and personality test into
                consideration, we'll let you know if our community, culture, and
                travel style is the right fit within 24 hours of completing your
                personality test.
              </p>
            </div>

            <div className="border-t border-white/20">
              <div className="flex justify-between items-center py-5 border-b border-white/20 cursor-pointer hover:bg-white/5 px-2">
                <h3 className="text-white text-lg">
                  What can I expect in my first weeks as a SyncRetreat member?
                </h3>
                <span className="text-blue-400 text-xl">›</span>
              </div>
              <div className="flex justify-between items-center py-5 border-b border-white/20 cursor-pointer hover:bg-white/5 px-2">
                <h3 className="text-white text-lg">
                  How does the community connect online?
                </h3>
                <span className="text-blue-400 text-xl">›</span>
              </div>
            </div>

            <div className="border-t border-white/20">
              <div className="flex justify-between items-center py-5 border-b border-white/20 cursor-pointer hover:bg-white/5 px-2">
                <h3 className="text-white text-lg">
                  What can I expect in my first weeks as a SyncRetreat member?
                </h3>
                <span className="text-blue-400 text-xl">›</span>
              </div>
              <div className="flex justify-between items-center py-5 border-b border-white/20 cursor-pointer hover:bg-white/5 px-2">
                <h3 className="text-white text-lg">
                  How does the community connect online?
                </h3>
                <span className="text-blue-400 text-xl">›</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto py-16 px-4">
          <h2 className="text-4xl font-serif text-center text-white mb-6">
            How We Work Remotely & Travel
          </h2>

          <p className="text-gray-400 text-lg mb-12 max-w-4xl mx-auto">
            When our community travels together, we don't call it a "trip"–it's
            more than going to a new place and returning home. Instead, we found
            "<em>Chapter</em>" to be a better name because the periods of time
            we spend together become integral parts of our stories. As a
            collaborative, unconventional style of travel, what to expect is a
            little different.
          </p>

          {/* Create your own adventure */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-serif text-center text-white mb-8">
              Create your own adventure on Chapters
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Month-to-month flexibility
                  </h4>
                  <p className="text-gray-400">
                    Choose between 4, 6, and 8 week Chapters based on what fits
                    your schedules best.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    No preset routes to follow
                  </h4>
                  <p className="text-gray-400">
                    Pick any location on our{" "}
                    <span className="text-blue-400 underline">
                      Chapter Calendar
                    </span>
                    . Without a set route, the journey is up to you.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Mix and match preferences
                  </h4>
                  <p className="text-gray-400">
                    Book a private room on one Chapter and a shared room on the
                    next, choose the option that fits your budget and comfort
                    level.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Co-creating the experience
                  </h4>
                  <p className="text-gray-400">
                    Chapters never have a set itinerary so each experience is
                    unique. The weekend trips, impromptu weekday dinners, and
                    everything in between are planned as a community.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <img
                  src="/images/adventure1.jpg"
                  alt="Adventure"
                  className="rounded-lg w-full h-48 object-cover row-span-2"
                />
                <img
                  src="/images/adventure2.jpg"
                  alt="Coast"
                  className="rounded-lg w-full h-24 object-cover"
                />
                <img
                  src="/images/adventure3.jpg"
                  alt="Pool"
                  className="rounded-lg w-full h-24 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stay productive */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-serif text-center text-white mb-8">
              Stay productive on Chapters
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="grid grid-cols-2 gap-2 md:col-span-2">
                <img
                  src="/images/productive1.jpg"
                  alt="Working"
                  className="rounded-lg w-full h-48 object-cover"
                />
                <img
                  src="/images/productive2.jpg"
                  alt="Ocean view"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Work first, then play
                  </h4>
                  <p className="text-gray-400">
                    Not sacrificing our professional growth is what makes this
                    nomad lifestyle sustainable. We work hard during the week
                    and live every moment to the fullest in our free time.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Always say yes (but sometimes no)
                  </h4>
                  <p className="text-gray-400">
                    We say yes to the countless adventures that push us out of
                    our comfort zone. But we don't feel bad saying no when we
                    need time for ourselves or our work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Find your people */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-2xl font-serif text-center text-white mb-8">
              Find your people on Chapters
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Give everyone a chance
                  </h4>
                  <p className="text-gray-400">
                    We're an international group with different upbringings and
                    backgrounds. We always try to grow and learn from each
                    other, be inclusive, and approach every situation with
                    empathy.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    We left home for a reason
                  </h4>
                  <p className="text-gray-400">
                    Home is the most comfortable place, but we left it for a
                    reason. We get comfortable with the uncomfortable and
                    appreciate what's different, without any expectations.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <img
                  src="/images/people1.jpg"
                  alt="Group"
                  className="rounded-lg w-full h-32 object-cover col-span-2"
                />
                <img
                  src="/images/people2.jpg"
                  alt="Friends"
                  className="rounded-lg w-full h-32 object-cover"
                />
                <img
                  src="/images/people3.jpg"
                  alt="Sunset"
                  className="rounded-lg w-full h-32 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto py-16 px-4">
          <h2 className="text-4xl font-serif text-center text-white mb-6">
            Becoming Part of our Community
          </h2>

          <p className="text-center text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
            An invitation to join us doesn't just include a warm welcome into
            the community. It's the beginning of connecting with others who want
            to show up and contribute to something bigger than themselves.
            Though we already subscribe to the same values, following these
            principles helps create the family-like bonds that our community is
            known for.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Treat this like your home
              </h3>
              <p className="text-gray-400 text-sm">
                Treat fellow members with the same dignity, respect, and
                kindness that you would treat your own family with.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Lend a helping hand
              </h3>
              <p className="text-gray-400 text-sm">
                We've all got each other's backs here. Keep an eye out for
                moments where you can help someone who might need it.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Show up & get involved
              </h3>
              <p className="text-gray-400 text-sm">
                A community only works if everyone contributes. Ask yourself:
                "how can make the community a better place?"
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Leave your ego
              </h3>
              <p className="text-gray-400 text-sm">
                Throw in your knowledge, talents, and passions. Lean into the
                uncomfortable until it feels good.
              </p>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="border-t border-white/20">
            <div className="flex justify-between items-center py-5 border-b border-white/20 cursor-pointer hover:bg-white/5 px-2">
              <h3 className="text-white text-lg">
                What can I expect in my first weeks as a SyncRetreat member?
              </h3>
              <span className="text-blue-400 text-xl">›</span>
            </div>
            <div className="flex justify-between items-center py-5 border-b border-white/20 cursor-pointer hover:bg-white/5 px-2">
              <h3 className="text-white text-lg">
                How does the community connect online?
              </h3>
              <span className="text-blue-400 text-xl">›</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
