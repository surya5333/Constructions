import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Circle, Clock, MapPin, Calendar,
  Ruler, TrendingUp, Quote, FileText, PenTool, HardHat, Award,
  Building, Building2, Map, ChevronLeft, ChevronRight, Star, ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SiteNav } from "../components/projects/SiteNav";
import { LiveModel, BeforeAfter, ProjectStoryModal } from "../components/projects/ProjectUI";
import useIsMobile from "../lib/useIsMobile";
import "../styles/projects.css";

import heroLive     from "../assets/projects/hero-live.jpg";
import p1           from "../assets/projects/p1.jpg";
import p2           from "../assets/projects/p2.jpg";
import p3           from "../assets/projects/p3.jpg";
import p4           from "../assets/projects/p4.jpg";
import completedHero from "../assets/projects/completed-hero.jpg";
import beforeImg    from "../assets/projects/before.jpg";
import afterImg     from "../assets/projects/after.jpg";
import signatureImg from "../assets/projects/signature.jpg";

/* ─── constants ──────────────────────────────────────────────────────────── */

const PHASES = [
  { label: "Foundation", done: true,  active: false },
  { label: "Structure",  done: true,  active: false },
  { label: "Masonry",    done: false, active: true  },
  { label: "Electrical", done: false, active: false },
  { label: "Finishing",  done: false, active: false },
];

const ONGOING = [
  { img: p1, name: "Journey Reveal Space",  loc: "Hyderabad", pct: 100, stage: "Completed",       end: "Jun 2026" },
  { img: p2, name: "Skyline Residences",    loc: "Hyderabad", pct: 62,  stage: "Structure Stage",  end: "Dec 2025" },
  { img: p3, name: "Global Tech Park",      loc: "Bangalore", pct: 38,  stage: "Foundation Stage", end: "Mar 2026" },
  { img: p4, name: "Green Vista Villas",    loc: "Hyderabad", pct: 71,  stage: "Masonry Stage",    end: "Jan 2026" },
  { img: p1, name: "City Center Complex",   loc: "Vizag",     pct: 24,  stage: "Foundation Stage", end: "Apr 2026" },
  { img: p2, name: "Azure Heights",         loc: "Chennai",   pct: 45,  stage: "Structure Stage",  end: "Aug 2026" },
];

const COMPLETED = [
  {
    img: completedHero,
    name: "The Horizon Towers", type: "Residential",
    location: "Hyderabad, Telangana", area: "2.8 Lakh Sq.ft.", date: "May 2024",
    desc: "A landmark residential complex blending modern architectural precision with natural tranquility.",
  },
  {
    img: p3,
    name: "Meridian Corporate Hub", type: "Commercial",
    location: "Bangalore, Karnataka", area: "1.4 Lakh Sq.ft.", date: "Nov 2023",
    desc: "State-of-the-art Grade-A office development with LEED Platinum certification.",
  },
];

const STEPS = [
  { Icon: FileText, n: "01 · Challenge",  t: "Identifying unique structural constraints and site opportunities." },
  { Icon: PenTool,  n: "02 · Planning",   t: "Architectural layouts, 4D scheduling, and phased strategy." },
  { Icon: HardHat,  n: "03 · Execution",  t: "Precision masonry and accelerated structural delivery." },
  { Icon: Award,    n: "04 · Outcome",    t: "Delivered ahead of schedule. Zero incidents. 18% less waste." },
];

const STATS = [
  { Icon: Building,  v: "25+", l: "Projects Completed" },
  { Icon: Building2, v: "12L+",l: "Sq.Ft. Built" },
  { Icon: Map,       v: "8",   l: "Cities Served" },
  { Icon: Award,     v: "98%", l: "Client Satisfaction" },
];

const TESTIMONIALS = [
  { img: p1, name: "Vikram Reddy",   role: "Commercial Developer", project: "Meridian Corporate Hub · 2023", quote: "Their structural discipline and aesthetic vision is unmatched. Every milestone met with precision.", stars: 5 },
  { img: p2, name: "Ananya Sharma",  role: "Villa Owner",          project: "Green Vista Villas · 2024",    quote: "CHV didn't just build our home — they crafted a masterpiece we will treasure for generations.", stars: 5 },
  { img: p3, name: "Rohan Mehta",    role: "Hospitality Director", project: "The Horizon Towers · 2024",    quote: "From inquiry to handover, flawless. CHV's command over timelines set a new benchmark.", stars: 5 },
];

