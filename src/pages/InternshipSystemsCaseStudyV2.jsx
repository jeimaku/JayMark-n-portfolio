import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";

import { internshipSystems } from "../data";
import { getCaseStudyNeighbors } from "../data/caseStudyNavigation";
import LazyVideo from "../components/ui/LazyVideo";

import {
  CaseStudyHero,
  CaseStudyLayout,
  CaseStudyMediaLightbox,
  CaseStudyPager,
  CaseStudySection,
  CaseStudySectionNav,
  CaseStudyTechList,
} from "../components/v2/case-studies";

import { useMediaQuery } from "../hooks/useHeroRuntime";

const EASE = [0.22, 1, 0.36, 1];

const SECTIONS = [
  { id: "problem",      label: "Problem"      },
  { id: "system",       label: "System"       },
  { id: "workflow",     label: "Workflow"     },
  { id: "features",     label: "Features"     },
  { id: "architecture", label: "Architecture" },
  { id: "challenges",   label: "Challenges"   },
  { id: "outcome",      label: "Outcome"      },
];

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path d="M4.5 10h11m-4.25-4.25L15.5 10l-4.25 4.25" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckDot() {
  return <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />;
}

function Reveal({ children, delay = 0, reduced = false, className = "" }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(5px)" }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SystemFrame({ system, reduced, onOpen, eager = false }) {
  const video = system?.media?.video ?? null;
  const poster = system?.media?.cover ?? null;

  return (
    <figure className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
      <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 z-20 h-6 w-6 border-l-2 border-t-2 border-cyan-300/40" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 z-20 h-6 w-6 border-b-2 border-r-2 border-cyan-300/40" />
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        {video ? (
          <LazyVideo src={video} poster={poster} autoPlay={!reduced} muted loop playsInline preload={eager ? "metadata" : "none"} lazy={!eager} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.015]" />
        ) : poster ? (
          <img src={poster} alt={`${system.name} preview`} className="h-full w-full object-cover object-top" />
        ) : null}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur">
            <span className={["h-1.5 w-1.5 rounded-full", video && !reduced ? "animate-pulse bg-emerald-400" : "bg-slate-600"].join(" ")} />
            {video ? "System demo" : "Preview"}
          </span>
        </div>
        {onOpen && (
          <button type="button" onClick={() => onOpen(system)} aria-label={`Expand ${system.name} preview`} className="absolute bottom-4 right-4 z-10 rounded-full border border-white/15 bg-slate-950/80 px-3.5 py-2 text-[0.7rem] font-semibold text-white backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-200">
            Open demo ↗
          </button>
        )}
      </div>
      <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-slate-500">
        {system.name} — live interface demonstration
      </figcaption>
    </figure>
  );
}

