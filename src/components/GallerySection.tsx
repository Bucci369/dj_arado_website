'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
  size: 'small' | 'medium' | 'large'
  width: number
  height: number
  objectPosition?: string // NEU: Optionale Eigenschaft für object-position
}

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images: GalleryImage[] = [
    {
      src: "/assets/images/image8.jpg",
      alt: "ARADO Profile",
      size: 'large',
      width: 800,
      height: 1200,
      objectPosition: 'center 20%' // Beispiel: Fokus etwas oberhalb der Mitte
    },
    {
      src: "/assets/images/image6.jpg",
      alt: "Studio Session",
      size: 'small',
      width: 1920,
      height: 1080,
      objectPosition: 'center top' // Beispiel: Fokus auf den oberen Teil des Bildes
    },
    {
      src: "/assets/images/image9.jpg",
      alt: "Festival Crowd",
      size: 'medium',
      width: 1080,
      height: 1920,
      objectPosition: 'center center' // Standard, falls nicht anders nötig
    },
    {
      src: "/assets/images/image2.jpg",
      alt: "DJ Setup",
      size: 'small',
      width: 1600,
      height: 900
    }, // Lässt objectPosition weg, wird dann Standard 'center'
    {
      src: "/assets/images/image5.jpg",
      alt: "Backstage",
      size: 'large',
      width: 1200,
      height: 800,
      objectPosition: 'center 30%' // Beispiel: Fokus etwas oberhalb der Mitte
    },
    {
      src: "/assets/images/image7.jpg",
      alt: "Live Performance",
      size: 'medium',
      width: 1920,
      height: 1280
    },
    {
      src: "/assets/images/image4.jpg",
      alt: "Pacha Event",
      size: 'small',
      width: 900,
      height: 1600
    },
  ]

  const getImageSizes = (size: GalleryImage['size']): string => {
    switch (size) {
      case 'small':
        return "(min-width: 1024px) 16vw, (min-width: 768px) 24vw, 90vw"
      case 'medium':
        return "(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 90vw"
      case 'large':
        return "(min-width: 1024px) 48vw, (min-width: 768px) 98vw, 90vw"
      default:
        return "90vw"
    }
  }

  return (
    <>
      <style jsx global>{`
        .custom-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          grid-auto-rows: minmax(180px, auto);
          gap: 1rem;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .custom-gallery-item {
          overflow: hidden;
          border-radius: 12px;
        }

        .custom-gallery-item--small {
          grid-column: span 1;
          grid-row: span 1;
        }

        .custom-gallery-item--medium {
          grid-column: span 2;
          grid-row: span 1;
        }

        .custom-gallery-item--large {
          grid-column: span 2;
          grid-row: span 2;
        }

        @media (max-width: 1024px) {
          .custom-gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: minmax(150px, auto);
          }
          .custom-gallery-item--medium {
            grid-column: span 1;
            grid-row: span 2;
          }
          .custom-gallery-item--large {
            grid-column: span 2;
            grid-row: span 2;
          }
        }

        @media (max-width: 768px) {
          .custom-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: minmax(120px, auto);
            gap: 0.5rem;
          }
          .custom-gallery-item--medium {
            grid-column: span 2;
            grid-row: span 1;
          }
          .custom-gallery-item--large {
            grid-column: span 2;
            grid-row: span 2;
          }
        }

        .custom-gallery-image {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
        }

        .custom-gallery-image img {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-gallery-item:hover .custom-gallery-image img {
          transform: scale(1.05);
        }

        .custom-gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .custom-gallery-item:hover .custom-gallery-overlay {
          opacity: 1;
        }

        .custom-gallery-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          color: white;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .custom-gallery-item:hover .custom-gallery-info {
          transform: translateY(0);
        }

        .modal-image {
          object-fit: contain !important;
        }
      `}</style>

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

        <div className="custom-gallery-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className={`custom-gallery-item custom-gallery-item--${image.size}`}
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="custom-gallery-image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={getImageSizes(image.size)}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '12px',
                    // NEU: objectPosition dynamisch setzen
                    // Wenn image.objectPosition nicht definiert ist, wird 'center' als Standard verwendet.
                    objectPosition: image.objectPosition || 'center',
                  }}
                  priority={index < 3}
                />
                <div className="custom-gallery-overlay">
                  <div className="zoom-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                <div className="custom-gallery-info">
                  <h3>{image.alt}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal (unverändert) */}
      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Vergrößerte Ansicht"
              fill
              className="modal-image"
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
            />
            <button
              aria-label="Schließen"
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