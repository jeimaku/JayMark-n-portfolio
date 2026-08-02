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

export default function useExperienceEducationMotion({
  experienceCount = 3,
} = {}) {
  const sectionRef = useRef(null);

  const [activeExperienceIndex, setActiveExperienceIndex] =
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
      "start end",
      "end start",
    ],
  });

  const scrollYProgress = useSpring(
    rawScrollProgress,
    {
      stiffness: 100,
      damping: 28,
      mass: 0.24,
      restDelta: 0.001,
    }
  );

  /*
   * The section heading settles as Experience enters,
   * remains readable through the timeline, and subtly
   * lifts as Education leaves the viewport.
   */
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.82, 1],
    [
      allowComplexMotion ? 44 : 18,
      0,
      0,
      allowComplexMotion ? -34 : -12,
    ]
  );

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.35, 1, 1, 0.45]
  );

  /*
   * Experience occupies approximately the opening
   * two-thirds of the combined section.
   */
  const timelineScaleY = useTransform(
    scrollYProgress,
    [0.07, 0.19, 0.62, 0.7],
    [0, 0.08, 1, 1]
  );

  const timelineOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.68, 0.78],
    [0, 1, 1, 0.3]
  );

  /*
   * The transition line introduces Education after
   * the final experience checkpoint.
   */
  const educationBridgeScaleX = useTransform(
    scrollYProgress,
    [0.55, 0.7, 0.82],
    [0, 0.4, 1]
  );

  const educationBridgeOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.62, 0.86, 1],
    [0, 1, 1, 0.3]
  );

  /*
   * Background lighting travels down the professional
   * timeline and shifts toward Education.
   */
  const primaryGlowY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      allowComplexMotion ? 160 : 50,
      allowComplexMotion ? -160 : -50,
    ]
  );

  const primaryGlowX = useTransform(
    scrollYProgress,
    [0, 0.52, 1],
    [
      allowComplexMotion ? "-18%" : "-8%",
      allowComplexMotion ? "24%" : "10%",
      allowComplexMotion ? "48%" : "18%",
    ]
  );

  const primaryGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.13, 0.72, 1],
    [0, 0.58, 0.42, 0]
  );

  const secondaryGlowY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      allowComplexMotion ? 100 : 30,
      allowComplexMotion ? -100 : -30,
    ]
  );

  const secondaryGlowOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.56, 0.88, 1],
    [0, 0.15, 0.55, 0.08]
  );

  /*
   * Update active timeline state only when the visitor
   * crosses an experience checkpoint. This avoids a React
   * state update for every pixel of scrolling.
   */
  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latestProgress) => {
      if (
        !allowScrollLinkedMotion ||
        experienceCount <= 0
      ) {
        return;
      }

      const experienceStart = 0.12;
      const experienceEnd = 0.64;

      const normalizedProgress =
        Math.min(
          1,
          Math.max(
            0,
            (latestProgress - experienceStart) /
              (experienceEnd - experienceStart)
          )
        );

      const nextIndex = Math.min(
        experienceCount - 1,
        Math.floor(
          normalizedProgress * experienceCount
        )
      );

      setActiveExperienceIndex(
        (currentIndex) =>
          currentIndex === nextIndex
            ? currentIndex
            : nextIndex
      );
    }
  );

  const headingStyle =
    allowScrollLinkedMotion
      ? {
          y: headingY,
          opacity: headingOpacity,
        }
      : undefined;

  const timelineStyle =
    allowScrollLinkedMotion
      ? {
          scaleY: timelineScaleY,
          opacity: timelineOpacity,
        }
      : undefined;

  const educationBridgeStyle =
    allowScrollLinkedMotion
      ? {
          scaleX: educationBridgeScaleX,
          opacity: educationBridgeOpacity,
        }
      : undefined;

  const primaryGlowStyle =
    allowScrollLinkedMotion
      ? {
          x: primaryGlowX,
          y: primaryGlowY,
          opacity: primaryGlowOpacity,
        }
      : undefined;

  const secondaryGlowStyle =
    allowScrollLinkedMotion
      ? {
          y: secondaryGlowY,
          opacity: secondaryGlowOpacity,
        }
      : undefined;

  return {
    sectionRef,
    scrollYProgress,
    activeExperienceIndex,

    headingStyle,
    timelineStyle,
    educationBridgeStyle,
    primaryGlowStyle,
    secondaryGlowStyle,

    allowEntranceMotion,
    allowScrollLinkedMotion,
    allowComplexMotion,

    prefersReducedMotion,
    isMobile,
    isTablet,
    hasCoarsePointer,
  };
}