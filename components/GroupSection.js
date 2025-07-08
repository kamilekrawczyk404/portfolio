import React from "react";

const GroupSection = ({ title, children, className = "" }) => {
  return (
    <div
      className={`flex flex-col self-center gap-y-1 relative justify-center ${className}`}
    >
      <p className={"text-sm"}>{title}</p>
      {children}
    </div>
  );
};

export default GroupSection;
