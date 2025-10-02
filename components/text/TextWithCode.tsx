import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type TextWithCodeProps = {
  text: string;
  separator?: string;
  regex?: RegExp;
};

const TextWithCode = ({
  text,
  separator = "**",
  regex = /(\*\*.*?\*\*)/g,
}: TextWithCodeProps): ReactNode[] => {
  const { theme, selected } = useSelector((state: RootState) => state.theme);
  const parts = text.split(regex).filter((t) => t.length > 0);

  return parts.map((part, index) => {
    if (part.startsWith(separator) && part.endsWith(separator)) {
      return (
        <span
          key={index}
          className={`${
            selected === "dark"
              ? "bg-neutral-800 text-neutral-300"
              : "bg-neutral-200 text-neutral-700"
          } border-1 ${theme.border} px-1 py-[1px] rounded-sm`}
        >
          {part.substring(separator.length, part.length - separator.length)}
        </span>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

export default TextWithCode;
