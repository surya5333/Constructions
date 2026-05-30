import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Phase Data ──────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 118

const PHASES = [
  {
    id: '01',
    label: 'VISION',
    startFrame: 1,
    endFrame: 19,
    headline: 'It begins with a vision.',
    subtitle: 'Every landmark starts with an idea.',
  },
  {
    id: '02',
    label: 'FOUNDATION',
    startFrame: 20,
    endFrame: 38,
    headline: 'Strong beginnings.',
    subtitle: 'A solid foundation is built on purpose.',
  },
  {
    id: '03',
    label: 'STRUCTURE',
    startFrame: 39,
    endFrame: 57,
    headline: 'Shaping the future.',
    subtitle: 'Structure brings strength and direction.',
  },
  {
    id: '04',
    label: 'FORM',
    startFrame: 58,
    endFrame: 76,
    headline: 'Form takes shape.',
    subtitle: 'Design meets function, spaces come to life.',
  },
  {
    id: '05',
    label: 'DETAILS',
    startFrame: 77,
    endFrame: 95,
    headline: 'Details define excellence.',
    subtitle: 'Every line. Every edge. Crafted with precision.',
  },
  {
    id: '06',
    label: 'COMPLETE',
    startFrame: 96,
    endFrame: 118,
    headline: 'Built for better living.',
    subtitle: 'A space designed for today, built to last tomorrow.',
  },
]

// ── Frame path helper ───────────────────────────────────────────────────────
function framePath(n) {
  return `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`
}

// ── Text animation variants ─────────────────────────────────────────────────
const textVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0, y: -12,
    transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
  },
}

const subtitleVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 },
  },
  exit: {
    opacity: 0, y: -8,
    transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] },
  },
}

