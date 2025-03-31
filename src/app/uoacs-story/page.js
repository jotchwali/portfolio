"use client";

import React, { useEffect } from "react";
import Image from "next/image";

// Simple text component without ripple effect
const SimpleText = ({ text, className = "", style = {} }) => {
  return (
    <h1
      className={`text-6xl font-extrabold text-white mb-4 ${className}`}
      style={style}
    >
      {text}
    </h1>
  );
};

// Enhanced responsive text component
const ResponsiveText = ({ text, className = "", isMain = false }) => {
  return (
    <h1
      className={`
        ${isMain ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"} 
        font-extrabold text-white mb-4 
        ${className}
        transition-all duration-300
        hover:scale-[1.02] hover:translate-y-[-2px]
      `}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block hover:translate-y-[-3px] transition-transform duration-200"
          style={{ transitionDelay: `${i * 20}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default function UOACSStory() {
  // Add Instagram script using useEffect to ensure it only runs on the client
  useEffect(() => {
    // Create and append Instagram script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
        <div className="text-center mb-32 w-full">
          <ResponsiveText
            text="UOACS's"
            isMain
          />
          <ResponsiveText
            text="Origin Story"
            isMain
            className=" font-medium"
          />
          <ResponsiveText
            text="from my pov"
            className="italic font-small"
            style={{ fontFamily: "'Crimson Text', serif" }}
          />
        </div>

        <button
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
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

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center bg-[#0A2ECE]">
        {/* UOACS Story Section */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-bold mb-6 pt-3">why i made a club:</h2>
          <div className="space-y-4 text-lg">
            <p>
              Nearing the end of my first year doing computer science, I really
              felt a lack of community around my practice. You could argue that
              there were other 'tech' clubs but as a first year, it felt
              exclusive and felt impossible to get into. This was the mindset of
              someone who made a conscious effort to make friends and have
              connections early on and so I thought this must've been a common
              emotion from my peers.
            </p>

            <p>
              I was studying with some friends for COMPSCI 120, a notoriously
              difficult course about mathematics for computer science. We took a
              small break to just chat and clear our minds when I brought up how
              hard it was to get into other clubs projects. In hindsight, my
              lack of experience and being a first year was definitely the
              reason why I was being rejected but at the time my emotions told
              me otherwise and started a fire within me. I followed this
              conversation up with a "why don't we just make a club?".
            </p>

            <p>
              At the time it was hard to fathom how this would work but I
              managed to sell the idea to them that day. The image below is a
              photo I took to remember this conversation and to mark the date.
              17th of October 2023 is when UOACS was born, and thus, our journey
              began.
            </p>

            {/* Banner Image Section */}
            <div className="w-full mt-8 mb-8 rounded-xl overflow-hidden shadow-lg">
              <div className="relative w-full h-48 md:h-64 lg:h-80">
                <Image
                  src="/extra-images/uoacs-origin.jpeg"
                  alt="UOACS's Genuine Founding Moment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  priority
                />
              </div>
              <div className="bg-white/10 p-3 text-center text-sm text-white/80">
                The Founding Moment - October 17, 2023
              </div>
            </div>

            {/* The How Section */}
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl font-bold mb-6 pt-3">
                how i made a club:
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  The process of building a club up really started with a few
                  core people: Chris Chiem, Ben MacSweeney, Jedrex Gannaban,
                  Sooji Noh, Narin Lane, Sanskriti Roy, and Zachary Taylor.
                  These were people that shared the vision with me or were all
                  at the first meeting we had as a club. Which brings me to the
                  next point.
                </p>

                <p>
                  Creating a club at a university is the result of three things
                  done well: Establishing a good team, selling the club as an
                  idea, and a whole lot of paperwork. To become recognised at
                  UOA took so many forms and proof of XYZ's that forced me to
                  become a jack of all trades. From learning how to open up a
                  official business account to writing constitutions, I realised
                  this project wouldln't be as easy as I thought. Thankfully, I
                  did the first part right and had a great team to support me
                  through all this.
                </p>

                {/* Banner Image Section */}
                <div className="w-full mt-8 mb-8 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative w-full h-48 md:h-64 lg:h-80">
                    <Image
                      src="/extra-images/meeting.jpeg"
                      alt=" Our First Meeting - February 11, 2024"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                      priority
                    />
                  </div>
                  <div className="bg-white/10 p-3 text-center text-sm text-white/80">
                    Our First Meeting Minutes- February 11, 2024
                  </div>
                </div>

                <p>
                  The second part was arguably the most crucial part of making
                  UOACS into what it is today. How do you make people want to be
                  a part of your group? How do you orchestrate demand? How do
                  you create a sense of FOMO? Anyone can do some paperwork and
                  follow simple instructions but how do you create genuine
                  interest in a club that is trying to survive a saturated
                  space?
                </p>

                <p>
                  At the creation of the club, we were entering a space of four
                  other tech clubs. They called themselves the big four and had
                  all mostly been around for 6+ years each. We didn't have any
                  advantage against these clubs but we did have a fresh outlook
                  and no rules in terms of how we run this show. They all
                  followed the culture that was there before them, they followed
                  the rough calendars, the same(ish) events, and had the
                  infrastructure to do so. They had everything from years of
                  accrued sponsorship money to pipelines of succession. Us on
                  the other hand had nothing.
                </p>
                <p>
                  My strategy was simple enough. Call every person I know to
                  come to our launch night and the credibility will start from
                  there.
                </p>

                {/* Banner Image Section */}
                <div className="w-full mt-8 mb-8 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative w-full h-48 md:h-64 lg:h-80">
                    <Image
                      src="/extra-images/launch-all.jpeg"
                      alt="UOACS's Launch Night"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                      priority
                    />
                  </div>
                  <div className="bg-white/10 p-3 text-center text-sm text-white/80">
                    UOACS's Launch Night - August 8th, 2024
                  </div>
                </div>
                <div className="space-y-4 text-lg">
                  <p>
                    To my surprise, a lot of people showed up to our launch
                    night and it was a huge success. We hosted 91 attendees, (41
                    over capacity) and above all, we proved to ourselves that
                    this "idea" might actually work. What really made me believe
                    that it could work is when I realised that there were 4
                    other events on that night. To see people choose to spend
                    their time at our event is when it really became clear that
                    this wasn't a flop.
                  </p>
                </div>
              </div>
            </div>
            {/* The How Section */}
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl font-bold mb-6 pt-3">
                what i've done since:
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  We've successfully ran multiple events that are either social
                  or career focused and above all, we've created a community.
                  Through this club I've been able to create openings and give
                  my friends experiences and opportunities that I would've
                  begged for in my first year. I have learnt how to really sell
                  us even more and have accumulated 5 figures in sponsorship
                  revenue. I've had people come up to me and tell me they've
                  landed jobs because of our industry nights. I've seen students
                  connect with one another and meet people that are all
                  interested in the same things. I've seen friendships form and
                  have seen people do group assignments with people they met at
                  our events. I've ultimately just seen our impact and I'm so
                  glad that its positive.
                </p>

                {/* Banner Image Section */}
                <div className="w-full mt-8 mb-8 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative w-full h-48 md:h-64 lg:h-80">
                    <Image
                      src="/extra-images/martin.jpeg"
                      alt="Esports Collab"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                      priority
                    />
                  </div>
                  <div className="bg-white/10 p-3 text-center text-sm text-white/80">
                    AUEC x UOACS - August 23, 2024
                  </div>
                </div>

                <p>
                  Thats been the reward of the countless hours put into this
                  club. Seeing people smile and say that the club impacted their
                  life in a positve way because I actioned an idea will always
                  be a win. To see how we're doing today, check out our instagram.
                </p>
              </div>
            </div>

            {/* Instagram Embed Section - Only on this page */}
            <div className="w-full bg-[#0A2ECE] py-12 border-t border-white/10">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center mb-8">
                  <h2 className="text-3xl font-bold text-white">Follow Our Journey</h2>
                  <p>(refresh if the images aren't loading)</p>
                </div>
                
                <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  {/* Profile Header */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white">uoacs25</p>
                      <p className="text-sm text-white/80">University of Auckland CompSci Society</p>
                      
                    </div>
                  </div>
                  
                  {/* Instagram Embed */}
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <blockquote 
                      className="instagram-media" 
                      data-instgrm-permalink="https://www.instagram.com/uoacs25/"
                      data-instgrm-version="14"
                      style={{
                        background: '#FFF', 
                        border: '0',
                        borderRadius: '3px',
                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                        margin: '0 auto',
                        maxWidth: '100%',
                        minWidth: '326px',
                        padding: '0',
                        width: '100%'
                      }}
                    >
                      {/* Fallback Content */}
                      <div className="bg-white/20 aspect-square flex items-center justify-center">
                        <p className="text-white text-center p-4">
                          Follow <a href="https://www.instagram.com/uoacs25/" className="underline">@uoacs25</a> on Instagram
                        </p>
                      </div>
                    </blockquote>
                  </div>

                  {/* Follow Button */}
                  <a 
                    href="https://www.instagram.com/uoacs25/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white text-center py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Follow on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}