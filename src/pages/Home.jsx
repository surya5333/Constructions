import Navbar from '../components/Navbar'
import IntroSection from '../components/IntroSection'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import ServicesSection from '../components/ServicesSection'
import FooterSection from '../components/FooterSection'
import '../styles/home.css'

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <IntroSection />
      <HeroSection />
      <StatsSection />

      {/* ── SERVICES HEADER ── */}
      <div style={{
        background: '#F5F5F3',
        padding: '6rem 3.5rem 0',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.6rem',
            letterSpacing: '0.45em',
            color: '#8A8A85',
            textTransform: 'uppercase',
          }}>
            02 &mdash; What We Build
          </span>
          <div style={{ flex: 1, height: '1px', background: '#C8C8C2' }} />
        </div>

        {/* main headline */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          fontSize: 'clamp(3rem, 6vw, 5.5rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: '#1A1A18',
          margin: 0,
        }}>
          Our&nbsp;
          <span style={{ fontStyle: 'italic', color: '#6B5C3E' }}>Services</span>
        </h2>

        {/* sub copy */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: '0.875rem',
          lineHeight: 1.8,
          letterSpacing: '0.02em',
          color: '#8A8A85',
          maxWidth: '420px',
          marginTop: '1.25rem',
        }}>
         
        </p>
      </div>

      <ServicesSection />

      <FooterSection />
    </div>
  )
}
