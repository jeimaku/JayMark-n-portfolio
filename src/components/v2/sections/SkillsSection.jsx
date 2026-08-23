import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "./SectionHeading";
import { StaggerItem, StaggerReveal } from "../motion";

import {
  creativeTechnologies,
  itSupportCapabilities,
  secondaryCapabilitySections,
  skillGroups,
  skillProjects,
  technologies,
} from "../../../data";
import useSkillsMotion from "../../../hooks/useSkillsMotion";

const EASE = [0.22, 1, 0.36, 1];

const panelMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: EASE },
  },
};

const detailMotion = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

const logoSizeClasses = {
  hero: "h-20 w-20 sm:h-24 sm:w-24",
  rail: "h-9 w-9 sm:h-11 sm:w-11",
  compact: "h-5 w-5",
};

const allLogoTechnologies = [
  ...technologies,
  ...creativeTechnologies,
];

const technologyByName = new Map(
  allLogoTechnologies.map((technology) => [
    technology.name,
    technology,
  ])
);

function getCategoryTechs(categoryId) {
  return technologies.filter((technology) =>
    technology.groups?.includes(categoryId)
  );
}

function TechnologyLogo({
  technology,
  size = "rail",
  className = "",
}) {
  const [failedIconId, setFailedIconId] = useState(null);
  const initials = technology.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const failed = failedIconId === technology.id;

  return (
    <span
      className={[
        "flex shrink-0 items-center justify-center",
        logoSizeClasses[size] ?? logoSizeClasses.rail,
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      {technology.iconUrl && !failed ? (
        <img
          src={technology.iconUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
          onError={() => setFailedIconId(technology.id)}
        />
      ) : (
        <span
          className="font-mono text-sm font-bold leading-none"
          style={{ color: technology.brandColor ?? "#67e8f9" }}
        >
          {initials}
        </span>
      )}
    </span>
  );
}

function CategoryTabs({
  groups,
  activeId,
  onSelect,
}) {
  const handleKeyDown = useCallback(
    (event, index) => {
      const keyActions = {
        ArrowRight: 1,
        ArrowLeft: -1,
      };

      if (event.key === "Home") {
        event.preventDefault();
        onSelect(groups[0].id);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        onSelect(groups[groups.length - 1].id);
        return;
      }

      const direction = keyActions[event.key];
      if (!direction) return;

      event.preventDefault();
      const nextIndex =
        (index + direction + groups.length) % groups.length;
      onSelect(groups[nextIndex].id);
    },
    [groups, onSelect]
  );

  return (
    <div
      role="tablist"
      aria-label="Technology areas"
      className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {groups.map((group, index) => {
        const isActive = group.id === activeId;

        return (
          <button
            key={group.id}
            type="button"
            role="tab"
            id={`skills-tab-${group.id}`}
            aria-selected={isActive}
            aria-controls={`skills-panel-${group.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(group.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={[
              "shrink-0 rounded-md border px-3.5 py-2 text-xs",
              "font-semibold uppercase tracking-[0.16em]",
              "transition duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-cyan-300",
              isActive
                ? "border-cyan-300/40 bg-cyan-300/[0.10] text-cyan-100"
                : "border-white/10 bg-white/[0.025] text-slate-500 hover:border-white/20 hover:text-slate-300",
            ].join(" ")}
          >
            {group.label}
          </button>
        );
      })}
    </div>
  );
}

function StackRail({
  technologies: categoryTechs,
  activeCategory,
  selectedId,
  onSelect,
  onMove,
  prefersReducedMotion,
}) {
  const railRef = useRef(null);
  const buttonRefs = useRef(new Map());

  const registerButton = useCallback((id, node) => {
    if (node) {
      buttonRefs.current.set(id, node);
      return;
    }

    buttonRefs.current.delete(id);
  }, []);

  const scrollSelectedIntoView = useCallback(
    (behavior = "smooth") => {
      const selectedButton =
        buttonRefs.current.get(selectedId);

      selectedButton?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: prefersReducedMotion ? "auto" : behavior,
      });
    },
    [prefersReducedMotion, selectedId]
  );

  useEffect(() => {
    scrollSelectedIntoView();
  }, [scrollSelectedIntoView]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        scrollSelectedIntoView("auto");
      });
    });

    observer.observe(rail);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [scrollSelectedIntoView]);

  const focusTechnology = useCallback((id) => {
    requestAnimationFrame(() => {
      buttonRefs.current.get(id)?.focus({
        preventScroll: true,
      });
    });
  }, []);

  const selectByOffset = useCallback(
    (currentId, offset) => {
      const currentIndex = categoryTechs.findIndex(
        (technology) => technology.id === currentId
      );
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex =
        (safeIndex + offset + categoryTechs.length) %
        categoryTechs.length;
      const nextId = categoryTechs[nextIndex].id;

      onSelect(nextId);
      focusTechnology(nextId);
    },
    [categoryTechs, focusTechnology, onSelect]
  );

  const handleTechnologyKeyDown = useCallback(
    (event, technology) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        selectByOffset(technology.id, 1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectByOffset(technology.id, -1);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        const firstId = categoryTechs[0]?.id;
        if (firstId) {
          onSelect(firstId);
          focusTechnology(firstId);
        }
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        const lastId =
          categoryTechs[categoryTechs.length - 1]?.id;
        if (lastId) {
          onSelect(lastId);
          focusTechnology(lastId);
        }
      }
    },
    [
      categoryTechs,
      focusTechnology,
      onSelect,
      selectByOffset,
    ]
  );

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Stack Explorer
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onMove(-1)}
            aria-label="Previous technology"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-cyan-300/35 hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <ChevronLeft size={17} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onMove(1)}
            aria-label="Next technology"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-cyan-300/35 hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        role="tabpanel"
        id={`skills-panel-${activeCategory}`}
        aria-label="Selectable technology logos"
        className={[
          "flex snap-x gap-3 overflow-x-auto pb-3",
          "overscroll-x-contain [scrollbar-width:none]",
          "[&::-webkit-scrollbar]:hidden",
        ].join(" ")}
      >
        {categoryTechs.map((technology) => {
          const isSelected = technology.id === selectedId;
          const isPrimary =
            technology.weight === "primary";

          return (
            <button
              key={technology.id}
              ref={(node) =>
                registerButton(technology.id, node)
              }
              type="button"
              aria-pressed={isSelected}
              aria-label={`Select ${technology.name}`}
              onClick={() => onSelect(technology.id)}
              onKeyDown={(event) =>
                handleTechnologyKeyDown(event, technology)
              }
              className={[
                "group min-h-28 w-28 shrink-0 snap-center",
                "rounded-lg border px-3 py-4 text-left",
                "transition duration-200 sm:w-32",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                "focus-visible:outline-cyan-300",
                isSelected
                  ? "border-cyan-300/45 bg-cyan-300/[0.08]"
                  : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]",
              ].join(" ")}
            >
              <TechnologyLogo
                technology={technology}
                size="rail"
                className={[
                  "mx-auto transition duration-200",
                  isSelected || isPrimary
                    ? "scale-110"
                    : "opacity-90 group-hover:scale-105",
                ].join(" ")}
              />

              <span className="mt-4 block truncate text-center text-sm font-semibold text-white">
                {technology.name}
              </span>

              <span className="mt-1 block truncate text-center text-[0.68rem] text-slate-500">
                {technology.role}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TechnologySpotlight({
  technology,
  allowMotion,
}) {
  if (!technology) return null;

  const hasProjects =
    Array.isArray(technology.projects) &&
    technology.projects.length > 0;

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={technology.id}
        variants={allowMotion ? detailMotion : undefined}
        initial={allowMotion ? "hidden" : false}
        animate={allowMotion ? "visible" : undefined}
        exit={allowMotion ? "exit" : undefined}
        aria-live="polite"
        className={[
          "relative min-h-[23rem] overflow-hidden rounded-lg",
          "border border-white/10 bg-white/[0.025] p-5",
          "sm:p-6 lg:p-7",
        ].join(" ")}
        style={{
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 32px ${technology.brandColor}12`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${technology.brandColor}, transparent)`,
            opacity: 0.6,
          }}
        />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div
            className={[
              "flex h-28 w-28 shrink-0 items-center justify-center",
              "rounded-lg border border-white/10 bg-slate-950/60 p-4",
            ].join(" ")}
            style={{
              borderColor: `${technology.brandColor}55`,
              backgroundColor: `${technology.brandColor}0D`,
            }}
          >
            <TechnologyLogo
              technology={technology}
              size="hero"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              {technology.role}
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              {technology.name}
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {technology.shortDescription}
            </p>
          </div>
        </div>

        <div className="mt-7 border-t border-white/[0.08] pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {hasProjects ? "Used in" : "How it fits"}
          </p>

          {hasProjects ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {technology.projects.map((project) => (
                <li
                  key={project}
                  className="rounded-md border border-cyan-300/20 bg-cyan-300/[0.055] px-3 py-1.5 text-xs font-medium text-cyan-50"
                >
                  {project}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-7 text-slate-500">
              A supporting tool in the workflow. It helps build,
              design, test, or maintain the systems shown in this
              portfolio.
            </p>
          )}
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

function ProjectEvidence() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {skillProjects.map((project) => (
        <article
          key={project.id}
          className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
        >
          <p className="text-sm font-semibold text-white">
            {project.label}
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((technology) => (
              <span
                key={technology}
                className="rounded-md border border-white/10 bg-white/[0.025] px-2 py-1 text-[0.62rem] font-semibold text-slate-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function CapabilityBands() {
  return (
    <div className="grid gap-3 lg:grid-cols-4">
      {secondaryCapabilitySections.map((section) => (
        <section
          key={section.id}
          aria-labelledby={`skills-${section.id}`}
          className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
        >
          <h3
            id={`skills-${section.id}`}
            className="text-sm font-semibold text-white"
          >
            {section.label}
          </h3>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            {section.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {section.items.map((item) => {
              const technology = technologyByName.get(item);

              return (
                <li
                  key={item}
                  className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-xs font-medium text-slate-300"
                >
                  {technology ? (
                    <TechnologyLogo
                      technology={technology}
                      size="compact"
                    />
                  ) : null}

                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ItSupportSummary() {
  return (
    <section
      aria-labelledby="skills-it-support"
      className="rounded-lg border border-white/10 bg-white/[0.02] p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            IT Support
          </p>

          <h3
            id="skills-it-support"
            className="mt-2 text-lg font-semibold text-white"
          >
            Infrastructure support that backs up the software work.
          </h3>
        </div>

        <p className="max-w-md text-sm leading-7 text-slate-500">
          Hardware, networking, troubleshooting, and basic server
          administration are part of the same practical toolkit.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {itSupportCapabilities.map((group) => (
          <div
            key={group.label}
            className="rounded-lg border border-white/[0.07] bg-slate-950/30 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              {group.label}
            </p>

            <ul className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-xs text-slate-400"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SkillsSection() {
  const {
    allowEntranceMotion,
    allowComplexMotion,
    prefersReducedMotion,
  } = useSkillsMotion();

  const initialCategory = skillGroups[0]?.id ?? "primary";
  const [activeCategory, setActiveCategory] =
    useState(initialCategory);
  const [selectedTechId, setSelectedTechId] = useState(
    () => getCategoryTechs(initialCategory)[0]?.id ?? null
  );

  const activeGroup = useMemo(
    () =>
      skillGroups.find((group) => group.id === activeCategory) ??
      skillGroups[0],
    [activeCategory]
  );

  const categoryTechs = useMemo(
    () => getCategoryTechs(activeCategory),
    [activeCategory]
  );

  const selectedTechnology = useMemo(
    () =>
      categoryTechs.find(
        (technology) => technology.id === selectedTechId
      ) ?? categoryTechs[0],
    [categoryTechs, selectedTechId]
  );

  const effectiveSelectedTechId =
    selectedTechnology?.id ?? null;

  const handleCategorySelect = useCallback((categoryId) => {
    const firstTechnology = getCategoryTechs(categoryId)[0];
    setActiveCategory(categoryId);
    setSelectedTechId(firstTechnology?.id ?? null);
  }, []);

  const handleMoveSelection = useCallback(
    (offset) => {
      if (categoryTechs.length === 0) return;

      const currentIndex = categoryTechs.findIndex(
        (technology) =>
          technology.id === effectiveSelectedTechId
      );
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex =
        (safeIndex + offset + categoryTechs.length) %
        categoryTechs.length;

      setSelectedTechId(categoryTechs[nextIndex].id);
    },
    [categoryTechs, effectiveSelectedTechId]
  );

  return (
    <Section id="skills" spacing="compact">
      <Container>
        <StaggerReveal>
          <StaggerItem>
            <SectionHeading
              eyebrow="Skills"
              title="Technology stack for real internal systems."
              description="A practical view of what I build with, what I use, and where those tools show up in actual projects."
            />
          </StaggerItem>
        </StaggerReveal>

        <motion.div
          variants={allowEntranceMotion ? panelMotion : undefined}
          initial={allowEntranceMotion ? "hidden" : false}
          whileInView={
            allowEntranceMotion ? "visible" : undefined
          }
          viewport={{ once: true, amount: 0.18 }}
          className={[
            "mt-10 overflow-hidden rounded-lg border border-white/10",
            "bg-white/[0.025] p-4 sm:p-5 lg:p-6",
          ].join(" ")}
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
            <div className="min-w-0">
              <CategoryTabs
                groups={skillGroups}
                activeId={activeCategory}
                onSelect={handleCategorySelect}
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeCategory}
                  initial={
                    allowEntranceMotion
                      ? { opacity: 0, y: 4 }
                      : false
                  }
                  animate={
                    allowEntranceMotion
                      ? { opacity: 1, y: 0 }
                      : undefined
                  }
                  exit={
                    allowEntranceMotion
                      ? { opacity: 0, y: -4 }
                      : undefined
                  }
                  transition={{ duration: 0.18 }}
                  className="mt-4 max-w-2xl text-sm leading-7 text-slate-500"
                >
                  {activeGroup?.description}
                </motion.p>
              </AnimatePresence>

              <div className="mt-6">
                <StackRail
                  technologies={categoryTechs}
                  activeCategory={activeCategory}
                  selectedId={effectiveSelectedTechId}
                  onSelect={setSelectedTechId}
                  onMove={handleMoveSelection}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </div>

            <TechnologySpotlight
              technology={selectedTechnology}
              allowMotion={allowComplexMotion}
            />
          </div>
        </motion.div>

        <div className="mt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Project Evidence
          </p>
          <ProjectEvidence />
        </div>

        <div className="mt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Secondary Capabilities
          </p>
          <CapabilityBands />
        </div>

        <div className="mt-4">
          <ItSupportSummary />
        </div>
      </Container>
    </Section>
  );
}
