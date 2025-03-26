// src/app/layout.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-[#0A2ECE] min-h-screen text-white font-sans relative">
        {/* Header/Nav Bar */}
        <header className="fixed top-0 left-0 right-0 bg-[#0A2ECE] z-50 py-4 px-6 flex justify-between items-center border-b border-white/10">
          {/* Home Link */}
          <Link href="/" className="flex items-center space-x-2 text-white font-bold hover:opacity-80 transition-opacity">
            <span className="text-sm">home</span>
            <span className="text-sm">/</span>
            <span className="text-sm">家</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/gallery" className="text-sm font-bold hover:opacity-80 transition-opacity">gallery</Link>
            <Link href="/devwork" className="text-sm font-bold hover:opacity-80 transition-opacity">dev work</Link>
            <Link href="/extracurriculars" className="text-sm font-bold hover:opacity-80 transition-opacity">extracurriculars</Link>
            <a href="https://www.youtube.com/channel/UCQY-6Qnas9B9F9ZrfQedQPQ" target="_blank" className="text-sm font-bold hover:opacity-80 transition-opacity">youtube</a>
            <Link href="/contact" className="text-sm font-bold hover:opacity-80 transition-opacity">contact me</Link>
          </nav>

          {/* Mobile Menu Button - Visible only on mobile */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Chinese Characters - Hidden on mobile */}
          <div className="hidden md:block text-2xl font-bold opacity-100 tracking-wider">
            李以勤
          </div>
        </header>

        {/* Mobile Menu - Slides down when hamburger is clicked */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 right-0 bg-[#0A2ECE] z-40 py-4 px-6 border-b border-white/10 animate-slideDown">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/gallery" 
                className="text-sm font-bold hover:opacity-80 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                gallery
              </Link>
              <Link 
                href="/devwork" 
                className="text-sm font-bold hover:opacity-80 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                dev work
              </Link>
              <Link 
                href="/extracurriculars" 
                className="text-sm font-bold hover:opacity-80 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                extracurriculars
              </Link>
              <a 
                href="https://www.youtube.com/channel/UCQY-6Qnas9B9F9ZrfQedQPQ" 
                target="_blank" 
                className="text-sm font-bold hover:opacity-80 transition-opacity"
              >
                youtube
              </a>
              <Link 
                href="/contact" 
                className="text-sm font-bold hover:opacity-80 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                contact me
              </Link>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="pt-20 pb-12 bg-[#0A2ECE]">
          {children}
        </main>
      </body>
    </html>
  );
}