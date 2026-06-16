"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
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
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-100 h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-4"
        style={{ scaleX: progress / 100 }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.2 }}
        className={`fixed top-0 left-0 right-0 z-99 transition-all duration-300 ${scrolled ? "pt-0 bg-bg/85 backdrop-blur-2xl border-b border-white-alpha-6 shadow-[0_1px_30px_rgba(0,0,0,0.3)]" : "pt-3 bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
              className="flex items-center gap-2 text-xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black bg-gradient-to-br from-accent to-accent-2 text-white">
                J
              </div>
              <span className="hidden sm:inline text-text">Jayrajsinh</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "text-white bg-accent-glow-2" : "text-muted bg-transparent"}`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 bg-gradient-to-br from-accent to-accent-2 text-white"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Sparkles size={14} />
                Hire Me
              </motion.a>

              <button
                className="md:hidden relative p-2.5 rounded-xl transition-all duration-200 bg-white-alpha-5 border border-white-alpha-8 text-text"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-98 flex flex-col items-center justify-center"
            style={{ backgroundColor: "rgba(7,7,7,0.98)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-6"
            >
              {navLinks.map((link, i) => (
                  <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`text-3xl font-bold transition-all duration-200 ${activeSection === link.href ? "text-accent" : "text-text"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.15 }}
                  whileHover={{ color: "#8B5CF6", x: 6 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="mt-4 px-8 py-3 text-base font-semibold rounded-xl flex items-center gap-2 bg-gradient-to-br from-accent to-accent-2 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Sparkles size={16} />
                Hire Me
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
