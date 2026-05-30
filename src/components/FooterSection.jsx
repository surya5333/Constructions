import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FooterSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer
      ref={ref}
      id="contact"
      style={{
        background: '#1A1A18',
        color: '#F5F5F3',
        padding: '7rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large ghost text */}
      <div style={{
        position: 'absolute',
        bottom: '-1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: 'clamp(5rem, 12vw, 11rem)',
        letterSpacing: '0.08em',
        color: 'rgba(245,245,243,0.04)',
        textTransform: 'uppercase',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        CHV Construct
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 3.5rem',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '4rem',
          marginBottom: '6rem',
        }}>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: '1.6rem',
                letterSpacing: '0.18em',
                color: '#F5F5F3',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
                CHV
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: '0.58rem',
                letterSpacing: '0.32em',
                color: 'rgba(245,245,243,0.35)',
                textTransform: 'uppercase',
              }}>
                Construct
              </div>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.78rem',
              lineHeight: 1.8,
              color: 'rgba(245,245,243,0.45)',
              maxWidth: '240px',
              letterSpacing: '0.01em',
            }}>
              Building landmarks with vision, precision, and enduring purpose. Since 2009.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.32em',
              color: 'rgba(245,245,243,0.3)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {['Work', 'Process', 'Studio', 'Journal', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(245,245,243,0.55)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F5F5F3'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,243,0.55)'}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          >
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.32em',
              color: 'rgba(245,245,243,0.3)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(245,245,243,0.3)',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  Studio
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.76rem',
                  color: 'rgba(245,245,243,0.6)',
                  lineHeight: 1.6,
                }}>
                  12 Meridian Place<br />
                  Architecture District
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(245,245,243,0.3)',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  Inquiries
                </div>
                <a
                  href="mailto:studio@chvconstruct.com"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.76rem',
                    color: 'rgba(245,245,243,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F5F5F3'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,243,0.6)'}
                >
                  studio@chvconstruct.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <div style={{
          height: '1px',
          background: 'rgba(245,245,243,0.08)',
          marginBottom: '2rem',
        }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 200,
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(245,245,243,0.25)',
            textTransform: 'uppercase',
          }}>
            © 2026 CHV Construct. All rights reserved.
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 200,
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(245,245,243,0.2)',
            textTransform: 'uppercase',
          }}>
            Built with precision
          </span>
        </div>
      </div>
    </footer>
  )
}
