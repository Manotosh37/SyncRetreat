import { motion } from 'framer-motion';
import { CloudRain, Sun, AlertCircle, Check } from 'lucide-react';

export default function PainComparison() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why July? Why Ladakh?
          </h2>
          <p className="text-xl text-slate-400">
            While India melts, Ladakh thrives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-linear-to-br from-red-950/20 to-red-900/10 border border-red-800/30 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-600/20 rounded-lg">
                  <CloudRain className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">India in July</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-300 font-medium">40°C Heat + 90% Humidity</p>
                    <p className="text-slate-500 text-sm">Your MacBook will thank you for leaving</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-300 font-medium">Monsoon Chaos</p>
                    <p className="text-slate-500 text-sm">Floods, power cuts, internet outages</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-300 font-medium">Urban Noise Pollution</p>
                    <p className="text-slate-500 text-sm">Traffic, construction, distractions</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-linear-to-br from-blue-950/20 to-blue-900/10 border border-blue-600/30 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <Sun className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Ladakh in July</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-300 font-medium">Perfect 25°C & 0% Rain</p>
                    <p className="text-slate-500 text-sm">Ideal working temperature, zero weather stress</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-300 font-medium">Absolute Silence</p>
                    <p className="text-slate-500 text-sm">No traffic. No horns. Just focus.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-300 font-medium">Himalayan Clarity</p>
                    <p className="text-slate-500 text-sm">Crystal clear skies, mountain views, pure air</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
