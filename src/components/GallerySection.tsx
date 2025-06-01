'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    { src: "/assets/images/image1.jpg", alt: "Performance at Berghain", featured: true },
    { src: "/assets/images/Profilbild1.jpg", alt: "Studio Session", featured: false },
    { src: "/assets/images/image1.jpg", alt: "Festival Crowd", featured: false },
    { src: "/assets/images/Profilbild1.jpg", alt: "DJ Setup", featured: false },
    { src: "/assets/images/image1.jpg", alt: "Backstage", featured: false },
    { src: "/assets/images/Profilbild1.jpg", alt: "Live Performance", featured: false },
  ]

  return (
    <>
      <section 
        id="gallery" 
        className="page-section section-is-white new-style-section"
        style={{
          background: 'linear-gradient(to bottom, #0f1419 0%, #3a5668 100%)',
          position: 'relative'
        }}
      >
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-line">My</span>
            <span className="title-line">Gallery</span>
          </h2>
          <div className="title-underline"></div>
        </div>

        <div className="gallery-container">
          <div className="gallery-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className={`gallery-item ${image.featured ? 'featured' : ''}`}
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="gallery-image">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="gallery-img"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  
                  <div className="gallery-overlay">
                    <div className="zoom-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  <div className="gallery-info">
                    <h3>{image.alt}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="gallery-modal"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Gallery Image"
              fill
              className="modal-image"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            
            <button
              onClick={() => setSelectedImage(null)}
              className="modal-close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}