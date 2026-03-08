import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ChevronRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "Frontend", "Backend", "Full Stack", "AI", "Tools"] as const;

const projects = [
  {
    title: "EllowDigital Platform",
    description: "A comprehensive digital solutions platform offering modern software development services and tools.",
    longDescription: "EllowDigital is the flagship product — a platform built from the ground up to deliver cutting-edge software solutions. It features a modern dashboard, project management tools, and seamless client collaboration.",
    tech: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    category: "Full Stack",
    github: "#",
    live: "#",
    color: "from-primary/20 to-accent/20",
  },
  {
    title: "AI Content Generator",
    description: "An intelligent content generation tool powered by machine learning and NLP.",
    longDescription: "This AI-powered tool uses natural language processing to generate high-quality content. It supports multiple formats and can be fine-tuned for specific use cases including blog posts, product descriptions, and social media content.",
    tech: ["Python", "React", "OpenAI", "FastAPI"],
    category: "AI",
    github: "#",
    live: "#",
    color: "from-accent/20 to-primary/20",
  },
  {
    title: "DevDash Dashboard",
    description: "A real-time developer dashboard for monitoring project metrics and team productivity.",
    longDescription: "DevDash provides real-time insights into development workflows. Track CI/CD pipelines, code quality metrics, and team velocity all in one beautiful interface with customizable widgets.",
    tech: ["React", "TypeScript", "D3.js", "Firebase"],
    category: "Frontend",
    github: "#",
    live: "#",
    color: "from-primary/20 to-primary/10",
  },
  {
    title: "API Gateway Service",
    description: "A scalable API gateway with rate limiting, auth, and request routing.",
    longDescription: "Enterprise-grade API gateway handling millions of requests. Features include intelligent rate limiting, JWT authentication, request transformation, and comprehensive analytics dashboards.",
    tech: ["Node.js", "Express", "Redis", "Docker"],
    category: "Backend",
    github: "#",
    live: "#",
    color: "from-accent/20 to-accent/10",
  },
  {
    title: "CodeSnap CLI",
    description: "A developer CLI tool for generating beautiful code screenshots.",
    longDescription: "CodeSnap makes sharing code snippets beautiful. Supports 50+ themes, custom fonts, and multiple export formats. Used by thousands of developers for documentation and social sharing.",
    tech: ["TypeScript", "Node.js", "Sharp"],
    category: "Tools",
    github: "#",
    live: "#",
    color: "from-primary/15 to-accent/15",
  },
  {
    title: "Portfolio CMS",
    description: "A headless CMS designed for developer portfolios with markdown and Git.",
    longDescription: "A purpose-built CMS that speaks developer. Write in Markdown, version control with Git, deploy anywhere. Features include custom themes, analytics, and SEO optimization out of the box.",
    tech: ["React", "Node.js", "MongoDB", "GraphQL"],
    category: "Full Stack",
    github: "#",
    live: "#",
    color: "from-accent/15 to-primary/15",
  },
];

const ProjectsSection = () => {
  const [active, setActive] = useState<typeof filters[number]>("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".project-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [active]);

  return (
    <section id="projects" className="section-padding relative" ref={sectionRef}>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Projects</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Featured <span className="gradient-text">work.</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === f
                  ? "bg-primary text-primary-foreground glow-primary scale-105"
                  : "glass text-muted-foreground hover:text-foreground hover:scale-105"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.title}
              className="project-card glass rounded-2xl overflow-hidden hover-lift group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Gradient header */}
              <div className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-3xl font-black text-foreground/10 select-none">
                  {project.title.split(" ")[0]}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-mono text-primary px-2.5 py-1 rounded-full bg-primary/10">
                    {project.category}
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={15} />
                    </a>
                    <a
                      href={project.live}
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-border">
                  <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass rounded-2xl p-8 max-w-lg w-full border border-border shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X size={18} />
              </button>

              <span className="text-xs font-mono text-primary px-2.5 py-1 rounded-full bg-primary/10">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-black mt-4 mb-3">{selectedProject.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedProject.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full glass gradient-border font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={selectedProject.github}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-medium text-sm hover:scale-105 transition-transform"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href={selectedProject.live}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:scale-105 transition-transform glow-primary"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
