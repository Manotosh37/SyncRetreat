"use client";
import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/AuthContext";
import { useRouter } from "next/navigation";

interface StepProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  onNext?: () => void;
  onBack?: () => void;
  isFirst: boolean;
  isLast: boolean;
  errors?: Record<string, string>;
}

const Step1: React.FC<StepProps> = ({ formData, onChange, onNext, errors }) => {
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canProceed = formData.name?.trim() && formData.email?.trim() && validateEmail(formData.email);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Sparkles className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Let's get started</h3>
        <p className="text-slate-600">Tell us a bit about yourself</p>
      </div>

      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all ${
            errors?.name ? "border-red-500" : "border-slate-200 focus:border-emerald-500"
          }`}
          autoFocus
        />
        {errors?.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email || ""}
          onChange={(e) => onChange("email", e.target.value)}
          className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all ${
            errors?.email ? "border-red-500" : "border-slate-200 focus:border-emerald-500"
          }`}
        />
        {errors?.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
      >
        Continue <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

const Step2: React.FC<StepProps> = ({ formData, onChange, onNext, onBack }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Contact details</h3>
      <p className="text-slate-600">How can we reach you?</p>
    </div>

    <div className="flex gap-3">
      <select
        value={formData.countryCode || "+91"}
        onChange={(e) => onChange("countryCode", e.target.value)}
        className="w-28 px-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white"
      >
        <option value="+1">🇺🇸 +1</option>
        <option value="+44">🇬🇧 +44</option>
        <option value="+91">🇮🇳 +91</option>
        <option value="+61">🇦🇺 +61</option>
      </select>
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone || ""}
        onChange={(e) => onChange("phone", e.target.value)}
        className="flex-1 px-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
      />
    </div>

    <div className="flex gap-3">
      <button
        onClick={onBack}
        className="px-6 py-4 border-2 border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" /> Back
      </button>
      <button
        onClick={onNext}
        disabled={!formData.phone}
        className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
      >
        Continue <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

const Step3: React.FC<StepProps> = ({ formData, onChange, onNext, onBack }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Your profession</h3>
      <p className="text-slate-600">What do you do?</p>
    </div>

    <div className="grid grid-cols-2 gap-3">
      {["Software Engineer", "Product Manager", "Designer", "Founder", "Freelancer", "Other"].map((role) => (
        <button
          key={role}
          onClick={() => onChange("role", role)}
          className={`px-6 py-4 border-2 rounded-xl font-semibold transition-all ${
            formData.role === role
              ? "border-emerald-600 bg-emerald-50 text-emerald-900"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          {role}
        </button>
      ))}
    </div>

    <div className="flex gap-3">
      <button
        onClick={onBack}
        className="px-6 py-4 border-2 border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" /> Back
      </button>
      <button
        onClick={onNext}
        disabled={!formData.role}
        className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
      >
        Continue <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

const Step4: React.FC<StepProps & { onSubmit: () => void; isSubmitting: boolean }> = ({
  formData,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Almost there!</h3>
      <p className="text-slate-600">Which retreat interests you?</p>
    </div>

    <div className="space-y-3">
      {[
        { value: "Varkala", label: "Varkala - Beach & Culture", desc: "$1,799/28 days" },
        { value: "Ladakh", label: "Ladakh - Mountains & Focus", desc: "$1,499/28 days" },
        { value: "Both", label: "Both Locations", desc: "Flexible dates" },
      ].map((option) => (
        <button
          key={option.value}
          onClick={() => onChange("location", option.value)}
          className={`w-full px-6 py-4 border-2 rounded-xl text-left transition-all ${
            formData.location === option.value
              ? "border-emerald-600 bg-emerald-50"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="font-bold text-slate-900">{option.label}</div>
          <div className="text-sm text-slate-600">{option.desc}</div>
        </button>
      ))}
    </div>

    <div className="p-4 bg-slate-50 rounded-xl">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.undertaking || false}
          onChange={(e) => onChange("undertaking", e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        />
        <span className="text-sm text-slate-700">
          I understand this is a co-living community, not a job application
        </span>
      </label>
    </div>

    <div className="flex gap-3">
      <button
        onClick={onBack}
        className="px-6 py-4 border-2 border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
      >
        <ChevronLeft className="w-5 h-5" /> Back
      </button>
      <button
        onClick={onSubmit}
        disabled={!formData.location || !formData.undertaking || isSubmitting}
        className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"} <Check className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

interface PremiumBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: string;
}

export const PremiumBookingForm: React.FC<PremiumBookingFormProps> = ({
  isOpen,
  onClose,
  destination,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    role: "",
    location: destination || "",
    undertaking: false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!supabase) {
      toast.error("Database unavailable", {
        description: "Please try again later.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country_code: formData.countryCode,
        destination: formData.location,
        work_designation: formData.role,
        undertaking: formData.undertaking,
        user_id: user?.id || null,
        status: "pending",
        payment_status: "unpaid",
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("bookings").insert([payload]);
      
      if (error) throw error;

      toast.success("Application submitted!", {
        description: "We'll review and get back to you within 24 hours.",
      });
      
      onClose();
      setStep(1);
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+91",
        role: "",
        location: "",
        undertaking: false,
      });

      // Optional: redirect to checkout or bookings
      // router.push('/bookings');
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const steps = [
    <Step1 key="1" formData={formData} onChange={handleChange} onNext={() => setStep(2)} onBack={() => {}} isFirst isLast={false} />,
    <Step2 key="2" formData={formData} onChange={handleChange} onNext={() => setStep(3)} onBack={() => setStep(1)} isFirst={false} isLast={false} />,
    <Step3 key="3" formData={formData} onChange={handleChange} onNext={() => setStep(4)} onBack={() => setStep(2)} isFirst={false} isLast={false} />,
    <Step4 key="4" formData={formData} onChange={handleChange} onBack={() => setStep(3)} onSubmit={handleSubmit} isSubmitting={isSubmitting} isFirst={false} isLast />,
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-emerald-600" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-8 pb-8">
          <AnimatePresence mode="wait">{steps[step - 1]}</AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
