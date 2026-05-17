"use client";
import { useState } from "react";
import {
  ChevronRight,
  Globe,
  Calendar,
  Briefcase,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Step = 1 | 2 | 3 | 4;

export default function VisaCheckerTool() {
  const [step, setStep] = useState<Step>(1);
  const [nationality, setNationality] = useState("");
  const [duration, setDuration] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleNext = () => setStep((s) => (s + 1) as Step);
  const handleReset = () => {
    setNationality("");
    setDuration("");
    setPurpose("");
    setStep(1);
  };

  const getResult = () => {
    if (purpose === "local_employment") {
      return {
        eligible: false,
        title: "e-Visa Not Applicable",
        desc: "You cannot seek local Indian employment on an e-Visa. You must apply for a standard Employment (E) Visa through an Indian embassy.",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
      };
    }

    if (duration === "long") {
      return {
        eligible: true,
        title: "1-Year or 5-Year e-Tourist Visa",
        desc: "As a remote worker maintaining foreign employment, you should apply for the multiple-entry e-Tourist visa. Note: Continuous stay during each visit shall not exceed 90 days (180 days for US/UK nationals).",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
      };
    }

    return {
      eligible: true,
      title: "30-Day e-Tourist Visa",
      desc: "Perfect for a short sprint. The 30-day double-entry e-Tourist visa allows you to work remotely for your foreign employer while exploring India.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    };
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden max-w-2xl mx-auto min-h-100 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-serif mb-2">
          India e-Visa Calculator
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          For Remote Workers & Digital Nomads
        </p>

        {/* Progress Bar */}
        <div className="flex gap-2 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${step >= i ? "bg-emerald-500" : "bg-slate-700"}`}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6 text-emerald-600">
                <Globe className="w-6 h-6" />
                <h3 className="text-xl font-bold text-slate-900">
                  What is your passport nationality?
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "United States",
                  "United Kingdom",
                  "Canada",
                  "Australia",
                  "EU Member",
                  "Other (Eligible)",
                ].map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      setNationality(country);
                      handleNext();
                    }}
                    className="p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-left font-bold text-slate-700 transition-colors"
                  >
                    {country}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-6">
                *India offers e-Visas to over 160 countries.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6 text-emerald-600">
                <Calendar className="w-6 h-6" />
                <h3 className="text-xl font-bold text-slate-900">
                  How long do you plan to stay?
                </h3>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setDuration("short");
                    handleNext();
                  }}
                  className="w-full p-5 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 text-lg mb-1">
                      Less than 30 days
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                      A short sprint or retreat
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </button>
                <button
                  onClick={() => {
                    setDuration("long");
                    handleNext();
                  }}
                  className="w-full p-5 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 text-lg mb-1">
                      More than 30 days
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                      A long-term deep work phase
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-6 text-emerald-600">
                <Briefcase className="w-6 h-6" />
                <h3 className="text-xl font-bold text-slate-900">
                  What is the nature of your work?
                </h3>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setPurpose("remote_foreign");
                    handleNext();
                  }}
                  className="w-full p-5 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 text-lg mb-1">
                      Remote Work (Foreign Employer)
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                      I work for a company outside India or own a foreign
                      business.
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </button>
                <button
                  onClick={() => {
                    setPurpose("local_employment");
                    handleNext();
                  }}
                  className="w-full p-5 rounded-xl border-2 border-slate-100 hover:border-red-500 hover:bg-red-50 text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 text-lg mb-1">
                      Local Employment
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                      I am seeking employment with an Indian company.
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {(() => {
                const res = getResult();
                return (
                  <div>
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${res.bg} ${res.color}`}
                    >
                      {res.eligible ? (
                        <CheckCircle2 className="w-8 h-8" />
                      ) : (
                        <AlertCircle className="w-8 h-8" />
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">
                      {res.title}
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed max-w-md mx-auto mb-8">
                      {res.desc}
                    </p>

                    {res.eligible && (
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
                        <p className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">
                          Next Step
                        </p>
                        <p className="text-slate-600 mb-4 font-medium">
                          Visa sorted? Now secure your infrastructure. Don't
                          gamble with hotel Wi-Fi.
                        </p>
                        <Link
                          href="/locations/ladakh"
                          className="block w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
                        >
                          View Upcoming Retreats
                        </Link>
                      </div>
                    )}

                    <button
                      onClick={handleReset}
                      className="text-sm font-bold text-slate-400 hover:text-slate-600 underline underline-offset-4"
                    >
                      Start Over
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
