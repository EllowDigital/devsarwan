import { useRef, forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxOrbProps {
  className?: string;
  speed?: number;
  color?: "primary" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  position?: { top?: string; bottom?: string; left?: string; right?: string };
}

const sizeMap = {
  sm: "w-32 h-32 sm:w-48 sm:h-48",
  md: "w-48 h-48 sm:w-72 sm:h-72",
  lg: "w-64 h-64 sm:w-96 sm:h-96",
  xl: "w-72 h-72 sm:w-[500px] sm:h-[500px]",
};

const blurMap = {
  sm: "blur-[60px] sm:blur-[80px]",
  md: "blur-[80px] sm:blur-[120px]",
  lg: "blur-[100px] sm:blur-[150px]",
  xl: "blur-[120px] sm:blur-[180px]",
};

const ParallaxOrb = forwardRef<HTMLDivElement, ParallaxOrbProps>(({
  className = "",
  speed = -0.3,
  color = "primary",
  size = "md",
  position = {},
}, _ref) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const colorClass = color === "primary" ? "bg-primary/8" : "bg-accent/8";

  return (
    <div ref={innerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y, opacity, ...position }}
        className={`absolute rounded-full ${sizeMap[size]} ${blurMap[size]} ${colorClass} ${className}`}
      />
    </div>
  );
});

ParallaxOrb.displayName = "ParallaxOrb";

export default ParallaxOrb;
