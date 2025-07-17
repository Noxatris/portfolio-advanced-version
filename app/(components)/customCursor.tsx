'use client';

import { useEffect, useRef, useState } from 'react';

export default function NeonCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ce bloc ne s'exécute que côté client
    setIsClient(true);

    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(hasTouch);

    pos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    mouse.current = { ...pos.current };
  }, []);

  useEffect(() => {
    if (!isClient || isMobile) return;

    // Cache le curseur natif
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      // Interpolation douce pour un effet fluide
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = 'auto'; // Rétablir le curseur si on démonte
    };
  }, [isClient, isMobile]);

  if (!isClient || isMobile) return null; // Rien côté serveur ou sur mobile

  return (
    <>
      <style>{`
        .neon-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, 
            rgba(255, 255, 255, 1) 0%,        
            rgba(155, 89, 182, 0.8) 40%,     
            rgba(142, 68, 173, 0.5) 70%,     
            rgba(142, 68, 173, 0) 100%       
          );
          box-shadow:
            0 0 6px rgba(155, 89, 182, 0.9),
            0 0 12px rgba(155, 89, 182, 0.7),
            0 0 20px rgba(142, 68, 173, 0.6),
            0 0 30px rgba(142, 68, 173, 0.4);
          z-index: 9999;
          will-change: transform;
          transition: opacity 0.3s;
        }
      `}</style>

      <div className="neon-cursor" ref={cursorRef} />
    </>
  );
}
