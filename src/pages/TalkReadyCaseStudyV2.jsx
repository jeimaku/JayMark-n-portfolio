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

import { featuredProjects } from "../data";

import {
  getCaseStudyNeighbors,
} from "../data/caseStudyNavigation";

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

const TALKREADY_SECTIONS = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "challenge",
    label: "Challenge",
  },
  {
    id: "solution",
    label: "Solution",
  },
  {
    id: "implementation",
    label: "Implementation",
  },
  {
    id: "outcomes",
    label: "Outcomes",
  },
  {
    id: "interface-gallery",
    label: "Interface",
  },
];

const PRODUCT_CHALLENGES = [
  {
    number: "01",
    title: "Supporting distinct user roles",
    description:
      "Students, trainers, and administrators needed different tools, permissions, dashboards, and workflows within one connected platform.",
  },
  {
    number: "02",
    title: "Making AI feedback useful",
    description:
      "Automated feedback needed to be clear enough for learners to understand while remaining connected to activities, assessments, and trainer review.",
  },
  {
    number: "03",
    title: "Maintaining operational visibility",
    description:
      "Administrators and trainers needed a practical way to manage users, classes, content, submissions, progress, and review activity.",
  },
];

const USER_WORKFLOWS = [
  {
    id: "student",
    number: "01",
    label: "Student Experience",
    title:
      "Practice, receive feedback, and track progress.",
    description:
      "Students complete structured language and speaking activities, review AI-assisted feedback, and monitor their development through an accessible learning interface.",
    capabilities: [
      "Learning and speaking activities",
      "AI-assisted assessment feedback",
      "Progress and performance visibility",
      "Role-specific student dashboard",
    ],
  },
  {
    id: "trainer",
    number: "02",
    label: "Trainer Experience",
    title:
      "Guide learners with clearer performance information.",
    description:
      "Trainers manage their learning environment, monitor student performance, review submitted work, and provide additional guidance where human review is needed.",
    capabilities: [
      "Class and learner management",
      "Performance monitoring",
      "Submission and activity review",
      "Trainer-led feedback workflows",
    ],
  },
  {
    id: "administrator",
    number: "03",
    label: "Administrator Experience",
    title:
      "Operate and oversee the complete platform.",
    description:
      "Administrators manage accounts, classes, platform activity, submitted content, reviews, archived records, appeals, and system-level monitoring.",
    capabilities: [
      "User and role administration",
      "Class and platform management",
      "Review and appeal workflows",
      "Analytics and activity monitoring",
    ],
  },
];

const IMPLEMENTATION_AREAS = [
  {
    number: "01",
    title: "Role-based architecture",
    description:
      "The platform separates student, trainer, and administrator permissions while keeping their workflows connected through shared application data.",
  },
  {
    number: "02",
    title: "AI-assisted assessment",
    description:
      "AI services support structured language and speech feedback while the surrounding interface keeps results understandable and reviewable.",
  },
  {
    number: "03",
    title: "Data-driven workflows",
    description:
      "Authentication, user records, classes, activities, submissions, reviews, and progress information are connected through centralized application data.",
  },
  {
    number: "04",
    title: "Responsive interface system",
    description:
      "Reusable components and responsive layouts provide a consistent experience across student, trainer, and administrator dashboards.",
  },
];

const MOTION_EASE = [
  0.22,
  1,
  0.36,
  1,
];

