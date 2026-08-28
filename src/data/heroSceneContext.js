export const heroSceneContext = [
  {
    id: "monitor",
    shortLabel: "Full-Stack Systems",
    title: "Full-Stack Systems Development",
    description:
      "Web applications, dashboards, databases, administrative workflows, and internal systems built with modern frontend and backend technologies.",
    relatedWork: "View software projects",
    href: "/#projects",
    accent: "#f5f5f5",

    /*
     * Position above the monitor.
     *
     * X = left/right
     * Y = down/up
     * Z = backward/forward
     */
    position: [-0.94, 1.88, 0.22],
  },

  {
    id: "microphone",
    shortLabel: "AI Speech",
    title: "AI-Powered Speech Platforms",
    description:
      "TalkReady combines speech assessment, AI-assisted feedback, role-based learning workflows, and language-proficiency activities.",
    relatedWork: "View TalkReady",
    href: "/projects/talkready",
    accent: "#d4d4d4",
    position: [0.02, 1.74, 0.62],
  },

  {
    id: "router",
    shortLabel: "Networking",
    title: "Networking and Technical Support",
    description:
      "Network troubleshooting, device configuration, connectivity support, hardware diagnosis, and reliable day-to-day IT operations.",
    relatedWork: "View experience",
    href: "/#experience",
    accent: "#a3a3a3",
    position: [-0.10, 1.43, 0.20],
  },

  {
    id: "server",
    shortLabel: "Infrastructure",
    title: "IT Infrastructure and Servers",
    description:
      "Windows Server, Active Directory, RAID configuration, infrastructure support, hardware maintenance, and operational reliability.",
    relatedWork: "View infrastructure experience",
    href: "/#experience",
    accent: "#ffffff",
    position: [1.82, 1.82, -0.18],
  },
];

export const defaultHeroSceneContextId = "monitor";
