import { motion } from 'framer-motion'
import useIsMobile from '../lib/useIsMobile'

export default function IntroSection() {
  const isMobile = useIsMobile()
  
  return (
    <section style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: isMobile ? '80px' : '100px', // space for navbar
      background: '#F5F5F3',
    }}>
      {/* Title above image */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: isMobile ? 'clamp(2.5rem, 8vw, 3rem)' : 'clamp(3rem, 6vw, 6rem)',
          letterSpacing: '0.1em',
          color: '#111111',
          textTransform: 'uppercase',
          textShadow: '0 1px 2px rgba(0,0,0,0.04)',
          textAlign: 'center',
          marginBottom: isMobile ? '1.5rem' : '2rem',
        }}
      >
        CHV Constructions
      </motion.h1>

      {/* Image below title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: isMobile ? '0 1rem' : '0 2rem',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: isMobile ? '2rem' : '4rem',
        }}
      >
        <img 
          src="/intro-image.jpg" 
          alt="Vision" 
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }} 
        />
      </motion.div>
    </section>
  )
}
