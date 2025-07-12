import React from "react";
import Aspect from "@/components/lists/Aspect";
import CustomLink from "@/components/CustomLink";

const IndentAspect = ({ title, description, icon = null }) => {
  return (
    <div className={"flex flex-col gap-y-1 items-start"}>
      <Aspect name={title} icon={icon} />
      <div className={"relative ml-[.75rem]"}>
        <span
          className={
            "!w-3 absolute left-0 top-0 aspect-square border-l-1 border-b-1"
          }
        ></span>
        <span className={`text-sm inline-block indent-5 `}>
          {description.includes("http") ? (
            <CustomLink href={description} icon={icon} />
          ) : (
            description
          )}
        </span>
      </div>
    </div>
  );
};

export default IndentAspect;
