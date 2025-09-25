"use client";
import React, { ComponentProps, ReactNode } from "react";

type ListProps<T> = {
  items: T[];
  render: (item: T, index?: number) => ReactNode;
  dataTestId?: string;
} & ComponentProps<"ul">;

const List = <T extends unknown>({
  items,
  render,
  dataTestId,
  ...props
}: ListProps<T>) => {
  return (
    <ul
      data-testid={dataTestId}
      {...props}
      className={!props.className ? "flex flex-wrap gap-2" : props.className}
    >
      {items.map((item, index) => (
        <li key={index}>{render(item, index)}</li>
      ))}
    </ul>
  );
};

export default List;
