import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  internshipSystems,
} from "../data";

import LazyVideo from "../components/ui/LazyVideo";

import {
  CaseStudyHero,
  CaseStudyLayout,
  CaseStudyMediaFrame,
  CaseStudyMetrics,
  CaseStudySection,
  CaseStudyTechList,
} from "../components/v2/case-studies";

import {
  useMediaQuery,
} from "../hooks/useHeroRuntime";

const OPERATIONAL_CHALLENGES = [
  {
    number: "01",
    title: "Disconnected operational information",
    description:
      "Daily company processes can become difficult to monitor when records, updates, and responsibilities are distributed across separate tools or manual documents.",
  },
  {
    number: "02",
    title: "Limited workflow visibility",
    description:
      "Teams need clear ways to identify current status, assigned responsibilities, pending actions, and completed work without repeatedly requesting updates.",
  },
  {
    number: "03",
    title: "Repetitive administrative work",
    description:
      "Manual data entry, status tracking, searching, and report preparation can consume time that should be spent on higher-value operational work.",
  },
];

const IMPLEMENTATION_PRINCIPLES = [
  {
    number: "01",
    title: "Workflow-first interfaces",
    description:
      "Each system was organized around the actual sequence of tasks users needed to perform rather than around isolated technical features.",
  },
  {
    number: "02",
    title: "Structured operational data",
    description:
      "Records, statuses, assignments, and activity information were organized so users could search, review, update, and monitor work consistently.",
  },
  {
    number: "03",
    title: "Role-aware functionality",
    description:
      "Actions and information were presented according to the responsibilities of the people using each internal system.",
  },
  {
    number: "04",
    title: "Reusable application patterns",
    description:
      "Common interface, validation, navigation, and data-management patterns helped maintain consistency across multiple systems.",
  },
];

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

function InformationCard({
  number,
  eyebrow,
  title,
  description,
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.065),transparent_17rem)]"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <div>
            {eyebrow ? (
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                {eyebrow}
              </p>
            ) : null}

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              {title}
            </h3>
          </div>

          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-xs text-slate-600"
          >
            {number}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          {description}
        </p>
      </div>
    </article>
  );
}

function FeatureItem({ children }) {
  return (
    <li className="flex gap-3 rounded-xl border border-white/10 bg-slate-950/30 px-4 py-3 text-xs leading-6 text-slate-300">
      <span
        aria-hidden="true"
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
      />

      {children}
    </li>
  );
}

function SystemVideoFrame({
  system,
  reducedMotion,
  eager = false,
}) {
  const videoSource =
    system.media?.video ??
    system.media?.src ??
    null;

  const posterSource =
    system.media?.cover ??
    system.media?.poster ??
    null;

  if (!videoSource) {
    return (
      <CaseStudyMediaFrame
        src={posterSource}
        alt={`${system.name} interface preview`}
        caption={`${system.name} operational interface preview.`}
        eager={eager}
        imageClassName="aspect-video"
      />
    );
  }

  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/35 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
      <div className="relative overflow-hidden bg-slate-950">
        <LazyVideo
          src={videoSource}
          poster={posterSource}
          className="aspect-video w-full object-cover"
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload={eager ? "metadata" : "none"}
          lazy={!eager}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.035]"
        />
      </div>

      <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-slate-500 sm:px-5">
        {system.name} workflow and interface demonstration.
      </figcaption>
    </figure>
  );
}

