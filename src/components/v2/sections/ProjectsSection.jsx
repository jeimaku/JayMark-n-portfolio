import { useState } from "react";

import {
  featuredProjects,
  homepageContent,
  internshipSystems,
} from "../../../data";

import { useMediaQuery } from "../../../hooks/useHeroRuntime";

import LazyVideo from "../../ui/LazyVideo";

import PageSection from "./PageSection";
import SectionHeading from "./SectionHeading";
import SectionPanel from "./SectionPanel";

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

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M11 4h5v5M9 11l7-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M16 11.5v3A1.5 1.5 0 0 1 14.5 16h-10A1.5 1.5 0 0 1 3 14.5v-10A1.5 1.5 0 0 1 4.5 3h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M12 2.75a9.25 9.25 0 0 0-2.93 18.03c.46.09.63-.2.63-.45v-1.77c-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.03-1.35-1.03-1.35-.84-.57.06-.56.06-.56.93.07 1.42.95 1.42.95.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.24-2.05-.23-4.21-1.03-4.21-4.57 0-1.01.36-1.84.95-2.49-.1-.23-.41-1.18.09-2.46 0 0 .78-.25 2.54.95A8.85 8.85 0 0 1 12 7.11a8.8 8.8 0 0 1 2.31.31c1.76-1.2 2.53-.95 2.53-.95.51 1.28.19 2.23.1 2.46.59.65.95 1.48.95 2.49 0 3.55-2.16 4.33-4.22 4.56.33.29.63.85.63 1.72v2.63c0 .25.17.55.64.45A9.25 9.25 0 0 0 12 2.75Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectImage({
  src,
  alt,
  className = "",
  eager = false,
}) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!src || imageFailed) {
    return (
      <div
        aria-label={alt}
        className={[
          "flex items-center justify-center",
          "bg-slate-900",
          className,
        ].join(" ")}
      >
        <div className="text-center">
          <p className="text-3xl font-semibold tracking-[-0.05em] text-cyan-100">
            JM
          </p>

          <p className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Project Preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setImageFailed(true)}
      className={className}
    />
  );
}

function TechTag({ children }) {
  return (
    <li className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[0.68rem] font-medium text-slate-300">
      {children}
    </li>
  );
}

function ProjectResult({ label, value }) {
  return (
    <li className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
      <p className="text-lg font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-slate-500">
        {label}
      </p>
    </li>
  );
}

