export default function CaseStudyTechList({
  technologies = [],
  ariaLabel = "Technologies used",
}) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <ul
      aria-label={ariaLabel}
      className="flex flex-wrap gap-2"
    >
      {technologies.map((technology) => (
        <li
          key={technology}
          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2 text-xs font-medium text-slate-300"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(34,211,238,0.8)]"
          />

          {technology}
        </li>
      ))}
    </ul>
  );
}