function SystemSelector({
  systems,
  selectedSystemId,
  onSelect,
}) {
  return (
    <div
      role="tablist"
      aria-label="Internship system selector"
      className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4"
    >
      {systems.map((system, index) => {
        const selected =
          system.id === selectedSystemId;

        return (
          <button
            key={system.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`system-panel-${system.id}`}
            id={`system-tab-${system.id}`}
            onClick={() => onSelect(system.id)}
            className={[
              "min-h-20 rounded-2xl border p-4",
              "text-left transition",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-cyan-200",
              selected
                ? "border-cyan-300/50 bg-cyan-300/[0.07]"
                : "border-white/10 bg-white/[0.025] hover:border-white/25",
            ].join(" ")}
          >
            <p
              className={[
                "font-mono text-[0.65rem]",
                selected
                  ? "text-cyan-200"
                  : "text-slate-600",
              ].join(" ")}
            >
              {String(index + 1).padStart(2, "0")}
            </p>

            <p className="mt-2 text-sm font-semibold leading-6 text-white">
              {system.name}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function SelectedSystemPanel({
  system,
  reducedMotion,
}) {
  const technologies =
    system.tech ??
    system.technologies ??
    [];

  const features =
    system.keyFeatures ??
    system.features ??
    [];

  return (
    <article
      id={`system-panel-${system.id}`}
      role="tabpanel"
      aria-labelledby={`system-tab-${system.id}`}
      className="mt-5"
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <SystemVideoFrame
          system={system}
          reducedMotion={reducedMotion}
          eager
        />

        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-100">
              {system.category}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Internal System
            </span>
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            {system.tagline}
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
            {system.name}
          </h3>

          <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
            {system.description}
          </p>

          {features.length > 0 ? (
            <div className="mt-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Key capabilities
              </p>

              <ul
                aria-label={`${system.name} key capabilities`}
                className="mt-3 grid gap-2"
              >
                {features.map((feature) => (
                  <FeatureItem key={feature}>
                    {feature}
                  </FeatureItem>
                ))}
              </ul>
            </div>
          ) : null}

          {technologies.length > 0 ? (
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Technology stack
              </p>

              <div className="mt-3">
                <CaseStudyTechList
                  technologies={technologies}
                  ariaLabel={`${system.name} technologies`}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SystemSummaryCard({
  system,
  index,
  reducedMotion,
  onExplore,
}) {
  const technologies =
    system.tech ??
    system.technologies ??
    [];

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
      <SystemVideoFrame
        system={system}
        reducedMotion={reducedMotion}
      />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              {system.tagline}
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              {system.name}
            </h3>
          </div>

          <span
            aria-hidden="true"
            className="font-mono text-xs text-slate-600"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          {system.description}
        </p>

        {technologies.length > 0 ? (
          <div className="mt-5">
            <CaseStudyTechList
              technologies={technologies.slice(0, 5)}
              ariaLabel={`${system.name} primary technologies`}
            />
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => onExplore(system.id)}
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
        >
          Explore this system

          <span className="transition-transform group-hover:translate-x-0.5">
            <ArrowIcon />
          </span>
        </button>
      </div>
    </article>
  );
}

function MissingInternshipSystems() {
  return (
    <CaseStudyLayout projectLabel="Internship Systems Case Study">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-20 sm:px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.025] p-7 text-center sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Project data unavailable
          </p>

          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white">
            The Internship Systems Suite could not be loaded.
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Check that the centralized internship systems data
            still exports a systems array.
          </p>

          <a
            href="/preview-v2#projects"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
          >
            Return to projects
          </a>
        </div>
      </section>
    </CaseStudyLayout>
  );
}

export default function InternshipSystemsCaseStudyV2() {
  const reducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const systems = useMemo(
    () =>
      internshipSystems?.systems?.filter(Boolean) ??
      [],
    []
  );

  const [selectedSystemId, setSelectedSystemId] =
    useState(systems[0]?.id ?? "");

  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      "Internship Systems Case Study | Jay Mark Apelado";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (
      systems.length > 0 &&
      !systems.some(
        (system) =>
          system.id === selectedSystemId
      )
    ) {
      setSelectedSystemId(systems[0].id);
    }
  }, [selectedSystemId, systems]);

  if (systems.length === 0) {
    return <MissingInternshipSystems />;
  }

  const selectedSystem =
    systems.find(
      (system) =>
        system.id === selectedSystemId
    ) ?? systems[0];

  const categories = [
    ...new Set(
      systems
        .map((system) => system.category)
        .filter(Boolean)
    ),
  ];

  const allTechnologies = [
    ...new Set(
      systems.flatMap(
        (system) =>
          system.tech ??
          system.technologies ??
          []
      )
    ),
  ];

  const overviewDescription =
    internshipSystems.description ??
    "A group of internal applications developed to support customer management, virtual-office operations, technical support, and inventory workflows.";

  const handleExploreSystem = (systemId) => {
    setSelectedSystemId(systemId);

    window.requestAnimationFrame(() => {
      document
        .getElementById("system-explorer")
        ?.scrollIntoView({
          block: "start",
          behavior: reducedMotion
            ? "auto"
            : "smooth",
        });
    });
  };

  const heroActions = [
    {
      label: "Explore the Systems",
      href: "#system-explorer",
      external: false,
    },
    {
      label: "Return to Projects",
      href: "/preview-v2#projects",
      external: false,
    },
  ];

  const metadata = [
    {
      label: "Role",
      value:
        "Full-Stack Developer and IT Intern",
    },
    {
      label: "Systems",
      value: `${systems.length} operational applications`,
    },
    {
      label: "Context",
      value: "Internal company workflows",
    },
  ];

  const metrics = [
    {
      label: "Operational Systems",
      value: String(systems.length),
      description:
        "Applications designed around distinct internal workflows.",
    },
    {
      label: "Workflow Areas",
      value: String(
        categories.length || systems.length
      ),
      description:
        "Operational areas represented across the suite.",
    },
    {
      label: "Shared Goal",
      value: "Clearer Operations",
      description:
        "Better visibility, organization, and process consistency.",
    },
  ];

  return (
    <CaseStudyLayout projectLabel="Internship Systems Case Study">
      <CaseStudyHero
        eyebrow="Operational Systems Case Study"
        title={
          internshipSystems.title ??
          "Internship Systems Suite"
        }
        subtitle={
          internshipSystems.subtitle ??
          "Four internal applications supporting real company workflows."
        }
        summary={overviewDescription}
        metadata={metadata}
        actions={heroActions}
        media={
          <SystemVideoFrame
            system={systems[0]}
            reducedMotion={reducedMotion}
            eager
          />
        }
      />

      <CaseStudySection
        id="overview"
        headingId="internship-overview-heading"
        eyebrow="Project Overview"
        title="Connected applications built around day-to-day operational work."
        description="The suite demonstrates how different internal requirements can be translated into focused systems while maintaining consistent interface, data-management, and workflow patterns."
        tone="subtle"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <InformationCard
            number="01"
            eyebrow="The Suite"
            title={`${systems.length} systems for distinct operational responsibilities.`}
            description={overviewDescription}
          />

          <InformationCard
            number="02"
            eyebrow="My Contribution"
            title="Development and technical support within a professional environment."
            description="My work involved understanding operational requirements, developing application interfaces and workflows, handling data-driven functionality, testing system behavior, troubleshooting technical issues, and documenting completed work."
          />
        </div>

        <div className="mt-6">
          <CaseStudyMetrics
            items={metrics}
            ariaLabel="Internship systems overview"
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="challenge"
        headingId="internship-challenge-heading"
        eyebrow="Operational Challenge"
        title="Improving visibility and organization across internal processes."
        description="Each application addressed a different operational need, but the broader challenge remained consistent: make information easier to manage and work easier to track."
        tone="elevated"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {OPERATIONAL_CHALLENGES.map(
            (challenge) => (
              <InformationCard
                key={challenge.number}
                number={challenge.number}
                title={challenge.title}
                description={
                  challenge.description
                }
              />
            )
          )}
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="system-explorer"
        headingId="system-explorer-heading"
        eyebrow="System Explorer"
        title="Explore each application and the workflow it supports."
        description="Select a system to review its purpose, interface demonstration, key capabilities, and technology stack."
        tone="subtle"
      >
        <SystemSelector
          systems={systems}
          selectedSystemId={selectedSystem.id}
          onSelect={setSelectedSystemId}
        />

        <SelectedSystemPanel
          key={selectedSystem.id}
          system={selectedSystem}
          reducedMotion={reducedMotion}
        />
      </CaseStudySection>

      <CaseStudySection
        id="implementation"
        headingId="internship-implementation-heading"
        eyebrow="Implementation Approach"
        title="Reusable technical patterns across different business needs."
        description="Although each system supports a separate process, the suite shares common ideas around structured information, role-aware actions, responsive interfaces, and maintainable workflows."
        tone="elevated"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {IMPLEMENTATION_PRINCIPLES.map(
            (principle) => (
              <InformationCard
                key={principle.number}
                number={principle.number}
                title={principle.title}
                description={
                  principle.description
                }
              />
            )
          )}
        </div>

        {allTechnologies.length > 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Shared Technology Stack
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              Technologies used throughout the systems suite.
            </h3>

            <div className="mt-6">
              <CaseStudyTechList
                technologies={allTechnologies}
                ariaLabel="Internship systems technology stack"
              />
            </div>
          </div>
        ) : null}
      </CaseStudySection>

      <CaseStudySection
        id="system-gallery"
        headingId="system-gallery-heading"
        eyebrow="Complete Suite"
        title="Four systems addressing four operational workflows."
        description="Each application is presented with its original interface demonstration and centralized project description."
        tone="subtle"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {systems.map((system, index) => (
            <SystemSummaryCard
              key={system.id}
              system={system}
              index={index}
              reducedMotion={reducedMotion}
              onExplore={handleExploreSystem}
            />
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="outcomes"
        headingId="internship-outcomes-heading"
        eyebrow="What the Work Demonstrates"
        title="Building systems for actual processes, users, and constraints."
        description="The suite reflects the ability to move from operational requirements to working applications while also supporting the surrounding technical environment."
        tone="elevated"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <InformationCard
            number="01"
            eyebrow="Product Thinking"
            title="Translating workflows into usable interfaces."
            description="The systems organize real tasks, records, and responsibilities into interfaces that users can understand and operate."
          />

          <InformationCard
            number="02"
            eyebrow="Technical Delivery"
            title="Connecting interface behavior with application data."
            description="The work combines frontend development, validation, data management, status handling, and operational logic."
          />

          <InformationCard
            number="03"
            eyebrow="Professional Context"
            title="Supporting both applications and infrastructure."
            description="The internship combined software development with troubleshooting, device support, networking, server work, and documentation."
          />
        </div>

        <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Confidentiality Note
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
            These systems were developed for internal operational
            use. The case study focuses on application structure,
            workflow design, interface behavior, and technical
            contribution without exposing private company records,
            credentials, or confidential operational data.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="next-project"
        headingId="internship-next-project-heading"
        eyebrow="Continue Exploring"
        title="Explore the AI-assisted platform case study."
        description="TalkReady demonstrates a different side of my work through role-based learning workflows, AI-assisted assessment, platform administration, evaluation, and academic research."
        tone="subtle"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="/projects/talkready"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            View TalkReady

            <span className="transition-transform group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </a>

          <a
            href="/preview-v2#contact"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            Discuss a Project
          </a>
        </div>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}