function TalkReadyFeature({ project }) {
  const projectGallery = [
    {
      src: project.media?.cover,
      alt: `${project.title} landing page`,
    },
    ...(project.media?.gallery ?? []),
  ].filter((item) => item.src);

  const [selectedMedia, setSelectedMedia] = useState(
    projectGallery[0] ?? null
  );

  return (
    <SectionPanel
      as="article"
      className="mt-12 border-cyan-300/15"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(34,211,238,0.1),transparent_30rem)]"
      />

      <div className="relative grid min-w-0 gap-8 p-5 sm:p-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 lg:p-8">
        {/* Project content */}
        <div className="flex min-w-0 flex-col">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-cyan-100">
                Featured Project
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-slate-400">
                {project.type}
              </span>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              {project.year} · {project.role}
            </p>

            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h3>

            <p className="mt-3 text-lg font-medium leading-7 text-cyan-100 sm:text-xl">
              {project.subtitle}
            </p>

            <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {project.description}
            </p>
          </div>

          {project.highlights?.length > 0 ? (
            <ul
              aria-label={`${project.title} highlights`}
              className="mt-7 grid gap-3"
            >
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-slate-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
                  />

                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}

          {project.results?.length > 0 ? (
            <ul
              aria-label={`${project.title} results`}
              className="mt-7 grid gap-3 sm:grid-cols-3"
            >
              {project.results.map((result) => (
                <ProjectResult
                  key={result.label}
                  label={result.label}
                  value={result.value}
                />
              ))}
            </ul>
          ) : null}

          <ul
            aria-label={`${project.title} technologies`}
            className="mt-7 flex flex-wrap gap-2"
          >
            {project.tech?.map((technology) => (
              <TechTag key={technology}>
                {technology}
              </TechTag>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap">
            <a
              href="/projects/talkready"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              View Case Study

              <span className="transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>

            {project.links?.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                Live Platform
                <ExternalLinkIcon />
              </a>
            ) : null}

            {project.links?.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                <GithubIcon />
                Source Code
              </a>
            ) : null}
          </div>
        </div>

        {/* Project media */}
        <div className="min-w-0">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50">
            {selectedMedia ? (
              <ProjectImage
                src={selectedMedia.src}
                alt={selectedMedia.alt}
                eager
                className="aspect-[16/10] w-full object-cover object-top"
              />
            ) : null}
          </div>

          {projectGallery.length > 1 ? (
            <div
              role="group"
              aria-label={`${project.title} screenshot selector`}
              className="mt-3 grid grid-cols-4 gap-2"
            >
              {projectGallery.slice(0, 4).map((item) => {
                const selected =
                  selectedMedia?.src === item.src;

                return (
                  <button
                    key={item.src}
                    type="button"
                    aria-pressed={selected}
                    aria-label={`Show ${item.alt}`}
                    onClick={() => setSelectedMedia(item)}
                    className={[
                      "overflow-hidden rounded-xl border",
                      "transition",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-cyan-200",
                      selected
                        ? "border-cyan-300/60"
                        : "border-white/10 hover:border-white/25",
                    ].join(" ")}
                  >
                    <ProjectImage
                      src={item.src}
                      alt=""
                      className="aspect-[4/3] w-full object-cover object-top"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}

          <p className="mt-4 text-xs leading-5 text-slate-600">
            Select a preview to inspect different parts of the
            student, trainer, and administrator experience.
          </p>
        </div>
      </div>
    </SectionPanel>
  );
}

function InternshipSystemCard({
  system,
  reducedMotion,
}) {
  return (
    <SectionPanel
      as="article"
      className="h-full"
    >
      <div className="relative overflow-hidden border-b border-white/10 bg-slate-950">
        {system.media?.video ? (
          <LazyVideo
            src={system.media.video}
            poster={system.media?.cover}
            className="aspect-video w-full object-cover"
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            lazy
          />
        ) : (
          <ProjectImage
            src={system.media?.cover}
            alt={`${system.name} interface preview`}
            className="aspect-video w-full object-cover object-top"
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
        />

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-slate-950/75 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-300 backdrop-blur">
            Internal Workflow System
          </span>

          <span className="rounded-full border border-cyan-300/15 bg-slate-950/75 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur">
            {system.category}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          {system.tagline}
        </p>

        <h4 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
          {system.name}
        </h4>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          {system.description}
        </p>

        {system.keyFeatures?.length > 0 ? (
          <ul
            aria-label={`${system.name} key features`}
            className="mt-5 grid gap-2 sm:grid-cols-2"
          >
            {system.keyFeatures.slice(0, 4).map((feature) => (
              <li
                key={feature}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs leading-5 text-slate-300"
              >
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        <ul
          aria-label={`${system.name} technologies`}
          className="mt-5 flex flex-wrap gap-2"
        >
          {system.tech?.slice(0, 5).map((technology) => (
            <TechTag key={technology}>
              {technology}
            </TechTag>
          ))}
        </ul>
      </div>
    </SectionPanel>
  );
}

export default function ProjectsSection() {
  const reducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const featuredProject =
    featuredProjects.find((project) =>
      homepageContent.featuredProjectIds.includes(
        project.id
      )
    ) ?? featuredProjects[0];

  const internshipSystemPreviews =
    homepageContent.internshipSystemPreviewIds
      .map((systemId) =>
        internshipSystems.systems.find(
          (system) => system.id === systemId
        )
      )
      .filter(Boolean);

  return (
    <PageSection
      id="projects"
      labelledBy="projects-heading"
      tone="subtle"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="projects-heading"
          eyebrow="Selected Work"
          title="Systems built for learning, operations, and real workflows."
          description="A focused selection of full-stack platforms and internal systems that demonstrate product thinking, workflow design, technical implementation, and practical problem-solving."
        />

        <a
          href="#contact"
          className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:w-fit"
        >
          Discuss a Project

          <span className="transition-transform group-hover:translate-x-0.5">
            <ArrowIcon />
          </span>
        </a>
      </div>

      {featuredProject ? (
        <TalkReadyFeature project={featuredProject} />
      ) : null}

      <div className="mt-16">
        <div className="grid items-end gap-7 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Internship Systems Suite
            </p>

            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Real company systems for day-to-day operations.
            </h3>

            <p className="mt-5 text-base leading-8 text-slate-400">
              {internshipSystems.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4">
              <p className="text-2xl font-semibold text-white">
                {internshipSystemPreviews.length}
              </p>

              <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Operational Systems
              </p>
            </div>

            <a
              href="/projects/internship-systems"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              View Case Study

              <span className="transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {internshipSystemPreviews.map((system) => (
            <InternshipSystemCard
              key={system.id}
              system={system}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-6 text-slate-600">
          These applications supported internal company workflows.
          Public source access may be limited because they were built
          for operational use during professional work and internship
          activities.
        </p>
      </div>
    </PageSection>
  );
}