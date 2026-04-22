import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { sendEmail } from "../../lib/emailservice";
import {
  Mail,
  Check,
  X,
  DollarSign,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Search,
  Trash2,
  Download,
  TrendingUp,
  Users,
  Calendar as CalendarIcon,
  Wallet,
  ExternalLink,
  MapPin,
  Briefcase,
  Globe,
  Info,
  LogOut,
  Shield,
  ChevronRight,
  BarChart3,
  Clock,
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
  const [actionLoading, setActionLoading] = useState<{ [key: string]: string }>(
    {},
  );
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [paymentLink, setPaymentLink] = useState(
    "https://paypal.me/syncretreat/1499USD",
  );
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"applicants" | "users">(
    "applicants",
  );
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const ADMIN_PASSWORD =
    import.meta.env.VITE_ADMIN_PASSWORD || "syncretreat2026";

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

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      setUsers(users || []);
    } catch (error: any) {
      showToast("error", `Error fetching users: ${error.message}`);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchBookings();
      fetchUsers();
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

  const handleSendWelcome = async (email: string, name: string, id: string) => {
    setActionState(id, "welcome");
    const result = await sendEmail({
      to: email,
      name: name,
      type: "welcome",
    });
    if (result.success) {
      showToast("success", `Welcome email sent to ${name}`);
    } else {
      showToast("error", `Failed to send email: ${result.message}`);
    }
    clearActionState(id);
  };

  const handleSendBookingConfirmation = async (booking: Booking) => {
    setActionState(booking.id, "booking_confirmation");
    const result = await sendEmail({
      to: booking.email,
      name: booking.name,
      type: "booking_confirmation",
      destination: booking.destination,
    });
    if (result.success) {
      showToast("success", `Booking confirmation sent to ${booking.name}`);
    } else {
      showToast("error", `Failed to send email: ${result.message}`);
    }
    clearActionState(booking.id);
  };

  const handleSendFinalPayment = async (booking: Booking) => {
    setActionState(booking.id, "final_payment");
    const result = await sendEmail({
      to: booking.email,
      name: booking.name,
      type: "final_payment",
      destination: booking.destination,
    });
    if (result.success) {
      showToast("success", `Final payment reminder sent to ${booking.name}`);
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
        showToast(
          "success",
          `${booking.name} approved and payment email sent.`,
        );
        fetchBookings();
      } else {
        showToast(
          "info",
          `Status updated to Approved, but email failed: ${result.message}`,
        );
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
        showToast(
          "info",
          `Status updated to Rejected, but notification email failed.`,
        );
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
      const { error: updateError } = await supabase
        .from("bookings")
        .update({ payment_status: "paid" })
        .eq("id", booking.id);

      if (updateError) throw updateError;

      const result = await sendEmail({
        to: booking.email,
        name: booking.name,
        type: "welcome",
        destination: booking.destination,
        booking_id: booking.id,
      });

      if (result.success) {
        showToast(
          "success",
          `${booking.name} marked as PAID. Account credentials sent.`,
        );
        fetchBookings();
      } else {
        showToast(
          "info",
          `Payment updated, but welcome email/account creation failed: ${result.message}`,
        );
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
    if (!window.confirm("CRITICAL: Delete this application permanently?"))
      return;

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
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Destination",
      "Status",
      "Payment",
      "Date",
      "LinkedIn",
    ];
    const rows = bookings.map((b) => [
      b.name,
      b.email,
      b.phone,
      b.destination,
      b.status,
      b.payment_status,
      new Date(b.created_at).toLocaleDateString(),
      b.linkedin,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `SyncRetreat_Export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    paid: bookings.filter((b) => b.payment_status === "paid").length,
    revenue: bookings.filter((b) => b.payment_status === "paid").length * 1499,
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === "all" || b.status === filter;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tripList = Array.from(
    new Set(bookings.map((b) => b.destination).filter(Boolean)),
  );
  const tripBookings = filteredBookings.filter(
    (b) => b.destination === selectedTrip,
  );

  if (!authenticated) {
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
                  if (e.key === "Enter" && password === ADMIN_PASSWORD) {
                    setAuthenticated(true);
                  }
                }}
                placeholder="Enter Security Token"
                className="w-full px-5 py-4 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fefbf7] flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
        <p className="text-slate-600 font-bold animate-pulse tracking-wide">
          Initializing Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefbf7] text-slate-900 pt-20">
      {/* Toast Notifications */}
      <div className="fixed top-6 right-6 z-100 space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl pointer-events-auto border animate-in slide-in-from-right fade-in duration-300 ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : toast.type === "error"
                  ? "bg-rose-50 border-rose-200 text-rose-900"
                  : "bg-white border-slate-200 text-slate-900"
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
              <div className="p-2 bg-emerald-600/10 rounded-xl">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-slate-900">
                Command Center
              </h1>
            </div>
            <p className="text-slate-600 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational • {stats.total} Active Applications
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <input
                type="url"
                value={paymentLink}
                onChange={(e) => setPaymentLink(e.target.value)}
                placeholder="Payment Gateway Link"
                className="bg-transparent border-none text-xs text-slate-700 w-48 lg:w-64 focus:ring-0 font-medium"
              />
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 shadow-sm transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4" /> Export Data
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 hover:bg-rose-100 transition-all shadow-sm"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Total Apps",
              value: stats.total,
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-50",
              border: "border-blue-100",
            },
            {
              label: "Pending Review",
              value: stats.pending,
              icon: Clock,
              color: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-100",
            },
            {
              label: "Active Cohorts",
              value: stats.approved,
              icon: CheckCircle,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              border: "border-emerald-100",
            },
            {
              label: "Est. Revenue",
              value: `$${stats.revenue.toLocaleString()}`,
              icon: BarChart3,
              color: "text-purple-600",
              bg: "bg-purple-50",
              border: "border-purple-100",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-white border ${stat.border} shadow-sm group transition-all hover:shadow-md hover:border-slate-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <TrendingUp className="w-3 h-3 text-emerald-500" /> Live Data
                Stream
              </div>
            </div>
          ))}
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8 p-1.5 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("applicants")}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "applicants"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" /> Form Filled
            </div>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "users"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Logged In
            </div>
          </button>
        </div>

        {activeTab === "applicants" ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col lg:flex-row gap-4 items-center shadow-sm">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Find applications by name, email, or destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              <div className="flex gap-4 w-full lg:w-auto">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="flex-1 lg:flex-none px-6 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="all">All Stages</option>
                  <option value="pending">Review Pending</option>
                  <option value="approved">Approved &amp; Ready</option>
                  <option value="rejected">Unqualified</option>
                </select>
              </div>
            </div>

            {!selectedTrip ? (
              /* Trip List View */
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                  Active Retreat Locations
                </h2>
                {tripList.length === 0 ? (
                  <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 py-20 text-center shadow-sm">
                    <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
                      <CalendarIcon className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      No Application Data Available
                    </h3>
                    <p className="text-slate-500 font-medium">
                      Once users apply, destinations will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tripList.map((trip) => {
                      const count = bookings.filter(
                        (b) => b.destination === trip,
                      ).length;
                      const paidCount = bookings.filter(
                        (b) =>
                          b.destination === trip && b.payment_status === "paid",
                      ).length;
                      const progress = (paidCount / count) * 100;

                      return (
                        <button
                          key={trip}
                          onClick={() => setSelectedTrip(trip)}
                          className="group relative bg-white hover:bg-slate-50 transition-all border border-slate-200 rounded-3xl p-8 text-left overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-200"
                        >
                          {/* Progress Bar Accent */}
                          <div
                            className="absolute top-0 left-0 h-1.5 bg-emerald-600 transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                          />

                          <div className="flex items-start justify-between mb-8">
                            <div className="p-3 bg-emerald-50 rounded-2xl group-hover:scale-110 transition-transform border border-emerald-100">
                              <MapPin className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-3xl font-black text-slate-900">
                                {count}
                              </span>
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                Applicants
                              </span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                            {trip}
                          </h3>
                          <p className="text-slate-500 text-sm mb-6 font-medium line-clamp-1">
                            SyncRetreat Destination Dashboard
                          </p>

                          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                            <div className="flex -space-x-2">
                              {[...Array(Math.min(3, count))].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center shadow-sm"
                                >
                                  <Users className="w-3 h-3 text-slate-400" />
                                </div>
                              ))}
                              {/* FIX 1: Added parentheses around JSX in && expression */}
                              {count > 3 && (
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold shadow-sm">
                                  +{count - 3}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
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
                    className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors font-bold group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Location List
                  </button>
                  <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full shadow-sm">
                    <p className="text-emerald-700 text-sm font-bold flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {selectedTrip} Cohort
                    </p>
                  </div>
                </div>

                {tripBookings.length === 0 ? (
                  <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 font-medium">
                      No matching applications found for this location.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-8">
                    {tripBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-slate-300"
                      >
                        {/* Top Bar Accent */}
                        <div
                          className={`h-1.5 w-full ${
                            booking.status === "approved"
                              ? "bg-emerald-500"
                              : booking.status === "rejected"
                                ? "bg-rose-500"
                                : "bg-amber-500"
                          }`}
                        />

                        <div className="p-8 lg:p-10">
                          {/* Identity Section */}
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10">
                            <div className="flex gap-6 items-center">
                              <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-3xl font-black text-emerald-600 border border-slate-100 shadow-inner">
                                {booking.name.charAt(0)}
                              </div>
                              <div>
                                <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight leading-none mb-3">
                                  {booking.name}
                                </h2>
                                <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                                  <p className="text-slate-600 flex items-center gap-2 text-sm font-medium">
                                    <Mail className="w-4 h-4 text-emerald-600" />{" "}
                                    {booking.email}
                                  </p>
                                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                                  <p className="text-slate-600 flex items-center gap-2 text-sm font-mono tracking-tighter font-medium">
                                    {booking.phone}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              <div
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
                                  booking.status === "approved"
                                    ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                    : booking.status === "rejected"
                                      ? "bg-rose-50 border-rose-100 text-rose-700"
                                      : "bg-amber-50 border-amber-100 text-amber-700"
                                }`}
                              >
                                {booking.status}
                              </div>
                              <div
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
                                  booking.payment_status === "paid"
                                    ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                    : "bg-slate-50 border-slate-200 text-slate-500"
                                }`}
                              >
                                {booking.payment_status}
                              </div>
                              <button
                                onClick={() => handleDelete(booking.id)}
                                disabled={isDeleting === booking.id}
                                className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all border border-rose-100"
                              >
                                {isDeleting === booking.id ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Professional Info Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                                <Globe className="w-3 h-3" /> Origin
                              </div>
                              <p className="text-slate-900 font-bold">
                                {booking.country || "Not set"}
                              </p>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                                <Briefcase className="w-3 h-3" /> Profession
                              </div>
                              <p className="text-slate-900 font-bold">
                                {booking.work_designation || "Not set"}
                              </p>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                                <Clock className="w-3 h-3" /> Experience
                              </div>
                              <p className="text-slate-900 font-bold">
                                {booking.remote_work || "Not set"}
                              </p>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
                                <ExternalLink className="w-3 h-3" /> Socials
                              </div>
                              <div className="flex gap-4">
                                {booking.linkedin ? (
                                  <a
                                    href={booking.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:text-blue-700 transition-colors font-bold text-sm"
                                  >
                                    LinkedIn
                                  </a>
                                ) : (
                                  <span className="text-slate-400 text-sm font-medium">
                                    N/A
                                  </span>
                                )}
                                {booking.portfolio ? (
                                  <a
                                    href={booking.portfolio}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-600 hover:text-emerald-700 transition-colors font-bold text-sm"
                                  >
                                    Portfolio
                                  </a>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          {/* Qualitative Section */}
                          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-10">
                            <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                              <Info className="w-3 h-3" /> Candidate Mission
                            </h4>
                            <p className="text-slate-700 text-sm leading-relaxed italic font-medium">
                              &ldquo;
                              {booking.about_you ||
                                "No mission statement provided."}
                              &rdquo;
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                              {booking.interests
                                ?.split(",")
                                .map((interest, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-white text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-200 shadow-sm"
                                  >
                                    {interest.trim()}
                                  </span>
                                ))}
                            </div>
                          </div>

                          {/* Control Deck */}
                          <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-slate-100">
                            <button
                              onClick={() => handleSendConfirmation(booking)}
                              disabled={!!actionLoading[booking.id]}
                              className="flex items-center gap-2 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-slate-200 shadow-sm"
                            >
                              {actionLoading[booking.id] === "confirmation" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Mail className="w-4 h-4" />
                              )}
                              Confirmation
                            </button>

                            <button
                              onClick={() =>
                                handleSendWelcome(
                                  booking.email,
                                  booking.name,
                                  booking.id,
                                )
                              }
                              disabled={!!actionLoading[booking.id]}
                              className="flex items-center gap-2 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-slate-200 shadow-sm"
                            >
                              {actionLoading[booking.id] === "welcome" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Mail className="w-4 h-4 text-emerald-600" />
                              )}
                              Welcome
                            </button>

                            <button
                              onClick={() =>
                                handleSendBookingConfirmation(booking)
                              }
                              disabled={!!actionLoading[booking.id]}
                              className="flex items-center gap-2 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-slate-200 shadow-sm"
                            >
                              {actionLoading[booking.id] ===
                              "booking_confirmation" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                              )}
                              Booking Confirmed
                            </button>

                            <button
                              onClick={() => handleSendFinalPayment(booking)}
                              disabled={!!actionLoading[booking.id]}
                              className="flex items-center gap-2 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-700 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-slate-200 shadow-sm"
                            >
                              {actionLoading[booking.id] === "final_payment" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Wallet className="w-4 h-4 text-amber-600" />
                              )}
                              Final Reminder
                            </button>

                            <div className="h-8 w-px bg-slate-200 mx-2" />

                            <button
                              onClick={() => handleApprove(booking)}
                              disabled={
                                !!actionLoading[booking.id] ||
                                booking.status === "approved"
                              }
                              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-100 disabled:text-slate-400 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10"
                            >
                              {actionLoading[booking.id] === "approve" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                              Approve
                            </button>

                            <button
                              onClick={() => handleReject(booking)}
                              disabled={
                                !!actionLoading[booking.id] ||
                                booking.status === "rejected"
                              }
                              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-100 disabled:text-slate-400 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                            >
                              {actionLoading[booking.id] === "reject" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                              Reject
                            </button>

                            <div className="h-8 w-px bg-slate-200 mx-2" />

                            {booking.payment_status !== "paid" ? (
                              <button
                                onClick={() => handleMarkPaid(booking)}
                                disabled={!!actionLoading[booking.id]}
                                className="flex items-center gap-2 bg-[#1A2421] hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-slate-900/20"
                              >
                                {actionLoading[booking.id] === "paid" ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <DollarSign className="w-4 h-4" />
                                )}
                                Mark as Paid
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMarkUnpaid(booking)}
                                disabled={!!actionLoading[booking.id]}
                                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                              >
                                {actionLoading[booking.id] === "unpaid" ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <DollarSign className="w-4 h-4" />
                                )}
                                Mark Unpaid
                              </button>
                            )}
                          </div>

                          <div className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Application ID: {booking.id} • Submitted:{" "}
                            {new Date(booking.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        User
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Email
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Signed Up
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => {
                      const name = user.user_metadata?.first_name
                        ? `${user.user_metadata.first_name} ${
                            user.user_metadata.last_name || ""
                          }`
                        : user.email?.split("@")[0];

                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-slate-50/50 transition-all"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold border border-emerald-100">
                                {name?.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-bold text-slate-900">
                                {name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-medium">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() =>
                                handleSendWelcome(user.email!, name!, user.id)
                              }
                              disabled={!!actionLoading[user.id]}
                              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-slate-200 shadow-sm disabled:opacity-50"
                            >
                              {actionLoading[user.id] === "welcome" ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                              )}
                              Send Welcome
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* FIX 2: Removed stray closing )} and fixed conditional rendering */}
              {users.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-slate-500 font-medium">
                    No registered users found.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
