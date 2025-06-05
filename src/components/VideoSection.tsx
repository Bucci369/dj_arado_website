'use client'

import Image from 'next/image'

// GSAP Animationen für .video-item werden von gsap-animations.js gehandhabt

export default function VideoSection() {
  return (
    <section 
      id="videos" 
      className="page-section new-style-section" // section-is-white entfernt
      // style={{ background: 'linear-gradient(to bottom, #3a5668 0%, #1a2832 100%)' }} // Entfernt
      style={{ position: 'relative' }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-line">My</span>
          <span className="title-line">Videos</span>
        </h2>
        <div className="title-underline"></div>
      </div>

      <div className="video-showcase-container">
        <div className="video-grid">
          {/* Featured Video */}
          <div className="video-item featured-video"> {/* opacity & transform von GSAP gesteuert */}
            <div className="video-thumbnail">
              <Image 
                src="/assets/images/image1.jpg" 
                alt="Berghain Set 2024" 
                width={800} // Größere intrinsische Größe für Featured Video, wenn Original größer ist
                height={450}
                className="video-thumbnail-img" 
                priority // Wichtig für LCP
              />
              <div className="video-overlay">
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="video-duration">4:32:15</div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Berghain Set 2024</h3>
              <p className="video-description">Epic 4-hour journey through techno - Live from Berlin&apos;s legendary club</p>
            </div>
          </div>

          {/* Weitere Videos */}
          <div className="video-item">
            <div className="video-thumbnail">
              <Image 
                src="/assets/images/Profilbild1.jpg" 
                alt="Studio Session" 
                width={640} // Beispielhafte Größe
                height={360}
                className="video-thumbnail-img" 
              />
              <div className="video-overlay">
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="video-duration">12:45</div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Studio Sessions</h3>
              <p className="video-description">Behind the scenes production work</p>
            </div>
          </div>

          <div className="video-item">
            <div className="video-thumbnail">
              <Image 
                src="/assets/images/image7.jpg" /* Geändert für Vielfalt */ 
                alt="Festival Highlights" 
                width={640} 
                height={360}
                className="video-thumbnail-img" 
              />
              <div className="video-overlay">
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="video-duration">8:22</div>
            </div>
            <div className="video-info">
              <h3 className="video-title">Festival Highlights</h3>
              <p className="video-description">Best moments from summer festivals</p>
            </div>
          </div>

          <div className="video-item">
            <div className="video-thumbnail">
              <Image 
                src="/assets/images/image6.jpg" /* Geändert für Vielfalt */
                alt="Mix Tutorial" 
                width={640} 
                height={360}
                className="video-thumbnail-img" 
              />
              <div className="video-overlay">
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="video-duration">25:10</div>
            </div>
            <div className="video-info">
              <h3 className="video-title">DJ Mix Tutorial</h3>
              <p className="video-description">Learn my signature mixing techniques</p>
            </div>
          </div>
        </div>

        <div className="video-cta">
          <a 
            href="https://www.youtube.com/@djarado" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 1.5rem',
              textDecoration: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="live-indicator"></div>
            <span>More Videos on YouTube</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}