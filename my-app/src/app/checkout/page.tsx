"use client";
import { useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import Link from 'next/link';

import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const { user } = useAuth();
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    (async function () {
      const cal = await getCalApi();
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          setIsBooked(true);
        },
      });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#059669" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Guest";

  return (
    <div className="bg-[#fefbf7] min-h-screen pt-24 pb-16 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {!isBooked ? (
            <motion.div
              key="booking-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
                  Schedule your onboarding
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  Pick a convenient time for a quick alignment call with our
                  team. We're excited to have you on board!
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100/80 p-3 rounded-2xl shadow-sm">
                      <CalendarCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        Select a Time
                      </h2>
                      <p className="text-sm text-slate-500 font-medium mt-0.5">
                        Duration: 15 minutes
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-0 bg-white w-full h-150 overflow-hidden rounded-b-3xl">
                  <Cal
                    calLink="syncretreat/meet"
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                    config={{ layout: "month_view" }}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-emerald-900/5 w-full max-w-2xl text-center relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute -top-[50%] -right-[50%] w-full h-full rounded-full bg-emerald-50/50 blur-3xl" />
                  <div className="absolute -bottom-[50%] -left-[50%] w-full h-full rounded-full bg-teal-50/50 blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 mx-auto shadow-inner border-4 border-emerald-50"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">
                    Thank you, {userName}!
                  </h2>

                  <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto leading-relaxed">
                    Your onboarding call has been successfully scheduled. We've
                    sent a calendar invitation to your email with all the
                    details.
                  </p>

                  <Link
                    href="/account"
                    className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Return to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
