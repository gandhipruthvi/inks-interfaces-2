"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rendering, instead of React state
  const springConfig = { damping: 18, stiffness: 120, mass: 0.7 };
  const trailSpringConfig = { damping: 30, stiffness: 80, mass: 1.1 };
  
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    setIsMounted(true);

    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
      
      setIsActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsActive(false), 2000);

      // Infer hovering based on cursor style or elements
      const target = e.target as HTMLElement;
      const computedCursor = window.getComputedStyle(target).cursor;
      
      if (
        computedCursor === "pointer" ||
        target.closest("a") ||
        target.closest("button") || 
        target.closest("[data-hoverable]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-[#FFD700] mix-blend-difference pointer-events-none z-50 will-change-transform"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
      
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#FFD700] opacity-50 mix-blend-difference pointer-events-none z-40 will-change-transform"
        style={{
          x: trailX,
          y: trailY,
          translateX: "6px",
          translateY: "6px"
        }}
        animate={{ opacity: isActive ? 0.5 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
