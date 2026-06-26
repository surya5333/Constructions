import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import useIsMobile from '../lib/useIsMobile';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const servicesData = [
  {
    id: '01',
    title: 'Residential\nConstruction',
    desc: 'We build more than houses—we build environments tailored to your exact specifications.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
    layout: 'textLeft'
  },
  {
    id: '02',
    title: 'Commercial\nProjects',
    desc: 'We deliver commercial facilities, corporate towers, and retail spaces that reflect your brand\'s ambition.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
    layout: 'textRight'
  },
  {
    id: '03',
    title: 'Interior\nExecution',
    desc: 'Bringing visionary interiors to life with meticulous craftsmanship and refined material sourcing.',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',
    layout: 'textLeft'
  },
  {
    id: '04',
    title: 'Structural\nEngineering',
    desc: 'Core engineering solutions prioritizing safety, performance, stability, and adherence to highest standards.',
    img: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1600&q=80',
    layout: 'textRight'
  },
  {
    id: '05',
    title: 'Renovation &\nRestoration',
    desc: 'We restore with respect for the past, and renovate for the future, breathing new life into structures.',
    img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1600&q=80',
    layout: 'textLeft'
  },
  {
    id: '06',
    title: 'Project\nManagement',
    desc: 'From planning to handover, we orchestrate every detail, ensuring quality, timeline, and cost control.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80',
    layout: 'textRight'
  }
];

