'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export default function LandingSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true) // Für initiale Animationen, die nicht scroll-gesteuert sind
  }, [])

  const sectionRef = useRef<HTMLDivElement>(null); // Ref für die gesamte Sektion

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // GEÄNDERT: Animation endet, wenn die Mitte der Sektion den oberen Rand erreicht
    offset: ["start start", "center start"] 
  });

  const nameAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  }

  const letterAnimation = { // Für den DJ Namen
    hidden: { 
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // Animation für das initiale Erscheinen der Slogan-Container
  const sloganPartContainerAnimation = {
    hidden: (isPart1: boolean) => ({
      x: isPart1 ? -200 : 200,
      opacity: 0,
    }),
    visible: (isPart1: boolean) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: isPart1 ? 2 : 2.3,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const djName = "DJ ARADO"
  const sloganTextPart1 = "Sounds that";
  const sloganTextPart2 = "move your soul!";


  // Individual letter animations for chaotic disappearing effect
  const sloganPart1Letters = sloganTextPart1.split('');
  const sloganPart2Letters = sloganTextPart2.split('');
  
  // Create individual transforms for each letter - all hooks at component level
  const letter0Transform = {
    opacity: useTransform(scrollYProgress, [0.1, 0.6], [1, 0]),
    y: useTransform(scrollYProgress, [0.1, 0.6], [0, -50]),
    rotate: useTransform(scrollYProgress, [0.1, 0.6], [0, 10]),
    scale: useTransform(scrollYProgress, [0.1, 0.6], [1, 0.3])
  };
  
  const letter1Transform = {
    opacity: useTransform(scrollYProgress, [0.12, 0.65], [1, 0]),
    y: useTransform(scrollYProgress, [0.12, 0.65], [0, -65]),
    rotate: useTransform(scrollYProgress, [0.12, 0.65], [0, -15]),
    scale: useTransform(scrollYProgress, [0.12, 0.65], [1, 0.3])
  };
  
  const letter2Transform = {
    opacity: useTransform(scrollYProgress, [0.14, 0.7], [1, 0]),
    y: useTransform(scrollYProgress, [0.14, 0.7], [0, -80]),
    rotate: useTransform(scrollYProgress, [0.14, 0.7], [0, 20]),
    scale: useTransform(scrollYProgress, [0.14, 0.7], [1, 0.3])
  };
  
  const letter3Transform = {
    opacity: useTransform(scrollYProgress, [0.16, 0.75], [1, 0]),
    y: useTransform(scrollYProgress, [0.16, 0.75], [0, -95]),
    rotate: useTransform(scrollYProgress, [0.16, 0.75], [0, -25]),
    scale: useTransform(scrollYProgress, [0.16, 0.75], [1, 0.3])
  };
  
  const letter4Transform = {
    opacity: useTransform(scrollYProgress, [0.18, 0.8], [1, 0]),
    y: useTransform(scrollYProgress, [0.18, 0.8], [0, -110]),
    rotate: useTransform(scrollYProgress, [0.18, 0.8], [0, 30]),
    scale: useTransform(scrollYProgress, [0.18, 0.8], [1, 0.3])
  };
  
  const letter5Transform = {
    opacity: useTransform(scrollYProgress, [0.2, 0.85], [1, 0]),
    y: useTransform(scrollYProgress, [0.2, 0.85], [0, -125]),
    rotate: useTransform(scrollYProgress, [0.2, 0.85], [0, -35]),
    scale: useTransform(scrollYProgress, [0.2, 0.85], [1, 0.3])
  };
  
  const letter6Transform = {
    opacity: useTransform(scrollYProgress, [0.22, 0.9], [1, 0]),
    y: useTransform(scrollYProgress, [0.22, 0.9], [0, -140]),
    rotate: useTransform(scrollYProgress, [0.22, 0.9], [0, 40]),
    scale: useTransform(scrollYProgress, [0.22, 0.9], [1, 0.3])
  };
  
  const letter7Transform = {
    opacity: useTransform(scrollYProgress, [0.24, 0.95], [1, 0]),
    y: useTransform(scrollYProgress, [0.24, 0.95], [0, -155]),
    rotate: useTransform(scrollYProgress, [0.24, 0.95], [0, -45]),
    scale: useTransform(scrollYProgress, [0.24, 0.95], [1, 0.3])
  };
  
  const letter8Transform = {
    opacity: useTransform(scrollYProgress, [0.26, 1.0], [1, 0]),
    y: useTransform(scrollYProgress, [0.26, 1.0], [0, -170]),
    rotate: useTransform(scrollYProgress, [0.26, 1.0], [0, 50]),
    scale: useTransform(scrollYProgress, [0.26, 1.0], [1, 0.3])
  };
  
  const letter9Transform = {
    opacity: useTransform(scrollYProgress, [0.28, 1.0], [1, 0]),
    y: useTransform(scrollYProgress, [0.28, 1.0], [0, -185]),
    rotate: useTransform(scrollYProgress, [0.28, 1.0], [0, -55]),
    scale: useTransform(scrollYProgress, [0.28, 1.0], [1, 0.3])
  };
  
  const letter10Transform = {
    opacity: useTransform(scrollYProgress, [0.3, 1.0], [1, 0]),
    y: useTransform(scrollYProgress, [0.3, 1.0], [0, -200]),
    rotate: useTransform(scrollYProgress, [0.3, 1.0], [0, 60]),
    scale: useTransform(scrollYProgress, [0.3, 1.0], [1, 0.3])
  };
  
  const letterTransforms = [
    letter0Transform, letter1Transform, letter2Transform, letter3Transform,
    letter4Transform, letter5Transform, letter6Transform, letter7Transform, 
    letter8Transform, letter9Transform, letter10Transform,
    // Add more transforms for "move your soul!" 
    letter0Transform, letter1Transform, letter2Transform, letter3Transform,
    letter4Transform, letter5Transform, letter6Transform, letter7Transform,
    letter8Transform, letter9Transform, letter10Transform, letter0Transform,
    letter1Transform, letter2Transform, letter3Transform
  ];

  return (
    <>
      <section 
        id="hero"
        ref={sectionRef} // Ref hier zugewiesen
        className="page-section min-h-screen relative flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #050508 0%, #0a0a10 100%)',
        }}
      >
        <div className="absolute inset-0 bg-black" />

        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Edge Wave Animation from Music Section */}
        <div className="hero-edge-wave-container">
          <div className="hero-edge-wave"></div>
          <div className="hero-edge-wave"></div>
          <div className="hero-edge-wave"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* EINFACHE SICHTBARE WEISSE KREISE */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full opacity-20"
            animate={{ scale: [1, 1.5, 1], rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ filter: 'blur(40px)' }}
          />
          
          <motion.div
            className="absolute top-2/3 right-1/4 w-48 h-48 bg-white rounded-full opacity-15"
            animate={{ scale: [0.8, 1.3, 0.8], x: [0, 30, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            style={{ filter: 'blur(30px)' }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full opacity-10"
            animate={{ scale: [1, 2, 1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            style={{ filter: 'blur(60px)', transform: 'translate(-50%, -50%)' }}
          />
          
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-white opacity-25"
            animate={{ 
              borderRadius: ['20%', '50%', '20%'],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 3 }}
            style={{ filter: 'blur(35px)' }}
          />
        </div>
        
        {/* STARKE SICHTBARE HINTERGRUND-EFFEKTE */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            animate={{ 
              scale: [1, 1.8, 1], 
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 360]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ 
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
              filter: 'blur(50px)',
              boxShadow: '0 0 200px rgba(255, 255, 255, 0.5)'
            }}
          />
          
          <motion.div
            className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full"
            animate={{ 
              scale: [0.5, 1.5, 0.5], 
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            style={{ 
              background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.2))',
              filter: 'blur(60px)',
              boxShadow: '0 0 150px rgba(255, 255, 255, 0.4)'
            }}
          />
          
          <motion.div
            className="absolute top-1/6 right-1/6 w-64 h-64"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 2, 1],
              borderRadius: ['20%', '50%', '80%', '20%']
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            style={{ 
              background: 'conic-gradient(from 0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.8))',
              filter: 'blur(40px)',
              boxShadow: '0 0 300px rgba(255, 255, 255, 0.6)'
            }}
          />
        </div>
        
        <div className="relative z-10 text-center">
          <motion.div
            variants={nameAnimation}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="mb-8"
          >
            <h1 className="hero-title relative">
              {djName.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterAnimation}
                  className="inline-block relative"
                  style={{
                    background: char === ' ' ? 'transparent' : 
                      'linear-gradient(135deg, #ffffff 0%, #40e0d0 50%, #ff4757 100%)',
                    WebkitBackgroundClip: char === ' ' ? 'unset' : 'text',
                    WebkitTextFillColor: char === ' ' ? 'transparent' : 'transparent',
                    backgroundClip: char === ' ' ? 'unset' : 'text',
                    color: char === ' ' ? 'transparent' : 'transparent',
                    marginRight: char === ' ' ? '0.2em' : '0',
                    textShadow: char === ' ' ? 'none' : '0 0 30px rgba(64, 224, 208, 0.3)',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-red-400/20 blur-xl -z-10" />
            </h1>
          </motion.div>

          <div className="mb-12 hero-slogan">
            <motion.div
              custom={true}
              variants={sloganPartContainerAnimation}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="block text-gray-300"
            >
              {sloganPart1Letters.map((char, index) => {
                const transforms = letterTransforms[index];
                return (
                  <motion.span
                    key={index}
                    style={{
                      display: 'inline-block',
                      opacity: transforms.opacity,
                      y: transforms.y,
                      rotate: transforms.rotate,
                      scale: transforms.scale,
                      marginRight: char === ' ' ? '0.3em' : '0',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                );
              })}
            </motion.div>

            <motion.div
              custom={false}
              variants={sloganPartContainerAnimation}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="block text-white font-medium"
            >
              {sloganPart2Letters.map((char, index) => {
                const transforms = letterTransforms[index + sloganPart1Letters.length];
                return (
                  <motion.span
                    key={index}
                    style={{
                      display: 'inline-block',
                      opacity: transforms.opacity,
                      y: transforms.y,
                      rotate: transforms.rotate,
                      scale: transforms.scale,
                      marginRight: char === ' ' ? '0.3em' : '0',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center scroll-down-indicator"
        >
          <a href="#ueber-mich" className="flex flex-col items-center gap-2 text-white/70 hover:text-red-400 transition-all duration-300 hover:-translate-y-1">
            <div className="scroll-wheel w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2 transition-colors duration-300 hover:border-red-400/70">
              <motion.div
                className="scroll-dot w-1 h-2 bg-white/70 rounded-full transition-colors duration-300"
                animate={{ 
                  y: [0, 12, 20],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />
            </div>
          </a>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => {
            // Verwende Index-basierte deterministische Werte statt Math.random()
            const leftPercent = (i * 7.3 + 13.7) % 100
            const topPercent = (i * 11.1 + 23.4) % 100
            const duration = 3 + (i % 3)
            const delay = (i * 0.3) % 2
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration, repeat: Infinity, delay }}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}