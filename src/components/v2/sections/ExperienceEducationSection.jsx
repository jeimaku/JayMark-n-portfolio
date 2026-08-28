import {
  motion,
  useTransform,
} from "motion/react";

import Container from "../../layout/Container";
import SectionHeading from "../../ui/SectionHeading";

import ExperienceGallery from "./ExperienceGallery";

import {
  StaggerItem,
  StaggerReveal,
} from "../motion";

import {
  education,
  experience,
  homepageContent,
} from "../../../data";

import useExperienceEducationMotion from "../../../hooks/useExperienceEducationMotion";

function BriefcaseIcon({
  className = "h-5 w-5",
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M9 7V5.75C9 4.78 9.78 4 10.75 4h2.5C14.22 4 15 4.78 15 5.75V7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M5.5 7h13A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-9A1.5 1.5 0 0 1 5.5 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M4 11.5c2.65 1.15 5.32 1.73 8 1.73s5.35-.58 8-1.73M10 13.15v1.7h4v-1.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EducationIcon({
  className = "h-5 w-5",
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="m3.5 9 8.5-4 8.5 4-8.5 4-8.5-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M7 11v4.25C7 16.77 9.24 18 12 18s5-1.23 5-2.75V11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M20.5 9v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon({
  className = "h-4 w-4",
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M4 5.5h12v10H4v-10ZM6.5 3.5v4M13.5 3.5v4M4 8.5h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BuildingIcon({
  className = "h-4 w-4",
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M4 16.5V4.25h8v12.25M12 8h4v8.5M6.5 7h1M9.5 7h1M6.5 10h1M9.5 10h1M6.5 13h1M9.5 13h1M3 16.5h14"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({
  className = "h-4 w-4",
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="m5 10.25 3.1 3.1L15.5 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon({
  className = "h-5 w-5",
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3H11v16H7.5A2.5 2.5 0 0 0 5 21.5v-16ZM19 5.5A2.5 2.5 0 0 0 16.5 3H13v16h3.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function normalizeStringList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item) =>
      typeof item === "string" &&
      item.trim().length > 0
  );
}

function getFeaturedExperience() {
  const selectedItems =
    homepageContent.featuredExperienceIds
      ?.map((id) =>
        experience.find(
          (item) => item.id === id
        )
      )
      .filter(Boolean) ?? [];

  if (selectedItems.length > 0) {
    return selectedItems;
  }

  return experience
    .filter(Boolean)
    .slice(0, 3);
}

function getEducationLogo(item) {
  const providedLogo =
    item.logo ??
    item.logoUrl ??
    item.image ??
    item.schoolLogo ??
    null;

  if (providedLogo) {
    return providedLogo;
  }

  const schoolName =
    item.school?.toLowerCase() ?? "";

  if (
    schoolName.includes(
      "national university"
    )
  ) {
    return "/old-portfolio-assets/logos/nu-dasma-logo.png";
  }

  if (
    schoolName.includes(
      "perpetual"
    )
  ) {
    return "/old-portfolio-assets/logos/perpetual-help-logo.png";
  }

  return null;
}

function ExperienceBadge({
  children,
}) {
  if (!children) {
    return null;
  }

  return (
    <span className="inline-flex rounded-full border border-neutral-100/20 bg-neutral-100/[0.07] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-neutral-100">
      {children}
    </span>
  );
}

function ExperienceMeta({
  item,
  index,
  compact = false,
}) {
  return (
    <div
      className={[
        compact
          ? "mt-4 flex flex-wrap gap-x-5 gap-y-2"
          : "space-y-3",
      ].join(" ")}
    >
      {item.organization ? (
        <div className="flex items-start gap-2 text-sm leading-6 text-neutral-400">
          <BuildingIcon className="mt-1 h-4 w-4 shrink-0 text-white/75" />

          <span>
            {item.organization}
          </span>
        </div>
      ) : null}

      {item.period ? (
        <div className="flex items-start gap-2 text-sm leading-6 text-neutral-500">
          <CalendarIcon className="mt-1 h-4 w-4 shrink-0 text-neutral-500" />

          <span>{item.period}</span>
        </div>
      ) : null}

      {!compact ? (
        <p className="font-mono text-xs text-neutral-700">
          Entry{" "}
          {String(index + 1).padStart(
            2,
            "0"
          )}
        </p>
      ) : null}
    </div>
  );
}

function ExperienceHighlights({
  item,
}) {
  const highlights =
    normalizeStringList(
      item.highlights
    ).slice(0, 4);

  if (highlights.length === 0) {
    return null;
  }

  return (
    <StaggerReveal
      className="mt-6 grid gap-3 sm:grid-cols-2"
    >
      {highlights.map(
        (highlight) => (
          <StaggerItem
            key={highlight}
            className="h-full"
          >
            <li className="flex h-full gap-3 rounded-2xl border border-white/10 bg-neutral-950/35 p-4 text-sm leading-6 text-neutral-300">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-neutral-100/20 bg-neutral-100/[0.07] text-white">
                <CheckIcon className="h-3 w-3" />
              </span>

              <span>{highlight}</span>
            </li>
          </StaggerItem>
        )
      )}
    </StaggerReveal>
  );
}

function ExperienceCard({
  item,
  index,
  scrollYProgress,
  active,
  completed,
  allowEntranceMotion,
  allowScrollLinkedMotion,
  allowComplexMotion,
}) {
  const parallaxDistance =
    allowComplexMotion
      ? 14 + index * 4
      : 4;

  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      parallaxDistance,
      -parallaxDistance,
    ]
  );

  const iconY = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0
      ? [6, -6]
      : [-6, 6]
  );

  const entersFromLeft =
    index % 2 === 0;

  const cardElement = (
    <motion.article
      style={
        allowScrollLinkedMotion
          ? {
              y: cardY,
            }
          : undefined
      }
      initial={
        allowEntranceMotion
          ? {
              opacity: 0,
              x: allowComplexMotion
                ? entersFromLeft
                  ? -54
                  : 54
                : 0,
              y: 26,
              scale: 0.985,
              filter: "blur(6px)",
            }
          : false
      }
      whileInView={
        allowEntranceMotion
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
          : undefined
      }
      viewport={{
        once: true,
        amount: 0.18,
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        duration: 0.72,
        delay: Math.min(
          index * 0.07,
          0.2
        ),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-w-0 will-change-transform"
    >
      <motion.div
        whileHover={
          allowComplexMotion
            ? {
                y: -4,
                scale: 1.008,
                rotateY:
                  entersFromLeft
                    ? -0.75
                    : 0.75,
              }
            : undefined
        }
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition duration-300 hover:border-neutral-100/25 hover:bg-white/[0.045] sm:p-6"
      >
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0",
            "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.085),transparent_20rem)]",
            active
              ? "opacity-100"
              : "opacity-35",
            "transition-opacity duration-500",
          ].join(" ")}
        />

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 top-0 h-px",
            "bg-gradient-to-r from-transparent via-white/50 to-transparent",
            active
              ? "opacity-100"
              : "opacity-0",
            "transition-opacity duration-500",
          ].join(" ")}
        />

        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <ExperienceBadge>
                {item.badge ??
                  item.type ??
                  "Experience"}
              </ExperienceBadge>

              <h3 className="mt-5 break-safe text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
                {item.title}
              </h3>
            </div>

            <motion.div
              style={
                allowScrollLinkedMotion
                  ? {
                      y: iconY,
                    }
                  : undefined
              }
              className={[
                "flex h-12 w-12 shrink-0",
                "items-center justify-center",
                "rounded-2xl border",
                active
                  ? "border-white/35 bg-neutral-100/[0.14] text-neutral-100"
                  : completed
                    ? "border-neutral-100/20 bg-neutral-100/[0.08] text-white"
                    : "border-white/10 bg-white/[0.035] text-neutral-500",
                "transition duration-500",
              ].join(" ")}
            >
              <BriefcaseIcon />
            </motion.div>
          </div>

          <ExperienceMeta
            item={item}
            index={index}
            compact
          />

          {item.description ? (
            <p className="mt-5 text-sm leading-7 text-neutral-400 sm:text-base">
              {item.description}
            </p>
          ) : null}

          <ul>
            <ExperienceHighlights
              item={item}
            />
          </ul>
        </div>
      </motion.div>
    </motion.article>
  );

  return (
    <li className="relative grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)]">
      {/* Mobile timeline node */}
      <div
        aria-hidden="true"
        className="absolute left-[1.05rem] top-8 z-10 lg:hidden"
      >
        <span
          className={[
            "flex h-7 w-7 items-center justify-center rounded-full border",
            active
              ? "border-white bg-neutral-100 text-neutral-950 shadow-[0_0_22px_rgba(255,255,255,0.18)]"
              : completed
                ? "border-neutral-100/40 bg-neutral-100/[0.12] text-white"
                : "border-white/15 bg-neutral-950 text-neutral-600",
            "transition duration-500",
          ].join(" ")}
        >
          <span className="font-mono text-[0.58rem] font-semibold">
            {String(index + 1).padStart(
              2,
              "0"
            )}
          </span>
        </span>
      </div>

      <div className="ml-12 lg:ml-0">
        {entersFromLeft ? (
          cardElement
        ) : (
          <div className="hidden lg:block">
            <ExperienceMeta
              item={item}
              index={index}
            />
          </div>
        )}
      </div>

      {/* Desktop timeline checkpoint */}
      <div
        aria-hidden="true"
        className="relative hidden min-h-full justify-center lg:flex"
      >
        <span
          className={[
            "relative z-10 mt-8 flex h-10 w-10",
            "items-center justify-center rounded-full border",
            active
              ? "border-neutral-100 bg-neutral-100 text-neutral-950 shadow-[0_0_28px_rgba(255,255,255,0.2)]"
              : completed
                ? "border-neutral-100/40 bg-neutral-100/[0.12] text-neutral-100"
                : "border-white/15 bg-neutral-950 text-neutral-600",
            "transition duration-500",
          ].join(" ")}
        >
          <span className="font-mono text-[0.62rem] font-semibold">
            {String(index + 1).padStart(
              2,
              "0"
            )}
          </span>
        </span>
      </div>

      <div className="ml-12 lg:ml-0">
        {!entersFromLeft ? (
          cardElement
        ) : (
          <div className="hidden text-right lg:block">
            <ExperienceMeta
              item={item}
              index={index}
            />
          </div>
        )}
      </div>
    </li>
  );
}

