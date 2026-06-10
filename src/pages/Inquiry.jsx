import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { 
  ArrowRight, CheckCircle2, ChevronRight, ChevronLeft,
  MapPin, Clock, User, Mail, Phone,
  Home, Building2, Layers, Paintbrush, Factory, PenTool,
  Send, Sparkles, Award, Globe, Quote, Star, ArrowDown,
  Cpu, Shield, Zap
} from "lucide-react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

/* ─────────────────────────── DATA ─────────────────────────── */

const PROJECT_TYPES = [
  { id: "residential", label: "Residential", icon: Home, description: "Luxury homes, villas & bungalows", accent: "#C89B5A" },
  { id: "commercial", label: "Commercial", icon: Building2, description: "Office towers & retail spaces", accent: "#C89B5A" },
  { id: "renovation", label: "Renovation", icon: Layers, description: "Architectural restoration", accent: "#C89B5A" },
  { id: "interior", label: "Interior Design", icon: Paintbrush, description: "Bespoke interior environments", accent: "#C89B5A" },
  { id: "industrial", label: "Industrial", icon: Factory, description: "Large-scale facilities", accent: "#C89B5A" },
  { id: "custom", label: "Custom Project", icon: PenTool, description: "Unique vision & requirements", accent: "#C89B5A" },
];

const STYLES = [
  { id: "modern", label: "Modern", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=900" },
  { id: "luxury", label: "Luxury", img: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "minimalist", label: "Minimalist", img: "https://plus.unsplash.com/premium_photo-1671269941569-7841144ee4e0?q=80&w=693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "contemporary", label: "Contemporary", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=900" },
  { id: "industrial_style", label: "Industrial", img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=900" },
];

const PROCESS_STEPS = [
  { step: "01", title: "Inquiry", desc: "Your vision is received and reviewed by our senior partners within 24 hours.", icon: Send },
  { step: "02", title: "Consultation", desc: "A strategic discovery call to define scope, goals, feasibility and first plans.", icon: Phone },
  { step: "03", title: "Site Evaluation", desc: "Expert on-site visit and in-depth technical structural assessment.", icon: MapPin },
  { step: "04", title: "Design & Plan", desc: "Full architectural drafting, material selection, and detailed project roadmap.", icon: Cpu },
  { step: "05", title: "Execution", desc: "Precision construction — transforming blueprint into a physical landmark.", icon: Shield },
];

const TESTIMONIALS = [
  {
    name: "Vikram Reddy",
    role: "Commercial Developer, Hyderabad",
    quote: "Their attention to structural integrity and architectural aesthetic is unmatched. A true partner in luxury construction. The team delivered beyond every benchmark we set.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    project: "Zenith Corporate Tower",
    rating: 5,
  },
  {
    name: "Ananya Sharma",
    role: "Villa Owner, Bangalore",
    quote: "CHV didn't just build a house — they crafted a masterpiece our family will cherish for generations. Every detail, every corner was handled with precision and artistry.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    project: "Private Villa, Whitefield",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    role: "Hospitality Group Director",
    quote: "From the inquiry to handover, the process was flawless. CHV's command over timelines and quality assurance is at a level I've never experienced with any firm.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    project: "The Grand Retreat Hotel",
    rating: 5,
  },
];

const STATS = [
  { value: "25+", label: "Projects Completed", icon: Award },
  { value: "12", label: "Years Experience", icon: Zap },
  { value: "8", label: "Cities Served", icon: Globe },
  { value: "98%", label: "Client Satisfaction", icon: Sparkles },
];

const FORM_STEPS = ["Discovery", "Vision", "Details", "Submit"];

/* ─────────────────────────── ANIMATED COUNTER ─────────────────────────── */
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = numericTarget / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numericTarget]);

  return (
    <span ref={ref}>
      {count}{suffix || target.replace(/[0-9.]/g, "")}
    </span>
  );
}

