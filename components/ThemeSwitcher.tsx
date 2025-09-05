"use client";
import React, { JSX } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "@/redux/reducers/themeSlice";
import { AppDispatch, RootState } from "@/redux/store";

type ThemeSwitcherProps = {
  className?: string;
};

const ThemeSwitcher = ({ className = "" }: ThemeSwitcherProps): JSX.Element => {
  const { selected } = useSelector((state: RootState) => state.theme);

  const dispatch: AppDispatch = useDispatch();

  const handleChangeTheme = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    dispatch(changeTheme(selected === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`text-lg flex gap-x-2 items-center ${className}`}>
      <Icons.Sun />
      <div
        className={
          "flex relative w-[3rem] border-1 rounded-xl h-[1.5rem] p-[.125rem] cursor-pointer"
        }
        style={{
          justifyContent: selected === "dark" ? "flex-end" : "flex-start",
        }}
        onClick={(e) => handleChangeTheme(e)}
      >
        <motion.div
          layout
          className={"h-full aspect-square rounded-full bg-purple"}
        />
      </div>
      <Icons.Moon />
    </div>
  );
};

export default ThemeSwitcher;
