'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Mountain, Moon, Code, ChevronDown } from 'lucide-react';

const schedule = [
  {
    id: 'work',
    icon: Code,
    day: 'Monday – Friday',
    number: '01',
    title: 'Deep Work Sessions',
    description:
      'Structured 4-hour focus blocks with fiber internet. Ship features, close tickets, build what matters.',
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.25)',
    stats: [
      { label: 'Focus', value: '4h/day' },
      { label: 'Speed', value: '500Mbps' },
      { label: 'Days', value: '20' },
    ],
    detail:
      'Ergonomic workstations, noise-canceling environment, dedicated Zoom rooms, and standing desk setups. Your best code will be written here.',
    bgSymbol: '</>',
  },
  {
    id: 'explore',
    icon: Mountain,
    day: 'Saturday',
    number: '02',
    title: 'Expedition Days',
    description:
      'Pangong Lake, Nubra Valley, Magnetic Hill. Curated expeditions with luxury transport included.',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.25)',
    stats: [
      { label: 'Destinations', value: '3+' },
      { label: 'Altitude', value: '4,350m' },
      { label: 'Transport', value: 'Luxury' },
    ],
    detail:
      'Private 4×4 vehicles, expert local guides, gourmet packed lunches. The kind of scenery that resets your entire nervous system.',
    bgSymbol: '▲',
  },
  {
    id: 'rest',
    icon: Moon,
    day: 'Sunday',
    number: '03',
    title: 'Recovery & Reflection',
    description:
      'Optional dark sky stargazing, wellness sessions, breathwork, or pure unstructured rest.',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.25)',
    stats: [
      { label: 'Star Visibility', value: '95%' },
      { label: 'Activities', value: '5+' },
      { label: 'Commitment', value: 'Zero' },
    ],
    detail:
      'Telescope access, meditation pods, journaling kits, and celestial guides. No agenda, no meetings — just you and 5,000 stars.',
    bgSymbol: '◎',
  },
];

export default function Itinerary() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="relative py-28 min-h-screen overflow-hidden bg-[#05050a]">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,5,10,0.85) 100%)',
        }}
      />

      {/* Ambient glow blobs */}
      <motion.div
        className="absolute top-20 left-1/4 w-125 h-125 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-125 h-125 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1.15, 1, 1.15], opacity: [1, 0.6, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-8 rounded-full relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* shimmer sweep */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span
              className="text-xs text-slate-300 uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              28-Day Structure
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          <h2
            className="text-5xl md:text-[5.5rem] font-black text-white mb-6 leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Structure you get,{' '}
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)',
              }}
            >
              
            </span>
          </h2>

          <p
            className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Weekdays for shipping. Weekends for cognitive recovery and{' '}
            <span className="text-slate-400">high-level networking.</span>
          </p>
        </motion.div>

        {/* ── Cards ──────────────────────────────────────────────── */}
        <div className="space-y-4">
          {schedule.map((item, index) => {
            const isActive = activeCard === item.id;
            const isHovered = hoveredCard === item.id;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onHoverStart={() => setHoveredCard(item.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() =>
                  setActiveCard(isActive ? null : item.id)
                }
                className="cursor-pointer"
              >
                <motion.div
                  animate={{
                    y: isHovered ? -4 : 0,
                    scale: isHovered ? 1.005 : 1,
                  }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid ${
                      isHovered || isActive
                        ? item.color + '35'
                        : 'rgba(255,255,255,0.055)'
                    }`,
                    transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                    boxShadow:
                      isHovered || isActive
                        ? `0 0 40px ${item.glow}, 0 20px 60px rgba(0,0,0,0.4)`
                        : '0 4px 20px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Left accent bar */}
                  <motion.div
                    className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                    style={{ background: item.color }}
                    animate={{ opacity: isHovered || isActive ? 1 : 0.2 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Radial glow from left */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: `radial-gradient(ellipse at -5% 50%, ${item.glow}, transparent 55%)`,
                    }}
                  />

                  {/* Background watermark symbol */}
                  <div
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-[7rem] font-black select-none pointer-events-none"
                    style={{
                      color: item.color,
                      opacity: isHovered ? 0.055 : 0.025,
                      fontFamily: 'monospace',
                      transition: 'opacity 0.45s ease',
                      lineHeight: 1,
                    }}
                  >
                    {item.bgSymbol}
                  </div>

                  {/* Card content */}
                  <div className="relative p-7 md:p-8">
                    <div className="flex items-start gap-6">

                      {/* Icon block */}
                      <div className="shrink-0 flex flex-col items-center gap-2.5">
                        <motion.div
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                            boxShadow: isHovered
                              ? `0 0 24px ${item.glow}`
                              : '0 0 0px transparent',
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{
                            background: `${item.color}12`,
                            border: `1px solid ${item.color}28`,
                          }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: item.color }}
                          />
                        </motion.div>
                        <span
                          className="text-[10px] font-mono font-bold"
                          style={{ color: item.color + '70' }}
                        >
                          {item.number}
                        </span>
                      </div>

                      {/* Text + stats */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <span
                              className="text-[10px] uppercase tracking-[0.22em] mb-1.5 block"
                              style={{
                                color: item.color + 'aa',
                                fontFamily: "'Space Mono', monospace",
                              }}
                            >
                              {item.day}
                            </span>
                            <h3
                              className="text-2xl md:text-[1.65rem] font-bold text-white leading-tight"
                              style={{ fontFamily: "'Syne', sans-serif" }}
                            >
                              {item.title}
                            </h3>
                          </div>

                          {/* Expand chevron */}
                          <motion.div
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="shrink-0 mt-1 opacity-40"
                          >
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          </motion.div>
                        </div>

                        <p
                          className="text-slate-400 leading-relaxed mb-5 text-[0.93rem]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.description}
                        </p>

                        {/* Stat pills */}
                        <div className="flex flex-wrap gap-2.5">
                          {item.stats.map((stat) => (
                            <motion.div
                              key={stat.label}
                              whileHover={{ scale: 1.04 }}
                              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg"
                              style={{
                                background: `${item.color}0e`,
                                border: `1px solid ${item.color}22`,
                              }}
                            >
                              <span
                                className="text-[11px] text-slate-500"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                {stat.label}
                              </span>
                              <span
                                className="text-[11px] font-bold"
                                style={{
                                  color: item.color,
                                  fontFamily: "'Space Mono', monospace",
                                }}
                              >
                                {stat.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Expandable detail */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div
                            className="mt-6 pt-5 pl-20"
                            style={{ borderTop: `1px solid ${item.color}18` }}
                          >
                            <p
                              className="text-slate-400 text-sm leading-relaxed"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              {item.detail}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p
            className="text-slate-600 text-[11px] uppercase tracking-[0.25em]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Flexible schedule adapts to your timezone and work commitments
          </p>
        </motion.div>
      </div>
    </section>
  );
}