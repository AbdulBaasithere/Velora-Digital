"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ===== SINGLE PLACE TO UPDATE YOUR WHATSAPP NUMBER =====
const WA_NUMBER = "919921363590";

const scenarios = [
  {
    tag: "SALON",
    business: "Sunrise Salon",
    customer: "Hi! Are you free for a haircut today evening?",
    reply: "Hey! We have a 6:30 PM slot open today. Should I book you in?",
    name: "Priya",
    time: "4s",
  },
  {
    tag: "REAL ESTATE",
    business: "Anchor Realty",
    customer: "Is the 2BHK in Porvorim still available?",
    reply: "Yes, it's available! Want me to share the price and set up a visit?",
    name: "Rohan",
    time: "3s",
  },
  {
    tag: "CLINIC",
    business: "Rao Clinic",
    customer: "Can I get an appointment with Dr. Rao tomorrow?",
    reply: "Dr. Rao has an 11 AM slot open tomorrow. Shall I confirm it for you?",
    name: "Ansh",
    time: "5s",
  },
  {
    tag: "GYM",
    business: "FitZone Gym",
    customer: "Do you have a trial pass for this week?",
    reply: "Yes! We offer a free 1-day trial. Want me to block a slot for you?",
    name: "Meera",
    time: "2s",
  },
];

