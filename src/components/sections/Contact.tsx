"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin size={20} />,
  github: <Github size={20} />,
  twitter: <Twitter size={20} />,
  instagram: <Instagram size={20} />,
};

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverPreview, setServerPreview] = useState<{ main?: string; reply?: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to send message");

      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      // Store preview URLs from server (if any) so UI can show them
      if (json?.previewUrlMain || json?.previewUrlReply) {
        setServerPreview({ main: json.previewUrlMain, reply: json.previewUrlReply });
      } else {
        setServerPreview(null);
      }
      setTimeout(() => setSent(false), 4000);
    } catch (err: any) {
      console.error("Send error:", err);
      // Simple inline error feedback — you can replace with a toast
      alert(err?.message || "Unable to send message. Check server logs or env configuration.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 font-medium";
  const inputStyle = {
    backgroundColor: "#111",
    border: "1px solid #1c1c1c",
    color: "#f0f0f0",
  };

  return (
    <SectionWrapper id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#8B5CF6" }}>
            07 / Contact
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1c1c1c" }} />
        </div>

        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-3" style={{ color: "#f0f0f0" }}>
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-base" style={{ color: "#888" }}>
            {personalInfo.availableFor}{" — let's build something great."}
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact items */}
            <div className="space-y-5">
              {[
                { icon: <Mail size={18} />, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: <Phone size={18} />, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: <MapPin size={18} />, label: "Location", value: personalInfo.location, href: "#" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-4 p-4 rounded-xl group"
                  style={{ backgroundColor: "#111", border: "1px solid #1c1c1c" }}
                >
                  <div
                    className="p-2 rounded-lg shrink-0"
                    style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "#8B5CF6" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "#555" }}>
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      className="text-sm font-medium transition-colors duration-200 hover:text-[#8B5CF6]"
                      style={{ color: "#f0f0f0" }}
                    >
                      {item.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Response time badge */}
            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full pulse-green" style={{ backgroundColor: "#8B5CF6" }} />
                <span className="text-xs font-semibold" style={{ color: "#8B5CF6" }}>
                  Usually responds within 24h
                </span>
              </div>
              <p className="text-xs" style={{ color: "#888" }}>
                Currently open to freelance projects and full-time opportunities.
              </p>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: "#555" }}>
                Find me on
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl transition-all duration-200"
                    style={{ border: "1px solid #1c1c1c", color: "#888", backgroundColor: "#111" }}
                    whileHover={{
                      scale: 1.1,
                      color: "#8B5CF6",
                      borderColor: "rgba(139,92,246,0.3)",
                      backgroundColor: "rgba(139,92,246,0.06)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {socialIcons[s.icon]}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl space-y-5"
              style={{ backgroundColor: "#111", border: "1px solid #1c1c1c" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-2 font-medium" style={{ color: "#888" }}>
                    Your Name <span style={{ color: "#8B5CF6" }}>*</span>
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2 font-medium" style={{ color: "#888" }}>
                    Email Address <span style={{ color: "#8B5CF6" }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-2 font-medium" style={{ color: "#888" }}>
                  Subject
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration / Job Opportunity"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
                />
              </div>

              <div>
                <label className="block text-xs mb-2 font-medium" style={{ color: "#888" }}>
                  Message <span style={{ color: "#8B5CF6" }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project, timeline, and what you need..."
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1c1c1c")}
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending || sent}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  backgroundColor: sent ? "#10B981" : "#8B5CF6",
                  color: "#050505",
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.8 : 1,
                }}
                whileHover={!sending && !sent ? { boxShadow: "0 0 30px rgba(139,92,246,0.35)", scale: 1.01 } : {}}
                whileTap={!sending ? { scale: 0.98 } : {}}
              >
                {sending ? (
                  <>
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : sent ? (
                  <>✓ Message Sent!</>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>

            {/* Success panel (styled) shown after send — keeps consistent theme */}
            {sent && (
              <div className="mt-6 p-4 rounded-xl" style={{ background: "linear-gradient(90deg,#0b0b0b,#0f0f0f)", border: "1px solid #1c1c1c" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(180deg,#8B5CF6,#EC4899)", color: "#050505" }}>
                    ✓
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#f0f0f0" }}>Message sent</div>
                    <div className="text-xs mt-1" style={{ color: "#888" }}>Thanks — I received your message and will reply soon.</div>
                    {serverPreview && (serverPreview.main || serverPreview.reply) && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {serverPreview.main && (
                          <a href={serverPreview.main} target="_blank" rel="noreferrer" className="text-xs px-3 py-2 rounded-full" style={{ backgroundColor: "#111", border: "1px solid #1c1c1c", color: "#8B5CF6" }}>Preview (owner)</a>
                        )}
                        {serverPreview.reply && (
                          <a href={serverPreview.reply} target="_blank" rel="noreferrer" className="text-xs px-3 py-2 rounded-full" style={{ backgroundColor: "#111", border: "1px solid #1c1c1c", color: "#8B5CF6" }}>Preview (you)</a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
