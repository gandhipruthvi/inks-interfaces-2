"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/ui/Navbar";
import Cursor from "@/components/ui/Cursor";

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
  gallery?: string[];
}

export default function ImaginationsPage() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
    null,
  );
  const [isHovering, setIsHovering] = useState(false);

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Case studies data - kept to 4 projects
  const caseStudies: CaseStudy[] = [
    {
      id: "go-miles",
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
      gallery: ["/assets/gomiles/gomileslanding.webp", "/assets/gomiles/gomileseurope.webp", "/assets/gomiles/gomilesabout.webp", "/assets/gomiles/gomilesblogs.webp", "/assets/gomiles/gomilesposts.webp"] // Add your images here later
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
      gallery: ["/assets/zestee/cafe.webp","/assets/zestee/coffeecup.webp","/assets/zestee/ig.webp","/assets/zestee/packet.webp","/assets/zestee/apron.webp","/assets/zestee/board.webp"]
    },
    {
      id: "lcm",
      title: "Lab Coat Media Logo and UI/UX",
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
      gallery: ["/assets/lcm/lcmlanding.webp","/assets/lcm/blog.webp","/assets/lcm/detail.webp"]
    },
    {
      id: "globe-tap",
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
      gallery: ["/assets/globetap/allscreens.webp","/assets/globetap/twophones.webp","/assets/globetap/black.webp","/assets/globetap/stairs.webp","/assets/globetap/liephone.webp"]
    },
    {
      id: "satori-bites",
      title: "Satori Bites Branding",
      subtitle: "Brand Identity Design",
      description:
        "Developed the brand identity for Satori Bites, a modern Asian fine dining restaurant. The project included logo design, visual branding, and strategy—blending tradition with contemporary luxury to elevate its upscale image and guest experience.",
      image: "/assets/satoribites/satoribites.webp",
      color: "#d53e40",
      tags: ["Logo Design", "Asian Culinary", "Luxury"],
      content: "Satori Bites merges Asian culinary heritage with modern luxury. The branding project delivered a refined, elegant identity—balancing authenticity and warmth through logo, color, and typography—perfectly reflecting its mindful dining philosophy and upscale positioning.",
      challenge: "Satori Bites sought to position itself as a modern Asian fine dining destination, but its existing branding didn’t reflect the restaurant’s upscale experience or its blend of tradition and innovation. The challenge was to create a brand identity that honored Asian heritage while appealing to a discerning, contemporary clientele.",
      approach: "We immersed ourselves in Asian art and culinary traditions, drawing inspiration for motifs, patterns, and color schemes. The logo and supporting visuals were crafted to evoke both elegance and warmth, with a refined yet approachable look. The new identity was applied across menus, packaging, signage, and digital platforms for a seamless guest experience.",
      results: "The refreshed branding elevated Satori Bites’ reputation, attracting a broader range of guests and earning positive reviews for both cuisine and ambiance. The restaurant saw an increase in reservations and repeat business, and the cohesive visual identity helped establish Satori Bites as a leader in the upscale dining scene.",
      gallery: ["/assets/satoribites/bag.webp","/assets/satoribites/box.webp","/assets/satoribites/apron.webp","/assets/satoribites/plate.webp","/assets/satoribites/tissue.webp","/assets/satoribites/card.webp"]
    },
    {
      id: "golden-crust",
      title: "Golden Crust Branding",
      subtitle: "Brand Identity Design",
      description:
        "Created a full brand identity for Golden Crust, a premium boutique bakery. The design blends artisanal charm with luxury, showcasing the bakery’s focus on quality, craftsmanship, and an inviting upscale experience.",
      image: "/assets/goldencrust/hoarding.webp",
      color: "#ffb0ae",
      tags: ["Logo Design", "Artisanal Bakery", "Premium"],
      content: "Golden Crust blends artisanal baking with premium elegance. The branding features a refined logo and soft, natural palette, highlighting the bakery’s focus on quality ingredients and unforgettable taste—making it a go-to for those seeking authenticity and sophistication.",
      challenge: "Golden Crust needed to differentiate itself in a competitive boutique bakery market, where authenticity and quality are paramount. The challenge was to create a brand that communicated artisanal craftsmanship while also feeling premium and inviting to a wide audience.",
      approach: "We developed a brand story centered on handcrafted quality, using natural textures and a soft, inviting color palette. The logo and packaging were designed to evoke warmth and nostalgia, while still feeling fresh and modern. Every touchpoint, from store signage to bakery boxes, was considered for a consistent customer experience.",
      results: "The new branding resonated with both loyal and new customers, leading to increased foot traffic and sales. Golden Crust became known as a must-visit destination for bakery lovers, and the brand’s visual assets were frequently shared on social media, further boosting its reach and reputation.",
      gallery: ["/assets/goldencrust/bread.webp","/assets/goldencrust/banner.webp","/assets/goldencrust/menu.webp","/assets/goldencrust/crossaint.webp","/assets/goldencrust/tape.webp","/assets/goldencrust/store.webp"]
    },
    {
      id: "pure-sip",
      title: "Pure Sip Branding",
      subtitle: "Packaging Design",
      description:
        "Designed a vibrant and refreshing packaging identity for PureSip, a natural fruit beverage brand. The packaging reflects the product’s purity and flavor, combining bold geometric visuals with organic elements to appeal to health-conscious, modern consumers.",
      image: "/assets/puresip/can.webp",
      color: "#8cc751",
      tags: ["Product Design", "Fruit Beverage", "Organic"],
      content: "PureSip is a 100% natural fruit drink that celebrates real ingredients and clean living — and the packaging needed to communicate just that. The design approach focused on creating a fresh, modern, and health-forward visual identity that reflects the brand’s values.",
      challenge: "Pure Sip wanted packaging that would instantly communicate its all-natural, healthy positioning and stand out in the crowded beverage aisle. The challenge was to create a look that was both eye-catching and reflective of the brand’s commitment to real ingredients.",
      approach: "We used bold, organic shapes and a vibrant color palette to create a sense of freshness and energy. The packaging design was tested on shelves to ensure visibility, and all elements—from typography to illustrations—were crafted to reinforce the product’s natural and health-forward appeal.",
      results: "The new packaging dramatically improved shelf presence, leading to increased product trials and repeat purchases. Pure Sip gained traction with health-conscious shoppers and expanded its distribution to new retailers, supported by positive feedback on the brand’s refreshed look.",
      gallery: ["/assets/puresip/lemon.webp","/assets/puresip/halfgrape.webp","/assets/puresip/strawberry.webp","/assets/puresip/halfpear.webp","/assets/puresip/grapes.webp","/assets/puresip/pear.webp"]
    },
    {
      id: "vanya-luxe",
      title: "Vanya Luxe Branding",
      subtitle: "Brand Identity Design",
      description:
        "Created an elegant and organic brand identity for Vanya Luxe, a premium beauty brand rooted in luxury and purity. The design reflects a harmonious blend of nature and sophistication, perfectly aligning with its organic and chemical-free philosophy.",
      image: "/assets/vanyaluxe/tin.webp",
      color: "#af8359",
      tags: ["Logo Variations", "Beauty Brand", "Luxury"],
      content: "The branding captures the essence of organic sophistication, using earthy tones, delicate botanicals, and minimalistic elegance to represent the brand’s commitment to chemical-free, premium beauty solutions.",
      challenge: "Vanya Luxe needed a brand identity that would convey both purity and luxury, appealing to discerning beauty buyers looking for organic, chemical-free products. The challenge was to balance a sense of natural simplicity with high-end sophistication.",
      approach: "We combined delicate botanical illustrations with a minimalist, elegant layout, using earthy tones and premium finishes for packaging. The visual identity was designed to work across a range of products, from skincare to cosmetics, and to communicate trust and exclusivity at every touchpoint.",
      results: "The new look attracted a loyal, high-end customer base and set Vanya Luxe apart in the competitive beauty market. The brand saw increased engagement on social media and positive feedback from influencers, helping to drive both sales and brand awareness.",
      gallery: ["/assets/vanyaluxe/tube.webp","/assets/vanyaluxe/dropper.webp","/assets/vanyaluxe/nailpolish.webp","/assets/vanyaluxe/bag.webp"]
    },
  ];

  // Handle case study click
  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Close modal
  const closeModal = () => {
    setSelectedCaseStudy(null);
    // Re-enable scrolling
    document.body.style.overflow = "";
  };

  // Keyboard handling for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCaseStudy) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Make sure scrolling is re-enabled when component unmounts
      document.body.style.overflow = "";
    };
  }, [selectedCaseStudy]);

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar setIsHovering={setIsHovering} />

      {/* Custom cursor component */}
      <Cursor position={cursorPosition} isHovering={isHovering} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white px-8 pb-24 pt-36">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/3 transform rounded-full bg-yellow-100 opacity-40 blur-3xl" />
          <div className="absolute bottom-0 left-20 h-96 w-96 translate-y-1/4 transform rounded-full bg-blue-50 opacity-60 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.h1
            className="mb-6 text-5xl font-bold sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Imaginations
          </motion.h1>
          <motion.p
            className="mx-auto mb-12 max-w-3xl text-xl text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Explore our portfolio of projects where strategic design thinking
            translates into extraordinary experiences and measurable business
            success.
          </motion.p>
        </div>
      </section>

      {/* Project Grid Section */}
      <section ref={ref} className="bg-white px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((project, index) => (
              <motion.div
                key={project.id}
                className="overflow-hidden rounded-xl bg-white shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Project image */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundColor: project.color }}
                  />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Project details */}
                <div className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
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
                        className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                  <p className="mb-6 line-clamp-3 text-gray-600">
                    {project.description}
                  </p>

                  <motion.button
                    className="flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white"
                    style={{ backgroundColor: project.color }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCaseStudyClick(project)}
                  >
                    View Case Study
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              className="scrollbar-thin scrollbar-thumb-gray-300 relative max-h-[85vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className="h-76 relative sm:h-72"
                style={{ backgroundColor: selectedCaseStudy.color }}
              >
                <img
                  src={selectedCaseStudy.image}
                  alt={selectedCaseStudy.title}
                  className="h-full w-full object-cover object-center mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                  <span
                    className="mb-3 inline-block rounded-full bg-white/90 px-3 py-1 text-sm font-medium"
                    style={{ color: selectedCaseStudy.color }}
                  >
                    {selectedCaseStudy.subtitle}
                  </span>
                  <h2 className="mb-2 text-4xl font-bold text-white">
                    {selectedCaseStudy.title}
                  </h2>
                  <p className="max-w-2xl text-lg text-white/90">
                    {selectedCaseStudy.description}
                  </p>
                </div>

                {/* Close button */}
                <motion.button
                  className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-colors hover:bg-white/40"
                  onClick={closeModal}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Modal content */}
              <div className="p-10">
                {/* Tags */}
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
                </div>

                {/* Gallery images (after Results section) */}
                {selectedCaseStudy.gallery &&
                  selectedCaseStudy.gallery.length > 0 &&
                  (selectedCaseStudy.subtitle
                    ?.toLowerCase()
                    .includes("brand") ||
                  selectedCaseStudy.subtitle?.toLowerCase().includes("logo") ? (
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

                {/* Call to action */}
                <div className="mt-12 flex justify-center">
                  <motion.a
                    href="mailto:letscreate.inksandinterfaces@gmail.com?subject=Similar%20Project%20Inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-8 py-4 font-bold text-white"
                    style={{ backgroundColor: selectedCaseStudy.color }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span>Contact for Similar Project</span>
                    <ArrowRight size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
