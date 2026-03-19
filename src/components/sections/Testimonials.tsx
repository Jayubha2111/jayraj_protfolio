"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <SectionWrapper id="testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
            06 / Testimonials
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1c1c1c" }} />
        </div>

        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight" style={{ color: "#f0f0f0" }}>
            What People <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Featured testimonial slider */}
        <div ref={ref} className="relative mb-12">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-3xl mx-auto p-8 lg:p-12 rounded-2xl"
            style={{
              backgroundColor: "#111",
              border: "1px solid rgba(139,92,246,0.15)",
              boxShadow: "0 0 40px rgba(139,92,246,0.06)",
            }}
          >
            {/* Quote mark */}
            <div
              className="absolute top-6 left-8 text-8xl font-black leading-none select-none"
              style={{ color: "rgba(139,92,246,0.08)" }}
            >
              &ldquo;
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={14} fill="#F59E0B" style={{ color: "#F59E0B" }} />
              ))}
            </div>

            <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 relative z-10" style={{ color: "#f0f0f0" }}>
              &ldquo;{testimonials[current].text}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              {/* Avatar placeholder */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                  color: "#050505",
                }}
              >
                {testimonials[current].name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#f0f0f0" }}>
                  {testimonials[current].name}
                </div>
                <div className="text-xs" style={{ color: "#888" }}>
                  {testimonials[current].role} · {testimonials[current].company}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              className="p-2.5 rounded-full transition-all"
              style={{ border: "1px solid #1c1c1c", color: "#888" }}
              whileHover={{ borderColor: "rgba(139,92,246,0.3)", color: "#8B5CF6", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    backgroundColor: i === current ? "#8B5CF6" : "#2a2a2a",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="p-2.5 rounded-full transition-all"
              style={{ border: "1px solid #1c1c1c", color: "#888" }}
              whileHover={{ borderColor: "rgba(139,92,246,0.3)", color: "#8B5CF6", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* All testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl cursor-pointer transition-all"
              style={{
                backgroundColor: current === i ? "rgba(139,92,246,0.06)" : "#111",
                border: `1px solid ${current === i ? "rgba(139,92,246,0.25)" : "#1c1c1c"}`,
              }}
              onClick={() => setCurrent(i)}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={10} fill="#F59E0B" style={{ color: "#F59E0B" }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "#888" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", color: "#050505" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: "#f0f0f0" }}>{t.name}</div>
                  <div className="text-[10px]" style={{ color: "#555" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
