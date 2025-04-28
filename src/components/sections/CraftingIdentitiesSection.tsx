"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PenTool, Layout, Layers } from "lucide-react";
import styles from "./WaveCard.module.css";

interface CraftingIdentitiesSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

const ServiceCard = ({
  title,
  description,
  icon,
  setIsHovering,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  setIsHovering: (isHovering: boolean) => void;
}) => (
  <div
    className={styles["wave-card"]}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    style={{
      background: "#fff",
      position: "relative",
      overflow: "hidden",
      minHeight: "500px",
    }}
  >
    <div className={styles["wave-card-shape"]}></div>
    <div className={styles["wave-card-shape"]}></div>
    <div className={styles["wave-card-shape"]}></div>
    <div
      style={{
        position: "relative",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        paddingTop: "48px",
        marginBottom: "48px", // Increased space below title
      }}
    >
      <div style={{ fontSize: "64px", color: "#555", marginBottom: "16px" }}>
        {icon}
      </div>
      <h3
        className={styles["wave-card-title"]}
        style={{
          fontSize: "28px",
          fontWeight: 700,
          background: "rgba(255,255,255,0.85)",
          borderRadius: "8px",
          padding: "8px 24px",
        }}
      >
        {title}
      </h3>
    </div>
    <p
      style={{
        position: "relative",
        zIndex: 10,
        fontSize: "20px", // Increased font size
        color: "#444",
        textAlign: "center",
        margin: "0 32px 48px 32px",
        minHeight: "80px",
        lineHeight: 1.7,
      }}
    >
      {description}
    </p>
  </div>
);

export default function CraftingIdentitiesSection({
  setIsHovering,
}: CraftingIdentitiesSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative bg-gray-50 py-24">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-20 w-full bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-5xl font-bold">Crafting Identities</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-700">
            Whether it's a brand that needs to stand out or an interface that
            needs to feel intuitive, I create designs that connect with your
            audience.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            title="UI/UX Design"
            description="Beautiful, intuitive interfaces that make digital products a joy to use. We create user-centered experiences that delight and engage."
            icon={<PenTool size={48} strokeWidth={1.5} />}
            setIsHovering={setIsHovering}
          />
          <ServiceCard
            title="Branding"
            description="Comprehensive visual systems that bring consistency and recognition to your brand. From logos to complete identity packages. Your brand story, visually unified."
            icon={<Layout size={48} strokeWidth={1.5} />}
            setIsHovering={setIsHovering}
          />
          <ServiceCard
            title="Graphic Design"
            description="Eye-catching visuals that tell your story across any medium. Print, digital, and everything in between - designed with purpose."
            icon={<Layers size={48} strokeWidth={1.5} />}
            setIsHovering={setIsHovering}
          />
        </div>
      </div>
    </section>
  );
}
