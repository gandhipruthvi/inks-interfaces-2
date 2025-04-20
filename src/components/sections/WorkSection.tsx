"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ExternalLink } from "lucide-react";

interface WorkSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
  content: string;
  link?: string;
}

export default function WorkSection({ setIsHovering }: WorkSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  
  // Case studies data - kept to 4 projects as per requirements
  const caseStudies: CaseStudy[] = [
    {
      id: "bloom-cafe",
      title: "Bloom Café Rebrand",
      subtitle: "Brand Identity",
      description: "Revitalizing a local coffee chain with a fresh, nature-inspired identity system that resonates with younger demographics while honoring quality traditions.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      color: "#68A691",
      tags: ["Branding", "Identity", "Packaging"],
      content: "Bloom Café needed a brand refresh that would appeal to a younger demographic while maintaining their reputation for quality. The solution was a vibrant, nature-inspired identity system with playful illustrations and a warm color palette. The rebrand resulted in a 30% increase in foot traffic and significant social media engagement."
    },
    {
      id: "mindful-app",
      title: "Mindful Mobile App",
      subtitle: "UX/UI Design",
      description: "Creating an intuitive interface for mental wellness tracking that combines calming aesthetics with thoughtful interactions to improve user engagement.",
      image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      color: "#E86343",
      tags: ["UX/UI", "Mobile", "Wellness"],
      content: "Mindful needed an intuitive interface that would make mental health tracking accessible and engaging. The design focused on calming visuals, thoughtful micro-interactions, and a streamlined user flow. Post-launch metrics showed a 45% increase in daily active users and an average session time of 12 minutes."
    },
    {
      id: "finance-dashboard",
      title: "FinTrack Dashboard",
      subtitle: "Data Visualization",
      description: "Simplifying complex financial information through intuitive data visualizations and a clean interface that improves user comprehension and task completion.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      color: "#3A506B",
      tags: ["Dashboard", "Finance", "Data"],
      content: "FinTrack needed a dashboard that would make complex financial data accessible to non-expert users. The solution included intuitive charts, customizable widgets, and a clean, focused interface. User testing showed a 60% improvement in task completion rates compared to the previous version."
    },
    {
      id: "nomad-apparel",
      title: "Nomad Apparel",
      subtitle: "Global Brand Identity",
      description: "Developing a cohesive identity for an international fashion brand that balances global appeal with local cultural sensibilities across markets.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      color: "#B07156",
      tags: ["Fashion", "Branding", "Global"],
      content: "Nomad Apparel wanted to position itself as a global brand with local sensibilities. The identity system incorporated elements from various cultures while maintaining a cohesive, contemporary aesthetic. The brand launch generated significant press coverage and exceeded first-quarter sales projections by 25%."
    },
  ];
  
  // Calculate dynamic values for the sticky effect
  const cardHeight = "80vh";
  const cardTopPadding = "1.5em";
  const cardMargin = "4vw";
  const cardsCount = caseStudies.length;
  // How much of the previous card should peek from the top
  const peekHeight = 150; // px


  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
  };
  
  const closeModal = () => {
    setSelectedCaseStudy(null);
  };
  
  return (
    <section 
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 overflow-visible"
      id="work"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="px-4 sm:px-8 mb-12 sm:mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Work Worth Watching</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
              Scroll through our featured projects to see how strategic design thinking translates into business success.
            </p>
          </motion.div>
        </div>
        
        {/* Project cards container with sticky scrolling behavior */}
        <div 
          ref={containerRef} 
          className="relative"
          style={{
            height: `calc(${cardsCount} * ${cardHeight})`,
            paddingBottom: `calc(${cardsCount} * ${cardTopPadding})`,
          }}
        >
          <ul className="flex flex-col gap-10">
            {caseStudies.map((project, index) => {
              return (
                <motion.li
                  key={project.id}
                  className="sticky"
                  style={{
                    top: `${peekHeight}px`,
                    zIndex: index + 1
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div
                    className="relative w-full rounded-xl sm:rounded-2xl shadow-lg overflow-hidden bg-white"
                    whileHover={{ 
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="flex flex-col lg:flex-row h-full">
                      {/* Left side - Project image */}
                      <div className="lg:w-1/2 h-48 sm:h-64 lg:h-auto overflow-hidden relative">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br"
                          style={{ backgroundColor: project.color, opacity: 0.1 }}
                          whileHover={{ opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      
                      {/* Right side - Project details */}
                      <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                          {/* Project category and tags */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <span 
                              className="inline-block px-3 py-1 text-sm font-medium rounded-full"
                              style={{ 
                                backgroundColor: `${project.color}20`,
                                color: project.color
                              }}
                            >
                              {project.subtitle}
                            </span>
                            
                            {project.tags.slice(0, 2).map(tag => (
                              <span 
                                key={tag} 
                                className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          {/* Project title and description */}
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">{project.title}</h3>
                          <p className="text-gray-700 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        
                        {/* CTA Button */}
                        <motion.button
                          className="flex items-center gap-2 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium text-base sm:text-lg touch-target"
                          style={{ backgroundColor: project.color }}
                          whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCaseStudyClick(project)}
                        >
                          View Case Study 
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Project number indicator */}
                    <div 
                      className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: project.color }}
                    >
                      {index + 1}
                    </div>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </div>
        
        {/* Call to action */}
        <motion.div 
           className="flex justify-center pt-12 pb-16"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="/imaginations"
            className="inline-flex items-center gap-2 bg-black text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Explore More Projects
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Case study modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black bg-opacity-75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div 
                className="h-72 relative"
                style={{ backgroundColor: selectedCaseStudy.color }}
              >
                <img 
                  src={selectedCaseStudy.image} 
                  alt={selectedCaseStudy.title}
                  className="w-full h-full object-cover object-center mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                  <span 
                    className="inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-white/90"
                    style={{ color: selectedCaseStudy.color }}
                  >
                    {selectedCaseStudy.subtitle}
                  </span>
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedCaseStudy.title}</h2>
                  <p className="text-white/90 text-lg max-w-2xl">{selectedCaseStudy.description}</p>
                </div>
                
                {/* Close button */}
                <motion.button
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                  onClick={closeModal}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
              
              {/* Modal content */}
              <div className="p-10">
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedCaseStudy.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-4 py-1.5 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `${selectedCaseStudy.color}15`,
                        color: selectedCaseStudy.color
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl leading-relaxed text-gray-800">{selectedCaseStudy.content}</p>
                  
                  <h3 className="text-2xl font-bold mt-10 mb-4">The Challenge</h3>
                  <p className="text-lg text-gray-700">
                    Every great project starts with a challenge. For {selectedCaseStudy.title}, the challenge was to create a design that would stand out in a crowded market while maintaining usability and brand consistency.
                  </p>
                  
                  <h3 className="text-2xl font-bold mt-10 mb-4">The Approach</h3>
                  <p className="text-lg text-gray-700">
                    Through extensive research and iterative design, we developed a solution that balanced aesthetic appeal with functional requirements. The process involved stakeholder interviews, competitive analysis, and multiple rounds of user testing.
                  </p>
                  
                  <h3 className="text-2xl font-bold mt-10 mb-4">The Results</h3>
                  <p className="text-lg text-gray-700">
                    The final design not only met but exceeded expectations, resulting in improved user engagement, brand recognition, and business metrics. The client was thrilled with the outcome and has since implemented the design across their entire product line.
                  </p>
                </div>
                
                {/* Call to action */}
                <div className="mt-12 flex justify-center">
                  <motion.button
                    className="px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2"
                    style={{ backgroundColor: selectedCaseStudy.color }}
                    whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span>Contact for Similar Project</span>
                    <ArrowRight size={20} />
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
