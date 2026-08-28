import {
  motion,
  useScroll,
  useSpring,
} from "motion/react";

import useMotionRuntime from "../../../hooks/useMotionRuntime";

import {
  scrollMotionConfig,
} from "../../../data/scrollMotionConfig";

export default function ScrollProgress() {
  const {
    scrollYProgress,
  } = useScroll();

  const {
    allowScrollLinkedMotion,
  } = useMotionRuntime();

  const smoothProgress = useSpring(
    scrollYProgress,
    scrollMotionConfig.progress.spring
  );

  if (!allowScrollLinkedMotion) {
    return null;
  }

  return (
    <>
      {/* Mobile and tablet progress line */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] bg-white/[0.06] lg:hidden"
      >
        <motion.div
          style={{
            scaleX: smoothProgress,
          }}
          className="h-full origin-left bg-gradient-to-r from-neutral-300 via-white to-neutral-400 shadow-[0_0_16px_rgba(255,255,255,0.2)]"
        />
      </div>

      {/* Desktop progress rail */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-[18%] left-4 top-[18%] z-[45] hidden w-px bg-white/[0.07] lg:block 2xl:left-6"
      >
        <motion.div
          style={{
            scaleY: smoothProgress,
          }}
          className="h-full origin-top bg-gradient-to-b from-neutral-300 via-white to-neutral-400 shadow-[0_0_18px_rgba(255,255,255,0.18)]"
        />

        <div className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full border border-white/40 bg-neutral-950" />

        <div className="absolute -bottom-[1px] -left-[3px] h-[7px] w-[7px] rounded-full border border-neutral-300/40 bg-neutral-950" />
      </div>
    </>
  );
}