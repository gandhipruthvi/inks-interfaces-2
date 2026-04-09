"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ExternalLink, X, Search, Filter } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Cursor from "@/components/ui/Cursor";

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

export default function ImaginationsPage() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [filter, setFilter] = useState("All");

  const caseStudies: CaseStudy[] = [
    {
      id: "go-miles",
      title: "Go Miles Redesign",
      subtitle: "UI/UX Design",
      description: "Revamping the Go Miles travel platform to improve user experience through a modern, intuitive interface.",
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
      subtitle: "Brand Identity Design",
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
      id: "globe-tap",
      title: "GlobeTap App",
      subtitle: "Mobile UI/UX Design",
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
    {
      id: "satori-bites",
      title: "Satori Bites Branding",
      subtitle: "Brand Identity Design",
      description: "A fusion of tradition and luxury for a modern Asian fine dining destination.",
      image: "/assets/satoribites/satoribites.webp",
      tags: ["Logo Design", "Luxury", "Culinary"],
      content: "Satori Bites branding project delivered a refined, elegant identity — balancing authenticity and warmth through logo, color, and typography.",
      challenge: "Creating a brand that honors Asian heritage while appealing to a discerning, contemporary fine-dining clientele.",
      approach: "Immersive research into traditional motifs combined with minimalist modern layouts and premium finishes.",
      results: "Elevated brand reputation and significantly increased high-end guest reservations.",
      gallery: ["/assets/satoribites/bag.webp","/assets/satoribites/box.webp","/assets/satoribites/apron.webp","/assets/satoribites/plate.webp","/assets/satoribites/tissue.webp","/assets/satoribites/card.webp"],
      link: "https://www.instagram.com/p/DIdxxs_hUhq/"
    },
    {
      id: "golden-crust",
      title: "Golden Crust Identity",
      subtitle: "Brand Identity Design",
      description: "Artisanal charm meets premium luxury for a boutique bakery experience.",
      image: "/assets/goldencrust/hoarding.webp",
      tags: ["Logo Design", "Artisanal", "Boutique"],
      content: "Golden Crust blends artisanal baking with premium elegance. The branding features a refined logo and soft, natural palette.",
      challenge: "Differentiating a local bakery in a crowded market by emphasizing craftsmanship and high-end ingredients.",
      approach: "Hand-crafted typography and earthy textures applied to eco-friendly, premium packaging systems.",
      results: "Instant local recognition and a 30% increase in recurring foot traffic following the rebrand.",
      gallery: ["/assets/goldencrust/bread.webp","/assets/goldencrust/banner.webp","/assets/goldencrust/menu.webp","/assets/goldencrust/crossaint.webp","/assets/goldencrust/tape.webp","/assets/goldencrust/store.webp"],
      link: "https://www.behance.net/gallery/219628279/Golden-Crust-Logo-Design-Branding"
    },
    {
      id: "pure-sip",
      title: "Pure Sip Packaging",
      subtitle: "Product Design",
      description: "Vibrant, refreshing packaging for a natural fruit beverage brand targeting health-conscious consumers.",
      image: "/assets/puresip/can.webp",
      tags: ["Product Design", "Beverage", "Organic"],
      content: "PureSip packaging captures the product's purity through bold geometric visuals and clean organic elements.",
      challenge: "Standing out in the competitive beverage aisle with a design that communicates 'real ingredients' instantly.",
      approach: "High-contrast color blocks and minimalist illustrations to create a powerful shelf presence.",
      results: "Increased product trials and expanded distribution to several major health-food retailers.",
      gallery: ["/assets/puresip/lemon.webp","/assets/puresip/halfgrape.webp","/assets/puresip/strawberry.webp","/assets/puresip/halfpear.webp","/assets/puresip/grapes.webp","/assets/puresip/pear.webp"],
      link: "https://www.instagram.com/p/DIJMhYSNqU5/"
    },
    {
      id: "vanya-luxe",
      title: "Vanya Luxe Branding",
      subtitle: "Brand Identity Design",
      description: "Elegant, organic brand identity for a premium beauty brand rooted in luxury and purity.",
      image: "/assets/vanyaluxe/tin.webp",
      tags: ["Beauty", "Luxury", "Organic"],
      content: "The branding captures organic sophistication, using earthy tones and minimalistic elegance for chemical-free beauty solutions.",
      challenge: "Balancing a 'natural' feel with 'high-end luxury' to attract discerning premium beauty customers.",
      approach: "Custom fine-line botanicals paired with weighted serif typography and gold-foiled packaging details.",
      results: "Successful launch into the luxury market with high social media engagement and influencer adoption.",
      gallery: ["/assets/vanyaluxe/tube.webp","/assets/vanyaluxe/dropper.webp","/assets/vanyaluxe/nailpolish.webp","/assets/vanyaluxe/bag.webp"],
      link: "https://www.behance.net/gallery/219086225/Vanya-Luxe-Logo-and-Branding"
    },
  ];

  const categories = ["All", "UI/UX Design", "Brand Identity Design", "Product Design"];
  const filteredCaseStudies = filter === "All" ? caseStudies : caseStudies.filter(s => s.subtitle === filter);

  return (
    <main className="min-h-screen bg-white overflow-visible">
      <Navbar />
      <Cursor />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-8 pb-20 pt-48">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gray-50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 mx-auto max-w-7xl">
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
           >
              <h1 className="mb-10 text-[3.2rem] sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none text-center">
                Imagination <br /> <span className="text-[#FFD700]">Manifested</span>
              </h1>
              <p className="mx-auto mb-16 max-w-3xl text-xl text-gray-500 font-medium leading-relaxed">
                Strategic design thinking meets artistic precision. <br />
                Scroll through our curated portfolio of industrial successes and creative transformations.
              </p>
           </motion.div>

           {/* Filter bar */}
           <div className="flex flex-wrap items-center justify-center gap-4 border-y border-gray-100 py-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    filter === cat ? "bg-black text-white shadow-xl scale-110" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* Enhanced Project Grid */}
      <section ref={ref} className="bg-white px-8 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
            {filteredCaseStudies.map((project, index) => (
              <ProjectGalleryCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedCaseStudy(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reusable Modal Component */}
      <CaseStudyModal selectedCaseStudy={selectedCaseStudy} onClose={() => setSelectedCaseStudy(null)} />
    </main>
  );
}

function ProjectGalleryCard({ project, index, onClick }: { project: CaseStudy; index: number; onClick: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 215, 0, 0.15), transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl transition-all duration-500 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.2 }}
      onClick={onClick}
    >
      {/* Interactive Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 z-0"
        style={{ background }}
      />

      {/* Project Image */}
      <div className="relative h-[450px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute top-8 left-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-md shadow-xl">
           <span className="text-xl font-black text-black">0{index + 1}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Project details */}
      <div className="relative z-10 p-10 flex flex-col items-start bg-white">
        <div className="flex gap-4 mb-6">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD700] bg-black px-5 py-2 rounded-full">
            {project.subtitle}
          </span>
        </div>

        <h3 className="mb-4 text-4xl font-black uppercase tracking-tight text-black group-hover:text-[#FFD700] transition-colors">{project.title}</h3>
        <p className="mb-8 text-lg text-gray-500 font-medium leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold text-gray-400"
            >
              #{tag}
            </span>
          ))}
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
              <X size={24} strokeWidth={3} />
            </button>
          </div>

          {/* Hero Header */}
          <div className="relative h-[45vh] min-h-[350px] w-full overflow-hidden -mt-24 sm:-mt-32">
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
                  
                  <div className="pt-10 flex flex-col gap-6">
                    {selectedCaseStudy.link && (
                      <a href={selectedCaseStudy.link} target="_blank" className="inline-flex items-center gap-6 text-black font-black uppercase tracking-[0.3em] text-sm group border-b-2 border-black pb-2 hover:border-[#FFD700] transition-all">
                        Explore Live <ExternalLink size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                      </a>
                    )}
                    <a href="mailto:letscreate.inksandinterfaces@gmail.com" className="inline-flex items-center gap-6 text-black font-black uppercase tracking-[0.3em] text-sm group border-b-2 border-black pb-2 hover:border-[#FFD700] transition-all">
                      Similar Inquiry <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>
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
