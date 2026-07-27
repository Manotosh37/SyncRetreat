"use client";
import { motion } from "framer-motion";
import { Clock, Coffee, Monitor, Users, Map, Sunset } from "lucide-react";

const schedule = [
  {
    time: "08:00 AM",
    title: "Sunrise & Fuel",
    description: "Start the day with local coffee or optional sunrise yoga. Set your intentions.",
    icon: <Coffee className="w-6 h-6 text-emerald-600" />,
  },
  {
    time: "09:30 AM",
    title: "Deep Work Sprint",
    description: "Absolute silence in the co-working space. High-speed Dual-WAN keeps you connected.",
    icon: <Monitor className="w-6 h-6 text-emerald-600" />,
  },
  {
    time: "01:00 PM",
    title: "Community Lunch",
    description: "Break bread with fellow founders and engineers. Exchange ideas and relax.",
    icon: <Users className="w-6 h-6 text-emerald-600" />,
  },
  {
    time: "02:30 PM",
    title: "Async / Strategy",
    description: "Take calls, review pull requests, or map out your next product launch.",
    icon: <Clock className="w-6 h-6 text-emerald-600" />,
  },
  {
    time: "06:00 PM",
    title: "Explore & Unwind",
    description: "Discover local culture, hike nearby trails, or join a networking session.",
    icon: <Map className="w-6 h-6 text-emerald-600" />,
  },
];

export default function DayInTheLife() {
  return (
    <section className="bg-[#FEFBF7] py-16 md:py-28 px-6 md:px-12 w-full overflow-hidden border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mb-4">
            The Routine
          </h2>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Your Day @ SyncRetreat
          </h2>
          <p className="text-slate-600 font-medium text-lg max-w-2xl mx-auto">
            We handle the logistics so you can focus on building, networking, and experiencing the world.
          </p>
        </motion.div>

        <div className="space-y-8 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2 hidden md:block" />

          {schedule.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Desktop Time (Left or Right) */}
              <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                <span className="text-2xl font-black text-slate-300">{item.time}</span>
              </div>

              {/* Center Icon */}
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-emerald-50 border-4 border-white shadow-sm flex items-center justify-center md:-ml-6 lg:ml-0 md:-mr-6 lg:mr-0 mx-auto md:mx-0">
                {item.icon}
              </div>

              {/* Content Box */}
              <div className="flex-1 w-full md:w-1/2 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="md:hidden mb-2">
                  <span className="text-sm font-bold text-emerald-600">{item.time}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
