"use client";
import { Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AboutButton() {
  const pathname = usePathname();
  
  // Don't show the button if we are already on the about page
  if (pathname === "/about") return null;

  return (
    <Link
      href="/about"
      className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white rounded-full p-3 pr-5 shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group border border-slate-700"
    >
      <div className="bg-emerald-500/20 p-2 rounded-full group-hover:bg-emerald-500/30 transition-colors">
        <Info className="w-5 h-5 text-emerald-400" />
      </div>
      <span className="font-bold tracking-widest uppercase text-xs">Meet the Hosts</span>
    </Link>
  );
}
