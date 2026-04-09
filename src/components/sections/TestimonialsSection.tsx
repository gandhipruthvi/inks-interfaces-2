"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  company: string;
  rating: number;
}

export default function TestimonialsSection() {
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
      author: "Aniket",
      position: "CEO",
      company: "Go Miles",
      rating: 5,
    },
    {
      id: 2,
      content: "Working with you was a great experience. The quality of work was solid, and you did an excellent job translating my ideas into a clean, thoughtful design. I'm really happy with how everything turned out.",
      author: "Paul",
      position: "Founder",
      company: "LCM",
      rating: 5,
    },
    {
      id: 3,
      content: "From concept to execution, the branding process was seamless. The refined design language and thoughtfully integrated visuals brought a cohesive, elevated identity to our brand—setting us apart in our industry.",
      author: "Alex",
      position: "CEO",
      company: "Satori Bites",
      rating: 5,
    },
    {
      id: 4,
      content: "The designer's collaborative approach made the entire cosmetic branding project a pleasure to work on. They truly took the time to understand our brand’s essence and challenges, delivering visually stunning solutions that perfectly captured our vision and appeal.",
      author: "Jordan",
      position: "Founder",
      company: "Vanya Luxe",
      rating: 5,
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-8 bg-white overflow-hidden"
      id="testimonials"
    >
      {/* Background Decorative Quotes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
           className="absolute -left-10 top-40 opacity-[0.03] text-black"
           animate={sectionInView ? { y: [0, -20, 0], rotate: [0, -5, 0] } : {}}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Quote size={300} strokeWidth={1} />
        </motion.div>
        <motion.div
           className="absolute -right-10 bottom-20 opacity-[0.03] text-[#FFD700]"
           animate={sectionInView ? { y: [0, 20, 0], rotate: [0, 5, 0] } : {}}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Quote size={250} strokeWidth={1} className="rotate-180" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:w-2/3"
          >
            <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight uppercase leading-none">
               Client <span className="text-[#FFD700]">Voice</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
              Hear what our clients have to say about their experience working with us and how we helped transform their digital presence.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block"
          >
            <div className="flex items-center gap-10">
               <div className="h-[2px] w-24 bg-gray-100" />
               <span className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Testimonials</span>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
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
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            initialSlide={1}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            className="testimonial-swiper overflow-visible"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="py-12 px-6 max-w-2xl">
                 <TestimonialCard testimonial={testimonial} active={testimonials.indexOf(testimonial) === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-12 gap-12">
            <motion.button
              ref={prevRef}
              className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-xl border border-gray-100 group transition-all hover:bg-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="group-hover:text-[#FFD700] transition-colors" />
            </motion.button>

            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? "w-10 bg-black" : "w-3 bg-gray-200"}`}
                />
              ))}
            </div>

            <motion.button
              ref={nextRef}
              className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-xl border border-gray-100 group transition-all hover:bg-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="group-hover:text-[#FFD700] transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, active }: { testimonial: Testimonial; active: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 215, 0, 0.15), transparent 80%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative bg-white rounded-[2.5rem] border border-gray-100 p-10 sm:p-14 shadow-2xl overflow-hidden transition-all duration-500"
      animate={{ scale: active ? 1 : 0.9, opacity: active ? 1 : 0.4 }}
    >
      {/* Interactive Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 z-0"
        style={{ background }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} className={i < testimonial.rating ? "text-[#FFD700] fill-[#FFD700]" : "text-gray-200"} />
          ))}
        </div>

        <Quote size={40} className="text-gray-100 mb-8" />
        
        <blockquote className="text-xl sm:text-2xl text-gray-800 font-medium italic leading-relaxed mb-10">
          "{testimonial.content}"
        </blockquote>

        <div>
          <h4 className="text-lg font-black uppercase tracking-widest text-black mb-1">
            {testimonial.author}
          </h4>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">
            {testimonial.position} at <span className="text-[#FFD700]">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
