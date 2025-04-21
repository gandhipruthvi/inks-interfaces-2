"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorProps {
  position: { x: number; y: number };
  isHovering: boolean;
}

export default function Cursor({ position, isHovering }: CursorProps) {
  const [isMounted, setIsMounted] = useState(false);
  // Track whether cursor is visible (only show when mouse moves)
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    // Set mounted state
    setIsMounted(true);
    
    // Reset activity timer whenever position changes
    if (position.x !== 0 && position.y !== 0) {
      setIsActive(true);
    }
    
    // Hide cursor after 2 seconds of inactivity
    const timer = setTimeout(() => {
      if (position.x === 0 && position.y === 0) {
        setIsActive(false);
      }
    }, 2000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [position]);
  
  // Handle mouse movement globally
  useEffect(() => {
    const handleMouseMove = () => {
      setIsActive(true);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-[#FFD700] mix-blend-difference pointer-events-none z-50"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isHovering ? 2 : 1,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 18,
          stiffness: 120,
          mass: 0.7,
          restDelta: 0.2,
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#FFD700] opacity-50 mix-blend-difference pointer-events-none z-40"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          opacity: isActive ? 0.5 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 80,
          mass: 1.1,
          restDelta: 0.3,
        }}
      />
    </>
  );
}
