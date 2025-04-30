"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  CheckCircle, 
  Palette, 
  Layers, 
  Layout, 
  LineChart, 
  Users, 
  Code, 
  FileText, 
  Laptop, 
  Figma,
  Zap, 
  UserCheck,
  PencilRuler,
  Workflow,
  BarChart4,
  PenTool,
  PhoneCall,
  SquareStack,
  FileImage,
  Instagram,
  RotateCwIcon,
  TypeOutline,
  FilePen,
  LayoutTemplate,
  Smartphone,
  Calendar
} from "lucide-react";

interface PricingSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

interface PricingPlan {
  id: string;
  title: string;
  price: string;
  description: string;
  features: Array<{
    text: string;
    icon: React.ReactNode;
  }>;
  popular: boolean;
  accentColor: string;
  ctaText: string;
}

export default function PricingSection({ setIsHovering }: PricingSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Hover state for each pricing card
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Pricing data with integrated icons
  const pricingPlans: PricingPlan[] = [
    {
      id: "logo-design",
      title: "Logo Design",
      price: "$300",
      description: "Crafted brand marks that are timeless, memorable, and scalable across all mediums.",
      features: [
        { 
          text: "Strategic Discovery Call",
          icon: <PhoneCall size={18} className="flex-shrink-0" />
        },
        { 
          text: "Moodboard & Style Exploration", 
          icon: <Palette size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "3 Logo Concepts",
          icon: <SquareStack size={18} className="flex-shrink-0" />
        },
        { 
          text: "3 Rounds of Revisions", 
          icon: <RotateCwIcon size={18} className="flex-shrink-0" />
        },
        { 
          text: "Final Logo in Multiple Formats (SVG, PNG, PDF)",
          icon: <FileImage size={18} className="flex-shrink-0" />
        },
        { 
          text: "Light Brand Guide (color codes, font usage)",
          icon: <FileText size={18} className="flex-shrink-0" />
        },
        { 
          text: "Social Media Profile Assets",
          icon: <Instagram size={18} className="flex-shrink-0" />
        },
        { 
          text: "Delivery time: Less than a week",
          icon: <Calendar size={18} className="flex-shrink-0" />
        }
      ],
      popular: false,
      accentColor: "#F15B54", 
      ctaText: "Design My Logo"
    },
    {
      id: "branding",
      title: "Brand Identity",
      price: "$500",
      description: "A holistic brand identity system tailored to tell your story and stand out in a crowded market.",
      features: [
        { 
          text: "Brand Discovery & Strategy",
          icon: <Layers size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Logo Suite + Variations",
          icon: <Layout size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Brand Color Palette", 
          icon: <Palette size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Typography System",
          icon: <TypeOutline size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Visual Style Direction (patterns, icons, mockups)", 
          icon: <Figma size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Brand Guidelines (PDF & Web)",
          icon: <FilePen size={18} className="flex-shrink-0" />
        },
        { 
          text: "Social Media Templates",
          icon: <LayoutTemplate size={18} className="flex-shrink-0" />
        },
        { 
          text: "Delivery time: A week or more",
          icon: <Calendar size={18} className="flex-shrink-0" />
        }
      ],
      popular: true,
      accentColor: "#ffd602",
      ctaText: "Start Your Design System"
    },
    {
      id: "full-uxui-project",
      title: "UI/UX Design Project",
      price: "$750",
      description: "End-to-end design process from research to high-fidelity prototypes ready for development",
      features: [
        { 
          text: "In-depth User Research",
          icon: <Users size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Information Architecture",
          icon: <Workflow size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Wireframing & User Flows",
          icon: <PencilRuler size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "High-fidelity UI Design (Figma file)",
          icon: <PenTool size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "4-6 key screens",
          icon: <Smartphone size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Interactive Prototyping",
          icon: <Laptop size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Usability Testing",
          icon: <UserCheck size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "UI Kit Development",
          icon: <Layers size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Implementation Support",
          icon: <Zap size={18} className="flex-shrink-0" /> 
        },
        { 
          text: "Delivery time: 2 weeks",
          icon: <Calendar size={18} className="flex-shrink-0" />
        }
      ],
      popular: false,
      accentColor: "#F15B54", 
      ctaText: "Get Project Quote"
    }
  ];
  
  return (
    <section 
      ref={ref}
      className="relative py-28 bg-white"
      id="pricing"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent" />
        <div className="absolute left-0 top-1/4 w-40 h-40 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-60 h-60 rounded-full bg-purple-100/40 blur-3xl" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">Design Tiers</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Transform your digital product with our premium design services. Choose the package that best fits your needs or contact us for a custom solution.
          </p>
        </motion.div>
        
        {/* Pricing cards - optimized for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-xl overflow-hidden border border-gray-200 ${
                plan.popular ? "ring-2 ring-opacity-80" : ""
              } shadow-lg transition-all duration-300`}
              style={{
                ["--tw-ring-color" as any]: plan.popular ? plan.accentColor : 'transparent',
                boxShadow: hoveredCard === plan.id 
                  ? `0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 15px 2px ${plan.accentColor}30`
                  : '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.15, duration: 0.6 }
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => {
                setHoveredCard(plan.id);
                setIsHovering(true);
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
                setIsHovering(false);
              }}
            >
              {plan.popular && (
                <div 
                  className="absolute top-0 right-0 text-white font-bold text-xs px-4 py-2 rounded-bl-lg z-10"
                  style={{ backgroundColor: plan.accentColor }}
                >
                  MOST POPULAR
                </div>
              )}
              
              {/* Card header with accent color */}
              <div 
                className="pt-8 sm:pt-10 px-6 sm:px-8 pb-6 relative overflow-hidden"
                style={{ backgroundColor: `${plan.accentColor}08` }}
              >
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full"
                  style={{ backgroundColor: plan.accentColor }}
                  initial={{ scale: 1, x: 40, y: -40 }}
                  animate={hoveredCard === plan.id ? 
                    { scale: 1.5, x: 20, y: -20 } : 
                    { scale: 1, x: 40, y: -40 }
                  }
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: plan.accentColor }}
                >
                  {plan.title}
                </h3>
                <p className="text-gray-600 mb-5 min-h-[3rem] sm:min-h-[4rem]">{plan.description}</p>
                
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {!plan.price.includes("+") && (
                    <span className="text-gray-500 ml-2">/ project</span>
                  )}
                </div>
              </div>
              
              {/* Card features */}
              <div className="p-6 sm:p-8 pt-6 bg-white">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <motion.li 
                      key={feature.text} 
                      className="flex items-start text-gray-700"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div 
                        className="mr-3 mt-0.5 p-1 rounded-full"
                        style={{ color: plan.accentColor }}
                      >
                        {feature.icon}
                      </div>
                      <span>{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.a
                   href={(() => {
                     if (plan.ctaText === "Design My Logo") {
                       return "mailto:letscreate.inksandinterfaces@gmail.com?subject=Logo%20Design%20Inquiry";
                     } else if (plan.ctaText === "Start Your Design System") {
                       return "mailto:letscreate.inksandinterfaces@gmail.com?subject=Design%20System%20Project%20Inquiry";
                     } else if (plan.ctaText === "Get Project Quote") {
                       return "mailto:letscreate.inksandinterfaces@gmail.com?subject=Project%20Quote%20Request";
                     } else {
                       return "mailto:letscreate.inksandinterfaces@gmail.com";
                     }
                   })()}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full block"
                 >
                   <motion.button
                     className="w-full py-3.5 px-6 rounded-lg font-bold text-white transition-all duration-300 relative overflow-hidden"
                     style={{ 
                       backgroundColor: hoveredCard === plan.id 
                         ? plan.accentColor 
                         : plan.accentColor + "CC"
                     }}
                     whileHover={{ scale: 1.03 }}
                     whileTap={{ scale: 0.98 }}
                   >
                     <motion.span
                       className="absolute inset-0 w-full h-full bg-black opacity-0"
                       animate={hoveredCard === plan.id ? 
                         { opacity: 0.1, scale: 1 } : 
                         { opacity: 0, scale: 0.9 }
                       }
                       transition={{ duration: 0.4 }}
                     />
                     <span className="relative z-10">{plan.ctaText}</span>
                   </motion.button>
                 </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Custom projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 sm:mt-20 text-center bg-gray-50 p-6 sm:p-10 rounded-xl sm:rounded-2xl shadow-sm"
        >
          <div className="max-w-3xl mx-auto">
            <BarChart4 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
            <p className="text-gray-700 mb-8">
              Every project is unique. If you need something tailored to your specific requirements, 
              our team of UX/UI experts is ready to create a custom solution that perfectly fits your needs.
            </p>
            
            <motion.a
               href="mailto:letscreate.inksandinterfaces@gmail.com?subject=Custom%20Quote%20Request"
               target="_blank"
               rel="noopener noreferrer"
             >
               <motion.button
                 className="bg-black text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-lg hover:bg-gray-800 transition-all duration-300 touch-target"
                 whileHover={{ 
                   scale: 1.05,
                   boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" 
                 }}
                 whileTap={{ scale: 0.98 }}
                 onMouseEnter={() => setIsHovering(true)}
                 onMouseLeave={() => setIsHovering(false)}
               >
                 <span className="flex items-center gap-2">
                   Contact for Custom Quote
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </span>
               </motion.button>
             </motion.a>
          </div>
        </motion.div>
        
        {/* Guarantee section */}
        {/* <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-2 text-gray-500"
          >
            <CheckCircle size={18} />
            <span>14-day satisfaction guarantee on all projects</span>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
}
