import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Mail, FileDown } from "lucide-react";

const FloatingCode = ({ className, children, delay = 0 }: { className?: string; children: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 1 }}
    className={`absolute glass rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground select-none pointer-events-none ${className}`}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      {/* Floating code snippets */}
      <FloatingCode className="top-[20%] left-[8%] hidden lg:block animate-float" delay={0.5}>
        {"const build = () => { }"}
      </FloatingCode>
      <FloatingCode className="top-[30%] right-[10%] hidden lg:block animate-float-delayed" delay={0.8}>
        {"<FullStack />"}
      </FloatingCode>
      <FloatingCode className="bottom-[25%] left-[12%] hidden lg:block animate-float-delayed" delay={1.1}>
        {"npm run deploy"}
      </FloatingCode>
      <FloatingCode className="bottom-[20%] right-[8%] hidden lg:block animate-float" delay={1.4}>
        {"git push origin main"}
      </FloatingCode>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-6">
            Full Stack Developer & Founder
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
        >
          <span className="gradient-text">Sarwan</span>
          <br />
          <span className="text-foreground">Full Stack</span>
          <br />
          <span className="text-foreground">Developer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Building powerful digital experiences and innovative software solutions.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-3 text-sm font-medium text-primary"
        >
          Founder of EllowDigital
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity glow-primary"
          >
            <ExternalLink size={16} /> View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass gradient-border font-medium text-sm hover-lift"
          >
            <Mail size={16} /> Contact Me
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass font-medium text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileDown size={16} /> Download Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
