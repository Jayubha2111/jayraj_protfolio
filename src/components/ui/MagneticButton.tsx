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

  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-bold rounded-xl transition-all duration-200 overflow-hidden";

  const content = (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={`${baseStyles} ${className} ${variant === "primary" ? "bg-gradient-to-br from-accent to-accent-2 text-white" : "border border-[#1e1e1e] text-text bg-transparent"}`}
      whileHover={
        variant === "primary"
          ? { boxShadow: "0 0 30px rgba(139,92,246,0.3)" }
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
