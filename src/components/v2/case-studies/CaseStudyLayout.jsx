function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M15.5 10h-11m4.25-4.25L4.5 10l4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M10 15.5v-11m-4.25 4.25L10 4.5l4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CaseStudyLayout({
  children,
  projectLabel = "Project Case Study",
}) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <a
        href="#case-study-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-950 transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-neutral-100"
      >
        Skip to case study
      </a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 w-full max-w-[90rem] items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">
          <a
            href="/#home"
            className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-100/20 bg-neutral-100/[0.07] text-xs font-semibold text-neutral-100">
              JM
            </span>

            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-white">
                Jay Mark Apelado
              </span>

              <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-neutral-500">
                {projectLabel}
              </span>
            </span>
          </a>

          <a
            href="/preview-v2#projects"
            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs font-semibold text-neutral-300 transition hover:border-neutral-100/25 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              <ArrowLeftIcon />
            </span>

            Back to projects
          </a>
        </div>
      </header>

      <main
        id="case-study-content"
        tabIndex={-1}
        className="focus:outline-none"
      >
        {children}
      </main>

      <footer className="relative border-t border-white/10 bg-neutral-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-100/20 to-transparent"
        />

        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <div>
            <p className="text-sm font-semibold text-white">
              Jay Mark Apelado
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              © {currentYear}. Project case study.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/preview-v2#projects"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-neutral-400 transition hover:border-neutral-100/25 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeftIcon />
              All projects
            </a>

            <a
              href="#case-study-content"
              aria-label="Return to the beginning of the case study"
              className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs font-semibold text-neutral-400 transition hover:border-neutral-100/25 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Back to top

              <span className="transition-transform group-hover:-translate-y-0.5">
                <ArrowUpIcon />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}