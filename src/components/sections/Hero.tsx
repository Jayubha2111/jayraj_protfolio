"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowDown, Download, MapPin, Sparkles, Atom } from "lucide-react";
import { Linkedin, Github, Instagram } from "lucide-react";
import { personalInfo, socialLinks, stats } from "@/data/index";
import { useCountUp } from "@/hooks/useCountUp";
import MagneticButton from "@/components/ui/MagneticButton";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin size={18} />,
  github: <Github size={18} />,
  instagram: <Instagram size={18} />,
};

const TITLES = ["Software Engineer", "Frontend Developer", "React.js Developer"];

function StatItem({ stat, start }: { stat: typeof stats[0]; start: boolean }) {
  const count = useCountUp(stat.value, 1800, start);
  return (
    <div className="flex flex-col">
      <span className="text-2xl sm:text-3xl font-black gradient-text">
        {count}{stat.suffix}
      </span>
      <span className="text-[10px] sm:text-xs mt-1 tracking-wide text-muted">
        {stat.label}
      </span>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === target.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => { setIsDeleting(false); setTitleIndex((prev) => (prev + 1) % TITLES.length); }, 50);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden w-full min-h-dvh bg-bg">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="orb" style={{ width: "550px", height: "550px", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", top: "-20%", right: "-10%" }} />
      <div className="orb" style={{ width: "400px", height: "400px", background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)", bottom: "-15%", left: "-5%" }} />
      <div className="orb" style={{ width: "250px", height: "250px", background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      {/* Floating symbols */}
      {["{ }", "</>", "=>", "()", ";", "//", "[]", "&&"].map((sym, i) => {
        const colors = ["rgba(139,92,246,0.07)", "rgba(6,182,212,0.07)", "rgba(16,185,129,0.07)"];
        const positions = [
          { l: "6%", t: "12%" }, { l: "88%", t: "18%" }, { l: "4%", t: "72%" }, { l: "92%", t: "68%" },
          { l: "82%", t: "82%" }, { l: "12%", t: "88%" }, { l: "48%", t: "6%" }, { l: "72%", t: "48%" },
        ];
        return (
          <motion.div key={i} className="absolute font-mono font-bold select-none pointer-events-none hidden sm:block"
            style={{ left: positions[i].l, top: positions[i].t, fontSize: `${16 + ((i % 3) * 6)}px`, color: colors[i % 3] }}
            animate={{ y: [0, -16, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 5 + (i * 0.6), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >{sym}</motion.div>
        );
      })}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div ref={ref} className="w-full order-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 3.3 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl mb-6 sm:mb-8 text-[10px] sm:text-xs font-semibold tracking-wide bg-accent-glow border border-border-accent text-accent"
            >
              
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 3.4 }}
              className="text-xs sm:text-base mb-1 tracking-wide text-muted">
              Hello, I&apos;m
            </motion.p>

            <div className="overflow-hidden mb-1">
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 3.5, ease: [0.76, 0, 0.24, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight text-text">
                Jayrajsinh
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-4 sm:mb-6">
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 3.65, ease: [0.76, 0, 0.24, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight gradient-text">
                Jadav
              </motion.h1>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }}
              className="flex items-center gap-2 mb-4 sm:mb-6 flex-wrap">
              <span className="text-sm sm:text-lg font-medium text-muted">{displayed}</span>
              <span className="cursor-blink text-base sm:text-lg font-light text-accent">|</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.9, duration: 0.6 }}
              className="text-xs sm:text-sm md:text-base leading-relaxed mb-2 max-w-xl text-text-2">
              {personalInfo.about.replace(/\s+/g, " ").trim().slice(0, 180)}...
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}
              className="flex items-center gap-1.5 mb-6 sm:mb-8 text-xs sm:text-sm" style={{ color: "#555" }}>
              <MapPin size={12} /> {personalInfo.location}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.1, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
              <MagneticButton href="#projects" variant="primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                View My Work <ArrowDown size={14} />
              </MagneticButton>
              <MagneticButton href={personalInfo.resumeLink} variant="outline" target="_blank" rel="noopener noreferrer">
                <Download size={14} /> Download CV
              </MagneticButton>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.2, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10" style={{ borderTop: "1px solid #1a1a1a", paddingTop: "20px" }}>
              {stats.map((stat, i) => <StatItem key={i} stat={stat} start={isInView} />)}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.3 }}
              className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <motion.a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-xl transition-all duration-200 border border-border text-muted bg-bg-2"
                  whileHover={{ scale: 1.1, color: "#fff", borderColor: "rgba(139,92,246,0.3)", backgroundColor: "rgba(139,92,246,0.08)" }}
                  whileTap={{ scale: 0.95 }}>
                  {socialIcons[s.icon]}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 3.6, ease: [0.25,0.46,0.45,0.94] }}
            className="w-full order-2 hidden lg:block">
            <div className="rounded-2xl overflow-hidden relative border border-border" style={{ boxShadow: "0 0 60px rgba(139,92,246,0.05)" }}>
              <div className="flex items-center justify-between px-4 py-3 bg-bg-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
                </div>
                <div className="text-xs font-mono text-text-3">jayrajsinh.js</div>
                <div className="w-16" />
              </div>
              <div className="p-5 font-mono text-sm overflow-x-auto bg-bg-2" style={{ minHeight: "280px" }}>
                {[
                  { t: "const developer = {", c: "#f0f0f0" },
                  { t: '  name: "Jayrajsinh Jadav",', c: "#8B5CF6" },
                  { t: '  role: "Software Engineer",', c: "#06B6D4" },
                  { t: "  skills: [", c: "#f0f0f0" },
                  { t: '    "React.js", "Next.js",', c: "#F59E0B" },
                  { t: '    "Tailwind CSS", "TypeScript"', c: "#F59E0B" },
                  { t: "  ],", c: "#f0f0f0" },
                  { t: "  openToWork: true,", c: "#8B5CF6" },
                  { t: "  passion: Infinity,", c: "#06B6D4" },
                  { t: "};", c: "#f0f0f0" },
                ].map((line, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.8 + i * 0.1, duration: 0.3 }}
                    className="flex items-start mb-1.5 whitespace-pre-wrap">
                    <span className="select-none mr-4 text-right font-mono" style={{ color: "#333", minWidth: "20px", fontSize: "11px" }}>{i + 1}</span>
                    <span style={{ color: line.c, fontSize: "13px" }}>{line.t}</span>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.8 }} className="flex items-center mt-2">
                  <span style={{ color: "#333", minWidth: "20px", fontSize: "11px", marginRight: "16px" }}>11</span>
                  <span className="cursor-blink text-base text-accent">█</span>
                </motion.div>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-[11px] font-mono bg-gradient-to-br from-accent to-accent-2 text-white">
                <span className="font-semibold">JavaScript</span>
                <span>UTF-8</span>
                <span>Ln 11, Col 1</span>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 4.5, duration: 0.5 }}
              className="hidden xl:flex absolute -bottom-5 -left-5 p-4 rounded-xl glass-strong items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent-glow-2 text-accent">
                <Atom size={20} />
              </div>
              <div>
                <div className="text-xs font-semibold text-text">React.js</div>
                <div className="text-[10px] text-muted">Primary Stack</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

        <motion.button onClick={scrollToNext}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.5, duration: 0.5 }} aria-label="Scroll down">
          <span className="text-[10px] sm:text-xs tracking-widest uppercase text-text-4">Scroll</span>
          <div className="w-5 sm:w-6 h-8 sm:h-9 rounded-full border border-border-2 flex items-start justify-center pt-1.5">
            <motion.div className="w-0.5 sm:w-1 h-1.5 sm:h-2 rounded-full bg-accent"
              animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </motion.button>
    </section>
  );
}
