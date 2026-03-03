import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, name, type, destination, paymentLink } = await req.json();

    let subject = "";
    let html = "";

    if (type === "confirmation") {
      subject = "🎉 SyncRetreat Application Received!";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #3B82F6;">SyncRetreat</h1>
          <h2>Welcome, ${name}! 👋</h2>
          <p>We've received your application for <strong>${destination || "our retreat"}</strong>.</p>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>What happens next?</h3>
            <ol>
              <li>Our team will review your application</li>
              <li>We'll schedule a quick intro call</li>
              <li>You'll receive a decision within 48-72 hours</li>
            </ol>
          </div>
          <p>Questions? Reply to this email.</p>
          <p>— The SyncRetreat Team</p>
        </div>
      `;
    }

    if (type === "approved") {
      subject = "✅ Congratulations! You're Approved for SyncRetreat!";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #3B82F6;">SyncRetreat</h1>
          <div style="text-align: center; font-size: 60px;">🎉</div>
          <h2 style="color: #10B981; text-align: center;">Congratulations, ${name}!</h2>
          <p style="text-align: center; font-size: 18px;">
            You've been <strong>approved</strong> for the SyncRetreat <strong>${destination || "retreat"}</strong>!
          </p>
          <div style="background: #ECFDF5; padding: 25px; border-radius: 8px; margin: 30px 0; border: 1px solid #10B981; text-align: center;">
            <h3 style="color: #065F46;">Secure Your Spot</h3>
            <p style="color: #047857;">Complete your deposit payment of <strong>$199 USD</strong></p>
            <a href="${paymentLink}" style="background: #3B82F6; color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 15px;">
              Pay Now →
            </a>
          </div>
          <p>Questions? Reply to this email.</p>
          <p>— The SyncRetreat Team</p>
        </div>
      `;
    }

    if (type === "rejected") {
      subject = "Update on Your SyncRetreat Application";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #3B82F6;">SyncRetreat</h1>
          <h2>Hi ${name},</h2>
          <p>Thank you for your interest in joining SyncRetreat.</p>
          <p>After careful review, we're unable to offer you a spot for <strong>${destination || "this retreat"}</strong> at this time.</p>
          <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #F59E0B;">
            <h4 style="color: #92400E;">Don't Give Up! 💪</h4>
            <ul style="color: #92400E;">
              <li>Apply again for upcoming retreats</li>
              <li>Update your profile with more details</li>
              <li>Follow us for new announcements</li>
            </ul>
          </div>
          <p>Warm regards,<br><strong>The SyncRetreat Team</strong></p>
        </div>
      `;
    }

    // Check if RESEND_API_KEY exists
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SyncRetreat <founder@syncretreat.com>",
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      return new Response(JSON.stringify({ error: data.message || "Failed to send email" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Function error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});