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
        <div className="relative rounded-2xl overflow-hidden mb-16 h-80 flex flex-col justify-center items-center text-center px-4">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
            alt="Premium Workspace" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black" />
          <h1 className="relative text-4xl md:text-5xl font-serif text-white mb-6 z-10">
            The SyncRetreat Operating Principles
          </h1>
          <h3 className="relative text-gray-300 max-w-3xl z-10 text-lg">
            SyncRetreat is a premium, productivity-focused environment for ambitious remote professionals. We curate a community of driven peers—founders, freelancers, designers, marketers, and more—who come together to focus, collaborate, and scale.
          </h3>
        </div>
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
        {/* Visual Break: Quote Section */}
        <div className="relative rounded-2xl overflow-hidden my-20 h-64 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80" 
            alt="Team collaboration" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-8 max-w-4xl">
            <p className="italic text-gray-200 text-2xl md:text-3xl font-serif mb-4 shadow-black drop-shadow-lg">
              "You are the average of the five people you spend the most time with."
            </p>
            <p className="text-blue-400 font-bold tracking-widest uppercase text-sm">- Jim Rohn</p>
          </div>
        </div>

        {/* Replacement 2: The Application Process */}
        {/* Replacement 2: The Application Process (Split Layout) */}
        <section className="max-w-5xl mx-auto py-16 px-4">
          <h2 className="text-4xl font-serif text-center text-white mb-6">
            The Vetting & Application Protocol
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
            To maintain a high standard of professionalism and community, every applicant goes through a careful review to ensure the best fit for our focused environment.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side: Image */}
            {/* Left side: Image (BULLETPROOF VERSION) */}
            <div className="w-full h-500px rounded-2xl overflow-hidden hidden md:block border border-white/10 relative bg-zinc-900">
              <img 
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" 
                alt="Alignment Call" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Using Tailwind v3 compatible gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent z-0" />
              <div className="absolute bottom-6 left-6 text-white font-bold uppercase tracking-widest text-sm z-10">
                Step 2: The Alignment Call
              </div>
            </div>

            {/* Right side: Text Steps */}
            <div className="space-y-8">
              {applicationSteps.map((step, idx) => (
                <div key={step.title} className="relative pl-8">
                  <div className="absolute left-0 top-1 text-blue-500 font-bold text-xl">
                    {idx + 1}.
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
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
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                alt="Deep Work Execution"
                className="rounded-xl w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
              />
              <img
                src="data:image/jpeg;base64,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"
                alt="Himalayan Isolation"
                className="rounded-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Right Column */}
            <div className="flex flex-col gap-4 pt-12">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                alt="Founders Collaborating"
                className="rounded-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <img
                src="data:image/jpeg;base64,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"
                alt="Clean Desk Workspace"
                className="rounded-xl w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
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
    
  );
}