/* ─────────────────────────── BLUEPRINT SVG ─────────────────────────── */
function BlueprintLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Grid */}
      <defs>
        <pattern id="bp-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(200,155,90,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-grid)" />

      {/* Animated architectural lines */}
      {[
        "M 200 100 L 800 100 L 800 600 L 200 600 Z",
        "M 300 150 L 700 150 L 700 550 L 300 550 Z",
        "M 200 100 L 300 150",
        "M 800 100 L 700 150",
        "M 200 600 L 300 550",
        "M 800 600 L 700 550",
        "M 500 100 L 500 600",
        "M 200 350 L 800 350",
        "M 900 200 L 1200 200 L 1200 700 L 900 700 Z",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="rgba(200,155,90,0.12)"
          strokeWidth="0.8"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3 + i * 0.4, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}

      {/* Corner markers */}
      {[[200, 100], [800, 100], [200, 600], [800, 600]].map(([x, y], i) => (
        <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 + i * 0.15 }}>
          <circle cx={x} cy={y} r="3" fill="rgba(200,155,90,0.4)" />
          <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(200,155,90,0.15)" strokeWidth="0.5" />
        </motion.g>
      ))}

      {/* Dimension lines */}
      <motion.text
        x="500" y="80" textAnchor="middle"
        fontFamily="monospace" fontSize="10" fill="rgba(200,155,90,0.3)" letterSpacing="4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
      >
        ← 600 UNITS →
      </motion.text>
    </svg>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */
