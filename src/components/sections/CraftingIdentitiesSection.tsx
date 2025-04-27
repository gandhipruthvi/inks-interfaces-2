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
import styles from './WaveCard.module.css';

const ServiceCard = ({
  title,
  description,
  icon,
  setIsHovering
}: {
  title: string,
  description: string,
  icon: React.ReactNode,
  setIsHovering: (isHovering: boolean) => void
}) => (
  <div
    className={styles['wave-card']}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    style={{ background: '#fff' }}
  >
    <div className={styles['wave-card-shape']}></div>
    <div className={styles['wave-card-shape']}></div>
    <div className={styles['wave-card-shape']}></div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 24, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
      <div style={{ fontSize: 44, color: '#555', marginBottom: 2 }}>{icon}</div>
      <h3 className={styles['wave-card-title']} style={{ fontSize: 22, fontWeight: 700, marginTop: 2, marginBottom: 8, background: 'rgba(255,255,255,0.85)', borderRadius: 6, padding: '0 8px' }}>{title}</h3>
    </div>
    <p style={{ position: 'relative', zIndex: 10, fontSize: 15, color: '#444', textAlign: 'center', margin: '0 16px 30px 16px', minHeight: 48 }}>{description}</p>
  </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Consultation Card */}
  <ServiceCard
    title="UI/UX Design"
    description="Beautiful, intuitive interfaces that make digital products a joy to use. We create user-centered experiences that delight and engage."
    icon={<PenTool size={32} strokeWidth={1.5} />}
    setIsHovering={setIsHovering}
  />
  {/* Develop Card */}
  <ServiceCard
    title="Branding"
    description="Comprehensive visual systems that bring consistency and recognition to your brand. From logos to complete identity packages. Your brand story, visually unified."
    icon={<Layout size={32} strokeWidth={1.5} />}
    setIsHovering={setIsHovering}
  />
  {/* Design Card */}
  <ServiceCard
    title="Graphic Design"
    description="Eye-catching visuals that tell your story across any medium. Print, digital, and everything in between - designed with purpose."
    icon={<Layers size={32} strokeWidth={1.5} />}
    setIsHovering={setIsHovering}
  />
</div>
      </div>
    </section>
  );
}
