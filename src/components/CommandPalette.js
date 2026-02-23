'use client';

import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPaletteContext = createContext(null);

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

/**
 * CommandPalette — Spotlight-style Cmd+K command palette.
 * Search pages, toggle theme, trigger easter eggs.
 */
export default function CommandPalette({ darkMode, setDarkMode, children }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery('');
    setSelected(0);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
        setQuery('');
        setSelected(0);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // All available commands
  const commands = [
    // Navigation
    { id: 'home', label: 'Home', category: 'Navigate', icon: '~', action: () => { router.push('/'); setOpen(false); } },
    { id: 'gallery', label: 'Gallery', category: 'Navigate', icon: '>', action: () => { router.push('/gallery'); setOpen(false); } },
    { id: 'work', label: 'Work', category: 'Navigate', icon: '>', action: () => { router.push('/devwork'); setOpen(false); } },
    { id: 'music', label: 'Music', category: 'Navigate', icon: '>', action: () => { router.push('/music'); setOpen(false); } },
    { id: 'extra', label: 'Extracurriculars', category: 'Navigate', icon: '>', action: () => { router.push('/extracurriculars'); setOpen(false); } },
    { id: 'contact', label: 'Contact', category: 'Navigate', icon: '>', action: () => { router.push('/contactme'); setOpen(false); } },
    { id: 'uoacs', label: 'UOACS Story', category: 'Navigate', icon: '>', action: () => { router.push('/uoacs-story'); setOpen(false); } },

    // Theme
    { id: 'dark', label: 'Toggle Dark Mode', category: 'Theme', icon: darkMode ? '\u2600' : '\u263E', action: () => { setDarkMode(!darkMode); setOpen(false); } },

    // Easter eggs
    {
      id: 'party',
      label: 'Party Mode',
      category: 'Secret',
      icon: '\u2605',
      action: () => {
        setOpen(false);
        triggerPartyMode();
      },
    },
    {
      id: 'matrix',
      label: 'Matrix Rain',
      category: 'Secret',
      icon: '\u25BC',
      action: () => {
        setOpen(false);
        triggerMatrixRain();
      },
    },
    {
      id: 'konami',
      label: 'Invert Everything',
      category: 'Secret',
      icon: '\u25D1',
      action: () => {
        setOpen(false);
        document.body.style.filter = document.body.style.filter === 'invert(1)' ? '' : 'invert(1)';
        setTimeout(() => { document.body.style.filter = ''; }, 5000);
      },
    },
    {
      id: 'source',
      label: 'View Source Code',
      category: 'Meta',
      icon: '<>',
      action: () => {
        window.open('https://github.com/jotchwali/portfolio', '_blank');
        setOpen(false);
      },
    },
  ];

  // Filter based on query
  const filtered = query.trim()
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Reset selection when query changes
  useEffect(() => {
    setSelected(0);
  }, [query]);

  // Keyboard navigation inside the palette
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filtered[selected]) {
      e.preventDefault();
      filtered[selected].action();
    }
  }, [filtered, selected]);

  return (
    <CommandPaletteContext.Provider value={{ openPalette }}>
      {children}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100]"
              style={{ backgroundColor: 'var(--overlay-bg)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-[101] w-full max-w-lg"
            style={{ transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="rounded-xl overflow-hidden border shadow-2xl mx-4"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-light)',
              }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--text-primary)' }}
                />
                <kbd
                  className="text-xs px-1.5 py-0.5 rounded border"
                  style={{
                    color: 'var(--text-tertiary)',
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                  }}
                >
                  esc
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-sm text-center py-8" style={{ color: 'var(--text-tertiary)' }}>
                    No results found
                  </p>
                ) : (
                  <>
                    {/* Group by category */}
                    {['Navigate', 'Theme', 'Meta', 'Secret'].map(cat => {
                      const items = filtered.filter(c => c.category === cat);
                      if (items.length === 0) return null;
                      return (
                        <div key={cat}>
                          <p
                            className="text-xs font-medium tracking-widest uppercase px-4 py-1.5"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            {cat}
                          </p>
                          {items.map((cmd) => {
                            const globalIndex = filtered.indexOf(cmd);
                            return (
                              <button
                                key={cmd.id}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-100"
                                style={{
                                  backgroundColor: selected === globalIndex ? 'var(--card-hover)' : 'transparent',
                                  color: 'var(--text-primary)',
                                }}
                                onClick={cmd.action}
                                onMouseEnter={() => setSelected(globalIndex)}
                              >
                                <span
                                  className="w-6 h-6 flex items-center justify-center rounded text-xs font-mono"
                                  style={{
                                    backgroundColor: 'var(--tag-bg)',
                                    color: 'var(--tag-text)',
                                  }}
                                >
                                  {cmd.icon}
                                </span>
                                <span className="flex-1">{cmd.label}</span>
                                {selected === globalIndex && (
                                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                                    Enter
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Footer hint */}
              <div
                className="flex items-center justify-between px-4 py-2.5 border-t text-xs"
                style={{ borderColor: 'var(--border-light)', color: 'var(--text-tertiary)' }}
              >
                <span>Navigate with arrow keys</span>
                <span>
                  <kbd className="px-1 py-0.5 rounded border mr-1" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                    {'\u2318'}
                  </kbd>
                  <kbd className="px-1 py-0.5 rounded border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                    K
                  </kbd>
                  {' '}to toggle
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </CommandPaletteContext.Provider>
  );
}

// ─── Easter Egg Effects ───

function triggerPartyMode() {
  const colors = ['#818cf8', '#f0abfc', '#fb7185', '#34d399', '#fbbf24', '#6366f1', '#ec4899'];
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9997;pointer-events:none;transition:background 0.3s;';
  document.body.appendChild(overlay);

  let i = 0;
  const interval = setInterval(() => {
    overlay.style.backgroundColor = colors[i % colors.length] + '15';
    document.body.style.transform = `rotate(${Math.sin(i * 0.5) * 0.5}deg)`;
    i++;
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    overlay.remove();
    document.body.style.transform = '';
  }, 5000);
}

function triggerMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:9997;pointer-events:none;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const chars = 'JOSHUALI01'.split('');
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  let frames = 0;
  const maxFrames = 150;

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#818cf8';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    frames++;
    if (frames < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      canvas.style.transition = 'opacity 0.5s';
      canvas.style.opacity = '0';
      setTimeout(() => canvas.remove(), 500);
    }
  }
  draw();
}
