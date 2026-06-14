"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayInTheLife from "./DayInTheLife";
import Infra from "./Infra";
import Why from "./Why";

export default function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState("routine");

  return (
    <section className="bg-[#fefbf7] py-16 md:py-24 border-t border-slate-200 w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center mb-8">
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] mb-4">
          The Experience
        </h2>
        <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 tracking-tight mb-12">
          Everything You Need to Ship.
        </h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-xl mx-auto border border-slate-200 shadow-inner">
          <button
            onClick={() => setActiveTab("routine")}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === "routine" ? "bg-white text-emerald-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
          >
            The Routine
          </button>
          <button
            onClick={() => setActiveTab("workspace")}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === "workspace" ? "bg-white text-emerald-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
          >
            The Workspace
          </button>
          <button
            onClick={() => setActiveTab("promise")}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === "promise" ? "bg-white text-emerald-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
          >
            The Promise
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="w-full relative min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === "routine" && (
            <motion.div
              key="routine"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="-mt-16">
                <DayInTheLife />
              </div>
            </motion.div>
          )}
          
          {activeTab === "workspace" && (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="-mt-16">
                <Infra />
              </div>
            </motion.div>
          )}
          
          {activeTab === "promise" && (
            <motion.div
              key="promise"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="-mt-16">
                <Why />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
