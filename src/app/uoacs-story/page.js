// src/app/uoacs-story/page.js
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

const StoryImage = ({ src, alt, caption }) => (
  <FadeIn>
    <div className="my-10 rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
      <div className="relative w-full h-48 md:h-64 lg:h-80">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          priority
        />
      </div>
      {caption && (
        <div className="px-4 py-3 text-center">
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {caption}
          </p>
        </div>
      )}
    </div>
  </FadeIn>
);

export default function UOACSStory() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.p
          className="text-xs font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--text-tertiary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Origin Story
        </motion.p>
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-3 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          UOACS
        </motion.h1>
        <motion.p
          className="text-base italic"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          from my point of view
        </motion.p>
      </section>

      {/* Story Content */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        {/* Why Section */}
        <FadeIn>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Why I made a club
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            Nearing the end of my first year doing computer science, I really felt a lack of community around my practice. You could argue that there were other 'tech' clubs but as a first year, it felt exclusive and felt impossible to get into. This was the mindset of someone who made a conscious effort to make friends and have connections early on and so I thought this must've been a common emotion from my peers.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            I was studying with some friends for COMPSCI 120, a notoriously difficult course about mathematics for computer science. We took a small break to just chat and clear our minds when I brought up how hard it was to get into other clubs projects. In hindsight, my lack of experience and being a first year was definitely the reason why I was being rejected but at the time my emotions told me otherwise and started a fire within me. I followed this conversation up with a "why don't we just make a club?".
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            At the time it was hard to fathom how this would work but I managed to sell the idea to them that day. The image below is a photo I took to remember this conversation and to mark the date. 17th of October 2023 is when UOACS was born, and thus, our journey began.
          </p>
        </FadeIn>

        <StoryImage
          src="/extra-images/uoacs-origin.jpeg"
          alt="UOACS's Genuine Founding Moment"
          caption="The Founding Moment - October 17, 2023"
        />

        {/* How Section */}
        <FadeIn>
          <h2 className="text-2xl font-semibold mb-6 mt-16" style={{ color: 'var(--text-primary)' }}>
            How I made a club
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            The process of building a club up really started with a few core people: Chris Chiem, Ben MacSweeney, Jedrex Gannaban, Sooji Noh, Narin Lane, Sanskriti Roy, and Zachary Taylor. These were people that shared the vision with me or were all at the first meeting we had as a club.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            Creating a club at a university is the result of three things done well: Establishing a good team, selling the club as an idea, and a whole lot of paperwork. To become recognised at UOA took so many forms and proof of XYZ's that forced me to become a jack of all trades. From learning how to open up an official business account to writing constitutions, I realised this project wouldn't be as easy as I thought. Thankfully, I did the first part right and had a great team to support me through all this.
          </p>
        </FadeIn>

        <StoryImage
          src="/extra-images/meeting.jpeg"
          alt="Our First Meeting"
          caption="Our First Meeting Minutes - February 11, 2024"
        />

        <FadeIn>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            The second part was arguably the most crucial part of making UOACS into what it is today. How do you make people want to be a part of your group? How do you orchestrate demand? How do you create a sense of FOMO? Anyone can do some paperwork and follow simple instructions but how do you create genuine interest in a club that is trying to survive a saturated space?
          </p>
        </FadeIn>

        <FadeIn>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            At the creation of the club, we were entering a space of four other tech clubs. They called themselves the big four and had all mostly been around for 6+ years each. We didn't have any advantage against these clubs but we did have a fresh outlook and no rules in terms of how we run this show.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            My strategy was simple enough. Call every person I know to come to our launch night and the credibility will start from there.
          </p>
        </FadeIn>

        <StoryImage
          src="/extra-images/launch-all.jpeg"
          alt="UOACS Launch Night"
          caption="UOACS Launch Night - August 8th, 2024"
        />

        <FadeIn>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            To my surprise, a lot of people showed up to our launch night and it was a huge success. We hosted 91 attendees, (41 over capacity) and above all, we proved to ourselves that this "idea" might actually work. What really made me believe that it could work is when I realised that there were 4 other events on that night. To see people choose to spend their time at our event is when it really became clear that this wasn't a flop.
          </p>
        </FadeIn>

        {/* What I've Done Since */}
        <FadeIn>
          <h2 className="text-2xl font-semibold mb-6 mt-16" style={{ color: 'var(--text-primary)' }}>
            What I've done since
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            We've successfully ran multiple events that are either social or career focused and above all, we've created a community. Through this club I've been able to create openings and give my friends experiences and opportunities that I would've begged for in my first year. I have learnt how to really sell us even more and have accumulated 5 figures in sponsorship revenue. I've had people come up to me and tell me they've landed jobs because of our industry nights. I've seen students connect with one another and meet people that are all interested in the same things. I've seen friendships form and have seen people do group assignments with people they met at our events. I've ultimately just seen our impact and I'm so glad that it's positive.
          </p>
        </FadeIn>

        <StoryImage
          src="/extra-images/martin.jpeg"
          alt="Esports Collab"
          caption="AUEC x UOACS - August 23, 2024"
        />

        <FadeIn>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            That's been the reward of the countless hours put into this club. Seeing people smile and say that the club impacted their life in a positive way because I actioned an idea will always be a win. To see how we're doing today, check out our Instagram.
          </p>
        </FadeIn>

        {/* Instagram Section */}
        <FadeIn>
          <div
            className="mt-16 border-t pt-12"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <h3 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>
              Follow Our Journey
            </h3>
            <p className="text-sm text-center mb-8" style={{ color: 'var(--text-tertiary)' }}>
              Refresh if the images aren't loading
            </p>

            <div
              className="max-w-md mx-auto rounded-2xl p-5 border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-light)',
              }}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: 'var(--bg-tertiary)' }}
                >
                  <svg className="w-5 h-5" fill="var(--text-secondary)" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>uoacs25</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>University of Auckland CompSci Society</p>
                </div>
              </div>

              <div className="mb-4 rounded-xl overflow-hidden">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/uoacs25/"
                  data-instgrm-version="14"
                  style={{
                    background: 'transparent',
                    border: '0',
                    borderRadius: '12px',
                    margin: '0 auto',
                    maxWidth: '100%',
                    minWidth: '326px',
                    padding: '0',
                    width: '100%',
                  }}
                >
                  <div
                    className="aspect-square flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    <p className="text-center text-sm p-4" style={{ color: 'var(--text-secondary)' }}>
                      Follow <a href="https://www.instagram.com/uoacs25/" className="underline">@uoacs25</a> on Instagram
                    </p>
                  </div>
                </blockquote>
              </div>

              <a
                href="https://www.instagram.com/uoacs25/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                }}
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
