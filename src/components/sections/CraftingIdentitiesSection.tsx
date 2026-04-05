"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PenTool, Layout, Layers, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard = ({ title, description, icon, index }: ServiceCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 215, 0, 0.15), transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col p-10 bg-white rounded-[2.5rem] border border-gray-100 hover:border-[#FFD700]/50 transition-colors duration-500 shadow-sm hover:shadow-xl overflow-hidden"
    >
      {/* Animated Background Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 z-0"
        style={{ background }}
      />

      {/* Icon Wrapper */}
      <div className="relative z-10 mb-8 w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-50 group-hover:bg-[#FFD700] transition-colors duration-500 text-gray-400 group-hover:text-black">
        {icon}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow">
        <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{title}</h3>
        <p className="text-gray-500 text-lg leading-relaxed font-medium mb-8">
          {description}
        </p>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 flex items-center gap-2 text-black font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all duration-300">
        Discover more <ArrowRight size={16} />
      </div>

      {/* Decorative Ink Element */}
      <div className="absolute -bottom-6 -right-6 text-[#FFD700] opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
        {icon}
      </div>
    </motion.div>
  );
};

export default function CraftingIdentitiesSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const services = [
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces crafted with a human-centric approach. We turn complex requirements into elegant, effortless digital journeys.",
      icon: <PenTool size={32} strokeWidth={1.5} />
    },
    {
      title: "Branding",
      description: "Building iconic visual systems that define brand personality. From strategic research to complete identity systems that leave a lasting mark.",
      icon: <Layout size={32} strokeWidth={1.5} />
    },
    {
      title: "Graphic Design",
      description: "Impactful visual storytelling across all touchpoints. We blend art and strategy to create stunning visuals for print, digital, and social media.",
      icon: <Layers size={32} strokeWidth={1.5} />
    }
  ];

  return (
    <section ref={ref} className="relative bg-white py-32 overflow-hidden" id="services">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFD700]/5 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:w-2/3"
          >
            <h2 className="text-5xl lg:text-6xl font-black mb-8 tracking-tight">
              Crafting <span className="text-[#FFD700]">Identities</span> 
              <br />
              With Precision.
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
              From global brands to scaling startups, we build visual languages that speak louder than words. Our approach merges artistic vision with strategic function.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block"
          >
            <div className="flex items-center gap-10">
               <div className="h-[2px] w-24 bg-gray-100" />
               <span className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Services</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              index={index} 
              {...service} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