function ArrowRightIcon() {
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

function ArrowLeftIcon() {
  return (
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
        y: 12,
        rotate: -1.25,
        scale: 0.985,
        filter: "blur(5px)",
      };

    case "right":
      return {
        opacity: 0,
        x: 34,
        y: 12,
        rotate: 1.25,
        scale: 0.985,
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
  active = false,
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
        "bg-white/[0.025]",
        "p-5 sm:p-6",
        "shadow-[0_24px_70px_rgba(0,0,0,0.18)]",
        "transition-colors duration-300",
        active
          ? [
              "border-cyan-300/30",
              "bg-cyan-300/[0.045]",
            ].join(" ")
          : [
              "border-white/10",
              "hover:border-cyan-300/20",
              "hover:bg-white/[0.04]",
            ].join(" "),
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.075),transparent_18rem)]",
          active
            ? "opacity-100"
            : "opacity-55",
          "transition-opacity duration-500",
        ].join(" ")}
      />

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
          amount: 0.5,
        }}
        transition={{
          duration: 0.7,
          delay: delay + 0.12,
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
            animate={
              active
                ? {
                    scale: 1.12,
                    color:
                      "rgba(103,232,249,0.95)",
                  }
                : {
                    scale: 1,
                    color:
                      "rgba(71,85,105,1)",
                  }
            }
            transition={{
              duration: 0.35,
              ease: MOTION_EASE,
            }}
            className="shrink-0 font-mono text-xs"
          >
            {number}
          </motion.span>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

function WorkflowCapabilities({
  workflow,
  reducedMotion,
}) {
  return (
    <ul
      aria-label={`${workflow.label} capabilities`}
      className="mt-7 grid gap-3 sm:grid-cols-2"
    >
      {workflow.capabilities.map(
        (capability, index) => (
          <motion.li
            key={capability}
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
              duration: 0.5,
              delay:
                reducedMotion
                  ? 0
                  : 0.08 +
                    index * 0.06,
              ease: MOTION_EASE,
            }}
            className={[
              "flex gap-3 rounded-xl",
              "border border-white/10",
              "bg-slate-950/35",
              "px-4 py-3",
              "text-xs leading-6",
              "text-slate-300",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
            />

            {capability}
          </motion.li>
        )
      )}
    </ul>
  );
}

function RoleJourney({
  workflows,
  reducedMotion,
}) {
  const [activeWorkflowId, setActiveWorkflowId] =
    useState(
      workflows[0]?.id ?? ""
    );

  const stepRefs = useRef([]);

  const activeIndex = Math.max(
    0,
    workflows.findIndex(
      (workflow) =>
        workflow.id ===
        activeWorkflowId
    )
  );

  useEffect(() => {
    if (
      reducedMotion ||
      typeof IntersectionObserver ===
        "undefined"
    ) {
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (first, second) =>
                  second.intersectionRatio -
                  first.intersectionRatio
              );

          const leadingEntry =
            visibleEntries[0];

          const workflowId =
            leadingEntry?.target?.dataset
              ?.workflowId;

          if (workflowId) {
            setActiveWorkflowId(
              workflowId
            );
          }
        },
        {
          threshold: [
            0.2,
            0.4,
            0.6,
            0.8,
          ],
          rootMargin:
            "-24% 0px -42% 0px",
        }
      );

    stepRefs.current
      .filter(Boolean)
      .forEach((element) => {
        observer.observe(element);
      });

    return () => {
      observer.disconnect();
    };
  }, [
    reducedMotion,
    workflows.length,
  ]);

  const selectWorkflow = (
    workflowId
  ) => {
    setActiveWorkflowId(
      workflowId
    );

    const selectedStep =
      document.getElementById(
        `workflow-step-${workflowId}`
      );

    selectedStep?.scrollIntoView({
      behavior:
        reducedMotion
          ? "auto"
          : "smooth",
      block: "center",
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 p-4 backdrop-blur-xl sm:p-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.09),transparent_18rem)]"
          />

          <div className="relative">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Platform Journey
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Follow how TalkReady changes
              for each primary user role.
            </p>

            <div className="relative mt-6">
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-[0.95rem] top-4 w-px bg-white/10"
              />

              <motion.div
                aria-hidden="true"
                animate={{
                  height: `${
                    workflows.length > 1
                      ? (activeIndex /
                          (workflows.length -
                            1)) *
                        100
                      : 100
                  }%`,
                }}
                transition={{
                  duration:
                    reducedMotion
                      ? 0
                      : 0.5,
                  ease: MOTION_EASE,
                }}
                className="absolute left-[0.95rem] top-4 w-px bg-gradient-to-b from-cyan-300 to-indigo-300 shadow-[0_0_14px_rgba(34,211,238,0.5)]"
              />

              <div
                role="tablist"
                aria-label="TalkReady user roles"
                aria-orientation="vertical"
                className="relative grid gap-2"
              >
                {workflows.map(
                  (workflow, index) => {
                    const active =
                      workflow.id ===
                      activeWorkflowId;

                    return (
                      <button
                        key={workflow.id}
                        type="button"
                        role="tab"
                        aria-selected={
                          active
                        }
                        onClick={() =>
                          selectWorkflow(
                            workflow.id
                          )
                        }
                        className={[
                          "group relative flex",
                          "min-h-16 w-full",
                          "items-center gap-4",
                          "rounded-2xl px-2",
                          "text-left",
                          "transition duration-300",
                          "focus-visible:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-cyan-200",
                          active
                            ? "bg-cyan-300/[0.07]"
                            : "hover:bg-white/[0.035]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "relative z-10",
                            "flex h-8 w-8 shrink-0",
                            "items-center justify-center",
                            "rounded-full border",
                            "font-mono text-[0.6rem]",
                            "font-semibold",
                            "transition duration-300",
                            active
                              ? [
                                  "border-cyan-100",
                                  "bg-cyan-300",
                                  "text-slate-950",
                                  "shadow-[0_0_20px_rgba(34,211,238,0.55)]",
                                ].join(" ")
                              : [
                                  "border-white/15",
                                  "bg-slate-950",
                                  "text-slate-600",
                                  "group-hover:border-cyan-300/30",
                                ].join(" "),
                          ].join(" ")}
                        >
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="min-w-0">
                          <span
                            className={[
                              "block text-sm",
                              "font-semibold",
                              "transition-colors",
                              active
                                ? "text-white"
                                : "text-slate-400 group-hover:text-slate-200",
                            ].join(" ")}
                          >
                            {
                              workflow.label
                            }
                          </span>

                          <span className="mt-1 block text-xs text-slate-600">
                            {
                              workflow.id
                            }
                          </span>
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-6 top-0 hidden w-px bg-white/[0.07] sm:block lg:hidden"
        />

        <div className="grid gap-7 lg:gap-12">
          {workflows.map(
            (workflow, index) => {
              const active =
                workflow.id ===
                activeWorkflowId;

              return (
                <motion.article
                  key={workflow.id}
                  id={`workflow-step-${workflow.id}`}
                  data-workflow-id={
                    workflow.id
                  }
                  ref={(element) => {
                    stepRefs.current[
                      index
                    ] = element;
                  }}
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          x:
                            index % 2 ===
                            0
                              ? 34
                              : -34,
                          y: 26,
                          scale: 0.98,
                          filter:
                            "blur(6px)",
                        }
                  }
                  whileInView={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                          y: 0,
                          scale: 1,
                          filter:
                            "blur(0px)",
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.2,
                    margin:
                      "0px 0px -10% 0px",
                  }}
                  transition={{
                    duration: 0.72,
                    delay:
                      index * 0.06,
                    ease: MOTION_EASE,
                  }}
                  className={[
                    "relative",
                    "min-h-[26rem]",
                    "scroll-mt-32",
                    "overflow-hidden",
                    "rounded-[2rem]",
                    "border p-5",
                    "sm:p-7",
                    "lg:flex lg:min-h-[52vh]",
                    "lg:items-center",
                    "transition-colors duration-500",
                    active
                      ? [
                          "border-cyan-300/30",
                          "bg-cyan-300/[0.045]",
                          "shadow-[0_30px_90px_rgba(8,145,178,0.08)]",
                        ].join(" ")
                      : [
                          "border-white/10",
                          "bg-white/[0.025]",
                        ].join(" "),
                  ].join(" ")}
                >
                  <div
                    aria-hidden="true"
                    className={[
                      "pointer-events-none",
                      "absolute inset-0",
                      "bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_25rem)]",
                      active
                        ? "opacity-100"
                        : "opacity-35",
                      "transition-opacity duration-500",
                    ].join(" ")}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-300/45 to-transparent"
                  />

                  <div className="relative w-full">
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div>
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                          {
                            workflow.label
                          }
                        </p>

                        <h3 className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
                          {
                            workflow.title
                          }
                        </h3>
                      </div>

                      <motion.span
                        animate={{
                          scale:
                            active
                              ? 1.12
                              : 1,
                          opacity:
                            active
                              ? 1
                              : 0.45,
                        }}
                        transition={{
                          duration: 0.35,
                          ease:
                            MOTION_EASE,
                        }}
                        className="font-mono text-xs text-cyan-200"
                      >
                        {
                          workflow.number
                        }
                      </motion.span>
                    </div>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                      {
                        workflow.description
                      }
                    </p>

                    <AnimatePresence
                      mode="wait"
                    >
                      {active ? (
                        <motion.div
                          key={
                            workflow.id
                          }
                          initial={
                            reducedMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 14,
                                }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -10,
                          }}
                          transition={{
                            duration:
                              reducedMotion
                                ? 0
                                : 0.45,
                            ease:
                              MOTION_EASE,
                          }}
                        >
                          <WorkflowCapabilities
                            workflow={
                              workflow
                            }
                            reducedMotion={
                              reducedMotion
                            }
                          />
                        </motion.div>
                      ) : (
                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                          {workflow.capabilities
                            .slice(0, 2)
                            .map(
                              (
                                capability
                              ) => (
                                <div
                                  key={
                                    capability
                                  }
                                  className="flex gap-3 rounded-xl border border-white/[0.07] bg-slate-950/20 px-4 py-3 text-xs leading-6 text-slate-500"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700"
                                  />

                                  {
                                    capability
                                  }
                                </div>
                              )
                            )}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

function HighlightCard({
  highlight,
  index,
  reducedMotion,
}) {
  return (
    <motion.li
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x:
                index % 2 === 0
                  ? -24
                  : 24,
              y: 12,
            }
      }
      whileInView={
        reducedMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.58,
        delay: index * 0.07,
        ease: MOTION_EASE,
      }}
      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5"
    >
      <span className="font-mono text-xs text-cyan-300/70">
        {String(index + 1).padStart(
          2,
          "0"
        )}
      </span>

      <p className="text-sm leading-7 text-slate-300">
        {highlight}
      </p>
    </motion.li>
  );
}

function ImplementationFlow({
  areas,
  reducedMotion,
}) {
  return (
    <div className="relative">
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
          amount: 0.3,
        }}
        transition={{
          duration: 1,
          ease: MOTION_EASE,
        }}
        className={[
          "pointer-events-none",
          "absolute left-[15%]",
          "right-[15%] top-1/2",
          "hidden h-px origin-left",
          "-translate-y-1/2",
          "bg-gradient-to-r",
          "from-transparent",
          "via-cyan-300/35",
          "to-transparent",
          "md:block",
        ].join(" ")}
      />

      <div className="relative grid gap-4 md:grid-cols-2">
        {areas.map(
          (area, index) => (
            <InformationCard
              key={area.number}
              number={area.number}
              title={area.title}
              description={
                area.description
              }
              direction={
                index % 2 === 0
                  ? "left"
                  : "right"
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
    </div>
  );
}

function TalkReadyGallery({
  title,
  cover,
  gallery = [],
  onOpen,
  reducedMotion,
}) {
  const mediaItems = useMemo(() => {
    const items = [];

    if (cover) {
      items.push({
        src: cover,
        alt: `${title} landing page`,
        caption:
          "TalkReady’s public-facing platform and primary entry experience.",
      });
    }

    gallery.forEach(
      (item, index) => {
        if (
          typeof item === "string"
        ) {
          items.push({
            src: item,
            alt: `${title} interface screenshot ${
              index + 1
            }`,
            caption:
              "A view from one of TalkReady’s role-based application interfaces.",
          });

          return;
        }

        if (item?.src) {
          items.push({
            src: item.src,
            alt:
              item.alt ??
              `${title} interface screenshot ${
                index + 1
              }`,
            caption:
              item.caption ??
              "A view from one of TalkReady’s role-based application interfaces.",
          });
        }
      }
    );

    return items.filter(
      (
        item,
        index,
        collection
      ) =>
        collection.findIndex(
          (candidate) =>
            candidate.src ===
            item.src
        ) === index
    );
  }, [
    cover,
    gallery,
    title,
  ]);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);

  const [direction, setDirection] =
    useState(1);

  useEffect(() => {
    setSelectedIndex(0);
  }, [mediaItems.length]);

  const selectedItem =
    mediaItems[selectedIndex] ??
    mediaItems[0] ??
    null;

  const showItem = (
    nextIndex,
    nextDirection = 1
  ) => {
    if (
      mediaItems.length === 0
    ) {
      return;
    }

    const normalizedIndex =
      (
        nextIndex +
        mediaItems.length
      ) % mediaItems.length;

    setDirection(nextDirection);
    setSelectedIndex(
      normalizedIndex
    );
  };

  const showPrevious = () => {
    showItem(
      selectedIndex - 1,
      -1
    );
  };

  const showNext = () => {
    showItem(
      selectedIndex + 1,
      1
    );
  };

  const handleDragEnd = (
    event,
    information
  ) => {
    const offset =
      information.offset.x;

    const velocity =
      information.velocity.x;

    if (
      offset < -80 ||
      velocity < -500
    ) {
      showNext();
      return;
    }

    if (
      offset > 80 ||
      velocity > 500
    ) {
      showPrevious();
    }
  };

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "ArrowRight"
    ) {
      event.preventDefault();
      showNext();
    }

    if (
      event.key === "ArrowLeft"
    ) {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "Home") {
      event.preventDefault();
      showItem(0, -1);
    }

    if (event.key === "End") {
      event.preventDefault();

      showItem(
        mediaItems.length - 1,
        1
      );
    }
  };

  if (!selectedItem) {
    return (
      <CaseStudyMediaFrame
        src={null}
        alt={`${title} project preview unavailable`}
        caption="Project preview unavailable."
      />
    );
  }

  return (
    <div
      role="region"
      aria-label={`${title} interface gallery`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50">
        <AnimatePresence
          initial={false}
          mode="popLayout"
          custom={direction}
        >
          <motion.div
            key={selectedItem.src}
            custom={direction}
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
                      "blur(4px)",
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
                  }
            }
            transition={{
              duration:
                reducedMotion
                  ? 0
                  : 0.52,
              ease: MOTION_EASE,
            }}
            drag={
              reducedMotion
                ? false
                : "x"
            }
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.16}
            onDragEnd={
              handleDragEnd
            }
            className={[
              "relative cursor-grab",
              "active:cursor-grabbing",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() =>
                onOpen?.({
                  ...selectedItem,
                  type: "image",
                  title:
                    selectedItem.alt,
                })
              }
              aria-label={`Open ${selectedItem.alt} in a larger viewer`}
              className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-200"
            >
              <CaseStudyMediaFrame
                src={
                  selectedItem.src
                }
                alt={
                  selectedItem.alt
                }
                caption={
                  selectedItem.caption ??
                  "Select the preview to inspect the interface."
                }
                eager
                imageClassName="aspect-[16/10] select-none"
              />
            </button>
          </motion.div>
        </AnimatePresence>

        {mediaItems.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous interface"
              className={[
                "absolute left-4 top-1/2",
                "z-20 flex h-11 w-11",
                "-translate-y-1/2",
                "items-center justify-center",
                "rounded-full border",
                "border-white/15",
                "bg-slate-950/80",
                "text-white backdrop-blur",
                "transition duration-300",
                "hover:border-cyan-200/40",
                "hover:bg-cyan-300/10",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-cyan-200",
              ].join(" ")}
            >
              <ArrowLeftIcon />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Show next interface"
              className={[
                "absolute right-4 top-1/2",
                "z-20 flex h-11 w-11",
                "-translate-y-1/2",
                "items-center justify-center",
                "rounded-full border",
                "border-white/15",
                "bg-slate-950/80",
                "text-white backdrop-blur",
                "transition duration-300",
                "hover:border-cyan-200/40",
                "hover:bg-cyan-300/10",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-cyan-200",
              ].join(" ")}
            >
              <ArrowRightIcon />
            </button>
          </>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 p-4">
          <span className="rounded-full border border-white/10 bg-slate-950/75 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-300 backdrop-blur">
            Interface Browser
          </span>

          <span className="rounded-full border border-cyan-300/15 bg-slate-950/75 px-3 py-1.5 font-mono text-[0.62rem] text-cyan-100 backdrop-blur">
            {String(
              selectedIndex + 1
            ).padStart(2, "0")}
            {" / "}
            {String(
              mediaItems.length
            ).padStart(2, "0")}
          </span>
        </div>
      </div>

      {mediaItems.length > 1 ? (
        <>
          <p className="mt-3 text-center text-xs text-slate-600">
            Drag the preview, use the
            arrows, or select a thumbnail.
          </p>

          <div
            role="group"
            aria-label={`${title} screenshot selector`}
            className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {mediaItems.map(
              (item, index) => {
                const selected =
                  index ===
                  selectedIndex;

                return (
                  <button
                    key={item.src}
                    type="button"
                    aria-pressed={
                      selected
                    }
                    aria-label={`Show ${item.alt}`}
                    onClick={() => {
                      setDirection(
                        index >
                          selectedIndex
                          ? 1
                          : -1
                      );

                      setSelectedIndex(
                        index
                      );
                    }}
                    className={[
                      "relative overflow-hidden",
                      "rounded-xl border",
                      "bg-slate-950",
                      "transition duration-300",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-cyan-200",
                      selected
                        ? [
                            "border-cyan-300/70",
                            "shadow-[0_0_20px_rgba(34,211,238,0.12)]",
                          ].join(" ")
                        : [
                            "border-white/10",
                            "opacity-65",
                            "hover:border-white/30",
                            "hover:opacity-100",
                          ].join(" "),
                    ].join(" ")}
                  >
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className={[
                        "aspect-[4/3]",
                        "w-full object-cover",
                        "object-top",
                        "transition duration-500",
                        selected
                          ? "scale-100"
                          : "scale-[1.025]",
                      ].join(" ")}
                    />

                    <span
                      aria-hidden="true"
                      className={[
                        "absolute inset-0",
                        "ring-1 ring-inset",
                        selected
                          ? "ring-cyan-200/35"
                          : "ring-white/[0.025]",
                      ].join(" ")}
                    />
                  </button>
                );
              }
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

function MissingTalkReadyProject() {
  return (
    <CaseStudyLayout projectLabel="TalkReady Case Study">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-20 sm:px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.025] p-7 text-center sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Project data unavailable
          </p>

          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white">
            TalkReady could not be
            loaded.
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Check that the centralized
            project data still contains an
            entry with the ID
            <code className="mx-1 rounded bg-white/[0.05] px-1.5 py-0.5 text-cyan-100">
              talkready
            </code>
            .
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

export default function TalkReadyCaseStudyV2() {
  const [activeMedia, setActiveMedia] =
    useState(null);

  const reducedMotion =
    useMediaQuery(
      "(prefers-reduced-motion: reduce)"
    );

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
    "talkready"
  );

  const project =
    featuredProjects.find(
      (item) =>
        item.id === "talkready"
    ) ?? null;

  useEffect(() => {
    const previousTitle =
      document.title;

    document.title =
      "TalkReady Case Study | Jay Mark Apelado";

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

  if (!project) {
    return (
      <MissingTalkReadyProject />
    );
  }

  const technologies =
    project.tech ??
    project.technologies ??
    [];

  const gallery =
    project.media?.gallery ?? [];

  const heroMediaSource =
    project.media?.cover ??
    gallery[0]?.src ??
    gallery[0] ??
    null;

  const heroActions = [
    project.links?.live
      ? {
          label:
            "Open Live Platform",
          href:
            project.links.live,
          external: true,
        }
      : null,

    project.links?.github
      ? {
          label:
            "View Source Code",
          href:
            project.links.github,
          external: true,
        }
      : null,

    {
      label:
        "Explore the Case Study",
      href: "#overview",
      external: false,
    },
  ].filter(Boolean);

  const metadata = [
    {
      label: "Role",
      value:
        project.role ??
        "Full-Stack Developer and Team Lead",
    },
    {
      label: "Project Type",
      value:
        project.type ??
        "AI-Assisted Learning Platform",
    },
    {
      label: "Year",
      value:
        project.year ?? "2025",
    },
  ];

  return (
    <CaseStudyLayout projectLabel="TalkReady Case Study">
      <motion.div
        aria-hidden="true"
        style={{
          scaleX: smoothProgress,
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
                y: 34,
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
          eyebrow="Featured Platform Case Study"
          title={project.title}
          subtitle={
            project.subtitle
          }
          summary={
            project.description
          }
          metadata={metadata}
          actions={heroActions}
          media={
            heroMediaSource ? (
              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 38,
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
                  className={[
                    "pointer-events-none",
                    "absolute inset-y-0",
                    "left-0 z-20 w-1/3",
                    "bg-gradient-to-r",
                    "from-transparent",
                    "via-cyan-200/10",
                    "to-transparent",
                    "blur-xl",
                  ].join(" ")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setActiveMedia({
                      type: "image",
                      src:
                        heroMediaSource,
                      title: `${project.title} platform preview`,
                      alt: `${project.title} platform preview`,
                      caption:
                        "TalkReady’s production platform and role-based learning environment.",
                    })
                  }
                  aria-label={`Open ${project.title} platform preview`}
                  className="block w-full rounded-3xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  <CaseStudyMediaFrame
                    src={
                      heroMediaSource
                    }
                    alt={`${project.title} platform preview`}
                    caption="Select the preview to inspect the interface."
                    eager
                    imageClassName="aspect-[16/10]"
                  />
                </button>
              </motion.div>
            ) : (
              <CaseStudyMediaFrame
                src={null}
                alt={`${project.title} preview unavailable`}
                caption="Project preview unavailable."
              />
            )
          }
        />
      </motion.div>

      <CaseStudySectionNav
        sections={
          TALKREADY_SECTIONS
        }
      />

      <CaseStudySection
        id="overview"
        headingId="overview-heading"
        eyebrow="Project Overview"
        title="A connected learning platform for students, trainers, and administrators."
        description="TalkReady combines structured language-learning workflows, AI-assisted assessment, user management, review processes, and performance visibility in one role-based platform."
        tone="subtle"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <InformationCard
            number="01"
            eyebrow="The Product"
            title="An AI-assisted language and speaking platform."
            description={
              project.description
            }
            direction="left"
            reducedMotion={
              reducedMotion
            }
          />

          <InformationCard
            number="02"
            eyebrow="My Role"
            title={
              project.role ??
              "Full-Stack Developer and Team Lead"
            }
            description="My work covered full-stack implementation, application structure, role-based interfaces, AI-supported workflows, technical decision-making, integration, testing, and team coordination."
            direction="right"
            delay={0.08}
            reducedMotion={
              reducedMotion
            }
          />
        </div>

        {project.highlights?.length >
        0 ? (
          <ul
            aria-label={`${project.title} project highlights`}
            className="mt-5 grid gap-3 md:grid-cols-2"
          >
            {project.highlights.map(
              (
                highlight,
                index
              ) => (
                <HighlightCard
                  key={highlight}
                  highlight={
                    highlight
                  }
                  index={index}
                  reducedMotion={
                    reducedMotion
                  }
                />
              )
            )}
          </ul>
        ) : null}
      </CaseStudySection>

      <CaseStudySection
        id="challenge"
        headingId="challenge-heading"
        eyebrow="The Challenge"
        title="Designing one system around several connected responsibilities."
        description="The platform needed to provide useful experiences for learners, trainers, and administrators without allowing the complexity of the underlying workflows to overwhelm users."
        tone="elevated"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {PRODUCT_CHALLENGES.map(
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
                      : "up"
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
      </CaseStudySection>

      <CaseStudySection
        id="solution"
        headingId="solution-heading"
        eyebrow="Role-Based Solution"
        title="Different interfaces, connected through one platform."
        description="Scroll through the role journey or select a role directly to see how TalkReady changes for students, trainers, and administrators."
        tone="subtle"
      >
        <RoleJourney
          workflows={
            USER_WORKFLOWS
          }
          reducedMotion={
            reducedMotion
          }
        />
      </CaseStudySection>

      <CaseStudySection
        id="implementation"
        headingId="implementation-heading"
        eyebrow="Implementation"
        title="Turning the product requirements into a maintainable system."
        description="The implementation connects role-based access, application data, responsive interfaces, AI-assisted feedback, and administrative workflows."
        tone="elevated"
      >
        <ImplementationFlow
          areas={
            IMPLEMENTATION_AREAS
          }
          reducedMotion={
            reducedMotion
          }
        />

        {technologies.length > 0 ? (
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
              duration: 0.7,
              delay: 0.15,
              ease: MOTION_EASE,
            }}
            className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Technology Stack
            </p>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              Technologies used across
              the platform.
            </h3>

            <div className="mt-6">
              <CaseStudyTechList
                technologies={
                  technologies
                }
                ariaLabel={`${project.title} technology stack`}
              />
            </div>
          </motion.div>
        ) : null}
      </CaseStudySection>

      <CaseStudySection
        id="outcomes"
        headingId="outcomes-heading"
        eyebrow="Results and Validation"
        title="A working platform supported by evaluation and research."
        description="TalkReady was evaluated as a complete system and also supported academic research connected to AI-assisted language and speech learning."
        tone="subtle"
      >
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                  scale: 0.98,
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
            ease: MOTION_EASE,
          }}
        >
          <CaseStudyMetrics
            items={
              project.results ?? []
            }
            ariaLabel={`${project.title} project outcomes`}
          />
        </motion.div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <InformationCard
            number="01"
            eyebrow="Research Outcome"
            title="IEEE APWiMob 2025 acceptance"
            description="The research associated with TalkReady was accepted for IEEE APWiMob 2025, connecting the working platform to an academic study of AI-assisted language and speech learning."
            direction="left"
            reducedMotion={
              reducedMotion
            }
          />

          <motion.article
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: 34,
                    y: 14,
                    scale: 0.985,
                    filter:
                      "blur(5px)",
                  }
            }
            whileInView={
              reducedMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    filter:
                      "blur(0px)",
                  }
            }
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.72,
              delay: 0.08,
              ease: MOTION_EASE,
            }}
            className="relative overflow-hidden rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5 sm:p-6"
          >
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
                duration: 1.2,
                delay: 0.28,
                ease: MOTION_EASE,
              }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-xl"
            />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Product Principle
              </p>

              <blockquote className="mt-4">
                <p className="text-lg font-medium leading-8 tracking-[-0.015em] text-cyan-50">
                  “AI feedback should
                  support the learning
                  process, not make the
                  system harder for learners
                  and trainers to
                  understand.”
                </p>
              </blockquote>
            </div>
          </motion.article>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="interface-gallery"
        headingId="interface-gallery-heading"
        eyebrow="Platform Interface"
        title="A closer look at the role-based TalkReady experience."
        description="Drag the main preview, use the navigation arrows, or select a thumbnail to inspect the public platform and its student, trainer, administrator, analytics, and reporting interfaces."
        tone="elevated"
      >
        <TalkReadyGallery
          title={project.title}
          cover={
            project.media?.cover
          }
          gallery={gallery}
          onOpen={setActiveMedia}
          reducedMotion={
            reducedMotion
          }
        />
      </CaseStudySection>

      <CaseStudySection
        id="next-project"
        headingId="next-project-heading"
        eyebrow="Continue Exploring"
        title="See how the same systems thinking was applied to company operations."
        description="The Internship Systems Suite focuses on CRM, virtual-office, support-ticket, and inventory workflows developed for internal company use."
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