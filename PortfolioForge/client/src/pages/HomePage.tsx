import { useState } from "react";
import { LandingOverlay } from "@/components/LandingOverlay";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <div className="min-h-screen">
      {showLanding && <LandingOverlay onComplete={() => setShowLanding(false)} />}
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
