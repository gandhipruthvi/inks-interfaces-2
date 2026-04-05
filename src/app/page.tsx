"use client";

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
  return (
    <main className="relative min-h-screen bg-white overflow-visible">
      {/* Custom cursor - now tracks mouse internally */}
      <Cursor />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Sections */}
      <HeroSection />
      <IdeaToLifeSection />
      <CraftingIdentitiesSection />
      <WorkSection />
      <TestimonialsSection />
      <PricingSection />
    </main>
  );
}
