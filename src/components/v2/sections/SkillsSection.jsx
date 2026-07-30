import { skillsContent } from "../../../data/skillsContent";
import { getHomepageSection } from "../../../data/homepageSections";

import PageSection from "./PageSection";
import SectionHeading from "./SectionHeading";
import SectionPanel from "./SectionPanel";

function CapabilitySummary({ label, value }) {
  return (
    <li className="min-w-0 border-t border-white/10 pt-4 first:border-t-0 first:pt-0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 first:sm:border-l-0 first:sm:pl-0">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-200">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium leading-6 text-slate-200">
        {value}
      </p>
    </li>
  );
}

function SkillTag({ skill, accent }) {
  return (
    <li className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2 text-xs font-medium text-slate-300">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{
          backgroundColor: accent,
          boxShadow: `0 0 9px ${accent}`,
        }}
      />

      {skill}
    </li>
  );
}

function SkillCategoryCard({ category }) {
  return (
    <SectionPanel
      as="article"
      className={[
        "h-full p-5 sm:p-6",
        category.wide ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)`,
          opacity: 0.45,
        }}
      />

      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: category.accent,
                boxShadow: `0 0 14px ${category.accent}`,
              }}
            />

            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {category.label}
            </p>
          </div>

          <h3 className="mt-4 max-w-xl text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
            {category.title}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-xs text-slate-600"
        >
          {category.number}
        </span>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
        {category.description}
      </p>

      <ul
        aria-label={`${category.title} skills`}
        className="mt-6 flex flex-wrap gap-2"
      >
        {category.skills.map((skill) => (
          <SkillTag
            key={skill}
            skill={skill}
            accent={category.accent}
          />
        ))}
      </ul>
    </SectionPanel>
  );
}

export default function SkillsSection() {
  const section = getHomepageSection("skills");

  return (
    <PageSection
      id="skills"
      labelledBy="skills-heading"
      tone="elevated"
    >
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
        <SectionHeading
          id="skills-heading"
          eyebrow={section?.eyebrow ?? "Capabilities"}
          title={skillsContent.title}
          description={skillsContent.introduction}
        />

        <SectionPanel className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Capability overview
          </p>

          <ul className="mt-5 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {skillsContent.summary.map((item) => (
              <CapabilitySummary
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </ul>
        </SectionPanel>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {skillsContent.categories.map((category) => (
          <SkillCategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <blockquote className="max-w-3xl border-l border-cyan-300/40 pl-5 text-left sm:pl-6">
          <p className="text-base font-medium leading-8 text-cyan-50 sm:text-lg">
            “{skillsContent.closingStatement}”
          </p>
        </blockquote>
      </div>
    </PageSection>
  );
}