"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { MousePointer, Frame, Menu } from "lucide-react";

interface HeroSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

export default function HeroSection({ setIsHovering }: HeroSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const playerRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navElement = document.getElementById('floating-nav');
      if (navElement) {
        if (scrollY > 100) {
          navElement.classList.add('nav-scrolled');
        } else {
          navElement.classList.remove('nav-scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text animation variants
  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };
  
  const navItems = ["Home", "Services", "Portfolio", "About", "Contact"];
  const heroText = "Crafting Click-Worthy, Scroll-Stopping Stuff";
  
  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex flex-col items-start justify-center px-12 py-24 overflow-hidden"
    >
      {/* Geometric pattern background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className={`border border-black ${i % 3 === 0 ? 'bg-[#FFD700]' : ''} ${i % 7 === 0 ? 'rounded-full' : ''}`}></div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#FFD700] opacity-20 blur-xl" />
        <div className="absolute bottom-40 right-40 w-64 h-64 rounded-full bg-[#FFD700] opacity-10 blur-3xl" />
      </div>
      
      {/* Logo */}
      <motion.div 
        className="absolute top-8 left-12 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <span className="font-bold text-xl">DesignFirm</span>
        </div>
      </motion.div>
      
      {/* Floating Navigation */}
      <motion.nav
        id="floating-nav"
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-30 bg-white/80 backdrop-blur-md px-1 py-1 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {navItems.map((item, index) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-6 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {item}
          </motion.a>
        ))}
      </motion.nav>
      
      {/* Decorative cursor element */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-48 h-48 pointer-events-none z-0"
        animate={{ 
          rotate: [0, 10, -5, 0],
          x: [0, -20, 10, 0],
          y: [0, 15, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      >
        <motion.div className="relative w-full h-full">
          <Frame className="w-full h-full text-[#FFD700] opacity-70" />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear"
            }}
          >
            <MousePointer className="w-8 h-8 text-black opacity-40" />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Animated headline */}
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 overflow-hidden">
          {heroText.split("").map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-xl mb-12 text-gray-700"
        >
          Turning Bold Ideas into Beautiful Interfaces
        </motion.p>
        
        {/* CTA Button with ink fill animation */}
        <motion.button
          className="relative overflow-hidden bg-black text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.5 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Tap Into My Imagination</span>
          <motion.div
            className="absolute inset-0 bg-[#FFD700]"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.button>
      </div>
      
      {/* No feature images as per request */}
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
}
