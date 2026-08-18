"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface RazorpayButtonProps {
  amount: number;
  destination: string;
  onSuccess?: (paymentDetails: any) => void;
  className?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  amount,
  destination,
  onSuccess,
  className = "",
}) => {
  const [loading, setLoading] = useState(false);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    if (!scriptLoaded.current) {
      toast.error("Payment system loading", {
        description: "Please wait a moment and try again",
      });
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "USD",
          receipt: `receipt_${Date.now()}`,
        }),
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const order = await orderRes.json();

      // Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "SyncRetreat",
        description: `${destination} Retreat Booking`,
        image: "/logo2.png",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify signature
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const { isValid } = await verifyRes.json();

            if (isValid) {
              toast.success("Payment successful!", {
                description: "Your booking is confirmed",
              });
              onSuccess?.(response);
              
              // Redirect to success page
              window.location.href = `/booking-success?payment_id=${response.razorpay_payment_id}`;
            } else {
              toast.error("Payment verification failed", {
                description: "Please contact support",
              });
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#047857",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        toast.error("Payment failed", {
          description: response.error.description,
        });
        setLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error instanceof Error ? error.message : "Payment initiation failed";
      toast.error("Payment Error", {
        description: errorMessage + ". Please contact support at hello@syncretreat.com",
      });
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`${className} bg-emerald-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-600/20 uppercase tracking-wide w-full ${
        loading ? "opacity-50" : ""
      }`}
    >
      {loading ? "Processing..." : "Book Now"}
    </button>
  );
};
