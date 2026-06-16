"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Linkedin, Github, Instagram, Sparkles, Check } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/index";
import SectionWrapper from "@/components/ui/SectionWrapper";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin size={18} />,
  github: <Github size={18} />,
  instagram: <Instagram size={18} />,
};

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverPreview, setServerPreview] = useState<{ main?: string; reply?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (json?.previewUrlMain || json?.previewUrlReply) {
        setServerPreview({ main: json.previewUrlMain, reply: json.previewUrlReply });
      } else setServerPreview(null);
      setTimeout(() => setSent(false), 4000);
    } catch (err: any) {
      console.error("Send error:", err);
      alert(err?.message || "Unable to send message.");
    } finally { setSending(false); }
  };

  const inputClass = "w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm outline-none transition-all duration-200 font-medium bg-bg-card border border-border text-text";
  const inputStyle = {};

  return (
    <SectionWrapper id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-label mb-6">
          <span>07 / Contact</span>
          <div className="line" />
        </div>

        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-2 sm:mb-3 text-text">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-sm sm:text-base text-muted">
            {personalInfo.availableFor} {"\u2014"} let&apos;s build something great.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: <Mail size={16} />, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: <Phone size={16} />, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: <MapPin size={16} />, label: "Location", value: personalInfo.location, href: "#" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl card group">
                  <div className="p-2 sm:p-2.5 rounded-xl shrink-0 bg-accent-glow text-accent">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] tracking-widest uppercase mb-0.5 sm:mb-1 font-semibold text-text-3">{item.label}</p>
                    <a href={item.href} className="text-xs sm:text-sm font-medium transition-colors duration-200 break-all hover:text-accent text-text">{item.value}</a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 sm:p-4 rounded-xl" style={{ backgroundColor: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.1)" }}>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full pulse-dot bg-accent" />
                <Sparkles size={11} className="text-accent" />
                <span className="text-[10px] sm:text-xs font-semibold text-accent">Usually responds within 24h</span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted">Currently open to freelance projects and full-time opportunities.</p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs tracking-widest uppercase mb-3 sm:mb-4 font-semibold text-text-3">Find me on</p>
              <div className="flex items-center gap-2 sm:gap-3">
                {socialLinks.map((s) => (
                  <motion.a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-xl transition-all duration-200 border border-border text-muted bg-bg-card"
                    whileHover={{ scale: 1.1, color: "#fff", borderColor: "rgba(139,92,246,0.3)", backgroundColor: "rgba(139,92,246,0.08)" }} whileTap={{ scale: 0.95 }}>
                    {socialIcons[s.icon]}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 lg:p-8 rounded-2xl space-y-4 sm:space-y-5 card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-semibold text-muted">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe"
                    className={inputClass}
                    onFocus={(e) => e.target.style.borderColor = "rgba(139,92,246,0.4)"} onBlur={(e) => e.target.style.borderColor = "#1a1a1a"} />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-semibold text-muted">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com"
                    className={inputClass}
                    onFocus={(e) => e.target.style.borderColor = "rgba(139,92,246,0.4)"} onBlur={(e) => e.target.style.borderColor = "#1a1a1a"} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-semibold text-muted">Subject</label>
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Collaboration"
                  className={inputClass} style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = "rgba(139,92,246,0.4)"} onBlur={(e) => e.target.style.borderColor = "#1a1a1a"} />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-semibold text-muted">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none`}
                  onFocus={(e) => e.target.style.borderColor = "rgba(139,92,246,0.4)"} onBlur={(e) => e.target.style.borderColor = "#1a1a1a"} />
              </div>
              <motion.button type="submit" disabled={sending || sent}
                className={`w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 text-white ${sent ? "bg-accent-3" : "bg-gradient-to-br from-accent to-accent-2"}`}
                style={{ cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.8 : 1 }}
                whileHover={!sending && !sent ? { boxShadow: "0 0 30px rgba(139,92,246,0.3)", scale: 1.01 } : {}}
                whileTap={!sending ? { scale: 0.98 } : {}}>
                {sending ? (
                  <><motion.div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-current border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} /> Sending...</>
                ) : sent ? (
                  <><Check size={14} /> Message Sent!</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </motion.button>
            </form>

            {sent && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-bg-2 to-[#0f0f0f] border border-border">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-b from-accent to-accent-2 text-white">
                    <Check size={18} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-text">Message sent</div>
                    <div className="text-[11px] sm:text-xs mt-1 text-muted">Thanks \u2014 I received your message and will reply soon.</div>
                    {serverPreview && (serverPreview.main || serverPreview.reply) && (
                      <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                        {serverPreview.main && <a href={serverPreview.main} target="_blank" rel="noreferrer" className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-bg-card border border-border text-accent">Preview</a>}
                        {serverPreview.reply && <a href={serverPreview.reply} target="_blank" rel="noreferrer" className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-bg-card border border-border text-accent">Reply preview</a>}
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
