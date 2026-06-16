"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "#8B5CF6",
  delay = 0,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative rounded-2xl p-6 transition-all duration-300 group bg-[#111] border border-[#1e1e1e] ${className}`}
      whileHover={{
        borderColor: `${glowColor}40`,
        boxShadow: `0 0 30px ${glowColor}12, 0 0 60px ${glowColor}06`,
        y: -4,
      }}
    >
      {children}
    </motion.div>
  );
}
