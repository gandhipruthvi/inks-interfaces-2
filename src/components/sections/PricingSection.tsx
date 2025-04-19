"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface PricingSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

export default function PricingSection({ setIsHovering }: PricingSectionProps) {
  const [activeTab, setActiveTab] = useState<"branding" | "ui">("branding");
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  // Pricing data
  const brandingPricing = [
    {
      title: "Logo Design",
      price: "$1,200",
      description: "A distinctive mark that captures your brand's essence",
      features: [
        "3 Unique Concepts",
        "Unlimited Revisions",
        "Brand Guidelines",
        "All File Formats",
        "Copyright Transfer",
      ],
      popular: false,
      color: "#FFD700",
    },
    {
      title: "Brand Identity",
      price: "$3,500",
      description: "Complete visual system for your brand",
      features: [
        "Logo Design",
        "Color Palette",
        "Typography System",
        "Brand Guidelines",
        "Stationery Design",
        "Social Media Templates",
      ],
      popular: true,
      color: "#FFD700",
    },
    {
      title: "Brand Strategy",
      price: "$5,000",
      description: "Strategic positioning and messaging",
      features: [
        "Market Research",
        "Competitor Analysis",
        "Brand Positioning",
        "Messaging Framework",
        "Brand Voice & Tone",
        "Brand Identity",
      ],
      popular: false,
      color: "#FFD700",
    },
  ];
  
  const uiPricing = [
    {
      title: "UI Audit",
      price: "$1,500",
      description: "Comprehensive review of your interface",
      features: [
        "Usability Assessment",
        "Visual Design Review",
        "Accessibility Check",
        "Detailed Report",
        "Recommendations",
      ],
      popular: false,
      color: "#FFD700",
    },
    {
      title: "UI Design System",
      price: "$4,500",
      description: "Cohesive design system for your product",
      features: [
        "Component Library",
        "Style Guide",
        "Design Tokens",
        "Documentation",
        "Figma/Sketch Files",
        "Developer Handoff",
      ],
      popular: true,
      color: "#FFD700",
    },
    {
      title: "Full UX/UI Project",
      price: "$8,000+",
      description: "End-to-end design for digital products",
      features: [
        "User Research",
        "Information Architecture",
        "Wireframing",
        "UI Design",
        "Prototyping",
        "Usability Testing",
        "Developer Handoff",
      ],
      popular: false,
      color: "#FFD700",
    },
  ];
  
  const currentPricing = activeTab === "branding" ? brandingPricing : uiPricing;
  
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
          <h2 className="text-5xl font-bold mb-6">The Ink Drop</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Transparent pricing for projects that make an impact. Each package is customizable to your specific needs.
          </p>
        </motion.div>
        
        {/* Pricing tabs */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex bg-gray-100 rounded-lg p-1">
            {/* Yellow ink drip animation */}
            <motion.div
              className="absolute top-0 bottom-0 rounded-lg bg-[#FFD700]"
              animate={{
                x: activeTab === "branding" ? 0 : "100%",
                width: "50%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                translateX: activeTab === "branding" ? "0%" : "-100%",
              }}
            >
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-[#FFD700]"
                animate={{
                  height: [8, 16, 8],
                  y: [0, 4, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#FFD700]"
                animate={{
                  y: [0, 8, 16],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            
            <button
              className={`relative z-10 px-8 py-3 rounded-lg font-bold transition-colors ${activeTab === "branding" ? "text-black" : "text-gray-600"}`}
              onClick={() => setActiveTab("branding")}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Branding
            </button>
            
            <button
              className={`relative z-10 px-8 py-3 rounded-lg font-bold transition-colors ${activeTab === "ui" ? "text-black" : "text-gray-600"}`}
              onClick={() => setActiveTab("ui")}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              UI/UX
            </button>
          </div>
        </div>
        
        {/* Pricing cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {currentPricing.map((plan, index) => (
              <motion.div
                key={plan.title}
                className={`relative bg-white rounded-lg overflow-hidden ${plan.popular ? "ring-2 ring-[#FFD700]" : "border border-gray-200"}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#FFD700] text-black font-bold text-xs px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {!plan.price.includes("+") && (
                      <span className="text-gray-500 ml-2">/ project</span>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-colors ${plan.popular ? "bg-[#FFD700] text-black" : "bg-gray-100 text-black hover:bg-gray-200"}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Custom projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Need something custom?</h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Every project is unique. If you don't see what you're looking for, let's discuss your specific needs and create a tailored solution.
          </p>
          
          <motion.button
            className="bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Contact for Custom Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
