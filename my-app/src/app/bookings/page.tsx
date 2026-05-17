"use client";
import Link from 'next/link';

import { useAuth } from "../lib/AuthContext";
import { Luggage, Loader2, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Bookings() {
  const { user, isLoading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error && error.code !== 'PGRST116') {
            console.error("Error fetching bookings:", error);
          } else if (data) {
            setBookings(data);
          }
        } catch (err) {
          console.error("Error:", err);
        } finally {
          setLoading(false);
        }
      } else if (!authLoading) {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user, authLoading]);

  if (authLoading || (loading && user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fefbf7]">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fefbf7] px-6">
        <h2 className="text-2xl font-serif text-slate-900 mb-4">Please sign in to view your bookings</h2>
        <Link href="/login" className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-500 transition-all">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fefbf7] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-serif text-slate-900">Your Bookings</h1>
          {bookings.length > 0 && (
            <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-200">
              {bookings.length} {bookings.length === 1 ? 'Trip' : 'Trips'} Found
            </span>
          )}
        </div>

        {bookings.length === 0 ? (
          /* Empty State - Matching User Request */
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="w-32 h-32 mb-8 text-slate-200">
              <Luggage className="w-full h-full stroke-[1px]" />
            </div>
            <h2 className="text-3xl font-serif text-slate-900 mb-3 text-center">No trips on the horizon?</h2>
            <p className="text-slate-500 text-lg mb-10 text-center max-w-md">Time to plan your next adventure!</p>
            <Link 
              href="/#application-form" 
              className="bg-slate-950 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-950/20"
            >
              Explore Locations
            </Link>
          </div>
        ) : (
          /* Bookings List */
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{booking.destination || 'Goa Retreat'}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {booking.dates || 'Upcoming 2026'}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px]">Confirmed</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link 
                      href={`/checkout?id=${booking.id}`} 
                      className="flex items-center gap-2 text-slate-900 font-bold text-sm hover:text-emerald-600 transition-colors"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Support Section */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            Need help with your booking? <a href="/faqs" className="text-emerald-600 hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
