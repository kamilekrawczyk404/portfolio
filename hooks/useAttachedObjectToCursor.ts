import React, { RefObject, useEffect, useState } from "react";
import useMousePosition from "@/hooks/useMousePosition";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type AttachedObjectToCursorProps = {
  parent: RefObject<any>;
  target: RefObject<any>;
  options?: {
    renderWhen?: boolean;
    margin?: number;
  };
  onEnter?: () => any;
  onLeave?: () => any;
};
const getLeftOffset = (mouseX: number, leftOffset: number) =>
  mouseX - leftOffset;

const getTopOffset = (mouseY: number, topOffset: number) => mouseY - topOffset;

const useAttachedObjectToCursor = ({
  parent,
  target,
  options = {
    renderWhen: true,
    margin: 0,
  },
  onEnter = () => {},
  onLeave = () => {},
}: AttachedObjectToCursorProps): {
  isVisible: boolean;
  leftOffset: number;
  topOffset: number;
} => {
  const mousePosition = useMousePosition();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [scrollTrigger, setScrollTrigger] = useState<boolean>(false);

  useEffect(() => {
    const handleRecalculationOnResize = () => {
      setScrollTrigger((prev) => !prev);
    };

    const handleRecalculationOnScroll = () => {
      setScrollTrigger((prev) => !prev);
    };

    window.addEventListener("scroll", handleRecalculationOnScroll);
    window.addEventListener("resize", handleRecalculationOnResize);

    return () => {
      window.removeEventListener("scroll", handleRecalculationOnScroll);
      window.removeEventListener("resize", handleRecalculationOnResize);
    };
  }, []);

  useEffect(() => {
    const { top, left, width, height } = parent.current.getBoundingClientRect();
    const { renderWhen = true, margin = 0 } = options || {};

    if (
      renderWhen &&
      mousePosition.x >= left + margin &&
      mousePosition.x <= left + width - margin &&
      mousePosition.y >= top + margin &&
      mousePosition.y <= top + height - margin
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [mousePosition, parent, target, options, scrollTrigger]);

  useEffect(() => {
    if (isVisible) {
      onEnter();
    } else {
      onLeave();
    }
  }, [isVisible]);

  return {
    isVisible,
    leftOffset: getLeftOffset(
      mousePosition.x,
      parent?.current?.getBoundingClientRect()?.left || 0,
    ),
    topOffset: getTopOffset(
      mousePosition.y,
      parent?.current?.getBoundingClientRect()?.top || 0,
    ),
  };
};

export default useAttachedObjectToCursor;
