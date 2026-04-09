"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Palette, 
  Layers, 
  Code, 
  FileText, 
  Laptop, 
  Figma,
  Smartphone,
  Calendar,
  PhoneCall,
  SquareStack,
  FileImage,
  Instagram,
  Layout,
  RotateCwIcon,
  TypeOutline,
  FilePen,
  LayoutTemplate,
  PenTool,
  BarChart4,
  Workflow
} from "lucide-react";

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

export default function PricingSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const pricingPlans: PricingPlan[] = [
    {
      id: "logo-design",
      title: "Logo Design",
      price: "$291",
      description: "Crafted brand marks that are timeless, memorable, and scalable across all mediums.",
      features: [
        { text: "Strategic Discovery Call", icon: <PhoneCall size={18} /> },
        { text: "Moodboard & Style Exploration", icon: <Palette size={18} /> },
        { text: "3 Logo Concepts", icon: <SquareStack size={18} /> },
        { text: "3 Rounds of Revisions", icon: <RotateCwIcon size={18} /> },
        { text: "Final Logo in Multiple Formats", icon: <FileImage size={18} /> },
        { text: "Light Brand Guide", icon: <FileText size={18} /> },
        { text: "Social Media Profile Assets", icon: <Instagram size={18} /> },
        { text: "Turnaround: Under a week", icon: <Calendar size={18} /> }
      ],
      popular: false,
      accentColor: "#333333",
      ctaText: "Get Started"
    },
    {
      id: "brand-identity",
      title: "Brand Identity",
      price: "$585",
      description: "A complete visual language that defines your brand's personality and voice.",
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
          text: "Turnaround time: A week or more",
          icon: <Calendar size={18} className="flex-shrink-0" />
        }
      ],
      popular: true,
      accentColor: "#FFD700",
      ctaText: "Elevate Brand"
    },
    {
      id: "ui-ux-design",
      title: "UI / UX Design",
      price: "$876",
      description: "User-centered digital experiences that balance form, function, and emotion.",
      features: [
        { text: "User Research & Flow Mapping", icon: <Workflow size={18} /> },
        { text: "Competitor Analysis", icon: <BarChart4 size={18} /> },
        { text: "Wireframing & Prototyping", icon: <LayoutTemplate size={18} /> },
        { text: "Responsive High-Fidelity UI", icon: <Smartphone size={18} /> },
        { text: "Interactive Prototype (Figma)", icon: <Figma size={18} /> },
        { text: "Custom Iconography", icon: <PenTool size={18} /> },
        { text: "Developer Handoff Docs", icon: <Code size={18} /> },
        { text: "Live Presentation Sessions", icon: <Laptop size={18} /> }
      ],
      popular: false,
      accentColor: "#333333",
      ctaText: "Start Project"
    }
  ];
  
  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden" id="pricing">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-black mb-6 tracking-tight">Design Tiers</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Premium design solutions tailored for brands that refuse to be ordinary.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative flex flex-col p-8 sm:p-10 rounded-[2.5rem] border transition-all duration-500 ${
                plan.popular 
                  ? "border-black shadow-2xl scale-105 z-10 bg-white" 
                  : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">/ Project</span>
                </div>
                <p className="text-gray-500 text-base leading-relaxed font-medium">{plan.description}</p>
              </div>
              
              <div className="flex-grow space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-[#FFD700]/10 transition-colors duration-300" 
                         style={{ color: plan.popular ? '#000' : '#666' }}>
                      {feature.icon}
                    </div>
                    <span className="text-sm text-gray-700 font-semibold">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('mailto:letscreate.inksandinterfaces@gmail.com')}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 ${
                  plan.popular 
                    ? "bg-black text-white hover:bg-[#FFD700] hover:text-black shadow-xl shadow-black/10" 
                    : "bg-white border-2 border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                {plan.ctaText}
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        <motion.div
           initial={{ opacity: 0 }}
           animate={inView ? { opacity: 1 } : {}}
           transition={{ delay: 0.8 }}
           className="mt-24 text-center p-12 rounded-[3rem] bg-gray-50 border border-gray-100"
        >
           <BarChart4 className="w-12 h-12 mx-auto mb-6 text-gray-300" />
           <h3 className="text-3xl font-black mb-4 tracking-tight">Need something custom?</h3>
           <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto font-medium">
             For enterprise projects, long-term partnerships, or specific creative needs, we offer bespoke engagement models.
           </p>
           <a href="mailto:letscreate.inksandinterfaces@gmail.com" 
              className="inline-block text-black font-black text-lg border-b-4 border-[#FFD700] pb-1 hover:bg-[#FFD700]/10 px-4 transition-all">
             Let's start a conversation
           </a>
        </motion.div>
      </div>
    </section>
  );
}
