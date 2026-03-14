import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github, Star, GitFork, Loader2 } from "lucide-react";

interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  gradient: string;
  stars: number;
  forks: number;
}

const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    title: "EllowDigital Platform",
    description:
      "A comprehensive digital solutions platform offering modern software development services.",
    tech: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com/EllowDigital",
    live: "#",
    gradient: "from-primary/30 via-accent/20 to-primary/10",
    stars: 0,
    forks: 0,
  },
];

const GRADIENT_POOL = [
  "from-primary/30 via-accent/20 to-primary/10",
  "from-accent/30 via-primary/20 to-accent/10",
  "from-primary/25 via-primary/15 to-accent/10",
  "from-accent/25 via-accent/15 to-primary/10",
  "from-primary/20 via-accent/20 to-primary/15",
  "from-accent/20 via-primary/20 to-accent/15",
];

const TiltCard = ({ project, index }: { project: ProjectItem; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });
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

        <div className="p-6 relative" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex gap-3 items-center text-xs text-muted-foreground">
              {project.stars > 0 && (
                <span className="flex items-center gap-1">
                  <Star size={12} /> {project.stars}
                </span>
              )}
              {project.forks > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {project.forks}
                </span>
              )}
            </div>
          </div>
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
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={14} /> Source
            </a>
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        </div>

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
  const [projects, setProjects] = useState<ProjectItem[]>(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const [userRes, orgRes] = await Promise.all([
        fetch("https://api.github.com/users/devsarwan/repos?per_page=10&sort=stars"),
        fetch("https://api.github.com/orgs/EllowDigital/repos?per_page=10&sort=stars"),
      ]);

      const userRepos = userRes.ok ? await userRes.json() : [];
      const orgRepos = orgRes.ok ? await orgRes.json() : [];
      const allRepos = [...orgRepos, ...userRepos];

      const seen = new Set<number>();
      const unique = allRepos.filter((r: any) => {
        if (seen.has(r.id)) return false;
        seen.add(r.id);
        return true;
      });

      const mapped: ProjectItem[] = unique.slice(0, 6).map((repo: any, i: number) => ({
        title: repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
        description: repo.description || `A ${repo.language || "code"} project.`,
        tech: [repo.language, ...(repo.topics?.slice(0, 2) || [])].filter(Boolean),
        github: repo.html_url,
        live: repo.homepage || "#",
        gradient: GRADIENT_POOL[i % GRADIENT_POOL.length],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }));

      if (mapped.length) setProjects(mapped);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
            Hover over the cards to experience the depth. Each project is crafted with precision and
            passion.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-3 text-sm text-muted-foreground">Loading projects...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <TiltCard key={project.title} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectShowcase3D;
