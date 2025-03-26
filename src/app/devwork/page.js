// src/app/devwork/page.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Layout from '../layout';

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
      <div className="min-h-screen bg-[#0A2ECE] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">JOSHUA LI's</h1>
          <h2 className="text-2xl font-semibold mb-12">Dev / Design Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="border border-white/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/5 hover:bg-white/10"
              >
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <div className="relative h-48 bg-gray-100 cursor-pointer group">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold text-lg">
                        Visit Site
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="text-sm text-white/70">{project.year}</span>
                  </div>
                  
                  <p className="text-white/80 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-white/10 text-white text-xs rounded-full"
                      >
                        {tech}
                      </span>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}