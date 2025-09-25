"use client";
import React from "react";
import { useSelector } from "react-redux";
import { colors, layoutProperties } from "@/layout";
import { RootState } from "@/redux/store";
import { ProjectLanguage } from "@/types/types";

const round = (number: number, floatingPoints: number = 2) => {
  if (floatingPoints <= 0) return number;

  return (
    Math.round(number * Math.pow(10, floatingPoints)) /
    Math.pow(10, floatingPoints)
  );
};

type LanguagesUsageStatusProps = {
  languages: ProjectLanguage;
};

const LanguageUsageStats = ({ languages }: LanguagesUsageStatusProps) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const total = Object.values(languages).reduce((a, b) => a + b);

  return (
    <div className={`flex flex-col gap-4 ${theme.foreground}`}>
      <div className={"flex flex-wrap gap-2"}>
        {Object.entries(languages).map(([key, value]) => (
          <div className={"flex items-center gap-x-2"} key={key}>
            <div
              className={`w-3 aspect-square rounded-full border-1 ${theme.border}`}
              style={{ backgroundColor: colors.languages[key] }}
            />
            <span
              className={`${layoutProperties.text.extraSmall} font-[500] ${theme.foreground}`}
            >
              {key}
              <span className={`text-xs ml-1 text-neutral-500`}>
                ({(round(value / total, 4) * 100).toFixed(2) + "%"})
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageUsageStats;
