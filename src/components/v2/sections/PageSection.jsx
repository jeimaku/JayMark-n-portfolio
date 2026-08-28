import SectionDivider from "./SectionDivider";

const TONE_CLASSES = {
  default: "bg-neutral-950/78",
  subtle: "bg-neutral-950/74",
  elevated: "bg-neutral-900/[0.12]",
};

export default function PageSection({
  id,
  labelledBy,
  children,
  tone = "default",
  showDivider = true,
  className = "",
  containerClassName = "",
}) {
  const toneClass =
    TONE_CLASSES[tone] ?? TONE_CLASSES.default;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[
        "relative isolate scroll-mt-24 overflow-hidden",
        toneClass,
        className,
      ].join(" ")}
    >
      {showDivider ? <SectionDivider /> : null}

      <div
        className={[
          "relative mx-auto w-full max-w-[90rem]",
          "px-4 py-20",
          "sm:px-6 sm:py-24",
          "lg:px-10 lg:py-28",
          containerClassName,
        ].join(" ")}
      >
        {children}
      </div>
    </section>
  );
}
