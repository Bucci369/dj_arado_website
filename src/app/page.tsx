import LandingSection from '@/components/LandingSection'
import BiographySection from '@/components/BiographySection'
import MusicSection from '@/components/MusicSection'
import StatsSection from '@/components/StatsSection'
import LabelsSection from '@/components/LabelsSection'
import ClubsSection from '@/components/ClubsSection'
import GallerySection from '@/components/GallerySection'
import VideoSection from '@/components/VideoSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ScrollBackground from '@/components/ScrollBackground'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Home() {
  return (
    <>
      <ScrollBackground />
      <main className="relative">
        <LandingSection />
        <BiographySection />
        <MusicSection />
        <StatsSection />
        <LabelsSection />
        <ClubsSection />
        <GallerySection />
        <VideoSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}