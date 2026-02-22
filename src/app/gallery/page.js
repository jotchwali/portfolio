// src/app/gallery/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { id: 1, src: '/gallery-images/teamlabs.png', alt: 'Team Labs Japan', category: 'Tokyo', width: 1070, height: 713 },
  { id: 2, src: '/gallery-images/wedding1.jpeg', alt: "Leon x Linda's Wedding", category: 'Wedding', width: 1070, height: 713 },
  { id: 3, src: '/gallery-images/naganomonkey.png', alt: 'Nagano Monkeys', category: 'Nagano', width: 1070, height: 713 },
  { id: 4, src: '/gallery-images/tokyoview.jpeg', alt: 'Tokyo Skytree View', category: 'Tokyo', width: 1070, height: 713 },
  { id: 5, src: '/gallery-images/kyoto.jpeg', alt: 'Me in Kyoto', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 6, src: '/gallery-images/osakawhale.jpeg', alt: 'Whale Shark in Osaka Aquarium', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 7, src: '/gallery-images/cherry.jpeg', alt: 'Pink Flowers in Fukuoka', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 8, src: '/gallery-images/mumanddad.jpeg', alt: 'Wedding Guests', category: 'Wedding', width: 1070, height: 713 },
  { id: 9, src: '/gallery-images/onetreehill.jpeg', alt: 'Walking Off Into the Distance', category: 'Wedding', width: 1070, height: 713 },
  { id: 10, src: '/gallery-images/signing.jpeg', alt: 'Signing the Marriage License', category: 'Wedding', width: 1070, height: 713 },
  { id: 11, src: '/gallery-images/bridalparty.jpeg', alt: 'Friends & Family', category: 'Wedding', width: 1070, height: 713 },
  { id: 12, src: '/gallery-images/embrace.jpeg', alt: 'Embrace', category: 'Wedding', width: 1070, height: 713 },
  { id: 13, src: '/gallery-images/tokyotrees.jpeg', alt: "Tokyo's Trees", category: 'Tokyo', width: 1070, height: 713 },
  { id: 14, src: '/gallery-images/nagano-snow.jpeg', alt: 'Snowy Hills', category: 'Nagano', width: 1070, height: 713 },
  { id: 15, src: '/gallery-images/kyotopond.jpeg', alt: 'Kyoto Pond', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 16, src: '/gallery-images/nara-temple-gate.jpeg', alt: 'Nara Temple Gate', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 17, src: '/gallery-images/deer.jpeg', alt: "Nara's Famous Deer", category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 18, src: '/gallery-images/anothermmountain.jpeg', alt: 'More Snowy Hills', category: 'Nagano', width: 1070, height: 713 },
  { id: 19, src: '/gallery-images/kyotothing.jpeg', alt: 'Kiyomizu-dera', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 20, src: '/gallery-images/train.jpeg', alt: 'Train', category: 'Tokyo', width: 1070, height: 713 },
  { id: 21, src: '/gallery-images/Kiyomizu-dera.jpeg', alt: 'Kiyomizu-dera', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 22, src: '/gallery-images/train-seats.jpeg', alt: 'Train Seats', category: 'Nagano', width: 1070, height: 713 },
  { id: 23, src: '/gallery-images/tokyoriver.jpeg', alt: 'River near Tokyo Skytree', category: 'Tokyo', width: 1070, height: 713 },
  { id: 24, src: '/gallery-images/viewinkyoto.jpeg', alt: 'Sun Rays in Kyoto', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 25, src: '/gallery-images/forest-fukuoka.jpeg', alt: 'Trees in Fukuoka', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 26, src: '/gallery-images/osaka-boat.JPG', alt: 'Boat outside of Osaka Aquarium', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 27, src: '/gallery-images/akihabura.JPG', alt: 'Akihabura', category: 'Tokyo', width: 1070, height: 713 },
  { id: 28, src: '/gallery-images/denim-man.JPG', alt: 'Tokyo Flea Market', category: 'Tokyo', width: 1070, height: 713 },
  { id: 29, src: '/gallery-images/mount-nagano.JPG', alt: 'Mountain on the way to Nagano', category: 'Nagano', width: 1070, height: 713 },
  { id: 30, src: '/gallery-images/ueno.JPG', alt: 'River in Ueno', category: 'Tokyo', width: 1070, height: 713 },
  { id: 31, src: '/gallery-images/street-food.JPG', alt: 'Takoyaki', category: 'Nagano', width: 1070, height: 713 },
  { id: 32, src: '/gallery-images/dog.JPG', alt: 'Dog at Tokyo Museum', category: 'Tokyo', width: 1070, height: 713 },
  { id: 33, src: '/gallery-images/seal.JPG', alt: 'Seal', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 34, src: '/gallery-images/ueno-2.JPG', alt: 'Ueno Temple', category: 'Tokyo', width: 1070, height: 713 },
  { id: 35, src: '/gallery-images/temple-t.JPG', alt: 'Temple in Tokyo', category: 'Tokyo', width: 1070, height: 713 },
  { id: 36, src: '/gallery-images/asakusa.JPG', alt: 'Sensoji Temple', category: 'Tokyo', width: 1070, height: 713 },
  { id: 37, src: '/gallery-images/bamboo.JPG', alt: 'Bamboo', category: 'Osaka / Kyoto', width: 1070, height: 713 },
  { id: 38, src: '/gallery-images/buddha.JPG', alt: 'Resting Buddha', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 39, src: '/gallery-images/f1.JPG', alt: 'View in Fukuoka', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 40, src: '/gallery-images/f3.JPG', alt: 'Before the Resting Buddha', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 41, src: '/gallery-images/duckies.JPG', alt: 'Ducks', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 42, src: '/gallery-images/kido.JPG', alt: 'Street Lights', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 43, src: '/gallery-images/f2.JPG', alt: 'View in Fukuoka', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 44, src: '/gallery-images/f4.JPG', alt: 'Ohori Park', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 45, src: '/gallery-images/michellin.JPG', alt: 'Michelin Star Ramen', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 46, src: '/gallery-images/f5.JPG', alt: 'Pretty Trees', category: 'Fukuoka', width: 1070, height: 713 },
  { id: 47, src: '/gallery-images/thebros.JPG', alt: "The Bro's", category: 'Fukuoka', width: 1070, height: 713 },
  { id: 48, src: '/gallery-images/colly.jpeg', alt: 'Colosseum', category: 'Italy', width: 1070, height: 713 },
  { id: 49, src: '/gallery-images/flag.jpeg', alt: 'Flag', category: 'Italy', width: 1070, height: 713 },
  { id: 50, src: '/gallery-images/petey.jpeg', alt: 'St Peters', category: 'Italy', width: 1070, height: 713 },
  { id: 51, src: '/gallery-images/outside.jpeg', alt: 'Outside St Peters', category: 'Italy', width: 1070, height: 713 },
  { id: 52, src: '/gallery-images/boat.jpeg', alt: 'Boat', category: 'Italy', width: 1070, height: 713 },
  { id: 53, src: '/gallery-images/pan.jpeg', alt: 'Pantheon', category: 'Italy', width: 1070, height: 713 },
];

const categories = ['All', 'Tokyo', 'Nagano', 'Osaka / Kyoto', 'Fukuoka', 'Wedding', 'Italy'];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

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
          Gallery
        </motion.h1>
        <motion.p
          className="text-base"
          style={{ color: 'var(--text-tertiary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Travel, events, and everything in between.
        </motion.p>
      </section>

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
