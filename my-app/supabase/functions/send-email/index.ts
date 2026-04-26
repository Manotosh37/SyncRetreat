import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// CORS headers — allow requests from your production domain and localhost
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight (OPTIONS) request — browsers send this before the real POST
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  const payload = await req.json();

  let to = "";
  let name = "";
  let emailType = "";

  // 1. New User Registration (auth.users)
  if (payload.table === 'users' && payload.type === 'INSERT') {
    to = payload.record.email;
    name = payload.record.raw_user_meta_data?.name || 'Explorer';
    emailType = 'welcome';
  }

  // 2. Booking Updates / Inserts
  else if (payload.table === 'bookings') {
    to = payload.record.email;
    name = payload.record.name;

    if (payload.type === 'INSERT' && payload.record.status === 'pending') {
      emailType = 'booking_confirmation';
    }
    else if (payload.type === 'UPDATE') {
      // Status changed to Approved
      if (payload.old_record.status !== 'approved' && payload.record.status === 'approved') {
        emailType = 'payment_link';
      }
      // Status changed to Paid
      else if (payload.old_record.payment_status !== 'paid' && payload.record.payment_status === 'paid') {
        emailType = 'thank_you';
      }
    }
  }

  // 3. Direct call from admin dashboard
  else if (payload.to && payload.name && payload.type) {
    to = payload.to;
    name = payload.name;
    emailType = payload.type;
  }

  // 4. Abandoned Cart (from cron job)
  else if (payload.type === 'ABANDONED_CART') {
    to = payload.email;
    name = payload.name;
    emailType = 'abandoned_cart';
  }

  // If none of our conditions match, don't send an email
  if (!emailType) {
    return new Response(
      JSON.stringify({ message: "No email action required." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const subjectMap: Record<string, string> = {
    'welcome': "Welcome to SyncRetreat!",
    'booking_confirmation': "We received your application",
    'confirmation': "We received your application",
    'payment_link': "Your application is approved! (Payment Link Inside)",
    'approved': "Your application is approved! (Payment Link Inside)",
    'thank_you': "Payment Complete - Your SyncRetreat Itinerary",
    'rejected': "Update on your SyncRetreat application",
    'final_payment': "Final payment reminder - SyncRetreat",
    'abandoned_cart': "Did you forget something? Complete your SyncRetreat application.",
  };

  const emailWrapper = (title: string, content: string, statusText: string) => `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #18181b; padding: 30px 40px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">SyncRetreat</h1>
        </div>
        <div style="padding: 40px; color: #3f3f46; font-size: 16px; line-height: 1.6;">
          <h2 style="color: #18181b; font-size: 20px; margin-top: 0; margin-bottom: 20px;">${title}</h2>
          ${content}
          <div style="margin-top: 30px; display: inline-block; padding: 6px 12px; background-color: #f4f4f5; border-radius: 6px; font-size: 12px; font-weight: 600; color: #52525b; text-transform: uppercase; letter-spacing: 0.5px;">
            Status: ${statusText}
          </div>
        </div>
        <div style="padding: 20px 40px; text-align: center; background-color: #fafafa; border-top: 1px solid #f4f4f5; color: #a1a1aa; font-size: 14px;">
          &copy; ${new Date().getFullYear()} SyncRetreat. All rights reserved.<br>
          High-altitude deep work for engineers.
        </div>
      </div>
    </div>
  `;

  const htmlMap: Record<string, string> = {
    'welcome': emailWrapper(
      "Welcome to SyncRetreat",
      `<p style="margin-bottom: 16px;">Hello ${name},</p>
       <p style="margin-bottom: 16px;">Welcome to the SyncRetreat network. You are now officially in the queue for upcoming deployment nodes.</p>
       <p style="margin-bottom: 16px;">We build infrastructure for extreme output. Expect zero distractions, enterprise-grade routing, and absolute focus during your stay.</p>`,
      "STANDBY"
    ),

    'booking_confirmation': emailWrapper(
      "Application Received",
      `<p style="margin-bottom: 16px;">Hello ${name},</p>
       <p style="margin-bottom: 16px;">Your application for the upcoming 28-day sprint has been successfully registered in our system.</p>
       <p style="margin-bottom: 16px;">Our operations team is currently reviewing your profile to ensure alignment with the cohort's focus parameters. You will receive a status update within 24 hours.</p>`,
      "PENDING REVIEW"
    ),

    'confirmation': emailWrapper(
      "Application Received",
      `<p style="margin-bottom: 16px;">Hello ${name},</p>
       <p style="margin-bottom: 16px;">Your application for the upcoming 28-day sprint has been successfully registered in our system.</p>
       <p style="margin-bottom: 16px;">Our operations team is currently reviewing your profile to ensure alignment with the cohort's focus parameters. You will receive a status update within 24 hours.</p>`,
      "PENDING REVIEW"
    ),

    'payment_link': emailWrapper(
      "Application Approved",
      `<p style="margin-bottom: 16px;">Congratulations ${name},</p>
       <p style="margin-bottom: 16px;">Your application has cleared our review process. We have reserved a physical workstation and living quarters for you.</p>
       <p style="margin-bottom: 16px;">This seat allocation is valid for exactly <strong>48 hours</strong>. To lock your node and initialize logistics, please secure the escrow deposit.</p>`,
      "ACTION REQUIRED"
    ),

    'approved': emailWrapper(
      "Application Approved",
      `<p style="margin-bottom: 16px;">Congratulations ${name},</p>
       <p style="margin-bottom: 16px;">Your application has cleared our review process. We have reserved a physical workstation and living quarters for you.</p>
       <p style="margin-bottom: 16px;">This seat allocation is valid for exactly <strong>48 hours</strong>. To lock your node and initialize logistics, please secure the escrow deposit.</p>`,
      "ACTION REQUIRED"
    ),

    'thank_you': emailWrapper(
      "Escrow Secured & Node Confirmed",
      `<p style="margin-bottom: 16px;">Hello ${name},</p>
       <p style="margin-bottom: 16px;">Your deposit is verified. You are officially locked in for the upcoming deep-work sprint.</p>
       <p style="margin-bottom: 16px;">Within the next 7 days, you will receive your pre-deployment packet containing network configurations, altitude acclimatization protocols, and transit routing.</p>
       <p style="margin-bottom: 16px;">Prepare your codebase. It's time to build.</p>`,
      "LOCKED"
    ),

    'rejected': emailWrapper(
      "Application Update",
      `<p style="margin-bottom: 16px;">Hello ${name},</p>
       <p style="margin-bottom: 16px;">Thank you for your interest in SyncRetreat. After careful review, we are unable to offer you a spot in the current cohort.</p>
       <p style="margin-bottom: 16px;">We appreciate your application and encourage you to apply for a future retreat.</p>`,
      "NOT SELECTED"
    ),

    'final_payment': emailWrapper(
      "Final Payment Reminder",
      `<p style="margin-bottom: 16px;">Hello ${name},</p>
       <p style="margin-bottom: 16px;">This is a reminder that your final payment for the SyncRetreat is due soon.</p>
       <p style="margin-bottom: 16px;">Please complete your payment at the earliest to secure your spot.</p>`,
      "PAYMENT DUE"
    ),

    'abandoned_cart': emailWrapper(
      "Incomplete Application",
      `<p style="margin-bottom: 16px;">Hello ${name},</p>
       <p style="margin-bottom: 16px;">Our logs show you initiated an application for the upcoming sprint but did not complete the sequence.</p>
       <p style="margin-bottom: 16px;">We operate on strict capacity limits. If you require absolute focus to ship your next release, please finalize your allocation request. Otherwise, the node will be released to the next operator in the queue.</p>`,
      "TIMEOUT IMMINENT"
    )
  };

  const emailBody = {
    from: "SyncRetreat <contact@syncretreat.com>",
    to: [to],
    subject: subjectMap[emailType] || "Update from SyncRetreat",
    html: htmlMap[emailType] || `<p>System alert for ${name}.</p>`,
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(emailBody),
  });

  const resData = await res.json();
  return new Response(
    JSON.stringify(resData),
    { status: res.ok ? 200 : 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
