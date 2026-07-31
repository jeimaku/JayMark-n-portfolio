import {
  useRef,
  useState,
} from "react";

import {
  useMotionValueEvent,
  useScroll,
} from "motion/react";

export default function useScrollDirection({
  threshold = 8,
} = {}) {
  const {
    scrollY,
  } = useScroll();

  const previousPositionRef =
    useRef(0);

  const [direction, setDirection] =
    useState("down");

  useMotionValueEvent(
    scrollY,
    "change",
    (latestPosition) => {
      const previousPosition =
        previousPositionRef.current;

      const difference =
        latestPosition - previousPosition;

      if (
        Math.abs(difference) >= threshold
      ) {
        setDirection(
          difference > 0
            ? "down"
            : "up"
        );

        previousPositionRef.current =
          latestPosition;
      }
    }
  );

  return direction;
}