"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Pencil,
  Palette,
  PenTool,
  Film,
  Lightbulb,
  Zap,
  Users,
  Shield,
  ArrowRight,
  ChevronDown,
  Code,
  Sparkles,
  MessageCircle
} from "lucide-react";
import gsap from "gsap";
import Navbar from "@/components/ui/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import TypewriterText from "@/components/ui/TypewriterText";
import TeamMemberCard from "@/components/ui/TeamMemberCard";
import ValueCard from "@/components/ui/ValueCard";
import LottieAnimation from "@/components/ui/LottieAnimation";

export default function AboutPage() {
  // State for UI interactions
  const [isHovering, setIsHovering] = useState(false);
  const [activeTab, setActiveTab] = useState("branding");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // References for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);

  // Intersection observers for scroll-triggered animations
  const [heroInViewRef, heroInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [approachInViewRef, approachInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [teamInViewRef, teamInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [valuesInViewRef, valuesInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [ctaInViewRef, ctaInView] = useInView({ triggerOnce: false, threshold: 0.3 });

  // Track cursor position for custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // GSAP animation for flowing ink in hero section
  useEffect(() => {
    if (!heroRef.current || !heroInView) return;

    const heroElement = heroRef.current;
    const inkLines = heroElement.querySelectorAll('.ink-line');
    
    inkLines.forEach((line, index) => {
      gsap.fromTo(
        line,
        { 
          strokeDashoffset: 1000,
          opacity: 0
        },
        { 
          strokeDashoffset: 0,
          opacity: 0.8,
          duration: 2,
          delay: 0.5 + (index * 0.3),
          ease: "power2.inOut"
        }
      );
    });

    return () => {
      gsap.killTweensOf(inkLines);
    };
  }, [heroInView]);

  // Our team members data
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Creative Director",
      bio: "With over 15 years of experience in branding and UI design, Alex leads our creative vision with passion and precision.",
      fullBio: "Alex Morgan is the visionary force behind Inks & Interfaces, bringing over 15 years of experience in branding, UI design, and creative direction. After leading design teams at major tech companies and global agencies, Alex founded our studio with a mission to blend artful storytelling with strategic design thinking. Known for pushing creative boundaries while maintaining a keen eye for business objectives, Alex has transformed brands across technology, hospitality, and lifestyle sectors. Outside the studio, you'll find Alex exploring modern art galleries, mentoring emerging designers, and experimenting with traditional ink illustration techniques that inspire our studio's distinctive aesthetic.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      skills: ["Brand Strategy", "Creative Direction", "UI Design", "Typography", "Design Systems"],
      socialLinks: [
        { icon: <Instagram size={16} />, url: "#" },
        { icon: <Linkedin size={16} />, url: "#" },
        { icon: <Twitter size={16} />, url: "#" }
      ]
    },
    {
      name: "Jordan Lee",
      role: "UI/UX Lead",
      bio: "Jordan combines technical expertise with user empathy to create digital experiences that delight and perform.",
      fullBio: "Jordan Lee brings a unique blend of technical knowledge and human-centered design thinking to every project. With a background in cognitive psychology and computer science, Jordan specializes in translating complex user needs into intuitive, accessible interfaces. Previously leading UX at several successful startups, Jordan has developed a reputation for creating experiences that not only look beautiful but deliver measurable results through improved user engagement and conversion. Jordan leads our research and testing processes, ensuring that aesthetics are always balanced with usability. A passionate advocate for design systems, Jordan has spoken at several international UX conferences on creating scalable, consistent interface solutions.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      skills: ["UX Research", "Interaction Design", "Prototyping", "Usability Testing", "Accessibility"],
      socialLinks: [
        { icon: <Instagram size={16} />, url: "#" },
        { icon: <Linkedin size={16} />, url: "#" }
      ]
    },
    {
      name: "Taylor Wright",
      role: "Motion Designer",
      bio: "Taylor brings static designs to life through thoughtful animations that enhance usability and brand personality.",
      fullBio: "Taylor Wright is our motion design specialist, transforming static interfaces into dynamic, engaging experiences. With a background in film and animation, Taylor brings a cinematic perspective to digital interactions. Before joining Inks & Interfaces, Taylor created motion systems for major entertainment brands and tech companies, developing a signature style that balances expression with purpose. Taylor leads our motion language development, carefully crafting animations that reinforce brand identity while enhancing user experience. A continuous learner, Taylor stays at the forefront of emerging motion technologies, recently specializing in 3D integration for web interfaces. Taylor also leads internal workshops on animation principles and teaches motion design at the local art institute.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      skills: ["Motion Design", "Animation", "Interaction Design", "3D Modeling", "Video Editing"],
      socialLinks: [
        { icon: <Instagram size={16} />, url: "#" },
        { icon: <Twitter size={16} />, url: "#" }
      ]
    },
    {
      name: "Cameron Silva",
      role: "Brand Strategist",
      bio: "Cameron helps clients discover and articulate their authentic brand voice through strategic thinking and market insight.",
      fullBio: "Cameron Silva is our strategic powerhouse, bridging the gap between business objectives and creative execution. With experience spanning marketing, communications, and brand management, Cameron ensures that every aspect of our work serves a clear purpose. Having developed brand strategies for companies ranging from tech startups to global lifestyle brands, Cameron brings a wealth of cross-industry insights to our projects. Cameron leads our discovery workshops, helping clients articulate their vision and translate business challenges into creative opportunities. A gifted communicator, Cameron maintains strong client relationships throughout the project lifecycle, ensuring that our work remains aligned with evolving business needs. Cameron frequently contributes to industry publications on branding trends and the business impact of design.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      skills: ["Brand Strategy", "Market Research", "Content Strategy", "Storytelling", "Client Relations"],
      socialLinks: [
        { icon: <Linkedin size={16} />, url: "#" },
        { icon: <Mail size={16} />, url: "#" }
      ]
    }
  ];

  // Our core values data
  const values = [
    {
      title: "Excellence",
      description: "We pursue the highest standards in everything we create, balancing aesthetics with function to deliver exceptional results.",
      icon: <Sparkles size={32} />,
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
  ];

  // Creative approach tabs data
  const approachTabs = [
    {
      id: "branding",
      title: "Brand Identity",
      description: "We create distinctive visual identities that communicate your company's essence and resonate with your audience.",
      icon: <Palette size={24} />,
      color: "#FFB800",
      steps: [
        "Brand Strategy & Positioning",
        "Visual Identity Development",
        "Logo & Mark Creation",
        "Typography & Color Systems",
        "Brand Guidelines"
      ]
    },
    {
      id: "uxui",
      title: "UX/UI Design",
      description: "Our user-centered approach balances beautiful aesthetics with intuitive functionality to create engaging digital experiences.",
      icon: <Pencil size={24} />,
      color: "#4F46E5",
      steps: [
        "User Research & Persona Development",
        "Information Architecture",
        "Wireframing & User Flows",
        "High-fidelity UI Design",
        "Prototyping & User Testing"
      ]
    },
    {
      id: "motion",
      title: "Motion Design",
      description: "We breathe life into static designs through purposeful animation that enhances storytelling and user engagement.",
      icon: <Film size={24} />,
      color: "#10B981",
      steps: [
        "Motion Strategy & Storyboarding",
        "Animation Style Development",
        "Interaction Design",
        "Micro-interactions",
        "Motion Guidelines"
      ]
    },
    {
      id: "development",
      title: "Development",
      description: "Our technical expertise ensures your designs are implemented with precision, performance, and responsiveness.",
      icon: <Code size={24} />,
      color: "#F43F5E",
      steps: [
        "Technology Consultation",
        "Frontend Development",
        "Custom Component Libraries",
        "CMS Integration",
        "Performance Optimization"
      ]
    }
  ];

  // Process steps animation
  const processSteps = approachTabs.find(tab => tab.id === activeTab)?.steps || [];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processSteps.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [processSteps.length, activeTab]);

  // Custom cursor with ink drip effect
  const CustomCursor = () => {
    return (
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.8,
          stiffness: 200
        }}
      >
        {/* Main cursor */}
        <motion.div 
          className="relative w-8 h-8 rounded-full"
          animate={{
            scale: isHovering ? 1.5 : 1,
            backgroundColor: isHovering ? "#FFD700" : "#000"
          }}
        >
          {/* Cursor trails */}
          <AnimatePresence>
            {isHovering && (
              <>
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 bg-black"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "10px", opacity: 0.6 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  };

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll();
  const heroTitleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar setIsHovering={setIsHovering} />
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden"
      >
        {/* Animated background */}
        <AnimatedBackground variant="ink" intensity="light" />

        {/* SVG ink lines animation */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="ink-line" d="M-100,500 Q150,350 300,500 T700,600 T1100,400 T1500,600 T2000,500" stroke="#000" strokeWidth="3" fill="none" strokeDasharray="1000" strokeDashoffset="1000" />
            <path className="ink-line" d="M-100,700 Q200,600 400,700 T800,800 T1200,600 T1600,800 T2000,700" stroke="#FFD700" strokeWidth="2" fill="none" strokeDasharray="1000" strokeDashoffset="1000" />
            <path className="ink-line" d="M-100,300 Q300,200 500,300 T900,400 T1300,200 T1700,400 T2100,300" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="1000" strokeDashoffset="1000" />
          </svg>
        </div>
        
        {/* Main content */}
        <div
          ref={heroInViewRef}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <motion.div
            style={{ y: heroTitleY }}
            className="mb-6"
          >
            <motion.h1 
              className="text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              Where <span className="text-[#FFD700]">Creativity</span> Meets <span className="text-[#FFD700]">Strategy</span>
            </motion.h1>

            <motion.div
              className="text-2xl text-gray-700 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <TypewriterText
                text="We transform ideas into extraordinary digital experiences that elevate brands and connect with audiences."
                speed={30}
                delay={800}
                className="inline"
              />
            </motion.div>
          </motion.div>

          {/* Animated services display */}
          <motion.div 
            className="mt-16 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="relative flex justify-center gap-8">
              {["Brand Strategy", "UI/UX Design", "Motion Design", "Web Development", "Digital Marketing"].map((service, index) => (
                <motion.div
                  key={service}
                  className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg font-medium"
                  initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                  animate={heroInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1 + (index * 0.1),
                    type: "spring",
                    damping: 15
                  }}
                >
                  {service}
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

      {/* Creative Approach Section - with diagonal cuts and interactive tabs */}
      <section
        ref={approachRef}
        className="relative py-32 bg-white overflow-hidden clip-diagonal"
      >
        {/* Background pattern */}
        <AnimatedBackground variant="dots" intensity="medium" />
        
        <div
          ref={approachInViewRef}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={approachInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl font-bold mb-6">Our Creative Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We blend strategic thinking with creative execution to craft digital experiences 
              that are both beautiful and effective.
            </p>
          </motion.div>
          
          {/* Service tabs */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {approachTabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  className={`relative px-8 py-4 rounded-xl flex items-center gap-3 ${
                    activeTab === tab.id
                      ? "bg-white shadow-lg"
                      : "bg-gray-50 hover:bg-white hover:shadow-md"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={approachInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      activeTab === tab.id ? "text-white" : "text-gray-600 bg-white"
                    }`}
                    style={{ 
                      backgroundColor: activeTab === tab.id ? tab.color : "" 
                    }}
                  >
                    {tab.icon}
                  </div>
                  
                  <div className="text-left">
                    <h3 className={`font-bold ${activeTab === tab.id ? "text-black" : "text-gray-700"}`}>
                      {tab.title}
                    </h3>
                  </div>
                  
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                      style={{ backgroundColor: tab.color }}
                      layoutId="activeTabIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Active tab content with animation */}
          <AnimatePresence mode="wait">
            {approachTabs.map((tab) => {
              if (tab.id !== activeTab) return null;
              
              return (
                <motion.div
                  key={tab.id}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Left side - Process animation */}
                  <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                    <div className="relative h-[400px] flex items-center justify-center">
                      {/* Center circle */}
                      <div 
                        className="w-32 h-32 rounded-full flex items-center justify-center z-10 shadow-lg"
                        style={{ backgroundColor: tab.color }}
                      >
                        <div className="text-white text-5xl">
                          {tab.icon}
                        </div>
                      </div>
                      
                      {/* Animated steps */}
                      {processSteps.map((step, index) => {
                        // Calculate position around the circle
                        const angle = (index * (360 / processSteps.length) * Math.PI) / 180;
                        const radius = 160; // Distance from center
                        const x = radius * Math.cos(angle);
                        const y = radius * Math.sin(angle);
                        const isActive = index === currentStep;
                        
                        return (
                          <motion.div
                            key={step}
                            className="absolute flex items-center justify-center"
                            style={{
                              left: "calc(50% + " + x + "px)",
                              top: "calc(50% + " + y + "px)",
                              transform: "translate(-50%, -50%)"
                            }}
                            initial={{ opacity: 0.7, scale: 0.9 }}
                            animate={isActive ? 
                              { 
                                opacity: 1, 
                                scale: 1.1,
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                              } : { 
                                opacity: 0.7, 
                                scale: 0.9,
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
                              }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            <div 
                              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                                isActive 
                                  ? "bg-white text-black font-bold" 
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {step}
                            </div>
                            
                            {/* Line connecting to center */}
                            <div 
                              className="absolute top-1/2 left-1/2 h-0.5 origin-left"
                              style={{
                                width: radius,
                                transform: `translateY(-50%) translateX(-50%) rotate(${angle + Math.PI}rad)`,
                                backgroundColor: isActive ? tab.color : "#E5E7EB"
                              }}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Right side - Content */}
                  <div>
                    <motion.h3 
                      className="text-3xl font-bold mb-6"
                      animate={{ color: tab.color }}
                    >
                      {tab.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-xl text-gray-700 mb-8"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {tab.description}
                    </motion.p>
                    
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {processSteps.map((step, idx) => (
                        <motion.div 
                          key={step}
                          className="flex gap-4 items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (idx * 0.1) }}
                        >
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              currentStep === idx 
                                ? "bg-black text-white" 
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <p className={`${currentStep === idx ? "font-bold" : ""}`}>
                            {step}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    <motion.button
                      className="mt-12 px-8 py-4 flex items-center gap-2 rounded-xl text-white"
                      style={{ backgroundColor: tab.color }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <span>Learn More</span>
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Team Showcase - with interactive flip cards */}
      <section
        className="relative py-32 bg-gray-50 clip-diagonal-reverse"
      >
        <div
          ref={teamInViewRef}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={teamInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <LottieAnimation
                src="https://assets7.lottiefiles.com/packages/lf20_boJDP9kcft.json"
                className="w-24 h-24 mx-auto"
              />
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collective of passionate creatives, strategists, and technologists dedicated to crafting 
              meaningful digital experiences.
            </p>
          </motion.div>
          
          {/* Team grid with interactive cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                bio={member.bio}
                fullBio={member.fullBio}
                image={member.image}
                skills={member.skills}
                socialLinks={member.socialLinks}
                index={index}
              />
            ))}
          </div>
          
          {/* Join the team button */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              className="px-8 py-4 bg-black text-white rounded-xl flex items-center gap-2 mx-auto"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span>Join Our Team</span>
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Values Section - with animated illustrations */}
      <section
        className="relative py-32 bg-white"
      >
        {/* Background pattern */}
        <AnimatedBackground variant="grid" intensity="light" />
        
        <div
          ref={valuesInViewRef}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide our work and shape our approach to every project we undertake.
            </p>
          </motion.div>
          
          {/* Values grid with animated cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
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

      {/* Call-to-Action Section - with interactive elements */}
      <section
        className="relative py-32 bg-black text-white clip-diagonal"
      >
        <div
          ref={ctaInViewRef}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl font-bold mb-6"
              animate={ctaInView ? {
                color: ["#FFFFFF", "#FFD700", "#FFFFFF"],
                transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              } : {}}
            >
              Let's Create Something Extraordinary
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ready to transform your brand with memorable digital experiences? Connect with us to start the conversation.
            </motion.p>
          </motion.div>
          
          {/* Contact cards with interactive hover */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.a
              href="mailto:hello@inksandinterfaces.com"
              className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center justify-center hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-[#FFD700] transition-colors">
                <Mail size={24} className="text-white group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-300 group-hover:text-white transition-colors">hello@inksandinterfaces.com</p>
            </motion.a>
            
            <motion.a
              href="tel:+12125551234"
              className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center justify-center hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-[#FFD700] transition-colors">
                <Phone size={24} className="text-white group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-300 group-hover:text-white transition-colors">+1 (212) 555-1234</p>
            </motion.a>
            
            <motion.a
              href="#"
              className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center justify-center hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-[#FFD700] transition-colors">
                <MessageCircle size={24} className="text-white group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chat With Us</h3>
              <p className="text-gray-300 group-hover:text-white transition-colors">Live chat available 9am-5pm EST</p>
            </motion.a>
          </div>
          
          {/* Social links */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.a
              href="#"
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              whileHover={{ scale: 1.2, rotate: 10 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Instagram size={20} />
            </motion.a>
            <motion.a
              href="#"
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              whileHover={{ scale: 1.2, rotate: -10 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Twitter size={20} />
            </motion.a>
            <motion.a
              href="#"
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              whileHover={{ scale: 1.2, rotate: 10 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Linkedin size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>
      
      {/* Add styles for diagonal clips */}
      <style jsx global>{`
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 95%);
        }
        
        .clip-diagonal-reverse {
          clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @media (hover: hover) {
          .hover\\:rotate-y-180:hover {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </main>
  );
}
