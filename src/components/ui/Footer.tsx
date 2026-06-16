"use client";
import { motion } from "framer-motion";
import { Heart, ArrowUp, Sparkles } from "lucide-react";
import { personalInfo, navLinks, socialLinks } from "@/data/index";
import { Linkedin, Github, Instagram } from "lucide-react";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin size={16} />,
  github: <Github size={16} />,
  instagram: <Instagram size={16} />,
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-bg-2 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-black bg-gradient-to-br from-accent to-accent-2 text-white">J</div>
              <span className="text-text">Jayrajsinh</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 text-muted">{personalInfo.tagline}</p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full pulse-dot bg-accent" />
              <Sparkles size={11} className="text-accent" />
              <span>{personalInfo.availableFor}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 sm:mb-5 text-xs sm:text-sm tracking-widest uppercase text-accent">Quick Links</h4>
            <div className="flex flex-col gap-2 sm:gap-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-xs sm:text-sm transition-colors duration-200 font-medium hover:text-white text-muted">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 sm:mb-5 text-xs sm:text-sm tracking-widest uppercase text-accent">Get in Touch</h4>
            <div className="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-6">
              <a href={`mailto:${personalInfo.email}`} className="text-xs sm:text-sm transition-colors duration-200 font-medium hover:text-white break-all text-muted">
                {personalInfo.email}
              </a>
              <span className="text-xs sm:text-sm text-muted">{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((s) => (
                <motion.a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-colors duration-200 text-muted border border-border bg-bg-card"
                  whileHover={{ scale: 1.1, color: "#fff", borderColor: "rgba(139,92,246,0.3)", backgroundColor: "rgba(139,92,246,0.08)" }} whileTap={{ scale: 0.95 }}>
                  {socialIcons[s.icon]}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border">
          <p className="text-[10px] sm:text-xs flex items-center gap-1 text-text-3">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Made with <Heart size={10} className="inline text-accent" /> in {personalInfo.location.split(",")[0]}
          </p>
          <motion.button onClick={scrollToTop}
            className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium border border-border text-muted bg-bg-card"
            whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.3)", color: "#8B5CF6" }} whileTap={{ scale: 0.95 }} aria-label="Scroll to top">
            <ArrowUp size={12} /> Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
