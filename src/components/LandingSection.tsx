'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export default function LandingSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrambleComplete, setScrambleComplete] = useState(false);
  const [rFlipped, setRFlipped] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const targetName = "ARADO";
  
  const glitchChars = ['@', '#', '$', '%', '&', '*', '/', '\\', '|', '?', '!', '~', '^', '¿', '¡', '§', '±', '∞', '∑', '∂', '∆', '∏', '√', '∫', '≈', '≠', '≤', '≥', '◊', '◆', '●', '○', '□', '■', '△', '▽', '◉', '◎', '◐', '◑'];
  const alphaChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const allChars = [...glitchChars, ...alphaChars];
  
  const [displayChars, setDisplayChars] = useState<string[]>(targetName.split(''));
  
  useEffect(() => {
    // console.log('rFlipped state:', rFlipped);
  }, [rFlipped]);
  
  useEffect(() => {
    if (!isMounted) return;
    
    const scrambleIntervals: NodeJS.Timeout[] = [];
    const finalTimeouts: NodeJS.Timeout[] = [];
    
    targetName.split('').forEach((targetChar, index) => {
      const scrambleDuration = 2000 + Math.random() * 1500; 
      let currentScrambleSpeed = 50 + Math.random() * 50; 
      const decayFactor = 0.98; 

      let scrambleCount = 0;
      const maxScrambles = Math.floor(scrambleDuration / currentScrambleSpeed); 
      
      const interval = setInterval(() => {
        scrambleCount++;
        currentScrambleSpeed /= decayFactor; 
        
        setDisplayChars(prev => {
          const newChars = [...prev];
          if (scrambleCount < maxScrambles * 0.7) {
            newChars[index] = allChars[Math.floor(Math.random() * allChars.length)];
          } else {
            newChars[index] = alphaChars[Math.floor(Math.random() * alphaChars.length)];
          }
          return newChars;
        });
      }, currentScrambleSpeed); 
      
      scrambleIntervals.push(interval);
      
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayChars(prev => {
          const newChars = [...prev];
          newChars[index] = targetChar;
          return newChars;
        });
        
        if (index === targetName.length - 1) {
          setTimeout(() => {
            setScrambleComplete(true);
            setTimeout(() => {
              // console.log('Setting R to flipped!');
              setRFlipped(true);
            }, 1000);
          }, 200);
        }
      }, scrambleDuration);
      
      finalTimeouts.push(timeout);
    });
    
    return () => {
      scrambleIntervals.forEach(clearInterval);
      finalTimeouts.forEach(clearTimeout);
    };
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"] 
  });

  const sloganPartContainerAnimation = { 
    hidden: (isPart1: boolean) => ({ x: isPart1 ? -200 : 200, opacity: 0 }),
    visible: (isPart1: boolean) => ({ x: 0, opacity: 1, transition: { delay: isPart1 ? 2.8 : 3.1, duration: 0.8, ease: "easeOut" } }),
  };

  const sloganTextPart1 = "Sounds that";
  const sloganTextPart2 = "move your soul!";
  const sloganPart1Letters = sloganTextPart1.split('');
  const sloganPart2Letters = sloganTextPart2.split('');
  
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

  const letterTransforms =  [
    letter0Transform, letter1Transform, letter2Transform, letter3Transform,
    letter4Transform, letter5Transform, letter6Transform, letter7Transform, 
    letter8Transform, letter9Transform, letter10Transform,
    letter0Transform, letter1Transform, letter2Transform, letter3Transform,
    letter4Transform, letter5Transform, letter6Transform, letter7Transform,
    letter8Transform, letter9Transform, letter10Transform, letter0Transform,
    letter1Transform, letter2Transform, letter3Transform
  ];

  return (
    <>
      <style jsx global>{`
        /* LDR Glitch Effects */
        @keyframes glitch-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          92.5% { opacity: 0.6; }
          93% { opacity: 1; }
          93.5% { opacity: 0.4; }
          94% { opacity: 1; }
        }

        @keyframes rgb-split {
          0%, 100% {
            text-shadow: 
              0 0 0 transparent,
              0 0 0 transparent;
          }
          20% {
            text-shadow: 
              -2px 0 #ff0080, /* var(--color-primary) wäre konsistenter */
              2px 0 #00ffff; /* var(--color-secondary) wäre konsistenter */
          }
          40% {
            text-shadow: 
              2px 0 #ff0080,
              -2px 0 #00ffff;
          }
          60% {
            text-shadow: 
              -1px 0 #ff0080,
              1px 0 #00ffff;
          }
          80% {
            text-shadow: 
              1px 0 #ff0080,
              -1px 0 #00ffff;
          }
        }

        @keyframes digital-distortion {
          0%, 100% { 
            filter: none; 
            transform: translateX(0) translateY(0) skew(0deg);
          }
          20% { 
            filter: blur(0.5px); 
            transform: translateX(-1px) translateY(0) skew(0.5deg);
          }
          40% { 
            filter: blur(0px); 
            transform: translateX(1px) translateY(0) skew(-0.5deg);
          }
          60% { 
            filter: blur(0.3px); 
            transform: translateX(0) translateY(1px) skew(0.3deg);
          }
          80% { 
            filter: blur(0px); 
            transform: translateX(0) translateY(-1px) skew(-0.3deg);
          }
        }

        @keyframes scanlines {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 10px;
          }
        }

        .ldr-glitch-container {
          position: relative;
          display: inline-block;
        }

        .ldr-glitch-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 2px,
            rgba(255, 255, 255, 0.03) 4px
          );
          animation: scanlines 8s linear infinite;
          pointer-events: none;
          z-index: 1; /* Über dem hero-title-glow, aber unter dem Text */
        }

        .ldr-char {
          display: inline-block;
          position: relative;
          animation: 
            glitch-flicker 4s infinite,
            digital-distortion 8s infinite;
          animation-delay: calc(var(--char-index) * 0.1s);
          transform-style: preserve-3d;
        }

        .ldr-char.scrambling {
          /* Diese Stile werden in globals.css unter .ldr-char.scrambling definiert und sind spezifischer.
             Daher werden die Farbvariablen dort verwendet.
          animation: 
            rgb-split 0.3s infinite, 
            digital-distortion 0.2s infinite; 
          color: #fff;
          text-shadow: 
            0 0 10px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(255, 255, 255, 0.1); */
        }

        .ldr-char.glitch-loop {
          animation: 
            glitch-flicker 3s infinite,
            rgb-split 4s infinite,
            digital-distortion 6s infinite;
          animation-delay: calc(var(--char-index) * 0.2s);
        }

        /* Glow effect behind ARADO */
        .hero-title-glow {
          position: relative;
          z-index: 0; /* Stellt sicher, dass ::before dahinter ist */
        }

        .hero-title-glow::before {
          content: attr(data-text);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          filter: blur(40px);
          opacity: 0.15;
          z-index: -1; /* Hinter dem eigentlichen Text */
          pointer-events: none;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          white-space: nowrap;
          color: var(--text-primary); /* Stellt sicher, dass der Glow die richtige Farbe hat */
        }

        .r-letter {
          display: inline-block;
          position: relative;
          color: #FFFFFF; /* var(--text-primary) */
          transform-style: preserve-3d;
          transition: transform 0.6s ease-in-out;
        }
        
        .r-letter.flipped {
          transform: rotateY(180deg);
        }
        
        .r-letter.glitch-loop {
          animation: 
            glitch-flicker 3s infinite,
            rgb-split 4s infinite;
          animation-delay: 0.2s; /* Fester Wert, da es nur ein R gibt */
        }

        @keyframes glitch-spike {
          0%, 100% { 
            transform: translateX(0);
            filter: none;
          }
          50% {
            transform: translateX(2px);
            filter: hue-rotate(90deg) saturate(3);
          }
        }

        .ldr-char:nth-child(2n) {
          animation-name: glitch-flicker, rgb-split, digital-distortion, glitch-spike;
          animation-duration: 3s, 4s, 6s, 10s; /* Standardwerte */
          animation-iteration-count: infinite;
        }

        @media (max-width: 768px) {
          .ldr-char, .r-letter.glitch-loop { /* r-letter auch anpassen */
            animation-duration: 6s, 8s, 10s, 12s; /* Längere Durations für Mobile */
          }
          .hero-title-glow::before {
            filter: blur(20px); /* Weniger intensiver Glow auf Mobile */
            opacity: 0.2;
          }
        }
      `}</style>

      <section 
        id="hero"
        ref={sectionRef}
        className="page-section min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
        // style={{ background: 'linear-gradient(180deg, #050508 0%, #0f1419 100%)' }} // Entfernt, wird von globals.css (#hero) und ScrollBackground.tsx gesteuert
        style={{ marginBottom: 0, paddingBottom: 0, minHeight: '100vh', padding: '0 2rem' }}
      >
        {/* Dekorative Overlays können hier bleiben, wenn sie über dem ScrollBackground liegen sollen */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-slate-900/5 to-cyan-900/5 opacity-50 pointer-events-none" /> 
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />
        
        <div className="relative z-10 text-center"> {/* z-index erhöht, um sicherzustellen, dass der Inhalt über den Wellen liegt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMounted ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 
              className="hero-title hero-title-glow ldr-glitch-container" 
              data-text={targetName} // Für ::before Glow
              style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'center',
                perspective: '1000px' // Für 3D-Effekte der Buchstaben
              }}
            >
              {displayChars.map((char, index) => {
                const isR = index === 1; // Annahme: R ist der zweite Buchstabe
                
                if (isR) {
                  return (
                    <span
                      key={`ldr-${index}`}
                      className={`r-letter ${rFlipped ? 'flipped' : ''} ${scrambleComplete ? 'glitch-loop' : ''}`}
                      style={{
                        '--char-index': index, // Für animation-delay in .glitch-loop
                        // textShadow wird durch .glitch-loop und globals.css .ldr-char.scrambling gesteuert
                      } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  );
                }
                
                return (
                  <motion.span
                    key={`ldr-${index}`}
                    className={`ldr-char ${!scrambleComplete ? 'scrambling' : 'glitch-loop'}`}
                    style={{
                      '--char-index': index,
                      // color: '#FFFFFF', // Wird von .ldr-char.scrambling in globals.css gesteuert
                      // textShadow: ..., // Wird von .ldr-char.scrambling in globals.css gesteuert
                      transformStyle: 'preserve-3d',
                      display: 'inline-block',
                    } as React.CSSProperties}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ opacity: { duration: 0.1 } }} // Sehr kurze Fade-In für jeden Buchstaben beim Scramblen
                  >
                    {char}
                  </motion.span>
                );
              })}
            </h1>
          </motion.div>

          <div className="mb-12 hero-slogan">
            <motion.div
              custom={true} 
              variants={sloganPartContainerAnimation}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              className="block text-gray-300" // var(--text-secondary) wäre konsistenter
            >
              {sloganPart1Letters.map((char, index) => {
                const transformIndex = index % letterTransforms.length; 
                const transforms = letterTransforms[transformIndex];
                return (
                  <motion.span 
                    key={`s1-${index}`} 
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
              animate={isMounted ? "visible" : "hidden"}
              className="block text-white font-medium" // var(--text-primary) wäre konsistenter
            >
              {sloganPart2Letters.map((char, index) => {
                const transformIndex = (index + sloganPart1Letters.length) % letterTransforms.length;
                const transforms = letterTransforms[transformIndex];
                return (
                  <motion.span 
                    key={`s2-${index}`} 
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
          animate={isMounted ? { opacity: 1 } : { opacity: 0 }} // GSAP steuert dies bereits in gsap-animations.js
          transition={{ delay: 3.5, duration: 1 }} // Kann bleiben oder von GSAP gesteuert werden
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center scroll-down-indicator"
        >
          <a href="#about-me" className="flex flex-col items-center gap-2 text-white/70 hover:text-red-400 transition-all duration-300 hover:-translate-y-1"> {/* text-red-400 -> var(--color-primary) */}
            <div className="scroll-wheel w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2 transition-colors duration-300 hover:border-red-400/70"> {/* var(--color-primary) */}
              <motion.div 
                className="scroll-dot w-1 h-2 bg-white/70 rounded-full transition-colors duration-300" 
                animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
              />
            </div>
          </a>
        </motion.div>
      </section>
    </>
  )
}