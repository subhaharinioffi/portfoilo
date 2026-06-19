"use client";

import { useState, useEffect } from "react";
import Dock from "@/components/Dock";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [preset, setPreset] = useState("apple");

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "achievements", "experience", "contact"];
    
    const handleScroll = () => {
      // Calculate active section by finding which section dominates the viewport center
      const scrollCenter = window.scrollY + window.innerHeight * 0.45;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollCenter >= top && scrollCenter < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg transition-colors duration-300 w-full">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[4px] bg-gradient-to-r from-gold via-gold-mid to-gold-bright z-50 shadow-gold"
        style={{
          width: "0%",
          transition: "width 0.1s linear"
        }}
        id="scroll-bar"
      />
      
      {/* Scroll listener for indicator (SXO improvement) */}
      <ScrollProgressUpdater />

      {/* Floating Glassmorphic Dock */}
      <Dock 
        activeSection={activeSection} 
        currentPreset={preset} 
        onPresetChange={setPreset} 
      />

      {/* Structured Single-Page Sections */}
      <main className="w-full flex flex-col items-center">
        <Hero preset={preset} />
        <About preset={preset} />
        <Skills preset={preset} />
        <Projects preset={preset} />
        <Achievements preset={preset} />
        <Experience preset={preset} />
        <Contact preset={preset} />
      </main>
    </div>
  );
}

// Separate micro-component to update indicator width synchronously on scroll (improves rendering performance)
function ScrollProgressUpdater() {
  useEffect(() => {
    const bar = document.getElementById("scroll-bar");
    const updateBar = () => {
      if (!bar) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    };
    
    window.addEventListener("scroll", updateBar, { passive: true });
    return () => window.removeEventListener("scroll", updateBar);
  }, []);
  
  return null;
}
