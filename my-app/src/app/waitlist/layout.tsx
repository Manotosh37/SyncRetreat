import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SyncRetreat · Varkala 2025',
  description:
    'A 28-day work retreat in Varkala, Kerala for founders, developers, and creators. Join the waitlist.',
  openGraph: {
    title: 'SyncRetreat · Varkala 2025',
    description: 'Deep work. Real community. The Arabian Sea.',
    type: 'website',
  },
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
