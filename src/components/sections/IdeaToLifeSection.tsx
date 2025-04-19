"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Search, 
  Lightbulb, 
  LayoutGrid, 
  PaintBucket, 
  MessageCircle, 
  Package,
  CheckCircle 
} from "lucide-react";

interface IdeaToLifeSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
}

export default function IdeaToLifeSection({ setIsHovering }: IdeaToLifeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  // Define the steps for the design process
  const steps: Step[] = [
    {
      id: 1,
      title: "Discovery",
      description: "Understanding your goals, audience, and brand voice.",
      icon: <Search className="w-8 h-8" />,
      progress: 0
    },
    {
      id: 2,
      title: "Research & Inspiration",
      description: "Exploring trends and possibilities to spark original ideas.",
      icon: <Lightbulb className="w-8 h-8" />,
      progress: 0.2
    },
    {
      id: 3,
      title: "Wireframing",
      description: "Outlining structure and user flow with low-fidelity mockups.",
      icon: <LayoutGrid className="w-8 h-8" />,
      progress: 0.4
    },
    {
      id: 4,
      title: "Visual Design",
      description: "Bringing ideas to life with layouts, typography, and color palettes.",
      icon: <PaintBucket className="w-8 h-8" />,
      progress: 0.6
    },
    {
      id: 5,
      title: "Prototype & Feedback",
      description: "Sharing interactive prototypes to fine-tune usability and aesthetics.",
      icon: <MessageCircle className="w-8 h-8" />,
      progress: 0.8
    },
    {
      id: 6,
      title: "Final Delivery",
      description: "Providing polished, pixel-perfect designs ready for development.",
      icon: <Package className="w-8 h-8" />,
      progress: 1
    }
  ];
  
  // Track scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Use refs to track when each step is in view
  const stepRefs = steps.map(() => useInView({ threshold: 0.7 }));
  
  // Update active step based on which one is in view
  useEffect(() => {
    const newActiveStep = stepRefs.findIndex(([inView]) => inView);
    if (newActiveStep !== -1) {
      setActiveStep(newActiveStep);
    }
  }, [stepRefs.map(([inView]) => inView).join()]);
  
  // Main section title animations
  const titleOpacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.2], 
    [0, 1, 1]
  );
  
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2],
    [50, 0, 0]
  );
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 bg-white overflow-hidden"
      id="process"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          className="text-center mb-24"
          style={{
            opacity: titleOpacity,
            y: titleY
          }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Design That Tells a Story</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our expertly crafted design process transforms visions into impactful realities,
            guiding every project from concept to completion.
          </p>
        </motion.div>
        
        {/* Design process stepper */}
        <div className="relative" ref={stepsRef}>
          {/* Timeline connector */}
          <div className="absolute left-[45px] top-0 bottom-0 w-[2px] bg-gray-200">
            <motion.div 
              className="absolute top-0 w-full bg-black"
              style={{ 
                height: useTransform(
                  scrollYProgress, 
                  [0.1, 0.9], 
                  ["0%", "100%"]
                ),
                originY: 0
              }}
            />
          </div>
          
          {/* Steps */}
          <div className="space-y-32">
            {steps.map((step, index) => {
              const [ref, inView] = stepRefs[index];
              
              return (
                <motion.div
                  key={step.id}
                  ref={ref}
                  className="relative flex"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Step indicator */}
                  <motion.div 
                    className={`relative flex-shrink-0 w-[90px] h-[90px] flex items-center justify-center rounded-full bg-white border-2 z-10 ${
                      inView ? "border-black" : "border-gray-200"
                    }`}
                    animate={inView ? {
                      scale: [1, 1.1, 1],
                      transition: {
                        duration: 0.5,
                        times: [0, 0.5, 1]
                      }
                    } : {}}
                  >
                    <motion.div
                      initial={false}
                      animate={inView ? {
                        color: "#000000",
                      } : {
                        color: "#AAAAAA",
                      }}
                    >
                      {step.icon}
                    </motion.div>
                    
                    {/* Progress indicator */}
                    {inView && (
                      <motion.div 
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-black flex items-center justify-center text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Step content */}
                  <div className="ml-6 pt-3">
                    <motion.h3 
                      className={`text-2xl font-bold mb-3 ${inView ? 'text-black' : 'text-gray-500'}`}
                      animate={inView ? {
                        color: "#000000",
                      } : {
                        color: "#AAAAAA",
                      }}
                    >
                      {step.title}
                    </motion.h3>
                    
                    <motion.p 
                      className={`text-lg ${inView ? 'text-gray-700' : 'text-gray-400'}`}
                      initial={{ opacity: 0.5 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0.5 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.description}
                    </motion.p>
                    
                    {/* Step content illustration or visual */}
                    <motion.div 
                      className="mt-6 max-w-2xl bg-gray-50 rounded-lg p-6 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex-shrink-0 w-2 h-16 rounded-full ${inView ? 'bg-black' : 'bg-gray-200'}`} />
                        <div>
                          <h4 className="font-medium mb-2">Key Deliverables</h4>
                          <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1">
                            {index === 0 && (
                              <>
                                <li>Brand questionnaire & discovery workshop</li>
                                <li>Target audience analysis</li>
                                <li>Project scope & timeline planning</li>
                              </>
                            )}
                            {index === 1 && (
                              <>
                                <li>Competitive analysis report</li>
                                <li>Mood boards & creative direction</li>
                                <li>Design reference collection</li>
                              </>
                            )}
                            {index === 2 && (
                              <>
                                <li>Information architecture document</li>
                                <li>User flow diagrams</li>
                                <li>Low-fidelity wireframes</li>
                              </>
                            )}
                            {index === 3 && (
                              <>
                                <li>Color palette & typography system</li>
                                <li>High-fidelity design mockups</li>
                                <li>Component design library</li>
                              </>
                            )}
                            {index === 4 && (
                              <>
                                <li>Interactive clickable prototype</li>
                                <li>Usability testing results</li>
                                <li>Refinement recommendations</li>
                              </>
                            )}
                            {index === 5 && (
                              <>
                                <li>Final design assets & specifications</li>
                                <li>Developer handoff documentation</li>
                                <li>Implementation support</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Call to action */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-black text-white font-bold py-4 px-10 rounded-lg hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Start Your Design Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
