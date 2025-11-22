import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use MotionValues for high-performance updates without re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the main cursor
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.2 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.2 });

  // Slightly delayed springs for the outer ring
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.4 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.4 });

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default Cursor;
