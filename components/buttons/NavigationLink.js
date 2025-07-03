import React from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";

const ButtonBackdrop = () => {
  return (
    <div
      className={
        "absolute left-0 top-0 w-0 h-full group-hover:w-full transition-all bg-purple/50 rounded-md"
      }
    />
  );
};
const NavigationLink = ({ children, ...props }) => {
  return (
    <Link className={"text-5xl relative group w-fit flex"} {...props}>
      <div
        className={
          "relative h-full scale-0 origin-bottom-left aspect-square group-hover:h-full overflow-hidden group-hover:scale-100 group-hover:mr-2 transition-all duration-300"
        }
      >
        <Icons.Arrow
          className={
            "-rotate-45 origin-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          }
        />
        <ButtonBackdrop />
      </div>
      <div
        className={
          "relative -translate-x-[4rem] group-hover:translate-x-0 transition-all duration-300 px-2 py-1"
        }
      >
        <ButtonBackdrop />
        {children}
      </div>
    </Link>
  );
};

export default NavigationLink;
