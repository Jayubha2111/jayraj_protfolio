"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/index";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();
  const sectionIds = navLinks.map((l) => l.href);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 right-0 z-100 h-0.5"
        style={{ backgroundColor: "transparent" }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
          }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.2 }}
        className="fixed top-0 left-0 right-0 z-99 transition-all duration-300"
        style={{
          paddingTop: "2px",
          backgroundColor: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid #1c1c1c" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
              className="text-xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              <span style={{ color: "#888" }}>&lt;</span>
              <span style={{ color: "#8B5CF6" }}>Jayraj</span>
              <span style={{ color: "#888" }}>/&gt;</span>
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="relative text-sm font-medium transition-colors duration-200"
                  style={{
                    color: activeSection === link.href ? "#8B5CF6" : "#888",
                  }}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ backgroundColor: "#8B5CF6" }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200"
                style={{
                  backgroundColor: "#8B5CF6",
                  color: "#050505",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139,92,246,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Hire Me
              </motion.a>

              <button
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ color: "#f0f0f0" }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-98 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#050505" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-4xl font-bold transition-colors duration-200"
                  style={{ color: activeSection === link.href ? "#8B5CF6" : "#f0f0f0" }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.15 }}
                  whileHover={{ color: "#8B5CF6", x: 8 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="mt-4 px-8 py-3 text-lg font-semibold rounded-full"
                style={{ backgroundColor: "#8B5CF6", color: "#050505" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hire Me
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
