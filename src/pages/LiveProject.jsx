import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html, useProgress } from "@react-three/drei";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Link } from "react-router-dom";
import { X, Maximize2 } from "lucide-react";
import modelPath from "../assets/projects/f5cf039b4f4286b58fb4b1fea4ce0795.glb";
import { SiteNav } from "../components/projects/SiteNav";

/* ─── STYLES ──────────────────────────────────────────────────────────────── */
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const mono  = { fontFamily: "'JetBrains Mono', 'Courier New', monospace" };
const label = { fontSize: "0.6rem", letterSpacing: "0.38em", textTransform: "uppercase" };
const fg    = "#ffffff";
const dim   = "rgba(255,255,255,0.32)";

/* ─── PROJECT DATA ─────────────────────────────────────────────────────────── */
const PROJECT = {
  name:       "VJ Reveal Space",
  client:     "CHV Constructions",
  location:   "Hyderabad, Telangana",
  phase:      "Structural · Floor 18 of 24",
  type:       "Premium Residential",
  height:     "72 m",
  units:      "240 Apts",
  floors:     "24 Floors",
  completion: "Dec 2025",
  area:       "42,000 m²",
  progress:   "74%",
  materials:  "RCC · Structural Steel · Low-E Glass",
  status:     "Live Construction",
};

const WORK = [
  { year: "2024", title: "Meridian Tower",        city: "New York",  desc: "52-storey mixed-use tower. Vertical folded-plate steel façade reads differently from every angle." },
  { year: "2023", title: "Ōura Cultural Centre",  city: "Tokyo",     desc: "Exposed board-formed concrete wraps a triple-height atrium open to the bay." },
  { year: "2022", title: "Halcyon Residences",    city: "Dubai",     desc: "16-floor tower with passive cooling louvres modelled on traditional wind-towers." },
  { year: "2021", title: "Breck Street Annexe",   city: "London",    desc: "Structural glass staircase connects a Victorian warehouse to a 7-storey addition." },
  { year: "2020", title: "Novum Data Campus",     city: "Berlin",    desc: "Corten-clad campus. BREEAM Excellent. PUE of 1.12." },
  { year: "2019", title: "Atlas Financial HQ",    city: "Singapore", desc: "Cantilevered sky-lobbies at floors 22 and 40 create dramatic urban viewpoints." },
];

/* ─── 3D HELPERS ──────────────────────────────────────────────────────────── */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.12)", borderTop: "1px solid #fff", borderRadius: "50%", animation: "lp-spin 1s linear infinite" }} />
        <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

function Model() {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={2} position={[0, 0.1, 0]} />;
}

/* Main-page camera: zoom starts distant, ends very close on scroll */
function CameraRig({ scrollProgress }) {
  const { camera } = useThree();
  const elapsed = useRef(0);
  const done    = useRef(false);
  const INTRO_FROM = 14, INTRO_TO = 4;
  const SCROLL_TO  = 0.6; // very close

  useFrame((_, dt) => {
    elapsed.current += dt;
    if (!done.current) {
      const t = Math.min(elapsed.current / 3, 1);
      camera.position.z = INTRO_FROM + (INTRO_TO - INTRO_FROM) * (1 - Math.pow(1 - t, 4));
      if (t >= 1) { camera.position.z = INTRO_TO; done.current = true; }
    } else {
      const target = THREE.MathUtils.lerp(INTRO_TO, SCROLL_TO, scrollProgress.get());
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, target, 0.07);
    }
  });
  return null;
}

/* Preview canvas: auto-rotate, zoom enabled */
function PreviewCanvas() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 42 }}>
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} />
      <directionalLight position={[-5, 2, -5]} intensity={0.35} color="#8899cc" />
      <Environment preset="city" />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        autoRotate={true}
        autoRotateSpeed={0.7}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={0.15}
        minDistance={1}
        maxDistance={12}
      />
    </Canvas>
  );
}

