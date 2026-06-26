import HeroSection from '@/components/landing/HeroSection';
import AboutAndTracksSection from '@/components/landing/AboutAndTracksSection';
import HackathonTimeline from '@/components/timeline/HackathonTimeline';
import SponsorsSection from '@/components/sponsors/SponsorsSection';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] relative">
      <Navbar />
      <HeroSection />
      <AboutAndTracksSection />
      <HackathonTimeline />
      <SponsorsSection />
    </main>
  );
}
