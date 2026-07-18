"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="bg-[#0a0e1a] text-[#f0f2f8] min-h-screen flex flex-col font-sans">
      {/* Simple Header */}
      <header className="border-b border-[rgba(108,92,231,0.15)] py-6 bg-[#0a0e1a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c5ce7] to-[#00cec9] flex items-center justify-center">
              <span className="text-white font-bold text-base">V</span>
            </div>
            <span className="text-lg font-bold text-white group-hover:text-[#6c5ce7] transition-colors">
              Velora <span className="text-[#00cec9]">Digital</span>
            </span>
          </Link>
          <Link href="/never-miss-a-lead" className="text-sm text-muted-foreground hover:text-white transition-colors">
            Never Miss a Lead
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-serif text-white">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-12">Last updated: July 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
              <p>
                At Velora Digital (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we are committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share your personal information when you visit our website, use our services, or engage with our AI automation products like &quot;Never Miss a Lead&quot;.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
              <p className="mb-3">
                We may collect personal information directly from you, such as when you fill out our contact form, subscribe to our services, or communicate with us on WhatsApp. This information includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your name, business name, and contact details (email address and phone number).</li>
                <li>Details of your interest in our services or pricing plans.</li>
                <li>Communication history when you reach out via email, phone, or messaging platforms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Never Miss a Lead (AI Lead Assistant) Data Handling</h2>
              <p className="mb-3">
                Our &quot;Never Miss a Lead&quot; product connects to your business&apos;s WhatsApp and/or Instagram accounts to provide automated customer replies. In delivering this service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not store full client conversation histories except for logged customer details (e.g., name, contact details, and the specific query/request) which are automatically saved into a secure lead tracker (like Google Sheets or a dashboard of your choice).</li>
                <li>We do not sell, rent, or lease customer contact lists or conversation logs to any third parties.</li>
                <li>The AI replies are guided entirely by parameters and business details that you specify. No private business information is shared with unauthorized models or public domains.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our services.</li>
                <li>Process your inquiries, book consultations, and coordinate project setups.</li>
                <li>Improve and customize our websites, templates, and AI workflows.</li>
                <li>Send you updates, maintenance notifications, and marketing communications (only with your consent).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Data Security</h2>
              <p>
                We implement robust security measures to protect your personal information and API connections (such as Meta developer credentials or WhatsApp Business tokens). However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Third-Party Services</h2>
              <p>
                Our services use authorized third-party APIs (such as the official Meta Graph API and Twilio API) to facilitate WhatsApp and Instagram auto-replies. These third parties handle your data in accordance with their respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact us at:
              </p>
              <p className="mt-3 font-medium text-white">
                Email: <a href="mailto:veloradigital77@gmail.com" className="text-[#6c5ce7] hover:underline">veloradigital77@gmail.com</a><br />
                Phone: +91 9921363590<br />
                Goa, India
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(108,92,231,0.15)] py-8 text-center text-sm text-gray-500 bg-[#0a0e1a]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Velora Digital. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/never-miss-a-lead" className="hover:text-white transition-colors">Never Miss a Lead</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