export default function ImmersiveServices() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Parallax
      gsap.to(heroImgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Sticky Immersive Experience Timeline
      const scenes = gsap.utils.toArray('.immersive-scene');
      
      // Calculate how much distance each scene takes
      // We have 6 scenes, so 5 transitions.
      // Timeline spans from 0 to 1 progress.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: 'top top',
          end: '+=500%', // 600vh total height (100vh + 500vh scroll)
          pin: true,
          scrub: 1, // Smooth scrub
          onUpdate: (self) => {
            // Update active progress indicator
            const index = Math.min(
              5,
              Math.max(0, Math.floor(self.progress * 6)) // approximate division
            );
            setActiveScene(index);
          }
        }
      });

      // Initially set all scenes except first to invisible and offset
      scenes.forEach((scene, i) => {
        if (i !== 0) {
          gsap.set(scene, { opacity: 0 });
          const text = scene.querySelector('.scene-text');
          const img = scene.querySelector('.scene-img');
          // Start positions for incoming
          // use inner width as reference for offsets, for mobile use a smaller Y offset instead of X
          if (window.innerWidth <= 768) {
            gsap.set(text, { y: 50, x: 0 });
            gsap.set(img, { y: -50, x: 0 });
          } else {
            gsap.set(text, { x: scene.dataset.layout === 'textLeft' ? -150 : 150 });
            gsap.set(img, { x: scene.dataset.layout === 'textLeft' ? 150 : -150 });
          }
        }
      });

      // Create sequence of transitions
      scenes.forEach((scene, i) => {
        if (i === scenes.length - 1) return; // Last scene doesn't transition out in this loop
        
        const nextScene = scenes[i + 1];
        
        // Outgoing elements
        const outText = scene.querySelector('.scene-text');
        const outImg = scene.querySelector('.scene-img');
        
        // Incoming elements
        const inText = nextScene.querySelector('.scene-text');
        const inImg = nextScene.querySelector('.scene-img');

        const isMob = window.innerWidth <= 768;

        // Add to timeline
        tl.addLabel(`scene${i}End`)
          // Outgoing
          .to(scene, { opacity: 0, duration: 1 }, `scene${i}End`)
          .to(outText, isMob ? { y: 50, duration: 1, ease: 'power2.inOut' } : { x: scene.dataset.layout === 'textLeft' ? -150 : 150, duration: 1, ease: 'power2.inOut' }, `scene${i}End`)
          .to(outImg, isMob ? { y: -50, duration: 1, ease: 'power2.inOut' } : { x: scene.dataset.layout === 'textLeft' ? 150 : -150, duration: 1, ease: 'power2.inOut' }, `scene${i}End`)
          
          // Incoming
          .to(nextScene, { opacity: 1, duration: 1 }, `scene${i}End+=0.5`)
          .to(inText, isMob ? { y: 0, duration: 1, ease: 'power2.out' } : { x: 0, duration: 1, ease: 'power2.out' }, `scene${i}End+=0.5`)
          .to(inImg, isMob ? { y: 0, duration: 1, ease: 'power2.out' } : { x: 0, duration: 1, ease: 'power2.out' }, `scene${i}End+=0.5`)
          
          // Add a pause gap
          .to({}, { duration: 0.5 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (index) => {
    // Jump to specific scene inside the sticky container
    // We calculate the scroll position based on the trigger offset + (index * 100vh)
    // 500vh scroll distance total for 5 transitions (100vh each)
    const stickyTop = stickyRef.current.offsetTop;
    const windowHeight = window.innerHeight;
    const targetScroll = stickyTop + (index * windowHeight);

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1.5,
      ease: 'power3.inOut'
    });
  };

  return (
    <div ref={containerRef} className="bg-[var(--lux-bg)] min-h-screen text-[var(--lux-primary)] font-[var(--font-body-lux)] selection:bg-[var(--lux-accent)] selection:text-[var(--lux-bg)]">
      
      {/* SECTION 1: HERO */}
      <section ref={heroRef} className={`relative w-full h-screen overflow-hidden flex ${isMobile ? 'flex-col justify-center' : 'items-center justify-between'} px-6 md:px-12 lg:px-24`}>
        {/* Background Image (Right aligned visually) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className={`absolute ${isMobile ? 'inset-0' : 'right-0 top-0 w-full md:w-[60%] h-[120%] -top-[10%]'}`}>
            <div 
              ref={heroImgRef}
              className="w-full h-full bg-cover bg-center opacity-60"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=80)' }}
            />
            {/* Atmospheric overlay */}
            <div className={`absolute inset-0 bg-gradient-to-${isMobile ? 't' : 'r'} from-[var(--lux-bg)] via-[var(--lux-bg)]/80 to-transparent`}></div>
            {!isMobile && <div className="absolute inset-0 bg-gradient-to-t from-[var(--lux-bg)] to-transparent opacity-80"></div>}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-[var(--font-heading)] text-5xl md:text-7xl lg:text-[100px] leading-[1.1] mb-8">
            Built Across<br />
            Every Dimension
          </h1>
          <p className="text-[var(--lux-secondary)] text-lg md:text-xl font-light max-w-md leading-relaxed tracking-wide">
            From visionary design to flawless execution, we create spaces that stand the test of time.
          </p>
        </div>
      </section>

      {/* SECTION 2: SERVICE NAVIGATOR */}
      <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 border-y border-[var(--lux-secondary)]/10 z-10 bg-[var(--lux-bg)]">
        <h2 className="font-[var(--font-heading)] text-3xl mb-12 text-[var(--lux-secondary)]">Our Core Services</h2>
        <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-8 snap-x">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              onClick={() => handleNavClick(index)}
              onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if(img){ img.style.filter='grayscale(0%)'; img.style.opacity='0.9'; } }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if(img){ img.style.filter='grayscale(100%)'; img.style.opacity='0.5'; } }}
              className="relative flex-shrink-0 w-[300px] h-[400px] group cursor-pointer border border-[var(--lux-secondary)]/20 snap-start overflow-hidden bg-[#111]"
            >
              <img 
                src={service.img} 
                alt={service.title} 
                className="scroll-reveal-img absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'grayscale(100%)', opacity: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--lux-bg)] to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60"></div>
              
              <div className="absolute bottom-0 left-0 p-6 z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-[var(--lux-accent)] font-mono text-xs tracking-[0.3em] mb-2 block font-medium">
                  {service.id}
                </span>
                <h3 className="font-[var(--font-heading)] text-2xl whitespace-pre-line leading-snug">
                  {service.title}
                </h3>
              </div>
              
              {/* Subtle Light Sweep */}
              <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-700 group-hover:translate-x-[150%] pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: IMMERSIVE SERVICE EXPERIENCE */}
      <section ref={stickyRef} className="relative w-full h-screen bg-[var(--lux-bg)] overflow-hidden">
        
        {/* Scroll Progress Indicator */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
          {servicesData.map((_, index) => (
            <div 
              key={index} 
              className={`text-[10px] font-mono tracking-[0.2em] transition-all duration-500 cursor-pointer ${activeScene === index ? 'text-[var(--lux-accent)] scale-110 font-bold' : 'text-[var(--lux-secondary)]/30 scale-100 hover:text-[var(--lux-secondary)]/70'}`}
              onClick={() => handleNavClick(index)}
            >
              0{index + 1}
            </div>
          ))}
          {/* Vertical progress line */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-[var(--lux-secondary)]/10 -z-10">
            <div 
              className="w-full bg-[var(--lux-accent)] transition-all duration-500" 
              style={{ height: `${((activeScene + 1) / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* The 6 Scenes */}
        <div className={`absolute inset-0 w-full h-full ${isMobile ? 'px-4' : 'px-24 md:px-32 lg:px-48'} flex items-center justify-center`}>
          {servicesData.map((service, index) => (
            <div 
              key={service.id} 
              data-layout={service.layout}
              className={`immersive-scene absolute inset-0 w-full h-full flex ${isMobile ? 'flex-col justify-center' : 'flex-col md:flex-row items-center justify-between px-24'}`}
              style={{ zIndex: servicesData.length - index }}
            >
              {/* Architectural Grid Overlay for Technical Atmosphere (Scene 04) */}
              {service.id === '04' && (
                <div className="absolute inset-0 pointer-events-none border-[var(--lux-accent)]/5" style={{ backgroundImage: 'linear-gradient(var(--lux-accent) 1px, transparent 1px), linear-gradient(90deg, var(--lux-accent) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.05 }}></div>
              )}

              {/* Number Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[var(--font-heading)] text-[30vw] text-[var(--lux-secondary)] opacity-[0.02] select-none pointer-events-none whitespace-nowrap">
                {service.id}
              </div>

              {service.layout === 'textLeft' || isMobile ? (
                <>
                  <div className={`scene-text w-full md:w-[45%] flex flex-col relative z-10 ${isMobile ? 'px-4 mb-8 text-center items-center' : 'pl-12'}`}>
                    <span className="text-[var(--lux-accent)] font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
                      {service.id} // {service.title.replace('\n', ' ')}
                    </span>
                    <h2 className={`font-[var(--font-heading)] ${isMobile ? 'text-4xl' : 'text-5xl md:text-7xl'} leading-[1.1] mb-8 whitespace-pre-line`}>
                      {service.title}
                    </h2>
                    <p className={`text-[var(--lux-secondary)] ${isMobile ? 'text-base' : 'text-lg'} font-light leading-relaxed max-w-md`}>
                      {service.desc}
                    </p>
                  </div>
                  <div className={`scene-img w-full md:w-[45%] ${isMobile ? 'h-[40vh] mt-4 px-4' : 'h-[60vh]'} relative z-10 border border-[var(--lux-secondary)]/20 p-2`}>
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover" style={{ opacity: 1 }} />
                  </div>
                </>
              ) : (
                <>
                  <div className="scene-img w-full md:w-[45%] h-[60vh] relative z-10 border border-[var(--lux-secondary)]/20 p-2">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover" style={{ opacity: 1 }} />
                  </div>
                  <div className="scene-text w-full md:w-[45%] flex flex-col relative z-10 pr-12">
                    <span className="text-[var(--lux-accent)] font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
                      {service.id} // {service.title.replace('\n', ' ')}
                    </span>
                    <h2 className="font-[var(--font-heading)] text-5xl md:text-7xl leading-[1.1] mb-8 whitespace-pre-line">
                      {service.title}
                    </h2>
                    <p className="text-[var(--lux-secondary)] text-lg font-light leading-relaxed max-w-md">
                      {service.desc}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative w-full h-[80vh] flex items-center justify-center border-t border-[var(--lux-secondary)]/10 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=80" 
            alt="Architecture" 
            className="w-full h-full object-cover opacity-20 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--lux-bg)] via-[var(--lux-bg)]/80 to-[var(--lux-bg)]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="font-[var(--font-heading)] text-5xl md:text-7xl leading-[1.1] mb-12">
            Let's Build Something<br />
            <span className="text-[var(--lux-accent)] italic">Exceptional</span>
          </h2>
          
          <button className="px-10 py-4 bg-transparent border border-[var(--lux-accent)] text-[var(--lux-accent)] font-[var(--font-body-lux)] text-sm uppercase tracking-[0.2em] hover:bg-[var(--lux-accent)] hover:text-[var(--lux-bg)] transition-all duration-500 relative overflow-hidden group">
            <span className="relative z-10">Start a Project</span>
          </button>
        </div>
      </section>

    </div>
  );
}
