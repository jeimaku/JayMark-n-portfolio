function ArrowIcon({
  direction = "right",
}) {
  const transform =
    direction === "left"
      ? "rotate(180 10 10)"
      : undefined;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <g transform={transform}>
        <path
          d="M4.5 10h11m-4.25-4.25L15.5 10l-4.25 4.25"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function ProjectNavigationCard({
  project,
  direction,
}) {
  const previous = direction === "previous";

  return (
    <a
      href={project.href}
      className="group relative flex h-full min-h-48 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.07),transparent_19rem)]"
      />

      <div className="relative">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-200">
          {previous
            ? "Previous Case Study"
            : "Next Case Study"}
        </p>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {project.eyebrow}
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white">
          {project.title}
        </h3>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
          {project.description}
        </p>
      </div>

      <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
        {previous ? (
          <>
            <span className="transition-transform group-hover:-translate-x-0.5">
              <ArrowIcon direction="left" />
            </span>

            View case study
          </>
        ) : (
          <>
            View case study

            <span className="transition-transform group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </>
        )}
      </span>
    </a>
  );
}

export default function CaseStudyPager({
  previousProject,
  nextProject,
}) {
  if (!previousProject && !nextProject) {
    return null;
  }

  return (
    <nav
      aria-label="Other case studies"
      className={[
        "grid gap-4",
        previousProject && nextProject
          ? "lg:grid-cols-2"
          : "grid-cols-1",
      ].join(" ")}
    >
      {previousProject ? (
        <ProjectNavigationCard
          project={previousProject}
          direction="previous"
        />
      ) : null}

      {nextProject ? (
        <ProjectNavigationCard
          project={nextProject}
          direction="next"
        />
      ) : null}
    </nav>
  );
}