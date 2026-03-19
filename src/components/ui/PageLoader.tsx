"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const lines = [
    "> Initializing Jayrajsinh.dev...",
    "> Loading portfolio...",
    "> Ready. ✓",
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1200));
    timers.push(setTimeout(() => setPhase(3), 2000));

    // Progress bar
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
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#050505" }}
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-4"
          >
            {/* Terminal bar */}
            <div
              className="rounded-t-xl px-4 py-3 flex items-center gap-2"
              style={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid #2a2a2a" }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
              <span className="ml-3 text-xs" style={{ color: "#666" }}>
                jayrajsinh.dev — terminal
              </span>
            </div>

            {/* Terminal body */}
            <div
              className="rounded-b-xl p-6 font-mono"
              style={{ backgroundColor: "#0d0d0d", minHeight: "160px" }}
            >
              {lines.slice(0, phase).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-2 text-sm"
                  style={{
                    color: i === 2 ? "#8B5CF6" : i === 0 ? "#888" : "#c0c0c0",
                  }}
                >
                  {line}
                </motion.div>
              ))}
              {phase < 3 && (
                <span className="text-sm cursor-blink" style={{ color: "#8B5CF6" }}>
                  █
                </span>
              )}
            </div>
          </motion.div>

          {/* Progress bar */}
          <div
            className="mt-8 w-full max-w-lg mx-4 rounded-full overflow-hidden"
            style={{ height: "2px", backgroundColor: "#1a1a1a" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
              }}
              transition={{ duration: 0.05 }}
            />
          </div>

          <motion.p
            className="mt-3 text-xs font-mono"
            style={{ color: "#444" }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
