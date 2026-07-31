import {
  usePageInView,
  useReducedMotion,
} from "motion/react";

import {
  useMediaQuery,
} from "./useHeroRuntime";

import {
  scrollMotionConfig,
} from "../data/scrollMotionConfig";

export default function useMotionRuntime() {
  const prefersReducedMotion =
    Boolean(useReducedMotion());

  const isPageVisible =
    usePageInView();

  const isMobile = useMediaQuery(
    scrollMotionConfig.mediaQueries.mobile
  );

  const isTablet = useMediaQuery(
    scrollMotionConfig.mediaQueries.tablet
  );

  const hasCoarsePointer = useMediaQuery(
    scrollMotionConfig.mediaQueries.coarsePointer
  );

  /*
   * Entrance animations are lightweight and can be used
   * on most devices unless reduced motion is requested.
   */
  const allowEntranceMotion =
    isPageVisible &&
    !prefersReducedMotion;

  /*
   * Scroll-linked motion updates continuously while scrolling.
   * It remains enabled on mobile for lightweight effects such
   * as the page progress indicator.
   */
  const allowScrollLinkedMotion =
    isPageVisible &&
    !prefersReducedMotion;

  /*
   * Complex motion is reserved for desktop devices with
   * precise pointer input. Future sticky and horizontal scenes
   * will use this flag.
   */
  const allowComplexMotion =
    allowScrollLinkedMotion &&
    !isMobile &&
    !hasCoarsePointer;

  return {
    prefersReducedMotion,
    isPageVisible,
    isMobile,
    isTablet,
    hasCoarsePointer,
    allowEntranceMotion,
    allowScrollLinkedMotion,
    allowComplexMotion,
  };
}