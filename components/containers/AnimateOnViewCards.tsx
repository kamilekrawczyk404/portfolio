"use client";
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { layoutProperties } from "@/layout";

type AnimateOnViewCardsProps<T> = {
  cards: T[];
  render: (item: T, isExpanded?: boolean) => ReactNode;
  offset?: number;
  containerClassName?: string;
  cardsContainerClassName?: string;
  cardClassName?: string;
  cardExpandWhen?: number | null;
  dataTestId?: string;
  style?: CSSProperties;
};

const AnimateOnViewCards = <T extends unknown>({
  cards,
  render,
  offset = 0,
  dataTestId,
  style,
  containerClassName = "",
  cardsContainerClassName = "",
  cardClassName = "",
  cardExpandWhen = null,
}: AnimateOnViewCardsProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"],
  });

  const { scrollYProgress: lineProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(
    lineProgress,
    [0, 0.05, 0.95, 1],
    ["0%", "100%", "100%", "0%"],
  );

  const cardDurationOffset = (1 - offset) / cards.length;

  const startOffsets = Array.from(
    { length: cards.length },
    (_, index) => cardDurationOffset * index,
  );
  const endOffsets = Array.from(
    { length: cards.length },
    (_, index) => cardDurationOffset * (index + 1),
  );

  return (
    <motion.div
      data-testid={dataTestId}
      ref={containerRef}
      className={`relative ${containerClassName}`}
      style={{ opacity, ...style }}
    >
      <motion.ul
        ref={listRef}
        className={`sticky top-1/2 ${cardsContainerClassName}`}
      >
        <div
          className={`absolute lg:-translate-y-1/2 translate-y-[25vh] lg:left-0 left-1/2 lg:translate-x-0 -translate-x-1/2 flex lg:flex-col flex-row ${layoutProperties.gap.medium}`}
        >
          {cards.map((_, index) => (
            <CardIndex
              key={index}
              scrollProgress={scrollYProgress}
              startWhen={startOffsets[index]}
              endWhen={endOffsets[index]}
            >
              #{index + 1}
            </CardIndex>
          ))}
        </div>
        {cards.map((card, index) => (
          <Card
            key={index}
            i={index + 1}
            item={card}
            render={render}
            scrollProgress={scrollYProgress}
            startWhen={startOffsets[index]}
            endWhen={endOffsets[index]}
            className={cardClassName}
            expandWhen={cardExpandWhen}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
};

type CardProps<T> = {
  i: number;
  item: T;
  startWhen: number;
  endWhen: number;
  expandWhen: number | null;
  scrollProgress: MotionValue<number>;
  className?: string;
} & Pick<AnimateOnViewCardsProps<T>, "render">;
const Card = <T extends unknown>({
  i,
  item,
  render,
  startWhen,
  endWhen,
  scrollProgress,
  expandWhen,
  className = "",
}: CardProps<T>) => {
  const duration = (endWhen - startWhen) / 4;

  const [isOnTop, setIsOnTop] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const initialRotate = (i % 2 === 0 ? -1 : 1) * 5 + Math.floor(i / 2);

  const cardAnimationOffsets = [
    startWhen,
    startWhen + duration,
    endWhen - duration,
    endWhen,
  ];

  const translateY = useTransform(scrollProgress, cardAnimationOffsets, [
    "0%",
    "-50%",
    "-50%",
    "-100%",
  ]);

  const rotate = useTransform(scrollProgress, cardAnimationOffsets, [
    initialRotate + "deg",
    "0deg",
    "0deg",
    -initialRotate + "deg",
  ]);

  const opacity = useTransform(scrollProgress, cardAnimationOffsets, [
    "0%",
    "100%",
    "100%",
    "0%",
  ]);

  const scale = useTransform(scrollProgress, cardAnimationOffsets, [
    "70%",
    "100%",
    "100%",
    "70%",
  ]);

  useMotionValueEvent(scrollProgress, "change", (l) => {
    setIsOnTop(l >= startWhen && l <= endWhen);

    const difference = endWhen - startWhen;
    if (expandWhen === null) return;

    setIsExpanded(
      startWhen + difference * expandWhen <= l &&
        l <= endWhen - difference * expandWhen,
    );
  });

  return (
    <motion.li
      className={`block absolute top-1/2 left-0 select-none ${className}`}
      style={{
        opacity,
        translateY,
        scale,
        rotate,
        zIndex: isOnTop ? 10 : 0,
      }}
    >
      {render(item, isExpanded)}
    </motion.li>
  );
};

type PointProps = {
  className?: string;
  children?: ReactNode;
  scrollProgress: MotionValue<number>;
  startWhen: number;
  endWhen: number;
};

const CardIndex = ({
  children,
  scrollProgress,
  startWhen,
  endWhen,
  className = "",
}: PointProps) => {
  const duration = (endWhen - startWhen) / 8;
  const animationOffsets = [
    startWhen,
    startWhen + duration,
    endWhen - duration,
    endWhen,
  ];

  const { opposite, theme } = useSelector((state: RootState) => state.theme);

  const [isSelected, setIsSelected] = useState<boolean>(false);

  useMotionValueEvent(scrollProgress, "change", (l) =>
    setIsSelected(startWhen < l && l < endWhen),
  );

  const scale = useTransform(
    scrollProgress,
    animationOffsets,
    [1, 1.5, 1.5, 1],
  );

  const opacity = useTransform(scrollProgress, animationOffsets, [
    "0%",
    "100%",
    "100%",
    "0%",
  ]);

  return (
    <motion.div
      style={{ scale }}
      className={`select-none origin-center w-8 aspect-square content-center rounded-full z-10 transition-colors ${
        isSelected
          ? `border-none ${opposite.background} ${opposite.foreground}`
          : `border-1 ${theme.border}`
      } ${className}`}
    >
      <motion.div
        className={`flex items-center justify-center ${layoutProperties.text.extraSmall}`}
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimateOnViewCards;
