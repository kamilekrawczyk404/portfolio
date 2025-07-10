"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "@/redux/reducers/themeSlice";

const ThemeSwitcher = ({ className = "" }) => {
  const { selected } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const handleChangeTheme = () => {
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
        onClick={handleChangeTheme}
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
