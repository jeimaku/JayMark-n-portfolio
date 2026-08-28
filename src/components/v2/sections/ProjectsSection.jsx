import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  ExternalLink,
  Maximize2,
  Play,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import Container from "../../layout/Container";
import LazyVideo from "../../ui/LazyVideo";
import MediaLightbox from "../../ui/MediaLightbox";
import SectionHeading from "./SectionHeading";
import { interactiveProjects } from "../../../data";
import useMotionRuntime from "../../../hooks/useMotionRuntime";

function getRelativeOffset(index, activeIndex, projectCount) {
  const rawOffset = index - activeIndex;
  const halfCount = projectCount / 2;

  if (rawOffset > halfCount) return rawOffset - projectCount;
  if (rawOffset < -halfCount) return rawOffset + projectCount;

  return rawOffset;
}

function getProjectImage(project, screenIndex = 0) {
  const screens = project.media?.screens ?? [];

  if (project.media?.type === "gallery" && screens.length > 0) {
    return screens[screenIndex] ?? screens[0];
  }

  return {
    src: project.media?.cover,
    alt: `${project.title} project preview`,
    label: "System preview",
  };
}

function getSlotStyle(offset) {
  if (offset === 0) {
    return {
      "--slot-x": "0px",
      "--slot-scale": "1",
      "--slot-opacity": "1",
      "--slot-blur": "0px",
    };
  }

  const isNear = Math.abs(offset) === 1;
  const slotX = isNear
    ? offset < 0
      ? "clamp(-34rem, -39vw, -22rem)"
      : "clamp(22rem, 39vw, 34rem)"
    : offset < 0
      ? "clamp(-50rem, -58vw, -32rem)"
      : "clamp(32rem, 58vw, 50rem)";

  return {
    "--slot-x": slotX,
    "--slot-scale": isNear ? "0.48" : "0.34",
    "--slot-opacity": isNear ? "0.72" : "0.38",
    "--slot-blur": isNear ? "0px" : "1px",
  };
}

function getSlotClasses(offset) {
  if (offset === 0) return "z-30";
  if (Math.abs(offset) === 1) return "hidden z-20 md:block";
  return "hidden z-10 lg:block";
}

function restartPreview(event) {
  const video = event.currentTarget;

  if (video.paused) {
    video.play().catch(() => {});
  }
}

