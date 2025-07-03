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
