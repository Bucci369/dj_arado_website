'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    const particleContainer = particleContainerRef.current

    if (!section || !bioImageWrapper) return

    // Intersection Observer für is-visible Klasse
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

          // Partikel initialisieren
          if (entry.intersectionRatio >= 0.5 && particleContainer && !particleContainer.dataset.initialized) {
            setTimeout(() => {
              initUeberMichParticles(particleContainer)
              particleContainer.dataset.initialized = 'true'
            }, 200)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    observer.observe(section)

    // GSAP Animationen
    // Basis Section Animation
    gsap.fromTo(section, 
      { opacity: 0, y: 80 }, 
      {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: { 
          trigger: section, 
          start: "top 80%", 
          toggleActions: "play none none reverse" 
        }
      }
    )

    // Titel Animation
    const titleLines = section.querySelectorAll('.title-line')
    titleLines.forEach((el, i) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: i * 0.15,
          scrollTrigger: { 
            trigger: el, 
            start: "top 85%", 
            toggleActions: "play none none reverse" 
          }
        }
      )
    })

    // Underline Animation
    const titleUnderline = section.querySelector('.title-underline')
    if (titleUnderline) {
      gsap.fromTo(titleUnderline, 
        { opacity: 0, scaleX: 0 }, 
        {
          opacity: 1, 
          scaleX: 1, 
          duration: 0.6,
          scrollTrigger: { 
            trigger: titleUnderline, 
            start: "top 85%", 
            toggleActions: "play none none reverse" 
          }
        }
      )
    }

    // Bio Image Animation
    const bioImage = section.querySelector('.bio-image')
    if (bioImage) {
      gsap.fromTo(bioImage,
        { 
          opacity: 0, 
          scale: 0.8, 
          rotateY: -15, 
          x: -50 
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioImage,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Bio Paragraphs Animation
    const bioParagraphs = section.querySelectorAll('.bio-paragraph')
    bioParagraphs.forEach((paragraph, index) => {
      gsap.fromTo(paragraph,
        { 
          opacity: 0, 
          y: 30, 
          x: 20 
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Parallax für Profilbild
    let parallaxAnimationId: number | null = null
    const parallaxIntensityImage = 10
    const liftAmountImage = 10

    const handleMouseMove = (e: MouseEvent) => {
      if (!section.classList.contains('is-visible')) return
      
      if (parallaxAnimationId) return
      parallaxAnimationId = requestAnimationFrame(() => {
        const rect = bioImageWrapper.getBoundingClientRect()
        const mouseXpercent = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
        const mouseYpercent = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2))
        const rotateY = mouseXpercent * parallaxIntensityImage
        const rotateX = -mouseYpercent * parallaxIntensityImage * 0.6
        bioImageWrapper.style.transition = 'transform 0.05s linear'
        bioImageWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${liftAmountImage}px)`
        parallaxAnimationId = null
      })
    }

    const handleMouseLeave = () => {
      if (parallaxAnimationId) {
        cancelAnimationFrame(parallaxAnimationId)
        parallaxAnimationId = null
      }
      bioImageWrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      bioImageWrapper.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)'
    }

    const bioContent = section.querySelector('.bio-content')
    if (bioContent) {
      bioContent.addEventListener('mousemove', handleMouseMove)
      bioContent.addEventListener('mouseleave', handleMouseLeave)
    }

    // Cleanup
    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      if (bioContent) {
        bioContent.removeEventListener('mousemove', handleMouseMove)
        bioContent.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // Partikel-Funktion
  const initUeberMichParticles = (container: HTMLDivElement) => {
    createGenericParticles(container, 20, 'particle', 'ueberMichParticleFloat')
  }

  const createGenericParticles = (
    container: HTMLDivElement, 
    count: number, 
    particleClass: string, 
    animationNamePrefix: string
  ) => {
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
      particle.classList.add(particleClass)
      const size = defaults.minSize + Math.random() * (defaults.maxSize - defaults.minSize)
      
      let cssProps = `
        width: ${size}px; 
        height: ${size}px; 
        left: ${Math.random() * 100}%; 
        top: ${Math.random() * 100}%; 
        animation-duration: ${defaults.minDuration + Math.random() * (defaults.maxDuration - defaults.minDuration)}s; 
        animation-delay: ${defaults.minDelay + Math.random() * (defaults.maxDelay - defaults.minDelay)}s; 
        will-change: transform, opacity;
      `
      
      if (particleClass === 'particle') { 
        cssProps += `
          background: rgba(64, 224, 208, ${0.4 + Math.random() * 0.4}); 
          box-shadow: 0 0 ${Math.random() * 8 + 2}px rgba(64, 224, 208, ${0.3 + Math.random() * 0.3});
        `
      }
      
      particle.style.cssText = cssProps
      fragment.appendChild(particle)
    }
    
    container.innerHTML = ''
    container.appendChild(fragment)
  }

  return (
    <section 
      ref={sectionRef}
      id="ueber-mich" 
      className="page-section"
    >
      <div 
        ref={particleContainerRef}
        className="particle-container"
      />
      
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-line">About</span>
          <span className="title-line">me</span>
        </h2>
        <div className="title-underline"></div>
      </div>
      
      <div className="bio-content">
        <div 
          ref={bioImageWrapperRef}
          className="bio-image-wrapper"
          style={{ perspective: '1000px' }}
        >
          <div className="bio-image">
            <Image
              src="/assets/images/Profilbild1.jpg"
              alt="Foto von DJ ARADO"
              width={320}
              height={400}
              className="bio-image-img"
              priority
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div className="image-overlay"></div>
          </div>
        </div>
        
        <div className="bio-text">
          <p className="bio-paragraph">
            From Desolat and Remote Area to Moon Harbour via Düsseldorf – in short, that's how Arado's story is best summed up. With the spotlight getting brighter for this talented German export, he's already accrued a world-wide scroll of premium parties at Cocoon and Watergate Germany, Tenax in Italy, Café D'Anvers in Belgium, WMC in Miami, and a legendary closing finale last season at Space in Ibiza.
          </p>
          <p className="bio-paragraph">
            Arado is genuine proof that almost everything is possible with the right amount of dedication and perseverance. As an undeniably talented producer - his "Uganda Express" release, signed by Loco Dice for his Desolat label, kick-started his career to international status.
          </p>
          <p className="bio-paragraph">
            Following this acclaimed release came other outstanding productions on labels such as All Inn and Dame Music, which ultimately led to an EP on Matthias Tanzmann's Moon Harbour label that even took him aboard their booking squad.
          </p>
          <p className="bio-paragraph">
            Whether in the beginning in partnership with Den Ishu or nowadays in collaboration with Italian Marco Faraone, Arada simply knows a thing or two about rocking the Deep & Tech House Floors worldwide. His raw, driving grooves with a Chicago edge enjoy the support of the international DJ elite, and are responsible for propelling him to the top of the rankings as an electronic music artist.
          </p>
        </div>
      </div>
    </section>
  )
}