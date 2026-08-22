import { assetPaths } from "./assets";

export const featuredProjects = [
  {
    id: "talkready",
    title: "TalkReady",
    subtitle: "AI-Powered English Proficiency Platform",
    tagline:
      "A multi-role AI-powered platform designed to support English proficiency learning, class management, assessment, progress tracking, and certification workflows.",
    year: "2024 - 2025",
    role: "Full-Stack Developer & Team Lead",
    category: "Featured Case Study",
    type: "Capstone / AI Platform",

    description:
      "TalkReady is an AI-powered English proficiency platform built for students, trainers, and administrators. It includes learning modules, AI chatbot assistance, class management, assessments, progress reports, certificate authorization, and administrative review workflows.",

    problem:
      "English proficiency learners often need a structured platform that combines lessons, practice, assessment, progress monitoring, and trainer guidance in one place. Existing workflows can become fragmented when learning activities, trainer management, reviews, and certifications are handled separately.",

    solution:
      "TalkReady centralizes the learning experience through a full-stack platform with student, trainer, and administrator portals. It integrates AI support, class workflows, assessments, content review, certificate authorization, and analytics to make the learning process more organized and trackable.",

    tech: [
      "React.js",
      "Node.js",
      "OpenAI API",
      "Azure AI",
      "Firebase",
      "Tailwind CSS",
    ],

    highlights: [
      "Multi-role system for Admin, Student, and Trainer portals",
      "OpenAI and Azure AI integration for intelligent learning support",
      "Accepted research paper for IEEE APWiMob 2025",
      "Web platform and mobile app ecosystem",
    ],

    results: [
      {
        label: "Evaluation Rating",
        value: "4.45/5",
      },
      {
        label: "Main Role",
        value: "Team Lead",
      },
      {
        label: "Platform Type",
        value: "AI Learning System",
      },
    ],

    media: {
      cover: assetPaths.projects.talkready.cover,
      gallery: [
        {
          src: assetPaths.projects.talkready.dashboard,
          alt: "TalkReady dashboard interface",
        },
        {
          src: assetPaths.projects.talkready.aiChatbot,
          alt: "TalkReady AI chatbot interface",
        },
        {
          src: assetPaths.projects.talkready.courses,
          alt: "TalkReady courses interface",
        },
      ],
      video: assetPaths.projects.talkready.demoVideo,
    },

    links: {
      live: "https://talkreadyweb.onrender.com/",
      github: "https://github.com/jeimaku/TalkReady-web",
    },
  },
];

