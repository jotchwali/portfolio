// src/app/page.js
'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ShaderHero from '../components/ShaderHero';
import ParallaxCard from '../components/ParallaxCard';
import LiveThemeEditor from '../components/LiveThemeEditor';

// ─── Scroll-triggered fade-in wrapper ───
const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─── Word-by-word reveal on scroll ───
const WordReveal = ({ text, className, style, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

// ─── Desktop timeline item (alternating left/right) ───
const TimelineItem = ({ year, title, organization, description, side = 'left', isLast = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: 'var(--text-tertiary)' }}>
        {year}
      </p>
      <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
        {organization}
      </p>
      {description && (
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
          {description}
        </p>
      )}
    </motion.div>
  );

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] gap-8">
      {/* Left content */}
      <div className={`py-6 ${side === 'left' ? 'text-right' : ''}`}>
        {side === 'left' ? content : null}
      </div>

      {/* Center line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-2.5 h-2.5 rounded-full shrink-0 mt-7"
          style={{ background: 'var(--gradient-primary)' }}
        />
        {!isLast && (
          <div className="w-px flex-1" style={{ backgroundColor: 'var(--timeline-line)' }} />
        )}
      </div>

      {/* Right content */}
      <div className="py-6">
        {side === 'right' ? content : null}
      </div>
    </div>
  );
};

