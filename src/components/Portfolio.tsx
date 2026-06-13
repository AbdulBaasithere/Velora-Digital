"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "The Brew House",
    industry: "Cafe",
    image: "/portfolio-cafe.png",
    features: ["Digital Menu", "Online Ordering", "Google Maps", "Photo Gallery"],
    color: "from-[#8B6914] to-[#D4A843]",
  },
  {
    title: "Spice Garden",
    industry: "Restaurant",
    image: "/portfolio-restaurant.png",
    features: ["Table Reservations", "Menu Display", "SEO Optimized", "Contact Form"],
    color: "from-[#C0392B] to-[#E74C3C]",
  },
  {
    title: "Glow Studio",
    industry: "Salon",
    image: "/portfolio-salon.png",
    features: ["Appointment Booking", "Service Catalog", "Gallery", "Reviews"],
    color: "from-[#E84393] to-[#FD79A8]",
  },
  {
    title: "Urban Mart",
    industry: "Local Shop",
    image: "/portfolio-shop.png",
    features: ["Product Showcase", "Click-to-Call", "Location Map", "WhatsApp Chat"],
    color: "from-primary to-accent",
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 radial-glow-right" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-primary bg-primary/10 border border-primary/20 mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            Websites We&apos;ve{" "}
            <span className="gradient-text">Crafted</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Take a look at some of the stunning websites we&apos;ve built for local
            businesses across different industries.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative rounded-2xl overflow-hidden glass cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.industry} Website`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent transition-opacity duration-500 ${
                    hoveredIndex === i ? "opacity-90" : "opacity-60"
                  }`}
                />

                {/* Industry Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${project.color}`}
                  >
                    {project.industry}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <motion.div
                  initial={false}
                  animate={hoveredIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm border border-white/10"
                    >
                      {feature}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
