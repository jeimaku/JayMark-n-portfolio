import { useRef } from "react";

import {
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import useMotionRuntime from "./useMotionRuntime";

export default function useHeroAboutTransition() {
  const heroSceneRef = useRef(null);

  const {
    allowScrollLinkedMotion,
    allowComplexMotion,
  } = useMotionRuntime();

  const {
    scrollYProgress,
  } = useScroll({
    target: heroSceneRef,

    /*
     * 0: The hero scene begins at the top of the viewport.
     * 1: The bottom of the full sticky scene reaches the top.
     */
    offset: [
      "start start",
      "end start",
    ],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 105,
      damping: 26,
      mass: 0.22,
      restDelta: 0.001,
    }
  );

  /*
   * Hero copy remains readable during the opening portion,
   * then moves upward and fades as About approaches.
   */
  const copyY = useTransform(
    smoothProgress,
    [0, 0.35, 0.72, 1],
    [0, 0, -42, -108]
  );

  const copyOpacity = useTransform(
    smoothProgress,
    [0, 0.42, 0.8, 1],
    [1, 1, 0.42, 0.08]
  );

  /*
   * The workspace first moves slightly toward the visitor,
   * then settles backward as the scene concludes.
   */
  const workspaceY = useTransform(
    smoothProgress,
    [0, 0.4, 1],
    [
      0,
      0,
      allowComplexMotion ? 76 : 28,
    ]
  );

  const workspaceScale = useTransform(
    smoothProgress,
    [0, 0.35, 1],
    [
      1,
      allowComplexMotion ? 1.025 : 1.01,
      allowComplexMotion ? 0.86 : 0.95,
    ]
  );

  const workspaceOpacity = useTransform(
    smoothProgress,
    [0, 0.58, 0.86, 1],
    [1, 1, 0.58, 0.18]
  );

  const workspaceRotateX = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0, 0, allowComplexMotion ? -4 : 0]
  );

  /*
   * The atmospheric background drifts more slowly than the
   * foreground, creating depth without moving the WebGL scene.
   */
  const backgroundY = useTransform(
    smoothProgress,
    [0, 1],
    [0, allowComplexMotion ? -48 : -18]
  );

  const backgroundScale = useTransform(
    smoothProgress,
    [0, 1],
    [1, allowComplexMotion ? 1.08 : 1.025]
  );

  const backgroundOpacity = useTransform(
    smoothProgress,
    [0, 0.72, 1],
    [1, 0.78, 0.38]
  );

  /*
   * A dark gradient rises from the bottom as the hero gives
   * visual priority to the next section.
   */
  const transitionVeilOpacity = useTransform(
    smoothProgress,
    [0, 0.46, 0.82, 1],
    [0, 0, 0.72, 1]
  );

  const transitionGlowOpacity = useTransform(
    smoothProgress,
    [0, 0.42, 0.75, 1],
    [0, 0.1, 0.85, 0.22]
  );

  const transitionLineScale = useTransform(
    smoothProgress,
    [0, 0.45, 0.82, 1],
    [0.12, 0.12, 0.78, 1]
  );

  const transitionLineOpacity = useTransform(
    smoothProgress,
    [0, 0.45, 0.78, 1],
    [0, 0.12, 1, 0.28]
  );

  /*
   * Styles become undefined when scroll motion should not run.
   * This preserves a completely static and readable fallback.
   */
  const heroCopyStyle =
    allowScrollLinkedMotion
      ? {
          y: copyY,
          opacity: copyOpacity,
        }
      : undefined;

  const heroWorkspaceStyle =
    allowScrollLinkedMotion
      ? {
          y: workspaceY,
          scale: workspaceScale,
          opacity: workspaceOpacity,
          rotateX: workspaceRotateX,
          transformPerspective: 1600,
        }
      : undefined;

  const heroBackgroundStyle =
    allowScrollLinkedMotion
      ? {
          y: backgroundY,
          scale: backgroundScale,
          opacity: backgroundOpacity,
        }
      : undefined;

  const transitionVeilStyle =
    allowScrollLinkedMotion
      ? {
          opacity: transitionVeilOpacity,
        }
      : undefined;

  const transitionGlowStyle =
    allowScrollLinkedMotion
      ? {
          opacity: transitionGlowOpacity,
        }
      : undefined;

  const transitionLineStyle =
    allowScrollLinkedMotion
      ? {
          opacity: transitionLineOpacity,
          scaleX: transitionLineScale,
        }
      : undefined;

  return {
    heroSceneRef,
    scrollYProgress,
    heroCopyStyle,
    heroWorkspaceStyle,
    heroBackgroundStyle,
    transitionVeilStyle,
    transitionGlowStyle,
    transitionLineStyle,
  };
}