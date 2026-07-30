const ALIGNMENT_CLASSES = {
  left: "items-start text-left",
  center: "items-center text-center",
};

const WIDTH_CLASSES = {
  medium: "max-w-2xl",
  large: "max-w-3xl",
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  width = "large",
  className = "",
}) {
  const alignmentClass =
    ALIGNMENT_CLASSES[align] ??
    ALIGNMENT_CLASSES.left;

  const widthClass =
    WIDTH_CLASSES[width] ??
    WIDTH_CLASSES.large;

  return (
    <header
      className={[
        "flex flex-col",
        alignmentClass,
        widthClass,
        className,
      ].join(" ")}
    >
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
        id={id}
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
  );
}