import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Lightbulb, Rocket, Heart } from "lucide-react";
import ParallaxOrb from "./ParallaxOrb";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    icon: Code2,
    title: "The Beginning",
    description:
      "My journey into coding started with a simple curiosity — how do websites work? That question led to countless hours of exploring HTML, CSS, and eventually full-stack development.",
  },
  {
    icon: Heart,
    title: "The Passion",
    description:
      "What started as curiosity quickly became a deep passion. Building software isn't just writing code — it's crafting experiences, solving real problems, and creating something from nothing.",
  },
  {
    icon: Lightbulb,
    title: "The Learning",
    description:
      "Every new technology is an opportunity. From React to Python, from databases to cloud deployments — I approach every challenge as a chance to grow and push boundaries.",
  },
  {
    icon: Rocket,
    title: "The Vision",
    description:
      "My goal is to build impactful digital products that make a difference. Through EllowDigital, I'm turning this vision into reality — one project at a time.",
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".about-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="about" className="section-padding relative" ref={sectionRef}>
      <ParallaxOrb color="primary" size="md" speed={-0.4} position={{ top: "0%", right: "0%" }} />
      <ParallaxOrb color="accent" size="sm" speed={0.3} position={{ bottom: "10%", left: "5%" }} />

      <div className="max-w-4xl mx-auto relative">
        <div ref={headingRef} className="mb-16">
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            The story behind
            <br />
            <span className="gradient-text">the code.</span>
          </h2>
        </div>

        <div className="grid gap-8">
          {stories.map((story, i) => {
            const Icon = story.icon;
            return (
              <div
                key={story.title}
                className="about-card flex gap-6 items-start glass rounded-2xl p-6 md:p-8 hover-lift"
              >
                <div className="shrink-0 w-14 h-14 rounded-xl gradient-border flex items-center justify-center bg-background">
                  <Icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{story.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
