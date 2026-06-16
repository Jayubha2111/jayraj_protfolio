"use client";
import { motion } from "framer-motion";

interface TechBadgeProps {
  label: string;
  color?: string;
  size?: "sm" | "md";
}

export default function TechBadge({ label, color = "#8B5CF6", size = "md" }: TechBadgeProps) {
  return (
    <motion.span
      className={`inline-flex items-center rounded-xl font-semibold tracking-wide ${size === "sm" ? "text-[10px] px-[10px] py-[3px]" : "text-[11px] px-3 py-1"}`}
      style={{
        backgroundColor: `${color}12`,
        color: color,
        border: `1px solid ${color}25`,
      }}
      whileHover={{ scale: 1.05 }}
    >
      {label}
    </motion.span>
  );
}
