'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface SpotifyTrack {
  id: string
  name: string
  preview_url: string | null
  external_urls: {
    spotify: string
  }
  album: {
    images: Array<{
      url: string
      height: number
      width: number
    }>
    name: string
  }
  artists: Array<{
    name: string
  }>
  duration_ms: number
  popularity: number
}

export default function MusicSection() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [loading, setLoading] = useState(true)
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])

  const getStoredAradoTracks = (): SpotifyTrack[] => {
    try {
      if (typeof window === 'undefined') return [];
      const stored = localStorage.getItem('aradoTracks')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  const storeAradoTracks = (tracksToStore: SpotifyTrack[]) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem('aradoTracks', JSON.stringify(tracksToStore))
    } catch {
      // localStorage not available or error
    }
  }

  const fetchSpotifyTracks = useCallback(async () => {
    try {
      setLoading(true)
      const existingTracks = getStoredAradoTracks()
      
      if (existingTracks.length > 0) {
        setTracks(existingTracks.slice(0, 6)); // Zeige max. 6 gespeicherte Tracks
      }
      
      const searches = [
        'artist:"Arado"', 'artist:"DJ ARADO"', '"Uganda Express"', 'artist:"Arado" techno', 
        'artist:"Arado" house', 'Desolat label', '"Den Ishu" Arado'
      ];
      let allFoundTracks: SpotifyTrack[] = [...existingTracks];
      let fetchedNewTracks: SpotifyTrack[] = [];

      for (const searchTerm of searches) {
        if (fetchedNewTracks.length >= 6 && existingTracks.length === 0) break; // Genug neue Tracks, wenn keine alten da waren
        if (allFoundTracks.length >= 12) break; // Limitiere die Gesamtmenge, um API-Calls zu schonen

        try {
          const searchResponse = await fetch(`/api/deezer-search?q=${encodeURIComponent(searchTerm)}&limit=10`)
          if (searchResponse.ok) {
            const data = await searchResponse.json()
            if (data.tracks && data.tracks.length > 0) {
              const relevantTracks = data.tracks.filter((track: SpotifyTrack) => {
                const trackNameLower = track.name.toLowerCase();
                const artistNameLower = track.artists[0]?.name.toLowerCase() || '';
                const albumNameLower = track.album?.name.toLowerCase() || '';
                
                const isAradoRelated = 
                  artistNameLower.includes('arado') ||
                  trackNameLower.includes('uganda express') ||
                  albumNameLower.includes('desolat') ||
                  (trackNameLower.includes('techno') && artistNameLower.includes('arado')) ||
                  (trackNameLower.includes('house') && artistNameLower.includes('arado'));
                
                const isNotDuplicate = !allFoundTracks.some(existing => existing.id === track.id);
                return isAradoRelated && isNotDuplicate && track.preview_url; // Nur Tracks mit Preview
              });
              fetchedNewTracks = [...fetchedNewTracks, ...relevantTracks];
              allFoundTracks = [...existingTracks, ...fetchedNewTracks]; // Update allFoundTracks korrekt
            }
          }
        } catch (error) {
          console.warn(`Search failed for: ${searchTerm}`, error);
          continue;
        }
      }
      
      const combinedTracks = [...existingTracks];
      fetchedNewTracks.forEach(ft => {
        if (!combinedTracks.some(et => et.id === ft.id)) {
            combinedTracks.push(ft);
        }
      });

      // Sortiere nach Popularität (optional, aber gut für Relevanz) und nehme die Top 6
      const sortedTracks = combinedTracks.sort((a, b) => b.popularity - a.popularity);
      const finalTracksToShow = sortedTracks.slice(0, 6);

      if (finalTracksToShow.length > 0) {
        setTracks(finalTracksToShow);
        storeAradoTracks(finalTracksToShow); // Speichere die relevantesten Tracks
      } else if (existingTracks.length === 0) { // Nur Fallback, wenn absolut nichts gefunden wurde
        console.log('No Arado tracks found, using demo tracks');
        setTracks(getFallbackTracks().slice(0, 6));
      }
      
    } catch (error) {
      console.error('Error fetching tracks:', error)
      if(tracks.length === 0) setTracks(getFallbackTracks().slice(0,6)); // Fallback bei generellem Fehler
    } finally {
      setLoading(false)
    }
  }, [tracks.length]) // Abhängigkeit hinzugefügt, um ggf. neu zu laden, falls Tracks leer sind

  useEffect(() => {
    fetchSpotifyTracks()
  }, [fetchSpotifyTracks]) // Wird jetzt nur einmal beim Mounten aufgerufen, es sei denn, fetchSpotifyTracks ändert sich

  const getFallbackTracks = (): SpotifyTrack[] => [
    { id: 'fb1', name: 'Uganda Express (Fallback)', preview_url: '/assets/audio/track1.mp3', external_urls: { spotify: '#' }, album: { name: 'Desolat X005', images: [{ url: '/assets/images/image1.jpg', height: 640, width: 640 }] }, artists: [{ name: 'DJ ARADO & Den Ishu' }], duration_ms: 30000, popularity: 0 },
    { id: 'fb2', name: 'Berlin Nights (Fallback)', preview_url: '/assets/audio/track2.mp3', external_urls: { spotify: '#' }, album: { name: 'Desolat Sessions', images: [{ url: '/assets/images/Profilbild1.jpg', height: 640, width: 640 }] }, artists: [{ name: 'DJ ARADO' }], duration_ms: 30000, popularity: 0 },
    { id: 'fb3', name: 'Deep House Therapy (Fallback)', preview_url: '/assets/audio/track3.mp3', external_urls: { spotify: '#' }, album: { name: 'Underground Collective', images: [{ url: '/assets/images/image1.jpg', height: 640, width: 640 }] }, artists: [{ name: 'DJ ARADO' }], duration_ms: 30000, popularity: 0 },
    { id: 'fb4', name: 'Techno Dreams (Fallback)', preview_url: '/assets/audio/track1.mp3', external_urls: { spotify: '#' }, album: { name: 'Electronic Visions', images: [{ url: '/assets/images/Profilbild1.jpg', height: 640, width: 640 }] }, artists: [{ name: 'DJ ARADO' }], duration_ms: 30000, popularity: 0 },
    { id: 'fb5', name: 'Another Vibe (Fallback)', preview_url: '/assets/audio/track2.mp3', external_urls: { spotify: '#' }, album: { name: 'Moon Harbour', images: [{ url: '/assets/images/image6.jpg', height: 640, width: 640 }] }, artists: [{ name: 'DJ ARADO' }], duration_ms: 30000, popularity: 0 },
    { id: 'fb6', name: 'Rhythm Construct (Fallback)', preview_url: '/assets/audio/track3.mp3', external_urls: { spotify: '#' }, album: { name: 'All Inn Records', images: [{ url: '/assets/images/image8.jpg', height: 640, width: 640 }] }, artists: [{ name: 'DJ ARADO' }], duration_ms: 30000, popularity: 0 },
  ];

  const togglePlay = (trackIndex: number) => {
    const track = tracks[trackIndex]
    if (!track?.preview_url) {
      console.warn('No preview available for this track or track is undefined');
      return;
    }

    const audio = audioRefs.current[trackIndex]
    if (!audio) return

    audioRefs.current.forEach((otherAudio, index) => {
      if (otherAudio && index !== trackIndex) {
        otherAudio.pause()
        otherAudio.currentTime = 0
      }
    })

    if (currentTrack === trackIndex && isPlaying) {
      audio.pause()
      setIsPlaying(false)
      // setCurrentTrack(null); // Behalte currentTrack für UI-Feedback, pausiere nur
    } else {
      audio.play().catch(error => console.error('Error playing track:', error))
      setIsPlaying(true)
      setCurrentTrack(trackIndex)
    }
  }

  const openSpotify = (spotifyUrl: string) => {
    if (spotifyUrl && spotifyUrl !== '#') {
      window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
    }
  }

  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, tracks.length);
    const cleanupFunctions: (() => void)[] = [];

    audioRefs.current.forEach((audio, index) => {
      if (audio) {
        const handleEnded = () => {
          if (currentTrack === index) { // Nur wenn der aktuell spielende Track endet
            setIsPlaying(false);
            // setCurrentTrack(null); // Optional: Zurücksetzen, wenn gewünscht
          }
        };
        audio.addEventListener('ended', handleEnded);
        
        const cleanup = () => audio.removeEventListener('ended', handleEnded);
        cleanupFunctions.push(cleanup);
      }
    });
    return () => {
        cleanupFunctions.forEach(cf => cf());
    };
  }, [tracks, currentTrack]); // currentTrack hinzugefügt


  return (
    <section 
      id="my-music" // "my-music" statt "meine-musik" für Konsistenz mit CSS oben
      className="page-section new-style-section" // section-is-white entfernt, da BG von ScrollBackground kommt
      // style={{ background: 'linear-gradient(to bottom, #1a2832 0%, #3a5668 100%)' }} // Entfernt
      style={{ position: 'relative' }}
    >
      <div className="music-bg-subtle">
        <div className="sound-wave wave-1"></div>
        <div className="sound-wave wave-2"></div>
        <div className="sound-wave wave-3"></div>
      </div>

      <div className="section-header">
        <h2 className="section-title text-5xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-wide text-center mb-4">
          <span className="title-line">My</span>
          <span className="title-line">Music</span>
        </h2>
        <div className="title-underline"></div>
      </div>
      
      {loading && tracks.length === 0 ? ( // Zeige Spinner nur, wenn geladen wird UND keine Tracks da sind (z.B. initial)
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading tracks...</p>
        </div>
      ) : tracks.length === 0 ? ( // Zeige Nachricht, wenn keine Tracks gefunden wurden und nicht mehr geladen wird
        <div style={{ color: 'white', gridColumn: '1 / -1', textAlign: 'center', zIndex: 2, position: 'relative' }}>
            Could not load tracks at this moment. Please try again later.
        </div>
      ) : (
        <div className="spotify-players-container">
          {tracks.map((track, index) => (
            <div
              key={track.id || `track-${index}`} // Fallback key
              className={`spotify-player player-${index + 1} ${
                currentTrack === index && isPlaying ? 'is-playing' : ''
              }`}
              // style={{ border: '2px solid #666' }} // Debug border entfernt
            >
              {currentTrack === index && isPlaying && (
                <div className="wave-impulses">
                  <div className="wave-ring ring-1"></div>
                  <div className="wave-ring ring-2"></div>
                  <div className="wave-ring ring-3"></div>
                </div>
              )}
              
              <div 
                className="album-cover"
                style={{
                  backgroundImage: `url(${track.album.images[1]?.url || track.album.images[0]?.url || '/assets/images/image_fallback.jpg'})` // Fallback-Bild hinzugefügt
                }}
              ></div>
              
              <button 
                className="play-button"
                onClick={() => togglePlay(index)}
                aria-label={`Play or pause ${track.name}`} // Aria-label verbessert
                disabled={!track.preview_url} // Button deaktivieren, wenn keine Preview vorhanden
              >
                {currentTrack === index && isPlaying ? (
                  <svg viewBox="0 0 24 24"> {/* Pause Icon */}
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24"> {/* Play Icon */}
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              <div className="track-info">
                <h3 className="track-title">{track.name}</h3>
                <p className="track-artist">{track.artists.map(a => a.name).join(', ')}</p>
              </div>
              
              <button 
                className="spotify-link"
                onClick={() => openSpotify(track.external_urls.spotify)}
                title={`Open ${track.name} in Spotify`} // Titel verbessert
                disabled={!track.external_urls.spotify || track.external_urls.spotify === '#'}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </button>
              
              {track.preview_url && (
                <audio
                  ref={(el) => { audioRefs.current[index] = el; }}
                  src={track.preview_url}
                  preload="metadata" // oder "auto" wenn Previews kurz sind
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}