"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowRight, Sparkles, Star, Code2 } from "lucide-react";
import { projects } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TechBadge from "@/components/ui/TechBadge";

const categories = ["All", "Web App", "Landing Page", "Portfolio"];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <SectionWrapper id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-label mb-6">
          <span>03 / Projects</span>
          <div className="line" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-text">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-xs sm:text-sm max-w-xs text-muted">Projects that reflect my growth, curiosity, and craft.</p>
        </div>

        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase flex items-center gap-1.5 text-accent">
            <Sparkles size={11} /> Featured
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {featuredProjects.slice(0, 2).map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.15 }}
              ref={i === 0 ? ref : undefined} className="group relative rounded-2xl overflow-hidden bg-bg-card border border-border" style={{ minHeight: "320px" }}
              whileHover={{ borderColor: `${project.color}40`, y: -4 }}>
              <div className="absolute inset-0 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${project.color}12 0%, transparent 60%)`, opacity: 0.6 }} />
              <div className="absolute inset-0 bg-grid-dense opacity-15" />
              <div className="absolute right-4 sm:right-6 top-4 sm:top-6 text-6xl sm:text-8xl font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-7xl sm:group-hover:text-9xl"
                style={{ color: `${project.color}08` }}>{String(project.id).padStart(2, "0")}</div>
              <div className="relative z-10 p-5 sm:p-8 flex flex-col justify-end h-full">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-auto pt-12 sm:pt-16">
                  {project.tags.slice(0, 3).map((tag) => <TechBadge key={tag} label={tag} color={project.color} size="sm" />)}
                  <span className="text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 rounded-full font-medium bg-accent-glow-2 text-accent">{project.year}</span>
                </div>
                <div className="mt-5 sm:mt-8">
                  <p className="text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-1 sm:mb-2" style={{ color: project.color }}>{project.category}</p>
                  <h3 className="text-xl sm:text-2xl font-black mb-1 sm:mb-2 text-text">{project.title}</h3>
                  <p className="text-xs sm:text-sm mb-1 font-medium text-muted">{project.subtitle}</p>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 text-text-4">{project.description}</p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all"
                      style={{ backgroundColor: project.color, color: "#fff" }}
                      whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${project.color}40` }} whileTap={{ scale: 0.97 }}>
                      <ExternalLink size={11} /> Live Demo
                    </motion.a>
                    <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all border border-border-2 text-muted bg-transparent"
                      whileHover={{ borderColor: "#444", color: "#f0f0f0", scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                      <Github size={11} /> Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4 sm:mb-5 mt-6 sm:mt-10">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase flex items-center gap-1 text-accent">
            <Star size={11} /> All Projects
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          {categories.map((cat) => (
            <motion.button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold tracking-wide transition-all duration-200 ${activeCategory === cat ? "bg-gradient-to-br from-accent to-accent-2 text-white" : "bg-bg-card text-muted border border-border"}`}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((project, i) => (
            <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden card" whileHover={{ borderColor: `${project.color}30`, y: -4, boxShadow: `0 12px 40px ${project.color}10` }}>
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}88)` }} />
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase px-2 sm:px-2.5 py-1 rounded-lg" style={{ backgroundColor: `${project.color}10`, color: project.color }}>{project.category}</span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1 sm:p-1.5 rounded-lg transition-colors" style={{ color: "#555" }} whileHover={{ color: "#f0f0f0", scale: 1.1 }}><Github size={13} /></motion.a>
                    <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1 sm:p-1.5 rounded-lg transition-colors" style={{ color: "#555" }} whileHover={{ color: "#8B5CF6", scale: 1.1 }}><ExternalLink size={13} /></motion.a>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-1 text-text">{project.title}</h3>
                <p className="text-[11px] sm:text-xs mb-2 sm:mb-3 font-medium text-muted">{project.subtitle}</p>
                <p className="text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-5 line-clamp-3 text-text-4">{project.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                  {project.tags.slice(0, 4).map((tag) => <TechBadge key={tag} label={tag} color={project.color} size="sm" />)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-mono text-text-4">{project.year}</span>
                  <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold transition-colors" style={{ color: project.color }}
                    whileHover={{ gap: "6px sm:8px" }}>View Project <ArrowRight size={11} /></motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
