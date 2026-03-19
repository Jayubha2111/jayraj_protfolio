"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, CheckCircle2, Briefcase } from "lucide-react";
import { experiences, education } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TechBadge from "@/components/ui/TechBadge";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <SectionWrapper id="experience">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
            02 / Experience
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1c1c1c" }} />
        </div>

        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight" style={{ color: "#f0f0f0" }}>
            My <span className="gradient-text">Journey</span>
          </h2>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mb-12 p-1 rounded-xl w-fit" style={{ backgroundColor: "#111", border: "1px solid #1c1c1c" }}>
          {["experience", "education"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "experience" | "education")}
              className="relative px-6 py-2.5 text-sm font-medium rounded-lg capitalize transition-colors duration-200"
              style={{
                color: activeTab === tab ? "#050505" : "#888",
                zIndex: 1,
              }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="tabBg"
                  className="absolute inset-0 rounded-lg"
                  style={{ backgroundColor: "#8B5CF6" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab === "experience" ? <Briefcase size={14} /> : <CheckCircle2 size={14} />}
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-3.75 top-0 bottom-0 w-px hidden md:block"
            style={{ backgroundColor: "#1c1c1c" }}
          />

          {activeTab === "experience" && (
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative md:pl-12"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-6 w-8 h-8 rounded-full border-2 items-center justify-center hidden md:flex"
                    style={{
                      backgroundColor: "#050505",
                      borderColor: exp.isCurrent ? "#8B5CF6" : "#2a2a2a",
                      boxShadow: exp.isCurrent ? "0 0 16px rgba(139,92,246,0.3)" : "none",
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: exp.isCurrent ? "#8B5CF6" : "#2a2a2a" }}
                    />
                  </div>

                  {/* Card */}
                  <motion.div
                    className="p-6 lg:p-8 rounded-2xl"
                    style={{
                      backgroundColor: "#111",
                      border: `1px solid ${exp.isCurrent ? "rgba(139,92,246,0.2)" : "#1c1c1c"}`,
                    }}
                    whileHover={{ borderColor: "rgba(139,92,246,0.25)", y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        {/* Role */}
                        <h3 className="text-xl font-bold mb-1" style={{ color: "#f0f0f0" }}>
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-semibold" style={{ color: exp.color }}>
                            {exp.company}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${exp.color}18`, color: exp.color }}>
                            {exp.type}
                          </span>
                          {exp.isCurrent && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "rgba(139,92,246,0.12)", color: "#8B5CF6" }}>
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#888" }}>
                          <Calendar size={12} />
                          {exp.startDate} — {exp.endDate}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#888" }}>
                          <MapPin size={12} />
                          {exp.location} · {exp.mode}
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#1a1a1a", color: "#555" }}>
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#888" }}>
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="space-y-2 mb-5">
                      {exp.responsibilities.map((resp, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <span className="mt-1 shrink-0" style={{ color: "#8B5CF6" }}>→</span>
                          <span className="text-sm" style={{ color: "#888" }}>{resp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech) => (
                        <TechBadge key={tech} label={tech} color={exp.color} size="sm" />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-8">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative md:pl-12"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-6 w-8 h-8 rounded-full border-2 items-center justify-center hidden md:flex"
                    style={{ backgroundColor: "#050505", borderColor: "#EC4899" }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EC4899" }} />
                  </div>

                  {/* Card */}
                  <div
                    className="p-6 lg:p-8 rounded-2xl"
                    style={{ backgroundColor: "#111", border: "1px solid rgba(236,72,153,0.15)" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1" style={{ color: "#f0f0f0" }}>
                          {edu.degree}
                        </h3>
                        <div className="text-base font-semibold mb-0.5" style={{ color: "#EC4899" }}>
                          {edu.institution}
                        </div>
                        <div className="text-sm" style={{ color: "#888" }}>
                          {edu.field}
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1.5">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#888" }}>
                          <Calendar size={12} />
                          {edu.startYear} — {edu.endYear}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#888" }}>
                          <MapPin size={12} />
                          {edu.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#888" }}>
                      {edu.description}
                    </p>

                    <div className="space-y-2">
                      {edu.achievements.map((ach, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "#EC4899" }} />
                          <span className="text-sm" style={{ color: "#888" }}>{ach}</span>
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
