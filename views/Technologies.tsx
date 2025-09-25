"use client";
import React, { useState, useCallback } from "react";
import PageContainer from "@/components/containers/PageContainer";
import { layoutProperties } from "@/layout";
import { AnimatePresence, motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import SectionTitle from "@/components/containers/SectionTitle";
import GroupSection from "@/components/containers/GroupSection";
import Categories from "@/components/Categories";
import StaggeredList from "@/components/lists/StaggeredList";
import Aspect from "@/components/lists/Aspect";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import { useTranslations } from "next-intl";
import AppearingContainer from "@/components/containers/AppearingContainer";
import { Variants } from "motion-dom";
import ProgressBarAspect from "@/components/project/ProgressBarAspect";

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
        { name: "JavaScript", knowledge: 90 },
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
        { name: "Java", knowledge: 50 },
        { name: "MySQL", knowledge: 85 },
        { name: "MongoDB", knowledge: 75 },
      ],
    },
    frameworks: {
      title: "Frameworks & Libraries",
      aspects: [
        { name: "Prisma", knowledge: 50 },
        { name: "Express.js", knowledge: 30 },
        { name: "Symfony", knowledge: 60 },
        { name: "Laravel", knowledge: 65 },
        { name: "ASP.NET", knowledge: 30 },
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
        { name: "VMware", knowledge: 70 },
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
      staggerChildren: 0.05, // Stagger groups like Languages, Frameworks
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
      staggerChildren: 0.05,
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

const Technologies = () => {
  const t = useTranslations("HomePage");

  const [selectedTechnologyIndex, setSelectedTechnologyIndex] =
    useState<number>(0);

  const [animatedProgressBars, setAnimatedProgressBars] = useState<{
    [key in string]: boolean;
  }>({});

  const onCategoryChange = useCallback((selectedCategories: Technology[]) => {
    if (!selectedCategories.length) return;

    setSelectedTechnologyIndex(
      technologies.findIndex((t) => t.type === selectedCategories[0].type),
    );
    setAnimatedProgressBars({});
  }, []);

  return (
    <PageContainer section id={"technologies"}>
      <SectionTitle title={t("Technologies.Title")}>
        <GroupSection
          title={() => <span>{t("Technologies.SelectorTitle")}</span>}
        >
          <Categories
            categories={technologies}
            delay={animationProperties.durations.long}
            whileInView
            render={(technology) => technology.type}
            callback={onCategoryChange}
            singleSelection
            defaultSelectedIndex={0}
          />
        </GroupSection>
      </SectionTitle>
      <AppearingContainer>
        <AnimatePresence mode={"popLayout"}>
          <motion.div
            key={technologies[selectedTechnologyIndex].type}
            variants={contentVariants}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            className={`flex flex-col flex-1 ${layoutProperties.gap.medium}`}
          >
            {Object.entries(technologies[selectedTechnologyIndex]).map(
              ([key, value]) => {
                if (key === "type") return null;

                const techAspect = value as TechnologyAspect;

                return (
                  <motion.div
                    key={key}
                    variants={groupVariants}
                    initial={"initial"}
                    animate={"animate"}
                    exit={"exit"}
                    className={"flex flex-col gap-y-2"}
                  >
                    {/*Header of each section*/}
                    <VerticallyAppearingText
                      text={t(
                        `Technologies.${technologies[selectedTechnologyIndex].type}.Sections.${techAspect.title}`,
                      )}
                      className={`${layoutProperties.text.medium}`}
                    />

                    {/*Render progress bars or staggered list of aspects*/}
                    {/*If key is one of these, we should render the staggered list*/}
                    {["otheraspects", "projectmanagement"].includes(
                      key.toLowerCase(),
                    ) ? (
                      <StaggeredList
                        items={techAspect.aspects}
                        render={(aspect) => <Aspect name={aspect.name} />}
                      />
                    ) : (
                      <div
                        className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 ${layoutProperties.gap.medium}`}
                      >
                        {techAspect.aspects.map(
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
                  </motion.div>
                );
              },
            )}
          </motion.div>
        </AnimatePresence>
      </AppearingContainer>
    </PageContainer>
  );
};

export default Technologies;
