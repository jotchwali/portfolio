'use client';

import React from 'react';

// Simple text component without ripple effect
const SimpleText = ({ text, className = "", style = {} }) => {
  return (
    <h1 className={`text-6xl font-extrabold text-white mb-4 ${className}`} style={style}>
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

export default function Home() {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
        <div className="text-center mb-32 w-full">
          <ResponsiveText text="JOSHUA LI's"isMain />
          <ResponsiveText
            text="Contact Me"
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
          <svg
            width="74"
            height="60"
            viewBox="0 0 74 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.4645 58.5355C35.4171 60.4882 38.5829 60.4882 40.5355 58.5355L72.3553 26.7157C74.308 24.7631 74.308 21.5973 72.3553 19.6447C70.4027 17.692 67.2369 17.692 65.2843 19.6447L37 47.9289L8.71573 19.6447C6.76311 17.692 3.59728 17.692 1.64466 19.6447C-0.307961 21.5973 -0.307961 24.7631 1.64466 26.7157L33.4645 58.5355ZM32 0L32 55L42 55L42 0L32 0Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center bg-[#0A2ECE]">
        <div className="max-w-2xl w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LinkedIn Card */}
            <div className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-4">Connect on LinkedIn</h3>
              <p className="mb-4">Let's connect professionally and explore opportunities.</p>
              <a
                href="https://www.linkedin.com/in/joshua-li-uoa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#0077B5] text-white rounded-md hover:bg-[#006097] transition-colors"
              >
                Visit LinkedIn
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-4">Send an Email</h3>
              <p className="mb-4">Feel free to drop me a message via email.</p>
              <a
                href="mailto:your-email@example.com?subject=Hello%20Joshua"
                className="inline-flex items-center px-4 py-2 bg-[#0077B5] text-white rounded-md hover:bg-[#006097] transition-colors"
              >
                Email Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}