"use client";
import React, { useState } from "react";
import { Calendar, CheckCircle, X, Info } from "lucide-react";
import { RazorpayButton } from "./RazorpayButton";

interface DepositBookingCardProps {
  destination: string;
  totalPrice: number;
  depositAmount: number;
  isCompleted?: boolean; // For retreats that are done
}

export const DepositBookingCard: React.FC<DepositBookingCardProps> = ({
  destination,
  totalPrice,
  depositAmount,
  isCompleted = false,
}) => {
  const [selectedDate, setSelectedDate] = useState("October 10, 2025");
  const remainingAmount = totalPrice - depositAmount;

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
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-100 overflow-hidden sticky top-24">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-wide">
            Reserve Your Workspace
          </h2>
        </div>

        {/* Pricing Display */}
        <div className="text-center mb-6">
          <div className="text-6xl font-black text-emerald-600 mb-2">
            ${depositAmount}
          </div>
          <p className="text-slate-600 font-bold uppercase tracking-wider">
            Deposit Today
          </p>
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-300">
              <span className="text-slate-700 font-semibold uppercase text-sm tracking-wide">
                Total Trip Price
              </span>
              <span className="text-2xl font-black text-slate-900">${totalPrice}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm">Pay Today</span>
              <span className="font-bold text-slate-900">${depositAmount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm">Remaining</span>
              <span className="font-bold text-slate-900">${remainingAmount}</span>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
            Choose Your Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-semibold text-slate-900 bg-white appearance-none cursor-pointer"
            >
              <option>October 10, 2026</option>
              <option>November 15, 2026</option>
              <option>January 20, 2027</option>
            </select>
          </div>
        </div>

        <div className="border-t-2 border-slate-200 my-6"></div>

        {/* Included Section */}
        <div className="mb-6">
          <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">
            Included
          </h3>
          <div className="space-y-2.5">
            {included.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
              </div>
            ))}
            <button className="text-sm text-emerald-600 font-bold hover:text-emerald-700 transition-colors pl-8">
              + {included.length - 3} more...
            </button>
          </div>
        </div>

        <div className="border-t-2 border-slate-200 my-6"></div>

        {/* Not Included Section */}
        <div className="mb-6">
          <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider">
            Not Included
          </h3>
          <div className="space-y-2.5">
            {notIncluded.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <X className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
              </div>
            ))}
            <button className="text-sm text-slate-600 font-bold hover:text-slate-700 transition-colors pl-8">
              + {notIncluded.length - 3} more...
            </button>
          </div>
        </div>

        <div className="border-t-2 border-slate-200 my-6"></div>

        {/* Payment Button */}
        {isCompleted ? (
          <div className="bg-slate-100 border-2 border-slate-300 rounded-xl p-6 text-center">
            <p className="text-slate-600 font-bold uppercase tracking-wider text-sm mb-2">
              This Retreat is Complete
            </p>
            <p className="text-slate-500 text-xs">
              Check back soon for upcoming dates
            </p>
          </div>
        ) : (
          <>
            <RazorpayButton
              amount={depositAmount}
              destination={destination}
              onSuccess={(details) => console.log("Deposit paid:", details)}
            />

            {/* Info Text */}
            <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed">
              Secure payment • Refundable up to 60 days before retreat
            </p>
          </>
        )}
      </div>
    </div>
  );
};
