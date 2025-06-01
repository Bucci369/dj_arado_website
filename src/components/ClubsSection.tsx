'use client'

export default function ClubsSection() {
  const venues = [
    "Tomorrowland",
    "Watergate, Berlin",
    "Space, Ibiza", 
    "Awakenings",
    "Berghain / Panorama Bar",
    "Fabric, London",
    "Cocoon",
    "Time Warp",
    "DC10, Ibiza",
    "Printworks, London",
    "Movement Detroit",
    "Sonus Festival"
  ]

  return (
    <section 
      id="meine-clubs" 
      className="page-section section-is-white new-style-section min-h-screen py-20 px-8 flex flex-col items-center justify-center"
    >
      <div className="section-header mb-16">
        <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-black uppercase tracking-wide text-center mb-4">
          <span className="title-line block">Clubs &</span>
          <span className="title-line block">Events</span>
        </h2>
        <div className="title-underline w-12 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto"></div>
      </div>
      
      <div className="zoom-list-container max-w-3xl w-full text-center">
        <ul className="zoom-list list-none p-0 m-0">
          {venues.map((venue, index) => (
            <li 
              key={index}
              className="zoom-list-item text-2xl md:text-3xl lg:text-4xl font-semibold text-black py-4 mb-2 opacity-0 transform scale-50 will-change-[opacity,transform] cursor-pointer hover:text-gray-600 transition-colors duration-300"
            >
              {venue}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}