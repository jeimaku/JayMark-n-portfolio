import { cn } from "../../lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={cn("max-w-3xl", alignment, className)}>
      {eyebrow && (
        <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-neutral-100 sm:text-xs sm:tracking-[0.35em]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl md:leading-[1.05]">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-neutral-400 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}