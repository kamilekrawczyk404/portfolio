"use client";
import React, { CSSProperties, ReactNode, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { layoutProperties } from "@/layout";

export type IndexRenderArguments<T> = Omit<CardIndexProps<T>, "renderIndex"> & {
  isSelected: boolean;
};

type AnimateOnViewCardsProps<T> = {
  cards: T[];
  renderCard: (item: T) => ReactNode;
  renderIndex: ({
    item,
    startWhen,
    endWhen,
    scrollProgress,
    isSelected,
  }: IndexRenderArguments<T>) => ReactNode;
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
  renderCard,
  renderIndex,
  dataTestId,
  style,
  offset = 0,
  containerClassName = "",
  cardsContainerClassName = "",
  cardClassName = "",
}: AnimateOnViewCardsProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, offset > 0 ? offset : 0.125, 1 - (offset > 0 ? offset : 0.125), 1],
    ["0%", "100%", "100%", "0%"],
  );

  const cardDurationOffset = (1 - 2 * offset) / cards.length;

  const startOffsets = Array.from(
    { length: cards.length },
    (_, index) => cardDurationOffset * index + offset,
  );
  const endOffsets = Array.from(
    { length: cards.length },
    (_, index) => cardDurationOffset * (index + 1) + offset,
  );

  return (
    <motion.div
      data-testid={dataTestId}
      ref={containerRef}
      className={`relative ${containerClassName}`}
      style={{ opacity, ...style }}
    >
      <div
        className={`w-fit mx-auto sticky top-[max(33%,13rem)] flex items-start ${layoutProperties.gap.small}`}
      >
        {cards.map((card, index) => (
          <CardIndex
            key={index}
            item={card}
            renderIndex={renderIndex}
            scrollProgress={scrollYProgress}
            startWhen={startOffsets[index]}
            endWhen={endOffsets[index]}
          />
        ))}
      </div>

      <motion.ul ref={listRef} className={`h-full ${cardsContainerClassName}`}>
        {cards.map((card, index) => (
          <Card
            key={index}
            item={card}
            renderCard={renderCard}
            scrollProgress={scrollYProgress}
            startWhen={startOffsets[index]}
            endWhen={endOffsets[index]}
            className={cardClassName}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
};

type CardProps<T> = {
  item: T;
  startWhen: number;
  endWhen: number;
  scrollProgress: MotionValue<number>;
  className?: string;
} & Pick<AnimateOnViewCardsProps<T>, "renderCard">;
const Card = <T extends unknown>({
  item,
  renderCard: render,
  startWhen,
  endWhen,
  scrollProgress,
  className = "",
}: CardProps<T>) => {
  const duration = endWhen - startWhen;

  const [isOnTop, setIsOnTop] = useState<boolean>(false);

  const cardAnimationOffsets = (duration: number) => [
    startWhen,
    startWhen + duration,
    endWhen - duration,
    endWhen,
  ];

  const translateY = useTransform(
    scrollProgress,
    cardAnimationOffsets(duration / 4),
    ["0%", "-50%", "-50%", "-100%"],
  );

  const opacity = useTransform(
    scrollProgress,
    cardAnimationOffsets(duration / 4),
    ["0%", "100%", "100%", "0%"],
  );

  const scale = useTransform(
    scrollProgress,
    cardAnimationOffsets(duration / 4),
    ["70%", "100%", "100%", "70%"],
  );

  useMotionValueEvent(scrollProgress, "change", (l) => {
    setIsOnTop(l >= startWhen && l <= endWhen);
  });

  return (
    <motion.li
      className={`sticky top-2/3 select-none overflow-y-scroll ${className}`}
      style={{
        opacity,
        translateY,
        scale,
        zIndex: isOnTop ? 10 : 0,
      }}
    >
      {render(item)}
    </motion.li>
  );
};

export type CardIndexProps<T> = {
  item: T;
  scrollProgress: MotionValue<number>;
  startWhen: number;
  endWhen: number;
} & Pick<AnimateOnViewCardsProps<T>, "renderIndex">;

const CardIndex = <T extends unknown>({
  scrollProgress,
  startWhen,
  endWhen,
  item,
  renderIndex: render,
}: CardIndexProps<T>) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useMotionValueEvent(scrollProgress, "change", (l) =>
    setIsSelected(startWhen < l && l < endWhen),
  );

  return render({ item, isSelected, scrollProgress, startWhen, endWhen });
};

export default AnimateOnViewCards;
