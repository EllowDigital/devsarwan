import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ChevronRight, X, Loader2, Star, GitFork } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  topics: string[];
  owner: { login: string; avatar_url: string };
}

interface ProjectItem {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: string;
  github: string;
  live: string;
  color: string;
  stars: number;
  forks: number;
  isCustom?: boolean;
}

const CUSTOM_PROJECTS: ProjectItem[] = [
  {
    title: "AI Content Generator",
    description: "An intelligent content generation tool powered by machine learning and NLP.",
    longDescription: "This AI-powered tool uses natural language processing to generate high-quality content. Supports multiple formats including blog posts, product descriptions, and social media content.",
    tech: ["Python", "React", "OpenAI", "FastAPI"],
    category: "AI",
    github: "#",
    live: "#",
    color: "from-accent/20 to-primary/20",
    stars: 0,
    forks: 0,
    isCustom: true,
  },
  {
    title: "DevDash Dashboard",
    description: "A real-time developer dashboard for monitoring project metrics and team productivity.",
    longDescription: "DevDash provides real-time insights into development workflows. Track CI/CD pipelines, code quality metrics, and team velocity all in one beautiful interface.",
    tech: ["React", "TypeScript", "D3.js", "Firebase"],
    category: "Frontend",
    github: "#",
    live: "#",
    color: "from-primary/20 to-primary/10",
    stars: 0,
    forks: 0,
    isCustom: true,
  },
];

const LANG_CATEGORY: Record<string, string> = {
  TypeScript: "Frontend",
  JavaScript: "Frontend",
  HTML: "Frontend",
  CSS: "Frontend",
  Python: "Backend",
  Java: "Backend",
  Go: "Backend",
  Rust: "Backend",
  Shell: "Tools",
  Dockerfile: "Tools",
};

const GRADIENT_POOL = [
  "from-primary/20 to-accent/20",
  "from-accent/20 to-primary/20",
  "from-primary/20 to-primary/10",
  "from-accent/20 to-accent/10",
  "from-primary/15 to-accent/15",
  "from-accent/15 to-primary/15",
];

const filters = ["All", "Frontend", "Backend", "Full Stack", "AI", "Tools"] as const;

const ProjectsSection = () => {
  const [active, setActive] = useState<typeof filters[number]>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const [userRes, orgRes] = await Promise.all([
        fetch("https://api.github.com/users/devsarwan/repos?per_page=30&sort=updated"),
        fetch("https://api.github.com/orgs/EllowDigital/repos?per_page=30&sort=updated"),
      ]);

      const userRepos: GitHubRepo[] = userRes.ok ? await userRes.json() : [];
      const orgRepos: GitHubRepo[] = orgRes.ok ? await orgRes.json() : [];

      const allRepos = [...orgRepos, ...userRepos];
      // Deduplicate by id
      const seen = new Set<number>();
      const unique = allRepos.filter((r) => {
        if (seen.has(r.id)) return false;
        seen.add(r.id);
        return true;
      });

      const mapped: ProjectItem[] = unique.slice(0, 12).map((repo, i) => {
        const lang = repo.language || "Other";
        let category = LANG_CATEGORY[lang] || "Full Stack";
        if (repo.topics?.some((t) => t.includes("fullstack") || t.includes("full-stack"))) category = "Full Stack";
        if (repo.topics?.some((t) => t.includes("ai") || t.includes("ml"))) category = "AI";

        return {
          title: repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          description: repo.description || `A ${lang} project by ${repo.owner.login}.`,
          longDescription: repo.description || `This project is built with ${lang} and maintained by ${repo.owner.login}. Check the GitHub repository for more details.`,
          tech: [lang, ...(repo.topics?.slice(0, 3) || [])].filter(Boolean),
          category,
          github: repo.html_url,
          live: repo.homepage || "#",
          color: GRADIENT_POOL[i % GRADIENT_POOL.length],
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        };
      });

      setProjects([...mapped, ...CUSTOM_PROJECTS]);
    } catch {
      setProjects(CUSTOM_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    if (!sectionRef.current || loading) return;
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
  }, [active, loading, projects]);

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
          <p className="text-muted-foreground mt-3 text-sm">
            Real projects fetched live from GitHub — <span className="text-primary font-medium">devsarwan</span> & <span className="text-primary font-medium">EllowDigital</span>
          </p>
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground text-sm">Fetching projects from GitHub...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div
                key={project.title}
                className="project-card glass rounded-2xl overflow-hidden hover-lift group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
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
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No projects in this category yet.</p>
        )}
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-medium text-sm hover:scale-105 transition-transform"
                >
                  <Github size={15} /> GitHub
                </a>
                {selectedProject.live && selectedProject.live !== "#" && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:scale-105 transition-transform glow-primary"
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
