import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

const filters = ["All", "Frontend", "Backend", "Full Stack", "AI", "Tools"] as const;

const projects = [
  {
    title: "EllowDigital Platform",
    description: "A comprehensive digital solutions platform offering modern software development services and tools.",
    tech: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    category: "Full Stack",
    github: "#",
    live: "#",
  },
  {
    title: "AI Content Generator",
    description: "An intelligent content generation tool powered by machine learning and natural language processing.",
    tech: ["Python", "React", "OpenAI", "FastAPI"],
    category: "AI",
    github: "#",
    live: "#",
  },
  {
    title: "DevDash Dashboard",
    description: "A real-time developer dashboard for monitoring project metrics, CI/CD pipelines, and team productivity.",
    tech: ["React", "TypeScript", "D3.js", "Firebase"],
    category: "Frontend",
    github: "#",
    live: "#",
  },
  {
    title: "API Gateway Service",
    description: "A scalable API gateway service with rate limiting, authentication, and request routing capabilities.",
    tech: ["Node.js", "Express", "Redis", "Docker"],
    category: "Backend",
    github: "#",
    live: "#",
  },
  {
    title: "CodeSnap CLI",
    description: "A developer CLI tool for generating beautiful code screenshots and sharing snippets with ease.",
    tech: ["TypeScript", "Node.js", "Sharp"],
    category: "Tools",
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio CMS",
    description: "A headless CMS designed specifically for developer portfolios with markdown support and Git integration.",
    tech: ["React", "Node.js", "MongoDB", "GraphQL"],
    category: "Full Stack",
    github: "#",
    live: "#",
  },
];

const ProjectsSection = () => {
  const [active, setActive] = useState<typeof filters[number]>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Featured <span className="gradient-text">work.</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === f
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              layout
              className="glass rounded-2xl p-6 hover-lift group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono text-primary px-2.5 py-1 rounded-full bg-primary/10">
                  {project.category}
                </span>
                <div className="flex gap-2">
                  <a href={project.github} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                    <Github size={16} />
                  </a>
                  <a href={project.live} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Live demo">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <a
                  href={project.live}
                  className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  View Project <ChevronRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
