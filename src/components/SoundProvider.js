'use client';

import { createContext, useContext, useCallback, useRef, useState, useEffect } from 'react';

const SoundContext = createContext(null);

/**
 * SoundProvider — Synthesized audio feedback using Web Audio API.
 * No audio files needed. Generates sounds procedurally.
 *
 * Sounds:
 * - click: Soft, short tap for nav/button interactions
 * - whoosh: Quick sweep for page transitions
 * - hover: Barely-there tone on card hover
 * - toggle: Satisfying pop for theme toggle
 */
export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(true); // Start muted, opt-in experience
  const ctxRef = useRef(null);
  const gainRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-sound');
    if (saved === 'on') setMuted(false);
  }, []);

  const getCtx = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const gain = ctx.createGain();
      gain.gain.value = 0.15; // Master volume — subtle
      gain.connect(ctx.destination);
      ctxRef.current = ctx;
      gainRef.current = gain;
      return ctx;
    } catch {
      return null;
    }
  }, []);

  const play = useCallback((type) => {
    if (muted) return;
    const ctx = getCtx();
    if (!ctx) return;
    // Resume if suspended (autoplay policy)
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    switch (type) {
      case 'click': {
        // Short sine blip — like a soft mechanical click
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
        env.gain.setValueAtTime(0.12, now);
        env.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(env);
        env.connect(gainRef.current);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }
      case 'whoosh': {
        // Noise burst filtered with sweeping bandpass
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.3;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.15);
        filter.Q.value = 2;
        const env = ctx.createGain();
        env.gain.setValueAtTime(0.08, now);
        env.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        noise.connect(filter);
        filter.connect(env);
        env.connect(gainRef.current);
        noise.start(now);
        noise.stop(now + 0.2);
        break;
      }
      case 'hover': {
        // Very quiet, short sine pulse
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        env.gain.setValueAtTime(0.03, now);
        env.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(env);
        env.connect(gainRef.current);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }
      case 'toggle': {
        // Two-note pop
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.setValueAtTime(700, now + 0.06);
        env.gain.setValueAtTime(0.1, now);
        env.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(env);
        env.connect(gainRef.current);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }
    }
  }, [muted, getCtx]);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev;
      localStorage.setItem('portfolio-sound', next ? 'off' : 'on');
      // Play a confirmation sound when unmuting
      if (!next) {
        // Small delay so state updates first
        setTimeout(() => {
          const ctx = getCtx();
          if (!ctx) return;
          if (ctx.state === 'suspended') ctx.resume();
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const env = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(500, now);
          osc.frequency.setValueAtTime(700, now + 0.06);
          env.gain.setValueAtTime(0.1, now);
          env.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.connect(env);
          env.connect(gainRef.current);
          osc.start(now);
          osc.stop(now + 0.15);
        }, 50);
      }
      return next;
    });
  }, [getCtx]);

  return (
    <SoundContext.Provider value={{ play, muted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}

/**
 * Mute toggle button for the nav bar.
 * Shows a speaker icon with a line-through when muted.
 */
export function MuteToggle() {
  const { muted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
      className="p-2 rounded-full transition-all duration-200"
      style={{ color: 'var(--text-secondary)' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
    >
      {muted ? (
        // Speaker off
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // Speaker on
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
