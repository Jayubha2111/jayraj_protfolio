"use client";
import { motion } from "framer-motion";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useMagneticEffect(0.25) as React.RefObject<HTMLElement>;

  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold rounded-full transition-all duration-200 overflow-hidden";
  const primaryStyles = "text-[#050505]";
  const outlineStyles = "border text-[#f0f0f0]";

  const content = (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={`${baseStyles} ${variant === "primary" ? primaryStyles : outlineStyles} ${className}`}
      style={
        variant === "primary"
          ? { backgroundColor: "#8B5CF6" }
          : { borderColor: "#1c1c1c", backgroundColor: "transparent" }
      }
      whileHover={
        variant === "primary"
          ? { boxShadow: "0 0 30px rgba(139,92,246,0.35)" }
          : { borderColor: "rgba(139,92,246,0.4)", color: "#8B5CF6" }
      }
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return <button onClick={onClick}>{content}</button>;
}