export default function Inquiry() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    projectType: "", style: "",
    name: "", email: "", phone: "", location: "",
    budget: "", size: "", timeline: "", requirements: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.92]);
  const heroY = useTransform(heroScroll, [0, 0.6], [0, 60]);

  const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;
  const nextStep = () => setCurrentStep(p => Math.min(p + 1, FORM_STEPS.length - 1));
  const prevStep = () => setCurrentStep(p => Math.max(p - 1, 0));

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#050505", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "2rem", textAlign: "center", padding: "2rem" }}>
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
          <CheckCircle2 size={64} color="#C89B5A" strokeWidth={1} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ space: "1rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.38em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "1rem" }}>Inquiry Submitted</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 6vw, 4rem)", color: "#F5F5F5", lineHeight: 1.2, marginBottom: "1.5rem" }}>Your Journey<br />Has Begun.</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#A1A1A1", fontSize: "1rem", maxWidth: "480px", lineHeight: 1.7, marginBottom: "2.5rem" }}>Our senior partners will review your vision and reach out within 24 hours to begin the consultation.</p>
          <button
            onClick={() => { setSubmitted(false); setCurrentStep(0); }}
            style={{ background: "transparent", border: "1px solid rgba(200,155,90,0.4)", color: "#C89B5A", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", padding: "0.9rem 2rem", cursor: "pointer" }}
          >
            Back to Inquiry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "#050505", color: "#F5F5F5", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <Navbar theme="dark" />

      {/* ══════════════════════════════════════════
          SECTION 01 · HERO
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      >
        {/* Blueprint BG */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <BlueprintLines />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(200,155,90,0.04) 0%, transparent 70%)" }} />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="inquiry-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "900px", padding: "0 2rem" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.45em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "2rem" }}
            >
              Commence Your Journey
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "2rem", color: "#F5F5F5" }}
            >
              Every Great Project<br />Begins With A{" "}
              <em style={{ color: "#E4BC7A", fontStyle: "italic" }}>Conversation.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
              style={{ color: "#A1A1A1", fontSize: "1.1rem", maxWidth: "580px", margin: "0 auto 3rem", lineHeight: 1.75, fontWeight: 300 }}
            >
              Tell us your vision, goals, and requirements. Our team will transform your ideas into a detailed construction plan.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
              onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "#C89B5A", color: "#050505", border: "none",
                fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase",
                padding: "1.1rem 3rem", cursor: "pointer", position: "relative", overflow: "hidden",
              }}
            >
              Start Your Inquiry
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.4em", color: "#A1A1A1", textTransform: "uppercase" }}>Scroll</p>
          <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, #C89B5A, transparent)" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 02 · PROJECT TYPE SELECTION
      ══════════════════════════════════════════ */}
      <section style={{ padding: "8rem 2rem", background: "#0A0A0A" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: "5rem", textAlign: "center" }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.42em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "1.25rem" }}>Step 01</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15, marginBottom: "1rem" }}>What are we building?</h2>
            <p style={{ color: "#A1A1A1", fontSize: "1rem", fontWeight: 300 }}>Select the category that best fits your vision.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.04)" }}>
            {PROJECT_TYPES.map((type, i) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onClick={() => setFormData({ ...formData, projectType: type.id })}
                whileHover={{ y: -2 }}
                style={{
                  background: formData.projectType === type.id ? "rgba(200,155,90,0.08)" : "#111111",
                  border: "none",
                  borderLeft: formData.projectType === type.id ? "3px solid #C89B5A" : "3px solid transparent",
                  padding: "2.5rem 2rem",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  position: "relative",
                }}
              >
                <type.icon
                  size={28}
                  color={formData.projectType === type.id ? "#C89B5A" : "#555"}
                  strokeWidth={1}
                  style={{ marginBottom: "1.25rem", transition: "color 0.4s" }}
                />
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#F5F5F5", marginBottom: "0.5rem" }}>{type.label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A1A1A1", fontWeight: 300, lineHeight: 1.6 }}>{type.description}</p>
                {formData.projectType === type.id && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: "absolute", top: "1.25rem", right: "1.25rem" }}>
                    <CheckCircle2 size={18} color="#C89B5A" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {formData.projectType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}
            >
              <button
                onClick={() => document.getElementById("vision-section")?.scrollIntoView({ behavior: "smooth" })}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "transparent", border: "1px solid rgba(200,155,90,0.3)", color: "#C89B5A", padding: "0.9rem 2.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}
              >
                Continue <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 03 · PROJECT VISION BUILDER
      ══════════════════════════════════════════ */}
      <section id="vision-section" style={{ padding: "8rem 2rem", background: "#050505" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: "5rem", textAlign: "center" }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.42em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "1.25rem" }}>Step 02</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15, marginBottom: "1rem" }}>Define your aesthetic.</h2>
            <p style={{ color: "#A1A1A1", fontSize: "1rem", fontWeight: 300 }}>Which architectural language resonates with your vision?</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {STYLES.map((style, i) => (
              <motion.button
                key={style.id}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onClick={() => setFormData({ ...formData, style: style.id })}
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  border: formData.style === style.id ? "2px solid #C89B5A" : "2px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  background: "transparent",
                  transition: "border-color 0.4s ease",
                }}
              >
                <img
                  src={style.img} alt={style.label}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: formData.style === style.id ? 0.7 : 0.35, transition: "opacity 0.5s, transform 0.8s", transform: formData.style === style.id ? "scale(1.05)" : "scale(1)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem", textAlign: "left" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#F5F5F5", letterSpacing: "0.02em" }}>{style.label}</p>
                </div>
                {formData.style === style.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                    <CheckCircle2 size={20} color="#C89B5A" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 04 + 05 · FORM + VISUALIZATION
      ══════════════════════════════════════════ */}
      <section id="inquiry-form" style={{ padding: "8rem 2rem", background: "#0A0A0A" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: "5rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.42em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Step 03 — {FORM_STEPS[currentStep]}
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.15 }}>Project Details</h2>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.5rem", color: "#C89B5A", letterSpacing: "0.05em" }}>
                {Math.round(progress)}%
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", borderRadius: "1px" }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ height: "100%", background: "linear-gradient(to right, #C89B5A, #E4BC7A)", borderRadius: "1px" }}
              />
            </div>
          </motion.div>

          {/* Two-col layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr min(440px, 100%)", gap: "5rem", alignItems: "start" }}>
            {/* FORM STEPS */}
            <div style={{ minHeight: "520px" }}>
              <AnimatePresence mode="wait">
                {/* STEP 0 — Personal */}
                {currentStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.75rem" }}>Tell us who you are.</h3>
                    <p style={{ color: "#A1A1A1", fontWeight: 300, marginBottom: "3rem", lineHeight: 1.7 }}>Start by sharing a few details so we can personalise your experience.</p>
                    <div style={{ display: "grid", gap: "2.5rem" }}>
                      {[
                        { label: "Full Name", icon: User, key: "name", type: "text", placeholder: "Johnathan Doe" },
                        { label: "Email Address", icon: Mail, key: "email", type: "email", placeholder: "john@example.com" },
                        { label: "Phone Number", icon: Phone, key: "phone", type: "tel", placeholder: "+91 000 000 0000" },
                        { label: "Project Location", icon: MapPin, key: "location", type: "text", placeholder: "City, Area" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.32em", color: "#A1A1A1", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                            <field.icon size={11} /> {field.label}
                          </label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.key]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "0.8rem 0", color: "#F5F5F5", fontFamily: "'Inter', sans-serif", fontSize: "1rem", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
                            onFocus={(e) => e.target.style.borderBottomColor = "#C89B5A"}
                            onBlur={(e) => e.target.style.borderBottomColor = "rgba(255,255,255,0.1)"}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: "3rem" }}>
                      <button
                        onClick={nextStep}
                        style={{ background: "#C89B5A", color: "#050505", border: "none", padding: "1rem 2.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", cursor: "pointer" }}
                      >
                        Continue →
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 1 — Budget & Scale */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.75rem" }}>Scope & scale.</h3>
                    <p style={{ color: "#A1A1A1", fontWeight: 300, marginBottom: "3rem", lineHeight: 1.7 }}>Help us understand the investment and scale of your project.</p>
                    <div style={{ display: "grid", gap: "2.5rem" }}>
                      {[
                        { label: "Estimated Budget", key: "budget", type: "text", placeholder: "e.g. ₹50L – ₹1Cr" },
                        { label: "Project Size (Sq. Ft.)", key: "size", type: "text", placeholder: "e.g. 2400" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.32em", color: "#A1A1A1", textTransform: "uppercase", marginBottom: "0.75rem", display: "block" }}>{field.label}</label>
                          <input
                            type={field.type} placeholder={field.placeholder}
                            value={formData[field.key]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "0.8rem 0", color: "#F5F5F5", fontFamily: "'Inter', sans-serif", fontSize: "1rem", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" }}
                            onFocus={(e) => e.target.style.borderBottomColor = "#C89B5A"}
                            onBlur={(e) => e.target.style.borderBottomColor = "rgba(255,255,255,0.1)"}
                          />
                        </div>
                      ))}
                      <div>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.32em", color: "#A1A1A1", textTransform: "uppercase", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Clock size={11} /> Expected Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          style={{ width: "100%", background: "#111", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "0.8rem 0", color: formData.timeline ? "#F5F5F5" : "#555", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", outline: "none", cursor: "pointer" }}
                        >
                          <option value="" style={{ background: "#111" }}>Select duration</option>
                          <option value="immediate" style={{ background: "#111" }}>Immediate (within 1 month)</option>
                          <option value="3-6-months" style={{ background: "#111" }}>3 – 6 Months</option>
                          <option value="6-12-months" style={{ background: "#111" }}>6 – 12 Months</option>
                          <option value="planning" style={{ background: "#111" }}>Planning Stage</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
                      <button onClick={prevStep} style={{ background: "transparent", border: "none", color: "#A1A1A1", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <ChevronLeft size={12} /> Back
                      </button>
                      <button onClick={nextStep} style={{ background: "#C89B5A", color: "#050505", border: "none", padding: "1rem 2.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", cursor: "pointer" }}>
                        Continue →
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 — Requirements */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.75rem" }}>The master plan.</h3>
                    <p style={{ color: "#A1A1A1", fontWeight: 300, marginBottom: "3rem", lineHeight: 1.7 }}>Anything else we should know? Special requirements, inspirations, or constraints.</p>
                    <textarea
                      rows={7}
                      placeholder="Tell us about specific needs, materials, sustainability goals, or design inspirations..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      style={{ width: "100%", background: "#111111", border: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem", color: "#F5F5F5", fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", outline: "none", resize: "none", lineHeight: 1.7, boxSizing: "border-box", transition: "border-color 0.3s" }}
                      onFocus={(e) => e.target.style.borderColor = "rgba(200,155,90,0.4)"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.06)"}
                    />
                    <div style={{ marginTop: "2rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
                      <button onClick={prevStep} style={{ background: "transparent", border: "none", color: "#A1A1A1", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <ChevronLeft size={12} /> Back
                      </button>
                      <button onClick={nextStep} style={{ background: "#C89B5A", color: "#050505", border: "none", padding: "1rem 2.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", cursor: "pointer" }}>
                        Review & Submit →
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 — Review */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.75rem" }}>Review & submit.</h3>
                    <p style={{ color: "#A1A1A1", fontWeight: 300, marginBottom: "2.5rem", lineHeight: 1.7 }}>Confirm your details before we begin the journey together.</p>

                    <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)", padding: "2rem", display: "grid", gap: "1.25rem", marginBottom: "2rem" }}>
                      {[
                        { label: "Name", value: formData.name },
                        { label: "Email", value: formData.email },
                        { label: "Phone", value: formData.phone },
                        { label: "Location", value: formData.location },
                        { label: "Project Type", value: formData.projectType },
                        { label: "Style", value: formData.style },
                        { label: "Budget", value: formData.budget },
                        { label: "Size", value: formData.size },
                        { label: "Timeline", value: formData.timeline },
                      ].filter(f => f.value).map((f) => (
                        <div key={f.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "0.75rem" }}>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", color: "#A1A1A1", textTransform: "uppercase" }}>{f.label}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#F5F5F5", textTransform: "capitalize" }}>{f.value}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                      <button onClick={prevStep} style={{ background: "transparent", border: "none", color: "#A1A1A1", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <ChevronLeft size={12} /> Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "#C89B5A", color: "#050505", border: "none", padding: "1.1rem 2.5rem", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", cursor: "pointer" }}
                      >
                        Submit Inquiry <Send size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* VISUALIZATION PANEL */}
            <div style={{ position: "sticky", top: "7rem" }}>
              <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "#111" }}>
                {/* Blueprint overlay */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12, zIndex: 2 }} viewBox="0 0 400 500">
                  <defs>
                    <pattern id="v-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,155,90,1)" strokeWidth="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#v-grid)" />
                  {["M 50 50 L 350 50 L 350 450 L 50 450 Z", "M 50 250 L 350 250", "M 200 50 L 200 450"].map((d, i) => (
                    <motion.path key={i} d={d} stroke="rgba(200,155,90,1)" strokeWidth="0.6" fill="none"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 5 }} />
                  ))}
                </svg>

                {/* Photo */}
                <motion.img
                  src={formData.style ? STYLES.find(s => s.id === formData.style)?.img : "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=900"}
                  alt="Project visualization"
                  animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, transparent 40%, rgba(5,5,5,0.8) 100%)", zIndex: 1 }} />

                {/* Top info */}
                <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", right: "1.5rem", zIndex: 3 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.38em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "0.75rem" }}>Live Visualization</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {[formData.projectType, formData.style].filter(Boolean).map(tag => (
                      <span key={tag} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", padding: "0.3rem 0.75rem", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#F5F5F5" }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom caption */}
                <div style={{ position: "absolute", bottom: "1.75rem", left: "1.75rem", right: "1.75rem", zIndex: 3 }}>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", lineHeight: 1.3, marginBottom: "0.5rem" }}>Your Vision,<br />Our Engineering.</h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#A1A1A1", lineHeight: 1.65, fontWeight: 300 }}>Every detail you share shapes the blueprint of your future landmark.</p>
                </div>
              </div>

              {/* Mini stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.04)", marginTop: "1px" }}>
                {[{ icon: Award, v: "25+", l: "Projects" }, { icon: Sparkles, v: "98%", l: "Satisfaction" }].map((s, i) => (
                  <div key={i} style={{ background: "#0A0A0A", padding: "1.5rem", textAlign: "center" }}>
                    <s.icon size={16} color="#C89B5A" strokeWidth={1} style={{ marginBottom: "0.75rem" }} />
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "0.25rem" }}>{s.v}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", color: "#A1A1A1", textTransform: "uppercase" }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 06 · WHY TRUST US — STATS
      ══════════════════════════════════════════ */}
      <section style={{ padding: "8rem 2rem", background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.42em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "1.25rem" }}>Why Choose CHV</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15 }}>Numbers that speak.</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#050505", padding: "3.5rem 2rem", textAlign: "center" }}
              >
                <stat.icon size={24} color="#C89B5A" strokeWidth={1} style={{ marginBottom: "1.5rem" }} />
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", color: "#F5F5F5", marginBottom: "0.5rem", lineHeight: 1 }}>
                  <AnimatedCounter target={stat.value} />
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", color: "#A1A1A1", textTransform: "uppercase" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 07 · CONSULTATION PROCESS
      ══════════════════════════════════════════ */}
      <section style={{ padding: "8rem 2rem", background: "#0A0A0A" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "6rem" }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.42em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "1.25rem" }}>After You Submit</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.15, marginBottom: "1rem" }}>Our Consultation Process</h2>
            <div style={{ width: "60px", height: "1px", background: "#C89B5A", margin: "0 auto" }} />
          </motion.div>

          {/* Vertical process timeline */}
          <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: "1.75rem", top: "2rem", bottom: "2rem", width: "1px", background: "linear-gradient(to bottom, #C89B5A, transparent)" }} />

            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
                style={{ display: "flex", gap: "2.5rem", marginBottom: "3.5rem", alignItems: "flex-start" }}
              >
                {/* Step dot */}
                <div style={{ position: "relative", flexShrink: 0, width: "3.5rem", height: "3.5rem", border: "1px solid rgba(200,155,90,0.3)", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                  <p.icon size={16} color="#C89B5A" strokeWidth={1} />
                </div>
                <div style={{ paddingTop: "0.75rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.42em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "0.4rem" }}>Step {p.step}</p>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", marginBottom: "0.5rem" }}>{p.title}</h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#A1A1A1", lineHeight: 1.7, fontWeight: 300 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 08 · TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section style={{ padding: "8rem 2rem", background: "#050505", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "6rem", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.42em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "1.25rem" }}>Client Voices</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.2, marginBottom: "1.5rem" }}>Trusted by Visionaries.</h2>
              <p style={{ color: "#A1A1A1", fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.7, marginBottom: "2.5rem" }}>Hear from clients who have witnessed their architectural dreams come to life.</p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => setActiveTestimonial(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  style={{ width: "46px", height: "46px", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#A1A1A1" }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length)}
                  style={{ width: "46px", height: "46px", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#A1A1A1" }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.05)", padding: "3rem" }}
                >
                  <Quote size={36} color="rgba(200,155,90,0.2)" strokeWidth={1} style={{ marginBottom: "1.5rem" }} />
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#F5F5F5", lineHeight: 1.7, marginBottom: "2rem", fontStyle: "italic" }}>
                    "{TESTIMONIALS[activeTestimonial].quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
                    <img src={TESTIMONIALS[activeTestimonial].img} alt={TESTIMONIALS[activeTestimonial].name}
                      style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", filter: "grayscale(0.5)" }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>{TESTIMONIALS[activeTestimonial].name}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#A1A1A1", textTransform: "uppercase" }}>{TESTIMONIALS[activeTestimonial].role}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "0.3rem" }}>{TESTIMONIALS[activeTestimonial].project}</p>
                      <div style={{ display: "flex", gap: "3px", justifyContent: "flex-end" }}>
                        {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                          <Star key={i} size={10} color="#C89B5A" fill="#C89B5A" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem", justifyContent: "center" }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    style={{ width: i === activeTestimonial ? "24px" : "8px", height: "3px", background: i === activeTestimonial ? "#C89B5A" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.4s ease", padding: 0, borderRadius: "2px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 09 · FINAL CTA
      ══════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <motion.img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400"
            alt="Architecture"
            animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "grayscale(0.3)" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.6) 50%, #050505 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "900px", padding: "0 2rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.42em", color: "#C89B5A", textTransform: "uppercase", marginBottom: "1.75rem" }}
          >
            Begin Today
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.75rem" }}
          >
            Let's Build Something{" "}
            <em style={{ color: "#E4BC7A", fontStyle: "italic" }}>Remarkable.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            style={{ color: "#A1A1A1", fontSize: "1.1rem", fontWeight: 300, maxWidth: "560px", margin: "0 auto 3rem", lineHeight: 1.75 }}
          >
            Whether it's a new build, renovation, or custom vision — our team is ready to bring your landmark to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <button
              onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#C89B5A", color: "#050505", border: "none", padding: "1.1rem 2.75rem", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", cursor: "pointer" }}
            >
              Submit Inquiry
            </button>
            <button
              style={{ background: "transparent", color: "#F5F5F5", border: "1px solid rgba(255,255,255,0.15)", padding: "1.1rem 2.75rem", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", cursor: "pointer" }}
            >
              Schedule Consultation
            </button>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
