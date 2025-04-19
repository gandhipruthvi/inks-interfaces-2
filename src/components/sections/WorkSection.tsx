"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface WorkSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
  content: string;
}

export default function WorkSection({ setIsHovering }: WorkSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  
  // Case studies data
  const caseStudies: CaseStudy[] = [
    {
      id: "coffee-cup",
      title: "Bloom Café Rebrand",
      description: "A fresh identity for a local coffee shop chain",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      color: "#FFD700",
      tags: ["Branding", "Logo Design", "Packaging"],
      content: "Bloom Café needed a brand refresh that would appeal to a younger demographic while maintaining their reputation for quality. The solution was a vibrant, nature-inspired identity system with playful illustrations and a warm color palette. The rebrand resulted in a 30% increase in foot traffic and significant social media engagement."
    },
    {
      id: "phone-app",
      title: "Mindful Mobile App",
      description: "UX/UI design for a mental wellness application",
      image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      color: "#E86343",
      tags: ["UX/UI", "Mobile App", "Interaction Design"],
      content: "Mindful needed an intuitive interface that would make mental health tracking accessible and engaging. The design focused on calming visuals, thoughtful micro-interactions, and a streamlined user flow. Post-launch metrics showed a 45% increase in daily active users and an average session time of 12 minutes."
    },
    {
      id: "finance-dashboard",
      title: "FinTrack Dashboard",
      description: "Financial data visualization platform",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      color: "#2F3F4A",
      tags: ["UI Design", "Data Visualization", "Web App"],
      content: "FinTrack needed a dashboard that would make complex financial data accessible to non-expert users. The solution included intuitive charts, customizable widgets, and a clean, focused interface. User testing showed a 60% improvement in task completion rates compared to the previous version."
    },
    {
      id: "fashion-brand",
      title: "Nomad Apparel",
      description: "Global fashion brand identity",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      color: "#2A9187",
      tags: ["Branding", "Fashion", "Identity System"],
      content: "Nomad Apparel wanted to position itself as a global brand with local sensibilities. The identity system incorporated elements from various cultures while maintaining a cohesive, contemporary aesthetic. The brand launch generated significant press coverage and exceeded first-quarter sales projections by 25%."
    },
  ];
  
  // Animated stickers for each case study
  const renderSticker = (id: string) => {
    switch (id) {
      case "coffee-cup":
        return (
          <motion.div
            className="relative w-32 h-32"
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8H19C20.0609 8 21.0783 8.42143 21.8284 9.17157C22.5786 9.92172 23 10.9391 23 12C23 13.0609 22.5786 14.0783 21.8284 14.8284C21.0783 15.5786 20.0609 16 19 16H18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 8H18V17C18 18.0609 17.5786 19.0783 16.8284 19.8284C16.0783 20.5786 15.0609 21 14 21H6C4.93913 21 3.92172 20.5786 3.17157 19.8284C2.42143 19.0783 2 18.0609 2 17V8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 1V4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 1V4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 1V4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            {/* Steam animation */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [-10, -20, -10],
                opacity: [0.6, 0.2, 0],
                scale: [0.8, 1.2, 1.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12.2 2.4C13.1333 4.05556 14.5 5.66667 16.3 7.23333C18.1 8.8 19 10.4333 19 12.1333C19 14.1778 18.3111 15.8444 16.9333 17.1333C15.5556 18.4222 13.9111 19.0667 12 19.0667C10.0889 19.0667 8.44444 18.4222 7.06667 17.1333C5.68889 15.8444 5 14.1778 5 12.1333C5 10.4333 5.9 8.8 7.7 7.23333C9.5 5.66667 10.8667 4.05556 11.8 2.4L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            
            <motion.div
              className="absolute -top-6 left-1/3 transform -translate-x-1/2"
              animate={{
                y: [-5, -15, -5],
                opacity: [0.4, 0.1, 0],
                scale: [0.6, 1, 1.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: 0.5,
                ease: "easeInOut",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12.2 2.4C13.1333 4.05556 14.5 5.66667 16.3 7.23333C18.1 8.8 19 10.4333 19 12.1333C19 14.1778 18.3111 15.8444 16.9333 17.1333C15.5556 18.4222 13.9111 19.0667 12 19.0667C10.0889 19.0667 8.44444 18.4222 7.06667 17.1333C5.68889 15.8444 5 14.1778 5 12.1333C5 10.4333 5.9 8.8 7.7 7.23333C9.5 5.66667 10.8667 4.05556 11.8 2.4L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        );
      case "phone-app":
        return (
          <motion.div
            className="relative w-32 h-32"
            animate={{
              rotate: [0, -3, 0, 3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="2" width="14" height="20" rx="2" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18H12.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            {/* Tapping animation */}
            <motion.div
              className="absolute -top-5 -right-5"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 13V12M12 9V8M16 13V12M12 17V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        );
      case "finance-dashboard":
        return (
          <motion.div
            className="relative w-32 h-32"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 9H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21V9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            {/* Chart animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10" stroke="#2F3F4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20V4" stroke="#2F3F4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 20V14" stroke="#2F3F4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        );
      case "fashion-brand":
        return (
          <motion.div
            className="relative w-32 h-32"
            animate={{
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.38 3.46L16 2L12 5L8 2L3.62 3.46C2.64 3.76 2 4.67 2 5.7V19.5C2 20.33 2.67 21 3.5 21H8.75C8.75 21 10.13 21 12 21C13.88 21 15.25 21 15.25 21H20.5C21.33 21 22 20.33 22 19.5V5.7C22 4.67 21.36 3.76 20.38 3.46Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            {/* Tag animation */}
            <motion.div
              className="absolute -top-3 -right-3"
              animate={{
                rotate: [0, 15, 0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                delay: 1,
                ease: "easeInOut",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7H7.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };
  
  // Handle case study click
  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
  };
  
  // Close modal
  const closeModal = () => {
    setSelectedCaseStudy(null);
  };
  
  return (
    <section 
      ref={ref}
      className="relative py-20 bg-gray-50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Work Worth Watching</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Click on any project to explore the case study and see how design thinking solved real business challenges.
          </p>
        </motion.div>
        
        {/* Case study grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.2 }
              } : { opacity: 0, y: 50 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              onClick={() => handleCaseStudyClick(caseStudy)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{ backgroundColor: caseStudy.color }}
                  />
                </div>
                
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-12 h-2 rounded-full"
                        style={{ backgroundColor: caseStudy.color }}
                      />
                      <div className="flex space-x-1">
                        {caseStudy.tags.slice(0, 2).map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
                    <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#FFD700]">View Case Study</span>
                    <div className="relative">
                      {renderSticker(caseStudy.id)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Case study modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div 
                className="h-64 relative"
                style={{ backgroundColor: selectedCaseStudy.color }}
              >
                <img 
                  src={selectedCaseStudy.image} 
                  alt={selectedCaseStudy.title}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedCaseStudy.title}</h2>
                  <p className="text-white/80">{selectedCaseStudy.description}</p>
                </div>
                
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  onClick={closeModal}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              {/* Modal content */}
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCaseStudy.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{ 
                        backgroundColor: `${selectedCaseStudy.color}20`,
                        color: selectedCaseStudy.color
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-lg">{selectedCaseStudy.content}</p>
                  
                  <h3 className="text-2xl font-bold mt-8 mb-4">The Challenge</h3>
                  <p>
                    Every great project starts with a challenge. For {selectedCaseStudy.title}, the challenge was to create a design that would stand out in a crowded market while maintaining usability and brand consistency.
                  </p>
                  
                  <h3 className="text-2xl font-bold mt-8 mb-4">The Approach</h3>
                  <p>
                    Through extensive research and iterative design, we developed a solution that balanced aesthetic appeal with functional requirements. The process involved stakeholder interviews, competitive analysis, and multiple rounds of user testing.
                  </p>
                  
                  <h3 className="text-2xl font-bold mt-8 mb-4">The Results</h3>
                  <p>
                    The final design not only met but exceeded expectations, resulting in improved user engagement, brand recognition, and business metrics. The client was thrilled with the outcome and has since implemented the design across their entire product line.
                  </p>
                </div>
                
                {/* Call to action */}
                <div className="mt-8 flex justify-end">
                  <motion.button
                    className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    Contact for Similar Project
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
