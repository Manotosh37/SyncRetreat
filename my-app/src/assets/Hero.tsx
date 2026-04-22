import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToForm = () => {
    if (location.pathname === "/") {
      const formElement = document.getElementById("application-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/?scrollTo=application-form");
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
    <section className="relative min-h-screen bg-[#FDFCF2] text-slate-900 font-sans flex overflow-hidden">
      {/* Split layout: Left for Brand, Right for Message */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Pane: Brand Identity */}
        <motion.div
          className="w-full lg:w-5/12 p-12 lg:p-24 flex flex-col justify-center items-start z-10 pt-32 lg:pt-20 bg-[#F2EDC2]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start space-y-12"
          >
            <div className="relative">
              <img
                src="/Sync.png"
                alt="SyncRetreat Logo"
                className="w-48 h-auto relative z-10"
              />
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl" />
            </div>

            <div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]">
                SYNC
                <br />
                RETREAT<span className="text-emerald-600">.</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-0.5 bg-slate-900" />
                <p className="text-lg md:text-xl font-bold text-slate-800 uppercase tracking-widest">
                  Deep work & Explore cultures
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Pane: Video Background + New Content */}
        <div className="relative w-full lg:w-7/12 flex flex-col justify-center overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 grayscale-20 brightness-[0.7]"
            src="/video1.mp4"
          />

          {/* Right Pane Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 p-12 lg:p-24 flex flex-col justify-center max-w-3xl"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Modern Headline */}
              <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Remote work, <br />
                <span className="text-emerald-400">reimagined.</span>
              </h2>

              {/* Requested Text */}
              <p className="text-xl lg:text-2xl text-slate-200 leading-relaxed font-medium">
                We design exceptional 28-days journeys for digital nomads,
                bringing together a community of like-minded professionals.
                Whether you work fully remotely or can step away from the office
                for a while, join us to explore the world and create a better
                balance between work and life.
              </p>

              {/* Action Button */}
              <motion.div className="pt-8">
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-12 py-6 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-full flex items-center justify-center gap-4 transition-all duration-300 shadow-2xl shadow-green-500/20"
                  onClick={scrollToForm}
                >
                  <span className="text-xl tracking-wide">GET STARTED</span>
                  <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
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
