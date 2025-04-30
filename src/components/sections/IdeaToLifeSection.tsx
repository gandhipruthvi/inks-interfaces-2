import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  Search,
  Lightbulb,
  LayoutGrid,
  PaintBucket,
  MessageCircle,
  Package,
} from "lucide-react";

interface IdeaToLifeSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

// Step Data
const steps = [
  {
    id: 1,
    title: "Discovery",
    description: "Understanding your goals, audience, and brand voice.",
    icon: <Search className="h-12 w-12 text-indigo-600" />,
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
    icon: <Lightbulb className="h-12 w-12 text-yellow-500" />,
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
    icon: <LayoutGrid className="h-12 w-12 text-sky-500" />,
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
    description:
      "Bringing ideas to life with layouts, typography, and color palettes.",
    icon: <PaintBucket className="h-12 w-12 text-pink-500" />,
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
    description:
      "Sharing interactive prototypes to fine-tune usability and aesthetics.",
    icon: <MessageCircle className="h-12 w-12 text-green-500" />,
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
    description:
      "Providing polished, pixel-perfect designs ready for development.",
    icon: <Package className="h-12 w-12 text-neutral-600" />,
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
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h2 className="mb-4 text-4xl font-extrabold text-neutral-900 md:text-5xl">
          Design That Tells a Story
        </h2>
        <p className="text-lg font-medium text-neutral-600 md:text-xl">
          Our expertly crafted design process transforms visions into impactful
          realities, guiding every project from concept to completion.
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
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const activeCard = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const cardIndex = Math.round(value * steps.length);
      setActiveCardIndex(cardIndex);
      animate(activeCard, cardIndex, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const x = useTransform(activeCard, (index) =>
    index >= steps.length
      ? `-${steps.length * 100}%`
      : `-${Math.max(index, 0) * 100}%`,
  );

  // 👇 Adjust height based on number of cards (1 card = 100vh extra scroll)
  const sectionHeight = `${steps.length * 100}vh`;

  return (
    <section
      ref={targetRef}
      className="relative overflow-visible bg-gradient-to-br from-neutral-100 via-white to-indigo-50"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 z-10 flex h-screen items-center justify-center">
        <div className="horizontal-scroll w-full">
          <motion.div style={{ x }} className="flex w-full">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className="flex w-full flex-shrink-0 items-center justify-center"
              >
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
function ProcessCard({
  step,
  active,
}: {
  step: (typeof steps)[number];
  active: boolean;
}) {
  return (
    <div
      className="group relative flex max-w-[90vw] flex-col rounded-3xl border bg-white p-8 shadow-2xl"
      style={{
        boxShadow:
          "0 8px 32px 0 rgba(241,91,84,0.10), 0 1.5px 6px 0 rgba(80,80,80,0.07)",
      }}
    >
      <div className="absolute right-4 top-2 sm:right-6 sm:top-6 z-20">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border bg-gray-50">
          <span className="text-xs sm:text-sm font-semibold">{step.id}/6</span>
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <div className="rounded-2xl bg-gray-50 p-4">{step.icon}</div>
        <div className="ml-6">
          <h3 className="text-3xl font-bold text-neutral-800 mt-8 sm:mt-0">{step.title}</h3>
          <p className="mt-1 text-lg text-neutral-600">{step.description}</p>
        </div>
      </div>

      <div className="mb-6 h-2 w-full rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#F15B54] to-[#FBB97B]"
          style={{ width: `${step.progress * 100}%` }}
        />
      </div>

      <div className="flex-grow rounded-xl bg-gray-50 p-6">
        <h4 className="mb-4 text-lg font-semibold">Key Deliverables</h4>
        <ul className="space-y-3">
          {step.deliverables.map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="mr-3 mt-0.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <CheckIcon />
              </div>
              <span className="text-[1.13rem] font-normal text-neutral-700 md:text-lg">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
