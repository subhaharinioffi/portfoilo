"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Link as LinkIcon } from "lucide-react";

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

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border-soft dark:border-border-theme/40 bg-bg-card dark:bg-bg-soft overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-display font-bold text-xs md:text-sm text-espresso select-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="text-gold-mid transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="p-4 pt-0 text-xs md:text-sm leading-relaxed text-mid-text border-t border-border-soft/50 dark:border-border-theme/20">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const highlights = [
    { 
      icon: GraduationCap, 
      title: "8.12 CGPA", 
      desc: "B.Sc. Computer Technology" 
    },
    { 
      icon: LinkIcon, 
      title: "2 Live Projects", 
      desc: "Zentix & SkipQ Systems" 
    },
    { 
      icon: Award, 
      title: "Oracle Certified", 
      desc: "Java Foundations 2026" 
    }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full bg-bg py-24 px-6 md:px-12 border-t border-border-soft"
    >
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
          
          {/* Left Column: Color Grading Slider & Image */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.7rem] font-bold uppercase tracking-widest text-gold-deep dark:text-gold-bright font-display text-center lg:text-left">
              ✦ Video Editing & Post Production
            </h4>
            <h3 className="font-display text-xl font-extrabold text-espresso tracking-tight text-center lg:text-left mb-2">
              DaVinci Resolve <span className="font-serif italic font-medium text-gold">Color Grading</span>
            </h3>

            {/* Slider Container */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-border-gold/30 cursor-ew-resize select-none bg-bg-soft"
            >
              {/* Bottom Image (Color Graded - Beautiful, Vibrant) */}
              <img 
                src="/photo2.jpg.jpg" 
                alt="Color Graded Portrait of Subhaharini, showcasing professional post-production Rec.709 profile" 
                width="500"
                height="625"
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
              />

              {/* Top Image (Raw Log - Flat, Low Saturation/Contrast) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
              >
                <img 
                  src="/photo2.jpg.jpg" 
                  alt="Raw flat log portrait profile of Subhaharini before professional color grading" 
                  width="500"
                  height="625"
                  className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none filter saturate-[0.35] contrast-[0.7] brightness-[1.08] sepia-[0.08]"
                  style={{ width: containerRef.current?.getBoundingClientRect().width }}
                />
              </div>

              {/* Slider Handle Line */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20 shadow-lg"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Drag Handle Bubble */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-espresso text-bg flex items-center justify-center text-xs font-bold font-sans border border-gold shadow-2xl">
                  ↔
                </div>
              </div>

              {/* Badges */}
              <span className="absolute bottom-4 left-4 z-30 px-3 py-1 text-[0.65rem] font-bold uppercase bg-espresso/80 text-bg rounded-md backdrop-blur">
                Ungraded Log
              </span>
              <span className="absolute bottom-4 right-4 z-30 px-3 py-1 text-[0.65rem] font-bold uppercase bg-gold/90 text-bg rounded-md backdrop-blur">
                Graded Rec.709
              </span>
            </div>
            <p className="text-[0.7rem] text-center text-muted-text italic">
              Hover or drag to preview color correction profile
            </p>
          </div>

          {/* Right Column: Bio & Info */}
          <div className="flex flex-col text-left">
            <h2 className="font-display text-3xl md:text-5xl font-black text-espresso mb-6">
              About <span className="font-serif italic font-medium text-gold">Subhaharini</span>
            </h2>

            <p className="font-sans text-sm md:text-base leading-relaxed text-mid-text mb-6">
              I'm Subhaharini, an innovative and result-driven software developer pursuing B.Sc. Computer Technology at Rathinam Group of Institutions (2024–2027). I'm passionate about building scalable, real-world solutions and actively involved in the design phase, with a keen interest in UI/UX and creating user-centric experiences. Driven by a deep passion for Java, web development, and creative designing, I bring precision and detail to every system I architect, software I build, and video I color grade.
            </p>

            {/* Highlight items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div 
                    key={i}
                    className="flex flex-col p-4 rounded-2xl bg-bg-card dark:bg-bg-soft border border-border-soft dark:border-border-theme/40 shadow-xs hover:border-border-gold transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-champagne dark:bg-gold-pale/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-gold-mid" />
                    </div>
                    <strong className="text-sm text-espresso font-display">{h.title}</strong>
                    <span className="text-xs text-muted-text mt-1">{h.desc}</span>
                  </div>
                );
              })}
            </div>

            {/* Credentials Table (GEO Optimization) */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-border-soft dark:border-border-theme/40 bg-bg-card dark:bg-bg-soft shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gold-cream dark:bg-gold-pale/10 border-b border-border-soft dark:border-border-theme/30 text-gold-deep dark:text-gold-bright uppercase tracking-wider font-display font-bold">
                    <th className="p-3">Category</th>
                    <th className="p-3">Verified Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft dark:divide-border-theme/20 text-mid-text">
                  <tr>
                    <td className="p-3 font-semibold text-espresso">Education</td>
                    <td className="p-3">
                      B.Sc. Computer Technology, <a href="https://www.rathinamcollege.edu.in/" target="_blank" rel="noopener noreferrer" className="underline text-gold-deep dark:text-gold hover:text-gold-mid">Rathinam Group of Institutions</a> (2024–2027)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-espresso">Credentials</td>
                    <td className="p-3">Oracle Certified Java Foundations Associate (2026)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-espresso">Performance</td>
                    <td className="p-3">Current Academic Record: 8.12 CGPA</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-espresso">Key Projects</td>
                    <td className="p-3">
                      <a href="#projects" className="underline text-gold-deep dark:text-gold hover:text-gold-mid">Zentix</a> (Campus Navigation),{" "}
                      <a href="#projects" className="underline text-gold-deep dark:text-gold hover:text-gold-mid">SkipQ</a> (Queue System, 35% time cut)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-espresso">Key Awards</td>
                    <td className="p-3">TN-IMPACT Special Prize, AlgoRhythm '26 First Place, Queenathon Viral Visionary</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap mb-8">
              <a 
                href="https://github.com/subhaharinioffi" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit Subhaharini's GitHub Profile"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold to-gold-bright text-espresso font-bold text-xs tracking-wider uppercase rounded-full shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4" />
                🐙 GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/subha-hariniofficial" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit Subhaharini's LinkedIn Profile"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-espresso text-bg dark:bg-espresso dark:text-bg font-bold text-xs tracking-wider uppercase rounded-full border border-espresso hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Linkedin className="w-4 h-4" />
                💼 LinkedIn
              </a>
            </div>

            {/* Conversational FAQ Accordion (AEO Optimization) */}
            <div className="border-t border-border-soft dark:border-border-theme/40 pt-8">
              <h4 className="font-display font-extrabold text-espresso text-base mb-4 flex items-center gap-2">
                <span>✦</span> FAQ &amp; Quick Facts (Generative AI Q&amp;A)
              </h4>
              <div className="flex flex-col gap-3">
                <FAQItem 
                  question="What technical stacks and programming languages does Subhaharini use?"
                  answer="Subhaharini is highly skilled in Core Java (Oracle Certified Associate) and web development technologies. Her stack includes Java, C, HTML/CSS, JavaScript, Next.js, PostgreSQL, Bun.js, and Elysia.js."
                />
                <FAQItem 
                  question="What are some of Subhaharini's award-winning projects?"
                  answer="Subhaharini has architected Zentix, a real-time smart campus navigation and resource tracking system, and SkipQ, a scalable queue management system that optimized wait times by 35%."
                />
                <FAQItem 
                  question="Has Subhaharini won any hackathons or competitions?"
                  answer="Yes, she is a state-level hackathon competitor. Her awards include the Special Prize at the TN-IMPACT 2026 Industrial Hackathon, 1st place in AlgoRhythm '26, and Best Manager at Hindustan College."
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
