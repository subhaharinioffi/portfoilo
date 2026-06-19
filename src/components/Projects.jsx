"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation, Users } from "lucide-react";

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

function ProjectCard({ project, preset, index }) {
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
      const rx = -(y - box.height / 2) / (box.height / 20); // max 10 deg
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

  const Icon = project.icon;
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

  return (
    <motion.article
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="relative rounded-3xl p-8 border border-border-soft dark:border-border-theme/40 bg-cover bg-center overflow-hidden z-10 transition-all duration-300 min-h-[380px] flex flex-col justify-between cursor-pointer"
      style={{
        backgroundImage: `url(${project.bg})`,
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
            {project.num}
          </div>
          <div className="w-11 h-11 rounded-xl bg-champagne dark:bg-gold-pale/10 flex items-center justify-center border border-border-soft dark:border-border-theme/20">
            <Icon className="w-5 h-5 text-gold-mid" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-extrabold text-espresso tracking-tight mb-1">
          {project.title}
        </h3>
        <div className="text-[0.7rem] font-mono text-gold-deep dark:text-gold-bright font-bold uppercase tracking-wider mb-4">
          {project.subtitle}
        </div>
        <p className="text-sm leading-relaxed text-mid-text mb-6">
          {project.desc}
        </p>
      </div>

      {/* Footer Tags & Links */}
      <div className="relative z-10 mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-[0.68rem] font-bold px-3 py-1 bg-gold-cream border border-border-gold/30 text-gold-deep rounded-full dark:bg-gold-pale/10 dark:text-gold-bright"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View the source code for ${project.title} on GitHub`}
            className="inline-flex items-center gap-2 text-xs font-bold text-gold-deep dark:text-gold-bright hover:text-espresso dark:hover:text-bg bg-gold-cream/60 border border-border-gold/30 hover:border-gold hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright px-4 py-2 rounded-xl transition-all shadow-xs"
          >
            <Github className="w-4 h-4" />
            🐙 Codebase
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ preset }) {
  const projects = [
    {
      num: "01 / 02",
      title: "Zentix",
      subtitle: "// Smart Campus Management System",
      desc: "Architected a real-time smart campus navigation & resource tracking system. Streamlines campus-wide logistics with 99.8% location precision and sub-200ms route calculation performance.",
      tags: ["Full Stack", "99.8% Precision", "Java & Next.js", "Campus Navigation"],
      icon: Navigation,
      bg: "/assets/zentix_bg.png",
      link: "https://github.com/subhaharinioffi/portfoilo"
    },
    {
      num: "02 / 02",
      title: "SkipQ",
      subtitle: "// Smart Queue Management System",
      desc: "Developed a high-concurrency smart queue management system. Achieved a verified 35% reduction in customer wait times and handled 500+ parallel simulated requests with zero downtime.",
      tags: ["Web App", "35% Delay Cut", "Scalable Stack", "Queue Optimization"],
      icon: Users,
      bg: "/assets/skipq_bg.png",
      link: "https://github.com/subhaharinioffi/portfoilo"
    }
  ];

  return (
    <section 
      id="projects" 
      className="relative w-full bg-bg py-24 px-6 md:px-12 border-t border-border-soft"
    >
      <div className="max-w-[1140px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 text-gold-deep dark:text-gold-bright px-3.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-widest mb-4">
            ✦ Portfolio
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
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
