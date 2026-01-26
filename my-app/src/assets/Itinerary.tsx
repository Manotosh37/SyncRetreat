import { motion } from 'framer-motion';
import { Calendar, Mountain, Moon, Code } from 'lucide-react';

const schedule = [
  {
    icon: Code,
    day: 'Monday - Friday',
    title: 'Deep Work Sessions',
    description: 'Structured 4-hour focus blocks. Ship features, close tickets, build.',
    color: 'blue',
  },
  {
    icon: Mountain,
    day: 'Saturday',
    title: 'Expedition Days',
    description: 'Pangong Lake, Nubra Valley, Magnetic Hill. Luxury transport included.',
    color: 'emerald',
  },
  {
    icon: Moon,
    day: 'Sunday',
    title: 'Recovery & Reflection',
    description: 'Optional dark sky stargazing, wellness sessions, or pure rest.',
    color: 'purple',
  },
];

export default function Itinerary() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300 text-sm font-medium">28-Day Structure</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work Hard, Explore Harder
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Weekdays for shipping. Weekends for the adventure you'll remember forever.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {schedule.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-linear-to-r from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-white/20 transition-all group"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className={`p-4 bg-${item.color}-600/10 rounded-xl group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-400`} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                      {item.day}
                    </span>
                    <span className="hidden md:block text-slate-600">•</span>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-slate-400 text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">
            Flexible schedule adapts to your timezone and work commitments
          </p>
        </motion.div>
      </div>
    </section>
  );
}
