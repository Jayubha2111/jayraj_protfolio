"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 2 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative rounded-full overflow-hidden w-[3px] h-25 bg-[#1e1e1e]">
        <motion.div
          className="absolute top-0 left-0 right-0 rounded-full origin-top bg-gradient-to-b from-accent to-accent-2"
          style={{ height: `${progress}%` }}
        />
      </div>
      <span className="text-[9px] font-mono font-bold tracking-widest text-text-3">
        {Math.round(progress)}%
      </span>
    </motion.div>
  );
}
