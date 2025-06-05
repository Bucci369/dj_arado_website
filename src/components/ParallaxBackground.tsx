'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ParallaxLayer {
  speed: number
  color: string
  opacity: number
  blur?: number
  size: number
  pattern?: 'dots' | 'lines' | 'grid' | 'noise'
}

interface ParallaxBackgroundProps {
  layers?: ParallaxLayer[]
  height?: string
}

export default function ParallaxBackground({ 
  layers = [
    { speed: 0.2, color: '#FF0057', opacity: 0.05, size: 400 },
    { speed: 0.4, color: '#00D4FF', opacity: 0.08, size: 300 },
    { speed: 0.6, color: '#7B61FF', opacity: 0.06, size: 500 }
  ],
  height = '100vh'
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create parallax layers
    layers.forEach((layer, index) => {
      const layerElement = document.createElement('div')
      layerElement.className = `parallax-layer-${index}`
      
      layerElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
          ${layer.color} 0%, 
          transparent ${layer.size}px);
        opacity: ${layer.opacity};
        will-change: transform;
        pointer-events: none;
        ${layer.blur ? `filter: blur(${layer.blur}px);` : ''}
      `
      
      container.appendChild(layerElement)

      // Parallax animation
      gsap.to(layerElement, {
        y: `${layer.speed * 100}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })

    // Add floating elements
    for (let i = 0; i < 8; i++) {
      const floatingElement = document.createElement('div')
      floatingElement.className = `floating-element-${i}`
      
      const size = Math.random() * 4 + 2
      const x = Math.random() * 100
      const y = Math.random() * 100
      
      floatingElement.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        will-change: transform;
        pointer-events: none;
      `
      
      container.appendChild(floatingElement)

      // Floating animation
      gsap.to(floatingElement, {
        y: `${(Math.random() - 0.5) * 200}px`,
        x: `${(Math.random() - 0.5) * 100}px`,
        rotation: 360,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Parallax on floating elements
      gsap.to(floatingElement, {
        y: `${Math.random() * 100 + 50}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [layers])

  return (
    <div 
      ref={containerRef}
      className="parallax-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: height,
        zIndex: -1,
        overflow: 'hidden'
      }}
    />
  )
}