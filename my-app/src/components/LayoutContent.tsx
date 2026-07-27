'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes that should not have the navbar and footer
  const isStandalonePage = pathname === '/waitlist';

  if (isStandalonePage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#fefbf7]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
