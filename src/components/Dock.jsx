"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, User, Code, Briefcase, Award, GraduationCap, Mail, 
  Sun, Moon, Settings
} from "lucide-react";

export default function Dock({ activeSection, currentPreset, onPresetChange }) {
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check initial system/local storage theme
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "achievements", label: "Awards", icon: Award },
    { id: "experience", label: "Journey", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const presets = [
    { id: "apple", label: "Apple Glass" },
    { id: "google", label: "Google Springs" },
    { id: "microsoft", label: "Fluent Spotlights" },
    { id: "meta", label: "Meta Spatial" },
  ];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass p-4 rounded-2xl flex flex-col gap-2 min-w-[200px] shadow-2xl border border-border-gold/30"
            role="listbox"
            aria-label="Interaction Presets"
          >
            <div className="text-xs font-semibold text-muted-text uppercase tracking-wider mb-1 font-display">
              Interaction Presets
            </div>
            {presets.map((p) => (
              <button
                key={p.id}
                role="option"
                aria-selected={currentPreset === p.id}
                onClick={() => {
                  onPresetChange(p.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all font-sans cursor-pointer ${
                  currentPreset === p.id
                    ? "bg-gold text-bg font-bold shadow-md"
                    : "text-mid-text hover:bg-gold-cream hover:text-gold-deep"
                }`}
              >
                {p.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dock */}
      <motion.nav 
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
        className="glass px-6 py-3.5 rounded-full flex items-center gap-5 shadow-2xl border border-border-gold/20"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="relative group p-2.5 rounded-full transition-transform duration-200 hover:scale-125 cursor-pointer"
              aria-label={item.label}
            >
              {isActive && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-gold-cream/70 dark:bg-gold-pale/15 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon 
                className={`w-[1.3rem] h-[1.3rem] transition-colors ${
                  isActive ? "text-gold stroke-[2.5]" : "text-mid-text group-hover:text-gold"
                }`} 
              />
              {/* Tooltip */}
              <span className="absolute bottom-16 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-espresso text-bg text-[0.7rem] font-medium tracking-wide shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Vertical Divider */}
        <div className="w-[1px] h-6 bg-border-theme/40 self-center" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full text-mid-text hover:text-gold transition-transform hover:scale-125 cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon className="w-[1.2rem] h-[1.2rem]" /> : <Sun className="w-[1.2rem] h-[1.2rem]" />}
        </button>

        {/* Preset Settings Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2.5 rounded-full transition-transform hover:scale-125 cursor-pointer ${
            isOpen ? "text-gold" : "text-mid-text hover:text-gold"
          }`}
          aria-label="Toggle Presets Menu"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <Settings className="w-[1.2rem] h-[1.2rem]" />
        </button>
      </motion.nav>
    </div>
  );
}
