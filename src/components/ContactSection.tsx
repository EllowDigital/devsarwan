import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { toast } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxOrb from "./ParallaxOrb";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelector(".contact-form"),
      { opacity: 0, x: -60, rotateY: 10 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );
    gsap.fromTo(
      sectionRef.current.querySelector(".contact-info"),
      { opacity: 0, x: 60, rotateY: -10 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 1, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative" ref={sectionRef}>
      <ParallaxOrb color="primary" size="lg" speed={-0.3} position={{ bottom: "0%", right: "0%" }} />
      <ParallaxOrb color="accent" size="sm" speed={0.35} position={{ top: "20%", left: "10%" }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Let's build something
            <br />
            <span className="gradient-text">amazing together.</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <form onSubmit={handleSubmit} className="contact-form glass rounded-2xl p-5 sm:p-8 space-y-5">
            {[
              { key: "name", label: "Name", type: "text" },
              { key: "email", label: "Email", type: "email" },
            ].map((field) => (
              <div key={field.key} className="relative">
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focused === field.key || form[field.key as keyof typeof form]
                    ? "top-1 text-[10px] text-primary font-semibold"
                    : "top-3.5 text-sm text-muted-foreground"
                }`}>{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  onFocus={() => setFocused(field.key)}
                  onBlur={() => setFocused(null)}
                  className="w-full px-4 pt-5 pb-2 rounded-xl bg-secondary border-2 border-transparent text-sm focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
            ))}
            <div className="relative">
              <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                focused === "message" || form.message
                  ? "top-1 text-[10px] text-primary font-semibold"
                  : "top-3.5 text-sm text-muted-foreground"
              }`}>Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className="w-full px-4 pt-5 pb-2 rounded-xl bg-secondary border-2 border-transparent text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all glow-primary hover:scale-[1.02] active:scale-95"
            >
              <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /> Send Message
            </button>
          </form>

          <div className="contact-info flex flex-col justify-center">
            <div className="glass rounded-2xl p-8 mb-6">
              <Sparkles size={24} className="text-primary mb-4" />
              <p className="text-foreground leading-relaxed font-medium mb-2">
                I'm always open to discussing new projects, creative ideas, or opportunities.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you have a question or just want to say hi — my inbox is always open. Let's make something great together.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold">Find me on</p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com/devsarwan", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/sarwan", label: "LinkedIn" },
                  { icon: Twitter, href: "https://twitter.com/sarwan", label: "Twitter" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 rounded-xl glass gradient-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-95"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
