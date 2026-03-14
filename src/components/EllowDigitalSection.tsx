import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Target,
  Globe,
  Calendar,
  ArrowRight,
  ExternalLink,
  Rocket,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Calendar, label: "Founded", value: "June 26, 2024" },
  { icon: Target, label: "Mission", value: "Innovative Solutions" },
  { icon: Globe, label: "Focus", value: "Modern Software" },
  { icon: Zap, label: "Approach", value: "Cutting Edge Tech" },
];

const roadmap = [
  {
    icon: Rocket,
    title: "Launch Phase",
    description: "Building core products and establishing our tech foundation.",
    status: "complete",
  },
  {
    icon: Users,
    title: "Growth Phase",
    description: "Expanding the team and scaling our digital solutions platform.",
    status: "current",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Taking EllowDigital's products to international markets.",
    status: "upcoming",
  },
];

const EllowDigitalSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const heading = sectionRef.current.querySelector(".ellow-heading");
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, scale: 0.8, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: heading, start: "top 80%" },
        }
      );
    }

    const cards = sectionRef.current.querySelectorAll(".ellow-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="ellowdigital"
      className="section-padding relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="ellow-heading text-center mb-16">
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            Organization
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="gradient-text">EllowDigital</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building innovative digital products and technology solutions that shape the future of
            software development.
          </p>
          <div className="flex justify-center mt-6">
            <a
              href="https://github.com/EllowDigital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass gradient-border text-sm font-medium hover:scale-105 transition-transform"
            >
              <ExternalLink size={14} /> View on GitHub <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="ellow-card glass rounded-2xl p-5 text-center hover-lift"
                style={{ perspective: "800px" }}
              >
                <Icon size={20} className="text-primary mx-auto mb-3" />
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-bold text-sm">{item.value}</p>
              </div>
            );
          })}
        </div>

        {/* Story cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="ellow-card glass rounded-2xl p-8 hover-lift">
            <h3 className="text-xl font-black mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              At EllowDigital, we believe in the power of technology to transform ideas into
              reality. Our mission is to create innovative software solutions that empower
              businesses and individuals to achieve their digital goals. We focus on quality,
              performance, and user experience in everything we build.
            </p>
          </div>

          <div className="ellow-card glass rounded-2xl p-8 hover-lift">
            <h3 className="text-xl font-black mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              We envision a world where cutting-edge technology is accessible to everyone.
              EllowDigital is committed to pushing the boundaries of what's possible in software
              development, creating tools and platforms that inspire innovation and drive meaningful
              change in the digital landscape.
            </p>
          </div>
        </div>

        {/* Roadmap */}
        <div className="ellow-card glass rounded-2xl p-8">
          <h3 className="text-xl font-black mb-8 text-center">Roadmap</h3>
          <div className="flex flex-col md:flex-row gap-6">
            {roadmap.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`flex-1 relative p-5 rounded-xl border ${
                    item.status === "current"
                      ? "border-primary/40 bg-primary/5"
                      : item.status === "complete"
                        ? "border-border bg-secondary/30"
                        : "border-border/50 bg-secondary/10"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon
                      size={16}
                      className={
                        item.status === "current" ? "text-primary" : "text-muted-foreground"
                      }
                    />
                    <span
                      className={`text-xs font-mono uppercase tracking-wider ${
                        item.status === "current" ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.status === "complete"
                        ? "✓ Done"
                        : item.status === "current"
                          ? "● In Progress"
                          : "○ Upcoming"}
                    </span>
                  </div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EllowDigitalSection;
