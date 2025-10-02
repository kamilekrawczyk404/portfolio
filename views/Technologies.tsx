"use client";
import React, { useState, useCallback } from "react";
import PageContainer from "@/components/containers/PageContainer";
import { layoutProperties } from "@/layout";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { animationsTypes } from "@/animations";
import SectionTitle from "@/components/containers/SectionTitle";
import GroupSection from "@/components/containers/GroupSection";
import StaggeredList from "@/components/lists/StaggeredList";
import Aspect from "@/components/lists/Aspect";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import { useTranslations } from "next-intl";
import AppearingContainer from "@/components/containers/AppearingContainer";
import { Variants } from "motion-dom";
import ProgressBarAspect from "@/components/project/ProgressBarAspect";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import SegmentedControl from "@/components/navigation/SegmentedControl";
import { Icons } from "@/components/Icons";
import Container from "@/components/containers/Container";

type Aspect = {
  name: string;
  knowledge?: number;
};

type TechnologyAspect = {
  title: string;
  aspects: Aspect[];
};

type Section =
  | "languages"
  | "frameworks"
  | "otherAspects"
  | "tools"
  | "projectManagement";

type TechnologyType = "Frontend" | "Backend" | "DevTools";

type Technology = {
  type: TechnologyType;
} & Partial<Record<Section, TechnologyAspect>>;

const technologies: Technology[] = [
  {
    type: "Frontend",
    languages: {
      title: "Languages",
      aspects: [
        { name: "JavaScript", knowledge: 80 },
        { name: "TypeScript", knowledge: 75 },
        { name: "HTML", knowledge: 90 },
        { name: "CSS", knowledge: 85 },
      ],
    },
    frameworks: {
      title: "Frameworks & Libraries",
      aspects: [
        { name: "ReactJS", knowledge: 85 },
        { name: "NextJS", knowledge: 70 },
        { name: "Redux", knowledge: 70 },
        { name: "Framer Motion", knowledge: 65 },
        { name: "Tailwind-CSS", knowledge: 90 },
        { name: "SCSS", knowledge: 80 },
      ],
    },
    otherAspects: {
      title: "Additional aspects", // These don't have knowledge, so no progress bar
      aspects: [
        { name: "SEO" },
        { name: "Playwright" },
        { name: "React Testing Library" },
        { name: "Web sockets" },
        { name: "Web Performance Optimization" },
        { name: "Core Web Vitals" },
        { name: "Responsive designs" },
      ],
    },
  },
  {
    type: "Backend",
    languages: {
      title: "Languages",
      aspects: [
        { name: "Node.js", knowledge: 60 },
        { name: "PHP", knowledge: 60 },
        { name: "Python", knowledge: 50 },
        { name: "C#", knowledge: 50 },
        { name: "MySQL", knowledge: 85 },
        { name: "MongoDB", knowledge: 75 },
      ],
    },
    frameworks: {
      title: "Frameworks & Libraries",
      aspects: [
        { name: "Prisma", knowledge: 50 },
        { name: "Express.js", knowledge: 50 },
        { name: "Symfony", knowledge: 60 },
        { name: "Laravel", knowledge: 65 },
        { name: "ASP.NET", knowledge: 35 },
      ],
    },
    otherAspects: {
      title: "Additional aspects",
      aspects: [
        { name: "PHPUnit" },
        { name: "Authorization & Authentication" },
        { name: "REST API" },
        { name: "Graph QL" },
      ],
    },
  },
  {
    type: "DevTools",
    tools: {
      title: "Tools",
      aspects: [
        { name: "Git", knowledge: 85 },
        { name: "GitHub", knowledge: 85 },
        { name: "Docker", knowledge: 60 },
      ],
    },
    projectManagement: {
      title: "Project management",
      aspects: [
        { name: "Agile" },
        { name: "Scrum" },
        { name: "Github Actions" },
        { name: "Jira" },
        { name: "Trello" },
        { name: "Asana" },
        { name: "SOLID" },
        { name: "DRY" },
        { name: "KISS" },
      ],
    },
    otherAspects: {
      title: "Additional aspects",
      aspects: [
        { name: "Linux" },
        { name: "Terminal / CLI" },
        { name: "VS Code" },
        { name: "WebStorm" },
        { name: "Webpack" },
        { name: "NPM / Yarn" },
        { name: "Postman" },
        { name: "Composer" },
      ],
    },
  },
];

const contentVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      ...animationsTypes.default,
      delayChildren: stagger(0.05),
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { ...animationsTypes.default, duration: 0.3 },
  },
};

// Variants for "Languages", "Frameworks", "Other Aspects" groups
const groupVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      ...animationsTypes.default,
      delayChildren: stagger(0.05),
    },
  },
  exit: { opacity: 0 },
};

// Variants for the individual aspect item (text + progress bar container)
const aspectItemVariants: Variants = {
  initial: { opacity: 0 }, // Added y for subtle slide
  animate: {
    opacity: 1,
    transition: {
      ...animationsTypes.default,
      duration: 0.5,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }, // Added y for exit too
};

const technologiesIcons = {
  Frontend: <Icons.Code />,
  Backend: <Icons.Gear />,
  DevTools: <Icons.Palette />,
};

const Technologies = () => {
  const t = useTranslations("HomePage");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { theme } = useSelector((state: RootState) => state.theme);

  const [animatedProgressBars, setAnimatedProgressBars] = useState<{
    [key in string]: boolean;
  }>({});

  const onCategoryChange = useCallback((selectedTechnologyIndex: number) => {
    setSelectedIndex(selectedTechnologyIndex);
    setAnimatedProgressBars({});
  }, []);

  return (
    <PageContainer
      section
      id={"technologies"}
      className={`flex flex-col ${layoutProperties.gap.large}`}
    >
      <SectionTitle
        title={t("Technologies.Title")}
        description={
          "A showcase of my expertise across the full web development stack, organized by language, framework, and tool."
        }
      >
        <SegmentedControl
          className={"mx-auto"}
          layoutId={"technologies-segmented-control"}
          items={technologies}
          render={(technology) => (
            <span
              className={`inline-flex items-center lg:gap-3 md:gap-2 gap-1 ${layoutProperties.text.medium}`}
            >
              <span>{technologiesIcons[technology.type]}</span>
              {technology.type}
            </span>
          )}
          onItemSelect={onCategoryChange}
        />
      </SectionTitle>
      <AppearingContainer
        className={`grid lg:grid-cols-2 grid-cols-1 ${layoutProperties.gap.small} ${theme.foreground}`}
      >
        <AnimatePresence mode={"popLayout"}>
          {Object.entries(technologies[selectedIndex]).map(
            ([key, technologyAspect]: [string, TechnologyAspect]) => {
              if (key === "type") return null;

              return (
                <Container.Default
                  key={key}
                  variants={groupVariants}
                  initial={"initial"}
                  animate={"animate"}
                  exit={"exit"}
                  className={"basis-1/2 space-y-4"}
                >
                  <h2
                    className={`font-[500] border-b-1 pb-2 ${theme.borderSecondary} ${layoutProperties.text.medium} `}
                  >
                    {technologyAspect.title}
                  </h2>
                  {["otheraspects", "projectmanagement"].includes(
                    key.toLowerCase(),
                  ) ? (
                    <StaggeredList
                      items={technologyAspect.aspects}
                      render={(aspect) => <Aspect name={aspect.name} />}
                    />
                  ) : (
                    <div
                      className={`grid lg:grid-cols-2 grid-cols-1 ${layoutProperties.gap.medium}`}
                    >
                      {technologyAspect.aspects.map(
                        (aspect: Aspect & { knowledge: number }) => {
                          return (
                            <ProgressBarAspect
                              key={aspect.name}
                              aspect={aspect}
                              variants={aspectItemVariants}
                              onAnimationComplete={(definition) => {
                                // When animation is completed start animate the progress bar
                                if (definition === "animate") {
                                  setAnimatedProgressBars((prev) => ({
                                    ...prev,
                                    [aspect.name]: true,
                                  }));
                                }
                              }}
                              shouldAnimate={
                                animatedProgressBars[aspect.name] || false
                              }
                            />
                          );
                        },
                      )}
                    </div>
                  )}
                </Container.Default>
              );
            },
          )}
        </AnimatePresence>
      </AppearingContainer>
    </PageContainer>
  );
};

export default Technologies;
