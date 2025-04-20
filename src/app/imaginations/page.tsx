"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/ui/Navbar";

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

export default function ImaginationsPage() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
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
  
  // Case studies data - kept to 4 projects
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
    {
      id: "eco-travel-platform",
      title: "EcoTravel Platform",
      subtitle: "Web App Design",
      description: "A comprehensive travel platform focused on sustainable tourism options with carbon footprint tracking and eco-friendly accommodations.",
      image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      color: "#2A9D8F",
      tags: ["Web Design", "Sustainability", "User Experience"],
      content: "EcoTravel needed a platform that would make sustainable travel choices attractive and accessible. We designed an interface that highlights eco-friendly options while maintaining a sense of adventure and discovery. The platform saw 200,000 signups within the first three months of launch."
    },
    {
      id: "future-city",
      title: "Future City Campaign",
      subtitle: "Interactive Experience",
      description: "An immersive digital experience showcasing urban planning innovations and sustainable development for future smart cities.",
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      color: "#4059AD",
      tags: ["Interactive", "3D", "Campaign"],
      content: "The Future City Campaign needed to make complex urban planning concepts accessible and engaging for the general public. Our solution was an interactive 3D experience that allowed users to explore different aspects of sustainable city design. The campaign reached over 1 million unique visitors and was featured in several international design publications."
    },
    {
      id: "culinary-app",
      title: "Culinary Connection",
      subtitle: "Social Platform",
      description: "A social platform connecting home chefs with food enthusiasts for shared dining experiences, recipe exchanges, and culinary education.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      color: "#D62828",
      tags: ["Social", "Food", "Community"],
      content: "Culinary Connection wanted to create a platform where passion for food could become a social experience. We designed an interface that makes discovering and connecting with fellow food enthusiasts intuitive and engaging. The app gained 50,000 active users within six months and has facilitated over 10,000 in-person dining events."
    },
    {
      id: "wellness-retreat",
      title: "Serenity Spaces",
      subtitle: "Brand Experience",
      description: "A comprehensive brand identity and digital presence for a luxury wellness retreat focusing on mindfulness and holistic health.",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      color: "#457B9D",
      tags: ["Branding", "Wellness", "Luxury"],
      content: "Serenity Spaces needed a brand identity that communicated both exclusivity and approachability. The design system uses natural textures, a calming color palette, and thoughtful typography to create a sense of tranquility and premium quality. Booking rates increased by 65% after the rebrand launch."
    }
  ];

  // Handle case study click
  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };
  
  // Close modal
  const closeModal = () => {
    setSelectedCaseStudy(null);
    // Re-enable scrolling
    document.body.style.overflow = "";
  };

  // Keyboard handling for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCaseStudy) {
        closeModal();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Make sure scrolling is re-enabled when component unmounts
      document.body.style.overflow = "";
    };
  }, [selectedCaseStudy]);

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar setIsHovering={setIsHovering} />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-100 opacity-40 blur-3xl transform -translate-y-1/3" />
          <div className="absolute bottom-0 left-20 w-96 h-96 rounded-full bg-blue-50 opacity-60 blur-3xl transform translate-y-1/4" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-5xl sm:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Imaginations
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Explore our portfolio of projects where strategic design thinking translates into extraordinary experiences and measurable business success.
          </motion.p>
        </div>
      </section>

      {/* Project Grid Section */}
      <section ref={ref} className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Project image */}
                <div className="h-64 overflow-hidden relative">
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundColor: project.color }}
                  />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                
                {/* Project details */}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
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
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                  
                  <motion.button
                    className="flex items-center gap-2 text-white px-5 py-2.5 rounded-lg font-medium"
                    style={{ backgroundColor: project.color }}
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCaseStudyClick(project)}
                  >
                    View Case Study 
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
                
                {/* Project number indicator */}
                <div 
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ backgroundColor: project.color }}
                >
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
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
              className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
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
                  <X size={24} />
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
      
      {/* Custom cursor if isHovering */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 rounded-full bg-[#FFD700] mix-blend-difference pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2" 
          animate={{
            x: cursorPosition.x,
            y: cursorPosition.y,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            mass: 0.5
          }}
        />
      )}
    </main>
  );
}
