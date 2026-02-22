// src/app/devwork/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'ACEC Website',
    description: 'Full stack website for ACEC with event management, member portal, and gallery.',
    tech: ['Next.js', 'Google API', 'React', 'Tailwind CSS', 'Vercel'],
    year: '2026',
    liveLink: 'https://acec.church', 
    image: '/acec.png', 
  },
  {
    title: 'are you awake?',
    description: 'A social sleep app that allows you to toggle your status and see who else is awake in real-time.',
    tech: ['React', 'Swift', 'Supabase', 'Expo SDK'],
    year: '2026',
    liveLink: 'https://testflight.apple.com/join/vGe3JBgw', 
    image: '/areyouawake.png',  
  },
  {
    title: 'Gen AI Playground',
    description: 'A generative AI sandbox that allows you to experiment with different models and prompts in a user-friendly interface.',
    tech: ['Next.js', 'AWS', 'Supabase', 'Stripe'],
    year: '2025',
    liveLink: null,
    image: '/capstone.webp',
    confidential: true,
  },
  {
    title: 'Med Revue',
    description: "Worked as a designer to create the front-end component for MedRevue's website using Figma.",
    tech: ['Figma', 'UI/UX Design'],
    year: '2025',
    liveLink: 'https://www.medrevue.co.nz/',
    image: '/medr.jpg',
    confidential: false,
  },
  {
    title: 'UOACS Website',
    description: 'Official website for University of Auckland Computer Science Society with event management and member portal.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Firebase'],
    year: '2024',
    liveLink: 'https://uoacs.org/',
    image: '/gallery-images/uoacs2.png',
  },
  {
    title: 'WDCC Passport',
    description: 'Digital passport system for WDCC members with achievement tracking and event check-ins.',
    tech: ['TypeScript', 'MongoDB', 'Node.js', 'Express.js', 'React'],
    year: '2024',
    liveLink: 'https://passport.wdcc.co.nz/',
    image: '/gallery-images/wdccpassport.jpeg',
  },
  {
    title: 'Podcast Library',
    description: 'CRUD operations and authentication system for podcast management with user profiles.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'PostgreSQL'],
    year: '2024',
    liveLink: 'https://img-984444524408.australia-southeast1.run.app/',
    image: '/gallery-images/podcastlib.png',
  },
  
];

export default function DevWork() {
  const [showConfidential, setShowConfidential] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-3 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Work
        </motion.h1>
        <motion.p
          className="text-base"
          style={{ color: 'var(--text-tertiary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Projects I've built and contributed to.
        </motion.p>
      </section>

      {/* Projects */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden transition-colors gradient-border"
              style={{
                backgroundColor: 'var(--card-bg)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Image area */}
              {project.confidential ? (
                <div
                  className="relative h-48 overflow-hidden group cursor-pointer"
                  style={{ background: project.image ? 'var(--bg-tertiary)' : 'var(--gradient-subtle)' }}
                  onClick={() => setShowConfidential(true)}
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                      Confidential
                    </span>
                  </div>
                </div>
              ) : (
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <div
                    className="relative h-48 overflow-hidden group cursor-pointer"
                    style={{ background: project.image ? 'var(--bg-tertiary)' : 'var(--gradient-subtle)' }}
                  >
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                        View Project
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {project.year}
                  </span>
                </div>

                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: 'var(--tag-bg)',
                        color: 'var(--tag-text)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.confidential ? (
                  <button
                    onClick={() => setShowConfidential(true)}
                    className="text-sm font-medium inline-flex items-center gap-1.5 transition-opacity hover:opacity-60"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Confidential Project
                  </button>
                ) : (
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium inline-flex items-center gap-1 transition-opacity hover:opacity-60"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    View Live
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3.5 8.5l5-5M4 3.5h5v5" />
                    </svg>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confidential project modal */}
      <AnimatePresence>
        {showConfidential && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'var(--overlay-bg)', backdropFilter: 'blur(4px)' }}
              onClick={() => setShowConfidential(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative rounded-2xl p-8 max-w-md w-full text-center gradient-border"
              style={{ backgroundColor: 'var(--card-bg)' }}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Lock icon */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5"
                style={{ background: 'var(--gradient-subtle)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Confidential Project
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                This project was built for <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Promptech</span> and is currently under a confidentiality agreement. I'm unable to share a live demo or source code at this time.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-tertiary)' }}>
                Feel free to reach out if you'd like to know more about my work on this project.
              </p>

              <button
                onClick={() => setShowConfidential(false)}
                className="text-sm font-medium px-6 py-2.5 rounded-full transition-opacity hover:opacity-80"
                style={{
                  background: 'var(--gradient-primary)',
                  color: '#ffffff',
                }}
              >
                Understood
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
