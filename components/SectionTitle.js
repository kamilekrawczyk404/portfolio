import React from "react";

const SectionTitle = ({ title, children }) => {
  return (
    <div className={"flex gap-x-8 relative"}>
      <h2 className={"text-7xl"}>{title}</h2>
      {children}
    </div>
  );
};

export default SectionTitle;
