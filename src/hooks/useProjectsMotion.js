import {
  useRef,
  useState,
} from "react";

import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import useMotionRuntime from "./useMotionRuntime";

export default function useProjectsMotion({
  projectCount = 2,
} = {}) {
  const sectionRef = useRef(null);

  const [activeProjectIndex, setActiveProjectIndex] =
    useState(0);

  const {
    allowEntranceMotion,
    allowScrollLinkedMotion,
    allowComplexMotion,
    prefersReducedMotion,
    isMobile,
    isTablet,
    hasCoarsePointer,
  } = useMotionRuntime();

  const {
    scrollYProgress: rawScrollProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  const scrollYProgress = useSpring(
    rawScrollProgress,
    {
      stiffness: 100,
      damping: 27,
      mass: 0.24,
      restDelta: 0.001,
    }
  );

  /*
   * The horizontal track is wider than the viewport.
   * For two projects, moving -50% shifts the track by
   * exactly one viewport-width project panel.
   */
  const finalTrackPosition =
    projectCount > 1
      ? -(
          ((projectCount - 1) /
            projectCount) *
          100
        )
      : 0;

  const trackX = useTransform(
    scrollYProgress,
    [0.08, 0.92],
    [
      "0%",
      `${finalTrackPosition}%`,
    ]
  );

  /*
   * The section heading settles into place, then gently
   * rises as the horizontal sequence reaches its end.
   */
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.78, 1],
    [28, 0, 0, -24]
  );

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.88, 1],
    [0.35, 1, 1, 0.5]
  );

  /*
   * Ambient lighting moves independently from the content.
   */
  const primaryGlowX = useTransform(
    scrollYProgress,
    [0, 1],
    ["-15%", "55%"]
  );

  const primaryGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.12, 0.7, 0.55, 0.12]
  );

  const secondaryGlowX = useTransform(
    scrollYProgress,
    [0, 1],
    ["70%", "5%"]
  );

  const secondaryGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.78, 1],
    [0.05, 0.4, 0.65, 0.15]
  );

  /*
   * The bottom sequence line represents movement through
   * the project collection.
   */
  const progressScaleX = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    [0, 1]
  );

  const progressOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1],
    [0, 1, 1, 0.3]
  );

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latestProgress) => {
      if (
        !allowComplexMotion ||
        projectCount <= 1
      ) {
        return;
      }

      const nextIndex = Math.min(
        projectCount - 1,
        Math.max(
          0,
          Math.round(
            latestProgress *
              (projectCount - 1)
          )
        )
      );

      setActiveProjectIndex(
        (currentIndex) =>
          currentIndex === nextIndex
            ? currentIndex
            : nextIndex
      );
    }
  );

  const trackStyle =
    allowComplexMotion
      ? {
          x: trackX,
        }
      : undefined;

  const headingStyle =
    allowScrollLinkedMotion
      ? {
          y: headingY,
          opacity: headingOpacity,
        }
      : undefined;

  const primaryGlowStyle =
    allowScrollLinkedMotion
      ? {
          x: primaryGlowX,
          opacity:
            primaryGlowOpacity,
        }
      : undefined;

  const secondaryGlowStyle =
    allowScrollLinkedMotion
      ? {
          x: secondaryGlowX,
          opacity:
            secondaryGlowOpacity,
        }
      : undefined;

  const progressStyle =
    allowScrollLinkedMotion
      ? {
          scaleX: progressScaleX,
          opacity: progressOpacity,
        }
      : undefined;

  return {
    sectionRef,
    scrollYProgress,
    activeProjectIndex,

    trackStyle,
    headingStyle,
    primaryGlowStyle,
    secondaryGlowStyle,
    progressStyle,

    allowEntranceMotion,
    allowScrollLinkedMotion,
    allowComplexMotion,

    prefersReducedMotion,
    isMobile,
    isTablet,
    hasCoarsePointer,
  };
}