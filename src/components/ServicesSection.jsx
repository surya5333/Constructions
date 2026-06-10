import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;
const currentFrame = (index) => `/serviceframes/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

export default function ServicesSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textContainersRef = useRef([]);

  // Set up texts array
  const scenes = [
    {
      id: '01',
      title1: 'RESIDENTIAL',
      title2: 'CONSTRUCTION',
      subtitle: 'Crafting bespoke homes with precision and passion.',
      style: { top: '15%', left: '5%' } // Upper left
    },
    {
      id: '02',
      title1: 'COMMERCIAL',
      title2: 'PROJECTS',
      subtitle: 'Delivering iconic commercial spaces that inspire.',
      style: { bottom: '15%', left: '5%' } // Lower left
    },
    {
      id: '03',
      title1: 'INTERIOR',
      title2: 'EXECUTION',
      subtitle: 'Design meets detail in every interior we build.',
      style: { top: '50%', right: '5%', transform: 'translateY(-50%)' } // Center right
    },
    {
      id: '04',
      title1: 'STRUCTURAL',
      title2: 'ENGINEERING',
      subtitle: 'Strong foundations. Safe structures. Engineered for excellence.',
      style: { top: '50%', left: '0%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center center' } // Vertical left edge
    },
    {
      id: '05',
      title1: 'RENOVATION &',
      title2: 'RESTORATION',
      subtitle: 'Preserving heritage. Restoring beauty. Reviving value.',
      style: { bottom: '10%', right: '5%', textAlign: 'right' } // Bottom right
    },
    {
      id: '06',
      title1: 'PROJECT',
      title2: 'MANAGEMENT',
      subtitle: 'End-to-end management that ensures seamless delivery.',
      style: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' } // Center
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const images = [];
    const airpods = {
      frame: 0
    };

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load first image immediately
    const img = new Image();
    img.src = currentFrame(0);
    img.onload = () => {
      render();
    };

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
      const imgObj = new Image();
      imgObj.src = currentFrame(i);
      images.push(imgObj);
    }

    const render = () => {
      if (images[airpods.frame] && images[airpods.frame].complete) {
        // Draw image covering the entire canvas while maintaining aspect ratio (like object-fit: cover)
        const img = images[airpods.frame];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let coverWidth = canvas.width;
        let coverHeight = canvas.height;

        if (canvasRatio > imgRatio) {
          coverHeight = canvas.width / imgRatio;
        } else {
          coverWidth = canvas.height * imgRatio;
        }

        // Apply zoom
        const zoomFactor = 1.45; // 35% zoom
        const drawWidth = coverWidth * zoomFactor;
        const drawHeight = coverHeight * zoomFactor;
        
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Add a subtle dark overlay by drawing a black rect over it
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        context.fillStyle = 'rgba(26, 26, 24, 0.4)'; // Dark charcoal tint
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=600%', // 600vh scroll duration
          pin: true,
          scrub: 1.2, // Smoother scrubbing
        }
      });

      // 1. Canvas Image Sequence Animation
      tl.to(airpods, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        onUpdate: render,
        duration: 1 // Baseline duration for the whole timeline
      }, 0);

      // Helper: Map frame ranges to timeline percentages (0 to 1)
      const getProgress = (frame) => frame / frameCount;

      // SCENE 01: RESIDENTIAL CONSTRUCTION
      const scene1Start = 0;
      const scene1End = getProgress(35);
      tl.fromTo('.scene-01 .s-num', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, scene1Start)
        .fromTo('.scene-01 .s-title1', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.05, ease: 'power2.out' }, scene1Start + 0.02)
        .fromTo('.scene-01 .s-title2', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.05, ease: 'power2.out' }, scene1Start + 0.04)
        .fromTo('.scene-01 .s-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, scene1Start + 0.06)
        // Parallax out
        .to('.scene-01', { opacity: 0, y: -100, scale: 0.95, filter: 'blur(10px)', duration: 0.1 }, scene1End);

      // SCENE 02: COMMERCIAL PROJECTS
      const scene2Start = getProgress(40);
      const scene2End = getProgress(75);
      tl.fromTo('.scene-02 .s-num-bg', { opacity: 0, scale: 0.8 }, { opacity: 0.1, scale: 1, duration: 0.1, ease: 'power2.out' }, scene2Start)
        .fromTo('.scene-02 .s-title1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, scene2Start + 0.02)
        .fromTo('.scene-02 .s-title2', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, scene2Start + 0.02)
        .fromTo('.scene-02 .s-sub', { opacity: 0 }, { opacity: 1, duration: 0.05 }, scene2Start + 0.06)
        .to('.scene-02', { opacity: 0, y: 50, filter: 'blur(5px)', duration: 0.1 }, scene2End);

      // SCENE 03: INTERIOR EXECUTION
      const scene3Start = getProgress(80);
      const scene3End = getProgress(115);
      tl.fromTo('.scene-03 .s-title-container', { opacity: 0, filter: 'blur(20px)', letterSpacing: '0px' }, { opacity: 1, filter: 'blur(0px)', letterSpacing: '8px', duration: 0.1, ease: 'power1.inOut' }, scene3Start)
        .fromTo('.scene-03 .s-sub', { opacity: 0 }, { opacity: 1, duration: 0.05 }, scene3Start + 0.08)
        .to('.scene-03', { opacity: 0, x: 100, filter: 'blur(15px)', duration: 0.1 }, scene3End);

      // SCENE 04: STRUCTURAL ENGINEERING
      const scene4Start = getProgress(120);
      const scene4End = getProgress(155);
      tl.fromTo('.scene-04 .blueprint-grid', { opacity: 0, scale: 0.9 }, { opacity: 0.15, scale: 1, duration: 0.1 }, scene4Start)
        .fromTo('.scene-04 .s-title1', { opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.05, ease: 'power2.out' }, scene4Start + 0.02)
        .fromTo('.scene-04 .s-title2', { opacity: 0, clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.05, ease: 'power2.out' }, scene4Start + 0.05)
        .fromTo('.scene-04 .s-sub', { opacity: 0 }, { opacity: 1, duration: 0.05 }, scene4Start + 0.08)
        .to('.scene-04', { opacity: 0, x: -50, duration: 0.1 }, scene4End);

      // SCENE 05: RENOVATION & RESTORATION
      const scene5Start = getProgress(160);
      const scene5End = getProgress(195);
      tl.fromTo('.scene-05 .s-title1', { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.08, ease: 'power3.out' }, scene5Start)
        .fromTo('.scene-05 .s-title2', { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.08, ease: 'power3.out' }, scene5Start)
        .fromTo('.scene-05 .sketch-lines', { opacity: 0 }, { opacity: 0.2, duration: 0.05 }, scene5Start + 0.05)
        .fromTo('.scene-05 .s-sub', { opacity: 0 }, { opacity: 1, duration: 0.05 }, scene5Start + 0.08)
        .to('.scene-05 .sketch-lines', { opacity: 0, duration: 0.05 }, scene5Start + 0.1) // Briefly appear
        .to('.scene-05', { opacity: 0, y: 50, filter: 'blur(5px)', duration: 0.1 }, scene5End);

      // SCENE 06: PROJECT MANAGEMENT
      const scene6Start = getProgress(200);
      tl.fromTo('.scene-06 .blueprint-lines', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.3, duration: 0.1, transformOrigin: 'center' }, scene6Start)
        .fromTo('.scene-06 .s-title1', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.05 }, scene6Start + 0.04)
        .fromTo('.scene-06 .s-title2', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.05 }, scene6Start + 0.08)
        .fromTo('.scene-06 .s-sub', { opacity: 0 }, { opacity: 1, duration: 0.05 }, scene6Start + 0.12);
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#1a1a18] overflow-hidden z-50">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

      {/* Typography Overlay Containers */}
      
      {/* SCENE 01: RESIDENTIAL */}
      <div className="scene-01 absolute text-white flex flex-col z-10" style={scenes[0].style}>
        <span className="s-num font-['Cormorant_Garamond'] text-2xl text-[#d4c3a3] mb-4">01 / 06</span>
        <h2 className="text-5xl md:text-7xl font-['Bodoni_Moda',serif] uppercase leading-tight mb-2">
          <div className="s-title1">RESIDENTIAL</div>
          <div className="s-title2">CONSTRUCTION</div>
        </h2>
        <p className="s-sub font-['Inter',sans-serif] text-sm md:text-base font-light tracking-wider text-gray-300 max-w-sm mt-4">
          {scenes[0].subtitle}
        </p>
      </div>

      {/* SCENE 02: COMMERCIAL */}
      <div className="scene-02 absolute text-white flex flex-col z-10 w-full" style={{...scenes[1].style, width: '90%'}}>
        <div className="s-num-bg absolute -left-10 -bottom-20 text-[20rem] font-['Cormorant_Garamond'] leading-none text-[#d4c3a3] opacity-0 pointer-events-none select-none z-0">
          02
        </div>
        <div className="relative z-10">
          <h2 className="text-6xl md:text-8xl font-['Helvetica_Neue','Neue_Montreal',sans-serif] font-bold uppercase tracking-tighter mb-2 overflow-hidden">
            <div className="s-title1">COMMERCIAL</div>
            <div className="s-title2">PROJECTS</div>
          </h2>
          <p className="s-sub font-['Inter',sans-serif] text-sm md:text-base font-light tracking-wider text-[#d4c3a3] mt-4">
            {scenes[1].subtitle}
          </p>
        </div>
      </div>

      {/* SCENE 03: INTERIOR */}
      <div className="scene-03 absolute text-white flex flex-col items-end z-10" style={scenes[2].style}>
        <h2 className="s-title-container text-4xl md:text-6xl font-['Canela','Cormorant_Garamond',serif] uppercase text-right leading-snug">
          <div className="s-title1">INTERIOR</div>
          <div className="s-title2">EXECUTION</div>
        </h2>
        <p className="s-sub font-['Inter',sans-serif] text-sm md:text-base font-light tracking-wide text-gray-400 mt-6 text-right max-w-sm">
          {scenes[2].subtitle}
        </p>
      </div>

      {/* SCENE 04: STRUCTURAL */}
      <div className="scene-04 absolute text-white z-10 pointer-events-none" style={{ left: '4rem', top: '50%' }}>
        <div className="flex flex-col items-center justify-center whitespace-nowrap" style={{ transform: 'translate(-50%, -50%) rotate(-90deg)' }}>
          <div className="blueprint-grid absolute inset-0 border border-[#d4c3a3] opacity-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#d4c3a3 1px, transparent 1px), linear-gradient(90deg, #d4c3a3 1px, transparent 1px)', backgroundSize: '20px 20px', margin: '-2rem' }}></div>
          <h2 className="text-4xl md:text-5xl font-['Inter',sans-serif] uppercase font-bold tracking-widest flex flex-col items-center gap-2">
            <div className="s-title1">{scenes[3].title1}</div>
            <div className="s-title2 text-[#d4c3a3]">{scenes[3].title2}</div>
          </h2>
          <p className="s-sub font-['Inter',sans-serif] text-xs font-light tracking-widest text-gray-400 mt-4">
            {scenes[3].subtitle}
          </p>
        </div>
      </div>

      {/* SCENE 05: RENOVATION */}
      <div className="scene-05 absolute text-white flex flex-col z-10" style={scenes[4].style}>
        <div className="sketch-lines absolute inset-0 opacity-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGw0MCA0ME00MCAwbC00MCA0MCIgc3Ryb2tlPSIjZDRjM2EzIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] pointer-events-none"></div>
        <h2 className="text-5xl md:text-7xl font-['Cormorant_Garamond',serif] uppercase italic tracking-wide flex justify-end gap-3">
          <div className="s-title1">{scenes[4].title1}</div>
          <div className="s-title2">{scenes[4].title2}</div>
        </h2>
        <p className="s-sub font-['Inter',sans-serif] text-sm md:text-base font-light tracking-wider text-gray-300 mt-4">
          {scenes[4].subtitle}
        </p>
      </div>

      {/* SCENE 06: PROJECT MANAGEMENT */}
      <div className="scene-06 absolute text-white flex flex-col items-center z-10 w-full" style={scenes[5].style}>
        <div className="blueprint-lines absolute top-1/2 left-0 w-full h-[1px] bg-[#d4c3a3] opacity-0 pointer-events-none"></div>
        <div className="blueprint-lines absolute top-0 left-1/2 w-[1px] h-full bg-[#d4c3a3] opacity-0 pointer-events-none"></div>
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-['Inter',sans-serif] font-medium uppercase tracking-[0.2em] mb-4 text-center">
            <div className="s-title1">{scenes[5].title1}</div>
            <div className="s-title2 text-[#d4c3a3]">{scenes[5].title2}</div>
          </h2>
          <p className="s-sub font-['Inter',sans-serif] text-sm uppercase tracking-widest text-gray-400 text-center">
            {scenes[5].subtitle}
          </p>
        </div>
      </div>
      
    </section>
  );
}
