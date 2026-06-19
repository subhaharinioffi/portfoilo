"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

// Native SVG logo icons for skills (SXO & Visual Polish)
const JavaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-[#E76F00] inline-block align-middle" fill="currentColor">
    <path d="M19.13 15.69c-1.32-.44-3.05-.72-4.83-.8v.02c1.4.15 2.65.41 3.53.78.43.18.66.39.66.61 0 .42-.76.84-2.18 1.15-2.02.43-5.26.54-7.5.25-.33-.04-.64-.09-.94-.15.93.36 2.05.62 3.19.78 1.83.25 4.54.19 6.78-.29 2.03-.43 3.03-1.11 3.03-1.92 0-.39-.24-.76-.74-1.04zm-4.71-3.66c-.34-.09-.69-.17-1.04-.25v-.17c1.3.33 2.1-.96 2.1-1.58 0-.52-.56-.99-1.57-1.29-1.28-.38-3.02-.45-4.4-.23-.27.04-.54.1-.79.16.71.18 1.34.45 1.8.76.45.31.68.68.68 1.05 0 .53-.51 1.01-1.42 1.34-.69.25-1.59.45-2.58.54.91.13 1.93.18 2.9.12 1.63-.1 3.65-.48 4.97-.93.52-.18.78-.4.78-.66.01-.22-.19-.44-.63-.61zM6.16 18.23c-1.3-.23-2.32-.73-2.9-1.42a2 2 0 0 1-.36-1.12c0-.52.26-1 .73-1.39l.71.69c-.43.34-.64.69-.64.99 0 .42.5.83 1.41 1.09 1.54.42 4.19.46 5.64.08.3-.08.57-.18.82-.29-.93-.16-1.85-.43-2.65-.82-1.37-.66-2.07-1.57-2.07-2.67 0-1.74 1.77-3.13 4.29-3.77 1.48-.38 3.12-.47 4.5-.24.58.1.98.24 1.15.42.34.34.28.87-.19 1.46-.42.53-1.07.96-1.88 1.25.76.24 1.39.56 1.83.94.57.48.87 1.09.87 1.77 0 1.29-1.06 2.37-2.92 2.97-1.87.61-4.72.77-6.39.46v.14zm5.55-5.9c-2 .5-3.32 1.45-3.32 2.38 0 .8.9 1.49 2.5 1.88.58.14 1.22.23 1.86.26l.46-.22c1-.48 1.58-1.12 1.58-1.79 0-.82-.77-1.55-2.05-2.01-.32-.12-.66-.23-1.03-.33v-.17z"/>
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-espresso dark:text-bg inline-block align-middle" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5l-3-4.5v4.5H9.5v-7h1.25l3.25 4.88V9.5H15v7h-2z"/>
  </svg>
);

const JsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-[#F7DF1E] inline-block align-middle" fill="currentColor">
    <rect width="24" height="24" fill="#F7DF1E" rx="3" />
    <path d="M1.5 0h21v21h-21z" fill="none" />
    <path d="M18.8 17.2c-.8.8-2 1.2-3.2 1.2-2.3 0-3.6-1.1-4.1-2.4l2.1-1.2c.3.8.9 1.4 1.8 1.4 1 0 1.5-.4 1.5-1.2v-7.2h2.5v7.2c-.1 1.6-.7 2.8-2.6 2.8zm-7.6-.2c-.6 1.1-1.8 1.6-3.2 1.6-2.5 0-4-1.5-4-3.8 0-2.5 1.7-4 4.3-4 .8 0 1.8.3 2.3.8V8H5.6V5.8h7.7v10c-.1 1.3-.8 2-2.1 2.2z" fill="#000000"/>
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-[#1572B6] inline-block align-middle" fill="currentColor">
    <path d="M1.5 0h21v21h-21z" fill="none" />
    <path d="M12 2L2 22h20L12 2zm0 3.2l7.1 14.2H4.9L12 5.2z"/>
  </svg>
);

const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-[#E34F26] inline-block align-middle" fill="currentColor">
    <path d="M1.5 0h21v21h-21z" fill="none" />
    <path d="M2.68 2.3L4.2 17.5l7.8 2.2 7.8-2.2 1.52-15.2H2.68zm14.1 4.5h-8l.2 2.2h7.8l-.5 5-4.28 1.2-4.28-1.2-.26-2.8H9.7l.14 1.5 2.16.6 2.16-.6.24-2.5H4.8l-.5-5H17l-.22 2.2z"/>
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-[#336791] inline-block align-middle" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z"/>
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-[#F05032] inline-block align-middle" fill="currentColor">
    <path d="M23.3 11.7L12.3.7c-.8-.8-2-.8-2.8 0L8.3 2.1l3 3c.7-.2 1.6 0 2.2.6.6.6.8 1.5.6 2.2l3 3c.7-.2 1.6 0 2.2.6.8.8.8 2 0 2.8s-2 .8-2.8 0c-.6-.6-.8-1.5-.6-2.2l-3-3v4.6c.3.2.5.5.5.9 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.7.5-.9V9.1L6.7 12c-.2.7-.6 1.1-1.2 1.3-.8.8-2 .8-2.8 0s-.8-2 0-2.8c.2-.2.5-.4.8-.5l2.2-2.2-3-3c-.8-.8-.8-2 0-2.8l2.8-2.8c.8-.8 2-.8 2.8 0l11 11c.8.8.8 2 0 2.8s-2 .8-2.8 0z"/>
  </svg>
);

const VsCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-[#007ACC] inline-block align-middle" fill="currentColor">
    <path d="M23.9 6.5l-2.7-2.7c-.2-.2-.5-.2-.7 0L12 12.3 3.5 3.8c-.2-.2-.5-.2-.7 0L.1 6.5c-.2.2-.2.5 0 .7L8.6 15 .1 23.3c-.2.2-.2.5 0 .7l2.7 2.7c.2.2.5.2.7 0L12 18.2l8.5 8.5c.2.2.5.2.7 0l2.7-2.7c.2-.2.2-.5 0-.7L15.4 15l8.5-8.5c.2-.2.2-.5 0-.7z"/>
  </svg>
);

const FigmaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-[#F24E1E] inline-block align-middle" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z"/>
  </svg>
);

const BunIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 mr-1.5 text-[#FBF0D9] inline-block align-middle" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z"/>
  </svg>
);

const getSkillIcon = (name) => {
  const norm = name.toLowerCase().trim();
  if (norm.includes("java") && !norm.includes("javascript")) return <JavaIcon />;
  if (norm.includes("next")) return <NextIcon />;
  if (norm === "js" || norm.includes("javascript")) return <JsIcon />;
  if (norm === "css" || norm.includes("css3")) return <CssIcon />;
  if (norm === "html" || norm.includes("html5")) return <HtmlIcon />;
  if (norm.includes("postgres")) return <PostgresIcon />;
  if (norm.includes("git")) return <GitIcon />;
  if (norm.includes("code") || norm.includes("vscode")) return <VsCodeIcon />;
  if (norm.includes("figma")) return <FigmaIcon />;
  if (norm.includes("bun")) return <BunIcon />;
  return null;
};

function SkillCard({ index, title, icon: Icon, chips, preset }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (preset !== "meta" && preset !== "microsoft") return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    setSpotlight({ x, y });

    if (preset === "meta") {
      const rx = -(y - box.height / 2) / (box.height / 15);
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
              className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-default ${
                idx % 2 === 0
                  ? "bg-bg-soft dark:bg-bg-warm border-border-soft dark:border-border-theme/20 text-mid-text hover:bg-gold-cream dark:hover:bg-gold-pale/15 hover:text-gold-deep"
                  : "bg-gold-cream/40 dark:bg-gold-pale/5 border-border-gold/30 text-gold-deep dark:text-gold-bright hover:bg-gold-cream dark:hover:bg-gold-pale/15"
              }`}
            >
              {getSkillIcon(chip)}
              <span>{chip}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills({ preset, data }) {
  const categories = data?.categories || [];

  return (
    <section 
      id="skills" 
      className="relative w-full bg-bg-soft dark:bg-bg-card py-24 px-6 md:px-12 border-t border-border-soft"
    >
      <div className="max-w-[1140px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 text-gold-deep dark:text-gold-bright px-3.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-widest mb-4">
            Tech Stack
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
          {categories.map((cat, i) => {
            const Icon = Icons[cat.iconName] || Icons.Code2;
            return (
              <SkillCard
                key={i}
                index={i}
                title={cat.title}
                icon={Icon}
                chips={cat.chips}
                preset={preset}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
