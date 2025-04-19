"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorProps {
  position: { x: number; y: number };
  isHovering: boolean;
}

export default function Cursor({ position, isHovering }: CursorProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
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
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#FFD700] opacity-50 mix-blend-difference pointer-events-none z-40"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 100,
          mass: 0.8,
          delay: 0.05,
        }}
      />
    </>
  );
}
