"use client";
import Link from "next/link";
import { Check, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import {
  PLAN_FEATURES,
  PRICING_PLANS,
  YEARLY_PASS,
} from "../lib/shared-constants";

export default function PricingPreview() {
  return (
    <section id="pricing" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Workation Plans
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            All-inclusive for Western professionals — accommodation through
            medical support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border-2 p-6 ${
                plan.featured
                  ? "border-emerald-500 bg-emerald-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.featured && (
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {plan.name}
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                {plan.duration} · {plan.audience}
              </p>
              {plan.discount && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg text-slate-400 line-through">
                    {plan.originalPrice}
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {plan.discount} off
                  </span>
                </div>
              )}
              <p className="text-4xl font-black text-slate-900">{plan.price}</p>
              {plan.priceNote && (
                <p className="text-sm text-slate-500 mt-1">{plan.priceNote}</p>
              )}
              {plan.pricePerDay && (
                <p className="text-sm text-slate-600 mt-1 mb-4">
                  {plan.pricePerDay}
                </p>
              )}
              {!plan.pricePerDay && <div className="mb-4" />}
              <ul className="space-y-2 mb-6">
                {PLAN_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.link}
                className={`block text-center py-3 rounded-xl font-bold text-sm ${
                  plan.featured
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.cta}
              </Link>
              <p className="text-center mt-3">
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                  {plan.status}
                </span>
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 md:p-10"
        >
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                <Ticket className="w-4 h-4" />
                Membership
              </p>
              <h3 className="text-3xl md:text-4xl font-black mb-2">
                {YEARLY_PASS.name}
              </h3>
              <p className="text-slate-300 max-w-md">{YEARLY_PASS.subtitle}</p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-sm text-slate-200">
                {YEARLY_PASS.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-300 shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 text-left md:text-right">
              <p className="text-sm text-slate-400 mb-1">
                {YEARLY_PASS.duration} · {YEARLY_PASS.audience}
              </p>
              <p className="text-5xl font-black text-amber-300">
                {YEARLY_PASS.price}
              </p>
              <Link
                href={YEARLY_PASS.link}
                className="mt-4 inline-block bg-amber-300 text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-amber-200"
              >
                Join the waitlist
              </Link>
            </div>
          </div>
        </motion.div>

        <p className="text-center mt-8">
          <Link
            href="/pricing"
            className="text-emerald-600 font-semibold hover:text-emerald-700"
          >
            Full pricing details →
          </Link>
        </p>
      </div>
    </section>
  );
}
