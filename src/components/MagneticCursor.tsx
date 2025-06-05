'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    if (!cursor || !cursorDot || typeof window === 'undefined') return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseEnter = (e: MouseEvent) => {
      if (!e || !e.target) return
      
      const target = e.target as HTMLElement
      if (!target || typeof target.classList === 'undefined') return
      
      try {
        if (target.classList.contains('magnetic-element') || 
            target.closest?.('.magnetic-element')) {
          gsap.to(cursor, {
            scale: 2,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(cursorDot, {
            scale: 0.5,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      } catch (error) {
        console.warn('MagneticCursor: Error in handleMouseEnter', error)
      }
    }

    const handleMouseLeave = () => {
      try {
        gsap.to([cursor, cursorDot], {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      } catch (error) {
        console.warn('MagneticCursor: Error in handleMouseLeave', error)
      }
    }

    const animateCursor = () => {
      try {
        cursorX += (mouseX - cursorX) * 0.1
        cursorY += (mouseY - cursorY) * 0.1

        gsap.set(cursor, {
          x: cursorX - 20,
          y: cursorY - 20
        })

        gsap.set(cursorDot, {
          x: mouseX - 3,
          y: mouseY - 3
        })

        animationId = requestAnimationFrame(animateCursor)
      } catch (error) {
        console.warn('MagneticCursor: Error in animateCursor', error)
      }
    }

    // Check if we're on a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true })
      document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true })
      document.addEventListener('mouseleave', handleMouseLeave, { passive: true, capture: true })
      
      animateCursor()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined') {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return null
  }

  return (
    <>
      <div 
        ref={cursorRef}
        className="magnetic-cursor"
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'none',
          display: 'block'
        }}
      />
      <div 
        ref={cursorDotRef}
        className="magnetic-cursor-dot"
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
          transition: 'none',
          display: 'block'
        }}
      />
    </>
  )
}