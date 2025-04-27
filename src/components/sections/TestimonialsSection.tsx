"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';

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
  // Viewport detection
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      {/* Background elements with enhanced parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">        
        {/* Left floating quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={sectionInView ? {
            opacity: [0.15, 0.25, 0.15],
            y: [0, -15, 0],
            scale: [1, 1.05, 1]
          } : {}}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
          className="absolute -left-10 top-40 transform -rotate-12"
        >
          <Quote className="text-gray-200 w-32 h-32" strokeWidth={1} />
        </motion.div>
        
        {/* Right floating quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={sectionInView ? {
            opacity: [0.15, 0.25, 0.15],
            y: [0, 15, 0],
            rotate: [0, 5, 0]
          } : {}}
          transition={{ 
            repeat: Infinity, 
            duration: 9,
            ease: "easeInOut",
            delay: 1.2
          }}
          className="absolute right-10 bottom-20 transform rotate-180"
        >
          <Quote className="text-gray-200 w-24 h-24" strokeWidth={1} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            id="testimonials-heading" 
            className="text-5xl font-bold mb-6 text-gray-900"
          >
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hear what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="max-w-6xl mx-auto px-4 relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            initialSlide={1}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => {
              // Connect custom navigation buttons
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="py-12 px-2">
                <motion.div
  className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 mx-auto max-w-2xl"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
  <div className="p-8 sm:p-10">
    {/* Content */}
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center mb-6">
      {/* Author image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 180deg at 50% 50%, #FFD700 0deg, transparent 60deg, #FFD700 360deg)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear",
            }}
          />
          <div className="absolute inset-[2px] rounded-full overflow-hidden border-2 border-white">
            <img
              src={testimonial.image}
              alt={`Portrait of ${testimonial.author}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      {/* Author info */}
      <div>
        <h4 className="font-bold text-xl">{testimonial.author}</h4>
        <p className="text-gray-600">
          {testimonial.position} at <span className="font-medium">{testimonial.company}</span>
        </p>
        
        {/* Star rating */}
        <div className="flex mt-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star 
              key={i} 
              size={16}
              className="text-yellow-500 fill-yellow-500 mr-0.5" 
            />
          ))}
        </div>
      </div>
    </div>
    
    {/* Testimonial content */}
    <div className="relative">
      <Quote size={32} className="text-gray-200 absolute top-0 left-0 transform -translate-x-1 -translate-y-2" />
      <blockquote className="pl-8 pr-2 text-gray-700 italic text-lg sm:text-xl leading-relaxed">
        {testimonial.content}
      </blockquote>
    </div>
  </div>
</motion.div>

              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom navigation buttons */}
          <div className="flex justify-center mt-10 gap-6">
            <motion.button
              ref={prevRef}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100"
              whileHover={{ scale: 1.1, backgroundColor: "#FFD700" }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-8 bg-black" : "w-2 bg-gray-300"
                  }`}
                  whileHover={{
                    backgroundColor: index === activeIndex ? "#000" : "#999"
                  }}
                />
              ))}
            </div>
            
            <motion.button
              ref={nextRef}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100"
              whileHover={{ scale: 1.1, backgroundColor: "#FFD700" }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
          
          {/* Help text */}
          <div className="text-center mt-6">
            <motion.p 
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1 }}
            >
              Swipe or use the arrow buttons to see more testimonials
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
