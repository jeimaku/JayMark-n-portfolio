import { heroSceneContext } from "../../data/heroSceneContext";

function ContextLink({ item }) {
  return (
    <a
      href={item.href}
      className="inline-flex items-center gap-2 text-xs font-semibold text-white transition hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
    >
      {item.relatedWork}

      <span aria-hidden="true">→</span>
    </a>
  );
}

export default function HeroSceneContextOverlay({
  activeContextId,
  onContextChange,
}) {
  const activeItem =
    heroSceneContext.find(
      (item) => item.id === activeContextId
    ) || heroSceneContext[0];

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {/* Responsive context selector */}
      <nav
        aria-label="Explore professional areas in the 3D workspace"
        className="pointer-events-auto absolute inset-x-3 top-3 touch-pan-x overflow-x-auto overscroll-x-contain sm:inset-x-4"
      >
        <div className="flex w-max gap-1.5 rounded-2xl border border-white/10 bg-neutral-950/80 p-1.5 shadow-xl backdrop-blur-md sm:rounded-full">
          {heroSceneContext.map((item) => {
            const selected =
              item.id === activeContextId;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onContextChange(item.id)}
                className={[
                  "inline-flex min-h-9 snap-start",
                  "items-center gap-2 whitespace-nowrap",
                  "rounded-full px-3",
                  "text-[0.62rem] font-semibold uppercase",
                  "tracking-[0.13em] transition",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-white",
                  selected
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: item.accent,
                    boxShadow: selected
                      ? `0 0 12px ${item.accent}`
                      : "none",
                  }}
                />

                {item.shortLabel}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile selected-context panel */}
      <aside
        aria-live="polite"
        className="pointer-events-auto absolute inset-x-3 bottom-3 max-h-[10rem] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/90 p-3 shadow-2xl backdrop-blur-md md:hidden"
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full"
            style={{
              backgroundColor: activeItem.accent,
              boxShadow: `0 0 12px ${activeItem.accent}`,
            }}
          />

          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            Professional Context
          </p>
        </div>

        <h3 className="mt-2 text-sm font-semibold text-white">
          {activeItem.title}
        </h3>

        <p className="mt-1.5 text-[0.72rem] leading-5 text-neutral-400">
          {activeItem.description}
        </p>

        <div className="mt-2">
          <ContextLink item={activeItem} />
        </div>
      </aside>

      {/* Tablet and desktop selected-context panel */}
      <aside
        aria-live="polite"
        className="pointer-events-auto absolute bottom-4 left-4 hidden max-w-sm rounded-2xl border border-white/10 bg-neutral-950/85 p-4 shadow-2xl backdrop-blur-md md:block"
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: activeItem.accent,
              boxShadow: `0 0 14px ${activeItem.accent}`,
            }}
          />

          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Professional Context
          </p>
        </div>

        <h3 className="mt-3 text-sm font-semibold text-white">
          {activeItem.title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-neutral-400">
          {activeItem.description}
        </p>

        <div className="mt-3">
          <ContextLink item={activeItem} />
        </div>
      </aside>
    </div>
  );
}