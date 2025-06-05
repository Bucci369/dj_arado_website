'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SmoothTransitions() {
  useEffect(() => {
    // Smooth section transitions with color morphing
    const sections = document.querySelectorAll('.page-section')
    
    sections.forEach((section, index) => {
      const nextSection = sections[index + 1]
      
      if (nextSection) {
        // Create transition overlay
        const overlay = document.createElement('div')
        overlay.className = 'section-transition-overlay'
        overlay.style.cssText = `
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 200px;
          background: linear-gradient(transparent, rgba(0,0,0,0.1));
          pointer-events: none;
          z-index: 1;
        `
        section.appendChild(overlay)

        // Animate transition on scroll
        gsap.to(overlay, {
          opacity: 0,
          scale: 1.1,
          scrollTrigger: {
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 1
          }
        })
      }

      // Scale effect on sections
      gsap.fromTo(section, 
        { scale: 0.9, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          }
        }
      )

      // Parallax title effects
      const title = section.querySelector('.section-title')
      if (title) {
        gsap.to(title, {
          y: '-30%',
          opacity: 0.7,
          scale: 0.95,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        })
      }
    })

    // Enhanced magnetic effects for buttons and interactive elements
    const magneticElements = document.querySelectorAll('.magnetic-button, .cta-badge, .submit-button')
    
    magneticElements.forEach(element => {
      element.classList.add('magnetic-element')
      
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = (mouseEvent.clientX - centerX) * 0.3
        const deltaY = (mouseEvent.clientY - centerY) * 0.3
        
        gsap.to(element, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        })
      }
      
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return null // This component only adds effects, no visual output
}