// src/app/devwork/page.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Layout from '../layout';
import { motion } from 'framer-motion';

// Optimized responsive text component with smoother hover effects
const ResponsiveText = ({ text, className = "", isMain = false }) => {
  return (
    <h1 className={`
      ${isMain ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} 
      font-extrabold text-white mb-4 
      ${className}
    `}>
      {text.split('').map((char, i) => (
        <motion.span 
          key={i} 
          className="inline-block"
          whileHover={{
            y: -4,
            transition: { 
              type: "spring",
              stiffness: 400,
              damping: 10,
              duration: 0.1
            }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
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
    <Layout pageTitle="Dev Work">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] bg-[#0A2ECE]">
        <div className="text-center mb-32 w-full">
          <ResponsiveText text="JOSHUA LI's" isMain />
          <ResponsiveText
            text="Dev / Design Work"
            className="italic font-bold"
            style={{ fontFamily: "'Crimson Text', serif" }}
          />
        </div>

        <motion.button
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="74" height="60" viewBox="0 0 74 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.4645 58.5355C35.4171 60.4882 38.5829 60.4882 40.5355 58.5355L72.3553 26.7157C74.308 24.7631 74.308 21.5973 72.3553 19.6447C70.4027 17.692 67.2369 17.692 65.2843 19.6447L37 47.9289L8.71573 19.6447C6.76311 17.692 3.59728 17.692 1.64466 19.6447C-0.307961 21.5973 -0.307961 24.7631 1.64466 26.7157L33.4645 58.5355ZM32 1.58962e-09L32 55L42 55L42 -1.58962e-09L32 1.58962e-09Z" fill="white" />
          </svg>
        </motion.button>
      </div>

      {/* Projects Section */}
      <div className="min-h-screen bg-[#0A2ECE] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="border border-white/20 rounded-lg overflow-hidden bg-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transition: { duration: 0.15 }
                }}
              >
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <motion.div 
                    className="relative h-48 bg-gray-100 cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.15 }}
                  >
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <motion.div 
                      className="absolute inset-0 bg-black/0 flex items-center justify-center"
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                      transition={{ duration: 0.15 }}
                    >
                      <motion.span 
                        className="text-white font-bold text-lg"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        Visit Site
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </Link>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="text-sm text-white/70">{project.year}</span>
                  </div>
                  
                  <p className="text-white/80 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <motion.span 
                        key={i}
                        className="px-3 py-1 bg-white/10 text-white text-xs rounded-full"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                        transition={{ duration: 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <Link 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:underline"
                    >
                      Live Demo →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}