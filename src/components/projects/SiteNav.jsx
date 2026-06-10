import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
   { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/live-project", label: "Studio" }

];

export function SiteNav() {
  const [navSolid, setNavSolid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fg = "#fff"; // Enforce pure white aesthetic for cinematic dark mode

  return (
    <motion.header
      animate={{ 
        background: navSolid ? "rgba(0,0,0,0.85)" : "transparent", 
        backdropFilter: navSolid ? "blur(16px)" : "none",
        borderBottom: navSolid ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent"
      }}
      transition={{ duration: 0.35 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--font-mono), monospace", color: fg
      }}
    >
      <Link to="/" style={{ color: fg, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "36px", height: "36px", border: `1px solid ${fg}`, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-serif), serif", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1
        }}>
          C
        </div>
        <div>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", lineHeight: 1.2 }}>CHV</div>
          <div style={{ fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5 }}>Construct</div>
        </div>
      </Link>
      <div style={{ display: "flex", gap: "2.5rem", fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", alignItems: "center" }}>
        {links.map(l => {
          const active = location.pathname === l.to;
          return (
            <Link key={l.label} to={l.to} style={{ 
              color: active ? fg : "rgba(255,255,255,0.4)", 
              textDecoration: "none",
              transition: "color 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.color = fg}
            onMouseLeave={e => { if(!active) e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              {l.label}
            </Link>
          );
        })}
        <Link to="/inquiry" style={{
          marginLeft: "1rem", border: `1px solid ${fg}`, padding: "0.625rem 1.25rem", color: fg, textDecoration: "none", transition: "all 0.2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.background = fg; e.currentTarget.style.color = "#000"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = fg; }}
        >
          Inquire
        </Link>
      </div>
    </motion.header>
  );
}
