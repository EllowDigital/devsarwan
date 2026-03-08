import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FolderGit2, Code2, Cpu, Sparkles } from "lucide-react";
import ParallaxOrb from "./ParallaxOrb";

const stats = [
  { icon: FolderGit2, value: 25, suffix: "+", label: "Projects Completed" },
  { icon: Code2, value: 15, suffix: "+", label: "Technologies Learned" },
  { icon: Cpu, value: 10, suffix: "K+", label: "Lines of Code" },
  { icon: Sparkles, value: 2, suffix: "+", label: "Years Building" },
];

const AnimatedCounter = ({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(eased * target);
      if (ref.current) ref.current.textContent = `${val}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, suffix]);

  return <span ref={ref} className="text-4xl md:text-5xl font-bold gradient-text">0{suffix}</span>;
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <ParallaxOrb color="primary" size="md" speed={-0.2} position={{ top: "20%", left: "5%" }} />
      <ParallaxOrb color="accent" size="sm" speed={0.3} position={{ bottom: "20%", right: "10%" }} />

      <div className="max-w-5xl mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="glass rounded-2xl p-6 text-center hover-lift group"
              >
                <Icon size={22} className="text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={isInView} />
                <p className="text-xs text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
