import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EllowDigitalSection from "@/components/EllowDigitalSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import PortfolioFooter from "@/components/PortfolioFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EllowDigitalSection />
      <JourneySection />
      <ContactSection />
      <PortfolioFooter />
    </div>
  );
};

export default Index;
