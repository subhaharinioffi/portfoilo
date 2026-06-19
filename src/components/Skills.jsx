"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Layers, Cpu, Heart, CheckCircle2, Navigation } from "lucide-react";

function SkillCard({ title, icon: Icon, chips, preset, index }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    setSpotlight({ x, y });

    if (preset === "meta") {
      const rx = -(y - box.height / 2) / (box.height / 15); // max 15 deg
      const ry = (x - box.width / 2) / (box.width / 15);
      setRotateX(rx);
      setRotateY(ry);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const isGoogle = preset === "google";

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: isGoogle ? "spring" : "tween",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="relative rounded-2xl p-6 bg-bg-card dark:bg-bg-soft border border-border-soft dark:border-border-theme/40 shadow-sm transition-all duration-300 overflow-hidden cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "none" : "transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease"
      }}
      whileHover={{
        y: -5,
        borderColor: "var(--gold)",
        boxShadow: "var(--shadow-md)"
      }}
    >
      {/* Microsoft Spotlight */}
      {preset === "microsoft" && (
        <div 
          className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay"
          style={{
            background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, rgba(179,138,43,0.18), transparent 80%)`
          }}
        />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-xl bg-champagne dark:bg-gold-pale/10 flex items-center justify-center border border-border-soft dark:border-border-theme/20">
            <Icon className="w-5 h-5 text-gold-mid" />
          </div>
          <span className="font-display font-bold text-espresso text-base">{title}</span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {chips.map((chip, idx) => (
            <span
              key={idx}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-default ${
                idx % 2 === 0
                  ? "bg-bg-soft dark:bg-bg-warm border-border-soft dark:border-border-theme/20 text-mid-text hover:bg-gold-cream dark:hover:bg-gold-pale/15 hover:text-gold-deep"
                  : "bg-gold-cream/40 dark:bg-gold-pale/5 border-border-gold/30 text-gold-deep dark:text-gold-bright hover:bg-gold-cream dark:hover:bg-gold-pale/15"
              }`}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills({ preset }) {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      chips: ["Java", "C", "HTML", "CSS", "JavaScript"]
    },
    {
      title: "Frameworks & Backend",
      icon: Layers,
      chips: ["Next.js", "Bun.js", "Elysia.js", "PostgreSQL"]
    },
    {
      title: "Tools & Software",
      icon: Cpu,
      chips: ["DaVinci Resolve", "Git & GitHub", "VS Code", "Antigravity"]
    },
    {
      title: "Soft Skills",
      icon: Heart,
      chips: ["Problem Solving", "Leadership", "Communication", "Quick Learner"]
    },
    {
      title: "Certifications",
      icon: CheckCircle2,
      chips: ["Oracle Java Foundations"]
    },
    {
      title: "Currently Exploring",
      icon: Navigation,
      chips: ["UI/UX", "DSA"]
    }
  ];

  return (
    <section 
      id="skills" 
      className="relative w-full bg-bg-soft dark:bg-bg-card py-24 px-6 md:px-12 border-t border-border-soft"
    >
      <div className="max-w-[1140px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 text-gold-deep dark:text-gold-bright px-3.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-widest mb-4">
            ✦ Tech Stack
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-espresso">
            Skills &amp; <span className="font-serif italic font-medium text-gold">Technologies</span>
          </h2>
          <div className="flex items-center justify-center gap-2.5 mt-5">
            <div className="w-10 h-[1px] bg-gold" />
            <div className="w-2 h-2 bg-gold rotate-45 rounded-sm" />
            <div className="w-10 h-[1px] bg-gold" />
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((cat, i) => (
            <SkillCard
              key={i}
              index={i}
              title={cat.title}
              icon={cat.icon}
              chips={cat.chips}
              preset={preset}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
