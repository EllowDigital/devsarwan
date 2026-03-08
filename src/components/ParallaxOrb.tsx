import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxOrbProps {
  className?: string;
  speed?: number; // negative = moves opposite to scroll, positive = same direction
  color?: "primary" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  position?: { top?: string; bottom?: string; left?: string; right?: string };
}

const sizeMap = {
  sm: "w-48 h-48",
  md: "w-72 h-72",
  lg: "w-96 h-96",
  xl: "w-[500px] h-[500px]",
};

const blurMap = {
  sm: "blur-[80px]",
  md: "blur-[120px]",
  lg: "blur-[150px]",
  xl: "blur-[180px]",
};

const ParallaxOrb = ({
  className = "",
  speed = -0.3,
  color = "primary",
  size = "md",
  position = {},
}: ParallaxOrbProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const colorClass = color === "primary" ? "bg-primary/8" : "bg-accent/8";

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y, opacity, ...position }}
        className={`absolute rounded-full ${sizeMap[size]} ${blurMap[size]} ${colorClass} ${className}`}
      />
    </div>
  );
};

export default ParallaxOrb;
