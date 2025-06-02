// src/components/GallerySection.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

// Definiere ein Interface für deine Bild-Objekte
interface GalleryImage {
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large' | 'tall';
  // Optional: Für eine noch bessere Performance und weniger Layout Shift
  // könnten Sie die tatsächlichen Bilddimensionen hier speichern und
  // an die <Image /> Komponente übergeben (selbst wenn `fill` verwendet wird).
  // widthPx?: number;
  // heightPx?: number;
}

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images: GalleryImage[] = [
    { src: "/assets/images/Profilbild1.jpg", alt: "ARADO Profile", size: 'large' },
    { src: "/assets/images/image1.jpg", alt: "Studio Session", size: 'medium' },
    { src: "/assets/images/Profilbild1.jpg", alt: "Festival Crowd", size: 'small' },
    { src: "/assets/images/image1.jpg", alt: "DJ Setup", size: 'medium' },
    { src: "/assets/images/Profilbild1.jpg", alt: "Backstage", size: 'small' },
    { src: "/assets/images/image1.jpg", alt: "Live Performance", size: 'tall' },
    { src: "/assets/images/Profilbild1.jpg", alt: "Club Night", size: 'medium' },
    { src: "/assets/images/image1.jpg", alt: "Electronic Vibes", size: 'large' },
    { src: "/assets/images/Profilbild1.jpg", alt: "Sunset Set", size: 'small' },
    { src: "/assets/images/image1.jpg", alt: "Crowd Energy", size: 'medium' },
  ]

  // Hilfsfunktion zur Bestimmung des 'sizes'-Attributs für Next.js Image
  // Dies ist entscheidend, damit Next.js die korrekten, optimierten Bildgrößen lädt.
  // Die Werte sind Schätzungen basierend auf den Spaltenlayouts.
  // (Desktop: 6 Spalten, Tablet: 4 Spalten, Mobile: 1 Spalte)
  // Sie müssen eventuell die `vw`-Werte anpassen, wenn Ihre Spaltenbreiten
  // oder Lücken (gap) stark von Standardwerten abweichen.
  const getImageSizes = (size: GalleryImage['size']): string => {
    // Diese Logik geht davon aus, dass die Spalten ungefähr gleichmäßig verteilt sind.
    // Beispiel: Ein 'small'-Item (span 1) auf Desktop (6 Spalten) ist ca. 100vw/6 breit.
    // Ein 'medium'-Item (span 2) auf Desktop ist ca. 100vw/3 breit.
    // Beachten Sie `grid-gap`. Für Präzision könnten Sie `calc()` verwenden, aber `vw` ist oft ausreichend.
    switch (size) {
      case 'small':
      case 'tall': // 'tall' ist schmal (span 1), Höhe kommt vom Bild
        return "(min-width: 1024px) 16vw, (min-width: 768px) 24vw, 90vw"; // ca. 1/6, 1/4, fast voll
      case 'medium':
        return "(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 90vw"; // ca. 2/6, 2/4, fast voll
      case 'large':
        return "(min-width: 1024px) 48vw, (min-width: 768px) 98vw, 90vw";   // ca. 3/6, fast voll, fast voll
      default:
        return "90vw"; // Fallback für kleinere Viewports oder unbekannte Größen
    }
  };


  return (
    <>
      <section
        id="gallery"
        className="page-section section-is-white new-style-section"
        style={{
          // Ihr Hintergrund-Styling
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
                className={`gallery-item gallery-item--${image.size}`}
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="gallery-image"> {/* Dieser Container ist wichtig für `fill` */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill // Füllt den übergeordneten Container `.gallery-image` aus
                    className="gallery-img" // Ihre Klasse für object-fit, transition etc.
                    sizes={getImageSizes(image.size)} // Dynamisches sizes-Attribut
                    // Optional: Wenn Sie widthPx/heightPx im Interface haben:
                    // placeholder={image.widthPx && image.heightPx ? "blur" : "empty"}
                    // blurDataURL={ generiere eine sehr kleine base64 Version des Bildes hier falls gewünscht }
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
          onClick={() => setSelectedImage(null)} // Schließt Modal bei Klick auf Hintergrund
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Verhindert Schließen bei Klick auf Inhalt
          >
            <Image
              src={selectedImage}
              alt="Vergrößerte Ansicht des Galeriebildes"
              fill // Füllt .modal-content, aber object-fit: contain sorgt für korrekte Anzeige
              className="modal-image" // Enthält object-fit: contain
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw" // Beispiel für Modal-Größen
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