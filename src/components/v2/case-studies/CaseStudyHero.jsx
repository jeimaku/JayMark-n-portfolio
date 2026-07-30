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

function MetadataItem({ label, value }) {
  return (
    <li className="border-t border-white/10 py-4 first:border-t-0 first:pt-0 sm:border-l sm:border-t-0 sm:py-0 sm:pl-5 first:sm:border-l-0 first:sm:pl-0">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium leading-6 text-slate-200">
        {value}
      </p>
    </li>
  );
}

export default function CaseStudyHero({
  eyebrow,
  title,
  subtitle,
  summary,
  metadata = [],
  actions = [],
  media,
}) {
  return (
    <section
      aria-labelledby="case-study-title"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-[4%] top-[12%] h-96 w-96 rounded-full bg-cyan-400/[0.055] blur-3xl" />

        <div className="absolute right-[5%] top-[8%] h-[30rem] w-[30rem] rounded-full bg-indigo-400/[0.04] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(148,163,184,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.45)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="mx-auto grid w-full max-w-[90rem] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14 lg:px-10 lg:py-24 xl:gap-20">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            {eyebrow}
          </p>

          <h1
            id="case-study-title"
            className="mt-6 text-4xl font-semibold leading-[0.97] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-5 max-w-2xl text-xl font-medium leading-tight text-cyan-100 sm:text-2xl">
              {subtitle}
            </p>
          ) : null}

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {summary}
          </p>

          {actions.length > 0 ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {actions.map((action, index) => {
                const primary = index === 0;

                return (
                  <a
                    key={`${action.label}-${action.href}`}
                    href={action.href}
                    target={
                      action.external
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      action.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={[
                      "group inline-flex min-h-12",
                      "w-full items-center justify-center",
                      "gap-2 rounded-full px-6 py-3",
                      "text-sm font-semibold transition",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-cyan-200",
                      "focus-visible:ring-offset-4",
                      "focus-visible:ring-offset-slate-950",
                      "sm:w-auto",
                      primary
                        ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                        : "border border-white/15 bg-white/[0.035] text-white hover:border-cyan-200/40 hover:bg-cyan-300/[0.06]",
                    ].join(" ")}
                  >
                    {action.label}

                    <span className="transition-transform group-hover:translate-x-0.5">
                      {action.external ? (
                        <ExternalLinkIcon />
                      ) : (
                        <ArrowIcon />
                      )}
                    </span>
                  </a>
                );
              })}
            </div>
          ) : null}

          {metadata.length > 0 ? (
            <ul className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-5">
              {metadata.map((item) => (
                <MetadataItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </ul>
          ) : null}
        </div>

        <div className="min-w-0">
          {media}
        </div>
      </div>
    </section>
  );
}