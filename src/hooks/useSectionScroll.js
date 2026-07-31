import { useRef } from "react";

import {
  useScroll,
  useTransform,
} from "motion/react";

import {
  scrollMotionConfig,
} from "../data/scrollMotionConfig";

export default function useSectionScroll({
  offset =
    scrollMotionConfig.sectionScroll.offset,

  inputRange =
    scrollMotionConfig.sectionScroll.inputRange,

  yRange =
    scrollMotionConfig.sectionScroll.yRange,

  scaleRange =
    scrollMotionConfig.sectionScroll.scaleRange,

  opacityRange =
    scrollMotionConfig.sectionScroll.opacityRange,
} = {}) {
  const ref = useRef(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(
    scrollYProgress,
    inputRange,
    yRange
  );

  const scale = useTransform(
    scrollYProgress,
    inputRange,
    scaleRange
  );

  const opacity = useTransform(
    scrollYProgress,
    inputRange,
    opacityRange
  );

  return {
    ref,
    scrollYProgress,
    y,
    scale,
    opacity,
  };
}