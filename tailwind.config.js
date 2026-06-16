/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "ui-monospace", "monospace"],
      },
      colors: {
        accent: "#8B5CF6",
        "accent-2": "#06B6D4",
        "accent-3": "#10B981",
        "accent-4": "#F59E0B",
        bg: "#070707",
        "bg-2": "#0b0b0b",
        "bg-3": "#101010",
        "bg-card": "#0e0e0e",
        muted: "#888888",
        border: "#1a1a1a",
        "border-2": "#2a2a2a",
        text: "#f0f0f0",
        "text-2": "#a0a0a0",
        "text-3": "#555555",
        "text-4": "#444444",
        "accent-glow": "rgba(139, 92, 246, 0.08)",
        "accent-glow-2": "rgba(139, 92, 246, 0.1)",
        "accent-glow-3": "rgba(139, 92, 246, 0.04)",
        "border-accent": "rgba(139, 92, 246, 0.25)",
        "white-alpha-5": "rgba(255, 255, 255, 0.05)",
        "white-alpha-6": "rgba(255, 255, 255, 0.06)",
        "white-alpha-8": "rgba(255, 255, 255, 0.08)",
      },
      zIndex: {
        "98": "98",
        "99": "99",
        "100": "100",
        "9999": "9999",
        "10000": "10000",
      },
    },
  },
  plugins: [],
};
