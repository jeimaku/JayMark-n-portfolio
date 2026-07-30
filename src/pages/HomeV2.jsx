import HeroExperience from "../components/v2/HeroExperience";
import { heroContent } from "../data/heroContent";
import {
  AboutSection,
  ExperienceEducationSection,
  ProjectsSection,
  SkillsSection,
} from "../components/v2/sections";

import {
  PageSection,
  SectionHeading,
  SectionPanel,
} from "../components/v2/sections";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M4.5 10h11m-4.25-4.25L15.5 10l-4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M6 2.75h5.25L15 6.5v10.75H6V2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M11 2.75V6.5h4M8.25 10h4.5M8.25 13h4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M3 5.25h14v9.5H3v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m3.75 6 6.25 4.75L16.25 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProofPoint({ label, value }) {
  return (
    <li className="min-w-0">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium leading-6 text-slate-200">
        {value}
      </p>
    </li>
  );
}

export default function HomeV2() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-slate-950 text-slate-50 focus:outline-none"
    >
      <section
        id="home"
        aria-labelledby="hero-title"
        className="relative isolate min-h-screen overflow-hidden pt-20 sm:pt-24"
      >
        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-[4%] top-[18%] h-96 w-96 rounded-full bg-cyan-400/[0.045] blur-3xl" />

          <div className="absolute right-[3%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-indigo-400/[0.04] blur-3xl" />

          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(148,163,184,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.45)_1px,transparent_1px)] [background-size:72px_72px]" />

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-[90rem] items-start gap-12 px-4 py-10 sm:px-6 sm:py-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-center xl:gap-16 xl:px-10 xl:py-14 2xl:gap-20">          {/* Hero copy */}
          <div className="relative z-10 min-w-0 xl:pb-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200 sm:text-sm">
                {heroContent.eyebrow}
              </p>

              <span
                aria-hidden="true"
                className="hidden h-4 w-px bg-white/15 sm:block"
              />

              <div
                role="status"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40 motion-reduce:animate-none" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                {heroContent.statusLabel}
              </div>
            </div>

            <h1
              id="hero-title"
              className="mt-7 max-w-3xl tracking-[-0.06em]"
            >
              <span className="block text-4xl font-semibold leading-[0.97] text-white sm:text-5xl md:text-6xl xl:text-[4.25rem] 2xl:text-[4.75rem]">
                {heroContent.name}
              </span>

              <span className="mt-5 block max-w-2xl bg-gradient-to-r from-cyan-100 via-cyan-200 to-slate-300 bg-clip-text text-lg font-medium leading-tight text-transparent sm:text-2xl xl:text-[1.85rem]">
                {heroContent.role}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {heroContent.summary}
            </p>

            {/* Main actions */}
            <div className="mt-9 grid w-full grid-cols-1 gap-3 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
              <a
                href={heroContent.primaryAction.href}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_36px_rgba(8,145,178,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_16px_42px_rgba(8,145,178,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                {heroContent.primaryAction.label}

                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>

              <a
                href={heroContent.resumeAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                <DocumentIcon />

                {heroContent.resumeAction.label}
              </a>
            </div>

            {/* Secondary availability/contact row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="max-w-lg text-sm leading-6 text-slate-500">
                {heroContent.availability}
              </p>

              <a
                href={heroContent.contactAction.href}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                <ContactIcon />

                {heroContent.contactAction.label}

                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </div>

            {/* Recruiter-readable proof strip */}
            <ul
              aria-label="Professional focus areas"
              className="mt-10 grid max-w-2xl grid-cols-1 gap-5 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-6"
            >
              {heroContent.proofPoints.map((point) => (
                <ProofPoint
                  key={point.label}
                  label={point.label}
                  value={point.value}
                />
              ))}
            </ul>
          </div>

          {/* 3D experience */}
          <div className="relative mx-auto w-full min-w-0 max-w-4xl xl:max-w-none xl:translate-y-2">
            <div className="mb-4 flex items-end justify-between gap-6 px-1">
              <div>
                <p
                  id="hero-workspace-title"
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300"
                >
                  {heroContent.scene.eyebrow}
                </p>

                <p
                  id="hero-workspace-description"
                  className="mt-1 hidden max-w-md text-xs leading-5 text-slate-600 sm:block"
                >
                  {heroContent.scene.caption}
                </p>
              </div>

              <div className="hidden shrink-0 items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.04] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-emerald-300/80 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                {heroContent.scene.status}
              </div>
            </div>

            <div
              aria-label="Interactive 3D workspace representing software development, artificial intelligence, networking, and IT infrastructure"
              className="group relative h-[26rem] overflow-hidden rounded-[1.5rem] border border-cyan-300/15 bg-slate-900/25 shadow-[0_28px_90px_rgba(0,0,0,0.42)] sm:h-[34rem] sm:rounded-[2rem] md:h-[38rem] xl:h-[clamp(32rem,66vh,42rem)]"
            >
              {/* Decorative frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] ring-1 ring-inset ring-white/[0.025]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-5 top-5 z-10 h-8 w-8 border-l border-t border-cyan-200/25"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 right-5 z-10 h-8 w-8 border-b border-r border-cyan-200/25"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_35%,rgba(34,211,238,0.08),transparent_25rem)]"
              />

              <HeroExperience />

              <div className="pointer-events-none absolute inset-x-5 bottom-5 z-20 hidden justify-center sm:flex">
                <div className="rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-center text-[0.7rem] font-medium text-slate-400 shadow-lg backdrop-blur">
                  Drag to explore
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 px-1 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <p>Optimized for desktop and mobile devices</p>

              <p className="hidden sm:block">
                Motion preferences respected
              </p>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceEducationSection />
    </main>
  );
}