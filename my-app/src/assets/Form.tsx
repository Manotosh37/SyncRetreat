import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('This email is already on the waitlist.');
          setStatus('error');
        } else {
          throw error;
        }
      } else {
        setMessage('Success! Check your email for next steps.');
        setStatus('success');
        setEmail('');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      setMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="waitlist" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-blue-600/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block p-4 bg-blue-600/10 rounded-full mb-6">
            <Mail className="w-8 h-8 text-blue-400" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Request Your Invitation
          </h2>
          <p className="text-xl text-slate-400 mb-4">
            Limited to 12 spots. Selection by interview only.
          </p>
          <p className="text-slate-500 mb-12">
            July 2026 Founding Batch opens February 1st, 2026
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@company.com"
                  required
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: status === 'success' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'success' ? 1 : 0.98 }}
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
              >
                {status === 'loading' ? (
                  'Submitting...'
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submitted
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
                  status === 'success'
                    ? 'bg-green-600/10 border border-green-600/30 text-green-400'
                    : 'bg-red-600/10 border border-red-600/30 text-red-400'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}
          </form>

          <div className="mt-12 space-y-3 text-slate-500 text-sm">
            <p>What happens next:</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-start sm:items-center text-left sm:text-center">
              <div className="flex items-center gap-2">
                <span className="shrink-0 w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 text-xs font-bold">1</span>
                <span>Email verification</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="shrink-0 w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 text-xs font-bold">2</span>
                <span>30-min screening call</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="shrink-0 w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 text-xs font-bold">3</span>
                <span>Invitation sent</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
