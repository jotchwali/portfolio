// src/app/music/page.js
'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Note / frequency helpers ───
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function noteToMidi(note, octave) {
  return NOTE_NAMES.indexOf(note) + (octave + 1) * 12;
}

// Render 2 octaves starting from a configurable octave
const NUM_OCTAVES = 2;
const MIN_OCTAVE = 1;
const MAX_OCTAVE = 6;

function buildKeys(startOctave) {
  const keys = [];
  for (let oct = startOctave; oct < startOctave + NUM_OCTAVES; oct++) {
    for (const note of NOTE_NAMES) {
      const midi = noteToMidi(note, oct);
      keys.push({
        note,
        octave: oct,
        midi,
        freq: midiToFreq(midi),
        isBlack: note.includes('#'),
        label: `${note}${oct}`,
      });
    }
  }
  return keys;
}

// Computer keyboard keys (fixed layout — labels are remapped dynamically)
const KB_LOWER = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j'];
const KB_UPPER = ['k', 'o', 'l', 'p', ';', "'"];
// Lower maps to first 12 notes (C-B of first octave), upper maps to first 6 of second octave
function buildKeyboardMap(startOctave) {
  const map = {};
  const oct1 = startOctave;
  const oct2 = startOctave + 1;
  const firstOctaveNotes = NOTE_NAMES.map(n => `${n}${oct1}`);
  const secondOctaveNotes = NOTE_NAMES.map(n => `${n}${oct2}`);
  KB_LOWER.forEach((k, i) => { if (firstOctaveNotes[i]) map[k] = firstOctaveNotes[i]; });
  KB_UPPER.forEach((k, i) => { if (secondOctaveNotes[i]) map[k] = secondOctaveNotes[i]; });
  return map;
}

// ─── Chord definitions (intervals from root in semitones) ───
const CHORD_TYPES = {
  'Major': [0, 4, 7],
  'Minor': [0, 3, 7],
  'Dim': [0, 3, 6],
  'Aug': [0, 4, 8],
  'Maj7': [0, 4, 7, 11],
  'Min7': [0, 3, 7, 10],
  'Dom7': [0, 4, 7, 10],
  'Sus2': [0, 2, 7],
  'Sus4': [0, 5, 7],
};

const ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// ─── Scale definitions (intervals from root in semitones) ───
const SCALE_TYPES = {
  'Major': [0, 2, 4, 5, 7, 9, 11],
  'Natural Minor': [0, 2, 3, 5, 7, 8, 10],
  'Harmonic Minor': [0, 2, 3, 5, 7, 8, 11],
  'Melodic Minor': [0, 2, 3, 5, 7, 9, 11],
  'Pentatonic Major': [0, 2, 4, 7, 9],
  'Pentatonic Minor': [0, 3, 5, 7, 10],
  'Blues': [0, 3, 5, 6, 7, 10],
  'Dorian': [0, 2, 3, 5, 7, 9, 10],
  'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
  'Lydian': [0, 2, 4, 6, 7, 9, 11],
  'Chromatic': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

// ─── Prebuilt progressions ───
const PROGRESSIONS = [
  { name: 'I-V-vi-IV (Pop)', chords: [['C', 'Major'], ['G', 'Major'], ['A', 'Minor'], ['F', 'Major']] },
  { name: 'ii-V-I (Jazz)', chords: [['D', 'Minor'], ['G', 'Dom7'], ['C', 'Maj7']] },
  { name: 'I-vi-IV-V (50s)', chords: [['C', 'Major'], ['A', 'Minor'], ['F', 'Major'], ['G', 'Major']] },
  { name: 'i-VI-III-VII (Epic)', chords: [['A', 'Minor'], ['F', 'Major'], ['C', 'Major'], ['G', 'Major']] },
];

// ─── Synth voices ───
const VOICES = {
  piano: 'Piano',
  rhodes: 'Rhodes MK8',
};

// ─── Synthesizer using Web Audio API ───
function usePianoSynth() {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const activeNotes = useRef(new Map());
  const voiceRef = useRef('piano');

  const getCtx = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = 0.25;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    gainRef.current = master;
    return ctx;
  }, []);

  const setVoice = useCallback((v) => { voiceRef.current = v; }, []);

  const noteOn = useCallback((midi) => {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    if (activeNotes.current.has(midi)) return;

    const freq = midiToFreq(midi);
    const now = ctx.currentTime;
    const voice = voiceRef.current;

    const noteGain = ctx.createGain();
    noteGain.connect(gainRef.current);
    let oscs = [];
    let extras = []; // extra nodes to stop later

    if (voice === 'rhodes') {
      // ── Rhodes MK8 synthesis ──
      // The Rhodes sound: bell-like attack from tine strike, warm sine sustain,
      // velocity-dependent overtones, slight detuning for chorus richness,
      // and a characteristic tremolo.

      // Fundamental (strong, warm)
      const osc1 = ctx.createOscillator();
      const g1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      g1.gain.value = 0.55;
      osc1.connect(g1); g1.connect(noteGain);
      osc1.start(now);
      oscs.push(osc1);

      // Slightly detuned fundamental for warmth/chorus
      const osc1b = ctx.createOscillator();
      const g1b = ctx.createGain();
      osc1b.type = 'sine';
      osc1b.frequency.setValueAtTime(freq * 1.002, now); // +3.5 cents
      g1b.gain.value = 0.15;
      osc1b.connect(g1b); g1b.connect(noteGain);
      osc1b.start(now);
      oscs.push(osc1b);

      // 2nd harmonic — the "bell" character of Rhodes
      const osc2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);
      // Bell harmonic decays faster than fundamental
      g2.gain.setValueAtTime(0.35, now);
      g2.gain.exponentialRampToValueAtTime(0.08, now + 0.6);
      osc2.connect(g2); g2.connect(noteGain);
      osc2.start(now);
      oscs.push(osc2);

      // 3rd harmonic — subtle warmth
      const osc3 = ctx.createOscillator();
      const g3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 3, now);
      g3.gain.setValueAtTime(0.12, now);
      g3.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc3.connect(g3); g3.connect(noteGain);
      osc3.start(now);
      oscs.push(osc3);

      // 4th harmonic — very subtle, adds brightness on attack
      const osc4 = ctx.createOscillator();
      const g4 = ctx.createGain();
      osc4.type = 'sine';
      osc4.frequency.setValueAtTime(freq * 4, now);
      g4.gain.setValueAtTime(0.06, now);
      g4.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc4.connect(g4); g4.connect(noteGain);
      osc4.start(now);
      oscs.push(osc4);

      // Tine strike transient — short noise burst for the mechanical "tick"
      const bufSize = ctx.sampleRate * 0.04; // 40ms
      const noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuf;
      // Bandpass to focus the click around the fundamental
      const noiseBP = ctx.createBiquadFilter();
      noiseBP.type = 'bandpass';
      noiseBP.frequency.value = Math.min(freq * 3, 8000);
      noiseBP.Q.value = 2;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      noiseSrc.connect(noiseBP); noiseBP.connect(noiseGain); noiseGain.connect(noteGain);
      noiseSrc.start(now);
      noiseSrc.stop(now + 0.05);

      // Tremolo — subtle amplitude modulation (classic Rhodes suitcase)
      const tremoloOsc = ctx.createOscillator();
      const tremoloGain = ctx.createGain();
      tremoloOsc.type = 'sine';
      tremoloOsc.frequency.setValueAtTime(4.8, now); // ~4.8 Hz tremolo rate
      tremoloGain.gain.value = 0.06; // subtle depth
      tremoloOsc.connect(tremoloGain);
      tremoloGain.connect(noteGain.gain); // modulate the note gain
      tremoloOsc.start(now);
      extras.push(tremoloOsc);

      // ADSR: fast attack, gentle decay to warm sustain
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.45, now + 0.008); // very fast attack
      noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.5); // decay to sustain

    } else {
      // ── Default Piano voice ──
      const voices = [
        { f: freq, g: 0.6 },
        { f: freq * 2, g: 0.2 },
        { f: freq * 3, g: 0.05 },
      ];

      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.4, now + 0.01); // attack
      noteGain.gain.exponentialRampToValueAtTime(0.15, now + 0.3); // decay to sustain

      oscs = voices.map(v => {
        const osc = ctx.createOscillator();
        const vGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(v.f, now);
        vGain.gain.value = v.g;
        osc.connect(vGain);
        vGain.connect(noteGain);
        osc.start(now);
        return osc;
      });
    }

    activeNotes.current.set(midi, { oscs, extras, noteGain });
  }, [getCtx]);

  const noteOff = useCallback((midi) => {
    const entry = activeNotes.current.get(midi);
    if (!entry) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const voice = voiceRef.current;

    entry.noteGain.gain.cancelScheduledValues(now);
    entry.noteGain.gain.setValueAtTime(entry.noteGain.gain.value, now);

    // Rhodes has a longer, smoother release
    const releaseTime = voice === 'rhodes' ? 0.8 : 0.5;
    entry.noteGain.gain.exponentialRampToValueAtTime(0.001, now + releaseTime);

    const stopTime = now + releaseTime + 0.1;
    entry.oscs.forEach(osc => osc.stop(stopTime));
    if (entry.extras) entry.extras.forEach(n => n.stop(stopTime));
    activeNotes.current.delete(midi);
  }, []);

  // Play a chord (array of MIDI notes) for a set duration
  const playChord = useCallback((midiNotes, duration = 0.8) => {
    midiNotes.forEach(m => noteOn(m));
    setTimeout(() => {
      midiNotes.forEach(m => noteOff(m));
    }, duration * 1000);
  }, [noteOn, noteOff]);

  return { noteOn, noteOff, playChord, setVoice };
}

