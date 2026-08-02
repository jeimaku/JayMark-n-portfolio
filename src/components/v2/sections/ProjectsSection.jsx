import {
  ArrowLeft,
  ArrowRight,
  Code2,
  ExternalLink,
  Layers,
  Play,
} from "lucide-react";

import {
  motion,
} from "motion/react";

import Container from "../../layout/Container";
import SectionHeading from "../../ui/SectionHeading";
import LazyVideo from "../../ui/LazyVideo";

import {
  MotionSection,
} from "../motion";

import {
  featuredProjects,
  internshipSystems,
} from "../../../data";

import useProjectsWheelCarousel from "../../../hooks/useProjectsWheelCarousel";

const PROJECT_ROUTES = {
  talkready: "/projects/talkready",
  "internship-systems": "/projects/internship-systems",
};

function createProjectSlides() {
  const featuredSlides = featuredProjects
    .filter(Boolean)
    .map((project) => ({
      ...project,
      slideKind: "featured",
      suiteLabel:
        project.category ??
        "Featured Project",
      links: {
        ...project.links,
        caseStudy:
          project.id === "talkready"
            ? PROJECT_ROUTES.talkready
            : project.links?.caseStudy,
      },
    }));

  const internshipSlides = (
    internshipSystems?.systems ?? []
  )
    .filter(Boolean)
    .map((system) => ({
      id: `internship-${system.id}`,
      sourceId: system.id,
      title:
        system.name ??
        "Internship System",
      subtitle:
        system.tagline ??
        internshipSystems.subtitle,
      description:
        system.description ??
        internshipSystems.description,
      role:
        "Full-Stack Developer & IT Intern",
      year: "2026",
      category:
        system.category ??
        "Operational System",
      type:
        system.type ??
        "Internship Project",
      tech:
        system.tech ??
        system.technologies ??
        [],
      highlights:
        system.keyFeatures ??
        [],
      media:
        system.media ??
        {},
      slideKind: "internship",
      suiteLabel:
        internshipSystems.title ??
        "Internship Systems Suite",
      links: {
        caseStudy:
          PROJECT_ROUTES["internship-systems"],
      },
    }));

  return [
    ...featuredSlides,
    ...internshipSlides,
  ];
}

function getProjectTechnologies(project) {
  const technologies =
    project.tech ??
    project.technologies ??
    project.techStack ??
    [];

  return Array.isArray(technologies)
    ? technologies
    : [];
}

function getProjectDescription(project) {
  return (
    project.summary ??
    project.description ??
    project.subtitle ??
    "A selected project from my software development portfolio."
  );
}

function getProjectImage(project) {
  const gallery =
    project.media?.gallery ?? [];

  const firstGalleryItem =
    gallery[0] ?? null;

  const gallerySource =
    typeof firstGalleryItem === "string"
      ? firstGalleryItem
      : firstGalleryItem?.src;

  const directSource =
    project.media?.src ??
    project.image ??
    project.cover ??
    null;

  const directSourceIsVideo =
    typeof directSource === "string" &&
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(
      directSource
    );

  return (
    project.media?.cover ??
    project.media?.poster ??
    project.poster ??
    gallerySource ??
    (!directSourceIsVideo
      ? directSource
      : null)
  );
}

function getProjectVideo(project) {
  const directSource =
    project.media?.src ??
    project.video ??
    null;

  const directSourceIsVideo =
    typeof directSource === "string" &&
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(
      directSource
    );

  return (
    project.media?.video ??
    (directSourceIsVideo
      ? directSource
      : null)
  );
}

function getCaseStudyRoute(project) {
  return (
    project.links?.caseStudy ??
    project.caseStudyUrl ??
    PROJECT_ROUTES[project.id] ??
    `/projects/${project.id}`
  );
}

function ProjectTechnologyList({
  project,
  limit,
}) {
  const technologies =
    getProjectTechnologies(project);

  const visibleTechnologies =
    typeof limit === "number"
      ? technologies.slice(0, limit)
      : technologies;

  if (visibleTechnologies.length === 0) {
    return null;
  }

  return (
    <ul
      aria-label={`${project.title} technology stack`}
      className="flex flex-wrap gap-2"
    >
      {visibleTechnologies.map(
        (technology) => (
          <li
            key={technology}
            className={[
              "rounded-full border",
              "border-white/10",
              "bg-white/[0.035]",
              "px-3 py-1.5",
              "text-xs font-semibold",
              "text-slate-300",
              "transition duration-300",
              "hover:border-cyan-300/30",
              "hover:bg-cyan-300/[0.07]",
              "hover:text-cyan-50",
            ].join(" ")}
          >
            {technology}
          </li>
        )
      )}
    </ul>
  );
}

