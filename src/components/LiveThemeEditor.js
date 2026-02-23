'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LiveThemeEditor — An interactive code block where visitors can
 * tweak CSS variables and watch the site update in real-time.
 * Shows meta-programming confidence with a playful, creative feel.
 */

const EDITABLE_VARS = [
  { key: '--accent-gradient-start', label: 'Gradient Start', type: 'color' },
  { key: '--accent-gradient-end', label: 'Gradient End', type: 'color' },
  { key: '--card-bg', label: 'Card Background', type: 'color' },
  { key: '--text-primary', label: 'Text Primary', type: 'color' },
  { key: '--text-secondary', label: 'Text Secondary', type: 'color' },
  { key: '--bg-primary', label: 'Background', type: 'color' },
];

function getComputedVar(key) {
  if (typeof window === 'undefined') return '#000000';
  const raw = getComputedStyle(document.documentElement).getPropertyValue(key).trim();
  // Handle hex
  if (raw.startsWith('#')) return raw.length === 4
    ? `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`
    : raw;
  // Handle rgb/rgba
  const match = raw.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    const [, r, g, b] = match;
    return `#${[r, g, b].map(c => Number(c).toString(16).padStart(2, '0')).join('')}`;
  }
  return '#888888';
}

export default function LiveThemeEditor() {
  const [values, setValues] = useState({});
  const [isReset, setIsReset] = useState(false);
  const originalValues = useRef({});
  const hasInit = useRef(false);

  // Initialize values from computed styles
  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;
    const initial = {};
    EDITABLE_VARS.forEach(({ key }) => {
      initial[key] = getComputedVar(key);
    });
    setValues(initial);
    originalValues.current = { ...initial };
  }, []);

  const handleChange = useCallback((key, value) => {
    setValues(prev => ({ ...prev, [key]: value }));
    document.documentElement.style.setProperty(key, value);

    // Also update dependent gradient vars when accent colors change
    if (key === '--accent-gradient-start' || key === '--accent-gradient-end') {
      const start = key === '--accent-gradient-start' ? value : (values['--accent-gradient-start'] || getComputedVar('--accent-gradient-start'));
      const end = key === '--accent-gradient-end' ? value : (values['--accent-gradient-end'] || getComputedVar('--accent-gradient-end'));
      document.documentElement.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${start} 0%, ${end} 100%)`);
    }
    setIsReset(false);
  }, [values]);

  const handleReset = useCallback(() => {
    EDITABLE_VARS.forEach(({ key }) => {
      document.documentElement.style.removeProperty(key);
    });
    document.documentElement.style.removeProperty('--gradient-primary');
    const fresh = {};
    // Re-read after removing overrides
    requestAnimationFrame(() => {
      EDITABLE_VARS.forEach(({ key }) => {
        fresh[key] = getComputedVar(key);
      });
      setValues(fresh);
    });
    setIsReset(true);
    setTimeout(() => setIsReset(false), 1500);
  }, []);

  // Generate the "code" display
  const codeLines = EDITABLE_VARS.map(({ key, label }) => ({
    key,
    label,
    display: `  ${key}: ${values[key] || '#000000'};`,
  }));

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-light)',
      }}
    >
      {/* Editor header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#febc2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28c840' }} />
          </div>
          <span className="text-xs font-mono ml-2" style={{ color: 'var(--text-tertiary)' }}>
            theme.css
          </span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-medium px-3 py-1 rounded-full transition-all duration-200"
          style={{
            backgroundColor: 'var(--tag-bg)',
            color: 'var(--tag-text)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          {isReset ? 'Reset!' : 'Reset'}
        </button>
      </div>

      {/* Code block */}
      <div className="p-4 font-mono text-sm leading-7">
        <p style={{ color: 'var(--text-tertiary)' }}>
          <span style={{ color: 'var(--accent-gradient-start, #818cf8)' }}>:root</span>{' '}
          <span style={{ color: 'var(--text-tertiary)' }}>{'{'}</span>
        </p>

        {codeLines.map(({ key, label, display }, index) => (
          <div key={key} className="flex items-center gap-3 group">
            {/* Line number */}
            <span
              className="text-xs w-5 text-right select-none flex-shrink-0"
              style={{ color: 'var(--text-tertiary)', opacity: 0.5 }}
            >
              {index + 2}
            </span>

            {/* Variable name */}
            <span className="flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
              {key}:
            </span>

            {/* Color picker */}
            <label className="relative flex-shrink-0 cursor-pointer">
              <input
                type="color"
                value={values[key] || '#000000'}
                onChange={(e) => handleChange(key, e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                style={{ width: '100%', height: '100%' }}
              />
              <span
                className="inline-block w-5 h-5 rounded border"
                style={{
                  backgroundColor: values[key] || '#000000',
                  borderColor: 'var(--border-color)',
                  transition: 'transform 0.15s ease',
                }}
              />
            </label>

            {/* Value display */}
            <span style={{ color: 'var(--text-primary)' }}>
              {values[key] || '#000000'}
            </span>

            <span style={{ color: 'var(--text-tertiary)' }}>;</span>

            {/* Label tooltip */}
            <span
              className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: 'var(--text-tertiary)' }}
            >
              /* {label} */
            </span>
          </div>
        ))}

        <p style={{ color: 'var(--text-tertiary)' }}>{'}'}</p>
      </div>

      {/* Hint */}
      <div
        className="px-4 py-3 border-t text-center"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Click any color swatch to edit — changes apply to the whole site in real-time
        </p>
      </div>
    </div>
  );
}
