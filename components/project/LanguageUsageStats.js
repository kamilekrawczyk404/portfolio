"use client";
import React from "react";
import { useSelector } from "react-redux";
import { colors, layoutProperties } from "@/layout";

const round = (number, floatingPoints = 2) => {
  if (floatingPoints <= 0) return number;

  return (
    Math.round(number * Math.pow(10, floatingPoints)) /
    Math.pow(10, floatingPoints)
  );
};
const LanguageUsageStats = ({ languages }) => {
  const { theme } = useSelector((state) => state.theme);
  const total = Object.values(languages).reduce((a, b) => a + b);

  return (
    <div className={`flex flex-col gap-4 ${theme.foreground} `}>
      <div
        className={`md:w-2/3 w-full rounded-md overflow-hidden flex border-1 ${theme.border}`}
      >
        {Object.entries(languages).map(([key, value]) => (
          <div
            key={key}
            className={"h-[1rem]"}
            style={{
              backgroundColor: colors.languages[key],
              width: round(value / total, 4) * 100 + "%",
            }}
          />
        ))}
      </div>
      <div className={"flex flex-wrap gap-2"}>
        {Object.entries(languages).map(([key, value]) => (
          <div className={"flex items-center gap-x-2"} key={key}>
            <div
              className={`w-3 aspect-square rounded-full border-1 ${theme.border}`}
              style={{ backgroundColor: colors.languages[key] }}
            />
            <span className={`${layoutProperties.text.extraSmall}`}>
              {key}
              <span className={"text-xs ml-1 text-gray-500"}>
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