function SystemMosaic({ systems, reduced }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {systems.slice(0, 4).map((system, i) => {
        const poster = system?.media?.cover ?? null;
        return (
          <motion.div key={system.id} initial={reduced ? false : { opacity: 0, scale: 0.93, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.65, delay: reduced ? 0 : 0.25 + i * 0.08, ease: EASE }} className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            {poster ? (
              <img src={poster} alt={`${system.name} screenshot`} className="aspect-video w-full object-cover object-top transition duration-500 group-hover:scale-105" />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-slate-900/80">
                <span className="text-[0.55rem] font-semibold uppercase tracking-widest text-slate-600">No preview</span>
              </div>
            )}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <p className="absolute bottom-2 left-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-cyan-200/90">
              {system.shortName ?? system.name}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

function WorkflowDiagram({ steps, reduced }) {
  return (
    <div className="relative mx-auto max-w-2xl">
      <motion.div aria-hidden="true" initial={reduced ? false : { scaleY: 0, opacity: 0 }} whileInView={reduced ? undefined : { scaleY: 1, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.2, ease: EASE }} className="pointer-events-none absolute bottom-4 left-1/2 top-4 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent" />
      <div className="relative flex flex-col gap-0">
        {steps.map((step, i) => {
          const isSystem = step.color === "cyan";
          const delay = reduced ? 0 : 0.08 + i * 0.1;
          return (
            <motion.div key={step.id} initial={reduced ? false : { opacity: 0, x: i % 2 === 0 ? -28 : 28, filter: "blur(4px)" }} whileInView={reduced ? undefined : { opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, delay, ease: EASE }} className={["relative flex", i % 2 === 0 ? "justify-start" : "justify-end"].join(" ")}>
              <div className={["relative w-[calc(50%-1.25rem)]", isSystem ? "rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.06] p-4 shadow-[0_8px_32px_rgba(8,145,178,0.10)]" : "py-3 pl-2 pr-4"].join(" ")}>
                <span aria-hidden="true" className={["absolute top-1/2 -translate-y-1/2", i % 2 === 0 ? "-right-[1.35rem]" : "-left-[1.35rem]", "h-2.5 w-2.5 rounded-full border-2", isSystem ? "border-cyan-300 bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.7)]" : "border-slate-600 bg-slate-950"].join(" ")} />
                {isSystem ? (
                  <>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cyan-300">System</p>
                    <p className="mt-1 text-sm font-semibold leading-tight text-white">{step.label}</p>
                    <p className="mt-1.5 text-xs leading-5 text-slate-400">{step.description}</p>
                  </>
                ) : (
                  <>
                    <p className="text-[0.68rem] font-semibold text-slate-400">{step.label}</p>
                    <p className="mt-0.5 text-[0.62rem] leading-5 text-slate-600">{step.description}</p>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ArchBlock({ label, value, delay, reduced }) {
  return (
    <Reveal delay={delay} reduced={reduced}>
      <div className="flex gap-4 border-t border-white/[0.07] py-5 first:border-t-0 first:pt-0">
        <span className="w-28 shrink-0 pt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</span>
        <p className="text-sm leading-7 text-slate-300">{value}</p>
      </div>
    </Reveal>
  );
}

function ChallengeCallout({ challenge, index, reduced }) {
  return (
    <Reveal delay={reduced ? 0 : index * 0.1} reduced={reduced}>
      <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
        <motion.div aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} whileInView={reduced ? undefined : { scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: reduced ? 0 : index * 0.1 + 0.2, ease: EASE }} className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300/80 via-cyan-300/25 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.06),transparent_20rem)]" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cyan-200">{challenge.system}</span>
            <span className="font-mono text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">{challenge.title}</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-rose-400/15 bg-rose-500/[0.03] p-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-rose-300">The Constraint</p>
              <p className="mt-2.5 text-sm leading-7 text-slate-400">{challenge.context}</p>
            </div>
            <div className="rounded-xl border border-emerald-400/15 bg-emerald-500/[0.03] p-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-emerald-300">The Decision</p>
              <p className="mt-2.5 text-sm leading-7 text-slate-400">{challenge.decision}</p>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function SystemFeatureRow({ system, index, reduced, onOpen }) {
  const [open, setOpen] = useState(false);
  const cs = system.caseStudy ?? {};
  const steps = cs.howItWorks ?? [];

  return (
    <Reveal delay={reduced ? 0 : index * 0.07} reduced={reduced}>
      <article className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition hover:border-white/15">

        {/* ── Clickable header ─────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:p-5"
        >
          <div className="flex min-w-0 items-center gap-4">
            <span className="font-mono text-[0.62rem] text-slate-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{system.name}</p>
              <p className="mt-0.5 text-[0.7rem] text-slate-500">{system.tagline}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden flex-wrap gap-1.5 sm:flex">
              {(system.tech ?? []).slice(0, 3).map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-slate-400">
                  {t}
                </span>
              ))}
            </div>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={["h-4 w-4 shrink-0 text-slate-400 transition duration-300", open ? "rotate-90" : ""].join(" ")}>
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        {/* ── Expandable case study body ───────────────────────────────── */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduced ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/[0.07] p-5 sm:p-6">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-start">

                  {/* Left — case study narrative */}
                  <div className="flex flex-col gap-5">

                    {/* Problem + What Changed */}
                    {(cs.problem || cs.solution) && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {cs.problem && (
                          <div className="rounded-xl border border-rose-400/15 bg-rose-500/[0.03] p-4">
                            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-rose-300">
                              The Problem
                            </p>
                            <p className="mt-2.5 text-xs leading-6 text-slate-400">
                              {cs.problem}
                            </p>
                          </div>
                        )}
                        {cs.solution && (
                          <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
                            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                              What Changed
                            </p>
                            <p className="mt-2.5 text-xs leading-6 text-slate-400">
                              {cs.solution}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* How it works — horizontal step flow */}
                    {steps.length > 0 && (
                      <div>
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          How it works
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
                          {steps.map((step, i) => (
                            <span key={step} className="flex items-center gap-2">
                              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.68rem] font-medium text-slate-300">
                                {step}
                              </span>
                              {i < steps.length - 1 && (
                                <span aria-hidden="true" className="font-mono text-[0.6rem] text-cyan-300/60">
                                  →
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key capabilities */}
                    {(system.keyFeatures ?? []).length > 0 && (
                      <div>
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Key capabilities
                        </p>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {(system.keyFeatures ?? []).map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5 text-xs leading-6 text-slate-300">
                              <CheckDot />{feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Engineering decision + Outcome */}
                    {(cs.challenge || cs.outcome) && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {cs.challenge && (
                          <div className="rounded-xl border border-amber-400/15 bg-amber-500/[0.025] p-4">
                            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-amber-300">
                              Engineering Decision
                            </p>
                            <p className="mt-2 text-[0.72rem] font-semibold leading-5 text-slate-200">
                              {cs.challenge.title}
                            </p>
                            <p className="mt-2 text-xs leading-6 text-slate-400">
                              {cs.challenge.description}
                            </p>
                          </div>
                        )}
                        {cs.outcome && (
                          <div className="rounded-xl border border-emerald-400/15 bg-emerald-500/[0.025] p-4">
                            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                              Outcome
                            </p>
                            <p className="mt-2.5 text-xs leading-6 text-slate-400">
                              {cs.outcome}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right — video demo + tech stack */}
                  <div className="flex flex-col gap-4">
                    <SystemFrame system={system} reduced={reduced} onOpen={onOpen} />

                    {/* Full tech stack */}
                    {(system.tech ?? []).length > 0 && (
                      <div>
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Built with
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {(system.tech ?? []).map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.025] px-2.5 py-1 text-[0.62rem] font-semibold text-slate-400"
                            >
                              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cyan-300/60" />
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}


function MissingData() {
  return (
    <CaseStudyLayout projectLabel="Internship Systems Case Study">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-20 sm:px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.025] p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Project data unavailable</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white">Internship Systems Suite could not load.</h1>
          <a href="/#projects" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950">Return to projects</a>
        </div>
      </section>
    </CaseStudyLayout>
  );
}

export default function InternshipSystemsCaseStudyV2() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const systems = useMemo(() => internshipSystems?.systems?.filter(Boolean) ?? [], []);
  const [activeMedia, setActiveMedia] = useState(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 105, damping: 28, mass: 0.22, restDelta: 0.001 });
  const { previousProject, nextProject } = getCaseStudyNeighbors("internship-systems");

  useEffect(() => {
    const prev = document.title;
    document.title = "Internship Systems Case Study | Jay Mark Apelado";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return () => { document.title = prev; };
  }, []);

  if (systems.length === 0) return <MissingData />;

  const arch = internshipSystems.architecture ?? {};
  const challenges = internshipSystems.engineeringChallenges ?? [];
  const workflow = internshipSystems.workflow ?? [];
  const allTech = [...new Set(systems.flatMap((s) => s.tech ?? []))];

  const openMedia = (system) => {
    const video = system?.media?.video ?? null;
    const poster = system?.media?.cover ?? null;
    const src = video ?? poster;
    if (!src) return;
    setActiveMedia({ type: video ? "video" : "image", src, poster, title: system.name, alt: `${system.name} interface preview`, caption: `${system.name} workflow and interface demonstration.` });
  };

  const heroMetadata = [
    { label: "Role",     value: "Full-Stack Developer & IT Intern" },
    { label: "Timeline", value: "2026" },
    { label: "Systems",  value: `${systems.length} internal applications` },
  ];

  const heroActions = [
    { label: "See the Systems",    href: "#features",   external: false },
    { label: "Return to Projects", href: "/#projects",  external: false },
  ];

  return (
    <CaseStudyLayout projectLabel="Internship Systems Case Study">
      {/* Scroll progress bar */}
      <motion.div aria-hidden="true" style={{ scaleX: smoothProgress }} className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-cyan-200 to-indigo-300 shadow-[0_0_16px_rgba(34,211,238,0.55)]" />

      {/* ── Hero ── */}
      <motion.div initial={reduced ? false : { opacity: 0, y: 32, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.82, ease: EASE }}>
        <CaseStudyHero
          eyebrow="Internship Engineering Work · 2026"
          title="Four Internal Systems. One Engineering Internship."
          subtitle="From inquiry management to hardware lifecycle tracking — built and shipped inside a real company."
          summary="A suite of full-stack applications developed to replace manual, spreadsheet-driven workflows across lead management, virtual office operations, IT helpdesk, and hardware asset tracking at Launchpad Coworking and Paysera."
          metadata={heroMetadata}
          actions={heroActions}
          media={
            <motion.div initial={reduced ? false : { opacity: 0, x: 34, scale: 0.94, filter: "blur(7px)" }} animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: reduced ? 0 : 0.15, ease: EASE }} className="relative">
              <motion.div aria-hidden="true" initial={{ x: "-120%" }} animate={{ x: "150%" }} transition={{ duration: 1.4, delay: reduced ? 0 : 0.6, ease: EASE }} className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-xl" />
              <SystemMosaic systems={systems} reduced={reduced} />
              <motion.div initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: reduced ? 0 : 0.65, ease: EASE }} className="mt-4 flex flex-wrap gap-2">
                {["React.js", "Node.js", "Express.js", "MySQL", "Tailwind CSS"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-slate-400">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />{t}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          }
        />
      </motion.div>

      <CaseStudySectionNav sections={SECTIONS} />

      {/* ── 01 Problem ── */}
      <CaseStudySection id="problem" headingId="problem-heading" eyebrow="The Problem" title="Operations were running, but nothing was trackable." tone="elevated">
        <Reveal reduced={reduced}>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-9 text-slate-300">{internshipSystems.problem}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Lead chaos",       body: "Inquiries from four channels with no unified record. Prospects lost between tools." },
                { label: "No support trail", body: "IT requests submitted by chat. No priority, no status, no escalation path." },
                { label: "Silent hardware",  body: "Devices deployed without a system. Warranties expired unnoticed. Returns unscheduled." },
              ].map((item, i) => (
                <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, delay: reduced ? 0 : i * 0.1, ease: EASE }} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-rose-300">{item.label}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </CaseStudySection>

      {/* ── 02 System ── */}
      <CaseStudySection id="system" headingId="system-heading" eyebrow="The System" title="Four applications. Each scoped to one operational domain." description="Rather than a single monolithic system, each workflow got its own focused application — sharing a consistent stack and deployment target." tone="subtle">
        <Reveal reduced={reduced}>
          <div className="flex flex-wrap gap-3">
            {systems.map((s, i) => (
              <motion.a key={s.id} href="#features" initial={reduced ? false : { opacity: 0, x: -16 }} whileInView={reduced ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.08, ease: EASE }} className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] hover:text-white">
                <span className="font-mono text-[0.65rem] text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                {s.shortName ?? s.name}
                <span className="transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRight /></span>
              </motion.a>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <Reveal reduced={reduced} delay={0.1}>
            <div className="flex flex-col gap-6">
              <p className="text-sm leading-8 text-slate-400">All four systems share a <strong className="font-semibold text-slate-200">React + Node.js + Express + MySQL</strong> stack. Interfaces are component-driven and styled with Tailwind CSS. Each system exposes a REST API consumed by its frontend, with auth middleware and operational logic scoped per domain.</p>
              <p className="text-sm leading-8 text-slate-400">The systems were built sequentially during the internship, with each one deployed for actual staff use before development moved to the next. That constraint shaped a focus on shipping working software over building infrastructure.</p>
            </div>
          </Reveal>
          <Reveal reduced={reduced} delay={0.18}>
            <SystemFrame system={systems[0]} reduced={reduced} onOpen={openMedia} eager />
          </Reveal>
        </div>
      </CaseStudySection>

      {/* ── 03 Workflow ── */}
      <CaseStudySection id="workflow" headingId="workflow-heading" eyebrow="Core Workflow" title="How the four systems map to operational lifecycles." description="Each system intercepts a distinct moment in the company's operations. Together they cover the full lifecycle from first contact to asset retirement." tone="elevated">
        <WorkflowDiagram steps={workflow} reduced={reduced} />
      </CaseStudySection>

      {/* ── 04 Features ── */}
      <CaseStudySection id="features" headingId="features-heading" eyebrow="Key Features" title="What each system does." description="Click a system to expand its capabilities and see the live interface demo." tone="subtle">
        <div className="flex flex-col gap-3">
          {systems.map((system, i) => (
            <SystemFeatureRow key={system.id} system={system} index={i} reduced={reduced} onOpen={openMedia} />
          ))}
        </div>
      </CaseStudySection>

      {/* ── 05 Architecture ── */}
      <CaseStudySection id="architecture" headingId="architecture-heading" eyebrow="Technical Architecture" title="Shared stack, domain-specific schemas." tone="elevated">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <Reveal reduced={reduced}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-2">
              {[
                { label: "Frontend",     value: arch.frontend },
                { label: "Backend",      value: arch.backend },
                { label: "Database",     value: arch.database },
                { label: "Deployment",   value: arch.deployment },
                { label: "Integrations", value: arch.integrations },
              ].filter((r) => r.value).map((row, i) => (
                <ArchBlock key={row.label} label={row.label} value={row.value} delay={i * 0.07} reduced={reduced} />
              ))}
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal reduced={reduced} delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Technology Stack</p>
                <div className="mt-4">
                  <CaseStudyTechList technologies={allTech} ariaLabel="Shared technology stack" />
                </div>
              </div>
            </Reveal>
            <Reveal reduced={reduced} delay={0.18}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Module Structure</p>
                <div className="mt-4 flex flex-col gap-2 font-mono text-xs">
                  {[
                    { label: "React Frontend",   desc: "UI · State · Routing",   color: "cyan"    },
                    { label: "Express REST API",  desc: "Auth · Business Logic",  color: "indigo"  },
                    { label: "MySQL Database",    desc: "Per-domain schema",      color: "emerald" },
                  ].map((mod, i) => (
                    <motion.div key={mod.label} initial={reduced ? false : { opacity: 0, x: 12 }} whileInView={reduced ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: reduced ? 0 : 0.2 + i * 0.08, ease: EASE }} className={["flex items-center justify-between rounded-xl border px-3.5 py-2.5", mod.color === "cyan" ? "border-cyan-300/20 bg-cyan-300/[0.04]" : "", mod.color === "indigo" ? "border-indigo-400/20 bg-indigo-400/[0.04]" : "", mod.color === "emerald" ? "border-emerald-400/20 bg-emerald-400/[0.04]" : ""].join(" ")}>
                      <span className={["font-semibold", mod.color === "cyan" ? "text-cyan-200" : "", mod.color === "indigo" ? "text-indigo-200" : "", mod.color === "emerald" ? "text-emerald-200" : ""].join(" ")}>{mod.label}</span>
                      <span className="text-slate-600">{mod.desc}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </CaseStudySection>

      {/* ── 06 Challenges ── */}
      <CaseStudySection id="challenges" headingId="challenges-heading" eyebrow="Engineering Challenges" title="Two hard decisions worth explaining." description="Not every problem had a clean solution. These two required explicit trade-offs." tone="subtle">
        <div className="flex flex-col gap-6">
          {challenges.map((ch, i) => (
            <ChallengeCallout key={ch.id} challenge={ch} index={i} reduced={reduced} />
          ))}
        </div>
      </CaseStudySection>

      {/* ── 07 Outcome ── */}
      <CaseStudySection id="outcome" headingId="outcome-heading" eyebrow="Outcome" title="What the work demonstrates." tone="elevated">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Reveal reduced={reduced}>
            <p className="text-lg leading-9 text-slate-300">{internshipSystems.outcome}</p>
            <div className="mt-8 flex flex-col gap-3">
              {[
                { eyebrow: "Product thinking",    text: "Each system was shaped around the actual sequence of tasks staff needed to perform — not an idealized feature set." },
                { eyebrow: "Technical delivery",  text: "Frontend development, API design, database modeling, validation, and business logic combined across four distinct problem domains." },
                { eyebrow: "Professional context",text: "The internship also included hardware support, networking, server work, and documentation — software was one part of a broader IT role." },
              ].map((item, i) => (
                <motion.div key={item.eyebrow} initial={reduced ? false : { opacity: 0, x: -18 }} whileInView={reduced ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.09, ease: EASE }} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <CheckDot />
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cyan-200">{item.eyebrow}</p>
                    <p className="mt-1.5 text-sm leading-7 text-slate-400">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal reduced={reduced} delay={0.12}>
              <SystemFrame system={systems[1]} reduced={reduced} onOpen={openMedia} />
            </Reveal>
            <Reveal reduced={reduced} delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
                <motion.div aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} whileInView={reduced ? undefined : { scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.3, ease: EASE }} className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300 via-cyan-200/40 to-transparent" />
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cyan-200">Confidentiality</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">These systems were built for internal operational use. The case study focuses on architecture, workflow design, interface behavior, and technical contribution without exposing private company records, credentials, or operational data.</p>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal reduced={reduced} delay={0.15} className="mt-14">
          <CaseStudyPager previousProject={previousProject} nextProject={nextProject} />
          <div className="mt-5">
            <a href="/#contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950">
              Discuss a project
            </a>
          </div>
        </Reveal>
      </CaseStudySection>

      <CaseStudyMediaLightbox media={activeMedia} reducedMotion={reduced} onClose={() => setActiveMedia(null)} />
    </CaseStudyLayout>
  );
}
