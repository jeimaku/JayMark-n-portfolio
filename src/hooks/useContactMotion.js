import { useRef } from "react";

import {
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import useMotionRuntime from "./useMotionRuntime";

export default function useContactMotion() {
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
      "end end",
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

  const shellOpacity = useTransform(
    scrollYProgress,
    [0, 0.24, 1],
    [0.35, 1, 1]
  );

  const shellScale = useTransform(
    scrollYProgress,
    [0, 0.42, 1],
    [0.985, 1, 1]
  );

  const leftPanelX = useTransform(
    scrollYProgress,
    [0, 0.46, 1],
    [
      allowComplexMotion ? -68 : -20,
      0,
      0,
    ]
  );

  const leftPanelY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      allowComplexMotion ? 32 : 14,
      0,
      -8,
    ]
  );

  const rightPanelX = useTransform(
    scrollYProgress,
    [0, 0.46, 1],
    [
      allowComplexMotion ? 68 : 20,
      0,
      0,
    ]
  );

  const rightPanelY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      allowComplexMotion ? 46 : 18,
      0,
      -12,
    ]
  );

  const glowX = useTransform(
    scrollYProgress,
    [0, 1],
    [
      allowComplexMotion ? "42%" : "16%",
      allowComplexMotion ? "-18%" : "-6%",
    ]
  );

  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      allowComplexMotion ? 90 : 32,
      allowComplexMotion ? -70 : -24,
    ]
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.8, 1],
    [0, 0.75, 0.5, 0.2]
  );

  const lineScaleX = useTransform(
    scrollYProgress,
    [0.12, 0.55, 1],
    [0, 0.48, 1]
  );

  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.9, 1],
    [0, 1, 1, 0.45]
  );

  const shellStyle =
    allowScrollLinkedMotion
      ? {
          opacity: shellOpacity,
          scale: shellScale,
        }
      : undefined;

  const leftPanelStyle =
    allowScrollLinkedMotion
      ? {
          x: leftPanelX,
          y: leftPanelY,
        }
      : undefined;

  const rightPanelStyle =
    allowScrollLinkedMotion
      ? {
          x: rightPanelX,
          y: rightPanelY,
        }
      : undefined;

  const glowStyle =
    allowScrollLinkedMotion
      ? {
          x: glowX,
          y: glowY,
          opacity: glowOpacity,
        }
      : undefined;

  const lineStyle =
    allowScrollLinkedMotion
      ? {
          scaleX: lineScaleX,
          opacity: lineOpacity,
        }
      : undefined;

  return {
    sectionRef,
    scrollYProgress,

    shellStyle,
    leftPanelStyle,
    rightPanelStyle,
    glowStyle,
    lineStyle,

    allowEntranceMotion,
    allowScrollLinkedMotion,
    allowComplexMotion,
  };
}