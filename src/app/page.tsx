import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
    </main>
  );
}
