'use client'

// GSAP Animationen für .zoom-list-item werden von gsap-animations.js gehandhabt

export default function ClubsSection() {
  const venues = [
    "Tomorrowland", "Watergate, Berlin", "Space, Ibiza", "Awakenings",
    "Berghain / Panorama Bar", "Fabric, London", "Cocoon", "Time Warp",
    "DC10, Ibiza", "Printworks, London", "Movement Detroit", "Sonus Festival"
  ];

  return (
    <section 
      id="clubs" 
      className="page-section new-style-section min-h-screen py-20 px-8 flex flex-col items-center justify-center text-white" // section-is-white entfernt
      // style={{ background: 'linear-gradient(to bottom, #050508 0%, #0f1419 100%)' }} // Entfernt
      style={{ position: 'relative' }}
    >
      <div className="section-header mb-16">
        <h2 className="section-title text-5xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-wide text-center mb-4">
          <span className="title-line block">Clubs &</span>
          <span className="title-line block">Events</span>
        </h2>
        <div className="title-underline"></div>
      </div>
      
      <div className="zoom-list-container max-w-3xl w-full text-center">
        <ul className="zoom-list list-none p-0 m-0">
          {venues.map((venue, index) => (
            <li 
              key={index}
              className="zoom-list-item text-white py-4 mb-4 opacity-1 transform scale-100 will-change-[opacity,transform] cursor-pointer hover:text-cyan-200 transition-colors duration-300"
              style={{ fontSize: '1.8rem', fontWeight: '600' }}
              // opacity, transform und will-change werden von GSAP in gsap-animations.js gesteuert
            >
              {venue}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}