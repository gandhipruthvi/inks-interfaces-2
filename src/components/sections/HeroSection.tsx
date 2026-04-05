"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking
  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const heroText = "Crafting Click-Worthy, Scroll-Stopping Stuff";
  
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

  // Interaction: Spotlight mask
  const background = useMotionTemplate`radial-gradient(650px circle at ${smoothX}px ${smoothY}px, rgba(255, 215, 0, 0.15), transparent 80%)`;
  
  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex flex-col items-start justify-center px-4 sm:px-8 lg:px-12 py-16 sm:py-24 pt-32 overflow-hidden bg-white"
    >
      {/* Dynamic Background Spotlight */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background }}
      />

      {/* Modern Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Brand Tag */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={inView ? { opacity: 1, x: 0 } : {}}
           className="flex items-center gap-2 mb-6"
        >
           <div className="w-8 h-1 bg-[#FFD700]" />
           <span className="text-sm font-black uppercase tracking-widest text-gray-400">Inks & Interfaces</span>
        </motion.div>

        {/* Animated headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
          {heroText.split(" ").map((word, wi) => (
            <span
              key={wi}
              className="inline-block whitespace-nowrap mr-3"
            >
              {word.split("").map((letter, li) => {
                const i = heroText.split(" ").slice(0, wi).join(" ").length + wi + li;
                return (
                  <motion.span
                    key={li}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-xl sm:text-2xl mb-12 text-gray-500 max-w-2xl font-medium"
        >
          Elevating digital experiences through bold design and intuitive human-centered interfaces.
        </motion.p>
        
        {/* CTA Button */}
        <motion.a
          href="/imaginations"
          className="group relative inline-flex items-center gap-4 bg-black text-white font-bold py-5 px-10 rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-[#FFD700] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 group-hover:text-black transition-colors duration-500">View Our Portfolio</span>
          <svg className="relative z-10 w-5 h-5 group-hover:text-black transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="ArrowRight: M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </div>
      
      {/* Modern bottom accent */}
      <div className="absolute bottom-12 left-12 hidden lg:block">
         <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
            Based in New York & Remote
         </div>
      </div>
    </section>
  );
}
