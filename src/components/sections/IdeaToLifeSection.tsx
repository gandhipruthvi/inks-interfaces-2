"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  Search,
  Lightbulb,
  LayoutGrid,
  PaintBucket,
  MessageCircle,
  Package,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Discovery",
    description: "Understanding your goals, audience, and brand voice.",
    icon: <Search className="h-8 w-8" />,
    progress: 0.16,
    deliverables: [
      "Brand questionnaire",
      "Audience analysis",
      "Timeline planning",
    ],
  },
  {
    id: 2,
    title: "Research",
    description: "Exploring trends and possibilities to spark original ideas.",
    icon: <Lightbulb className="h-8 w-8" />,
    progress: 0.33,
    deliverables: [
      "Competitive analysis",
      "Mood boards",
      "Design references",
    ],
  },
  {
    id: 3,
    title: "Wireframing",
    description: "Outlining structure and user flow with low-fidelity mockups.",
    icon: <LayoutGrid className="h-8 w-8" />,
    progress: 0.50,
    deliverables: [
      "Information architecture",
      "User flow diagrams",
      "Wireframes",
    ],
  },
  {
    id: 4,
    title: "Visual Design",
    description:
      "Bringing ideas to life with layouts, typography, and color palettes.",
    icon: <PaintBucket className="h-8 w-8" />,
    progress: 0.66,
    deliverables: [
      "Color & Typography",
      "High-fi mockups",
      "Component library",
    ],
  },
  {
    id: 5,
    title: "Prototype",
    description:
      "Sharing interactive prototypes to fine-tune usability and aesthetics.",
    icon: <MessageCircle className="h-8 w-8" />,
    progress: 0.83,
    deliverables: [
      "Interactive prototype",
      "Usability testing",
      "Refinement docs",
    ],
  },
  {
    id: 6,
    title: "Final Delivery",
    description:
      "Providing polished, pixel-perfect designs ready for development.",
    icon: <Package className="h-8 w-8" />,
    progress: 1,
    deliverables: [
      "Design specifications",
      "Developer handoff",
      "Implementation support",
    ],
  },
];

export default function IdeaToLifeSection() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate horizontal translation
  // (Steps - 1) * 100vw to translate fully
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(steps.length - 1) * 100}%`]);

  return (
    <section className="bg-white overflow-visible" id="process">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-2/3"
          >
            <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight uppercase leading-none">
              Design That <span className="text-[#FFD700]">Tells a Story</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
              Our expertly crafted design process transforms visions into impactful
              realities, guiding every project from concept to completion.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block"
          >
            <div className="flex items-center gap-10">
               <div className="h-[2px] w-24 bg-gray-100" />
               <span className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Our Process</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={targetRef} className="relative h-[500vh] bg-gray-50/50">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <motion.div style={{ x }} className="flex w-full">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex w-screen flex-shrink-0 items-center justify-center px-6"
              >
                <ProcessCard step={step} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step }: { step: (typeof steps)[number] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255, 215, 0, 0.15), transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative flex w-full max-w-4xl flex-col rounded-[2.5rem] border border-gray-100 bg-white p-8 sm:p-12 shadow-2xl overflow-hidden"
    >
      {/* Interactive Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 z-0"
        style={{ background }}
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
        {/* Left Side: Header & Progress */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-[#FFD700] group-hover:text-black transition-colors duration-500">
              {step.icon}
            </div>
            <div>
               <span className="text-xs font-black text-[#FFD700] tracking-[0.2em] uppercase mb-1 block">
                Step 0{step.id}
              </span>
              <h3 className="text-3xl font-black text-black tracking-tight uppercase leading-none">
                {step.title}
              </h3>
            </div>
          </div>

          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
            {step.description}
          </p>

          <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              className="h-full bg-[#FFD700]"
              initial={{ width: 0 }}
              whileInView={{ width: `${step.progress * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>

        {/* Right Side: Key Deliverables */}
        <div className="w-full md:w-1/2 bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#FFD700] mb-6">Expert Deliverables</h4>
          <ul className="space-y-4">
            {step.deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 min-w-[1.5rem] items-center justify-center rounded-full bg-black text-[#FFD700]">
                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-gray-700 leading-tight">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Decorative Ink Element */}
      <div className="absolute -bottom-10 -right-10 text-[#FFD700] opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none scale-[2]">
        {step.icon}
      </div>
    </motion.div>
  );
}
