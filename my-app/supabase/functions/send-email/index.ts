import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

// Standard CORS headers required by browsers interacting with Supabase Edge Functions
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: { method: string; json: () => any; }) => {
  // 1. Handle CORS Preflight (CRITICAL FOR FRONTEND CALLS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Ensure the API key is present
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      throw new Error("RESEND_API_KEY is not configured in Edge Function secrets.");
    }

    const resend = new Resend(resendKey);
    const SENDER_EMAIL = 'SyncRetreat <founder@syncretreat.com>';
    const payload = await req.json();

    // ---------------------------------------------------------
    // ROUTE 1: DATABASE WEBHOOK (Automated State Changes)
    // ---------------------------------------------------------
    if (payload.type === 'UPDATE' && payload.table === 'bookings') {
      const oldRecord = payload.old_record;
      const newRecord = payload.record;

      // Approval Automation
      if (oldRecord.status !== 'approved' && newRecord.status === 'approved') {
        const data = await resend.emails.send({
          from: SENDER_EMAIL,
          to: newRecord.email,
          subject: `Action Required: Your SyncRetreat Application for ${newRecord.destination} is Approved`,
          html: `
            <h2>Welcome to the next step, ${newRecord.name}</h2>
            <p>Your application has been reviewed and approved.</p>
            <p>Please complete your payment of $1499 USD to secure your spot.</p>
            <a href="https://paypal.me/syncretreat/1499USD" style="padding:10px 20px; background:#10b981; color:white; text-decoration:none; border-radius:5px;">Complete Payment</a>
          `
        });
        return new Response(JSON.stringify({ success: true, db_event: "approved", data }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Rejection Automation
      if (oldRecord.status !== 'rejected' && newRecord.status === 'rejected') {
        const data = await resend.emails.send({
          from: SENDER_EMAIL,
          to: newRecord.email,
          subject: 'Update regarding your SyncRetreat Application',
          html: `<p>Hello ${newRecord.name}, unfortunately we are unable to proceed with your application at this time.</p>`
        });
        return new Response(JSON.stringify({ success: true, db_event: "rejected", data }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Payment Automation
      if (oldRecord.payment_status !== 'paid' && newRecord.payment_status === 'paid') {
        const data = await resend.emails.send({
          from: SENDER_EMAIL,
          to: newRecord.email,
          subject: 'Payment Received: Welcome to SyncRetreat',
          html: `
            <h2>Payment Confirmed</h2>
            <p>Hello ${newRecord.name}, we have successfully received your payment for the ${newRecord.destination} cohort.</p>
            <p>We will be sending your onboarding materials shortly.</p>
          `
        });
        return new Response(JSON.stringify({ success: true, db_event: "paid", data }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ success: true, message: "Webhook payload processed, no state change triggered an email." }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ---------------------------------------------------------
    // ROUTE 2: DIRECT API CALL (Manual Frontend Actions)
    // ---------------------------------------------------------
    const { to, name, type, destination } = payload;

    if (type === 'reminder') {
      const data = await resend.emails.send({
        from: SENDER_EMAIL,
        to: to,
        subject: `Reminder: SyncRetreat Application for ${destination}`,
        html: `<p>Hello ${name}, this is a reminder regarding your pending application.</p>`
      });
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (type === 'confirmation') {
      const data = await resend.emails.send({
        from: SENDER_EMAIL,
        to: to,
        subject: `SyncRetreat Application Received`,
        html: `<p>Hello ${name}, we have received your application for ${destination} and are currently reviewing it.</p>`
      });
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (type === 'welcome') {
      const data = await resend.emails.send({
        from: SENDER_EMAIL,
        to: to,
        subject: `Welcome to SyncRetreat, ${name}!`,
        html: `
          <h1>Welcome to the Community!</h1>
          <p>Hello ${name}, we're excited to have you join SyncRetreat.</p>
          <p>Explore our upcoming retreats and start your journey with us.</p>
          <a href="https://syncretreat.com/destinations" style="padding:10px 20px; background:#10b981; color:white; text-decoration:none; border-radius:5px;">Explore Destinations</a>
        `
      });
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (type === 'booking_confirmation') {
      const data = await resend.emails.send({
        from: SENDER_EMAIL,
        to: to,
        subject: `Booking Confirmed: Thanks for joining SyncRetreat!`,
        html: `
          <h1>Your Booking is Confirmed!</h1>
          <p>Hello ${name}, thank you for completing your payment. Your spot in the ${destination} cohort is now officially secured.</p>
          <p>We're thrilled to have you with us. Stay tuned for onboarding details!</p>
        `
      });
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (type === 'final_payment') {
      const data = await resend.emails.send({
        from: SENDER_EMAIL,
        to: to,
        subject: `Action Required: Final Payment for your SyncRetreat`,
        html: `
          <h1>Final Payment Reminder</h1>
          <p>Hello ${name}, your retreat in ${destination} is just one month away!</p>
          <p>Please complete the remaining balance of your payment to finalize your booking.</p>
          <a href="https://paypal.me/syncretreat/final" style="padding:10px 20px; background:#10b981; color:white; text-decoration:none; border-radius:5px;">Complete Final Payment</a>
        `
      });
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // If payload matches neither Webhook nor Manual call
    return new Response(JSON.stringify({ error: "Invalid payload type." }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});