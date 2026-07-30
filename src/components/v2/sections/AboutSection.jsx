import { useState } from "react";

import { aboutContent } from "../../../data/aboutContent";
import { getHomepageSection } from "../../../data/homepageSections";

import PageSection from "./PageSection";
import SectionHeading from "./SectionHeading";
import SectionPanel from "./SectionPanel";

function PortraitPanel() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <SectionPanel className="mx-auto w-full max-w-lg lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden">
        {!imageFailed ? (
          <img
            src={aboutContent.portrait.src}
            alt={aboutContent.portrait.alt}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
            style={{
              objectPosition:
                aboutContent.portrait.objectPosition,
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900">
            <div className="text-center">
              <p className="text-6xl font-semibold tracking-[-0.06em] text-cyan-100">
                JM
              </p>

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Jay Mark Apelado
              </p>
            </div>
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/5 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]"
        />

        <div className="absolute inset-x-5 bottom-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan-100 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />

            Developer · Technical Problem-Solver
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-5 h-10 w-10 border-l border-t border-cyan-200/30"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-5 right-5 h-10 w-10 border-b border-r border-cyan-200/30"
        />
      </div>
    </SectionPanel>
  );
}

function AboutDetail({ label, value }) {
  return (
    <li className="border-t border-white/10 py-4 first:border-t-0 first:pt-0 last:pb-0 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-5">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium leading-6 text-slate-200 sm:mt-0">
        {value}
      </p>
    </li>
  );
}

function ApproachCard({
  number,
  title,
  description,
}) {
  return (
    <SectionPanel
      as="article"
      className="h-full p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/75">
            Approach
          </p>

          <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em] text-white">
            {title}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="font-mono text-sm text-slate-600"
        >
          {number}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-400">
        {description}
      </p>
    </SectionPanel>
  );
}

export default function AboutSection() {
  const section = getHomepageSection("about");

  return (
    <PageSection
      id="about"
      labelledBy="about-heading"
      tone="subtle"
    >
      <SectionHeading
        id="about-heading"
        eyebrow={section?.eyebrow ?? "About Me"}
        title={aboutContent.title}
        description={aboutContent.introduction}
      />

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 xl:gap-20">
        <PortraitPanel />

        <div className="min-w-0">
          <div className="space-y-5">
            {aboutContent.story.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-slate-300 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="relative mt-8 border-l border-cyan-300/40 pl-5 sm:pl-6">
            <span
              aria-hidden="true"
              className="absolute -left-px top-0 h-12 w-px bg-cyan-200"
            />

            <p className="text-lg font-medium leading-8 tracking-[-0.015em] text-cyan-50 sm:text-xl">
              “{aboutContent.statement}”
            </p>
          </blockquote>

          <SectionPanel className="mt-9 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              At a glance
            </p>

            <ul className="mt-5">
              {aboutContent.details.map((detail) => (
                <AboutDetail
                  key={detail.label}
                  label={detail.label}
                  value={detail.value}
                />
              ))}
            </ul>
          </SectionPanel>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              How I approach projects
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
              From requirements to reliable systems.
            </h3>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-500">
            A practical process centered on real users,
            maintainability, and dependable delivery.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {aboutContent.approach.map((item) => (
            <ApproachCard
              key={item.number}
              number={item.number}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </PageSection>
  );
}