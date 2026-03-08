import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const TECHS = [
  "React", "TypeScript", "Node.js", "Python", "TailwindCSS",
  "PostgreSQL", "MongoDB", "Docker", "Git", "Express",
  "GraphQL", "Redis", "Firebase", "AWS", "Linux",
  "Next.js", "FastAPI", "REST API",
];

function TechNode({ text, position, index }: { text: string; position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => index * 0.5, [index]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + offset;
    // Orbit
    const radius = Math.sqrt(position[0] ** 2 + position[2] ** 2);
    const angle = Math.atan2(position[2], position[0]) + t * 0.15;
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.4) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        {/* Glowing sphere */}
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
        {/* Label */}
        <Text
          position={[0, 0.25, 0]}
          fontSize={0.15}
          color="#94a3b8"
          anchorX="center"
          anchorY="bottom"
          font="/fonts/Inter-Medium.woff"
        >
          {text}
        </Text>
      </mesh>
    </Float>
  );
}

function CenterSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial
        color="#2dd4bf"
        emissive="#2dd4bf"
        emissiveIntensity={0.3}
        transparent
        opacity={0.15}
        wireframe
      />
    </mesh>
  );
}

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={linesRef}>
      {/* Ring indicators */}
      {[1.5, 2.5, 3.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.01, r + 0.01, 64]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.06} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const positions = useMemo(() => {
    return TECHS.map((_, i) => {
      const rings = 3;
      const ring = Math.floor(i / (TECHS.length / rings));
      const indexInRing = i % Math.ceil(TECHS.length / rings);
      const countInRing = Math.ceil(TECHS.length / rings);
      const angle = (indexInRing / countInRing) * Math.PI * 2;
      const radius = 1.5 + ring * 1;
      const y = (Math.random() - 0.5) * 1.2;
      return [
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      ] as [number, number, number];
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#2dd4bf" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#8b5cf6" />

      <CenterSphere />
      <ConnectionLines />

      {TECHS.map((tech, i) => (
        <TechNode key={tech} text={tech} position={positions[i]} index={i} />
      ))}
    </>
  );
}

const TechGlobe3D = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-3">
            Tech Universe
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            My tech <span className="gradient-text">orbit.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            An interactive 3D visualization of the technologies I work with — drag to explore.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl border border-border overflow-hidden"
          style={{ height: "500px" }}
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-muted-foreground text-sm font-mono animate-pulse">
                  Loading 3D scene...
                </div>
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 2, 6], fov: 50 }}
              style={{ background: "transparent" }}
              gl={{ alpha: true, antialias: true }}
            >
              <Scene />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 4}
              />
            </Canvas>
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default TechGlobe3D;
