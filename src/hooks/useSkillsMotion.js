import { useRef } from "react";

import {
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import useMotionRuntime from "./useMotionRuntime";

export default function useSkillsMotion() {
  const sectionRef = useRef(null);

  const {
    allowEntranceMotion,
    allowScrollLinkedMotion,
    allowComplexMotion,
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
      stiffness: 105,
      damping: 28,
      mass: 0.24,
      restDelta: 0.001,
    }
  );

  /*
   * The left introduction panel settles into place as the
   * Skills section enters, then lifts slightly while leaving.
   */
  const leftPanelY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.76, 1],
    [
      allowComplexMotion ? 48 : 18,
      0,
      0,
      allowComplexMotion ? -36 : -12,
    ]
  );

  const leftPanelOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.86, 1],
    [0.42, 1, 1, 0.58]
  );

  const leftPanelScale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.985, 1, 1, 0.985]
  );

  /*
   * The capability rail grows according to the overall
   * progress through the section.
   */
  const railScaleY = useTransform(
    scrollYProgress,
    [0.02, 0.2, 0.84, 1],
    [0, 0.18, 1, 1]
  );

  const railOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.88, 1],
    [0, 1, 1, 0.25]
  );

  /*
   * The category grid receives a slower vertical drift,
   * creating depth between the sticky introduction and cards.
   */
  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      allowComplexMotion ? 34 : 10,
      allowComplexMotion ? -34 : -10,
    ]
  );

  /*
   * Background lighting moves independently from the cards.
   */
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      allowComplexMotion ? 110 : 35,
      allowComplexMotion ? -110 : -35,
    ]
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.76, 1],
    [0, 0.55, 0.4, 0]
  );

  const leftPanelStyle =
    allowScrollLinkedMotion
      ? {
          y: leftPanelY,
          opacity: leftPanelOpacity,
          scale: leftPanelScale,
        }
      : undefined;

  const gridStyle =
    allowScrollLinkedMotion
      ? {
          y: gridY,
        }
      : undefined;

  const railStyle =
    allowScrollLinkedMotion
      ? {
          scaleY: railScaleY,
          opacity: railOpacity,
        }
      : undefined;

  const glowStyle =
    allowScrollLinkedMotion
      ? {
          y: glowY,
          opacity: glowOpacity,
        }
      : undefined;

  return {
    sectionRef,
    scrollYProgress,
    leftPanelStyle,
    gridStyle,
    railStyle,
    glowStyle,
    allowEntranceMotion,
    allowScrollLinkedMotion,
    allowComplexMotion,
  };
}