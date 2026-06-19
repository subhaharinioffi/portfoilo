"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";

// Inline SVG components to resolve brand icon imports from older/newer lucide-react versions
const Github = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact({ preset, data }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const emailAddress = data?.email || "subhahariniofficial@gmail.com";

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactLinks = [
    {
      id: "email",
      label: "Email Me",
      icon: Mail,
      href: `mailto:${emailAddress}`,
      hoverClass: "hover:bg-gold-cream dark:hover:bg-gold-pale/10 hover:text-gold-deep border-border-gold/30 hover:border-gold",
      aria: "Send an email to Subhaharini"
    },
    {
      id: "github",
      label: "GitHub",
      icon: Github,
      href: data?.github || "https://github.com/subhaharinioffi",
      hoverClass: "hover:bg-espresso hover:text-bg hover:border-espresso",
      aria: "Visit Subhaharini's GitHub profile"
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      href: data?.linkedin || "https://www.linkedin.com/in/subha-hariniofficial",
      hoverClass: "hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2]",
      aria: "Visit Subhaharini's LinkedIn profile"
    }
  ];

  return (
    <section 
      id="contact" 
      className="relative w-full bg-espresso py-24 px-6 md:px-12 border-t border-border-theme/40 text-center"
    >
      {/* Background Subtle mesh glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[150px] bg-gold/5 blur-[55px] rounded-full" />
      </div>

      <div className="max-w-[1140px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-gold-pale/10 border border-border-gold/20 text-gold-bright px-3.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-widest mb-4">
            Let's Connect
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-bg">
            Let's <span className="font-serif italic font-medium text-gold">Talk</span>
          </h2>
          <div className="flex items-center justify-center gap-2.5 mt-5">
            <div className="w-10 h-[1px] bg-gold" />
            <div className="w-2 h-2 bg-gold rotate-45 rounded-sm" />
            <div className="w-10 h-[1px] bg-gold" />
          </div>
        </div>

        {/* Envelope Unfold Card */}
        <div className="max-w-[680px] mx-auto perspective-[1500px]">
          <div className="relative rounded-3xl overflow-hidden bg-bg-card/5 border border-border-gold/15 shadow-2xl backdrop-blur-md text-center flex flex-col z-10">
            
            {/* Top Envelope Flap */}
            <motion.div 
              initial={{ rotateX: -90 }}
              whileInView={{ rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              className="absolute top-0 left-0 right-0 h-9 bg-gradient-to-r from-gold via-gold-mid to-gold-bright rounded-t-3xl origin-top z-30 shadow-md"
            />

            {/* Letter Inside */}
            <motion.div 
              initial={{ y: 35, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.2 }}
              className="p-8 md:p-12 bg-espresso/50 rounded-3xl relative z-20 flex flex-col items-center"
            >
              <h3 className="font-display font-extrabold text-bg text-xl md:text-2xl mb-4 flex items-center justify-center gap-2">
                <Mail className="w-6 h-6 text-gold-bright animate-float" />
                Open to Opportunities
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-bg-soft/70 mb-8 max-w-lg mx-auto text-center">
                Innovative and result-driven software developer ready to contribute to dynamic teams. Whether you want to discuss system design, collaborate on a hackathon, or discuss web development — let's connect!
              </p>

              {/* Quick Action Copy Widget (CXO Optimization) */}
              <div className="w-full max-w-[450px] mx-auto flex items-center justify-between p-3.5 rounded-xl bg-espresso/60 border border-bg-soft/10 text-bg-soft/90 text-xs md:text-sm mb-8">
                <span className="font-mono text-bg-soft/60 truncate max-w-[200px] sm:max-w-none">{emailAddress}</span>
                <button
                  onClick={handleCopyEmail}
                  className="ml-3 p-2 rounded-lg bg-bg-soft/10 text-gold-mid hover:text-gold-bright hover:bg-bg-soft/20 transition-all active:scale-95 cursor-pointer"
                  aria-label="Copy email address to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Grid of buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                {contactLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target={link.id === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={link.aria}
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-bg-soft/10 text-bg-soft/90 font-bold text-xs tracking-wider uppercase transition-all duration-300 ${link.hoverClass} hover:-translate-y-1`}
                    >
                      <Icon className="w-4 h-4 text-gold-mid group-hover:text-inherit" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full h-[1px] bg-bg-soft/10 mt-16 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs select-none">
          <div className="text-bg-soft/50 font-display">
            © 2026 <span className="bg-gradient-to-r from-gold to-gold-bright bg-clip-text text-transparent font-bold">Subha.Dev</span> — All Rights Reserved
          </div>
          <div className="text-bg-soft/30 font-mono tracking-widest flex items-center gap-1.5">
            Crafted with Care &amp; Next.js
          </div>
        </div>

      </div>
    </section>
  );
}
