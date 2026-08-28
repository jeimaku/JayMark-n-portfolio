import useMotionRuntime from "./useMotionRuntime";

/**
 * useSkillsMotion
 *
 * Provides motion runtime flags for the redesigned Skills section.
 * The new section uses entrance animations and state-driven transitions
 * rather than scroll-linked parallax, so this hook is now a thin wrapper
 * around useMotionRuntime.
 */
export default function useSkillsMotion() {
  const {
    allowEntranceMotion,
    isMobile,
    prefersReducedMotion,
  } = useMotionRuntime();

  return {
    allowEntranceMotion,
    isMobile,
    prefersReducedMotion,
  };
}
