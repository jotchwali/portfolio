'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './globals.css';

// ─── Custom cursor with CSS trail ───
function CustomCursor() {
  const dotRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = dotRef.current;
    const container = containerRef.current;
    if (!dot || !container) return;

    // Hide default cursor
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = 'a, button, [role="button"], input, select, textarea, label { cursor: none !important; }';
    document.head.appendChild(style);

    let throttle = 0;

    const onMouseMove = (e) => {
      // Move dot immediately
      dot.style.opacity = '1';
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;

      // Spawn trail particles at reduced rate
      const now = Date.now();
      if (now - throttle < 30) return;
      throttle = now;

      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      container.appendChild(particle);

      // Self-remove after animation
      setTimeout(() => particle.remove(), 600);
    };

    const onMouseLeave = () => { dot.style.opacity = '0'; };
    const onMouseEnter = () => { dot.style.opacity = '1'; };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.style.cursor = '';
      style.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none', overflow: 'hidden' }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}

export default function RootLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check for saved preference; default to dark
    const saved = localStorage.getItem('theme');
    if (saved) {
      setDarkMode(saved === 'dark');
    } else {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change (when clicking links)
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { href: '/gallery', label: 'Gallery' },
    { href: '/devwork', label: 'Work' },
    { href: '/extracurriculars', label: 'Extracurriculars' },
    { href: '/contactme', label: 'Contact' },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Joshua Li</title>
        <meta name="description" content="Joshua Li - Portfolio" />
      </head>
      <body style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <CustomCursor />
        {/* Navigation */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? 'py-3 border-b shadow-sm'
              : 'py-5 border-b border-transparent'
          }`}
          style={{
            backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
            backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
            borderColor: scrolled ? 'var(--border-light)' : 'transparent',
          }}
        >
          <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
            {/* Logo / Home */}
            <Link
              href="/"
              className="text-sm font-medium tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Joshua Li
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </nav>

            {/* Mobile: Theme toggle + Hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-8 h-8 flex items-center justify-center"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>

              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: 'var(--text-primary)' }}
                aria-label="Toggle menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {mobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden border-t"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-light)',
              }}
            >
              <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm py-1 transition-opacity hover:opacity-60"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer
          className="border-t py-8 mt-20"
          style={{
            borderColor: 'var(--border-light)',
            backgroundColor: 'var(--bg-primary)',
          }}
        >
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Joshua Li
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/joshua-li-uoa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-opacity hover:opacity-60"
                style={{ color: 'var(--text-tertiary)' }}
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/channel/UCQY-6Qnas9B9F9ZrfQedQPQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-opacity hover:opacity-60"
                style={{ color: 'var(--text-tertiary)' }}
              >
                YouTube
              </a>
              <a
                href="https://www.instagram.com/uoacs25/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-opacity hover:opacity-60"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
