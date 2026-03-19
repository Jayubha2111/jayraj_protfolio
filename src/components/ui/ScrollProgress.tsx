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
      <div
        className="relative rounded-full overflow-hidden"
        style={{ width: 2, height: 80, backgroundColor: "#1c1c1c" }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 rounded-full origin-top"
          style={{
            height: `${progress}%`,
            background: "linear-gradient(180deg, #8B5CF6, #EC4899)",
          }}
        />
      </div>
      <span
        className="text-[9px] font-mono tracking-widest rotate-90 mt-2"
        style={{ color: "#444" }}
      >
        {Math.round(progress)}%
      </span>
    </motion.div>
  );
}
