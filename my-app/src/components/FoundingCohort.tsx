"use client";
import { motion } from "framer-motion";
import { Users, Code, Zap } from "lucide-react";

export default function FoundingCohort() {
  return (
    <section className="py-24 bg-[#FEFBF7] text-slate-900 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 md:p-16 shadow-sm"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-emerald-600 mb-4">
            Special Invitation
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">
            Join the Founding Cohort
          </h3>
          
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto mb-12">
            We are currently accepting applications for our inaugural retreats. We are looking for a small, hand-picked group of ambitious engineers and founders to experience our infrastructure first-hand. In exchange for your early trust and feedback, you'll receive our founding member rate.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <Users className="w-8 h-8 text-emerald-500 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">Curated Group</h4>
              <p className="text-slate-600 text-sm">Limited to just 15 highly-vetted remote professionals to ensure a focused, tight-knit environment.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <Code className="w-8 h-8 text-emerald-500 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">Build & Ship</h4>
              <p className="text-slate-600 text-sm">Surround yourself with people who are actually building. No digital nomad fluff, just deep work.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <Zap className="w-8 h-8 text-emerald-500 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">Exclusive Pricing</h4>
              <p className="text-slate-600 text-sm">Lock in the lowest rate we will ever offer, secured forever as a thank you for being an early believer.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
