import Footer from "../components/v2/Footer";

import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";

import {
  AboutSection,
  CertificationsSection,
  ContactSection,
  CreativeWorkSection,
  ExperienceEducationSection,
  ProjectsSection,
  SkillsSection,
} from "../components/v2/sections";

import { ScrollMotionShell } from "../components/v2/motion";

import useHeroAboutTransition from "../hooks/useHeroAboutTransition";
import { heroContent } from "../data/heroContent";


/* ─── Animation helpers ──────────────────────────────────────────────────── */

/*
 * Using motion/react for all entrance animations.
 * This correctly respects reduced-motion at the JS level —
 * no inline style + CSS keyframe conflicts.
 */
const EASE = [0.22, 1, 0.36, 1];

function useFadeUp(delay = 0) {
  const reduced = Boolean(useReducedMotion());

  return {
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.72, ease: EASE },
  };
}

/* ─── Portrait ───────────────────────────────────────────────────────────── */

/* ─── CTA icons ──────────────────────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
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

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M6 2.75h5.25L15 6.5v10.75H6V2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M11 2.75V6.5h4M8.25 10h4.5M8.25 13h4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Scroll chevron ─────────────────────────────────────────────────────── */

function ScrollChevron() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 [animation:heroChevronBounce_2.4s_ease-in-out_2.5s_infinite] motion-reduce:hidden"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 text-neutral-600"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ─── HeroContent ────────────────────────────────────────────────────────── */

function HeroContent() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 text-center sm:px-8">

      {/* Status badge */}
      <motion.div {...useFadeUp(0.2)}>
        <div
          role="status"
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-neutral-400"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>

          {heroContent.statusLabel}
        </div>
      </motion.div>

      {/* Monogram */}
      <motion.p
        {...useFadeUp(0.3)}
        aria-hidden="true"
        className="mb-4 font-mono text-sm font-semibold tracking-[0.55em] text-neutral-300/55"
      >
        JM
      </motion.p>

      {/* Name */}
      <motion.h1
        id="hero-title"
        {...useFadeUp(0.38)}
      >
        <span className="block text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl md:text-7xl">
          {heroContent.name}
        </span>

        {/* Dual-line role */}
        <span className="mt-5 block">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-100/80 sm:text-xs">
            Full-Stack Developer
          </span>

          <span
            aria-hidden="true"
            className="mx-3 inline-block text-[0.65rem] text-neutral-600 sm:text-xs"
          >
            •
          </span>

          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-100/80 sm:text-xs">
            IT Support Specialist
          </span>
        </span>
      </motion.h1>

      {/* Summary */}
      <motion.p
        {...useFadeUp(0.52)}
        className="mx-auto mt-7 max-w-lg text-base leading-8 text-neutral-400 sm:text-lg"
      >
        {heroContent.summary}
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        {...useFadeUp(0.65)}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
      <a
        href={heroContent.primaryAction.href}
        className="
          group
          inline-flex
          min-h-12
          w-full
          items-center
          justify-center
          gap-2
          rounded-full
          bg-white
          px-7
          py-3
          text-sm
          font-semibold
          text-black
          shadow-[0_12px_36px_rgba(0,0,0,0.25)]
          transition
          duration-300
          hover:-translate-y-0.5
          hover:bg-neutral-200
          hover:text-black
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-offset-4
          focus-visible:ring-offset-neutral-950
          sm:w-auto
        "
      >
        {heroContent.primaryAction.label}
        <ArrowIcon />
      </a>

        <a
          href={heroContent.resumeAction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-neutral-100/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 sm:w-auto"
        >
          <DocumentIcon />
          {heroContent.resumeAction.label}
        </a>
      </motion.div>
    </div>
  );
}

/* ─── HomeV2 ─────────────────────────────────────────────────────────────── */

export default function HomeV2() {
  const {
    heroSceneRef,
    heroCopyStyle,
    heroBackgroundStyle,
    transitionVeilStyle,
    transitionGlowStyle,
    transitionLineStyle,
  } = useHeroAboutTransition();

  /* ── Document title + meta description ── */
  useEffect(() => {
    const previousTitle = document.title;

    document.title =
      "Jay Mark Apelado | Full-Stack Developer Portfolio";

    let description = document.querySelector(
      'meta[name="description"]'
    );

    const createdDescription = !description;

    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }

    const previousDescription = description.getAttribute("content");

    description.setAttribute(
      "content",
      "Portfolio of Jay Mark Apelado, showcasing full-stack applications, operational systems, AI-assisted platforms, technical experience, and professional certifications."
    );

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        description.remove();
        return;
      }

      if (previousDescription !== null) {
        description.setAttribute("content", previousDescription);
      } else {
        description.removeAttribute("content");
      }
    };
  }, []);

  return (
    <ScrollMotionShell>
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-transparent text-neutral-50 focus:outline-none"
      >
        {/* ── Hero scroll scene wrapper ─────────────────────────────────
            Extra height beyond 100vh gives the scroll-exit transition
            its parallax window. The inner section is sticky.
        ──────────────────────────────────────────────────────────────── */}
        <div
          ref={heroSceneRef}
          data-hero-scroll-scene=""
          className="relative min-h-[125vh] sm:min-h-[135vh] xl:min-h-[150vh]"
        >
          <section
            id="home"
            aria-labelledby="hero-title"
            className="sticky top-0 isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-950/72 pb-16 pt-20 sm:pt-24"
          >
            {/* ── Animated ambient background ────────────────────────── */}
            <motion.div
              aria-hidden="true"
              style={heroBackgroundStyle}
              className="pointer-events-none absolute inset-0 -z-10 origin-center will-change-transform"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_42%,rgba(255,255,255,0.055),transparent_68%)]" />

              <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(163,163,163,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(163,163,163,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />
            </motion.div>

            {/* ── Hero copy — scroll-linked fade/rise exit ───────────── */}
            <motion.div
              style={heroCopyStyle}
              className="relative z-10 will-change-transform"
            >
              <HeroContent />
            </motion.div>

            {/* ── Scroll indicator ───────────────────────────────────── */}
            <ScrollChevron />

            {/* ── Hero-to-About transition graphics ──────────────────── */}
            <motion.div
              aria-hidden="true"
              style={transitionVeilStyle}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[38vh] bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-transparent"
            />

            <motion.div
              aria-hidden="true"
              style={transitionGlowStyle}
              className="pointer-events-none absolute bottom-[-8rem] left-1/2 z-30 h-64 w-[min(80rem,92vw)] -translate-x-1/2 rounded-full bg-neutral-100/[0.055] blur-3xl"
            />

            <motion.div
              aria-hidden="true"
              style={transitionLineStyle}
              className="pointer-events-none absolute inset-x-4 bottom-0 z-40 mx-auto h-px max-w-[90rem] origin-center bg-gradient-to-r from-transparent via-white/70 to-transparent shadow-[0_0_22px_rgba(255,255,255,0.15)]"
            />
          </section>
        </div>

        {/* ── Below-the-fold sections — untouched ──────────────────────── */}
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CreativeWorkSection />
        <ExperienceEducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
    </ScrollMotionShell>
  );
}
