import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '120px', // space for navbar
      background: '#F5F5F3',
    }}>
      {/* Title above image */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(3rem, 6vw, 6rem)',
          letterSpacing: '0.1em',
          color: '#1A1A18',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '2rem',
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
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '4rem',
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
