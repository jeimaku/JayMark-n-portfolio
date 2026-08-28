import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import EducationSection from "../components/sections/EducationSection";
import CertificationsSection from "../components/sections/CertificationsSection";
import ActivitiesSection from "../components/sections/ActivitiesSection";
import ContactSection from "../components/sections/ContactSection";
import { useEffect } from "react";
import Seo from "../components/effects/Seo";

export default function Home() {

  useEffect(() => {
  document.title = "Jay Mark Apelado | Full-Stack Developer Portfolio";

  const description =
    document.querySelector('meta[name="description"]') ||
    document.createElement("meta");

  description.setAttribute("name", "description");
  description.setAttribute(
    "content",
    "Portfolio of Jay Mark Apelado, showcasing internship systems, capstone projects, mobile applications, UI/UX designs, certifications, and creative works."
  );

  if (!document.head.contains(description)) {
    document.head.appendChild(description);
  }
}, []);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-transparent text-neutral-50 focus:outline-none"
    >
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <ActivitiesSection />
      <ContactSection />
    </main>
  );
}