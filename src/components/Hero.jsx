"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function Hero({ preset, data }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Typewriter role animation
  const roles = data?.roles || ["Full Stack Developer", "UI/UX Designer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const handleType = () => {
      const fullText = roles[currentRoleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(500);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed, roles]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Microsoft spotlight tracking
    setSpotlight({ x, y });

    // Meta 3D tilt tracking
    if (preset === "meta") {
      const rx = -(y - box.height / 2) / (box.height / 25);
      const ry = (x - box.width / 2) / (box.width / 25);
      setRotateX(rx);
      setRotateY(ry);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const isGoogle = preset === "google";
  
  const textContainerVariants = {
    hidden: { opacity: 0, x: isGoogle ? -60 : -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: isGoogle ? "spring" : "tween",
        stiffness: 120,
        damping: 14,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg py-20 px-6 md:px-12"
    >
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(179,138,43,0.04)_1px,transparent_1px)] bg-[size:38px_38px]" />
        
        {/* Blurry Mesh Blobs */}
        <motion.div 
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] left-[10%] w-[450px] h-[450px] rounded-full bg-gold-bright/15 blur-[120px] dark:bg-gold-light/5"
        />
        <motion.div 
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 60, -35, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[5%] right-[10%] w-[550px] h-[550px] rounded-full bg-gold/10 blur-[130px] dark:bg-gold-deep/5"
        />
      </div>

      <div className="max-w-[1240px] w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Side: Info */}
        <motion.div 
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col text-left pr-0 lg:pr-8"
        >
          {/* Label */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 text-gold-deep dark:text-gold-bright px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-live-pulse" />
            {data?.label || "Open to Opportunities"}
          </motion.div>

          {/* Name */}
          <motion.h1 
            variants={itemVariants}
            className="font-display text-[3.2rem] md:text-[5.5rem] font-black leading-[1.05] tracking-tight text-espresso mb-4"
          >
            <span className="font-serif italic font-medium shimmer-text">
              {data?.name || "Subhaharini"}
            </span>
          </motion.h1>

          {/* Role */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-10 h-[2px] bg-gradient-to-r from-gold to-gold-bright rounded-full" />
            <span className="font-cursive text-3xl md:text-4xl font-normal text-gold-deep dark:text-gold-bright flex items-center min-h-[3rem] tracking-normal">
              {currentText}
              <span className="ml-2.5 w-2 h-2 rounded-full bg-gold-mid dark:bg-gold-bright shadow-[0_0_10px_rgba(205,168,75,0.9)] animate-pulse" />
            </span>
          </motion.div>

          {/* Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={handleScrollToProjects}
              className="px-8 py-3.5 bg-gradient-to-r from-gold via-gold-mid to-gold-bright text-espresso dark:text-espresso font-bold text-sm tracking-wider uppercase rounded-full shadow-gold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              View My Work
            </button>

            <a 
              href={data?.resumeUrl || "/resume.pdf"} 
              download="Subhaharini_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-espresso text-bg dark:bg-espresso dark:text-bg font-bold text-sm tracking-wider uppercase rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-espresso"
            >
              <Download className="w-4 h-4" />
              Claim Resume
            </a>

            <button 
              onClick={handleScrollToContact}
              className="px-8 py-3.5 bg-transparent text-gold-deep dark:text-gold-bright font-bold text-sm tracking-wider uppercase rounded-full border-2 border-border-gold hover:bg-gold-cream/40 dark:hover:bg-gold-pale/10 hover:-translate-y-1 transition-all duration-300"
            >
              Let's Connect
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Portrait */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          {/* Main 3D Card wrapper */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            className="relative w-full max-w-[390px] aspect-[3/4] rounded-[2rem_2rem_100px_100px] overflow-hidden p-[4px] bg-gradient-to-b from-gold-bright via-gold-mid to-gold shadow-photo cursor-pointer transition-all duration-300"
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {/* Inner Frame */}
            <div className="w-full h-full rounded-[calc(2rem-4px)_calc(2rem-4px)_96px_96px] overflow-hidden bg-bg-warm relative z-10">
              <img 
                src="/photo.jpg" 
                alt="Subhaharini Portrait" 
                className="w-full h-full object-cover object-top hover:scale-[1.04] transition-transform duration-700 ease-out"
              />
              
              {/* Microsoft Fluent Spotlight Overlay */}
              {preset === "microsoft" && (
                <div 
                  className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
                  style={{
                    background: `radial-gradient(300px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.4), transparent 80%)`
                  }}
                />
              )}
            </div>

            {/* Spatial shadow backing for 3D depth */}
            <div className="absolute inset-[-8px] rounded-[2.2rem_2.2rem_108px_108px] bg-gradient-to-r from-gold to-gold-bright opacity-0 hover:opacity-20 blur-[15px] -z-10 transition-opacity duration-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
