import { Variants, Transition } from "motion-dom";

export type Direction = "fromTop" | "fromBottom";

export type VariantsPresets = {
  staggered: (props?: Transition) => {
    parent: Variants;
    children: Variants;
  };
  verticalAppearing: (direction?: Direction) => Variants;
};

export type AnimationProperties = {
  durations: {
    short: number;
    medium: number;
    long: number;
  };
  bounce: {
    small: number;
    medium: number;
    large: number;
  };
};

export type AnimationType = {
  default: Transition;
};

export const animationProperties: AnimationProperties = {
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

export const animationsTypes: AnimationType = {
  default: {
    duration: animationProperties.durations.medium,
    type: "spring",
    bounce: animationProperties.bounce.small,
  },
};

export const variantsPresets: VariantsPresets = {
  staggered: (props) => ({
    parent: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          delayChildren: 0.05,
          when: "beforeChildren",
          ...props,
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
  }),
  verticalAppearing: (direction = "fromTop") => ({
    initial: {
      y: direction === "fromTop" ? "-100%" : "100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { opacity: { delay: 0.075 } },
    },
    exit: {
      y: direction === "fromTop" ? "100%" : "-100%",
      opacity: 0,
      transition: { y: { delay: 0.075 } },
    },
  }),
};
