"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Lightbulb, Users, Shield, Star, ArrowRight, Quote } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Cursor from "@/components/ui/Cursor";

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [missionRef, missionInView] = useInView({ threshold: 0.2 });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1 });

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const stats = [
    { number: "4+", label: "Years of Experience" },
    { number: "100+", label: "Projects Delivered" },
    { number: "50+", label: "Global Clients" },
    { number: "100%", label: "In-house Crafted" }
  ];

  const values = [
    {
      title: "Impact",
      description: "We don't just design for screens; we design for business growth and meaningful human connection.",
      icon: <Star size={32} />,
    },
    {
      title: "Precision",
      description: "Pixel perfection is our baseline. We obsess over the details that others might overlook.",
      icon: <Target size={32} />,
    },
    {
      title: "Authenticity",
      description: "Every brand has a soul. Our job is to find it and bring it to life through visual storytelling.",
      icon: <Users size={32} />,
    },
    {
      title: "Velocity",
      description: "Moving fast without breaking things. Strategic design is built for the pace of modern business.",
      icon: <Zap size={32} />,
    }
  ];

  return (
    <main className="min-h-screen bg-white overflow-visible">
      <Navbar />
      <Cursor />
      
      {/* Editorial Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gray-50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div style={{ y: heroY }} className="flex flex-col lg:flex-row items-center justify-between gap-20">
            <div className="lg:w-1/2">
              <motion.span 
                className="text-xs font-black uppercase tracking-[0.4em] text-[#FFD700] mb-8 block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Est. 2021
              </motion.span>
              <motion.h1 
                className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] mb-12 uppercase"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Our <br /> <span className="text-[#FFD700]">Story</span>
              </motion.h1>
              <motion.p
                className="text-2xl text-gray-400 font-medium leading-relaxed max-w-xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We bridge the gap between creative <span className="text-black">Inks</span> and digital <span className="text-black">Interfaces</span>, crafting identities that resonate.
              </motion.p>
              
              <div className="flex items-center gap-10">
                 <div className="h-[2px] w-20 bg-black" />
                 <motion.button 
                   className="text-sm font-black uppercase tracking-widest hover:text-[#FFD700] transition-colors"
                   whileHover={{ x: 10 }}
                 >
                   Learn More
                 </motion.button>
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-2xl shadow-black/5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + (i * 0.1) }}
                >
                  <div className="text-5xl font-black text-black mb-2">{stat.number}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#FFD700]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Philosophy Section */}
      <section className="py-40 bg-black text-white relative overflow-hidden" ref={missionRef}>
         <Quote size={400} className="absolute -top-20 -left-20 opacity-[0.03] text-[#FFD700]" />
         
         <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
               <motion.div 
                 className="lg:w-1/2"
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8 }}
               >
                  <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
                    The <span className="text-[#FFD700]">Heart</span> <br /> Behind the Interface
                  </h2>
                  <div className="h-1 w-32 bg-[#FFD700]" />
               </motion.div>
               
               <motion.div 
                 className="lg:w-1/2 text-2xl lg:text-3xl font-light text-gray-400 leading-relaxed"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
               >
                  <p className="mb-10 text-white font-medium">
                    "Inks" represents our artistic soul, the raw creativity that sparks every project. "Interfaces" represents the precision of technology, the bridge to the user.
                  </p>
                  <p>
                    Since our inception, we have been obsessed with how these two worlds overlap. We believe every pixel should serve a purpose, and every purpose should be beautiful.
                  </p>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Values Stacking Refinement */}
      <section className="py-40 bg-white" ref={valuesRef}>
         <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {values.map((v, i) => (
                 <AboutValueCard key={v.title} value={v} index={i} />
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-gray-50 flex justify-center">
         <motion.div 
           className="text-center"
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
         >
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-12">
              Ready to <br /> <span className="text-[#FFD700]">Start a Story?</span>
            </h2>
            <motion.a 
              href="mailto:letscreate.inksandinterfaces@gmail.com"
              className="inline-flex items-center gap-6 bg-black text-white px-12 py-6 rounded-full text-lg font-black uppercase tracking-widest shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch <ArrowRight size={24} />
            </motion.a>
         </motion.div>
      </section>
    </main>
  );
}

function AboutValueCard({ value, index }: { value: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 215, 0, 0.1), transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative p-12 rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl shadow-black/5 flex flex-col items-center text-center overflow-hidden h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
       <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 z-0"
        style={{ background }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="h-20 w-20 flex items-center justify-center rounded-3xl bg-gray-50 text-gray-400 group-hover:bg-black group-hover:text-[#FFD700] transition-colors duration-500 mb-8">
           {value.icon}
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight mb-6">{value.title}</h3>
        <p className="text-gray-500 font-medium leading-relaxed">{value.description}</p>
      </div>
    </motion.div>
  );
}

// Missing icons for the redesigned list
const Target = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const Zap = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