/* ─── WORK ROW ───────────────────────────────────────────────────────────── */
function WorkRow({ p, i, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06, duration: 0.55 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "baseline", gap: "2rem", width: "100%",
        padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        color: hov ? fg : dim, transition: "color 0.3s", textAlign: "left",
        position: "relative", overflow: "hidden",
      }}
    >
      <motion.div animate={{ scaleX: hov ? 1 : 0 }} initial={{ scaleX: 0 }} transition={{ duration: 0.3 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.25)", transformOrigin: "left" }} />
      <span style={{ ...mono, fontSize: "0.68rem", letterSpacing: "0.15em", width: 40, flexShrink: 0, color: hov ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.16)" }}>{p.year}</span>
      <span style={{ ...serif, fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 300, flex: 1, letterSpacing: "0.02em" }}>{p.title}</span>
      <span style={{ ...mono, fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: hov ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.16)" }}>{p.city}</span>
    </motion.button>
  );
}

/* ─── PROJECT OVERLAY ─────────────────────────────────────────────────────── */
function WorkOverlay({ p, onClose }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
      onClick={onClose}
    >
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.35 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 700, width: "100%", padding: "3rem", border: "1px solid rgba(255,255,255,0.07)", position: "relative" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", color: dim, cursor: "pointer" }}>
          <X size={18} />
        </button>
        <p style={{ ...mono, ...label, color: dim, marginBottom: "1.25rem" }}>{p.year} · {p.city}</p>
        <h2 style={{ ...serif, fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.0, color: fg, margin: "0 0 1.75rem", fontWeight: 300 }}>{p.title}</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "rgba(255,255,255,0.5)", maxWidth: 500 }}>{p.desc}</p>
        <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.15)", marginTop: "2rem" }}>Esc to close</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN ────────────────────────────────────────────────────────────────── */
