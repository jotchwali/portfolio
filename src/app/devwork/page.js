// src/app/extracurriculars/page.js
'use client';

import Link from 'next/link';
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


const projects = [
  {
    title: "UOACS Website",
    description: "Official website for University of Auckland Computer Science Society with event management and member portal.",
    tech: ["React", "Next.js", "Tailwind CSS", "Firebase"],
    year: "2024",
    liveLink: "https://uoacs.org/",
    image: "/gallery-images/uoacs2.png"
  },
  {
    title: "WDCC Passport",
    description: "Digital passport system for WDCC members with achievement tracking and event check-ins.",
    tech: ["TypeScript", "MongoDB", "Node.js", "Express.js", "React"],
    year: "2024",
    liveLink: "https://passport.wdcc.co.nz/",
    image: "/gallery-images/wdccpassport.jpeg"
  },
  {
    title: "Podcast Library",
    description: "CRUD operations and authentication system for podcast management with user profiles.",
    tech: ["HTML", "CSS", "JavaScript", "Flask", "PostgreSQL"],
    year: "2024",
    liveLink: "https://img-984444524408.australia-southeast1.run.app/",
    image: "/gallery-images/podcastlib.png"
  }
];

export default function DevWork() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">JOSHUA LI's</h1>
        <h2 className="text-2xl font-semibold mb-12 text-[#0A2ECE]">Dev / Design Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 bg-gray-100">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-[#0A2ECE] text-white text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Link 
                    href={project.liveLink}
                    className="text-[#0A2ECE] font-medium hover:underline"
                  >
                    Live
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}