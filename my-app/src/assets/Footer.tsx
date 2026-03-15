import { useState } from 'react';
import { BsTwitter, BsInstagram, BsLinkedin, BsArrowRight, BsWhatsapp, BsYoutube } from 'react-icons/bs';

import { supabase } from '../lib/supabase';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus("loading");

    try {
      const { error } = await supabase.from("newsletter").insert([
        { email: email.toLowerCase().trim() }
      ]);

      if (error) {
        if (error.code === "23505") {
          // Email already exists
          alert("You're already subscribed!");
        } else {
          throw error;
        }
        setStatus("idle");
        return;
      }

      setStatus("success");
      setEmail("");

      // Reset after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);

    } catch (error) {
      console.error("Newsletter error:", error);
      setStatus("error");
      alert("Something went wrong. Try again.");
      setStatus("idle");
    }
  };

  return (
    <footer className="bg-black border-t border-zinc-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">SyncRetreat</h3>
            <div className="flex space-x-3">
              <a
                href="https://x.com/RetreatSyn57144"
                className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <BsTwitter className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="https://www.instagram.com/sync.retreat/"
                className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <BsInstagram className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="https://www.linkedin.com/company/111381004/admin/dashboard/"
                className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <BsLinkedin className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="https://chat.whatsapp.com/K8OntEo4WTkAfX2iGA9Io9"
                className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <BsWhatsapp className="w-4 h-4 text-gray-400" />
              </a> 
              {/* <a
                href="https://l.instagram.com/?u=https%3A%2F%2Fchat.whatsapp.com%2FK8OntEo4WTkAfX2iGA9Io9%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnqXQFjoXkLq9VKUxmOdOtGH4RSno05nSs1WQOkTfxOFzjG3VwEXzca8RGVNk_aem_PlscZXR_D3tSjJeK71_gSA&e=AT4pjW15s0XL-g73dNkfxu_olAy1Wu0WbqTZA7ACKsLx7uO5lqfSxZFAh_t9j-PnevPvCVbVRFHmZuoTLGovU5UPLwE-umbLDvnqVh9TvQMFoFXSx1lqXDVzfQ"
                className="bg-zinc-900 p-2 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <BsYoutube className="w-4 h-4 text-gray-400" />
              </a>  */}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                {/* <a href="/gift" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Gift a trip
                </a> */}
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors text-xs">
                  About us
                </a>
              </li>
              <li>
                <a href="/community" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Community rules
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/faqs" className="text-gray-400 hover:text-white transition-colors text-xs">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Destinations</h4>
            <ul className="space-y-1">
              <li>
                <a href="/ladakh" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Ladakh
                </a>
              </li>
              <li>
                <a href="/goa" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Goa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Get Updates</h4>
            <form onSubmit={handleSubscribe} className="flex mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                disabled={status === "loading"}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-l-md px-3 py-2 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit"
                disabled={status === "loading"}
                className={`px-3 py-2 rounded-r-md transition-colors ${
                  status === "loading"
                    ? "bg-gray-600 cursor-not-allowed"
                    : status === "success"
                    ? "bg-green-500"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {status === "success" ? (
                  <span className="text-white text-xs">✓</span>
                ) : (
                  <BsArrowRight className="w-4 h-4 text-white" />
                )}
              </button>
            </form>
            {status === "success" && (
              <p className="text-green-400 text-xs">Thanks for subscribing!</p>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-4 text-center">
          <p className="text-gray-600 text-xs">
            © 2026 SyncRetreat. All rights reserved. Engineered for focus.
          </p>
        </div>
      </div>
    </footer>
  );
}