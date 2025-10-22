"use client";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { layoutProperties } from "@/layout";
import { Icons } from "@/components/Icons";
import Container from "@/components/containers/Container";
import { motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";

type ExpandingListProps<T> = {
  id?: string;
  onExpand?: (id: string) => any;
  isExpanded?: boolean;
  items: T[];
  renderItem: (item: T) => ReactNode;
  title: string;
  className?: string;
};
const ExpandingList = <T extends unknown>({
  items,
  title,
  renderItem,
  id = null,
  onExpand = () => null,
  isExpanded = true,
  className = "",
}: ExpandingListProps<T>) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleListClicked = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    onExpand(id || "list-id");
  };

  return (
    <Container.AnimateChangeInHeight>
      <ul
        onClick={(e) => handleListClicked(e)}
        className={`relative space-y-2 shadow-xs ${className}`}
      >
        <div className={`flex gap-2 justify-between items-center`}>
          <h4 className={"font-[400] tracking-wide"}>{title}</h4>
          <motion.span
            animate={{ rotate: isExpanded ? "180deg" : "0deg" }}
            transition={{
              ...animationsTypes.default,
              duration: animationProperties.durations.medium,
            }}
            className={"inline-block"}
          >
            <Icons.AngleDown />
          </motion.span>
        </div>

        {isExpanded &&
          items.map((item, index) => (
            <li
              key={index}
              className={`${layoutProperties.text.extraSmall} pl-2`}
            >
              <Icons.AngleRight className={"mr-2"} />
              <span className={`${theme.foregroundSecondary}`}>
                {renderItem(item)}
              </span>
            </li>
          ))}
      </ul>
    </Container.AnimateChangeInHeight>
  );
};

export default ExpandingList;
