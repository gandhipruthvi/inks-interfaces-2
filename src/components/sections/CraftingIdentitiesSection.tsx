"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  PenTool, 
  PaintBucket, 
  Layout,
  Layers
} from "lucide-react";

interface CraftingIdentitiesSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

// SVG wave divider
const WaveDivider = ({ color }: { color: string }) => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform">
    <svg className="relative w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".25"
        fill={color}
      ></path>
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".5"
        fill={color}
      ></path>
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        fill={color}
      ></path>
    </svg>
  </div>
);

// Service card component
const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  bgColor, 
  glowColor,
  setIsHovering 
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode, 
  bgColor: string, 
  glowColor: string,
  setIsHovering: (isHovering: boolean) => void 
}) => (
  <motion.div
    className="rounded-[20px] overflow-hidden shadow-md transition-all duration-300 h-full flex flex-col"
    whileHover={{ 
      scale: 1.03,
      boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 15px 2px ${glowColor}`
    }}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className={`relative h-52 p-8 flex items-center justify-center ${bgColor}`}>
      <div className="text-white z-10 scale-150">
        {icon}
      </div>
      <WaveDivider color="white" />
    </div>
    <div className="bg-white p-8 flex-grow">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  </motion.div>
);

export default function CraftingIdentitiesSection({ setIsHovering }: CraftingIdentitiesSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  return (
    <section 
      ref={ref}
      className="relative py-24 bg-gray-50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">Crafting Identities</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Whether it's a brand that needs to stand out or an interface that needs to feel intuitive, I create designs that connect with your audience.
          </p>
        </motion.div>
        
        {/* Services Cards - Horizontal responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* UI/UX Design Card */}
          <ServiceCard 
            title="UI/UX Design"
            description="Beautiful, intuitive interfaces that make digital products a joy to use. I create user-centered experiences that delight and engage."
            icon={<Layout size={48} strokeWidth={1.5} />}
            bgColor="bg-gradient-to-br from-blue-300 to-blue-500"
            glowColor="rgba(96, 165, 250, 0.4)"
            setIsHovering={setIsHovering}
          />
          
          {/* Branding Card */}
          <ServiceCard 
            title="Branding"
            description="Comprehensive visual systems that bring consistency and recognition to your brand. From logos to complete identity packages."
            icon={<PenTool size={48} strokeWidth={1.5} />}
            bgColor="bg-gradient-to-br from-amber-300 to-yellow-500"
            glowColor="rgba(251, 191, 36, 0.4)"
            setIsHovering={setIsHovering}
          />
          
          {/* Graphic Design Card */}
          <ServiceCard 
            title="Graphic Design"
            description="Eye-catching visuals that tell your story across any medium. Print, digital, and everything in between - designed with purpose."
            icon={<Layers size={48} strokeWidth={1.5} />}
            bgColor="bg-gradient-to-br from-green-300 to-green-500"
            glowColor="rgba(34, 197, 94, 0.4)"
            setIsHovering={setIsHovering}
          />
        </div>
      </div>
    </section>
  );
}
