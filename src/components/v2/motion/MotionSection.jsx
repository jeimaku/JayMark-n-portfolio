import {
  motion,
} from "motion/react";

import useMotionRuntime from "../../../hooks/useMotionRuntime";

import {
  scrollMotionConfig,
} from "../../../data/scrollMotionConfig";

function getVariants({
  effect,
  distance,
}) {
  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  };

  switch (effect) {
    case "left":
      return {
        hidden: {
          opacity: 0,
          x: distance,
          y: 0,
          scale: 1,
          filter: "blur(6px)",
        },
        visible,
      };

    case "right":
      return {
        hidden: {
          opacity: 0,
          x: -distance,
          y: 0,
          scale: 1,
          filter: "blur(6px)",
        },
        visible,
      };

    case "scale":
      return {
        hidden: {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.96,
          filter: "blur(6px)",
        },
        visible,
      };

    case "fade":
      return {
        hidden: {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(4px)",
        },
        visible,
      };

    case "rise":
    default:
      return {
        hidden: {
          opacity: 0,
          x: 0,
          y: distance,
          scale: 1,
          filter: "blur(6px)",
        },
        visible,
      };
  }
}

export default function MotionSection({
  children,
  effect = "rise",
  distance =
    scrollMotionConfig.entrance.distance,
  once = true,
  amount =
    scrollMotionConfig.entrance.amount,
  margin =
    scrollMotionConfig.entrance.margin,
  delay = 0,
  duration =
    scrollMotionConfig.entrance.duration,
  className = "",
}) {
  const {
    allowEntranceMotion,
  } = useMotionRuntime();

  if (!allowEntranceMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  const variants = getVariants({
    effect,
    distance,
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
        margin,
      }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease:
          scrollMotionConfig.entrance.ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}