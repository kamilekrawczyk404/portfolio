"use client";
import React, { ComponentProps, ReactNode, useCallback, useMemo } from "react";
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
import { useTranslations, useFormatter } from "next-intl";
import GroupSection from "@/components/containers/GroupSection";
import { RootState } from "@/redux/store";
import { FormattedProject } from "@/types/types";
import { View } from "@/views/Projects";

type RepositoryItem = {
  type: string;
  description: string;
  icon: ReactNode;
};

type ProjectProps = {
  project: FormattedProject;
  shouldBeShown?: boolean;
  onClose?: () => void;
  dataTestId?: string;
};

const Project = ({
  project,
  shouldBeShown,
  onClose,
  dataTestId,
}: ProjectProps): ReactNode => {
  const t = useTranslations("HomePage.ProjectsSection");
  // Use the useFormatter hook for proper internationalization
  const format = useFormatter();

  const { theme } = useSelector((state: RootState) => state.theme);

  // Start animate sections after some delay
  const delay = 0.5;

  // Use a memoized function for date formatting that uses the next-intl formatter
  const formatDateToDayMonthYear = useCallback(
    (dateInput: Date | string): string => {
      let date: Date;

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

      return format.dateTime(date, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    [format],
  );

  // Render navigation view based on the project's aspect
  // Correctly added dependencies to prevent stale data
  const renderView = useCallback(
    (view: View) => {
      switch (view.type) {
        case "gallery":
          return (
            <ChildContainer className={"h-full"} dataTestId={"gallery-view"}>
              <Gallery photos={view.photos} pauseOnHover={true} />
            </ChildContainer>
          );

        case "description":
          // Memoized the creation of these data structures for performance
          const repositoryItems: RepositoryItem[] = [
            {
              type: "creationDate",
              description: formatDateToDayMonthYear(
                project.repository.createdAt,
              ),
              icon: <Icons.Add />,
            },
            {
              type: "updateDate",
              description: formatDateToDayMonthYear(
                project.repository.updatedAt,
              ),
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

          const sections: {
            type: "Repository" | "Technologies";
            items: any[];
          }[] = [
            { type: "Repository", items: repositoryItems },
            { type: "Technologies", items: project.technologies },
          ];

          return (
            <ChildContainer
              dataTestId={"project-description-view"}
              className={`grid md:grid-cols-2 grid-cols-1 ${layoutProperties.gap.large}`}
            >
              {sections.map((section) => (
                <GroupSection
                  key={section.type}
                  title={() => (
                    <span>{t(`Sections.${section.type}.Title`)}</span>
                  )}
                  className={"gap-4"}
                >
                  {section.type === "Repository" ? (
                    <StaggeredList
                      items={section.items as RepositoryItem[]}
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
                        title={() => (
                          <span>
                            {t(`Sections.${section.type}.${technology.title}`)}
                          </span>
                        )}
                      >
                        <StaggeredList
                          items={technology.values as string[]}
                          render={(item) => <Aspect name={item} />}
                        />
                      </GroupSection>
                    ))
                  )}
                </GroupSection>
              ))}
              <GroupSection
                title={() => (
                  <span>{t("NavigationViewsHeaders.description")}</span>
                )}
                headerSize={layoutProperties.text.medium}
                className={"md:col-span-2 gap-2"}
              >
                {t(`Projects.${project.githubRepoName}.Description`)}
              </GroupSection>
            </ChildContainer>
          );
        case "keyFeatures":
          const featureKeys = project.keyFeaturesTitles;

          return (
            <ChildContainer
              className={"flex flex-col gap-4"}
              dataTestId={"key-features-view"}
            >
              <GroupSection
                title={() => (
                  <span>{t(`NavigationViewsHeaders.${view.type}`)}</span>
                )}
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
    },
    [t, project, formatDateToDayMonthYear],
  );

  return (
    <div
      style={{
        cursor: shouldBeShown ? "default" : "none",
      }}
      className={"relative w-full h-full flex flex-col"}
      data-testid={dataTestId}
    >
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
        <CloseButton dataTestId={"close-button"} onClick={onClose} />
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
            <button className={"inline-flex px-2 h-[1.75rem] items-center"}>
              {t(`NavigationViewsHeaders.${header}`)}
            </button>
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

type ChildContainerProps = ComponentProps<"div"> & {
  dataTestId?: string;
};

const ChildContainer = ({
  className = "",
  dataTestId,
  children,
  ...props
}: ChildContainerProps) => (
  <div
    data-testid={dataTestId}
    className={`p-4 w-full relative overflow-y-scroll ${className}`}
    {...props}
  >
    {children}
  </div>
);
