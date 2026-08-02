import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useMotionRuntime from "./useMotionRuntime";

import {
  useMediaQuery,
} from "./useHeroRuntime";

const DEFAULT_HEADER_OFFSET = 64;
const ACTIVATION_DISTANCE = 150;

const WHEEL_THRESHOLD = 72;
const SLIDE_COOLDOWN = 520;

const DRAG_START_DISTANCE = 6;
const DRAG_THRESHOLD = 90;
const FLICK_VELOCITY = 0.45;
const EDGE_RESISTANCE = 0.28;

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "option",
  "[data-no-project-drag]",
].join(",");

function clamp(
  value,
  minimum,
  maximum
) {
  return Math.min(
    maximum,
    Math.max(minimum, value)
  );
}

export default function useProjectsWheelCarousel({
  projectCount = 1,
  headerOffset =
    DEFAULT_HEADER_OFFSET,
} = {}) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  const activeIndexRef = useRef(0);
  const lockedRef = useRef(false);
  const draggingRef = useRef(false);

  const wheelAccumulatorRef =
    useRef(0);

  const cooldownUntilRef =
    useRef(0);

  const restoreScrollBehaviorRef =
    useRef(null);

  const dragOffsetRef =
    useRef(0);

  const suppressClickRef =
    useRef(false);

  const bodyUserSelectRef =
    useRef("");

  const pointerRef = useRef({
    id: null,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    velocityX: 0,
  });

  const [
    activeProjectIndex,
    setActiveProjectIndex,
  ] = useState(0);

  const [
    isWheelLocked,
    setIsWheelLocked,
  ] = useState(false);

  const [
    isDragging,
    setIsDragging,
  ] = useState(false);

  const [
    dragOffset,
    setDragOffset,
  ] = useState(0);

  const [
    stageWidth,
    setStageWidth,
  ] = useState(0);

  const {
    allowComplexMotion,
    prefersReducedMotion,
  } = useMotionRuntime();

  const hasEnoughHeight =
    useMediaQuery(
      "(min-height: 720px)"
    );

  const hasEnoughWidth =
    useMediaQuery(
      "(min-width: 1024px)"
    );

  const allowWheelCarousel =
    allowComplexMotion &&
    hasEnoughHeight &&
    hasEnoughWidth &&
    projectCount > 1;

  const lastIndex = Math.max(
    projectCount - 1,
    0
  );

  const canGoPrevious =
    activeProjectIndex > 0;

  const canGoNext =
    activeProjectIndex <
    lastIndex;

  const setLocked = useCallback(
    (nextLocked) => {
      lockedRef.current =
        nextLocked;

      setIsWheelLocked(
        nextLocked
      );
    },
    []
  );

  const resetDrag = useCallback(() => {
    draggingRef.current = false;
    dragOffsetRef.current = 0;

    setIsDragging(false);
    setDragOffset(0);

    document.body.style.userSelect =
      bodyUserSelectRef.current;
  }, []);

  const setProjectIndex =
    useCallback(
      (nextIndex) => {
        const clampedIndex =
          clamp(
            nextIndex,
            0,
            lastIndex
          );

        activeIndexRef.current =
          clampedIndex;

        setActiveProjectIndex(
          clampedIndex
        );

        dragOffsetRef.current = 0;
        setDragOffset(0);
      },
      [lastIndex]
    );

  /*
   * Keeps the Projects section directly
   * underneath the fixed header while its
   * wheel carousel is active.
   */
  const alignSection =
    useCallback(() => {
      const section =
        sectionRef.current;

      if (!section) {
        return;
      }

      const targetY =
        section
          .getBoundingClientRect()
          .top +
        window.scrollY -
        headerOffset;

      const root =
        document.documentElement;

      const previousBehavior =
        root.style.scrollBehavior;

      root.style.scrollBehavior =
        "auto";

      window.scrollTo({
        top: targetY,
        left: 0,
        behavior: "auto",
      });

      if (
        restoreScrollBehaviorRef.current
      ) {
        window.cancelAnimationFrame(
          restoreScrollBehaviorRef.current
        );
      }

      restoreScrollBehaviorRef.current =
        window.requestAnimationFrame(
          () => {
            root.style.scrollBehavior =
              previousBehavior;

            restoreScrollBehaviorRef.current =
              null;
          }
        );
    }, [headerOffset]);

  const goToProject =
    useCallback(
      (index) => {
        setProjectIndex(index);

        if (allowWheelCarousel) {
          alignSection();
          setLocked(true);
        }
      },
      [
        alignSection,
        allowWheelCarousel,
        setLocked,
        setProjectIndex,
      ]
    );

  const goPrevious =
    useCallback(() => {
      if (
        activeIndexRef.current <= 0
      ) {
        return;
      }

      goToProject(
        activeIndexRef.current - 1
      );
    }, [goToProject]);

  const continueToExperience =
    useCallback(() => {
      setLocked(false);
      resetDrag();

      const experienceSection =
        document.getElementById(
          "experience"
        );

      if (experienceSection) {
        experienceSection.scrollIntoView({
          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth",
          block: "start",
        });

        return;
      }

      window.scrollBy({
        top:
          window.innerHeight * 0.75,
        left: 0,
        behavior:
          prefersReducedMotion
            ? "auto"
            : "smooth",
      });
    }, [
      prefersReducedMotion,
      resetDrag,
      setLocked,
    ]);

  const goNext =
    useCallback(() => {
      if (
        activeIndexRef.current <
        lastIndex
      ) {
        goToProject(
          activeIndexRef.current + 1
        );

        return;
      }

      continueToExperience();
    }, [
      continueToExperience,
      goToProject,
      lastIndex,
    ]);

  /*
   * Measures the visible carousel stage so
   * each project moves exactly one viewport
   * width during navigation and dragging.
   */
  useEffect(() => {
    const stage =
      stageRef.current;

    if (!stage) {
      return undefined;
    }

    const updateWidth = () => {
      setStageWidth(
        stage
          .getBoundingClientRect()
          .width
      );
    };

    updateWidth();

    if (
      typeof ResizeObserver ===
      "undefined"
    ) {
      window.addEventListener(
        "resize",
        updateWidth
      );

      return () => {
        window.removeEventListener(
          "resize",
          updateWidth
        );
      };
    }

    const observer =
      new ResizeObserver(
        updateWidth
      );

    observer.observe(stage);

    return () => {
      observer.disconnect();
    };
  }, [allowWheelCarousel]);

  /*
   * Converts ordinary vertical wheel movement
   * into project navigation while the Projects
   * carousel is active.
   */
  useEffect(() => {
    if (!allowWheelCarousel) {
      setLocked(false);
      resetDrag();

      return undefined;
    }

    const handleWheel = (event) => {
      /*
       * Preserve browser zoom gestures.
       */
      if (
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      const section =
        sectionRef.current;

      if (!section) {
        return;
      }

      if (draggingRef.current) {
        event.preventDefault();
        return;
      }

      /*
       * Standard mouse wheels usually provide
       * deltaY. Trackpads can also provide
       * horizontal deltaX input.
       */
      const dominantDelta =
        Math.abs(event.deltaY) >=
        Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (
        Math.abs(dominantDelta) <
        0.5
      ) {
        return;
      }

      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const movingForward =
        dominantDelta > 0;

      const movingBackward =
        dominantDelta < 0;

      /*
       * Activate when Projects reaches the
       * fixed-header position while scrolling
       * downward.
       */
      const enteringFromAbove =
        movingForward &&
        rect.top <=
          headerOffset +
            ACTIVATION_DISTANCE &&
        rect.top >=
          headerOffset -
            ACTIVATION_DISTANCE;

      /*
       * Reactivate while entering Projects
       * from the Experience section.
       */
      const enteringFromBelow =
        movingBackward &&
        rect.bottom >=
          viewportHeight -
            ACTIVATION_DISTANCE &&
        rect.bottom <=
          viewportHeight +
            ACTIVATION_DISTANCE;

      if (!lockedRef.current) {
        const canEnterForward =
          enteringFromAbove &&
          activeIndexRef.current <
            lastIndex;

        const canEnterBackward =
          enteringFromBelow &&
          activeIndexRef.current > 0;

        if (
          !canEnterForward &&
          !canEnterBackward
        ) {
          return;
        }

        event.preventDefault();

        alignSection();
        setLocked(true);

        wheelAccumulatorRef.current =
          0;

        cooldownUntilRef.current =
          performance.now() + 140;

        return;
      }

      const now =
        performance.now();

      /*
       * Consume inertial wheel events while
       * the current slide transition finishes.
       */
      if (
        now <
        cooldownUntilRef.current
      ) {
        event.preventDefault();
        return;
      }

      const currentIndex =
        activeIndexRef.current;

      /*
       * Release normal downward page scrolling
       * after the final project.
       */
      if (
        movingForward &&
        currentIndex === lastIndex
      ) {
        wheelAccumulatorRef.current =
          0;

        setLocked(false);

        return;
      }

      /*
       * Release normal upward page scrolling
       * before the first project.
       */
      if (
        movingBackward &&
        currentIndex === 0
      ) {
        wheelAccumulatorRef.current =
          0;

        setLocked(false);

        return;
      }

      event.preventDefault();
      alignSection();

      wheelAccumulatorRef.current +=
        dominantDelta;

      if (
        Math.abs(
          wheelAccumulatorRef.current
        ) < WHEEL_THRESHOLD
      ) {
        return;
      }

      const direction =
        wheelAccumulatorRef.current > 0
          ? 1
          : -1;

      setProjectIndex(
        currentIndex + direction
      );

      wheelAccumulatorRef.current =
        0;

      cooldownUntilRef.current =
        now + SLIDE_COOLDOWN;
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );
    };
  }, [
    alignSection,
    allowWheelCarousel,
    headerOffset,
    lastIndex,
    resetDrag,
    setLocked,
    setProjectIndex,
  ]);

  /*
   * Starts a potential drag gesture.
   * Links and buttons remain clickable and
   * do not activate project dragging.
   */
  const handlePointerDown =
    useCallback(
      (event) => {
        if (
          !allowWheelCarousel ||
          event.button !== 0
        ) {
          return;
        }

        const target =
          event.target;

        if (
          target instanceof Element &&
          target.closest(
            INTERACTIVE_SELECTOR
          )
        ) {
          return;
        }

        const stage =
          stageRef.current;

        if (!stage) {
          return;
        }

        alignSection();
        setLocked(true);

        suppressClickRef.current =
          false;

        pointerRef.current = {
          id: event.pointerId,
          startX: event.clientX,
          lastX: event.clientX,
          lastTime:
            performance.now(),
          velocityX: 0,
        };

        dragOffsetRef.current = 0;
        setDragOffset(0);

        bodyUserSelectRef.current =
          document.body.style.userSelect;

        document.body.style.userSelect =
          "none";

        stage.setPointerCapture(
          event.pointerId
        );
      },
      [
        alignSection,
        allowWheelCarousel,
        setLocked,
      ]
    );

  /*
   * Moves the project track with the pointer.
   * The first and final projects use resistance
   * so the carousel cannot be dragged too far
   * beyond either boundary.
   */
  const handlePointerMove =
    useCallback((event) => {
      const pointer =
        pointerRef.current;

      if (
        pointer.id !==
        event.pointerId
      ) {
        return;
      }

      const rawDistance =
        event.clientX -
        pointer.startX;

      if (
        !draggingRef.current &&
        Math.abs(rawDistance) >=
          DRAG_START_DISTANCE
      ) {
        draggingRef.current = true;
        suppressClickRef.current =
          true;

        setIsDragging(true);
      }

      if (!draggingRef.current) {
        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }

      const currentIndex =
        activeIndexRef.current;

      const pullingPastStart =
        currentIndex === 0 &&
        rawDistance > 0;

      const pullingPastEnd =
        currentIndex === lastIndex &&
        rawDistance < 0;

      const resistedDistance =
        pullingPastStart ||
        pullingPastEnd
          ? rawDistance *
            EDGE_RESISTANCE
          : rawDistance;

      const now =
        performance.now();

      const elapsed =
        Math.max(
          1,
          now - pointer.lastTime
        );

      pointer.velocityX =
        (event.clientX -
          pointer.lastX) /
        elapsed;

      pointer.lastX =
        event.clientX;

      pointer.lastTime = now;

      dragOffsetRef.current =
        resistedDistance;

      setDragOffset(
        resistedDistance
      );
    }, [lastIndex]);

  /*
   * Finishes a pointer gesture and decides
   * whether it should advance, go backward,
   * or snap back to the current project.
   */
  const finishPointerGesture =
    useCallback(
      (event, cancelled = false) => {
        const pointer =
          pointerRef.current;

        if (
          pointer.id !==
          event.pointerId
        ) {
          return;
        }

        const stage =
          stageRef.current;

        if (
          stage?.hasPointerCapture(
            event.pointerId
          )
        ) {
          stage.releasePointerCapture(
            event.pointerId
          );
        }

        const distance =
          dragOffsetRef.current;

        const velocity =
          pointer.velocityX;

        const dragged =
          draggingRef.current;

        pointerRef.current = {
          id: null,
          startX: 0,
          lastX: 0,
          lastTime: 0,
          velocityX: 0,
        };

        if (
          dragged &&
          !cancelled
        ) {
          const passedDistance =
            Math.abs(distance) >=
            Math.min(
              DRAG_THRESHOLD,
              Math.max(
                60,
                stageWidth * 0.12
              )
            );

          const passedVelocity =
            Math.abs(velocity) >=
            FLICK_VELOCITY;

          if (
            passedDistance ||
            passedVelocity
          ) {
            const direction =
              distance < 0
                ? 1
                : -1;

            setProjectIndex(
              activeIndexRef.current +
                direction
            );
          }
        }

        cooldownUntilRef.current =
          performance.now() + 260;

        resetDrag();
      },
      [
        resetDrag,
        setProjectIndex,
        stageWidth,
      ]
    );

  const handlePointerUp =
    useCallback(
      (event) => {
        finishPointerGesture(
          event,
          false
        );
      },
      [finishPointerGesture]
    );

  const handlePointerCancel =
    useCallback(
      (event) => {
        finishPointerGesture(
          event,
          true
        );
      },
      [finishPointerGesture]
    );

  /*
   * Prevents a completed drag gesture from
   * accidentally activating a link.
   */
  const handleClickCapture =
    useCallback((event) => {
      if (
        !suppressClickRef.current
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      suppressClickRef.current =
        false;
    }, []);

  /*
   * Keyboard navigation while the carousel
   * controls the Projects section.
   */
  useEffect(() => {
    if (!allowWheelCarousel) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (!lockedRef.current) {
        return;
      }

      const nextKeys = [
        "ArrowDown",
        "ArrowRight",
        "PageDown",
        " ",
      ];

      const previousKeys = [
        "ArrowUp",
        "ArrowLeft",
        "PageUp",
      ];

      if (
        nextKeys.includes(event.key)
      ) {
        event.preventDefault();
        goNext();

        return;
      }

      if (
        previousKeys.includes(
          event.key
        )
      ) {
        if (
          activeIndexRef.current === 0
        ) {
          setLocked(false);
          return;
        }

        event.preventDefault();
        goPrevious();

        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToProject(0);

        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        goToProject(lastIndex);

        return;
      }

      if (event.key === "Escape") {
        setLocked(false);
        resetDrag();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    allowWheelCarousel,
    goNext,
    goPrevious,
    goToProject,
    lastIndex,
    resetDrag,
    setLocked,
  ]);

  /*
   * Keep the active project valid when the
   * project collection changes.
   */
  useEffect(() => {
    const clampedIndex =
      clamp(
        activeIndexRef.current,
        0,
        lastIndex
      );

    if (
      clampedIndex !==
      activeIndexRef.current
    ) {
      setProjectIndex(
        clampedIndex
      );
    }
  }, [
    lastIndex,
    setProjectIndex,
  ]);

  /*
   * Restore temporary browser styles when
   * the component unmounts.
   */
  useEffect(
    () => () => {
      if (
        restoreScrollBehaviorRef.current
      ) {
        window.cancelAnimationFrame(
          restoreScrollBehaviorRef.current
        );
      }

      document.body.style.userSelect =
        bodyUserSelectRef.current;
    },
    []
  );

  const resolvedStageWidth =
    stageWidth ||
    (
      typeof window !== "undefined"
        ? window.innerWidth
        : 1
    );

  /*
   * Each project occupies one visible stage
   * width. dragOffset allows the track to
   * follow the pointer while dragging.
   */
  const trackOffset =
    -activeProjectIndex *
      resolvedStageWidth +
    dragOffset;

  const progress =
    lastIndex > 0
      ? activeProjectIndex /
        lastIndex
      : 1;

  return {
    sectionRef,
    stageRef,

    activeProjectIndex,
    trackOffset,
    progress,

    isWheelLocked,
    isDragging,
    allowWheelCarousel,

    canGoPrevious,
    canGoNext,

    goToProject,
    goPrevious,
    goNext,

    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handleClickCapture,
  };
}