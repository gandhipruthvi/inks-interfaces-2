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
    <main className="relative min-h-screen bg-white overflow-hidden">
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
      
      {/* Global CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Brand?
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Let's create something extraordinary together. Our team is ready to bring your vision to life.
          </motion.p>
          
          <motion.button
            className="px-10 py-5 bg-[#FFD700] text-black font-bold rounded-xl text-xl shadow-lg hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Start Your Project
          </motion.button>
        </div>
      </section>
    </main>
  );
}
