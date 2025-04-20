"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { XCircle } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  fullBio?: string;
  image: string;
  skills?: string[];
  socialLinks?: { icon: React.ReactNode; url: string }[];
  index?: number;
}

export default function TeamMemberCard({
  name,
  role,
  bio,
  fullBio,
  image,
  skills = [],
  socialLinks = [],
  index = 0
}: TeamMemberProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const defaultTiltOptions = {
    max: 25, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.05, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  if (isExpanded) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsExpanded(false)}
      >
        <motion.div
          className="relative bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="md:w-1/2 p-8 overflow-y-auto">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setIsExpanded(false)}
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold mb-1">{name}</h3>
            <p className="text-yellow-600 font-medium mb-6">{role}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">About</h4>
              <p className="text-gray-700">{fullBio || bio}</p>
            </div>
            
            {skills.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {socialLinks.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Connect</h4>
                <div className="flex gap-3">
                  {socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-colors"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="perspective-1000 relative w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Tilt options={defaultTiltOptions} className="cursor-pointer">
        <div 
          className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <div className={`absolute inset-0 bg-white rounded-xl overflow-hidden shadow-lg backface-hidden ${isFlipped ? "invisible" : ""}`}>
            <div className="h-64 overflow-hidden">
              <motion.img
                src={image}
                alt={name}
                className="w-full h-full object-cover object-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Decorative elements */}
              <svg className="absolute top-0 right-0 w-16 h-16 text-white opacity-20" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="90" cy="10" r="40" />
              </svg>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{name}</h3>
              <p className="text-yellow-600 font-medium mb-4">{role}</p>
              <p className="text-gray-600 mb-6 line-clamp-3">{bio}</p>
              
              <button 
                className="px-4 py-2 text-sm bg-transparent border border-gray-300 text-gray-700 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
              >
                View Profile
              </button>
              
              <div className="absolute bottom-6 right-6">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3H19V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 3H5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 21H19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 21H5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Back of card */}
          <div className={`absolute inset-0 bg-white rounded-xl overflow-hidden shadow-lg backface-hidden rotate-y-180 ${!isFlipped ? "invisible" : ""}`}>
            <div className="p-6 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-1">{name}</h3>
              <p className="text-yellow-600 font-medium mb-4">{role}</p>
              
              {skills.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex-grow">
                <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">Bio</h4>
                <p className="text-gray-600 text-sm">{bio}</p>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <button 
                  className="px-4 py-2 text-sm bg-transparent border border-gray-300 text-gray-700 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(true);
                  }}
                >
                  Full Profile
                </button>
                
                {socialLinks.length > 0 && (
                  <div className="flex gap-2">
                    {socialLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-colors"
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}
