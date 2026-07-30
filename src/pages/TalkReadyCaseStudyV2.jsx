import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { featuredProjects } from "../data";

import {
  CaseStudyHero,
  CaseStudyLayout,
  CaseStudyMediaFrame,
  CaseStudyMetrics,
  CaseStudySection,
  CaseStudyTechList,
} from "../components/v2/case-studies";

const PRODUCT_CHALLENGES = [
  {
    number: "01",
    title: "Supporting distinct user roles",
    description:
      "Students, trainers, and administrators needed different tools, permissions, dashboards, and workflows within one connected platform.",
  },
  {
    number: "02",
    title: "Making AI feedback useful",
    description:
      "Automated feedback needed to be clear enough for learners to understand while remaining connected to activities, assessments, and trainer review.",
  },
  {
    number: "03",
    title: "Maintaining operational visibility",
    description:
      "Administrators and trainers needed a practical way to manage users, classes, content, submissions, progress, and review activity.",
  },
];

const USER_WORKFLOWS = [
  {
    id: "student",
    number: "01",
    label: "Student Experience",
    title: "Practice, receive feedback, and track progress.",
    description:
      "Students complete structured language and speaking activities, review AI-assisted feedback, and monitor their development through an accessible learning interface.",
    capabilities: [
      "Learning and speaking activities",
      "AI-assisted assessment feedback",
      "Progress and performance visibility",
      "Role-specific student dashboard",
    ],
  },
  {
    id: "trainer",
    number: "02",
    label: "Trainer Experience",
    title: "Guide learners with clearer performance information.",
    description:
      "Trainers manage their learning environment, monitor student performance, review submitted work, and provide additional guidance where human review is needed.",
    capabilities: [
      "Class and learner management",
      "Performance monitoring",
      "Submission and activity review",
      "Trainer-led feedback workflows",
    ],
  },
  {
    id: "administrator",
    number: "03",
    label: "Administrator Experience",
    title: "Operate and oversee the complete platform.",
    description:
      "Administrators manage accounts, classes, platform activity, submitted content, reviews, archived records, appeals, and system-level monitoring.",
    capabilities: [
      "User and role administration",
      "Class and platform management",
      "Review and appeal workflows",
      "Analytics and activity monitoring",
    ],
  },
];

