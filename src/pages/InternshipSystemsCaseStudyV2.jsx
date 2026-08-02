import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "motion/react";

import { internshipSystems } from "../data";

import {
  getCaseStudyNeighbors,
} from "../data/caseStudyNavigation";

import LazyVideo from "../components/ui/LazyVideo";

import {
  CaseStudyHero,
  CaseStudyLayout,
  CaseStudyMediaFrame,
  CaseStudyMediaLightbox,
  CaseStudyMetrics,
  CaseStudyPager,
  CaseStudySection,
  CaseStudySectionNav,
  CaseStudyTechList,
} from "../components/v2/case-studies";

import {
  useMediaQuery,
} from "../hooks/useHeroRuntime";

const MOTION_EASE = [
  0.22,
  1,
  0.36,
  1,
];

const INTERNSHIP_SECTIONS = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "challenge",
    label: "Challenge",
  },
  {
    id: "system-explorer",
    label: "Systems",
  },
  {
    id: "implementation",
    label: "Implementation",
  },
  {
    id: "system-gallery",
    label: "Gallery",
  },
  {
    id: "outcomes",
    label: "Outcomes",
  },
];

const OPERATIONAL_CHALLENGES = [
  {
    number: "01",
    title:
      "Disconnected operational information",
    description:
      "Daily company processes can become difficult to monitor when records, updates, and responsibilities are distributed across separate tools or manual documents.",
  },
  {
    number: "02",
    title:
      "Limited workflow visibility",
    description:
      "Teams need clear ways to identify current status, assigned responsibilities, pending actions, and completed work without repeatedly requesting updates.",
  },
  {
    number: "03",
    title:
      "Repetitive administrative work",
    description:
      "Manual data entry, status tracking, searching, and report preparation can consume time that should be spent on higher-value operational work.",
  },
];

const IMPLEMENTATION_PRINCIPLES = [
  {
    number: "01",
    title:
      "Workflow-first interfaces",
    description:
      "Each system was organized around the actual sequence of tasks users needed to perform rather than around isolated technical features.",
  },
  {
    number: "02",
    title:
      "Structured operational data",
    description:
      "Records, statuses, assignments, and activity information were organized so users could search, review, update, and monitor work consistently.",
  },
  {
    number: "03",
    title:
      "Role-aware functionality",
    description:
      "Actions and information were presented according to the responsibilities of the people using each internal system.",
  },
  {
    number: "04",
    title:
      "Reusable application patterns",
    description:
      "Common interface, validation, navigation, and data-management patterns helped maintain consistency across multiple systems.",
  },
];

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

function MonitorIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.65"
      />

      <path
        d="M9 20h6M12 16.5V20"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="m4.75 10.25 3.1 3.1L15.5 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getCardInitial({
  direction,
  reducedMotion,
}) {
  if (reducedMotion) {
    return false;
  }

  switch (direction) {
    case "left":
      return {
        opacity: 0,
        x: -34,
        y: 14,
        rotate: -1.2,
        scale: 0.985,
        filter: "blur(5px)",
      };

    case "right":
      return {
        opacity: 0,
        x: 34,
        y: 14,
        rotate: 1.2,
        scale: 0.985,
        filter: "blur(5px)",
      };

    case "scale":
      return {
        opacity: 0,
        y: 20,
        scale: 0.94,
        filter: "blur(5px)",
      };

    default:
      return {
        opacity: 0,
        y: 28,
        scale: 0.985,
        filter: "blur(5px)",
      };
  }
}

