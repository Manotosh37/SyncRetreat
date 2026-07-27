'use client';

import { useState } from 'react';

export default function WaitlistPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    
    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
      // Clear form
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      // Reset to idle after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <main className="page">
      {/* ── LOGO ── */}
      <a href="/" className="logo-link" aria-label="SyncRetreat Home">
        <img src="/logo2.png" alt="SyncRetreat" className="logo" />
        <span className="logo-text">SyncRetreat</span>
      </a>

      {/* ── LEFT — STORY ── */}
      <section className="story" aria-label="Our story">
        <div className="story-inner">
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Varkala, Kerala · 2025
          </div>

          <h1 className="headline">
            We failed.<br />
            <em>Now we're going</em><br />
            to the sea.
          </h1>

          <div className="story-body">
            <p>
              We're Zak and Man — two 21-year-olds who thought they could pull off a
              work retreat in Ladakh on sheer ambition and a dream. We couldn't.
              The retreat didn't happen. The flights were booked, the vision was real,
              and then life said no.
            </p>
            <p>
              Most people would have stopped there.
            </p>
            <p>
              We didn't stop. We changed the location.
            </p>
            <p>
              <strong>SyncRetreat is coming to Varkala</strong> — cliff-top Kerala,
              the Arabian Sea at dawn, palm canopy, red laterite rock, and the kind
              of air that makes your best ideas feel inevitable. A 28-day retreat for
              founders, developers, and creators who are done waiting for the perfect
              conditions to build something real.
            </p>
            <p>
              No corporate fluff. No overpriced coworking aesthetics. Just a small
              group of genuinely ambitious people, a spectacular place, and the space
              to do the work that actually matters.
            </p>
          </div>

          <div className="detail-row">
            <div className="detail">
              <span className="detail-label">Location</span>
              <span className="detail-value">Varkala, Kerala</span>
            </div>
            <div className="detail">
              <span className="detail-label">Duration</span>
              <span className="detail-value">28 days</span>
            </div>
            <div className="detail">
              <span className="detail-label">Format</span>
              <span className="detail-value">Deep work + community</span>
            </div>
          </div>

          <div className="founders">
            <div className="founder-avatars" aria-hidden="true">
              <div className="avatar avatar-1">M</div>
              <div className="avatar avatar-2">Z</div>
            </div>
            <span className="founders-label">Manotosh & Zakee, Founders · age 21</span>
          </div>
        </div>

        {/* decorative seascape */}
        <div className="seascape" aria-hidden="true">
          <div className="wave w1" />
          <div className="wave w2" />
          <div className="wave w3" />
          <div className="cliff" />
          <div className="palms">
            <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 160 L60 60" stroke="#2D5A3D" strokeWidth="3" strokeLinecap="round"/>
              <path d="M60 80 Q30 50 10 60 Q35 45 60 70" fill="#2D5A3D" opacity=".9"/>
              <path d="M60 75 Q90 40 110 50 Q85 38 60 65" fill="#2D5A3D" opacity=".8"/>
              <path d="M60 90 Q25 75 5 85 Q32 68 60 82" fill="#3A7A52" opacity=".7"/>
              <path d="M60 85 Q95 68 115 75 Q88 62 60 78" fill="#3A7A52" opacity=".6"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── RIGHT — FORM ── */}
      <section className="form-side" aria-label="Join the waitlist">
        <div className="form-inner">
          <div className="form-tag">Early access</div>

          <h2 className="form-heading">
            Be the first<br />to know.
          </h2>

          <p className="form-subtext">
            We're keeping this small and intentional. Drop your name and email —
            we'll reach out when seats open, no spam, no noise.
          </p>

          {status === 'success' ? (
            <div className="success-state" role="status">
              <div className="success-icon" aria-hidden="true">✦</div>
              <h3 className="success-heading">You're on the list.</h3>
              <p className="success-sub">
                We'll be in touch when Varkala is ready for you.
                <br />— Zak & Man
              </p>
            </div>
          ) : (
            <>
              {status === 'error' && (
                <div className="error-message" role="alert">
                  Something went wrong. Please try again.
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <label htmlFor="name" className="field-label">Your name</label>
                <input
                  id="name"
                  type="text"
                  className="field-input"
                  placeholder="What do people call you?"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  autoComplete="name"
                  disabled={status === 'loading'}
                  aria-required="true"
                />
              </div>

              <div className="field-group">
                <label htmlFor="email" className="field-label">Email address</label>
                <input
                  id="email"
                  type="email"
                  className="field-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={status === 'loading'}
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className={`submit-btn${status === 'loading' ? ' loading' : ''}`}
                disabled={status === 'loading' || !name.trim() || !email.trim()}
                aria-live="polite"
              >
                {status === 'loading' ? (
                  <span className="btn-inner">
                    <span className="spinner" aria-hidden="true" />
                    Joining…
                  </span>
                ) : (
                  <span className="btn-inner">
                    Join the waitlist
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </span>
                )}
              </button>

              <p className="form-note">
                Just name + email. No spam. Ever.
              </p>
            </form>
            </>
          )}

          <div className="form-footer">
            <span className="form-footer-dot" aria-hidden="true">✦</span>
            <span>SyncRetreat · Varkala 2025</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── LOGO ── */
        .logo-link {
          position: fixed;
          top: 24px;
          left: 56px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: opacity .2s, transform .2s;
        }

        .logo-link:hover {
          opacity: .85;
          transform: translateY(-1px);
        }

        .logo {
          height: 28px;
          width: auto;
          display: block;
          filter: brightness(0) invert(1);
          opacity: 0.95;
        }

        .logo-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          color: #FAF7F2;
          letter-spacing: -.01em;
          opacity: 0.95;
        }

        /* ── RESET & BASE ── */
        .page {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, sans-serif;
          background: #FAF7F2;
        }

        /* ── LEFT STORY ── */
        .story {
          position: relative;
          width: 55%;
          min-height: 100vh;
          background: #1C3A2A;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }

        .story-inner {
          position: relative;
          z-index: 2;
          padding: 80px 56px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #A8C5B5;
          margin-bottom: 32px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C4623A;
          flex-shrink: 0;
          animation: pulse 2.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.3); }
        }

        .headline {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(40px, 4.5vw, 64px);
          font-weight: 700;
          line-height: 1.1;
          color: #FAF7F2;
          margin-bottom: 36px;
          letter-spacing: -.01em;
        }

        .headline em {
          font-style: italic;
          color: #A8C5B5;
        }

        .story-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 520px;
        }

        .story-body p {
          font-size: 15px;
          line-height: 1.75;
          color: #C8D9CF;
          font-weight: 400;
        }

        .story-body p strong {
          color: #FAF7F2;
          font-weight: 600;
        }

        .detail-row {
          display: flex;
          gap: 32px;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid rgba(168,197,181,.2);
          flex-wrap: wrap;
        }

        .detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #A8C5B5;
        }

        .detail-value {
          font-size: 14px;
          color: #FAF7F2;
          font-weight: 500;
        }

        .founders {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 36px;
        }

        .founder-avatars {
          display: flex;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          border: 2px solid #1C3A2A;
          color: #FAF7F2;
        }

        .avatar-1 {
          background: #C4623A;
          z-index: 2;
        }

        .avatar-2 {
          background: #2D5A3D;
          margin-left: -10px;
          z-index: 1;
        }

        .founders-label {
          font-size: 12px;
          color: #A8C5B5;
        }

        /* ── DECORATIVE SEASCAPE ── */
        .seascape {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          height: 200px;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-radius: 50% 50% 0 0;
        }

        .w1 {
          height: 90px;
          background: rgba(168,197,181,.07);
          bottom: 0;
          animation: sway 6s ease-in-out infinite;
        }

        .w2 {
          height: 60px;
          background: rgba(168,197,181,.05);
          bottom: 10px;
          animation: sway 8s ease-in-out infinite reverse;
        }

        .w3 {
          height: 35px;
          background: rgba(196,98,58,.06);
          bottom: 20px;
          animation: sway 5s ease-in-out infinite;
        }

        @keyframes sway {
          0%, 100% { transform: scaleX(1) translateX(0); }
          50% { transform: scaleX(1.05) translateX(-2%); }
        }

        .cliff {
          position: absolute;
          right: -10px;
          bottom: 0;
          width: 160px;
          height: 120px;
          background: #C4623A;
          clip-path: polygon(30% 100%, 100% 100%, 100% 0%, 50% 60%);
          opacity: .18;
        }

        .palms {
          position: absolute;
          right: 24px;
          bottom: 80px;
          width: 80px;
          height: 110px;
          opacity: .45;
        }

        /* ── RIGHT FORM ── */
        .form-side {
          width: 45%;
          min-height: 100vh;
          background: #FAF7F2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 48px;
        }

        .form-inner {
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .form-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #C4623A;
          background: rgba(196,98,58,.1);
          border: 1px solid rgba(196,98,58,.2);
          border-radius: 20px;
          padding: 4px 12px;
          margin-bottom: 28px;
          width: fit-content;
        }

        .form-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(32px, 3vw, 48px);
          font-weight: 700;
          line-height: 1.1;
          color: #1C3A2A;
          letter-spacing: -.02em;
          margin-bottom: 18px;
        }

        .form-subtext {
          font-size: 14px;
          line-height: 1.7;
          color: #5A7A68;
          margin-bottom: 40px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .field-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #3A5C47;
        }

        .field-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1.5px solid #D4E4DB;
          background: #fff;
          font-size: 14px;
          color: #1C3A2A;
          font-family: 'Inter', -apple-system, sans-serif;
          transition: border-color .2s, box-shadow .2s;
          outline: none;
        }

        .field-input::placeholder {
          color: #A8BDB3;
        }

        .field-input:focus {
          border-color: #2D5A3D;
          box-shadow: 0 0 0 3px rgba(45,90,61,.1);
        }

        .field-input:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .submit-btn {
          width: 100%;
          padding: 15px 20px;
          border-radius: 10px;
          border: none;
          background: #1C3A2A;
          color: #FAF7F2;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Inter', -apple-system, sans-serif;
          cursor: pointer;
          margin-top: 8px;
          transition: background .2s, transform .15s, opacity .2s;
        }

        .submit-btn:hover:not(:disabled) {
          background: #2D5A3D;
          transform: translateY(-1px);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-arrow {
          font-size: 16px;
          transition: transform .2s;
        }

        .submit-btn:hover:not(:disabled) .btn-arrow {
          transform: translateX(3px);
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(250,247,242,.3);
          border-top-color: #FAF7F2;
          border-radius: 50%;
          animation: spin .7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-note {
          font-size: 11px;
          color: #A8BDB3;
          text-align: center;
          margin-top: 14px;
        }

        /* ── ERROR ── */
        .error-message {
          padding: 12px 16px;
          background: rgba(196, 98, 58, 0.1);
          border: 1px solid rgba(196, 98, 58, 0.3);
          border-radius: 8px;
          color: #C4623A;
          font-size: 13px;
          text-align: center;
          margin-bottom: 20px;
          font-weight: 500;
        }

        /* ── SUCCESS ── */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          padding: 32px;
          background: #fff;
          border: 1.5px solid #D4E4DB;
          border-radius: 16px;
        }

        .success-icon {
          font-size: 24px;
          color: #C4623A;
        }

        .success-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #1C3A2A;
        }

        .success-sub {
          font-size: 14px;
          line-height: 1.7;
          color: #5A7A68;
        }

        /* ── FORM FOOTER ── */
        .form-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 40px;
          font-size: 11px;
          color: #A8BDB3;
          letter-spacing: .04em;
        }

        .form-footer-dot {
          color: #C4623A;
          font-size: 10px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .logo-link {
            top: 20px;
            left: 28px;
          }

          .logo {
            height: 24px;
          }

          .logo-text {
            font-size: 16px;
          }

          .page {
            flex-direction: column;
          }

          .story {
            width: 100%;
            min-height: auto;
          }

          .story-inner {
            padding: 64px 28px 200px;
          }

          .form-side {
            width: 100%;
            min-height: auto;
            padding: 52px 28px;
          }

          .form-inner {
            max-width: 100%;
          }

          .detail-row {
            gap: 20px;
          }

          .seascape {
            height: 180px;
          }
        }
      `}</style>
    </main>
  );
}
