// src/app/extracurriculars/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { id: 1, src: '/extra-images/vpxfp.jpeg', alt: 'VP and FP', category: 'UOACS', width: 1070, height: 713 },
  { id: 2, src: '/extra-images/velocity-all.jpeg', alt: 'Velocity 2025', category: 'Velocity', width: 1070, height: 713 },
  { id: 3, src: '/extra-images/uoacs-launch.jpeg', alt: 'Founding UOACS Exec', category: 'UOACS', width: 1070, height: 713 },
  { id: 4, src: '/extra-images/pookie.jpeg', alt: 'Jess and I', category: 'UOACS', width: 1070, height: 713 },
  { id: 5, src: '/extra-images/uoacs-pool.jpeg', alt: 'UOACS @ Pool Event', category: 'UOACS', width: 1070, height: 713 },
  { id: 6, src: '/extra-images/vel-1.jpeg', alt: 'Velocity Execs', category: 'Velocity', width: 1070, height: 713 },
  { id: 7, src: '/extra-images/sooj.jpeg', alt: 'Industry Night Sign In', category: 'UOACS', width: 1070, height: 713 },
  { id: 8, src: '/extra-images/thebros.jpeg', alt: 'Esports Competitors', category: 'UOACS', width: 1070, height: 713 },
  { id: 9, src: '/extra-images/launch1.jpeg', alt: 'Pre-Launch Night', category: 'UOACS', width: 1070, height: 713 },
  { id: 10, src: '/extra-images/vel-2.jpeg', alt: 'Velocity Kick Off', category: 'Velocity', width: 1070, height: 713 },
  { id: 11, src: '/extra-images/jpxjl.jpeg', alt: 'Pool Night with JP', category: 'UOACS', width: 1070, height: 713 },
  { id: 12, src: '/extra-images/gdgc-aspa-collab.jpeg', alt: 'Presidents Photo', category: 'UOACS', width: 1070, height: 713 },
  { id: 13, src: '/extra-images/esports-martin.jpeg', alt: 'Esports in Action', category: 'UOACS', width: 1070, height: 713 },
  { id: 14, src: '/extra-images/industry-full.jpeg', alt: 'Full House!', category: 'UOACS', width: 1070, height: 713 },
  { id: 15, src: '/extra-images/meandvish.jpeg', alt: 'Industry Night with Vish', category: 'UOACS', width: 1070, height: 713 },
  { id: 16, src: '/extra-images/meatpool.jpeg', alt: 'Me at Pool', category: 'UOACS', width: 1070, height: 713 },
  { id: 17, src: '/extra-images/esports-waiting.jpeg', alt: 'Esports Wait Screen', category: 'UOACS', width: 1070, height: 713 },
  { id: 18, src: '/extra-images/launch-prep.jpeg', alt: 'Before our Launch Night', category: 'UOACS', width: 1070, height: 713 },
  { id: 19, src: '/extra-images/wdcc-full-team.jpg', alt: 'WDCC Passport Team', category: 'WDCC', width: 1070, height: 713 },
  { id: 20, src: '/extra-images/pizza2.jpg', alt: 'Pizza!', category: 'WDCC', width: 1070, height: 713 },
  { id: 21, src: '/extra-images/wdcc-ful.jpeg', alt: 'Projects Launch Night 2024', category: 'WDCC', width: 1070, height: 713 },
  { id: 22, src: '/extra-images/bbq.JPG', alt: 'UOACS BBQ 2025', category: 'UOACS', width: 1070, height: 713 },
  { id: 23, src: '/extra-images/industry-panels.jpeg', alt: 'Industry Night Panelists', category: 'UOACS', width: 1070, height: 713 },
  { id: 24, src: '/extra-images/launch-all.jpeg', alt: 'Launch Night Attendees', category: 'UOACS', width: 1070, height: 713 },
];

const categories = ['All', 'UOACS', 'Velocity', 'WDCC'];

export default function Extracurriculars() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-8 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-3 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Extracurriculars
        </motion.h1>
        <motion.p
          className="text-base"
          style={{ color: 'var(--text-tertiary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The communities I've built and been part of.
        </motion.p>
      </section>

      {/* UOACS Banner */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <Link href="/uoacs-story" className="block relative w-full h-56 md:h-72 lg:h-80 rounded-2xl overflow-hidden group">
          <Image
            src="/extra-images/bbq-banner.png"
            alt="UOACS Banner"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-white text-sm font-medium drop-shadow-md">
              Read the UOACS origin story
            </p>
            <svg className="mt-1" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-4 py-1.5 text-sm rounded-full border transition-all"
              style={{
                borderColor: activeCategory === category ? 'var(--text-primary)' : 'var(--border-color)',
                backgroundColor: activeCategory === category ? 'var(--text-primary)' : 'transparent',
                color: activeCategory === category ? 'var(--bg-primary)' : 'var(--text-secondary)',
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              style={{ aspectRatio: '4/3', backgroundColor: 'var(--bg-tertiary)' }}
              onClick={() => setSelectedImage(image)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1070}
                height={713}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={true}
                placeholder="empty"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'var(--overlay-bg)' }}
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl h-[80vh]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
                unoptimized={true}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-white text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {selectedImage.alt}
                </span>
              </div>
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: 'var(--modal-close-bg)',
                  color: 'var(--modal-close-text)',
                }}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
