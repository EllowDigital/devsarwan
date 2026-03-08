import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import SkillsSection from "@/components/SkillsSection";
import TerminalSection from "@/components/TerminalSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProjectShowcase3D from "@/components/ProjectShowcase3D";
import GitHubActivitySection from "@/components/GitHubActivitySection";
import EllowDigitalSection from "@/components/EllowDigitalSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import PortfolioFooter from "@/components/PortfolioFooter";
import CursorGlow from "@/components/CursorGlow";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Cinematic section reveal — each section fades in with a subtle parallax
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <SkillsSection />
      <TerminalSection />
      <ProjectsSection />
      <ProjectShowcase3D />
      <GitHubActivitySection />
      <EllowDigitalSection />
      <JourneySection />
      <ContactSection />
      <PortfolioFooter />
    </div>
  );
};

export default Index;
