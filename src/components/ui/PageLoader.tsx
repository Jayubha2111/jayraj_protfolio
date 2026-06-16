"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const lines = [
    "> Initializing Jayrajsinh.dev...",
    "> Loading portfolio...",
    '> Ready.',
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1200));
    timers.push(setTimeout(() => setPhase(3), 2000));

    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(Math.min(p, 100));
      if (p >= 100) clearInterval(interval);
    }, 50);

    timers.push(setTimeout(() => setDone(true), 3100));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-bg"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-4"
          >
            <div
              className="rounded-t-xl px-4 py-3 flex items-center gap-2 bg-[#161616] border-b border-border-2"
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
              <span className="ml-3 text-xs font-mono" style={{ color: "#666" }}>
                jayrajsinh.dev — terminal
              </span>
            </div>

            <div
              className="rounded-b-xl p-6 font-mono bg-bg-card"
              style={{ minHeight: "160px" }}
            >
              {lines.slice(0, phase).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 text-sm flex items-center gap-1.5 ${i === 2 ? "text-accent" : i === 0 ? "text-muted" : "text-[#c0c0c0]"}`}
                >
                  {i === 2 && <Check size={12} />}
                  {line}
                </motion.div>
              ))}
              {phase < 3 && (
                <span className="text-sm cursor-blink text-accent">
                  █
                </span>
              )}
            </div>
          </motion.div>

          <div className="mt-8 w-full max-w-lg mx-4 rounded-full overflow-hidden h-[3px] bg-border">
            <motion.div
              className="h-full rounded-full bg-gradient-to-br from-accent to-accent-2"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          <motion.p
            className="mt-3 text-xs font-mono font-semibold gradient-text"
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
