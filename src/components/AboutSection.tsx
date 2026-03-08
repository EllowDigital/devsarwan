import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Lightbulb, Rocket, Heart } from "lucide-react";

const stories = [
  {
    icon: Code2,
    title: "The Beginning",
    description:
      "My journey into coding started with a simple curiosity — how do websites work? That question led to countless hours of exploring HTML, CSS, and eventually full-stack development.",
  },
  {
    icon: Heart,
    title: "The Passion",
    description:
      "What started as curiosity quickly became a deep passion. Building software isn't just writing code — it's crafting experiences, solving real problems, and creating something from nothing.",
  },
  {
    icon: Lightbulb,
    title: "The Learning",
    description:
      "Every new technology is an opportunity. From React to Python, from databases to cloud deployments — I approach every challenge as a chance to grow and push boundaries.",
  },
  {
    icon: Rocket,
    title: "The Vision",
    description:
      "My goal is to build impactful digital products that make a difference. Through EllowDigital, I'm turning this vision into reality — one project at a time.",
  },
];

const StoryCard = ({ story, index }: { story: typeof stories[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = story.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex gap-6 items-start"
    >
      <div className="shrink-0 w-12 h-12 rounded-xl glass gradient-border flex items-center justify-center">
        <Icon size={20} className="text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{story.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{story.description}</p>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The story behind
            <br />
            <span className="gradient-text">the code.</span>
          </h2>
        </motion.div>

        <div className="grid gap-10">
          {stories.map((story, i) => (
            <StoryCard key={story.title} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
