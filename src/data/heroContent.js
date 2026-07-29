const RESUME_URL =
  "/old-portfolio-assets/resume/JayMarkApelado_Resume.pdf";

export const heroContent = {
  eyebrow: "Information Technology Graduate",

  name: "Jay Mark Apelado",

  role: "Full-Stack Developer & IT Support Specialist",

  summary:
    "I build full-stack applications, AI-assisted platforms, and reliable technical systems—combining software development, practical UI/UX, and hands-on infrastructure support.",

  availability:
    "Open to opportunities in software development, systems support, and IT operations.",

  primaryAction: {
    label: "Explore My Work",

    /*
     * Temporary bridge to the existing portfolio's Projects section.
     * This will become #work after the Version 2 sections are rebuilt.
     */
    href: "/#projects",
  },

  resumeAction: {
    label: "View Résumé",
    href: RESUME_URL,
  },

  contactAction: {
    label: "Contact Me",

    /*
     * Temporary bridge to the existing portfolio's Contact section.
     */
    href: "/#contact",
  },

  specialties: [
    "Full-Stack Development",
    "AI-Assisted Systems",
    "IT Infrastructure",
  ],
};