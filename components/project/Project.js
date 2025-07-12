"use client";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import CloseButton from "@/components/buttons/CloseButton";
import { useSelector } from "react-redux";
import VerticallyAppearingText from "@/components/text/VerticallyAppearingText";
import UnderlineNav from "@/components/navigation/UnderlineNav";
import GroupSection from "@/components/GroupSection";
import StaggeredList from "@/components/lists/StaggeredList";
import Gallery from "@/components/gallery/Gallery";
import Aspect from "@/components/lists/Aspect";
import { layoutProperties } from "@/layout";
import IndentAspect from "@/components/lists/IndentAspect";
import SectionTitle from "@/components/SectionTitle";
import { Icons } from "@/components/Icons";

function formatDateToDayMonthYear(dateInput) {
  let date;

  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === "string") {
    date = new Date(dateInput);
  } else {
    console.error(
      "Invalid date input. Please provide a Date object or a valid date string.",
    );
    return "";
  }

  if (isNaN(date.getTime())) {
    console.error("Invalid date value. Could not parse the date.");
    return "";
  }

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const Project = ({ project, shouldBeShown, onClose = () => {} }) => {
  const { theme } = useSelector((state) => state.theme);

  // Start animate sections after some delay
  const delay = 0.5;

  // Render navigation view based on the project's aspect
  const renderView = useCallback((view) => {
    switch (view.title.toLowerCase()) {
      case "galeria":
        return (
          <ChildContainer className={"h-full"}>
            <Gallery photos={view.photos} />
          </ChildContainer>
        );
      case "informacje ogólne":
        const repositoryItems = [
          {
            title: "Created",
            description: formatDateToDayMonthYear(project.repository.createdAt),
            icon: <Icons.Add />,
          },
          {
            title: "Updated",
            description: formatDateToDayMonthYear(project.repository.updatedAt),
            icon: <Icons.Update />,
          },
          {
            title: "Default branch",
            description: project.repository.defaultBranch,
            icon: <Icons.CodeBranch />,
          },
          {
            title: "GitHub",
            description: project.repository.url,
            icon: <Icons.GitHub />,
          },
        ];

        if (project?.link) {
          repositoryItems.push({
            title: "Website",
            description: project.link,
            icon: <Icons.Globe />,
          });
        }

        const sections = [
          { title: "Repository", items: repositoryItems },
          { title: "Technologies", items: project.technologies },
        ];

        return (
          <ChildContainer
            className={`grid md:grid-cols-2 grid-cols-1 ${layoutProperties.gap.large}`}
          >
            {sections.map((section) => (
              <GroupSection
                key={section.title}
                title={section.title}
                className={"gap-4"}
                headerSize={layoutProperties.text.medium}
              >
                {section.title === "Repository" ? (
                  <StaggeredList
                    items={section.items}
                    className={"grid grid-cols-2 gap-2 items-center"}
                    render={(item) => <IndentAspect {...item} />}
                  />
                ) : (
                  section.items.map((technology) => (
                    <GroupSection
                      key={technology.title}
                      title={technology.title}
                    >
                      <StaggeredList
                        items={technology.values}
                        render={(item) => <Aspect name={item} />}
                      />
                    </GroupSection>
                  ))
                )}
              </GroupSection>
            ))}
            <GroupSection
              title={"Description"}
              headerSize={layoutProperties.text.medium}
              className={"col-span-2"}
            >
              <div>
                {project.description.map((textSection, index) => (
                  <p key={index}>{textSection}</p>
                ))}
              </div>
            </GroupSection>
          </ChildContainer>
        );
      case "kluczowe cechy":
        return (
          <ChildContainer className={"flex flex-col gap-4"}>
            <GroupSection
              title={view.title}
              headerSize={layoutProperties.text.medium}
              className={"gap-4"}
            >
              <StaggeredList
                className={
                  "grid md:grid-cols-2 grid-cols-1 grid-rows-fit gap-4 overflow-y-scroll"
                }
                items={project.mainAspects}
                render={(item) => (
                  <IndentAspect
                    title={item.title}
                    description={item.description}
                  />
                )}
              />
            </GroupSection>
          </ChildContainer>
        );
      default:
        return;
    }
  }, []);

  return (
    <div className={"relative w-full h-full flex flex-col"}>
      {/*top bar - header*/}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldBeShown ? 1 : 0 }}
        transition={{
          ...animationsTypes.default,
          duration: animationProperties.durations.long,
          delay: shouldBeShown ? delay : 0,
        }}
        className={`z-[10] p-4 flex justify-between items-center ${theme.background}`}
      >
        <h3 className={`${theme.foreground} ${layoutProperties.text.medium}`}>
          {project.title}
        </h3>
        <CloseButton onClick={onClose} />
      </motion.div>

      {/*bottom section - navigation*/}
      <motion.div
        className={`relative h-full w-full ${theme.background}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldBeShown ? 1 : 0 }}
        transition={{
          ...animationsTypes.default,
          duration: animationProperties.durations.long,
          delay: shouldBeShown ? delay : 0,
        }}
      >
        <UnderlineNav
          items={project.views}
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
  <div className={`p-4 w-full relative overflow-y-scroll ${className}`}>
    {children}
  </div>
);
