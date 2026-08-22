import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Code2,
  Compass,
  Cpu,
  Layers,
  MapPin,
  Server,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import { aboutContent } from "../../../data/aboutContent";
import { getHomepageSection } from "../../../data/homepageSections";

import PageSection from "./PageSection";
import SectionHeading from "./SectionHeading";
import SectionPanel from "./SectionPanel";
import StaggerReveal, { StaggerItem } from "../motion/StaggerReveal";

/* ─── Engineering Domain Pillars ───────────────────────────────────────────
   Three foundational pillars shaping Jay Mark's engineering identity.
───────────────────────────────────────────────────────────────────────────── */

const DOMAIN_PILLARS = [
  {
    id: "development",
    label: "Development",
    Icon: Code2,
    tagline: "Building reliable applications and user-focused systems.",
    detail:
      "I design and construct end-to-end web applications — pairing clean database schemas and resilient APIs with responsive, accessible user interfaces that solve tangible workflow challenges.",
    highlight: "Full-Stack Systems · Intuitive Interfaces · Clean Architecture",
  },
  {
    id: "intelligence",
    label: "Intelligence",
    Icon: Cpu,
    tagline: "Exploring AI-assisted workflows and smarter solutions.",
    detail:
      "I integrate practical AI services into real-world platforms — implementing automated speech assessment pipelines, cognitive feedback mechanisms, and streamlined content workflows.",
    highlight: "Cognitive API Integration · Automated Evaluation · Practical AI",
  },
  {
    id: "operations",
    label: "Operations",
    Icon: Server,
    tagline: "Supporting infrastructure, reliability, and real-world deployment.",
    detail:
      "My background in enterprise IT support, server management, and network troubleshooting ensures I build software with deployment, monitoring, troubleshooting, and maintainability in mind.",
    highlight: "Infrastructure Support · System Diagnostics · Operational Reliability",
  },
];

/* ─── Philosophy Timeline Steps ─────────────────────────────────────────────
   Engineering approach centered on clarity, execution, and maintainability.
───────────────────────────────────────────────────────────────────────────── */

const PHILOSOPHY_STEPS = [
  {
    number: "01",
    phase: "Understand",
    summary: "Analyze users, requirements, and constraints.",
    description:
      "I begin by identifying the people using the system, their real workflow bottlenecks, and the technical boundaries we must operate within.",
    Icon: Compass,
  },
  {
    number: "02",
    phase: "Build",
    summary: "Create practical solutions with clear architecture.",
    description:
      "I prioritize clean code, intuitive component design, and dependable data flow to build software that solves concrete problems without unnecessary complexity.",
    Icon: Layers,
  },
  {
    number: "03",
    phase: "Improve",
    summary: "Maintain, optimize, and continuously refine.",
    description:
      "I structure codebases and documentation so that troubleshooting, handovers, performance tuning, and future enhancements remain seamless for everyone.",
    Icon: ShieldCheck,
  },
];

