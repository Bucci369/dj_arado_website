'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EnhancedTextReveal from './EnhancedTextReveal'

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function BiographySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bioImageWrapperRef = useRef<HTMLDivElement>(null)
  const particleContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    const bioImageWrapper = bioImageWrapperRef.current
    
    if (!section || !bioImageWrapper) return

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0.1, 0.5, 0.8]
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.1) {
            section.classList.add('is-visible')
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    observer.observe(section)
    
    // GSAP Animationen werden von gsap-animations.js global gehandhabt
    // Titel, Underline, Bio Image, Bio Paragraphs
    // Parallax-Effekt bleibt hier, da er spezifisch für dieses Bild-Wrapper ist

    let parallaxAnimationId: number | null = null
    const parallaxIntensityImage = 10
    const liftAmountImage = 10

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      if (!section.classList.contains('is-visible')) return // Nur wenn Sektion sichtbar
      
      if (parallaxAnimationId) return // Verhindert Überlastung
      parallaxAnimationId = requestAnimationFrame(() => {
        const rect = bioImageWrapper.getBoundingClientRect()
        const mouseXpercent = ((mouseEvent.clientX - rect.left - rect.width / 2) / (rect.width / 2))
        const mouseYpercent = ((mouseEvent.clientY - rect.top - rect.height / 2) / (rect.height / 2))
        const rotateY = mouseXpercent * parallaxIntensityImage
        const rotateX = -mouseYpercent * parallaxIntensityImage * 0.6
        bioImageWrapper.style.transition = 'transform 0.05s linear' // Schnellere Reaktion bei Mausbewegung
        bioImageWrapper.style.transform = `rotateX(${rotateX - 8}deg) rotateY(${rotateY}deg) translateZ(${liftAmountImage}px)`
        parallaxAnimationId = null
      })
    }

    const handleMouseLeave = () => {
      if (parallaxAnimationId) {
        cancelAnimationFrame(parallaxAnimationId)
        parallaxAnimationId = null
      }
      bioImageWrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Sanftes Zurücksetzen
      bioImageWrapper.style.transform = 'rotateX(-8deg) rotateY(0deg) translateZ(0px)' // Grundrotation beibehalten
    }

    if (bioImageWrapper) {
      bioImageWrapper.addEventListener('mousemove', handleMouseMove)
      bioImageWrapper.addEventListener('mouseleave', handleMouseLeave)
    }
    
    // Partikel nur initialisieren, wenn der Container da ist
    if (particleContainerRef.current) {
        initUeberMichParticles(particleContainerRef.current);
    }


    // Cleanup
    return () => {
      observer.disconnect()
      // ScrollTrigger Kills werden global in gsap-animations.js gehandhabt
      if (bioImageWrapper) {
        bioImageWrapper.removeEventListener('mousemove', handleMouseMove)
        bioImageWrapper.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (parallaxAnimationId) {
        cancelAnimationFrame(parallaxAnimationId);
      }
    }
    
  }, []) // Keine Dependencies, da GSAP-Animationen jetzt global sind

  const createGenericParticles = (
    container: HTMLDivElement, 
    count: number, 
    particleClass: string
  ) => {
    if (!container) return; // Sicherheitscheck
    const fragment = document.createDocumentFragment()
    const defaults = { 
      minDuration: 4, 
      maxDuration: 8, 
      minDelay: 0, 
      maxDelay: 3, 
      minSize: 1, 
      maxSize: 3 
    }
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.classList.add(particleClass) // Verwendet .particle aus globals.css
      const size = defaults.minSize + Math.random() * (defaults.maxSize - defaults.minSize)
      
      // CSS-Props, die nicht von der globalen .particle-Klasse abgedeckt werden
      let cssProps = `
        width: ${size}px; 
        height: ${size}px; 
        left: ${Math.random() * 100}%; 
        top: ${Math.random() * 100}%; 
        animation-duration: ${defaults.minDuration + Math.random() * (defaults.maxDuration - defaults.minDuration)}s; 
        animation-delay: ${defaults.minDelay + Math.random() * (defaults.maxDelay - defaults.minDelay)}s; 
        will-change: transform, opacity;
      `
      // Spezifische .particle Styles aus globals.css werden automatisch angewendet
      // Keine Notwendigkeit, background oder box-shadow hier manuell zu setzen, wenn .particle global definiert ist
      
      particle.style.cssText = cssProps
      fragment.appendChild(particle)
    }
    
    container.innerHTML = '' // Alte Partikel entfernen
    container.appendChild(fragment)
  }
  
  const initUeberMichParticles = (container: HTMLDivElement) => {
    createGenericParticles(container, 30, 'particle') // Anzahl ggf. anpassen
  }


  return (
    <section 
      ref={sectionRef}
      id="about-me" 
      className="page-section"
      // style={{ background: 'linear-gradient(to bottom, #0f1419 0%, #1a2832 100%)' }} // Entfernt
      style={{ position: 'relative' }} // Nur notwendige Styles beibehalten
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-line">About</span>
          <span className="title-line">Me</span> {/* 'me' kleingeschrieben war im Original so */}
        </h2>
        <div className="title-underline"></div>
      </div>
      
      <div className="bio-content">
        <div 
          ref={bioImageWrapperRef}
          className="bio-image-wrapper"
          style={{ 
            // perspective und willChange sind in globals.css unter .bio-image-wrapper definiert
            // Redundante Styles hier entfernt, falls sie global sind
            transform: 'rotateX(-8deg) rotateY(0deg) translateZ(0px)' // Initiale leichte 3D-Rotation
          }}
        >
          <div 
            className="bio-image" // opacity und transform werden von GSAP in gsap-animations.js gesteuert
          >
            <Image
              src="/assets/images/Profilbild1.jpg"
              alt="Foto von DJ ARADO"
              width={320}
              height={400} // Höhe anpassen, um das Bild nicht zu verzerren (Original war 400)
              className="bio-image-img" // Stile dafür in globals.css
              priority // Wichtig für LCP
            />
            <div 
              className="image-overlay" // Stile dafür in globals.css
            ></div>
          </div>
        </div>
        
        <div className="bio-text">
          <EnhancedTextReveal className="bio-paragraph" direction="up" stagger={0.02} duration={1}>
            From Desolat and Remote Area to Moon Harbour via Düsseldorf – in short, that's how Arado's story is best summed up. With the spotlight getting brighter for this talented German export, he's already accrued a world-wide scroll of premium parties at Cocoon and Watergate Germany, Tenax in Italy, Café D'Anvers in Belgium, WMC in Miami, and a legendary closing finale last season at Space in Ibiza.
          </EnhancedTextReveal>
          <EnhancedTextReveal className="bio-paragraph" direction="up" stagger={0.02} duration={1} delay={0.2}>
            Arado is genuine proof that almost everything is possible with the right amount of dedication and perseverance. As an undeniably talented producer - his "Uganda Express" release, signed by Loco Dice for his Desolat label, kick-started his career to international status.
          </EnhancedTextReveal>
          <EnhancedTextReveal className="bio-paragraph" direction="up" stagger={0.02} duration={1} delay={0.4}>
            Following this acclaimed release came other outstanding productions on labels such as All Inn and Dame Music, which ultimately led to an EP on Matthias Tanzmann's Moon Harbour label that even took him aboard their booking squad.
          </EnhancedTextReveal>
          <EnhancedTextReveal className="bio-paragraph" direction="up" stagger={0.02} duration={1} delay={0.6}>
            Whether in the beginning in partnership with Den Ishu or nowadays in collaboration with Italian Marco Faraone, Arada simply knows a thing or two about rocking the Deep & Tech House Floors worldwide. His raw, driving grooves with a Chicago edge enjoy the support of the international DJ elite, and are responsible for propelling him to the top of the rankings as an electronic music artist.
          </EnhancedTextReveal>
        </div>
      </div>
    </section>
  )
}