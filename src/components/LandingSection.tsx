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
  
  // Create individual transforms for slogan letters - dissolving in all directions
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
          background: 'linear-gradient(180deg, #050508 0%, #0f1419 100%)',
          marginBottom: 0,
          paddingBottom: 0,
          minHeight: '100vh',
          padding: '0 2rem'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-slate-900/5 to-cyan-900/5" />

        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />


        
        <div className="relative z-10 text-center">
          <motion.div
            variants={nameAnimation}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="mb-8"
          >
            <h1 className="hero-title relative" style={{ display: 'flex', flexDirection: 'row' }}>
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
                    marginRight: char === ' ' ? '0.1em' : '0',
                    textShadow: char === ' ' ? 'none' : '0 0 30px rgba(64, 224, 208, 0.3)',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
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
                      x: transforms.x,
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
                      x: transforms.x,
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
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center scroll-down-indicator"
        >
          <a href="#about-me" className="flex flex-col items-center gap-2 text-white/70 hover:text-red-400 transition-all duration-300 hover:-translate-y-1">
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

      </section>
    </>
  )
}