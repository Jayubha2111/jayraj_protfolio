"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Hexagon, Globe, Palette, Atom, Triangle, Wind, GitBranch, Monitor, Target, Mail, Package, Code2, Wrench } from "lucide-react";
import { skills } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";

const skillIcons: Record<string, React.ReactNode> = {
  Zap: <Zap size={18} />,
  Hexagon: <Hexagon size={18} />,
  Globe: <Globe size={18} />,
  Palette: <Palette size={18} />,
  Atom: <Atom size={18} />,
  Triangle: <Triangle size={18} />,
  Wind: <Wind size={18} />,
  GitBranch: <GitBranch size={18} />,
  Monitor: <Monitor size={18} />,
  Target: <Target size={18} />,
  Mail: <Mail size={18} />,
  Package: <Package size={18} />,
};

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
          <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ backgroundColor: `${color}15`, color }}>
            {skillIcons[icon]}
          </span>
          <span className="text-sm font-semibold text-text">
            {name}
          </span>
        </div>
        <span className="text-xs font-mono font-bold" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden bg-border">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}20, transparent)` }}
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

  const categories = [
    { title: "Languages", subtitle: "Core expertise", icon: <Code2 size={22} />, skills: skills.languages, color: "#8B5CF6" },
    { title: "Frameworks & Libraries", subtitle: "Frontend stack", icon: <Atom size={22} />, skills: skills.frameworks, color: "#06B6D4" },
    { title: "Tools & Environment", subtitle: "Daily drivers", icon: <Wrench size={22} />, skills: skills.tools, color: "#F59E0B" },
  ];

  return (
    <SectionWrapper id="skills">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="section-label mb-6">
          <span>04 / Skills</span>
          <div className="line" />
        </div>
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight text-text">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, ci) => (
            <div key={ci} className="p-6 rounded-2xl card group">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}12`, color: cat.color }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] font-medium text-text-3">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} color={cat.color} delay={i * 0.1} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {skills.concepts.length > 0 && (
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-accent">
              Concepts & Practices
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.concepts.map((concept, i) => (
                <motion.div
                  key={concept}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 card"
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
        )}
      </div>
    </SectionWrapper>
  );
}
