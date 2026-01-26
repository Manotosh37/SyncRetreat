import { motion } from 'framer-motion';
import { Shield, Wifi, Award, CheckCircle } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Supported by Ladakh Tourism',
    description: 'Official infrastructure partnership',
  },
  {
    icon: Wifi,
    title: 'Enterprise Network Security',
    description: 'Encrypted VPN-ready connections',
  },
  {
    icon: Award,
    title: 'Curated Selection Process',
    description: 'Interview-only admissions',
  },
  {
    icon: CheckCircle,
    title: '100% Uptime Guarantee',
    description: 'Power & internet redundancy',
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-linear-to-b from-[#0f0f0f] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted Infrastructure
          </h2>
          <p className="text-xl text-slate-400">
            Backed by partners who understand the stakes
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-white/[0.07] transition-colors"
            >
              <div className="inline-flex p-3 bg-blue-600/10 rounded-lg mb-4">
                <badge.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{badge.title}</h3>
              <p className="text-slate-400 text-sm">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-linear-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/30 rounded-2xl p-8 text-center">
            <p className="text-slate-300 text-lg leading-relaxed">
              "Not your typical 'digital nomad' setup. This is where serious builders go to ship without compromise."
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <p className="text-slate-400 text-sm">Founding Member, Private Alpha</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
