"use client";
import React from "react";
import { CheckCircle, X, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DepositBookingCardProps {
  destination: string;
  totalPrice: number;
  depositAmount: number;
  isCompleted?: boolean;
  startDate?: string;
  planId?: string;
  availableDates?: Array<{
    id: string;
    label: string;
    startDate: string;
    endDate: string;
  }>;
  selectedDateId?: string | null;
  onDateChange?: (dateId: string) => void;
  selectedDateData?: {
    id: string;
    label: string;
    startDate: string;
    endDate: string;
  };
  calLink?: string;
}

export const DepositBookingCard: React.FC<DepositBookingCardProps> = ({
  destination,
  totalPrice,
  depositAmount,
  isCompleted = false,
  startDate = "August 10, 2025",
  planId,
  availableDates,
  selectedDateId,
  onDateChange,
  selectedDateData,
  calLink = "https://cal.com/syncretreat/quick-chat",
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
          {availableDates && availableDates.length > 0 ? (
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
              <select
                value={selectedDateId || ""}
                onChange={(e) => onDateChange?.(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-semibold text-slate-900 bg-white appearance-none cursor-pointer"
              >
                {availableDates.map((date) => (
                  <option key={date.id} value={date.id}>
                    {date.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 text-center">
              <p className="font-bold text-slate-900 text-lg">{startDate}</p>
            </div>
          )}
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
            <p className="text-slate-500 text-xs mb-4">
              Check back soon for upcoming dates
            </p>
            <a
              href={calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wide transition-all"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Ask About Future Dates</span>
            </a>
          </div>
        ) : (
          <>
            <Link
              href={`/checkout?plan=${getPlanId()}${selectedDateData ? `&startDate=${selectedDateData.startDate}&endDate=${selectedDateData.endDate}` : ''}`}
              className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 text-center uppercase tracking-wide"
            >
              Reserve for ${depositAmount}
            </Link>

            <p className="text-xs text-center text-slate-500 mt-3 leading-relaxed">
              Secure payment • Refundable up to 60 days before retreat
            </p>

            {/* Direct Founder/Team Call via Cal.com */}
            <div className="mt-5 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700">
                  Need Clarity First?
                </span>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  15-Min 1-on-1 Call
                </span>
              </div>

              <a
                href={calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 text-center text-xs uppercase tracking-wider shadow-md hover:shadow-lg"
              >
                <Calendar className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Reserve a Call on Cal.com</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="text-[11px] text-center text-slate-500 mt-2 leading-relaxed">
                Connect directly with our team to clear your doubts and get all questions answered before reserving.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
