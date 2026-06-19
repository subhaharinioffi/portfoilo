"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

// Inline SVG component to resolve Github casing imports from older/newer lucide-react versions
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

const getProjectIcon = (name) => {
  const norm = name.toLowerCase();
  if (norm.includes("bloom")) return Icons.Activity || Icons.Heart;
  if (norm.includes("zentix") || norm.includes("nav")) return Icons.Navigation;
  return Icons.Users;
};

function ProjectCard({ project, preset, index, total }) {
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
      const rx = -(y - box.height / 2) / (box.height / 20);
      const ry = (x - box.width / 2) / (box.width / 20);
      setRotateX(rx);
      setRotateY(ry);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const Icon = getProjectIcon(project.name);
  const isGoogle = preset === "google";

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: isGoogle ? "spring" : "tween",
        stiffness: 90,
        damping: 16,
        delay: index * 0.2
      }
    }
  };

  // Alternating background pattern styles
  const bgStyle = index % 3 === 0
    ? {
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(179,138,43,0.07), transparent 50%), 
           radial-gradient(circle at 80% 80%, rgba(179,138,43,0.04), transparent 50%),
           linear-gradient(var(--border-soft) 1px, transparent 1px),
           linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 100% 100%, 28px 28px, 28px 28px"
      }
    : index % 3 === 1
    ? {
        backgroundImage: `radial-gradient(circle at 80% 20%, rgba(179,138,43,0.07), transparent 50%),
           radial-gradient(circle at 20% 80%, rgba(179,138,43,0.04), transparent 50%),
           repeating-linear-gradient(45deg, var(--border-soft) 0px, var(--border-soft) 1px, transparent 1px, transparent 12px)`,
        backgroundSize: "100% 100%, 100% 100%, 24px 24px"
      }
    : {
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(179,138,43,0.08), transparent 60%),
           linear-gradient(135deg, var(--border-soft) 0.5px, transparent 0.5px)`,
        backgroundSize: "100% 100%, 18px 18px"
      };

  return (
    <motion.article
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="relative rounded-3xl p-8 border border-border-soft dark:border-border-theme/40 overflow-hidden z-10 transition-all duration-300 min-h-[380px] flex flex-col justify-between cursor-pointer"
      style={{
        ...bgStyle,
        backgroundColor: "var(--bg-card)",
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "none" : "transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease"
      }}
      whileHover={{
        y: -6,
        borderColor: "var(--gold)",
        boxShadow: "var(--shadow-lg)"
      }}
    >
      {/* Translucent Backdrop wash overlay to keep text 100% readable */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-bg-card/90 via-bg-card/95 to-bg-card/98 dark:from-bg-card/85 dark:via-bg-card/90 dark:to-bg-card/95 -z-10 transition-colors duration-300 group-hover:from-bg-card/85" 
      />

      {/* Microsoft Spotlight */}
      {preset === "microsoft" && (
        <div 
          className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay"
          style={{
            background: `radial-gradient(300px circle at ${spotlight.x}px ${spotlight.y}px, rgba(179,138,43,0.15), transparent 80%)`
          }}
        />
      )}

      {/* Card Contents */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="text-[0.7rem] font-mono font-medium text-light-text tracking-wider">
            {`0${index + 1} / 0${total}`}
          </div>
          <div className="w-11 h-11 rounded-xl bg-champagne dark:bg-gold-pale/10 flex items-center justify-center border border-border-soft dark:border-border-theme/20">
            <Icon className="w-5 h-5 text-gold-mid" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-extrabold text-espresso tracking-tight mb-1">
          {project.name}
        </h3>
        <div className="text-[0.7rem] font-mono text-gold-deep dark:text-gold-bright font-bold uppercase tracking-wider mb-4">
          // {project.category}
        </div>
        <p className="text-sm leading-relaxed text-mid-text mb-6">
          {project.desc}
        </p>
      </div>

      {/* Footer Tags & Links */}
      <div className="relative z-10 mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.metrics.map((metric, idx) => (
            <span 
              key={idx}
              className="text-[0.68rem] font-bold px-3 py-1 bg-gold-cream border border-border-gold/30 text-gold-deep rounded-full dark:bg-gold-pale/10 dark:text-gold-bright"
            >
              {metric}
            </span>
          ))}
        </div>

        <div className="flex">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View the source code for ${project.name} on GitHub`}
            className="inline-flex items-center gap-2 text-xs font-bold text-gold-deep dark:text-gold-bright hover:text-espresso dark:hover:text-bg bg-gold-cream/60 border border-border-gold/30 hover:border-gold hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright px-4 py-2 rounded-xl transition-all shadow-xs"
          >
            <Github className="w-4 h-4" />
            Codebase
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ preset, data }) {
  const projects = data?.items || [];

  return (
    <section 
      id="projects" 
      className="relative w-full bg-bg py-24 px-6 md:px-12 border-t border-border-soft"
    >
      <div className="max-w-[1140px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 text-gold-deep dark:text-gold-bright px-3.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-widest mb-4">
            Portfolio
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-espresso">
            Featured <span className="font-serif italic font-medium text-gold">Projects</span>
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((proj, i) => (
            <ProjectCard
              key={i}
              index={i}
              project={proj}
              preset={preset}
              total={projects.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
