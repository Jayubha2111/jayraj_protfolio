"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-label mb-6">
          <span>06 / Testimonials</span>
          <div className="line" />
        </div>
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-text">
            What People <span className="gradient-text">Say</span>
          </h2>
        </div>

        <div ref={ref} className="relative mb-10 sm:mb-12">
          <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
            className="relative max-w-3xl mx-auto p-6 sm:p-8 lg:p-12 rounded-2xl card" style={{ border: "1px solid rgba(139,92,246,0.12)", boxShadow: "0 0 40px rgba(139,92,246,0.03)" }}>
            <Quote size={40} className="absolute top-5 sm:top-6 left-5 sm:left-8 opacity-[0.05] text-accent" />
            <div className="flex items-center gap-1 mb-4 sm:mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => <Star key={i} size={13} fill="#F59E0B" className="text-accent-4" />)}
            </div>
            <blockquote className="text-base sm:text-xl lg:text-2xl leading-relaxed mb-6 sm:mb-8 relative z-10 font-medium text-text">
              &ldquo;{testimonials[current].text}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-black shrink-0 bg-gradient-to-br from-accent to-accent-2 text-white">
                {testimonials[current].name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold truncate text-text">{testimonials[current].name}</div>
                <div className="text-[11px] sm:text-xs truncate text-muted">{testimonials[current].role} {'\u00b7'} {testimonials[current].company}</div>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <motion.button onClick={prev} className="p-2 sm:p-2.5 rounded-xl transition-all border border-border text-muted bg-bg-card"
              whileHover={{ borderColor: "rgba(139,92,246,0.3)", color: "#8B5CF6", scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="Previous">
              <ChevronLeft size={16} />
            </motion.button>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all duration-200"
                  style={{ width: i === current ? 24 : 7, height: 7, backgroundColor: i === current ? "#8B5CF6" : "#2a2a2a" }}
                  aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <motion.button onClick={next} className="p-2 sm:p-2.5 rounded-xl transition-all border border-border text-muted bg-bg-card"
              whileHover={{ borderColor: "rgba(139,92,246,0.3)", color: "#8B5CF6", scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="Next">
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-4 sm:p-6 rounded-2xl cursor-pointer transition-all card ${current === i ? "bg-accent-glow-3" : "bg-bg-card"}`} style={{ border: `1px solid ${current === i ? "rgba(139,92,246,0.2)" : "#1a1a1a"}` }}
              onClick={() => setCurrent(i)} whileHover={{ y: -2 }}>
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={9} fill="#F59E0B" className="text-accent-4" />)}
              </div>
              <p className="text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 text-text-2">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black shrink-0 bg-gradient-to-br from-accent to-accent-2 text-white">{t.name.charAt(0)}</div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-semibold truncate text-text">{t.name}</div>
                  <div className="text-[9px] sm:text-[10px] truncate text-text-3">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