export const interactiveProjects = [
  {
    id: "talkready",
    tabNumber: "01",
    shortName: "TalkReady",
    title: "TalkReady",
    subtitle: "AI-Powered English Proficiency Platform",
    category: "AI-Assisted Language Platform",
    role: "Full-Stack Developer & Team Lead",
    year: "2024 - 2025",
    problem:
      "English proficiency learners often lack real-time conversational speaking practice, instant pronunciation evaluation, and trainer guidance in one place. Traditional classroom settings cannot provide automated speech assessment or individualized analytics at scale.",
    solution:
      "TalkReady centralizes the learning journey with dedicated Student, Trainer, and Admin portals. It integrates OpenAI GPT-4 and Azure AI speech services to offer automated pronunciation scoring, simulated call-center dialogues, class curriculum tools, and verified certificate issuance.",
    highlights: [
      "Multi-role architecture for Student, Trainer, and Admin portals",
      "OpenAI & Azure AI speech-to-text with pronunciation scoring",
      "Accepted research paper for IEEE APWiMob 2025 conference",
      "Comprehensive web ecosystem with mobile companion application",
    ],
    tech: [
      "React.js",
      "Node.js",
      "OpenAI API",
      "Azure AI",
      "Firebase",
      "Tailwind CSS",
    ],
    media: {
      type: "gallery",
      cover: assetPaths.projects.talkready.cover,
      screens: [
        {
          label: "Landing Page",
          src: assetPaths.projects.talkready.landingPage,
          alt: "TalkReady landing page interface",
        },
        {
          label: "Student Portal",
          src: assetPaths.projects.talkready.homepage,
          alt: "TalkReady student learning dashboard",
        },
        {
          label: "Admin Dashboard",
          src: assetPaths.projects.talkready.adminDashboard,
          alt: "TalkReady administrator analytics",
        },
        {
          label: "Trainer Portal",
          src: assetPaths.projects.talkready.trainerDashboard,
          alt: "TalkReady trainer course management",
        },
        {
          label: "Reports & Certs",
          src: assetPaths.projects.talkready.myReports,
          alt: "TalkReady progress report and certificate authorization",
        },
      ],
    },
    links: {
      caseStudy: "/projects/talkready",
      live: "https://talkreadyweb.onrender.com/",
      github: "https://github.com/jeimaku/TalkReady-web",
    },
  },
  {
    id: "crm-pipeline",
    tabNumber: "02",
    shortName: "CRM Pipeline",
    title: "CRM Pipeline System",
    subtitle: "Inquiry Management & Lead Qualification System",
    category: "Lead Tracking & Operations",
    role: "Full-Stack Developer & IT Intern",
    year: "2026",
    problem:
      "Inquiries from walk-ins, web forms, Viber, and Facebook were scattered across unlinked channels and spreadsheets, leading to untracked prospects, delayed proposal drafting, and lack of visibility on client arrival status.",
    solution:
      "Developed an operational CRM pipeline system featuring dynamic stage tracking, proposal draft generation, package interest monitoring, staff acknowledgement workflows, and a real-time 'Arrived Today' front-desk dashboard.",
    highlights: [
      "Multi-channel inquiry ingestion & automated lead assignment",
      "Interactive visual Kanban pipeline with stage progression",
      "One-click proposal & email draft generator workflow",
      "Front-desk 'Arrived Today' arrival verification logic",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "REST APIs"],
    media: {
      type: "video",
      cover: assetPaths.projects.internshipSystems.crmPipeline.cover,
      video: assetPaths.projects.internshipSystems.crmPipeline.video,
    },
    links: {
      caseStudy: "/projects/internship-systems",
    },
  },
  {
    id: "virtual-office",
    tabNumber: "03",
    shortName: "Virtual Office",
    title: "Launchpad Virtual Office Management System",
    subtitle: "Contract Monitoring & Client Administration Platform",
    category: "Client & Subscription Management",
    role: "Full-Stack Developer & IT Intern",
    year: "2026",
    problem:
      "Handling virtual office client contracts, renewal timelines, and billing receipts through spreadsheets led to missed expiration notices, disorganized client history, and delayed receipt verification.",
    solution:
      "Created a dedicated administrative client platform for Launchpad Coworking that automates contract duration monitoring, triggers proactive renewal alerts, generates dynamic PDF/image receipts, and supports bulk Excel import/export.",
    highlights: [
      "Automated contract duration tracking & renewal reminder alerts",
      "Dynamic PDF & image receipt generator with verification status",
      "Excel data import/export for streamlined client onboarding",
      "Structured administrative dashboard for tenant operations",
    ],
    tech: ["React.js", "Node.js", "Tailwind CSS", "PDF Generation", "Excel Processing", "Database"],
    media: {
      type: "video",
      cover: assetPaths.projects.internshipSystems.virtualOffice.cover,
      video: assetPaths.projects.internshipSystems.virtualOffice.video,
    },
    links: {
      caseStudy: "/projects/internship-systems",
    },
  },
  {
    id: "ticket-support",
    tabNumber: "04",
    shortName: "Ticket Support",
    title: "520 Ticket Support System",
    subtitle: "Centralized IT Issue Resolution & Helpdesk Workflow",
    category: "Helpdesk & Service Management",
    role: "Full-Stack Developer & IT Intern",
    year: "2026",
    problem:
      "Technical support requests submitted informally across chat channels lacked priority categorization, resolution timelines, attachment logging, and structured escalation protocols for corporate tenants.",
    solution:
      "Engineered a centralized helpdesk platform allowing client companies to submit prioritized tickets with screenshot attachments, providing IT staff with filterable status dashboards, SLA tracking, and resolution logs.",
    highlights: [
      "Client-specific customized ticket submission links & forms",
      "Screenshot & error log attachment upload capabilities",
      "Multi-criteria search, priority triage & status boards",
      "End-to-end resolution tracking with automated notifications",
    ],
    tech: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "Database Integration", "REST APIs"],
    media: {
      type: "video",
      cover: assetPaths.projects.internshipSystems.ticketSupport.cover,
      video: assetPaths.projects.internshipSystems.ticketSupport.video,
    },
    links: {
      caseStudy: "/projects/internship-systems",
    },
  },
  {
    id: "paysera-inventory",
    tabNumber: "05",
    shortName: "Inventory",
    title: "Paysera Inventory Management System",
    subtitle: "Internal Hardware Asset Lifecycle & Deployment Monitor",
    category: "Asset Tracking & IT Operations",
    role: "Full-Stack Developer & IT Intern",
    year: "2026",
    problem:
      "Tracking company-issued hardware (workstations, laptops, accessories) without a centralized system led to untracked warranty expirations, missing return schedules, and undocumented repair histories.",
    solution:
      "Designed an internal hardware asset management system with role-based authentication, real-time employee deployment logs, warranty expiration counters, return schedule tracking, and maintenance audit trails.",
    highlights: [
      "Full asset lifecycle tracking from deployment to return",
      "Warranty expiration tracking & return schedule alerts",
      "Comprehensive hardware repair & maintenance audit logs",
      "Role-based access control (RBAC) with inventory analytics",
    ],
    tech: ["React.js", "Node.js", "Database Integration", "RBAC", "Tailwind CSS", "Analytics"],
    media: {
      type: "video",
      cover: assetPaths.projects.internshipSystems.payseraInventory.cover,
      video: assetPaths.projects.internshipSystems.payseraInventory.video,
    },
    links: {
      caseStudy: "/projects/internship-systems",
    },
  },
];