const IMPLEMENTATION_AREAS = [
  {
    number: "01",
    title: "Role-based architecture",
    description:
      "The platform separates student, trainer, and administrator permissions while keeping their workflows connected through shared application data.",
  },
  {
    number: "02",
    title: "AI-assisted assessment",
    description:
      "AI services support structured language and speech feedback while the surrounding interface keeps results understandable and reviewable.",
  },
  {
    number: "03",
    title: "Data-driven workflows",
    description:
      "Authentication, user records, classes, activities, submissions, reviews, and progress information are connected through centralized application data.",
  },
  {
    number: "04",
    title: "Responsive interface system",
    description:
      "Reusable components and responsive layouts provide a consistent experience across student, trainer, and administrator dashboards.",
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

function WorkflowCard({ workflow }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent"
      />

      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-200">
            {workflow.label}
          </p>

          <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
            {workflow.title}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-xs text-slate-600"
        >
          {workflow.number}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-400">
        {workflow.description}
      </p>

      <ul
        aria-label={`${workflow.label} capabilities`}
        className="mt-6 grid gap-2"
      >
        {workflow.capabilities.map((capability) => (
          <li
            key={capability}
            className="flex gap-3 rounded-xl border border-white/10 bg-slate-950/30 px-4 py-3 text-xs leading-6 text-slate-300"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
            />

            {capability}
          </li>
        ))}
      </ul>
    </article>
  );
}

function HighlightCard({
  highlight,
  index,
}) {
  return (
    <li className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
      <span className="font-mono text-xs text-cyan-300/70">
        {String(index + 1).padStart(2, "0")}
      </span>

      <p className="text-sm leading-7 text-slate-300">
        {highlight}
      </p>
    </li>
  );
}

function TalkReadyGallery({
  title,
  cover,
  gallery = [],
}) {
  const mediaItems = useMemo(() => {
    const items = [];

    if (cover) {
      items.push({
        src: cover,
        alt: `${title} landing page`,
        caption:
          "TalkReady’s public-facing platform and primary entry experience.",
      });
    }

    gallery.forEach((item, index) => {
      if (typeof item === "string") {
        items.push({
          src: item,
          alt: `${title} interface screenshot ${index + 1}`,
          caption:
            "A view from one of TalkReady’s role-based application interfaces.",
        });

        return;
      }

      if (item?.src) {
        items.push({
          src: item.src,
          alt:
            item.alt ??
            `${title} interface screenshot ${index + 1}`,
          caption:
            item.caption ??
            "A view from one of TalkReady’s role-based application interfaces.",
        });
      }
    });

    return items.filter(
      (item, index, collection) =>
        collection.findIndex(
          (candidate) =>
            candidate.src === item.src
        ) === index
    );
  }, [cover, gallery, title]);

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [mediaItems.length]);

  const selectedItem =
    mediaItems[selectedIndex] ??
    mediaItems[0] ??
    null;

  if (!selectedItem) {
    return (
      <CaseStudyMediaFrame
        src={null}
        alt={`${title} project preview unavailable`}
        caption="Project preview unavailable."
      />
    );
  }

  return (
    <div>
      <CaseStudyMediaFrame
        src={selectedItem.src}
        alt={selectedItem.alt}
        caption={selectedItem.caption}
        eager
        imageClassName="aspect-[16/10]"
      />

      {mediaItems.length > 1 ? (
        <div
          role="group"
          aria-label={`${title} screenshot selector`}
          className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {mediaItems.map((item, index) => {
            const selected =
              index === selectedIndex;

            return (
              <button
                key={item.src}
                type="button"
                aria-pressed={selected}
                aria-label={`Show ${item.alt}`}
                onClick={() =>
                  setSelectedIndex(index)
                }
                className={[
                  "relative overflow-hidden rounded-xl",
                  "border bg-slate-950 transition",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-cyan-200",
                  selected
                    ? "border-cyan-300/70"
                    : "border-white/10 hover:border-white/30",
                ].join(" ")}
              >
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover object-top"
                />

                <span
                  aria-hidden="true"
                  className={[
                    "absolute inset-0 ring-1 ring-inset",
                    selected
                      ? "ring-cyan-200/35"
                      : "ring-white/[0.025]",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function MissingTalkReadyProject() {
  return (
    <CaseStudyLayout projectLabel="TalkReady Case Study">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-20 sm:px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.025] p-7 text-center sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Project data unavailable
          </p>

          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white">
            TalkReady could not be loaded.
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Check that the centralized project data still contains
            an entry with the ID
            <code className="mx-1 rounded bg-white/[0.05] px-1.5 py-0.5 text-cyan-100">
              talkready
            </code>
            .
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

export default function TalkReadyCaseStudyV2() {
  const project =
    featuredProjects.find(
      (item) => item.id === "talkready"
    ) ?? null;

  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      "TalkReady Case Study | Jay Mark Apelado";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return () => {
      document.title = previousTitle;
    };
  }, []);

  if (!project) {
    return <MissingTalkReadyProject />;
  }

  const technologies =
    project.tech ??
    project.technologies ??
    [];

  const gallery =
    project.media?.gallery ?? [];

  const heroMediaSource =
    project.media?.cover ??
    gallery[0]?.src ??
    gallery[0] ??
    null;

  const heroActions = [
    project.links?.live
      ? {
          label: "Open Live Platform",
          href: project.links.live,
          external: true,
        }
      : null,

    project.links?.github
      ? {
          label: "View Source Code",
          href: project.links.github,
          external: true,
        }
      : null,

    {
      label: "Explore the Case Study",
      href: "#overview",
      external: false,
    },
  ].filter(Boolean);

  const metadata = [
    {
      label: "Role",
      value:
        project.role ??
        "Full-Stack Developer and Team Lead",
    },
    {
      label: "Project Type",
      value:
        project.type ??
        "AI-Assisted Learning Platform",
    },
    {
      label: "Year",
      value: project.year ?? "2025",
    },
  ];

  return (
    <CaseStudyLayout projectLabel="TalkReady Case Study">
      <CaseStudyHero
        eyebrow="Featured Platform Case Study"
        title={project.title}
        subtitle={project.subtitle}
        summary={project.description}
        metadata={metadata}
        actions={heroActions}
        media={
          <CaseStudyMediaFrame
            src={heroMediaSource}
            alt={`${project.title} platform preview`}
            caption="TalkReady’s production platform and role-based learning environment."
            eager
            imageClassName="aspect-[16/10]"
          />
        }
      />

      <CaseStudySection
        id="overview"
        headingId="overview-heading"
        eyebrow="Project Overview"
        title="A connected learning platform for students, trainers, and administrators."
        description="TalkReady combines structured language-learning workflows, AI-assisted assessment, user management, review processes, and performance visibility in one role-based platform."
        tone="subtle"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <InformationCard
            number="01"
            eyebrow="The Product"
            title="An AI-assisted language and speaking platform."
            description={
              project.description
            }
          />

          <InformationCard
            number="02"
            eyebrow="My Role"
            title={
              project.role ??
              "Full-Stack Developer and Team Lead"
            }
            description="My work covered full-stack implementation, application structure, role-based interfaces, AI-supported workflows, technical decision-making, integration, testing, and team coordination."
          />
        </div>

        {project.highlights?.length > 0 ? (
          <ul
            aria-label={`${project.title} project highlights`}
            className="mt-5 grid gap-3 md:grid-cols-2"
          >
            {project.highlights.map(
              (highlight, index) => (
                <HighlightCard
                  key={highlight}
                  highlight={highlight}
                  index={index}
                />
              )
            )}
          </ul>
        ) : null}
      </CaseStudySection>

      <CaseStudySection
        id="challenge"
        headingId="challenge-heading"
        eyebrow="The Challenge"
        title="Designing one system around several connected responsibilities."
        description="The platform needed to provide useful experiences for learners, trainers, and administrators without allowing the complexity of the underlying workflows to overwhelm users."
        tone="elevated"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {PRODUCT_CHALLENGES.map((challenge) => (
            <InformationCard
              key={challenge.number}
              number={challenge.number}
              title={challenge.title}
              description={challenge.description}
            />
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="solution"
        headingId="solution-heading"
        eyebrow="Role-Based Solution"
        title="Different interfaces, connected through one platform."
        description="Each user role receives the tools and information required for its responsibilities while sharing the same underlying learning and administrative environment."
        tone="subtle"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {USER_WORKFLOWS.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
            />
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="implementation"
        headingId="implementation-heading"
        eyebrow="Implementation"
        title="Turning the product requirements into a maintainable system."
        description="The implementation connects role-based access, application data, responsive interfaces, AI-assisted feedback, and administrative workflows."
        tone="elevated"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {IMPLEMENTATION_AREAS.map((area) => (
            <InformationCard
              key={area.number}
              number={area.number}
              title={area.title}
              description={area.description}
            />
          ))}
        </div>

        {technologies.length > 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Technology Stack
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              Technologies used across the platform.
            </h3>

            <div className="mt-6">
              <CaseStudyTechList
                technologies={technologies}
                ariaLabel={`${project.title} technology stack`}
              />
            </div>
          </div>
        ) : null}
      </CaseStudySection>

      <CaseStudySection
        id="outcomes"
        headingId="outcomes-heading"
        eyebrow="Results and Validation"
        title="A working platform supported by evaluation and research."
        description="TalkReady was evaluated as a complete system and also supported academic research connected to AI-assisted language and speech learning."
        tone="subtle"
      >
        <CaseStudyMetrics
          items={project.results ?? []}
          ariaLabel={`${project.title} project outcomes`}
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Research Outcome
            </p>

            <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              IEEE APWiMob 2025 acceptance
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              The research associated with TalkReady was accepted
              for IEEE APWiMob 2025, connecting the working platform
              to an academic study of AI-assisted language and speech
              learning.
            </p>
          </article>

          <article className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Product Principle
            </p>

            <blockquote className="mt-4">
              <p className="text-lg font-medium leading-8 tracking-[-0.015em] text-cyan-50">
                “AI feedback should support the learning process,
                not make the system harder for learners and trainers
                to understand.”
              </p>
            </blockquote>
          </article>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="interface-gallery"
        headingId="interface-gallery-heading"
        eyebrow="Platform Interface"
        title="A closer look at the role-based TalkReady experience."
        description="The gallery presents the public platform and selected student, trainer, administrator, analytics, and reporting interfaces."
        tone="elevated"
      >
        <TalkReadyGallery
          title={project.title}
          cover={project.media?.cover}
          gallery={gallery}
        />
      </CaseStudySection>

      <CaseStudySection
        id="next-project"
        headingId="next-project-heading"
        eyebrow="Continue Exploring"
        title="See how the same systems thinking was applied to company operations."
        description="The Internship Systems Suite focuses on CRM, virtual-office, support-ticket, and inventory workflows developed for internal company use."
        tone="subtle"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="/projects/internship-systems"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            View Internship Systems

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