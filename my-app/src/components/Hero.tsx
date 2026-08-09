"use client";
import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import Image from "next/image";

export default function Hero() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToForm = () => {
    if (pathname === "/") {
      const formElement = document.getElementById("application-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/?scrollTo=application-form");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <section className="relative bg-[#FEFBF7] text-slate-900 font-sans overflow-hidden">
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      {/* Split layout: Left for Brand, Right for Message */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Pane: Brand Identity */}
        <motion.div
          className="w-full lg:w-5/12 px-6 pt-24 pb-8 lg:p-24 lg:pt-20 flex flex-col justify-center items-start z-10 bg-[#F2EDC2]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start space-y-6 lg:space-y-12"
          >
            <div className="relative">
              <Image
                src="/Sync.png"
                alt="SyncRetreat Logo"
                width={192}
                height={80}
                className="w-28 lg:w-48 h-auto relative z-10 mix-blend-multiply"
              />
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl" />
            </div>

            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight text-slate-900 mb-4 lg:mb-8 leading-[0.9]">
                SYNC
                <br />
                RETREAT<span className="text-emerald-600">.</span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="w-8 lg:w-12 h-0.5 bg-slate-900" />
                <p className="text-sm lg:text-xl font-bold text-slate-800 uppercase tracking-widest">
                  Deep work & Explore cultures
                </p>
              </div>
              <a 
                href="https://chat.whatsapp.com/K8OntEo4WTkAfX2iGA9Io9"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-emerald-700 hover:text-emerald-600 transition-colors group"
              >
                <span>Join our community</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Pane: Video Background + New Content */}
        <div className="relative w-full lg:w-7/12 min-h-[60vh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 grayscale-20 brightness-[0.7]"
            src="/video1.mp4"
            aria-label="SyncRetreat promotional video"
            title="Remote work retreat experience"
            onError={(e) => {
              console.error('Video failed to load');
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Right Pane Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 px-6 py-10 lg:p-24 flex flex-col justify-center max-w-3xl"
          >
            <motion.div
              variants={itemVariants}
              className="space-y-4 lg:space-y-8"
            >
              {/* Modern Headline */}
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Tech-focused <br />
                <span className="text-emerald-400">co-living.</span>
              </h2>

              {/* Requested Text */}
              <p className="text-base lg:text-2xl text-slate-200 leading-relaxed font-medium">
                We build high-speed internet digital nomad retreats in Ladakh
                and Varkala. Join our exclusive co-living spaces designed strictly
                for software developers, remote professionals, and remote
                founders who want to ship products while exploring the world.
              </p>

              {/* Action Button */}
              <motion.div className="pt-2 lg:pt-8">
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 lg:px-12 lg:py-6 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl shadow-green-500/20 min-h-[44px] touch-manipulation focus:ring-4 focus:ring-emerald-500/50 focus:outline-none"
                  onClick={() => {
                    if ('vibrate' in navigator) {
                      navigator.vibrate(10);
                    }
                    scrollToForm();
                  }}
                  aria-label="Apply for your spot at SyncRetreat"
                >
                  <span className="text-base lg:text-xl tracking-wide">
                    APPLY FOR YOUR SPOT
                  </span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute bottom-12 right-12 z-10 opacity-20 hidden lg:block">
            <div className="flex items-center gap-4 text-white">
              <div className="w-20 h-px bg-white" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase">
                Est. 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
