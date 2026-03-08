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
import TechGlobe3D from "@/components/TechGlobe3D";
import GitHubActivitySection from "@/components/GitHubActivitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EllowDigitalSection from "@/components/EllowDigitalSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import PortfolioFooter from "@/components/PortfolioFooter";
import CursorGlow from "@/components/CursorGlow";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.15, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 30%",
            scrub: 0.3,
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
