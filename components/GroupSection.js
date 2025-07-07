import React from "react";

const GroupSection = ({ title, children }) => {
  return (
    <div
      className={"flex flex-col self-center gap-y-1 relative justify-center"}
    >
      <p className={"text-sm"}>{title}</p>
      {children}
    </div>
  );
};

export default GroupSection;