const storyContent = {
  overview: "Green Vista Villas was conceived as a landmark of sustainable luxury — a harmonious blend of modern architectural precision and natural tranquility.",
  challenges: [
    "Integrating grey-water recycling without compromising aesthetics.",
    "Sourcing specialised local granite meeting structural and sustainability criteria.",
    "Coordinating landscaping phases alongside core masonry work.",
  ],
  solutions: [
    "Implemented a subterranean biological filtration system hidden beneath the central garden.",
    "Established a dedicated supply-chain partnership with local quarries.",
    "Utilised 4D scheduling to align hardscape installation with architectural finishing.",
  ],
  results: [
    "18% reduction in total construction waste.",
    "Delivered 3 weeks ahead of the 12-month timeline.",
    "100% on-time delivery with zero safety incidents.",
  ],
};

/* ─── shared motion presets ──────────────────────────────────────────────── */
const fadeUp  = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 },        show: { opacity: 1 } };

/* ─── component ──────────────────────────────────────────────────────────── */
export default function Projects() {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [active, setActive]           = useState(0);
  const isMobile                      = useIsMobile();

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="project-theme">
      <main style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
        <SiteNav />

        <ProjectStoryModal
          isOpen={isStoryOpen}
          onClose={() => setIsStoryOpen(false)}
          title="Green Vista Villas"
          content={storyContent}
        />

        {/* ══ 01 · HERO ══════════════════════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 0 }}>
          {/* bg */}
          <div style={{ position: "absolute", inset: 0 }}>
            <img src={heroLive} alt="Live project" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.38 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--background) 40%, color-mix(in oklch, var(--background) 70%, transparent))" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--background) 0%, transparent 60%)" }} />
          </div>

          {/* blueprint grid */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
            <defs>
              <pattern id="bp" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bp)" />
          </svg>

          <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: isMobile ? "6rem 1.5rem 3rem" : "8rem 2.5rem 3rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr", gap: "3rem", alignItems: "center", width: "100%" }}>
            {/* left */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.9, delay: 0.2 }}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.35em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                01 · Live Projects
              </p>
              <h1 style={{ fontFamily: "Fraunces, Cormorant Garamond, serif", fontSize: "clamp(2.6rem, 5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
                Building Today.
                <br />
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Creating Tomorrow.</span>
              </h1>
              <p style={{ marginTop: "1.5rem", maxWidth: 420, fontSize: "0.875rem", lineHeight: 1.75, color: "var(--muted-foreground)" }}>
                Explore ongoing construction projects with real-time progress tracking, interactive 3D models, and transparent milestone updates.
              </p>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                <a href="#live-model" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: "1px solid var(--accent)", padding: "0.75rem 1.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--accent-foreground)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
                >
                  Explore Live Model <ArrowRight size={14} />
                </a>
                <Link to="/live-project" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "var(--accent)", padding: "0.75rem 1.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", color: "var(--accent-foreground)", textTransform: "uppercase", textDecoration: "none" }}>
                  Track Progress <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* project card */}
              <div style={{ marginTop: "3rem", maxWidth: 340, border: "1px solid var(--border)", background: "color-mix(in oklch, var(--card) 95%, transparent)", padding: "1.5rem", backdropFilter: "blur(8px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ fontFamily: "Fraunces, serif", fontSize: "1.1rem", textTransform: "uppercase", margin: 0 }}>Skyline Residences</p>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.2em", background: "color-mix(in oklch, var(--accent) 15%, transparent)", color: "var(--accent)", padding: "0.25rem 0.5rem", textTransform: "uppercase" }}>Active</span>
                </div>
                <p style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
                  <MapPin size={12} /> Hyderabad, Telangana
                </p>
                <div style={{ marginTop: "1.25rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Overall Progress</span>
                    <span style={{ fontFamily: "Fraunces, serif", fontSize: "1.5rem", color: "var(--accent)" }}>62%</span>
                  </div>
                  <div style={{ marginTop: "0.5rem", height: 2, background: "var(--border)" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: "62%" }} transition={{ delay: 1.2, duration: 1.2 }} style={{ height: "100%", background: "var(--accent)" }} />
                  </div>
                </div>
                <p style={{ marginTop: "1rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", color: "var(--muted-foreground)" }}>
                  Latest: Level 5 slab completed ahead of schedule.
                </p>
              </div>
            </motion.div>

            {/* right — phase tracker */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.9, delay: 0.5 }}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.35em", color: "var(--muted-foreground)", textTransform: "uppercase", marginBottom: "2rem" }}>Construction Phases</p>
              <div style={{ borderLeft: "1px solid color-mix(in oklch, var(--border) 50%, transparent)", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {PHASES.map((p, i) => (
                  <motion.div key={p.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
                    style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                      width: 36, height: 36, display: "grid", placeItems: "center",
                      border: `1px solid ${p.done || p.active ? "var(--accent)" : "var(--border)"}`,
                      background: p.done ? "color-mix(in oklch, var(--accent) 15%, transparent)" : "transparent",
                      color: p.done || p.active ? "var(--accent)" : "var(--muted-foreground)",
                      flexShrink: 0,
                    }}>
                      {p.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.875rem", fontWeight: 500, color: p.done || p.active ? "var(--foreground)" : "var(--muted-foreground)", margin: 0 }}>{p.label}</p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: 0 }}>
                        {p.done ? "Completed" : p.active ? "In Progress" : "Upcoming"}
                      </p>
                    </div>
                    {p.active && (
                      <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                        style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* live update card */}
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ marginTop: "2rem", border: "1px solid var(--border)", background: "color-mix(in oklch, var(--card) 95%, transparent)", padding: "1.25rem", backdropFilter: "blur(8px)", maxWidth: 300 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Live Update</p>
                  </div>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", color: "var(--muted-foreground)", margin: 0 }}>Today, 10:30 AM</p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <div style={{ width: 64, height: 48, background: `url(${p1}) center/cover`, flexShrink: 0 }} />
                  <p style={{ fontSize: "0.75rem", lineHeight: 1.6, color: "color-mix(in oklch, var(--foreground) 85%, transparent)", margin: 0 }}>Level 5 slab poured. Structural integrity confirmed.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* 3D model */}
          <div id="live-model" style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem 3rem", width: "100%" }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <LiveModel />
            </motion.div>
          </div>
        </section>

        {/* ══ 02 · ONGOING PROJECTS ══════════════════════════════════════════ */}
        <section style={{ background: "lab(95.3645% .915945 2.88142)", padding: "4rem 0", color: "#000" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
              <div>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.4em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>02 · Ongoing Projects</p>
                <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, textTransform: "uppercase", margin: 0, color: "#000" }}>
                  Tracking Progress.<br />
                  Delivering <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Promises.</span>
                </h2>
              </div>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.3em", color: "#444", textTransform: "uppercase" }}>
                {ONGOING.filter(p => p.pct < 100).length} Active · {ONGOING.filter(p => p.pct === 100).length} Completed
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 1, background: "color-mix(in oklch, var(--border) 20%, transparent)" }}>
              {ONGOING.map((c, i) => (
                <motion.article key={c.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#000" }}>
                  <img src={c.img} alt={c.name} loading="lazy"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, transition: "opacity 0.5s, transform 0.7s" }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.75"; e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.transform = "scale(1)"; }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 0%, color-mix(in oklch, #000 50%, transparent) 50%, transparent 100%)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.25rem" }}>
                    <div>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", fontWeight: 600, margin: 0 }}>{c.name}</p>
                      <p style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.6875rem", color: "rgba(255,255,255,0.6)", marginTop: "0.25rem" }}><MapPin size={10} />{c.loc}</p>
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "Fraunces, serif", fontSize: "1.75rem", color: "var(--accent)" }}>{c.pct}%</span>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", color: "var(--accent)" }}>{c.end}</span>
                      </div>
                      <div style={{ marginTop: "0.5rem", height: 1, background: "rgba(255,255,255,0.1)", position: "relative" }}>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${c.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.07 }}
                          style={{ position: "absolute", inset: 0, background: "var(--accent)", height: "100%" }} />
                      </div>
                      <p style={{ marginTop: "0.75rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)" }}>{c.stage}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 03 · COMPLETED PROJECTS ════════════════════════════════════════ */}
        <section style={{ background: "var(--background)", padding: "4rem 0" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.4em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>03 · Completed Projects</p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, textTransform: "uppercase", margin: 0 }}>
                Built With Precision.<br />Delivered With <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Pride.</span>
              </h2>
            </div>

            {COMPLETED.map((proj, i) => (
              <motion.div key={proj.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.8 }}
                style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", border: "1px solid var(--border)", marginBottom: "1px", direction: (i % 2 !== 0 && !isMobile) ? "rtl" : "ltr" }}>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", direction: "ltr" }}>
                  <img src={proj.img} alt={proj.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                  <div style={{ position: "absolute", bottom: 20, left: 20, direction: "ltr" }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", background: "var(--accent)", color: "var(--accent-foreground)", padding: "0.25rem 0.75rem" }}>{proj.type}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "2.5rem", background: "var(--card)", direction: "ltr" }}>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.35em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "1rem" }}>Completed · {proj.date}</p>
                  <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: "1rem" }}>{proj.name}</h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "var(--muted-foreground)", marginBottom: "2rem" }}>{proj.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                    {[
                      { Icon: MapPin, l: "Location", v: proj.location },
                      { Icon: Ruler, l: "Built Area", v: proj.area },
                      { Icon: Calendar, l: "Completion", v: proj.date },
                    ].map(m => (
                      <div key={m.l} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid color-mix(in oklch, var(--border) 30%, transparent)", paddingBottom: "0.75rem", fontSize: "0.8125rem" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--muted-foreground)" }}><m.Icon size={14} style={{ color: "var(--accent)" }} />{m.l}</span>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6875rem" }}>{m.v}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setIsStoryOpen(true)}
                    style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1px solid var(--accent)", padding: "0.625rem 1.25rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.25em", color: "var(--accent)", textTransform: "uppercase", background: "transparent", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--accent-foreground)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
                  >
                    Project Story <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* thumbnail strip */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 1, background: "color-mix(in oklch, var(--border) 20%, transparent)", marginTop: 1 }}>
              {[p1, p2, p3, p4].map((img, i) => (
                <motion.div key={i} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ aspectRatio: "4/3", overflow: "hidden", cursor: "pointer" }}>
                  <img src={img} alt={`Thumbnail ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 04 · BEFORE → AFTER ════════════════════════════════════════════ */}
        <section style={{ background: "lab(95.3645% .915945 2.88142)", padding: "4rem 0", color: "#000" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2.2fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.4em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>04 · Transformation</p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.05, textTransform: "uppercase", margin: 0, color: "#000" }}>
                Before Vision.<br />After <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Execution.</span>
              </h2>
              <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", lineHeight: 1.75, color: "#444" }}>
                Drag the slider to witness the complete transformation. Every project tells a story of precision and craftsmanship.
              </p>

              {/* metrics card */}
              <div style={{ marginTop: "2rem", border: "1px solid rgba(0,0,0,0.1)", background: "#FFFFFF", padding: "1.5rem" }}>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "1.2rem", textTransform: "uppercase", margin: "0 0 0.25rem", color: "#111" }}>Green Vista Villas</p>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#666", marginBottom: "1.25rem" }}>Hyderabad</p>
                {[
                  { Icon: Ruler,        l: "Project Area", v: "45,000 Sq.ft." },
                  { Icon: Clock,        l: "Duration",     v: "12 Months" },
                  { Icon: TrendingUp,   l: "Efficiency",   v: "18% Saved" },
                  { Icon: CheckCircle2, l: "Delivery",     v: "On-Time" },
                ].map(m => (
                  <div key={m.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "0.75rem", marginBottom: "0.75rem", fontSize: "0.8125rem", color: "#111" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#666" }}><m.Icon size={14} style={{ color: "#6B5C3E" }} />{m.l}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6875rem", fontWeight: 600 }}>{m.v}</span>
                  </div>
                ))}
                <button onClick={() => setIsStoryOpen(true)}
                  style={{ width: "100%", marginTop: "0.5rem", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", border: "1px solid #6B5C3E", padding: "0.625rem 1rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.25em", color: "#6B5C3E", textTransform: "uppercase", background: "transparent", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#6B5C3E"; e.currentTarget.style.color = "#FFFFFF"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6B5C3E"; }}
                >
                  Full Story <ArrowRight size={12} />
                </button>
              </div>
            </div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <BeforeAfter
                before={<img src={beforeImg} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                after={<img src={afterImg} alt="After" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                beforeLabel="Before" afterLabel="After"
              />
              <p style={{ marginTop: "1rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.3em", textAlign: "center", color: "#444", textTransform: "uppercase" }}>← Drag slider to compare →</p>
            </motion.div>
          </div>
        </section>

        {/* ══ 05 · PROCESS ═══════════════════════════════════════════════════ */}
        <section style={{ background: "var(--background)", padding: "6rem 0" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2.2fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.4em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>05 · Project Story</p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.05, textTransform: "uppercase", margin: 0 }}>
                Our Process.<br />Your <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Success.</span>
              </h2>
              <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", lineHeight: 1.75, color: "var(--muted-foreground)", maxWidth: 340 }}>
                A transparent four-stage approach ensuring every project is delivered with clarity, confidence, and craftsmanship.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 1, background: "color-mix(in oklch, var(--border) 20%, transparent)" }}>
              {STEPS.map((s, i) => (
                <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ padding: "2rem", background: "var(--card)", transition: "background 0.3s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--surface-1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--card)"}
                >
                  <div style={{ width: 48, height: 48, display: "grid", placeItems: "center", border: "1px solid color-mix(in oklch, var(--accent) 30%, transparent)", background: "color-mix(in oklch, var(--accent) 8%, transparent)", color: "var(--accent)", marginBottom: "1.25rem" }}>
                    <s.Icon size={20} />
                  </div>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.5rem" }}>{s.n}</p>
                  <p style={{ fontSize: "0.8125rem", lineHeight: 1.75, color: "var(--muted-foreground)", margin: 0 }}>{s.t}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 06 · IMPACT METRICS ════════════════════════════════════════════ */}
        <section style={{ background: "lab(95.3645% .915945 2.88142)", padding: "6rem 0", color: "#000" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2.2fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.4em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>06 · Our Impact</p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.05, textTransform: "uppercase", margin: 0, color: "#000" }}>
                Numbers That<br />Build <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Trust.</span>
              </h2>
              <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", lineHeight: 1.75, color: "#444", maxWidth: 300 }}>
                Every metric is a testament to our commitment to precision, delivery, and client satisfaction.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 1, background: "color-mix(in oklch, var(--border) 20%, transparent)" }}>
              {STATS.map((s, i) => (
                <motion.div key={s.l} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2.5rem 1rem", background: "var(--card)", textAlign: "center", transition: "background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--surface-1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--card)"}
                >
                  <s.Icon size={28} style={{ color: "var(--accent)", marginBottom: "1.25rem" }} strokeWidth={1.2} />
                  <p style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 600, color: "var(--accent)", margin: 0 }}>{s.v}</p>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted-foreground)", marginTop: "0.75rem" }}>{s.l}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 07 · TESTIMONIALS ══════════════════════════════════════════════ */}
        <section style={{ background: "var(--background)", padding: "6rem 0" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.4em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "0.75rem" }}>07 · Client Voices</p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.05, textTransform: "uppercase", margin: 0 }}>
                Stories of<br /><span style={{ color: "var(--accent)", fontStyle: "italic" }}>Transformation.</span>
              </h2>
              <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", lineHeight: 1.75, color: "var(--muted-foreground)", maxWidth: 320 }}>
                Real reviews tied to real projects. Every testimonial represents a delivered promise.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
                {[ChevronLeft, ChevronRight].map((Icon, j) => (
                  <button key={j} onClick={() => setActive(p => j === 0 ? (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length : (p + 1) % TESTIMONIALS.length)}
                    style={{ width: 44, height: 44, border: "1px solid var(--border)", display: "grid", placeItems: "center", background: "transparent", color: "var(--muted-foreground)", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted-foreground)"; }}
                  ><Icon size={16} /></button>
                ))}
              </div>
            </div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45 }}
                  style={{ border: "1px solid var(--border)", background: "var(--card)", padding: "2rem" }}>
                  <div style={{ position: "relative", aspectRatio: "16/6", overflow: "hidden", marginBottom: "1.5rem" }}>
                    <img src={TESTIMONIALS[active].img} alt="Project" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--card), transparent)" }} />
                    <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)", margin: 0 }}>{TESTIMONIALS[active].project}</p>
                    </div>
                  </div>
                  <Quote size={28} style={{ color: "color-mix(in oklch, var(--accent) 25%, transparent)", marginBottom: "1rem" }} strokeWidth={1} />
                  <p style={{ fontSize: "1rem", lineHeight: 1.7, fontStyle: "italic", color: "color-mix(in oklch, var(--foreground) 90%, transparent)", marginBottom: "1.5rem" }}>
                    "{TESTIMONIALS[active].quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderTop: "1px solid color-mix(in oklch, var(--border) 30%, transparent)", paddingTop: "1.25rem" }}>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      {Array.from({ length: TESTIMONIALS[active].stars }).map((_, j) => (
                        <Star key={j} size={12} style={{ color: "var(--accent)", fill: "var(--accent)" }} />
                      ))}
                    </div>
                    <div>
                      <p style={{ fontFamily: "Fraunces, serif", fontSize: "1rem", margin: 0 }}>{TESTIMONIALS[active].name}</p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: 0 }}>{TESTIMONIALS[active].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* dots */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", justifyContent: "center" }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    style={{ height: 3, width: i === active ? 32 : 12, background: i === active ? "var(--accent)" : "var(--border)", border: "none", cursor: "pointer", transition: "all 0.4s", padding: 0 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 08 · SIGNATURE PROJECT ═════════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center", padding: 0 }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <img src={signatureImg} alt="Signature" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.28, filter: "grayscale(1)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--background) 45%, color-mix(in oklch, var(--background) 60%, transparent))" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--background) 0%, transparent 40%)" }} />
          </div>
          {/* blueprint */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }}>
            <defs>
              <pattern id="sg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="var(--accent)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sg)" />
          </svg>

          <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "8rem 2.5rem", width: "100%" }}>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.4em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "1rem" }}>
              08 · Signature Project
            </motion.p>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.15 }}
              style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, textTransform: "uppercase", maxWidth: 700, margin: 0 }}>
              Every Landmark<br />Starts With a <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Vision.</span>
            </motion.h2>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.3 }}
              style={{ marginTop: "1.5rem", maxWidth: 440, fontSize: "0.875rem", lineHeight: 1.75, color: "var(--muted-foreground)" }}>
              From concept to completion, we transform ideas into enduring architecture that defines skylines and inspires generations.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.45 }}
              style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              <Link to="/inquiry"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "var(--accent)", padding: "1rem 2rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", color: "var(--accent-foreground)", textTransform: "uppercase", textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Start Your Project <ArrowRight size={14} />
              </Link>
              <Link to="/live-project"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: "1px solid var(--accent)", padding: "1rem 2rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6875rem", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--accent-foreground)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
              >
                View Live Studio <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* footer */}
        <footer style={{ borderTop: "1px solid var(--border)", background: "var(--card)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "Fraunces, serif", fontSize: "1.2rem", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>CHV</p>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "var(--muted-foreground)", textTransform: "uppercase", margin: 0 }}>Constructions</p>
            </div>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", letterSpacing: "0.25em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>© 2026 · All Rights Reserved</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
