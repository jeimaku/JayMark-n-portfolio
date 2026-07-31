export const scrollMotionConfig = {
  routes: {
    enabled: ["/preview-v2"],
  },

  mediaQueries: {
    mobile: "(max-width: 767px)",
    tablet: "(max-width: 1023px)",
    coarsePointer: "(pointer: coarse)",
  },

  entrance: {
    distance: 32,
    duration: 0.65,
    amount: 0.16,
    margin: "0px 0px -10% 0px",
    ease: [0.22, 1, 0.36, 1],
  },

  stagger: {
    delayChildren: 0.08,
    staggerChildren: 0.08,
    itemDuration: 0.55,
  },

  progress: {
    spring: {
      stiffness: 120,
      damping: 28,
      mass: 0.25,
      restDelta: 0.001,
    },
  },

  sectionScroll: {
    offset: [
      "start end",
      "end start",
    ],

    inputRange: [0, 0.5, 1],

    yRange: [40, 0, -40],

    scaleRange: [0.98, 1, 0.98],

    opacityRange: [0.45, 1, 0.45],
  },
};

export const motionEase =
  scrollMotionConfig.entrance.ease;