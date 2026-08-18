import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", receipt } = await request.json();

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Missing Razorpay credentials", { 
        keyId: !!keyId, 
        keySecret: !!keySecret,
        env: process.env.NODE_ENV 
      });
      return NextResponse.json(
        { 
          error: "Payment service not configured. Please contact support.",
          details: "Missing Razorpay credentials"
        },
        { status: 500 }
      );
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Amount in paise
        currency,
        receipt,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Razorpay API error:", {
        status: response.status,
        statusText: response.statusText,
        error: error,
      });
      return NextResponse.json(
        { 
          error: "Payment service error. Please try again or contact support.",
          details: `Razorpay returned ${response.status}`
        },
        { status: 500 }
      );
    }

    const order = await response.json();
    return NextResponse.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { 
        error: "Failed to create order. Please try again or contact support.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
