import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import useIsMobile from '../lib/useIsMobile'

export default function Navbar({ theme = 'dark' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change or resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Studio', path: '/live-project' },
  ]

  const linkColor = (theme === 'light' && !scrolled) ? 'rgba(255,255,255,0.9)' : '#3D3D3A'
  const logoColor = (theme === 'light' && !scrolled) ? '#FFF' : '#1A1A18'
  const logoSubColor = (theme === 'light' && !scrolled) ? 'rgba(255,255,255,0.7)' : '#8A8A85'

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isMobile ? '0 1.25rem' : '0 4.5rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
          background: scrolled ? 'rgba(245,245,243,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(26,26,24,0.1)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', flexDirection: 'column', gap: '2px', textDecoration: 'none' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: '1.35rem',
            letterSpacing: '0.18em',
            color: logoColor,
            lineHeight: 1,
            textTransform: 'uppercase',
            transition: 'color 0.5s ease',
          }}>
            CHV
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: '0.58rem',
            letterSpacing: '0.32em',
            color: logoSubColor,
            textTransform: 'uppercase',
            lineHeight: 1,
            transition: 'color 0.5s ease',
          }}>
            Construct
          </span>
        </Link>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: '3.5rem', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                target={item.target}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  color: linkColor,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.target.style.color = (theme === 'light' && !scrolled) ? '#FFF' : '#1A1A18'}
                onMouseLeave={e => e.target.style.color = linkColor}
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/inquiry"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '0.68rem',
                letterSpacing: '0.22em',
                color: (theme === 'light' && !scrolled) ? '#FFF' : '#111111',
                textDecoration: 'none',
                textTransform: 'uppercase',
                border: (theme === 'light' && !scrolled) ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(26,26,24,0.15)',
                padding: '0.7rem 1.6rem',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = (theme === 'light' && !scrolled) ? '#FFF' : '#111111'
                e.currentTarget.style.color = (theme === 'light' && !scrolled) ? '#111111' : '#FFF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = (theme === 'light' && !scrolled) ? '#FFF' : '#111111'
              }}
            >
              Inquire
            </Link>
          </nav>
        )}

        {/* Mobile Hamburger */}
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
              background: scrolled || menuOpen ? '#1A1A18' : logoColor,
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'rotate(45deg) translateY(0px)' : 'none',
              position: menuOpen ? 'absolute' : 'relative',
            }} />
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: scrolled || menuOpen ? '#1A1A18' : logoColor,
              transition: 'all 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: scrolled || menuOpen ? '#1A1A18' : logoColor,
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'rotate(-45deg) translateY(0px)' : 'none',
              position: menuOpen ? 'absolute' : 'relative',
            }} />
          </button>
        )}
      </header>

      {/* Mobile Menu Overlay */}
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
              background: 'rgba(245,245,243,0.98)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: '1.8rem',
                    letterSpacing: '0.15em',
                    color: '#1A1A18',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <Link
                to="/inquiry"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.72rem',
                  letterSpacing: '0.28em',
                  color: '#FFF',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  background: '#1A1A18',
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
  )
}
