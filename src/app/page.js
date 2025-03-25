'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Head from 'next/head';
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
    <div className="block w-full"> {/* Changed to block */}
      <motion.h1
        ref={ref}
        className={`text-6xl font-extrabold text-white mb-4 ${className}`}
        style={{
          display: 'block', // Changed to block
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

const ExperienceItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2"/>
          </svg>
        </motion.div>
      </button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 pb-2">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const Page = () => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@1,700&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-[#0A2ECE] min-h-screen text-white font-sans relative">
        {/* Home Button */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 text-white font-bold">
          <span className="text-sm">home</span>
          <span className="text-sm">/</span>
          <span className="text-sm">首页</span>
        </div>
        
        {/* Hamburger Menu */}
        {/* <div className="absolute top-4 right-4 space-y-2 cursor-pointer">
          <div className="w-14 h-1 bg-white rounded-full"></div>
          <div className="w-10 h-1 bg-white rounded-full"></div>
          <div className="w-8 h-1 bg-white rounded-full"></div>
        </div> */}

        {/* Vertical Chinese Characters */}
        <div className="absolute top-4 right-4 space-y-2 text-2xl font-bold opacity-100 tracking-wider">
          李<br />
          以<br />
          勤
        </div>

        {/* Centered Hero Section */}
        <div className="flex flex-col items-center justify-center h-screen">
  <div className="text-center mb-32 w-full">
    <RippleText text="JOSHUA LI's" />
    <RippleText
      text="Portfolio"
      className="italic font-bold"
      style={{ fontFamily: "'Crimson Text', serif" }}
    />
  </div>

          <button
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }}
            className="mt-10 animate-bounce"
          >
            <svg width="74" height="60" viewBox="0 0 74 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.4645 58.5355C35.4171 60.4882 38.5829 60.4882 40.5355 58.5355L72.3553 26.7157C74.308 24.7631 74.308 21.5973 72.3553 19.6447C70.4027 17.692 67.2369 17.692 65.2843 19.6447L37 47.9289L8.71573 19.6447C6.76311 17.692 3.59728 17.692 1.64466 19.6447C-0.307961 21.5973 -0.307961 24.7631 1.64466 26.7157L33.4645 58.5355ZM32 1.58962e-09L32 55L42 55L42 -1.58962e-09L32 1.58962e-09Z" fill="white" />
            </svg>
          </button>
        </div>

        {/* The rest of your content */}
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center bg-[#0A2ECE]">
          {/* About Section */}
          <div className='max-w-2xl mb-16'>
            <h2 className='text-3xl font-bold mb-6'>about:</h2>
            <div className='space-y-4 text-lg'>
              <p>Hi! My name is Josh, and welcome to my portfolio. I am in my final year of Computer Science and IT Management at the University of Auckland, on track to complete my studies by November 2025.</p>
              <p>During the week, I serve as the President of UOACS, an Outreach Executive at Velocity, a UX/UI Designer for WDCC, and a volunteer evangelist for MyUniClub.</p>
              <p>On weekends, I busk at the Takapuna markets, a keyholder at AS Colour and also the pianist and MD for my church's band.</p>
              <p>In my free time I watch the Lakers dominate and I play a pretty poor Galio in the mid lane. Oh and I love to eat.</p>
            </div>
          </div>

          {/* Education Section */}
          <div className='max-w-2xl w-full'>
          <h2 className='text-3xl font-bold mb-6'>education:</h2>
          <div className='space-y-8'>
          <div>
                <ExperienceItem title="University of Auckland">
                  <p>Bachelor of Science, Majoring in Computer Science and IT Management        -- 2023-2025</p>
                  <h4 className='text 2xl font-bold'>Relevant Courses:</h4>
                  <p>Principles of Programming, Data Wrangling and Big Data, Data Management, Computer Organisation, Object Oriented Software Development, Digital Systems, Mathematics for Computer Science, Information Tools for Business, Machine Learning. </p>
                </ExperienceItem>
              </div>
          </div>
          </div>
          
          {/* Experience Section */}
          <div className='max-w-2xl w-full'>
            <h2 className='text-3xl font-bold mb-6 pt-6'>experience:</h2>
            <div className='space-y-8'>
              <div>
                <h3 className='text-2xl font-semibold mb-2'>Currently:</h3>
                <ExperienceItem title="Founding President of UOACS (University of Auckland CompSci Society)">
                <p>Halfway through my degree, I realized I should do a bit more at uni. I always had a thought in the back of my mind wondering why there wasn't a computer science society at the largest university in New Zealand. So... I created one.</p>
                <p className='mt-4'>From no money, no team, no members, no formal recognition to over five figures in sponsorship revenue, 300+ paid members and an awesome team of 22 executives that help me run this club. It has been the most rewarding and stressful project of my life and I wouldn't change it for the world.</p>
                </ExperienceItem>
              </div>

              <div>
              <ExperienceItem title="Outreach Executive at Velocity">
                <p>I always heard about Velocity and the opportunities they provide and never took action until my friend Ray told me about the applications. Following my experience creating the club, I found a knack for building things from the group up and Velocity seemed like the best place to go</p>
                <p className='mt-4'>Since joining, I've made so many amazing memories, met the most insipiring people and have helped set up events for the community.</p>
              </ExperienceItem>
              </div>

              <div>
                <ExperienceItem title="UX/UI Designer at WDCC (MedRevue)">
                <p>This year I have joined WDCC as a pure designer, working on the MedRevue project. The Auckland Med Revue is an annual charity variety show performed by University of Auckland medical students, featuring humorous skits, songs, and dances, with proceeds supporting causes like the Cancer Society of New Zealand.</p>
                </ExperienceItem>
              </div>

              <div>
                <ExperienceItem title="Generalist Volunteer at MyUniClub">
                <p>MyUniClub is a fresh startup that is working towards becoming the best Saas for university clubs. My role is more of an advisory position to guide the founding team in the right direction since I am heavily involved in clubs.</p>
                </ExperienceItem>
              </div>

              <div>
                <ExperienceItem title="Keyholder at AS Colour">
                <p>I help customers find the right balance between their needs and wants while strategically upselling products. Working in a commission-based environment, I quickly read people and adapt to their preferences, ensuring a great experience while driving sales. This role continuously sharpens my interpersonal skills and quick thinking.</p>
                </ExperienceItem>
              </div>

              <h3 className='text-xl font-semibold mb-2'>Previously:</h3>
              <h3 className='text-xl font-semibold mb-2'>Functional Analyst Intern at UOA</h3>
              <h3 className='text-xl font-semibold mb-2'>Software Developer at WDCC (Passport)</h3>
              <h3 className='text-xl font-semibold mb-2'>Piano Teacher</h3>
              <h3 className='text-xl font-semibold mb-2'>Customer Service Representative at Briscoes Head Office</h3>
              <h3 className='text-xl font-semibold mb-2'>Sales Assistant at Briscoes PC</h3>
              <h3 className='text-xl font-semibold mb-2'>After School Care Helper at sKids</h3>
              <h3 className='text-xl font-semibold mb-2'>Pharmacy Assistant at Chemist Warehouse</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;