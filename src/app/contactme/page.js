// src/app/contactme/page.js
'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

const links = [
  {
    label: 'LinkedIn',
    description: 'Connect with me professionally',
    href: 'https://www.linkedin.com/in/joshua-li-uoa',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    description: 'Drop me a message anytime',
    href: 'mailto:joshuali632004@gmail.com?subject=Hello%20Joshua',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    description: 'Watch my channel',
    href: 'https://www.youtube.com/channel/UCQY-6Qnas9B9F9ZrfQedQPQ',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    description: 'UOACS on Instagram',
    href: 'https://www.instagram.com/uoacs25/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-8 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Connect
        </motion.h1>
        <motion.p
          className="text-base max-w-lg mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Whether it's a professional opportunity, a collaboration, or just a conversation -- I'm always open to hearing from good people.
        </motion.p>
      </section>

      {/* Links grid */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link, index) => (
            <FadeIn key={link.label} delay={index * 0.08}>
              <a
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group block rounded-2xl p-6 border transition-all duration-200 h-full gradient-border"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-light)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--card-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div style={{ color: 'var(--text-primary)' }}>
                    {link.icon}
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    stroke="var(--text-tertiary)" strokeWidth="1.5"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1"
                  >
                    <path d="M4 10l6-6M4.5 4H10v5.5" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {link.label}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {link.description}
                </p>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Availability note */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <FadeIn delay={0.4}>
          <div
            className="rounded-2xl p-6 md:p-8 text-center border"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-light)',
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-secondary)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'linear-gradient(135deg, #34d399, #22d3ee)' }}
              />
              Available
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I'm currently open to interesting conversations, side projects, and collaboration opportunities. Don't hesitate to reach out.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
