"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "@/components/buttons/CloseButton";
import { useSelector } from "react-redux";
import GroupSection from "@/components/GroupSection";
import Aspect from "@/components/lists/Aspect";
import StaggeredList from "@/components/lists/StaggeredList";
import UnderlineNav from "@/components/navigation/UnderlineNav";

const ExpandingContainer = ({ isExpanded, setIsExpanded, project }) => {
  const { theme, opposite } = useSelector((state) => state.theme);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(false);

    const timeout = setTimeout(() => {
      setIsCompleted(true);
    }, animationDuration * 1000);

    return () => clearTimeout(timeout);
  }, [isExpanded]);

  const animationDuration = 0.7;

  // Render navigation view based on the project's aspect
  const renderView = (view) => {
    switch (view.title.toLowerCase()) {
      case "stack technologiczny":
        return (
          <div className={"w-full p-4 flex flex-col gap-4 justify-end h-full"}>
            {view.categories.map((category, index) => (
              <GroupSection
                key={index}
                title={category.title}
                className={`${theme.foreground} self-start`}
              >
                <StaggeredList
                  items={category.aspects}
                  render={(item) => <Aspect name={item} />}
                />
              </GroupSection>
            ))}
          </div>
        );
      case "główne funkcjonalności":
        return (
          <div className={"w-full h-full p-4 flex flex-col gap-4 relative"}>
            {view.categories.map((category, index) => (
              <div
                key={index}
                className={`${theme.foreground} flex flex-col gap-y-4 h-full justify-between`}
              >
                <h4 className={"text-xl"}>{category.title}</h4>
                <StaggeredList
                  className={"grid grid-cols-2 grid-rows-fit gap-4 self"}
                  items={category.aspects}
                  render={(item) => (
                    <div className={"flex flex-col gap-y-1 items-start"}>
                      <Aspect name={item.name} />
                      <div className={"ml-[.125rem]"}>
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
          </div>
        );
      default:
        return;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        className={`rounded-md flex overflow-hidden flex-col ${
          isExpanded ? "-translate-x-1/2 -translate-y-[calc(50%-2rem)]" : ""
        }  ${!isExpanded && isCompleted ? "z-0" : "z-100"}`}
        style={{
          width: isExpanded ? `calc(100vw - 10%)` : "100%",
          height: isExpanded ? `calc(100dvh - 8rem)` : "20rem",
          minHeight: "30rem",
          left: isExpanded ? "50%" : "0",
          top: isExpanded ? "50%" : "0",
          position: isExpanded ? "fixed" : "absolute",
          borderRadius: isExpanded ? "1rem" : "0.5rem",
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
          type: "spring",
          bounce: 0.2,
        }}
      >
        <div className={"relative w-full h-full"}>
          <motion.div
            animate={
              isExpanded
                ? {
                    opacity: 1,
                    y: "0%",
                  }
                : {
                    opacity: 0,
                    y: "-100%",
                  }
            }
            className={`absolute top-0 left-0 h-[4rem] w-full text-2xl font-light text-neutral-100 z-[10] flex justify-between items-center p-4 ${theme.background}`}
          >
            <h3 className={`${theme.foreground} text-2xl`}>{project.title}</h3>
            <CloseButton onClick={() => setIsExpanded(false)} />
          </motion.div>

          <div
            className={
              "relative w-full h-full flex items-center justify-center"
            }
          >
            <motion.div
              layout
              animate={
                {
                  // backgroundSize: isExpanded ? "105% 105%" : "100% 100%",
                }
              }
              className={"w-full h-full bg-no-repeat lg:bg-cover"}
              style={{
                backgroundImage: `url(${project.thumbnail})`,
              }}
              transition={{
                duration: animationDuration,
                type: "spring",
                bounce: 0.2,
              }}
            ></motion.div>
            <motion.div
              className={
                "absolute top-0 left-0 w-full h-full bg-black/35 opacity-0"
              }
              animate={isExpanded ? { opacity: 1 } : { opacity: 0 }}
            ></motion.div>
          </div>
        </div>
        <motion.div
          className={`absolute w-full bottom-0 left-0 ${theme.background}`}
          animate={
            isExpanded
              ? {
                  height: "50%",
                  display: "block",
                }
              : { height: 0, display: "hidden" }
          }
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
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExpandingContainer;
