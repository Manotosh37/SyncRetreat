# SyncRetreat

SyncRetreat is a premium, productivity-focused co-living and co-working retreat for ambitious remote professionals. This project is built with React and Vite, and provides a seamless application experience for high-performance digital nomads, founders, freelancers, designers, marketers, and remote workers.

## Features

- **Modern React Frontend**: Built with Vite for fast development and hot module replacement.
- **Premium Application Flow**: Apply, get vetted, and join curated monthly cohorts.
- **Deep Work Infrastructure**: Information about premium housing, daily meals, and high-speed Wi-Fi.
- **Admin Dashboard**: Manage applications and cohort status.
- **Newsletter & Waitlist**: Integrated with Supabase for backend data management.
- **Community Guidelines & Terms**: Transparent policies and operational standards.
- **Payment & Refund FAQ**: Clear B2B payment and cancellation policies.
- **Responsive Design**: Optimized for desktop and mobile.

## Tech Stack

- **Frontend**: React, Vite, TypeScript (optional), Tailwind CSS
- **Backend/Database**: Supabase
- **Email Service**: Custom integration via Deno functions
- **Icons**: [react-icons](https://react-icons.github.io/react-icons/)
- **Deployment**: Vercel

## Folder Structure

```
my-app/
├── public/                # Static assets
│   └── documents/         # Legal and informational documents
├── src/
│   ├── App.jsx            # Main app entry
│   ├── assets/            # Components and pages
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pages/         # Main site pages
│   │   │   ├── About.tsx
│   │   │   ├── FAQs.tsx
│   │   │   ├── Howitworks.tsx
│   │   │   ├── Terms.tsx
│   │   │   └── ...        # Other pages
│   ├── lib/               # Utility modules
│   │   ├── supabase.ts
│   │   └── emailservice.ts
├── supabase/              # Supabase backend config and functions
│   ├── Waitlist_table.sql
│   └── functions/
│       └── send-email/
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel deployment config
└── README.md              # Project documentation
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env` and fill in your Supabase and email service credentials.

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Deploy**
   - The project is ready for deployment on Vercel or any static hosting provider.

## Customization

- **Supabase Integration**: Update `src/lib/supabase.ts` with your Supabase project credentials.
- **Email Service**: Configure `src/lib/emailservice.ts` and `supabase/functions/send-email/index.ts` for transactional emails.
- **Branding**: Update content and images in `src/assets/Pages/` to match your brand voice and offering.

## Funding & License

Some dependencies may request funding. Run `npm fund` to see details.

This project is for professional use only. All content, code, and branding are subject to copyright by SyncRetreat.

---

**SyncRetreat**  
Engineered for focus. Designed for results.