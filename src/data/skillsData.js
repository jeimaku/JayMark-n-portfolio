const SI = "https://cdn.simpleicons.org";
const DI =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const THESVG =
  "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons";

export const skillProjects = [
  {
    id: "paysera-inventory",
    label: "Paysera Inventory",
    description:
      "Device records, employee assignments, returns, warranties, and maintenance.",
    stack: ["React.js", "Tailwind CSS", "Supabase"],
  },
  {
    id: "virtual-office",
    label: "Virtual Office",
    description:
      "Client contracts, renewal monitoring, receipts, and email workflows.",
    stack: ["React.js", "Tailwind CSS", "Node.js", "XAMPP", "Gmail"],
  },
  {
    id: "launchpad-crm",
    label: "Launchpad CRM",
    description:
      "Inquiry pipeline, lead progress, proposals, notifications, and scheduling.",
    stack: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "XAMPP",
      "Render",
      "Tailscale Funnel",
      "Gmail",
      "Google Calendar",
    ],
  },
  {
    id: "ticketing",
    label: "520 Ticketing",
    description:
      "Support requests, ticket status, client communication, and resolution tracking.",
    stack: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "Render",
    ],
  },
];

export const skillGroups = [
  {
    id: "primary",
    label: "Primary Stack",
    description:
      "The technologies I reach for most when building internal systems.",
  },
  {
    id: "web",
    label: "Web",
    description:
      "Interfaces, layouts, and browser experiences people actually use.",
  },
  {
    id: "backend",
    label: "Backend & Data",
    description:
      "Services and databases that keep records, workflows, and status updates organized.",
  },
  {
    id: "workflow",
    label: "Tools",
    description:
      "Development, deployment, and integration tools used to ship and maintain systems.",
  },
  {
    id: "mobile",
    label: "Mobile",
    description:
      "Tools for building applications that work across mobile devices.",
  },
  {
    id: "ai",
    label: "AI",
    description:
      "AI technologies used in projects, separated from AI assistants used while coding.",
  },
];

