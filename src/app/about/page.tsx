"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Heart,
  Lightbulb,
  Users,
  Shield,
  Star
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Cursor from "@/components/ui/Cursor";
import TypewriterText from "@/components/ui/TypewriterText";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ValueCard from "@/components/ui/ValueCard";

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [heartRef, heartInView] = useInView({ threshold: 0.3 });
  const [missionRef, missionInView] = useInView({ threshold: 0.2 });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.2 });

  const companyOverview = {
    mission: "To transform brand visions into meaningful digital experiences through thoughtful design, strategic thinking, and creative storytelling.",
    vision: "A world where every digital interaction is both beautiful and purposeful, creating lasting connections between brands and their audiences.",
    values: [
      {
        title: "Excellence",
        description: "We pursue the highest standards in everything we create, balancing aesthetics with function to deliver exceptional results.",
        icon: <Star size={32} />,
        color: "#FFD700"
      },
      {
        title: "Collaboration",
        description: "We believe the best work emerges from meaningful partnerships with our clients and cross-disciplinary teamwork.",
        icon: <Users size={32} />,
        color: "#333333"
      },
      {
        title: "Innovation",
        description: "We embrace creative challenges and constantly explore new approaches to solve complex design problems.",
        icon: <Lightbulb size={32} />,
        color: "#FFD700"
      },
      {
        title: "Integrity",
        description: "We maintain complete transparency throughout our process and take full responsibility for the impact of our work.",
        icon: <Shield size={32} />,
        color: "#333333"
      }
    ]
  };

  const { scrollYProgress } = useScroll();
  const heroTitleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Cursor />
      
      {/* 1. Dynamic Interactive Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 bg-gray-50 overflow-hidden"
      >
        <AnimatedBackground variant="ink" intensity="medium" color="#000" secondaryColor="#FFD700" />
        
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-12">
          <motion.div
            style={{ y: heroTitleY }}
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            <div className="lg:w-1/2 text-left">
              <motion.h1 
                className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Our 
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-600">
                  Story
                </span>
              </motion.h1>

              <motion.div
                className="text-2xl sm:text-3xl font-medium text-gray-800 mb-6"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <TypewriterText
                  text="Excellence in design since 2021."
                  speed={40}
                  delay={800}
                />
              </motion.div>
              
              <motion.div
                className="w-20 h-2 bg-[#FFD700] mb-8"
                initial={{ width: 0 }}
                animate={heroInView ? { width: 80 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
              />

              <motion.p
                className="text-xl text-gray-600 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 1.2 }}
              >
                At Inks & Interfaces, we believe design is more than aesthetics—it's about crafting meaningful experiences that drive business success and lasting brand loyalty.
              </motion.p>
            </div>

            {/* Statistics Column */}
            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { number: "4+", label: "Years of Excellence" },
                { number: "100+", label: "Projects Delivered" },
                { number: "50+", label: "Happy Clients" },
                { number: "100%", label: "In-house Crafted" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300"
                  initial={{ y: 50, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.15) }}
                >
                  <div className="text-5xl font-black text-[#FFD700] mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-800">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* 2. The Heart Behind the Interface (50/50 Split) */}
      <section className="py-32 relative overflow-hidden bg-white" ref={heartRef}>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFD700]/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
            <motion.div 
              className="lg:w-5/12 lg:sticky lg:top-32"
              initial={{ opacity: 0, x: -30 }}
              animate={heartInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight relative">
                The Heart
                <span className="block text-[#FFD700] mt-2">Behind the</span>
                Interface
                <div className="absolute -left-6 top-4 w-2 h-full bg-[#FFD700]" />
              </h2>
            </motion.div>
            
            <motion.div 
              className="lg:w-7/12 text-xl sm:text-2xl text-gray-600 leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={heartInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="mb-8">
                We believe in the power of blending art with innovation. We are a creative and technology-driven studio passionate about building brands, crafting beautiful designs, and delivering intuitive digital experiences.
              </p>
              <p className="text-gray-900 font-normal">
                Our name says it all — <span className="font-bold">"Inks"</span> represents creativity, imagination, and design, while <span className="font-bold">"Interfaces"</span> reflects technology, function, and digital evolution.
              </p>
              <p className="mt-8">
                Together, they create a seamless bridge between ideas and execution, vision and experience, brands and people.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision - Glassmorphism floating cards */}
      <section className="py-24 bg-gray-900 relative text-white overflow-hidden" ref={missionRef}>
        <div className="absolute inset-0 z-0">
          <div className="absolute left-10 bottom-10 w-64 h-64 bg-[#FFD700]/20 rounded-full blur-[80px]" />
          <div className="absolute right-10 top-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#FFD700]/50 transition-colors duration-500 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center">
                <span className="inline-flex justify-center items-center w-16 h-16 mr-6 rounded-2xl bg-[#FFD700]/20 text-[#FFD700]">
                  <Heart size={32} />
                </span>
                Our Mission
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed font-light">{companyOverview.mission}</p>
            </motion.div>
            
            <motion.div
              className="p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#FFD700]/50 transition-colors duration-500 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8 flex items-center">
                <span className="inline-flex justify-center items-center w-16 h-16 mr-6 rounded-2xl bg-[#FFD700]/20 text-[#FFD700]">
                  <Lightbulb size={32} />
                </span>
                Our Vision
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed font-light">{companyOverview.vision}</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 4. Company Values - Staggered layout */}
      <section className="py-32 bg-gray-50 relative" ref={valuesRef}>
        <div className="absolute top-0 right-0 w-full h-1/2 bg-white -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl font-black mb-6">Our Code of <span className="text-[#FFD700]">Creativity</span></h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              The principles that govern our craft.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {companyOverview.values.map((value, index) => (
              <motion.div
                key={value.title}
                className={`relative ${index % 2 === 1 ? 'md:mt-16' : ''}`} // Staggered masonry effect
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <ValueCard
                  title={value.title}
                  description={value.description}
                  icon={value.icon}
                  color={value.color}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
