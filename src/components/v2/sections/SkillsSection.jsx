import {
  Brain,
  Code2,
  Cpu,
  Database,
  HardDrive,
  Layers,
  Network,
  Palette,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";

import {
  motion,
  useTransform,
} from "motion/react";

import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "../../ui/SectionHeading";
import Card from "../../ui/Card";

import {
  StaggerItem,
  StaggerReveal,
} from "../motion";

import {
  primarySkills,
  skillCategories,
} from "../../../data";

import useSkillsMotion from "../../../hooks/useSkillsMotion";

const iconMap = {
  frontend: Code2,
  backend: Database,
  mobile: Smartphone,
  ai: Brain,
  "it-support": Server,
  tools: Wrench,
  creative: Palette,
};

const simpleIconBase =
  "https://cdn.simpleicons.org";

const skillIconMap = {
  "React.js":
    `${simpleIconBase}/react/67E8F9`,

  JavaScript:
    `${simpleIconBase}/javascript/67E8F9`,

  HTML5:
    `${simpleIconBase}/html5/67E8F9`,

  CSS3:
    `${simpleIconBase}/css/67E8F9`,

  "Tailwind CSS":
    `${simpleIconBase}/tailwindcss/67E8F9`,

  "Node.js":
    `${simpleIconBase}/nodedotjs/67E8F9`,

  "Express.js":
    `${simpleIconBase}/express/67E8F9`,

  MySQL:
    `${simpleIconBase}/mysql/67E8F9`,

  SQL:
    `${simpleIconBase}/mysql/67E8F9`,

  Firebase:
    `${simpleIconBase}/firebase/67E8F9`,

  Supabase:
    `${simpleIconBase}/supabase/67E8F9`,

  Flutter:
    `${simpleIconBase}/flutter/67E8F9`,

  Dart:
    `${simpleIconBase}/dart/67E8F9`,

  "OpenAI API":
    `${simpleIconBase}/openai/67E8F9`,

  "Azure AI":
    `${simpleIconBase}/microsoftazure/67E8F9`,

  "Windows Server & AD":
    `${simpleIconBase}/windows/67E8F9`,

  Git:
    `${simpleIconBase}/git/67E8F9`,

  GitHub:
    `${simpleIconBase}/github/67E8F9`,

  "VS Code":
    `${simpleIconBase}/visualstudiocode/67E8F9`,

  npm:
    `${simpleIconBase}/npm/67E8F9`,

  Render:
    `${simpleIconBase}/render/67E8F9`,

  Figma:
    `${simpleIconBase}/figma/67E8F9`,

  "Adobe Photoshop":
    `${simpleIconBase}/adobephotoshop/67E8F9`,

  "Adobe Premiere Pro":
    `${simpleIconBase}/adobepremierepro/67E8F9`,
};

const fallbackSkillIcons = {
  "Speech Assessment": Cpu,
  "AI Feedback Systems": Brain,
  "Network Troubleshooting": Network,
  "Hardware Troubleshooting": HardDrive,
  "RAID Setup": Server,
  "Technical Support": Wrench,
  "IT Support": Wrench,
  "UI/UX Design": Palette,
  "Graphic Design": Palette,
};

function SkillBadge({
  skill,
  featured = false,
}) {
  const iconUrl =
    skillIconMap[skill];

  const FallbackIcon =
    fallbackSkillIcons[skill];

  return (
    <span
      className={[
        "group/skill inline-flex items-center",
        "gap-2 rounded-full border",
        "px-3 py-1.5 text-xs font-semibold",
        "leading-none transition duration-300",
        featured
          ? [
              "border-cyan-300/30",
              "bg-cyan-300/10",
              "text-cyan-50",
              "hover:border-cyan-200/50",
              "hover:bg-cyan-300/[0.16]",
            ].join(" ")
          : [
              "border-white/10",
              "bg-white/[0.03]",
              "text-slate-200",
              "hover:border-cyan-300/30",
              "hover:bg-cyan-300/[0.07]",
              "hover:text-cyan-50",
            ].join(" "),
      ].join(" ")}
    >
      {iconUrl ? (
        <img
          src={iconUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className={[
            "h-3.5 w-3.5 shrink-0",
            "transition-transform duration-300",
            "group-hover/skill:scale-110",
          ].join(" ")}
        />
      ) : FallbackIcon ? (
        <FallbackIcon
          aria-hidden="true"
          className={[
            "h-3.5 w-3.5 shrink-0",
            "text-cyan-200",
            "transition-transform duration-300",
            "group-hover/skill:scale-110",
          ].join(" ")}
        />
      ) : null}

      <span>{skill}</span>
    </span>
  );
}

function SkillBadgeGroup({
  skills,
  featured = false,
  ariaLabel,
}) {
  return (
    <StaggerReveal
      className="flex flex-wrap gap-2"
    >
      {skills.map((skill) => (
        <StaggerItem
          key={skill}
          className="inline-flex"
        >
          <SkillBadge
            skill={skill}
            featured={featured}
          />
        </StaggerItem>
      ))}

      <span className="sr-only">
        {ariaLabel}
      </span>
    </StaggerReveal>
  );
}

function SkillCategoryCard({
  category,
  index,
  scrollYProgress,
  allowEntranceMotion,
  allowScrollLinkedMotion,
  allowComplexMotion,
}) {
  const Icon =
    iconMap[category.id] ??
    Layers;

  /*
   * Each card receives a slightly different parallax range.
   * This prevents the grid from moving as one flat object.
   */
  const parallaxDistance =
    allowComplexMotion
      ? 14 + (index % 3) * 5
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
    [
      index % 2 === 0 ? 5 : -5,
      index % 2 === 0 ? -5 : 5,
    ]
  );

  const hiddenState =
    allowComplexMotion
      ? {
          opacity: 0,
          x:
            index % 2 === 0
              ? 48
              : -48,
          y: 24,
          scale: 0.985,
          filter: "blur(6px)",
        }
      : {
          opacity: 0,
          x: 0,
          y: 26,
          scale: 0.99,
          filter: "blur(4px)",
        };

  const visibleState = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  };

  return (
    <motion.div
      style={
        allowScrollLinkedMotion
          ? {
              y: cardY,
            }
          : undefined
      }
      className="h-full will-change-transform"
    >
      <motion.div
        initial={
          allowEntranceMotion
            ? hiddenState
            : false
        }
        whileInView={
          allowEntranceMotion
            ? visibleState
            : undefined
        }
        viewport={{
          once: true,
          amount: 0.18,
          margin:
            "0px 0px -8% 0px",
        }}
        transition={{
          duration: 0.68,
          delay:
            Math.min(index * 0.055, 0.28),
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full"
      >
        <motion.div
          whileHover={
            allowComplexMotion
              ? {
                  scale: 1.012,
                  rotateX: 1.2,
                  rotateY:
                    index % 2 === 0
                      ? -1.2
                      : 1.2,
                }
              : undefined
          }
          transition={{
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={[
            "group h-full",
            "[transform-style:preserve-3d]",
          ].join(" ")}
        >
          <Card
            className={[
              "relative h-full min-h-[15rem]",
              "overflow-hidden",
              "transition duration-300",
              "group-hover:border-cyan-300/25",
              "group-hover:bg-white/[0.045]",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className={[
                "pointer-events-none",
                "absolute inset-0",
                "bg-[radial-gradient(",
                "circle_at_top_left,",
                "rgba(34,211,238,0.08),",
                "transparent_18rem)]",
                "opacity-0 transition-opacity",
                "duration-300",
                "group-hover:opacity-100",
              ].join("")}
            />

            <div
              aria-hidden="true"
              className={[
                "pointer-events-none",
                "absolute inset-x-0 top-0 h-px",
                "bg-gradient-to-r",
                "from-transparent",
                "via-cyan-200/45",
                "to-transparent",
                "opacity-0 transition-opacity",
                "duration-300",
                "group-hover:opacity-100",
              ].join(" ")}
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
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
                    "border-cyan-300/20",
                    "bg-cyan-300/10",
                    "text-cyan-200",
                    "shadow-[0_10px_30px_rgba(8,145,178,0.08)]",
                    "transition duration-300",
                    "group-hover:border-cyan-200/35",
                    "group-hover:bg-cyan-300/[0.15]",
                  ].join(" ")}
                >
                  <Icon
                    size={22}
                    aria-hidden="true"
                  />
                </motion.div>

                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-gradient-to-r from-white/15 to-transparent"
                  />

                  <span className="font-mono text-xs font-semibold text-slate-600 transition group-hover:text-cyan-200/70">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>
              </div>

              <h3 className="mt-6 break-safe text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {category.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {category.description}
              </p>

              <div className="mt-6">
                <SkillBadgeGroup
                  skills={category.skills}
                  ariaLabel={`${category.title} technologies`}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const {
    sectionRef,
    scrollYProgress,
    leftPanelStyle,
    gridStyle,
    railStyle,
    glowStyle,
    allowEntranceMotion,
    allowScrollLinkedMotion,
    allowComplexMotion,
  } = useSkillsMotion();

  return (
    <Section
      id="skills"
      spacing="compact"
    >
      <div
        ref={sectionRef}
        data-skills-motion-scene=""
        className="relative isolate overflow-hidden"
      >
        {/* Ambient section lighting */}
        <motion.div
          aria-hidden="true"
          style={glowStyle}
          className={[
            "pointer-events-none",
            "absolute -right-32 top-[15%]",
            "-z-10 h-[28rem] w-[28rem]",
            "rounded-full",
            "bg-cyan-400/[0.07]",
            "blur-3xl",
            "will-change-transform",
          ].join(" ")}
        />

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none",
            "absolute inset-0 -z-20",
            "opacity-[0.025]",
            "[background-image:linear-gradient(",
            "rgba(148,163,184,0.5)_1px,",
            "transparent_1px),",
            "linear-gradient(90deg,",
            "rgba(148,163,184,0.5)_1px,",
            "transparent_1px)]",
            "[background-size:64px_64px]",
          ].join("")}
        />

        <Container>
          <div className="relative grid gap-12 py-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* Desktop capability-progress rail */}
            <div
              aria-hidden="true"
              className={[
                "absolute -left-5 top-4",
                "hidden h-[calc(100%-2rem)]",
                "w-px lg:block",
                "xl:-left-8",
              ].join(" ")}
            >
              <div className="absolute inset-0 bg-white/[0.07]" />

              <motion.div
                style={railStyle}
                className={[
                  "absolute inset-0",
                  "origin-top",
                  "bg-gradient-to-b",
                  "from-cyan-300",
                  "via-cyan-200/80",
                  "to-indigo-300",
                  "shadow-[0_0_16px_rgba(34,211,238,0.45)]",
                ].join(" ")}
              />

              <span className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full border border-cyan-200/40 bg-slate-950" />

              <span className="absolute -bottom-[1px] -left-[3px] h-[7px] w-[7px] rounded-full border border-indigo-200/40 bg-slate-950" />
            </div>

            {/* Sticky introduction */}
            <div className="lg:sticky lg:top-28">
              <motion.div
                style={leftPanelStyle}
                className="will-change-transform"
              >
                <motion.div
                  initial={
                    allowEntranceMotion
                      ? {
                          opacity: 0,
                          x: -32,
                          filter:
                            "blur(5px)",
                        }
                      : false
                  }
                  whileInView={
                    allowEntranceMotion
                      ? {
                          opacity: 1,
                          x: 0,
                          filter:
                            "blur(0px)",
                        }
                      : undefined
                  }
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  <SectionHeading
                    eyebrow="Skills"
                    title="A technical toolkit built across real projects."
                    description="My skills are shaped by academic projects, internship systems, AI integration, IT support work, and creative design activities."
                  />
                </motion.div>

                <motion.div
                  initial={
                    allowEntranceMotion
                      ? {
                          opacity: 0,
                          y: 24,
                          scale: 0.985,
                        }
                      : false
                  }
                  whileInView={
                    allowEntranceMotion
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }
                      : undefined
                  }
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 0.08,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className={[
                    "relative mt-8 overflow-hidden",
                    "rounded-[1.75rem]",
                    "border border-cyan-300/20",
                    "bg-cyan-300/10",
                    "p-5 sm:p-6",
                  ].join(" ")}
                >
                  <div
                    aria-hidden="true"
                    className={[
                      "pointer-events-none",
                      "absolute inset-0",
                      "bg-[radial-gradient(",
                      "circle_at_top_left,",
                      "rgba(103,232,249,0.12),",
                      "transparent_18rem)]",
                    ].join("")}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                        Core Stack
                      </p>

                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cyan-300/55">
                        Primary
                      </span>
                    </div>

                    <div className="mt-5">
                      <SkillBadgeGroup
                        skills={primarySkills}
                        featured
                        ariaLabel="Primary technology stack"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={
                    allowEntranceMotion
                      ? {
                          opacity: 0,
                          y: 24,
                        }
                      : false
                  }
                  whileInView={
                    allowEntranceMotion
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : undefined
                  }
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 0.14,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className={[
                    "relative mt-5 overflow-hidden",
                    "rounded-[1.75rem]",
                    "border border-white/10",
                    "bg-white/[0.03]",
                    "p-5 sm:p-6",
                  ].join(" ")}
                >
                  <div
                    aria-hidden="true"
                    className={[
                      "absolute left-0 top-0",
                      "h-full w-px",
                      "bg-gradient-to-b",
                      "from-cyan-300/45",
                      "via-cyan-200/10",
                      "to-transparent",
                    ].join(" ")}
                  />

                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Skill Direction
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    I focus on connecting software development,
                    IT support, AI tools, and interface design
                    into practical systems that are usable,
                    maintainable, and visually clean.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Capability cards */}
            <motion.div
              style={gridStyle}
              className={[
                "grid gap-5 sm:grid-cols-2",
                "will-change-transform",
              ].join(" ")}
            >
              {skillCategories.map(
                (category, index) => (
                  <SkillCategoryCard
                    key={category.id}
                    category={category}
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
            </motion.div>
          </div>
        </Container>
      </div>
    </Section>
  );
}