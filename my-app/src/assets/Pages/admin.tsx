import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { sendEmail } from '../../lib/emailservice';
import { 
  Mail, Check, X, DollarSign, Loader2, AlertCircle, 
  CheckCircle, ArrowLeft, Search, Trash2, Download, 
  TrendingUp, Users, Calendar as CalendarIcon, Wallet,
  ExternalLink, MapPin, Briefcase, Globe, Info,
  LogOut, Shield, ChevronRight, BarChart3, Clock
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  age: string;
  destination: string;
  remote_work: string;
  work_designation: string;
  intended_work: string;
  interests: string;
  linkedin: string;
  portfolio: string;
  about_you: string;
  how_heard: string;
  status: string;
  payment_status: string;
  created_at: string;
}

interface Toast {
  id: number;
  type: "success" | "error" | "info";
  message: string;
}

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [actionLoading, setActionLoading] = useState<{ [key: string]: string }>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [paymentLink, setPaymentLink] = useState("https://paypal.me/syncretreat/1499USD");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "syncretreat2026";

  const showToast = (type: "success" | "error" | "info", message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      showToast("error", `Error fetching bookings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchBookings();
    }
  }, [authenticated]);

  const setActionState = (id: string, action: string) => {
    setActionLoading((prev) => ({ ...prev, [id]: action }));
  };

  const clearActionState = (id: string) => {
    setActionLoading((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const handleSendConfirmation = async (booking: Booking) => {
    setActionState(booking.id, "confirmation");
    const result = await sendEmail({
      to: booking.email,
      name: booking.name,
      type: "confirmation",
      destination: booking.destination,
    });
    if (result.success) {
      showToast("success", `Confirmation email sent to ${booking.name}`);
    } else {
      showToast("error", `Failed to send email: ${result.message}`);
    }
    clearActionState(booking.id);
  };

  const handleSendReminder = async (booking: Booking) => {
    setActionState(booking.id, "reminder");
    const result = await sendEmail({
      to: booking.email,
      name: booking.name,
      type: "reminder",
      destination: booking.destination,
    });
    if (result.success) {
      showToast("success", `Reminder email sent to ${booking.name}`);
    } else {
      showToast("error", `Failed to send email: ${result.message}`);
    }
    clearActionState(booking.id);
  };

  const handleApprove = async (booking: Booking) => {
    setActionState(booking.id, "approve");
    try {
      const { error: updateError } = await supabase
        .from("bookings")
        .update({ status: "approved" })
        .eq("id", booking.id);
      
      if (updateError) throw updateError;

      const result = await sendEmail({
        to: booking.email,
        name: booking.name,
        type: "approved",
        destination: booking.destination,
        paymentLink: paymentLink,
      });

      if (result.success) {
        showToast("success", `${booking.name} approved and payment email sent.`);
        fetchBookings();
      } else {
        showToast("info", `Status updated to Approved, but email failed: ${result.message}`);
        fetchBookings();
      }
    } catch (error: any) {
      showToast("error", `Approval failed: ${error.message}`);
    } finally {
      clearActionState(booking.id);
    }
  };

  const handleReject = async (booking: Booking) => {
    setActionState(booking.id, "reject");
    try {
      const { error: updateError } = await supabase
        .from("bookings")
        .update({ status: "rejected" })
        .eq("id", booking.id);
      
      if (updateError) throw updateError;

      const result = await sendEmail({
        to: booking.email,
        name: booking.name,
        type: "rejected",
        destination: booking.destination,
      });

      if (result.success) {
        showToast("success", `${booking.name} application rejected.`);
        fetchBookings();
      } else {
        showToast("info", `Status updated to Rejected, but notification email failed.`);
        fetchBookings();
      }
    } catch (error: any) {
      showToast("error", `Rejection failed: ${error.message}`);
    } finally {
      clearActionState(booking.id);
    }
  };

  const handleMarkPaid = async (booking: Booking) => {
    setActionState(booking.id, "paid");
    try {
      // 1. Update payment status in DB
      const { error: updateError } = await supabase
        .from("bookings")
        .update({ payment_status: "paid" })
        .eq("id", booking.id);
      
      if (updateError) throw updateError;

      // 2. Call Edge Function to create account and send welcome email
      // The edge function handles user creation server-side to avoid browser limitations
      const result = await sendEmail({
        to: booking.email,
        name: booking.name,
        type: "welcome",
        destination: booking.destination,
        booking_id: booking.id
      });

      if (result.success) {
        showToast("success", `${booking.name} marked as PAID. Account credentials sent.`);
        fetchBookings();
      } else {
        showToast("info", `Payment updated, but welcome email/account creation failed: ${result.message}`);
        fetchBookings();
      }
    } catch (error: any) {
      showToast("error", `Failed to mark as paid: ${error.message}`);
    } finally {
      clearActionState(booking.id);
    }
  };

  const handleMarkUnpaid = async (booking: Booking) => {
    setActionState(booking.id, "unpaid");
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ payment_status: "unpaid" })
        .eq("id", booking.id);
      
      if (error) throw error;
      
      showToast("success", `${booking.name} marked as unpaid.`);
      fetchBookings();
    } catch (error: any) {
      showToast("error", `Failed to update status: ${error.message}`);
    } finally {
      clearActionState(booking.id);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("CRITICAL: Delete this application permanently?")) return;
    
    setIsDeleting(id);
    try {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
      
      showToast("success", "Application deleted successfully.");
      fetchBookings();
    } catch (error: any) {
      showToast("error", `Delete failed: ${error.message}`);
    } finally {
      setIsDeleting(null);
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Destination", "Status", "Payment", "Date", "LinkedIn"];
    const rows = bookings.map(b => [
      b.name,
      b.email,
      b.phone,
      b.destination,
      b.status,
      b.payment_status,
      new Date(b.created_at).toLocaleDateString(),
      b.linkedin
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SyncRetreat_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    approved: bookings.filter(b => b.status === "approved").length,
    paid: bookings.filter(b => b.payment_status === "paid").length,
    revenue: bookings.filter(b => b.payment_status === "paid").length * 1499
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === "all" || b.status === filter;
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tripList = Array.from(new Set(bookings.map(b => b.destination).filter(Boolean)));
  const tripBookings = filteredBookings.filter(b => b.destination === selectedTrip);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        
        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md border border-slate-800 shadow-2xl relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-white text-3xl font-bold mb-2 text-center">Command Center</h1>
          <p className="text-slate-400 text-center mb-8">Authorization required to access admin panel</p>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && password === ADMIN_PASSWORD) {
                    setAuthenticated(true);
                  }
                }}
                placeholder="Enter Security Token"
                className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>
            
            <button
              onClick={() => {
                if (password === ADMIN_PASSWORD) {
                  setAuthenticated(true);
                } else {
                  showToast("error", "Access Denied: Invalid Security Token");
                }
              }}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
            >
              Authenticate
            </button>
          </div>
          
          <p className="mt-8 text-slate-500 text-xs text-center uppercase tracking-widest font-semibold">
            SyncRetreat Proprietary System
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
        <p className="text-slate-400 font-medium animate-pulse">Initializing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      {/* Toast Notifications */}
      <div className="fixed top-6 right-6 z-[100] space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl pointer-events-auto border animate-in slide-in-from-right fade-in duration-300 ${
              toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-100" : 
              toast.type === "error" ? "bg-rose-950/90 border-rose-500/50 text-rose-100" :
              "bg-slate-900/90 border-slate-700 text-slate-100"
            } backdrop-blur-md`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            ) : toast.type === "error" ? (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            ) : (
              <Info className="w-5 h-5 text-blue-400" />
            )}
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Shield className="w-6 h-6 text-emerald-500" />
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">Command Center</h1>
            </div>
            <p className="text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational • {stats.total} Active Applications
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <Wallet className="w-4 h-4 text-emerald-500" />
              <input
                type="url"
                value={paymentLink}
                onChange={(e) => setPaymentLink(e.target.value)}
                placeholder="Payment Gateway Link"
                className="bg-transparent border-none text-xs text-slate-300 w-48 lg:w-64 focus:ring-0"
              />
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" /> Export Data
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20 hover:bg-rose-500/20 transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Apps", value: stats.total, icon: Users, color: "text-blue-400", bg: "bg-blue-500/5", border: "border-blue-500/20" },
            { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/5", border: "border-amber-500/20" },
            { label: "Active Cohorts", value: stats.approved, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/5", border: "border-emerald-500/20" },
            { label: "Est. Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: BarChart3, color: "text-purple-400", bg: "bg-purple-500/5", border: "border-purple-500/20" }
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border ${stat.border} group transition-all hover:bg-slate-900/80`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" /> Live Data Stream
              </div>
            </div>
          ))}
        </div>

        {/* Management Area */}
        <div className="space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col lg:flex-row gap-4 items-center shadow-xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <input
                type="text"
                placeholder="Find applications by name, email, or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <div className="flex gap-4 w-full lg:w-auto">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="flex-1 lg:flex-none px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Stages</option>
                <option value="pending">Review Pending</option>
                <option value="approved">Approved & Ready</option>
                <option value="rejected">Unqualified</option>
              </select>
            </div>
          </div>

          {!selectedTrip ? (
            /* Trip List View */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-emerald-500" />
                Active Retreat Locations
              </h2>
              {tripList.length === 0 ? (
                <div className="bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800 py-20 text-center">
                  <div className="inline-flex p-4 bg-slate-800/50 rounded-full mb-4">
                    <CalendarIcon className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-400">No Application Data Available</h3>
                  <p className="text-slate-600">Once users apply, destinations will appear here.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tripList.map((trip) => {
                    const count = bookings.filter(b => b.destination === trip).length;
                    const paidCount = bookings.filter(b => b.destination === trip && b.payment_status === "paid").length;
                    const progress = (paidCount / count) * 100;
                    
                    return (
                      <button
                        key={trip}
                        onClick={() => setSelectedTrip(trip)}
                        className="group relative bg-slate-900/50 hover:bg-slate-800/80 transition-all border border-slate-800 rounded-3xl p-8 text-left overflow-hidden shadow-lg hover:shadow-emerald-900/10"
                      >
                        {/* Progress Bar Accent */}
                        <div className="absolute top-0 left-0 h-1 bg-emerald-500 transition-all duration-1000" style={{ width: `${progress}%` }} />
                        
                        <div className="flex items-start justify-between mb-8">
                          <div className="p-3 bg-emerald-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                            <MapPin className="w-6 h-6 text-emerald-500" />
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-3xl font-black text-white">{count}</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Applicants</span>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2">{trip}</h3>
                        <p className="text-slate-500 text-sm mb-6 line-clamp-1">SyncRetreat Destination Dashboard</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-slate-800/50 mt-auto">
                          <div className="flex -space-x-2">
                            {[...Array(Math.min(3, count))].map((_, i) => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                                <Users className="w-3 h-3 text-slate-400" />
                              </div>
                            ))}
                            {count > 3 && <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">+{count - 3}</div>}
                          </div>
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase group-hover:gap-3 transition-all">
                            Manage Trip <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Detailed Applicants View */
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-semibold group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Location List
                </button>
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                   <p className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                     <MapPin className="w-4 h-4" /> {selectedTrip} Cohort
                   </p>
                </div>
              </div>

              {tripBookings.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-slate-500">No matching applications found for this location.</p>
                </div>
              ) : (
                <div className="grid gap-8">
                  {tripBookings.map((booking) => (
                    <div 
                      key={booking.id} 
                      className="bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-slate-800 overflow-hidden shadow-2xl transition-all hover:border-slate-700"
                    >
                      {/* Top Bar Accent */}
                      <div className={`h-1.5 w-full ${
                        booking.status === "approved" ? "bg-emerald-500" : 
                        booking.status === "rejected" ? "bg-rose-500" : 
                        "bg-amber-500"
                      }`} />

                      <div className="p-8 lg:p-10">
                        {/* Identity Section */}
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10">
                          <div className="flex gap-6 items-center">
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-3xl font-black text-emerald-500 shadow-inner border border-slate-800">
                              {booking.name.charAt(0)}
                            </div>
                            <div>
                              <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-2">{booking.name}</h2>
                              <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                                <p className="text-slate-400 flex items-center gap-2 text-sm">
                                  <Mail className="w-4 h-4 text-emerald-500" /> {booking.email}
                                </p>
                                <div className="w-1 h-1 rounded-full bg-slate-700" />
                                <p className="text-slate-400 flex items-center gap-2 text-sm font-mono tracking-tighter">
                                  {booking.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3">
                            <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
                              booking.status === "approved" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                              booking.status === "rejected" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
                              "bg-amber-500/10 border-amber-500/20 text-amber-400"
                            }`}>
                              {booking.status}
                            </div>
                            <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
                              booking.payment_status === "paid" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                              "bg-slate-800 border-slate-700 text-slate-500"
                            }`}>
                              {booking.payment_status}
                            </div>
                            <button 
                              onClick={() => handleDelete(booking.id)}
                              disabled={isDeleting === booking.id}
                              className="p-2.5 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 rounded-xl transition-all border border-transparent hover:border-rose-500/20"
                            >
                              {isDeleting === booking.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        {/* Professional Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                          <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800/50">
                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                              <Globe className="w-3 h-3" /> Origin
                            </div>
                            <p className="text-white font-bold">{booking.country || "Not set"}</p>
                          </div>
                          <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800/50">
                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                              <Briefcase className="w-3 h-3" /> Profession
                            </div>
                            <p className="text-white font-bold">{booking.work_designation || "Not set"}</p>
                          </div>
                          <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800/50">
                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                              <Clock className="w-3 h-3" /> Experience
                            </div>
                            <p className="text-white font-bold">{booking.remote_work || "Not set"}</p>
                          </div>
                          <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800/50">
                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                              <ExternalLink className="w-3 h-3" /> Socials
                            </div>
                            <div className="flex gap-4">
                              {booking.linkedin ? (
                                <a href={booking.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors font-bold text-sm">LinkedIn</a>
                              ) : <span className="text-slate-700 text-sm">N/A</span>}
                              {booking.portfolio ? (
                                <a href={booking.portfolio} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold text-sm">Portfolio</a>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        {/* Qualitative Section */}
                        <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800/50 mb-10">
                          <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Info className="w-3 h-3" /> Candidate Mission
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed italic">
                            "{booking.about_you || "No mission statement provided."}"
                          </p>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {booking.interests?.split(',').map((interest, idx) => (
                              <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-700">
                                {interest.trim()}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Control Deck */}
                        <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-slate-800">
                          <button
                            onClick={() => handleSendConfirmation(booking)}
                            disabled={!!actionLoading[booking.id]}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                          >
                            {actionLoading[booking.id] === "confirmation" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                            Confirmation
                          </button>

                          <button
                            onClick={() => handleSendReminder(booking)}
                            disabled={!!actionLoading[booking.id]}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                          >
                            {actionLoading[booking.id] === "reminder" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4 text-amber-500" />}
                            Reminder
                          </button>

                          <div className="h-8 w-[1px] bg-slate-800 mx-2" />

                          <button
                            onClick={() => handleApprove(booking)}
                            disabled={!!actionLoading[booking.id] || booking.status === "approved"}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10"
                          >
                            {actionLoading[booking.id] === "approve" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(booking)}
                            disabled={!!actionLoading[booking.id] || booking.status === "rejected"}
                            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                          >
                            {actionLoading[booking.id] === "reject" ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                            Reject
                          </button>

                          <div className="h-8 w-[1px] bg-slate-800 mx-2" />

                          {booking.payment_status !== "paid" ? (
                            <button
                              onClick={() => handleMarkPaid(booking)}
                              disabled={!!actionLoading[booking.id]}
                              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
                            >
                              {actionLoading[booking.id] === "paid" ? <Loader2 className="w-4 h-4 animate-spin" /> : <DollarSign className="w-4 h-4" />}
                              Mark as Paid
                            </button>
                          ) : (
                            <button
                              onClick={() => handleMarkUnpaid(booking)}
                              disabled={!!actionLoading[booking.id]}
                              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                            >
                              {actionLoading[booking.id] === "unpaid" ? <Loader2 className="w-4 h-4 animate-spin" /> : <DollarSign className="w-4 h-4" />}
                              Mark Unpaid
                            </button>
                          )}
                        </div>
                        
                        <div className="mt-6 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                          Application ID: {booking.id} • Submitted: {new Date(booking.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}