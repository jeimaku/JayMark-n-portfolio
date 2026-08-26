import { motion } from "motion/react";

import Container from "../../layout/Container";
import Section from "../../layout/Section";
import SectionHeading from "./SectionHeading";
import InfrastructurePanel from "./skills/InfrastructurePanel";
import TechMarquee from "./skills/TechMarquee";

import {
  capabilityMarqueeLanes,
  creativeTechnologies,
  itSupportCapabilities,
  primaryStackLanes,
  technologies,
} from "../../../data";
import useSkillsMotion from "../../../hooks/useSkillsMotion";

const EASE = [0.22, 1, 0.36, 1];

const technologyById = new Map(
  [...technologies, ...creativeTechnologies].map((technology) => [
    technology.id,
    technology,
  ])
);

function SectionLabel({ number, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[0.64rem] font-semibold tracking-[0.2em] text-cyan-300/70">
        {number}
      </span>
      <span aria-hidden="true" className="h-px w-8 bg-cyan-300/45" />
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-cyan-100">
        {children}
      </p>
    </div>
  );
}

function revealProps(allowMotion, delay = 0) {
  return {
    initial: allowMotion
      ? { opacity: 0, y: 24, filter: "blur(5px)" }
      : false,
    whileInView: allowMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : undefined,
    viewport: { once: true, amount: 0.16, margin: "0px 0px -8% 0px" },
    transition: { duration: 0.68, delay, ease: EASE },
  };
}

export default function SkillsSection() {
  const {
    allowComplexMotion,
    allowEntranceMotion,
    prefersReducedMotion,
  } = useSkillsMotion();

  return (
    <Section
      id="skills"
      spacing="compact"
      optimize={false}
      className="isolate"
    >
      <div data-skills-motion-scene="" className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 top-28 -z-10 h-80 w-80 rounded-full bg-cyan-300/[0.06] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-[42%] -z-10 h-80 w-80 rounded-full bg-indigo-400/[0.06] blur-3xl"
        />

        <Container>
          <motion.div {...revealProps(allowEntranceMotion)}>
            <SectionHeading
              eyebrow="Skills"
              title="Technology stack for real internal systems."
              description="A practical overview of the tools I use to design, build, and support real-world applications."
            />
          </motion.div>

          <motion.section
            {...revealProps(allowEntranceMotion, 0.06)}
            aria-labelledby="skills-primary-stack"
            className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-white/[0.11] bg-white/[0.025] p-4 shadow-[0_26px_80px_rgba(0,0,0,0.22)] sm:mt-14 sm:p-6 lg:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:38px_38px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-cyan-300/[0.08] blur-3xl"
            />

            <div className="relative">
              <div className="flex flex-col gap-4 border-b border-white/[0.1] px-1 pb-6 sm:px-2 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <SectionLabel number="01">
                    Primary development stack
                  </SectionLabel>

                  <h3
                    id="skills-primary-stack"
                    className="mt-5 text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl"
                  >
                    Core application layers.
                  </h3>
                </div>

                <p className="max-w-md text-sm leading-6 text-slate-400">
                  A continuously moving view of the technologies that carry an
                  internal system from interface to data.
                </p>
              </div>

              <div className="mt-6 sm:mt-8">
                <TechMarquee
                  lanes={primaryStackLanes}
                  technologyById={technologyById}
                  primary
                  prefersReducedMotion={prefersReducedMotion}
                  ariaLabel="Primary development technology stack"
                />
              </div>
            </div>
          </motion.section>

          <motion.section
            {...revealProps(allowEntranceMotion, 0.08)}
            aria-labelledby="skills-secondary-capabilities"
            className="relative mt-14 border-y border-white/[0.1] py-8 sm:mt-16 sm:py-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200/45 to-transparent"
            />

            <div className="flex flex-col gap-4 px-1 sm:px-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionLabel number="02">
                  Secondary capabilities
                </SectionLabel>

                <h3
                  id="skills-secondary-capabilities"
                  className="mt-5 text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl"
                >
                  The supporting toolchain.
                </h3>
              </div>

              <p className="max-w-md text-sm leading-6 text-slate-400">
                Development, AI, and creative tools moving on separate rhythms.
              </p>
            </div>

            <div className="mt-7 sm:mt-8">
              <TechMarquee
                lanes={capabilityMarqueeLanes}
                technologyById={technologyById}
                prefersReducedMotion={prefersReducedMotion}
                ariaLabel="Secondary capability technology stack"
              />
            </div>
          </motion.section>

          <motion.div
            {...revealProps(allowEntranceMotion, 0.1)}
            className="mt-14 sm:mt-16"
          >
            <div className="mb-6 px-1 sm:px-2">
              <SectionLabel number="03">
                IT support / hardware experience
              </SectionLabel>
            </div>

            <InfrastructurePanel
              capabilities={itSupportCapabilities}
              allowMotion={allowComplexMotion}
            />
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