export const internshipSystems = {
  title: "Internship Systems Suite",
  subtitle: "Workflow systems built during internship work",
  description:
    "A collection of internal systems developed to support operational workflows such as lead tracking, virtual office management, ticket handling, and inventory monitoring.",

  systems: [
    {
      id: "crm-pipeline",
      name: "CRM Pipeline System",
      tagline: "Lead tracking and inquiry management workflow",
      category: "Full-Stack System",
      type: "Internship Project",

      description:
        "A CRM pipeline system designed to manage inquiries, lead details, source tracking, package interests, arrival status, and pipeline movements for Launchpad coworking operations.",

      problem:
        "Inquiry and lead tracking can become difficult when information comes from different platforms and is not organized in one consistent workflow.",

      solution:
        "The CRM Pipeline System organizes leads into a structured pipeline and allows users to track inquiry details, source information, package interests, and daily arrivals more efficiently.",

      keyFeatures: [
        "Lead and inquiry tracking",
        "Source-based inquiry handling",
        "Pipeline card workflow",
        "Package interest tracking",
        "Arrived Today dashboard logic",
      ],

      tech: ["React.js", "Node.js", "JavaScript", "CSS", "Database"],

      media: {
        cover: assetPaths.projects.internshipSystems.crmPipeline.cover,
        video: assetPaths.projects.internshipSystems.crmPipeline.video,
      },
    },

    {
      id: "virtual-office",
      name: "Virtual Office Management System",
      tagline: "Management workflow for virtual office clients",
      category: "Full-Stack System",
      type: "Internship Project",

      description:
        "A virtual office management system created to help organize client records, service details, and administrative workflows related to virtual office operations.",

      problem:
        "Virtual office records and service details need to be organized clearly so that staff can monitor clients and related information without relying on scattered records.",

      solution:
        "The system provides a structured interface for managing virtual office information, making records easier to access, update, and monitor.",

      keyFeatures: [
        "Client record organization",
        "Virtual office service tracking",
        "Administrative workflow support",
        "Clean dashboard-based interface",
      ],

      tech: ["React.js", "Node.js", "JavaScript", "CSS", "Database"],

      media: {
        cover: assetPaths.projects.internshipSystems.virtualOffice.cover,
        video: assetPaths.projects.internshipSystems.virtualOffice.video,
      },
    },

    {
      id: "ticket-support",
      name: "Ticket Support System",
      tagline: "Support request tracking and resolution workflow",
      category: "Full-Stack System",
      type: "Internship Project",

      description:
        "A ticket support system designed to organize support requests, monitor ticket status, and help manage issue resolution workflows.",

      problem:
        "Support concerns can be difficult to manage when requests are not grouped, tracked, or monitored through a clear ticketing process.",

      solution:
        "The Ticket Support System provides a structured workflow for logging, monitoring, and resolving support requests more efficiently.",

      keyFeatures: [
        "Support ticket creation",
        "Ticket status monitoring",
        "Issue tracking workflow",
        "Support management interface",
      ],

      tech: ["React.js", "Node.js", "JavaScript", "CSS", "Database"],

      media: {
        cover: assetPaths.projects.internshipSystems.ticketSupport.cover,
        video: assetPaths.projects.internshipSystems.ticketSupport.video,
      },
    },

    {
      id: "paysera-inventory",
      name: "Paysera Inventory System",
      tagline: "Inventory monitoring and item management workflow",
      category: "Full-Stack System",
      type: "Internship Project",

      description:
        "An inventory system created to help monitor items, organize inventory details, and support basic item management workflows for Paysera-related operations.",

      problem:
        "Inventory records can become difficult to maintain when item details are not organized in a dedicated management system.",

      solution:
        "The Paysera Inventory System provides a structured way to track inventory items and support clearer monitoring of item records.",

      keyFeatures: [
        "Inventory item tracking",
        "Item record management",
        "Dashboard-style monitoring",
        "Organized inventory workflow",
      ],

      tech: ["React.js", "Node.js", "JavaScript", "CSS", "Database"],

      media: {
        cover: assetPaths.projects.internshipSystems.payseraInventory.cover,
        video: assetPaths.projects.internshipSystems.payseraInventory.video,
      },
    },
  ],
};

