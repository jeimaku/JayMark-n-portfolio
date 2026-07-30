export default function CaseStudyMetrics({
  items = [],
  ariaLabel = "Project results",
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul
      aria-label={ariaLabel}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <li
          key={`${item.label}-${item.value}`}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.07),transparent_15rem)]"
          />

          <div className="relative">
            <p className="text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
              {item.value}
            </p>

            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {item.label}
            </p>

            {item.description ? (
              <p className="mt-3 text-xs leading-6 text-slate-400">
                {item.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}