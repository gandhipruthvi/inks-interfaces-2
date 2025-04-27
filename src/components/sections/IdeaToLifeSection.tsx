import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { Search, Lightbulb, LayoutGrid, PaintBucket, MessageCircle, Package } from "lucide-react";

interface IdeaToLifeSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

// Step Data
const steps = [
  {
    id: 1,
    title: "Discovery",
    description: "Understanding your goals, audience, and brand voice.",
    icon: <Search className="w-12 h-12 text-indigo-600" />,
    progress: 0,
    deliverables: [
      "Brand questionnaire & discovery",
      "Target audience analysis",
      "Project scope & timeline planning",
    ],
  },
  {
    id: 2,
    title: "Research & Inspiration",
    description: "Exploring trends and possibilities to spark original ideas.",
    icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
    progress: 0.2,
    deliverables: [
      "Competitive analysis report",
      "Mood boards & creative direction",
      "Design reference collection",
    ],
  },
  {
    id: 3,
    title: "Wireframing",
    description: "Outlining structure and user flow with low-fidelity mockups.",
    icon: <LayoutGrid className="w-12 h-12 text-sky-500" />,
    progress: 0.4,
    deliverables: [
      "Information architecture document",
      "User flow diagrams",
      "Low-fidelity wireframes",
    ],
  },
  {
    id: 4,
    title: "Visual Design",
    description: "Bringing ideas to life with layouts, typography, and color palettes.",
    icon: <PaintBucket className="w-12 h-12 text-pink-500" />,
    progress: 0.6,
    deliverables: [
      "Color palette & typography system",
      "High-fidelity design mockups",
      "Component design library",
    ],
  },
  {
    id: 5,
    title: "Prototype & Feedback",
    description: "Sharing interactive prototypes to fine-tune usability and aesthetics.",
    icon: <MessageCircle className="w-12 h-12 text-green-500" />,
    progress: 0.8,
    deliverables: [
      "Interactive clickable prototype",
      "Usability testing results",
      "Refinement recommendations",
    ],
  },
  {
    id: 6,
    title: "Final Delivery",
    description: "Providing polished, pixel-perfect designs ready for development.",
    icon: <Package className="w-12 h-12 text-neutral-600" />,
    progress: 1,
    deliverables: [
      "Final design assets & specifications",
      "Developer handoff documentation",
      "Implementation support",
    ],
  },
];

// Main Section
export default function IdeaToLifeSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">Design That Tells a Story</h2>
        <p className="text-lg md:text-xl text-neutral-600 font-medium">
          Our expertly crafted design process transforms visions into impactful realities, guiding every project from concept to completion.
        </p>
      </div>
      <HorizontalScrollCarousel />
    </section>
  );
}

// Carousel Logic
function HorizontalScrollCarousel() {
  const targetRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });
  const activeCard = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const cardIndex = Math.round(value * (steps.length));
      setActiveCardIndex(cardIndex);
      animate(activeCard, cardIndex, { type: "spring", stiffness: 300, damping: 30, mass: 0.5 });
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const x = useTransform(activeCard, (index) =>
    index >= steps.length ? `-${steps.length * 100}%` : `-${Math.max(index, 0) * 100}%`
  );

  // 👇 Adjust height based on number of cards (1 card = 100vh extra scroll)
  const sectionHeight = `${steps.length * 100}vh`;

  return (
    <section
      ref={targetRef}
      className="relative overflow-visible bg-gradient-to-br from-neutral-100 via-white to-indigo-50"
      style={{ height: sectionHeight }}
    >

      <div className="sticky top-0 h-screen flex items-center justify-center z-10">
        <div className="horizontal-scroll w-full">
          <motion.div style={{ x }} className="flex w-full">
            {steps.map((step, i) => (
              <div key={step.id} className="flex-shrink-0 w-full flex items-center justify-center">
                <ProcessCard step={step} active={i === activeCardIndex} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Individual Card
function ProcessCard({ step, active }: { step: typeof steps[number]; active: boolean }) {
  return (
    <div className="group relative h-[420px] max-w-[90vw] bg-white rounded-3xl shadow-2xl border p-8 flex flex-col" style={{boxShadow: '0 8px 32px 0 rgba(241,91,84,0.10), 0 1.5px 6px 0 rgba(80,80,80,0.07)'}}>
      <div className="absolute top-6 right-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 border">
          <span className="text-sm font-semibold">{step.id}/6</span>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="p-4 rounded-2xl bg-gray-50">{step.icon}</div>
        <div className="ml-6">
          <h3 className="text-3xl font-bold text-neutral-800">{step.title}</h3>
          <p className="text-lg text-neutral-600 mt-1">{step.description}</p>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full mb-6">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#F15B54] to-[#FBB97B]"
          style={{ width: `${step.progress * 100}%` }}
        />
      </div>

      <div className="bg-gray-50 rounded-xl p-6 flex-grow">
        <h4 className="font-semibold text-lg mb-4">Key Deliverables</h4>
        <ul className="space-y-3">
          {step.deliverables.map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="min-w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 mr-3 mt-0.5">
                <CheckIcon />
              </div>
              <span className="text-neutral-700 text-[1.13rem] md:text-lg font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}