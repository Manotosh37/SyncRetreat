import { serve } from 'https://deno.land/x/sift@0.6.0/mod.ts';
import { Resend } from 'https://esm.sh/@resend/resend';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Edge Function to send transactional emails via Resend.
 * Also handles server-side user account creation for 'welcome' type.
 *
 * Expected payload (JSON):
 * {
 *   "to": "user@example.com",
 *   "name": "User Name",
 *   "type": "welcome" | "confirmation" | "approved" | "rejected" | "reminder",
 *   "destination": "Goa" (optional),
 *   "paymentLink": "https://..." (optional),
 *   "booking_id": "uuid" (optional, used for 'welcome' to link user account to booking)
 * }
 */

function generatePassword(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }

  try {
    const { to, name, type, destination, paymentLink, booking_id } = await req.json();

    const apiKey = Deno.env.get('EMAIL_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'EMAIL_API_KEY not set' }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    const resend = new Resend(apiKey);
    let subject = '';
    let html = '';
    let generatedPassword = '';

    // ---- For 'welcome' type: create Supabase Auth user server-side ----
    if (type === 'welcome' && booking_id) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const adminClient = createClient(supabaseUrl, serviceKey);

      // Check if user already exists
      const { data: { users }, error: listErr } = await adminClient.auth.admin.listUsers();
      const existing = users?.find((u) => u.email === to);

      let userId: string | undefined;

      if (existing) {
        userId = existing.id;
      } else {
        generatedPassword = generatePassword();
        const { data: newUser, error: createErr } = await adminClient.auth.admin.createUser({
          email: to,
          password: generatedPassword,
          email_confirm: true,
          user_metadata: { full_name: name },
        });
        if (createErr) {
          console.error('User create error:', createErr);
          return new Response(JSON.stringify({ error: `User creation failed: ${createErr.message}` }), {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
          });
        }
        userId = newUser.user?.id;
      }

      // Link user to booking
      if (userId) {
        await adminClient
          .from('bookings')
          .update({ user_id: userId })
          .eq('id', booking_id);
      }
    }

    // ---- Build email content ----
    const brandColor = '#059669';
    const baseStyle = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto;`;
    const headerStyle = `background: linear-gradient(135deg, #064e3b 0%, #059669 100%); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;`;
    const bodyStyle = `background: #ffffff; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;`;
    const footerStyle = `text-align: center; color: #9ca3af; font-size: 12px; margin-top: 24px;`;
    const btnStyle = `display: inline-block; background: ${brandColor}; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; margin: 16px 0;`;

    switch (type) {
      case 'welcome':
        subject = '🎉 Welcome to SyncRetreat — Your Account is Ready!';
        html = `
          <div style="${baseStyle}">
            <div style="${headerStyle}">
              <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:700;">SyncRetreat</h1>
              <p style="color:#a7f3d0; margin:8px 0 0; font-size:15px;">Work. Explore. Connect.</p>
            </div>
            <div style="${bodyStyle}">
              <h2 style="color:#111827; font-size:22px;">Welcome aboard, ${name}! 🙌</h2>
              <p>Your payment has been confirmed and your spot is secured. We've created an account for you so you can manage your booking and trip details.</p>
              ${destination ? `<p><strong>Destination:</strong> ${destination}</p>` : ''}
              <div style="background:#f0fdf4; border-left: 4px solid ${brandColor}; padding: 16px 20px; border-radius: 8px; margin: 24px 0;">
                <p style="margin:0 0 8px; font-weight:600; color:#111827;">Your Login Credentials</p>
                <p style="margin:4px 0;">📧 Email: <strong>${to}</strong></p>
                ${generatedPassword ? `<p style="margin:4px 0;">🔑 Password: <code style="background:#e5e7eb; padding:2px 6px; border-radius:4px; font-size:14px;">${generatedPassword}</code></p>` : ''}
              </div>
              <p style="text-align:center;">
                <a href="https://syncretreat.com/login" style="${btnStyle}">Go to Dashboard →</a>
              </p>
              <p style="color:#6b7280; font-size:13px;">Please change your password after your first login for security.</p>
            </div>
            <div style="${footerStyle}"><p>© 2026 SyncRetreat. All rights reserved.</p></div>
          </div>
        `;
        break;

      case 'confirmation':
        subject = `✅ Application Received — ${destination || 'SyncRetreat'}`;
        html = `
          <div style="${baseStyle}">
            <div style="${headerStyle}">
              <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:700;">SyncRetreat</h1>
            </div>
            <div style="${bodyStyle}">
              <h2 style="color:#111827;">Hi ${name},</h2>
              <p>We've received your application for <strong>${destination || 'the retreat'}</strong>. Our team will review it and get back to you within 2-3 business days.</p>
              <p>In the meantime, feel free to explore our community guidelines and what to expect on retreat.</p>
              <p style="text-align:center;"><a href="https://syncretreat.com" style="${btnStyle}">Visit SyncRetreat →</a></p>
            </div>
            <div style="${footerStyle}"><p>© 2026 SyncRetreat. All rights reserved.</p></div>
          </div>
        `;
        break;

      case 'approved':
        subject = `🎊 You're Approved for ${destination || 'SyncRetreat'}!`;
        html = `
          <div style="${baseStyle}">
            <div style="${headerStyle}">
              <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:700;">SyncRetreat</h1>
            </div>
            <div style="${bodyStyle}">
              <h2 style="color:#111827;">Congratulations, ${name}! 🎉</h2>
              <p>Your application for <strong>${destination || 'the retreat'}</strong> has been <strong style="color:${brandColor};">approved</strong>. Secure your spot by completing payment below.</p>
              ${paymentLink ? `<p style="text-align:center;"><a href="${paymentLink}" style="${btnStyle}">Complete Payment →</a></p>` : ''}
              <p style="color:#6b7280; font-size:13px;">If you have any questions, reply to this email and we'll be happy to help.</p>
            </div>
            <div style="${footerStyle}"><p>© 2026 SyncRetreat. All rights reserved.</p></div>
          </div>
        `;
        break;

      case 'rejected':
        subject = `Update on your ${destination || 'SyncRetreat'} application`;
        html = `
          <div style="${baseStyle}">
            <div style="${headerStyle}">
              <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:700;">SyncRetreat</h1>
            </div>
            <div style="${bodyStyle}">
              <h2 style="color:#111827;">Hi ${name},</h2>
              <p>Thank you for applying to <strong>${destination || 'our retreat'}</strong>. After careful review, we're unable to accommodate your application for this cohort.</p>
              <p>We encourage you to apply again for a future retreat — we'd love to have you join the SyncRetreat community.</p>
              <p style="text-align:center;"><a href="https://syncretreat.com" style="${btnStyle}">View Future Retreats →</a></p>
            </div>
            <div style="${footerStyle}"><p>© 2026 SyncRetreat. All rights reserved.</p></div>
          </div>
        `;
        break;

      case 'reminder':
        subject = `⏰ Reminder: Complete Your ${destination || 'SyncRetreat'} Booking`;
        html = `
          <div style="${baseStyle}">
            <div style="${headerStyle}">
              <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:700;">SyncRetreat</h1>
            </div>
            <div style="${bodyStyle}">
              <h2 style="color:#111827;">Hi ${name},</h2>
              <p>This is a friendly reminder about your pending <strong>${destination || 'retreat'}</strong> booking. We'd love to confirm your spot!</p>
              <p>If you have any questions about the payment process or the retreat, don't hesitate to reach out.</p>
              <p style="text-align:center;"><a href="https://syncretreat.com/login" style="${btnStyle}">View My Booking →</a></p>
            </div>
            <div style="${footerStyle}"><p>© 2026 SyncRetreat. All rights reserved.</p></div>
          </div>
        `;
        break;

      default:
        return new Response(JSON.stringify({ error: 'Invalid email type' }), {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
    }

    const result = await resend.emails.send({
      from: 'SyncRetreat <no-reply@sync-retreat.com>',
      to,
      subject,
      html,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent', accountCreated: !!generatedPassword }),
      { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (e) {
    console.error('Function error:', e);
    return new Response(JSON.stringify({ error: e.message || 'Unexpected error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
});