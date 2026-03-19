"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface SkillBarProps {
  name: string;
  level: number;
  icon: string;
  color: string;
  delay: number;
}

function SkillBar({ name, level, icon, color, delay }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-medium" style={{ color: "#f0f0f0" }}>
            {name}
          </span>
        </div>
        <span className="text-xs font-mono font-semibold" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.6 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <SectionWrapper id="skills">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
            04 / Skills
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1c1c1c" }} />
        </div>

        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight" style={{ color: "#f0f0f0" }}>
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Languages */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "#111", border: "1px solid #1c1c1c" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: "rgba(139,92,246,0.1)" }}
              >
                🌐
              </div>
              <div>
                <h3 className="text-sm font-bold" style={{ color: "#f0f0f0" }}>
                  Languages
                </h3>
                <p className="text-[10px]" style={{ color: "#555" }}>
                  Core expertise
                </p>
              </div>
            </div>
            <div className="space-y-5">
              {skills.languages.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  color="#8B5CF6"
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "#111", border: "1px solid #1c1c1c" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: "rgba(236,72,153,0.1)" }}
              >
                ⚛️
              </div>
              <div>
                <h3 className="text-sm font-bold" style={{ color: "#f0f0f0" }}>
                  Frameworks & Libraries
                </h3>
                <p className="text-[10px]" style={{ color: "#555" }}>
                  Frontend stack
                </p>
              </div>
            </div>
            <div className="space-y-5">
              {skills.frameworks.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  color="#EC4899"
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "#111", border: "1px solid #1c1c1c" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: "rgba(245,158,11,0.1)" }}
              >
                🔧
              </div>
              <div>
                <h3 className="text-sm font-bold" style={{ color: "#f0f0f0" }}>
                  Tools & Environment
                </h3>
                <p className="text-[10px]" style={{ color: "#555" }}>
                  Daily drivers
                </p>
              </div>
            </div>
            <div className="space-y-5">
              {skills.tools.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  color="#F59E0B"
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Concepts / soft skills */}
        <div>
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: "#8B5CF6" }}>
            Concepts & Practices
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills.concepts.map((concept, i) => (
              <motion.div
                key={concept}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: "#111",
                  border: "1px solid #1c1c1c",
                  color: "#888",
                }}
                whileHover={{
                  borderColor: "rgba(139,92,246,0.3)",
                  color: "#8B5CF6",
                  backgroundColor: "rgba(139,92,246,0.06)",
                  scale: 1.05,
                }}
              >
                {concept}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
