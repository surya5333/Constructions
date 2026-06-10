import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import Services from './pages/Services'
import LiveProject from './pages/LiveProject'
import Live from './pages/Live'
import Projects from './pages/Projects'
import Inquiry from './pages/Inquiry'

// Register ScrollTrigger to access it in ScrollToTop
gsap.registerPlugin(ScrollTrigger)

function ScrollToTop({ lenis }) {
  const { pathname } = useLocation();
  const lastPathname = useRef(pathname);

  // Synchronously scroll to top during the rendering phase when pathname changes,
  // BEFORE any child components mount or run their useEffect hooks.
  if (lastPathname.current !== pathname) {
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    lastPathname.current = pathname;
  }

  useEffect(() => {
    // A tiny delay ensures the DOM is fully rendered/updated by React Router before ScrollTrigger recalculates
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default function App() {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const lenisInst = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 0.5,
      touchMultiplier: 1.5,
    })
    setLenis(lenisInst)

    let rafId
    function raf(time) {
      lenisInst.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenisInst.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop lenis={lenis} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/live-project" element={<LiveProject />} />
          <Route path="/live" element={<Live />} />
          <Route path="/inquiry" element={<Inquiry />} />
        </Routes>
      </div>
      <Analytics />
    </BrowserRouter>
  )
}
