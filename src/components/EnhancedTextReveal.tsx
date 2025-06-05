'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface EnhancedTextRevealProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  delay?: number
}

export default function EnhancedTextReveal({
  children,
  className = '',
  stagger = 0.05,
  direction = 'up',
  distance = 50,
  duration = 0.8,
  delay = 0
}: EnhancedTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split text into words for better word wrapping
    const text = container.textContent || ''
    container.innerHTML = ''
    
    const words = text.split(' ').map((word, index) => {
      const span = document.createElement('span')
      span.textContent = word
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.marginRight = '0.25em' // Add space between words
      
      // Set initial transform based on direction
      const transform = {
        up: `translateY(${distance}px)`,
        down: `translateY(-${distance}px)`,
        left: `translateX(${distance}px)`,
        right: `translateX(-${distance}px)`
      }
      
      span.style.transform = transform[direction]
      span.style.willChange = 'transform, opacity'
      
      return span
    })

    words.forEach(word => container.appendChild(word))

    // GSAP animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true
      }
    })

    tl.to(words, {
      opacity: 1,
      y: direction === 'up' || direction === 'down' ? 0 : undefined,
      x: direction === 'left' || direction === 'right' ? 0 : undefined,
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: 'power3.out'
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [children, stagger, direction, distance, duration, delay])

  return (
    <div 
      ref={containerRef}
      className={`enhanced-text-reveal ${className}`}
    >
      {children}
    </div>
  )
}