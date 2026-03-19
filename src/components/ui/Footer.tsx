"use client";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { personalInfo, navLinks, socialLinks } from "@/data/index";
import { Linkedin, Github, Twitter, Instagram } from "lucide-react";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin size={18} />,
  github: <Github size={18} />,
  twitter: <Twitter size={18} />,
  instagram: <Instagram size={18} />,
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative"
      style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid #1c1c1c" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span style={{ color: "#888" }}>&lt;</span>
              <span style={{ color: "#8B5CF6" }}>Jayraj</span>
              <span style={{ color: "#888" }}>/&gt;</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#888" }}>
              {personalInfo.tagline}
            </p>
            <div className="flex items-center gap-1 text-sm" style={{ color: "#888" }}>
              <span className="w-2 h-2 rounded-full pulse-green" style={{ backgroundColor: "#8B5CF6" }} />
              <span className="ml-2">{personalInfo.availableFor}</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: "#888" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "#888" }}
              >
                {personalInfo.email}
              </a>
              <span className="text-sm" style={{ color: "#888" }}>
                {personalInfo.location}
              </span>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors duration-200"
                  style={{ color: "#888", border: "1px solid #1c1c1c" }}
                  whileHover={{
                    scale: 1.1,
                    color: "#8B5CF6",
                    borderColor: "rgba(139,92,246,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {socialIcons[s.icon]}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #1c1c1c" }}
        >
          <p className="text-xs flex items-center gap-1" style={{ color: "#555" }}>
            &copy; {new Date().getFullYear()} {personalInfo.name}. Made with{" "}
            <Heart size={12} className="inline" style={{ color: "#8B5CF6" }} /> in{" "}
            {personalInfo.location.split(",")[0]}
          </p>
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-full transition-all duration-200"
            style={{
              border: "1px solid #1c1c1c",
              color: "#888",
            }}
            whileHover={{
              scale: 1.1,
              borderColor: "rgba(139,92,246,0.4)",
              color: "#8B5CF6",
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
