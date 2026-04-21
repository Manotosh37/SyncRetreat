import { motion, Variants } from "framer-motion";
import {
  Server,
  Terminal,
  Clock,
  Activity,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
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
    <section className="relative min-h-screen bg-[#F2EDC2] text-slate-800 font-sans flex overflow-hidden">
      {/* Full width split container without boxing */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Pane: STRICTLY Logo, Name, Tagline */}
        <motion.div
          className="w-full lg:w-5/12 p-12 lg:p-20 flex flex-col justify-center items-start z-10 pt-32 lg:pt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start space-y-8"
          >
            <img
              src="/Sync.png"
              alt="SyncRetreat Logo"
              className="w-40 h-auto"
            />
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-widest text-slate-900 mb-6">
                SYNCRETREAT<span className="text-emerald-900">.</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-slate-700 tracking-wide border-l-4 border-slate-900 pl-5 leading-relaxed">
                Deep work and Travel, <br className="hidden xl:block" />{" "}
                Redefined.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Pane: Video Background + Content in Dark */}
        <div className="relative w-full lg:w-7/12 flex flex-col justify-center border-l border-slate-900/10">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/video.mp4"
          />
          {/* Dark Glassmorphism Overlay */}

          {/* Right Pane Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 p-10 lg:p-20 flex flex-col justify-center space-y-10"
          >
            {/* What exactly it is */}
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> System Overview
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed font-medium">
                We solve the{" "}
                <strong className="text-white font-bold">
                  retention crisis
                </strong>{" "}
                and synchronous communication fatigue crippling Western tech
                hubs. An{" "}
                <strong className="text-white font-bold">
                  Infrastructure-as-a-Service (IaaS)
                </strong>{" "}
                applied to physical hospitality, relocating your engineers to
                extreme-isolation nodes in the Himalayas for a strict 28-day
                sprint.
              </p>
            </motion.div>

            {/* What we are providing & Who is it for */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xs"
              >
                <Server className="w-6 h-6 text-green-400 mb-4" />
                <h4 className="text-white font-bold text-lg mb-2">
                  Physical Layer
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Bonded dual-WAN load balancers and multi-tiered N+1 power
                  backups.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xs"
              >
                <Clock className="w-6 h-6 text-green-400 mb-4" />
                <h4 className="text-white font-bold text-lg mb-2">
                  Protocol Layer
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  5-hour asynchronous "Ghost Mode" enforced by Indian Standard
                  Time shift.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:col-span-2 shadow-xs"
              >
                <Activity className="w-6 h-6 text-green-400 mb-4" />
                <h4 className="text-white font-bold text-lg mb-2">
                  Target Allocation
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Designed for remote professionals, founders, engineers, and
                  senior operators seeking uninterrupted deep work in an
                  extreme-focus environment.
                </p>
              </motion.div>
            </div>

            {/* Action / CTA */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-slate-800"
            >
              <div className="flex flex-col items-start gap-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-10 py-5 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20"
                  onClick={scrollToForm}
                >
                  <ShieldCheck className="w-6 h-6" />
                  APPLY FOR RETREAT
                  <ChevronRight className="w-6 h-6 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