export const mobileProjects = [
  {
    id: "talkready-mobile",
    title: "TalkReady Mobile",
    subtitle: "Mobile companion for the TalkReady ecosystem",
    category: "Mobile Application",
    type: "Academic / Capstone Extension",

    description:
      "A mobile application connected to the TalkReady ecosystem, designed to support learning access and platform usability beyond the web interface.",

    highlights: [
      "Mobile extension of TalkReady",
      "Designed for learning accessibility",
      "Supports the larger AI-powered platform ecosystem",
    ],

    tech: ["Flutter", "Dart", "Firebase", "Mobile UI"],

    media: {
      cover: assetPaths.projects.mobileApps.talkreadyMobile.cover,
      video: assetPaths.projects.mobileApps.talkreadyMobile.video,
    },
  },

  {
    id: "eborrw-nu",
    title: "Eborrw@NU",
    subtitle: "Mobile borrowing and utility concept",
    category: "Mobile Application",
    type: "Academic Project",

    description:
      "A mobile application project created as a utility-based concept for borrowing-related workflows within an academic setting.",

    highlights: [
      "Mobile-first workflow concept",
      "Academic utility application",
      "Focused on usability and task flow",
    ],

    tech: ["Flutter", "Dart", "Mobile UI", "App Design"],

    media: {
      cover: assetPaths.projects.mobileApps.eborrwNu.cover,
      video: assetPaths.projects.mobileApps.eborrwNu.video,
    },
  },
];