export const technologies = [
  {
    id: "react",
    name: "React.js",
    groups: ["primary", "web"],
    iconUrl: `${SI}/react`,
    brandColor: "#61DAFB",
    role: "Interface layer",
    weight: "primary",
    shortDescription:
      "Used to build the main interfaces for the internal business systems.",
    projects: [
      "Paysera Inventory",
      "Virtual Office",
      "Launchpad CRM",
      "520 Ticketing",
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    groups: ["primary", "web"],
    iconUrl: `${SI}/javascript`,
    brandColor: "#F7DF1E",
    role: "App language",
    weight: "primary",
    shortDescription:
      "Used across the browser and server logic behind the systems.",
    projects: [
      "Paysera Inventory",
      "Virtual Office",
      "Launchpad CRM",
      "520 Ticketing",
    ],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    groups: ["primary", "web"],
    iconUrl: `${SI}/tailwindcss`,
    brandColor: "#06B6D4",
    role: "Interface styling",
    weight: "primary",
    shortDescription:
      "Used to keep screens responsive, consistent, and quick to build.",
    projects: [
      "Paysera Inventory",
      "Virtual Office",
      "Launchpad CRM",
      "520 Ticketing",
    ],
  },
  {
    id: "nodejs",
    name: "Node.js",
    groups: ["primary", "backend"],
    iconUrl: `${SI}/nodedotjs`,
    brandColor: "#5FA04E",
    role: "Server logic",
    weight: "primary",
    shortDescription:
      "Used for the services that handle data behind the interface.",
    projects: [
      "Virtual Office",
      "Launchpad CRM",
      "520 Ticketing",
    ],
  },
  {
    id: "supabase",
    name: "Supabase",
    groups: ["primary", "backend"],
    iconUrl: `${SI}/supabase`,
    brandColor: "#3ECF8E",
    role: "Backend platform",
    weight: "primary",
    shortDescription:
      "Used to store and manage application data for selected systems.",
    projects: ["Paysera Inventory", "520 Ticketing"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    groups: ["primary", "backend"],
    iconUrl: `${SI}/postgresql`,
    brandColor: "#4169E1",
    role: "Database",
    weight: "primary",
    shortDescription:
      "Used for structured application records in the ticketing workflow.",
    projects: ["520 Ticketing"],
  },
  {
    id: "html5",
    name: "HTML",
    groups: ["web"],
    iconUrl: `${SI}/html5`,
    brandColor: "#E34F26",
    role: "Page structure",
    shortDescription:
      "Used as the foundation for accessible, readable web pages.",
    projects: [],
  },
  {
    id: "css3",
    name: "CSS",
    groups: ["web"],
    iconUrl: `${SI}/css`,
    brandColor: "#1572B6",
    role: "Visual layout",
    shortDescription:
      "Used with Tailwind when layouts need custom styling and polish.",
    projects: [],
  },
  {
    id: "express",
    name: "Express.js",
    groups: ["backend"],
    iconUrl: `${DI}/express/express-original.svg`,
    brandColor: "#FFFFFF",
    role: "API routing",
    shortDescription:
      "Used with Node.js to organize routes and server-side workflows.",
    projects: [],
  },
  {
    id: "mysql",
    name: "MySQL",
    groups: ["backend"],
    iconUrl: `${SI}/mysql`,
    brandColor: "#4479A1",
    role: "Database",
    shortDescription:
      "Used to manage structured business records in XAMPP-backed systems.",
    projects: ["Virtual Office", "Launchpad CRM"],
  },
  {
    id: "xampp",
    name: "XAMPP",
    groups: ["backend", "workflow"],
    iconUrl: `${SI}/xampp`,
    brandColor: "#FB7A24",
    role: "Local server stack",
    shortDescription:
      "Used for local database and server setup during system development.",
    projects: ["Virtual Office", "Launchpad CRM"],
  },
  {
    id: "firebase",
    name: "Firebase",
    groups: ["backend"],
    iconUrl: `${SI}/firebase`,
    brandColor: "#FFCA28",
    role: "Backend services",
    shortDescription:
      "Used in earlier web and mobile work for app data and authentication.",
    projects: [],
  },
  {
    id: "firestore",
    name: "Firestore",
    groups: ["backend"],
    iconUrl: `${SI}/firebase`,
    brandColor: "#FFCA28",
    role: "Cloud data",
    shortDescription:
      "Used for cloud-hosted application records in Firebase projects.",
    projects: [],
  },
  {
    id: "git",
    name: "Git",
    groups: ["workflow"],
    iconUrl: `${SI}/git`,
    brandColor: "#F05032",
    role: "Version control",
    shortDescription:
      "Used to track changes and keep development work organized.",
    projects: [],
  },
  {
    id: "github",
    name: "GitHub",
    groups: ["workflow"],
    iconUrl: `${SI}/github/white`,
    brandColor: "#FFFFFF",
    role: "Code hosting",
    shortDescription:
      "Used for storing repositories and managing project code.",
    projects: [],
  },
  {
    id: "render",
    name: "Render",
    groups: ["workflow"],
    iconUrl: `${SI}/render`,
    brandColor: "#46E3B7",
    role: "Deployment",
    shortDescription:
      "Used to put selected web systems online for access and testing.",
    projects: ["Launchpad CRM", "520 Ticketing"],
  },
  {
    id: "vscode",
    name: "VS Code",
    groups: ["workflow"],
    iconUrl: `${DI}/vscode/vscode-original.svg`,
    brandColor: "#007ACC",
    role: "Editor",
    shortDescription:
      "The main editor used for development and debugging.",
    projects: [],
  },
  {
    id: "npm",
    name: "NPM",
    groups: ["workflow"],
    iconUrl: `${SI}/npm`,
    brandColor: "#CB3837",
    role: "Packages",
    shortDescription:
      "Used to install and manage JavaScript project dependencies.",
    projects: [],
  },
  {
    id: "tailscale",
    name: "Tailscale Funnel",
    groups: ["workflow"],
    iconUrl: `${SI}/tailscale`,
    brandColor: "#FFFFFF",
    role: "Private access",
    shortDescription:
      "Used to expose a staff-only CRM pipeline while keeping the internal dashboard private.",
    projects: ["Launchpad CRM"],
  },
  {
    id: "gmail",
    name: "Gmail",
    groups: ["workflow"],
    iconUrl: `${SI}/gmail`,
    brandColor: "#EA4335",
    role: "Email workflow",
    shortDescription:
      "Used in systems that prepare reminders, proposals, and client communication.",
    projects: ["Virtual Office", "Launchpad CRM"],
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    groups: ["workflow"],
    iconUrl: `${SI}/googlecalendar`,
    brandColor: "#4285F4",
    role: "Scheduling",
    shortDescription:
      "Used around planning, tours, meeting rooms, and calendar-based workflows.",
    projects: ["Launchpad CRM"],
  },
  {
    id: "flutter",
    name: "Flutter",
    groups: ["mobile"],
    iconUrl: `${SI}/flutter`,
    brandColor: "#02569B",
    role: "Mobile UI",
    shortDescription:
      "Used for building mobile app experiences from one shared codebase.",
    projects: [],
  },
  {
    id: "dart",
    name: "Dart",
    groups: ["mobile"],
    iconUrl: `${SI}/dart`,
    brandColor: "#0175C2",
    role: "Mobile language",
    shortDescription:
      "Used as the programming language behind Flutter applications.",
    projects: [],
  },
  {
    id: "openai",
    name: "OpenAI",
    groups: ["ai"],
    iconUrl: `${THESVG}/openai/light.svg`,
    brandColor: "#FFFFFF",
    role: "Project AI",
    type: "project-ai",
    shortDescription:
      "Integrated into project features that use AI-assisted responses and feedback.",
    projects: ["TalkReady"],
  },
  {
    id: "azure-ai",
    name: "Azure AI",
    groups: ["ai"],
    iconUrl: `${DI}/azure/azure-original.svg`,
    brandColor: "#0078D4",
    role: "Project AI",
    type: "project-ai",
    shortDescription:
      "Used in project features connected to speech and language assessment.",
    projects: ["TalkReady"],
  },
  {
    id: "codex",
    name: "Codex",
    groups: ["ai"],
    iconUrl: `${THESVG}/openai/light.svg`,
    brandColor: "#FFFFFF",
    role: "Development assistant",
    type: "assistant",
    shortDescription:
      "Used as a coding assistant while planning, reviewing, and implementing development work.",
    projects: [],
  },
  {
    id: "claude-code",
    name: "Claude Code",
    groups: ["ai"],
    iconUrl: `${SI}/claude`,
    brandColor: "#D97757",
    role: "Development assistant",
    type: "assistant",
    shortDescription:
      "Used as a development assistant for code reading and implementation support.",
    projects: [],
  },
  {
    id: "gemini",
    name: "Gemini",
    groups: ["ai"],
    iconUrl: `${SI}/googlegemini`,
    brandColor: "#8E75B2",
    role: "Development assistant",
    type: "assistant",
    shortDescription:
      "Used as an AI assistant for technical research and development support.",
    projects: [],
  },
  {
    id: "antigravity",
    name: "Antigravity",
    groups: ["ai"],
    iconUrl: `${SI}/google`,
    brandColor: "#4285F4",
    role: "Development assistant",
    type: "assistant",
    shortDescription:
      "Used as an AI-assisted development environment, separate from project AI integrations.",
    projects: [],
  },
];

export const creativeTechnologies = [
  {
    id: "figma",
    name: "Figma",
    iconUrl: `${SI}/figma`,
    brandColor: "#F24E1E",
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    iconUrl: `${DI}/photoshop/photoshop-original.svg`,
    brandColor: "#31A8FF",
  },
  {
    id: "canva",
    name: "Canva",
    iconUrl: "/canva-seeklogo.png",
    brandColor: "#00C4CC",
  },
  {
    id: "capcut",
    name: "CapCut",
    iconUrl: "/capcut-seeklogo.png",
    brandColor: "#FFFFFF",
  },
  {
    id: "filmora",
    name: "Wondershare Filmora",
    iconUrl: `${SI}/wondersharefilmora`,
    brandColor: "#07273D",
  },
  {
    id: "premiere",
    name: "Adobe Premiere Pro",
    iconUrl: `${SI}/adobepremierepro`,
    brandColor: "#9999FF",
  },
];

export const secondaryCapabilitySections = [
  {
    id: "development-tools",
    label: "Development Tools",
    description: "Code, deploy, test, and connect systems.",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "NPM",
      "Render",
      "Tailscale Funnel",
    ],
  },
  {
    id: "ai-assistants",
    label: "AI Development Assistants",
    description: "Tools used during development, not products I built.",
    items: ["Codex", "Claude Code", "Gemini", "Antigravity"],
  },
  {
    id: "project-ai",
    label: "AI Used In Projects",
    description: "Technologies integrated into actual project features.",
    items: ["OpenAI", "Azure AI"],
  },
  {
    id: "creative-tools",
    label: "Creative Tools",
    description: "Design, editing, and presentation support.",
    items: [
      "Figma",
      "Adobe Photoshop",
      "Canva",
      "CapCut",
      "Wondershare Filmora",
      "Adobe Premiere Pro",
    ],
  },
];

/*
 * Presentation data for the v2 technology ecosystem. Technology details
 * remain in the collections above; these lanes only define their visual
 * grouping and rhythm in the Skills section.
 */
export const primaryStackLanes = [
  {
    id: "frontend",
    label: "Frontend",
    index: "01",
    direction: "left",
    duration: 36,
    technologyIds: [
      "react",
      "javascript",
      "tailwind",
      "html5",
      "css3",
    ],
  },
  {
    id: "backend",
    label: "Backend & data",
    index: "02",
    direction: "right",
    duration: 42,
    technologyIds: [
      "nodejs",
      "supabase",
      "postgresql",
      "mysql",
    ],
  },
];

export const capabilityMarqueeLanes = [
  {
    id: "development-tools",
    label: "Development tools",
    index: "01",
    direction: "right",
    duration: 38,
    technologyIds: [
      "git",
      "github",
      "vscode",
      "npm",
      "render",
      "tailscale",
    ],
  },
  {
    id: "ai-workflow",
    label: "AI development & integration",
    index: "02",
    direction: "left",
    duration: 46,
    technologyIds: [
      "codex",
      "claude-code",
      "gemini",
      "antigravity",
      "openai",
      "azure-ai",
    ],
  },
  {
    id: "creative-workflow",
    label: "Creative workflow",
    index: "03",
    direction: "right",
    duration: 43,
    technologyIds: [
      "figma",
      "photoshop",
      "canva",
      "capcut",
      "premiere",
    ],
  },
];

export const itSupportCapabilities = [
  {
    id: "hardware",
    label: "Hardware",
    icon: "hardware",
    accent: "#F5F5F5",
    status: "Field diagnostics",
    skills: [
      "Hardware troubleshooting",
      "Desktop components",
      "Cable installation",
    ],
  },
  {
    id: "networking",
    label: "Networking",
    icon: "networking",
    accent: "#B8B8B8",
    status: "Network layer",
    skills: [
      "Network fundamentals",
      "TCP/IP",
      "Router configuration",
      "Switch configuration",
      "Access points",
    ],
  },
  {
    id: "systems",
    label: "Systems",
    icon: "systems",
    accent: "#A3A3A3",
    status: "System administration",
    skills: [
      "Software troubleshooting",
      "Basic server administration",
      "Active Directory",
    ],
  },
];
