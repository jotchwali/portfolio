// src/app/extracurriculars/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Layout from '../layout';
import Link from 'next/link';


// Enhanced responsive text component
const ResponsiveText = ({ text, className = "", isMain = false }) => {
  return (
    <h1 className={`
      ${isMain ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} 
      font-extrabold text-white mb-4 
      ${className}
      transition-all duration-300
      hover:scale-[1.02] hover:translate-y-[-2px]
    `}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="inline-block hover:translate-y-[-3px] transition-transform duration-200"
          style={{ transitionDelay: `${i * 20}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
};

const galleryImages = [
  {
    id: 1,
    src: '/extra-images/vpxfp.jpeg',
    alt: 'VP and FP',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 2,
    src: '/extra-images/velocity-all.jpeg',
    alt: 'Velocity 2025',
    category: 'Velocity',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 3,
    src: '/extra-images/uoacs-launch.jpeg',
    alt: 'Founding UOACS Exec',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 4,
    src: '/extra-images/pookie.jpeg',
    alt: 'Jess and I',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 5,
    src: '/extra-images/uoacs-pool.jpeg',
    alt: 'UOACS @ Pool Event',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 6,
    src: '/extra-images/vel-1.jpeg',
    alt: 'Velocity Execs',
    category: 'Velocity',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 7,
    src: '/extra-images/sooj.jpeg',
    alt: 'Industry Night Sign In',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 8,
    src: '/extra-images/thebros.jpeg',
    alt: 'Esports Competitors',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 9,
    src: '/extra-images/launch1.jpeg',
    alt: 'Pre-Launch Night',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  }, 
  {
    id: 10,
    src: '/extra-images/vel-2.jpeg',
    alt: 'Velocity Kick Off',
    category: 'Velocity',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 11,
    src: '/extra-images/jpxjl.jpeg',
    alt: 'Pool Night with JP',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 12,
    src: '/extra-images/gdgc-aspa-collab.jpeg',
    alt: 'Presidents Photo',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 13,
    src: '/extra-images/esports-martin.jpeg',
    alt: 'Esports in Action',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 14,
    src: '/extra-images/industry-full.jpeg',
    alt: 'Full House!',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 15,
    src: '/extra-images/meandvish.jpeg',
    alt: 'Industry Night with Vish',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 16,
    src: '/extra-images/meatpool.jpeg',
    alt: 'Me at Pool',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 17,
    src: '/extra-images/esports-waiting.jpeg',
    alt: 'Esports Wait Screen',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 18,
    src: '/extra-images/launch-prep.jpeg',
    alt: 'Before our Launch Night',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 19,
    src: '/extra-images/wdcc-full-team.jpg',
    alt: 'WDCC Passport Team',
    category: 'WDCC',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 20,
    src: '/extra-images/pizza2.jpg',
    alt: 'Pizza!', // Just checking if this works
    category: 'WDCC',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 21,
    src: '/extra-images/wdcc-ful.jpeg',
    alt: 'Projects Launch Night 2024',
    category: 'WDCC',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 22,
    src: '/extra-images/bbq.JPG',
    alt: 'UOACS BBQ 2025',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 23,
    src: '/extra-images/industry-panels.jpeg',
    alt: 'Industry Night Panelists',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 24,
    src: '/extra-images/launch-all.jpeg',
    alt: 'Launch Night Attendees',
    category: 'UOACS',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
];

export default function Extracurriculars() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
  
    const filteredImages = activeCategory === 'all' 
      ? galleryImages 
      : galleryImages.filter(img => img.category.toLowerCase() === activeCategory.toLowerCase());
  
    return (
      <Layout pageTitle="Extracurriculars">
        {/* Hero Section with Responsive Text */}
        <div className="flex flex-col items-center justify-center -mt-8 md:-mt-12 pb-8 md:pb-12">
        <div className="text-center mb-8 md:mb-12 w-full px-4">
            <ResponsiveText text="JOSHUA LI's" isMain />
            <ResponsiveText
              text="Extracurriculars"
              className="italic font-bold"
              style={{ fontFamily: "'Crimson Text', serif" }}
            />
          </div>

          {/* Landscape Banner Photo */}
          <div className="w-full max-w-6xl px-4 mb-8">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
              <Image
                src="/extra-images/bbq-banner.png" // Replace with your actual banner image path
                alt="UOACS Banner"
                fill
                className="object-cover"
                unoptimized={true}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <Link href="/uoacs-story" className="text-white hover:underline">
                  click here to learn more about uoacs's story
                </Link>
              </div>
            </div>
          </div>
  
          {/* Gallery Content Below */}
          <div className="w-full max-w-6xl px-4">
            {/* Centered Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
              {['all', 'UOACS', 'Velocity', 'WDCC'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-full border border-white transition-all ${
                    activeCategory.toLowerCase() === category.toLowerCase()
                      ? 'bg-white/20 text-white'
                      : 'bg-transparent text-white/70 hover:bg-white/10'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
  
            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-3 md:p-4">
                    <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs md:text-sm">
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