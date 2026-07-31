import {
  motion,
} from "motion/react";

import useMotionRuntime from "../../../hooks/useMotionRuntime";

import {
  scrollMotionConfig,
} from "../../../data/scrollMotionConfig";

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren:
        scrollMotionConfig.stagger.delayChildren,

      staggerChildren:
        scrollMotionConfig.stagger
          .staggerChildren,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.985,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration:
        scrollMotionConfig.stagger
          .itemDuration,

      ease:
        scrollMotionConfig.entrance.ease,
    },
  },
};

export function StaggerItem({
  children,
  className = "",
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function StaggerReveal({
  children,
  once = true,
  amount = 0.15,
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

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
        margin: "0px 0px -8% 0px",
      }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}