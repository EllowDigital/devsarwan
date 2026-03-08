import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import SkillsSection from "@/components/SkillsSection";
import TerminalSection from "@/components/TerminalSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProjectShowcase3D from "@/components/ProjectShowcase3D";
import TechGlobe3D from "@/components/TechGlobe3D";
import GitHubActivitySection from "@/components/GitHubActivitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EllowDigitalSection from "@/components/EllowDigitalSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import PortfolioFooter from "@/components/PortfolioFooter";
import CursorGlow from "@/components/CursorGlow";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden noise-overlay">
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <SkillsSection />
      <TechGlobe3D />
      <TerminalSection />
      <ProjectsSection />
      <ProjectShowcase3D />
      <GitHubActivitySection />
      <TestimonialsSection />
      <EllowDigitalSection />
      <JourneySection />
      <ContactSection />
      <PortfolioFooter />
    </div>
  );
};

export default Index;