export const designProjects = {
  figma: [
    {
      id: "bulldogpay",
      title: "BulldogPay",
      category: "Figma UI/UX Design",
      type: "Interface Design",

      description:
        "A Figma-based interface design concept focused on digital payment or transaction-related user flows.",

      image: assetPaths.projects.designWorks.bulldogPay,

      gallery: [
        {
          src: assetPaths.projects.designWorks.bulldogPay,
          alt: "BulldogPay main interface design",
        },
        {
          src: assetPaths.projects.designWorks.bulldogPayHome,
          alt: "BulldogPay home screen design",
        },
        {
          src: assetPaths.projects.designWorks.bulldogPayQrPayment,
          alt: "BulldogPay QR payment screen design",
        },
        {
          src: assetPaths.projects.designWorks.bulldogPayTransactionHistory,
          alt: "BulldogPay transaction history screen design",
        },
      ],

      tools: ["Figma", "UI Design", "UX Flow"],
    },

    {
      id: "youtube-music-redesign",
      title: "YouTube Music Redesign",
      category: "Figma UI/UX Design",
      type: "Interface Redesign",

      description:
        "A redesign concept for YouTube Music focused on improving visual layout, user interface structure, and overall digital experience.",

      image: assetPaths.projects.designWorks.youtubeMusic,

      gallery: [
        {
          src: assetPaths.projects.designWorks.youtubeMusic,
          alt: "YouTube Music redesign main screen",
        },
        {
          src: assetPaths.projects.designWorks.youtubeMusicHigh,
          alt: "YouTube Music redesign high fidelity screen",
        },
        {
          src: assetPaths.projects.designWorks.youtubeMusicLow,
          alt: "YouTube Music redesign low fidelity screen",
        },
      ],

      tools: ["Figma", "UI Redesign", "Visual Design"],
    },
  ],

  photoshop: [
    {
      id: "photoshop-work-1",
      title: "Photoshop Creative Work 1",
      category: "Photoshop Design",
      type: "Creative Output",

      description:
        "A creative visual output made using Photoshop, showing design composition, editing, and visual communication skills.",

      image: assetPaths.projects.designWorks.photoshopWorkOne,

      tools: ["Adobe Photoshop", "Graphic Design", "Photo Editing"],
    },

    {
      id: "photoshop-work-2",
      title: "Photoshop Creative Work 2",
      category: "Photoshop Design",
      type: "Creative Output",

      description:
        "A Photoshop-based creative work focused on visual editing, layout, and digital design presentation.",

      image: assetPaths.projects.designWorks.photoshopWorkTwo,

      tools: ["Adobe Photoshop", "Graphic Design", "Creative Editing"],
    },

    {
      id: "photoshop-work-3",
      title: "Photoshop Creative Work 3",
      category: "Photoshop Design",
      type: "Creative Output",

      description:
        "A creative design output showing layout, visual hierarchy, and digital editing skills.",

      image: assetPaths.projects.designWorks.photoshopWorkThree,

      tools: ["Adobe Photoshop", "Graphic Design", "Digital Editing"],
    },

    {
      id: "photoshop-work-4",
      title: "Photoshop Creative Work 4",
      category: "Photoshop Design",
      type: "Creative Output",

      description:
        "A Photoshop artwork focused on image editing, composition, and visual presentation.",

      image: assetPaths.projects.designWorks.photoshopWorkFour,

      tools: ["Adobe Photoshop", "Photo Editing", "Visual Design"],
    },

    {
      id: "photoshop-work-5",
      title: "Photoshop Creative Work 5",
      category: "Photoshop Design",
      type: "Creative Output",

      description:
        "A digital creative output showing design experimentation and visual communication.",

      image: assetPaths.projects.designWorks.photoshopWorkFive,

      tools: ["Adobe Photoshop", "Creative Editing", "Graphic Design"],
    },
  ],
};

export const allProjectGroups = [
  {
    id: "featured-projects",
    title: "Featured Projects",
    description: "Major projects with the strongest portfolio impact.",
    items: featuredProjects,
  },

  {
    id: "internship-systems",
    title: internshipSystems.title,
    description: internshipSystems.description,
    items: internshipSystems.systems,
  },

  {
    id: "mobile-projects",
    title: "Mobile Projects",
    description: "Mobile application projects and app-based concepts.",
    items: mobileProjects,
  },

  {
    id: "figma-designs",
    title: "Figma Designs",
    description: "UI/UX design concepts and interface redesigns.",
    items: designProjects.figma,
  },

  {
    id: "photoshop-works",
    title: "Photoshop Works",
    description: "Creative visual works and digital editing outputs.",
    items: designProjects.photoshop,
  },
];