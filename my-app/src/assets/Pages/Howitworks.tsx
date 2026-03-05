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
      "Once approved, reserve your spot with a $1,500 payment. We handle all logistics—premium housing, daily meals, and high-speed Wi-Fi—so you can focus on your work.",
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
    <div className="bg-black min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Replacement 1: The Core Values Section */}
        <h1 className="text-4xl md:text-5xl font-serif text-center text-white mb-10">
          The SyncRetreat Operating Principles
        </h1>
        <div className="flex text-gray-300 pt-2 pb-2">
          <h3>
            SyncRetreat is a premium, productivity-focused environment for ambitious remote professionals. We curate a community of driven peers—founders, freelancers, designers, marketers, and more—who come together to focus, collaborate, and scale their businesses.
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 max-w-8xl my-10">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
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
                  {principle.title}
                </h3>
                <p className="text-lg text-gray-400 mb-3 font-medium">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center py-12 px-8 border-l-4 border-white/30 bg-white/5 rounded-r-lg italic text-gray-300 text-xl font-serif">
          "You are the average of the five people you spend the most time with."
          - Jim Rohn
        </div>

        {/* Replacement 2: The Application Process */}
        <section className="max-w-4xl mx-auto py-16 px-4">
          <h2 className="text-4xl font-serif text-center text-white mb-6">
            The Vetting & Application Protocol
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
            To maintain a high standard of professionalism and community, every applicant goes through a careful review to ensure the best fit for our focused environment.
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            {applicationSteps.map((step, idx) => (
              <div key={step.title}>
                <h3 className="text-xl font-bold text-white mb-3">
                  {idx + 1}. {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Replacement 3: The Deployment Architecture */}
        <section className="max-w-5xl mx-auto py-16 px-4">
          <h2 className="text-4xl font-serif text-center text-white mb-6">
            The 28-Day Productivity Framework
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              {deploymentArchitecture.map((item) => (
                <div key={item.title}>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <img
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
                alt="Workspace"
                className="rounded-lg w-full h-64 object-cover row-span-2"
              />
              <img
                src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/b0/e5/38.jpg"
                alt="Community"
                className="rounded-lg w-full h-24 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                alt="Mastermind"
                className="rounded-lg w-full h-24 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Replacement 4: The Community Section */}
        <section className="max-w-5xl mx-auto py-16 px-4">
          <h2 className="text-4xl font-serif text-center text-white mb-6">
            Elite Peer Proximity
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
            Your investment is more than a workspace—it's access to a curated network of ambitious professionals. The ROI: uninterrupted focus, meaningful connections, and zero logistical friction.
          </p>
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {communityPrinciples.map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}