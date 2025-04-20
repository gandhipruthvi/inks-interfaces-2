"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ValueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  index?: number;
}

export default function ValueCard({
  title,
  description,
  icon,
  color = "#FFD700",
  index = 0
}: ValueCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative p-8 bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{ 
          opacity: isHovered ? 0.05 : 0,
          background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` 
        }}
      />
      
      {/* Top right decoration */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 opacity-5"
        initial={{ rotate: 0 }}
        animate={isHovered ? { rotate: 90 } : { rotate: 0 }}
        transition={{ duration: 0.6 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="75" cy="25" r="60" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="75" cy="25" r="40" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="75" cy="25" r="20" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Icon */}
      <div className="relative mb-6">
        <motion.div
          className="p-3 w-16 h-16 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
          animate={isHovered ? { 
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
            rotate: [0, -5, 0],
          } : {}}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        >
          <motion.div
            className="text-black"
            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            {icon}
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative">
        <motion.h3 
          className="text-2xl font-bold mb-4"
          animate={isHovered ? { color } : { color: "#000" }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <p className="text-gray-700">{description}</p>
        
        {/* Bottom decoration line */}
        <motion.div 
          className="absolute -bottom-8 left-0 h-1 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isHovered ? { width: "50%" } : { width: "15%" }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
