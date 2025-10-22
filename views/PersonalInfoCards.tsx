"use client";
import React, { ReactNode, useState } from "react";
import { Icons } from "@/components/Icons";
import Container from "@/components/containers/Container";
import { layoutProperties } from "@/layout";
import AnimateOnViewCards, {
  IndexRenderArguments,
} from "@/components/containers/AnimateOnViewCards";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import SegmentedControl, {
  getMixBlendClassName,
} from "@/components/navigation/SegmentedControl";
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
  const t = useTranslations("HomePage.AboutMe.Cards");

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className={`flex flex-col ${layoutProperties.gap.large}`}>
      <SegmentedControl
        items={cards}
        render={(card) => (
          <span
            className={`inline-flex items-center lg:gap-3 gap-2 ${layoutProperties.text.medium}`}
          >
            {card.icon}
            <span>{t(`${card.translationsTitle}.Title`)}</span>
          </span>
        )}
        onItemSelect={(index) => setSelectedIndex(index)}
        layoutId={"about-me-key-features"}
        className={"mx-auto !max-w-[calc(100vw-2rem)]"}
      />

      <AnimatePresence mode={"wait"}>
        {cards.map((card, index) =>
          index !== selectedIndex ? null : (
            <Card
              key={index}
              features={card.features}
              translationsTitle={card.translationsTitle}
            />
          ),
        )}
      </AnimatePresence>
    </div>
  );
};

const Card = ({
  translationsTitle,
  features,
}: Pick<CardProps, "translationsTitle" | "features">) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const variants = variantsPresets.verticalAppearing(
    "fromTop",
    10,
    animationProperties.durations.short,
  );

  return (
    <motion.ul
      variants={variants}
      initial={"initial"}
      animate={"animate"}
      exit={"exit"}
      className={`grid lg:grid-cols-2 grid-cols-1 mx-auto w-full ${theme.borderSecondary} ${layoutProperties.gap.small}`}
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
    </motion.ul>
  );
};

const Feature = ({
  translationsTitle,
  icon,
  index,
}: Pick<CardProps, "translationsTitle" | "icon"> & { index: number }) => {
  const { theme, opposite } = useSelector((state: RootState) => state.theme);
  const t = useTranslations(`HomePage.${translationsPrefix}`);

  const variants = variantsPresets.appearing({
    duration: animationProperties.durations.short,
  });

  return (
    <Container.Default
      className={`relative content-center space-y-2 divide-y-1 ${theme.divideSecondary}`}
    >
      <AnimatePresence mode={"wait"}>
        <div className={`flex items-end gap-2 pb-3`}>
          <div
            className={`min-w-8 aspect-square content-center flex items-center justify-center rounded-sm ${opposite.backgroundDark} ${opposite.foreground} ${layoutProperties.text.medium}`}
          >
            {icon}
          </div>
          <h4>{t(`${translationsTitle}.Features.${index}.Title`)}</h4>
        </div>

        <motion.p
          key={"description"}
          variants={variants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          className={`text-justify !leading-[160%] ${theme.foregroundSecondary} ${layoutProperties.text.small} `}
        >
          <TextWithCode
            text={t(`${translationsTitle}.Features.${index}.Description`)}
          />
        </motion.p>
      </AnimatePresence>
    </Container.Default>
  );
};

export default PersonalInfoCards;
