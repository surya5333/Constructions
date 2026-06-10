import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Radio } from "lucide-react";

export default function Live() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        zIndex: 0,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: "52px",
          background: "rgba(5,5,5,0.96)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Left — back */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "#A1A1A1",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1A1")}
        >
          <ArrowLeft size={13} />
          Back
        </Link>

        {/* Center — brand + live badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "1rem",
              letterSpacing: "0.2em",
              color: "#F5F5F5",
              textTransform: "uppercase",
            }}
          >
            CHV Studio
          </span>

          {/* Live pill */}
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(200,155,90,0.12)",
              border: "1px solid rgba(200,155,90,0.3)",
              borderRadius: "100px",
              padding: "3px 10px",
            }}
          >
            <Radio size={9} color="#C89B5A" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.28em",
                color: "#C89B5A",
                textTransform: "uppercase",
              }}
            >
              Live
            </span>
          </motion.div>
        </div>

        {/* Right — open external */}
        <a
          href="http://localhost:8080/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            textDecoration: "none",
            color: "#A1A1A1",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C89B5A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1A1")}
        >
          Open Full
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Loading shimmer */}
      {!loaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          style={{
            position: "absolute",
            inset: "52px 0 0 0",
            background: "#050505",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            zIndex: 5,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid rgba(200,155,90,0.15)",
              borderTop: "2px solid #C89B5A",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              color: "#A1A1A1",
              textTransform: "uppercase",
            }}
          >
            Loading Studio
          </span>
        </motion.div>
      )}

      {/* iframe */}
      <iframe
        src="http://localhost:8080/"
        title="CHV Studio — Journey Reveal Space"
        onLoad={() => setLoaded(true)}
        style={{
          flex: 1,
          border: "none",
          width: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
        allow="fullscreen"
      />
    </div>
  );
}
