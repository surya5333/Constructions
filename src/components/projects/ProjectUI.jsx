import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowUpRight } from "lucide-react";
import * as THREE from "three";

// --- Project Story Modal ---

export function ProjectStoryModal({ isOpen, onClose, title, content }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative h-full max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-card p-8 shadow-2xl md:p-12"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full border border-border bg-background p-2 text-muted-foreground transition hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-w-3xl">
              <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">Project Story</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">{title}</h2>
              
              <div className="mt-12 space-y-12">
                <section>
                  <h3 className="font-display text-2xl">The Vision</h3>
                  <p className="mt-4 text-lg leading-relaxed text-foreground/80">{content.overview}</p>
                </section>

                <div className="grid gap-12 md:grid-cols-2">
                  <section>
                    <h3 className="font-mono text-[10px] tracking-widest text-accent uppercase">The Challenges</h3>
                    <ul className="mt-6 space-y-4">
                      {content.challenges.map((c, i) => (
                        <li key={i} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                          <span className="font-mono text-accent">0{i + 1}</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="font-mono text-[10px] tracking-widest text-accent uppercase">Our Execution</h3>
                    <ul className="mt-6 space-y-4">
                      {content.solutions.map((s, i) => (
                        <li key={i} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <section className="rounded-xl border border-accent/20 bg-accent/5 p-8">
                  <h3 className="font-display text-2xl">The Result</h3>
                  <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    {content.results.map((r, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] tracking-widest text-accent uppercase">Outcome 0{i + 1}</span>
                        <span className="text-sm font-medium">{r}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- 3D Model Components ---

function Tower({ hovered }) {
  const group = useRef(null);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * (hovered ? 0.05 : 0.15);
  });

  const floors = 9;
  return (
    <group ref={group} position={[0, -1.2, 0]}>
      {Array.from({ length: floors }).map((_, i) => {
        const w = 2.4 - i * 0.08;
        const d = 2.4 - i * 0.08;
        return (
          <mesh key={i} position={[0, i * 0.42, 0]}>
            <boxGeometry args={[w, 0.36, d]} />
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.4}
              roughness={0.6}
              transparent
              opacity={0.55}
            />
            <Edges threshold={15} color="#d4b483" />
          </mesh>
        );
      })}
      <mesh position={[0, (floors * 0.42) / 2 - 0.2, 0]}>
        <boxGeometry args={[0.4, floors * 0.42, 0.4]} />
        <meshStandardMaterial color="#d4b483" emissive="#d4b483" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 2.6, 64]} />
        <meshBasicMaterial color="#1a1a1a" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Scene() {
  const [hovered, setHovered] = useState(false);
  return (
    <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fff5e0" />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#7aa7ff" />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Tower hovered={hovered} />
      </Float>
    </group>
  );
}

export function LiveModel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-[520px] w-full animate-pulse rounded-2xl border border-border bg-card" />
    );
  }

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-border bg-[radial-gradient(ellipse_at_center,_var(--surface-2)_0%,_var(--surface-1)_70%)]">
      <Canvas camera={{ position: [4, 3, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls
            enablePan={false}
            minDistance={4}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-xs tracking-[0.2em] text-muted-foreground uppercase">
        <div className="flex flex-col gap-2">
          <span>● Live · Meridian Tower · Floor 09 of 24</span>
          <a 
            href="/live-project" 
            className="pointer-events-auto inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors no-underline"
          >
            Go Live <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
        <span className="pointer-events-none">Drag to orbit</span>
      </div>
      <div className="pointer-events-none absolute left-5 top-5 font-mono text-[10px] tracking-widest text-accent">
        MODEL_REV_142 — STREAMING
      </div>
    </div>
  );
}

// --- BeforeAfter Component ---

export function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After" }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const onMove = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, pct)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border select-none touch-none"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target).setPointerCapture?.(e.pointerId);
        onMove(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && onMove(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      <div className="absolute inset-0">{after}</div>
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <div
          className="absolute inset-y-0 left-0 h-full"
          style={{ width: `${(100 / pos) * 100}%` }}
        >
          {before}
        </div>
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase text-foreground backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase text-accent-foreground">
        {afterLabel}
      </span>

      <div
        className="absolute inset-y-0 w-px bg-accent shadow-[0_0_20px_var(--accent)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-accent bg-background text-accent">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
