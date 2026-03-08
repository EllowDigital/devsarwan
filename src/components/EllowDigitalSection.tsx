import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Target, Globe, Calendar } from "lucide-react";

const highlights = [
  { icon: Calendar, label: "Founded", value: "June 26, 2024" },
  { icon: Target, label: "Mission", value: "Innovative Solutions" },
  { icon: Globe, label: "Focus", value: "Modern Software" },
  { icon: Zap, label: "Approach", value: "Cutting Edge Tech" },
];

const EllowDigitalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ellowdigital" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-5xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">Organization</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text">EllowDigital</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building innovative digital products and technology solutions that shape the future of software development.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="glass rounded-2xl p-5 text-center hover-lift">
                <Icon size={20} className="text-primary mx-auto mb-3" />
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-semibold text-sm">{item.value}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Story cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              At EllowDigital, we believe in the power of technology to transform ideas into reality. 
              Our mission is to create innovative software solutions that empower businesses and individuals 
              to achieve their digital goals. We focus on quality, performance, and user experience in 
              everything we build.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              We envision a world where cutting-edge technology is accessible to everyone. 
              EllowDigital is committed to pushing the boundaries of what's possible in software 
              development, creating tools and platforms that inspire innovation and drive meaningful 
              change in the digital landscape.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EllowDigitalSection;
