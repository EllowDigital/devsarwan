import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import ParallaxOrb from "./ParallaxOrb";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CTO, TechNova",
    text: "Sarwan delivered an exceptional platform that exceeded our expectations. His attention to detail and technical expertise made the entire development process seamless.",
    avatar: "AR",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager, ScaleUp",
    text: "Working with Sarwan was a game-changer for our startup. He built our MVP in record time with clean, maintainable code that our team could easily extend.",
    avatar: "PS",
  },
  {
    name: "James Chen",
    role: "Founder, DevFlow",
    text: "Sarwan's full-stack skills are top-notch. He architected our entire backend and delivered a beautiful frontend. Highly recommend for any serious project.",
    avatar: "JC",
  },
  {
    name: "Sarah Mitchell",
    role: "Lead Designer, Pixel Labs",
    text: "The collaboration with Sarwan was incredible. He translated complex designs into pixel-perfect, performant code with smooth animations throughout.",
    avatar: "SM",
  },
  {
    name: "Omar Khalil",
    role: "Engineering Lead, DataPulse",
    text: "Sarwan's understanding of scalable architecture is impressive. He optimized our API gateway, reducing response times by 60%. A true full-stack talent.",
    avatar: "OK",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <ParallaxOrb color="accent" size="xl" speed={-0.2} position={{ top: "30%", left: "-5%" }} />
      <ParallaxOrb color="primary" size="md" speed={0.3} position={{ bottom: "0%", right: "10%" }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            What people <span className="gradient-text">say.</span>
          </h2>
        </motion.div>

        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass rounded-2xl p-8 md:p-10 border border-border text-center max-w-2xl mx-auto w-full"
            >
              <Quote className="w-8 h-8 text-primary/30 mx-auto mb-4" />
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
                "{testimonials[current].text}"
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{testimonials[current].name}</p>
                  <p className="text-xs text-muted-foreground">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => { prev(); resetTimer(); }}
            className="p-2.5 rounded-full glass hover:bg-secondary transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                  resetTimer();
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => { next(); resetTimer(); }}
            className="p-2.5 rounded-full glass hover:bg-secondary transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
