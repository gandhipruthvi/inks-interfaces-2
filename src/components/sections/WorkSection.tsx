"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ExternalLink } from "lucide-react";

interface WorkSectionProps {
  setIsHovering: (isHovering: boolean) => void;
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
  content: string;
  challenge: string;
  approach: string;
  results: string;
  link?: string;
  gallery?: string[]; // Array of image URLs for bento grid
}

export default function WorkSection({ setIsHovering }: WorkSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
    null,
  );

  // Case studies data - kept to 4 projects as per requirements
  const caseStudies: CaseStudy[] = [
    {
      id: "gomiles",
      title: "Go Miles Website Redesign",
      subtitle: "UI/UX Design",
      description:
        "Revamping the Go Miles website to improve user experience and visual appeal. The new design focuses on making travel planning easier, with a cleaner layout, better navigation, and a more modern look that speaks to today’s travelers.",
      image: "/assets/gomiles/gomiles.webp",
      color: "#e4ba88",
      tags: ["Responsive Design", "Travel", "User-Friendly"],
      content: "Go Miles needed a website that would make travel planning easier and more enjoyable. The design focused on a clean, modern aesthetic with intuitive navigation and a focus on user experience. The new site received positive feedback and helped the company attract more customers.",
      challenge: "Every great project starts with a challenge. For Go Miles Website Redesign, the challenge was to create a design that would stand out in a crowded market while maintaining usability and brand consistency.",
      approach: "Through extensive research and iterative design, we developed a solution that balanced aesthetic appeal with functional requirements. The process involved stakeholder interviews, competitive analysis, and multiple rounds of user testing.",
      results: "The final design not only met but exceeded expectations, resulting in improved user engagement, brand recognition, and business metrics. The client was thrilled with the outcome and has since implemented the design across their entire product line.",
      gallery: ["/assets/gomiles/gomileslanding.webp", "/assets/gomiles/gomileseurope.webp", "/assets/gomiles/gomilesabout.webp", "/assets/gomiles/gomilesblogs.webp", "/assets/gomiles/gomilesposts.webp"],
      link: ""
    },
    {
      id: "zestee",
      title: "Zestee Logo",
      subtitle: "Brand Identity Design",
      description:
        "Created a fresh and energetic brand identity for Zestee Café, including logo design and complete visual branding. The new look reflects the café’s vibrant personality and creates a memorable experience for its customers.",
      image: "/assets/zestee/zestee.webp",
      color: "#FDB91A",
      tags: ["Logo Design", "Café Branding", "Premium"],
      content: "Zestee needed a brand identity that would reflect its premium, upscale café experience. The design focused on a bold, modern aesthetic with a touch of luxury, using rich colors and premium materials. The new look resonated with customers and helped the café stand out in a competitive market.",
      challenge: "Zestee Café was entering a crowded market filled with both boutique and franchise coffee shops. The challenge was to create a brand identity that not only captured the café’s energetic and youthful spirit but also conveyed a sense of premium quality. The brand needed to appeal to a diverse clientele, from students to professionals, and stand out visually on everything from signage to social media.",
      approach: "We began with in-depth market and competitor research to understand what would resonate with Zestee’s target audience. Multiple moodboards and color explorations led us to a palette that balances vibrancy with sophistication. The logo was designed to be playful yet modern, with custom typography and iconography that could be adapted for packaging, merchandise, and digital platforms, ensuring strong brand recognition at every touchpoint.",
      results: "The new identity gave Zestee a distinctive presence in its locale, making it instantly recognizable and Instagrammable. Customer engagement increased both in-store and online, and the café quickly became known for its lively atmosphere and unique brand personality. The cohesive branding also enabled Zestee to expand its merchandise line and attract new collaborations.",
      gallery: ["/assets/zestee/cafe.webp","/assets/zestee/coffeecup.webp","/assets/zestee/ig.webp","/assets/zestee/packet.webp","/assets/zestee/apron.webp","/assets/zestee/board.webp"],
      link: "https://www.instagram.com/p/DIOcsvutVqN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
      id: "lcm",
      title: "LCM Logo and UI/UX",
      subtitle: "UI/UX Design",
      description:
        "Designed an inclusive, responsive website and brand identity for Lab Coat Media — a platform built with accessibility at its core, ensuring equal digital experiences for everyone, regardless of disability.",
      image: "/assets/lcm/lcm.webp",
      color: "#3A506B",
      tags: ["Logo Design", "Accessibility", "Responsive Design"],
      content: "Lab Coat Media needed a brand identity that would reflect its commitment to accessibility and inclusivity. The design focused on a bold, modern aesthetic with a touch of luxury, using rich colors and premium materials. The new look resonated with customers and helped the company stand out in a competitive market.",
      challenge: "Lab Coat Media’s mission was to make digital content accessible to all, but its existing brand and website fell short of modern accessibility standards and failed to communicate inclusivity. The challenge was to overhaul both the visual identity and the user experience, ensuring the brand would resonate with a broad spectrum of users, including those with disabilities.",
      approach: "We collaborated closely with accessibility consultants and real users to identify pain points and opportunities for improvement. The new logo and color system were designed for maximum contrast and legibility, while the website layout was restructured for keyboard navigation and screen reader compatibility. User testing was conducted at every stage, and WCAG guidelines were strictly followed to guarantee compliance.",
      results: "Lab Coat Media’s new brand and website received praise from both users and industry experts for their clarity and inclusiveness. Accessibility scores improved dramatically, and the company reported a noticeable uptick in client inquiries from organizations prioritizing inclusive design. The project set a new internal standard for accessibility on all future work.",
      gallery: ["/assets/lcm/lcmlanding.webp","/assets/lcm/blog.webp","/assets/lcm/detail.webp"],
      link: ""
    },
    {
      id: "globetap",
      title: "GlobeTap App UI Design",
      subtitle: "Mobile UI/UX Design",
      description:
        "Designed a modern, intuitive mobile interface for GlobeTap — a travel app that helps users explore new destinations, plan trips effortlessly, and connect with global experiences on the go.",
      image: "/assets/globetap/globetap.webp",
      color: "#B07156",
      tags: ["App Design", "Travel", "User-Friendly"],
      content: "GlobeTap needed a mobile interface that would make travel planning easier and more enjoyable. The design focused on a clean, modern aesthetic with intuitive navigation and a focus on user experience. The new app resonated with customers and helped the company attract more users.",
      challenge: "GlobeTap wanted to empower travelers to easily discover and book experiences on the go, but their app’s previous interface was cluttered and unintuitive. The challenge was to rethink the mobile experience to make it effortlessly navigable, visually appealing, and efficient for users planning trips in real time.",
      approach: "We mapped out the most common travel user journeys, prioritizing speed and ease of use. The design process included wireframing, prototyping, and multiple rounds of user testing with actual travelers. We introduced a bold, travel-inspired color palette and icon set, and focused on streamlining actions like search, booking, and itinerary management to minimize friction.",
      results: "The app’s relaunch resulted in a significant increase in downloads and daily active users. Travelers praised the intuitive interface and the app’s ability to help them plan trips quickly, even in unfamiliar destinations. GlobeTap’s App Store rating improved, and the brand gained recognition as a modern, user-focused travel solution.",
      gallery: ["/assets/globetap/allscreens.webp","/assets/globetap/twophones.webp","/assets/globetap/black.webp","/assets/globetap/stairs.webp","/assets/globetap/liephone.webp"],
      link: "https://www.behance.net/gallery/220216243/GlobeTap-UIUX-Design-and-Branding"
    },
  ];

  // Calculate dynamic values for the sticky effect
  const cardHeight = "70vh";
  const cardTopPadding = "1.5em";
  const cardMargin = "4vw";
  const cardsCount = caseStudies.length;
  // How much of the previous card should peek from the top
  const peekHeight = 150; // px

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
  };

  const closeModal = () => {
    setSelectedCaseStudy(null);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-visible bg-gray-50 py-16 sm:py-24 lg:py-32"
      id="work"
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 px-4 sm:mb-16 sm:px-8 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="mb-4 text-4xl font-bold sm:mb-6 sm:text-5xl lg:text-6xl">
              Work Worth Watching
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-700 sm:text-lg lg:text-xl">
              Scroll through our featured projects to see how strategic design
              thinking translates into business success.
            </p>
          </motion.div>
        </div>

        {/* Project cards container with sticky scrolling behavior */}
        <div
          ref={containerRef}
          className="relative mb-[30rem]"
          style={{
            height: `calc(${cardsCount} * ${cardHeight})`,
            paddingBottom: `calc(${cardsCount} * ${cardTopPadding})`,
          }}
        >
          <ul className="flex flex-col gap-32 px-4 sm:px-6 md:px-0">
            {caseStudies.map((project, index) => {
              return (
                <motion.li
                  key={project.id}
                  className="sticky"
                  style={{
                    top: `${peekHeight}px`,
                    zIndex: index + 1,
                  }}
                  // Removed initial, whileInView, and transition props for fade-in effect
                >
                  <motion.div
                    className="work-card relative flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-lg"
                    style={{
                      minHeight: '70vh',
                      maxHeight: '70vh',
                    }}
                    whileHover={{
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="flex h-full flex-grow flex-col lg:flex-row">
                      {/* Left side - Image */}
                      <div className="relative h-48 overflow-hidden sm:h-64 lg:h-auto lg:w-1/2">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover object-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>

                      {/* Right side - Project details */}
                      <div className="flex flex-grow flex-col justify-between p-6 sm:p-8 lg:w-1/2 lg:p-12">
                        <div>
                          {/* Project category and tags */}
                          <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-3">
                            <span
                              className="inline-block rounded-full px-3 py-1 text-sm font-medium"
                              style={{
                                backgroundColor: `${project.color}20`,
                                color: project.color,
                              }}
                            >
                              {project.subtitle}
                            </span>

                            {project.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Project title and description */}
                          <h2 className="mb-2 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl">
                            {project.title}
                          </h2>
                          <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
                            {project.description}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          className="touch-target flex items-center gap-2 rounded-lg px-5 py-2.5 text-base font-medium text-white sm:px-6 sm:py-3 sm:text-lg"
                          style={{ backgroundColor: project.color }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCaseStudyClick(project)}
                        >
                          View Case Study
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Project number indicator */}
                    <div
                      className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white"
                      style={{ backgroundColor: project.color }}
                    >
                      {index + 1}
                    </div>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-24 flex justify-center px-4 pb-24 pt-12 sm:mt-20 sm:pb-20 lg:mt-28 lg:pb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="/imaginations"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-10 py-5 text-lg font-bold text-white shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Explore More Projects
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>

      {/* Case study modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className="relative w-full flex flex-col justify-end"
                style={{ backgroundColor: selectedCaseStudy.color }}
              >
                <img
                  src={selectedCaseStudy.image}
                  alt={selectedCaseStudy.title}
                  className="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Content container with dynamic padding */}
                <div className="relative p-6 sm:p-8 md:p-10 pb-8">
                  <span
                    className="mb-2 inline-block rounded-full bg-white/90 px-3 py-1 text-sm font-medium"
                    style={{ color: selectedCaseStudy.color }}
                  >
                    {selectedCaseStudy.subtitle}
                  </span>

                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {selectedCaseStudy.title}
                  </h2>

                  <p className="mt-2 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl">
                    {selectedCaseStudy.description}
                  </p>
                </div>

                {/* Close button */}
                <motion.button
                  className="absolute z-10 right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-colors hover:bg-white/40"
                  onClick={closeModal}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Modal content */}
              <div className="p-10">
                <div className="mb-8 flex flex-wrap gap-2">
                  {selectedCaseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-4 py-1.5 text-sm font-medium"
                      style={{
                        backgroundColor: `${selectedCaseStudy.color}15`,
                        color: selectedCaseStudy.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl leading-relaxed text-gray-800">{selectedCaseStudy.content}</p>
                  
                  <h3 className="text-2xl font-bold mt-10 mb-4">The Challenge</h3>
                  <p className="text-lg text-gray-700">
                    {selectedCaseStudy.challenge}
                  </p>
                  
                  <h3 className="text-2xl font-bold mt-10 mb-4">The Approach</h3>
                  <p className="text-lg text-gray-700">
                    {selectedCaseStudy.approach}
                  </p>
                  
                  <h3 className="text-2xl font-bold mt-10 mb-4">The Results</h3>
                  <p className="text-lg text-gray-700">
                    {selectedCaseStudy.results}
                  </p>

                  {/* Project images grid: bento for branding/logo, simple grid otherwise */}
                  {selectedCaseStudy.gallery &&
                    selectedCaseStudy.gallery.length > 0 &&
                    (selectedCaseStudy.subtitle
                      ?.toLowerCase()
                      .includes("brand") ||
                    selectedCaseStudy.subtitle
                      ?.toLowerCase()
                      .includes("logo") ? (
                      // Bento grid for branding/logo projects
                      <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
                        {selectedCaseStudy.gallery.map((img, i) => (
                          <div
                            key={i}
                            className={`overflow-hidden rounded-xl shadow-lg ${i % 5 === 0 ? "col-span-2 row-span-2" : ""}`}
                          >
                            <img
                              src={img}
                              alt={`${selectedCaseStudy.title} screenshot ${i + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Simple 2-column grid for regular projects
                      <div className="mt-10 grid grid-cols-2 gap-4">
                        {selectedCaseStudy.gallery.map((img, i) => (
                          <div
                            key={i}
                            className="overflow-hidden rounded-xl shadow-lg"
                          >
                            <img
                              src={img}
                              alt={`${selectedCaseStudy.title} screenshot ${i + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                </div>

                {/* Call to action */}
                <div className="mt-12 flex justify-center">
                  <motion.button
                    className="flex items-center gap-2 rounded-xl px-8 py-4 font-bold text-white"
                    style={{ backgroundColor: selectedCaseStudy.color }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => selectedCaseStudy.link ? window.open(selectedCaseStudy.link, '_blank', 'noopener,noreferrer') : window.open('mailto:letscreate.inksandinterfaces@gmail.com')}
                  >
                    <span>{selectedCaseStudy.link ? 'View Full Case Study' : 'Contact for Similar Project'}</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
