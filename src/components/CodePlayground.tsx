import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ChevronRight } from "lucide-react";

const SNIPPETS = [
  {
    title: "React Component",
    language: "tsx",
    filename: "ProfileCard.tsx",
    code: `import { motion } from "framer-motion";

interface ProfileProps {
  name: string;
  role: string;
  avatar: string;
}

export const ProfileCard = ({ name, role, avatar }: ProfileProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass rounded-2xl p-6 flex items-center gap-4"
    >
      <img src={avatar} alt={name} className="w-14 h-14 rounded-full" />
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-muted-foreground text-sm">{role}</p>
      </div>
    </motion.div>
  );
};`,
  },
  {
    title: "API Route",
    language: "ts",
    filename: "api/users.ts",
    code: `import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/database";

const router = Router();

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["admin", "user", "developer"]),
});

router.get("/users", async (req, res) => {
  const users = await db.query("SELECT * FROM users ORDER BY created_at DESC");
  res.json({ data: users.rows, count: users.rowCount });
});

router.post("/users", async (req, res) => {
  const validated = UserSchema.parse(req.body);
  const result = await db.query(
    "INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *",
    [validated.name, validated.email, validated.role]
  );
  res.status(201).json({ data: result.rows[0] });
});

export default router;`,
  },
  {
    title: "Database Query",
    language: "sql",
    filename: "migrations/001_schema.sql",
    code: `-- Create the users table with proper constraints
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index for faster email lookups
CREATE INDEX idx_users_email ON users(email);

-- Create a function to auto-update timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger
CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();`,
  },
];

// Simple syntax highlighting with semantic tokens
const highlightCode = (code: string, lang: string): string => {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments
  html = html.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|--.*$)/gm, '<span class="text-muted-foreground/60">$1</span>');
  // Strings
  html = html.replace(/(&quot;.*?&quot;|'.*?'|`[^`]*`|"[^"]*")/g, '<span style="color: hsl(var(--accent))">$1</span>');
  // Keywords
  html = html.replace(/\b(import|export|from|const|let|var|function|return|async|await|interface|type|enum|class|extends|implements|new|if|else|for|while|default|CREATE|TABLE|PRIMARY|KEY|DEFAULT|NOT|NULL|UNIQUE|INDEX|ON|INSERT|INTO|VALUES|SELECT|FROM|WHERE|ORDER|BY|DESC|RETURNING|TRIGGER|BEFORE|UPDATE|FOR|EACH|ROW|EXECUTE|FUNCTION|RETURNS|BEGIN|END|AS|LANGUAGE|OR|REPLACE)\b/g, '<span style="color: hsl(var(--primary))">$1</span>');
  // Types
  html = html.replace(/\b(string|number|boolean|void|any|UUID|VARCHAR|TEXT|TIMESTAMPTZ|INTEGER|BOOLEAN)\b/g, '<span style="color: hsl(var(--accent))">$1</span>');

  return html;
};

const CodePlayground = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(SNIPPETS[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeTab]);

  return (
    <section className="section-padding relative" id="playground">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[160px]" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            Code Playground
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            How I <span className="gradient-text">build.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Example code snippets showcasing my development approach — clean, typed, and production-ready.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden glass border border-border shadow-2xl"
        >
          {/* VS Code-style header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {SNIPPETS[activeTab].filename}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary"
            >
              {copied ? <Check size={12} className="text-primary" /> : <Copy size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-border bg-secondary/30 scrollbar-none">
            {SNIPPETS.map((snippet, i) => (
              <button
                key={snippet.title}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-medium transition-all border-b-2 whitespace-nowrap ${
                  i === activeTab
                    ? "border-primary text-foreground bg-background/50"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <ChevronRight size={10} className={i === activeTab ? "text-primary" : ""} />
                {snippet.title}
              </button>
            ))}
          </div>

          {/* Code area */}
          <div className="bg-background/50 overflow-x-auto">
            <pre className="p-4 sm:p-6 text-[11px] sm:text-sm font-mono leading-relaxed">
              <code
                dangerouslySetInnerHTML={{
                  __html: highlightCode(SNIPPETS[activeTab].code, SNIPPETS[activeTab].language),
                }}
              />
            </pre>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-border bg-secondary/30 text-[10px] font-mono text-muted-foreground">
            <span>{SNIPPETS[activeTab].language.toUpperCase()}</span>
            <span>{SNIPPETS[activeTab].code.split("\n").length} lines</span>
            <span>UTF-8</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodePlayground;
