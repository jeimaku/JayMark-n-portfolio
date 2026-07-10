import { assetPaths } from "./assets";

export const caseStudies = [
  {
    id: "internship-systems",
    title: "Internship Systems Suite",
    eyebrow: "Internship Project",
    category: "Real Company Systems",
    status: "Completed during internship",
    year: "2026",

    summary:
      "A suite of internal web systems developed during internship to support real company workflows, including lead tracking, virtual office client management, technical support ticketing, and inventory monitoring.",

    heroMedia: {
      type: "video",
      src: assetPaths.projects.internshipSystems.crmPipeline.video,
      alt: "CRM / Inquiry Pipeline system preview",
    },

    overview:
      "During my internship, I worked on multiple operational systems designed for actual company use. These systems helped organize client inquiries, support requests, contract records, receipts, device deployments, and internal monitoring tasks.",

    role:
      "I contributed as a developer and IT intern by building interfaces, implementing workflow logic, improving system features, fixing frontend and backend issues, preparing documentation, and supporting demonstrations for end users.",

    problem:
      "Several company workflows were being handled through scattered records, manual tracking, informal messages, and separate tools. This made it harder for staff to monitor leads, support tickets, client contracts, device assignments, and follow-up tasks efficiently.",

    solution:
      "I helped develop focused web-based systems for each operational need: a CRM pipeline for inquiries, a virtual office management system for client records and renewals, a ticketing system for support requests, and an inventory system for tracking deployed devices and hardware assets.",

    impact: [
      "Built systems connected to real company workflows instead of purely academic requirements.",
      "Helped improve organization of inquiries, client records, support requests, and inventory data.",
      "Strengthened hands-on experience in full-stack development, workflow design, debugging, and documentation.",
      "Expanded technical exposure beyond software development through networking, troubleshooting, hardware support, servers, RAID setup, Windows Server, and Active Directory.",
    ],

    systems: [
      {
        name: "CRM / Inquiry Pipeline System",
        category: "Lead Management",
        description:
          "A centralized pipeline system for managing inquiries from walk-ins, website forms, Viber, and Facebook. It supports lead assignment, staff acknowledgement, proposal draft generation, negotiation tracking, guided tour scheduling, meeting room booking logic, notifications, dashboard analytics, and active, successful, or archived lead statuses.",
        media: {
          type: "video",
          src: assetPaths.projects.internshipSystems.crmPipeline.video,
        },
      },
      {
        name: "Virtual Office Management System",
        category: "Client Management",
        description:
          "A client management platform for Launchpad Coworking that helps staff organize virtual office client records, import and export data, monitor contract durations, track renewals, send reminder emails, generate PDF or image receipts, and support receipt verification workflows.",
        media: {
          type: "video",
          src: assetPaths.projects.internshipSystems.virtualOffice.video,
        },
      },
      {
        name: "Online Ticketing Support System",
        category: "Technical Support",
        description:
          "A centralized helpdesk platform for client companies to submit technical support requests through customized links. It includes ticket forms, image upload, centralized ticket monitoring, search, filters, pagination, status tracking, notification routing, and support request management.",
        media: {
          type: "video",
          src: assetPaths.projects.internshipSystems.ticketSupport.video,
        },
      },
      {
        name: "Paysera Inventory Management System",
        category: "Inventory Monitoring",
        description:
          "An internal asset-tracking system for monitoring hardware devices deployed to employees. It supports login authentication, adding and updating device records, deployment tracking, return schedule monitoring, warranty status monitoring, repair history, search, reporting support, and role-based access control.",
        media: {
          type: "video",
          src: assetPaths.projects.internshipSystems.payseraInventory.video,
        },
      },
    ],

    techStack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Database Integration",
      "Role-Based Access",
      "Gmail Draft Workflow",
      "Calendar / Booking Logic",
      "PDF / Image Generation",
      "Excel Import / Export",
    ],

    sections: [
      {
        title: "Key features I worked on",
        body:
          "Across these systems, my work involved lead assignment workflows, proposal and email draft handling, dashboard planning, client record management, contract monitoring, receipt generation, ticket submission flows, search and filter tools, pagination, inventory tracking, warranty monitoring, and user documentation.",
      },
      {
        title: "Technical growth during internship",
        body:
          "This internship helped me become more flexible as an IT practitioner. Aside from software development, I gained exposure to networking fundamentals, access point troubleshooting, computer hardware maintenance, RJ45 cable repair, enterprise servers, RAID configuration, Windows Server installation, Active Directory setup, and direct technical support.",
      },
      {
        title: "Why this project matters",
        body:
          "These systems are an important part of my portfolio because they show my ability to build practical tools for real users, real workflows, and real operational problems inside a company environment.",
      },
    ],
  },

  {
    id: "talkready",
    title: "TalkReady",
    eyebrow: "Capstone Project",
    category: "AI-Assisted Language Learning Platform",
    status: "Completed",
    year: "2025",

    summary:
      "An AI-powered English proficiency platform created to help aspiring call center professionals improve pronunciation, grammar, listening comprehension, fluency, and confidence through structured lessons, trainer-managed classes, assessments, and real-time feedback.",

    heroMedia: {
      type: "image",
      src: assetPaths.projects.talkready.cover,
      alt: "TalkReady landing page preview",
    },

    overview:
      "TalkReady was designed to address the gap between classroom English and the communication skills required in real call center environments. The platform combines structured learning modules, AI-powered speech feedback, chatbot practice, progress tracking, certificates, and trainer content management tools.",

    role:
      "I worked on the overall system direction, front-end implementation, user interface structure, role-based workflows, feature planning, backend integration support, testing, and project documentation as part of the capstone development team.",

    problem:
      "Many aspiring call center professionals understand English academically but struggle when using it under pressure in real customer service situations. Traditional learning often lacks personalized feedback, speaking practice, pronunciation assessment, and realistic call center communication scenarios.",

    solution:
      "TalkReady provides a web and mobile learning platform where students can study structured modules, practice speaking, receive AI-assisted feedback, track progress, and join trainer-managed classes. Trainers can create classes, upload learning materials, assign assessments, monitor progress, and authorize certificates.",

    impact: [
      "Created a complete multi-role platform for students, trainers, and administrators.",
      "Integrated AI-supported learning tools for speech, pronunciation, chatbot practice, and feedback.",
      "Supported trainer-led content management, class creation, assessments, and progress monitoring.",
      "Demonstrated full-stack development, AI integration, educational technology design, and research-based system development.",
    ],

    systems: [
      {
        name: "Student Learning Experience",
        category: "Student Role",
        description:
          "Students can access structured courses, complete lessons and assessments, practice speaking, use AI chatbot scenarios, view activity logs, track progress, and receive learning feedback.",
        media: {
          type: "image",
          src: assetPaths.projects.talkready.homepage,
        },
      },
      {
        name: "Trainer Tools and Class Management",
        category: "Trainer Role",
        description:
          "Trainers can create and manage classes, upload materials such as documents and videos, create assessments, review student progress, manage class content, and authorize student certificates.",
        media: {
          type: "image",
          src: assetPaths.projects.talkready.trainerDashboard,
        },
      },
      {
        name: "Admin Dashboard and Platform Monitoring",
        category: "Admin Role",
        description:
          "Administrators can monitor platform activity, review users, manage archived accounts, handle appeals, track activity logs, and view analytics such as total users, classes, and engagement data.",
        media: {
          type: "image",
          src: assetPaths.projects.talkready.adminDashboard,
        },
      },
      {
        name: "Progress Reports and Certificates",
        category: "Learning Records",
        description:
          "The platform provides student progress reports, assessment records, trainer evaluation results, and certificate-related workflows to document learning outcomes and completion.",
        media: {
          type: "image",
          src: assetPaths.projects.talkready.myReports,
        },
      },
    ],

    techStack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Firebase",
      "Flutter",
      "Dart",
      "OpenAI GPT-4",
      "Microsoft Azure AI Speech Services",
      "AssemblyAI",
      "Cloudinary",
      "ResponsiveVoice",
    ],

    sections: [
      {
        title: "Key features",
        body:
          "TalkReady includes user authentication, student and trainer dashboards, structured course modules, trainer-managed classes, uploaded learning materials, assessments, AI chatbot practice, speech-to-text, text-to-speech, pronunciation analysis, progress tracking, certificates, notifications, admin analytics, review workflows, and activity logs.",
      },
      {
        title: "Design and development approach",
        body:
          "The project followed an Agile development approach, allowing the team to plan, design, develop, test, evaluate, deploy, and refine the platform through iterative improvements. The system was designed as a cross-platform solution with both web and mobile access.",
      },
      {
        title: "Why this project matters",
        body:
          "TalkReady shows my ability to work on a large, research-backed system with multiple user roles, AI integrations, cloud services, learning workflows, and real-world educational purpose.",
      },
    ],
  },

  {
    id: "mobile-applications",
    title: "Mobile Applications",
    eyebrow: "Mobile Development",
    category: "App Prototypes and Interfaces",
    status: "Completed academic/mobile outputs",
    year: "2026",

    summary:
      "A collection of mobile application projects including TalkReady Mobile and Eborrw@NU, presented through interactive phone mockups to highlight mobile-first workflows and app interface design.",

    heroMedia: {
      type: "video",
      src: assetPaths.projects.mobileApps.talkreadyMobile.studentDashboardVideo,
      alt: "TalkReady Mobile student dashboard preview",
    },

    overview:
      "These mobile projects show my experience in designing and presenting app-based workflows for learning, borrowing, dashboard access, and role-based mobile interfaces.",

    role:
      "I contributed to mobile interface planning, screen structure, workflow organization, feature presentation, and interactive demo preparation.",

    problem:
      "Mobile applications need to present important features clearly within limited screen space while keeping navigation simple, readable, and easy to understand.",

    solution:
      "The mobile previews use focused screens, role-based flows, and phone mockup presentation to demonstrate how users would interact with the apps in a realistic mobile environment.",

    impact: [
      "Showcases mobile interface thinking beyond desktop web systems.",
      "Demonstrates student, trainer, borrower, and admin mobile flows.",
      "Strengthens the portfolio through realistic phone-based app previews.",
      "Shows ability to organize features for smaller screens and mobile-first interaction.",
    ],

    systems: [
      {
        name: "TalkReady Mobile — Student Dashboard",
        category: "Learning App",
        description:
          "A mobile learning dashboard for student-side TalkReady features, including modules, progress, and learning activity access.",
        media: {
          type: "video",
          src: assetPaths.projects.mobileApps.talkreadyMobile
            .studentDashboardVideo,
        },
      },
      {
        name: "TalkReady Mobile — Trainer Dashboard",
        category: "Trainer App",
        description:
          "A mobile trainer interface for managing class-related functions and trainer-side platform tools.",
        media: {
          type: "video",
          src: assetPaths.projects.mobileApps.talkreadyMobile
            .trainerDashboardVideo,
        },
      },
      {
        name: "Eborrw@NU — Borrower Interface",
        category: "Borrowing App",
        description:
          "A mobile borrower interface concept focused on browsing and requesting borrowing-related items or equipment.",
        media: {
          type: "video",
          src: assetPaths.projects.mobileApps.eborrwNu.borrowerInterfaceVideo,
        },
      },
      {
        name: "Eborrw@NU — IT Admin Panel",
        category: "Admin App",
        description:
          "A mobile admin interface concept for managing borrowing-related records and equipment workflows.",
        media: {
          type: "video",
          src: assetPaths.projects.mobileApps.eborrwNu.itAdminPanelVideo,
        },
      },
    ],

    techStack: [
      "Flutter",
      "Dart",
      "Mobile UI",
      "App Prototyping",
      "Dashboard Design",
      "Role-Based Interfaces",
      "User Flow Design",
    ],

    sections: [
      {
        title: "Key features",
        body:
          "The mobile projects highlight role-based dashboards, mobile-friendly information layouts, app navigation, task-based screens, and workflow previews for learning and borrowing-related systems.",
      },
      {
        title: "Why this project matters",
        body:
          "This section strengthens my portfolio by showing that I can think beyond web dashboards and design app experiences for smaller screens, clearer flows, and mobile-first usage.",
      },
    ],
  },

  {
    id: "ui-ux-designs",
    title: "UI/UX & Creative Work",
    eyebrow: "Design Portfolio",
    category: "Figma and Photoshop Works",
    status: "Completed design outputs",
    year: "2026",

    summary:
      "A visual case study of UI/UX designs, redesign concepts, and Photoshop artworks that demonstrate interface layout, visual hierarchy, creative editing, and design presentation skills.",

    heroMedia: {
      type: "image",
      src: assetPaths.projects.designWorks.bulldogPay,
      alt: "BulldogPay UI/UX design preview",
    },

    overview:
      "This case study brings together my design-related works, including Figma interface designs and Photoshop creative outputs. It supports the development side of my portfolio by showing my ability to think visually, organize layouts, and present digital products clearly.",

    role:
      "I worked on interface layout, visual direction, screen structure, design consistency, creative editing, and presentation of design outputs.",

    problem:
      "A strong developer portfolio should not only show technical implementation but also communicate design awareness, usability, layout balance, and visual presentation skills.",

    solution:
      "The UI/UX and creative work case study presents all design outputs through a more visual gallery-style layout, making interface design and Photoshop works easier to explore and more noticeable to visitors.",

    impact: [
      "Highlights UI/UX and visual design ability alongside development projects.",
      "Shows Figma-based product interface thinking and redesign exploration.",
      "Displays all Photoshop works as a complete creative gallery.",
      "Improves portfolio presentation for roles that value both development and design awareness.",
    ],

    systems: [
      {
        name: "BulldogPay — Main Design",
        category: "Figma UI/UX",
        description:
          "Main BulldogPay interface design showing the overall visual direction and transaction-based interface concept.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.bulldogPay,
        },
      },
      {
        name: "BulldogPay — Home Screen",
        category: "Figma UI/UX",
        description:
          "Home screen design focused on dashboard structure, quick access, and payment-related navigation.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.bulldogPayHome,
        },
      },
      {
        name: "BulldogPay — QR Payment",
        category: "Figma UI/UX",
        description:
          "QR payment screen concept showing a transaction-centered mobile payment flow.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.bulldogPayQrPayment,
        },
      },
      {
        name: "BulldogPay — Transaction History",
        category: "Figma UI/UX",
        description:
          "Transaction history screen focused on record visibility and user-friendly financial activity tracking.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.bulldogPayTransactionHistory,
        },
      },
      {
        name: "YouTube Music — Main Redesign",
        category: "Figma Redesign",
        description:
          "Main YouTube Music redesign concept showing the overall interface direction and visual treatment.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.youtubeMusic,
        },
      },
      {
        name: "YouTube Music — High Fidelity",
        category: "Figma Redesign",
        description:
          "High-fidelity screen showing the refined layout, spacing, colors, and visual hierarchy.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.youtubeMusicHigh,
        },
      },
      {
        name: "YouTube Music — Low Fidelity",
        category: "Figma Redesign",
        description:
          "Low-fidelity screen showing early structure, layout planning, and design exploration.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.youtubeMusicLow,
        },
      },
      {
        name: "Photoshop Creative Work 1",
        category: "Photoshop Artwork",
        description:
          "A Photoshop-based creative visual output showing editing, composition, and digital design skills.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.photoshopWorkOne,
        },
      },
      {
        name: "Photoshop Creative Work 2",
        category: "Photoshop Artwork",
        description:
          "A creative Photoshop output focused on visual editing and design presentation.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.photoshopWorkTwo,
        },
      },
      {
        name: "Photoshop Creative Work 3",
        category: "Photoshop Artwork",
        description:
          "A digital creative work showing layout, hierarchy, and visual composition.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.photoshopWorkThree,
        },
      },
      {
        name: "Photoshop Creative Work 4",
        category: "Photoshop Artwork",
        description:
          "A Photoshop artwork showing image editing, creative direction, and visual presentation.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.photoshopWorkFour,
        },
      },
      {
        name: "Photoshop Creative Work 5",
        category: "Photoshop Artwork",
        description:
          "A creative editing output showing experimentation, visual style, and digital design.",
        media: {
          type: "image",
          src: assetPaths.projects.designWorks.photoshopWorkFive,
        },
      },
    ],

    techStack: [
      "Figma",
      "Adobe Photoshop",
      "UI Design",
      "UX Flow",
      "Graphic Design",
      "Visual Hierarchy",
      "Creative Editing",
      "Visual Communication",
    ],

    sections: [
      {
        title: "Key design focus",
        body:
          "These works focus on visual hierarchy, spacing, layout balance, interface structure, design consistency, and creative presentation.",
      },
      {
        title: "Why this project matters",
        body:
          "This case study helps position me not only as a developer but also as someone who understands how interfaces should look, feel, and communicate clearly to users.",
      },
    ],
  },
];