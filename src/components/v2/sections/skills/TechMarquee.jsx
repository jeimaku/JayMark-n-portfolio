import { useState } from "react";

function getInitials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function TechnologyLogo({ technology, primary }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (!technology.iconUrl || hasFailed) {
    return (
      <span
        aria-hidden="true"
        className={[
          "font-mono font-bold leading-none",
          primary ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
        ].join(" ")}
        style={{ color: technology.brandColor ?? "#67E8F9" }}
      >
        {getInitials(technology.name)}
      </span>
    );
  }

  return (
    <img
      src={technology.iconUrl}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setHasFailed(true)}
      className="h-full w-full object-contain"
    />
  );
}

function TechnologyTile({
  technology,
  primary,
  duplicated = false,
  staticLayout = false,
}) {
  const accent = technology.brandColor ?? "#67E8F9";

  return (
    <li
      aria-hidden={duplicated || undefined}
      className={[
        "group shrink-0",
        staticLayout ? "" : "mr-3 sm:mr-4",
        primary
          ? "w-[8.75rem] sm:w-[10.5rem]"
          : "w-[8rem] sm:w-[9.25rem]",
      ].join(" ")}
    >
      <div
        className={[
          "relative flex h-full flex-col items-center justify-center",
          "overflow-hidden border bg-slate-950/60 px-3 text-center",
          "transition duration-300 ease-out",
          "group-hover:-translate-y-1 group-hover:bg-slate-900/80",
          primary
            ? "min-h-[10.25rem] rounded-2xl py-5 sm:min-h-[11.75rem] sm:py-6"
            : "min-h-[8.25rem] rounded-xl py-4 sm:min-h-[9.25rem] sm:py-5",
        ].join(" ")}
        style={{
          borderColor: `${accent}38`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 28px ${accent}0B`,
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 22%, ${accent}26, transparent 58%)`,
          }}
        />

        <span
          className={[
            "relative flex items-center justify-center",
            "transition duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110",
            primary
              ? "h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]"
              : "h-10 w-10 sm:h-12 sm:w-12",
          ].join(" ")}
        >
          <TechnologyLogo technology={technology} primary={primary} />
        </span>

        <span
          className={[
            "relative mt-4 block font-semibold tracking-[-0.02em] text-white",
            primary ? "text-sm sm:mt-5 sm:text-base" : "text-xs sm:text-sm",
          ].join(" ")}
        >
          {technology.name}
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-300 group-hover:scale-x-100"
        />
      </div>
    </li>
  );
}

function MarqueeLane({
  lane,
  technologyById,
  primary,
  prefersReducedMotion,
}) {
  const laneTechnologies = lane.technologyIds
    .map((id) => technologyById.get(id))
    .filter(Boolean);

  if (laneTechnologies.length === 0) {
    return null;
  }

  const trackClass = [
    "skills-marquee-track",
    lane.direction === "right"
      ? "skills-marquee-track--right"
      : "skills-marquee-track--left",
  ].join(" ");

  return (
    <div className="skills-marquee-row relative min-w-0">
      <div className="mb-3 flex items-center justify-between gap-4 px-1">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-cyan-300/70">
            {lane.index}
          </span>

          <p className="truncate text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
            {lane.label}
          </p>
        </div>

        <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.16em] text-slate-600 sm:block">
          {lane.direction === "right" ? "Signal →" : "← Signal"}
        </span>
      </div>

      {prefersReducedMotion ? (
        <ul
          aria-label={lane.label}
          className="flex flex-wrap gap-3 sm:gap-4"
        >
          {laneTechnologies.map((technology) => (
            <TechnologyTile
              key={technology.id}
              technology={technology}
              primary={primary}
              staticLayout
            />
          ))}
        </ul>
      ) : (
        <div className="relative overflow-hidden">
          <ul
            aria-label={lane.label}
            className={trackClass}
            style={{ "--marquee-duration": `${lane.duration}s` }}
          >
            {laneTechnologies.map((technology) => (
              <TechnologyTile
                key={`${technology.id}-first`}
                technology={technology}
                primary={primary}
              />
            ))}

            {laneTechnologies.map((technology) => (
              <TechnologyTile
                key={`${technology.id}-duplicate`}
                technology={technology}
                primary={primary}
                duplicated
              />
            ))}
          </ul>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent sm:w-14"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-slate-950 via-slate-950/75 to-transparent sm:w-14"
          />
        </div>
      )}
    </div>
  );
}

export default function TechMarquee({
  lanes = [],
  technologyById,
  primary = false,
  prefersReducedMotion = false,
  ariaLabel = "Technology marquee",
}) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className="space-y-6 sm:space-y-7"
    >
      {lanes.map((lane) => (
        <MarqueeLane
          key={lane.id}
          lane={lane}
          technologyById={technologyById}
          primary={primary}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
}
