import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import {
  Search,
  Lightbulb,
  LayoutGrid,
  PaintBucket,
  MessageCircle,
  Package
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
  const steps: Step[] = [
    {
      id: 1,
      title: "Discovery",
      description: "Understanding your goals, audience, and brand voice.",
      icon: <Search className="w-12 h-12 text-indigo-600" />,
      progress: 0
    },
    {
      id: 2,
      title: "Research & Inspiration",
      description: "Exploring trends and possibilities to spark original ideas.",
      icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
      progress: 0.2
    },
    {
      id: 3,
      title: "Wireframing",
      description: "Outlining structure and user flow with low-fidelity mockups.",
      icon: <LayoutGrid className="w-12 h-12 text-sky-500" />,
      progress: 0.4
    },
    {
      id: 4,
      title: "Visual Design",
      description: "Bringing ideas to life with layouts, typography, and color palettes.",
      icon: <PaintBucket className="w-12 h-12 text-pink-500" />,
      progress: 0.6
    },
    {
      id: 5,
      title: "Prototype & Feedback",
      description: "Sharing interactive prototypes to fine-tune usability and aesthetics.",
      icon: <MessageCircle className="w-12 h-12 text-green-500" />,
      progress: 0.8
    },
    {
      id: 6,
      title: "Final Delivery",
      description: "Providing polished, pixel-perfect designs ready for development.",
      icon: <Package className="w-12 h-12 text-neutral-600" />,
      progress: 1
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">
          Design That Tells a Story
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 font-medium">
          Our expertly crafted design process transforms visions into impactful realities, guiding every project from concept to completion.
        </p>
      </div>
      {/* Floating active card title */}
      <HorizontalScrollCarousel steps={steps} />
    </section>
  );
}

function HorizontalScrollCarousel({ steps }: { steps: Step[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Update width on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use scroll progress for the overall section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // Create a motion value for snapping animation
  const activeCard = useMotionValue(0);

  // Update active card based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Calculate which card should be active based on scroll progress
      const cardIndex = Math.round(value * (steps.length - 1));
      setActiveCardIndex(cardIndex);
      
      // Animate to the active card with spring physics for snapping effect
      animate(activeCard, cardIndex, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5
      });
    });
    return () => unsubscribe();
  }, [scrollYProgress, steps.length]);

  // Transform active card index to horizontal position
  // Ensure all cards, including the last two, are fully visible and centered
  // Add space for 2 extra cards after the last card
  const x = useTransform(activeCard, (index) => {
    // The width of each card is 100vw, but the container may have padding/margins.
    // To center the last card, subtract half a card width from the total scroll for the last card.
    // For N cards, the max translateX should be (N-1) * 100vw.
    // If you want to center the card, you need to offset by half the container width minus half the card width.
    // For simplicity, let's ensure the last card is fully in view, not overscrolled.
    if (index >= steps.length - 1) {
      return `-${(steps.length - 1) * 100}%`;
    }
    if (index < 0) return "0%";
    return `-${index * 100}%`;

  });


  return (
    <section
      ref={targetRef}
      className="relative h-[200vh] bg-gradient-to-br from-neutral-100 via-white to-indigo-50 overflow-visible"
      id="process"
    >

      {/* Sticky container that stays in viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-visible">
        {/* Card container */}
        <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-visible">
          <motion.div
            style={{ x, willChange: 'transform' }}
            className="flex w-full"
            transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.7 }}
            role="group"
            aria-roledescription="carousel"
            aria-label="Design process steps"
          >
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex-shrink-0 w-full flex items-center justify-center"
                role="group"
                aria-roledescription="slide"
                aria-label={step.title}
                tabIndex={activeCardIndex === step.id - 1 ? 0 : -1}
              >
                <ProcessCard step={step} />
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Progress indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4" aria-label="Progress indicators">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className={`flex flex-col items-center transition-all duration-200 ${i === activeCardIndex ? 'drop-shadow-lg' : ''}`}
              animate={{
                scale: i === activeCardIndex ? 1.25 : 1
              }}
              transition={{ type: "spring", stiffness: 260 }}
              aria-current={i === activeCardIndex ? 'step' : undefined}
            >
              <motion.div 
                className="w-4 h-4 rounded-full mb-1 border-2"
                style={{ boxShadow: i === activeCardIndex ? '0 0 0 4px #a5b4fc55' : undefined }}
                animate={{
                  backgroundColor: i <= activeCardIndex ? "#6366f1" : "#e0e7ff",
                  borderColor: i === activeCardIndex ? "#6366f1" : "#d1d5db"
                }}
              />
              <span className="text-xs text-indigo-700 font-semibold hidden md:block" style={{ letterSpacing: 0.5 }}>{step.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step }: { step: Step }) {
  // Define key deliverables for each step based on step ID
  const getDeliverables = (id: number) => {
    switch(id) {
      case 1: // Discovery
        return [
          "Brand questionnaire & discovery workshop",
          "Target audience analysis",
          "Project scope & timeline planning"
        ];
      case 2: // Research & Inspiration
        return [
          "Competitive analysis report",
          "Mood boards & creative direction",
          "Design reference collection"
        ];
      case 3: // Wireframing
        return [
          "Information architecture document",
          "User flow diagrams",
          "Low-fidelity wireframes"
        ];
      case 4: // Visual Design
        return [
          "Color palette & typography system",
          "High-fidelity design mockups",
          "Component design library"
        ];
      case 5: // Prototype & Feedback
        return [
          "Interactive clickable prototype",
          "Usability testing results",
          "Refinement recommendations"
        ];
      case 6: // Final Delivery
        return [
          "Final design assets & specifications",
          "Developer handoff documentation",
          "Implementation support"
        ];
      default:
        return [];
    }
  };

  const deliverables = getDeliverables(step.id);

  return (
    <div
      className="group relative h-[500px] w-[600px] max-w-[90vw] overflow-visible bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col p-8"
    >
      {/* Progress indicator */}
      <div className="absolute top-6 right-6 flex items-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 border border-gray-200">
          <span className="text-sm font-semibold">{step.id}/6</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="p-4 rounded-2xl bg-gray-50">
            {step.icon}
          </div>
          <div className="ml-6">
            <h3 className="text-3xl font-bold text-neutral-800">
              {step.title}
            </h3>
            <p className="text-lg text-neutral-600 mt-1">
              {step.description}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            style={{ width: `${step.progress * 100}%` }}
          />
        </div>

        {/* Deliverables */}
        <div className="bg-gray-50 rounded-xl p-6 flex-grow">
          <h4 className="font-semibold text-lg mb-4">Key Deliverables</h4>
          <ul className="space-y-3">
            {deliverables.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="min-w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional info */}
        <div className="mt-6 text-sm text-neutral-500">
          <p>This phase typically takes {step.id === 1 ? '1-2 weeks' : step.id === 6 ? '1-2 weeks' : '2-3 weeks'} to complete.</p>
        </div>
      </div>
    </div>
  );
}
