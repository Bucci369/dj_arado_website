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


export default function Home() {
  return (
    <>
      
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