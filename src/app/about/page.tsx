"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Heart,
  Lightbulb,
  Users,
  Shield,
  ArrowRight,
  ChevronDown,
  Award,
  Briefcase,
  Star
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Cursor from "@/components/ui/Cursor";
import TypewriterText from "@/components/ui/TypewriterText";
import ValueCard from "@/components/ui/ValueCard";

export default function AboutPage() {
  // Essential state
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Intersection observers for scroll-triggered animations
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.2 });
  const [teamRef, teamInView] = useInView({ threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3 });

  // Track cursor position for custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Company overview data
  const companyOverview = {
    mission: "To transform brand visions into meaningful digital experiences through thoughtful design, strategic thinking, and creative storytelling.",
    vision: "A world where every digital interaction is both beautiful and purposeful, creating lasting connections between brands and their audiences.",
    established: "2015",
    expertise: ["Brand Identity", "UI/UX Design", "Motion Graphics", "Digital Strategy", "Web Development"],
    values: [
      {
        title: "Excellence",
        description: "We pursue the highest standards in everything we create, balancing aesthetics with function to deliver exceptional results.",
        icon: <Star size={32} />,
        color: "#FFB800"
      },
      {
        title: "Collaboration",
        description: "We believe the best work emerges from meaningful partnerships with our clients and cross-disciplinary teamwork.",
        icon: <Users size={32} />,
        color: "#4F46E5"
      },
      {
        title: "Innovation",
        description: "We embrace creative challenges and constantly explore new approaches to solve complex design problems.",
        icon: <Lightbulb size={32} />,
        color: "#10B981"
      },
      {
        title: "Integrity",
        description: "We maintain transparency throughout our process and take responsibility for the impact of our work.",
        icon: <Shield size={32} />,
        color: "#F43F5E"
      }
    ]
  };

  // Team members data (simplified)
  const teamMembers = [
    {
      name: "Alexandra Morgan",
      role: "Founder & Creative Director",
      bio: "With over 15 years of experience in branding and UI design, Alexandra leads our creative vision with passion and precision.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Jordan Lee",
      role: "UI/UX Lead",
      bio: "Jordan combines technical expertise with user empathy to create digital experiences that delight and perform.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Taylor Wright",
      role: "Motion Designer",
      bio: "Taylor brings static designs to life through thoughtful animations that enhance usability and brand personality.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Cameron Silva",
      role: "Brand Strategist",
      bio: "Cameron helps clients discover and articulate their authentic brand voice through strategic thinking and market insight.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll();
  const heroTitleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar setIsHovering={setIsHovering} />
      
      {/* Custom cursor */}
      <Cursor position={cursorPosition} isHovering={isHovering} />
      
      {/* Hero Section - Simplified */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 bg-gray-50"
      >
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            style={{ y: heroTitleY }}
            className="mb-12"
          >
            <motion.h1 
              className="text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              Our <span className="text-[#FFD700]">Story</span>
            </motion.h1>

            <motion.div
              className="text-2xl text-gray-700 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <TypewriterText
                text="Excellence in design since 2015."
                speed={40}
                delay={800}
                className="inline"
              />
            </motion.div>
            
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              At Inks & Interfaces, we believe design is more than aesthetics—it's about crafting meaningful experiences that drive business success.
            </motion.p>
          </motion.div>

          {/* Company statistics */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="grid grid-cols-4 gap-6">
              {[
                { number: "8+", label: "Years of Excellence" },
                { number: "120+", label: "Projects Delivered" },
                { number: "50+", label: "Happy Clients" },
                { number: "15", label: "Creative Experts" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white p-6 rounded-lg shadow-sm"
                  initial={{ y: 30, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                >
                  <div className="text-3xl font-bold text-[#FFD700] mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-700">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { 
              opacity: [0.5, 1, 0.5], 
              y: [10, 20, 10] 
            } : {}}
            transition={{ 
              duration: 2,
              delay: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <p className="text-sm text-gray-600">Scroll to explore</p>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </div>
      </section>
      
      {/* Mission & Vision - Simplified */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-12">
            <motion.div
              className="p-10 rounded-lg border border-gray-100"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="inline-block mr-3 p-2 rounded-full bg-[#FFD700]/10">
                  <Heart className="text-[#FFD700]" />
                </span>
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">{companyOverview.mission}</p>
            </motion.div>
            
            <motion.div
              className="p-10 rounded-lg border border-gray-100"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="inline-block mr-3 p-2 rounded-full bg-[#FFD700]/10">
                  <Lightbulb className="text-[#FFD700]" />
                </span>
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">{companyOverview.vision}</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Company Values - Simplified */}
      <section className="py-24 bg-gray-50" ref={valuesRef}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The principles that guide our work and relationships
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-8">
            {companyOverview.values.map((value, index) => (
              <ValueCard
                key={value.title}
                title={value.title}
                description={value.description}
                icon={value.icon}
                color={value.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section - Simplified */}
      <section className="py-24 bg-white" ref={teamRef}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Meet the people behind our exceptional work
            </p>
          </motion.div>
          
          <div className="grid grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-lg overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Team member image */}
                <div className="h-52 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                {/* Team member info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <div className="text-[#FFD700] font-medium mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm line-clamp-3">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