function ProjectPreview({
  project,
  active = false,
  allowPlayback = false,
  eager = false,
}) {
  const videoSource =
    getProjectVideo(project);

  const imageSource =
    getProjectImage(project);

  return (
    <div
      className={[
        "group/media relative",
        "overflow-hidden",
        "rounded-[1.5rem]",
        "border border-cyan-300/15",
        "bg-slate-950/70",
        "shadow-[0_30px_100px_rgba(0,0,0,0.5)]",
        "sm:rounded-[2rem]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute inset-0 z-20",
          "rounded-[inherit]",
          "ring-1 ring-inset",
          "ring-white/[0.035]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute left-5 top-5 z-30",
          "h-8 w-8",
          "border-l border-t",
          "border-cyan-200/30",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute bottom-5 right-5 z-30",
          "h-8 w-8",
          "border-b border-r",
          "border-cyan-200/30",
        ].join(" ")}
      />

      {videoSource ? (
        <LazyVideo
          src={videoSource}
          poster={imageSource}
          className={[
            "aspect-[16/10]",
            "w-full object-cover object-top",
            "transition duration-700",
            active
              ? "scale-100 opacity-100"
              : "scale-[1.025] opacity-70",
          ].join(" ")}
          autoPlay={
            active &&
            allowPlayback
          }
          muted
          loop
          playsInline
          preload={
            eager
              ? "metadata"
              : "none"
          }
          lazy={!eager}
          draggable={false}
        />
      ) : imageSource ? (
        <img
          src={imageSource}
          alt={`${project.title} project preview`}
          loading={
            eager
              ? "eager"
              : "lazy"
          }
          decoding="async"
          draggable={false}
          className={[
            "aspect-[16/10]",
            "w-full object-cover object-top",
            "transition duration-700",
            active
              ? "scale-100 opacity-100"
              : "scale-[1.025] opacity-75",
          ].join(" ")}
        />
      ) : (
        <div
          role="img"
          aria-label={`${project.title} preview unavailable`}
          className={[
            "flex aspect-[16/10]",
            "items-center justify-center",
            "bg-[radial-gradient(",
            "circle_at_center,",
            "rgba(34,211,238,0.11),",
            "transparent_24rem)]",
            "text-slate-600",
          ].join("")}
        >
          <Play
            aria-hidden="true"
            size={48}
          />
        </div>
      )}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute inset-0 z-10",
          "bg-gradient-to-t",
          "from-slate-950/55",
          "via-transparent",
          "to-cyan-300/[0.025]",
        ].join(" ")}
      />

      <div className="absolute inset-x-5 bottom-5 z-30 flex items-center justify-between gap-4">
        <span
          className={[
            "rounded-full border",
            "border-white/10",
            "bg-slate-950/75",
            "px-3 py-1.5",
            "text-[0.62rem]",
            "font-semibold uppercase",
            "tracking-[0.16em]",
            "text-slate-300",
            "backdrop-blur",
          ].join(" ")}
        >
          {project.slideKind ===
          "internship"
            ? "System demo"
            : "Project preview"}
        </span>

        {videoSource ? (
          <span
            className={[
              "inline-flex items-center",
              "gap-2 rounded-full",
              "border border-cyan-300/15",
              "bg-cyan-300/[0.07]",
              "px-3 py-1.5",
              "text-[0.62rem]",
              "font-semibold uppercase",
              "tracking-[0.15em]",
              "text-cyan-100",
              "backdrop-blur",
            ].join(" ")}
          >
            <span
              className={[
                "h-1.5 w-1.5",
                "rounded-full",
                active &&
                allowPlayback
                  ? "animate-pulse bg-emerald-400 motion-reduce:animate-none"
                  : "bg-slate-500",
              ]
                .filter(Boolean)
                .join(" ")}
            />

            {active &&
            allowPlayback
              ? "Playing"
              : "Preview"}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ProjectActions({
  project,
}) {
  const caseStudyRoute =
    getCaseStudyRoute(project);

  const liveUrl =
    project.links?.live ??
    project.liveUrl ??
    null;

  const repositoryUrl =
    project.links?.github ??
    project.links?.repository ??
    project.githubUrl ??
    null;

  return (
      <div
        data-no-project-drag=""
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        className={[
          "relative z-20",
          "flex w-full flex-col gap-3",
          "sm:w-auto",
          "sm:flex-row",
          "sm:flex-wrap",
          "sm:justify-end",
        ].join(" ")}
      >
      <a
        href={caseStudyRoute}
        data-no-project-drag=""
        className={[
          "group inline-flex min-h-12",
          "w-full items-center",
          "justify-center gap-2",
          "rounded-full",
          "bg-cyan-300",
          "px-6 py-3",
          "text-sm font-semibold",
          "text-slate-950",
          "shadow-[0_14px_38px_rgba(8,145,178,0.2)]",
          "transition duration-300",
          "hover:-translate-y-0.5",
          "hover:bg-cyan-200",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-cyan-200",
          "focus-visible:ring-offset-4",
          "focus-visible:ring-offset-slate-950",
          "sm:w-auto",
        ].join(" ")}
      >
        View Case Study

        <ArrowRight
          aria-hidden="true"
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </a>

      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-no-project-drag=""
          className={[
            "inline-flex min-h-12",
            "w-full items-center",
            "justify-center gap-2",
            "rounded-full border",
            "border-white/15",
            "bg-white/[0.035]",
            "px-6 py-3",
            "text-sm font-semibold",
            "text-white",
            "transition duration-300",
            "hover:-translate-y-0.5",
            "hover:border-cyan-200/40",
            "hover:bg-cyan-300/[0.06]",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-cyan-200",
            "focus-visible:ring-offset-4",
            "focus-visible:ring-offset-slate-950",
            "sm:w-auto",
          ].join(" ")}
        >
          Live Platform

          <ExternalLink
            aria-hidden="true"
            size={15}
          />
        </a>
      ) : null}

      {repositoryUrl ? (
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-no-project-drag=""
          aria-label={`Open ${project.title} source repository`}
          className={[
            "inline-flex h-12 w-12",
            "shrink-0 items-center",
            "justify-center",
            "self-center rounded-full",
            "border border-white/15",
            "bg-white/[0.035]",
            "text-slate-300",
            "transition duration-300",
            "hover:-translate-y-0.5",
            "hover:border-cyan-200/40",
            "hover:bg-cyan-300/[0.06]",
            "hover:text-white",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-cyan-200",
          ].join(" ")}
        >
          <Code2
            aria-hidden="true"
            size={18}
          />
        </a>
      ) : null}
    </div>
  );
}

