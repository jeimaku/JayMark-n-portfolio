import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers,
  Maximize2,
  Play,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import Container from "../../layout/Container";
import SectionHeading from "./SectionHeading";
import LazyVideo from "../../ui/LazyVideo";
import MediaLightbox from "../../ui/MediaLightbox";
import { interactiveProjects } from "../../../data";
import useProjectGallery from "../../../hooks/useProjectGallery";

/* ─── Technology Stack Badge ─────────────────────────────────────────────── */

function TechBadge({ name }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-slate-300 transition duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/[0.08] hover:text-cyan-100">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-cyan-300/70"
      />
      {name}
    </span>
  );
}

/* ─── Main Interactive Projects Section Component ────────────────────────── */

export default function ProjectsSection() {
  const [activeMedia, setActiveMedia] = useState(null);

  const {
    sectionRef,
    activeIndex,
    direction,
    activeProject,
    activeScreenIndex,
    setActiveScreenIndex,
    goToProject,
    goNext,
    goPrevious,
    handleTouchStart,
    handleTouchEnd,
    prefersReducedMotion,
  } = useProjectGallery({
    projects: interactiveProjects,
    initialIndex: 0,
  });

  const isGalleryProject = activeProject?.media?.type === "gallery";
  const screens = activeProject?.media?.screens ?? [];
  const currentScreen = screens[activeScreenIndex] ?? screens[0] ?? null;

  const handleOpenLightbox = () => {
    if (!activeProject) return;

    if (isGalleryProject && currentScreen) {
      setActiveMedia({
        type: "image",
        src: currentScreen.src,
        title: `${activeProject.title} — ${currentScreen.label}`,
        description: currentScreen.alt ?? activeProject.subtitle,
      });
    } else if (activeProject.media?.video) {
      setActiveMedia({
        type: "video",
        src: activeProject.media.video,
        title: activeProject.title,
        description: activeProject.subtitle ?? activeProject.description,
      });
    } else if (activeProject.media?.cover) {
      setActiveMedia({
        type: "image",
        src: activeProject.media.cover,
        title: activeProject.title,
        description: activeProject.subtitle ?? activeProject.description,
      });
    }
  };

  /* Motion variants for directional project transition */
  const slideVariants = {
    enter: (dir) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? 32 : -32,
      opacity: 0,
      filter: prefersReducedMotion ? "none" : "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.42,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? -32 : 32,
      opacity: 0,
      filter: prefersReducedMotion ? "none" : "blur(4px)",
      transition: {
        duration: prefersReducedMotion ? 0 : 0.32,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-slate-950 py-20 sm:py-28"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambient Lighting & High-Tech Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 opacity-[0.03] [background-image:linear-gradient(rgba(148,163,184,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.4)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 -z-20 h-[32rem] w-[32rem] rounded-full bg-cyan-400/[0.065] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-1/4 -z-20 h-[30rem] w-[30rem] rounded-full bg-indigo-500/[0.055] blur-3xl"
      />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-heading"
            eyebrow="Featured Projects"
            title="TalkReady and four internship systems."
            description="An interactive engineering gallery featuring an AI-assisted language platform and four operational internship workflow systems."
          />

          {/* Quick Counter & Keyboard Nav Hint */}
          <div className="hidden shrink-0 text-right lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-slate-400">
              <span className="text-cyan-300 font-semibold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-slate-600">/</span>
              <span>{String(interactiveProjects.length).padStart(2, "0")}</span>
            </div>
            <p className="mt-1.5 text-[0.68rem] text-slate-500">
              Use <kbd className="rounded border border-white/15 bg-white/[0.04] px-1 py-0.5 font-mono text-[0.62rem] text-slate-300">←</kbd> <kbd className="rounded border border-white/15 bg-white/[0.04] px-1 py-0.5 font-mono text-[0.62rem] text-slate-300">→</kbd> arrow keys to navigate
            </p>
          </div>
        </div>

        {/* ─── Project Navigation Bar ──────────────────────────────────────── */}
        <div className="mt-10 border-b border-white/10 pb-4">
          <div
            role="tablist"
            aria-label="Project showcase navigation"
            className="no-scrollbar flex items-center gap-2 overflow-x-auto py-1"
          >
            {interactiveProjects.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={project.id}
                  id={`project-tab-${project.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`project-panel-${project.id}`}
                  onClick={() => goToProject(index)}
                  className={[
                    "relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200",
                    isActive
                      ? "text-cyan-50 font-semibold shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                      : "text-slate-400 hover:border-white/15 hover:bg-white/[0.035] hover:text-slate-200",
                  ].join(" ")}
                >
                  {/* Animated Background Pill for Active Tab */}
                  {isActive && (
                    <motion.span
                      layoutId="activeProjectTabPill"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full border border-cyan-300/35 bg-cyan-300/[0.12]"
                    />
                  )}

                  {/* Indicator Dot */}
                  <span
                    className={[
                      "relative z-10 h-1.5 w-1.5 rounded-full transition-colors duration-300",
                      isActive
                        ? "bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                        : "bg-slate-600",
                    ].join(" ")}
                  />

                  {/* Tab Number & Name */}
                  <span className="relative z-10 font-mono text-[0.7rem] text-slate-400">
                    {project.tabNumber}
                  </span>
                  <span className="relative z-10 tracking-tight">
                    {project.shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Main Project Showcase Stage ─────────────────────────────────── */}
        <div className="relative mt-8 min-h-[640px]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            {activeProject && (
              <motion.article
                key={activeProject.id}
                id={`project-panel-${activeProject.id}`}
                role="tabpanel"
                aria-labelledby={`project-tab-${activeProject.id}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid gap-8 lg:grid-cols-[1fr_1.1fr] xl:grid-cols-[0.88fr_1.12fr] xl:gap-12 items-start"
              >
                {/* ─── LEFT SIDE: Project Information ──────────────────────── */}
                <div className="flex flex-col gap-6">
                  {/* Category Pill & Project Sequence */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-3.5 py-1.5 text-xs font-semibold text-cyan-200">
                      <Layers aria-hidden="true" size={13} />
                      {activeProject.category}
                    </span>

                    <span className="font-mono text-xs text-slate-500">
                      Project {activeProject.tabNumber} of{" "}
                      {String(interactiveProjects.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="break-safe text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl xl:text-5xl">
                      {activeProject.title}
                    </h3>

                    {activeProject.subtitle && (
                      <p className="mt-2.5 text-base font-medium leading-7 text-cyan-200/90 sm:text-lg">
                        {activeProject.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Metadata Spec Grid: Role, Year, Category */}
                  <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-3">
                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Role
                      </dt>
                      <dd className="mt-1 text-xs font-medium leading-5 text-slate-200 sm:text-sm">
                        {activeProject.role}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Timeline
                      </dt>
                      <dd className="mt-1 text-xs font-medium leading-5 text-slate-200 sm:text-sm">
                        {activeProject.year}
                      </dd>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        System Focus
                      </dt>
                      <dd className="mt-1 text-xs font-medium leading-5 text-slate-200 sm:text-sm">
                        {activeProject.category}
                      </dd>
                    </div>
                  </dl>

                  {/* Problem Solved Callout */}
                  <div className="rounded-2xl border border-rose-400/20 bg-rose-500/[0.035] p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-rose-300">
                      <AlertCircle size={15} aria-hidden="true" />
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em]">
                        Problem Solved
                      </h4>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {activeProject.problem}
                    </p>
                  </div>

                  {/* Solution Summary */}
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.035] p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-cyan-200">
                      <Sparkles size={15} aria-hidden="true" />
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em]">
                        Solution Summary
                      </h4>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {activeProject.solution}
                    </p>
                  </div>

                  {/* Key Highlights (4 points) */}
                  {activeProject.highlights?.length > 0 && (
                    <div>
                      <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Key Engineering Highlights
                      </h4>
                      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {activeProject.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-xs leading-relaxed text-slate-300"
                          >
                            <CheckCircle2
                              size={14}
                              aria-hidden="true"
                              className="mt-0.5 shrink-0 text-cyan-300"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technology Stack */}
                  {activeProject.tech?.length > 0 && (
                    <div>
                      <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Technology Stack
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeProject.tech.map((item) => (
                          <TechBadge key={item} name={item} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ─── RIGHT SIDE: Large Visual Preview & Interactive Media ── */}
                <div className="flex flex-col gap-4">
                  {/* Cyber-Frame Visual Container */}
                  <div className="group/preview relative overflow-hidden rounded-[1.75rem] border border-cyan-300/20 bg-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.6)] sm:rounded-[2rem]">
                    {/* Corner Bracket Accents */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-4 z-30 h-7 w-7 border-l-2 border-t-2 border-cyan-300/40"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-4 right-4 z-30 h-7 w-7 border-b-2 border-r-2 border-cyan-300/40"
                    />

                    {/* Media Display: Video or Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      {isGalleryProject ? (
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentScreen?.src ?? activeProject.id}
                            src={currentScreen?.src ?? activeProject.media?.cover}
                            alt={currentScreen?.alt ?? `${activeProject.title} preview`}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.99 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="h-full w-full object-cover object-top cursor-pointer"
                            onClick={handleOpenLightbox}
                          />
                        </AnimatePresence>
                      ) : activeProject.media?.video ? (
                        <div
                          className="relative h-full w-full cursor-pointer"
                          onClick={handleOpenLightbox}
                        >
                          <LazyVideo
                            src={activeProject.media.video}
                            poster={activeProject.media.cover}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                      ) : (
                        <img
                          src={activeProject.media?.cover}
                          alt={`${activeProject.title} preview`}
                          className="h-full w-full object-cover object-top cursor-pointer"
                          onClick={handleOpenLightbox}
                        />
                      )}

                      {/* Ambient Gradient Overlay */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20"
                      />

                      {/* Header Badge Overlay */}
                      <div className="absolute left-4 top-4 z-30 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          {isGalleryProject ? "Interactive Screenshots" : "System Demo Video"}
                        </span>
                      </div>

                      {/* Expand / Lightbox Button Overlay */}
                      <button
                        type="button"
                        onClick={handleOpenLightbox}
                        aria-label={`Expand ${activeProject.title} media preview`}
                        className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-white shadow-lg backdrop-blur transition duration-300 hover:border-cyan-300 hover:bg-cyan-300/[0.15] hover:text-cyan-200"
                      >
                        <Maximize2 size={15} />
                      </button>
                    </div>

                    {/* Interactive Screenshot Selector (for Gallery projects like TalkReady) */}
                    {isGalleryProject && screens.length > 0 && (
                      <div className="border-t border-white/10 bg-slate-950/90 p-3 backdrop-blur-md">
                        <p className="px-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          System Screens (Click to view)
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {screens.map((screen, sIdx) => {
                            const isCurrent = sIdx === activeScreenIndex;
                            return (
                              <button
                                key={screen.label}
                                type="button"
                                onClick={() => setActiveScreenIndex(sIdx)}
                                className={[
                                  "rounded-lg px-3 py-1.5 text-xs font-medium transition duration-200",
                                  isCurrent
                                    ? "border border-cyan-300/40 bg-cyan-300/[0.12] text-cyan-100 font-semibold"
                                    : "border border-white/10 bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-slate-200",
                                ].join(" ")}
                              >
                                {screen.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bottom Status Bar */}
                    <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/60 px-5 py-3 text-xs text-slate-400">
                      <span className="flex items-center gap-2">
                        <Play size={13} className="text-cyan-300" />
                        <span>
                          {isGalleryProject
                            ? `${currentScreen?.label ?? "Overview"} view`
                            : "Full-motion system preview"}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={handleOpenLightbox}
                        className="text-[0.7rem] font-medium text-cyan-300 hover:underline"
                      >
                        Click preview to inspect full size ↗
                      </button>
                    </div>
                  </div>

                  {/* ─── Bottom Actions Toolbar ────────────────────────────── */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    {/* Left: Previous / Next Project Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={goPrevious}
                        aria-label="Previous project"
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs font-semibold text-slate-200 transition duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                      >
                        <ArrowLeft size={14} />
                        <span>Prev</span>
                      </button>

                      <div className="px-2 text-center">
                        <span className="font-mono text-xs font-semibold text-cyan-300">
                          {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-xs text-slate-600"> / </span>
                        <span className="font-mono text-xs text-slate-400">
                          {String(interactiveProjects.length).padStart(2, "0")}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next project"
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs font-semibold text-slate-200 transition duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                      >
                        <span>Next</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* Right: CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {activeProject.links?.caseStudy && (
                        <a
                          href={activeProject.links.caseStudy}
                          className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 text-xs font-semibold text-slate-950 shadow-[0_8px_24px_rgba(8,145,178,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                        >
                          View Case Study
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </a>
                      )}

                      {activeProject.links?.live && (
                        <a
                          href={activeProject.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                        >
                          Live Platform
                          <ExternalLink size={13} />
                        </a>
                      )}

                      {activeProject.links?.github && (
                        <a
                          href={activeProject.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${activeProject.title} GitHub repository`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                        >
                          <Code2 size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </Container>

      {/* Lightbox for Full-Resolution Image / Video Inspection */}
      <MediaLightbox
        media={activeMedia}
        onClose={() => setActiveMedia(null)}
      />
    </section>
  );
}
