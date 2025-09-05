type SizeProperties = {
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
    large: "lg:text-5xl text-4xl",
    medium: "lg:text-3xl text-2xl",
    small: "lg:text-[1rem]",
    extraSmall: "text-sm",
  },
  body: {
    padding: "lg:p-16 p-4",
    margin: "lg:m-16 m-4",
  },
};

export type BasicColorSet = {
  background: string;
  foreground: string;
  border: string;
  outline: string;
};

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
    background: "bg-gray-100",
    foreground: "text-neutral-900",
    border: "border-neutral-900",
    outline: "outline-neutral-900",
  },
  dark: {
    background: "bg-neutral-900",
    foreground: "text-gray-100",
    border: "border-gray-100",
    outline: "outline-gray-100",
  },
};
