"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "Digital Business Card",
    tier: "Starter",
    price: "₹4,999 – ₹7,999",
    description: "Perfect for small cafes, food stalls, shops, and new businesses.",
    features: [
      "Single-page website",
      "Mobile responsive design",
      "Click-to-call button",
      "Google Maps integration",
      "Photo gallery (5-10 photos)",
      "Domain & hosting setup assistance",
    ],
    cta: "Get Started",
    highlighted: false,
    gradient: "from-surface-light to-surface",
  },
  {
    name: "Cafe Growth Plan",
    tier: "Most Popular",
    price: "₹14,999 – ₹19,999",
    description: "Everything in Starter, plus advanced features to grow your business.",
    features: [
      "Multi-section website",
      "Mobile-friendly digital menu",
      "Contact & inquiry form",
      "Basic SEO optimization",
      "Google ranking optimization",
      "1 month free content updates",
    ],
    cta: "Choose Growth Plan",
    highlighted: true,
    gradient: "from-primary to-primary-dark",
  },
  {
    name: "Full Digital Experience",
    tier: "Premium",
    price: "₹29,999+",
    monthly: "₹2,000/month maintenance",
    description: "Everything in Growth, plus premium automation and ongoing support.",
    features: [
      "Table reservation system",
      "Online ordering system",
      "VIP newsletter signup",
      "Monthly SEO reports",
      "Priority support",
      "Customer automation features",
    ],
    cta: "Book Free Consultation",
    highlighted: false,
    gradient: "from-accent to-[#45e6e0]",
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative py-24 lg:py-32">
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
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            Affordable Plans for{" "}
            <span className="gradient-text">Every Business</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Choose the perfect package for your business. No hidden fees, no
            surprises — just transparent pricing.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-3xl p-[1px] ${
                plan.highlighted
                  ? "bg-gradient-to-b from-primary via-primary-light to-accent"
                  : ""
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-5 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-primary/30">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`relative h-full rounded-3xl p-8 ${
                  plan.highlighted
                    ? "bg-surface"
                    : "glass"
                } flex flex-col`}
              >
                {/* Header */}
                <div className="mb-6">
                  <span className="text-sm font-medium text-primary-light uppercase tracking-wider">
                    {plan.tier}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl sm:text-4xl font-bold ${plan.highlighted ? "gradient-text" : "text-white"}`}>
                      {plan.price}
                    </span>
                  </div>
                  {plan.monthly && (
                    <p className="text-sm text-muted mt-2">+ {plan.monthly}</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? "text-accent" : "text-primary-light"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block w-full py-4 text-center font-semibold rounded-2xl transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/30"
                      : "bg-white/5 text-white border border-border hover:bg-white/10 hover:border-primary/30"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