function EducationAchievement({
  achievement,
}) {
  return (
    <li className="inline-flex rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold leading-5 text-neutral-300">
      {achievement}
    </li>
  );
}

function EducationCard({
  item,
  index,
  scrollYProgress,
  allowEntranceMotion,
  allowScrollLinkedMotion,
  allowComplexMotion,
}) {
  const logoSource =
    getEducationLogo(item);

  const achievements =
    normalizeStringList(
      item.achievements
    );

  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0
      ? [18, -20]
      : [26, -12]
  );

  const logoY = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0
      ? [8, -8]
      : [-8, 8]
  );

  return (
    <motion.article
      style={
        allowScrollLinkedMotion
          ? {
              y: cardY,
            }
          : undefined
      }
      initial={
        allowEntranceMotion
          ? {
              opacity: 0,
              x: allowComplexMotion
                ? index % 2 === 0
                  ? -38
                  : 38
                : 0,
              y: 28,
              scale: 0.98,
              filter: "blur(6px)",
            }
          : false
      }
      whileInView={
        allowEntranceMotion
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
          : undefined
      }
      viewport={{
        once: true,
        amount: 0.16,
        margin: "0px 0px -8% 0px",
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full will-change-transform"
    >
      <motion.div
        whileHover={
          allowComplexMotion
            ? {
                y: -5,
                scale: 1.008,
              }
            : undefined
        }
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.22)] transition duration-300 hover:border-neutral-100/25 hover:bg-white/[0.045] sm:p-7"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,163,163,0.075),transparent_22rem)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-300/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-5">
            <motion.div
              style={
                allowScrollLinkedMotion
                  ? {
                      y: logoY,
                    }
                  : undefined
              }
              className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-[0_16px_38px_rgba(0,0,0,0.18)]"
            >
              {logoSource ? (
                <img
                  src={logoSource}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              ) : (
                <EducationIcon className="h-8 w-8 text-white" />
              )}
            </motion.div>

            <span className="font-mono text-xs text-neutral-700">
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </span>
          </div>

          {item.status ? (
            <span className="mt-6 inline-flex rounded-full border border-neutral-400/20 bg-neutral-400/[0.07] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-neutral-100">
              {item.status}
            </span>
          ) : null}

          <h3 className="mt-5 break-safe text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
            {item.level ??
              item.degree ??
              "Education"}
          </h3>

          {item.degree &&
          item.degree !== item.level ? (
            <p className="mt-3 text-base font-medium leading-7 text-neutral-100/90">
              {item.degree}
            </p>
          ) : null}

          {item.specialization ? (
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              Specialization:{" "}
              {item.specialization}
            </p>
          ) : null}

          <div className="mt-5 space-y-2 border-y border-white/10 py-5">
            {item.school ? (
              <div className="flex items-start gap-3 text-sm leading-6 text-neutral-300">
                <BuildingIcon className="mt-1 h-4 w-4 shrink-0 text-white/75" />

                <span>{item.school}</span>
              </div>
            ) : null}

            {item.year ? (
              <div className="flex items-start gap-3 text-sm leading-6 text-neutral-500">
                <CalendarIcon className="mt-1 h-4 w-4 shrink-0" />

                <span>{item.year}</span>
              </div>
            ) : null}
          </div>

          {item.description ? (
            <p className="mt-5 text-sm leading-7 text-neutral-400">
              {item.description}
            </p>
          ) : null}

          {achievements.length > 0 ? (
            <ul
              aria-label={`${item.school ?? item.level} achievements`}
              className="mt-6 flex flex-wrap gap-2"
            >
              {achievements.map(
                (achievement) => (
                  <EducationAchievement
                    key={achievement}
                    achievement={
                      achievement
                    }
                  />
                )
              )}
            </ul>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function ExperienceEducationSection() {
  const featuredExperience =
    getFeaturedExperience();

  const educationItems =
    education.filter(Boolean);

  const {
    sectionRef,
    scrollYProgress,
    activeExperienceIndex,

    headingStyle,
    timelineStyle,
    educationBridgeStyle,
    primaryGlowStyle,
    secondaryGlowStyle,

    allowEntranceMotion,
    allowScrollLinkedMotion,
    allowComplexMotion,
  } = useExperienceEducationMotion({
    experienceCount:
      featuredExperience.length,
  });

  return (
    <div
      ref={sectionRef}
      data-experience-education-motion=""
      className="relative isolate overflow-hidden"
    >
      {/* Ambient technical lighting */}
      <motion.div
        aria-hidden="true"
        style={primaryGlowStyle}
        className="pointer-events-none absolute -left-40 top-[8%] -z-20 h-[34rem] w-[34rem] rounded-full bg-neutral-300/[0.07] blur-3xl will-change-transform"
      />

      <motion.div
        aria-hidden="true"
        style={secondaryGlowStyle}
        className="pointer-events-none absolute -right-44 bottom-[5%] -z-20 h-[34rem] w-[34rem] rounded-full bg-neutral-500/[0.075] blur-3xl will-change-transform"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 opacity-[0.025] [background-image:linear-gradient(rgba(163,163,163,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(163,163,163,0.45)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      {/* Experience */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28"
      >
        <Container>
          <motion.div
            style={headingStyle}
            className="max-w-3xl will-change-transform"
          >
            <SectionHeading
              eyebrow="Experience"
              title="A professional timeline shaped by systems, leadership, and research."
              description="Selected experience across internal business systems, full-stack product leadership, IT support, and research connected to AI-assisted learning."
            />
          </motion.div>

          {featuredExperience.length > 0 ? (
            <div className="relative mt-14 sm:mt-16">
              {/* Mobile timeline base */}
              <div
                aria-hidden="true"
                className="absolute bottom-8 left-[1.85rem] top-8 w-px bg-white/[0.08] lg:hidden"
              />

              <motion.div
                aria-hidden="true"
                style={timelineStyle}
                className="absolute bottom-8 left-[1.85rem] top-8 w-px origin-top bg-gradient-to-b from-neutral-100 via-white/80 to-neutral-400 shadow-[0_0_16px_rgba(255,255,255,0.15)] lg:hidden"
              />

              {/* Desktop timeline base */}
              <div
                aria-hidden="true"
                className="absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-white/[0.08] lg:block"
              />

              <motion.div
                aria-hidden="true"
                style={timelineStyle}
                className="absolute bottom-8 left-1/2 top-8 hidden w-px origin-top -translate-x-1/2 bg-gradient-to-b from-neutral-100 via-white/80 to-neutral-400 shadow-[0_0_18px_rgba(255,255,255,0.16)] lg:block"
              />

              <ol className="relative grid gap-10 sm:gap-12 lg:gap-16">
                {featuredExperience.map(
                  (item, index) => (
                    <ExperienceCard
                      key={item.id ?? item.title}
                      item={item}
                      index={index}
                      scrollYProgress={
                        scrollYProgress
                      }
                      active={
                        index ===
                        activeExperienceIndex
                      }
                      completed={
                        index <
                        activeExperienceIndex
                      }
                      allowEntranceMotion={
                        allowEntranceMotion
                      }
                      allowScrollLinkedMotion={
                        allowScrollLinkedMotion
                      }
                      allowComplexMotion={
                        allowComplexMotion
                      }
                    />
                  )
                )}
              </ol>
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.025] p-6 text-sm leading-7 text-neutral-400">
              No featured experience entries are currently available.
            </div>
          )}

          {/* Interactive field experience gallery */}
          <ExperienceGallery />
        </Container>
      </section>

      {/* Experience-to-Education bridge */}
      <div
        aria-hidden="true"
        className="relative mx-auto h-20 w-full max-w-[90rem] px-4 sm:px-6 lg:h-28 lg:px-10"
      >
        <div className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-neutral-100/55 to-transparent lg:h-16" />

        <motion.div
          style={educationBridgeStyle}
          className="absolute inset-x-4 top-12 h-px origin-center bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent shadow-[0_0_20px_rgba(184,184,184,0.35)] sm:inset-x-6 lg:inset-x-10 lg:top-16"
        />

        <div className="absolute left-1/2 top-[2.45rem] flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-neutral-400/20 bg-neutral-950 text-neutral-300 lg:top-[3.45rem]">
          <BookIcon />
        </div>
      </div>

      {/* Education */}
      <section
        id="education"
        aria-labelledby="education-heading"
        className="relative scroll-mt-24 pb-24 pt-12 sm:pb-28 lg:pb-32 lg:pt-16"
      >
        <Container>
          <motion.div
            initial={
              allowEntranceMotion
                ? {
                    opacity: 0,
                    y: 34,
                    filter: "blur(5px)",
                  }
                : false
            }
            whileInView={
              allowEntranceMotion
                ? {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
                : undefined
            }
            viewport={{
              once: true,
              amount: 0.16,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl"
          >
            <SectionHeading
              eyebrow="Education"
              title="An academic foundation in information technology, mobile, and web systems."
              description="My academic journey developed the technical foundation behind my full-stack projects, mobile applications, system design work, and professional IT experience."
            />
          </motion.div>

          {educationItems.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {educationItems.map(
                (item, index) => (
                  <EducationCard
                    key={
                      item.id ??
                      item.school ??
                      item.level
                    }
                    item={item}
                    index={index}
                    scrollYProgress={
                      scrollYProgress
                    }
                    allowEntranceMotion={
                      allowEntranceMotion
                    }
                    allowScrollLinkedMotion={
                      allowScrollLinkedMotion
                    }
                    allowComplexMotion={
                      allowComplexMotion
                    }
                  />
                )
              )}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.025] p-6 text-sm leading-7 text-neutral-400">
              No education entries are currently available.
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}