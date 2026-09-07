import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth trailing animation frame
    let animFrame;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18
      }));
      animFrame = requestAnimationFrame(updateTrailing);
    };
    animFrame = requestAnimationFrame(updateTrailing);

    // Check hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, [position.x, position.y]);

  return (
    <>
      {/* Small main point */}
      <div
        className="fixed top-0 left-0 w-3 h-3 bg-amber-400 rounded-full pointer-events-none z-50 transition-transform duration-75 shadow-lg"
        style={{
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0) scale(${
            isClicking ? 0.7 : isHovered ? 1.5 : 1
          })`,
          boxShadow: '0 0 12px #FFB800, 0 0 20px #FF7E00'
        }}
      />

      {/* Trailing Liquid / Citrus Aura Ring */}
      <div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-amber-400/60 pointer-events-none z-50 transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          transform: `translate3d(${trailingPos.x - 20}px, ${trailingPos.y - 20}px, 0) scale(${
            isHovered ? 2.2 : isClicking ? 0.9 : 1
          })`,
          backgroundColor: isHovered ? 'rgba(255, 184, 0, 0.15)' : 'transparent',
          borderColor: isHovered ? '#00E676' : 'rgba(255, 184, 0, 0.4)',
          boxShadow: isHovered ? '0 0 25px rgba(0, 230, 118, 0.4)' : 'none'
        }}
      >
        {isHovered && (
          <span className="text-[10px] animate-spin-slow">🍋</span>
        )}
      </div>
    </>
  );
}
