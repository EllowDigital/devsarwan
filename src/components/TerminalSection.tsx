import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help         — Show available commands
  about        — About Sarwan
  skills       — Programming skills & technologies
  projects     — Featured projects
  ellowdigital — About EllowDigital
  contact      — Contact information & socials
  clear        — Clear the terminal`,
  about: `👋 Hi, I'm Sarwan — Full Stack Developer & Founder of EllowDigital.

I build powerful digital experiences using modern technologies.
Passionate about clean code, scalable architecture, and innovative software.
Coding since 2022 — turning ideas into production-ready products.`,
  skills: `🛠  Technical Skills
─────────────────────────────────
Frontend   │ React, TypeScript, TailwindCSS, Next.js
Backend    │ Node.js, Python, Express, FastAPI
Database   │ PostgreSQL, MongoDB, Firebase, Redis
Tools      │ Git, Docker, VS Code, Linux
Other      │ REST APIs, GraphQL, CI/CD, AWS`,
  projects: `📁 Featured Projects
─────────────────────────────────
1. EllowDigital Platform  — Full-stack digital solutions platform
2. AI Content Generator   — ML-powered content creation tool
3. DevDash Dashboard      — Real-time developer metrics dashboard
4. API Gateway Service    — Scalable API gateway with auth & rate limiting
5. CodeSnap CLI           — Beautiful code screenshot generator
6. Portfolio CMS          — Headless CMS for developer portfolios

Type a project number for details, e.g. "project 1"`,
  ellowdigital: `🏢 EllowDigital
─────────────────────────────────
Founded    │ June 26, 2024
Founder    │ Sarwan
Mission    │ Building innovative digital products
Focus      │ Modern software development & technology solutions
Website    │ ellowdigital.com

"Empowering ideas through cutting-edge technology."`,
  contact: `📬 Get in Touch
─────────────────────────────────
Email      │ hello@sarwan.dev
GitHub     │ github.com/devsarwan
LinkedIn   │ linkedin.com/in/sarwan
Twitter    │ twitter.com/sarwan

Let's build something amazing together! 🚀`,
};

const SUGGESTIONS = Object.keys(COMMANDS);

const WELCOME = `Welcome to Sarwan's Developer Terminal v2.0
Type "help" to see available commands.
──────────────────────────────────────────`;

interface TerminalLine {
  type: "input" | "output" | "system";
  content: string;
}

const TerminalSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [lines, setLines] = useState<TerminalLine[]>([{ type: "system", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [autoTypeDone, setAutoTypeDone] = useState(false);

  // Auto-type "help" on first view
  useEffect(() => {
    if (!isInView || autoTypeDone) return;
    setIsAutoTyping(true);
    const cmd = "help";
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setInput(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(timer);
        setTimeout(() => {
          executeCommand(cmd);
          setInput("");
          setIsAutoTyping(false);
          setAutoTypeDone(true);
        }, 400);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [isInView]);

  // Scroll to bottom on new lines
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Update suggestion
  useEffect(() => {
    if (!input.trim()) {
      setSuggestion("");
      return;
    }
    const match = SUGGESTIONS.find(
      (s) => s.startsWith(input.toLowerCase()) && s !== input.toLowerCase()
    );
    setSuggestion(match || "");
  }, [input]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines: TerminalLine[] = [...lines, { type: "input", content: cmd.trim() }];

      if (trimmed === "clear") {
        setLines([{ type: "system", content: WELCOME }]);
        return;
      }

      const output = COMMANDS[trimmed];
      if (output) {
        newLines.push({ type: "output", content: output });
      } else if (trimmed === "") {
        // do nothing
      } else {
        newLines.push({
          type: "output",
          content: `Command not found: ${cmd.trim()}\nType "help" to see available commands.`,
        });
      }
      setLines(newLines);
    },
    [lines]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAutoTyping) return;
    const cmd = input;
    executeCommand(cmd);
    if (cmd.trim()) setHistory((h) => [cmd.trim(), ...h]);
    setHistoryIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(suggestion);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const next = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(next);
        setInput(history[next]);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const next = historyIdx - 1;
        setHistoryIdx(next);
        setInput(history[next]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <section className="section-padding relative" ref={ref} id="terminal">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            Interactive Terminal
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Explore my <span className="gradient-text">profile.</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">
            Type commands to discover more about me. Try{" "}
            <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">help</code>{" "}
            to get started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden glass border border-border shadow-2xl"
          onClick={focusInput}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-primary/40" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
            <span className="ml-3 text-xs font-mono text-muted-foreground">
              sarwan@dev — interactive terminal
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="p-4 sm:p-5 md:p-6 font-mono text-xs sm:text-sm min-h-[300px] sm:min-h-[400px] max-h-[500px] overflow-y-auto bg-background/50 cursor-text"
          >
            {lines.map((line, i) => (
              <div key={i} className="mb-1.5">
                {line.type === "input" && (
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-primary shrink-0">sarwan@dev:~$</span>
                    <span className="text-foreground">{line.content}</span>
                  </div>
                )}
                {line.type === "output" && (
                  <pre className="text-muted-foreground text-xs whitespace-pre-wrap leading-relaxed pl-0">
                    {line.content}
                  </pre>
                )}
                {line.type === "system" && (
                  <pre className="text-primary/70 text-xs whitespace-pre-wrap leading-relaxed">
                    {line.content}
                  </pre>
                )}
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex gap-2 items-center relative">
              <span className="text-primary shrink-0">sarwan@dev:~$</span>
              <div className="relative flex-1">
                {suggestion && (
                  <span className="absolute top-0 left-0 text-muted-foreground/30 pointer-events-none select-none">
                    {suggestion}
                  </span>
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none text-foreground w-full caret-primary"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  disabled={isAutoTyping}
                />
              </div>
            </form>

            {/* Suggestion chips */}
            {!isAutoTyping && !input && (
              <div className="flex flex-wrap gap-1.5 mt-4 opacity-50">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setInput(s);
                      inputRef.current?.focus();
                    }}
                    className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