function ProjectPreview({
  project,
  index,
  offset,
  activeScreenIndex,
  onSelect,
  onOpen,
  prefersReducedMotion,
}) {
  const isActive = offset === 0;
  const preview = isActive
    ? getProjectImage(project, activeScreenIndex)
    : getProjectImage(project);
  const isVideoPreview =
    project.media?.type === "video" && Boolean(project.media.video);
  const mediaType = project.media?.type === "video" ? "System demo" : "Project preview";

  return (
    <div
      className={`absolute left-1/2 top-0 w-[min(84vw,52rem)] origin-center transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${getSlotClasses(offset)}`}
      style={{
        ...getSlotStyle(offset),
        transform:
          "translateX(calc(-50% + var(--slot-x))) scale(var(--slot-scale))",
        opacity: "var(--slot-opacity)",
        filter: "blur(var(--slot-blur))",
      }}
    >
      <motion.button
        type="button"
        onClick={() => (isActive ? onOpen() : onSelect(index))}
        aria-label={
          isActive
            ? `Inspect ${project.title} preview`
            : `Select ${project.title} project`
        }
        aria-current={isActive ? "true" : undefined}
        initial={false}
        animate={{
          y: isActive ? 0 : -8,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className={`group relative block w-full overflow-hidden rounded-[1.35rem] border text-left shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 sm:rounded-[1.75rem] ${
          isActive
            ? "border-white/35 bg-neutral-900 shadow-neutral-950/40"
            : "border-white/15 bg-neutral-900/90 shadow-black/50 hover:border-white/40"
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
          {isVideoPreview && isActive ? (
            <LazyVideo
              src={project.media.video}
              poster={preview.src}
              autoPlay={!prefersReducedMotion}
              muted
              loop
              playsInline
              preload="metadata"
              lazy
              aria-label={`${project.title} live preview`}
              onLoadedData={
                prefersReducedMotion
                  ? undefined
                  : restartPreview
              }
              className={`h-full w-full object-cover object-top transition duration-700 motion-reduce:transition-none ${
                isActive
                  ? "scale-[1.01] group-hover:scale-[1.035]"
                  : "scale-100 group-hover:scale-[1.03]"
              }`}
            />
          ) : (
            <img
              src={preview.src}
              alt={preview.alt}
              loading="lazy"
              decoding="async"
              className={`h-full w-full object-cover object-top transition duration-700 motion-reduce:transition-none ${
                isActive
                  ? "scale-[1.01] group-hover:scale-[1.035]"
                  : "scale-100 group-hover:scale-[1.03]"
              }`}
            />
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/5 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/80">
                {project.tabNumber} / {mediaType}
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white sm:text-base">
                {project.shortName}
              </p>
            </div>

            {isActive ? (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-neutral-950/70 text-neutral-100 backdrop-blur-sm">
                <Maximize2 size={15} aria-hidden="true" />
              </span>
            ) : (
              <span className="hidden shrink-0 text-xs font-semibold text-neutral-200 sm:block">
                Select
              </span>
            )}
          </div>
        </div>

        {isActive ? (
          <div className="flex items-center justify-between border-t border-white/10 bg-neutral-950/85 px-4 py-3 text-xs text-neutral-400 sm:px-5">
            <span className="flex items-center gap-2">
              <Play size={13} className="text-neutral-100" aria-hidden="true" />
              {project.media?.type === "gallery"
                ? `${preview.label} view`
                : "Live system preview"}
            </span>
            <span className="hidden text-neutral-500 sm:inline">
              Click to inspect
            </span>
          </div>
        ) : null}
      </motion.button>
    </div>
  );
}

function ProjectScreenSelector({ project, activeScreenIndex, onSelect }) {
  const screens = project.media?.screens ?? [];

  if (project.media?.type !== "gallery" || screens.length < 2) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[0.63rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Screens
      </span>
      {screens.map((screen, index) => (
        <button
          key={screen.label}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Show ${project.title} ${screen.label}`}
          aria-pressed={activeScreenIndex === index}
          className={`rounded-md border px-2.5 py-1.5 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            activeScreenIndex === index
              ? "border-white/40 bg-neutral-100/10 text-neutral-100"
              : "border-white/10 text-neutral-400 hover:border-white/25 hover:text-neutral-200"
          }`}
        >
          {screen.label}
        </button>
      ))}
    </div>
  );
}

