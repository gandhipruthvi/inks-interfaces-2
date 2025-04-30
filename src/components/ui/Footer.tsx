"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Dribbble, 
  Github,
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

interface FooterLink {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

import { useState, useEffect } from "react";

export default function Footer() {
  // Social media links with branded colors
  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/inks.and.interfaces/",
      color: "#E1306C"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/shivani-rotliwala",
      color: "#0A66C2"
    },
    {
      name: "Behance",
      icon: <img src="/assets/behance.png" alt="Behance" style={{ height: 20, width: 20 }} />,
      href: "https://www.behance.net/shivanirotliwala",
      color: "#0057ff"
    },
    {
      name: "GitHub",
      icon: <Github size={20} />,
      href: "https://github.com",
      color: "#333333"
    }
  ];

  // Footer navigation links
  const footerLinks: FooterLink[] = [
    {
      title: "Company",
      links: [
        { label: "Imaginations", href: "/imaginations" },
        { label: "About", href: "/about" },
      ]
    },
    {
      title: "Services",
      links: [
        { label: "UI/UX Design", href: "#ui-ux" },
        { label: "Brand Identity", href: "#branding" },
        { label: "Graphic Design", href: "#development" },
      ]
    },
    // {
    //   title: "Legal",
    //   links: [
    //     { label: "Privacy Policy", href: "#privacy" },
    //     { label: "Terms of Service", href: "#terms" },
    //   ]
    // }
  ];

  // State for showing/hiding the Back to Top button
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show button after scrolling down 200px
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top handler
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Top section with logo and company info */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-0 md:gap-0 overflow-hidden relative w-full">
          {/* Left side: Logo, mission, socials */}
          <div className="flex-1 bg-white flex flex-col justify-center z-10">
            <div className="flex items-center gap-2 mb-6 p-8 md:p-12 pb-0">
              <img
                src="/assets/inksinterfaces/logo.png"
                alt="Inks & Interfaces Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-600 mb-6 sm:mb-8 px-8 md:px-12">
              We transform ideas into exceptional digital experiences through thoughtful design
              and strategic creativity. Elevating brands with pixel-perfect precision and purpose.
            </p>
            <div className="flex flex-wrap gap-3 px-8 md:px-12 pb-8 md:pb-12">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:text-white transition-colors duration-300"
                  style={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                  whileHover={{ backgroundColor: social.color, scale: 1.1, color: "#FFFFFF", y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Blending gradient divider */}
          <div className="hidden md:block w-12 flex-shrink-0 relative z-20">
            <div className="absolute inset-0 h-full w-full" style={{ background: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.0) 50%, rgba(17,17,17,1) 100%)" }} />
          </div>

          {/* Right side: Global CTA */}
          <div className="flex-1 bg-black text-white flex flex-col justify-center z-10">
            <div className="text-center md:text-left px-8 md:px-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 mt-8 md:mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to Transform Your Brand?
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Let's create something extraordinary together. Our team is ready to bring your vision to life.
              </motion.p>
              <motion.button
                className="px-8 py-4 bg-[#FFD700] text-black font-bold rounded-xl text-lg md:text-xl shadow-lg hover:scale-105 transition-all duration-300 mb-8 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Middle section with site links */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12 border-t border-gray-100">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {footerLinks.map((category) => (
            <div key={category.title}>
              <h5 className="font-bold text-lg mb-5">{category.title}</h5>
              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link.label} className="touch-target">
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-black transition-colors flex items-center group py-1.5"
                    >
                      <ChevronRight 
                        size={16} 
                        className="mr-1 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact information */}
          <div>
            <h5 className="font-bold text-lg mb-5">Contact</h5>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:letscreate.inksandinterfaces@gmail.com" 
                  className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                >
                  <Mail size={16} />
                  <span>letscreate.inksandinterfaces@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919429997631" 
                  className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                >
                  <Phone size={16} />
                  <span>+91 9429997631</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Surat, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom section with copyright and links */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 sm:py-8 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} Inks & Interfaces. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link 
              href="#privacy" 
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="#terms" 
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      
      {/* Back to top button with animation and smooth scroll */}
      {showBackToTop && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={handleBackToTop}
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-full shadow-lg touch-target focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.15, rotate: -45, boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
          // The icon's rotation is handled separately below
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ rotate: 45 }}
            whileHover={{ rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex"
          >
            <ArrowUpRight size={24} />
          </motion.span>
        </motion.button>
      )}
    </footer>
  );
}
