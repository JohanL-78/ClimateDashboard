'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Rocket, Globe, Activity, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-sky-600/70 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <h1 className="text-sky-600 text-4xl md:text-5xl font-bold font-heading flex items-center gap-2 tracking-tighter">
          
          Climate Dashboard
        </h1>

        <nav className="hidden md:flex gap-4">
          <Link
            href="/"
            className="text-white  bg-sky-600 no-underline px-4 py-2 border border-sky-600 rounded-md font-inter-tight flex items-center gap-2 hover:bg-sky-700 hover-border-sky-700 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            Globe
          </Link>
          <Link
            href="/data"
            className="text-white bg-sky-600 no-underline px-4 py-2 border border-sky-600 rounded-md font-inter-tight flex items-center gap-2  hover:bg-sky-700 hover-border-sky-700 hover:text-white transition-colors"
          >
            <Activity className="w-4 h-4" />
            Data
          </Link>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden bg-sky-600 border border-sky-600 text-white px-2 py-2 rounded-md text-lg hover:bg-sky-600 transition-colors"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-50 border-b border-slate-200">
          <nav className="max-w-6xl mx-auto px-8 py-4 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-white bg-sky-600 no-underline py-3 px-4 border border-sky-600 rounded-md font-inter-tight text-center flex items-center justify-center gap-2 hover:bg-sky-700 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              Globe
            </Link>
            <Link
              href="/data"
              onClick={() => setIsMenuOpen(false)}
              className="text-white bg-sky-600 no-underline py-3 px-4 border border-sky-600 rounded-md font-inter-tight text-center flex items-center justify-center gap-2 hover:bg-sky-700 hover:text-white transition-colors"
            >
              <Activity className="w-4 h-4" />
              Data
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}