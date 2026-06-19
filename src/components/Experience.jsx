"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Calendar, Compass, Briefcase } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      type: "work",
      date: "2025",
      title: "Video Editing Intern",
      org: "D Square Entertainers",
      desc: "Worked on professional video editing and color grading using DaVinci Resolve — hands-on experience in post-production workflows and visual storytelling."
    },
    {
      type: "edu",
      date: "2024 – 2027",
      title: "B.Sc. Computer Technology",
      org: "Rathinam Group of Institutions",
      desc: "Pursuing degree with a current academic record of 8.12 CGPA."
    },
    {
      type: "edu",
      date: "Secondary Education",
      title: "HSC & SSLC",
      org: "Corporation Girls Higher Secondary School",
      desc: "Completed HSC with 64.3% and SSLC with 88.4%."
    }
  ];

  const certifications = [
    {
      title: "Oracle Java Foundations",
      issuer: "Oracle — 2026",
      icon: Award
    },
    {
      title: "More Coming Soon",
      issuer: "Always Learning...",
      icon: Compass
    }
  ];

  const funFacts = [
    "Passionate about UI/UX design & creative interfaces",
    "Professionally trained in video color grading with DaVinci Resolve",
    "Active hackathon competitor & experienced team leader",
    "Committed to driving measurable impact through modern software"
  ];

  return (
    <section 
      id="experience" 
      className="relative w-full bg-bg py-24 px-6 md:px-12 border-t border-border-soft"
    >
      <div className="max-w-[1140px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 text-gold-deep dark:text-gold-bright px-3.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-widest mb-4">
            ✦ Journey
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-espresso">
            Experience &amp; <span className="font-serif italic font-medium text-gold">Education</span>
          </h2>
          <div className="flex items-center justify-center gap-2.5 mt-5">
            <div className="w-10 h-[1px] bg-gold" />
            <div className="w-2 h-2 bg-gold rotate-45 rounded-sm" />
            <div className="w-10 h-[1px] bg-gold" />
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
          
          {/* Left Column: Timeline */}
          <div className="relative pl-8 md:pl-12">
            
            {/* Animated growing timeline vertical line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[19px] md:left-[23px] top-6 bottom-6 w-[2.5px] bg-gradient-to-b from-gold via-gold-light to-transparent origin-top -z-10"
            />

            <div className="flex flex-col gap-10 text-left">
              {experiences.map((exp, idx) => {
                const isWork = exp.type === "work";
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.15 }}
                    className="relative flex gap-6 md:gap-8 group"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-[-29px] md:left-[-35px] top-1.5 w-[22px] h-[22px] rounded-full border-[3px] border-gold-light bg-bg flex items-center justify-center z-10 shadow-sm transition-transform duration-300 group-hover:scale-125">
                      <div className="w-[8px] h-[8px] rounded-full bg-gold" />
                    </div>

                    {/* Timeline Card */}
                    <div className="w-full p-6 rounded-2xl bg-bg-card dark:bg-bg-soft border border-border-soft dark:border-border-theme/40 shadow-xs hover:border-border-gold border-t-[3.5px] border-t-gold-light hover:border-t-gold transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center gap-2 text-[0.68rem] font-mono font-bold text-gold-deep dark:text-gold-bright tracking-wide mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.date}
                      </div>

                      <h3 className="font-display font-extrabold text-espresso text-base mb-1 tracking-tight">
                        {exp.title}
                      </h3>
                      
                      <div className="text-xs font-semibold text-gold-deep dark:text-gold-bright mb-4 flex items-center gap-1.5">
                        {isWork ? <Briefcase className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                        {exp.org}
                      </div>

                      <p className="text-xs md:text-sm leading-relaxed text-mid-text">
                        {exp.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Certifications & Facts */}
          <div className="flex flex-col gap-8 text-left">
            {/* Certifications Card list */}
            <div>
              <div className="text-xs font-bold text-muted-text uppercase tracking-widest mb-4 font-display">
                Professional Certifications
              </div>
              <div className="flex flex-col gap-4">
                {certifications.map((cert, idx) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.15 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-bg-card dark:bg-bg-soft border border-border-soft dark:border-border-theme/40 shadow-xs hover:border-border-gold hover:translate-x-1.5 transition-all duration-300 cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-xl bg-champagne dark:bg-gold-pale/10 flex items-center justify-center border border-border-soft dark:border-border-theme/20">
                        <Icon className="w-5 h-5 text-gold-mid" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-espresso text-sm tracking-tight">{cert.title}</h4>
                        <span className="text-[0.7rem] text-gold-deep dark:text-gold-bright font-semibold mt-0.5">{cert.issuer}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Facts Card list */}
            <div>
              <div className="text-xs font-bold text-muted-text uppercase tracking-widest mb-4 font-display">
                Creative Capabilities
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-bg-card dark:bg-bg-soft border border-border-soft dark:border-border-theme/40 shadow-xs border-t-[3.5px] border-t-gold-mid"
              >
                <div className="flex flex-col gap-3">
                  {funFacts.map((fact, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 py-2 border-b border-border-soft dark:border-border-theme/20 last:border-b-0 leading-normal"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-mid-text">{fact}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
