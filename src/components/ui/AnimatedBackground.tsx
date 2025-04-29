"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  variant?: "ink" | "grid" | "dots";
  intensity?: "light" | "medium" | "strong";
  color?: string;
  secondaryColor?: string;
}

export default function AnimatedBackground({
  variant = "ink",
  intensity = "medium",
  color = "#000",
  secondaryColor = "#FFD700",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ink flow animation
  useEffect(() => {
    if (variant !== "ink" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = intensity === "light" ? 20 : intensity === "medium" ? 40 : 60;
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const opacity = Math.random() * 0.7 + 0.1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 12 + 8,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          opacity,
          color: Math.random() > 0.7 ? secondaryColor : color,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        let fillColor = `rgb(255, 191, 0)`;
        ctx.fillStyle = fillColor;
        ctx.fill();
        // Add a subtle outline for visibility
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(0,0,0,0.18)';
        ctx.stroke();
        
        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();
    
    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [variant, intensity, color, secondaryColor]);

  if (variant === "grid") {
    const gridIntensity = intensity === "light" ? 30 : intensity === "medium" ? 20 : 12;
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
            backgroundSize: `${gridIntensity}px ${gridIntensity}px`
          }}
        />
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-white via-transparent to-white" />
      </div>
    );
  }
  
  if (variant === "dots") {
    const dotSize = intensity === "light" ? 0.5 : intensity === "medium" ? 0.8 : 1;
    const dotSpacing = intensity === "light" ? 30 : intensity === "medium" ? 20 : 15;
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
            backgroundSize: `${dotSpacing}px ${dotSpacing}px`
          }}
        />
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-white via-transparent to-white" />
      </div>
    );
  }

  // Default is flowing ink animation with canvas
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: intensity === "light" ? 0.05 : intensity === "medium" ? 0.08 : 0.12 }}
    />
  );
}
