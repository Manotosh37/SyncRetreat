"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Calendar, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    setPaymentId(searchParams.get("payment_id") || "");
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </motion.div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
          Booking Confirmed! 🎉
        </h1>
        
        <p className="text-center text-lg text-slate-600 mb-8">
          Your deposit has been received successfully
        </p>

        {/* Payment ID */}
        {paymentId && (
          <div className="bg-slate-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-slate-600 text-center">
              Payment ID: <span className="font-mono font-semibold">{paymentId}</span>
            </p>
          </div>
        )}

        {/* What's Next */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            What Happens Next?
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                1
              </div>
              <p className="text-slate-700">
                <strong>Confirmation Email:</strong> Check your inbox for booking details and receipt
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                2
              </div>
              <p className="text-slate-700">
                <strong>Team Contact:</strong> Our team will reach out within 24 hours to discuss your retreat
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                3
              </div>
              <p className="text-slate-700">
                <strong>Remaining Payment:</strong> Final payment due 30 days before your retreat date
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-200 pt-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
            Need Help?
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@syncretreat.com"
              className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors justify-center"
            >
              <Mail className="w-5 h-5" />
              <span>hello@syncretreat.com</span>
            </a>
            
            <a
              href="https://chat.whatsapp.com/K8OntEo4WTkAfX2iGA9Io9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors justify-center"
            >
              <Phone className="w-5 h-5" />
              <span>WhatsApp Community</span>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-bold text-center hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
          >
            Back to Home
          </Link>
          
          <Link
            href="/bookings"
            className="flex-1 border-2 border-slate-200 text-slate-900 py-4 rounded-xl font-bold text-center hover:bg-slate-50 transition-all"
          >
            View Bookings
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
