"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function SectionWrapper({ children, id, className = "" }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-screen flex items-center py-12 lg:py-20 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
      >
        {children}
      </motion.div>
    </section>
  );
}
