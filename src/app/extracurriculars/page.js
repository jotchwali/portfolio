// src/app/extracurriculars/page.js
'use client';

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

export default function Extracurriculars() {
  return (
    <Layout pageTitle="Extracurriculars">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
        <div className="text-center mb-32 w-full">
          <RippleText text="JOSHUA LI's" />
          <RippleText
            text="Extracurriculars"
            className="italic font-bold"
            style={{ fontFamily: "'Crimson Text', serif" }}
          />
        </div>
        {/* Your Extracurriculars content here */}
      </div>
    </Layout>
  );
}