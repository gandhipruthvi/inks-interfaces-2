"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  setIsHovering?: (isHovering: boolean) => void;
}

export default function Navbar({ setIsHovering }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = ["Home", "Imaginations", "About"];

  // Get path for navigation items
  const getItemPath = (item: string): string => {
    return item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
  };

  // Check if a nav item is active
  const isActive = (item: string): boolean => {
    const itemPath = getItemPath(item);
    return pathname === itemPath || 
           (itemPath !== "/" && pathname.startsWith(itemPath));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="absolute top-6 left-5 sm:top-8 sm:left-12 z-30">
        <Link href="/">
          <div 
            className="flex items-center gap-2"
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
          >
            <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <span className="font-bold text-xl">Inks & Interfaces</span>
          </div>
        </Link>
      </div>

      {/* Mobile menu button */}
      <motion.button
        className="fixed top-6 right-5 z-40 md:hidden bg-white/90 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center shadow-lg touch-target"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        onMouseEnter={() => setIsHovering?.(true)}
        onMouseLeave={() => setIsHovering?.(false)}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>
      
      {/* Mobile menu overlay */}
      <motion.div 
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
        onClick={() => setMobileMenuOpen(false)}
      >
        <motion.div
          className="bg-white rounded-2xl w-[85%] max-w-sm p-6"
          initial={{ scale: 0.8, y: 20, opacity: 0 }}
          animate={{ 
            scale: mobileMenuOpen ? 1 : 0.8,
            y: mobileMenuOpen ? 0 : 20, 
            opacity: mobileMenuOpen ? 1 : 0 
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link 
                  href={getItemPath(item)}
                  className={`px-4 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-between ${
                    isActive(item) ? 'bg-gray-100 text-black font-bold' : 'text-gray-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={() => setIsHovering?.(true)}
                  onMouseLeave={() => setIsHovering?.(false)}
                >
                  {item}
                  {isActive(item) && (
                    <motion.div 
                      className="w-2 h-2 border-2 border-[#FFD700] rounded-full"
                      layoutId="navIndicator-mobile"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop navigation */}
      <motion.nav
        className={`fixed top-5 sm:top-8 right-4 transform -translate-x-1/2 z-30 bg-white/90 backdrop-blur-md px-1 py-1 rounded-full shadow-lg hidden md:flex items-center gap-1 sm:gap-2 transition-all duration-300 ${
          scrolled ? 'py-2 px-2 scale-95 shadow-md' : ''
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {navItems.map((item, index) => (
          <div key={item} className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={getItemPath(item)}
                className={`relative px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors touch-target flex items-center justify-center ${
                  isActive(item) 
                    ? 'text-black font-bold' 
                    : 'text-gray-600 hover:bg-black hover:text-white'
                }`}
                onMouseEnter={() => setIsHovering?.(true)}
                onMouseLeave={() => setIsHovering?.(false)}
              >
                {item}
              </Link>
            </motion.div>

            {/* Active indicator with border instead of underline */}
            {isActive(item) && (
              <motion.div 
                className="absolute inset-0 border-2 border-[#FFD700] rounded-full"
                layoutId="navIndicator"
              />
            )}
          </div>
        ))}
      </motion.nav>
    </header>
  );
}
