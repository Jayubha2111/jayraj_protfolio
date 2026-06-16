"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, CheckCircle2, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import { experiences, education } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TechBadge from "@/components/ui/TechBadge";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <SectionWrapper id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-label mb-6">
          <span>02 / Experience</span>
          <div className="line" />
        </div>
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-text">
            My <span className="gradient-text">Journey</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 mb-8 sm:mb-12 p-1 rounded-xl w-fit bg-bg-card border border-border">
          {["experience", "education"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as "experience" | "education")}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg capitalize transition-colors duration-200 ${activeTab === tab ? "text-white" : "text-muted"}`}
              style={{ zIndex: 1 }}>
              {activeTab === tab && (
                <motion.div layoutId="tabBg" className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent to-accent-2" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                {tab === "experience" ? <Briefcase size={13} /> : <CheckCircle2 size={13} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-3.75 top-0 bottom-0 w-px hidden md:block bg-border" />

          {activeTab === "experience" && (
            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp, i) => (
                <motion.div key={exp.id} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="relative md:pl-14">
                  <div className="absolute left-0 top-7 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 items-center justify-center hidden md:flex bg-bg"
                    style={{ borderColor: exp.isCurrent ? "#8B5CF6" : "#2a2a2a", boxShadow: exp.isCurrent ? "0 0 20px rgba(139,92,246,0.25)" : "none" }}>
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full" style={{ backgroundColor: exp.isCurrent ? "#8B5CF6" : "#2a2a2a" }} />
                  </div>
                  <motion.div className="p-5 sm:p-6 lg:p-8 rounded-2xl card" style={{ border: `1px solid ${exp.isCurrent ? "rgba(139,92,246,0.2)" : "#1a1a1a"}` }}
                    whileHover={{ borderColor: "rgba(139,92,246,0.3)", y: -2 }} transition={{ duration: 0.2 }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold mb-1 text-text">{exp.role}</h3>
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <span className="text-sm sm:text-base font-semibold" style={{ color: exp.color }}>{exp.company}</span>
                          <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${exp.color}15`, color: exp.color }}>{exp.type}</span>
                          {exp.isCurrent && (
                            <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-semibold inline-flex items-center gap-1" style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}>
                              <Sparkles size={10} /> Current
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-1.5 shrink-0 flex-wrap">
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted">
                          <Calendar size={11} /> {exp.startDate} — {exp.endDate}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted">
                          <MapPin size={11} /> {exp.mode}
                        </div>
                        <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-border text-text-3">{exp.duration}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 text-text-2">{exp.description}</p>
                    <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                      {exp.responsibilities.map((resp, j) => (
                        <div key={j} className="flex items-start gap-2 sm:gap-2.5">
                          <div className="mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 bg-accent-glow-2 text-accent">
                            <ArrowRight size={9} />
                          </div>
                          <span className="text-xs sm:text-sm text-text-2">{resp}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.techStack.map((tech) => <TechBadge key={tech} label={tech} color={exp.color} size="sm" />)}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-6 sm:space-y-8">
              {education.map((edu, i) => (
                <motion.div key={edu.id} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="relative md:pl-14">
                  <div className="absolute left-0 top-7 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 items-center justify-center hidden md:flex bg-bg border-accent-2">
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-accent-2" />
                  </div>
                  <div className="p-5 sm:p-6 lg:p-8 rounded-2xl card" style={{ border: "1px solid rgba(6,182,212,0.12)" }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold mb-1 text-text">{edu.degree}</h3>
                        <div className="text-sm sm:text-base font-semibold mb-0.5 text-accent-2">{edu.institution}</div>
                        <div className="text-xs sm:text-sm text-muted">{edu.field}</div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-1.5 shrink-0 flex-wrap">
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted">
                          <Calendar size={11} /> {edu.startYear} {'\u2014'} {edu.endYear}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted">
                          <MapPin size={11} /> {edu.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 text-text-2">{edu.description}</p>
                    <div className="space-y-1.5 sm:space-y-2">
                      {edu.achievements.map((ach, j) => (
                        <div key={j} className="flex items-start gap-2 sm:gap-2.5">
                          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-accent-2" />
                          <span className="text-xs sm:text-sm text-text-2">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
