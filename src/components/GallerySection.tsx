'use client'

import { useState, useEffect, useRef, useCallback, KeyboardEvent as ReactKeyboardEvent } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large' | 'tall'; // tall hinzugefügt, falls verwendet
  width: number;
  height: number;
  objectPosition?: string;
}

export default function GallerySection() {
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);

  const images: GalleryImage[] = [ 
    {
      src: "/assets/images/image8.jpg", alt: "ARADO Profile", size: 'large', width: 800, height: 1200, objectPosition: 'center 20%',
      id: ''
    },
    {
      src: "/assets/images/image6.jpg", alt: "Studio Session", size: 'small', width: 1920, height: 1080, objectPosition: 'center top',
      id: ''
    },
    {
      src: "/assets/images/image9.jpg", alt: "Festival Crowd", size: 'medium', width: 1080, height: 1920, objectPosition: 'center center',
      id: ''
    },
    {
      src: "/assets/images/image2.jpg", alt: "DJ Setup", size: 'small', width: 1600, height: 900,
      id: ''
    },
    {
      src: "/assets/images/image5.jpg", alt: "Backstage", size: 'large', width: 1200, height: 800, objectPosition: 'center 30%',
      id: ''
    },
    {
      src: "/assets/images/image7.jpg", alt: "Live Performance", size: 'medium', width: 1920, height: 1280,
      id: ''
    },
    {
      src: "/assets/images/image4.jpg", alt: "Pacha Event", size: 'tall', width: 900, height: 1600,
      id: ''
    }, // Beispiel für tall
  ];

  const selectedImageObject = selectedImageSrc ? images.find(img => img.src === selectedImageSrc) : null;

  const getImageSizesForNextImage = (size: GalleryImage['size']): string => {
    switch (size) {
      case 'small': return "(min-width: 1024px) 15vw, (min-width: 768px) 22vw, 45vw"; // Angepasst für kleinere Kacheln
      case 'medium': return "(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw";
      case 'large': return "(min-width: 1024px) 45vw, (min-width: 768px) 90vw, 90vw";
      case 'tall': return "(min-width: 1024px) 15vw, (min-width: 768px) 22vw, 90vw"; // Ähnlich wie small in der Breite
      default: return "90vw";
    }
  };

  const openModal = useCallback((imageSrc: string, eventTarget: HTMLElement) => {
    lastFocusedElementRef.current = eventTarget;
    setSelectedImageSrc(imageSrc);
  }, []); 

  const closeModal = useCallback(() => {
    setSelectedImageSrc(null);
    // Kleine Verzögerung kann manchmal helfen, den Fokus zuverlässig zurückzugeben
    requestAnimationFrame(() => {
        lastFocusedElementRef.current?.focus();
    });
  }, []); 

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => { 
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedImageSrc) {
      document.addEventListener('keydown', handleEscKey);
      modalCloseButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedImageSrc, closeModal]);

  const handleGalleryItemKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, imageSrc: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(imageSrc, event.currentTarget);
    }
  };

  return (
    <>
      <section
        id="gallery"
        className="page-section new-style-section" // section-is-white entfernt
        // style={{ background: 'linear-gradient(to bottom, #0f1419 0%, #3a5668 100%)' }} // Entfernt
        style={{ position: 'relative' }}
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
                key={image.src + index} // Sicherstellen, dass Keys einzigartig sind
                className={`gallery-item gallery-item--${image.size}`}
                // opacity und transform werden von GSAP in gsap-animations.js gesteuert
                onClick={(e) => openModal(image.src, e.currentTarget)}
                onKeyDown={(e) => handleGalleryItemKeyDown(e, image.src)}
                role="button"
                tabIndex={0}
                aria-label={`Öffne Bild: ${image.alt}`}
              >
                <div className="gallery-image">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={getImageSizesForNextImage(image.size)}
                    style={{
                      objectFit: 'cover',
                      objectPosition: image.objectPosition || 'center',
                    }}
                    className="gallery-img" // Stile in globals.css
                    priority={index < 4} // Ersten paar Bilder priorisieren
                  />
                  <div className="gallery-overlay">
                    <div className="zoom-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} focusable="false" aria-hidden="true">
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

      {selectedImageSrc && selectedImageObject && (
        <div
          className="gallery-modal"
          onClick={closeModal} // Schließt Modal bei Klick auf den Hintergrund
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${selectedImageObject.id || selectedImageObject.alt}`} // Für Screenreader
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
          }}
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            role="document"
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Optional: Titel für Screenreader */}
            <h2 id={`modal-title-${selectedImageObject.id || selectedImageObject.alt}`} className="sr-only"> {/* sr-only Klasse für Screenreader-Only-Text */}
              Vergrößerte Ansicht von {selectedImageObject.alt}
            </h2>
            <Image
              src={selectedImageObject.src}
              alt={selectedImageObject.alt} // Alt-Text ist hier wichtig!
              width={selectedImageObject.width}
              height={selectedImageObject.height}
              className="modal-image"
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center center'
              }}
            />
            <button
              ref={modalCloseButtonRef}
              aria-label="Schließen"
              onClick={closeModal}
              className="modal-close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} focusable="false" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// sr-only Klasse (kann in globals.css hinzugefügt werden):
/*
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
*/