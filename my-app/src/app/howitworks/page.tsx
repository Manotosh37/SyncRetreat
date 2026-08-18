"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const principles = [
  {
    title: "Professional Integrity",
    description:
      "We foster a culture of respect and reliability. Every member values each other's time, focus, and commitment to their craft.",
  },
  {
    title: "Zero-Ego Collaboration",
    description:
      "This is a space for building, learning, and growing together. We leave egos at the door and support each other's progress.",
  },
  {
    title: "Curated Connections",
    description:
      "Our community is intentionally selected so you’re surrounded by peers who can offer fresh perspectives and practical solutions.",
  },
  {
    title: "Relentless Progress",
    description:
      "We attract professionals who are passionate about scaling their projects, skills, and impact—always striving for the next milestone.",
  },
  {
    title: "Ambitious Mindset",
    description:
      "We don’t settle for average. Our members are here to make meaningful progress and celebrate big wins.",
  },
  {
    title: "Global Meritocracy",
    description:
      "We welcome driven remote professionals from all backgrounds, united by their dedication and results.",
  },
];

const applicationSteps = [
  {
    title: "Share Your Goals",
    description:
      "Tell us about your professional background and the milestones you want to achieve during your stay.",
  },
  {
    title: "Alignment Call",
    description:
      "A brief conversation to ensure your work style and ambitions align with our community’s focus-driven environment.",
  },
  {
    title: "Community Selection",
    description:
      "Within 24 hours, we’ll let you know if your profile is a great fit for our next cohort of high-performers.",
  },
  {
    title: "Secure Your Workspace",
    description:
      "Once approved, reserve your spot with a $299 deposit. We handle all logistics—premium housing, daily meals, and high-speed Wi-Fi—so you can focus on your work.",
  },
];

const deploymentArchitecture = [
  {
    title: "Monthly Cohorts",
    description:
      "We operate on fixed 28-day cycles, ensuring a stable, focused environment where everyone is committed to their goals.",
  },
  {
    title: "Seamless Logistics",
    description:
      "We take care of everything—accommodation, workspace, meals, and internet—so you can dedicate your energy to deep work.",
  },
  {
    title: "Premium Workspace Experience",
    description:
      "Every member enjoys a private, fully managed room and access to professional workspaces with reliable, high-speed Wi-Fi.",
  },
  {
    title: "Weekly Mastermind Sessions",
    description:
      "Each week, members gather to share challenges and insights, helping each other overcome obstacles and accelerate progress.",
  },
];

const communityPrinciples = [
  {
    title: "Respect the Space",
    description:
      "Treat our premium facilities and deep-work zones with care, ensuring everyone can focus without distraction.",
  },
  {
    title: "Peer Support",
    description:
      "Share your expertise and offer guidance when fellow members face professional challenges.",
  },
  {
    title: "Commitment to Excellence",
    description:
      "Our environment thrives when every member brings their best and supports the collective drive for success.",
  },
  {
    title: "Transparent Progress",
    description:
      "We value real results. Share your wins, learnings, and next steps openly with the community.",
  },
];

export default function Works() {
  return (
    <div className="bg-[#fefbf7] min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-4xl mx-auto py-12">
        {/* Core Values Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16 h-80 flex flex-col justify-center items-center text-center px-4 border border-slate-200 shadow-sm bg-white">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="Premium Workspace"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#fefbf7] via-white/50 to-white/10" />
          <h1 className="relative text-4xl md:text-5xl font-serif text-slate-900 mb-6 z-10">
            The SyncRetreat Operating Principles
          </h1>
          <h3 className="relative text-slate-600 font-medium max-w-3xl z-10 text-lg">
            SyncRetreat is a premium, productivity-focused environment for
            ambitious remote professionals. We curate a community of driven
            peers—founders, freelancers, designers, marketers, and more—who come
            together to focus, collaborate, and scale.
          </h3>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto my-10">
        {principles.map((principle, index) => (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-50/0 group-hover:bg-emerald-50/50 transition-all duration-500" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {principle.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-slate-600 mb-3 font-medium">
                {principle.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual Break: Quote Section */}
      <div className="relative rounded-2xl overflow-hidden my-20 h-64 flex items-center justify-center max-w-5xl mx-auto border border-slate-200 shadow-sm bg-white">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
          alt="Team collaboration"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-[#fefbf7]/60 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <p className="italic text-slate-800 text-2xl md:text-3xl font-serif mb-6 leading-relaxed">
            "You are the average of the five people you spend the most time
            with."
          </p>
          <p className="text-emerald-700 font-bold tracking-widest uppercase text-xs">
            - Jim Rohn
          </p>
        </div>
      </div>

      {/* Application Process */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-serif text-center text-slate-900 mb-6">
          The Vetting & Application Protocol
        </h2>
        <p className="text-center text-slate-600 text-lg mb-16 max-w-3xl mx-auto font-medium">
          To maintain a high standard of professionalism and community, every
          applicant goes through a careful review to ensure the best fit for our
          focused environment.
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side: Image */}
          <div className="w-full h-125 rounded-2xl overflow-hidden hidden md:block border border-slate-200 relative bg-white shadow-md">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
              alt="Alignment Call"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent z-0" />
            <div className="absolute bottom-6 left-6 text-white font-bold uppercase tracking-widest text-[11px] z-10">
              Step 2: The Alignment Call
            </div>
          </div>

          {/* Right side: Text Steps */}
          <div className="space-y-10">
            {applicationSteps.map((step, idx) => (
              <div key={step.title} className="relative pl-10">
                <div className="absolute left-0 top-0 text-emerald-600 font-black text-2xl opacity-40">
                  {idx + 1}.
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium text-[15px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Architecture */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-serif text-center text-slate-900 mb-16">
          The 28-Day Productivity Framework
        </h2>
        <div className="grid md:grid-cols-2 gap-12 mb-8 items-center">
          <div className="space-y-8">
            {deploymentArchitecture.map((item) => (
              <div key={item.title}>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 font-medium text-[15px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                alt="Deep Work Execution"
                className="rounded-xl w-full h-40 object-cover hover:scale-105 transition-transform duration-500 shadow-sm border border-slate-200"
              />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                alt="Himalayan Isolation"
                className="rounded-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-500 shadow-sm border border-slate-200"
              />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 pt-12">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
                alt="Team Deep Work Session"
                className="rounded-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-500 shadow-sm border border-slate-200"
              />
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80"
                alt="Strategy Planning"
                className="rounded-xl w-full h-40 object-cover hover:scale-105 transition-transform duration-500 shadow-sm border border-slate-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-serif text-center text-slate-900 mb-6">
          Elite Peer Proximity
        </h2>
        <p className="text-center text-slate-600 text-lg mb-12 max-w-3xl mx-auto font-medium">
          Your investment is more than a workspace—it's access to a curated
          network of ambitious professionals. The ROI: uninterrupted focus,
          meaningful connections, and zero logistical friction.
        </p>
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {communityPrinciples.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-[16px] font-bold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 font-medium text-[13px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
