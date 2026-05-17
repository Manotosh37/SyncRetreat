"use client";
import { useState } from "react";
import { DollarSign, TrendingDown, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const CITIES = [
  { name: "San Francisco, USA", multiplier: 1.0, flag: "🇺🇸", currency: "USD" },
  { name: "New York, USA", multiplier: 0.95, flag: "🇺🇸", currency: "USD" },
  { name: "London, UK", multiplier: 0.85, flag: "🇬🇧", currency: "GBP" },
  { name: "Toronto, Canada", multiplier: 0.75, flag: "🇨🇦", currency: "CAD" },
  { name: "Berlin, Germany", multiplier: 0.7, flag: "🇩🇪", currency: "EUR" },
  { name: "Singapore", multiplier: 0.8, flag: "🇸🇬", currency: "SGD" },
  { name: "Dubai, UAE", multiplier: 0.72, flag: "🇦🇪", currency: "AED" },
  { name: "Sydney, Australia", multiplier: 0.78, flag: "🇦🇺", currency: "AUD" },
];

const INDIA_LOCATIONS = [
  {
    name: "Leh, Ladakh",
    costIndex: 0.08,
    desc: "Ultra-low cost, high altitude isolation",
    tag: "SyncRetreat Location",
    highlight: true,
  },
  {
    name: "Goa, India",
    costIndex: 0.12,
    desc: "Coastal living, vibrant community",
    tag: "SyncRetreat Location",
    highlight: true,
  },
  {
    name: "Bangalore, India",
    costIndex: 0.22,
    desc: "India's tech hub",
    tag: "",
  },
  {
    name: "Mumbai, India",
    costIndex: 0.25,
    desc: "Financial capital",
    tag: "",
  },
  { name: "Pune, India", costIndex: 0.18, desc: "Growing tech scene", tag: "" },
  { name: "Delhi, India", costIndex: 0.2, desc: "Political capital", tag: "" },
];

const formatUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export default function SalaryCalculator() {
  const [salary, setSalary] = useState(120000);
  const [fromCity, setFromCity] = useState(CITIES[0]);

  const adjustedSalary = salary * fromCity.multiplier; // normalize to SF equivalent

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Your Current Situation
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-3">
              Annual Gross Salary (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl text-2xl font-black text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
                step={5000}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-3">
              Current City
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={fromCity.name}
                onChange={(e) =>
                  setFromCity(
                    CITIES.find((c) => c.name === e.target.value) || CITIES[0],
                  )
                }
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl text-lg font-bold text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors appearance-none bg-white"
              >
                {CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">
            Purchasing Power Equivalent (San Francisco baseline):{" "}
            <span className="text-slate-900 font-black text-lg">
              {formatUSD(adjustedSalary)}/yr
            </span>
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Your {formatUSD(salary)} salary in India
        </h2>
        <p className="text-slate-500 font-medium mb-6">
          Monthly take-home equivalent, accounting for local cost of living.
          Data based on Numbeo and Expatistan indices.
        </p>
        <div className="grid gap-4">
          {INDIA_LOCATIONS.map((loc) => {
            const monthlyPurchasingPower =
              (adjustedSalary * (1 - loc.costIndex)) / 12;
            const savingsRate = Math.round((1 - loc.costIndex) * 100);
            const monthlyExpenses = Math.round(
              (adjustedSalary * loc.costIndex) / 12,
            );

            return (
              <div
                key={loc.name}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  loc.highlight
                    ? "border-emerald-300 bg-emerald-50 shadow-md shadow-emerald-100"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-black text-slate-900">
                        {loc.name}
                      </h3>
                      {loc.highlight && (
                        <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest">
                          {loc.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                      {loc.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Monthly Costs
                      </p>
                      <p className="text-xl font-black text-red-500">
                        {formatUSD(monthlyExpenses)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Savings Rate
                      </p>
                      <p
                        className={`text-xl font-black ${loc.highlight ? "text-emerald-600" : "text-slate-700"}`}
                      >
                        {savingsRate}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Monthly Net
                      </p>
                      <p
                        className={`text-2xl font-black ${loc.highlight ? "text-emerald-700" : "text-slate-900"}`}
                      >
                        {formatUSD(monthlyPurchasingPower)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            Ready to ship?
          </p>
          <h3 className="text-2xl font-black mb-2">
            Work from Ladakh. Keep your salary.
          </h3>
          <p className="text-slate-300 font-medium">
            Enterprise-grade infrastructure. Zero visa stress. Curated
            engineers.
          </p>
        </div>
        <Link
          href="/locations/ladakh"
          className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl transition-colors shadow-xl shadow-emerald-900/40"
        >
          View Retreats <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
