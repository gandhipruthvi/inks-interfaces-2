"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface PortfolioSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

export default function PortfolioSection({ setIsHovering }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<"branding" | "ui">("branding");
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  // Typewriter effect for testimonials
  const testimonials = [
    {
      text: "Working with Inks & Interfaces transformed our brand. The designs perfectly captured our vision while adding unexpected creative flair.",
      author: "Sarah Johnson, CEO of Elevate",
    },
    {
      text: "The UI designs were not only beautiful but incredibly functional. Our user engagement increased by 40% after launch.",
      author: "Michael Chen, Product Lead at TechFlow",
    },
    {
      text: "From concept to execution, the process was seamless. The animated elements added a level of sophistication we didn't know was possible.",
      author: "Alex Rivera, Marketing Director",
    },
  ];
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Typewriter effect
  useEffect(() => {
    if (!inView) return;
    
    const text = testimonials[currentTestimonial].text;
    let index = 0;
    setIsTyping(true);
    setDisplayText("");
    
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Move to next testimonial after delay
        const timeout = setTimeout(() => {
          setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        
        return () => clearTimeout(timeout);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [currentTestimonial, inView]);
  
  // Portfolio items
  const brandingProjects = [
    {
      title: "Bloom Café",
      description: "Brand identity for an artisanal coffee shop",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      color: "#FFD700",
    },
    {
      title: "Vertex Tech",
      description: "Modern branding for a tech startup",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      color: "#1A1A1A",
    },
    {
      title: "Nomad Apparel",
      description: "Fashion brand with a global perspective",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      color: "#2A9187",
    },
  ];
  
  const uiProjects = [
    {
      title: "Wellness App",
      description: "Mobile app for mental health tracking",
      image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      color: "#E86343",
    },
    {
      title: "Finance Dashboard",
      description: "Data visualization for personal finance",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      color: "#2F3F4A",
    },
    {
      title: "Travel Explorer",
      description: "Interactive travel planning platform",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1721&q=80",
      color: "#D9B64E",
    },
  ];
  
  return (
    <section 
      ref={ref}
      className="relative py-20 bg-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Portfolio Stack</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            I'm Alex Chen – A Pixel Whisperer. My work spans from brand identities to interactive interfaces, all designed to make an impact.
          </p>
        </motion.div>
        
        {/* Category tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              className={`px-6 py-2 rounded-md font-bold transition-colors ${activeCategory === "branding" ? "bg-[#FFD700] text-black" : "text-gray-600"}`}
              onClick={() => setActiveCategory("branding")}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Branding
            </button>
            
            <button
              className={`px-6 py-2 rounded-md font-bold transition-colors ${activeCategory === "ui" ? "bg-[#FFD700] text-black" : "text-gray-600"}`}
              onClick={() => setActiveCategory("ui")}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              UI Work
            </button>
          </div>
        </div>
        
        {/* Portfolio grid */}
        <AnimatePresence mode="wait">
          {activeCategory === "branding" ? (
            <motion.div
              key="branding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
              {brandingProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="relative overflow-hidden rounded-lg shadow-lg bg-white"
                  initial={{ opacity: 0, rotateY: -30, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0, 
                    scale: 1,
                    transition: { delay: index * 0.2 }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div 
                      className="w-12 h-2 mb-4 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="ui"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
              {uiProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="relative overflow-hidden rounded-lg shadow-lg bg-white"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.2 }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div 
                      className="w-12 h-2 mb-4 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Testimonials */}
        <div className="max-w-3xl mx-auto bg-gray-50 p-10 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-1 bg-[#FFD700] rounded-full mr-4" />
            <h3 className="text-2xl font-bold">Client Testimonials</h3>
            <div className="w-16 h-1 bg-[#FFD700] rounded-full ml-4" />
          </div>
          
          <div className="relative min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-xl text-gray-700 italic mb-6 min-h-[80px]">
                  "{displayText}
                  {isTyping && <span className="inline-block w-1 h-5 bg-black ml-1 animate-pulse" />}
                </p>
                <p className="font-bold">
                  {testimonials[currentTestimonial].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Testimonial navigation dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${index === currentTestimonial ? "bg-[#FFD700]" : "bg-gray-300"}`}
                onClick={() => setCurrentTestimonial(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
