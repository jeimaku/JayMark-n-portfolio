import { useRef } from "react";

import {
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import useMotionRuntime from "./useMotionRuntime";

export default function useFooterMotion() {
  const footerRef = useRef(null);

  const {
    allowScrollLinkedMotion,
    allowComplexMotion,
  } = useMotionRuntime();

  const {
    scrollYProgress: rawScrollProgress,
  } = useScroll({
    target: footerRef,
    offset: [
      "start end",
      "end end",
    ],
  });

  const scrollYProgress = useSpring(
    rawScrollProgress,
    {
      stiffness: 105,
      damping: 28,
      mass: 0.22,
      restDelta: 0.001,
    }
  );

  const footerY = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [
      allowComplexMotion ? 52 : 18,
      0,
      0,
    ]
  );

  const footerOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0.4, 1, 1]
  );

  const brandX = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [
      allowComplexMotion ? -30 : -10,
      0,
      0,
    ]
  );

  const linksX = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [
      allowComplexMotion ? 30 : 10,
      0,
      0,
    ]
  );

  const dividerScaleX = useTransform(
    scrollYProgress,
    [0.12, 0.7, 1],
    [0, 0.7, 1]
  );

  const glowScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.84, 1.08]
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [0, 0.3, 0.12]
  );

  const footerStyle =
    allowScrollLinkedMotion
      ? {
          y: footerY,
          opacity: footerOpacity,
        }
      : undefined;

  const brandStyle =
    allowScrollLinkedMotion
      ? {
          x: brandX,
        }
      : undefined;

  const linksStyle =
    allowScrollLinkedMotion
      ? {
          x: linksX,
        }
      : undefined;

  const dividerStyle =
    allowScrollLinkedMotion
      ? {
          scaleX: dividerScaleX,
        }
      : undefined;

  const glowStyle =
    allowScrollLinkedMotion
      ? {
          scale: glowScale,
          opacity: glowOpacity,
        }
      : undefined;

  return {
    footerRef,
    scrollYProgress,

    footerStyle,
    brandStyle,
    linksStyle,
    dividerStyle,
    glowStyle,
  };
}