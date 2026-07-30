const EMAIL = "jaymrkapelado@gmail.com";

const RESUME_URL =
  "/old-portfolio-assets/resume/REPLACE-WITH-EXACT-RESUME-FILENAME.pdf";

export const contactContent = {
  title:
    "Let’s build something practical, reliable, and useful.",

  introduction:
    "I’m open to opportunities involving full-stack development, software systems, technical support, and IT operations. Reach out if you would like to discuss a role, project, collaboration, or technical challenge.",

  availability: {
    label: "Current availability",
    value:
      "Open to software development, systems support, and IT opportunities.",
  },

  location: {
    label: "Based in",
    value: "Philippines",
  },

  response: {
    label: "Preferred contact",
    value: "Email or LinkedIn",
  },

  email: {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },

  primaryAction: {
    label: "Send an Email",
    href: `mailto:${EMAIL}?subject=Portfolio%20Inquiry`,
  },

  resumeAction: {
    label: "View Résumé",
    href: RESUME_URL,
  },

  socialLinks: [
    {
      id: "github",
      label: "GitHub",
      description:
        "Explore source code, technical projects, and development activity.",
      href: "https://github.com/jeimaku",
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      description:
        "Connect professionally and review my experience and background.",
      href: "https://linkedin.com/in/jaymarkapelado",
      external: true,
    },
  ],

  closing:
    "Thank you for taking the time to explore my work.",
};