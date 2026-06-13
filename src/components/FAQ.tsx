"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "How long does a website take?",
    answer:
      "For our Starter plan, websites are typically completed within 5–7 business days. The Growth plan takes 10–14 days, and the Premium plan can take 2–4 weeks depending on the complexity of features like online ordering and reservation systems. We always keep you updated on progress.",
  },
  {
    question: "Do I need hosting?",
    answer:
      "We help you set up hosting as part of our service. We recommend affordable, reliable hosting providers and handle the entire setup process for you. For Premium plan clients, we can also manage your hosting on an ongoing basis.",
  },
  {
    question: "Can I update content later?",
    answer:
      "Absolutely! We build websites that are easy to update. For Starter and Growth plan clients, we provide a simple guide. Growth plan clients get 1 month of free content updates, and Premium plan clients receive ongoing content support as part of their monthly maintenance.",
  },
  {
    question: "Is SEO included?",
    answer:
      "Basic SEO setup (meta tags, proper headings, image optimization, mobile-friendliness) is included in all plans. Advanced SEO optimization with Google ranking strategies and monthly SEO reports is included in our Growth and Premium plans.",
  },
  {
    question: "Do you provide support?",
    answer:
      "Yes! All our clients receive email support. Growth plan clients get priority email support for 1 month after launch. Premium plan clients receive ongoing priority support including phone support, ensuring your website runs smoothly at all times.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-primary bg-primary/10 border border-primary/20 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Got questions? We&apos;ve got answers. If you don&apos;t find what you&apos;re
            looking for, feel free to contact us.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i
                  ? "glass ring-1 ring-primary/20"
                  : "glass"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-base sm:text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary-light"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-muted text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
