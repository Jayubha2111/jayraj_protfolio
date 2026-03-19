"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { projects } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TechBadge from "@/components/ui/TechBadge";

const categories = ["All", "Web App", "Landing Page", "Portfolio"];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <SectionWrapper id="projects">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
            03 / Projects
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1c1c1c" }} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight" style={{ color: "#f0f0f0" }}>
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-sm max-w-xs" style={{ color: "#888" }}>
            Projects that reflect my growth, curiosity, and craft.
          </p>
        </div>

        {/* Featured projects – large cards */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#8B5CF6" }}>✦ Featured</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1c1c1c" }} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {featuredProjects.slice(0, 2).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              ref={i === 0 ? ref : undefined}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#111",
                border: "1px solid #1c1c1c",
                minHeight: "360px",
              }}
              data-cursor="VIEW"
              whileHover={{ borderColor: `${project.color}40`, y: -4 }}
            >
              {/* Background image placeholder / gradient */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${project.color}18 0%, transparent 60%)`,
                  opacity: 0.6,
                }}
              />
              <div className="absolute inset-0 bg-grid opacity-20" />

              {/* Large number */}
              <div
                className="absolute right-6 top-6 text-8xl font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-9xl"
                style={{ color: `${project.color}0d` }}
              >
                {String(project.id).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                {/* Tags top */}
                <div className="flex flex-wrap gap-2 mb-auto pt-16">
                  {project.tags.slice(0, 3).map((tag) => (
                    <TechBadge key={tag} label={tag} color={project.color} size="sm" />
                  ))}
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: "rgba(139,92,246,0.12)", color: "#8B5CF6" }}
                  >
                    {project.year}
                  </span>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: project.color }}>
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-black mb-2" style={{ color: "#f0f0f0" }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-1 font-medium" style={{ color: "#888" }}>
                    {project.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed mb-6 line-clamp-2" style={{ color: "#666" }}>
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all"
                      style={{ backgroundColor: project.color, color: "#050505" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ExternalLink size={12} /> Live Demo
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all"
                      style={{
                        border: "1px solid #2a2a2a",
                        color: "#888",
                        backgroundColor: "transparent",
                      }}
                      whileHover={{ borderColor: "#444", color: "#f0f0f0", scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Github size={12} /> Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All projects sub-label + filter tabs */}
        <div className="flex items-center gap-4 mb-5 mt-10">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#8B5CF6" }}>✦ All Projects</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1c1c1c" }} />
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200"
              style={{
                backgroundColor: activeCategory === cat ? "#8B5CF6" : "#111",
                color: activeCategory === cat ? "#050505" : "#888",
                border: `1px solid ${activeCategory === cat ? "#8B5CF6" : "#1c1c1c"}`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* All projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#111",
                border: "1px solid #1c1c1c",
              }}
              whileHover={{
                borderColor: `${project.color}40`,
                y: -4,
                boxShadow: `0 12px 40px ${project.color}12`,
              }}
            >
              {/* Top color strip */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: project.color }}
              />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded"
                    style={{ backgroundColor: `${project.color}18`, color: project.color }}
                  >
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: "#555" }}
                      whileHover={{ color: "#f0f0f0", scale: 1.1 }}
                    >
                      <Github size={14} />
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: "#555" }}
                      whileHover={{ color: "#8B5CF6", scale: 1.1 }}
                    >
                      <ExternalLink size={14} />
                    </motion.a>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1" style={{ color: "#f0f0f0" }}>
                  {project.title}
                </h3>
                <p className="text-xs mb-3 font-medium" style={{ color: "#888" }}>
                  {project.subtitle}
                </p>
                <p className="text-xs leading-relaxed mb-5 line-clamp-3" style={{ color: "#666" }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <TechBadge key={tag} label={tag} color={project.color} size="sm" />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono" style={{ color: "#444" }}>
                    {project.year}
                  </span>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: project.color }}
                    whileHover={{ gap: "8px" }}
                  >
                    View Project <ArrowRight size={12} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
