"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { personalInfo, socialLinks, stats } from "@/data/index";
import { useCountUp } from "@/hooks/useCountUp";
import MagneticButton from "@/components/ui/MagneticButton";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin size={18} />,
  github: <Github size={18} />,
  twitter: <Twitter size={18} />,
  instagram: <Instagram size={18} />,
};

const TITLES = ["Software Engineer", "Frontend Developer", "React.js Developer"];

const codeLines = [
  { text: "const developer = {", color: "#f0f0f0" },
  { text: '  name: "Jayrajsinh Jadav",', color: "#8B5CF6" },
  { text: '  role: "Software Engineer",', color: "#EC4899" },
  { text: "  skills: [", color: "#f0f0f0" },
  { text: '    "React.js", "Next.js",', color: "#FF6B35" },
  { text: '    "Tailwind CSS", "TypeScript"', color: "#FF6B35" },
  { text: "  ],", color: "#f0f0f0" },
  { text: "  openToWork: true,", color: "#8B5CF6" },
  { text: "  passion: Infinity,", color: "#EC4899" },
  { text: "};", color: "#f0f0f0" },
];

function StatItem({ stat, start }: { stat: typeof stats[0]; start: boolean }) {
  const count = useCountUp(stat.value, 1800, start);
  return (
    <div className="flex flex-col">
      <span className="text-3xl font-black" style={{ color: "#8B5CF6" }}>
        {count}
        {stat.suffix}
      </span>
      <span className="text-xs mt-1 tracking-wide" style={{ color: "#888" }}>
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

  // Typewriter effect
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
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }, 50);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const floatingSymbols = [
    { sym: "{}", x: "8%", y: "15%", size: 22, delay: 0 },
    { sym: "</>", x: "88%", y: "20%", size: 16, delay: 1 },
    { sym: "=>", x: "5%", y: "70%", size: 18, delay: 2 },
    { sym: "()", x: "92%", y: "65%", size: 20, delay: 0.5 },
    { sym: ";", x: "80%", y: "80%", size: 28, delay: 1.5 },
    { sym: "//", x: "15%", y: "85%", size: 16, delay: 2.5 },
    { sym: "[]", x: "45%", y: "8%", size: 18, delay: 0.8 },
    { sym: "&&", x: "70%", y: "45%", size: 14, delay: 1.8 },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Gradient orbs */}
      <div
        className="absolute top-0 right-0 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          transform: "translate(20%, -20%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-125 h-125 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
          transform: "translate(-20%, 20%)",
        }}
      />

      {/* Floating code symbols */}
      {floatingSymbols.map((item, i) => (
        <motion.div
          key={i}
          className="absolute font-mono select-none pointer-events-none float-anim"
          style={{
            left: item.x,
            top: item.y,
            fontSize: item.size,
            color: "rgba(139,92,246,0.12)",
            animationDelay: `${item.delay}s`,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 5 + item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.sym}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div ref={ref}>
            {/* Open to work badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-medium tracking-wider"
              style={{
                backgroundColor: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.2)",
                color: "#8B5CF6",
              }}
            >
              <span
                className="w-2 h-2 rounded-full pulse-green"
                style={{ backgroundColor: "#8B5CF6" }}
              />
              ● Open to Work
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.4 }}
              className="text-base mb-2"
              style={{ color: "#888" }}
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 3.5, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl sm:text-6xl xl:text-7xl font-black leading-none tracking-tight"
                style={{ color: "#f0f0f0" }}
              >
                Jayrajsinh
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 3.65, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl sm:text-6xl xl:text-7xl font-black leading-none tracking-tight gradient-text"
              >
                Jadav
              </motion.h1>
            </div>

            {/* Typewriter title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-lg font-medium" style={{ color: "#888" }}>
                {displayed}
              </span>
              <span className="cursor-blink text-lg font-light" style={{ color: "#8B5CF6" }}>
                |
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.9, duration: 0.6 }}
              className="text-base leading-relaxed mb-2 max-w-xl line-clamp-3"
              style={{ color: "#888" }}
            >
              {personalInfo.about.replace(/\s+/g, " ").trim().slice(0, 200)}...
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="flex items-center gap-1.5 mb-8 text-sm"
              style={{ color: "#555" }}
            >
              <MapPin size={13} />
              {personalInfo.location}
            </motion.div>

    
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.1, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <MagneticButton
                href="#projects"
                variant="primary"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View My Work
                <ArrowDown size={15} />
              </MagneticButton>
              <MagneticButton
                href={personalInfo.resumeLink}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={15} />
                Download CV
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.2, duration: 0.5 }}
              className="grid grid-cols-4 gap-6 mb-10"
              style={{ borderTop: "1px solid #1c1c1c", paddingTop: "24px" }}
            >
              {stats.map((stat, i) => (
                <StatItem key={i} stat={stat} start={isInView} />
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.3 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((s) => (
                <motion.a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl transition-all duration-200"
                  style={{
                    border: "1px solid #1c1c1c",
                    color: "#888",
                    backgroundColor: "#0d0d0d",
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: "#8B5CF6",
                    borderColor: "rgba(139,92,246,0.3)",
                    backgroundColor: "rgba(139,92,246,0.06)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {socialIcons[s.icon]}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Code window */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 3.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block"
          >
            {/* Terminal window */}
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                border: "1px solid #1c1c1c",
                boxShadow: "0 0 60px rgba(139,92,246,0.08)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ backgroundColor: "#141414", borderBottom: "1px solid #1c1c1c" }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
                </div>
                <div
                  className="text-xs font-mono"
                  style={{ color: "#555" }}
                >
                  jayrajsinh.js
                </div>
                <div className="w-16" />
              </div>

              {/* Code content */}
              <div
                className="p-6 font-mono text-sm"
                style={{ backgroundColor: "#0d0d0d", minHeight: "340px" }}
              >
                {/* Line numbers + code */}
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3.8 + i * 0.1, duration: 0.3 }}
                    className="flex items-start mb-1.5"
                  >
                    <span
                      className="select-none mr-4 text-right"
                      style={{ color: "#333", minWidth: "20px", fontSize: "11px" }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ color: line.color, fontSize: "13px" }}>{line.text}</span>
                  </motion.div>
                ))}

                {/* Blinking cursor at end */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.8 }}
                  className="flex items-center mt-3"
                >
                  <span style={{ color: "#333", minWidth: "20px", fontSize: "11px", marginRight: "16px" }}>
                    11
                  </span>
                  <span className="cursor-blink text-base" style={{ color: "#8B5CF6" }}>█</span>
                </motion.div>
              </div>

              {/* Status bar */}
              <div
                className="flex items-center justify-between px-4 py-2 text-[10px] font-mono"
                style={{ backgroundColor: "#8B5CF6", color: "#050505" }}
              >
                <span className="font-semibold">● JavaScript</span>
                <span>UTF-8</span>
                <span>Ln 11, Col 1</span>
              </div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.5, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 p-4 rounded-xl"
              style={{
                backgroundColor: "#111",
                border: "1px solid #1c1c1c",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: "rgba(139,92,246,0.1)" }}
                >
                  ⚛️
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: "#f0f0f0" }}>
                    React.js
                  </div>
                  <div className="text-[10px]" style={{ color: "#888" }}>
                    Primary Stack
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.5, duration: 0.5 }}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "#444" }}>
          Scroll
        </span>
        <motion.div
          className="w-6 h-9 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: "#2a2a2a" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: "#8B5CF6" }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
