"use client";
import React, { ReactNode, useState } from "react";
import { Icons } from "@/components/Icons";
import Container from "@/components/containers/Container";
import { layoutProperties } from "@/layout";
import AnimateOnViewCards, {
  CardIndexProps,
  IndexRenderArguments,
} from "@/components/containers/AnimateOnViewCards";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { getMixBlendClassName } from "@/components/navigation/SegmentedControl";
import { animationProperties, variantsPresets } from "@/animations";
import TextWithCode from "@/components/text/TextWithCode";

type CardProps = {
  translationsTitle: string;
  icon: ReactNode;
  features: { icon: ReactNode }[];
};

const translationsPrefix = "AboutMe.Cards";

const cards: CardProps[] = [
  {
    translationsTitle: "CleanCode",
    icon: <Icons.Code />,
    features: [
      {
        icon: <Icons.File />,
      },
      {
        icon: <Icons.Cubes />,
      },
      {
        icon: <Icons.Bug />,
      },
      {
        icon: <Icons.Test />,
      },
    ],
  },
  {
    translationsTitle: "Design",
    icon: <Icons.Palette />,
    features: [
      {
        icon: <Icons.File />,
      },
      {
        icon: <Icons.Mobile />,
      },
      {
        icon: <Icons.Eye />,
      },
      {
        icon: <Icons.UniversalAccess />,
      },
    ],
  },
  {
    translationsTitle: "Performance",
    icon: <Icons.Rocket />,
    features: [
      {
        icon: <Icons.GaugeHigh />,
      },
      {
        icon: <Icons.HourGlass />,
      },
      {
        icon: <Icons.CloudArrowDown />,
      },
      {
        icon: <Icons.BarsProgress />,
      },
    ],
  },
  {
    translationsTitle: "Collaboration",
    icon: <Icons.Users />,
    features: [
      {
        icon: <Icons.FileLines />,
      },
      {
        icon: <Icons.ChartDiagram />,
      },
      {
        icon: <Icons.PeopleRoof />,
      },
      {
        icon: <Icons.Test />,
      },
    ],
  },
];

const PersonalInfoCards = () => {
  return (
    <AnimateOnViewCards
      style={{
        height: cards.length * 125 + "dvh",
      }}
      containerClassName={`w-full`}
      offset={0.05}
      cardClassName={"w-full"}
      cards={cards}
      renderIndex={(props) => <CardIndex {...props} />}
      renderCard={(card) => (
        <Card
          features={card.features}
          translationsTitle={card.translationsTitle}
        />
      )}
    />
  );
};

const CardIndex = ({
  item,
  scrollProgress,
  startWhen,
  endWhen,
  isSelected,
}: IndexRenderArguments<CardProps>) => {
  const t = useTranslations("HomePage.AboutMe.Cards");
  const { theme, opposite, selected } = useSelector(
    (state: RootState) => state.theme,
  );

  const [isActivated, setIsActivated] = useState<boolean>(false);

  const width = useTransform(
    scrollProgress,
    [startWhen, endWhen],
    ["0%", "100%"],
  );

  useMotionValueEvent(scrollProgress, "change", (l) =>
    setIsActivated(startWhen < l),
  );

  return (
    <motion.div
      initial={false}
      animate={{ width: isSelected ? "10.5rem" : "3rem" }}
      className={`relative rounded-sm overflow-hidden p-2 border-1`}
    >
      <motion.div
        style={{ width }}
        className={`absolute left-0 top-0 h-full ${opposite.background}`}
      />

      <div
        className={`flex items-center justify-center gap-2 ${getMixBlendClassName(
          selected,
          true,
        )} ${theme.foreground}`}
      >
        <div
          className={`min-w-7 overflow-hidden flex items-center justify-center aspect-square`}
        >
          <motion.span
            animate={{
              scale: isSelected ? 1.25 : 1,
            }}
            className={`inline-block ${layoutProperties.text.medium}`}
          >
            {item.icon}
          </motion.span>
        </div>
        {isSelected && (
          <motion.h3
            layoutId={"aspect"}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: isSelected ? "100%" : "0%",
            }}
            className={`${layoutProperties.text.small} font-[500] text-nowrap`}
          >
            {t(`${item.translationsTitle}.Title`)}
          </motion.h3>
        )}
      </div>
    </motion.div>
  );
};

const Card = ({
  translationsTitle,
  features,
}: Pick<CardProps, "translationsTitle" | "features">) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <ul
      className={`flex flex-col lg:max-w-1/2 max-w-full mx-auto border-1 rounded-lg ${theme.borderSecondary} divide-y-1 ${theme.divideSecondary}`}
    >
      {features.map((feature, index) => (
        <li key={index}>
          <Feature
            icon={feature.icon}
            translationsTitle={translationsTitle}
            index={index}
          />
        </li>
      ))}
    </ul>
  );
};

const Feature = ({
  translationsTitle,
  icon,
  index,
}: Pick<CardProps, "translationsTitle" | "icon"> & { index: number }) => {
  const { theme, opposite } = useSelector((state: RootState) => state.theme);
  const t = useTranslations(`HomePage.${translationsPrefix}`);

  const [isDetailed, setIsDetailed] = useState<boolean>(false);

  const variants = variantsPresets.appearing({
    duration: animationProperties.durations.short,
  });

  return (
    <Container.AnimateChangeInHeight
      className={"content-center"}
      onMouseEnter={() => setIsDetailed(true)}
      onMouseLeave={() => setIsDetailed(false)}
    >
      <AnimatePresence mode={"wait"}>
        {!isDetailed && (
          <motion.div
            key={"title"}
            variants={variants}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            className={"flex items-center justify-between gap-2 p-4"}
          >
            <div className={`flex items-start gap-2`}>
              <div
                className={`min-w-6 content-center aspect-square flex items-center justify-center rounded-sm ${opposite.background} ${opposite.foreground}`}
              >
                {icon}
              </div>
              <h4>{t(`${translationsTitle}.Features.${index}.Title`)}</h4>
            </div>
            <Icons.AngleDown />
          </motion.div>
        )}

        {isDetailed && (
          <motion.p
            key={"description"}
            variants={variants}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            className={`${layoutProperties.text.extraSmall} p-4 text-justify !leading-[160%]`}
          >
            <TextWithCode
              text={t(`${translationsTitle}.Features.${index}.Description`)}
            />
          </motion.p>
        )}
      </AnimatePresence>
    </Container.AnimateChangeInHeight>
  );
};

export default PersonalInfoCards;