/* ─── Portrait Component ───────────────────────────────────────────────────
   Human visual anchor with a clean, understated modern frame.
───────────────────────────────────────────────────────────────────────────── */

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[240px] lg:mx-0 lg:max-w-[280px]">
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-2 shadow-2xl shadow-black/50 transition duration-500 hover:border-cyan-400/30">
        {/* Subtle ambient hover glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Portrait container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-900">
          <img
            src={aboutContent.portrait.src}
            alt={aboutContent.portrait.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            style={{ objectPosition: aboutContent.portrait.objectPosition }}
          />

          {/* Soft vignette overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
          />

          {/* Understated caption */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-[0.65rem] font-medium text-slate-300 backdrop-blur-md">
            <span>Jay Mark Apelado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── IdentityBlock Component ──────────────────────────────────────────────
   Name, role, concise human statement, and status.
───────────────────────────────────────────────────────────────────────────── */

function IdentityBlock() {
  return (
    <div className="flex min-w-0 flex-col justify-center text-left">
      {/* Intro badge */}
      <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-slate-300">
        <User size={13} className="text-cyan-300" />
        <span>About the Engineer</span>
      </div>

      {/* Name */}
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Jay Mark Apelado
      </h2>

      {/* Role with cyan accent separator */}
      <p className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90 sm:text-sm">
        <span>Full-Stack Developer</span>
        <span aria-hidden="true" className="text-cyan-400/60">
          •
        </span>
        <span>IT Support Specialist</span>
      </p>

      {/* Concise Personal Statement (Focused, human, 3 sentences) */}
      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
        I build software systems designed not only to function, but to remain understandable,
        maintainable, and genuinely useful in real operational environments.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
        With a background spanning both full-stack development and hands-on IT support, I approach
        engineering holistically — connecting user-facing applications directly with dependable
        infrastructure and sustainable processes.
      </p>

      {/* Understated quick badges */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {/* Availability */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5 text-xs font-medium text-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>{aboutContent.profileCard.status}</span>
        </div>

        {/* Location */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300">
          <MapPin size={12} className="text-cyan-300/70" />
          <span>Based in Philippines</span>
        </div>
      </div>
    </div>
  );
}

/* ─── DomainPillarCard Component ───────────────────────────────────────────
   Clean identity pillar switcher.
───────────────────────────────────────────────────────────────────────────── */

function DomainPillarCard({ pillar, isActive, onClick, reduced }) {
  const { Icon, label, tagline } = pillar;

  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls="about-domain-panel"
      onClick={onClick}
      whileHover={reduced ? {} : { y: -2 }}
      whileTap={reduced ? {} : { scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className={[
        "group relative flex w-full flex-col justify-between overflow-hidden text-left",
        "rounded-2xl border p-5 transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        isActive
          ? "border-cyan-400/40 bg-cyan-400/[0.06] shadow-lg shadow-cyan-950/20"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
      ].join(" ")}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <div
            className={[
              "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300",
              isActive
                ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                : "border-white/10 bg-white/[0.03] text-slate-400 group-hover:text-slate-200",
            ].join(" ")}
          >
            <Icon size={18} />
          </div>

          {isActive ? (
            <span className="rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-[0.65rem] font-medium text-cyan-200">
              Active View
            </span>
          ) : null}
        </div>

        <h3
          className={[
            "mt-4 text-lg font-semibold tracking-tight transition-colors duration-300",
            isActive ? "text-white" : "text-slate-200 group-hover:text-white",
          ].join(" ")}
        >
          {label}
        </h3>

        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
          {tagline}
        </p>
      </div>

      {/* Subtle bottom active bar */}
      <span
        aria-hidden="true"
        className={[
          "mt-4 block h-0.5 rounded-full bg-cyan-400 transition-all duration-300",
          isActive ? "w-8 opacity-100" : "w-0 opacity-0",
        ].join(" ")}
      />
    </motion.button>
  );
}

/* ─── ActiveDomainPanel Component ──────────────────────────────────────────
   Clean panel displaying the selected domain's core philosophy.
───────────────────────────────────────────────────────────────────────────── */

function ActiveDomainPanel({ pillar }) {
  const { label, detail, highlight } = pillar;

  return (
    <SectionPanel className="p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
              {label} Philosophy
            </p>
          </div>

          <p className="mt-3 text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            {detail}
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-400">
            <Sparkles size={13} className="text-cyan-300/80 shrink-0" />
            <span>{highlight}</span>
          </div>
        </div>
      </div>
    </SectionPanel>
  );
}

/* ─── ApproachTimeline Component ───────────────────────────────────────────
   01 Understand → 02 Build → 03 Improve engineering philosophy timeline.
───────────────────────────────────────────────────────────────────────────── */

function ApproachTimeline() {
  return (
    <div className="mt-16 sm:mt-20">
      {/* Sub-heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="h-px w-6 bg-cyan-300/50" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Engineering Approach
            </p>
          </div>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            From requirements to reliable systems.
          </h3>
        </div>

        <p className="max-w-md text-sm leading-6 text-slate-400">
          A disciplined, human-centered approach focused on understanding real problems, writing clean
          software, and ensuring long-term maintainability.
        </p>
      </div>

      {/* Timeline steps */}
      <StaggerReveal className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5" amount={0.12}>
        {PHILOSOPHY_STEPS.map((item, index) => {
          const StepIcon = item.Icon;

          return (
            <StaggerItem key={item.number} className="h-full">
              <SectionPanel as="article" className="flex h-full flex-col justify-between p-6">
                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                        <StepIcon size={16} />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
                        {item.phase}
                      </span>
                    </div>

                    <span className="font-mono text-base font-bold text-slate-600">
                      {item.number}
                    </span>
                  </div>

                  {/* Summary & description */}
                  <div className="mt-4">
                    <h4 className="text-base font-semibold tracking-tight text-white">
                      {item.summary}
                    </h4>

                    <p className="mt-2.5 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Progress flow hint */}
                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>Step {item.number} of 03</span>
                  {index < 2 && (
                    <ArrowRight size={12} className="text-cyan-400/40" aria-hidden="true" />
                  )}
                </div>
              </SectionPanel>
            </StaggerItem>
          );
        })}
      </StaggerReveal>
    </div>
  );
}

/* ─── ProfessionalProfile Component ────────────────────────────────────────
   Compact "At a glance" profile replacing technical telemetry cards.
───────────────────────────────────────────────────────────────────────────── */

function ProfessionalProfile() {
  const profileItems = [
    {
      label: "Based in",
      value: "Philippines",
    },
    {
      label: "Primary Focus",
      value: "Full-stack systems & internal workflows",
    },
    {
      label: "Core Strength",
      value: "Software development + infrastructure reliability",
    },
    {
      label: "Working Style",
      value: "Practical, iterative, and documentation-driven",
    },
  ];

  return (
    <StaggerReveal className="mt-16 sm:mt-20" amount={0.15}>
      <StaggerItem>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 shadow-xl shadow-black/40"
        >
          {/* Subtle cyan accent line */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-300 via-cyan-300/30 to-transparent"
          />

          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.06] pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                At a glance
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">
                Professional Profile
              </h3>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5 text-xs font-medium text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{aboutContent.profileCard.status}</span>
            </div>
          </div>

          {/* Profile details grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profileItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.06 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4 transition-colors hover:border-white/10 hover:bg-white/[0.03]"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5 text-xs text-slate-400">
            <span>Open to full-time engineering roles and collaborative systems work.</span>
          </div>
        </motion.div>
      </StaggerItem>
    </StaggerReveal>
  );
}

/* ─── AboutSection Main Export ─────────────────────────────────────────────
   Modern, minimal, human-centered developer introduction.
───────────────────────────────────────────────────────────────────────────── */

export default function AboutSection() {
  const section = getHomepageSection("about");
  const [activeId, setActiveId] = useState(DOMAIN_PILLARS[0].id);
  const reduced = Boolean(useReducedMotion());

  const activePillar =
    DOMAIN_PILLARS.find((c) => c.id === activeId) ?? DOMAIN_PILLARS[0];

  return (
    <PageSection id="about" labelledBy="about-heading" tone="subtle">
      {/* Section Eyebrow & Title */}
      <SectionHeading
        id="about-heading"
        eyebrow={section?.eyebrow ?? "About Me"}
        title="Meet the engineer behind the systems."
        description="A developer who bridges full-stack engineering with real-world infrastructure and reliability."
      />

      {/* Side-by-side portrait + intro */}
      <div className="mt-10 grid items-center gap-8 lg:grid-cols-[280px_1fr] lg:gap-12 xl:gap-14">
        <Portrait />
        <IdentityBlock />
      </div>

      {/* Engineering Domains (Identity Pillars) */}
      <div className="mt-14 sm:mt-18">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Engineering Domains
          </p>
          <p className="text-xs text-slate-400">
            Three foundational pillars shaping my work
          </p>
        </div>

        {/* Pillar Tabs */}
        <div
          role="tablist"
          aria-label="Engineering Domains"
          className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {DOMAIN_PILLARS.map((pillar) => (
            <DomainPillarCard
              key={pillar.id}
              pillar={pillar}
              isActive={activeId === pillar.id}
              onClick={() => setActiveId(pillar.id)}
              reduced={reduced}
            />
          ))}
        </div>

        {/* Smooth Domain Details Panel */}
        <div
          id="about-domain-panel"
          role="tabpanel"
          aria-label={`${activePillar.label} details`}
          className="mt-4"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeId}
              initial={{
                opacity: 0,
                y: reduced ? 0 : 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: reduced ? 0 : -6,
              }}
              transition={{
                duration: reduced ? 0 : 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ActiveDomainPanel pillar={activePillar} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Engineering Philosophy Timeline */}
      <ApproachTimeline />

      {/* Professional Profile ("At a glance") */}
      <ProfessionalProfile />
    </PageSection>
  );
}