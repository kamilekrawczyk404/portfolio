export const animationProperties = {
  durations: {
    short: 0.2,
    medium: 0.4,
    long: 0.6,
  },
  bounce: {
    small: 0.05,
    medium: 0.1,
    large: 0.2,
  },
};

export const animationsTypes = {
  default: {
    duration: animationProperties.durations.medium,
    type: "spring",
    bounce: animationProperties.bounce.small,
  },
};

export const variantsPresets = {
  staggered: {
    parent: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          when: "beforeChildren",
        },
      },
      exit: {
        opacity: 0,
      },
    },
    children: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
      },
      exit: {
        opacity: 0,
      },
    },
  },
  verticalAppearing: (direction = "fromTop") => ({
    initial: {
      y: direction === "fromTop" ? "-100%" : "100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { opacity: { delay: 0.1 } },
    },
    exit: {
      y: direction === "fromTop" ? "100%" : "-100%",
      opacity: 0,
      transition: { y: { delay: 0.1 } },
    },
  }),
};
