import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  Users,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

const faqs = [
  {
    q: "Who is this retreat actually for?",
    a: "It is designed for builders, founders, engineers, designers, and remote professionals who need long uninterrupted focus blocks and a high-trust environment.",
  },
  {
    q: "Do I need to be a developer to join?",
    a: "No. The common requirement is not your job title, but your mindset. If you work deeply, ship consistently, and respect the environment, you fit the model.",
  },
  {
    q: "What kind of people should not apply?",
    a: "People looking for a vacation, party scene, casual tourism, or a low-structure stay will not get value here. This is built for focused work and discipline.",
  },
  {
    q: "How strict is eligibility?",
    a: "Eligibility is based on intent, work style, and whether the retreat matches your current stage. This is curated, not open-for-all tourism.",
  },
];

const eligibleFor = [
  {
    icon: BriefcaseBusiness,
    title: "Founders & Operators",
    desc: "People shipping products, managing teams, or building systems with serious output goals.",
  },
  {
    icon: Users,
    title: "Remote Professionals",
    desc: "Designers, developers, marketers, and creators who need a focused environment away from noise.",
  },
  {
    icon: MapPin,
    title: "High-Intent Travelers",
    desc: "People who want purposeful travel, not random vacation behavior.",
  },
  {
    icon: ShieldCheck,
    title: "Disciplined Builders",
    desc: "People who value structure, quiet, and a high-trust atmosphere.",
  },
];

export default function EligibilityFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[#05050a] py-28 text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(56,189,248,0.08), transparent 24%),
            radial-gradient(circle at 80% 30%, rgba(168,85,247,0.08), transparent 22%),
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 64px 64px, 64px 64px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(5,5,10,0.90)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/40">
            Eligibility & Questions
          </p>

          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            <span className="text-white">Who This Is For</span>
            <br />
            <span className="bg-linear-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
              And What to Expect
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            Clear expectations on the right, a modern FAQ on the left. Same dark
            premium theme, with the blue-indigo-fuchsia accent used across the site.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: FAQ */}
          <div className="rounded-[28px] border border-white/10 bg-white/3 p-5 md:p-7 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-sky-300/70">
                  FAQ
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Modern Answers
                </h3>
              </div>
              <div className="h-10 w-10 rounded-2xl border border-sky-300/20 bg-linear-to-br from-sky-300/15 via-indigo-300/10 to-fuchsia-300/15" />
            </div>

            <div className="space-y-3">
              {faqs.map((item, index) => {
                const open = openIndex === index;

                return (
                  <div
                    key={item.q}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition-all duration-300"
                    style={{
                      boxShadow: open
                        ? "0 0 40px -20px rgba(99,102,241,0.35)"
                        : "none",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-base font-medium text-white">
                        {item.q}
                      </span>
                      <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 text-sky-300"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-sm leading-7 text-white/65">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: For whom + eligibility */}
          <div className="rounded-[28px] border border-white/10 bg-white/3 p-5 md:p-7 backdrop-blur-xl">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300/70">
                For Whom
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Built for Serious Builders
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                This is not a generic stay. It is for people who treat time like
                capital, value deep work, and want a structured environment that
                supports real output.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {eligibleFor.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:border-sky-300/25 hover:shadow-[0_0_30px_-18px_rgba(59,130,246,0.35)]"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-sky-300/15 bg-sky-300/8">
                      <Icon className="h-5 w-5 text-sky-300" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-white/60">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-sky-300/15 bg-linear-to-r from-sky-300/10 via-indigo-300/10 to-fuchsia-300/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300/70">
                Eligibility rule
              </p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                If your goal is escape, noise, or leisure-first travel, this is
                not the right fit. If your goal is focused execution, you are in
                the right place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}