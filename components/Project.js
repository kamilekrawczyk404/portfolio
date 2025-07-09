"use client";
import React from "react";
import { motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import CloseButton from "@/components/buttons/CloseButton";
import { useSelector } from "react-redux";
import AnimatedTextWithOverflow from "@/components/text/AnimatedTextWithOverflow";
import UnderlineNav from "@/components/navigation/UnderlineNav";
import GroupSection from "@/components/GroupSection";
import StaggeredList from "@/components/lists/StaggeredList";
import Gallery from "@/components/gallery/Gallery";
import Aspect from "@/components/lists/Aspect";

const Project = ({ project, shouldBeShown, onClose = () => {} }) => {
  const { theme } = useSelector((state) => state.theme);

  // Start animate sections after some delay
  const delay = 0.5;

  // Render navigation view based on the project's aspect
  const renderView = (view) => {
    switch (view.title.toLowerCase()) {
      case "użyte technologie":
        return (
          <ChildContainer className={"flex flex-col justify-between"}>
            <p className={""}>{view.description}</p>
            <div className={"grid grid-cols-2 gap-4"}>
              {view.categories.map((category, index) => (
                <GroupSection
                  key={index}
                  title={category.title}
                  headerSize={"text-lg"}
                  className={`${theme.foreground} basis-1/2 self-start`}
                >
                  <StaggeredList
                    items={category.aspects}
                    render={(item) => <Aspect name={item} />}
                  />
                </GroupSection>
              ))}
            </div>
          </ChildContainer>
        );
      case "funkcjonalności":
        return (
          <ChildContainer className={"flex flex-col gap-4"}>
            {view.categories.map((category, index) => (
              <div
                key={index}
                className={`${theme.foreground} flex flex-col gap-y-4 h-full justify-between`}
              >
                <StaggeredList
                  className={
                    "grid grid-cols-2 grid-rows-fit gap-4 overflow-y-scroll"
                  }
                  items={category.aspects}
                  render={(item) => (
                    <div className={"flex flex-col gap-y-1 items-start"}>
                      <Aspect name={item.title} />
                      <div className={"ml-[.75rem]"}>
                        <div
                          className={
                            "relative !w-3 aspect-square border-l-1 border-b-1 float-left mr-2"
                          }
                        ></div>
                        <p className={"text-sm"}>{item.description}</p>
                      </div>
                    </div>
                  )}
                />
              </div>
            ))}
          </ChildContainer>
        );

      case "galeria zdjęć":
        return (
          <ChildContainer className={"h-full"}>
            <Gallery photos={view.photos} />
          </ChildContainer>
        );
      default:
        return;
    }
  };

  return (
    <div className={"relative w-full h-full flex flex-col"}>
      {/*top bar - header*/}
      <motion.div
        initial={{ y: "-100%" }}
        animate={
          shouldBeShown
            ? {
                y: "0%",
              }
            : {
                y: "-100%",
              }
        }
        transition={{
          ...animationsTypes.default,
          duration: animationProperties.durations.long,
          delay: shouldBeShown ? delay : 0,
        }}
        className={`basis-[4rem] right-0 z-[10] p-4 ${theme.background}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldBeShown ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            ...animationsTypes.default,
            delay: shouldBeShown ? delay + 0.5 : 0,
          }}
          className={"flex justify-between items-center"}
        >
          <h3 className={`${theme.foreground} text-2xl`}>{project.title}</h3>
          <CloseButton onClick={onClose} />
        </motion.div>
      </motion.div>

      {/*bottom section - navigation*/}
      <motion.div
        className={`basis-full -translate-y-[1px] w-full ${theme.background}`}
        initial={{ y: "100%" }}
        animate={
          shouldBeShown
            ? {
                y: "0",
              }
            : { y: "100%" }
        }
        transition={{
          ...animationsTypes.default,
          duration: animationProperties.durations.long,
          delay,
        }}
      >
        <UnderlineNav
          items={project.description}
          renderHeader={(header) => (
            <span className={"inline-flex px-2 h-[1.75rem] items-center"}>
              {header}
            </span>
          )}
          renderView={renderView}
          id={"projectAspectsNavigation"}
          canRender={shouldBeShown}
        />
      </motion.div>
    </div>
  );
};

export default Project;

const ChildContainer = ({ className = "", children }) => (
  <div className={`p-4 w-full relative ${className}`}>{children}</div>
);
