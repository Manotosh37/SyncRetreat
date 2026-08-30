"use client";
import React from "react";
import { CheckCircle, X } from "lucide-react";
import Link from "next/link";

interface DepositBookingCardProps {
  destination: string;
  totalPrice: number;
  depositAmount: number;
  isCompleted?: boolean;
  startDate?: string;
  planId?: string;
}

export const DepositBookingCard: React.FC<DepositBookingCardProps> = ({
  destination,
  totalPrice,
  depositAmount,
  isCompleted = false,
  startDate = "August 10, 2025",
  planId,
}) => {
  const remainingAmount = totalPrice - depositAmount;

  const getPlanId = () => {
    // If planId is explicitly provided, use it
    if (planId) return planId;
    
    // Otherwise, fallback to old logic
    const destLower = destination.toLowerCase();
    if (destLower.includes("varkala")) {
      if (totalPrice === 1520) return "varkala-14day";
      if (totalPrice === 1799) return "varkala-28day";
      if (totalPrice === 3000) return "varkala-combo";
    }
    if (destLower.includes("ladakh")) {
      return "ladakh-28day";
    }
    return "varkala-28day"; // default
  };

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
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-wide">
            Reserve Your Workspace
          </h2>
        </div>

        <div className="text-center mb-6">
          <div className="text-6xl font-black text-emerald-600 mb-2">
            ${depositAmount}
          </div>
          <p className="text-slate-600 font-bold uppercase tracking-wider">
            Deposit Today
          </p>
        </div>

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

        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
            Retreat Start Date
          </label>
          <div className="bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-center">
            <p className="font-bold text-slate-900 text-lg">{startDate}</p>
          </div>
        </div>

        <div className="border-t-2 border-slate-200 my-6"></div>

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
          </div>
        </div>

        <div className="border-t-2 border-slate-200 my-6"></div>

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
          </div>
        </div>

        <div className="border-t-2 border-slate-200 my-6"></div>

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
            <Link
              href={`/checkout?plan=${getPlanId()}`}
              className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 text-center uppercase tracking-wide"
            >
              Reserve for ${depositAmount}
            </Link>

            <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed">
              Secure payment • Refundable up to 60 days before retreat
            </p>
          </>
        )}
      </div>
    </div>
  );
};
