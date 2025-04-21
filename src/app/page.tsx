"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import IdeaToLifeSection from "@/components/sections/IdeaToLifeSection";
import CraftingIdentitiesSection from "@/components/sections/CraftingIdentitiesSection";
import WorkSection from "@/components/sections/WorkSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/ui/Navbar";

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
    <main className="relative min-h-screen bg-white overflow-visible">
      {/* Custom cursor */}
      <Cursor position={cursorPosition} isHovering={isHovering} />
      
      {/* Navbar */}
      <Navbar setIsHovering={setIsHovering} />
      
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
      

    </main>
  );
}
