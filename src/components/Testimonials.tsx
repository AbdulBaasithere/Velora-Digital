"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    business: "The Brew House Cafe",
    rating: 5,
    text: "Velora Digital helped us get more customers through Google and gave our cafe a modern online presence. Our walk-ins increased by 40% after the website launch!",
    avatar: "RS",
  },
  {
    name: "Priya Patel",
    business: "Glow Beauty Studio",
    rating: 5,
    text: "The website they designed for our salon is absolutely stunning. Customers can now book appointments online and we've seen a huge increase in new clients. Highly recommend!",
    avatar: "PP",
  },
  {
    name: "Amit Kumar",
    business: "Spice Garden Restaurant",
    rating: 5,
    text: "Professional, affordable, and delivered on time. Our restaurant's online ordering system works flawlessly. The team was responsive and understood exactly what we needed.",
    avatar: "AK",
  },
  {
    name: "Sneha Reddy",
    business: "Urban Mart",
    rating: 4,
    text: "Great experience working with Velora Digital. They built us a beautiful website that showcases our products perfectly. The Google Maps integration has been a game-changer for local customers.",
    avatar: "SR",
  },
  {
    name: "Vikram Singh",
    business: "FitZone Gym",
    rating: 5,
    text: "From consultation to launch, Velora Digital exceeded our expectations. Our membership inquiries doubled within the first month. The SEO work they did is paying off big time!",
    avatar: "VS",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-white/10"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 radial-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-primary bg-primary/10 border border-primary/20 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            What Our Clients{" "}
            <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Don&apos;t just take our word for it — hear from the business owners
            we&apos;ve helped succeed online.
          </p>
        </motion.div>

        {/* Testimonials Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance] box-border space-y-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`break-inside-avoid p-7 rounded-2xl glass hover:bg-surface-light/60 transition-all duration-500 cursor-pointer block ${
                activeIndex === i ? "ring-1 ring-primary/30" : ""
              }`}
              onClick={() => setActiveIndex(i)}
            >
              {/* Quote icon */}
              <svg
                className="w-8 h-8 text-primary/20 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>

              {/* Text */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Author */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted">{testimonial.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
