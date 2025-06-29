'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/calendar', label: 'Crop Calendar' },
  { href: '/gallery', label: 'Photo Gallery' },
  { href: '/downloads', label: 'PDF Downloads' },
  { href: '/did-you-know', label: 'Did You Know?' },
  { href: '/feedback', label: 'Leave Feedback' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent text-white shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 md:gap-6 px-6 py-4">
        <div className="font-extrabold text-xl tracking-tight flex items-center gap-2">
          <span className="inline-block w-6 h-6 bg-green-500 shadow-lg backdrop-blur-md rounded-full mr-2"></span>
          RICA Demo Plot
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black/30 ${
                  isActive
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-white/80 hover:bg-green-600 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}