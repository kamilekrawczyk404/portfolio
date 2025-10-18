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
    extraLarge: "text-4xl",
    large: "text-xl",
    medium: "text-md",
    small: "text-sm",
    extraSmall: "text-xs",
  },
  body: {
    padding: "lg:p-16 p-4",
    margin: "lg:m-16 m-4",
  },
};

type ColorSet = {
  background: string;
  backgroundDark: string;
  backgroundLight: string;
  backgroundTransparent?: string;
  backgroundSecondary?: string;
  stroke?: string;
  foreground: string;
  foregroundSecondary?: string;
  border: string;
  borderSecondary?: string;
  divideSecondary?: string;
  outline: string;
};

export type BasicColorSet = ColorSet & { hover: ColorSet };

export type Color = `#${string}` | `rgba(${string})`;

export type ColorPalette = {
  purple: string;
  orange: string;
  languages: Record<string, Color>;
  light: BasicColorSet;
  dark: BasicColorSet;
};

export const hexToRgba = (hexValue: string, alpha: number = 1): string => {
  const cleanHex = hexValue.startsWith("#") ? hexValue.slice(1) : hexValue;

  const a = Math.min(1, Math.max(0, alpha));

  let r, g, b;

  // 3. Handle 3-digit shorthand format (e.g., 'f45' -> 'ff4455')
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  }
  // 4. Handle 6-digit standard format (e.g., 'ff4500')
  else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }
  // 5. Handle invalid length
  else {
    console.error(`Invalid hexValue color length: ${hexValue}`);
    return null;
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.error(`Invalid hexValue color characters: ${hexValue}`);
    return null;
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
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
    background: "bg-neutral-50",
    backgroundLight: "bg-white",
    backgroundDark: "bg-neutral-100",
    backgroundTransparent: `bg-white/10`,
    backgroundSecondary: "bg-neutral-200",
    foreground: "text-neutral-700",
    foregroundSecondary: "text-neutral-500",
    stroke: "stroke-neutral-700",
    border: "border-neutral-300",
    borderSecondary: "border-neutral-200",
    outline: "outline-neutral-300",
    divideSecondary: "divide-neutral-200",
    hover: {
      background: "hover:bg-neutral-200",
      backgroundLight: "hover:bg-neutral-100",
      backgroundDark: "hover:bg-neutral-300",
      foreground: "hover:text-neutral-600",
      border: "hover:border-neutral-400",
      outline: "hover:outline-neutral-400",
    },
  },
  dark: {
    background: "bg-neutral-900",
    backgroundLight: "bg-neutral-800",
    backgroundDark: "bg-neutral-950",
    backgroundTransparent: `bg-neutral-950/10`,
    backgroundSecondary: "bg-neutral-800",
    foreground: "text-neutral-300",
    foregroundSecondary: "text-neutral-500",
    stroke: "stroke-neutral-300",
    border: "border-neutral-700",
    borderSecondary: "border-neutral-800",
    divideSecondary: "divide-neutral-800",
    outline: "outline-neutral-700",
    hover: {
      background: "hover:bg-neutral-800",
      backgroundLight: "hover:bg-neutral-700",
      backgroundDark: "hover:bg-neutral-900",
      foreground: "hover:text-neutral-400",
      border: "hover:border-neutral-600",
      outline: "hover:outline-neutral-600",
    },
  },
};
