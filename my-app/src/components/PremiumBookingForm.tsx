"use client";
import React, { useState } from "react";
import { X, Calendar, CheckCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { RazorpayButton } from "./RazorpayButton";

interface DepositBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  totalPrice: number;
  depositAmount: number;
}

export const DepositBookingModal: React.FC<DepositBookingModalProps> = ({
  isOpen,
  onClose,
  destination,
  totalPrice,
  depositAmount,
}) => {
  const [selectedDate, setSelectedDate] = useState("October 10, 2025");
  const remainingAmount = totalPrice - depositAmount;

  if (!isOpen) return null;

  const included = [
    "Private airport transfers",
    "Private transportation during retreat",
    "Private ensuite accommodation",
    "Co-working space with high-speed internet",
    "Welcome dinner & farewell dinner",
    "Weekend adventure excursions",
    "Community events & workshops",
  ];

  const notIncluded = [
    "International flights to India",
    "Travel insurance",
    "Personal expenses",
    "Additional meals not specified",
    "Visa fees",
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl w-full max-w-lg relative shadow-2xl my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Reserve Your Workspace
            </h2>
            <p className="text-slate-600">Secure your spot with a deposit</p>
          </div>

          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white mb-6">
            <div className="text-center mb-4">
              <div className="text-5xl font-black mb-2">
                ${depositAmount}
              </div>
              <p className="text-emerald-100 font-semibold">DEPOSIT TODAY</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-100">Total Trip Price</span>
                <span className="font-bold">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-100">Pay Today</span>
                <span className="font-bold">${depositAmount}</span>
              </div>
              <div className="border-t border-white/20 pt-2 flex justify-between">
                <span className="text-emerald-100">Remaining</span>
                <span className="font-bold text-lg">${remainingAmount}</span>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Choose Your Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-semibold"
              >
                <option>October 10, 2025</option>
                <option>November 15, 2025</option>
                <option>December 20, 2025</option>
              </select>
            </div>
          </div>

          {/* Included Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
              Included
            </h3>
            <div className="space-y-2">
              {included.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
              <button className="text-sm text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                + {included.length - 4} more included
              </button>
            </div>
          </div>

          {/* Not Included Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
              Not Included
            </h3>
            <div className="space-y-2">
              {notIncluded.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Payment Schedule</p>
                <p>Final payment of ${remainingAmount} due 30 days before retreat start date</p>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <RazorpayButton
            amount={depositAmount}
            destination={destination}
            onSuccess={(details) => console.log("Deposit paid:", details)}
          />

          <p className="text-xs text-center text-slate-500 mt-4">
            Secure payment powered by Razorpay • $299 deposit is non-refundable • Balance due 30 days before the retreat
          </p>
        </div>
      </motion.div>
    </div>
  );
};
