// src/app/extracurriculars/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Layout from '../layout';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';


const RippleText = ({ text, className = "" }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring values for natural movement
  const springX = useSpring(mouseX, { damping: 30, stiffness: 1000 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 300 });

  // Transform functions for the ripple effect
  const rippleStrength = 0.5;
  const rippleScale = useTransform(
    springX,
    [-100, 0, 100],
    [1 - rippleStrength, 1, 1 - rippleStrength]
  );

  const rippleSkewX = useTransform(
    springY,
    [-100, 0, 100],
    [-rippleStrength, 0, rippleStrength]
  );

  const rippleSkewY = useTransform(
    springX,
    [-100, 0, 100],
    [rippleStrength, 0, -rippleStrength]
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center with damping
      const distanceX = (e.clientX - centerX) * 0.1;
      const distanceY = (e.clientY - centerY) * 0.1;

      mouseX.set(distanceX);
      mouseY.set(distanceY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="block w-full">
      <motion.h1
        ref={ref}
        className={`text-6xl font-extrabold text-white mb-4 ${className}`}
        style={{
          display: 'block',
          transformOrigin: 'center center',
          scale: rippleScale,
          skewX: rippleSkewX,
          skewY: rippleSkewY,
          transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)',
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            style={{
              display: 'inline-block',
              transformOrigin: 'center bottom',
            }}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};
const galleryImages = [
  {
    id: 1,
    src: '/gallery-images/teamlabs.png',
    alt: 'Team Labs Japan',
    category: 'japan',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 2,
    src: '/gallery-images/wedding1.jpeg',
    alt: "Leon x Linda's Wedding",
    category: 'Wedding',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 3,
    src: '/gallery-images/naganomonkey.png',
    alt: 'Nagano Monkeys',
    category: 'japan',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 4,
    src: '/gallery-images/tokyoview.jpeg',
    alt: 'Tokyo Skytree View',
    category: 'japan',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 5,
    src: '/gallery-images/kyoto.jpeg',
    alt: 'Me in Kyoto',
    category: 'japan',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 6,
    src: '/gallery-images/osakawhale.jpeg',
    alt: 'Whale Shark in Osaka Aquarium',
    category: 'japan',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 7,
    src: '/gallery-images/cherry.jpeg',
    alt: 'Pink Flowers in Fukuoka',
    category: 'japan',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  
  {
    id: 8,
    src: '/gallery-images/mumanddad.jpeg',
    alt: "Wedding Guests",
    category: 'Wedding',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 9,
    src: '/gallery-images/onetreehill.jpeg',
    alt: "Walking Off Into the Distance",
    category: 'Wedding',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 10,
    src: '/gallery-images/signing.jpeg',
    alt: "Signing the Marriage License",
    category: 'Wedding',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },

  {
    id: 11,
    src: '/gallery-images/bridalparty.jpeg',
    alt: "Friends & Family",
    category: 'Wedding',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 12,
    src: '/gallery-images/embrace.jpeg',
    alt: "Embrace",
    category: 'Wedding',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },


];
export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all'); // Default to 'all'

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <Layout pageTitle="Gallery">
      {/* Hero Section with Ripple Text */}
      <div className="flex flex-col items-center justify-center pt-20 pb-12">
        <div className="text-center mb-12 w-full">
          <RippleText text="JOSHUA LI's" />
          <RippleText
            text="Gallery"
            className="italic font-bold"
            style={{ fontFamily: "'Crimson Text', serif" }}
          />
        </div>

        {/* Gallery Content Below */}
        <div className="w-full max-w-6xl px-4">
          {/* Centered Category Filters */}
          <div className="flex justify-center space-x-4 mb-8">
            {['all', 'Japan', 'Wedding', 'Event'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full border border-white transition-all ${
                  activeCategory.toLowerCase() === category.toLowerCase()
                    ? 'bg-white/20 text-white' // Active state
                    : 'bg-transparent text-white/70 hover:bg-white/10' // Inactive state
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>


          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group bg-[#0A2ECE]"
                style={{ aspectRatio: '1070/713' }}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1070}
                  height={713}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={true}
                  placeholder="empty"
                  onError={(e) => {
                    console.error('Image failed to load:', image.src);
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-4">
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}>
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              priority
              unoptimized={true}
              onError={(e) => {
                console.error('Modal image failed to load:', selectedImage.src);
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {selectedImage.alt}
            </div>
            <button
              className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}