"use client";
import { useState } from "react";
import {
  Activity,
  Play,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface LatencyResult {
  name: string;
  url: string;
  current: number | null;
  ladakh: number;
  varkala: number;
  status: "idle" | "testing" | "success" | "error";
}

export default function LatencyTesterTool() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<LatencyResult[]>([
    {
      name: "Cloudflare Edge (DNS)",
      url: "https://cloudflare.com/cdn-cgi/trace",
      current: null,
      ladakh: 18,
      varkala: 12,
      status: "idle",
    },
    {
      name: "AWS Mumbai (ap-south-1)",
      url: "https://dynamodb.ap-south-1.amazonaws.com",
      current: null,
      ladakh: 42,
      varkala: 28,
      status: "idle",
    },
    {
      name: "AWS US East (us-east-1)",
      url: "https://dynamodb.us-east-1.amazonaws.com",
      current: null,
      ladakh: 210,
      varkala: 200,
      status: "idle",
    },
    {
      name: "GitHub / CDN Registry",
      url: "https://github.com",
      current: null,
      ladakh: 55,
      varkala: 40,
      status: "idle",
    },
  ]);

  const runTest = async () => {
    setTesting(true);
    const updated: LatencyResult[] = results.map((r) => ({
      ...r,
      status: "testing" as const,
      current: null,
    }));
    setResults(updated);

    for (let i = 0; i < updated.length; i++) {
      const target = updated[i];
      const pings: number[] = [];

      // Warm up connection first to resolve DNS
      try {
        await fetch(target.url, {
          mode: "no-cors",
          cache: "no-store",
          signal: AbortSignal.timeout(2000),
        });
      } catch (e) {}

      // Perform 3 samples for accuracy
      for (let sample = 0; sample < 3; sample++) {
        const start = performance.now();
        try {
          await fetch(target.url, {
            mode: "no-cors",
            cache: "no-store",
            signal: AbortSignal.timeout(2000),
          });
          pings.push(performance.now() - start);
        } catch (e) {
          // If fetch fails but resolves fast (due to CORS/no-cors abort), it's still a TCP round-trip.
          // If it times out or blocks completely, we treat it as error.
          if (performance.now() - start < 1900) {
            pings.push(performance.now() - start);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (pings.length > 0) {
        const avg = Math.round(pings.reduce((a, b) => a + b, 0) / pings.length);
        updated[i] = {
          ...target,
          current: avg,
          status: "success",
        };
      } else {
        updated[i] = {
          ...target,
          current: null,
          status: "error",
        };
      }

      // Update state incrementally for dynamic visual feedback
      setResults([...updated]);
    }
    setTesting(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Test Panel */}
      <div className="bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="text-left">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              Live Latency Diagnostics
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Compare your current connection directly with SyncRetreat fiber
              nodes.
            </p>
          </div>
          <button
            onClick={runTest}
            disabled={testing}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-950/50 disabled:shadow-none"
          >
            <Play
              className={`w-4 h-4 ${testing ? "animate-spin text-slate-400" : ""}`}
            />
            {testing ? "Analyzing Networks..." : "Run Latency Diagnostic"}
          </button>
        </div>

        <div className="relative z-10 py-6 space-y-6">
          <div className="grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 pb-2">
            <div className="col-span-5 md:col-span-6">Target Server / CDN</div>
            <div className="col-span-3 text-center text-emerald-400">
              Your Ping
            </div>
            <div className="col-span-2 text-center text-slate-300">
              Ladakh Node
            </div>
            <div className="col-span-2 text-center text-slate-300">
              Varkala Node
            </div>
          </div>

          <div className="space-y-3">
            {results.map((r) => {
              const currentText =
                r.status === "testing"
                  ? "..."
                  : r.status === "error"
                    ? "Timeout"
                    : r.current
                      ? `${r.current} ms`
                      : "Click Run";

              const isLadakhBetter = r.current !== null && r.ladakh < r.current;
              const isVarkalaBetter = r.current !== null && r.varkala < r.current;

              return (
                <div
                  key={r.name}
                  className="grid grid-cols-12 gap-4 items-center p-4 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors"
                >
                  <div className="col-span-5 md:col-span-6 font-semibold text-slate-200">
                    {r.name}
                  </div>
                  <div className="col-span-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-md text-xs font-black tracking-wide ${
                        r.status === "testing"
                          ? "bg-slate-800 text-slate-400 animate-pulse"
                          : r.status === "error"
                            ? "bg-red-950 text-red-400"
                            : r.current
                              ? "bg-emerald-950 text-emerald-400"
                              : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {currentText}
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span
                      className={`text-sm font-bold block ${
                        isLadakhBetter ? "text-emerald-500" : "text-slate-400"
                      }`}
                    >
                      {r.ladakh} ms
                    </span>
                    {isLadakhBetter && (
                      <span className="text-[9px] font-black text-emerald-500/80 uppercase block">
                        Faster
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 text-center">
                    <span
                      className={`text-sm font-bold block ${
                        isVarkalaBetter ? "text-emerald-500" : "text-slate-400"
                      }`}
                    >
                      {r.varkala} ms
                    </span>
                    {isVarkalaBetter && (
                      <span className="text-[9px] font-black text-emerald-500/80 uppercase block">
                        Faster
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-400">
          <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="font-medium text-center sm:text-left leading-relaxed">
            Note: Ladakh BSNL Fiber achieves{" "}
            <strong className="text-white">42ms</strong> directly to AWS Mumbai.
            This is due to optical path routing bypassing heavy urban traffic
            congestion.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-emerald-600" />
            Our Dual-WAN Optimization
          </h4>
          <p className="text-slate-600 leading-relaxed font-medium">
            SyncRetreat premises operate on a customized routing stack. If our
            primary fiber ISP suffers a packet drop or line break, pfSense
            switches traffic over a hot-standby secondary ISP in less than 4
            seconds automatically.
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Is it fast enough to code?
          </h4>
          <p className="text-slate-600 leading-relaxed font-medium">
            Yes. Latencies under 60ms are imperceptible for remote terminal
            sessions, VS Code Live Share, zoom video calls, and staging pushes.
            Our network parameters are tuned to prioritize SSH, WireGuard, and
            WebRTC traffic.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            No Compromises
          </p>
          <h3 className="text-2xl font-black mb-2">
            Stop trading performance for location.
          </h3>
          <p className="text-slate-300 font-medium">
            Fully managed tech-focused workspaces in Varkala & the Himalayas.
          </p>
        </div>
        <Link
          href="/infrastructure"
          className="shrink-0 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl transition-colors shadow-xl shadow-emerald-900/40"
        >
          View Full Specs <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
