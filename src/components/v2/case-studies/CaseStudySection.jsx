const TONE_CLASSES = {
  default: "bg-slate-950",
  subtle: "bg-slate-950/95",
  elevated: "bg-slate-900/[0.12]",
};

export default function CaseStudySection({
  id,
  headingId,
  eyebrow,
  title,
  description,
  children,
  tone = "default",
  className = "",
  containerClassName = "",
}) {
  const toneClass =
    TONE_CLASSES[tone] ?? TONE_CLASSES.default;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={[
        "relative isolate scroll-mt-24",
        "overflow-hidden border-t border-white/10",
        toneClass,
        className,
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[90rem] bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent"
      />

      <div
        className={[
          "relative mx-auto w-full max-w-[90rem]",
          "px-4 py-20",
          "sm:px-6 sm:py-24",
          "lg:px-10 lg:py-28",
          containerClassName,
        ].join(" ")}
      >
        <header className="max-w-3xl">
          {eyebrow ? (
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-cyan-300/50"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
                {eyebrow}
              </p>
            </div>
          ) : null}

          <h2
            id={headingId}
            className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>

          {description ? (
            <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">
              {description}
            </p>
          ) : null}
        </header>

        <div className="mt-10 sm:mt-12">
          {children}
        </div>
      </div>
    </section>
  );
}