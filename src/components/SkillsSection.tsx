import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Server, Database, Wrench, Layers } from "lucide-react";
import ParallaxOrb from "./ParallaxOrb";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    icon: Monitor,
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "TypeScript", level: 82 },
      { name: "TailwindCSS", level: 92 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "REST APIs", level: 88 },
      { name: "Express", level: 82 },
    ],
  },
  {
    icon: Database,
    title: "Database",
    skills: [
      { name: "SQL", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Firebase", level: 78 },
    ],
  },
  {
    icon: Wrench,
    title: "Tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Docker", level: 70 },
      { name: "Linux", level: 75 },
    ],
  },
  {
    icon: Layers,
    title: "Other",
    skills: [
      { name: "Figma", level: 72 },
      { name: "CI/CD", level: 70 },
      { name: "Agile", level: 80 },
      { name: "Testing", level: 75 },
    ],
  },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: barRef.current, start: "top 90%" },
      }
    );
  }, []);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full origin-left"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))`,
          }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".skill-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, rotateY: 10 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="skills" className="section-padding relative" ref={sectionRef}>
      <ParallaxOrb color="accent" size="lg" speed={-0.25} position={{ bottom: "0%", left: "0%" }} />
      <ParallaxOrb color="primary" size="sm" speed={0.4} position={{ top: "10%", right: "10%" }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Skills</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Technologies I <span className="gradient-text">work with.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="skill-card glass rounded-2xl p-6 hover-lift"
                style={{ perspective: "800px" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-bold">{cat.title}</h3>
                </div>
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
