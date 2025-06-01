'use client'

export default function StatsSection() {
  const stats = [
    {
      number: 25,
      label: "Jahre im Business",
      startValue: 10
    },
    {
      number: 192,
      label: "Gespielte Clubs",
      startValue: 0
    },
    {
      number: 12,
      label: "Awards",
      startValue: 0
    },
    {
      number: 492,
      label: "Releases",
      startValue: 0
    }
  ]

  const spotifyStats = {
    number: 34822,
    label: "Spotify Plays",
    startValue: 0
  }

  return (
    <section 
      id="meine-stats" 
      className="page-section section-is-white new-style-section min-h-screen py-20 px-8 flex flex-col items-center justify-center bg-white text-black"
    >
      <div className="section-header mb-16">
        <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-black uppercase tracking-wide text-center mb-4">
          <span className="title-line block">My</span>
          <span className="title-line block">Impact</span>
        </h2>
        <div className="title-underline w-12 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto"></div>
      </div>

      <div className="stats-container max-w-4xl w-full mx-auto px-4">
        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 gap-8 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <span 
                className="stat-number block text-5xl md:text-6xl lg:text-7xl font-extrabold text-black leading-tight mb-2"
                data-target-value={stat.number}
                data-start-value={stat.startValue}
              >
                {stat.startValue}
              </span>
              <hr className="stat-separator w-12 h-0.5 bg-gray-300 border-none mx-auto my-2" />
              <span className="stat-label text-sm md:text-base text-gray-600 uppercase tracking-widest font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Spotify Stats - Larger, centered */}
        <div className="spotify-item stat-item text-center">
          <span 
            className="stat-number spotify-plays block text-6xl md:text-7xl lg:text-8xl font-extrabold text-black leading-tight mb-4"
            data-target-value={spotifyStats.number}
            data-start-value={spotifyStats.startValue}
          >
            {spotifyStats.startValue}
          </span>
          <hr className="stat-separator w-16 h-0.5 bg-gray-300 border-none mx-auto my-3" />
          <span className="stat-label text-lg md:text-xl text-gray-600 uppercase tracking-widest font-medium">
            {spotifyStats.label}
          </span>
        </div>
      </div>
    </section>
  )
}