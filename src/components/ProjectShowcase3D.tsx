import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "EllowDigital Platform",
    description: "A comprehensive digital solutions platform offering modern software development services.",
    tech: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com/EllowDigital",
    live: "#",
    gradient: "from-primary/30 via-accent/20 to-primary/10",
  },
  {
    title: "AI Content Generator",
    description: "An intelligent content generation tool powered by machine learning and NLP.",
    tech: ["Python", "React", "OpenAI", "FastAPI"],
    github: "#",
    live: "#",
    gradient: "from-accent/30 via-primary/20 to-accent/10",
  },
  {
    title: "DevDash Dashboard",
    description: "Real-time developer dashboard for monitoring project metrics and team productivity.",
    tech: ["React", "TypeScript", "D3.js", "Firebase"],
    github: "#",
    live: "#",
    gradient: "from-primary/25 via-primary/15 to-accent/10",
  },
  {
    title: "API Gateway Service",
    description: "A scalable API gateway with rate limiting, auth, and request routing.",
    tech: ["Node.js", "Express", "Redis", "Docker"],
    github: "#",
    live: "#",
    gradient: "from-accent/25 via-accent/15 to-primary/10",
  },
  {
    title: "CodeSnap CLI",
    description: "A developer CLI tool for generating beautiful code screenshots instantly.",
    tech: ["TypeScript", "Node.js", "Sharp"],
    github: "#",
    live: "#",
    gradient: "from-primary/20 via-accent/20 to-primary/15",
  },
  {
    title: "Portfolio CMS",
    description: "A headless CMS designed for developer portfolios with markdown and Git sync.",
    tech: ["React", "Node.js", "MongoDB", "GraphQL"],
    github: "#",
    live: "#",
    gradient: "from-accent/20 via-primary/20 to-accent/15",
  },
];

const TiltCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative glass rounded-2xl overflow-hidden border border-border cursor-pointer group"
      >
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary) / 0.4), transparent 60%)`
            ),
          }}
        />

        {/* Gradient header with 3D depth */}
        <div
          className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-black text-foreground/5 select-none">
              {project.title.split(" ")[0]}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />

          {/* Floating orbs */}
          <motion.div
            animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 blur-sm"
          />
          <motion.div
            animate={{ y: [0, 6, 0], x: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-8 left-6 w-5 h-5 rounded-full bg-accent/20 blur-sm"
          />
        </div>

        {/* Content */}
        <div className="p-6 relative" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-secondary-foreground font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={project.github}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={14} /> Source
            </a>
            <a
              href={project.live}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          </div>
        </div>

        {/* Bottom glow on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    </motion.div>
  );
};

const ProjectShowcase3D = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section id="showcase" className="section-padding relative" ref={sectionRef}>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[160px]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            3D Showcase
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Immersive <span className="gradient-text">projects.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Hover over the cards to experience the depth. Each project is crafted
            with precision and passion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <TiltCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase3D;