// ─── Main Music Page ───
export default function MusicPage() {
  const { noteOn, noteOff, playChord, setVoice } = usePianoSynth();
  const [voice, setVoiceState] = useState('piano');

  // Sync voice to synth
  const handleVoiceChange = useCallback((v) => {
    setVoiceState(v);
    setVoice(v);
  }, [setVoice]);

  // Octave shift
  const [octave, setOctave] = useState(3);

  // Derived key sets from octave
  const allKeys = useMemo(() => buildKeys(octave), [octave]);
  const whiteKeys = useMemo(() => allKeys.filter(k => !k.isBlack), [allKeys]);
  const blackKeys = useMemo(() => allKeys.filter(k => k.isBlack), [allKeys]);
  const keyboardMap = useMemo(() => buildKeyboardMap(octave), [octave]);

  // Clear highlights when octave changes
  useEffect(() => {
    setManualKeys(new Set());
    setChordHighlightKeys(new Set());
  }, [octave]);

  // Separate key highlight sets: manual (keyboard/mouse) vs chord (progression/explorer)
  const [manualKeys, setManualKeys] = useState(new Set());
  const [chordHighlightKeys, setChordHighlightKeys] = useState(new Set());

  // Merged set for rendering
  const activeKeys = useMemo(() => {
    const merged = new Set(manualKeys);
    chordHighlightKeys.forEach(k => merged.add(k));
    return merged;
  }, [manualKeys, chordHighlightKeys]);

  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedChord, setSelectedChord] = useState('Major');
  const [progression, setProgression] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [currentChordIndex, setCurrentChordIndex] = useState(-1);

  // Scale state
  const [scaleRoot, setScaleRoot] = useState('C');
  const [scaleType, setScaleType] = useState('Major');
  const [showScale, setShowScale] = useState(false);

  // Compute which note names are in the current scale
  const scaleNoteNames = useMemo(() => {
    if (!showScale) return new Set();
    const rootIdx = NOTE_NAMES.indexOf(scaleRoot);
    const intervals = SCALE_TYPES[scaleType] || [];
    return new Set(intervals.map(i => NOTE_NAMES[(rootIdx + i) % 12]));
  }, [scaleRoot, scaleType, showScale]);

  // Refs for progression loop
  const loopRef = useRef(null); // interval ID
  const loopEnabledRef = useRef(loopEnabled);
  const progressionRef = useRef(progression);
  const bpmRef = useRef(bpm);
  const isPlayingRef = useRef(false);
  const chordIndexRef = useRef(0);
  const chordTimeoutRef = useRef(null);

  // Keep refs in sync
  useEffect(() => { loopEnabledRef.current = loopEnabled; }, [loopEnabled]);
  useEffect(() => { progressionRef.current = progression; }, [progression]);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);

  // Get MIDI notes for current chord selection
  const getChordMidi = useCallback((root, type, oct = octave) => {
    const rootMidi = noteToMidi(root, oct);
    const intervals = CHORD_TYPES[type] || [0, 4, 7];
    return intervals.map(i => rootMidi + i);
  }, [octave]);

  // Play a chord and highlight keys (for chord explorer — separate from progression)
  const handlePlayChord = useCallback((root, type) => {
    const midiNotes = getChordMidi(root, type);
    const labels = midiNotes.map(m => {
      const note = NOTE_NAMES[m % 12];
      const oct = Math.floor(m / 12) - 1;
      return `${note}${oct}`;
    });

    setChordHighlightKeys(new Set(labels));
    playChord(midiNotes, 0.9);
    setTimeout(() => setChordHighlightKeys(new Set()), 900);
  }, [getChordMidi, playChord]);

  // Stop progression playback
  const stopProgression = useCallback(() => {
    if (loopRef.current) {
      clearTimeout(loopRef.current);
      loopRef.current = null;
    }
    if (chordTimeoutRef.current) {
      clearTimeout(chordTimeoutRef.current);
      chordTimeoutRef.current = null;
    }
    isPlayingRef.current = false;
    setIsPlaying(false);
    setCurrentChordIndex(-1);
    setChordHighlightKeys(new Set());
  }, []);

  // Play a single chord in the progression and schedule the next
  const playNextChord = useCallback(() => {
    const prog = progressionRef.current;
    const idx = chordIndexRef.current;

    if (idx >= prog.length) {
      // End of progression
      if (loopEnabledRef.current) {
        // Loop: reset index and continue
        chordIndexRef.current = 0;
        playNextChord();
        return;
      } else {
        // Stop
        stopProgression();
        return;
      }
    }

    const [root, type] = prog[idx];
    const midiNotes = getChordMidi(root, type);
    const labels = midiNotes.map(m => {
      const note = NOTE_NAMES[m % 12];
      const oct = Math.floor(m / 12) - 1;
      return `${note}${oct}`;
    });

    // Highlight + play
    setCurrentChordIndex(idx);
    setChordHighlightKeys(new Set(labels));
    const intervalMs = (60 / bpmRef.current) * 1000;
    playChord(midiNotes, Math.min(intervalMs / 1000 * 0.9, 2));

    // Clear chord highlight before next chord
    chordTimeoutRef.current = setTimeout(() => {
      setChordHighlightKeys(new Set());
    }, intervalMs * 0.85);

    // Schedule next chord
    chordIndexRef.current = idx + 1;
    loopRef.current = setTimeout(() => {
      if (isPlayingRef.current) {
        playNextChord();
      }
    }, intervalMs);
  }, [getChordMidi, playChord, stopProgression]);

  // Start/stop progression playback
  const handlePlayProgression = useCallback(() => {
    if (isPlaying) {
      stopProgression();
      return;
    }
    if (progression.length === 0) return;

    isPlayingRef.current = true;
    setIsPlaying(true);
    chordIndexRef.current = 0;
    playNextChord();
  }, [isPlaying, progression, stopProgression, playNextChord]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (loopRef.current) clearTimeout(loopRef.current);
      if (chordTimeoutRef.current) clearTimeout(chordTimeoutRef.current);
    };
  }, []);

  // Computer keyboard → piano key mapping
  useEffect(() => {
    const pressed = new Set();

    const onKeyDown = (e) => {
      if (e.repeat) return;
      const label = keyboardMap[e.key.toLowerCase()];
      if (!label) return;
      e.preventDefault();
      if (pressed.has(label)) return;
      pressed.add(label);

      const key = allKeys.find(k => k.label === label);
      if (key) {
        noteOn(key.midi);
        setManualKeys(prev => new Set([...prev, label]));
      }
    };

    const onKeyUp = (e) => {
      const label = keyboardMap[e.key.toLowerCase()];
      if (!label) return;
      pressed.delete(label);

      const key = allKeys.find(k => k.label === label);
      if (key) {
        noteOff(key.midi);
        setManualKeys(prev => {
          const next = new Set(prev);
          next.delete(label);
          return next;
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [noteOn, noteOff, keyboardMap, allKeys]);

  // Piano key press handler (mouse/touch)
  const handleKeyPress = useCallback((key) => {
    noteOn(key.midi);
    setManualKeys(prev => new Set([...prev, key.label]));
  }, [noteOn]);

  const handleKeyRelease = useCallback((key) => {
    noteOff(key.midi);
    setManualKeys(prev => {
      const next = new Set(prev);
      next.delete(key.label);
      return next;
    });
  }, [noteOff]);

  // Find the keyboard shortcut label for a key
  const getKeyboardHint = useCallback((label) => {
    const entry = Object.entries(keyboardMap).find(([, v]) => v === label);
    return entry ? entry[0].toUpperCase() : null;
  }, [keyboardMap]);

  // Check if a key is "in scale"
  const isInScale = useCallback((keyObj) => {
    if (!showScale) return true;
    return scaleNoteNames.has(keyObj.note);
  }, [showScale, scaleNoteNames]);

  // Determine visual state for a key
  const getKeyVisualState = useCallback((keyObj) => {
    const isManual = manualKeys.has(keyObj.label);
    const isChordHL = chordHighlightKeys.has(keyObj.label);
    const inScale = isInScale(keyObj);
    return { isManual, isChordHL, isActive: isManual || isChordHL, inScale };
  }, [manualKeys, chordHighlightKeys, isInScale]);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 px-6 text-center">
        <motion.p
          className="text-xs font-medium tracking-widest mb-4"
          style={{ color: 'var(--text-tertiary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        i made this cos i needed it
        </motion.p>
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-4"
          style={{ letterSpacing: '-0.04em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="gradient-text">Piano & Chords</span>
        </motion.h1>
        <motion.p
          className="text-sm max-w-md mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I&apos;m always looking for a quick note player app and never happy with what&apos;s out there, so I built my own. Explore chords, build progressions, or just mess around.
        </motion.p>
      </section>

      {/* Scale / Key Selector */}
      <section className="px-4 md:px-6 pb-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <p className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
                Scale Guide
              </p>
              <button
                onClick={() => setShowScale(!showScale)}
                className="relative w-10 h-5 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: showScale ? 'var(--accent-gradient-start)' : 'var(--border-color)',
                }}
              >
                <span
                  className="absolute top-0.5 left-0 w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-sm"
                  style={{
                    transform: showScale ? 'translateX(22px)' : 'translateX(2px)',
                  }}
                />
              </button>
            </div>

            {showScale && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-start gap-6 mb-4">
                  {/* Scale root */}
                  <div>
                    <p className="text-xs mb-1.5" style={{ color: 'var(--text-secondary)' }}>Key</p>
                    <div className="flex flex-wrap gap-1">
                      {ROOT_NOTES.map(note => (
                        <button
                          key={note}
                          onClick={() => setScaleRoot(note)}
                          className="px-2 py-1 text-[10px] rounded-md transition-all duration-150 font-mono"
                          style={{
                            backgroundColor: scaleRoot === note ? 'var(--accent-gradient-start)' : 'var(--tag-bg)',
                            color: scaleRoot === note ? '#fff' : 'var(--tag-text)',
                          }}
                        >
                          {note}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scale type */}
                  <div>
                    <p className="text-xs mb-1.5" style={{ color: 'var(--text-secondary)' }}>Scale</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(SCALE_TYPES).map(type => (
                        <button
                          key={type}
                          onClick={() => setScaleType(type)}
                          className="px-2 py-1 text-[10px] rounded-md transition-all duration-150"
                          style={{
                            backgroundColor: scaleType === type ? 'var(--accent-gradient-end)' : 'var(--tag-bg)',
                            color: scaleType === type ? '#fff' : 'var(--tag-text)',
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[10px] mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  Notes in {scaleRoot} {scaleType}:{' '}
                  <span className="font-mono">
                    {(SCALE_TYPES[scaleType] || []).map(i => NOTE_NAMES[(NOTE_NAMES.indexOf(scaleRoot) + i) % 12]).join(' – ')}
                  </span>
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Piano Keyboard */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-3xl mx-auto">
          {/* Voice selector + Octave shift control */}
          <div className="flex items-center justify-between mb-3">
            {/* Voice selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider mr-1" style={{ color: 'var(--text-tertiary)' }}>Voice</span>
              {Object.entries(VOICES).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleVoiceChange(key)}
                  className="px-2.5 py-1 text-[10px] rounded-md transition-all duration-150 font-medium"
                  style={{
                    backgroundColor: voice === key ? 'var(--accent-gradient-start)' : 'var(--tag-bg)',
                    color: voice === key ? '#fff' : 'var(--tag-text)',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Octave shift */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOctave(o => Math.max(MIN_OCTAVE, o - 1))}
                disabled={octave <= MIN_OCTAVE}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-mono border transition-all duration-150 disabled:opacity-30"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-tertiary)',
                }}
              >
                −
              </button>
              <span className="text-xs font-mono min-w-[80px] text-center" style={{ color: 'var(--text-secondary)' }}>
                C{octave} – B{octave + NUM_OCTAVES - 1}
              </span>
              <button
                onClick={() => setOctave(o => Math.min(MAX_OCTAVE, o + 1))}
                disabled={octave >= MAX_OCTAVE}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-mono border transition-all duration-150 disabled:opacity-30"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-tertiary)',
                }}
              >
                +
              </button>
            </div>
          </div>

          <motion.div
            className="relative select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* White keys */}
            <div className="flex">
              {whiteKeys.map((key) => {
                const vs = getKeyVisualState(key);
                const hint = getKeyboardHint(key.label);
                const dimmed = showScale && !vs.inScale && !vs.isActive;
                return (
                  <button
                    key={key.label}
                    className="relative flex-1 border rounded-b-lg transition-all duration-75 flex flex-col items-center justify-end pb-2"
                    style={{
                      height: '160px',
                      backgroundColor: vs.isManual
                        ? 'var(--accent-gradient-end)'
                        : vs.isChordHL
                          ? 'var(--accent-gradient-start)'
                          : 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: vs.isActive ? '#fff' : 'var(--text-tertiary)',
                      boxShadow: vs.isActive ? '0 0 12px var(--accent-gradient-start)' : 'inset 0 -2px 4px rgba(0,0,0,0.06)',
                      transform: vs.isActive ? 'scaleY(0.98)' : 'scaleY(1)',
                      opacity: dimmed ? 0.4 : 1,
                    }}
                    onMouseDown={() => handleKeyPress(key)}
                    onMouseUp={() => handleKeyRelease(key)}
                    onMouseLeave={() => { if (manualKeys.has(key.label)) handleKeyRelease(key); }}
                    onTouchStart={(e) => { e.preventDefault(); handleKeyPress(key); }}
                    onTouchEnd={() => handleKeyRelease(key)}
                  >
                    {/* Scale indicator dot */}
                    {showScale && vs.inScale && !vs.isActive && (
                      <span
                        className="absolute top-2 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--accent-gradient-start)', opacity: 0.7 }}
                      />
                    )}
                    <span className="text-[9px] font-mono opacity-60">{key.note}{key.octave}</span>
                    {hint && (
                      <span className="text-[8px] font-mono mt-0.5 opacity-40 hidden md:block">{hint}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Black keys (positioned absolutely) */}
            <div className="absolute top-0 left-0 right-0 flex pointer-events-none" style={{ height: '100px' }}>
              {whiteKeys.map((whiteKey, i) => {
                // Determine if there's a black key after this white key
                const nextSemitone = whiteKey.midi + 1;
                const blackKey = blackKeys.find(k => k.midi === nextSemitone);
                if (!blackKey) return <div key={`spacer-${i}`} className="flex-1" />;

                const vs = getKeyVisualState(blackKey);
                const hint = getKeyboardHint(blackKey.label);
                const whiteKeyWidth = 100 / whiteKeys.length;
                const dimmed = showScale && !vs.inScale && !vs.isActive;

                return (
                  <div key={blackKey.label} className="flex-1 relative">
                    <button
                      className="absolute pointer-events-auto rounded-b-md transition-all duration-75 flex flex-col items-center justify-end pb-1.5"
                      style={{
                        right: `-${whiteKeyWidth * 0.3}%`,
                        width: `${whiteKeyWidth * 0.65}%`,
                        minWidth: '24px',
                        maxWidth: '36px',
                        height: '100px',
                        backgroundColor: vs.isManual
                          ? 'var(--accent-gradient-end)'
                          : vs.isChordHL
                            ? 'var(--accent-gradient-start)'
                            : 'var(--text-primary)',
                        color: vs.isActive ? '#fff' : 'var(--text-tertiary)',
                        zIndex: 10,
                        boxShadow: vs.isActive
                          ? '0 0 12px var(--accent-gradient-end)'
                          : '0 2px 6px rgba(0,0,0,0.3)',
                        transform: vs.isActive ? 'scaleY(0.97)' : 'scaleY(1)',
                        opacity: dimmed ? 0.35 : 1,
                      }}
                      onMouseDown={() => handleKeyPress(blackKey)}
                      onMouseUp={() => handleKeyRelease(blackKey)}
                      onMouseLeave={() => { if (manualKeys.has(blackKey.label)) handleKeyRelease(blackKey); }}
                      onTouchStart={(e) => { e.preventDefault(); handleKeyPress(blackKey); }}
                      onTouchEnd={() => handleKeyRelease(blackKey)}
                    >
                      {/* Scale indicator dot */}
                      {showScale && vs.inScale && !vs.isActive && (
                        <span
                          className="absolute top-1.5 w-1 h-1 rounded-full"
                          style={{ backgroundColor: 'var(--accent-gradient-end)', opacity: 0.8 }}
                        />
                      )}
                      {hint && (
                        <span className="text-[7px] font-mono opacity-50 hidden md:block">{hint}</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <p className="text-xs text-center mt-3 hidden md:block" style={{ color: 'var(--text-tertiary)' }}>
            Use keys A-J for C{octave}-B{octave}, K-&apos; for C{octave + 1}-E{octave + 1}. Top row for sharps.
          </p>
        </div>
      </section>

      {/* Chord Explorer */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase mb-6" style={{ color: 'var(--text-tertiary)' }}>
              Chord Explorer
            </p>

            {/* Root note selector */}
            <div className="mb-4">
              <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>Root Note</p>
              <div className="flex flex-wrap gap-1.5">
                {ROOT_NOTES.map(note => (
                  <button
                    key={note}
                    onClick={() => setSelectedRoot(note)}
                    className="px-3 py-1.5 text-xs rounded-full transition-all duration-150 font-mono"
                    style={{
                      backgroundColor: selectedRoot === note ? 'var(--accent-gradient-start)' : 'var(--tag-bg)',
                      color: selectedRoot === note ? '#fff' : 'var(--tag-text)',
                    }}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>

            {/* Chord type selector */}
            <div className="mb-6">
              <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>Chord Type</p>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(CHORD_TYPES).map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedChord(type)}
                    className="px-3 py-1.5 text-xs rounded-full transition-all duration-150"
                    style={{
                      backgroundColor: selectedChord === type ? 'var(--accent-gradient-end)' : 'var(--tag-bg)',
                      color: selectedChord === type ? '#fff' : 'var(--tag-text)',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Play chord button */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => handlePlayChord(selectedRoot, selectedChord)}
                className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-200"
                style={{ background: 'var(--gradient-primary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Play {selectedRoot} {selectedChord}
              </button>
              <button
                onClick={() => setProgression(prev => [...prev, [selectedRoot, selectedChord]])}
                className="px-4 py-2.5 rounded-full text-sm border transition-all duration-200"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              >
                + Add to Progression
              </button>
            </div>

            {/* Current chord notes display */}
            <div
              className="rounded-xl p-4 border mb-8"
              style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-light)' }}
            >
              <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>
                {selectedRoot} {selectedChord} — Notes:
              </p>
              <div className="flex gap-2">
                {getChordMidi(selectedRoot, selectedChord).map(midi => {
                  const note = NOTE_NAMES[midi % 12];
                  const oct = Math.floor(midi / 12) - 1;
                  return (
                    <span
                      key={midi}
                      className="px-3 py-1.5 text-sm font-mono rounded-lg"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      {note}{oct}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progression Builder */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--text-tertiary)' }}>
              Progression Builder
            </p>

            {/* Quick progressions */}
            <div className="flex flex-wrap gap-2 mb-6">
              {PROGRESSIONS.map(prog => (
                <button
                  key={prog.name}
                  onClick={() => { if (isPlaying) stopProgression(); setProgression(prog.chords); }}
                  className="px-3 py-1.5 text-xs rounded-full border transition-all duration-150"
                  style={{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  {prog.name}
                </button>
              ))}
            </div>

            {/* Tempo + loop controls */}
            <div
              className="rounded-xl p-4 border mb-6 flex flex-col sm:flex-row sm:items-center gap-4"
              style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-light)' }}
            >
              {/* BPM Slider */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Tempo</p>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>
                    {bpm} BPM
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="200"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--accent-gradient-start) 0%, var(--accent-gradient-end) ${((bpm - 40) / 160) * 100}%, var(--border-color) ${((bpm - 40) / 160) * 100}%)`,
                  }}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>40</span>
                  <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>200</span>
                </div>
              </div>

              {/* Loop toggle */}
              <div className="flex items-center gap-2.5">
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Loop</p>
                <button
                  onClick={() => setLoopEnabled(!loopEnabled)}
                  className="relative w-10 h-5 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: loopEnabled ? 'var(--accent-gradient-start)' : 'var(--border-color)',
                  }}
                >
                  <span
                    className="absolute top-0.5 left-0 w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-sm"
                    style={{
                      transform: loopEnabled ? 'translateX(22px)' : 'translateX(2px)',
                    }}
                  />
                </button>
                {/* Loop icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={loopEnabled ? 'var(--accent-gradient-start)' : 'var(--text-tertiary)'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: loopEnabled ? 1 : 0.5, transition: 'all 0.2s' }}
                >
                  <polyline points="17 1 21 5 17 9" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              </div>
            </div>

            {/* Current progression */}
            {progression.length > 0 ? (
              <div
                className="rounded-xl p-4 border mb-4"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-light)' }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {progression.map(([root, type], i) => {
                    const isCurrent = isPlaying && currentChordIndex === i;
                    return (
                      <motion.div
                        key={i}
                        className="flex items-center gap-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span
                          className="px-3 py-2 text-sm font-mono rounded-lg cursor-pointer transition-all duration-150"
                          style={{
                            backgroundColor: isCurrent ? 'var(--accent-gradient-start)' : 'var(--tag-bg)',
                            color: isCurrent ? '#fff' : 'var(--tag-text)',
                            boxShadow: isCurrent ? '0 0 12px var(--accent-gradient-start)' : 'none',
                            transform: isCurrent ? 'scale(1.08)' : 'scale(1)',
                          }}
                          onClick={() => { if (!isPlaying) handlePlayChord(root, type); }}
                        >
                          {root}{type === 'Minor' ? 'm' : type === 'Dom7' ? '7' : type === 'Maj7' ? 'maj7' : type === 'Min7' ? 'm7' : type === 'Dim' ? 'dim' : type === 'Aug' ? 'aug' : type === 'Sus2' ? 'sus2' : type === 'Sus4' ? 'sus4' : ''}
                        </span>
                        {i < progression.length - 1 && (
                          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>→</span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handlePlayProgression}
                    className="px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-200"
                    style={{
                      background: isPlaying
                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                        : 'var(--gradient-primary)',
                    }}
                  >
                    {isPlaying ? 'Stop' : 'Play Progression'}
                  </button>
                  <button
                    onClick={() => { stopProgression(); setProgression([]); }}
                    className="px-4 py-2 rounded-full text-sm border transition-all duration-200"
                    style={{
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Clear
                  </button>
                </div>

                {isPlaying && (
                  <p className="text-[10px] mt-3" style={{ color: 'var(--text-tertiary)' }}>
                    Play the piano on top of the progression — your notes won&apos;t interfere with chord playback.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm py-8 text-center" style={{ color: 'var(--text-tertiary)' }}>
                Select a chord above and click &quot;Add to Progression&quot; to start building
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Hint footer */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            All synthesized in real-time with the Web Audio API — no samples, just math.
          </p>
        </div>
      </section>
    </>
  );
}
