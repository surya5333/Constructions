import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Navbar({ theme = 'dark' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 4.5rem',
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
          color: (theme === 'light' && !scrolled) ? '#FFF' : '#1A1A18',
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
          color: (theme === 'light' && !scrolled) ? 'rgba(255,255,255,0.7)' : '#8A8A85',
          textTransform: 'uppercase',
          lineHeight: 1,
          transition: 'color 0.5s ease',
        }}>
          Construct
        </span>
      </Link>

      {/* Nav Links */}
      <nav style={{ display: 'flex', gap: '3.5rem', alignItems: 'center' }}>
        {[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Process', path: '/#process' },
          { name: 'Studio', path: '/#studio' },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: (theme === 'light' && !scrolled) ? 'rgba(255,255,255,0.9)' : '#3D3D3A',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => e.target.style.color = (theme === 'light' && !scrolled) ? '#FFF' : '#1A1A18'}
            onMouseLeave={e => e.target.style.color = (theme === 'light' && !scrolled) ? 'rgba(255,255,255,0.9)' : '#3D3D3A'}
          >
            {item.name}
          </Link>
        ))}

        <a
          href="#contact"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            color: (theme === 'light' && !scrolled) ? '#FFF' : '#111111',
            textDecoration: 'none',
            textTransform: 'uppercase',
            background: 'transparent',
            border: `1px solid ${(theme === 'light' && !scrolled) ? 'rgba(255,255,255,0.5)' : '#111111'}`,
            padding: '0.6rem 1.4rem',
            transition: 'all 300ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = (theme === 'light' && !scrolled) ? '#FFF' : '#111111'
            e.currentTarget.style.color = (theme === 'light' && !scrolled) ? '#111111' : '#F5F5F3'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = (theme === 'light' && !scrolled) ? '#FFF' : '#111111'
          }}
        >
          Inquire
        </a>
      </nav>
    </header>
  )
}