export default function NeverMissALeadPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStickyCtaVisible, setIsStickyCtaVisible] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  // Chat Simulation State
  const [chatLog, setChatLog] = useState<Array<{ type: "customer" | "reply" | "caption"; text: string; time?: string }>>([]);
  const [isTypingLeft, setIsTypingLeft] = useState(false);
  const [isTypingRight, setIsTypingRight] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [leadName, setLeadName] = useState("");

  const currentScenario = scenarios[currentScenarioIndex];

  // Helper for WhatsApp Pre-filled Href
  const getWhatsAppHref = (msg: string) => {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  // Scroll Listeners
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
      setIsStickyCtaVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chat Simulation Effect
  useEffect(() => {
    let isMounted = true;
    let timeouts: NodeJS.Timeout[] = [];

    const delay = (ms: number) => {
      return new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timeouts.push(t);
      });
    };

    const runSimulation = async () => {
      // 1. Reset chat
      if (!isMounted) return;
      setChatLog([]);
      setToastVisible(false);
      setIsTypingLeft(false);
      setIsTypingRight(false);

      await delay(500);

      // 2. Customer Typing
      if (!isMounted) return;
      setIsTypingLeft(true);
      await delay(1100);

      // 3. Customer Bubble
      if (!isMounted) return;
      setIsTypingLeft(false);
      setChatLog([{ type: "customer", text: currentScenario.customer }]);
      await delay(1000);

      // 4. Business Typing
      if (!isMounted) return;
      setIsTypingRight(true);
      await delay(900);

      // 5. Business Reply & Time Caption
      if (!isMounted) return;
      setIsTypingRight(false);
      setChatLog((prev) => [
        ...prev,
        { type: "reply", text: currentScenario.reply },
        { type: "caption", text: `Replied in ${currentScenario.time}` },
      ]);
      await delay(700);

      // 6. Lead Logged Toast Show
      if (!isMounted) return;
      setLeadName(currentScenario.name);
      setToastVisible(true);
      await delay(3200);

      // 7. Toast Hide
      if (!isMounted) return;
      setToastVisible(false);
      await delay(500);

      // 8. Auto-loop to next scenario
      if (isMounted) {
        setCurrentScenarioIndex((prev) => (prev + 1) % scenarios.length);
      }
    };

    runSimulation();

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, [currentScenarioIndex]);

  // Manual Tab Click Handler
  const handleTabClick = (idx: number) => {
    setCurrentScenarioIndex(idx);
  };

  const revealProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            --ink: #0A0A08;
            --surface: #151510;
            --surface-2: #1D1D16;
            --line: rgba(255, 255, 255, .09);
            --ivory: #F4EFE4;
            --body-c: #C7CABF;
            --muted: #95968C;
            --beacon: #FFB238;
            --beacon-ink: #1A1200;
            --radius-lg: 28px;
            --radius-md: 16px;
            --font-serif: "Iowan Old Style", "Palatino Linotype", "URW Palladio L", Georgia, ui-serif, serif;
            --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            --font-mono: "SF Mono", SFMono-Regular, Consolas, "Liberation Mono", Menlo, ui-monospace, monospace;
          }

          .nml-body {
            background: var(--ink);
            color: var(--ivory);
            font-family: var(--font-sans);
            -webkit-font-smoothing: antialiased;
            line-height: 1.5;
            min-height: 100% !important;
          }

          .nml-container {
            width: 100%;
            max-width: 1120px;
            margin-inline: auto;
            padding-inline: 22px;
          }

          .nml-serif {
            font-family: var(--font-serif) !important;
          }

          .nml-mono {
            font-family: var(--font-mono) !important;
          }

          .nml-eyebrow {
            font-family: var(--font-mono);
            font-size: .72rem;
            letter-spacing: .14em;
            text-transform: uppercase;
            color: var(--beacon);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 14px;
          }

          /* ---------- buttons ---------- */
          .nml-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 15px 26px;
            border-radius: 999px;
            font-weight: 600;
            font-size: .96rem;
            cursor: pointer;
            border: 1px solid transparent;
            transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
            white-space: nowrap;
          }

          .nml-btn-primary {
            background: var(--beacon);
            color: var(--beacon-ink);
          }

          .nml-btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 14px 32px -14px rgba(255, 178, 56, .55);
          }

          .nml-btn-primary:focus-visible {
            outline: 2px solid var(--ivory);
            outline-offset: 3px;
          }

          .nml-btn-ghost {
            background: transparent;
            border-color: var(--line);
            color: var(--ivory);
          }

          .nml-btn-ghost:hover {
            border-color: rgba(255, 178, 56, .5);
          }

          .nml-btn svg {
            width: 17px;
            height: 17px;
            flex: none;
          }

          .nml-beacon-wrap {
            position: relative;
            display: inline-flex;
          }

          .nml-beacon-wrap::before {
            content: "";
            position: absolute;
            inset: -8px;
            border-radius: 999px;
            border: 1px solid rgba(255, 178, 56, .5);
            animation: pulseRing 2.6s ease-out infinite;
          }

          @keyframes pulseRing {
            0% {
              transform: scale(.9);
              opacity: .75;
            }
            80% {
              transform: scale(1.35);
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }

          .nml-status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--beacon);
            flex: none;
            animation: statusPulse 2.2s infinite;
          }

          .nml-status-dot.small {
            width: 6px;
            height: 6px;
          }

          @keyframes statusPulse {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 178, 56, .55);
            }
            70% {
              box-shadow: 0 0 0 8px rgba(255, 178, 56, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 178, 56, 0);
            }
          }

          /* ---------- topbar ---------- */
          .nml-topbar {
            position: sticky;
            top: 0;
            z-index: 40;
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            background: rgba(10, 10, 8, .72);
            border-bottom: 1px solid transparent;
            transition: border-color .25s ease;
          }

          .nml-topbar.scrolled {
            border-bottom-color: var(--line);
          }

          .nml-topbar-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-block: 14px;
          }

          .nml-brand {
            font-family: var(--font-serif);
            font-size: 1.05rem;
          }

          .nml-topbar-cta {
            font-family: var(--font-mono);
            font-size: .72rem;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: var(--beacon);
            border: 1px solid rgba(255, 178, 56, .35);
            padding: 8px 14px;
            border-radius: 999px;
          }

          /* ---------- hero ---------- */
          .nml-hero {
            position: relative;
            overflow: hidden;
            padding-block: 48px 72px;
          }

          .nml-hero::before {
            content: "";
            position: absolute;
            top: -260px;
            left: 50%;
            transform: translateX(-50%);
            width: 900px;
            height: 900px;
            background: radial-gradient(circle, rgba(255, 178, 56, .13), transparent 62%);
            pointer-events: none;
            z-index: 0;
          }

          .nml-hero-inner {
            display: grid;
            gap: 52px;
            position: relative;
            z-index: 1;
          }

          @media (min-width: 900px) {
            .nml-hero-inner {
              grid-template-columns: 1.05fr .95fr;
              align-items: center;
              gap: 40px;
            }
          }

          .nml-hero-sub {
            font-size: 1.02rem;
            line-height: 1.6;
            max-width: 46ch;
            margin: 18px 0 30px;
          }

          .nml-hero-cta-row {
            margin-bottom: 16px;
          }

          .nml-hero-proof {
            font-family: var(--font-mono);
            font-size: .74rem;
            color: var(--muted);
            letter-spacing: .02em;
          }

          /* ---------- phone / demo ---------- */
          .nml-hero-demo {
            text-align: center;
          }

          .nml-scenario-tabs {
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 20px;
          }

          .nml-tab {
            font-family: var(--font-mono);
            font-size: .66rem;
            letter-spacing: .06em;
            text-transform: uppercase;
            padding: 6px 11px;
            border-radius: 999px;
            border: 1px solid var(--line);
            color: var(--muted);
            transition: all .3s ease;
            cursor: pointer;
          }

          .nml-tab.active {
            color: var(--beacon-ink);
            background: var(--beacon);
            border-color: var(--beacon);
          }

          .nml-phone-shell {
            width: min(300px, 82vw);
            aspect-ratio: 9/19.3;
            margin: 0 auto;
            border-radius: 42px;
            padding: 9px;
            background: linear-gradient(155deg, #26261F, #0C0C09 62%);
            box-shadow: 0 34px 64px -22px rgba(0, 0, 0, .75), inset 0 0 0 1px rgba(255, 255, 255, .06);
            position: relative;
          }

          .nml-phone-notch {
            position: absolute;
            top: 9px;
            left: 50%;
            transform: translateX(-50%);
            width: 84px;
            height: 20px;
            background: #0C0C09;
            border-radius: 12px;
            z-index: 2;
          }

          .nml-phone-screen {
            width: 100%;
            height: 100%;
            border-radius: 33px;
            background: var(--ink);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
          }

          .nml-chat-header {
            padding: 26px 16px 10px;
            border-bottom: 1px solid var(--line);
            display: flex;
            flex-direction: column;
            gap: 4px;
            text-align: left;
          }

          .nml-chat-business {
            font-size: .86rem;
            font-weight: 600;
            color: var(--ivory);
          }

          .nml-chat-status {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-mono);
            font-size: .63rem;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: .06em;
          }

          .nml-chat-log {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            gap: 8px;
            padding: 14px;
            overflow: hidden;
          }

          .nml-bubble {
            max-width: 82%;
            padding: 9px 12px;
            border-radius: 15px;
            font-size: .78rem;
            line-height: 1.38;
            text-align: left;
            animation: bubbleIn .35s ease both;
          }

          .nml-bubble.customer {
            align-self: flex-start;
            background: var(--surface-2);
            color: var(--ivory);
            border-bottom-left-radius: 4px;
          }

          .nml-bubble.reply {
            align-self: flex-end;
            background: var(--beacon);
            color: var(--beacon-ink);
            border-bottom-right-radius: 4px;
          }

          @keyframes bubbleIn {
            from {
              opacity: 0;
              transform: translateY(6px) scale(.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .nml-bubble-caption {
            align-self: flex-end;
            font-family: var(--font-mono);
            font-size: .6rem;
            color: var(--muted);
          }

          .nml-typing {
            display: inline-flex;
            gap: 4px;
            padding: 11px 13px;
            background: var(--surface-2);
            border-radius: 15px;
            border-bottom-left-radius: 4px;
            align-self: flex-start;
          }

          .nml-typing.right {
            align-self: flex-end;
            background: rgba(255, 178, 56, .16);
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 4px;
          }

          .nml-typing span {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--muted);
            animation: typingBounce 1.2s infinite ease-in-out;
          }

          .nml-typing.right span {
            background: var(--beacon);
          }

          .nml-typing span:nth-child(2) {
            animation-delay: .15s;
          }

          .nml-typing span:nth-child(3) {
            animation-delay: .3s;
          }

          @keyframes typingBounce {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: .5;
            }
            30% {
              transform: translateY(-4px);
              opacity: 1;
            }
          }

          .nml-lead-toast {
            position: absolute;
            left: 50%;
            bottom: 14px;
            transform: translate(-50%, 10px);
            background: var(--ivory);
            color: var(--ink);
            font-family: var(--font-mono);
            font-size: .6rem;
            padding: 7px 12px;
            border-radius: 999px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity .35s ease, transform .35s ease;
            z-index: 3;
          }

          .nml-lead-toast.show {
            opacity: 1;
            transform: translate(-50%, 0);
          }

          .nml-demo-note {
            font-family: var(--font-mono);
            font-size: .68rem;
            color: var(--muted);
            margin-top: 18px;
          }

          /* ---------- sections ---------- */
          .nml-section {
            padding-block: 64px;
          }

          @media (min-width: 900px) {
            .nml-section {
              padding-block: 104px;
            }
          }

          .nml-section-head {
            max-width: 56ch;
            margin-bottom: 44px;
          }

          .nml-section-head h2 {
            margin-top: 8px;
          }

          /* how it works */
          .nml-how {
            border-top: 1px solid var(--line);
          }

          .nml-how-list {
            display: flex;
            flex-direction: column;
          }

          .nml-how-row {
            display: grid;
            grid-template-columns: 60px 1fr;
            gap: 20px;
            position: relative;
            padding-bottom: 38px;
          }

          .nml-how-row:last-child {
            padding-bottom: 0;
          }

          .nml-how-row::before {
            content: "";
            position: absolute;
            left: 29px;
            top: 34px;
            bottom: -4px;
            width: 1px;
            background: var(--line);
          }

          .nml-how-row:last-child::before {
            display: none;
          }

          .nml-how-time {
            font-family: var(--font-mono);
            font-size: .82rem;
            color: var(--beacon);
            padding-top: 2px;
          }

          .nml-how-copy p {
            font-size: .95rem;
            max-width: 44ch;
          }

          /* pricing */
          .nml-pricing {
            border-top: 1px solid var(--line);
          }

          .nml-price-card {
            background: var(--surface);
            border: 1px solid var(--line);
            border-radius: var(--radius-lg);
            padding: 30px 26px;
          }

          .nml-price-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            flex-wrap: wrap;
          }

          .nml-price-desc {
            font-size: .9rem;
            max-width: 38ch;
            margin-top: 4px;
          }

          .nml-price-amount {
            font-family: var(--font-mono);
            font-size: 1.28rem;
            color: var(--beacon);
            text-align: right;
            white-space: nowrap;
          }

          .nml-price-amount-muted {
            color: var(--ivory);
            opacity: .85;
          }

          .nml-price-unit {
            display: block;
            font-size: .66rem;
            color: var(--muted);
            font-weight: 400;
            margin-top: 3px;
          }

          .nml-price-optional {
            font-family: var(--font-mono);
            font-size: .62rem;
            text-transform: uppercase;
            letter-spacing: .06em;
            color: var(--muted);
            border: 1px solid var(--line);
            padding: 2px 7px;
            border-radius: 999px;
            margin-left: 8px;
            vertical-align: middle;
          }

          .nml-price-list {
            list-style: none;
            margin: 26px 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .nml-price-list li {
            padding-left: 22px;
            position: relative;
            font-size: .88rem;
            color: var(--body-c);
          }

          .nml-price-list li::before {
            content: "→";
            position: absolute;
            left: 0;
            color: var(--beacon);
          }

          .nml-price-divider {
            height: 1px;
            background: var(--line);
            margin: 26px 0;
          }

          /* status strip */
          .nml-status-strip {
            border-top: 1px solid var(--line);
            padding-block: 44px;
          }

          .nml-status-strip-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .nml-status-strip-inner p {
            font-family: var(--font-mono);
            font-size: .8rem;
            letter-spacing: .03em;
            color: var(--body-c);
            margin: 0;
          }

          /* footer */
          .nml-footer {
            border-top: 1px solid var(--line);
            padding-block: 52px 26px;
          }

          @media (max-width: 899px) {
            .nml-footer {
              padding-bottom: 104px;
            }
          }

          .nml-footer-inner {
            display: flex;
            flex-direction: column;
            gap: 22px;
            align-items: flex-start;
          }

          @media (min-width: 640px) {
            .nml-footer-inner {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
          }

          .nml-footer-brand {
            font-family: var(--font-serif);
            font-size: 1.25rem;
            color: var(--ivory);
            margin-bottom: 6px;
          }

          .nml-footer-tagline {
            font-family: var(--font-mono);
            font-size: .72rem;
            color: var(--muted);
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .nml-footer-fine {
            margin-top: 34px;
            font-size: .7rem;
            color: var(--muted);
            border-top: 1px solid var(--line);
            padding-top: 18px;
          }

          /* sticky mobile cta */
          .nml-sticky-cta {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 50;
            padding: 14px 0 calc(14px + env(safe-area-inset-bottom));
            background: linear-gradient(180deg, rgba(10, 10, 8, 0) 0%, var(--ink) 40%);
            transform: translateY(120%);
            transition: transform .3s ease;
          }

          .nml-sticky-cta.visible {
            transform: translateY(0);
          }

          .nml-sticky-cta .nml-btn {
            width: 100%;
          }

          @media (min-width: 900px) {
            .nml-sticky-cta {
              display: none;
            }
          }
          `,
        }}
      />

      <div className="nml-body min-h-screen relative selection:bg-amber-500/30 selection:text-white">
        {/* TOPBAR */}
        <header className={`nml-topbar ${isScrolled ? "scrolled" : ""}`} id="topbar">
          <div className="nml-container nml-topbar-inner">
            <Link href="/" className="nml-brand nml-serif text-white hover:text-[#FFB238] transition-colors">
              ← Velora Digital
            </Link>
            <span className="nml-brand nml-serif font-medium text-white hidden sm:inline">Never Miss a Lead</span>
            <a
              href={getWhatsAppHref("Hi! I'd like to know more about Never Miss a Lead.")}
              className="nml-topbar-cta nml-mono hover:bg-[#FFB238]/10 transition-colors"
            >
              Chat
            </a>
          </div>
        </header>

        <main>
          {/* HERO */}
          <section className="nml-hero" id="hero">
            <div className="nml-container">
              <div className="nml-hero-inner">
                {/* Hero Copy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-start"
                >
                  <p className="nml-eyebrow">For salons · clinics · real estate · gyms in Goa</p>
                  <h1 className="nml-serif font-medium text-white mb-6">
                    The customer you don&apos;t reply to in five minutes just messaged your competitor.
                  </h1>
                  <p className="nml-hero-sub text-[#C7CABF] mb-8">
                    Never Miss a Lead answers every WhatsApp and Instagram message the second it lands — day or night —
                    so no booking, no query, and no customer slips through while you&apos;re busy with the one in front of
                    you.
                  </p>
                  <div className="nml-hero-cta-row mb-6">
                    <span className="nml-beacon-wrap">
                      <a
                        href={getWhatsAppHref(
                          "Hi! I saw the Never Miss a Lead page and I'd like to set this up for my business."
                        )}
                        className="nml-btn nml-btn-primary"
                      >
                        <svg className="w-[17px] h-[17px] mr-1" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 3C7.03 3 3 6.58 3 11c0 2.08.9 3.97 2.38 5.4-.16 1.3-.62 2.53-1.28 3.5a.5.5 0 00.54.77c1.72-.42 3.2-1.12 4.36-1.9 1.03.3 2.14.46 3.3.46 4.97 0 9-3.58 9-8s-4.03-8-9-8z"
                            fill="currentColor"
                          />
                        </svg>
                        Chat on WhatsApp
                      </a>
                    </span>
                  </div>
                  <p className="nml-hero-proof">Live in Goa · Set up in a few days · Nothing new for you to learn</p>
                </motion.div>

                {/* Live Demo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="nml-hero-demo flex flex-col items-center justify-center"
                >
                  <p className="nml-eyebrow" style={{ justifyContent: "center" }}>
                    Live demo
                  </p>
                  <div className="nml-scenario-tabs mb-6" id="scenarioTabs">
                    {scenarios.map((s, idx) => (
                      <span
                        key={s.tag}
                        onClick={() => handleTabClick(idx)}
                        className={`nml-tab ${currentScenarioIndex === idx ? "active" : ""}`}
                      >
                        {s.tag.toLowerCase()}
                      </span>
                    ))}
                  </div>

                  <div className="nml-phone-shell">
                    <div className="nml-phone-notch"></div>
                    <div className="nml-phone-screen">
                      <div className="nml-chat-header">
                        <div className="nml-chat-business">{currentScenario.business}</div>
                        <div className="nml-chat-status">
                          <span className="nml-status-dot"></span>Online
                        </div>
                      </div>

                      <div className="nml-chat-log min-h-[180px]">
                        {chatLog.map((chat, idx) => {
                          if (chat.type === "customer") {
                            return (
                              <div key={idx} className="nml-bubble customer">
                                {chat.text}
                              </div>
                            );
                          } else if (chat.type === "reply") {
                            return (
                              <div key={idx} className="nml-bubble reply">
                                {chat.text}
                              </div>
                            );
                          } else {
                            return (
                              <div key={idx} className="nml-bubble-caption">
                                {chat.text}
                              </div>
                            );
                          }
                        })}

                        {isTypingLeft && (
                          <div className="nml-typing">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        )}

                        {isTypingRight && (
                          <div className="nml-typing right">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        )}
                      </div>

                      <div className={`nml-lead-toast ${toastVisible ? "show" : ""}`}>
                        ✓ Lead logged — <span>{leadName}</span>
                      </div>
                    </div>
                  </div>
                  <p className="nml-demo-note">This is a live simulation — click any tab to switch industries.</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="nml-section nml-how" id="how">
            <div className="nml-container">
              <motion.div {...revealProps} className="nml-section-head">
                <p className="nml-eyebrow">How it works</p>
                <h2 className="nml-serif font-medium text-white text-3xl">
                  From message to booked lead, before you&apos;ve even picked up your phone.
                </h2>
              </motion.div>
              <div className="nml-how-list">
                <motion.div {...revealProps} className="nml-how-row">
                  <div className="nml-how-time">0:00</div>
                  <div className="nml-how-copy">
                    <h3 className="nml-serif font-semibold text-lg text-white">Customer messages you</h3>
                    <p className="text-[#C7CABF]">
                      On WhatsApp or Instagram, any time of day — about a booking, a price, or an open slot.
                    </p>
                  </div>
                </motion.div>
                <motion.div {...revealProps} className="nml-how-row">
                  <div className="nml-how-time">0:02</div>
                  <div className="nml-how-copy">
                    <h3 className="nml-serif font-semibold text-lg text-white">Your AI replies instantly</h3>
                    <p className="text-[#C7CABF]">
                      It answers in your tone, asks what they need, and qualifies the lead — even at 11 PM.
                    </p>
                  </div>
                </motion.div>
                <motion.div {...revealProps} className="nml-how-row">
                  <div className="nml-how-time">0:05</div>
                  <div className="nml-how-copy">
                    <h3 className="nml-serif font-semibold text-lg text-white">The lead is logged automatically</h3>
                    <p className="text-[#C7CABF]">
                      Name, message and what they wanted — saved for you, so nothing gets buried in chat.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="nml-section nml-pricing" id="pricing">
            <div className="nml-container">
              <motion.div {...revealProps} className="nml-section-head">
                <p className="nml-eyebrow">Pricing</p>
                <h2 className="nml-serif font-medium text-white text-3xl">Set up once. It runs every night after that.</h2>
              </motion.div>

              <motion.div {...revealProps} className="nml-price-card">
                <div className="nml-price-row">
                  <div>
                    <h3 className="nml-serif font-semibold text-xl text-white">Setup</h3>
                    <p className="nml-price-desc text-[#C7CABF]">
                      Built around your business and connected to your number. Live in a few days.
                    </p>
                  </div>
                  <div className="nml-price-amount">
                    ₹8,000–₹15,000<span className="nml-price-unit">one-time</span>
                  </div>
                </div>

                <ul className="nml-price-list">
                  <li>Replies written in your voice, not a generic bot script</li>
                  <li>Works on WhatsApp and Instagram DMs</li>
                  <li>Every lead logged automatically, nothing to check manually</li>
                </ul>

                <div className="nml-price-divider"></div>

                <div className="nml-price-row">
                  <div>
                    <h3 className="nml-serif font-semibold text-xl text-white">
                      Care plan<span className="nml-price-optional">optional</span>
                    </h3>
                    <p className="nml-price-desc text-[#C7CABF]">
                      If you&apos;d rather not touch it — replies get reviewed and tuned every month.
                    </p>
                  </div>
                  <div className="nml-price-amount nml-price-amount-muted">
                    ₹2,000–₹5,000<span className="nml-price-unit">/month</span>
                  </div>
                </div>

                <div className="mt-7">
                  <a
                    href={getWhatsAppHref("Hi! I'd like to know more about pricing for Never Miss a Lead.")}
                    className="nml-btn nml-btn-ghost hover:text-white"
                  >
                    Ask about pricing
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* STATUS STRIP */}
          <section className="nml-status-strip" id="status">
            <div className="nml-container">
              <motion.div {...revealProps} className="nml-status-strip-inner">
                <span className="nml-status-dot small"></span>
                <p className="text-[#C7CABF]">Now onboarding first clients in Goa</p>
              </motion.div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="nml-footer" id="contact">
          <div className="nml-container">
            <div className="nml-footer-inner">
              <div>
                <p className="nml-footer-brand nml-serif font-medium">Never Miss a Lead</p>
                <p className="nml-footer-tagline">
                  <span className="nml-status-dot small"></span>Taking on new businesses in Goa
                </p>
              </div>
              <a
                href={getWhatsAppHref("Hi! I'd like to talk about setting up Never Miss a Lead for my business.")}
                className="nml-btn nml-btn-primary"
              >
                Chat on WhatsApp
              </a>
            </div>
            <div className="nml-footer-fine text-xs">
              © {new Date().getFullYear()} Never Miss a Lead · Powered by{" "}
              <Link href="/" className="underline text-[#FFB238] hover:text-[#FFB238]/80 transition-colors">
                Velora Digital
              </Link>{" "}
              · Built for salons, clinics, real estate &amp; gyms across Goa ·{" "}
              <Link href="/privacy" className="text-[#95968C] underline underline-offset-2">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>

        {/* STICKY BOTTOM CTA */}
        <div className={`nml-sticky-cta ${isStickyCtaVisible ? "visible" : ""}`} id="stickyCta">
          <div className="nml-container">
            <a
              href={getWhatsAppHref("Hi! I saw the Never Miss a Lead page and I'd like to know more.")}
              className="nml-btn nml-btn-primary w-full"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