export default function HeroSection() {
  const sectionRef    = useRef(null)
  const stickyRef     = useRef(null)
  const canvasRef     = useRef(null)
  const imagesRef     = useRef([])
  const frameIndexRef = useRef(0)
  const rafRef        = useRef(null)
  const ctxRef        = useRef(null)

  const [currentFrame,   setCurrentFrame]   = useState(0)
  const [currentPhase,   setCurrentPhase]   = useState(0)
  const [loadProgress,   setLoadProgress]   = useState(0)
  const [allLoaded,      setAllLoaded]       = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // ── 1. Preload all frames ──────────────────────────────────────────────
  useEffect(() => {
    const images = []
    let loaded = 0

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = framePath(i)
      img.onload = img.onerror = () => {
        loaded++
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
        if (loaded === TOTAL_FRAMES) setAllLoaded(true)
      }
      images.push(img)
    }
    imagesRef.current = images
  }, [])

  // ── 2. Canvas draw ─────────────────────────────────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current
    const ctx    = ctxRef.current
    if (!canvas || !ctx) return

    const img = imagesRef.current[index]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // contain-fit — keeps sketch fully visible and centered
    const scale = Math.min(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }, [])

  // ── 3. Resize canvas ───────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctxRef.current = ctx

    const resize = () => {
      const sticky = stickyRef.current
      if (!sticky) return
      canvas.width  = sticky.clientWidth
      canvas.height = sticky.clientHeight
      drawFrame(frameIndexRef.current)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  // ── 4. Smooth frame lerp loop ──────────────────────────────────────────
  useEffect(() => {
    if (!allLoaded) return

    let target = 0
    let current = 0

    const loop = () => {
      current += (target - current) * 0.04
      const rounded = Math.round(current)

      if (rounded !== frameIndexRef.current) {
        frameIndexRef.current = rounded
        drawFrame(rounded)

        // Determine phase
        const idx = PHASES.findIndex(
          (p) => rounded + 1 >= p.startFrame && rounded + 1 <= p.endFrame
        )
        if (idx !== -1) setCurrentPhase(idx)
        setCurrentFrame(rounded)
      }

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    // GSAP ScrollTrigger drives `target`
    const section = sectionRef.current
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: false,
      onUpdate: (self) => {
        const prog = self.progress
        target = Math.floor(prog * (TOTAL_FRAMES - 1))
        setScrollProgress(prog)
      },
    })

    return () => {
      cancelAnimationFrame(rafRef.current)
      trigger.kill()
    }
  }, [allLoaded, drawFrame])

  // ── 5. Determine active phase ──────────────────────────────────────────
  const phase = PHASES[currentPhase]
  const phaseProgress = (() => {
    const p = PHASES[currentPhase]
    if (!p) return 0
    return (currentFrame + 1 - p.startFrame) / (p.endFrame - p.startFrame)
  })()

  return (
    <>
      {/* ── Loading Screen ─────────────────────────────────────────── */}
      <AnimatePresence>
        {!allLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: '#F5F5F3',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: '1.1rem',
                letterSpacing: '0.4em',
                color: '#8A8A85',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}>
                Preparing Experience
              </p>
              {/* Progress bar */}
              <div style={{
                width: '180px',
                height: '1px',
                background: 'rgba(26,26,24,0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <motion.div
                  style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    background: '#1A1A18',
                    originX: 0,
                  }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                />
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 200,
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                color: '#C8C8C2',
                textTransform: 'uppercase',
                marginTop: '1rem',
              }}>
                {loadProgress}%
              </p>
            </div>

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: '2.8rem',
              letterSpacing: '0.1em',
              color: '#1A1A18',
              opacity: 0.06,
              position: 'absolute',
              bottom: '3rem',
              textTransform: 'uppercase',
            }}>
              CHV Construct
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll Container (pinned height) ──────────────────────── */}
      <section
        ref={sectionRef}
        style={{ height: '700vh', position: 'relative' }}
      >
        {/* ── Sticky Viewport ───────────────────────────────────────── */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            background: '#F5F5F3',
            display: 'grid',
            gridTemplateColumns: '220px 1fr 280px',
            overflow: 'hidden',
          }}
        >

          {/* ── LEFT — Vertical Timeline ─────────────────────────── */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0 0 0 3.5rem',
            gap: '0',
            position: 'relative',
          }}>
            {/* Vertical dotted line */}
            <div style={{
              position: 'absolute',
              left: '3.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1px',
              height: '360px',
              background: 'repeating-linear-gradient(to bottom, rgba(26,26,24,0.2) 0px, rgba(26,26,24,0.2) 3px, transparent 3px, transparent 9px)',
            }} />

            {/* Progress fill */}
            <div style={{
              position: 'absolute',
              left: '3.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1px',
              height: `${scrollProgress * 360}px`,
              background: '#1A1A18',
              maxHeight: '360px',
              transition: 'height 0.05s linear',
            }} />

            {/* Phase items */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              paddingLeft: '1.8rem',
              height: '360px',
              justifyContent: 'space-between',
            }}>
              {PHASES.map((p, i) => {
                const isActive = i === currentPhase
                const isDone   = i < currentPhase
                return (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'opacity 0.4s ease',
                      opacity: isActive ? 1 : isDone ? 0.45 : 0.25,
                    }}
                  >
                    {/* Dot */}
                    <div style={{
                      width:  isActive ? '6px' : '4px',
                      height: isActive ? '6px' : '4px',
                      borderRadius: '50%',
                      background: isActive ? '#1A1A18' : isDone ? '#8A8A85' : '#C8C8C2',
                      transition: 'all 0.4s ease',
                      flexShrink: 0,
                      marginLeft: isActive ? '-1px' : '0',
                    }} />
                    <div>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: isActive ? 400 : 300,
                        fontSize: '0.58rem',
                        letterSpacing: '0.28em',
                        color: isActive ? '#1A1A18' : '#8A8A85',
                        textTransform: 'uppercase',
                        lineHeight: 1.2,
                        transition: 'all 0.4s ease',
                      }}>
                        {p.id} — {p.label}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Frame counter */}
            <div style={{
              position: 'absolute',
              bottom: '3.5rem',
              left: '3.5rem',
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 200,
                fontSize: '0.58rem',
                letterSpacing: '0.2em',
                color: '#C8C8C2',
              }}>
                {String(currentFrame + 1).padStart(3, '0')} / {String(TOTAL_FRAMES).padStart(3, '0')}
              </span>
            </div>
          </div>

          {/* ── CENTER — Canvas ──────────────────────────────────── */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <canvas
              ref={canvasRef}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />

            {/* Scroll hint — fades after scrolling */}
            <AnimatePresence>
              {scrollProgress < 0.02 && allLoaded && (
                <motion.div
                  key="scroll-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 1, duration: 0.8 } }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 200,
                    fontSize: '0.6rem',
                    letterSpacing: '0.35em',
                    color: '#8A8A85',
                    textTransform: 'uppercase',
                  }}>
                    Scroll
                  </span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    style={{
                      width: '1px',
                      height: '40px',
                      background: 'linear-gradient(to bottom, #8A8A85, transparent)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase progress micro-bar at bottom of canvas */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'rgba(26,26,24,0.08)',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: '#1A1A18',
                  originX: 0,
                }}
                animate={{ width: `${scrollProgress * 100}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>
          </div>

          {/* ── RIGHT — Typography Panel ─────────────────────────── */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 3.5rem 0 2rem',
            gap: '0',
          }}>

            {/* Phase label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${currentPhase}`}
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.6rem',
                  letterSpacing: '0.38em',
                  color: '#8A8A85',
                  textTransform: 'uppercase',
                  marginBottom: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '1px',
                  background: '#C8C8C2',
                }} />
                Phase {phase?.id}
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <div style={{ overflow: 'hidden', marginBottom: '1.4rem' }}>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`headline-${currentPhase}`}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: 'clamp(1.9rem, 2.6vw, 2.8rem)',
                    lineHeight: 1.18,
                    letterSpacing: '-0.01em',
                    color: '#1A1A18',
                    margin: 0,
                  }}
                >
                  {phase?.headline}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div style={{
              width: '32px',
              height: '1px',
              background: 'rgba(26,26,24,0.2)',
              marginBottom: '1.4rem',
            }} />

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${currentPhase}`}
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.82rem',
                  lineHeight: 1.75,
                  color: '#8A8A85',
                  letterSpacing: '0.02em',
                  maxWidth: '220px',
                }}
              >
                {phase?.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* Phase mini progress */}
            <div style={{ marginTop: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {PHASES.map((p, i) => (
                  <div
                    key={p.id}
                    style={{
                      flex: 1,
                      height: '1px',
                      background: i < currentPhase
                        ? '#1A1A18'
                        : i === currentPhase
                        ? `linear-gradient(to right, #1A1A18 ${phaseProgress * 100}%, rgba(26,26,24,0.15) ${phaseProgress * 100}%)`
                        : 'rgba(26,26,24,0.12)',
                      transition: 'background 0.3s ease',
                    }}
                  />
                ))}
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.6rem',
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                  color: '#C8C8C2',
                  textTransform: 'uppercase',
                }}>
                  Phase {phase?.id} / 06
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                  color: '#C8C8C2',
                }}>
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>
            </div>

            {/* Company tagline — appears at last phase */}
            <AnimatePresence>
              {currentPhase === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8 } }}
                  exit={{ opacity: 0 }}
                  style={{ marginTop: '2rem' }}
                >
                  <a
                    href="#contact"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      fontSize: '0.62rem',
                      letterSpacing: '0.28em',
                      color: '#1A1A18',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid rgba(26,26,24,0.3)',
                      paddingBottom: '2px',
                      display: 'inline-block',
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Start your project →
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}
