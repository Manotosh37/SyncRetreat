import { Mountain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600/10 rounded-lg">
              <Mountain className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-white font-bold text-lg">SyncRetreat</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="mailto:hello@syncretreat.com" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <p className="text-slate-500 text-sm">
            © 2026 Syncretreat. Ladakh, India.
          </p>
        </div>
      </div>
    </footer>
  );
}