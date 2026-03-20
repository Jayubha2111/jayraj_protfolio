"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MapPin, GraduationCap, Building2, Users, Mail } from "lucide-react";
import { personalInfo } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";
import MagneticButton from "@/components/ui/MagneticButton";

const highlights = [
  {
    icon: <Building2 size={18} />,
    label: "Currently at",
    value: "Aloqa & Harich Tech",
    color: "#8B5CF6",
  },
  {
    icon: <GraduationCap size={18} />,
    label: "Education",
    value: "LJ University",
    color: "#EC4899",
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: "Ahmedabad, India",
    color: "#FF6B35",
  },
  {
    icon: <Users size={18} />,
    label: "LinkedIn",
    value: "500+ Connections",
    color: "#8B5CF6",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <SectionWrapper id="about" className="" >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
            01 / About
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1c1c1c" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Image + highlights */}
          <div ref={ref}>
            {/* Placeholder for profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative mb-8"
            >
              <div
                className="relative rounded-2xl overflow-hidden aspect-4/3"
                style={{
                  border: "1px solid #1c1c1c",
                  background: "linear-gradient(135deg, #0d0d0d 0%, #141414 100%)",
                }}
              >
                {/* Decorative grid inside */}
                <div className="absolute inset-0 bg-grid opacity-30" />
                {/* Profile image */}
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  fill
                  className="object-contain"
                />
                {/* Green corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24"
                  style={{
                    background: "radial-gradient(circle at top right, rgba(139,92,246,0.15) 0%, transparent 70%)",
                  }}
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 px-4 py-2.5 rounded-xl"
                style={{
                  backgroundColor: "#111",
                  border: "1px solid rgba(139,92,246,0.2)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full pulse-green" style={{ backgroundColor: "#8B5CF6" }} />
                  <span className="text-xs font-medium" style={{ color: "#8B5CF6" }}>
                    Available for work
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Highlights grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: "#111", border: "1px solid #1c1c1c" }}
                >
                  <div className="flex items-center gap-2 mb-2" style={{ color: item.color }}>
                    {item.icon}
                    <span className="text-[10px] tracking-widest uppercase font-medium" style={{ color: "#555" }}>
                      {item.label}
                    </span>
                  </div>
                  <div className="text-sm font-semibold" style={{ color: "#f0f0f0" }}>
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Text content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-black mb-6 leading-tight"
              style={{ color: "#f0f0f0" }}
            >
              Passionate about{" "}
              <span className="gradient-text">crafting</span>{" "}
              exceptional web experiences
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="space-y-4 mb-8"
            >
              {personalInfo.about.split("\n").filter(Boolean).map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "#888" }}
                >
                  {paragraph.trim()}
                </p>
              ))}
            </motion.div>

            {/* What I do */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#8B5CF6" }}>
                What I bring
              </h3>
              <div className="space-y-3">
                {[
                  "Clean, maintainable code with a focus on best practices",
                  "Pixel-perfect UI implementation from Figma designs",
                  "Performance-first mindset — fast is a feature",
                  "Strong communication and collaborative team spirit",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 text-sm" style={{ color: "#8B5CF6" }}>→</span>
                    <span className="text-sm leading-relaxed" style={{ color: "#888" }}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href={`mailto:${personalInfo.email}`}
                variant="primary"
              >
                <Mail size={15} />
                Say Hello
              </MagneticButton>
              <MagneticButton href={personalInfo.resumeLink} variant="outline" target="_blank" rel="noopener noreferrer">
                View Resume
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
