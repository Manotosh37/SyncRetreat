import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// 503 Maintenance-Mode Middleware
//
// How to activate:
//   Set  MAINTENANCE_MODE=true  in your .env / Vercel environment variables.
//   Redeploy (or restart the dev server) for the change to take effect.
//
// How to bypass (admin preview):
//   Visit  https://syncretreat.com/?bypass=YOUR_BYPASS_SECRET
//   This sets a cookie so you can browse freely during maintenance.
// ---------------------------------------------------------------------------

const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";
const BYPASS_SECRET    = process.env.MAINTENANCE_BYPASS_SECRET ?? "syncretreat-admin";

/** Paths that must always be reachable (static files, Next internals). */
const ALWAYS_ALLOW = /^\/((_next|favicon|robots|sitemap|og-image|logo).*|.*\.(png|jpg|jpeg|gif|ico|svg|webp|avif|woff2?|ttf|mp4|css|js|txt|xml))$/i;

export function middleware(request: NextRequest) {
  // Not in maintenance mode — pass everything through.
  if (!MAINTENANCE_MODE) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;

  // Always serve static assets and Next.js internals.
  if (ALWAYS_ALLOW.test(pathname)) return NextResponse.next();

  // --- Bypass via query param: sets a cookie then redirects to the same page ---
  if (searchParams.get("bypass") === BYPASS_SECRET) {
    const response = NextResponse.redirect(new URL(pathname, request.url));
    response.cookies.set("maintenance_bypass", BYPASS_SECRET, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return response;
  }

  // --- Bypass via cookie (admin already authenticated) ---
  if (request.cookies.get("maintenance_bypass")?.value === BYPASS_SECRET) {
    return NextResponse.next();
  }

  // --- Return 503 with a styled maintenance page ---
  return new NextResponse(maintenanceHTML(), {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Tell proxies / CDN not to cache the 503
      "Cache-Control": "no-store",
      // Standard header — hint how long until back online (seconds)
      // Set to 0 if you don't know, or a real ETA value
      "Retry-After": "3600",
    },
  });
}

export const config = {
  // Run on every route except Next.js internals and static files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

// ---------------------------------------------------------------------------
// Inline 503 HTML — no external assets needed so it always renders.
// ---------------------------------------------------------------------------
function maintenanceHTML(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We'll be right back — SyncRetreat</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0d1117;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #e6edf3;
      padding: 2rem;
    }

    .card {
      text-align: center;
      max-width: 480px;
      width: 100%;
      padding: 3rem 2.5rem;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 1.5rem;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
      animation: fadeUp .5s ease both;
    }

    .logo {
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -.02em;
      color: #34d399;
      margin-bottom: 2rem;
    }

    .dot { width: 8px; height: 8px; border-radius: 50%; background: #34d399; animation: pulse 1.4s ease-in-out infinite; }

    h1 {
      font-size: clamp(1.6rem, 5vw, 2.2rem);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #e6edf3 30%, #34d399);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: #8b949e;
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 2rem;
    }

    .badge {
      display: inline-block;
      padding: .35rem 1rem;
      background: #21262d;
      border: 1px solid #30363d;
      border-radius: 9999px;
      font-size: .75rem;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      color: #f0883e;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: .5; transform: scale(1.5); }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <span class="dot"></span>
      SyncRetreat
    </div>
    <h1>We'll be right back.</h1>
    <p>
      We're performing scheduled maintenance to improve your experience.
      The site will be back online shortly — thank you for your patience.
    </p>
    <span class="badge">503 — Maintenance Mode</span>
  </div>
</body>
</html>`;
}
