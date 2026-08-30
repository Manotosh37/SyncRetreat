import React from "react";
import { Check, Ticket } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  PLAN_FEATURES,
  PRICING_PLANS,
  YEARLY_PASS,
} from "../../lib/shared-constants";

export const metadata: Metadata = {
  title: "Pricing Plans - Remote Work Retreat Packages | SyncRetreat",
  description:
    "14-day ($1,199) and 28-day ($1,799) workation plans with $300 off, plus custom Enterprise B2B and a Yearly Pass for repeat guests.",
  alternates: { canonical: "https://syncretreat.com/pricing" },
  openGraph: {
    title: "SyncRetreat Pricing - Workation Plans",
    description:
      "Transparent pricing from $1,199. Accommodation, transport, meals, working infra, community, legal docs, and medical support included.",
    url: "https://syncretreat.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="pt-20" />

      <section className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Workation plans — all-inclusive from accommodation to medical
            support.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl border-2 p-8 ${
                  plan.featured
                    ? "border-emerald-500 shadow-lg shadow-emerald-100"
                    : "border-slate-200"
                }`}
              >
                {plan.featured && (
                  <span className="text-xs font-bold uppercase text-emerald-600">
                    Best Value
                  </span>
                )}
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {plan.name}
                </h2>
                <p className="text-sm text-slate-600">
                  {plan.duration} · {plan.audience}
                </p>
                <div className="my-6">
                  {plan.discount && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg text-slate-400 line-through">
                        {plan.originalPrice}
                      </span>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
                        {plan.discount} off
                      </span>
                    </div>
                  )}
                  <p className="text-5xl font-black text-slate-900">
                    {plan.price}
                  </p>
                  {plan.priceNote && (
                    <p className="text-sm text-slate-500 mt-1">
                      {plan.priceNote}
                    </p>
                  )}
                  {plan.pricePerDay && (
                    <p className="text-sm text-slate-600 mt-1">
                      {plan.pricePerDay}
                    </p>
                  )}
                </div>
                <ul className="space-y-2 mb-8">
                  {PLAN_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.link}
                  className={`block text-center py-4 rounded-xl font-bold ${
                    plan.featured
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {plan.cta}
                </Link>
                <p className="text-center mt-4">
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    {plan.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900 to-slate-950 p-10 md:p-14">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-amber-400/15 blur-3xl" />
            <p className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-[0.25em] mb-4">
              <Ticket className="w-4 h-4" />
              Membership
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              {YEARLY_PASS.name}
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-xl">
              {YEARLY_PASS.subtitle} Price coming soon — join the waitlist to
              lock founding-member access.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
              {YEARLY_PASS.perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3 text-slate-200"
                >
                  <Check className="w-5 h-5 text-amber-300 shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-5xl font-black text-amber-300">
                {YEARLY_PASS.price}
              </p>
              <Link
                href={YEARLY_PASS.link}
                className="bg-amber-300 text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-amber-200"
              >
                Join the waitlist
              </Link>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-900/50 px-3 py-1 rounded-full">
                {YEARLY_PASS.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-emerald-100 mb-6">
            Secure your spot with a $299 deposit
          </p>
          <Link
            href="/locations/varkala"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50"
          >
            View Retreats
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