function ProjectDetails({
  project,
  projectCount,
  onPrevious,
  onNext,
  prefersReducedMotion,
}) {
  return (
    <div className="mt-9 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
          <span>{project.category}</span>
          <span aria-hidden="true" className="text-neutral-700">
            /
          </span>
          <span className="font-mono text-neutral-500">
            {project.tabNumber} / {String(projectCount).padStart(2, "0")}
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.28,
              ease: "easeOut",
            }}
            className="mt-3"
            aria-live="polite"
          >
            <h3 className="max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-400">
              {project.subtitle}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-300">
              {project.solution}
            </p>

            <dl className="mt-6 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
              <div>
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Role
                </dt>
                <dd className="mt-1.5 text-sm text-neutral-200">{project.role}</dd>
              </div>
              <div>
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Built
                </dt>
                <dd className="mt-1.5 text-sm text-neutral-200">{project.year}</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  With
                </dt>
                <dd className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-sm text-neutral-200">
                  {project.tech.slice(0, 4).map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-between gap-8 lg:items-end">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous project"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-neutral-200 transition hover:border-white/45 hover:bg-neutral-100/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft size={17} aria-hidden="true" />
          </button>
          <span className="min-w-16 text-center font-mono text-xs text-neutral-500">
            <span className="text-white">{project.tabNumber}</span> / {String(projectCount).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next project"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-neutral-200 transition hover:border-white/45 hover:bg-neutral-100/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          {project.links?.caseStudy ? (
            <a
              href={project.links.caseStudy}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-neutral-100 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950"
            >
              View Case Study
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          ) : null}

          {project.links?.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.035] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-neutral-100/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Live Platform
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}

          {project.links?.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} GitHub repository`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.035] text-neutral-300 transition hover:border-white/40 hover:bg-neutral-100/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Code2 size={16} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [activeMedia, setActiveMedia] = useState(null);
  const { prefersReducedMotion } = useMotionRuntime();

  const projectCount = interactiveProjects.length;
  const safeActiveIndex = Math.min(
    Math.max(activeIndex, 0),
    Math.max(projectCount - 1, 0)
  );
  const activeProject = interactiveProjects[safeActiveIndex] ?? null;

  const selectProject = (index) => {
    if (projectCount === 0) return;

    const nextIndex = (index + projectCount) % projectCount;
    if (nextIndex === safeActiveIndex) return;

    setActiveIndex(nextIndex);
    setActiveScreenIndex(0);
  };

  const goPrevious = () => selectProject(safeActiveIndex - 1);
  const goNext = () => selectProject(safeActiveIndex + 1);

  const handleKeyDown = (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest("input, textarea, select")
    ) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "Home") {
      event.preventDefault();
      selectProject(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectProject(projectCount - 1);
    }
  };

  const handleOpenMedia = () => {
    if (!activeProject) return;

    const preview = getProjectImage(activeProject, activeScreenIndex);
    const isVideo =
      activeProject.media?.type === "video" &&
      Boolean(activeProject.media.video);

    setActiveMedia({
      type: isVideo ? "video" : "image",
      src: isVideo ? activeProject.media.video : preview.src,
      title: activeProject.title,
      description: preview.alt ?? activeProject.subtitle,
    });
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="relative isolate scroll-mt-20 overflow-hidden bg-neutral-950/78 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[min(76rem,92vw)] -translate-x-1/2 rounded-full bg-neutral-300/[0.045] blur-3xl"
      />

      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-heading"
            eyebrow="Selected Work"
            title="A collection of systems I have built."
            description="Explore the interfaces, workflows, and tools behind projects built for learning, operations, client management, and IT support."
          />

          <p className="max-w-xs text-sm leading-6 text-neutral-500 lg:pb-1 lg:text-right">
            Select a preview to bring it forward. The collection stays in your hands.
          </p>
        </div>

        {activeProject ? (
          <div className="mt-10" onKeyDown={handleKeyDown}>
            <div className="relative h-[clamp(19rem,62vw,32rem)] md:h-[clamp(26rem,60vw,38rem)]">
              {interactiveProjects.map((project, index) => {
                const offset = getRelativeOffset(index, safeActiveIndex, projectCount);

                return (
                  <ProjectPreview
                    key={project.id}
                    project={project}
                    index={index}
                    offset={offset}
                    activeScreenIndex={activeScreenIndex}
                    onSelect={selectProject}
                    onOpen={handleOpenMedia}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 md:hidden">
              <span className="text-[0.63rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                More projects
              </span>
              <span className="font-mono text-xs text-neutral-500">Swipe or select</span>
            </div>

            <div
              role="tablist"
              aria-label="Selected work projects"
              data-lenis-prevent-horizontal=""
              className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:hidden"
            >
              {interactiveProjects.map((project, index) => {
                const preview = getProjectImage(project);
                const isActive = index === safeActiveIndex;

                return (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Select ${project.title}`}
                    onClick={() => selectProject(index)}
                    className={`w-40 shrink-0 snap-start overflow-hidden rounded-lg border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive
                        ? "border-white/45 bg-neutral-100/10"
                        : "border-white/10 bg-white/[0.025]"
                    }`}
                  >
                    <img
                      src={preview.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                    <span className="block truncate px-3 py-2 text-xs font-medium text-neutral-200">
                      {project.shortName}
                    </span>
                  </button>
                );
              })}
            </div>

            <ProjectScreenSelector
              project={activeProject}
              activeScreenIndex={activeScreenIndex}
              onSelect={setActiveScreenIndex}
            />

            <ProjectDetails
              project={activeProject}
              projectCount={projectCount}
              onPrevious={goPrevious}
              onNext={goNext}
              prefersReducedMotion={prefersReducedMotion}
            />

            <div className="mt-5 hidden items-center justify-between border-t border-white/[0.07] pt-4 md:flex">
              <div className="flex items-center gap-2" aria-label="Project position">
                {interactiveProjects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    aria-label={`Select project ${index + 1}: ${project.title}`}
                    aria-current={index === safeActiveIndex ? "true" : undefined}
                    onClick={() => selectProject(index)}
                    className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      index === safeActiveIndex
                        ? "w-10 bg-neutral-100"
                        : "w-4 bg-neutral-700 hover:bg-neutral-500"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-600">
                Focus the gallery and use the arrow keys to move through the work.
              </p>
            </div>
          </div>
        ) : null}
      </Container>

      <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />
    </section>
  );
}
