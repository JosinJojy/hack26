import HeroSection from '@/components/landing/HeroSection';
import AboutAndTracksSection from '@/components/landing/AboutAndTracksSection';
import HackathonTimeline from '@/components/timeline/HackathonTimeline';
import SponsorsSection from '@/components/sponsors/SponsorsSection';
import FAQSection from '@/components/faq/FAQSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] relative">
      <Navbar />
      <HeroSection />
      <AboutAndTracksSection />
      <HackathonTimeline />
      <SponsorsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
