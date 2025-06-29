import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-green-900 text-white shadow-lg backdrop-blur-md py-8 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4 text-center md:text-left">
        {/* Logo and RICA Name */}
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <span className="inline-block w-7 h-7 bg-green-500 rounded-full"></span>
          <span className="font-extrabold text-lg tracking-tight">Rwanda Institute for Conservation Agriculture</span>
        </div>
        {/* Contact and Website */}
        <div className="flex flex-col gap-1 text-sm text-white/90">
          <span>
            Official website: <a href="http://www.rica.rw/" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-300 transition-colors">www.rica.rw</a>
          </span>
          <span>
            Contact: <a href="mailto:info@rica.rw" className="underline hover:text-green-300 transition-colors">info@rica.rw</a>
          </span>
        </div>
        {/* Credit */}
        <div className="text-xs text-green-200 font-semibold mt-2 md:mt-0 md:text-right">
          Created by Mukankusi Fillette and the team
        </div>
      </div>
      <div className="mt-6 border-t border-white/20 pt-4 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} RICA. All rights reserved.
      </div>
    </footer>
  );
} 