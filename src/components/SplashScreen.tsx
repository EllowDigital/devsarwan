import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1800);
    const t2 = setTimeout(() => onComplete(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-black tracking-tight"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="gradient-text">Sarwan</span>
              <span className="text-muted-foreground font-light">.dev</span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
            className="h-[2px] mx-auto mt-6 rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))",
            }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-xs font-mono text-muted-foreground mt-4 tracking-widest uppercase"
          >
            Full Stack Developer
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
