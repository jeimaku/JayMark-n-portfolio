import { motion } from "motion/react";

import Container from "../../layout/Container";
import Section from "../../layout/Section";
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

function revealProps(allowMotion, delay = 0) {
  return {
    initial: allowMotion ? { opacity: 0, y: 16 } : false,
    whileInView: allowMotion ? { opacity: 1, y: 0 } : undefined,
    viewport: {
      once: true,
      amount: 0.16,
      margin: "0px 0px -8% 0px",
    },
    transition: {
      duration: allowMotion ? 0.55 : 0,
      delay: allowMotion ? delay : 0,
      ease: EASE,
    },
  };
}

function MarqueeLabel({ id, children }) {
  return (
    <h3
      id={id}
      className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-neutral-400"
    >
      {children}
    </h3>
  );
}

export default function SkillsSection() {
  const {
    allowEntranceMotion,
    isMobile,
    prefersReducedMotion,
  } = useSkillsMotion();

  const useStaticMarquees =
    prefersReducedMotion || isMobile;

  return (
    <Section
      id="skills"
      spacing="compact"
      optimize={false}
      className="isolate"
    >
      <div data-skills-motion-scene="">
        <Container>
          <motion.header
            {...revealProps(allowEntranceMotion)}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-200">
              Skills
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-[3.5rem]">
              Tools for real-world systems.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              A focused set of technologies I use to design, build, and support
              real-world systems.
            </p>
          </motion.header>
        </Container>

        <motion.section
          {...revealProps(allowEntranceMotion, 0.06)}
          aria-labelledby="skills-core-stack"
          className="mt-12 sm:mt-14"
        >
          <Container>
            <MarqueeLabel id="skills-core-stack">
              Core stack
            </MarqueeLabel>
          </Container>

          <div className="mt-5">
            <TechMarquee
              lanes={primaryStackLanes}
              technologyById={technologyById}
              primary
              fullBleed
              staticLayout={useStaticMarquees}
              ariaLabel="Core technology stack"
            />
          </div>
        </motion.section>

        <motion.section
          {...revealProps(allowEntranceMotion, 0.1)}
          aria-labelledby="skills-supporting-tools"
          className="mt-16 sm:mt-20"
        >
          <Container>
            <MarqueeLabel id="skills-supporting-tools">
              Supporting tools
            </MarqueeLabel>
          </Container>

          <div className="mt-5">
            <TechMarquee
              lanes={capabilityMarqueeLanes}
              technologyById={technologyById}
              fullBleed
              staticLayout={useStaticMarquees}
              ariaLabel="Supporting technology tools"
            />
          </div>
        </motion.section>

        <Container>
          <motion.div
            {...revealProps(allowEntranceMotion, 0.14)}
            className="mt-20 sm:mt-24"
          >
            <InfrastructurePanel
              capabilities={itSupportCapabilities}
              allowMotion={allowEntranceMotion}
            />
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
