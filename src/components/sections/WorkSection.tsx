"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ExternalLink } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  content: string;
  challenge: string;
  approach: string;
  results: string;
  link?: string;
  gallery?: string[];
}

export default function WorkSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: "gomiles",
      title: "Go Miles Redesign",
      subtitle: "UI/UX Design",
      description: "A modern, intuitive travel platform redesign focused on seamless user experience.",
      image: "/assets/gomiles/gomiles.webp",
      tags: ["Responsive Design", "Travel", "User-Experience"],
      content: "A complete overhaul centered on making travel planning effortless, featuring high-contrast visuals and clean layouts.",
      challenge: "Transforming a legacy travel portal into a modern, competitive digital experience while maintaining brand trust.",
      approach: "User journey mapping followed by high-fidelity prototyping and a clean, mobile-first design philosophy.",
      results: "Increased user retention and a significant uplift in booking completion rates across all devices.",
      gallery: ["/assets/gomiles/gomileslanding.webp", "/assets/gomiles/gomileseurope.webp", "/assets/gomiles/gomilesabout.webp", "/assets/gomiles/gomilesblogs.webp", "/assets/gomiles/gomilesposts.webp"],
    },
    {
      id: "zestee",
      title: "Zestee Identity",
      subtitle: "Brand Design",
      description: "Crafting a vibrant and energetic visual language for Zestee Café, from logo to social strategy.",
      image: "/assets/zestee/zestee.webp",
      tags: ["Logo Design", "Branding", "Premium"],
      content: "The Zestee identity captures the café's lively personality through custom typography and a bold color story.",
      challenge: "Standing out in a highly competitive boutique café market with a unique and memorable brand signature.",
      approach: "Extensive moodboarding and iterative logo exploration leading to a versatile system for physical and digital use.",
      results: "Instant brand recognition in the local market and high social media engagement following the relaunch.",
      gallery: ["/assets/zestee/cafe.webp","/assets/zestee/coffeecup.webp","/assets/zestee/ig.webp","/assets/zestee/packet.webp","/assets/zestee/apron.webp","/assets/zestee/board.webp"],
      link: "https://www.instagram.com/p/DIOcsvutVqN/"
    },
    {
      id: "lcm",
      title: "LCM Platform",
      subtitle: "UI/UX Design",
      description: "An inclusive, accessible digital experience for Lab Coat Media, prioritizing WCAG compliance.",
      image: "/assets/lcm/lcm.webp",
      tags: ["Accessibility", "Web Design", "Responsive"],
      content: "Building an accessible-first platform that ensures everyone, regardless of ability, has an equal digital experience.",
      challenge: "Merging high-end aesthetics with strict accessibility requirements without compromising on either.",
      approach: "Collor contrast audits and keyboard-first navigation testing integrated into the core design sprint.",
      results: "A 100% accessibility score and record-breaking positive feedback from community focus groups.",
      gallery: ["/assets/lcm/lcmlanding.webp","/assets/lcm/blog.webp","/assets/lcm/detail.webp"],
    },
    {
      id: "globetap",
      title: "GlobeTap App",
      subtitle: "Mobile Design",
      description: "Streamlining mobile travel planning with GlobeTap — a sleek, gesture-driven trip assistant.",
      image: "/assets/globetap/globetap.webp",
      tags: ["App Design", "Travel", "Figma"],
      content: "A mobile interface designed for travelers on the move, with effortless navigation and intuitive workflows.",
      challenge: "Condensing complex trip management features into a minimal, non-cluttered mobile interface.",
      approach: "Focused on thumb-driven navigation and real-time data visualization through clean UI components.",
      results: "App Store recognition for outstanding UI and high daily active user counts post-launch.",
      gallery: ["/assets/globetap/allscreens.webp","/assets/globetap/twophones.webp","/assets/globetap/black.webp","/assets/globetap/stairs.webp","/assets/globetap/liephone.webp"],
      link: "https://www.behance.net/gallery/220216243/GlobeTap-UIUX-Design-and-Branding"
    },
  ];

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
  };

  const closeModal = () => {
    setSelectedCaseStudy(null);
  };

  return (
    <section ref={ref} className="relative bg-white py-32 overflow-visible" id="work">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:w-2/3"
          >
            <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight uppercase leading-none">
               Work <span className="text-[#FFD700]">Worth</span> <br /> Watching
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
              Scroll through our featured projects to see how strategic design thinking translates into business success and memorable user journeys.
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
               <span className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Selected Work</span>
            </div>
          </motion.div>
        </div>

        <div 
          ref={containerRef}
          className="relative space-y-[20vh] pb-[10vh]"
        >
          {caseStudies.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={() => handleCaseStudyClick(project)} 
            />
          ))}
        </div>

        {/* Global CTA */}
        <motion.div
          className="mt-32 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="/imaginations"
            className="group inline-flex items-center gap-6 rounded-[2rem] bg-black px-12 py-6 text-lg font-black uppercase tracking-widest text-white shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore All Projects
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      <CaseStudyModal selectedCaseStudy={selectedCaseStudy} onClose={closeModal} />
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: CaseStudy; index: number; onClick: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 215, 0, 0.15), transparent 80%)`;

  // Static stacking logic: all cards stick at the same top position
  const topSticky = 120; // Identical top offset for direct overlap stacking

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="sticky group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl transition-all duration-500 hover:shadow-black/10 min-h-[580px] h-[75vh] lg:h-[70vh]"
      style={{ top: `${topSticky}px` }}
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Interactive Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 z-0"
        style={{ background }}
      />

      <div className="flex h-full flex-col lg:flex-row relative z-10">
        {/* Left: Project Image */}
        <div className="lg:w-1/2 relative overflow-hidden h-[45%] lg:h-full min-h-[300px]">
           <motion.img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute top-8 left-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-md shadow-xl">
               <span className="text-xl font-black text-black">0{index + 1}</span>
            </div>
        </div>

        {/* Right: Project Details */}
        <div className="lg:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-start items-start h-full">
          <div className="mb-4">
             <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD700] bg-black px-4 py-1.5 rounded-full">
                   {project.subtitle}
                </span>
                <div className="flex gap-2">
                 {project.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="text-xs font-bold text-gray-400">#{tag}</span>
                 ))}
               </div>
             </div>

             <h3 className="text-3xl lg:text-6xl font-black text-black tracking-tight uppercase mb-8 leading-none">
               {project.title}
             </h3>
             <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
               {project.description}
             </p>
          </div>

          <motion.button
            onClick={onClick}
            className="mt-auto flex items-center gap-4 rounded-2xl bg-black px-12 py-5 text-sm font-black uppercase tracking-widest text-white hover:bg-[#FFD700] hover:text-black transition-all duration-300 shadow-2xl"
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Project <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function CaseStudyModal({ selectedCaseStudy, onClose }: { selectedCaseStudy: CaseStudy | null; onClose: () => void }) {
  if (!selectedCaseStudy) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[3rem] bg-white shadow-2xl"
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Truly Sticky Close Button */}
          <div className="sticky top-0 right-0 z-[120] flex justify-end p-6 pointer-events-none">
            <button
               onClick={onClose}
               className="pointer-events-auto h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-[1.25rem] bg-black/50 sm:bg-white/10 backdrop-blur-md text-white hover:bg-[#FFD700] hover:text-black transition-all shadow-xl"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative h-[60vh] w-full -mt-24 sm:-mt-32">
            <img
              src={selectedCaseStudy.image}
              alt={selectedCaseStudy.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 z-10">
               <span className="text-xs font-black uppercase tracking-[0.3em] text-[#FFD700] mb-4 block">
                 {selectedCaseStudy.subtitle}
               </span>
               <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                 {selectedCaseStudy.title}
               </h2>
            </div>
          </div>

          <div className="p-8 sm:p-14 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
               <div className="lg:col-span-2 space-y-16">
                  <section>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#FFD700] mb-6">The Challenge</h3>
                    <p className="text-2xl text-gray-800 font-bold leading-relaxed">{selectedCaseStudy.challenge}</p>
                  </section>
                  <section>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Strategic Approach</h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">{selectedCaseStudy.approach}</p>
                  </section>
                  <section>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Final Output</h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">{selectedCaseStudy.results}</p>
                  </section>
               </div>
               
               <div className="space-y-12">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Expertise</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedCaseStudy.tags.map(tag => (
                        <span key={tag} className="px-6 py-3 rounded-full bg-gray-50 border border-gray-100 text-xs font-black text-black uppercase tracking-widest shadow-sm">
                           {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedCaseStudy.link && (
                    <a href={selectedCaseStudy.link} target="_blank" className="inline-flex items-center gap-6 text-black font-black uppercase tracking-[0.3em] text-sm group border-b-2 border-black pb-2 hover:border-[#FFD700] transition-all">
                       Explore Live <ExternalLink size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </a>
                  )}
               </div>
            </div>

            {selectedCaseStudy.gallery && (
              <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-10">
                 {selectedCaseStudy.gallery.map((img, i) => (
                   <motion.div 
                     key={i} 
                     className="rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10"
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.5 }}
                   >
                     <img src={img} alt="Gallery" className="w-full h-auto object-cover" />
                   </motion.div>
                 ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
