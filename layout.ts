type SizeProperties = {
  extraLarge?: string;
  large: string;
  medium: string;
  small: string;
  extraSmall?: string;
};

type GapProperties = SizeProperties & {
  horizontal?: {
    large: string;
    medium: string;
    small: string;
  };
};

type TextProperties = SizeProperties;

type BodyProperties = {
  padding: string;
  margin: string;
};

export type LayoutSystem = {
  padding: string;
  margin: string;
  body: BodyProperties;
  gap: GapProperties;
  text: TextProperties;
};

export const layoutProperties: LayoutSystem = {
  padding: "md:p-4 p-2",
  margin: "md:m-4 m-2",
  gap: {
    horizontal: {
      large: "lg:gap-x-8 md:gap-x-6 gap-x-4",
      medium: "lg:gap-x-6 md:gap-x-4 gap-x-2",
      small: "lg:gap-x-4 md:gap-x-2 gap-x-1",
    },
    large: "gap-8",
    medium: "gap-6",
    small: "gap-4",
    extraSmall: "gap-1",
  },
  text: {
    extraLarge: "lg:text-5xl text-4xl",
    large: "lg:text-2xl text-xl",
    medium: "lg:text-lg text-md",
    small: "lg:text-[1rem] text-normal",
    extraSmall: "text-sm",
  },
  body: {
    padding: "lg:p-16 p-4",
    margin: "lg:m-16 m-4",
  },
};

type ColorSet = {
  background: string;
  backgroundSecondary?: string;
  stroke?: string;
  foreground: string;
  border: string;
  borderSecondary?: string;
  outline: string;
};

export type BasicColorSet = ColorSet & { hover: ColorSet };

export type ColorPalette = {
  purple: string;
  orange: string;
  languages: Record<string, string>;
  light: BasicColorSet;
  dark: BasicColorSet;
};

export const colors: ColorPalette = {
  purple: "#6a00f4",
  orange: "#ff9e00",
  languages: {
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    CSS: "#264DE4",
    Dockerfile: "#0DB7ED",
    "C++": "#9C003B",
    C: "#A8B9CC",
    CMake: "#6B8E23",
    PHP: "#777BB4",
    Blade: "#F7523F",
    Shell: "#89E051",
    "C#": "#239120",
  },
  light: {
    background: "bg-white",
    backgroundSecondary: "bg-neutral-200",
    foreground: "text-neutral-700",
    stroke: "stroke-neutral-700",
    border: "border-neutral-300",
    borderSecondary: "border-neutral-200",
    outline: "outline-neutral-300",
    hover: {
      background: "hover:bg-neutral-100",
      foreground: "hover:text-neutral-600",
      border: "hover:border-neutral-400",
      outline: "hover:outline-neutral-400",
    },
  },
  dark: {
    background: "bg-neutral-950",
    backgroundSecondary: "bg-neutral-800",
    foreground: "text-neutral-300",
    stroke: "stroke-neutral-300",
    border: "border-neutral-700",
    borderSecondary: "border-neutral-800",
    outline: "outline-neutral-700",
    hover: {
      background: "hover:bg-neutral-900",
      foreground: "hover:text-neutral-400",
      border: "hover:border-neutral-600",
      outline: "hover:outline-neutral-600",
    },
  },
};
