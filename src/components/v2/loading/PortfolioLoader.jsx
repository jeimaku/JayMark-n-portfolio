import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  heroContent,
} from "../../../data/heroContent";

const MOTION_EASE = [
  0.22,
  1,
  0.36,
  1,
];

const NORMAL_TIMING = {
  readyDelay: 1450,
  exitDelay: 1900,
};

const REDUCED_TIMING = {
  readyDelay: 450,
  exitDelay: 780,
};

function getInitials(name = "") {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "JM";
  }

  if (words.length === 1) {
    return words[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${words[0][0]}${
    words[words.length - 1][0]
  }`.toUpperCase();
}

function CornerMarker({
  position,
  reducedMotion,
}) {
  const positions = {
    topLeft:
      "left-5 top-5 border-l border-t sm:left-8 sm:top-8",

    topRight:
      "right-5 top-5 border-r border-t sm:right-8 sm:top-8",

    bottomLeft:
      "bottom-5 left-5 border-b border-l sm:bottom-8 sm:left-8",

    bottomRight:
      "bottom-5 right-5 border-b border-r sm:bottom-8 sm:right-8",
  };

  return (
    <motion.span
      aria-hidden="true"
      initial={
        reducedMotion
          ? {
              opacity: 0,
            }
          : {
              opacity: 0,
              scale: 0.8,
            }
      }
      animate={
        reducedMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 1,
              scale: 1,
            }
      }
      transition={{
        duration:
          reducedMotion
            ? 0.25
            : 0.55,

        delay:
          reducedMotion
            ? 0.05
            : 0.15,

        ease: MOTION_EASE,
      }}
      className={[
        "pointer-events-none",
        "absolute h-7 w-7",
        "border-cyan-200/25",
        positions[position],
      ].join(" ")}
    />
  );
}

function PortfolioMark({
  initials,
  isExiting,
  reducedMotion,
}) {
  const initialState =
    reducedMotion
      ? {
          opacity: 0,
        }
      : {
          opacity: 0,
          y: 18,
          scale: 0.9,
          filter: "blur(5px)",
        };

  const visibleState =
    reducedMotion
      ? {
          opacity: 1,
        }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        };

  const exitState =
    reducedMotion
      ? {
          opacity: 0,
        }
      : {
          opacity: 0,
          y: -10,
          scale: 0.96,
          filter: "blur(4px)",
        };

  return (
    <motion.div
      initial={initialState}
      animate={
        isExiting
          ? exitState
          : visibleState
      }
      transition={
        isExiting
          ? {
              duration:
                reducedMotion
                  ? 0.18
                  : 0.2,

              ease: MOTION_EASE,
            }
          : {
              duration:
                reducedMotion
                  ? 0.28
                  : 0.65,

              delay:
                reducedMotion
                  ? 0.05
                  : 0.12,

              ease: MOTION_EASE,
            }
      }
      className={[
        "relative mx-auto",
        "flex h-14 w-14",
        "items-center justify-center",
        "rounded-[1.15rem]",
        "border border-cyan-300/30",
        "bg-cyan-300/[0.075]",
        "font-mono text-sm",
        "font-semibold",
        "tracking-[0.12em]",
        "text-cyan-100",
        "shadow-[0_16px_55px_rgba(8,145,178,0.14)]",
        "sm:h-16 sm:w-16",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute inset-0",
          "rounded-[inherit]",
          "bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.14),transparent_70%)]",
        ].join(" ")}
      />

      <span className="relative">
        {initials}
      </span>

      <motion.span
        aria-hidden="true"
        initial={
          reducedMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                scale: 0,
              }
        }
        animate={
          isExiting
            ? reducedMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  scale: 0.5,
                }
            : reducedMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 1,
                  scale: 1,
                }
        }
        transition={{
          duration:
            reducedMotion
              ? 0.2
              : 0.35,

          delay:
            isExiting
              ? 0
              : reducedMotion
                ? 0.12
                : 0.65,

          ease: MOTION_EASE,
        }}
        className={[
          "absolute -right-1",
          "-top-1 h-3 w-3",
          "rounded-full",
          "border-2",
          "border-slate-950",
          "bg-emerald-400",
          "shadow-[0_0_14px_rgba(52,211,153,0.55)]",
        ].join(" ")}
      />
    </motion.div>
  );
}

function LoadingLine({
  phase,
  reducedMotion,
}) {
  const isReady =
    phase === "ready";

  const isExiting =
    phase === "exit";

  return (
    <motion.div
      animate={
        isExiting
          ? reducedMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                y: -8,
              }
          : {
              opacity: 1,
              y: 0,
            }
      }
      transition={{
        duration:
          reducedMotion
            ? 0.18
            : 0.2,

        ease: MOTION_EASE,
      }}
      className="mx-auto mt-9 w-full max-w-md"
    >
      <div className="relative h-px overflow-visible bg-white/[0.08]">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={
              reducedMotion
                ? {
                    opacity: 0,
                  }
                : {
                    scaleX: 0,
                  }
            }
            animate={
              reducedMotion
                ? {
                    opacity: 1,
                  }
                : {
                    scaleX: 1,
                  }
            }
            transition={{
              duration:
                reducedMotion
                  ? 0.25
                  : 1.05,

              delay:
                reducedMotion
                  ? 0.18
                  : 0.48,

              ease: MOTION_EASE,
            }}
            className={[
              "absolute inset-0",
              "origin-left",
              "bg-gradient-to-r",
              "from-cyan-400",
              "via-cyan-200",
              "to-indigo-300",
              "shadow-[0_0_18px_rgba(34,211,238,0.55)]",
            ].join(" ")}
          />
        </div>

        {!reducedMotion ? (
          <motion.span
            aria-hidden="true"
            initial={{
              left: "0%",
              opacity: 0,
            }}
            animate={{
              left: "100%",
              opacity: [
                0,
                1,
                1,
                0,
              ],
            }}
            transition={{
              duration: 1.05,
              delay: 0.48,
              ease: MOTION_EASE,
            }}
            className={[
              "absolute top-1/2",
              "h-2 w-2",
              "-translate-x-1/2",
              "-translate-y-1/2",
              "rounded-full",
              "bg-cyan-100",
              "shadow-[0_0_18px_rgba(103,232,249,0.95)]",
            ].join(" ")}
          />
        ) : null}
      </div>

      <div className="relative mt-3 flex min-h-5 items-center justify-between gap-4">
        <motion.p
          initial={{
            opacity: 0,
            x:
              reducedMotion
                ? 0
                : -10,
          }}
          animate={{
            opacity:
              isReady
                ? 0
                : 1,

            x:
              reducedMotion
                ? 0
                : isReady
                  ? -8
                  : 0,
          }}
          transition={{
            duration:
              reducedMotion
                ? 0.18
                : 0.3,

            delay:
              isReady
                ? 0
                : reducedMotion
                  ? 0.2
                  : 0.68,

            ease: MOTION_EASE,
          }}
          className={[
            "font-mono",
            "text-[0.55rem]",
            "font-semibold uppercase",
            "tracking-[0.2em]",
            "text-slate-600",
          ].join(" ")}
        >
          Initializing Experience
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            x:
              reducedMotion
                ? 0
                : 10,
          }}
          animate={
            isReady
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {
                  opacity: 0,
                  x:
                    reducedMotion
                      ? 0
                      : 10,
                }
          }
          transition={{
            duration:
              reducedMotion
                ? 0.18
                : 0.32,

            ease: MOTION_EASE,
          }}
          className={[
            "absolute right-0",
            "flex shrink-0",
            "items-center gap-2",
            "font-mono",
            "text-[0.55rem]",
            "font-semibold uppercase",
            "tracking-[0.18em]",
            "text-emerald-300/80",
          ].join(" ")}
        >
          <span className="relative flex h-1.5 w-1.5">
            {!reducedMotion ? (
              <span
                aria-hidden="true"
                className={[
                  "absolute inline-flex",
                  "h-full w-full",
                  "animate-ping",
                  "rounded-full",
                  "bg-emerald-400",
                  "opacity-40",
                ].join(" ")}
              />
            ) : null}

            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>

          System Ready
        </motion.div>
      </div>
    </motion.div>
  );
}

function LoaderIdentity({
  initials,
  phase,
  reducedMotion,
}) {
  const isExiting =
    phase === "exit";

  return (
    <motion.div
      animate={
        isExiting
          ? reducedMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                y: -24,
                scale: 0.985,
                filter: "blur(4px)",
              }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      transition={{
        duration:
          isExiting
            ? reducedMotion
              ? 0.18
              : 0.24
            : 0,

        ease: MOTION_EASE,
      }}
      className="relative mx-auto w-full max-w-3xl text-center"
    >
      <PortfolioMark
        initials={initials}
        isExiting={isExiting}
        reducedMotion={
          reducedMotion
        }
      />

      <motion.p
        initial={
          reducedMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                y: 14,
                filter: "blur(4px)",
              }
        }
        animate={
          reducedMotion
            ? {
                opacity: 1,
              }
            : {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }
        }
        transition={{
          duration:
            reducedMotion
              ? 0.25
              : 0.6,

          delay:
            reducedMotion
              ? 0.08
              : 0.32,

          ease: MOTION_EASE,
        }}
        className={[
          "mt-7",
          "text-[0.62rem]",
          "font-semibold uppercase",
          "tracking-[0.32em]",
          "text-cyan-200",
          "sm:text-xs",
          "sm:tracking-[0.4em]",
        ].join(" ")}
      >
        Portfolio Experience
      </motion.p>

      <div className="mt-4 overflow-hidden py-1">
        <motion.h1
          initial={
            reducedMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: "110%",
                  filter: "blur(6px)",
                }
          }
          animate={
            reducedMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 1,
                  y: "0%",
                  filter: "blur(0px)",
                }
          }
          transition={{
            duration:
              reducedMotion
                ? 0.28
                : 0.72,

            delay:
              reducedMotion
                ? 0.1
                : 0.38,

            ease: MOTION_EASE,
          }}
          className={[
            "text-3xl",
            "font-semibold",
            "uppercase",
            "leading-none",
            "tracking-[-0.045em]",
            "text-white",
            "sm:text-5xl",
            "md:text-6xl",
          ].join(" ")}
        >
          {heroContent.name}
        </motion.h1>
      </div>

      <div className="mx-auto mt-5 max-w-2xl overflow-hidden py-1">
        <motion.p
          initial={
            reducedMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: "100%",
                  filter: "blur(5px)",
                }
          }
          animate={
            reducedMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 1,
                  y: "0%",
                  filter: "blur(0px)",
                }
          }
          transition={{
            duration:
              reducedMotion
                ? 0.28
                : 0.65,

            delay:
              reducedMotion
                ? 0.14
                : 0.52,

            ease: MOTION_EASE,
          }}
          className={[
            "text-sm",
            "font-medium",
            "uppercase",
            "leading-7",
            "tracking-[0.12em]",
            "text-slate-400",
            "sm:text-base",
            "sm:tracking-[0.16em]",
            "md:text-lg",
          ].join(" ")}
        >
          {heroContent.role}
        </motion.p>
      </div>

      <LoadingLine
        phase={phase}
        reducedMotion={
          reducedMotion
        }
      />
    </motion.div>
  );
}

export default function PortfolioLoader({
  onComplete,
}) {
  const reducedMotionPreference =
    useReducedMotion();

  const reducedMotion =
    Boolean(
      reducedMotionPreference
    );

  const [
    phase,
    setPhase,
  ] = useState("enter");

  const completionCalledRef =
    useRef(false);

  const initials =
    getInitials(
      heroContent.name
    );

    /*
 * Temporarily lock manual page scrolling while
 * the startup experience is visible.
 *
 * Previous inline values are restored exactly
 * when the loader unmounts.
 *
 * We intentionally do not freeze the body using
 * position: fixed because ScrollToTop still needs
 * to resolve direct hash navigation underneath
 * the loader.
 */
useEffect(() => {
  const root =
    document.documentElement;

  const body =
    document.body;

  const previousRootOverflow =
    root.style.overflow;

  const previousRootOverscrollBehavior =
    root.style.overscrollBehavior;

  const previousRootScrollbarGutter =
    root.style.scrollbarGutter;

  const previousBodyOverflow =
    body.style.overflow;

  const previousBodyOverscrollBehavior =
    body.style.overscrollBehavior;

  root.style.overflow =
    "hidden";

  root.style.overscrollBehavior =
    "none";

  root.style.scrollbarGutter =
    "stable";

  body.style.overflow =
    "hidden";

  body.style.overscrollBehavior =
    "none";

  return () => {
    root.style.overflow =
      previousRootOverflow;

    root.style.overscrollBehavior =
      previousRootOverscrollBehavior;

    root.style.scrollbarGutter =
      previousRootScrollbarGutter;

    body.style.overflow =
      previousBodyOverflow;

    body.style.overscrollBehavior =
      previousBodyOverscrollBehavior;
  };
}, []);

  const isExiting =
    phase === "exit";

  const timing =
    reducedMotion
      ? REDUCED_TIMING
      : NORMAL_TIMING;

  useEffect(() => {
    const readyTimer =
      window.setTimeout(() => {
        setPhase("ready");
      }, timing.readyDelay);

    const exitTimer =
      window.setTimeout(() => {
        setPhase("exit");
      }, timing.exitDelay);

    return () => {
      window.clearTimeout(
        readyTimer
      );

      window.clearTimeout(
        exitTimer
      );
    };
  }, [
    timing.exitDelay,
    timing.readyDelay,
  ]);

  const handleAnimationComplete =
    () => {
      if (
        phase !== "exit" ||
        completionCalledRef.current
      ) {
        return;
      }

      completionCalledRef.current =
        true;

      onComplete?.();
    };

  return (
    <motion.div
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label="Portfolio introduction"
    initial={false}
    animate={
        isExiting
        ? reducedMotion
            ? {
                opacity: 0,
                y: "0%",
            }
            : {
                opacity: 1,
                y: "-100%",
            }
        : {
            opacity: 1,
            y: "0%",
            }
    }
      transition={
        isExiting
          ? reducedMotion
            ? {
                duration: 0.24,
                ease: MOTION_EASE,
              }
            : {
                duration: 0.52,
                delay: 0.1,
                ease: MOTION_EASE,
              }
          : {
              duration:
                reducedMotion
                  ? 0.18
                  : 0.25,

              ease: MOTION_EASE,
            }
      }
      onAnimationComplete={
        handleAnimationComplete
      }
        className={[
        "fixed inset-0",
        "z-[200]",
        "isolate",
        "pointer-events-auto",
        "flex min-h-[100dvh]",
        "items-center",
        "justify-center",
        "overflow-hidden",
        "bg-slate-950",
        "px-5 py-10",
        "text-slate-50",
        "sm:px-8",
        ].join(" ")}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute inset-0",
          "-z-30",
          "opacity-[0.035]",
          "[background-image:linear-gradient(",
          "rgba(148,163,184,0.45)_1px,",
          "transparent_1px),",
          "linear-gradient(90deg,",
          "rgba(148,163,184,0.45)_1px,",
          "transparent_1px)]",
          "[background-size:72px_72px]",
        ].join("")}
      />

      {/* Cyan atmosphere */}
      <motion.div
        aria-hidden="true"
        initial={
          reducedMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                scale: 0.8,
              }
        }
        animate={
          isExiting
            ? reducedMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  scale: 1.08,
                }
            : reducedMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 1,
                  scale: 1,
                }
        }
        transition={{
          duration:
            reducedMotion
              ? 0.25
              : isExiting
                ? 0.35
                : 1.2,

          ease: MOTION_EASE,
        }}
        className={[
          "pointer-events-none",
          "absolute left-1/2",
          "top-1/2 -z-20",
          "h-[30rem] w-[30rem]",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "rounded-full",
          "bg-cyan-400/[0.075]",
          "blur-3xl",
          "sm:h-[38rem]",
          "sm:w-[38rem]",
        ].join(" ")}
      />

      {/* Indigo atmosphere */}
      <motion.div
        aria-hidden="true"
        initial={
          reducedMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                scale: 0.7,
              }
        }
        animate={
          isExiting
            ? reducedMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  scale: 1.08,
                }
            : {
                opacity: 0.7,
                scale: 1,
              }
        }
        transition={{
          duration:
            reducedMotion
              ? 0.25
              : isExiting
                ? 0.35
                : 1.15,

          delay:
            reducedMotion ||
            isExiting
              ? 0
              : 0.12,

          ease: MOTION_EASE,
        }}
        className={[
          "pointer-events-none",
          "absolute left-[58%]",
          "top-[52%] -z-20",
          "h-[22rem] w-[22rem]",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "rounded-full",
          "bg-indigo-400/[0.055]",
          "blur-3xl",
        ].join(" ")}
      />

      {/* Top edge */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute inset-x-0",
          "top-0 h-px",
          "bg-gradient-to-r",
          "from-transparent",
          "via-cyan-300/30",
          "to-transparent",
        ].join(" ")}
      />

      {/* Bottom reveal edge */}
      <motion.div
        aria-hidden="true"
        animate={{
          opacity:
            isExiting
              ? 1
              : 0.5,
        }}
        transition={{
          duration:
            reducedMotion
              ? 0.15
              : 0.25,

          ease: MOTION_EASE,
        }}
        className={[
          "pointer-events-none",
          "absolute inset-x-0",
          "bottom-0 h-px",
          "bg-gradient-to-r",
          "from-transparent",
          "via-cyan-200/70",
          "to-transparent",
          isExiting &&
          !reducedMotion
            ? "shadow-[0_18px_45px_rgba(34,211,238,0.22)]"
            : "",
        ].join(" ")}
      />

      <CornerMarker
        position="topLeft"
        reducedMotion={
          reducedMotion
        }
      />

      <CornerMarker
        position="topRight"
        reducedMotion={
          reducedMotion
        }
      />

      <CornerMarker
        position="bottomLeft"
        reducedMotion={
          reducedMotion
        }
      />

      <CornerMarker
        position="bottomRight"
        reducedMotion={
          reducedMotion
        }
      />

      {/* Top metadata */}
      <motion.div
        initial={
          reducedMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                y: -10,
              }
        }
        animate={
          isExiting
            ? reducedMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: -8,
                }
            : reducedMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 1,
                  y: 0,
                }
        }
        transition={
          isExiting
            ? {
                duration: 0.18,
                ease: MOTION_EASE,
              }
            : {
                duration:
                  reducedMotion
                    ? 0.22
                    : 0.5,

                delay:
                  reducedMotion
                    ? 0.04
                    : 0.15,

                ease: MOTION_EASE,
              }
        }
        className={[
          "absolute inset-x-5",
          "top-5 flex",
          "items-center",
          "justify-between",
          "gap-5",
          "sm:inset-x-8",
          "sm:top-8",
        ].join(" ")}
      >
        <p
          className={[
            "font-mono",
            "text-[0.52rem]",
            "font-semibold uppercase",
            "tracking-[0.22em]",
            "text-slate-600",
            "sm:text-[0.58rem]",
          ].join(" ")}
        >
          Portfolio / 2026
        </p>

        <div
          className={[
            "flex items-center gap-2",
            "font-mono",
            "text-[0.52rem]",
            "font-semibold uppercase",
            "tracking-[0.18em]",
            "text-cyan-200/65",
            "sm:text-[0.58rem]",
          ].join(" ")}
        >
          <span className="h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(34,211,238,0.7)]" />

          Developer System
        </div>
      </motion.div>

      {/* Main identity */}
      <LoaderIdentity
        initials={initials}
        phase={phase}
        reducedMotion={
          reducedMotion
        }
      />

      {/* Bottom system note */}
      <motion.p
        initial={
          reducedMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                y: 8,
              }
        }
        animate={
          isExiting
            ? reducedMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: 8,
                }
            : reducedMotion
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 1,
                  y: 0,
                }
        }
        transition={
          isExiting
            ? {
                duration: 0.18,
                ease: MOTION_EASE,
              }
            : {
                duration:
                  reducedMotion
                    ? 0.22
                    : 0.45,

                delay:
                  reducedMotion
                    ? 0.14
                    : 0.9,

                ease: MOTION_EASE,
              }
        }
        className={[
          "absolute bottom-5",
          "left-1/2",
          "w-full",
          "max-w-md",
          "-translate-x-1/2",
          "px-5 text-center",
          "font-mono",
          "text-[0.5rem]",
          "uppercase",
          "tracking-[0.18em]",
          "text-slate-700",
          "sm:bottom-8",
          "sm:text-[0.56rem]",
        ].join(" ")}
      >
        Full-Stack Development · IT Systems · Product Engineering
      </motion.p>
    </motion.div>
  );
}