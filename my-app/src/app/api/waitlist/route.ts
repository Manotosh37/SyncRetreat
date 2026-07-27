import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const SHEET_ID = '1tippFlpk8z703jjHDgYrE_XoWOVX89JFCGyEZ3RquHM';
    const SHEET_NAME = 'Waitlist';

    // Use Google Apps Script Web App or Sheet.best
    // For now, we'll use a simple fetch to Google Sheets via a deployment URL
    // You'll need to set up a Google Apps Script web app (instructions below)
    
    const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!SCRIPT_URL) {
      console.error('Google Script URL not configured');
      return NextResponse.json(
        { error: 'Configuration error' },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        timestamp,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheets');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    );
  }
}
