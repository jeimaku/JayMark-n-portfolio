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
  subtitle: "Four internal applications built and shipped during an IT internship at Launchpad Coworking and Paysera.",
  description:
    "A suite of four full-stack internal systems developed to replace manual, spreadsheet-driven workflows across lead management, virtual office operations, IT helpdesk, and hardware asset tracking.",

  /* ── Enriched narrative data for the premium case study redesign ─────────── */

  problem:
    "Operations at Launchpad Coworking and Paysera were running across spreadsheets, chat threads, and disconnected tools. Leads from walk-ins, Viber, and Facebook had no unified record. Support requests arrived informally and had no priority or status. Hardware had no audit trail. The work was happening — none of it was consistently trackable.",

  outcome:
    "Four production systems replaced the manual workflows they targeted. Each system was built and handed off within the internship timeline, used by actual staff during daily operations, and designed to remain maintainable by the teams after the internship ended. The work demonstrated the ability to move from a stated operational problem to a working, deployed application inside a professional environment.",

  workflow: [
    {
      id: "inquiry",
      label: "Inquiry Arrives",
      description: "Walk-in, web form, Viber, or Facebook",
      system: null,
      color: "slate",
    },
    {
      id: "crm",
      label: "CRM Pipeline",
      description: "Lead qualified → Stage moved → Proposal drafted → Arrival confirmed",
      system: "crm-pipeline",
      color: "cyan",
    },
    {
      id: "contract",
      label: "Contract Issued",
      description: "Client onboarded to virtual office service",
      system: null,
      color: "slate",
    },
    {
      id: "virtual-office",
      label: "Virtual Office System",
      description: "Contract tracked → Renewal alerted → Receipt generated",
      system: "virtual-office",
      color: "cyan",
    },
    {
      id: "support",
      label: "Issue Filed",
      description: "Tenant submits IT support request",
      system: null,
      color: "slate",
    },
    {
      id: "ticket",
      label: "Ticket Support System",
      description: "Ticket triaged → Assigned → Resolved → Logged",
      system: "ticket-support",
      color: "cyan",
    },
    {
      id: "hardware",
      label: "Hardware Deployed",
      description: "Workstation or device issued to employee",
      system: null,
      color: "slate",
    },
    {
      id: "inventory",
      label: "Inventory System",
      description: "Asset lifecycle tracked → Warranty monitored → Return scheduled",
      system: "paysera-inventory",
      color: "cyan",
    },
  ],

  architecture: {
    frontend: "React.js with component-based UI, React Router for navigation, and Tailwind CSS for consistent styling across all four systems.",
    backend: "Node.js with Express.js providing REST API endpoints for data operations, authentication middleware, and business logic per system.",
    database: "MySQL with relational schemas designed around each system's operational domain — leads and pipeline stages, client contracts, support tickets, and hardware records.",
    deployment: "Internal deployment within the company network. Systems accessed by staff on local infrastructure during the internship.",
    integrations: "PDF generation for receipts and reports, Excel import/export for bulk client onboarding, and email notification triggers for renewal alerts and ticket updates.",
  },

  engineeringChallenges: [
    {
      id: "arrival-state",
      title: "Real-time arrival state without a push layer",
      system: "CRM Pipeline",
      context:
        "The front desk needed a live 'Arrived Today' view to confirm when leads physically walked in — but the system had no WebSocket or push infrastructure.",
      decision:
        "Used short-interval polling on the arrival endpoint combined with optimistic UI updates on the staff-side acknowledgement action. The arrival status was stored as a timestamped boolean per lead record, resolved against the current date on each request. This kept the infrastructure simple while the dashboard stayed accurate within a few seconds.",
    },
    {
      id: "receipt-generation",
      title: "Dynamic receipt generation without a document server",
      system: "Virtual Office System",
      context:
        "The virtual office system needed to produce printable and shareable payment receipts with logo, client details, and service breakdown — without a dedicated PDF service or server-side document pipeline.",
      decision:
        "Receipt generation was handled entirely client-side using a canvas-based rendering approach, converting a styled HTML receipt component into a downloadable image file. This eliminated a backend dependency, made receipts immediately available after payment entry, and let staff print or share them directly from the browser.",
    },
  ],

  systems: [
    {
      id: "crm-pipeline",
      name: "CRM Pipeline System",
      tagline: "Lead tracking and inquiry management",
      shortName: "CRM Pipeline",
      category: "Full-Stack System",
      type: "Internship Project",

      description:
        "Centralizes multi-channel inquiries into a structured Kanban-style pipeline with stage progression, source tracking, package interest monitoring, proposal draft generation, and a real-time front-desk arrival board.",

      problem:
        "Inquiries from walk-ins, web forms, Viber, and Facebook were scattered with no unified record, leading to untracked prospects and delayed proposals.",

      solution:
        "A visual pipeline where every lead is a card. Stage moves are tracked, proposals are generated from lead data, and the arrival board confirms walk-ins in near real-time.",

      caseStudy: {
        problem:
          "Inquiries came in from the website, Facebook, Viber, and walk-ins with no single place to track them. Staff had to monitor separate channels to follow up, which made it easy to miss leads or lose track of where a conversation was left.",
        solution:
          "Every inquiry lands in one pipeline with defined stages. Staff can see what's waiting, who's handling it, and what needs to happen next. Sending a proposal takes one click instead of composing it from scratch each time.",
        howItWorks: [
          "Inquiry Received",
          "Assigned to Staff",
          "Acknowledged",
          "Negotiation",
          "Proposal Sent",
          "Closed",
        ],
        challenge: {
          title: "Keeping the public form separate from the internal pipeline",
          description:
            "The inquiry form needs to be open to anyone filling it in. The internal pipeline dashboard shouldn't be publicly accessible. Used Render to host the public form and Tailscale Funnel to keep the pipeline private — only staff can reach it.",
        },
        outcome:
          "The team had one place to see every active inquiry regardless of where it came from. Follow-ups became more consistent because the pipeline made it visible when something was waiting for action.",
      },

      keyFeatures: [
        "Visual Kanban pipeline with stage progression and lead cards",
        "Multi-channel inquiry ingestion and source attribution",
        "One-click proposal and email draft generation from lead data",
        "Front-desk 'Arrived Today' board with acknowledgement workflow",
        "Package interest tracking and filtering per prospect",
      ],

      tech: ["React.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "REST APIs"],

      media: {
        cover: assetPaths.projects.internshipSystems.crmPipeline.cover,
        video: assetPaths.projects.internshipSystems.crmPipeline.video,
      },
    },

    {
      id: "virtual-office",
      name: "Virtual Office Management System",
      tagline: "Contract monitoring and client administration",
      shortName: "Virtual Office",
      category: "Full-Stack System",
      type: "Internship Project",

      description:
        "Tracks virtual office client contracts, service durations, and billing receipts. Automates renewal alerts, generates downloadable PDF and image receipts, and supports bulk client import via Excel.",

      problem:
        "Client contracts and renewal timelines managed in spreadsheets led to missed expiration notices, disorganized client history, and delayed receipt verification.",

      solution:
        "A dedicated client administration platform with automated contract tracking, proactive renewal alerts, and client-side receipt generation — no document server required.",

      caseStudy: {
        problem:
          "Client contracts were being tracked in spreadsheets, which meant renewal dates could easily be missed if nobody checked in time. Sending reminders was a manual task, and there was no consistent way to generate or track receipts.",
        solution:
          "Each client now has a full record with their contract period tracked automatically. Renewal reminders go out by email before a contract is due — staff don't need to remember to send them. Receipts are generated directly in the system with a unique reference number each time.",
        howItWorks: [
          "Client Added",
          "Contract Period Set",
          "Reminder Sent Automatically",
          "Renewal Processed",
          "Receipt Generated",
        ],
        challenge: {
          title: "Making receipts verifiable",
          description:
            "A printed receipt isn't useful if there's no way to confirm it's legitimate. Built a unique numbering system and a verification step so any receipt can be checked against the record it came from — useful if a client questions a payment.",
        },
        outcome:
          "Renewals stopped getting missed. The admin team spent less time on manual reminders and receipt writing. The process became consistent instead of depending on who happened to check the spreadsheet.",
      },

      keyFeatures: [
        "Automated contract duration tracking with expiration alerts",
        "Client-side PDF and image receipt generation for print and sharing",
        "Excel import/export for streamlined client onboarding",
        "Administrative client history with payment and status records",
        "Renewal reminder workflow with notification triggers",
      ],

      tech: ["React.js", "Node.js", "Express.js", "MySQL", "PDF Generation", "Excel Processing"],

      media: {
        cover: assetPaths.projects.internshipSystems.virtualOffice.cover,
        video: assetPaths.projects.internshipSystems.virtualOffice.video,
      },
    },

    {
      id: "ticket-support",
      name: "Ticket Support System",
      tagline: "Centralized IT helpdesk and issue resolution",
      shortName: "Ticket Support",
      category: "Full-Stack System",
      type: "Internship Project",

      description:
        "Gives corporate tenants unique submission links to file IT support tickets with screenshots and attachments. IT staff get a filterable status board with priority triage, SLA context, and resolution logs.",

      problem:
        "Support requests submitted informally across chat lacked priority categorization, resolution timelines, attachment logging, and any structured escalation path.",

      solution:
        "A centralized helpdesk where each client company gets a custom submission link. Tickets are prioritized on intake, tracked to resolution, and logged for audit.",

      caseStudy: {
        problem:
          "Support requests came in through calls and informal messages, so there was no record attached to them. Once a conversation ended, there was no easy way to know what was discussed, what was actually fixed, or whether the same issue had come up before for the same company.",
        solution:
          "Each client company gets its own link to submit a support request. The IT team manages everything from one dashboard — they can see all open tickets, search by company or status, and communicate with clients through the ticket itself. The full conversation history stays attached to the ticket.",
        howItWorks: [
          "Client Submits Ticket",
          "Ticket Created",
          "Admin Reviews",
          "IT Responds",
          "Resolved and Closed",
        ],
        challenge: {
          title: "Preventing the same ticket from being submitted twice",
          description:
            "If a client refreshes the page or clicks submit more than once, duplicate tickets appear in the dashboard and add unnecessary noise. Added a lock on the form after the first submission and a check on the server side to catch duplicates before they get created.",
        },
        outcome:
          "The IT team had a clear log of every open request across all client companies instead of managing it through memory and messages. Clients could follow up by referencing a ticket number rather than calling again to ask what was happening.",
      },

      keyFeatures: [
        "Client-specific submission links with custom intake forms",
        "Screenshot and error log attachment upload",
        "Priority triage with multi-criteria filtering and status boards",
        "End-to-end resolution tracking with automated notifications",
        "Audit log of all ticket activity per client",
      ],

      tech: ["React.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "REST APIs"],

      media: {
        cover: assetPaths.projects.internshipSystems.ticketSupport.cover,
        video: assetPaths.projects.internshipSystems.ticketSupport.video,
      },
    },

    {
      id: "paysera-inventory",
      name: "Paysera Inventory System",
      tagline: "Hardware asset lifecycle and deployment tracking",
      shortName: "Inventory",
      category: "Full-Stack System",
      type: "Internship Project",

      description:
        "Tracks company-issued hardware from deployment to return. Records warranty expiration, return schedules, repair history, and employee assignment — all behind role-based access control.",

      problem:
        "Hardware tracked without a centralized system led to untracked warranty expirations, undocumented repair histories, and missing return schedules.",

      solution:
        "An internal asset management system with full lifecycle tracking per device, role-based access per team, and warranty and return schedule monitoring with alerts.",

      caseStudy: {
        problem:
          "Device records were stored separately — who had what, repair history, warranty dates. Getting a full picture of any single device meant checking multiple places, which slowed down maintenance decisions and made it easy to lose track of assets.",
        solution:
          "Every device has one record covering its full history: who it's assigned to, when it was deployed, what repairs it's had, and when its warranty runs out. Staff can look up any device and see everything in one place without asking around or digging through files.",
        howItWorks: [
          "Device Registered",
          "Employee Assigned",
          "Active Deployment",
          "Maintenance if Needed",
          "Returned / Available",
        ],
        challenge: {
          title: "Preventing a device from being redeployed before it's ready",
          description:
            "When a device comes back from repair, it might still appear as 'available' if the status isn't updated right away. Added status logic that requires an explicit update before a device shows as ready to deploy — so nothing gets reassigned while it's still being serviced.",
        },
        outcome:
          "Staff could look up any device and immediately know where it was, who had it last, whether it had been repaired, and when its warranty expired. That kind of information used to require checking separate records or asking around.",
      },

      keyFeatures: [
        "Full asset lifecycle tracking from deployment to return",
        "Warranty expiration monitoring with return schedule alerts",
        "Comprehensive hardware repair and maintenance audit logs",
        "Role-based access control with per-role inventory views",
        "Employee assignment history per device",
      ],

      tech: ["React.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "RBAC"],

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