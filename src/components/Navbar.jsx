import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
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
        padding: '0 3rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.5s ease, border-color 0.5s ease',
        background: scrolled ? 'rgba(245,245,243,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,26,24,0.1)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: '1.35rem',
          letterSpacing: '0.18em',
          color: '#1A1A18',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}>
          CHV
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: '0.58rem',
          letterSpacing: '0.32em',
          color: '#8A8A85',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}>
          Construct
        </span>
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {['Work', 'Process', 'Studio', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: '#3D3D3A',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => e.target.style.color = '#1A1A18'}
            onMouseLeave={e => e.target.style.color = '#3D3D3A'}
          >
            {item}
          </a>
        ))}

        <a
          href="#contact"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            color: '#F5F5F3',
            textDecoration: 'none',
            textTransform: 'uppercase',
            background: '#1A1A18',
            padding: '0.6rem 1.4rem',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#3D3D3A'}
          onMouseLeave={e => e.currentTarget.style.background = '#1A1A18'}
        >
          Inquire
        </a>
      </nav>
    </header>
  )
}
