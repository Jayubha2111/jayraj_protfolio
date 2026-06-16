"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Smartphone, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { services } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TechBadge from "@/components/ui/TechBadge";

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={22} />,
  smartphone: <Smartphone size={22} />,
  zap: <Zap size={22} />,
  "trending-up": <TrendingUp size={22} />,
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div className="bg-bg-2">
      <SectionWrapper id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-label mb-6">
            <span>05 / Services</span>
            <div className="line" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-text">
              What I <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-xs sm:text-sm max-w-xs text-muted">End-to-end frontend solutions, from concept to deployment.</p>
          </div>
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative p-5 sm:p-8 rounded-2xl overflow-hidden transition-all duration-300 card"
                whileHover={{ borderColor: `${service.color}40`, y: -4, boxShadow: `0 16px 48px ${service.color}10` }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${service.color}06 0%, transparent 60%)` }} />
                <div className="absolute top-4 sm:top-6 right-5 sm:right-8 text-5xl sm:text-6xl font-black leading-none select-none opacity-[0.04]"
                  style={{ color: service.color }}>{service.number}</div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ backgroundColor: `${service.color}10`, color: service.color, border: `1px solid ${service.color}20` }}>
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-text">{service.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 text-text-2">{service.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {service.tags.map((tag) => <TechBadge key={tag} label={tag} color={service.color} size="sm" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
