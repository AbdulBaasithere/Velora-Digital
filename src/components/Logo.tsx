import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "w-9 h-9", showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="relative">
        {/* Glow behind the logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-50 blur-md rounded-xl scale-95 group-hover:scale-110 transition-transform duration-500" />
        
        {/* Logo SVG */}
        <svg
          className={`${className} relative z-10 transition-transform duration-500 group-hover:rotate-[10deg]`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6c5ce7" />
              <stop offset="50%" stopColor="#a29bfe" />
              <stop offset="100%" stopColor="#00cec9" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer futuristic tech hexagon */}
          <polygon
            points="50,8 88,30 88,70 50,92 12,70 12,30"
            stroke="url(#logoGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="rgba(10, 14, 26, 0.8)"
            className="transition-all duration-500 group-hover:fill-primary/5"
          />

          {/* Connected network web lines */}
          <line x1="12" y1="30" x2="50" y2="50" stroke="rgba(0, 206, 201, 0.2)" strokeWidth="1.5" />
          <line x1="88" y1="30" x2="50" y2="50" stroke="rgba(108, 92, 231, 0.2)" strokeWidth="1.5" />
          <line x1="50" y1="92" x2="50" y2="50" stroke="rgba(162, 155, 254, 0.2)" strokeWidth="1.5" />

          {/* Stylized premium "V" intersecting shape */}
          <path
            d="M32 32 L50 68 L68 32"
            stroke="url(#logoGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />

          {/* Modern Digital Core Node */}
          <circle cx="50" cy="50" r="5" fill="#ffffff" filter="url(#logoGlow)" />
          <circle cx="32" cy="32" r="3.5" fill="#00cec9" />
          <circle cx="68" cy="32" r="3.5" fill="#6c5ce7" />
          <circle cx="50" cy="68" r="3.5" fill="#a29bfe" />
        </svg>
      </div>

      {showText && (
        <span className="text-xl font-bold text-white tracking-tight">
          Velora <span className="gradient-text font-extrabold">Digital</span>
        </span>
      )}
    </div>
  );
}
