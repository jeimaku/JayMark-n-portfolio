import {
  MotionConfig,
} from "motion/react";

import ScrollProgress from "./ScrollProgress";
import SectionProgressNav from "./SectionProgressNav";

import {
  scrollMotionConfig,
} from "../../../data/scrollMotionConfig";

export default function ScrollMotionShell({
  children,
}) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration:
          scrollMotionConfig.entrance
            .duration,

        ease:
          scrollMotionConfig.entrance
            .ease,
      }}
    >
      <div
        data-scroll-motion-root=""
        className="relative isolate min-h-screen"
      >
        <ScrollProgress />

        <SectionProgressNav />

        {children}
      </div>
    </MotionConfig>
  );
}