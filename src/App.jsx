import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import IntroSection from './components/IntroSection'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import FooterSection from './components/FooterSection'

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 0.5,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    // Sync Lenis with GSAP ticker (if GSAP is used)
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div style={{ background: '#F5F5F3' }}>
      <Navbar />
      <IntroSection />
      <HeroSection />
      <StatsSection />
      <FooterSection />
    </div>
  )
}
