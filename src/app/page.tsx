import HeroSection from '@/components/landing/HeroSection';
import AboutAndTracksSection from '@/components/landing/AboutAndTracksSection';
import HackathonTimeline from '@/components/timeline/HackathonTimeline';
import PreviousYearsPhotos from '@/components/previous-years/PreviousYearsPhotos';
import SponsorsSection from '@/components/sponsors/SponsorsSection';
import FAQSection from '@/components/faq/FAQSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventSchema from '@/components/SEO/EventSchema';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] relative">
      <EventSchema />
      <Navbar />
      <HeroSection />
      <AboutAndTracksSection />
      <HackathonTimeline />
      <PreviousYearsPhotos />
      <SponsorsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
