import { motion } from "framer-motion";
import { Code2, BookOpen, Rocket, Building2 } from "lucide-react";

const milestones = [
  {
    icon: Code2,
    year: "2022",
    title: "First Lines of Code",
    description: "Wrote my first HTML page and fell in love with building for the web. The journey began.",
  },
  {
    icon: BookOpen,
    year: "2023",
    title: "Deep Dive into Development",
    description: "Mastered JavaScript, React, and backend technologies. Built projects that solved real problems.",
  },
  {
    icon: Rocket,
    year: "2024",
    title: "Going Full Stack",
    description: "Expanded into databases, APIs, and cloud infrastructure. Became a true full-stack developer.",
  },
  {
    icon: Building2,
    year: "2024",
    title: "Founded EllowDigital",
    description: "Launched EllowDigital on June 26, 2024 — turning the passion for building into a mission-driven organization.",
  },
];

const JourneySection = () => {
  return (
    <section id="journey" className="section-padding relative">
      <div className="absolute top-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The path <span className="gradient-text">so far.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {milestones.map((m, i) => {
            const Icon = m.icon;
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex items-start gap-6 mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:text-right" : ""}`}>
                  <span className="text-xs font-mono text-primary">{m.year}</span>
                  <h3 className="text-lg font-semibold mt-1 mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                </div>

                {/* Icon node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full glass gradient-border flex items-center justify-center z-10 bg-background">
                  <Icon size={18} className="text-primary" />
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