function InformationCard({
  number,
  eyebrow,
  title,
  description,
  direction = "up",
  delay = 0,
  reducedMotion = false,
  diagnostic = false,
}) {
  return (
    <motion.article
      initial={getCardInitial({
        direction,
        reducedMotion,
      })}
      whileInView={
        reducedMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      viewport={{
        once: true,
        amount: 0.18,
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        duration: 0.72,
        delay,
        ease: MOTION_EASE,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
              scale: 1.006,
            }
      }
      className={[
        "group relative overflow-hidden",
        "rounded-3xl border",
        "border-white/10",
        "bg-white/[0.025]",
        "p-5 sm:p-6",
        "shadow-[0_24px_70px_rgba(0,0,0,0.18)]",
        "transition-colors duration-300",
        "hover:border-cyan-300/20",
        "hover:bg-white/[0.04]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute inset-0",
          "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.075),transparent_18rem)]",
        ].join(" ")}
      />

      {diagnostic ? (
        <motion.div
          aria-hidden="true"
          initial={
            reducedMotion
              ? false
              : {
                  x: "-120%",
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  x: "150%",
                }
          }
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: delay + 0.18,
            ease: MOTION_EASE,
          }}
          className={[
            "pointer-events-none",
            "absolute inset-y-0",
            "left-0 w-1/3",
            "bg-gradient-to-r",
            "from-transparent",
            "via-cyan-200/[0.08]",
            "to-transparent",
            "blur-lg",
          ].join(" ")}
        />
      ) : null}

      <motion.div
        aria-hidden="true"
        initial={
          reducedMotion
            ? false
            : {
                scaleX: 0,
                opacity: 0,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                scaleX: 1,
                opacity: 1,
              }
        }
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 0.75,
          delay: delay + 0.1,
          ease: MOTION_EASE,
        }}
        className={[
          "absolute inset-x-0 top-0",
          "h-px origin-left",
          "bg-gradient-to-r",
          "from-transparent",
          "via-cyan-300/55",
          "to-transparent",
        ].join(" ")}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <div>
            {eyebrow ? (
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                {eyebrow}
              </p>
            ) : null}

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              {title}
            </h3>
          </div>

          <motion.span
            aria-hidden="true"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0.2,
                    scale: 0.8,
                  }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.45,
              delay: delay + 0.22,
              ease: MOTION_EASE,
            }}
            className="shrink-0 font-mono text-xs text-cyan-300/70"
          >
            {number}
          </motion.span>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          {description}
        </p>

        {diagnostic ? (
          <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200">
              <CheckIcon />
            </span>

            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Workflow issue identified
            </span>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function FeatureItem({
  children,
  index = 0,
  reducedMotion = false,
}) {
  return (
    <motion.li
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: 18,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.48,
        delay:
          reducedMotion
            ? 0
            : 0.08 +
              index * 0.055,
        ease: MOTION_EASE,
      }}
      className={[
        "flex gap-3 rounded-xl",
        "border border-white/10",
        "bg-slate-950/30",
        "px-4 py-3",
        "text-xs leading-6",
        "text-slate-300",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
      />

      {children}
    </motion.li>
  );
}

function SystemVideoFrame({
  system,
  reducedMotion,
  active = true,
  eager = false,
  onOpen,
}) {
  const videoSource =
    system.media?.video ??
    system.media?.src ??
    null;

  const posterSource =
    system.media?.cover ??
    system.media?.poster ??
    null;

  if (!videoSource) {
    return (
      <div className="relative">
        <CaseStudyMediaFrame
          src={posterSource}
          alt={`${system.name} interface preview`}
          caption={`${system.name} operational interface preview.`}
          eager={eager}
          imageClassName="aspect-video"
        />

        {onOpen && posterSource ? (
          <button
            type="button"
            onClick={() =>
              onOpen(system)
            }
            className={[
              "absolute bottom-12 right-4",
              "rounded-full border",
              "border-white/15",
              "bg-slate-950/85",
              "px-4 py-2",
              "text-xs font-semibold",
              "text-white backdrop-blur",
              "transition",
              "hover:border-cyan-300/40",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-cyan-200",
            ].join(" ")}
          >
            Open preview
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <figure
      className={[
        "overflow-hidden rounded-3xl",
        "border border-white/10",
        "bg-slate-900/35",
        "shadow-[0_28px_80px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      <div className="relative overflow-hidden bg-slate-950">
        <LazyVideo
          src={videoSource}
          poster={posterSource}
          className={[
            "aspect-video w-full",
            "object-cover",
            "transition duration-700",
            active
              ? "scale-100 opacity-100"
              : "scale-[1.015] opacity-70",
          ].join(" ")}
          autoPlay={
            active &&
            !reducedMotion
          }
          muted
          loop
          playsInline
          preload={
            eager
              ? "metadata"
              : "none"
          }
          lazy={!eager}
          draggable={false}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.035]"
        />

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none",
            "absolute left-5 top-5",
            "h-8 w-8",
            "border-l border-t",
            "border-cyan-200/30",
          ].join(" ")}
        />

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none",
            "absolute bottom-5 right-5",
            "h-8 w-8",
            "border-b border-r",
            "border-cyan-200/30",
          ].join(" ")}
        />

        <div className="pointer-events-none absolute left-4 top-4">
          <span
            className={[
              "inline-flex items-center gap-2",
              "rounded-full border",
              "border-white/10",
              "bg-slate-950/80",
              "px-3 py-1.5",
              "text-[0.6rem]",
              "font-semibold uppercase",
              "tracking-[0.15em]",
              "text-slate-300",
              "backdrop-blur",
            ].join(" ")}
          >
            <span
              className={[
                "h-1.5 w-1.5",
                "rounded-full",
                active &&
                !reducedMotion
                  ? "animate-pulse bg-emerald-400 motion-reduce:animate-none"
                  : "bg-slate-600",
              ].join(" ")}
            />

            {active &&
            !reducedMotion
              ? "System active"
              : "System preview"}
          </span>
        </div>

        {onOpen ? (
          <button
            type="button"
            onClick={() =>
              onOpen(system)
            }
            className={[
              "absolute bottom-4 right-4",
              "rounded-full border",
              "border-white/15",
              "bg-slate-950/85",
              "px-4 py-2",
              "text-xs font-semibold",
              "text-white backdrop-blur",
              "transition",
              "hover:border-cyan-300/40",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-cyan-200",
            ].join(" ")}
          >
            Open demo
          </button>
        ) : null}
      </div>

      <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-slate-500 sm:px-5">
        {system.name} workflow and
        interface demonstration.
      </figcaption>
    </figure>
  );
}

function SystemSelector({
  systems,
  selectedSystemId,
  onSelect,
  compact = false,
}) {
  const tabRefs = useRef([]);

  const handleKeyDown = (
    event,
    currentIndex
  ) => {
    const lastIndex =
      systems.length - 1;

    let nextIndex =
      currentIndex;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex =
          currentIndex ===
          lastIndex
            ? 0
            : currentIndex + 1;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        nextIndex =
          currentIndex === 0
            ? lastIndex
            : currentIndex - 1;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex =
          lastIndex;
        break;

      default:
        return;
    }

    event.preventDefault();

    const nextSystem =
      systems[nextIndex];

    onSelect(nextSystem.id);

    window.requestAnimationFrame(
      () => {
        tabRefs.current[
          nextIndex
        ]?.focus();
      }
    );
  };

  return (
    <div
      role="tablist"
      aria-label="Internship system selector"
      aria-orientation="horizontal"
      className={[
        "grid gap-2",
        compact
          ? "grid-cols-2"
          : [
              "sm:grid-cols-2",
              "xl:grid-cols-4",
            ].join(" "),
      ].join(" ")}
    >
      {systems.map(
        (system, index) => {
          const selected =
            system.id ===
            selectedSystemId;

          return (
            <button
              key={system.id}
              ref={(element) => {
                tabRefs.current[
                  index
                ] = element;
              }}
              type="button"
              role="tab"
              tabIndex={
                selected
                  ? 0
                  : -1
              }
              aria-selected={
                selected
              }
              aria-controls={`system-panel-${system.id}`}
              id={`system-tab-${system.id}`}
              onClick={() =>
                onSelect(
                  system.id
                )
              }
              onKeyDown={(
                event
              ) =>
                handleKeyDown(
                  event,
                  index
                )
              }
              className={[
                "group relative",
                "min-h-20",
                "overflow-hidden",
                "rounded-2xl border",
                "p-4 text-left",
                "transition duration-300",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-cyan-200",
                selected
                  ? [
                      "border-cyan-300/50",
                      "bg-cyan-300/[0.07]",
                      "shadow-[0_14px_38px_rgba(8,145,178,0.08)]",
                    ].join(" ")
                  : [
                      "border-white/10",
                      "bg-white/[0.025]",
                      "hover:border-white/25",
                      "hover:bg-white/[0.04]",
                    ].join(" "),
              ].join(" ")}
            >
              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none",
                  "absolute inset-x-0",
                  "bottom-0 h-px",
                  "origin-left",
                  "bg-gradient-to-r",
                  "from-cyan-300",
                  "to-indigo-300",
                  "transition-transform",
                  "duration-500",
                  selected
                    ? "scale-x-100"
                    : "scale-x-0",
                ].join(" ")}
              />

              <p
                className={[
                  "font-mono",
                  "text-[0.65rem]",
                  selected
                    ? "text-cyan-200"
                    : "text-slate-600",
                ].join(" ")}
              >
                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}
              </p>

              <p className="mt-2 text-sm font-semibold leading-6 text-white">
                {system.name}
              </p>

              <span
                className={[
                  "mt-3 inline-flex",
                  "items-center gap-2",
                  "text-[0.58rem]",
                  "font-semibold uppercase",
                  "tracking-[0.14em]",
                  selected
                    ? "text-cyan-200"
                    : "text-slate-700",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-1.5 w-1.5",
                    "rounded-full",
                    selected
                      ? [
                          "bg-cyan-300",
                          "shadow-[0_0_10px_rgba(34,211,238,0.7)]",
                        ].join(" ")
                      : "bg-slate-700",
                  ].join(" ")}
                />

                {selected
                  ? "Active"
                  : "Standby"}
              </span>
            </button>
          );
        }
      )}
    </div>
  );
}

