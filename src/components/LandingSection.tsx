// src/components/LandingSection.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
// GSAP wird für diesen spezifischen Effekt nicht benötigt, kann aber für andere Dinge bleiben
// import { gsap } from 'gsap'; 
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LandingSection() {
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const nameToAnimate = "ARADO";

  // Framer Motion Varianten für den Namen "ARADO"
  const nameContainerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3, // Kleiner Delay bevor die Buchstabenanimation startet
        staggerChildren: 0.1, // Abstand zwischen den Buchstabenanimationen für Kaskade
      },
    },
  };

  const nameLetterAnimation = {
    hidden: { 
      opacity: 0, 
      y: 20,          // Startet leicht verschoben
      rotateX: -90,   // Startet um 90 Grad gekippt (von oben oder unten, je nach transformOrigin)
      transformOrigin: "center bottom", // Dreht um die untere Kante des Buchstabens
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring", 
        damping: 12, 
        stiffness: 100,
        // duration: 0.5, // Alternative mit duration und ease
        // ease: [0.6, 0.01, -0.05, 0.95] 
      },
    },
  };

  // Framer Motion Logik für den Slogan (bleibt wie von dir detailliert definiert)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"] 
  });

  const sloganPartContainerAnimation = { 
    hidden: (isPart1: boolean) => ({ x: isPart1 ? -200 : 200, opacity: 0 }),
    visible: (isPart1: boolean) => ({ x: 0, opacity: 1, transition: { delay: isPart1 ? 1.0 : 1.3, duration: 0.8, ease: "easeOut" } }), // Delays angepasst
  };

  const sloganTextPart1 = "Sounds that";
  const sloganTextPart2 = "move your soul!";
  const sloganPart1Letters = sloganTextPart1.split('');
  const sloganPart2Letters = sloganTextPart2.split('');
  
  // --- DEINE ORIGINALEN letterXTransform DEFINITIONEN FÜR DEN SLOGAN ---
  // (Aus deiner Datei LandingSection.tsx von ca. 23:00 Uhr Sonntag)
  const letter0Transform = {
    opacity: useTransform(scrollYProgress, [0.1, 0.6], [1, 0]),
    x: useTransform(scrollYProgress, [0.1, 0.6], [0, -120]),
    y: useTransform(scrollYProgress, [0.1, 0.6], [0, -80]),
    rotate: useTransform(scrollYProgress, [0.1, 0.6], [0, 45]),
    scale: useTransform(scrollYProgress, [0.1, 0.6], [1, 0])
  };
  const letter1Transform = {
    opacity: useTransform(scrollYProgress, [0.12, 0.65], [1, 0]),
    x: useTransform(scrollYProgress, [0.12, 0.65], [0, 150]),
    y: useTransform(scrollYProgress, [0.12, 0.65], [0, -120]),
    rotate: useTransform(scrollYProgress, [0.12, 0.65], [0, -60]),
    scale: useTransform(scrollYProgress, [0.12, 0.65], [1, 0])
  };
  const letter2Transform = {
    opacity: useTransform(scrollYProgress, [0.14, 0.7], [1, 0]),
    x: useTransform(scrollYProgress, [0.14, 0.7], [0, -80]),
    y: useTransform(scrollYProgress, [0.14, 0.7], [0, 100]),
    rotate: useTransform(scrollYProgress, [0.14, 0.7], [0, 90]),
    scale: useTransform(scrollYProgress, [0.14, 0.7], [1, 0])
  };
  const letter3Transform = {
    opacity: useTransform(scrollYProgress, [0.16, 0.75], [1, 0]),
    x: useTransform(scrollYProgress, [0.16, 0.75], [0, 200]),
    y: useTransform(scrollYProgress, [0.16, 0.75], [0, 60]),
    rotate: useTransform(scrollYProgress, [0.16, 0.75], [0, -120]),
    scale: useTransform(scrollYProgress, [0.16, 0.75], [1, 0])
  };
  const letter4Transform = {
    opacity: useTransform(scrollYProgress, [0.18, 0.8], [1, 0]),
    x: useTransform(scrollYProgress, [0.18, 0.8], [0, -180]),
    y: useTransform(scrollYProgress, [0.18, 0.8], [0, -40]),
    rotate: useTransform(scrollYProgress, [0.18, 0.8], [0, 180]),
    scale: useTransform(scrollYProgress, [0.18, 0.8], [1, 0])
  };
  const letter5Transform = {
    opacity: useTransform(scrollYProgress, [0.2, 0.85], [1, 0]),
    x: useTransform(scrollYProgress, [0.2, 0.85], [0, 90]),
    y: useTransform(scrollYProgress, [0.2, 0.85], [0, -160]),
    rotate: useTransform(scrollYProgress, [0.2, 0.85], [0, -90]),
    scale: useTransform(scrollYProgress, [0.2, 0.85], [1, 0])
  };
  const letter6Transform = {
    opacity: useTransform(scrollYProgress, [0.22, 0.9], [1, 0]),
    x: useTransform(scrollYProgress, [0.22, 0.9], [0, -250]),
    y: useTransform(scrollYProgress, [0.22, 0.9], [0, 140]),
    rotate: useTransform(scrollYProgress, [0.22, 0.9], [0, 270]),
    scale: useTransform(scrollYProgress, [0.22, 0.9], [1, 0])
  };
  const letter7Transform = {
    opacity: useTransform(scrollYProgress, [0.24, 0.95], [1, 0]),
    x: useTransform(scrollYProgress, [0.24, 0.95], [0, 170]),
    y: useTransform(scrollYProgress, [0.24, 0.95], [0, -90]),
    rotate: useTransform(scrollYProgress, [0.24, 0.95], [0, 135]),
    scale: useTransform(scrollYProgress, [0.24, 0.95], [1, 0])
  };
  const letter8Transform = {
    opacity: useTransform(scrollYProgress, [0.26, 1.0], [1, 0]),
    x: useTransform(scrollYProgress, [0.26, 1.0], [0, -140]),
    y: useTransform(scrollYProgress, [0.26, 1.0], [0, -200]),
    rotate: useTransform(scrollYProgress, [0.26, 1.0], [0, -180]),
    scale: useTransform(scrollYProgress, [0.26, 1.0], [1, 0])
  };
  const letter9Transform = {
    opacity: useTransform(scrollYProgress, [0.28, 1.0], [1, 0]),
    x: useTransform(scrollYProgress, [0.28, 1.0], [0, 220]),
    y: useTransform(scrollYProgress, [0.28, 1.0], [0, 180]),
    rotate: useTransform(scrollYProgress, [0.28, 1.0], [0, 315]),
    scale: useTransform(scrollYProgress, [0.28, 1.0], [1, 0])
  };
  const letter10Transform = {
    opacity: useTransform(scrollYProgress, [0.3, 1.0], [1, 0]),
    x: useTransform(scrollYProgress, [0.3, 1.0], [0, -300]),
    y: useTransform(scrollYProgress, [0.3, 1.0], [0, 80]),
    rotate: useTransform(scrollYProgress, [0.3, 1.0], [0, 225]),
    scale: useTransform(scrollYProgress, [0.3, 1.0], [1, 0])
  };

  const letterTransforms = [
    letter0Transform, letter1Transform, letter2Transform, letter3Transform,
    letter4Transform, letter5Transform, letter6Transform, letter7Transform, 
    letter8Transform, letter9Transform, letter10Transform,
    letter0Transform, letter1Transform, letter2Transform, letter3Transform,
    letter4Transform, letter5Transform, letter6Transform, letter7Transform,
    letter8Transform, letter9Transform, letter10Transform, letter0Transform,
    letter1Transform, letter2Transform, letter3Transform
  ];
  // --- ENDE DEINER SLOGAN letterTransforms ---

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  return (
    <>
      <section 
        id="hero"
        ref={sectionRef}
        className="page-section min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #050508 0%, #0f1419 100%)',
          marginBottom: 0, paddingBottom: 0, minHeight: '100vh', padding: '0 2rem'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-slate-900/5 to-cyan-900/5" />
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
        
        <div className="relative z-10 text-center">
          {/* Angepasste Framer Motion Animation für "ARADO" */}
          <motion.div
            variants={nameContainerAnimation}
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            className="mb-8" // Beibehaltung des Abstands
            style={{ perspective: '1000px' }} // Perspektive für 3D-Effekt
          >
            <h1 className="hero-title relative" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {nameToAnimate.split('').map((char, index) => (
                <motion.span
                  key={`arado-${index}`}
                  variants={nameLetterAnimation}
                  className="inline-block relative" 
                  style={{
                    // Reine weiße Schrift, kein Farbverlauf mehr
                    color: '#FFFFFF', 
                    // WebkitTextFillColor: 'transparent', // Nicht mehr nötig für solid color
                    // backgroundClip: 'unset',            // Nicht mehr nötig
                    // background: 'none',                 // Nicht mehr nötig
                    marginRight: char === ' ' ? '0.1em' : '0', 
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.2)', // Leichterer Textschatten
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Slogan (Deine bestehende Framer Motion Logik) */}
          <div className="mb-12 hero-slogan">
            <motion.div
              custom={true} 
              variants={sloganPartContainerAnimation}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              className="block text-gray-300"
            >
              {sloganPart1Letters.map((char, index) => {
                const transformIndex = index % letterTransforms.length; 
                const transforms = letterTransforms[transformIndex];
                return ( <motion.span key={`s1-${index}`} style={{ display: 'inline-block', opacity: transforms.opacity, x: transforms.x, y: transforms.y, rotate: transforms.rotate, scale: transforms.scale, marginRight: char === ' ' ? '0.3em' : '0', }}>{char === ' ' ? '\u00A0' : char}</motion.span> );
              })}
            </motion.div>
            <motion.div
              custom={false}
              variants={sloganPartContainerAnimation}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              className="block text-white font-medium"
            >
              {sloganPart2Letters.map((char, index) => {
                const transformIndex = (index + sloganPart1Letters.length) % letterTransforms.length;
                const transforms = letterTransforms[transformIndex];
                return ( <motion.span key={`s2-${index}`} style={{ display: 'inline-block', opacity: transforms.opacity, x: transforms.x, y: transforms.y, rotate: transforms.rotate, scale: transforms.scale, marginRight: char === ' ' ? '0.3em' : '0', }}>{char === ' ' ? '\u00A0' : char}</motion.span> );
              })}
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indikator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }} // Delay angepasst an neue Namensanimation
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center scroll-down-indicator"
        >
          <a href="#about-me" className="flex flex-col items-center gap-2 text-white/70 hover:text-red-400 transition-all duration-300 hover:-translate-y-1">
            <div className="scroll-wheel w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2 transition-colors duration-300 hover:border-red-400/70">
              <motion.div className="scroll-dot w-1 h-2 bg-white/70 rounded-full transition-colors duration-300" animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1]}} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            </div>
          </a>
        </motion.div>
      </section>
    </>
  )
}