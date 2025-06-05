'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)


  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Title Animation
    const titleLines = section.querySelectorAll('.title-line')
    titleLines.forEach((line, index) => {
      gsap.fromTo(line,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            once: true
          }
        }
      )
    })

    // Underline Animation
    const underline = section.querySelector('.title-underline')
    if (underline) {
      gsap.fromTo(underline,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: underline,
            start: "top 85%",
            once: true
          }
        }
      )
    }

    // Stats Number Animation
    const statNumbers = section.querySelectorAll('.stat-number')
    
    statNumbers.forEach((stat, index) => {
      const endValue = parseInt(stat.getAttribute('data-target-value') || '0')
      const startValue = parseInt(stat.getAttribute('data-start-value') || '0')
      
      // Set initial display value
      stat.textContent = startValue.toLocaleString('de-DE')
      
      // Number counting animation
      const countObj = { value: startValue }
      gsap.to(countObj, {
        value: endValue,
        duration: 2.5,
        delay: index * 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
          once: true
        },
        onUpdate: function() {
          stat.textContent = Math.round(countObj.value).toLocaleString('de-DE')
        }
      })
    })

    // Stat Items Stagger Animation
    const statItems = section.querySelectorAll('.stat-item')
    gsap.fromTo(statItems,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true
        }
      }
    )

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="stats"
      className="page-section new-style-section"
      style={{ position: 'relative' }}
    >
      <div className="section-header mb-16">
        <h2 className="section-title text-5xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-wide text-center mb-4">
          <span className="title-line block">My</span>
          <span className="title-line block">Impact</span>
        </h2>
        <div className="title-underline"></div>
      </div>

      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 2rem' }}>
        {/* LINKS UND RECHTS LAYOUT */}
        <div className="stats-layout">
          
          {/* LINKE SPALTE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* 25 - Years in Business */}
            <div style={{ textAlign: 'center' }}>
              <div 
                className="stat-number"
                data-target-value={25}
                data-start-value={10}
                style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: '700', 
                  color: '#FFFFFF !important', 
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                  textShadow: 'none',
                  filter: 'none',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                25
              </div>
              <div style={{ 
                width: '60px', 
                height: '2px', 
                backgroundColor: '#FFFFFF', 
                margin: '0.5rem auto' 
              }}></div>
              <div style={{ 
                color: '#999999', 
                fontSize: '0.9rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}>
                Years in Business
              </div>
            </div>

            {/* 492 - Releases */}
            <div style={{ textAlign: 'center' }}>
              <div 
                className="stat-number"
                data-target-value={492}
                data-start-value={0}
                style={{ 
                  fontSize: '2.2rem', 
                  fontWeight: '700', 
                  color: '#FFFFFF !important', 
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                  textShadow: 'none',
                  filter: 'none',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                492
              </div>
              <div style={{ 
                width: '60px', 
                height: '2px', 
                backgroundColor: '#FFFFFF', 
                margin: '0.5rem auto' 
              }}></div>
              <div style={{ 
                color: '#999999', 
                fontSize: '0.9rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}>
                Releases
              </div>
            </div>
          </div>

          {/* RECHTE SPALTE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* 192 - Clubs Played */}
            <div style={{ textAlign: 'center' }}>
              <div 
                className="stat-number"
                data-target-value={192}
                data-start-value={0}
                style={{ 
                  fontSize: '2.2rem', 
                  fontWeight: '700', 
                  color: '#FFFFFF !important', 
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                  textShadow: 'none',
                  filter: 'none',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                192
              </div>
              <div style={{ 
                width: '60px', 
                height: '2px', 
                backgroundColor: '#FFFFFF', 
                margin: '0.5rem auto' 
              }}></div>
              <div style={{ 
                color: '#999999', 
                fontSize: '0.9rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}>
                Clubs Played
              </div>
            </div>

            {/* 12 - Awards */}
            <div style={{ textAlign: 'center' }}>
              <div 
                className="stat-number"
                data-target-value={12}
                data-start-value={0}
                style={{ 
                  fontSize: '2.2rem', 
                  fontWeight: '700', 
                  color: '#FFFFFF !important', 
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                  textShadow: 'none',
                  filter: 'none',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                12
              </div>
              <div style={{ 
                width: '60px', 
                height: '2px', 
                backgroundColor: '#FFFFFF', 
                margin: '0.5rem auto' 
              }}></div>
              <div style={{ 
                color: '#999999', 
                fontSize: '0.9rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}>
                Awards
              </div>
            </div>
          </div>
        </div>

        {/* SPOTIFY PLAYS - GROß UNTEN */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div 
            className="stat-number spotify-plays"
            data-target-value={34822}
            data-start-value={0}
            style={{ 
              fontSize: '2.8rem', 
              fontWeight: '700', 
              color: '#FFFFFF !important', 
              lineHeight: '1',
              marginBottom: '1rem',
              textShadow: 'none',
              filter: 'none',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            34.822
          </div>
          <div style={{ 
            width: '100px', 
            height: '3px', 
            backgroundColor: '#FFFFFF', 
            margin: '1rem auto' 
          }}></div>
          <div style={{ 
            color: '#999999', 
            fontSize: '1.2rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em' 
          }}>
            Spotify Plays
          </div>
        </div>
      </div>
    </section>
  )
}