import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { sendEmail } from '../../lib/emailservice';
import { Mail, Check, X, DollarSign, Loader2, AlertCircle, CheckCircle } from "lucide-react";

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
  type: "success" | "error";
  message: string;
}

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [actionLoading, setActionLoading] = useState<{ [key: string]: string }>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [paymentLink, setPaymentLink] = useState("https://paypal.me/syncretreat/199USD");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "syncretreat2026";

  const showToast = (type: "success" | "error", message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase.from("bookings").select("*");

console.log("Fetched data:", data);
console.log("Fetch error:", error);

if (error) {
  console.error("Error fetching bookings:", error.message);
} else {
      setBookings(data || []);
    }
    setLoading(false);
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
      showToast("success", `✅ Confirmation email sent to ${booking.name} (${booking.email})`);
    } else {
      showToast("error", `❌ Failed to send email: ${result.message}`);
    }

    clearActionState(booking.id);
  };

  const handleApprove = async (booking: Booking) => {
    setActionState(booking.id, "approve");

    // Update status in database
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status: "approved" })
      .eq("id", booking.id);

    if (updateError) {
      showToast("error", `❌ Failed to update status: ${updateError.message}`);
      clearActionState(booking.id);
      return;
    }

    // Send approval email with payment link
    const result = await sendEmail({
      to: booking.email,
      name: booking.name,
      type: "approved",
      destination: booking.destination,
      paymentLink: paymentLink,
    });

    if (result.success) {
      showToast("success", `✅ ${booking.name} approved! Payment email sent to ${booking.email}`);
      fetchBookings();
    } else {
      showToast("error", `⚠️ Status updated but email failed: ${result.message}`);
      fetchBookings();
    }

    clearActionState(booking.id);
  };

  const handleReject = async (booking: Booking) => {
    setActionState(booking.id, "reject");

    // Update status in database
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status: "rejected" })
      .eq("id", booking.id);

    if (updateError) {
      showToast("error", `❌ Failed to update status: ${updateError.message}`);
      clearActionState(booking.id);
      return;
    }

    // Send rejection email
    const result = await sendEmail({
      to: booking.email,
      name: booking.name,
      type: "rejected",
      destination: booking.destination,
    });

    if (result.success) {
      showToast("success", `✅ ${booking.name} rejected. Notification sent to ${booking.email}`);
      fetchBookings();
    } else {
      showToast("error", `⚠️ Status updated but email failed: ${result.message}`);
      fetchBookings();
    }

    clearActionState(booking.id);
  };

  const handleMarkPaid = async (booking: Booking) => {
    setActionState(booking.id, "paid");

    const { error } = await supabase
      .from("bookings")
      .update({ payment_status: "paid" })
      .eq("id", booking.id);

    if (error) {
      showToast("error", `❌ Failed to update payment status: ${error.message}`);
    } else {
      showToast("success", `✅ ${booking.name} marked as PAID`);
      fetchBookings();
    }

    clearActionState(booking.id);
  };

  const handleMarkUnpaid = async (booking: Booking) => {
    setActionState(booking.id, "unpaid");

    const { error } = await supabase
      .from("bookings")
      .update({ payment_status: "unpaid" })
      .eq("id", booking.id);

    if (error) {
      showToast("error", `❌ Failed to update payment status: ${error.message}`);
    } else {
      showToast("success", `✅ ${booking.name} marked as UNPAID`);
      fetchBookings();
    }

    clearActionState(booking.id);
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getPaymentColor = (status: string) => {
    return status === "paid" ? "bg-green-500" : "bg-gray-500";
  };

  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
          <h1 className="text-white text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && password === ADMIN_PASSWORD) {
                setAuthenticated(true);
              }
            }}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              if (password === ADMIN_PASSWORD) {
                setAuthenticated(true);
              } else {
                showToast("error", "Wrong password");
              }
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg max-w-md ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            } text-white animate-slide-in`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <p className="text-sm">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Booking Dashboard</h1>
            <p className="text-gray-400 mt-1">{bookings.length} total applications</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Payment Link Input */}
            <div className="flex items-center gap-2">
              <label className="text-gray-400 text-sm whitespace-nowrap">PayPal Link:</label>
              <input
                type="url"
                value={paymentLink}
                onChange={(e) => setPaymentLink(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All ({bookings.length})</option>
              <option value="pending">Pending ({bookings.filter((b) => b.status === "pending").length})</option>
              <option value="approved">Approved ({bookings.filter((b) => b.status === "approved").length})</option>
              <option value="rejected">Rejected ({bookings.filter((b) => b.status === "rejected").length})</option>
            </select>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid gap-6">
          {filteredBookings.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              No bookings found.
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">{booking.name}</h2>
                    <p className="text-gray-400">{booking.email}</p>
                    <p className="text-gray-400">{booking.phone}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Applied: {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)} text-white`}>
                      {booking.status.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentColor(booking.payment_status)} text-white`}>
                      {booking.payment_status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs uppercase">Destination</p>
                    <p className="text-white">{booking.destination || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs uppercase">Remote Work</p>
                    <p className="text-white">{booking.remote_work || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs uppercase">Work</p>
                    <p className="text-white">{booking.work_designation || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs uppercase">Country</p>
                    <p className="text-white">{booking.country || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs uppercase">Age</p>
                    <p className="text-white">{booking.age || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-500 text-xs uppercase">How Heard</p>
                    <p className="text-white">{booking.how_heard || "Not specified"}</p>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 mb-4">
                  {booking.linkedin && (
                    <a
                      href={booking.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      LinkedIn →
                    </a>
                  )}
                  {booking.portfolio && (
                    <a
                      href={booking.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      Portfolio →
                    </a>
                  )}
                </div>

                {/* About */}
                {booking.about_you && (
                  <div className="mb-6">
                    <p className="text-gray-500 text-xs uppercase mb-1">About</p>
                    <p className="text-gray-300 text-sm">{booking.about_you}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700">
                  {/* Send Confirmation */}
                  <button
                    onClick={() => handleSendConfirmation(booking)}
                    disabled={!!actionLoading[booking.id]}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {actionLoading[booking.id] === "confirmation" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    Send Confirmation
                  </button>

                  {/* Approve */}
                  <button
                    onClick={() => handleApprove(booking)}
                    disabled={!!actionLoading[booking.id] || booking.status === "approved"}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {actionLoading[booking.id] === "approve" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Approve & Send Payment Link
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() => handleReject(booking)}
                    disabled={!!actionLoading[booking.id] || booking.status === "rejected"}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {actionLoading[booking.id] === "reject" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    Reject
                  </button>

                  {/* Payment Toggle */}
                  {booking.payment_status === "unpaid" ? (
                    <button
                      onClick={() => handleMarkPaid(booking)}
                      disabled={!!actionLoading[booking.id]}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
                      className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      {actionLoading[booking.id] === "unpaid" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <DollarSign className="w-4 h-4" />
                      )}
                      Mark as Unpaid
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}