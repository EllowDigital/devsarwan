import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, X, Tag, BookOpen } from "lucide-react";
import ParallaxOrb from "./ParallaxOrb";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  gradient: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable APIs with Node.js & Express",
    excerpt:
      "A deep dive into structuring production-ready REST APIs with proper error handling, middleware patterns, and database integration.",
    content:
      "When building APIs at scale, architecture matters more than speed of delivery. In this article, I walk through my approach to building Node.js APIs that serve thousands of requests per second — from project structure and middleware chains to database connection pooling and graceful error handling. Key takeaways include using repository patterns, implementing rate limiting, and setting up comprehensive logging with structured output.",
    date: "2025-12-15",
    readTime: "8 min",
    tags: ["Node.js", "API", "Backend"],
    category: "Backend",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    id: 2,
    title: "React Performance: Beyond React.memo",
    excerpt:
      "Advanced techniques for optimizing React apps — virtualization, code splitting, and state management patterns that actually work.",
    content:
      "React.memo is just the beginning. In this piece, I explore advanced performance optimization strategies including windowed rendering with react-window, strategic code splitting at the route and component level, state colocation, and the often-overlooked benefits of using refs for values that don't need to trigger re-renders. I also cover profiling tools and how to read flame charts effectively to identify real bottlenecks.",
    date: "2025-11-28",
    readTime: "12 min",
    tags: ["React", "Performance", "Frontend"],
    category: "Frontend",
    gradient: "from-accent/20 to-primary/10",
  },
  {
    id: 3,
    title: "Why I Founded EllowDigital",
    excerpt:
      "The story behind starting a digital solutions company — from writing my first line of code to building products that matter.",
    content:
      "Every founder has a moment where curiosity becomes conviction. For me, it was realizing that the gap between great ideas and great software wasn't talent — it was execution. EllowDigital was born from a simple belief: technology should empower, not complicate. In this article, I share the journey from solo developer to founding a company, the lessons learned, the mistakes made, and the vision that keeps driving us forward.",
    date: "2025-10-10",
    readTime: "6 min",
    tags: ["Startup", "EllowDigital", "Story"],
    category: "Personal",
    gradient: "from-primary/15 to-primary/5",
  },
  {
    id: 4,
    title: "Database Design Patterns for Modern Apps",
    excerpt:
      "From schema design to indexing strategies — how to build databases that scale with your application.",
    content:
      "Good database design is invisible when done right and catastrophic when done wrong. This article covers essential patterns I use in every project: proper normalization vs. strategic denormalization, index design for read-heavy vs. write-heavy workloads, connection pooling strategies, and migration workflows that won't break production. I also share my thoughts on when to use SQL vs. NoSQL and the hybrid approaches that work best.",
    date: "2025-09-22",
    readTime: "10 min",
    tags: ["Database", "SQL", "Architecture"],
    category: "Backend",
    gradient: "from-accent/15 to-accent/5",
  },
  {
    id: 5,
    title: "The Art of Developer Experience",
    excerpt:
      "How thoughtful tooling, documentation, and API design create products developers actually want to use.",
    content:
      "Developer experience (DX) isn't a nice-to-have — it's a competitive advantage. In this article, I explore what makes great DX: intuitive API design, comprehensive yet concise documentation, meaningful error messages, and developer tooling that gets out of the way. Drawing from my experience building developer-facing products at EllowDigital, I share practical principles for creating tools that developers love.",
    date: "2025-08-14",
    readTime: "7 min",
    tags: ["DX", "Tooling", "Product"],
    category: "Personal",
    gradient: "from-primary/20 to-accent/15",
  },
  {
    id: 6,
    title: "Deploying with Docker: A Practical Guide",
    excerpt:
      "Container orchestration demystified — from Dockerfile best practices to production deployment strategies.",
    content:
      "Docker changed how we deploy software, but many developers still treat it as a black box. This guide covers everything from writing efficient multi-stage Dockerfiles to container networking, volume management, and deploying with Docker Compose for development and production. I also cover common pitfalls like image bloat, security considerations, and monitoring containerized applications.",
    date: "2025-07-30",
    readTime: "9 min",
    tags: ["Docker", "DevOps", "Deployment"],
    category: "DevOps",
    gradient: "from-accent/20 to-primary/10",
  },
];

const categories = ["All", "Frontend", "Backend", "Personal", "DevOps"] as const;

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filtered =
    activeCategory === "All" ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <section id="blog" className="section-padding relative">
      <ParallaxOrb color="accent" size="lg" speed={-0.3} position={{ top: "10%", right: "0%" }} />
      <ParallaxOrb
        color="primary"
        size="md"
        speed={0.25}
        position={{ bottom: "10%", left: "5%" }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Blog</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Thoughts & <span className="gradient-text">writing.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Articles on development, architecture, and building products that matter.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground glow-primary scale-105"
                  : "glass text-muted-foreground hover:text-foreground hover:scale-105"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              onClick={() => setSelectedPost(post)}
              className="group glass rounded-2xl overflow-hidden hover-lift cursor-pointer"
            >
              <div className={`h-28 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-foreground/10" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs font-mono px-2 py-1 rounded-full bg-background/60 backdrop-blur-sm text-foreground/80">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />{" "}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read article <ArrowRight size={12} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.article
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-border shadow-2xl relative max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors z-10"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono font-medium">
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />{" "}
                  {new Date(selectedPost.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {selectedPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 leading-tight">
                {selectedPost.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full glass gradient-border font-medium flex items-center gap-1"
                  >
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {selectedPost.content}
                </p>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
