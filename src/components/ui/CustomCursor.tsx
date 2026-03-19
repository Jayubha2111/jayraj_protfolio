"use client";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useState, useEffect } from "react";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [hovering, setHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const addListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [data-cursor]"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setHovering(true);
          const text = (el as HTMLElement).dataset.cursor || "CLICK";
          setHoverText(text);
        });
        el.addEventListener("mouseleave", () => {
          setHovering(false);
          setHoverText("");
        });
      });
    };

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-10000 rounded-full"
        style={{
          width: 6,
          height: 6,
          backgroundColor: "#8B5CF6",
          mixBlendMode: "difference",
        }}
        animate={{ x: x - 3, y: y - 3, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "tween", duration: 0 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 rounded-full flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          border: `1.5px solid ${hovering ? "transparent" : "#8B5CF6"}`,
          backgroundColor: hovering ? "rgba(139,92,246,0.15)" : "transparent",
        }}
        animate={{
          x: x - 22,
          y: y - 22,
          scale: hovering ? 1.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.5 }}
      >
        {hovering && hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[7px] font-bold tracking-widest"
            style={{ color: "#8B5CF6" }}
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
