import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const commands = [
  { prompt: "sarwan@dev:~$", cmd: "whoami", output: "Sarwan — Full Stack Developer & Founder" },
  { prompt: "sarwan@dev:~$", cmd: "cat skills.json", output: '{\n  "frontend": ["React", "TypeScript", "TailwindCSS"],\n  "backend": ["Node.js", "Python", "Express"],\n  "database": ["PostgreSQL", "MongoDB", "Firebase"],\n  "tools": ["Git", "Docker", "VS Code"]\n}' },
  { prompt: "sarwan@dev:~$", cmd: "ls projects/", output: "ellowdigital/  ai-content-gen/  devdash/  api-gateway/  codesnap-cli/" },
  { prompt: "sarwan@dev:~$", cmd: "echo $MISSION", output: '"Building powerful digital experiences that make a difference."' },
  { prompt: "sarwan@dev:~$", cmd: "git log --oneline -3", output: "a1b2c3d feat: launch EllowDigital platform\ne4f5g6h refactor: optimize API gateway\ni7j8k9l fix: improve dashboard performance" },
  { prompt: "sarwan@dev:~$", cmd: "uptime", output: "Coding since 2022 — still going strong 🚀" },
];

const TerminalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [phase, setPhase] = useState<"typing" | "output" | "done">("typing");

  useEffect(() => {
    if (!isInView) return;

    if (visibleLines >= commands.length) return;

    const cmd = commands[visibleLines];

    if (phase === "typing") {
      if (typingIndex < cmd.cmd.length) {
        const timer = setTimeout(() => {
          setCurrentText(cmd.cmd.slice(0, typingIndex + 1));
          setTypingIndex(typingIndex + 1);
        }, 35 + Math.random() * 45);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setShowOutput(true);
          setPhase("output");
        }, 300);
        return () => clearTimeout(timer);
      }
    }

    if (phase === "output") {
      const timer = setTimeout(() => {
        setVisibleLines(visibleLines + 1);
        setTypingIndex(0);
        setCurrentText("");
        setShowOutput(false);
        setPhase("typing");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, visibleLines, typingIndex, phase]);

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Terminal</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Behind the <span className="gradient-text">screen.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden glass border border-border shadow-2xl"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-primary/40" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
            <span className="ml-3 text-xs font-mono text-muted-foreground">sarwan@dev — zsh</span>
          </div>

          {/* Terminal body */}
          <div className="p-5 md:p-6 font-mono text-sm space-y-3 min-h-[360px] bg-background/50">
            {/* Completed lines */}
            {commands.slice(0, visibleLines).map((cmd, i) => (
              <div key={i}>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-primary shrink-0">{cmd.prompt}</span>
                  <span className="text-foreground">{cmd.cmd}</span>
                </div>
                <pre className="text-muted-foreground text-xs mt-1 ml-0 whitespace-pre-wrap leading-relaxed">{cmd.output}</pre>
              </div>
            ))}

            {/* Currently typing line */}
            {visibleLines < commands.length && (
              <div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-primary shrink-0">{commands[visibleLines].prompt}</span>
                  <span className="text-foreground">
                    {currentText}
                    <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-glow-pulse align-middle" />
                  </span>
                </div>
                {showOutput && (
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground text-xs mt-1 ml-0 whitespace-pre-wrap leading-relaxed"
                  >
                    {commands[visibleLines].output}
                  </motion.pre>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
