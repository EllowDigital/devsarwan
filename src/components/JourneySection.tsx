import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, BookOpen, Rocket, Building2 } from "lucide-react";
import ParallaxOrb from "./ParallaxOrb";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    icon: Code2,
    year: "2022",
    title: "First Lines of Code",
    description:
      "Wrote my first HTML page and fell in love with building for the web. The journey began.",
  },
  {
    icon: BookOpen,
    year: "2023",
    title: "Deep Dive into Development",
    description:
      "Mastered JavaScript, React, and backend technologies. Built projects that solved real problems.",
  },
  {
    icon: Rocket,
    year: "2024",
    title: "Going Full Stack",
    description:
      "Expanded into databases, APIs, and cloud infrastructure. Became a true full-stack developer.",
  },
  {
    icon: Building2,
    year: "2024",
    title: "Founded EllowDigital",
    description:
      "Launched EllowDigital on June 26, 2024 — turning the passion for building into a mission-driven organization.",
  },
];

const JourneySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );
    }

    const nodes = sectionRef.current.querySelectorAll(".journey-node");
    nodes.forEach((node) => {
      gsap.fromTo(
        node,
        { opacity: 0, scale: 0.5, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: node, start: "top 85%" },
        }
      );
    });

    const cards = sectionRef.current.querySelectorAll(".journey-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="journey" className="section-padding relative" ref={sectionRef}>
      <ParallaxOrb color="accent" size="lg" speed={-0.35} position={{ top: "0%", left: "0%" }} />
      <ParallaxOrb
        color="primary"
        size="md"
        speed={0.25}
        position={{ bottom: "10%", right: "5%" }}
      />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Journey</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            The path <span className="gradient-text">so far.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px origin-top md:-translate-x-px"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--gradient-start)), hsl(var(--gradient-end)))",
            }}
          />

          {milestones.map((m, i) => {
            const Icon = m.icon;
            const isLeft = i % 2 === 0;
            return (
              <div
                key={m.title}
                className={`relative flex items-start gap-6 mb-14 md:mb-20 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`journey-card ml-14 sm:ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] glass rounded-2xl p-4 sm:p-6 hover-lift ${isLeft ? "md:text-right" : ""}`}
                >
                  <span className="text-xs font-mono text-primary font-bold">{m.year}</span>
                  <h3 className="text-lg font-bold mt-1 mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                </div>

                <div className="journey-node absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full gradient-border flex items-center justify-center z-10 bg-background glow-primary">
                  <Icon size={18} className="text-primary" />
                </div>

                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