function DesktopProjectPanel({
  project,
  index,
  active,
  allowPlayback,
}) {
  const description =
    getProjectDescription(project);

  const highlights =
    Array.isArray(project.highlights)
      ? project.highlights.slice(0, 4)
      : [];

  return (
    <motion.article
      aria-labelledby={`project-title-${project.id}`}
      animate={{
        opacity: active ? 1 : 0.42,
        scale: active ? 1 : 0.965,
        x: active ? 0 : 14,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex h-full min-h-0 shrink-0 items-start"
    >
      <div className={[
        "mx-auto h-full w-full",
        "max-w-[90rem]",
        "px-4 py-5",
        "sm:px-6 sm:py-6",
        "lg:px-10 lg:py-7",
        "xl:py-8",
      ].join(" ")}>
        <div className="grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] xl:gap-14">
          <div className="relative z-10 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={[
                  "inline-flex items-center",
                  "gap-2 rounded-full",
                  "border border-cyan-300/20",
                  "bg-cyan-300/[0.065]",
                  "px-3 py-1.5",
                  "text-[0.65rem]",
                  "font-semibold uppercase",
                  "tracking-[0.18em]",
                  "text-cyan-100",
                ].join(" ")}
              >
                <Layers
                  aria-hidden="true"
                  size={13}
                />

                {project.slideKind ===
                "internship"
                  ? project.suiteLabel
                  : "Featured Project"}
              </span>

              <span className="font-mono text-xs text-slate-600">
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>
            </div>

            <h3
              id={`project-title-${project.id}`}
              className="mt-6 break-safe text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white xl:text-5xl 2xl:text-6xl"
            >
              {project.title}
            </h3>

            {project.subtitle ? (
              <p className="mt-4 max-w-xl text-base font-medium leading-7 text-cyan-100/85 sm:text-lg">
                {project.subtitle}
              </p>
            ) : null}

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              {description}
            </p>

            <dl className="mt-7 grid max-w-xl grid-cols-2 gap-4 border-y border-white/10 py-5 sm:grid-cols-3">
              <div>
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Role
                </dt>

                <dd className="mt-2 text-sm font-medium leading-6 text-slate-200">
                  {project.role ??
                    (project.slideKind ===
                    "internship"
                      ? "Full-Stack Developer & IT Intern"
                      : "Full-Stack Developer")}
                </dd>
              </div>

              <div>
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Year
                </dt>

                <dd className="mt-2 text-sm font-medium leading-6 text-slate-200">
                  {project.year ??
                    "Selected Work"}
                </dd>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Focus
                </dt>

                <dd className="mt-2 text-sm font-medium leading-6 text-slate-200">
                  {project.type ??
                    project.category ??
                    "Software Systems"}
                </dd>
              </div>
            </dl>

            {highlights.length > 0 ? (
              <ul
                aria-label={`${project.title} highlights`}
                className="mt-6 grid gap-2 sm:grid-cols-2"
              >
                {highlights.map(
                  (highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 text-sm leading-6 text-slate-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
                      />

                      <span>
                        {highlight}
                      </span>
                    </li>
                  )
                )}
              </ul>
            ) : null}

            <div className="mt-7">
              <ProjectTechnologyList
                project={project}
                limit={6}
              />
            </div>
          </div>

          <div className="relative min-w-0">
            <div
              aria-hidden="true"
              className={[
                "pointer-events-none",
                "absolute -inset-8 -z-10",
                "rounded-[3rem]",
                "bg-cyan-300/[0.055]",
                "blur-3xl",
                "transition-opacity duration-500",
                active
                  ? "opacity-100"
                  : "opacity-35",
              ].join(" ")}
            />

            <ProjectPreview
              project={project}
              active={active}
              allowPlayback={allowPlayback}
              eager={index === 0}
            />

            <div
              data-no-project-drag=""
              className={[
                "relative z-30 mt-5",
                "flex items-center",
                "justify-between gap-4",
                "rounded-2xl border",
                "border-white/[0.08]",
                "bg-white/[0.025]",
                "p-3",
              ].join(" ")}
            >
              <div className="hidden min-w-0 sm:block">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Detailed project
                </p>

                <p className="mt-1 truncate text-sm font-medium text-slate-300">
                  {project.title}
                </p>
              </div>

              <ProjectActions
                project={project}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MobileProjectCard({
  project,
  index,
}) {
  const description =
    getProjectDescription(project);

  return (
    <MotionSection
      effect={
        index % 2 === 0
          ? "left"
          : "right"
      }
      distance={24}
      amount={0.08}
      duration={0.7}
    >
      <article
        aria-labelledby={`mobile-project-title-${project.id}`}
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 sm:p-5"
      >
        <ProjectPreview
          project={project}
          active
          allowPlayback={false}
          eager={index === 0}
        />

        <div className="px-1 pb-2 pt-6 sm:px-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cyan-200">
              {project.slideKind ===
              "internship"
                ? project.suiteLabel
                : "Featured Project"}
            </p>

            <span className="font-mono text-xs text-slate-600">
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </span>
          </div>

          <h3
            id={`mobile-project-title-${project.id}`}
            className="mt-4 break-safe text-3xl font-semibold tracking-[-0.045em] text-white"
          >
            {project.title}
          </h3>

          {project.subtitle ? (
            <p className="mt-3 text-sm font-medium leading-7 text-cyan-100/85">
              {project.subtitle}
            </p>
          ) : null}

          <p className="mt-4 text-sm leading-7 text-slate-400">
            {description}
          </p>

          {Array.isArray(
            project.highlights
          ) &&
          project.highlights.length >
            0 ? (
            <ul className="mt-5 grid gap-2">
              {project.highlights
                .slice(0, 4)
                .map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 text-sm leading-6 text-slate-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
                    />

                    <span>
                      {highlight}
                    </span>
                  </li>
                ))}
            </ul>
          ) : null}

          <div className="mt-6">
            <ProjectTechnologyList
              project={project}
              limit={6}
            />
          </div>

          <div className="mt-7">
            <ProjectActions
              project={project}
            />
          </div>
        </div>
      </article>
    </MotionSection>
  );
}

