// src/app/extracurriculars/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Layout from '../layout';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const SimpleText = ({ text, className = "" }) => {
  return (
    <h1 className={`text-6xl font-extrabold text-white mb-4 ${className}`}>
      {text}
    </h1>
  );
};

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
    src: '/gallery-images/teamlabs.png',
    alt: 'Team Labs Japan',
    category: 'Tokyo',
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
    category: 'Nagano',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 4,
    src: '/gallery-images/tokyoview.jpeg',
    alt: 'Tokyo Skytree View',
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 5,
    src: '/gallery-images/kyoto.jpeg',
    alt: 'Me in Kyoto',
    category: 'Osaka / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 6,
    src: '/gallery-images/osakawhale.jpeg',
    alt: 'Whale Shark in Osaka Aquarium',
    category: 'Osaka / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 7,
    src: '/gallery-images/cherry.jpeg',
    alt: 'Pink Flowers in Fukuoka',
    category: 'Fukuoka',
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
  {
    id: 13,
    src: '/gallery-images/tokyotrees.jpeg',
    alt: "Tokyo's Trees",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 14,
    src: '/gallery-images/nagano-snow.jpeg',
    alt: "Snowy Hills",
    category: 'Nagano',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 15,
    src: '/gallery-images/kyotopond.jpeg',
    alt: "Kyoto Pond",
    category: 'Osaka / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 16,
    src: '/gallery-images/nara-temple-gate.jpeg',
    alt: "Nara Temple Gate",
    category: 'Osasa / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 17,
    src: '/gallery-images/deer.jpeg',
    alt: "Nara's Famous Deer",
    category: 'Osasa / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 18,
    src: '/gallery-images/anothermmountain.jpeg',
    alt: "More Snowy Hills",
    category: 'Nagano',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 19,
    src: '/gallery-images/kyotothing.jpeg',
    alt: "Kiyomizu-dera",
    category: 'Osaka / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 20,
    src: '/gallery-images/train.jpeg',
    alt: "Train",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 21,
    src: '/gallery-images/Kiyomizu-dera.jpeg',
    alt: "Kiyomizu-dera",
    category: 'Osaka / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 22,
    src: '/gallery-images/train-seats.jpeg',
    alt: "Train Seats",
    category: 'Nagano',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 23,
    src: '/gallery-images/tokyoriver.jpeg',
    alt: "River near Tokyo Skytree",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 24,
    src: '/gallery-images/viewinkyoto.jpeg',
    alt: "Sun Rays in Kyoto",
    category: 'Osaka / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 25,
    src: '/gallery-images/forest-fukuoka.jpeg',
    alt: "Trees in Fukuoka",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 26,
    src: '/gallery-images/osaka-boat.JPG',
    alt: "Boat outside of Osaka Aquarium",
    category: 'Osaka / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 27,
    src: '/gallery-images/akihabura.JPG',
    alt: "Akihabura",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 28,
    src: '/gallery-images/denim-man.JPG',
    alt: "Tokyo Flea Market",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 29,
    src: '/gallery-images/mount-nagano.JPG',
    alt: "Mountain on the way to Nagano",
    category: 'Nagano',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 30,
    src: '/gallery-images/ueno.JPG',
    alt: "River in Ueno",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 31,
    src: '/gallery-images/street-food.JPG',
    alt: "Takoyaki",
    category: 'Nagano',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 32,
    src: '/gallery-images/dog.JPG',
    alt: "Dog at Tokyo Muesuem",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 33,
    src: '/gallery-images/seal.JPG',
    alt: "Seal",
    category: 'Osaka / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 34,
    src: '/gallery-images/ueno-2.JPG',
    alt: "Ueno Temple",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 35,
    src: '/gallery-images/temple-t.JPG',
    alt: "Temple in Tokyo",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 36,
    src: '/gallery-images/asakusa.JPG',
    alt: "Sensoji Temple",
    category: 'Tokyo',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 37,
    src: '/gallery-images/bamboo.JPG',
    alt: "Bamboo",
    category: 'Osaka / Kyoto',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 38,
    src: '/gallery-images/buddha.JPG',
    alt: "Resting Buddha",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 39,
    src: '/gallery-images/f1.JPG',
    alt: "View in Fukuoka",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 40,
    src: '/gallery-images/f3.JPG',
    alt: "Before the Resting Buddha",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 41,
    src: '/gallery-images/duckies.JPG',
    alt: "Ducks",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 42,
    src: '/gallery-images/kido.JPG',
    alt: "Street Lights",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 43,
    src: '/gallery-images/f2.JPG',
    alt: "View in Fukuoka",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 44,
    src: '/gallery-images/f4.JPG',
    alt: "Ohori Park",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 45,
    src: '/gallery-images/michellin.JPG',
    alt: "Michellin Star Ramen",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 46,
    src: '/gallery-images/f5.JPG',
    alt: "Pretty Trees",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 47,
    src: '/gallery-images/thebros.JPG',
    alt: "The Bro's",
    category: 'Fukuoka',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 48,
    src: '/gallery-images/colly.jpeg',
    alt: "Colessuem",
    category: 'Italy',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 49,
    src: '/gallery-images/flag.jpeg',
    alt: "Flag",
    category: 'Italy',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 50,
    src: '/gallery-images/petey.jpeg',
    alt: "St Peters",
    category: 'Italy',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },  
  {
    id: 51,
    src: '/gallery-images/outside.jpeg',
    alt: "Outside St Peters",
    category: 'Italy',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 52,
    src: '/gallery-images/boat.jpeg',
    alt: "Boat",
    category: 'Italy',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },
  {
    id: 53,
    src: '/gallery-images/pan.jpeg',
    alt: "Pantheon",
    category: 'Italy',
    width: 1070,   // Add actual dimensions if known
    height: 713   // Add actual dimensions if known
  },




];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <Layout pageTitle="Gallery">
      <div className="flex flex-col items-center justify-center pt-16 md:pt-20 pb-8 md:pb-12">
      <div className="text-center mb-8 md:mb-12 w-full px-4">
          <ResponsiveText text="JOSHUA LI's" isMain/>
          <ResponsiveText
            text="Gallery"
            className="italic font-bold"
            style={{ fontFamily: "'Crimson Text', serif" }}
          />
        </div>

        <div className="w-full max-w-6xl px-4">
          {/* Improved Category Filters for Mobile */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 px-2">
            {['all', 'Nagano', 'Tokyo', 'Osaka / Kyoto', 'Fukuoka', 'Wedding', 'Italy'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-full border border-white transition-all whitespace-nowrap ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
                  <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base">
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