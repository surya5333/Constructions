import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "../../lib/useIsMobile";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/live-project", label: "Studio" }
];

export function SiteNav() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change or resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const fg = "#fff"; // Enforce pure white aesthetic for cinematic dark mode

  return (
    <>
      <motion.header
        animate={{ 
          background: navSolid ? "rgba(0,0,0,0.85)" : "transparent", 
          backdropFilter: navSolid ? "blur(16px)" : "none",
          borderBottom: navSolid ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent"
        }}
        transition={{ duration: 0.35 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: isMobile ? "1rem 1.25rem" : "1.5rem 2.5rem", 
          display: "flex", justifyContent: "space-between", alignItems: "center",
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
        
        {!isMobile && (
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
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: menuOpen ? '0px' : '5px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '36px',
              height: '36px',
              position: 'relative',
              zIndex: 110,
            }}
          >
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: fg,
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'rotate(45deg) translateY(0px)' : 'none',
              position: menuOpen ? 'absolute' : 'relative',
            }} />
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: fg,
              transition: 'all 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: fg,
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'rotate(-45deg) translateY(0px)' : 'none',
              position: menuOpen ? 'absolute' : 'relative',
            }} />
          </button>
        )}
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {links.map((item, i) => {
              const active = location.pathname === item.to;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-serif), serif",
                      fontWeight: 400,
                      fontSize: '1.8rem',
                      letterSpacing: '0.15em',
                      color: active ? fg : 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <Link
                to="/inquiry"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontWeight: 400,
                  fontSize: '0.72rem',
                  letterSpacing: '0.28em',
                  color: '#000',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  background: fg,
                  padding: '1rem 2.5rem',
                  display: 'inline-block',
                }}
              >
                Inquire
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
