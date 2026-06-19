"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Trophy, Eye, X } from "lucide-react";

export default function Achievements() {
  const [selectedImg, setSelectedImg] = useState(null);
  const sliderRef = useRef(null);

  const awards = [
    {
      title: "TN-IMPACT 2026",
      tag: "Special Prize",
      desc: "Industrial Hackathon — State Level",
      img: "/TN impact.jpg.JPG",
      hasImage: true
    },
    {
      title: "Queenathon",
      tag: "Viral Visionary",
      desc: "Dhaanish iTech College",
      img: "/Queenathon.jpg.jpeg",
      hasImage: true
    },
    {
      title: "AlgoRhythm '26",
      tag: "Winner",
      desc: "KPR College of Arts and Science",
      img: "/AlgoRhythm.jpg.jpeg",
      hasImage: true
    },
    {
      title: "Ideathon",
      tag: "Winner",
      desc: "SNS College of Technology",
      img: null,
      hasImage: false
    },
    {
      title: "AI Blitz",
      tag: "Winner",
      desc: "SNS College of Technology",
      img: null,
      hasImage: false
    },
    {
      title: "Spyder '26",
      tag: "Winner",
      desc: "Hindustan College of Arts & Science",
      img: "/Spyder.jpg.jpeg",
      hasImage: true
    },
    {
      title: "Best Manager",
      tag: "Winner",
      desc: "Hindustan College of Arts & Science",
      img: "/Best Manage.jpg.jpeg",
      hasImage: true
    },
    {
      title: "Minute Blaze",
      tag: "Winner",
      desc: "Kovai Kalaimagal College",
      img: "/minute blaze.jpg.jpeg",
      hasImage: true
    },
    {
      title: "Biz Master",
      tag: "3rd Place",
      desc: "Hindustan College of Arts & Science",
      img: "/Biz Master.jpg.jpeg",
      hasImage: true
    },
    {
      title: "Onest Hackathon",
      tag: "Participant",
      desc: "AIC Raise",
      img: "/Onest Hackathon.jpg.jpg",
      hasImage: true
    },
    {
      title: "Hackasthra",
      tag: "Participant",
      desc: "SNS College of Technology",
      img: "/Hackasthra.jpg.jpeg",
      hasImage: true
    }
  ];

  return (
    <section 
      id="achievements" 
      className="relative w-full bg-bg-soft dark:bg-bg-card py-24 px-6 md:px-12 border-t border-border-soft"
    >
      <div className="max-w-[1140px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 text-gold-deep dark:text-gold-bright px-3.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-widest mb-4">
            ✦ Hall of Fame
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-espresso">
            Awards &amp; <span className="font-serif italic font-medium text-gold">Achievements</span>
          </h2>
          <div className="flex items-center justify-center gap-2.5 mt-5">
            <div className="w-10 h-[1px] bg-gold" />
            <div className="w-2 h-2 bg-gold rotate-45 rounded-sm" />
            <div className="w-10 h-[1px] bg-gold" />
          </div>
        </div>

        {/* Horizontal Slider Wrapper */}
        <div className="relative w-full overflow-hidden mt-6">
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar px-4"
          >
            {awards.map((award, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.05 }}
                className="flex-[0_0_300px] md:flex-[0_0_320px] snap-center rounded-2xl overflow-hidden bg-bg-card dark:bg-bg-soft border border-border-soft dark:border-border-theme/40 shadow-sm flex flex-col justify-between hover:border-gold hover:shadow-gold/25 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
                onClick={() => award.hasImage && setSelectedImg(award)}
                aria-label={`View details for ${award.title} certificate`}
              >
                {/* Image Section */}
                <div className="relative w-full h-[180px] overflow-hidden bg-bg-soft dark:bg-bg-warm flex items-center justify-center border-b border-border-soft dark:border-border-theme/20">
                  {award.hasImage ? (
                    <>
                      <img 
                        src={award.img} 
                        alt={`Certificate for ${award.title} - ${award.tag} awarded at ${award.desc}`} 
                        width="320"
                        height="180"
                        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      {/* Image Hover overlay */}
                      <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="p-3 rounded-full bg-bg/95 text-espresso shadow-lg">
                          <Eye className="w-5 h-5" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Trophy className="w-14 h-14 text-gold-mid animate-float" />
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="inline-block text-[0.65rem] font-bold text-gold-deep dark:text-gold-bright bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
                      ✦ {award.tag}
                    </span>
                    <h3 className="font-display font-bold text-espresso text-base mb-1 tracking-tight leading-snug">
                      {award.title}
                    </h3>
                    <p className="text-xs text-muted-text">
                      {award.desc}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Scrolling Hints */}
          <div className="flex justify-center items-center gap-2.5 mt-4 text-xs font-semibold text-muted-text uppercase tracking-widest font-display select-none">
            <span className="animate-pulse">←</span> Swipe / Scroll Horizontally <span className="animate-pulse">→</span>
          </div>
        </div>
      </div>

      {/* Lightbox Certificate Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-espresso/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-bg-card rounded-2xl overflow-hidden shadow-2xl border border-border-gold/25"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-espresso/75 text-bg hover:scale-110 active:scale-95 transition-all shadow-md"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Image Frame */}
              <div className="w-full aspect-[4/3] max-h-[75vh] bg-bg-soft dark:bg-bg-warm relative">
                <img
                  src={selectedImg.img}
                  alt={`Fullscreen certificate preview of ${selectedImg.title} — ${selectedImg.tag}`}
                  width="800"
                  height="600"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Footer Details */}
              <div className="p-6 bg-bg-card border-t border-border-soft dark:border-border-theme/40 text-left">
                <span className="text-[0.65rem] font-bold text-gold-deep dark:text-gold-bright bg-gold-cream dark:bg-gold-pale/10 border border-border-gold/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedImg.tag}
                </span>
                <h3 className="font-display font-extrabold text-espresso text-lg mt-3 leading-none">
                  {selectedImg.title}
                </h3>
                <p className="text-sm text-muted-text mt-1.5 leading-tight">
                  {selectedImg.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
