"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Smartphone, Zap, TrendingUp } from "lucide-react";
import { services } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TechBadge from "@/components/ui/TechBadge";

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={24} />,
  smartphone: <Smartphone size={24} />,
  zap: <Zap size={24} />,
  "trending-up": <TrendingUp size={24} />,
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div style={{ backgroundColor: "#0d0d0d" }}>
    <SectionWrapper id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
            05 / Services
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1c1c1c" }} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight" style={{ color: "#f0f0f0" }}>
            What I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-sm max-w-xs" style={{ color: "#888" }}>
            End-to-end frontend solutions, from concept to deployment.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative p-8 rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: "#111",
                border: "1px solid #1c1c1c",
              }}
              whileHover={{
                borderColor: `${service.color}40`,
                y: -4,
                boxShadow: `0 16px 48px ${service.color}10`,
              }}
            >
              {/* Background gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top left, ${service.color}08 0%, transparent 60%)`,
                }}
              />

              {/* Number */}
              <div
                className="absolute top-6 right-8 text-6xl font-black leading-none select-none"
                style={{ color: `${service.color}0d` }}
              >
                {service.number}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${service.color}18`,
                  color: service.color,
                  border: `1px solid ${service.color}30`,
                }}
              >
                {iconMap[service.icon]}
              </div>

              <h3 className="text-xl font-bold mb-3" style={{ color: "#f0f0f0" }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#888" }}>
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <TechBadge key={tag} label={tag} color={service.color} size="sm" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
    </div>
  );
}
