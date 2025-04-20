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

export default function Footer() {
  // Social media links with branded colors
  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      href: "https://instagram.com",
      color: "#E1306C"
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      href: "https://twitter.com",
      color: "#1DA1F2"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com",
      color: "#0A66C2"
    },
    {
      name: "Dribbble",
      icon: <Dribbble size={20} />,
      href: "https://dribbble.com",
      color: "#EA4C89"
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
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Work", href: "#work" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "UI/UX Design", href: "#ui-ux" },
        { label: "Brand Identity", href: "#branding" },
        { label: "Web Development", href: "#development" },
        { label: "Motion Design", href: "#motion" },
        { label: "Design Strategy", href: "#strategy" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Policy", href: "#cookies" },
        { label: "Accessibility", href: "#accessibility" }
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Top section with logo and company info */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Logo and mission statement */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="font-bold text-xl">Inks & Interfaces</span>
            </div>
            
            <p className="text-gray-600 mb-6 sm:mb-8">
              We transform ideas into exceptional digital experiences through thoughtful design
              and strategic creativity. Elevating brands with pixel-perfect precision and purpose.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:text-white transition-colors duration-300"
                  style={{ 
                    backgroundColor: "rgba(249, 250, 251, 0.8)" 
                  }}
                  whileHover={{ 
                    backgroundColor: social.color,
                    scale: 1.1,
                    color: "#FFFFFF",
                    y: -3
                  }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA Button for Start Your Project */}
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-lg font-bold mb-4">Ready to get started?</h4>
            <motion.button
              className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-[#FFD700] hover:text-black transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Project
            </motion.button>
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
                  href="mailto:hello@inksandinterfaces.com" 
                  className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                >
                  <Mail size={16} />
                  <span>hello@inksandinterfaces.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+12125551234" 
                  className="text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                >
                  <Phone size={16} />
                  <span>+1 (212) 555-1234</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Design Avenue<br />New York, NY 10001</span>
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
            <Link 
              href="#sitemap" 
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.a
        href="#top"
        className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-full shadow-lg touch-target"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUpRight size={20} />
      </motion.a>
    </footer>
  );
}
