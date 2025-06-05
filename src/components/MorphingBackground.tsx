'use client'

import { useEffect, useRef } from 'react'

export default function MorphingBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const shapes = ['cross', 'triangle', 'circle', 'diamond', 'star', 'hexagon']
    const shapeCount = 25 // Mehr Shapes für bessere Sichtbarkeit

    // Cleanup existing shapes
    container.innerHTML = ''

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div')
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)]
      
      // Random position und Größe
      const size = 20 + Math.random() * 60
      const x = Math.random() * 100
      const y = Math.random() * 100
      const duration = 20 + Math.random() * 40 // 20-60 Sekunden
      const delay = Math.random() * 10 // 0-10 Sekunden Startverzögerung
      
      shape.className = `morphing-shape morphing-${shapeType}`
      shape.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        opacity: 0.4;
        animation: morphRotate ${duration}s linear infinite, morphFloat ${duration * 0.8}s ease-in-out infinite;
        animation-delay: ${delay}s;
        will-change: transform;
        pointer-events: none;
      `
      
      container.appendChild(shape)
    }

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        .morphing-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
        }

        .morphing-shape {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
        }

        .morphing-cross {
          clip-path: polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%);
        }

        .morphing-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .morphing-circle {
          border-radius: 50%;
        }

        .morphing-diamond {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }

        .morphing-star {
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }

        .morphing-hexagon {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }

        @keyframes morphRotate {
          from {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.2);
          }
          50% {
            transform: rotate(180deg) scale(0.8);
          }
          75% {
            transform: rotate(270deg) scale(1.1);
          }
          to {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes morphFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-10px) translateX(-15px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.6;
          }
        }

        /* Performance Optimierungen für Mobile */
        @media (max-width: 768px) {
          .morphing-shape {
            animation-duration: 30s, 24s; /* Langsamere Animationen auf Mobile */
          }
        }

        /* Reduzierte Animation bei reduzierter Bewegung */
        @media (prefers-reduced-motion: reduce) {
          .morphing-shape {
            animation: none;
            opacity: 0.05;
          }
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className="morphing-background"
        aria-hidden="true"
        style={{
          border: '2px solid red' // Debug border um zu sehen ob Container da ist
        }}
      />
    </>
  )
}