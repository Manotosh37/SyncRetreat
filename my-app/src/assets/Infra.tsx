import { motion } from 'framer-motion';
import { Wifi, Armchair, Heart, Users, Car, Shield } from 'lucide-react';

const features = [
  {
    icon: Wifi,
    title: 'Connectivity',
    description: 'Dual-Line Fiber (150 Mbps) + Starlink Backup',
    detail: 'Enterprise-grade redundancy. Zero downtime, even in the Himalayas.',
  },
  {
    icon: Armchair,
    title: 'Comfort',
    description: 'Herman Miller Tier Ergonomic Chairs',
    detail: '8-hour work sessions without back pain. Premium desks with mountain views.',
  },
  {
    icon: Heart,
    title: 'Health',
    description: 'Oxygen Enrichment & 24/7 Medical Support',
    detail: 'Acclimatization support, oxygen concentrators, on-call medical staff.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Curated Group of Senior Engineers & Remote Worker',
    detail: 'No tourists. No backpackers. Just focused builders shipping products.',
  },
  {
    icon: Car,
    title: 'Weekend Tours',
    description: 'Curated Himalayan expeditions during your downtime.',
    detail:'Pre-planned group trips to Pangong Lake, Nubra Valley, and Khardung La. We handle the permits, drivers, and logistics. You just show up and explore.'
  },
  {
    icon: Shield,
    title: 'Complete Logistics',
    description: 'Complete Logistics',
    detail:'All permits, accommodation, and local coordination handled. You focus on shipping.'
  }
];

export default function Infrastructure() {
  return (
    <section className="py-24 bg-linear-to-b from-[#0a0a0a] to-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for Shipping,
            <br />
            <span className="text-slate-400">Not Just Sleeping</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-5xl mx-auto">
            This isn't a hostel with bad WiFi. It's a productivity fortress with 5-star infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-8xl mx-auto">
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
                <div className="inline-flex p-3 bg-blue-600/10 rounded-xl mb-4 group-hover:bg-blue-600/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-lg text-blue-400 mb-3 font-medium">{feature.description}</p>
                <p className="text-slate-400 leading-relaxed">{feature.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 bg-blue-600/10 border border-blue-600/30 rounded-full">
            <p className="text-blue-400 font-medium">
              Every detail engineered for maximum productivity
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
