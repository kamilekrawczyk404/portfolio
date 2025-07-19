"use client";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { animationProperties, animationsTypes } from "@/animations";
import CloseButton from "@/components/buttons/CloseButton";
import { useSelector } from "react-redux";
import UnderlineNav from "@/components/navigation/UnderlineNav";
import StaggeredList from "@/components/lists/StaggeredList";
import Gallery from "@/components/gallery/Gallery";
import Aspect from "@/components/lists/Aspect";
import { layoutProperties } from "@/layout";
import IndentAspect from "@/components/lists/IndentAspect";
import { Icons } from "@/components/Icons";
import { useTranslations } from "next-intl";
import GroupSection from "@/components/containers/GroupSection";

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
  const t = useTranslations("HomePage.ProjectsSection");

  const { theme } = useSelector((state) => state.theme);

  // Start animate sections after some delay
  const delay = 0.5;

  // Render navigation view based on the project's aspect
  const renderView = useCallback((view) => {
    switch (view.type) {
      case "gallery":
        return (
          <ChildContainer className={"h-full"}>
            <Gallery photos={view.photos} />
          </ChildContainer>
        );
      case "description":
        const repositoryItems = [
          {
            type: "creationDate",
            description: formatDateToDayMonthYear(project.repository.createdAt),
            icon: <Icons.Add />,
          },
          {
            type: "updateDate",
            description: formatDateToDayMonthYear(project.repository.updatedAt),
            icon: <Icons.Update />,
          },
          {
            type: "defaultBranch",
            description: project.repository.defaultBranch,
            icon: <Icons.CodeBranch />,
          },
          {
            type: "gitHub",
            description: project.repository.url,
            icon: <Icons.GitHub />,
          },
        ];

        if (project?.link) {
          repositoryItems.push({
            type: "website",
            description: project.link,
            icon: <Icons.Globe />,
          });
        }

        const sections = [
          { type: "Repository", items: repositoryItems },
          { type: "Technologies", items: project.technologies },
        ];

        return (
          <ChildContainer
            className={`grid md:grid-cols-2 grid-cols-1 ${layoutProperties.gap.large}`}
          >
            {sections.map((section) => (
              <GroupSection
                key={section.type}
                title={t(`Sections.${section.type}.Title`)}
                className={"gap-4"}
                headerSize={layoutProperties.text.medium}
              >
                {section.type === "Repository" ? (
                  <StaggeredList
                    items={section.items}
                    className={
                      "grid md:grid-cols-2 grid-cols-1 gap-2 items-center"
                    }
                    render={(item) => (
                      <IndentAspect
                        icon={item.icon}
                        description={item.description}
                        title={t(`Sections.${section.type}.${item.type}`)}
                      />
                    )}
                  />
                ) : (
                  section.items.map((technology) => (
                    <GroupSection
                      key={technology.title}
                      title={t(`Sections.${section.type}.${technology.title}`)}
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
              className={"md:col-span-2 gap-2"}
            >
              {t(`Projects.${project.githubRepoName}.Description`)}
            </GroupSection>
          </ChildContainer>
        );
      case "keyFeatures":
        // values that are represented in the i18n project object (those cannot be cast to an object)
        const featureKeys = project.keyFeaturesTitles;

        return (
          <ChildContainer className={"flex flex-col gap-4"}>
            <GroupSection
              title={t(`NavigationViewsHeaders.${view.type}`)}
              headerSize={layoutProperties.text.medium}
              className={"gap-4"}
            >
              <StaggeredList
                className={
                  "grid md:grid-cols-2 grid-cols-1 grid-rows-fit gap-4 overflow-y-scroll"
                }
                items={featureKeys}
                render={(feature) => (
                  <IndentAspect
                    title={t(
                      `Projects.${project.githubRepoName}.KeyFeatures.title_${feature}`,
                    )}
                    description={t(
                      `Projects.${project.githubRepoName}.KeyFeatures.desc_${feature}`,
                    )}
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
          {t(`Projects.${project.githubRepoName}.Title`)}
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
          renderNavigationHeader={(header) => (
            <span className={"inline-flex px-2 h-[1.75rem] items-center"}>
              {t(`NavigationViewsHeaders.${header}`)}
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
