import React from "react";
import { Shield } from "lucide-react";

interface AdminLoginProps {
  password: string;
  setPassword: (val: string) => void;
  setAuthenticated: (val: boolean) => void;
  adminPassword: string;
  showToast: (type: "success" | "error" | "info", message: string) => void;
}

export default function AdminLogin({
  password,
  setPassword,
  setAuthenticated,
  adminPassword,
  showToast,
}: AdminLoginProps) {
  const handleAuth = () => {
    if (password === adminPassword) {
      setAuthenticated(true);
    } else {
      showToast("error", "Access Denied: Invalid Security Token");
    }
  };

  return (
    <div className="min-h-screen bg-[#fefbf7] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />

      <div className="bg-white p-8 md:p-12 rounded-3xl w-full max-w-md border border-slate-200 shadow-2xl shadow-slate-200/50 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#1A2421] rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/10">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-slate-900 text-3xl font-serif font-bold mb-2 text-center">
          Command Center
        </h1>
        <p className="text-slate-500 text-center mb-8 font-medium">
          Authorization required to access admin panel
        </p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAuth();
                }
              }}
              placeholder="Enter Security Token"
              className="w-full px-5 py-4 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>

          <button
            onClick={handleAuth}
            className="w-full bg-[#1A2421] hover:bg-slate-800 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]"
          >
            Authenticate
          </button>
        </div>

        <p className="mt-8 text-slate-400 text-[10px] text-center uppercase tracking-widest font-bold">
          SyncRetreat Proprietary System
        </p>
      </div>
    </div>
  );
}