// ─── Mobile timeline (simpler, always right-aligned) ───
const MobileTimelineItem = ({ year, title, organization, description, isLast = false, index = 0 }) => {
  return (
    <div className="relative flex gap-4">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
          style={{ background: 'var(--gradient-primary)' }}
        />
        {!isLast && (
          <div className="w-px flex-1" style={{ backgroundColor: 'var(--timeline-line)' }} />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        className="pb-6 min-w-0"
      >
        <p className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--text-tertiary)' }}>
          {year}
        </p>
        <h3 className="text-base font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p className="text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          {organization}
        </p>
        {description && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
};

// ─── Experience data ───
const experiences = [
  {
    year: 'Feb 2026 - Present',
    title: 'Solutions Engineer I',
    organization: 'Partly',
    description: null,
  },
  {
    year: 'Nov - Feb 2026',
    title: 'Technical Solutions Engineer Intern',
    organization: 'Partly',
    description: null,
  },
  {
    year: 'Jul 2025 - Present',
    title: 'Senior Advisor',
    organization: 'UOACS - University of Auckland CompSci Society',
    description: 'Stepped back from the presidency to an advisory role, supporting the next generation of leadership for the society I founded.',
  },
  {
    year: '2024 - Jul 2025',
    title: 'Founding President',
    organization: 'UOACS - University of Auckland CompSci Society',
    description: 'Founded the computer science society at New Zealand\'s largest university. Grew it from nothing to 450+ paid members, five figures in sponsorship revenue, and a team of 22 executives.',
  },
  {
    year: '2025 - Nov 2025',
    title: 'UX/UI Designer',
    organization: 'WDCC - MedRevue Project',
    description: 'Designing the interface for the Auckland Med Revue, an annual charity variety show by University of Auckland medical students.',
  },
  {
    year: '2025 - July 2025',
    title: 'Generalist Volunteer',
    organization: 'MyUniClub',
    description: 'Advisory role guiding the founding team of this SaaS startup for university clubs.',
  },
  {
    year: '2025 - Nov 2025',
    title: 'Outreach Executive',
    organization: 'Velocity',
    description: 'Built community and set up events for the entrepreneurship and innovation club.',
  },
  {
    year: '2023 - Nov 2025',
    title: 'Keyholder',
    organization: 'AS Colour',
    description: 'Helped customers find the right balance between their needs and wants, sharpening interpersonal skills in a commission-based environment.',
  },
  {
    year: '2024',
    title: 'Functional Analyst Intern',
    organization: 'University of Auckland',
    description: null,
  },
  {
    year: '2024',
    title: 'Software Developer',
    organization: 'WDCC - Passport',
    description: null,
  },
  {
    year: '2021 - 2023',
    title: 'Piano Teacher',
    organization: 'Self-employed',
    description: null,
  },
  {
    year: '2022 - 2023',
    title: 'Customer Service Representative',
    organization: 'Briscoes Head Office',
    description: null,
  },
  {
    year: '2020 - 2022',
    title: 'Sales Assistant',
    organization: 'Briscoes',
    description: null,
  },
  {
    year: '2019 - 2020',
    title: 'After School Care Helper',
    organization: 'sKids',
    description: null,
  },
  {
    year: '2019',
    title: 'Pharmacy Assistant',
    organization: 'Chemist Warehouse',
    description: null,
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* WebGL fluid noise background */}
        <ShaderHero />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <div className="gradient-orb gradient-orb-1" style={{ top: '15%', left: '10%' }} />
          <div className="gradient-orb gradient-orb-2" style={{ top: '50%', right: '5%' }} />
          <div className="gradient-orb gradient-orb-3" style={{ bottom: '10%', left: '40%' }} />
        </div>

        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            style={{ letterSpacing: '-0.04em' }}
          >
            <span className="gradient-text" style={{ display: 'inline-flex' }}>
              {'Joshua Li'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.06,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>
          <motion.p
            className="text-lg md:text-xl max-w-md mx-auto"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Solutions Engineer at Partly
          </motion.p>
          <motion.p
            className="text-sm mt-2"
            style={{ color: 'var(--text-tertiary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            BSc Computer Science & IT Management
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
              <rect x="1" y="1" width="18" height="28" rx="9" stroke="var(--text-tertiary)" strokeWidth="1.5" />
              <motion.circle
                cx="10" cy="8" r="2"
                fill="var(--text-tertiary)"
                animate={{ cy: [8, 18, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── About ─── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase mb-6" style={{ color: 'var(--text-tertiary)' }}>
              About
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <WordReveal
              text="Hi, I'm Josh. I graduated from the University of Auckland in November 2025 with a BSc in Computer Science and IT Management, and I now work full-time as a Solutions Engineer at Partly."
              className="text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: 'var(--text-secondary)' }}
              delay={0}
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <WordReveal
              text="Outside of work, I serve as a Senior Advisor for UOACS, the computer science society I founded at the University of Auckland. I also build websites and apps."
              className="text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: 'var(--text-secondary)' }}
              delay={0}
            />
          </FadeIn>
          <FadeIn delay={0.3}>
            <WordReveal
              text="On weekends, I busk at the Takapuna markets and play piano and lead music for my church's band."
              className="text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: 'var(--text-secondary)' }}
              delay={0}
            />
          </FadeIn>
          <FadeIn delay={0.4}>
            <WordReveal
              text="In my free time, I watch the Lakers dominate and play a pretty poor Galio in the mid lane. Oh, and I love to eat."
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
              delay={0}
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── Gradient divider ─── */}
      <div className="max-w-2xl mx-auto px-6">
        <hr className="gradient-divider" />
      </div>

      {/* ─── Education ─── */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase mb-6" style={{ color: 'var(--text-tertiary)' }}>
              Education
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            {/* Card — takes 3 of 5 cols */}
            <div className="md:col-span-3">
              <FadeIn delay={0.1}>
                <ParallaxCard
                  className="rounded-2xl p-6 md:p-8 gradient-border"
                  style={{ backgroundColor: 'var(--card-bg)' }}
                >
                  <h3 data-depth="1" className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)', transition: 'transform 0.3s ease-out' }}>
                    University of Auckland
                  </h3>
                  <p data-depth="0.5" className="text-sm mb-4" style={{ color: 'var(--text-secondary)', transition: 'transform 0.3s ease-out' }}>
                    Bachelor of Science — Computer Science & IT Management, 2023 - 2025 (Graduated)
                  </p>
                  <div data-depth="1.5" className="border-t pt-4" style={{ borderColor: 'var(--border-light)', transition: 'transform 0.3s ease-out' }}>
                    <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--text-tertiary)' }}>
                      Relevant Coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Data Structures & Algorithms',
                        'Object Oriented Development',
                        'Data Management',
                        'Computer Organisation',
                        'Data Wrangling & Big Data',
                        'Digital Systems',
                        'Mathematics for CS',
                      ].map((course) => (
                        <span
                          key={course}
                          className="text-xs px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: 'var(--tag-bg)',
                            color: 'var(--tag-text)',
                          }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </ParallaxCard>
              </FadeIn>
            </div>

            {/* Image block — takes 2 of 5 cols */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <FadeIn delay={0.2}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <Image
                    src="/woods.jpg"
                    alt="University life"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gradient divider ─── */}
      <div className="max-w-3xl mx-auto px-6">
        <hr className="gradient-divider" />
      </div>

      {/* ─── Experience Timeline ─── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase mb-12 text-center" style={{ color: 'var(--text-tertiary)' }}>
              Experience
            </p>
          </FadeIn>

          {/* Desktop timeline (alternating) */}
          <div className="hidden md:block">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                year={exp.year}
                title={exp.title}
                organization={exp.organization}
                description={exp.description}
                side={index % 2 === 0 ? 'left' : 'right'}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>

          {/* Mobile timeline (single column) */}
          <div className="md:hidden pl-2">
            {experiences.map((exp, index) => (
              <MobileTimelineItem
                key={index}
                year={exp.year}
                title={exp.title}
                organization={exp.organization}
                description={exp.description}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gradient divider ─── */}
      <div className="max-w-3xl mx-auto px-6">
        <hr className="gradient-divider" />
      </div>

      {/* ─── Live Theme Editor ─── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--text-tertiary)' }}>
              Playground
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              <span className="gradient-text">Make it yours.</span>
            </h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              This site is built on CSS custom properties. Pick any color below and watch the entire theme update in real-time.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <LiveThemeEditor />
          </FadeIn>
        </div>
      </section>

      {/* ─── Moments ─── */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-xs font-medium tracking-widest uppercase mb-12 text-center" style={{ color: 'var(--text-tertiary)' }}>
              Moments
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              '/main-page-photos/IMG_3703.JPG',
              '/main-page-photos/DSC07811 3.jpg',
              '/main-page-photos/DSC08366.jpg',
              '/main-page-photos/DSC08856.JPG',
              '/main-page-photos/IMG_3636.jpeg',
              '/main-page-photos/IMG_8822.JPG',
            ].map((src, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image
                    src={src}
                    alt={`Moment ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
