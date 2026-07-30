import { useState } from "react";

import {
  education,
  experience,
  homepageContent,
} from "../../../data";

import { getHomepageSection } from "../../../data/homepageSections";

import PageSection from "./PageSection";
import SectionHeading from "./SectionHeading";
import SectionPanel from "./SectionPanel";

const EXPERIENCE_LINKS = {
  "launchpad-paysera-internship": {
    label: "View Internship Systems",
    href: "/projects/internship-systems",
  },

  "talkready-team-lead": {
    label: "View TalkReady",
    href: "/projects/talkready",
  },

  "ieee-apwimob-2025": {
    label: "View Related Project",
    href: "/projects/talkready",
  },
};

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

function SchoolLogo({
  src,
  school,
}) {
  const [imageFailed, setImageFailed] =
    useState(false);

  const initials = school
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();

  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-3 shadow-[0_12px_35px_rgba(0,0,0,0.25)] sm:h-28 sm:w-28">
      {!imageFailed && src ? (
        <img
          src={src}
          alt={`${school} logo`}
          width="112"
          height="112"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <div
          role="img"
          aria-label={`${school} logo unavailable`}
          className="flex h-full w-full items-center justify-center rounded-xl bg-slate-900 px-2 text-center text-sm font-semibold tracking-[0.08em] text-cyan-100"
        >
          {initials}
        </div>
      )}
    </div>
  );
}

function ExperienceCard({
  item,
  index,
}) {
  const relatedLink = EXPERIENCE_LINKS[item.id];

  return (
    <article className="grid min-w-0 gap-4 md:grid-cols-[10.5rem_1fr] md:gap-7">
      <div className="md:pt-6">
        <p className="font-mono text-sm font-medium text-cyan-200">
          {item.period}
        </p>

        <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {item.type}
        </p>

        <span className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-300">
          {item.badge}
        </span>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -left-[1.95rem] top-8 hidden h-3 w-3 rounded-full border-2 border-slate-950 bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.65)] md:block"
        />

        <SectionPanel className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                {item.organization}
              </p>

              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                {item.title}
              </h3>
            </div>

            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-xs text-slate-600"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            {item.description}
          </p>

          {item.highlights?.length > 0 ? (
            <ul
              aria-label={`${item.title} highlights`}
              className="mt-6 grid gap-3 sm:grid-cols-2"
            >
              {item.highlights
                .slice(0, 4)
                .map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-xs leading-6 text-slate-300"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
                    />

                    {highlight}
                  </li>
                ))}
            </ul>
          ) : null}

          {relatedLink ? (
            <a
              href={relatedLink.href}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              {relatedLink.label}

              <span className="transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>
          ) : null}
        </SectionPanel>
      </div>
    </article>
  );
}

function AchievementTag({
  children,
}) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-xs leading-5 text-slate-300">
      {children}
    </li>
  );
}

function EducationCard({
  item,
}) {
  return (
    <SectionPanel
      as="article"
      className="h-full p-5 sm:p-6 lg:p-7"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent"
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <SchoolLogo
          src={item.logo}
          school={item.school}
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-100">
              {item.level}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {item.status}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
            {item.school}
          </h3>

          <p className="mt-2 text-base font-medium leading-7 text-cyan-100">
            {item.degree}
          </p>

          {item.specialization ? (
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Specialization: {item.specialization}
            </p>
          ) : null}

          <p className="mt-3 font-mono text-sm text-slate-500">
            {item.year}
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base">
        {item.description}
      </p>

      {item.achievements?.length > 0 ? (
        <div className="mt-6">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Highlights and recognition
          </p>

          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {item.achievements.map((achievement) => (
              <AchievementTag key={achievement}>
                {achievement}
              </AchievementTag>
            ))}
          </ul>
        </div>
      ) : null}

      {item.skills?.length > 0 ? (
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Academic foundations
          </p>

          <ul
            aria-label={`${item.school} academic skills`}
            className="mt-3 flex flex-wrap gap-2"
          >
            {item.skills
              .slice(0, 8)
              .map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-1.5 text-[0.68rem] font-medium text-slate-300"
                >
                  {skill}
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </SectionPanel>
  );
}

export default function ExperienceEducationSection() {
  const experienceSection =
    getHomepageSection("experience");

  const educationSection =
    getHomepageSection("education");

  const selectedExperienceIds =
    homepageContent.featuredExperienceIds ?? [];

  const selectedExperience =
    selectedExperienceIds
      .map((experienceId) =>
        experience.find(
          (item) => item.id === experienceId
        )
      )
      .filter(Boolean);

  const displayedExperience =
    selectedExperience.length > 0
      ? selectedExperience
      : experience.slice(0, 3);

  return (
    <>
      <PageSection
        id="experience"
        labelledBy="experience-heading"
        tone="elevated"
      >
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.72fr] lg:gap-14">
          <SectionHeading
            id="experience-heading"
            eyebrow={
              experienceSection?.eyebrow ??
              "Professional Journey"
            }
            title="Experience across development, infrastructure, leadership, and research."
            description="Professional and academic roles where I built working systems, supported technical operations, led development decisions, and contributed to research."
          />

          <SectionPanel className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Experience focus
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div>
                <p className="text-xl font-semibold text-white">
                  Systems
                </p>

                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-slate-500">
                  Development
                </p>
              </div>

              <div className="border-l border-white/10 pl-4">
                <p className="text-xl font-semibold text-white">
                  IT
                </p>

                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-slate-500">
                  Operations
                </p>
              </div>

              <div className="border-l border-white/10 pl-4">
                <p className="text-xl font-semibold text-white">
                  AI
                </p>

                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-slate-500">
                  Research
                </p>
              </div>
            </div>
          </SectionPanel>
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[11.8rem] top-8 hidden w-px bg-gradient-to-b from-cyan-300/35 via-white/10 to-transparent md:block"
          />

          <div className="space-y-6">
            {displayedExperience.map(
              (item, index) => (
                <ExperienceCard
                  key={item.id}
                  item={item}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      </PageSection>

      <PageSection
        id="education"
        labelledBy="education-heading"
        tone="subtle"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="education-heading"
            eyebrow={
              educationSection?.eyebrow ??
              "Academic Background"
            }
            title="Academic foundations that developed into practical technical work."
            description="My education progressed from an ICT foundation into specialized study in mobile and web application development, system design, research, and full-stack implementation."
          />

          <p className="max-w-md text-sm leading-7 text-slate-500">
            Each institution is shown with its original
            university branding and logo.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {education.map((item) => (
            <EducationCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </PageSection>
    </>
  );
}