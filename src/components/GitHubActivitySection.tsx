import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, GitCommit, Code2, Star, Folder, Activity } from "lucide-react";

// Simulated contribution data (52 weeks × 7 days)
const generateContributions = () => {
  const data: number[] = [];
  for (let i = 0; i < 364; i++) {
    const r = Math.random();
    if (r < 0.15) data.push(0);
    else if (r < 0.4) data.push(1);
    else if (r < 0.65) data.push(2);
    else if (r < 0.85) data.push(3);
    else data.push(4);
  }
  return data;
};

const LEVEL_COLORS = [
  "bg-secondary",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/65",
  "bg-primary",
];

const stats = [
  { icon: Folder, label: "Repositories", value: 42 },
  { icon: GitCommit, label: "Total Commits", value: 1847 },
  { icon: Star, label: "Stars Earned", value: 156 },
  { icon: GitBranch, label: "Contributions", value: 2340 },
];

const languages = [
  { name: "TypeScript", pct: 35, color: "bg-primary" },
  { name: "Python", pct: 25, color: "bg-accent" },
  { name: "JavaScript", pct: 20, color: "bg-primary/60" },
  { name: "HTML/CSS", pct: 12, color: "bg-accent/60" },
  { name: "Other", pct: 8, color: "bg-muted-foreground/40" },
];

const recentCommits = [
  { repo: "ellowdigital/platform", msg: "feat: launch new dashboard UI", time: "2 hours ago" },
  { repo: "sarwan/portfolio", msg: "refactor: optimize scroll animations", time: "5 hours ago" },
  { repo: "ellowdigital/api", msg: "fix: improve rate limiting logic", time: "1 day ago" },
  { repo: "sarwan/codesnap-cli", msg: "feat: add 10 new themes", time: "2 days ago" },
  { repo: "ellowdigital/docs", msg: "docs: update API reference", time: "3 days ago" },
];

const AnimatedCounter = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const counterRef = useRef<HTMLSpanElement>(null);

  useMemo(() => {
    if (!isInView || !counterRef.current) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const startTime = performance.now() + delay;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      if (counterRef.current) counterRef.current.textContent = start.toLocaleString();
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, delay]);

  return (
    <span ref={(el) => { (ref as any).current = el; counterRef.current = el; }}>
      0
    </span>
  );
};

const GitHubActivitySection = () => {
  const sectionRef = useRef(null);
  const contributions = useMemo(generateContributions, []);

  // Split into weeks of 7
  const weeks: number[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section id="github" className="section-padding relative" ref={sectionRef}>
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[180px]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            GitHub Activity
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Code in <span className="gradient-text">motion.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A snapshot of my development activity — consistent commits, diverse
            technologies, and continuous growth.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover-lift"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <div className="text-3xl font-black mb-1">
                <AnimatedCounter value={stat.value} delay={i * 150} />
              </div>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">Contribution Activity</h3>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-[3px] min-w-[700px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => (
                    <motion.div
                      key={di}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (wi * 7 + di) * 0.0008 }}
                      className={`w-[13px] h-[13px] rounded-[3px] ${LEVEL_COLORS[level]} transition-transform hover:scale-150`}
                      title={`${level} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 justify-end text-xs text-muted-foreground">
            <span>Less</span>
            {LEVEL_COLORS.map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-[2px] ${c}`} />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Language Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">Languages</h3>
            </div>

            {/* Stacked bar */}
            <div className="flex rounded-full overflow-hidden h-4 mb-6">
              {languages.map((lang) => (
                <motion.div
                  key={lang.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`${lang.color} first:rounded-l-full last:rounded-r-full`}
                />
              ))}
            </div>

            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${lang.color}`} />
                    <span className="text-sm font-medium">{lang.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{lang.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Commits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <GitCommit className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">Recent Commits</h3>
            </div>

            <div className="space-y-4">
              {recentCommits.map((commit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3 group"
                >
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform" />
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-primary/70 mb-0.5 truncate">
                      {commit.repo}
                    </p>
                    <p className="text-sm font-medium truncate">{commit.msg}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{commit.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivitySection;
