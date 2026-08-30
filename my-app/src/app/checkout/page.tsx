"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";

// ─── Types ───────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  plan: string;
  destination: string;
  notes: string;
}

// ─── Pricing Plans ───────────────────────────────────────────
const pricingPlans = {
  "varkala-14day": {
    id: "varkala-14day",
    label: "14-Day Varkala Workation",
    destination: "Varkala, Kerala",
    price: 1520,
    deposit: 299,
    duration: "14 days",
    startDate: "August 10, 2025",
    completed: false,
    popular: false,
  },
  "varkala-28day": {
    id: "varkala-28day",
    label: "28-Day Varkala Workation",
    destination: "Varkala, Kerala",
    price: 1799,
    deposit: 299,
    duration: "28 days",
    startDate: "August 10, 2025",
    popular: true,
    completed: false,
  },
  "varkala-combo": {
    id: "varkala-combo",
    label: "Varkala Combo (14+28 Days)",
    destination: "Varkala, Kerala",
    price: 3000,
    deposit: 299,
    duration: "42 days total",
    startDate: "August 10, 2025",
    completed: false,
    popular: false,
  },
  "ladakh-28day": {
    id: "ladakh-28day",
    label: "28-Day Ladakh Sprint",
    destination: "Leh, Ladakh",
    price: 1499,
    deposit: 299,
    duration: "28 days",
    startDate: "August 3-31, 2026",
    completed: true,
    popular: false,
  },
  enterprise: {
    id: "enterprise",
    label: "Enterprise / Custom Plan",
    destination: "Custom Location",
    price: 0,
    deposit: 0,
    duration: "Custom",
    startDate: "",
    completed: false,
    popular: false,
  },
  yearly: {
    id: "yearly",
    label: "Yearly Pass",
    destination: "All Locations",
    price: 0,
    deposit: 0,
    duration: "Annual",
    startDate: "",
    completed: false,
    popular: false,
  },
};



function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─── Checkout Content Component ──────────────────────────────
function CheckoutContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"form" | "success" | "enterprise">("form");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get plan from URL or default to varkala-28day
  const planParam = searchParams.get("plan") || "varkala-28day";
  const selectedPlanData = pricingPlans[planParam as keyof typeof pricingPlans] || pricingPlans["varkala-28day"];
  
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    plan: selectedPlanData.id,
    destination: selectedPlanData.destination,
    notes: "",
  });

  const currentPlan = pricingPlans[form.plan as keyof typeof pricingPlans];
  const isEnterprise = form.plan === "enterprise" || form.plan === "yearly";
  const isCompleted = currentPlan.completed;
  const depositAmount = currentPlan.deposit;

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle enterprise/custom plans
    if (isEnterprise) {
      setStep("enterprise");
      return;
    }

    // Handle completed retreats
    if (isCompleted) {
      alert("This retreat has been completed. Please choose an upcoming date.");
      return;
    }

    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all required fields.");
      return;
    }

    setIsProcessing(true);
    const ok = await loadRazorpay();
    if (!ok) {
      alert("Failed to load payment gateway. Please try again.");
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create Order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: depositAmount,
          currency: "USD",
          receipt: `receipt_${Date.now()}`,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const orderData = await orderResponse.json();

      // 2. Open Razorpay
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        name: "SyncRetreat",
        description: `${currentPlan.label} - Deposit`,
        image: "/logo2.png",
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          plan: currentPlan.label,
          destination: currentPlan.destination,
          city: form.city,
        },
        theme: {
          color: "#059669",
        },
        handler: async function (response: RazorpayResponse) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                bookingDetails: {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  city: form.city,
                  plan: currentPlan.label,
                  destination: currentPlan.destination,
                  amount: orderData.amount,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.isValid) {
              setStep("success");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (e) {
            console.error(e);
            alert("Error verifying payment.");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl w-full mx-auto">
        {/* Back Link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors mb-8 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Pricing</span>
        </Link>

        <AnimatePresence mode="wait">
          {/* ── Enterprise Contact ── */}
          {step === "enterprise" && (
            <motion.div
              key="enterprise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-10 text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                We&apos;ll Be In Touch!
              </h2>
              <p className="text-slate-600 text-sm mb-8 max-w-md mx-auto">
                Our team will reach out to you at <strong>{form.email}</strong> within 24 hours with a custom quote for your needs.
              </p>
              <a
                href="mailto:hello@syncretreat.com"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
              >
                Email Us Directly
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </motion.div>
          )}

          {/* ── Success ── */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-white p-10 md:p-14 rounded-3xl border border-slate-200 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-emerald-500/5 blur-3xl" />
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </motion.div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  Deposit Received!
                </h2>
                <p className="text-slate-600 mb-2 max-w-md mx-auto">
                  Your ${depositAmount} deposit for <strong>{currentPlan.label}</strong> is confirmed.
                </p>
                <p className="text-slate-500 text-sm mb-10">
                  A confirmation has been sent to {form.email}. Our team will follow up within 24 hours.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20"
                >
                  Return to Home
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* ── Form ── */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                  Reserve Your Spot
                </h1>
                <p className="text-slate-600 max-w-md mx-auto">
                  Secure your retreat with a ${depositAmount} refundable deposit
                </p>
              </div>

              <form
                onSubmit={handlePayment}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
              >
                {/* Selected Plan Display */}
                <div className="p-8 bg-gradient-to-br from-emerald-50 to-white border-b border-slate-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                        You&apos;re Booking
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {currentPlan.label}
                      </h3>
                      <p className="text-sm text-slate-600 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {currentPlan.destination}
                      </p>
                      {currentPlan.startDate && (
                        <p className="text-sm text-slate-600 flex items-center gap-1.5 mt-1">
                          <Calendar className="w-4 h-4" />
                          Starting {currentPlan.startDate}
                        </p>
                      )}
                      {currentPlan.popular && (
                        <span className="inline-block mt-2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      )}
                      {isCompleted && (
                        <span className="inline-block mt-2 bg-slate-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    {!isEnterprise && (
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                          Deposit Today
                        </p>
                        <p className="text-3xl font-bold text-emerald-600">
                          ${depositAmount}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          of ${currentPlan.price} total
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="p-8 border-b border-slate-200">
                  <label className="block text-sm font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-600" />
                    Your Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="John Doe"
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="john@example.com"
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+1 234 567 8900"
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="San Francisco"
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-slate-700 mb-2">
                      Special Requests (optional)
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Dietary requirements, accessibility needs, etc."
                      rows={3}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="p-8 bg-slate-50">
                  <button
                    type="submit"
                    disabled={isProcessing || isCompleted}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 disabled:shadow-none flex items-center justify-center gap-3 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : isCompleted ? (
                      "This Retreat is Completed"
                    ) : isEnterprise ? (
                      <>
                        <Mail className="w-5 h-5" />
                        Request Custom Quote
                      </>
                    ) : (
                      <>
                        Pay ${depositAmount} Deposit
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    {isEnterprise
                      ? "We'll respond within 24 hours"
                      : "Secured by Razorpay • Refundable up to 60 days before retreat"}
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Checkout Component with Suspense ───────────────────
export default function CheckoutPage() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading checkout...</p>
            </div>
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
    </>
  );
}
