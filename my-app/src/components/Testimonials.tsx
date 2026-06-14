"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Senior Software Engineer @ Stripe",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    quote:
      "I was skeptical about the internet speed in the Himalayas, but the Dual-WAN setup is no joke. I was able to push code and take Zoom calls without a single drop. The community was an incredible bonus.",
  },
  {
    name: "David Chen",
    role: "Founder, YC W23",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    quote:
      "SyncRetreat gave me the absolute perfect environment for a 4-week sprint. Deep work in the mornings, exploring monasteries in the afternoon. I got more done here than in 3 months back in SF.",
  },
  {
    name: "Elena Rodriguez",
    role: "Product Designer @ Vercel",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop",
    quote:
      "Everything was frictionless. I didn't have to think about food, cleaning, or logistics. Surrounding myself with other ambitious builders elevated my own work. Absolutely doing this again next year.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#FEFBF7] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-emerald-600 mb-3">
            Proof of Work
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif text-slate-900">
            Don't just take our word for it.
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative"
            >
              <div className="flex gap-1 text-emerald-500 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-8 font-medium">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-emerald-100">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mt-1">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
