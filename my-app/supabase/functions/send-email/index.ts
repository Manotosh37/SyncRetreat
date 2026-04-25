import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
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

  // 3. Abandoned Cart (from cron job)
  else if (payload.type === 'ABANDONED_CART') {
    to = payload.email;
    name = payload.name;
    emailType = 'abandoned_cart';
  }

  // If none of our conditions match, don't send an email
  if (!emailType) {
    return new Response(JSON.stringify({ message: "No email action required." }), { status: 200 });
  }

  // NOTE: You will want to replace these basic strings with your beautiful HTML templates!
  const subjectMap: Record<string, string> = {
    'welcome': "Welcome to SyncRetreat!",
    'booking_confirmation': "We received your application",
    'payment_link': "Your application is approved! (Payment Link Inside)",
    'thank_you': "Payment Complete - Your SyncRetreat Itinerary",
    'abandoned_cart': "Did you forget something? Complete your SyncRetreat application."
  };

  const htmlMap: Record<string, string> = {
    'welcome': `
      <div style="font-family: 'Courier New', monospace; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <h2 style="text-transform: uppercase; font-size: 18px; letter-spacing: 2px; border-bottom: 1px solid #111; padding-bottom: 10px;">> SYNC_RETREAT: PERIMETER ACCESS</h2>
        <p style="font-size: 14px; line-height: 1.6;">Engineer \${name},</p>
        <p style="font-size: 14px; line-height: 1.6;">You have joined the SyncRetreat network. You are now in the queue for upcoming deployment nodes.</p>
        <p style="font-size: 14px; line-height: 1.6;">We build infrastructure for extreme output. Expect zero distractions, enterprise-grade routing, and absolute focus.</p>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">SYSTEM // STANDBY</p>
      </div>
    `,

    'booking_confirmation': `
      <div style="font-family: 'Courier New', monospace; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <h2 style="text-transform: uppercase; font-size: 18px; letter-spacing: 2px; border-bottom: 1px solid #111; padding-bottom: 10px;">> ALLOCATION REQUEST: LOGGED</h2>
        <p style="font-size: 14px; line-height: 1.6;">\${name},</p>
        <p style="font-size: 14px; line-height: 1.6;">Your application for the upcoming 28-day sprint has been registered in our system.</p>
        <p style="font-size: 14px; line-height: 1.6;">Our operations team is currently reviewing your profile to ensure alignment with the cohort's focus parameters. You will receive a status update within 24 hours.</p>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">STATUS // PENDING REVIEW</p>
      </div>
    `,

    'payment_link': `
      <div style="font-family: 'Courier New', monospace; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <h2 style="text-transform: uppercase; font-size: 18px; letter-spacing: 2px; border-bottom: 1px solid #111; padding-bottom: 10px;">> NODE ALLOCATION: APPROVED</h2>
        <p style="font-size: 14px; line-height: 1.6;">\${name},</p>
        <p style="font-size: 14px; line-height: 1.6;">Your application has cleared the filter. We have reserved a physical workstation and living quarters for you.</p>
        <p style="font-size: 14px; line-height: 1.6;">This seat allocation is valid for exactly <strong>48 hours</strong>. To lock your node and initialize logistics, secure the escrow deposit below.</p>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">ACTION // REQUIRED</p>
      </div>
    `,

    'thank_you': `
      <div style="font-family: 'Courier New', monospace; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <h2 style="text-transform: uppercase; font-size: 18px; letter-spacing: 2px; border-bottom: 1px solid #111; padding-bottom: 10px;">> ESCROW SECURED. NODE CONFIRMED.</h2>
        <p style="font-size: 14px; line-height: 1.6;">\${name},</p>
        <p style="font-size: 14px; line-height: 1.6;">Your deposit is verified. You are officially locked in for the upcoming deep-work sprint.</p>
        <p style="font-size: 14px; line-height: 1.6;">Within the next 7 days, you will receive your pre-deployment packet containing network configurations, altitude acclimatization protocols, and transit routing.</p>
        <p style="font-size: 14px; line-height: 1.6;">Prepare your codebase. Ghost Mode initializes soon.</p>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">STATUS // LOCKED</p>
      </div>
    `,

    'abandoned_cart': `
      <div style="font-family: 'Courier New', monospace; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
        <h2 style="text-transform: uppercase; font-size: 18px; letter-spacing: 2px; border-bottom: 1px solid #111; padding-bottom: 10px;">> INCOMPLETE PROTOCOL DETECTED</h2>
        <p style="font-size: 14px; line-height: 1.6;">\${name},</p>
        <p style="font-size: 14px; line-height: 1.6;">Our logs show you initiated an application for the upcoming sprint but did not complete the sequence.</p>
        <p style="font-size: 14px; line-height: 1.6;">We operate on strict capacity limits. If you require absolute focus to ship your next release, finalize your allocation request immediately. Otherwise, the node will be released to the next operator in the queue.</p>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">STATUS // TIMEOUT IMMINENT</p>
      </div>
    `
  };

  const emailBody = {
    from: "SyncRetreat <contact@syncretreat.com>", // Update with your actual verified sender domain
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
  return new Response(JSON.stringify(resData), { status: 200 });
});
