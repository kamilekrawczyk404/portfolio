import { Variants, Transition, stagger } from "framer-motion";

export type Direction = "fromTop" | "fromBottom";

export type ChildrenVariants =
  | Variants
  | {
      left: Variants;
      right: Variants;
    };

export type StaggerVariants = {
  parent: Variants;
  children: Variants;
};

export type HorizontalAppearing = {
  parent: Variants;
  children: {
    left: Variants;
    right: Variants;
  };
};

export type VariantsPresets = {
  staggered: ({ props }: { props?: Transition }) => StaggerVariants;
  horizontalAppearing: ({
    props,
    offset,
  }: {
    props?: Transition;
    offset?: number | string;
  }) => HorizontalAppearing;
  verticalAppearing: (direction?: Direction) => Variants;
  appearing: ({
    duration,
    delay,
  }: {
    duration?: number;
    delay?: number;
  }) => Variants;
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
  horizontalAppearing: ({ props, offset = 10 }) => ({
    parent: {
      initial: {
        opacity: 0,
      },
      animate: {
        transition: {
          delayChildren: 0.05,
          when: "beforeChildren",
          ...props,
        },
        opacity: 1,
      },
      exit: {
        opacity: 0,
      },
    },
    children: {
      left: {
        initial: {
          x: "-" + offset,
          opacity: 0,
        },
        animate: {
          x: 0,
          opacity: 1,
          transition: {
            opacity: {
              delay: 0.1,
              duration: props.duration * 0.75,
            },
          },
        },
        exit: {
          x: "-" + offset,
          opacity: 0,
        },
      },
      right: {
        initial: {
          x: offset,
          opacity: 0,
        },
        animate: {
          x: 0,
          opacity: 1,
          transition: {
            opacity: {
              delay: 0.1,
              duration: props.duration * 0.75,
            },
          },
        },
        exit: {
          x: offset,
          opacity: 0,
        },
      },
    },
  }),
  staggered: ({ props }) => ({
    parent: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          delayChildren: stagger(0.05),
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
  appearing: ({ duration = 0.5, delay = 0 }) => ({
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration, delay },
    },
    exit: {
      opacity: 0,
    },
  }),
};
