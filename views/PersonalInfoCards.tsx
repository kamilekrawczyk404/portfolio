"use client";
import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { Icons } from "@/components/Icons";
import Container from "@/components/containers/Container";
import { layoutProperties } from "@/layout";
import AnimateOnViewCards from "@/components/containers/AnimateOnViewCards";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";

type Card = {
  title: string;
  description: string;
  icon: ReactNode;
};

const translationsPrefix = "AboutMe.Cards";

const cards: Card[] = [
  {
    title: `CleanCode.Title`,
    description: `CleanCode.Description`,
    icon: <Icons.Code />,
  },
  {
    title: `Design.Title`,
    description: `Design.Description`,
    icon: <Icons.Palette />,
  },
  {
    title: `Performance.Title`,
    description: `Performance.Description`,
    icon: <Icons.Rocket />,
  },
  {
    title: `Collaboration.Title`,
    description: `Collaboration.Description`,
    icon: <Icons.Users />,
  },
];

const PersonalInfoCards = () => {
  return (
    <AnimateOnViewCards
      style={{
        height: cards.length * 125 + "dvh",
      }}
      offset={0.1}
      containerClassName={`w-full`}
      cardClassName={"w-full"}
      cards={cards}
      cardExpandWhen={0.2}
      render={(card, isExpanded) => (
        <Card card={card} isExpanded={isExpanded} />
      )}
    />
  );
};

type CardProps = {
  card: Card;
  isExpanded: boolean;
};
const Card = ({ card, isExpanded }: CardProps) => {
  const { theme, opposite } = useSelector((state: RootState) => state.theme);
  const t = useTranslations(`HomePage.${translationsPrefix}`);

  const listValues = [
    "Breaking down complex challenges into manageable, actionable steps",
    "Identifying patterns and potential bottlenecks before they become issues",
    "Balancing immediate needs with long-term scalability and maintainability",
    "Making data-driven decisions that align with business objectives",
  ];

  const ref = useRef(null);
  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [card, isExpanded]);

  console.log("expand to", height);

  return (
    <Container.Default
      ref={ref}
      animate={{ height }}
      transition={{
        ...animationsTypes.default,
        duration: animationProperties.durations.long,
      }}
      className={`flex flex-col lg:max-w-2/3 max-w-full mx-auto ${layoutProperties.gap.large} `}
    >
      <div
        className={`relative flex items-start ${layoutProperties.gap.small}`}
      >
        <div
          className={`aspect-square w-14 rounded-md flex items-center justify-center ${layoutProperties.text.medium} ${opposite.background} ${opposite.foreground}`}
        >
          {card.icon}
        </div>
        <div className={"space-y-1"}>
          <h2 className={`${layoutProperties.text.large} font-[500]`}>
            {t(card.title)}
          </h2>
          <p className={`${layoutProperties.text.small} text-neutral-500`}>
            {t(card.description)}
          </p>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <ul
            className={
              "space-y-3 list-disc list-inside lg:px-4 px-2 overflow-hidden"
            }
          >
            {listValues.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        )}
      </AnimatePresence>
    </Container.Default>
  );
};

export default PersonalInfoCards;
