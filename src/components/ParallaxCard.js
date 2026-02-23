'use client';

import { useRef, useCallback, useState, useEffect } from 'react';

/**
 * ParallaxCard — Enhanced 3D tilt with multi-layer parallax depth.
 *
 * Children elements with `data-depth="1"`, `data-depth="2"`, etc.
 * will translate at increasing rates relative to cursor position,
 * creating a "window into 3D" effect. Elements without data-depth
 * stay at depth 0 (no extra translation).
 *
 * Also applies:
 * - Perspective-based 3D rotation (tilt)
 * - Dynamic shadow that shifts opposite to cursor
 * - Subtle scale on hover
 *
 * Skips parallax on touch devices for performance.
 */
export default function ParallaxCard({ children, className, style, intensity = 1, ...props }) {
  const ref = useRef(null);
  const isTouch = useRef(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isTouch.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalized -0.5 to 0.5
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    // 3D tilt
    const rotateY = nx * 10 * intensity;
    const rotateX = -ny * 10 * intensity;
    el.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.02, 1.02, 1.02)`;

    // Dynamic shadow — shifts opposite to cursor
    const shadowX = -nx * 20 * intensity;
    const shadowY = -ny * 20 * intensity;
    el.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.12)`;

    // Parallax inner layers
    const layers = el.querySelectorAll('[data-depth]');
    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth) || 0;
      const tx = nx * depth * 15 * intensity;
      const ty = ny * depth * 15 * intensity;
      layer.style.transform = `translate3d(${tx}px, ${ty}px, ${depth * 10}px)`;
    });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    el.style.boxShadow = '';

    // Reset inner layers
    const layers = el.querySelectorAll('[data-depth]');
    layers.forEach((layer) => {
      layer.style.transform = 'translate3d(0, 0, 0)';
    });
    setHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </div>
  );
}
