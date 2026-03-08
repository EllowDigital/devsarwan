import { useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ExternalLink, Mail, FileDown } from "lucide-react";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Particle background
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "255,255,255" : "0,0,0";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.o})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color}, ${0.03 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP character entrance
  useEffect(() => {
    if (!headlineRef.current) return;
    const chars = headlineRef.current.querySelectorAll(".hero-char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 80, rotateX: 90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.03,
        ease: "power4.out",
        delay: 0.3,
      }
    );
  }, []);

  const splitText = useCallback((text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="hero-char inline-block" style={{ perspective: "600px" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas ref={particlesRef} className="absolute inset-0 z-0" />

      {/* Parallax gradient orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[150px] animate-float"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[140px] animate-float-delayed"
        />
      </div>

      {/* Floating code fragments with parallax */}
      {[
        { text: "const build = () => { }", top: "18%", left: "6%", delay: 0.5 },
        { text: "<FullStack />", top: "28%", right: "8%", delay: 0.8 },
        { text: "npm run deploy", bottom: "28%", left: "10%", delay: 1.1 },
        { text: "git push origin main", bottom: "18%", right: "6%", delay: 1.4 },
        { text: "async () => await magic()", top: "45%", left: "3%", delay: 1.7 },
        { text: "export default Sarwan", top: "55%", right: "4%", delay: 2.0 },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: item.delay, duration: 1.2 }}
          className={`absolute glass rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground select-none pointer-events-none hidden lg:block ${
            i % 2 === 0 ? "animate-float" : "animate-float-delayed"
          }`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
        >
          {item.text}
        </motion.div>
      ))}

      {/* Content with parallax fade */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
              Available for projects
            </span>
          </div>
        </motion.div>

        <h1
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.92] overflow-hidden text-glow"
        >
          <span className="gradient-text block">{splitText("Sarwan")}</span>
          <span className="text-foreground block mt-2">{splitText("Full Stack")}</span>
          <span className="text-foreground block mt-2">{splitText("Developer")}</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Building powerful digital experiences and innovative software solutions.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-3 text-sm font-semibold text-primary tracking-wide"
        >
          Founder of EllowDigital
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all glow-primary hover:scale-105 active:scale-95"
          >
            <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" /> View My Work
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass gradient-border font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
          >
            <Mail size={16} className="group-hover:-rotate-12 transition-transform" /> Contact Me
          </a>
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass font-medium text-sm text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95 transition-all"
          >
            <FileDown size={16} className="group-hover:translate-y-0.5 transition-transform" /> Download Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll to explore</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
