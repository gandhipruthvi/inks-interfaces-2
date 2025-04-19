"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/sections/HeroSection";
import IdeaToLifeSection from "@/components/sections/IdeaToLifeSection";
import CraftingIdentitiesSection from "@/components/sections/CraftingIdentitiesSection";
import WorkSection from "@/components/sections/WorkSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import DoodleFooter from "@/components/sections/DoodleFooter";
import Cursor from "@/components/ui/Cursor";

export default function HomePage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* Custom cursor */}
      <Cursor position={cursorPosition} isHovering={isHovering} />
      
      {/* Hero Section */}
      <HeroSection setIsHovering={setIsHovering} />
      
      {/* Idea to Life Section */}
      <IdeaToLifeSection setIsHovering={setIsHovering} />
      
      {/* Crafting Identities Section */}
      <CraftingIdentitiesSection setIsHovering={setIsHovering} />
      
      {/* Work Section */}
      <WorkSection setIsHovering={setIsHovering} />
      
      {/* Testimonials Section */}
      <TestimonialsSection setIsHovering={setIsHovering} />
      
      {/* Pricing Section */}
      <PricingSection setIsHovering={setIsHovering} />
      
      {/* Doodle Footer */}
      <DoodleFooter setIsHovering={setIsHovering} />
    </main>
  );
}
