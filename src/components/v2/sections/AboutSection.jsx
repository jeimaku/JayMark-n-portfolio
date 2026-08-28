import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { aboutContent } from "../../../data/aboutContent";
import { heroContent } from "../../../data/heroContent";

import PageSection from "./PageSection";

const EASE = [0.22, 1, 0.36, 1];

/*
 * Keep these intentionally high-level.
 * The Skills section already contains the detailed technology stack.
 */
const CURRENT_SKILLS = [
  "Full-Stack Development",
  "React.js",
  "Node.js",
  "AI-Assisted Development",
  "IT Support",
  "Networking",
];

function getRevealProps({
  delay = 0,
  reduced = false,
  y = 0,
}) {
  return {
    initial: {
      opacity: 0,
      y: reduced ? 0 : y,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.25,
    },
    transition: {
      delay: reduced ? 0 : delay,
      duration: reduced ? 0 : 0.55,
      ease: EASE,
    },
  };
}

function SkillFoundation({ reduced }) {
  return (
    <motion.div
      {...getRevealProps({
        delay: 0.2,
        reduced,
        y: 10,
      })}
      className="mt-7"
    >
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-neutral-500">
        Current foundation
      </p>

      <div className="mt-3 flex max-w-[43rem] flex-wrap gap-2">
        {CURRENT_SKILLS.map((skill) => (
          <span
            key={skill}
            className={[
              "inline-flex items-center",
              "rounded-full",
              "border border-white/10",
              "bg-white/[0.025]",
              "px-3.5 py-2",
              "text-xs font-medium",
              "text-neutral-400",
              "transition duration-200",
              "hover:border-white/20",
              "hover:bg-white/[0.045]",
              "hover:text-white",
              "sm:text-[0.82rem]",
            ].join(" ")}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const reduced = Boolean(useReducedMotion());

  return (
    <PageSection
      id="about"
      labelledBy="about-heading"
      tone="elevated"
      className="z-20"
      containerClassName="py-16 sm:py-20 lg:py-24"
    >
      {/* Heading */}
      <header className="max-w-3xl">
        <motion.p
          {...getRevealProps({ reduced })}
          className="text-xs font-semibold uppercase tracking-[0.26em] text-neutral-200"
        >
          {aboutContent.eyebrow}
        </motion.p>

        <motion.h2
          id="about-heading"
          {...getRevealProps({
            delay: 0.06,
            reduced,
            y: 14,
          })}
          className={[
            "mt-5",
            "text-4xl font-semibold",
            "tracking-[-0.05em]",
            "text-white",
            "sm:text-5xl",
            "lg:text-[3.5rem]",
          ].join(" ")}
        >
          {aboutContent.heading}
        </motion.h2>
      </header>

      {/* Main content */}
      <div
        className={[
          "mt-10 grid items-start gap-8",
          "sm:mt-12",
          "md:gap-10",
          "lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.6fr)]",
          "lg:justify-between",
          "lg:gap-x-12",
          "xl:gap-x-16",
        ].join(" ")}
      >
        {/* Portrait */}
        <motion.div
          {...getRevealProps({
            delay: 0.12,
            reduced,
          })}
          className="w-full max-w-[20rem] lg:max-w-[18rem]"
        >
          <div
            className={[
              "overflow-hidden",
              "rounded-2xl",
              "border border-white/10",
              "bg-neutral-900",
              "shadow-[0_18px_42px_rgba(0,0,0,0.36)]",
            ].join(" ")}
          >
            <img
              src={aboutContent.portrait.src}
              alt={aboutContent.portrait.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] h-full w-full object-cover"
              style={{
                objectPosition:
                  aboutContent.portrait.objectPosition,
              }}
            />
          </div>
        </motion.div>

        {/* About content */}
        <motion.div
          {...getRevealProps({
            delay: 0.16,
            reduced,
          })}
          className="self-center lg:pt-1"
        >
          <p
            className={[
              "max-w-[43rem]",
              "text-base leading-8",
              "text-neutral-300",
              "sm:text-lg sm:leading-9",
            ].join(" ")}
          >
            {aboutContent.paragraph}
          </p>

          {/* Current skills */}
          <SkillFoundation reduced={reduced} />

          {/* Resume */}
          <a
            href={heroContent.resumeAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "group mt-7 inline-flex",
              "min-h-11 items-center gap-2",
              "text-sm font-medium text-white",
              "transition-colors",
              "hover:text-neutral-300",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-white",
              "focus-visible:ring-offset-4",
              "focus-visible:ring-offset-neutral-950",
            ].join(" ")}
          >
            {heroContent.resumeAction.label}

            <ArrowUpRight
              aria-hidden="true"
              size={16}
              className={[
                "transition-transform duration-200",
                "group-hover:-translate-y-0.5",
                "group-hover:translate-x-0.5",
              ].join(" ")}
            />
          </a>
        </motion.div>
      </div>
    </PageSection>
  );
}