function ProjectsVerticalLayout({
  projects,
  sectionRef,
}) {
  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative isolate scroll-mt-24 overflow-hidden py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-[15%] -z-10 h-[30rem] w-[30rem] rounded-full bg-cyan-400/[0.055] blur-3xl"
      />

      <Container>
        <MotionSection
          effect="rise"
          amount={0.08}
          className="max-w-3xl"
        >
          <SectionHeading
            eyebrow="Featured Projects"
            title="Selected systems built for learning and operations."
            description="Explore TalkReady and four internal systems developed during my internship: CRM Pipeline, Virtual Office Management, Ticket Support, and Paysera Inventory."
          />
        </MotionSection>

        <div className="mt-10 grid gap-7">
          {projects.map(
            (project, index) => (
              <MobileProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            )
          )}
        </div>
      </Container>
    </section>
  );
}

export default function ProjectsSection() {
  const projects =
    createProjectSlides();

  const {
    sectionRef,
    stageRef,

    activeProjectIndex,
    trackOffset,
    progress,

    isWheelLocked,
    isDragging,
    allowWheelCarousel,

    canGoPrevious,
    canGoNext,

    goToProject,
    goPrevious,
    goNext,

    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handleClickCapture,
  } = useProjectsWheelCarousel({
    projectCount: projects.length,
    headerOffset: 64,
  });

  if (
    !allowWheelCarousel ||
    projects.length < 2
  ) {
    return (
      <ProjectsVerticalLayout
        projects={projects}
        sectionRef={sectionRef}
      />
    );
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      data-projects-wheel-scene=""
      className="relative isolate scroll-mt-24 bg-slate-950"
    >
      <div
        ref={stageRef}
        data-projects-wheel-stage=""
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects carousel"
        tabIndex={-1}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
        style={{
          touchAction: "pan-y",
        }}
        className={[
          "relative h-[calc(100dvh-4rem)]",
          "overflow-hidden select-none",
          isDragging
            ? "cursor-grabbing"
            : "cursor-grab",
        ].join(" ")}
      >
        <p
          className="sr-only"
          aria-live="polite"
        >
          Showing project{" "}
          {activeProjectIndex + 1} of{" "}
          {projects.length}:{" "}
          {
            projects[
              activeProjectIndex
            ]?.title
          }
        </p>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-30 opacity-[0.035] [background-image:linear-gradient(rgba(148,163,184,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.45)_1px,transparent_1px)] [background-size:72px_72px]"
        />

        <motion.div
          aria-hidden="true"
          animate={{
            x: `${activeProjectIndex * 10}%`,
            opacity:
              isWheelLocked || isDragging
                ? 0.72
                : 0.4,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-none absolute -left-48 top-[8%] -z-20 h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.095] blur-3xl"
        />

        <motion.div
          aria-hidden="true"
          animate={{
            x: `${-activeProjectIndex * 8}%`,
            opacity:
              isWheelLocked || isDragging
                ? 0.62
                : 0.32,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-none absolute -right-48 bottom-[4%] -z-20 h-[32rem] w-[32rem] rounded-full bg-indigo-400/[0.08] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent"
        />

        <div className="absolute inset-x-0 top-0 z-30 border-b border-white/[0.06] bg-slate-950/65 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-[90rem] items-end justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Featured Projects
              </p>

              <h2
                id="projects-heading"
                className="mt-2 truncate text-xl font-semibold tracking-[-0.035em] text-white sm:text-2xl"
              >
                TalkReady and four internship systems.
              </h2>
            </div>

            <div className="hidden shrink-0 items-center gap-3 md:flex">
              <button
                type="button"
                data-no-project-drag=""
                onClick={goPrevious}
                disabled={!canGoPrevious}
                aria-label="Show previous project"
                className={[
                  "inline-flex h-10 w-10",
                  "items-center justify-center",
                  "rounded-full border",
                  "transition duration-300",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-cyan-200",
                  canGoPrevious
                    ? [
                        "border-white/15",
                        "bg-white/[0.04]",
                        "text-slate-200",
                        "hover:border-cyan-200/40",
                        "hover:bg-cyan-300/[0.08]",
                        "hover:text-white",
                      ].join(" ")
                    : [
                        "cursor-not-allowed",
                        "border-white/[0.06]",
                        "bg-white/[0.015]",
                        "text-slate-700",
                      ].join(" "),
                ].join(" ")}
              >
                <ArrowLeft
                  aria-hidden="true"
                  size={17}
                />
              </button>

              <div className="min-w-[9rem] text-center">
                <p
                  aria-live="polite"
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  Project{" "}
                  <span className="text-cyan-200">
                    {String(
                      activeProjectIndex + 1
                    ).padStart(2, "0")}
                  </span>
                  {" / "}
                  {String(
                    projects.length
                  ).padStart(2, "0")}
                </p>

                <p className="mt-1 text-[0.68rem] text-slate-600">
                  {isDragging
                    ? "Release to snap"
                    : "Scroll, drag, or use arrows"}
                </p>
              </div>

              <button
                type="button"
                data-no-project-drag=""
                onClick={goNext}
                aria-label={
                  canGoNext
                    ? "Show next project"
                    : "Continue to experience"
                }
                className={[
                  "inline-flex h-10",
                  "items-center justify-center",
                  "gap-2 rounded-full border",
                  "border-white/15",
                  "bg-white/[0.04]",
                  "px-3.5",
                  "text-sm font-semibold",
                  "text-slate-200",
                  "transition duration-300",
                  "hover:border-cyan-200/40",
                  "hover:bg-cyan-300/[0.08]",
                  "hover:text-white",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-cyan-200",
                ].join(" ")}
              >
                {canGoNext
                  ? null
                  : (
                    <span className="text-xs">
                      Continue
                    </span>
                  )}

                <ArrowRight
                  aria-hidden="true"
                  size={17}
                  className={
                    canGoNext
                      ? ""
                      : "rotate-90"
                  }
                />
              </button>
            </div>
          </div>
        </div>

          <div
            style={{
              width: `${
                projects.length * 100
              }%`,
              transform: `translate3d(${trackOffset}px, 0, 0)`,
              transition: isDragging
                ? "none"
                : "transform 680ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className={[
              "absolute inset-x-0",
              "bottom-[5.25rem]",
              "top-[5.5rem]",
              "flex",
              "will-change-transform",
              "sm:bottom-[5.5rem]",
              "sm:top-[5.75rem]",
            ].join(" ")}
          >
          {projects.map(
            (project, index) => (
              <div
                key={project.id}
                style={{
                  width: `${
                    100 /
                    projects.length
                  }%`,
                }}
                className="h-full shrink-0"
              >
                <DesktopProjectPanel
                  project={project}
                  index={index}
                  active={
                    index ===
                    activeProjectIndex
                  }
                  allowPlayback={
                    index ===
                    activeProjectIndex &&
                    !isDragging
                  }
                />
              </div>
            )
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-40">
          <div className="mx-auto w-full max-w-[90rem] px-4 pb-5 sm:px-6 lg:px-10">
            <div className="relative h-px overflow-hidden bg-white/[0.08]">
              <motion.div
                animate={{
                  scaleX: progress,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-cyan-400 via-cyan-200 to-indigo-300 shadow-[0_0_18px_rgba(34,211,238,0.55)]"
              />
            </div>

            <div
              role="tablist"
              aria-label="Featured projects"
              className="mt-3 grid grid-cols-5 gap-3"
            >
              {projects.map(
                (project, index) => {
                  const active =
                    activeProjectIndex ===
                    index;

                  return (
                    <button
                      key={project.id}
                      type="button"
                      role="tab"
                      data-no-project-drag=""
                      aria-selected={active}
                      aria-label={`Show ${project.title}`}
                      onClick={() =>
                        goToProject(index)
                      }
                      className={[
                        "flex min-w-0",
                        "items-center gap-2",
                        "text-left text-[0.58rem]",
                        "font-semibold uppercase",
                        "tracking-[0.12em]",
                        "transition duration-300",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-cyan-200",
                        active
                          ? "text-cyan-100"
                          : "text-slate-700 hover:text-slate-400",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-1.5 w-1.5",
                          "shrink-0 rounded-full",
                          "transition duration-300",
                          active
                            ? "bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                            : "bg-slate-700",
                        ].join(" ")}
                      />

                      <span className="min-w-0 truncate">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                        {" "}
                        {project.title}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
