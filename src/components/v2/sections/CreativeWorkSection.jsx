import { useState } from "react";
import { motion } from "motion/react";

import Container from "../../layout/Container";
import Section from "../../layout/Section";

import {
  creativeWorkArtworks,
  creativeWorkMarqueeLanes,
} from "../../../data";
import useMotionRuntime from "../../../hooks/useMotionRuntime";

import CreativeLightbox from "../creative/CreativeLightbox";
import CreativeMarquee from "../creative/CreativeMarquee";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1];

function headingRevealProps(allowEntranceMotion) {
  return {
    initial: allowEntranceMotion
      ? { opacity: 0, y: 24, filter: "blur(5px)" }
      : false,
    whileInView: allowEntranceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : undefined,
    viewport: {
      once: true,
      amount: 0.16,
    },
    transition: {
      duration: 0.68,
      ease: EASE,
    },
  };
}

export default function CreativeWorkSection() {
  const [activeArtworkIndex, setActiveArtworkIndex] =
    useState(null);
  const {
    allowEntranceMotion,
    isMobile,
    prefersReducedMotion,
  } = useMotionRuntime();

  const openArtwork = (artworkId) => {
    const nextIndex = creativeWorkArtworks.findIndex(
      (artwork) => artwork.id === artworkId
    );

    if (nextIndex >= 0) {
      setActiveArtworkIndex(nextIndex);
    }
  };

  return (
    <Section
      id="creative-work"
      spacing="compact"
      optimize={false}
      className="isolate bg-slate-950/[0.46]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[min(72rem,96vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.045] blur-3xl"
      />

      <Container>
        <motion.div {...headingRevealProps(allowEntranceMotion)}>
          <SectionHeading
            eyebrow="Selected Visual Work"
            title="Design beyond the code."
            description="A selection of interface explorations, prototypes, and visual design work."
          />
        </motion.div>

        <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/[0.11] bg-slate-950/[0.34] py-4 shadow-[0_28px_88px_rgba(0,0,0,0.26)] sm:mt-12 sm:py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(34,211,238,0.04),transparent_30%,rgba(99,102,241,0.035))]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/35 to-transparent"
          />

          <CreativeMarquee
            allowEntranceMotion={allowEntranceMotion}
            artworks={creativeWorkArtworks}
            lanes={creativeWorkMarqueeLanes}
            onOpen={openArtwork}
            paused={activeArtworkIndex !== null}
            staticLayout={isMobile || prefersReducedMotion}
          />
        </div>
      </Container>

      <CreativeLightbox
        images={creativeWorkArtworks}
        activeIndex={activeArtworkIndex}
        onClose={() => setActiveArtworkIndex(null)}
        onNavigate={setActiveArtworkIndex}
        reducedMotion={prefersReducedMotion}
      />
    </Section>
  );
}
