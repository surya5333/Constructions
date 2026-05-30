import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 120, suffix: '+', label: 'Projects Completed' },
  { value: 15,  suffix: '+', label: 'Years Experience' },
  { value: 25,  suffix: '+', label: 'Expert Professionals' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction' },
]

function AnimatedNumber({ target, suffix, inView }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, target])

  return (
    <span>
      {display}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="work"
      style={{
        background: '#F5F5F3',
        padding: '7rem 0',
        position: 'relative',
      }}
    >
      {/* Top divider */}
      <div style={{
        position: 'absolute',
        top: 0, left: '3.5rem', right: '3.5rem',
        height: '1px',
        background: 'rgba(26,26,24,0.1)',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 3.5rem',
      }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '4.5rem',
          }}
        >
          <div style={{ width: '32px', height: '1px', background: '#C8C8C2' }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.38em',
            color: '#8A8A85',
            textTransform: 'uppercase',
          }}>
            By the numbers
          </span>
        </motion.div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
        }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: i * 0.1,
              }}
              style={{
                padding: '0 3rem 0 0',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(26,26,24,0.1)' : 'none',
                paddingRight: i < STATS.length - 1 ? '3rem' : '0',
                paddingLeft: i > 0 ? '3rem' : '0',
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2.8rem, 4vw, 4.5rem)',
                letterSpacing: '-0.02em',
                color: '#1A1A18',
                lineHeight: 1,
                marginBottom: '0.8rem',
              }}>
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>

              {/* Divider */}
              <div style={{
                width: '24px',
                height: '1px',
                background: 'rgba(26,26,24,0.2)',
                marginBottom: '0.8rem',
              }} />

              {/* Label */}
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                color: '#8A8A85',
                textTransform: 'uppercase',
                lineHeight: 1.5,
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '3.5rem', right: '3.5rem',
        height: '1px',
        background: 'rgba(26,26,24,0.1)',
      }} />
    </section>
  )
}
