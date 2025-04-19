"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

// Define Timeout type since NodeJS namespace isn't available
type Timeout = ReturnType<typeof setTimeout>;

interface TestimonialsSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  company: string;
  rating: number;
  image: string;
}

export default function TestimonialsSection({ setIsHovering }: TestimonialsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayTimeoutRef = useRef<Timeout | null>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "Working with this design team transformed our brand identity completely. Their attention to detail and innovative approach exceeded our expectations at every stage of the project.",
      author: "Sarah Johnson",
      position: "CEO",
      company: "Elevate Solutions",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      content: "The UI designs were not only visually stunning but incredibly functional. User engagement increased by 40% after launch, and our customers repeatedly praise the intuitive interface.",
      author: "Michael Chen",
      position: "Product Lead",
      company: "TechFlow",
      rating: 5,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      content: "From concept to execution, the process was seamless. The animated elements and sophisticated design language elevated our brand to a completely new level in our industry.",
      author: "Alex Rivera",
      position: "Marketing Director",
      company: "Visionworks",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      content: "The design team's collaborative approach made the entire project enjoyable. They took the time to understand our unique challenges and delivered solutions that perfectly aligned with our vision.",
      author: "Jordan Taylor",
      position: "Founder",
      company: "Artisan Collective",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  // Handle autoplay functionality
  useEffect(() => {
    if (!inView || !autoplay) {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
      return;
    }

    autoplayTimeoutRef.current = setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [activeTestimonial, autoplay, inView, testimonials.length]);

  // Handle testimonial navigation
  const handlePrevious = () => {
    setAutoplay(false);
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setActiveTestimonial(index);
  };

  return (
    <section
      ref={ref}
      className="relative py-20 bg-white overflow-hidden"
      id="testimonials"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent" />
        <Quote className="absolute top-20 left-10 text-gray-100 opacity-20 w-24 h-24" />
        <Quote className="absolute bottom-20 right-10 text-gray-100 opacity-20 w-16 h-16 transform rotate-180" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Client Testimonials</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hear what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`absolute inset-0 ${index === activeTestimonial ? "block" : "hidden"}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-2xl p-8 shadow-xl">
                  <div className="md:w-1/3">
                    <div className="relative rounded-full overflow-hidden w-48 h-48 mx-auto border-4 border-white shadow-lg">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 flex flex-col">
                    <div className="flex mb-4 text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl italic text-gray-700 mb-6 relative">
                      <span className="absolute -top-4 -left-4 text-5xl text-gray-200">"</span>
                      {testimonial.content}
                      <span className="absolute -bottom-10 -right-4 text-5xl text-gray-200">"</span>
                    </blockquote>
                    
                    <div className="mt-4">
                      <h4 className="text-xl font-bold">{testimonial.author}</h4>
                      <p className="text-gray-600">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeTestimonial
                      ? "bg-black"
                      : "bg-gray-300 hover:bg-gray-400"
                  } transition-colors`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
