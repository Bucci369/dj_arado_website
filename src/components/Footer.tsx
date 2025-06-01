'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-8">
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            <span className="text-gray-300">
              © {currentYear} DJ ARADO - Deep & Tech House Artist from Berlin
            </span>
            <span className="text-gray-400">•</span>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
              Legal Notice
            </a>
            <span className="text-gray-400">•</span>
            <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}