function SelectedSystemPanel({
  system,
  reducedMotion,
  onOpen,
}) {
  const technologies =
    system.tech ??
    system.technologies ??
    [];

  const features =
    system.keyFeatures ??
    system.features ??
    [];

  return (
    <motion.article
      id={`system-panel-${system.id}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`system-tab-${system.id}`}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: 26,
              scale: 0.985,
              filter: "blur(5px)",
            }
      }
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={
        reducedMotion
          ? undefined
          : {
              opacity: 0,
              x: -22,
              scale: 0.99,
            }
      }
      transition={{
        duration:
          reducedMotion
            ? 0
            : 0.55,
        ease: MOTION_EASE,
      }}
      className="focus:outline-none"
    >
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
        <SystemVideoFrame
          system={system}
          reducedMotion={
            reducedMotion
          }
          active
          eager
          onOpen={onOpen}
        />

        <div
          className={[
            "relative overflow-hidden",
            "rounded-3xl border",
            "border-white/10",
            "bg-white/[0.025]",
            "p-5 sm:p-6",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className={[
              "pointer-events-none",
              "absolute inset-0",
              "bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.085),transparent_20rem)]",
            ].join(" ")}
          />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                {system.category}
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Internal System
              </span>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              {system.tagline}
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
              {system.name}
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              {system.description}
            </p>

            {features.length > 0 ? (
              <div className="mt-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Key capabilities
                </p>

                <ul
                  aria-label={`${system.name} key capabilities`}
                  className="mt-3 grid gap-2"
                >
                  {features.map(
                    (
                      feature,
                      index
                    ) => (
                      <FeatureItem
                        key={
                          feature
                        }
                        index={
                          index
                        }
                        reducedMotion={
                          reducedMotion
                        }
                      >
                        {
                          feature
                        }
                      </FeatureItem>
                    )
                  )}
                </ul>
              </div>
            ) : null}

            {technologies.length >
            0 ? (
              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay:
                    reducedMotion
                      ? 0
                      : 0.22,
                  ease:
                    MOTION_EASE,
                }}
                className="mt-6 border-t border-white/10 pt-5"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Technology stack
                </p>

                <div className="mt-3">
                  <CaseStudyTechList
                    technologies={
                      technologies
                    }
                    ariaLabel={`${system.name} technologies`}
                  />
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ResponsiveSystemShowcase({
  systems,
  selectedSystemId,
  onSelect,
  reducedMotion,
  onOpen,
}) {
  const [direction, setDirection] =
    useState(1);

  const selectedIndex = Math.max(
    0,
    systems.findIndex(
      (system) =>
        system.id ===
        selectedSystemId
    )
  );

  const selectedSystem =
    systems[selectedIndex] ??
    systems[0];

  const systemCount =
    systems.length;

  const selectSystem = (
    systemId
  ) => {
    const nextIndex =
      systems.findIndex(
        (system) =>
          system.id ===
          systemId
      );

    if (nextIndex < 0) {
      return;
    }

    setDirection(
      nextIndex >= selectedIndex
        ? 1
        : -1
    );

    onSelect(systemId);
  };

  const showPrevious = () => {
    const previousIndex =
      selectedIndex === 0
        ? systemCount - 1
        : selectedIndex - 1;

    setDirection(-1);

    onSelect(
      systems[previousIndex].id
    );
  };

  const showNext = () => {
    const nextIndex =
      selectedIndex ===
      systemCount - 1
        ? 0
        : selectedIndex + 1;

    setDirection(1);

    onSelect(
      systems[nextIndex].id
    );
  };

  const handleKeyDown = (
    event
  ) => {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        showPrevious();
        break;

      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        showNext();
        break;

      case "Home":
        event.preventDefault();
        setDirection(-1);
        onSelect(
          systems[0].id
        );
        break;

      case "End":
        event.preventDefault();
        setDirection(1);
        onSelect(
          systems[
            systemCount - 1
          ].id
        );
        break;

      default:
        break;
    }
  };

  const progress =
    systemCount > 0
      ? (selectedIndex + 1) /
        systemCount
      : 1;

  return (
    <div
      role="region"
      aria-label="Internship systems showcase"
      tabIndex={0}
      onKeyDown={
        handleKeyDown
      }
      className={[
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-cyan-200",
        "focus-visible:ring-offset-4",
        "focus-visible:ring-offset-slate-950",
      ].join(" ")}
    >
      <SystemSelector
        systems={systems}
        selectedSystemId={
          selectedSystem.id
        }
        onSelect={
          selectSystem
        }
      />

      <div
        className={[
          "relative mt-6",
          "overflow-hidden",
          "rounded-[2rem]",
          "border border-white/10",
          "bg-slate-950/45",
          "shadow-[0_32px_100px_rgba(0,0,0,0.3)]",
        ].join(" ")}
      >
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none",
            "absolute inset-0",
            "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.075),transparent_30rem)]",
          ].join(" ")}
        />

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none",
            "absolute inset-0",
            "bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.055),transparent_28rem)]",
          ].join(" ")}
        />

        {/* Showcase header */}
        <div
          className={[
            "relative z-20",
            "flex flex-col gap-4",
            "border-b border-white/[0.07]",
            "px-4 py-4",
            "sm:px-5",
            "md:flex-row",
            "md:items-center",
            "md:justify-between",
          ].join(" ")}
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Operations Command
                Center
              </p>

              <span
                className={[
                  "inline-flex items-center",
                  "gap-2 rounded-full",
                  "border border-emerald-300/15",
                  "bg-emerald-300/[0.06]",
                  "px-3 py-1",
                  "text-[0.56rem]",
                  "font-semibold uppercase",
                  "tracking-[0.14em]",
                  "text-emerald-200",
                ].join(" ")}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none" />

                Online
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Select a system or use
              the navigation controls
              to inspect each
              application.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={
                showPrevious
              }
              aria-label="Show previous internship system"
              className={[
                "inline-flex h-10 w-10",
                "items-center justify-center",
                "rounded-full border",
                "border-white/15",
                "bg-white/[0.035]",
                "text-slate-300",
                "transition duration-300",
                "hover:border-cyan-200/40",
                "hover:bg-cyan-300/[0.08]",
                "hover:text-white",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-cyan-200",
              ].join(" ")}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M15.5 10h-11m4.25-4.25L4.5 10l4.25 4.25"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="min-w-[7rem] text-center">
              <p
                aria-live="polite"
                className="font-mono text-xs font-semibold text-cyan-100"
              >
                {String(
                  selectedIndex + 1
                ).padStart(2, "0")}
                {" / "}
                {String(
                  systemCount
                ).padStart(2, "0")}
              </p>

              <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-slate-600">
                Active system
              </p>
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Show next internship system"
              className={[
                "inline-flex h-10 w-10",
                "items-center justify-center",
                "rounded-full border",
                "border-white/15",
                "bg-white/[0.035]",
                "text-slate-300",
                "transition duration-300",
                "hover:border-cyan-200/40",
                "hover:bg-cyan-300/[0.08]",
                "hover:text-white",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-cyan-200",
              ].join(" ")}
            >
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
            </button>
          </div>
        </div>

        {/* Active system panel */}
        <div className="relative z-10 p-3 sm:p-4 lg:p-5">
          <AnimatePresence
            initial={false}
            mode="wait"
          >
            <motion.div
              key={
                selectedSystem.id
              }
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      x:
                        direction > 0
                          ? 38
                          : -38,
                      scale: 0.985,
                      filter:
                        "blur(5px)",
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter:
                  "blur(0px)",
              }}
              exit={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      x:
                        direction > 0
                          ? -30
                          : 30,
                      scale: 0.99,
                      filter:
                        "blur(3px)",
                    }
              }
              transition={{
                duration:
                  reducedMotion
                    ? 0
                    : 0.55,
                ease:
                  MOTION_EASE,
              }}
            >
              <SelectedSystemPanel
                system={
                  selectedSystem
                }
                reducedMotion={
                  reducedMotion
                }
                onOpen={onOpen}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress and system status */}
        <div
          className={[
            "relative z-20",
            "border-t border-white/[0.07]",
            "px-4 pb-4 pt-3",
            "sm:px-5",
          ].join(" ")}
        >
          <div className="relative h-px overflow-hidden bg-white/[0.08]">
            <motion.div
              animate={{
                scaleX:
                  progress,
              }}
              transition={{
                duration:
                  reducedMotion
                    ? 0
                    : 0.45,
                ease:
                  MOTION_EASE,
              }}
              className={[
                "absolute inset-0",
                "origin-left",
                "bg-gradient-to-r",
                "from-cyan-400",
                "via-cyan-200",
                "to-indigo-300",
                "shadow-[0_0_14px_rgba(34,211,238,0.45)]",
              ].join(" ")}
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {systems.map(
              (
                system,
                index
              ) => {
                const active =
                  system.id ===
                  selectedSystem.id;

                return (
                  <button
                    key={
                      system.id
                    }
                    type="button"
                    onClick={() =>
                      selectSystem(
                        system.id
                      )
                    }
                    aria-label={`Show ${system.name}`}
                    aria-pressed={
                      active
                    }
                    className={[
                      "flex min-w-0",
                      "items-center gap-2",
                      "rounded-xl px-2",
                      "py-2 text-left",
                      "transition duration-300",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-cyan-200",
                      active
                        ? "bg-cyan-300/[0.06]"
                        : "hover:bg-white/[0.025]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "h-1.5 w-1.5",
                        "shrink-0",
                        "rounded-full",
                        "transition duration-300",
                        active
                          ? [
                              "bg-cyan-300",
                              "shadow-[0_0_10px_rgba(34,211,238,0.7)]",
                            ].join(" ")
                          : "bg-slate-700",
                      ].join(" ")}
                    />

                    <span
                      className={[
                        "min-w-0 truncate",
                        "text-[0.56rem]",
                        "font-semibold",
                        "uppercase",
                        "tracking-[0.1em]",
                        active
                          ? "text-cyan-100"
                          : "text-slate-700",
                      ].join(" ")}
                    >
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                      {" "}
                      {system.name}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate-600">
        Use the selector, navigation
        arrows, or keyboard arrow keys
        to review each system.
      </p>
    </div>
  );
}

function ImplementationAssembly({
  principles,
  reducedMotion,
}) {
  const directions = [
    "left",
    "right",
    "left",
    "right",
  ];

  return (
    <div className="relative">
      <motion.div
        aria-hidden="true"
        initial={
          reducedMotion
            ? false
            : {
                scaleY: 0,
                opacity: 0,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                scaleY: 1,
                opacity: 1,
              }
        }
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 1,
          ease: MOTION_EASE,
        }}
        className={[
          "pointer-events-none",
          "absolute bottom-[12%]",
          "left-1/2 top-[12%]",
          "hidden w-px",
          "origin-top",
          "-translate-x-1/2",
          "bg-gradient-to-b",
          "from-transparent",
          "via-cyan-300/30",
          "to-transparent",
          "md:block",
        ].join(" ")}
      />

      <motion.div
        aria-hidden="true"
        initial={
          reducedMotion
            ? false
            : {
                scaleX: 0,
                opacity: 0,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                scaleX: 1,
                opacity: 1,
              }
        }
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 1,
          delay: 0.1,
          ease: MOTION_EASE,
        }}
        className={[
          "pointer-events-none",
          "absolute left-[12%]",
          "right-[12%] top-1/2",
          "hidden h-px",
          "origin-left",
          "-translate-y-1/2",
          "bg-gradient-to-r",
          "from-transparent",
          "via-indigo-300/25",
          "to-transparent",
          "md:block",
        ].join(" ")}
      />

      <div className="relative grid gap-4 md:grid-cols-2">
        {principles.map(
          (
            principle,
            index
          ) => (
            <InformationCard
              key={
                principle.number
              }
              number={
                principle.number
              }
              title={
                principle.title
              }
              description={
                principle.description
              }
              direction={
                directions[
                  index
                ]
              }
              delay={
                index * 0.08
              }
              reducedMotion={
                reducedMotion
              }
            />
          )
        )}
      </div>

      <motion.div
        aria-hidden="true"
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                scale: 0.7,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                opacity: 1,
                scale: 1,
              }
        }
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.65,
          delay: 0.35,
          ease: MOTION_EASE,
        }}
        className={[
          "pointer-events-none",
          "absolute left-1/2",
          "top-1/2 hidden",
          "h-12 w-12",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "items-center justify-center",
          "rounded-full border",
          "border-cyan-300/20",
          "bg-slate-950",
          "text-cyan-200",
          "shadow-[0_0_25px_rgba(34,211,238,0.25)]",
          "md:flex",
        ].join(" ")}
      >
        <MonitorIcon />
      </motion.div>
    </div>
  );
}

function SystemSummaryCard({
  system,
  index,
  reducedMotion,
  onExplore,
  onOpen,
}) {
  const technologies =
    system.tech ??
    system.technologies ??
    [];

  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 60,
              scale: 0.95,
              rotate:
                index % 2 === 0
                  ? -0.8
                  : 0.8,
              filter: "blur(6px)",
            }
      }
      whileInView={
        reducedMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              filter: "blur(0px)",
            }
      }
      viewport={{
        once: true,
        amount: 0.15,
        margin:
          "0px 0px -10% 0px",
      }}
      transition={{
        duration: 0.76,
        delay:
          Math.min(
            index * 0.07,
            0.2
          ),
        ease: MOTION_EASE,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -5,
              scale: 1.004,
            }
      }
      className={[
        "relative overflow-hidden",
        "rounded-[2rem]",
        "border border-white/10",
        "bg-slate-950/90",
        "shadow-[0_32px_90px_rgba(0,0,0,0.38)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.065),transparent_26rem)]"
      />

      <div className="relative">
        <SystemVideoFrame
          system={system}
          reducedMotion={
            reducedMotion
          }
          active={false}
          onOpen={onOpen}
        />

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                {system.tagline}
              </p>

              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                {system.name}
              </h3>
            </div>

            <span
              aria-hidden="true"
              className="font-mono text-xs text-slate-600"
            >
              {String(
                index + 1
              ).padStart(
                2,
                "0"
              )}
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            {system.description}
          </p>

          {technologies.length >
          0 ? (
            <div className="mt-5">
              <CaseStudyTechList
                technologies={technologies.slice(
                  0,
                  5
                )}
                ariaLabel={`${system.name} primary technologies`}
              />
            </div>
          ) : null}

          <button
            type="button"
            onClick={() =>
              onExplore(
                system.id
              )
            }
            className={[
              "group mt-6",
              "inline-flex items-center",
              "gap-2 text-sm",
              "font-semibold",
              "text-cyan-200",
              "transition",
              "hover:text-cyan-100",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-cyan-200",
            ].join(" ")}
          >
            Explore this system

            <span className="transition-transform group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function CompleteSuiteDeck({
  systems,
  reducedMotion,
  onExplore,
  onOpen,
}) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute bottom-10",
          "left-1/2 top-10",
          "hidden w-px",
          "-translate-x-1/2",
          "bg-gradient-to-b",
          "from-cyan-300/25",
          "via-white/[0.06]",
          "to-indigo-300/20",
          "lg:block",
        ].join(" ")}
      />

      <div className="relative grid gap-7">
        {systems.map(
          (
            system,
            index
          ) => (
            <div
              key={system.id}
              className={[
                "relative",
                index > 0
                  ? "lg:-mt-8"
                  : "",
              ].join(" ")}
              style={{
                zIndex:
                  index + 1,
              }}
            >
              <SystemSummaryCard
                system={system}
                index={index}
                reducedMotion={
                  reducedMotion
                }
                onExplore={
                  onExplore
                }
                onOpen={onOpen}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

function MissingInternshipSystems() {
  return (
    <CaseStudyLayout projectLabel="Internship Systems Case Study">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-20 sm:px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.025] p-7 text-center sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Project data unavailable
          </p>

          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white">
            The Internship Systems
            Suite could not be loaded.
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Check that the centralized
            internship systems data still
            exports a systems array.
          </p>

          <a
            href="/#projects"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
          >
            Return to projects
          </a>
        </div>
      </section>
    </CaseStudyLayout>
  );
}

export default function InternshipSystemsCaseStudyV2() {
  const reducedMotion =
    useMediaQuery(
      "(prefers-reduced-motion: reduce)"
    );

  const systems = useMemo(
    () =>
      internshipSystems?.systems
        ?.filter(Boolean) ?? [],
    []
  );

  const [
    selectedSystemId,
    setSelectedSystemId,
  ] = useState(
    systems[0]?.id ?? ""
  );

  const [
    activeMedia,
    setActiveMedia,
  ] = useState(null);

  const {
    scrollYProgress,
  } = useScroll();

  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 105,
        damping: 28,
        mass: 0.22,
        restDelta: 0.001,
      }
    );

  const {
    previousProject,
    nextProject,
  } = getCaseStudyNeighbors(
    "internship-systems"
  );

  useEffect(() => {
    const previousTitle =
      document.title;

    document.title =
      "Internship Systems Case Study | Jay Mark Apelado";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return () => {
      document.title =
        previousTitle;
    };
  }, []);

  useEffect(() => {
    if (
      systems.length > 0 &&
      !systems.some(
        (system) =>
          system.id ===
          selectedSystemId
      )
    ) {
      setSelectedSystemId(
        systems[0].id
      );
    }
  }, [
    selectedSystemId,
    systems,
  ]);

  if (systems.length === 0) {
    return (
      <MissingInternshipSystems />
    );
  }

  const selectedSystem =
    systems.find(
      (system) =>
        system.id ===
        selectedSystemId
    ) ?? systems[0];

  const categories = [
    ...new Set(
      systems
        .map(
          (system) =>
            system.category
        )
        .filter(Boolean)
    ),
  ];

  const allTechnologies = [
    ...new Set(
      systems.flatMap(
        (system) =>
          system.tech ??
          system.technologies ??
          []
      )
    ),
  ];

  const overviewDescription =
    internshipSystems.description ??
    "A group of internal applications developed to support customer management, virtual-office operations, technical support, and inventory workflows.";

  const openSystemMedia = (
    system
  ) => {
    const videoSource =
      system.media?.video ??
      system.media?.src ??
      null;

    const posterSource =
      system.media?.cover ??
      system.media?.poster ??
      null;

    const mediaSource =
      videoSource ??
      posterSource;

    if (!mediaSource) {
      return;
    }

    setActiveMedia({
      type: videoSource
        ? "video"
        : "image",

      src: mediaSource,
      poster: posterSource,
      title: system.name,
      alt: `${system.name} interface preview`,
      caption:
        `${system.name} workflow and interface demonstration.`,
    });
  };

  const handleExploreSystem = (
    systemId
  ) => {
    setSelectedSystemId(
      systemId
    );

    window.requestAnimationFrame(
      () => {
        document
          .getElementById(
            "system-explorer"
          )
          ?.scrollIntoView({
            block: "start",
            behavior:
              reducedMotion
                ? "auto"
                : "smooth",
          });
      }
    );
  };

  const heroActions = [
    {
      label:
        "Explore the Systems",
      href:
        "#system-explorer",
      external: false,
    },
    {
      label:
        "Return to Projects",
      href:
        "/#projects",
      external: false,
    },
  ];

  const metadata = [
    {
      label: "Role",
      value:
        "Full-Stack Developer and IT Intern",
    },
    {
      label: "Systems",
      value: `${systems.length} operational applications`,
    },
    {
      label: "Context",
      value:
        "Internal company workflows",
    },
  ];

  const metrics = [
    {
      label:
        "Operational Systems",
      value:
        String(
          systems.length
        ),
      description:
        "Applications designed around distinct internal workflows.",
    },
    {
      label:
        "Workflow Areas",
      value:
        String(
          categories.length ||
          systems.length
        ),
      description:
        "Operational areas represented across the suite.",
    },
    {
      label:
        "Shared Goal",
      value:
        "Clearer Operations",
      description:
        "Better visibility, organization, and process consistency.",
    },
  ];

  return (
    <CaseStudyLayout projectLabel="Internship Systems Case Study">
      <motion.div
        aria-hidden="true"
        style={{
          scaleX:
            smoothProgress,
        }}
        className={[
          "fixed inset-x-0 top-0",
          "z-[100] h-[2px]",
          "origin-left",
          "bg-gradient-to-r",
          "from-cyan-400",
          "via-cyan-200",
          "to-indigo-300",
          "shadow-[0_0_16px_rgba(34,211,238,0.55)]",
        ].join(" ")}
      />

      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 32,
                filter: "blur(6px)",
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration:
            reducedMotion
              ? 0
              : 0.82,
          ease: MOTION_EASE,
        }}
      >
        <CaseStudyHero
          eyebrow="Operational Systems Case Study"
          title={
            internshipSystems.title ??
            "Internship Systems Suite"
          }
          subtitle={
            internshipSystems.subtitle ??
            "Four internal applications supporting real company workflows."
          }
          summary={
            overviewDescription
          }
          metadata={metadata}
          actions={heroActions}
          media={
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 34,
                      scale: 0.94,
                      filter:
                        "blur(7px)",
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter:
                  "blur(0px)",
              }}
              transition={{
                duration:
                  reducedMotion
                    ? 0
                    : 0.9,
                delay:
                  reducedMotion
                    ? 0
                    : 0.14,
                ease:
                  MOTION_EASE,
              }}
              className="relative"
            >
              <motion.div
                aria-hidden="true"
                initial={{
                  x: "-120%",
                }}
                animate={{
                  x: "150%",
                }}
                transition={{
                  duration:
                    reducedMotion
                      ? 0
                      : 1.35,
                  delay:
                    reducedMotion
                      ? 0
                      : 0.55,
                  ease:
                    MOTION_EASE,
                }}
                className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-xl"
              />

              <SystemVideoFrame
                system={
                  systems[0]
                }
                reducedMotion={
                  reducedMotion
                }
                active
                eager
                onOpen={
                  openSystemMedia
                }
              />

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {systems.map(
                  (
                    system,
                    index
                  ) => (
                    <motion.div
                      key={
                        system.id
                      }
                      initial={
                        reducedMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 10,
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration:
                          reducedMotion
                            ? 0
                            : 0.45,
                        delay:
                          reducedMotion
                            ? 0
                            : 0.5 +
                              index *
                                0.07,
                        ease:
                          MOTION_EASE,
                      }}
                      className={[
                        "rounded-xl border",
                        "border-white/10",
                        "bg-slate-950/60",
                        "px-3 py-2",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "h-1.5 w-1.5",
                            "rounded-full",
                            index === 0
                              ? [
                                  "animate-pulse",
                                  "bg-emerald-400",
                                  "motion-reduce:animate-none",
                                ].join(" ")
                              : "bg-slate-700",
                          ].join(" ")}
                        />

                        <span
                          className={[
                            "truncate",
                            "text-[0.58rem]",
                            "font-semibold uppercase",
                            "tracking-[0.12em]",
                            index === 0
                              ? "text-cyan-100"
                              : "text-slate-600",
                          ].join(" ")}
                        >
                          {
                            system.name
                          }
                        </span>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          }
        />
      </motion.div>

      <CaseStudySectionNav
        sections={
          INTERNSHIP_SECTIONS
        }
      />

      <CaseStudySection
        id="overview"
        headingId="internship-overview-heading"
        eyebrow="Project Overview"
        title="Connected applications built around day-to-day operational work."
        description="The suite demonstrates how different internal requirements can be translated into focused systems while maintaining consistent interface, data-management, and workflow patterns."
        tone="subtle"
      >
        <div className="relative grid gap-5 lg:grid-cols-2">
          <motion.div
            aria-hidden="true"
            initial={
              reducedMotion
                ? false
                : {
                    scaleX: 0,
                    opacity: 0,
                  }
            }
            whileInView={
              reducedMotion
                ? undefined
                : {
                    scaleX: 1,
                    opacity: 1,
                  }
            }
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.9,
              delay: 0.16,
              ease: MOTION_EASE,
            }}
            className="pointer-events-none absolute left-[42%] right-[42%] top-1/2 hidden h-px origin-center bg-gradient-to-r from-cyan-300/40 to-indigo-300/35 lg:block"
          />

          <InformationCard
            number="01"
            eyebrow="The Suite"
            title={`${systems.length} systems for distinct operational responsibilities.`}
            description={
              overviewDescription
            }
            direction="left"
            reducedMotion={
              reducedMotion
            }
          />

          <InformationCard
            number="02"
            eyebrow="My Contribution"
            title="Development and technical support within a professional environment."
            description="My work involved understanding operational requirements, developing application interfaces and workflows, handling data-driven functionality, testing system behavior, troubleshooting technical issues, and documenting completed work."
            direction="right"
            delay={0.08}
            reducedMotion={
              reducedMotion
            }
          />
        </div>

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 26,
                  scale: 0.985,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.18,
            ease: MOTION_EASE,
          }}
          className="mt-6"
        >
          <CaseStudyMetrics
            items={metrics}
            ariaLabel="Internship systems overview"
          />
        </motion.div>
      </CaseStudySection>

      <CaseStudySection
        id="challenge"
        headingId="internship-challenge-heading"
        eyebrow="Operational Challenge"
        title="Improving visibility and organization across internal processes."
        description="Each application addressed a different operational need, but the broader challenge remained consistent: make information easier to manage and work easier to track."
        tone="elevated"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {OPERATIONAL_CHALLENGES.map(
            (
              challenge,
              index
            ) => (
              <InformationCard
                key={
                  challenge.number
                }
                number={
                  challenge.number
                }
                title={
                  challenge.title
                }
                description={
                  challenge.description
                }
                direction={
                  index === 0
                    ? "left"
                    : index === 2
                      ? "right"
                      : "scale"
                }
                delay={
                  index * 0.1
                }
                reducedMotion={
                  reducedMotion
                }
                diagnostic
              />
            )
          )}
        </div>
      </CaseStudySection>

        <CaseStudySection
          id="system-explorer"
          headingId="system-explorer-heading"
          eyebrow="Operations Command Center"
          title="Inspect each system and the workflow it supports."
          description="Select an application or use the navigation controls to review its interface, purpose, capabilities, and technology stack."
          tone="subtle"
        >
        <ResponsiveSystemShowcase
          systems={systems}
          selectedSystemId={
            selectedSystem.id
          }
          onSelect={
            setSelectedSystemId
          }
          reducedMotion={
            reducedMotion
          }
          onOpen={
            openSystemMedia
          }
        />
      </CaseStudySection>

      <CaseStudySection
        id="implementation"
        headingId="internship-implementation-heading"
        eyebrow="Implementation Approach"
        title="Reusable technical patterns across different business needs."
        description="Although each system supports a separate process, the suite shares common ideas around structured information, role-aware actions, responsive interfaces, and maintainable workflows."
        tone="elevated"
      >
        <ImplementationAssembly
          principles={
            IMPLEMENTATION_PRINCIPLES
          }
          reducedMotion={
            reducedMotion
          }
        />

        {allTechnologies.length >
        0 ? (
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    scale: 0.985,
                  }
            }
            whileInView={
              reducedMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.72,
              delay: 0.18,
              ease: MOTION_EASE,
            }}
            className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Shared Technology Stack
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              Technologies used
              throughout the systems
              suite.
            </h3>

            <div className="mt-6">
              <CaseStudyTechList
                technologies={
                  allTechnologies
                }
                ariaLabel="Internship systems technology stack"
              />
            </div>
          </motion.div>
        ) : null}
      </CaseStudySection>

      <CaseStudySection
        id="system-gallery"
        headingId="system-gallery-heading"
        eyebrow="Complete Suite"
        title="Four systems addressing four operational workflows."
        description="The systems appear as a layered application deck, with each interface demonstration and centralized project description preserved."
        tone="subtle"
      >
        <CompleteSuiteDeck
          systems={systems}
          reducedMotion={
            reducedMotion
          }
          onExplore={
            handleExploreSystem
          }
          onOpen={
            openSystemMedia
          }
        />
      </CaseStudySection>

      <CaseStudySection
        id="outcomes"
        headingId="internship-outcomes-heading"
        eyebrow="What the Work Demonstrates"
        title="Building systems for actual processes, users, and constraints."
        description="The suite reflects the ability to move from operational requirements to working applications while also supporting the surrounding technical environment."
        tone="elevated"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <InformationCard
            number="01"
            eyebrow="Product Thinking"
            title="Translating workflows into usable interfaces."
            description="The systems organize real tasks, records, and responsibilities into interfaces that users can understand and operate."
            direction="left"
            reducedMotion={
              reducedMotion
            }
          />

          <InformationCard
            number="02"
            eyebrow="Technical Delivery"
            title="Connecting interface behavior with application data."
            description="The work combines frontend development, validation, data management, status handling, and operational logic."
            direction="scale"
            delay={0.08}
            reducedMotion={
              reducedMotion
            }
          />

          <InformationCard
            number="03"
            eyebrow="Professional Context"
            title="Supporting both applications and infrastructure."
            description="The internship combined software development with troubleshooting, device support, networking, server work, and documentation."
            direction="right"
            delay={0.16}
            reducedMotion={
              reducedMotion
            }
          />
        </div>

        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                  scale: 0.985,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.72,
            delay: 0.2,
            ease: MOTION_EASE,
          }}
          className={[
            "relative mt-6",
            "overflow-hidden",
            "rounded-3xl border",
            "border-cyan-300/15",
            "bg-cyan-300/[0.045]",
            "p-5 sm:p-6",
          ].join(" ")}
        >
          <motion.div
            aria-hidden="true"
            initial={
              reducedMotion
                ? false
                : {
                    scaleX: 0,
                  }
            }
            whileInView={
              reducedMotion
                ? undefined
                : {
                    scaleX: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              delay: 0.32,
              ease: MOTION_EASE,
            }}
            className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300 via-cyan-200/40 to-transparent"
          />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Confidentiality Note
            </p>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
              These systems were
              developed for internal
              operational use. The case
              study focuses on application
              structure, workflow design,
              interface behavior, and
              technical contribution
              without exposing private
              company records,
              credentials, or confidential
              operational data.
            </p>
          </div>
        </motion.div>
      </CaseStudySection>

      <CaseStudySection
        id="next-project"
        headingId="internship-next-project-heading"
        eyebrow="Continue Exploring"
        title="Explore the AI-assisted platform case study."
        description="TalkReady demonstrates a different side of my work through role-based learning workflows, AI-assisted assessment, platform administration, evaluation, and academic research."
        tone="subtle"
      >
        <CaseStudyPager
          previousProject={
            previousProject
          }
          nextProject={
            nextProject
          }
        />

        <div className="mt-6">
          <a
            href="/#contact"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            Discuss a Project
          </a>
        </div>
      </CaseStudySection>

      <CaseStudyMediaLightbox
        media={activeMedia}
        reducedMotion={
          reducedMotion
        }
        onClose={() =>
          setActiveMedia(null)
        }
      />
    </CaseStudyLayout>
  );
}