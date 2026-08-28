import { useState } from "react";

const LOOP_REPETITIONS = 4;

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
        style={{ color: technology.brandColor ?? "#FFFFFF" }}
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

function TechnologyItem({
  technology,
  primary,
  duplicated = false,
  staticLayout = false,
}) {
  return (
    <li
      aria-hidden={duplicated || undefined}
      className={[
        "flex shrink-0 items-center gap-3",
        staticLayout
          ? "min-w-0"
          : primary
            ? "mr-10 w-[12rem] sm:mr-14 sm:w-[14rem]"
            : "mr-8 w-[9.5rem] sm:mr-12 sm:w-[11.5rem]",
      ].join(" ")}
    >
      <span
        className={[
          "flex shrink-0 items-center justify-center",
          primary ? "h-10 w-10 sm:h-12 sm:w-12" : "h-7 w-7 sm:h-8 sm:w-8",
        ].join(" ")}
      >
        <TechnologyLogo technology={technology} primary={primary} />
      </span>

      <span className="min-w-0">
        <span
          className={[
            "block truncate font-medium tracking-[-0.02em] text-neutral-100",
            primary ? "text-sm sm:text-base" : "text-xs sm:text-sm",
          ].join(" ")}
        >
          {technology.name}
        </span>

        {primary && technology.role ? (
          <span className="mt-0.5 block truncate text-[0.62rem] uppercase tracking-[0.16em] text-neutral-500">
            {technology.role}
          </span>
        ) : null}
      </span>
    </li>
  );
}

function LaneLabel({ lane, fullBleed }) {
  return (
    <div
      className={[
        "mb-3 flex items-center gap-3",
        fullBleed
          ? "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
          : "",
      ].join(" ")}
    >
      <span className="font-mono text-[0.62rem] font-semibold tracking-[0.18em] text-neutral-600">
        {lane.index}
      </span>

      <span aria-hidden="true" className="h-px w-5 bg-white/15" />

      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {lane.label}
      </p>
    </div>
  );
}

function MarqueeLane({
  lane,
  technologyById,
  primary,
  staticLayout,
  fullBleed,
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

  const repeatedTechnologies = Array.from(
    { length: LOOP_REPETITIONS * 2 },
    (_, repeatIndex) =>
      laneTechnologies.map((technology) => ({
        technology,
        duplicated: repeatIndex > 0,
        repeatIndex,
      }))
  ).flat();

  const staticListClass = [
    "flex flex-wrap items-center gap-x-8 gap-y-5",
    fullBleed
      ? "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      : "",
  ].join(" ");

  return (
    <div className="skills-marquee-row relative min-w-0">
      <LaneLabel lane={lane} fullBleed={fullBleed} />

      {staticLayout ? (
        <ul aria-label={lane.label} className={staticListClass}>
          {laneTechnologies.map((technology) => (
            <TechnologyItem
              key={technology.id}
              technology={technology}
              primary={primary}
              staticLayout
            />
          ))}
        </ul>
      ) : (
        <div className="overflow-hidden">
          <ul
            aria-label={lane.label}
            className={trackClass}
            style={{
              "--marquee-duration":
                String(lane.duration * LOOP_REPETITIONS) + "s",
            }}
          >
            {repeatedTechnologies.map(
              ({ technology, duplicated, repeatIndex }) => (
                <TechnologyItem
                  key={technology.id + "-" + repeatIndex}
                  technology={technology}
                  primary={primary}
                  duplicated={duplicated}
                />
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function TechMarquee({
  lanes = [],
  technologyById,
  primary = false,
  staticLayout = false,
  fullBleed = false,
  ariaLabel = "Technology marquee",
}) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={[
        "space-y-8 sm:space-y-10",
        fullBleed
          ? "relative left-1/2 w-[100dvw] -translate-x-1/2"
          : "",
      ].join(" ")}
    >
      {lanes.map((lane) => (
        <MarqueeLane
          key={lane.id}
          lane={lane}
          technologyById={technologyById}
          primary={primary}
          staticLayout={staticLayout}
          fullBleed={fullBleed}
        />
      ))}
    </div>
  );
}
