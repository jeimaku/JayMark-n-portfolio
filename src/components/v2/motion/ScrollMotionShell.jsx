import {
  useEffect,
} from "react";

import {
  MotionConfig,
} from "motion/react";

import HeroAmbientBackground from "../HeroAmbientBackground";

import ScrollProgress from "./ScrollProgress";
import SectionProgressNav from "./SectionProgressNav";

import {
  scrollMotionConfig,
} from "../../../data/scrollMotionConfig";

import {
  startScrollStateTracking,
} from "../../../lib/scrollState";

export default function ScrollMotionShell({
  children,
}) {
  useEffect(
    () => startScrollStateTracking(),
    []
  );

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
        <HeroAmbientBackground />

        <ScrollProgress />

        <SectionProgressNav />

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </MotionConfig>
  );
}