export default function LiveProject() {
  const [workItem, setWorkItem]   = useState(null);
  const [preview, setPreview]     = useState(false);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  /* ── transforms ─────────────────────────────────────────── */
  // Title: shoots upward and fades out instantly (0 to 2%)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.01], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.01], ["0vh", "-38vh"]);

  // View button: arrives instantly synced with title (0 to 2%)
  const viewOpacity = useTransform(scrollYProgress, [0, 0.02], [1,0]);

  // Panels: slide in instantly synced with title (0 to 2%)
  const panelOpacity  = useTransform(scrollYProgress, [0, 0.02, 0.85, 0.95], [0, 1, 1, 0]);
  const leftX  = useTransform(scrollYProgress, [0, 0.02], ["-10px", "0px"]);
  const leftY  = useTransform(scrollYProgress, [0, 0.02], ["10px",  "0px"]);
  const leftRot= useTransform(scrollYProgress, [0, 0.02], ["-8deg", "0deg"]);
  const rightX  = useTransform(scrollYProgress, [0, 0.02], ["10px",  "0px"]);
  const rightY  = useTransform(scrollYProgress, [0, 0.02], ["-50px", "0px"]);
  const rightRot= useTransform(scrollYProgress, [0, 0.02], ["8deg",  "0deg"]);

  // Scroll hint: disappears on first pixel of scroll
  const hintOpacity = useTransform(scrollYProgress, [0, 0.01], [1, 0]);

  // Canvas parallax
  const canvasScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.25]);



  return (
    <div style={{ background: "#000", color: fg, minHeight: "100vh" }}>
      <style>{`@keyframes lp-spin { to { transform: rotate(360deg); } }`}</style>

      {/* ── NAV ───────────────────────────────────────────────────────────── */}
      <SiteNav theme="dark" />

      {/* ── HERO SCROLL SECTION ───────────────────────────────────────────── */}
      <section ref={sectionRef} style={{ position: "relative", height: "310vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* 3D Canvas */}
          <motion.div style={{ position: "absolute", inset: 0, scale: canvasScale }}>
            <Canvas camera={{ position: [0, 1, 14], fov: 44 }}>
              <color attach="background" args={["#000"]} />
              <ambientLight intensity={0.45} />
              <directionalLight position={[5, 8, 5]} intensity={1.5} />
              <directionalLight position={[-5, 2, -5]} intensity={0.3} color="#8899cc" />
              <Environment preset="city" />
              <Suspense fallback={<Loader />}>
                <Model />
              </Suspense>
              <CameraRig scrollProgress={scrollYProgress} />
              <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={0.2} />
            </Canvas>
          </motion.div>

          {/* Vignettes */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30vh", background: "linear-gradient(to top, #000 0%, transparent)", pointerEvents: "none" }} />

          {/* ── TITLE — shoots upward on scroll ─────────────────────────── */}
          <motion.div
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: "0 2rem",
              opacity: titleOpacity, y: titleY,
              pointerEvents: "none",
            }}
          >
            <h1 style={{ ...serif, fontSize: "clamp(3.2rem, 8.5vw, 7.5rem)", lineHeight: 0.96, fontWeight: 300, margin: 0, letterSpacing: "-0.015em" }}>
              Crafting The Future
            </h1>
          </motion.div>

          {/* ── LEFT PANEL — slides from bottom-left ────────────────────── */}
          <motion.div
            style={{
              position: "absolute", left: "2.5rem", top: "50%", translateY: "-50%",
              maxWidth: 210, opacity: panelOpacity,
              x: leftX, y: leftY, rotate: leftRot,
              pointerEvents: "none",
            }}
          >
            <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.22)", marginBottom: "2rem" }}>Live · Current Project</p>
            {[
              ["Project",   PROJECT.name],
              ["Client",    PROJECT.client],
              ["Location",  PROJECT.location],
              ["Type",      PROJECT.type],
              ["Phase",     PROJECT.phase],
              ["Status",    PROJECT.status],
            ].map(([l, v]) => (
              <div key={l} style={{ marginBottom: "1.2rem" }}>
                <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.18)", marginBottom: "0.25rem" }}>{l}</p>
                <p style={{ ...serif, fontSize: l === "Status" ? "0.8rem" : "0.9rem", color: fg, fontWeight: 300, lineHeight: 1.3, margin: 0 }}>{v}</p>
              </div>
            ))}
          </motion.div>

          {/* ── RIGHT PANEL — slides from top-right ─────────────────────── */}
          <motion.div
            style={{
              position: "absolute", right: "2.5rem", top: "50%", translateY: "-50%",
              maxWidth: 210, textAlign: "right", opacity: panelOpacity,
              x: rightX, y: rightY, rotate: rightRot,
              pointerEvents: "none",
            }}
          >
            <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.22)", marginBottom: "2rem" }}>Specifications</p>
            {[
              ["Height",     PROJECT.height],
              ["Total Area", PROJECT.area],
              ["Floors",     PROJECT.floors],
              ["Units",      PROJECT.units],
              ["Completion", PROJECT.completion],
              ["Materials",  PROJECT.materials],
            ].map(([l, v]) => (
              <div key={l} style={{ marginBottom: "1.2rem" }}>
                <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.18)", marginBottom: "0.25rem" }}>{l}</p>
                <p style={{ ...serif, fontSize: "0.9rem", color: fg, fontWeight: 300, lineHeight: 1.3, margin: 0 }}>{v}</p>
              </div>
            ))}
          </motion.div>

          {/* ── PROGRESS — large centered number after panels ────────────── */}
          <motion.div
            style={{
              position: "absolute", bottom: "7rem", left: "50%",
              transform: "translateX(-50%)", textAlign: "center",
              opacity: panelOpacity, pointerEvents: "none",
            }}
          >
            <p style={{ ...serif, fontSize: "clamp(3.5rem, 7vw, 5.5rem)", fontWeight: 300, lineHeight: 1, color: fg, margin: 0 }}>
              {PROJECT.progress}
            </p>
            <p style={{ ...mono, ...label, color: dim, marginTop: "0.5rem" }}>Overall Construction Progress</p>
          </motion.div>

          {/* ── VIEW BUTTON — appears after panels ──────────────────────── */}
          <motion.div
            style={{
              position: "absolute", bottom: "2.5rem", left: "50%",
              transform: "translateX(-50%)",
              opacity: viewOpacity,
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={() => setPreview(true)}
              style={{
                ...mono, ...label, color: fg,
                display: "inline-flex", alignItems: "center", gap: "0.6rem",
                background: "none", border: "1px solid rgba(255,255,255,0.22)",
                padding: "0.75rem 1.75rem", cursor: "pointer", letterSpacing: "0.25em",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = fg; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; }}
            >
              <Maximize2 size={13} />
              View Live Model
            </button>
          </motion.div>

          {/* ── SCROLL HINT ──────────────────────────────────────────────── */}
          <motion.div
            style={{
              position: "absolute", bottom: "2.2rem", left: "50%",
              transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              opacity: hintOpacity, pointerEvents: "none",
            }}
          >
            <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
              style={{ width: 1, height: 44, background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
          </motion.div>
        </div>
      </section>

      {/* ── NUMBERS BANNER ───────────────────────────────────────────────── */}
      <section style={{ padding: "7rem 2.5rem", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }}
          style={{ ...serif, fontSize: "clamp(2.5rem, 7vw, 6rem)", fontWeight: 300, letterSpacing: "-0.02em", color: fg, lineHeight: 1, margin: 0 }}
        >
          28 projects&nbsp;&nbsp;·&nbsp;&nbsp;14 cities&nbsp;&nbsp;·&nbsp;&nbsp;3 continents
        </motion.p>
      </section>

      {/* ── SELECTED WORK ────────────────────────────────────────────────── */}
      <section style={{ padding: "0 2.5rem 8rem", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1.25rem" }}>
          <p style={{ ...mono, ...label, color: dim }}>Selected Work</p>
          <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.12)" }}>{WORK.length} projects</p>
        </div>
        {WORK.map((p, i) => (
          <WorkRow key={p.title} p={p} i={i} onClick={() => setWorkItem(p)} />
        ))}
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.75rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ ...serif, fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", margin: 0 }}>© 2026 CHV Constructions</p>
        <div style={{ width: 44, height: 1, background: "rgba(255,255,255,0.12)" }} />
      </footer>

      {/* ── FULL PREVIEW MODE ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {preview && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: "fixed", inset: 0, zIndex: 300, background: "#000" }}
          >
            <PreviewCanvas />

            {/* HUD overlay */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {/* top label */}
              <div style={{ position: "absolute", top: "1.75rem", left: "2rem" }}>
                <p style={{ ...serif, fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                  VJ Reveal Space
                </p>
                <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.25)", marginTop: "0.3rem" }}>
                  Live Model · Auto-rotating · Scroll to zoom
                </p>
              </div>

              {/* ── LEFT PANEL ── */}
              <div style={{ position: "absolute", left: "2.5rem", top: "50%", transform: "translateY(-50%)", maxWidth: 210 }}>
                <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.22)", marginBottom: "2rem" }}>Live · Current Project</p>
                {[
                  ["Project",  PROJECT.name],
                  ["Client",   PROJECT.client],
                  ["Location", PROJECT.location],
                  ["Type",     PROJECT.type],
                  ["Phase",    PROJECT.phase],
                  ["Status",   PROJECT.status],
                ].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: "1.2rem" }}>
                    <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.18)", marginBottom: "0.25rem" }}>{l}</p>
                    <p style={{ ...serif, fontSize: l === "Status" ? "0.8rem" : "0.9rem", color: fg, fontWeight: 300, lineHeight: 1.3, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>

              {/* ── RIGHT PANEL ── */}
              <div style={{ position: "absolute", right: "2.5rem", top: "50%", transform: "translateY(-50%)", maxWidth: 210, textAlign: "right" }}>
                <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.22)", marginBottom: "2rem" }}>Specifications</p>
                {[
                  ["Height",     PROJECT.height],
                  ["Total Area", PROJECT.area],
                  ["Floors",     PROJECT.floors],
                  ["Units",      PROJECT.units],
                  ["Completion", PROJECT.completion],
                  ["Materials",  PROJECT.materials],
                ].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: "1.2rem" }}>
                    <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.18)", marginBottom: "0.25rem" }}>{l}</p>
                    <p style={{ ...serif, fontSize: "0.9rem", color: fg, fontWeight: 300, lineHeight: 1.3, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>

              {/* ── PROGRESS number ── */}
              <div style={{ position: "absolute", bottom: "7rem", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
                <p style={{ ...serif, fontSize: "clamp(3.5rem, 7vw, 5.5rem)", fontWeight: 300, lineHeight: 1, color: fg, margin: 0 }}>
                  {PROJECT.progress}
                </p>
                <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>Overall Construction Progress</p>
              </div>

              {/* spec strip bottom */}
              <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "2.5rem" }}>
                {[
                  ["Phase",    PROJECT.phase],
                  ["Area",     PROJECT.area],
                  ["Status",   PROJECT.status],
                ].map(([l, v]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <p style={{ ...mono, ...label, color: "rgba(255,255,255,0.22)", marginBottom: "0.2rem" }}>{l}</p>
                    <p style={{ ...serif, fontSize: "0.88rem", color: fg, fontWeight: 300, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exit button */}
            <button
              onClick={() => setPreview(false)}
              style={{
                position: "absolute", top: "1.5rem", right: "1.75rem",
                ...mono, ...label, color: fg,
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "none", border: "1px solid rgba(255,255,255,0.2)",
                padding: "0.6rem 1.25rem", cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = fg}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}
            >
              <X size={12} />
              Exit Preview
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WORK ITEM OVERLAY ────────────────────────────────────────────── */}
      <AnimatePresence>
        {workItem && <WorkOverlay p={workItem} onClose={() => setWorkItem(null)} />}
      </AnimatePresence>
    </div>
  );
}
