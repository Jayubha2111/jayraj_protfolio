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
      className="inline-flex items-center rounded-full font-medium tracking-wide"
      style={{
        fontSize: size === "sm" ? "10px" : "11px",
        padding: size === "sm" ? "2px 8px" : "3px 10px",
        backgroundColor: `${color}18`,
        color: color,
        border: `1px solid ${color}35`,
      }}
      whileHover={{ scale: 1.05 }}
    >
      {label}
    </motion.span>
  );
}
