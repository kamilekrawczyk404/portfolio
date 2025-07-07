// Technologies.jsx
"use client";
import React, { useState, useCallback } from "react";
import PageContainer from "@/components/PageContainer";
import { colors, layoutProperties } from "@/layout";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/buttons/Button";
import SectionTitle from "@/components/SectionTitle";

const Technologies = () => {
  const technologies = [
    {
      type: "Frontend",
      languages: {
        title: "Languages",
        aspects: [
          { name: "Javascript", knowledge: 90 },
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
          { name: "Express.js", knowledge: 30 },
          { name: "Symfony", knowledge: 60 },
          { name: "Laravel", knowledge: 65 },
          { name: "ASP.NET", knowledge: 30 },
        ],
      },
      otherAspects: {
        title: "Additional aspects", // These don't have knowledge, so no progress bar
        aspects: [
          { name: "PHPUnit" },
          { name: "Authorization & Authentication" },
          { name: "REST API" },
          { name: "Graph QL" },
        ],
      },
    },
    {
      type: "DevTools & DevOps", // Example structure
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

  const [selectedTechnologyIndex, setSelectedTechnologyIndex] = useState(0);
  const [animatedProgressBars, setAnimatedProgressBars] = useState({});

  const handleTechnologySelect = useCallback((index) => {
    setSelectedTechnologyIndex(index);
    setAnimatedProgressBars({});
  }, []);

  const contentVariants = {
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
  const groupVariants = {
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
  const aspectItemVariants = {
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

  return (
    <PageContainer section includeNavigationHeight>
      <SectionTitle title={"Technologies"}>
        <div className={"flex flex-col self-end gap-y-1"}>
          <p className={"text-sm"}>Select a category</p>
          <div className={"flex gap-x-2"}>
            {technologies.map((technology, index) => (
              <Button
                key={technology.type}
                filled={index === selectedTechnologyIndex}
                navigation
                onClick={() => handleTechnologySelect(index)}
              >
                {technology.type}
              </Button>
            ))}
          </div>
        </div>
      </SectionTitle>
      <AnimatePresence mode={"popLayout"}>
        <motion.div
          key={technologies[selectedTechnologyIndex].type}
          variants={contentVariants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          className={"flex flex-col gap-y-8 flex-1"}
        >
          {Object.entries(technologies[selectedTechnologyIndex])
            .slice(1)
            .map(([key, value], index) => (
              <motion.div
                key={key}
                variants={groupVariants}
                initial={"initial"}
                animate={"animate"}
                exit={"exit"}
                className={"flex flex-col gap-y-2"}
              >
                <div className={"overflow-hidden pb-1"}>
                  <motion.h3
                    initial={{ y: "-100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={animationsTypes.default}
                    className={"text-5xl"}
                  >
                    {value.title}
                  </motion.h3>
                </div>

                <div
                  className={`${
                    ["otheraspects", "projectmanagement"].includes(
                      key.toLowerCase(),
                    )
                      ? "flex flex-wrap gap-2"
                      : "grid grid-cols-4 gap-4"
                  } relative`}
                >
                  {value.aspects.map((aspect) => (
                    <motion.div
                      variants={aspectItemVariants}
                      key={aspect.name}
                      className={`${
                        ["otheraspects", "projectmanagement"].includes(
                          key.toLowerCase(),
                        )
                          ? "border-1 px-2 h-[1.75rem] rounded-full flex justify-center"
                          : ""
                      } flex flex-col gap-y-1 relative`}
                      onAnimationComplete={(definition) => {
                        if (definition === "animate") {
                          setAnimatedProgressBars((prev) => ({
                            ...prev,
                            [aspect.name]: true,
                          }));
                        }
                      }}
                    >
                      <div>{aspect.name}</div>
                      {aspect?.knowledge && (
                        <ProgressBar
                          percentage={aspect.knowledge}
                          shouldAnimate={
                            animatedProgressBars[aspect.name] || false
                          }
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>
    </PageContainer>
  );
};

export default Technologies;
