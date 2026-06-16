"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MapPin, GraduationCap, Building2, Users, Mail, Sparkles, ArrowRight } from "lucide-react";
import { personalInfo } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MagneticButton from "@/components/ui/MagneticButton";

const highlights = [
  { icon: <Building2 size={16} />, label: "Currently at", value: "Harich Tech", color: "#8B5CF6" },
  { icon: <GraduationCap size={16} />, label: "Education", value: "LJ University", color: "#06B6D4" },
  { icon: <MapPin size={16} />, label: "Location", value: "Ahmedabad, India", color: "#10B981" },
  { icon: <Users size={16} />, label: "LinkedIn", value: "500+ Connections", color: "#F59E0B" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <SectionWrapper id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-label mb-8 sm:mb-12">
          <span>01 / About</span>
          <div className="line" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div ref={ref}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, ease: [0.25,0.46,0.45,0.94] }} className="relative mb-6 sm:mb-8">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-gradient-to-br from-bg-2 to-bg-3">
                <div className="absolute inset-0 bg-grid opacity-25" />
                <Image src={personalInfo.profileImage} alt={personalInfo.name} fill className="object-contain" />
                <div className="absolute top-0 right-0 w-32 h-32" style={{ background: "radial-gradient(circle at top right, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
                <div className="absolute bottom-0 left-0 w-32 h-32" style={{ background: "radial-gradient(circle at bottom left, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl glass-strong">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full pulse-dot bg-accent" />
                  <Sparkles size={10} className="sm:inline text-accent" />
                  <span className="text-[10px] sm:text-xs font-semibold text-accent">Available for work</span>
                </div>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, duration: 0.6 }} className="grid grid-cols-2 gap-2 sm:gap-3">
              {highlights.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  className="p-3 sm:p-4 rounded-xl card group">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2" style={{ color: item.color }}>
                    {item.icon}
                    <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-text-3">{item.label}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold transition-colors duration-200 group-hover:text-white text-text">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight text-text">
              Passionate about <span className="gradient-text">crafting</span> exceptional web experiences
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.6 }} className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {personalInfo.about.split("\n").filter(Boolean).map((p, i) => (
                <p key={i} className="text-sm sm:text-base leading-relaxed text-text-2">{p.trim()}</p>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25, duration: 0.6 }} className="mb-6 sm:mb-8">
              <h3 className="text-[11px] sm:text-sm font-bold tracking-widest uppercase mb-4 sm:mb-5 text-accent">What I bring</h3>
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  "Clean, maintainable code with a focus on best practices",
                  "Pixel-perfect UI implementation from Figma designs",
                  "Performance-first mindset \u2014 fast is a feature",
                  "Strong communication and collaborative team spirit",
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }} className="flex items-start gap-2.5 sm:gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 bg-accent-glow-2 text-accent">
                      <ArrowRight size={10} />
                    </div>
                    <span className="text-xs sm:text-sm leading-relaxed text-text-2">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.5 }} className="flex flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton href={`mailto:${personalInfo.email}`} variant="primary">
                <Mail size={14} /> Say Hello
              </MagneticButton>
              <MagneticButton href={personalInfo.resumeLink} variant="outline" target="_blank" rel="noopener noreferrer">View Resume</MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
