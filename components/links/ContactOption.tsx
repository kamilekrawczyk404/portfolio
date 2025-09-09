"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { layoutProperties } from "@/layout";
import React from "react";
import { ContactOption as ContactOptionType } from "@/views/Contact";

type ContactOptionProps = ContactOptionType;

const ContactOption = ({ icon, title, value, type }: ContactOptionProps) => {
  const { opposite } = useSelector((state: RootState) => state.theme);

  return (
    <div className={`flex ${layoutProperties.gap.small} items-center w-full`}>
      <div
        className={`md:text-xl text-lg bg-purple/75 aspect-square w-10 flex items-center justify-center rounded-full ${opposite.foreground}`}
      >
        {icon}
      </div>
      <div className={`flex flex-col ${layoutProperties.gap.extraSmall}`}>
        <span className={`text-gray-500 ${layoutProperties.text.small}`}>
          {title}
        </span>
        <a
          href={
            type === "email"
              ? `mailto:${value}`
              : `tel:${value.replaceAll(" ", "")}`
          }
          className={`${layoutProperties.text.extraSmall}`}
        >
          {value}
        </a>
      </div>
    </div>
  );
};

export default ContactOption;
