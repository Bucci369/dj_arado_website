'use client'

import { useEffect, useRef } from 'react'

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const shapes = ['circle', 'triangle', 'cross'] // Nur diese 3 Formen
    const shapeCount = 20

    // Cleanup existing shapes
    container.innerHTML = ''

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div')
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)]
      
      // Random position und Größe
      const size = 30 + Math.random() * 80
      const x = Math.random() * 100
      const y = Math.random() * 100
      
      // Random Rotationsgeschwindigkeit und Richtung
      const rotationDuration = 8 + Math.random() * 15 // 8-23 Sekunden
      const rotationDirection = Math.random() > 0.5 ? 'clockwise' : 'counterclockwise'
      
      // Random Float-Animation
      const floatDuration = 6 + Math.random() * 8 // 6-14 Sekunden
      const delay = Math.random() * 5 // 0-5 Sekunden Startverzögerung
      
      shape.className = `floating-shape floating-${shapeType}`
      shape.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        border: 2px solid #FFFFFF;
        background: transparent;
        animation: 
          rotate${rotationDirection.charAt(0).toUpperCase() + rotationDirection.slice(1)} ${rotationDuration}s linear infinite,
          floatMovement ${floatDuration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        will-change: transform;
        pointer-events: none;
        opacity: 0.6;
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
        .floating-shapes-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .floating-shape {
          position: absolute;
          border: 2px solid #FFFFFF;
          background: transparent;
        }

        .floating-circle {
          border-radius: 50%;
        }

        .floating-triangle {
          width: 0;
          height: 0;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
          border-bottom: 40px solid #FFFFFF;
          background: transparent !important;
          border-top: none;
        }

        .floating-cross {
          position: relative;
          background: transparent;
        }

        .floating-cross::before,
        .floating-cross::after {
          content: '';
          position: absolute;
          background: #FFFFFF;
        }

        .floating-cross::before {
          left: 50%;
          top: 0;
          width: 2px;
          height: 100%;
          transform: translateX(-50%);
        }

        .floating-cross::after {
          top: 50%;
          left: 0;
          width: 100%;
          height: 2px;
          transform: translateY(-50%);
        }

        @keyframes rotateClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateCounterclockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes floatMovement {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-30px) translateX(20px);
          }
          50% {
            transform: translateY(-15px) translateX(-25px);
          }
          75% {
            transform: translateY(-40px) translateX(10px);
          }
        }

        /* Performance für Mobile */
        @media (max-width: 768px) {
          .floating-shape {
            animation-duration: 12s, 10s; /* Langsamere Animationen */
          }
        }

        /* Reduzierte Bewegung */
        @media (prefers-reduced-motion: reduce) {
          .floating-shape {
            animation: none;
            opacity: 0.3;
          }
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className="floating-shapes-container"
        aria-hidden="true"
      />
    </>
  )
}